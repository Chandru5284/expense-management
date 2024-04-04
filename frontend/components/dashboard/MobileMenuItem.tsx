// import React from 'react'
// import Link from 'next/link';

// // import components
// import { Button } from "@/components/ui/button"
// import {
//     Tooltip,
//     TooltipContent,
//     TooltipProvider,
//     TooltipTrigger,
// } from "@/components/ui/tooltip"

// interface Props {
//     item: any;
// }

// const MobileMenuItem = (props: Props) => {

//     const { item } = props

//     return (
//         <ul className="space-y-5 text-sm">
//             {item && item.map((row: any, index: any) => (
//                 <li className="" key={index}>
//                     <TooltipProvider>
//                         <Tooltip>
//                             <TooltipTrigger asChild>
//                                 <Button  asChild className={`rounded-full  h-16 w-16 hover:bg-[#735DA5] hover:text-white  ${row.hoverName == "Dashboard" ? "bg-[#735DA5]" : "bg-[#D3C5E5] text-black/60"}`}>
//                                     <Link href={row.href}>
//                                         {React.createElement(row.icon, { className: 'w-8 h-8' })}
//                                     </Link>
//                                 </Button>
//                             </TooltipTrigger>
//                             <TooltipContent side="right" sideOffset={20}>
//                                 <p>{row.hoverName}</p>
//                             </TooltipContent>
//                         </Tooltip>
//                     </TooltipProvider>
//                 </li>
//             ))}
            
//         </ul>
//     )
// }

// export default MobileMenuItem
