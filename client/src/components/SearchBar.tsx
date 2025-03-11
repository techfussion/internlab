import React, { useState } from "react";
import { icons } from "../global/imageUtil";
import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const searchFormSchema = z.object({
  searchString: z.string().optional(),
  location: z.string().optional(),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

interface SearchBarProps {
  className?: string;
  buttonText?: string;
  stretch?: boolean;
  page: "placements" | "companies";
  onSearch?: (params: Record<string, string | string[]>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  className,
  buttonText,
  stretch,
  page,
  onSearch,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchString: queryParams.get("search") || "",
      location: queryParams.get("city") ? 
        `${queryParams.get("city")}, ${queryParams.get("state") || ""}`.trim() : 
        "",
    },
  });

  const buildSearchQuery = (values: SearchFormValues) => {
    const params = new URLSearchParams();
    
    if (values.searchString) {
      params.set("search", values.searchString);
    }
    
    if (values.location) {
      // Parse city and state from location string
      const locationParts = values.location.split(",").map(part => part.trim());
      if (locationParts.length > 0 && locationParts[0]) {
        params.set("city", locationParts[0]);
      }
      if (locationParts.length > 1 && locationParts[1]) {
        params.set("state", locationParts[1]);
      }
    }
    
    return params.toString();
  };

  // Handle form submission
  const onSubmit = (values: SearchFormValues) => {
    const queryString = buildSearchQuery(values);
    
    // Navigate to the appropriate page with search params
    navigate(`/${page}?${queryString}`);
    
    // Call the optional callback if provided
    if (onSearch) {
      const params: Record<string, string | string[]> = {};
      
      if (values.searchString) {
        params.search = values.searchString;
      }
      
      if (values.location) {
        const locationParts = values.location.split(",").map(part => part.trim());
        if (locationParts.length > 0 && locationParts[0]) {
          params.city = locationParts[0];
        }
        if (locationParts.length > 1 && locationParts[1]) {
          params.state = locationParts[1];
        }
      }
      
      onSearch(params);
    }
  };

  const getButtonText = () => {
    if (buttonText) return buttonText;
    return page === "placements" ? "Search for placement" : "Search for company";
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className={`flex justify-center gap-3 bg-white-500 p-2 ${
          stretch ? "w-[100%]" : "w-max"
        } text-xs ${className}`}
      >
        <FormField
          control={form.control}
          name="searchString"
          render={({ field }) => (
            <FormItem className="flex gap-3">
              <FormControl>
                <div className="flex items-center gap-2">
                  <img src={icons.search} alt="search" className="ml-2 w-3" />
                  <Input
                    {...field}
                    placeholder={page === "placements" ? "Company, title or keyword" : "Company name or industry"}
                    className={`${
                      stretch ? "w-[350px]" : "w-[200px]"
                    } border-t-0 border-x-0 rounded-none outline-none shadow-none outline-0 px-1 text-midnight_blue-500 bg-transparent`}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className={`flex ${stretch ? "w-[350px]" : "w-[200px]"} gap-3`}>
              <FormControl>
                <div className="flex items-center w-full gap-2">
                  <img src={icons.location} alt="location" className="w-3" />
                  <Input
                    {...field}
                    placeholder="City, State"
                    className="border-t-0 border-x-0 outline-none rounded-none shadow-none text-midnight_blue-500 opacity-90 outline-0 w-[90%] bg-transparent"
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="rounded-none bg-purple-500 hover:bg-purple-300 text-xs"
        >
          {getButtonText()}
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;