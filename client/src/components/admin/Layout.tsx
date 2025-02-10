import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  FileText,
  ClipboardCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Companies', href: '/admin/companies', icon: Building2 },
  { name: 'Domains', href: '/admin/domains', icon: FileText },
  { name: 'Submissions', href: '/admin/submissions', icon: ClipboardCheck },
]

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> =({ children }) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r">
        <div className="flex items-center justify-center h-16 px-4">
          <span className="text-xl font-bold font-serif text-indigo-600">InternLab</span>
        </div>
        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Button
                key={item.name}
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => navigate(item.href)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            )
          })}
        </nav>
      </aside>

      <div className="pl-64">
        {children}
      </div>
    </div>
  )
}

export default AdminLayout