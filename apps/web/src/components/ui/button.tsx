import * as React from "react";
import Link, {type LinkProps} from "next/link";
import {cva, type VariantProps} from "class-variance-authority";

import {cn} from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center font-semibold justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
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
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, size, fullWidth, ...props}, ref) => {
    return (
      <button
        className={cn(buttonVariants({variant, size, fullWidth, className}))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

interface ButtonLinkProps extends LinkProps, VariantProps<typeof buttonVariants> {
  className?: string;
  children: React.ReactNode;
}

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({className, variant, size, fullWidth, children, ...props}, ref) => {
    return (
      <Link
        ref={ref}
        className={cn(buttonVariants({variant, size, fullWidth, className}))}
        {...props}
      >
        {children}
      </Link>
    );
  },
);
ButtonLink.displayName = "ButtonLink";

export {Button, ButtonLink};
