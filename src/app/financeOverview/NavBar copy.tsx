"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Learn } from "../AnimationComponents/Learn"
import { Finance } from "../AnimationComponents/Finance"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Super Gap Calculator",
    href: "/SuperGap",
    description: "Learn How Breaks or Part Time Work Affect Your Super"
  },
  {
    title: "HECS Debt Calculator",
    href: "/docs/primitives/hover-card",
    description:
      "Learn How Hecs Debt Affects your Take Home Pay",
  },
  {
    title: "FHSS vs. Savings Calculator",
    href: "/FHSS",
    description:
      "Compare FHSS vs. a savings account for your home deposit",
  },
  {
    title: "Investing in Everyday Terms",
    href: "/docs/primitives/scroll-area",
    description: "See how investing translates into holidays, coffees, and more!",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "More",
    href: "/docs/primitives/tooltip",
    description:
      "Check out our other finance tools!",
  },
]

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>My Finances</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                   <Finance></Finance>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/financeOverview" title="Superannuation">
                Get an Easy to Understand Breakdown of Your Salary
              </ListItem>
              <ListItem href="/docs/installation" title="Bank Balance">
               Connect Your Bank and View Your Balance
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Superannuation Balance">
                Store Your Superannuation Balance 
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Financial Tools</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <div className="flex items-center">
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
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
              <ListItem href="/Superannuation" title="Superannuation">
              Better understand the Superannuation System.
              </ListItem>
              <ListItem href="/docs/installation" title="Medicare">
              Understand Medicare. From the Medicare Levy to the LHC.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Taxes">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
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
              <img className="h-5 w-5" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4PSIwIiB5PSIwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxwYXRoIGQ9Ik0yMiA1LjcyNFYyYTEgMSAwIDEgMC0yIDB2Mi4zNjZMMTQuNzk3Ljg1NWE0Ljk4IDQuOTggMCAwIDAtNS41OTQgMGwtNyA0LjcyNEE0Ljk5NSA0Ljk5NSAwIDAgMCAwIDkuNzI0VjE5YzAgMi43NTcgMi4yNDMgNSA1IDVoMmExIDEgMCAwIDAgMS0xdi05YzAtLjU1MS40NDgtMSAxLTFoNmMuNTUyIDAgMSAuNDQ5IDEgMXY5YTEgMSAwIDAgMCAxIDFoMmMyLjc1NyAwIDUtMi4yNDMgNS01VjkuNzI0YTQuOTk1IDQuOTk1IDAgMCAwLTItNFoiIGZpbGw9IiMwNGI0YjQiIG9wYWNpdHk9IjEiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSIiPjwvcGF0aD48L2c+PC9zdmc+" />
              <img className= "h-5 w-5" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4PSIwIiB5PSIwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxwYXRoIGQ9Ik0yMyA0YTIgMiAwIDAgMS0yIDJIM2EyIDIgMCAwIDEgMC00aDEuMTg0QTMgMyAwIDAgMSA3IDBoMTBhMyAzIDAgMCAxIDIuODE2IDJIMjFhMiAyIDAgMCAxIDIgMlpNMTAgMTZjLjEwNSAzLjk1NCAzLjg5NSAzLjk1MyA0IDAtLjEtMy45NTQtMy44OTUtMy45NTMtNCAwWm0tMS45MTktMWMuODkyLTUuMjg3IDYuOTQ4LTUuMjg0IDcuODM4IDBoNS4wODhsLjczNS01Ljg3NkExIDEgMCAwIDAgMjAuNzUgOEgzLjI1YTEgMSAwIDAgMC0uOTkyIDEuMTI0TDIuOTkyIDE1Wm03LjgzOCAyYy0uODkyIDUuMjg3LTYuOTQ3IDUuMjg0LTcuODM4IDBIMy4yNDJsLjMyOCAyLjYyQTUuMDA4IDUuMDA4IDAgMCAwIDguNTMxIDI0aDYuOTM4YTUuMDA4IDUuMDA4IDAgMCAwIDQuOTYxLTQuMzhsLjMyNy0yLjYyWiIgZmlsbD0iIzA0YjRiNCIgb3BhY2l0eT0iMSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9IiI+PC9wYXRoPjwvZz48L3N2Zz4=" />

              </div>
            </div>
            <div className="flex-col">
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="mt-1 line-clamp-2 text-[0.8rem] leading-snug text-muted-foreground">
                {children}
              </p>
            </div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
