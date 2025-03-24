import React, { Fragment,useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
//   CardFooter
} from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
import { 
  FileText,
  
  Building2,
  Layers,
  AlertCircle,
  ChevronDown,
  Loader2
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Nav from '@/components/layout/Nav';
// import { submissionData } from '@/global/dummy-data';
import { CompanyForm } from './Components/Company-Form';
import apiClient from '@/interceptor/axios.interceptor';
import { REACT_APP_API_BASE } from '@/global/constants';
type SubmissionType = 'NEW_COMPANY' | 'UPDATE_COMPANY' | 'NEW_DOMAIN' | 'UPDATE_DOMAIN';
type SubmissionStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

interface Submission {
  id: string;
  type: SubmissionType;
  status: SubmissionStatus;
  data: any; // The submitted changes
  adminFeedback?: string;
  createdAt: string;
  company: {
    name: string;
    logo: string | null;
  };
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = React.useState<Submission[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = useState(false)

 

 const fetchSubmissions = async () => {
  try {
    // Retrieve token from local storage (or your auth state)
    const token = localStorage.getItem('token'); 

    if (!token) {
      console.error('No authentication token found.');
      return;
    }

    // Make request with Authorization header
    const response = await apiClient.get(`${REACT_APP_API_BASE}/submissions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setSubmissions(response.data);
  } catch (error) {
    console.error('Error fetching submissions:', error);

    if (error.response?.status === 401) {
      alert('Session expired. Please log in again.');

    }
  } finally {
    setIsLoading(false);
  }
};

React.useEffect(() => {
  fetchSubmissions();
}, []);

  // const getSubmissionTypeDetails = (type: SubmissionType) => {
  //   switch (type) {
  //     case 'NEW_COMPANY':
  //       return {
  //         label: 'New Company',
  //         icon: Building2,
  //         color: 'text-blue-500'
  //       };
  //     case 'UPDATE_COMPANY':
  //       return {
  //         label: 'Company Update',
  //         icon: Building2,
  //         color: 'text-purple-500'
  //       };
  //     case 'NEW_DOMAIN':
  //       return {
  //         label: 'New Domain',
  //         icon: Layers,
  //         color: 'text-green-500'
  //       };
  //     case 'UPDATE_DOMAIN':
  //       return {
  //         label: 'Domain Update',
  //         icon: Layers,
  //         color: 'text-orange-500'
  //       };
  //   }
  // };

  // const getStatusDetails = (status: SubmissionStatus) => {
  //   switch (status) {
  //     case 'PENDING':
  //       return {
  //         label: 'Pending Review',
  //         icon: Clock,
  //         color: 'bg-yellow-500/10 text-yellow-500'
  //       };
  //     case 'APPROVED':
  //       return {
  //         label: 'Approved',
  //         icon: CheckCircle2,
  //         color: 'bg-green-500/10 text-green-500'
  //       };
  //     case 'REJECTED':
  //       return {
  //         label: 'Rejected',
  //         icon: XCircle,
  //         color: 'bg-red-500/10 text-red-500'
  //       };
  //   }
  // };

  const formatChanges = (data: any) => {
    return Object.entries(data).map(([key, value]) => {
      // Skip empty or null values
      if (!value) return null;
      
      return (
        <div key={key} className="py-1">
          <span className="font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
          {Array.isArray(value) ? (
            <span className="text-muted-foreground">
              {value.join(', ')}
            </span>
          ) : (
            <span className="text-muted-foreground">
              {String(value)}
            </span>
          )}
        </div>
      );
    }).filter(Boolean);
  };

  if (isLoading) {
    return (
        <Fragment>
            <Nav />
            <main className="flex items-center justify-center min-h-[400px] px-4 lg:px-16">
                <Loader2 className="h-8 w-8 animate-spin" />
            </main>
        </Fragment>
    );
  }

  return (
    <Fragment>
        <Nav />
        <main className="container py-8 px-4 lg:px-16 ">
          <div className='text-right pb-[1rem] '>
         <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button size="lg">Post Submission</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-50">
        <DialogHeader>
          <DialogTitle>Company Information</DialogTitle>
          <DialogDescription>Add details about your company and domains.</DialogDescription>
        </DialogHeader>
        <CompanyForm onComplete={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
          </div>
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    My Submissions
                </CardTitle>
                <CardDescription>
                    Track the status of your company and domain submissions
                </CardDescription>
                </CardHeader>
                <CardContent>
                {submissions.length === 0 ? (
                    <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No submissions yet</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        You haven't made any submissions yet.
                    </p>
                    </div>
                ) : (
                    <Accordion type="single" collapsible className="space-y-4">
                    {submissions.map((submission) => {

                        return (
                        <AccordionItem 
                            key={submission.id} 
                            value={submission.id}
                            className="border rounded-lg px-4"
                        >
                            <AccordionTrigger className="py-4 hover:no-underline">
                            <div className="flex items-start justify-between w-full">
                                <div className="flex items-start gap-4">
                                {submission.company.logo ? (
                                    <img
                                    src={submission.company.logo}
                                    alt={submission.company.name}
                                    className="h-12 w-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                                    <Building2 className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                )}
                               
                                </div>
                                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
                            </div>
                            </AccordionTrigger>
                            <AccordionContent>
                            <div className="py-4 space-y-4">
                                <div>
                                <h4 className="font-medium mb-2">Submitted Changes</h4>
                                <ScrollArea className="h-[200px] rounded-md border p-4">
                                    {formatChanges(submission.data)}
                                </ScrollArea>
                                </div>
                                
                                {submission.adminFeedback && (
                                <div className="bg-muted p-4 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                                    <h4 className="font-medium">Admin Feedback</h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                    {submission.adminFeedback}
                                    </p>
                                </div>
                                )}
                            </div>
                            </AccordionContent>
                        </AccordionItem>
                        );
                    })}
                    </Accordion>
                )}
                </CardContent>
            </Card>
        </main>
    </Fragment>

  );
}