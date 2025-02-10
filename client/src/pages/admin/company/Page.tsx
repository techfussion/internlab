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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdminLayout from '@/components/admin/Layout';
import { Header } from '@/components/admin/Header';

export const CompaniesManagement = () => {
  const [companies] = useState([
    {
      id: '1',
      name: 'TechCorp',
      location: 'Lagos, Nigeria',
      verified: true,
      domains: 3,
      reviews: 12,
      rating: 4.5,
    },
    // Add more mock data
  ]);

  return (
    <AdminLayout>
        <Header
            pageName='Companies'
            pageActions={
                <Dialog>
                <DialogTrigger asChild>
                    <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Company
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Add New Company</DialogTitle>
                    <DialogDescription>
                        Add a new company to the platform. Companies can be verified later.
                    </DialogDescription>
                    </DialogHeader>
                    {/* Add company form here */}
                </DialogContent>
                </Dialog>
            }
        />
        <main className="space-y-6 px-6 pt-6">
            <div className="flex items-center gap-4">
                <div className="flex-1">
                <Input
                    placeholder="Search companies..."
                    className="max-w-sm"
                    // prefix={<Search className="h-4 w-4" />}
                />
                </div>
                <Button variant="outline">Filter</Button>
            </div>

            <Card>
                <CardHeader>
                <CardTitle>All Companies</CardTitle>
                <CardDescription>
                    A list of all companies registered on the platform.
                </CardDescription>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Domains</TableHead>
                        <TableHead>Reviews</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {companies.map((company) => (
                        <TableRow key={company.id}>
                        <TableCell className="font-medium">{company.name}</TableCell>
                        <TableCell>{company.location}</TableCell>
                        <TableCell>
                            {company.verified ? (
                            <Badge className="bg-green-100 text-green-800">
                                Verified
                            </Badge>
                            ) : (
                            <Badge variant="secondary">Unverified</Badge>
                            )}
                        </TableCell>
                        <TableCell>{company.domains}</TableCell>
                        <TableCell>{company.reviews}</TableCell>
                        <TableCell>{company.rating}</TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Company</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                Delete Company
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
        </main>
    </AdminLayout>
  );
};