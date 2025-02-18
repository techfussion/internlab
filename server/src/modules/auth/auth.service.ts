import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import {JwtService} from '@nestjs/jwt';
import * as argon from 'argon2';
import { PrismaService } from "../prisma/prisma.service";
import { LoginDto, RegisterDto } from "./dto/auth.dto";
import { ConfigService } from "@nestjs/config";
import { BaseService } from "../common/base.service";

@Injectable () 
export class AuthService extends BaseService {
    constructor (protected prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {
        super(prisma);
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;
    
        //  Find user by email
        const user = await this.prisma.user.findUnique({
          where: { email },
        });
    
        if (!user) {
          throw new NotFoundException('Invalid email or password');
        }
        
        // Validate password
        const isPasswordValid = await argon.verify(user.password, password);
        if (!isPasswordValid) {
          throw new UnauthorizedException('Invalid email or password');
        }
    
        // Generate JWT Token
        const payload = {
          sub: user.id,
          email: user.email,
          role: user.role,
        };
    
        const token = this.jwt.sign(payload, {
            secret: this.config.get('JWT_SECRET'),
            expiresIn: this.config.get('JWT_EXPIRATION_TIME')
        });
    
        // Return token and user info
        delete user.password;
        return {
          message: 'Login successful',
          user,
          token,
        };
      }

    async register(registerDto: RegisterDto) {
        const { 
          fullName,
          email, 
          password, 
          department,
          level,
          institution,
        } = registerDto;
        
        // Check if user already exists
        const existingUser = await this.prisma.user.findUnique({ 
          where: { email },
        });
        
        if (existingUser) {
          throw new ConflictException('Email is already registered');
        }
      
        // Hash the password
        const hashedPassword = await argon.hash(password);
      
        try {
          // Prisma transaction to ensure atomic operations
          return await this.prisma.$transaction(async (prisma: any) => {
            // Create user
            const user = await prisma.user.create({
              data: {
                fullName,
                email, 
                department, 
                level, 
                institution,
                password: hashedPassword,
              },
            });
      
            // Generate JWT Token
            const payload = {
              sub: user.id,
              email: user.email,
              role: user.role,
            };
        
            const token = this.jwt.sign(payload, {
                secret: this.config.get('JWT_SECRET'),
                expiresIn: this.config.get('JWT_EXPIRATION_TIME')
            });

            return {
              message: 'User registered successfully',
              user,
              token,
            };
          }, {
            maxWait: 5000,  // Maximum wait time for transaction
            timeout: 10000  // Overall timeout
          });
        } catch (error) {
            throw await this.handleError(error);
        }
      }
}