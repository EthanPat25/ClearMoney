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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
         <Tabs defaultValue="account" className="">
         <TabsList className="grid w-full grid-cols-2 h-12 mb-4">
  <TabsTrigger value="account" className="py-2 text-sm font-semibold">Before Tax (Salary Sacrifice)</TabsTrigger>
  <TabsTrigger value="password" className="py-2 text-sm">After Tax (Notice of Intent)</TabsTrigger>
</TabsList>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">FHSS Calculator</CardTitle>
          <CardDescription>
            Compare Voluntary Contributions to your Bank Acount vs Super
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
                  <Label htmlFor="number">Duration</Label>
                  <Input id="number" type="number" required className="pl-6 h-10" /> {/* Add padding for spacing */} 
                </div>
              </div>


              <div className="relative flex flex-col">
                <div className="relative"> {/* Make input wrapper relative */}
                  <Label htmlFor="number">Bank Savings Rate %</Label>
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

                <SwitchDemo></SwitchDemo>

                <Button type="submit" className="w-full">
                Calculate
              </Button>


              </div>

          
          </form>
        </CardContent>
      </Card>
      </Tabs>
    </div>
  )
}
