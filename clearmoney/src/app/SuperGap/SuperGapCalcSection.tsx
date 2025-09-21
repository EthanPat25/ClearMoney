import React from "react";
import { Calc } from "./Calc";
import { Button } from "@/components/ui/button";
import Info from "../FHSS/Info";
import Breakdown from "./Breakdown";
import InsightCard from "./InsightCard";

import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";
import { Popover } from "@/components/ui/popover";

const SuperGapCalcSection = () => {
  const [inflation, setInflation] = React.useState(true);

  return (
    <div className="flex mt-20 justify-evenly flex-wrap">
      <div className="flex justify-center">
        <div className="w-[30rem]">
          <Calc />
        </div>
      </div>

      <Popover></Popover>

      <div className="flex flex-col w-[42rem] items-center">
        <div className="flex justify-start mb-5 w-full ml-12 items-center">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setInflation(true)}
                  className="rounded-3xl mr-5 w-36"
                  variant={inflation ? "default" : "outline"}
                >
                  <p className="font-normal">Adjust For Inflation</p>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  What your projected balance will be worth in today’s money.
                </p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setInflation(false)}
                  variant={inflation ? "outline" : "default"}
                  className="rounded-3xl w-36"
                >
                  <p className="font-normal">Ignore Inflation</p>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>The raw number of your projected balance at retirement.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Info className="w-6 h-6 flex justify-center items-center ml-2" />
        </div>

        <Breakdown />
        <InsightCard />
      </div>
    </div>
  );
};

export default SuperGapCalcSection;
