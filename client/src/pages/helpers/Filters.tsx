import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"

export default function Filters() {
  return (
    <div className="w-64 flex-shrink-0">
      <Accordion type="multiple" defaultValue={["Industry Type", "Stipend"]}>
        <AccordionItem value="stipend">
          <AccordionTrigger className="text-xs">Stipend Option</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <FilterOption label="All" count="10" checked/>
              <FilterOption label="Stipend" count="4" />
              <FilterOption label="No Stipend" count="6" />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="industry-type">
          <AccordionTrigger className="text-xs">Industry Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <FilterOption label="All" count="12" checked />
              <FilterOption label="Technology" count="12"/>
              <FilterOption label="Finance & Banking" count="12" />
              <FilterOption label="Healthcare & Biotechnology" count="12" />
              <FilterOption label="Retail & E-commerce" count="12" />
              <FilterOption label="Manufacturing & Engineering" count="12" />
              <FilterOption label="Energy & Utilities" count="12" />
              <FilterOption label="Media & Entertainment" count="12" />
              <FilterOption label="Education & E-Learning" count="12" />
              <FilterOption label="Transport & Logistics" count="12" />
              <FilterOption label="Real Estate & Construction" count="12" />
              <FilterOption label="Agriculture & Food Industry" count="12" />
              <FilterOption label="Legal & Consulting" count="12" />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

function FilterOption({ label, count, checked = false }: { label: string; count: string; checked?: boolean }) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={label} checked={checked} color={checked ? "#12328f" : ""} />
      <label htmlFor={label} className="text-xs flex-1 cursor-pointer">
        {label}
      </label>
      <span className="text-xs text-gray-500">({count})</span>
    </div>
  )
}

