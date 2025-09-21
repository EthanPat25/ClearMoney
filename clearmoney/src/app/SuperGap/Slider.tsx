import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import React from "react";

type SliderProps = React.ComponentProps<typeof Slider>;

export function Slide({ className, ...props }: SliderProps) {
  const [value, setValue] = React.useState([50]);

  // In real use, pass salary down via props or context instead of hardcoding.
  const hardcodedSalary = 70000;

  const dollarAmount = Math.round((hardcodedSalary * value[0]) / 100);

  return (
    <div className={cn("w-full flex flex-col", className)}>
      <Slider
        value={value}
        onValueChange={setValue}
        max={100}
        step={1}
        className="w-full"
        {...props}
      />

      {/* Show % and $ clearly tied together */}
      <div className="flex justify-between font-medium mt-4">
        <span>{value[0]}% of full-time</span>
        <span>≈ ${dollarAmount.toLocaleString()}/year</span>
      </div>
    </div>
  );
}
