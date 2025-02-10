import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bell } from 'lucide-react'
import { Button } from '../ui/button'

interface HeaderProps {
    pageName?: string,
    pageActions?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ pageName, pageActions}) => {
    return(
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
            <h1 className='text-lg font-semibold'>{pageName}</h1>
            {
                pageActions ?
                pageActions :
                    <div className="flex items-center justify-end h-full space-x-4">
                        <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                        </Button>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.png" alt="Admin" />
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-max bg-white-500" align="end">
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
            }
        </header>
    )
}