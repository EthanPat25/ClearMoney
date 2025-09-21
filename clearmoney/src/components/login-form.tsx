import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SwitchDemo } from "@/app/FHSS/Switch";
import { Tabs } from "@/components/ui/tabs";
import { PopoverPop } from "@/app/FHSS/Popover";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-[31.75rem] h-[42rem] relative flex flex-col">
        <CardHeader>
          <CardTitle className="text-2xl">FHSS Calculator</CardTitle>
          <CardDescription>
            Compare Voluntary Contributions to your Bank Acount vs Super
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative flex flex-col">
                <div className="relative">
                  {" "}
                  {/* Make input wrapper relative */}
                  <Label htmlFor="number">Salary</Label>
                  <Input
                    id="number"
                    type="number"
                    required
                    className="pl-6 h-10"
                  />{" "}
                  {/* Add padding for spacing */}
                  <div className="absolute bottom-0 pr-2 pl-2 left-2 flex items-center h-[40px]">
                    <p>$</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative">
                  {" "}
                  {/* Make input wrapper relative */}
                  <Label htmlFor="number">Duration</Label>
                  <Input
                    id="number"
                    type="number"
                    required
                    className="pl-6 h-10"
                  />{" "}
                  {/* Add padding for spacing */}
                </div>
              </div>

              <div className="relative">
                <div className="relative">
                  {" "}
                  {/* Make input wrapper relative */}
                  <Label htmlFor="number">Bank Savings Interest %</Label>
                  <Input
                    id="number"
                    type="number"
                    required
                    className="pl-6 h-10"
                  />{" "}
                  {/* Add padding for spacing */}
                </div>
              </div>

              <div className="relative">
                <div className="relative">
                  {" "}
                  {/* Make input wrapper relative */}
                  <Label htmlFor="number">Superannuation Return %</Label>
                  <Input
                    id="number"
                    type="number"
                    required
                    className="pl-6 h-10"
                  />{" "}
                  {/* Add padding for spacing */}
                </div>
              </div>

              <div className="relative col-span-2">
                <div className="relative">
                  {" "}
                  {/* Make input wrapper relative */}
                  <Label htmlFor="number">
                    Before Tax Contributions (Sacrifice)
                  </Label>
                  <Input
                    id="number"
                    type="number"
                    required
                    className="pl-6 h-10"
                  />{" "}
                  {/* Add padding for spacing */}
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

              <div className="relative col-span-2">
                {/*<SwitchDemo></SwitchDemo>*/}
              </div>

              <Button type="submit" className="w-full">
                Calculate
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
