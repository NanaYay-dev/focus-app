import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { ui } from "@/styles/ui";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, ...props }: Props) {
  return <button className={cn(ui.primaryButton, className)} {...props} />;
}