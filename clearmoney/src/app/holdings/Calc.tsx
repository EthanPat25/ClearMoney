import React from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form";

enum SuperFund {
  AustralianSuper = "AustralianSuper",
  REST = "Rest",
}

enum AustralianSuperOptions {
  Balanced = "Balanced",
  HighGrowth = "High Growth",
  Conservative = "Conservative Balanced",
}

enum RestOptions {
  CoreStrategy = "Core Strategy",
  Balanced = "Balanced",
}

const fundOptions = {
  AustralianSuper: ["Balanced", "Conservative Balanced", "High Growth"],
  Rest: ["Balanced", "Growth", "High Growth", "Sustainable Growth"], // match enum value exactly
};

export type Inputs = {
  superBalance: number;
  superFund: SuperFund;
  options: AustralianSuperOptions | RestOptions;
};

type CalcProps = {
  onResults?: (data: any) => void; // parent callback
};

export const Calc = React.forwardRef<
  HTMLDivElement,
  CalcProps & React.ComponentPropsWithoutRef<"div">
>(({ className, onResults, ...props }, ref) => {
  const { register, handleSubmit, control } = useForm<Inputs>();

  const selectedFund = useWatch({
    control,
    name: "superFund",
  });

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    const params = new URLSearchParams({
      fund: values.superFund,
      option: values.options,
    });

    const data = await fetch_holdings(params);

    if (onResults) {
      onResults({
        holdingsData: data,
        balance: values.superBalance, // <-- this is from hook-form
      });
    }
  };

  const fetch_holdings = async (params: URLSearchParams) => {
    const res = await fetch(`/api/holdings?${params.toString()}`, {
      method: "GET",
    });
    if (!res.ok) throw new Error(`Failed to fetch holdings: ${res.status}`);
    return res.json();
  };

  return (
    <div ref={ref} className={cn("flex flex-col gap-4", className)} {...props}>
      <Card className=" xs:w-[24rem] md:w-[35rem] relative flex flex-col">
        {/* Settings */}

        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Enter Your Details
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Tell us your super balance and fund to see where your money goes.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1">
          <form
            className="h-[20rem] flex flex-col justify-between"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
              {/* Super Balance */}
              <div className="space-y-1">
                <Label
                  htmlFor="balance"
                  className="text-sm font-medium text-gray-900"
                >
                  Your Super Balance
                </Label>
                <div className="relative">
                  <Input
                    id="balance"
                    type="number"
                    required
                    placeholder="10,000"
                    className="pl-[1.3rem] h-10 text-sm font-normal text-gray-900 placeholder:text-gray-400"
                    {...register("superBalance", { required: true })}
                  />
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm">
                    $
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="sg"
                  className="text-sm font-medium text-gray-900"
                >
                  Your Super Fund
                </Label>
                <div className="relative">
                  <Controller
                    name="superFund"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="e.g. AustralianSuper" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={SuperFund.AustralianSuper}>
                            AustralianSuper
                          </SelectItem>
                          <SelectItem value={SuperFund.REST}>
                            Rest Super
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="sg"
                  className="text-sm font-medium text-gray-900"
                >
                  Your Investment Option
                </Label>
                <div className="relative">
                  <Controller
                    name="options"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="pr-8 h-10 text-sm font-normal text-gray-900 placeholder:text-gray-400">
                          <SelectValue placeholder="e.g High Growth" />
                        </SelectTrigger>
                        <SelectContent>
                          {(
                            fundOptions[
                              selectedFund as keyof typeof fundOptions
                            ] || []
                          ).map((optionName) => (
                            <SelectItem key={optionName} value={optionName}>
                              {optionName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Calculate
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
});

Calc.displayName = "Calc";
