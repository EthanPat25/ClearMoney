import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDemo() {
  const [timing, setTiming] = React.useState("spread")

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">Contribution Timing</label>
      <Select value={timing} onValueChange={setTiming}>
        <SelectTrigger className="">
          <SelectValue placeholder="Choose timing" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="before">Before Time Off</SelectItem>
            <SelectItem value="during">During Time Off</SelectItem>
            <SelectItem value="after">After Time Off</SelectItem>
            <SelectItem value="spread">Spread Evenly</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
