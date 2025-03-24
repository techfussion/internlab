"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import apiClient from "@/interceptor/axios.interceptor"
import { REACT_APP_API_BASE } from "@/global/constants"
import { DomainType, domainSchema } from "./Company-Form"
import { toast } from "@/hooks/use-toast"
interface DomainFormProps {
  domain?: DomainType
  onSave: (domain: DomainType) => void
}

export function DomainForm({ domain, onSave }: DomainFormProps) {
  const [isEditing] = useState(!!domain)

  const defaultValues: Partial<DomainType> = domain || {
    name: "",
    requirements: "",
    stipendAmount: "",
    perks: "",
  }

  const form = useForm<DomainType>({
    resolver: zodResolver(domainSchema),
    defaultValues,
  })

  async function onSubmit(data: DomainType) {
    const token = localStorage.getItem("token");
  
  if (!token) {
    toast?.({
      title: "Authentication Error",
      description: "You need to be logged in to submit",
      variant: "destructive",
    });
    return;
  }
 try {
    const response = await apiClient.post(
      `${REACT_APP_API_BASE}/domains`,
      {
        name: data.name,
        requirements: data.requirements,
         stipendAmount: data. stipendAmount,
        perks: Array.isArray(data.perks) ? data.perks : [],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
   
    console.log("domain created successfully:", response.data);

     toast({
        title: "success",
        description: "Domain created sucessfully",
         variant: "success",
      });
  } catch (error: any) {
    console.error("Error saving domain:", error.response?.data || error.message);
    
    if (error.response?.status === 403) {
      toast({
        title: "Permission Denied",
        description: "You do not have permission to create a domain. Contact admin.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save domain",
        variant: "destructive",
      });
    }
  }
    onSave(data)
   
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Domain" : "Add Domain"}</CardTitle>
        <CardDescription>Enter the details of the domain you want to {isEditing ? "update" : "add"}.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Frontend Development" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirements</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Experience with React, knowledge of TypeScript..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stipendAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stipend Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="$1000/month" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="perks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Perks</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mentorship, flexible hours, learning opportunities..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
           
            <Button type="submit">{isEditing ? "Update Domain" : "Save Domain"}</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

