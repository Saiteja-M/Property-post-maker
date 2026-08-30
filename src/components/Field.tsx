import { ReactNode } from "react";
import { AlertIcon } from "./icons";

interface Props {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

export default function Field({ label, htmlFor, hint, error, required, children }: Props) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <label htmlFor={htmlFor} className="text-[13px] font-semibold text-white/90">
          {label}
          {required && <span className="ml-1 text-brass">*</span>}
        </label>
        {hint && <span className="font-mono text-[10px] uppercase tracking-wide text-ash">{hint}</span>}
      </div>
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-[12px] font-medium text-rose-400">
          <AlertIcon className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
