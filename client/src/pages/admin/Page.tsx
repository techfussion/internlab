import { Header } from '@/components/admin/Header'
import AdminLayout from '@/components/admin/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import React from 'react'

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Registered Users', value: '1,234' },
    { label: 'Companies', value: '56' },
    { label: 'Active Domains', value: '89' },
    { label: 'Pending Submissions', value: '12' },
  ]

  return (
    <AdminLayout>
        <Header pageName='Dashboard' />
        <main className="space-y-6 px-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                <Card key={stat.label}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                        {stat.label}
                    </CardTitle>
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                <CardTitle>Recent Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Submitted By</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {/* Add table rows here */}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </main>
    </AdminLayout>
    
  )
}

export default AdminDashboard;