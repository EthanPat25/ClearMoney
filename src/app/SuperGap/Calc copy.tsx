import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SelectDemo } from "./Select"

export function MitigationCalc({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [contributionTiming, setContributionTiming] = useState("spread")
  const [voluntaryAmount, setVoluntaryAmount] = useState("")
  const [frequency, setFrequency] = useState("weekly")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Example logic hook — this is where you'd calculate the effect
    console.log("Timing:", contributionTiming)
    console.log("Amount:", voluntaryAmount)
    console.log("Frequency:", frequency)

    if (contributionTiming === "before") {
      console.log("You’ll need to contribute this amount until your leave starts.")
    } else if (contributionTiming === "during") {
      console.log("This will reduce your gap based on contributions during leave.")
    } else if (contributionTiming === "after") {
      console.log("We’ll calculate how long it takes to recover your gap post-leave.")
    } else if (contributionTiming === "spread") {
      console.log("We’ll spread contributions over time and show the impact.")
    }
  }

  // 🧠 Helper message to display beneath amount input
  const getContributionMessage = () => {
    switch (contributionTiming) {
      case "before":
        return "This amount will be contributed each week until your time off begins."
      case "during":
        return "This amount will be contributed weekly while you’re off work."
      case "after":
        return "This amount will be contributed weekly after you return to work."
      case "spread":
        return "This amount will be contributed weekly until retirement."
      default:
        return ""
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent>
        <CardTitle className="text-2xl pt-4">Close the Gap</CardTitle>
          <CardDescription className="pt-1">
         See How Voluntary Contributions can help reduce your super gap
          </CardDescription>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 pt-6">
     

            {/* Contribution Timing Selector */}
            <SelectDemo
            />

            {/* Voluntary Amount */}
            <div className="relative">
                <Label htmlFor="salary" className="block min-h-[1.5rem]">Voluntary Contributions</Label>
                <Input
                  id="salary"
                  type="number"
                  required
                  placeholder="70000"
                  className="pl-6 h-10"
                />
                <div className="absolute bottom-0 left-2 flex items-center h-[40px]">
                  <p>$</p>
                </div>
              </div>

        
            {/* Frequency Buttons */}
            <div className="flex gap-4 mt-2">
              <Button
                type="button"
                variant={frequency === "weekly" ? "default" : "outline"}
                onClick={() => setFrequency("weekly")}
              >
                Weekly
              </Button>
              <Button
                type="button"
                variant={frequency === "monthly" ? "default" : "outline"}
                onClick={() => setFrequency("monthly")}
              >
                Monthly
              </Button>
              <Button
                type="button"
                variant={frequency === "annually" ? "default" : "outline"}
                onClick={() => setFrequency("annually")}
              >
                Annually
              </Button>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full mt-4">
              See the Impact
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
