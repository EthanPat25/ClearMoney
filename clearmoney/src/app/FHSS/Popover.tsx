import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React from "react"

type PopoverPopProps = {
      Content: React.ComponentType
}

export function PopoverPop({ Content }: PopoverPopProps) {

    const [isopen,setopen] = React.useState(false);
  return (
    <Popover open = {isopen}>
      <PopoverTrigger asChild>
        <Content></Content>
      </PopoverTrigger>
      <PopoverContent className="w-80" side="bottom"
  align="center"
   sideOffset={50}
  >

        <div >Any extra money your employer contributes to your super before paying you.
This is voluntary, made in addition to the Super Guarantee (12%), and counts as a before-tax (concessional) contribution.</div>
        {/*Any money your employer puts into your super before they pay you - A Before Tax Contribution*/}
        {/*Any money you voluntarily add to super from your take-home pay - An After Tax contribution*/}
       
      </PopoverContent>
    </Popover>
  )
}
