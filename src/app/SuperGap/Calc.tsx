import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SwitchDemo } from "@/app/FHSS/Switch"

export function Calc({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Super Gap Calculator</CardTitle>
          <CardDescription>
            Learn How Time from Work Affects your Super
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
            <div className="relative flex flex-col">
                <div className="relative"> {/* Make input wrapper relative */}
                  <Label htmlFor="number">Salary</Label>
                  <Input id="number" type="number" required className="pl-6 h-10" /> {/* Add padding for spacing */}
                  <div className="absolute bottom-0 pr-2 pl-2 left-2 flex items-center h-[40px]">
                    <p>$</p>
                  </div>
                </div>
              </div>

              <div className="relative flex flex-col">
                <div className="relative"> {/* Make input wrapper relative */}
                  <Label htmlFor="number">How old are you?</Label>
                  <Input id="number" type="number" required className="pl-6 h-10" /> {/* Add padding for spacing */} 
                </div>
              </div>

              <div className="relative flex flex-col">
                <div className="relative"> {/* Make input wrapper relative */}
                  <Label htmlFor="number">What age do you intend to retire?</Label>
                  <Input id="number" type="number" required className="pl-6 h-10" /> {/* Add padding for spacing */} 
                </div>
              </div>



              <div className="relative flex flex-col">
                <div className="relative"> {/* Make input wrapper relative */}
                  <Label htmlFor="number">Time From Work? </Label>
                  <Input id="number" type="number" required className="pl-6 h-10" /> {/* Add padding for spacing */} 
                </div>
              </div>

              <div className="relative flex flex-col">
                <div className="relative"> {/* Make input wrapper relative */}
                  <Label htmlFor="number">When Do you intend to take this time?</Label>
                  <Input id="number" type="number" required className="pl-6 h-10" /> {/* Add padding for spacing */} 
                </div>
              </div>


              <div className="relative flex flex-col">
                <div className="relative"> {/* Make input wrapper relative */}
                  <Label htmlFor="number">Superannuation SG %</Label>
                  <Input id="number" type="number" required className="pl-6 h-10" /> {/* Add padding for spacing */} 
                </div>
              </div>

              <div className="relative flex flex-col">
                <div className="relative"> {/* Make input wrapper relative */}
                  <Label htmlFor="number">Superannuation Return %</Label>
                  <Input id="number" type="number" required className="pl-6 h-10" /> {/* Add padding for spacing */} 
                </div>
              </div>

              <div className="relative flex flex-col">
                <div className="relative"> {/* Make input wrapper relative */}
                  <Label htmlFor="number">Inflation %</Label>
                  <Input id="number" type="number" required className="pl-6 h-10" /> {/* Add padding for spacing */} 
                </div>
              </div>


              <div className="relative flex flex-col">
                <div className="relative"> {/* Make input wrapper relative */}
                  <Label htmlFor="number">Voluntary After-Tax Contributions</Label>
                  <Input id="number" type="number" required className="pl-6 h-10" /> {/* Add padding for spacing */}
                  <div className="absolute bottom-0 left-2 pr-2 pl-2 flex items-center h-[40px]">
                    <p>$</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-evenly  mr-12">
                  <Button className="rounded-3xl">Weekly</Button>
                  <Button className="rounded-3xl">Monthly</Button>
                  <Button className="rounded-3xl">Annually</Button>
                </div>

                <Button type="submit" className="w-full">
                Calculate
              </Button>


              </div>

          
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
