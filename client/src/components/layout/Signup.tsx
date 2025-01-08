import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { REACT_APP_API_BASE } from "@/global/constants";
import { useToast } from "@/hooks/use-toast";

// Define validation schema with Zod
const formSchema = z
  .object({
    email: z.string().email({ message: "Invalid email format" }),
    firstName: z.string().min(3, { message: "Firstname must be at least 3 characters" }),
    middleName: z.string().optional(),
    lastName: z.string().min(3, { message: "Lastname must be at least 3 characters" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  })

// Define form data type
type SignupFormData = z.infer<typeof formSchema>;

const Signup: React.FC = () => {
  const { toast } = useToast();
  const { setCredentials } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    try {
        setLoading(true);
        const response = await axios.post(`${REACT_APP_API_BASE}/auth/register`, data);

        // Extract token and user data
        const { token, user } = response.data;
  
        // Set credentials in AuthContext
        setCredentials(user, token);
  
        // Redirect to dashboard
        navigate("/engine/overview");    
    } catch (error: any) {
        toast({
          variant: 'destructive',
          description: `Signup failed: ${error.message}`
        });
    } finally {
        setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center">
      <div className="w-full max-w-lg p-6 bg-white-500s">
        <h2 className="text-2xl font-bold text-center mb-2">Welcome!</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Create a Logit account to experience a seamless electronic logbook system.
        </p>

        {/* Form */}
        <div className="max-h-72 overflow-y-auto px-1">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                {/* Firstname Field */}
                <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter your firstname" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                {/* Middlename Field */}
                <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter your middlename" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                {/* Lastname Field */}
                <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter your lastname" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                {/* Email Field */}
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                {/* Password Field */}
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={loading}>
                 {
                    loading
                    ? 'Signing up...'
                    : 'Sign Up'
                 }
                </Button>
            </form>
            </Form>
        </div>

        {/* Divider */}
        <hr className="my-4" />

        {/* Social Signup */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" className="w-full">
            Google
          </Button>
          <Button variant="outline" className="w-full">
            Facebook
          </Button>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-4">
          &copy; Logit. All rights reserved.
        </p>
      </div>
    </main>
  );
};

export default Signup;
