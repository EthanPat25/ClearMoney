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

export function CloseGapCalculator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-[31.5rem] h-[30rem]">
        <CardHeader>
          <CardTitle className="text-2xl">Close The Gap</CardTitle>
          <CardDescription>
            Learn how breaks or reduced hours affect your super
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="h-[34rem]">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <div className="relative">
                <Label htmlFor="salary" className="block min-h-[1.5rem]">
                  Salary
                </Label>
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

              {/* Super SG % */}

              <div className="relative">
                <Label htmlFor="return" className="block min-h-[1.5rem]">
                  Current Super Balance
                </Label>
                <Input
                  id="return"
                  type="number"
                  required
                  defaultValue={7.5}
                  placeholder="7.5"
                  className="pr-10 h-10"
                />
                <div className="absolute bottom-0 right-2 flex items-center h-[40px]">
                  <p>$</p>
                </div>
              </div>

              {/* Super Return % */}

              {/* Inflation % */}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full mt-32">
              Calculate
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
