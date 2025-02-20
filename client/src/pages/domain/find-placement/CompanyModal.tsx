// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// type CompanyModalProps = {
//   isOpen: boolean
//   onClose: () => void
//   company: {
//     title: string
//     company: string
//     location: string
//     description?: string
//     logo?: string
//     type: string
//     tags: string[]
//   } | null
// }

// export function CompanyModal({ isOpen, onClose, company }: CompanyModalProps) {
//   if (!company) return null

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-2xl">
//         <DialogHeader>
//           <div className="flex items-center gap-4">
//             <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
//               <img src={company.logo || "/placeholder.svg"} alt={company.company} className="w-10 h-10" />
//             </div>
//             <div>
//               <DialogTitle className="text-xl mb-2 text-white-900">{company.title}</DialogTitle>
//               <DialogDescription className="text-white-900">
//                 {company.company} • {company.location}
//               </DialogDescription>
//             </div>
//           </div>
//         </DialogHeader>
//         <div className="mt-4">
//           <div className="flex gap-2 mb-4">
//             <span className="px-3 py-1 bg-blue-50 text-sm rounded-full ">{company.type}</span>
//             {company.tags.map((tag) => (
//               <span key={tag} className="px-3 py-1 border text-white rounded-full text-white-900 text-sm">
//                 {tag}
//               </span>
//             ))}
//           </div>
//           <div className="space-y-4">
//             <p className=" text-white-900">
//               {company.description ||
//                 "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
//             </p>
           
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

