import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import styles from "./ui.module.css";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return <input className={cn(styles.input, className)} {...props} />;
}