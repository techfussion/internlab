"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { type DomainType, domainSchema } from "./company-form"

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

  function onSubmit(data: DomainType) {
    onSave(data)
    form.reset(defaultValues)
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
            <Button type="button" variant="outline" onClick={() => form.reset(defaultValues)}>
              Reset
            </Button>
            <Button type="submit">{isEditing ? "Update Domain" : "Save Domain"}</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

