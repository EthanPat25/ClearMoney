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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Plus from "./Plus";
import { Slide } from "./Slider";
import Settings from "./Settings";

export function Calc({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="w-[31.5rem] relative flex flex-col">
          <Settings
            onClick={() => console.log("hello")}
            className={
              "absolute top-[1rem] left-[29.25rem] h-6 w-6 cursor-pointer"
            }
          ></Settings>
          <CardHeader>
            <CardTitle className="text-2xl">Super Gap Calculator</CardTitle>
            <CardDescription>
              Learn how breaks or reduced hours affect your super
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <form className="h-[34rem] flex flex-col justify-between">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Salary */}

                <div>
                  <Label htmlFor="age" className="block min-h-[1.5rem]">
                    Your Age (min: 18)
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    required
                    placeholder="23"
                    className="h-10"
                  />
                </div>

                {/* Retirement Age */}
                <div>
                  <Label htmlFor="retire" className="block min-h-[1.5rem]">
                    Desired Retirement Age (min: 60)
                  </Label>
                  <Input
                    id="retire"
                    type="number"
                    required
                    placeholder="65"
                    className="h-10"
                  />
                </div>
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
                  <Label htmlFor="sg" className="block min-h-[1.5rem]">
                    Super SG %
                  </Label>
                  <Input
                    id="sg"
                    type="number"
                    required
                    defaultValue={11.5}
                    placeholder="11.5"
                    className="pr-10 h-10"
                  />
                  <div className="absolute bottom-0 right-2 flex items-center h-[40px]">
                    <p>%</p>
                  </div>
                </div>

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
                <div className="relative">
                  <Label htmlFor="return" className="block min-h-[1.5rem]">
                    Super Return %
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
                    <p>%</p>
                  </div>
                </div>
                {/* Inflation % */}

                <div className="w-full col-span-2">
                  <Accordion type="single" collapsible className="w-full pt-0">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className={"pt-[1rem] pb-[1rem]"}>
                        {" "}
                        <span className="flex items-center gap-2">
                          <Plus className="w-4 h-4 hover:scale-125" />
                          Periods of Reduced or No Work
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3">
                          <div className="">
                            <Label
                              htmlFor="whenOff"
                              className="block min-h-[1.5rem]"
                            >
                              Start
                            </Label>
                            <Input
                              id="whenOff"
                              type="month"
                              required
                              placeholder=""
                              className="h-10"
                            />
                          </div>

                          {/* Time Off (months) */}
                          <div>
                            <Label
                              htmlFor="timeOff"
                              className="block min-h-[1.5rem]"
                            >
                              End
                            </Label>
                            <Input
                              id="timeOff"
                              type="month"
                              required
                              placeholder=""
                              className="h-10"
                            />
                          </div>
                          <div className="col-span-2 flex items-center">
                            <Label
                              htmlFor="timeOff"
                              className="block min-h-[1.5rem] mr-3"
                            >
                              Percentage of Income
                            </Label>
                            <Slide className="mr-3"></Slide>
                            <h1>0%</h1>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className={"pt-[1rem] pb-[1rem]"}>
                        {" "}
                        <span className="flex items-center gap-2">
                          <Plus className="w-4 h-4 hover:scale-125" />
                          Do You Make Voluntary Contributions?
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col">
                          {/* Voluntary Contributions */}
                          <div className="relative">
                            <Label
                              htmlFor="voluntary"
                              className="block min-h-[1.5rem]"
                            >
                              Voluntary After-Tax Contributions
                            </Label>
                            <Input
                              id="voluntary"
                              type="number"
                              defaultValue={0}
                              required
                              placeholder="0"
                              className="pl-6 h-10"
                            />
                            <div className="absolute bottom-0 left-2 flex items-center h-[40px]">
                              <p>$</p>
                            </div>
                          </div>

                          {/* Frequency Buttons */}
                          <div className="flex justify-start mt-6">
                            <Button className="rounded-3xl mr-6">Weekly</Button>
                            <Button className="rounded-3xl mr-6">
                              Monthly
                            </Button>
                            <Button className="rounded-3xl">Annually</Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
              <div className="w-full justify-center items-center">
                {/* Submit Button */}
                <Button type="submit" className="w-full">
                  Calculate
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
