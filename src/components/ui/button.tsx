import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Cosmic Variants
        stellar: "bg-cosmic-stellar-gold text-cosmic-deep-space hover:bg-cosmic-stellar-gold/90 cosmic-glow font-semibold relative overflow-hidden",
        nebula: "bg-gradient-to-r from-cosmic-nebula-purple to-cosmic-nebula-green text-cosmic-star-white hover:scale-105 cosmic-glow font-semibold transition-all duration-300 relative overflow-hidden after:absolute after:inset-0 after:animate-shimmer after:content-['']",
        cosmic: "bg-transparent border-2 border-cosmic-stellar-gold text-cosmic-stellar-gold hover:bg-cosmic-stellar-gold hover:text-cosmic-deep-space cosmic-glow transition-all duration-500 universe-effect relative overflow-hidden after:absolute after:inset-0 after:animate-shimmer after:content-[''] after:opacity-0 hover:after:opacity-100",
        royal: "bg-gradient-to-r from-cosmic-nebula-purple via-cosmic-stellar-gold to-cosmic-nebula-green p-[2px] bg-clip-border text-cosmic-star-white hover:shadow-2xl animate-pulse-glow relative overflow-hidden after:absolute after:inset-0 after:animate-shimmer after:content-['']",
        darkCosmic: "bg-gradient-to-r from-cosmic-deep-space via-cosmic-nebula-purple to-cosmic-deep-space text-cosmic-star-white hover:from-cosmic-nebula-purple hover:via-cosmic-deep-space hover:to-cosmic-nebula-purple cosmic-glow font-semibold transition-all duration-500 border border-cosmic-nebula-purple/30",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-12 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
