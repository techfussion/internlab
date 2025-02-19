import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Edit2, User } from 'lucide-react';
import Nav from '@/components/layout/Nav';

interface UserProfile {
  email: string;
  fullName: string;
  institution?: string;
  department?: string;
  level?: string;
  regNo?: string;
  preferredDomains: string[];
  techStack: string[];
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // Mock user data - replace with your actual data fetching
  const userData: UserProfile = {
    email: "user@example.com",
    fullName: "John Doe",
    institution: "University of Technology",
    department: "Computer Science",
    level: "300",
    regNo: "2020/123456",
    preferredDomains: ["Frontend", "Mobile"],
    techStack: ["React", "React Native"]
  };

  const form = useForm<UserProfile>({
    defaultValues: userData
  });

  async function onSubmit(data: UserProfile) {
    try {
      setIsLoading(true);
      // Handle form submission
      console.log(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  }

  // Profile information display component
  const ProfileInfo = ({ label, value }: { label: string; value?: string }) => (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value || 'Not provided'}</p>
    </div>
  );

  return (
    <Fragment>
        <Nav />
        <main className="container py-8 px-4 lg:px-16">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                    </CardTitle>
                    <CardDescription>
                    View and manage your profile details
                    </CardDescription>
                </div>
                {!isEditing && (
                    <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2"
                    >
                    <Edit2 className="h-4 w-4" />
                    Edit Profile
                    </Button>
                )}
                </CardHeader>
                <CardContent>
                {isEditing ? (
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Basic Information */}
                        <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                <Input {...field} type="email" disabled />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        </div>

                        {/* Academic Information */}
                        <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="institution"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Institution</FormLabel>
                                <FormControl>
                                <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="department"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Department</FormLabel>
                                <FormControl>
                                <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="level"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Level</FormLabel>
                                <FormControl>
                                <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="regNo"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Registration Number</FormLabel>
                                <FormControl>
                                <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        </div>

                        <div className="flex gap-4">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </Button>
                        </div>
                    </form>
                    </Form>
                ) : (
                    <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <ProfileInfo label="Full Name" value={userData.fullName} />
                        <ProfileInfo label="Email" value={userData.email} />
                        <ProfileInfo label="Institution" value={userData.institution} />
                        <ProfileInfo label="Department" value={userData.department} />
                        <ProfileInfo label="Level" value={userData.level} />
                        <ProfileInfo label="Registration Number" value={userData.regNo} />
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                        <p className="text-sm text-muted-foreground">Preferred Domains</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {userData.preferredDomains.map((domain) => (
                            <span 
                                key={domain}
                                className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                            >
                                {domain}
                            </span>
                            ))}
                        </div>
                        </div>
                        
                        <div>
                        <p className="text-sm text-muted-foreground">Tech Stack</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {userData.techStack.map((tech) => (
                            <span 
                                key={tech}
                                className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                            >
                                {tech}
                            </span>
                            ))}
                        </div>
                        </div>
                    </div>
                    </div>
                )}
                </CardContent>
            </Card>
        </main>
    </Fragment>

  );
}