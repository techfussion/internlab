import React, { Fragment, useEffect } from 'react';
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
import { REACT_APP_API_BASE } from '@/global/constants';
import { toast } from '@/hooks/use-toast'; // Import if you have this component

interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  institution?: string;
  department?: string;
  level?: string;
  regNo?: string;
  preferredDomains?: string[];
  techStack?: string[];
  role?: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [userData, setUserData] = React.useState<UserProfile | null>(null);

 
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
       
        if (!user.preferredDomains) user.preferredDomains = [];
        if (!user.techStack) user.techStack = [];
        
        setUserData(user);
        form.reset(user); 
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const form = useForm<UserProfile>({
    defaultValues: {
      email: "",
      fullName: "",
      institution: "",
      department: "",
      level: "",
      regNo: "",
      preferredDomains: [],
      techStack: []
    }
  });

 
  useEffect(() => {
    if (userData) {
      form.reset(userData);
    }
  }, [userData, form]);

 async function onSubmit(data: UserProfile) {
  try {
    setIsLoading(true);
    
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found');
    }
    
    
    try {
      const response = await fetch(`${REACT_APP_API_BASE}/users/${userData?.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          fullName: data.fullName,
          institution: data.institution,
          department: data.department,
          level: data.level,
          regNo: data.regNo
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.status}`);
      }

      const updatedUser = await response.json();
      
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUserData(updatedUser);
      
      toast?.({
        title: "Profile updated",
        description: "Your profile information has been updated successfully."
      });
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.error('Network error - could not connect to server');
        toast?.({
          title: "Connection Error",
          description: "Could not connect to the server. Please check your internet connection or try again later.",
          variant: "destructive"
        });
      } else {
        throw error; 
      }
    }
    
    setIsEditing(false);
  } catch (error) {
    console.error('Error updating profile:', error);
    toast?.({
      title: "Update failed",
      description: "There was a problem updating your profile.",
      variant: "destructive"
    });
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

  if (!userData) {
    return (
      <Fragment>
        <Nav />
        <main className="container py-8 px-4 lg:px-16 flex justify-center items-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </main>
      </Fragment>
    );
  }

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
                            <Input {...field} type="email" />
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
                            <Input {...field} value={field.value || ''} />
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
                
                {userData.preferredDomains && userData.preferredDomains.length > 0 && (
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
                  </div>
                )}
                
                {userData.techStack && userData.techStack.length > 0 && (
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
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </Fragment>
  );
}