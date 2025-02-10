import { useState } from 'react';
import { PlusCircle, Search, MoreVertical } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge";
import AdminLayout from '@/components/admin/Layout';
import { Header } from '@/components/admin/Header';

export const DomainsManagement = () => {
    const [domains] = useState([
      {
        id: '1',
        name: 'Software Engineering',
        company: 'TechCorp',
        active: true,
        stipend: true,
        stipendAmount: 50000,
        applications: 8,
        capacity: 10,
      },
      // Add more mock data
    ]);
  
    return (
        <AdminLayout>
            <Header
                pageName='Domains'
                pageActions={
                    <Dialog>
                        <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Domain
                        </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Domain</DialogTitle>
                            <DialogDescription>
                            Add a new internship domain for a company.
                            </DialogDescription>
                        </DialogHeader>
                        {/* Add domain form here */}
                        </DialogContent>
                    </Dialog>
                }
            />
            <main className="space-y-6 px-6 pt-6">
                <Tabs defaultValue="active" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="active">Active Domains</TabsTrigger>
                    <TabsTrigger value="inactive">Inactive Domains</TabsTrigger>
                </TabsList>
                <TabsContent value="active" className="space-y-4">
                    <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <Input
                        placeholder="Search domains..."
                        className="max-w-sm"
                        //   prefix={<Search className="h-4 w-4" />}
                        />
                    </div>
                    <Button variant="outline">Filter</Button>
                    </div>
        
                    <Card>
                    <CardContent className="pt-6">
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Domain</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Stipend</TableHead>
                            <TableHead>Applications</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {domains.map((domain) => (
                            <TableRow key={domain.id}>
                                <TableCell className="font-medium">
                                {domain.name}
                                </TableCell>
                                <TableCell>{domain.company}</TableCell>
                                <TableCell>
                                {domain.active ? (
                                    <Badge className="bg-green-100 text-green-800">
                                    Active
                                    </Badge>
                                ) : (
                                    <Badge variant="secondary">Inactive</Badge>
                                )}
                                </TableCell>
                                <TableCell>
                                {domain.stipend ? (
                                    <span>₦{domain.stipendAmount.toLocaleString()}</span>
                                ) : (
                                    'No'
                                )}
                                </TableCell>
                                <TableCell>
                                {domain.applications} / {domain.capacity}
                                </TableCell>
                                <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                    <DropdownMenuItem>Edit Domain</DropdownMenuItem>
                                    <DropdownMenuItem>Toggle Status</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">
                                        Delete Domain
                                    </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </CardContent>
                    </Card>
                </TabsContent>
                </Tabs>
            </main>
        </AdminLayout>
    );
  };