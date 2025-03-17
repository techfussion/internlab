import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { REACT_APP_API_BASE } from "@/global/constants";
import { useToast } from "@/hooks/use-toast";

console.log("API BASE URL:", REACT_APP_API_BASE);

// Define validation schema with Zod
const formSchema = z
  .object({
    email: z.string().email({ message: "Invalid email format" }),
    fullName: z.string().min(7, { message: "Full name cannot be less than 3 characters" }),
    institution: z.string().optional(),
    level: z.string().optional(),
    department: z.string().optional(),
    regNo: z.string().optional(),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  })

// Define form data type
type SignupFormData = z.infer<typeof formSchema>;

const Signup: React.FC = () => {
  const { toast } = useToast();
  const { setCredentials } = useAuth();
  const [loading, setLoading] = useState(false);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    try {
        setLoading(true);
        console.log("API BASE URL:", REACT_APP_API_BASE);
        const response = await axios.post(`${REACT_APP_API_BASE}/auth/register`, data);

        // Extract token and user data
        const { token, user } = response.data;
  
        // Set credentials in AuthContext
        setCredentials(user, token);
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
          Create an account to enable internlab member features.
        </p>

        {/* Form */}
        <div className="max-h-72 overflow-y-auto px-1">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                {/* FullName Field */}
                <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                        <Input className="rounded-none" placeholder="Enter your fullname" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                {/* Institution Field */}
                <FormField
                control={form.control}
                name="institution"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Institution (Optional)</FormLabel>
                    <FormControl>
                        <Input className="rounded-none" placeholder="Enter your institution" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                {/* Department Field */}
                <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Departement (Optional)</FormLabel>
                    <FormControl>
                        <Input className="rounded-none" placeholder="Enter your department" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                {/* Department Field */}
                <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Level (Optional)</FormLabel>
                    <FormControl>
                        <Input className="rounded-none" placeholder="Enter your level" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                {/* Department Field */}
                <FormField
                control={form.control}
                name="regNo"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>RegistrationNumber (Optional)</FormLabel>
                    <FormControl>
                        <Input className="rounded-none" placeholder="Enter your regNumber" {...field} />
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
                        <Input className="rounded-none" placeholder="you@example.com" {...field} />
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
                        <Input className="rounded-none" type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                {/* Submit Button */}
                <Button type="submit" className="rounded-none w-full bg-purple-500 hover:bg-purple-300" disabled={loading}>
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
          &copy; internlab. All rights reserved.
        </p>
      </div>
    </main>
  );
};

export default Signup;
