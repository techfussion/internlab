import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"

export default function Filters() {
  return (
    <div className="w-64 flex-shrink-0">
      <Accordion type="multiple" defaultValue={["location", "salary"]}>

       

      <AccordionItem value="salary">
  <AccordionTrigger>Salary Range</AccordionTrigger>
  <AccordionContent>
    <div className="space-y-3">
      <FilterOption label="$700 - $1000" count="4" />
      <FilterOption label="$100 - $1500" count="6" />
      <FilterOption label="$1500 - $2000" count="10" />
      <FilterOption label="$3000 or above" count="4" checked />
    </div>
  </AccordionContent>
</AccordionItem>

<AccordionItem value="location">
  <AccordionTrigger>Location</AccordionTrigger>
  <AccordionContent>
    <div className="space-y-3">
      <FilterOption label="Lagos" count="12" />
      <FilterOption label="Abuja" count="8" />
      <FilterOption label="Port Harcourt" count="5" />
      <FilterOption label="Kano" count="3" />
      <FilterOption label="Enugu" count="7" />
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
      <Checkbox id={label} checked={checked} />
      <label htmlFor={label} className="text-sm flex-1 cursor-pointer">
        {label}
      </label>
      <span className="text-xs text-gray-500">({count})</span>
    </div>
  )
}

