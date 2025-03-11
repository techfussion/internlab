import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger
} from "@/components/ui/accordion";

import { Checkbox } from "@/components/ui/checkbox";

// Industry types constants
const INDUSTRY_TYPES = [
  "Technology",
  "Finance & Banking",
  "Healthcare & Biotechnology",
  "Retail & E-commerce",
  "Manufacturing & Engineering",
  "Energy & Utilities",
  "Media & Entertainment",
  "Education & E-Learning",
  "Transport & Logistics",
  "Real Estate & Construction",
  "Agriculture & Food Industry",
  "Legal & Consulting",
];

interface FiltersProps {
  page: "placements" | "companies";
  onFilterChange?: (filters: Record<string, any>) => void;
  counts?: {
    total: number;
    stipendCounts?: { withStipend: number; withoutStipend: number };
    activeCounts?: { active: number; inactive: number };
    verifiedCounts?: { verified: number; unverified: number };
    industryTypeCounts?: Record<string, number>;
  };
}

export default function Filters({ page, onFilterChange, counts = { total: 0 } }: FiltersProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  // Initialize state based on URL parameters
  const [stipendFilter, setStipendFilter] = useState<string | null>(
    queryParams.get("stipend") || "all"
  );
  const [activeFilter, setActiveFilter] = useState<boolean | null>(
    queryParams.has("active") ? queryParams.get("active") === "true" : null
  );
  const [verifiedFilter, setVerifiedFilter] = useState<boolean | null>(
    queryParams.has("verified") ? queryParams.get("verified") === "true" : null
  );
  const [selectedIndustryTypes, setSelectedIndustryTypes] = useState<string[]>(
    queryParams.get("industryType")?.split(",") || []
  );

  // Apply filters to URL and trigger callback
  const applyFilters = () => {
    const currentParams = new URLSearchParams(location.search);
    
    // Handle stipend filter
    if (stipendFilter === "all") {
      currentParams.delete("stipend");
    } else {
      if (stipendFilter !== null) {
        currentParams.set("stipend", stipendFilter);
      }
    }
    
    // Handle active filter
    if (activeFilter === null) {
      currentParams.delete("active");
    } else {
      currentParams.set("active", String(activeFilter));
    }
    
    // Handle verified filter
    if (verifiedFilter === null) {
      currentParams.delete("verified");
    } else {
      currentParams.set("verified", String(verifiedFilter));
    }
    
    // Handle industry types
    if (selectedIndustryTypes.length === 0) {
      currentParams.delete("industryType");
    } else {
      currentParams.set("industryType", selectedIndustryTypes.join(","));
    }
    
    // Update URL
    navigate({ search: currentParams.toString() });
    
    // Call the callback if provided
    if (onFilterChange) {
      onFilterChange({
        stipend: stipendFilter !== "all" ? stipendFilter : null,
        active: activeFilter,
        verified: verifiedFilter,
        industryType: selectedIndustryTypes.length > 0 ? selectedIndustryTypes : null,
      });
    }
  };

  // Apply filters when they change
  useEffect(() => {
    applyFilters();
  }, [stipendFilter, activeFilter, verifiedFilter, selectedIndustryTypes]);

  // Handle stipend filter change
  const handleStipendChange = (value: string) => {
    setStipendFilter(value === "all" ? "all" : value);
  };

  // Handle active filter change
  const handleActiveChange = (value: string) => {
    if (value === "all") {
      setActiveFilter(null);
    } else {
      setActiveFilter(value === "Active");
    }
  };

  // Handle verified filter change
  const handleVerifiedChange = (value: string) => {
    if (value === "all") {
      setVerifiedFilter(null);
    } else {
      setVerifiedFilter(value === "verified");
    }
  };

  // Handle industry type filter change
  const handleIndustryTypeChange = (type: string, isChecked: boolean) => {
    if (type === "All") {
      setSelectedIndustryTypes([]);
    } else {
      if (isChecked) {
        setSelectedIndustryTypes(prev => [...prev, type]);
      } else {
        setSelectedIndustryTypes(prev => prev.filter(t => t !== type));
      }
    }
  };

  // Check if "All" should be checked for industry types
  const isAllIndustryTypesSelected = selectedIndustryTypes.length === 0;

  return (
    <div className="w-64 flex-shrink-0">
      <Accordion 
        type="multiple" 
        defaultValue={["stipend", "active-status", "verified", "industry-type"]}
      >
        {page === "placements" && (
          <AccordionItem value="stipend">
            <AccordionTrigger className="text-xs">Stipend Option</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <FilterOption 
                  label="All" 
                  count={String(counts.total || 0)} 
                  checked={stipendFilter === "all"}
                  onChange={() => handleStipendChange("all")}
                />
                <FilterOption 
                  label="Stipend" 
                  count={String(counts.stipendCounts?.withStipend || 0)} 
                  checked={stipendFilter === "true"}
                  onChange={() => handleStipendChange("true")}
                />
                <FilterOption 
                  label="No Stipend" 
                  count={String(counts.stipendCounts?.withoutStipend || 0)} 
                  checked={stipendFilter === "false"}
                  onChange={() => handleStipendChange("false")}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {page === "placements" && (
          <AccordionItem value="active-status">
            <AccordionTrigger className="text-xs">Active</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <FilterOption 
                  label="All" 
                  count={String(counts.total || 0)} 
                  checked={activeFilter === null}
                  onChange={() => handleActiveChange("all")}
                />
                <FilterOption 
                  label="Active" 
                  count={String(counts.activeCounts?.active || 0)} 
                  checked={activeFilter === true}
                  onChange={() => handleActiveChange("Active")}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {page === "companies" && (
          <AccordionItem value="verified">
            <AccordionTrigger className="text-xs">Verified</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <FilterOption 
                  label="All" 
                  count={String(counts.total || 0)} 
                  checked={verifiedFilter === null}
                  onChange={() => handleVerifiedChange("all")}
                />
                <FilterOption 
                  label="verified" 
                  count={String(counts.verifiedCounts?.verified || 0)} 
                  checked={verifiedFilter === true}
                  onChange={() => handleVerifiedChange("verified")}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {page === "companies" && (
          <AccordionItem value="industry-type">
            <AccordionTrigger className="text-xs">Industry Type</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <FilterOption 
                  label="All" 
                  count={String(counts.total || 0)} 
                  checked={isAllIndustryTypesSelected}
                  onChange={(checked) => handleIndustryTypeChange("All", checked)}
                />
                {INDUSTRY_TYPES.map(type => (
                  <FilterOption 
                    key={type}
                    label={type} 
                    count={String(counts.industryTypeCounts?.[type] || 0)}
                    checked={selectedIndustryTypes.includes(type)}
                    onChange={(checked) => handleIndustryTypeChange(type, checked)}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
}

interface FilterOptionProps {
  label: string;
  count: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

function FilterOption({ label, count, checked = false, onChange }: FilterOptionProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id={label} 
        checked={checked} 
        onCheckedChange={onChange}
      />
      <label htmlFor={label} className="text-xs flex-1 cursor-pointer">
        {label}
      </label>
      <span className="text-xs text-gray-500">({count})</span>
    </div>
  );
}