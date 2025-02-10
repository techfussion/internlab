import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Check, X, AlertCircle, Building2, FolderPlus } from 'lucide-react';
import AdminLayout from '@/components/admin/Layout';
import { Header } from '@/components/admin/Header';

const SubmissionManagement = () => {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [adminFeedback, setAdminFeedback] = useState('');

  // Mock data - replace with actual data fetching
  const submissions: Submission[] = [
    {
      id: '1',
      type: 'UPDATE_COMPANY',
      status: 'PENDING',
      data: {
        name: 'Tech Corp',
        changes: {
          description: 'Updated company description',
          techStacks: ['React', 'Node.js', 'PostgreSQL']
        }
      },
      userId: 'user123',
      companyId: 'company123',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      type: 'NEW_COMPANY',
      status: 'PENDING',
      data: {
        name: 'New Startup Inc',
        description: 'An innovative startup',
        city: 'San Francisco',
        country: 'USA'
      },
      userId: 'user124',
      createdAt: new Date().toISOString(),
    }
  ];

interface Submission {
    id: string;
    type: 'NEW_COMPANY' | 'UPDATE_COMPANY' | 'NEW_DOMAIN' | 'UPDATE_DOMAIN';
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    data: any;
    userId: string;
    companyId?: string;
    createdAt: string;
}

const getStatusBadge = (status: 'PENDING' | 'APPROVED' | 'REJECTED') => {
    const statusStyles: { [key in 'PENDING' | 'APPROVED' | 'REJECTED']: string } = {
        PENDING: 'bg-yellow-100 text-yellow-800',
        APPROVED: 'bg-green-100 text-green-800',
        REJECTED: 'bg-red-100 text-red-800'
    };
    
    return (
        <Badge className={`${statusStyles[status]} font-medium`}>
            {status}
        </Badge>
    );
};

interface SubmissionTypeIconProps {
    type: 'NEW_COMPANY' | 'UPDATE_COMPANY' | 'NEW_DOMAIN' | 'UPDATE_DOMAIN';
}

const getSubmissionTypeIcon = ({ type }: SubmissionTypeIconProps) => {
    switch (type) {
        case 'NEW_COMPANY':
            return <Building2 className="w-4 h-4" />;
        case 'UPDATE_COMPANY':
            return <Building2 className="w-4 h-4" />;
        case 'NEW_DOMAIN':
            return <FolderPlus className="w-4 h-4" />;
        case 'UPDATE_DOMAIN':
            return <FolderPlus className="w-4 h-4" />;
        default:
            return <AlertCircle className="w-4 h-4" />;
    }
};

interface HandleSubmissionActionProps {
    submissionId: string;
    action: 'approve' | 'reject';
}

const handleSubmissionAction = ({ submissionId, action }: HandleSubmissionActionProps) => {
    // Handle approval/rejection logic here
    console.log(`Submission ${submissionId} ${action}`);
};

interface RenderSubmissionDetailsProps {
    submission: Submission;
}

const renderSubmissionDetails = ({ submission }: RenderSubmissionDetailsProps) => {
    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    {getSubmissionTypeIcon({ type: submission.type })}
                    {submission.type.replace('_', ' ')}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-medium mb-2">Submitted Changes:</h4>
                        <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto">
                            {JSON.stringify(submission.data, null, 2)}
                        </pre>
                    </div>
                    
                    <div>
                        <h4 className="font-medium mb-2">Admin Feedback:</h4>
                        <Textarea
                            value={adminFeedback}
                            onChange={(e) => setAdminFeedback(e.target.value)}
                            placeholder="Enter feedback for the submitter..."
                            className="min-h-[100px]"
                        />
                    </div>

                    <div className="flex gap-2">
                        <Button
                            onClick={() => handleSubmissionAction({ submissionId: submission.id, action: 'approve' })}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            <Check className="w-4 h-4 mr-2" />
                            Approve
                        </Button>
                        <Button
                            onClick={() => handleSubmissionAction({ submissionId: submission.id, action: 'reject' })}
                            variant="destructive"
                        >
                            <X className="w-4 h-4 mr-2" />
                            Reject
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

  return (
    <AdminLayout>
        <Header pageName='Submissions' />
        <main className="space-y-4 px-6 pt-6">
            <Card>
                <CardHeader>
                <CardTitle>Submission Management</CardTitle>
                </CardHeader>
                <CardContent>
                <Tabs defaultValue="pending">
                    <TabsList>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="approved">Approved</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                    </TabsList>

                    <TabsContent value="pending" className="mt-4">
                    <div className="space-y-4">
                        {submissions.map((submission) => (
                        <Card
                            key={submission.id}
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() => setSelectedSubmission(submission)}
                        >
                            <CardContent className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-4">
                                {getSubmissionTypeIcon({ type: submission.type })}
                                <div>
                                <h3 className="font-medium">
                                    {submission.data.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Submitted on {new Date(submission.createdAt).toLocaleDateString()}
                                </p>
                                </div>
                            </div>
                            {getStatusBadge(submission.status)}
                            </CardContent>
                        </Card>
                        ))}
                    </div>
                    </TabsContent>
                </Tabs>
                </CardContent>
            </Card>

            {selectedSubmission && renderSubmissionDetails({ submission: selectedSubmission })}
        </main>
    </AdminLayout>
  );
};

export default SubmissionManagement;