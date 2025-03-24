"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Import, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { DomainForm } from "./Domain-Form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { REACT_APP_API_BASE } from "@/global/constants"
import apiClient from "@/interceptor/axios.interceptor" 


// Define the company schema
const companyFormSchema = z.object({
  name: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  industryType: z.string({
    required_error: "Please select an industry type.",
  }),
  techStacks: z.string().min(2, {
    message: "Tech stacks must be at least 2 characters.",
  }),
  perks: z.string().min(2, {
    message: "Perks must be at least 2 characters.",
  }),
  companySize: z.string({
    required_error: "Please select a company size.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
})

// Define the domain schema
export const domainSchema = z.object({
  name: z.string().min(2, {
    message: "Domain name must be at least 2 characters.",
  }),
  requirements: z.string().min(10, {
    message: "Requirements must be at least 10 characters.",
  }),
  stipendAmount: z.string().min(1, {
    message: "Stipend amount is required.",
  }),
  perks: z.string().min(2, {
    message: "Perks must be at least 2 characters.",
  }),
})

export type DomainType = z.infer<typeof domainSchema>

type CompanyFormValues = z.infer<typeof companyFormSchema>

// This simulates a saved company for editing purposes
const defaultValues: Partial<CompanyFormValues> = {
  name: "",
  description: "",
  industryType: "",
  techStacks: "",
  perks: "",
  companySize: "",
  city: "",
  state: "",
  country: "",
}

export function CompanyForm() {
  const [domains, setDomains] = useState<DomainType[]>([])
  const [editingCompany, setEditingCompany] = useState(false)
  const [activeTab, setActiveTab] = useState("company")

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues,
  })

async function onSubmit(data: CompanyFormValues) {
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
    
    // Step 1: Proceed with company creation if the user doesn't have one
    const response = await apiClient.post(
      `${REACT_APP_API_BASE}/companies`,
      {
        name: data.name,
        city: data.city,
        state: data.state,
        country: data.country,
        industryType: data.industryType,
        companySize: data.companySize,
        techStacks: Array.isArray(data.techStacks) ? data.techStacks : [],
        perks: Array.isArray(data.perks) ? data.perks : [],
        domains: domains || [],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Company created successfully:", response.data);
    toast({
      title: "Success",
      description: "Company added successfully!",
      variant: "success",
    });
  } catch (error: any) {
    console.error("Error saving company:", error.response?.data || error.message);

    if (error.response?.status === 403) {
      toast({
        title: "Permission Denied",
        description: "You do not have permission to create a company. Contact admin.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save company",
        variant: "destructive",
      });
    }
  }
}




  function addDomain(domain: DomainType) {
    setDomains([...domains, domain])
    setActiveTab("company")
    toast({
      title: "Domain Added",
      description: `Successfully added domain: ${domain.name}`,
    })
  }

  // function updateDomain(index: number, updatedDomain: DomainType) {
  //   const updatedDomains = [...domains]
  //   updatedDomains[index] = updatedDomain
  //   setDomains(updatedDomains)
  //   setActiveTab("company")
  //   toast({
  //     title: "Domain Updated",
  //     description: `Successfully updated domain: ${updatedDomain.name}`,
  //   })
  // }

  // function removeDomain(index: number) {
  //   const updatedDomains = domains.filter((_, i) => i !== index)
  //   setDomains(updatedDomains)
  //   toast({
  //     title: "Domain Removed",
  //     description: "Domain has been removed successfully",
  //   })
  // }

  return (
    <div className="space-y-6 ">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 bg-gray-50">
          <TabsTrigger value="company">Company Information</TabsTrigger>
          <TabsTrigger value="domains">Domains</TabsTrigger>
        </TabsList>
        <TabsContent value="company" className="bg-gray-50">
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle>{editingCompany ? "Edit Company" : "Add Company"}</CardTitle>
              <CardDescription>
                Enter the details of the company you want to {editingCompany ? "update" : "add"}.
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4 ">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Acme Inc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="industryType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industry Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select industry type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="technology">Technology</SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                              <SelectItem value="healthcare">Healthcare</SelectItem>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="retail">Retail</SelectItem>
                              <SelectItem value="manufacturing">Manufacturing</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe the company..." className="min-h-[100px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="techStacks"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tech Stacks</FormLabel>
                          <FormControl>
                            <Input placeholder="React, Node.js, MongoDB..." {...field} />
                          </FormControl>
                          <FormDescription>Comma separated list of technologies</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="companySize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Size</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select company size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1-10">1-10 employees</SelectItem>
                              <SelectItem value="11-50">11-50 employees</SelectItem>
                              <SelectItem value="51-200">51-200 employees</SelectItem>
                              <SelectItem value="201-500">201-500 employees</SelectItem>
                              <SelectItem value="501-1000">501-1000 employees</SelectItem>
                              <SelectItem value="1000+">1000+ employees</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="perks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Perks</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Remote work, flexible hours, health insurance..."
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="San Francisco" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="California" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="United States" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("domains")}>
                    <Plus className="mr-2 h-4 w-4" /> Add Domain
                  </Button>
                  <Button type="submit">{editingCompany ? "Update Company" : "Save Company"}</Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </TabsContent>
        <TabsContent value="domains">
          <DomainForm onSave={addDomain} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

