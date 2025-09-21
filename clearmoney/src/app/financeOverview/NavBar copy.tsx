"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Learn } from "../AnimationComponents/Learn";
import House from "./NavBarIcons/House";
import Pie from "./NavBarIcons/Pie";

const components: {
  title: string;
  coming?: string;
  href: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    title: "Super Gap Calculator",
    href: "/SuperGap",
    description: "Learn How Breaks or Part Time Work Affect Your Super",
    icon: <House></House>,
  },
  {
    title: "FHSS vs. Savings Calculator",
    href: "/FHSS",
    description: "Compare FHSS vs. a savings account for your home deposit",
    icon: <House></House>,
  },
  {
    title: "What Your Fund Invests In",
    coming: "Coming Soon",
    href: "/holdings",
    description:
      "See exactly which companies and assets your super fund owns, in dollars.",
    icon: <Pie></Pie>,
  },
];

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>My Super</NavigationMenuTrigger>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Super Tools</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[350px] gap-3 p-4 md:w-[350px] grid-cols-1 lg:w-[400px] ">
              {components.map((component) => (
                <div className="flex items-center">
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                    icon={component.icon}
                  >
                    {component.description}
                  </ListItem>
                </div>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      <Learn></Learn>
                    </div>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/Superannuation" title="What is Super?">
                A simple guide to how super works.
              </ListItem>
              <ListItem
                href="/docs/installation"
                title="First Home Super Saver Scheme"
              >
                See how super can boost your first home deposit.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Super & Tax">
                Concessional vs non-concessional explained.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={navigationMenuTriggerStyle()}
            onClick={() => console.log("Clicked About")}
          >
            About
          </NavigationMenuTrigger>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

type ListItemProps = React.ComponentPropsWithoutRef<"a"> & {
  title: string;
  icon?: React.ReactNode; // 👈 custom prop
};

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, children, icon, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="flex">
              <div className="mr-3">
                <div className="flex justify-center items-center rounded-full h-12 w-12 bg-[RGB(235,247,248)]">
                  {icon}
                </div>
              </div>
              <div className="flex-col">
                <div className="text-[0.95rem] font-[500] leading-none">
                  {title}
                </div>
                <p className="mt-1 line-clamp-2 text-[0.8rem] leading-snug text-muted-foreground">
                  {children}
                </p>
              </div>
            </div>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
