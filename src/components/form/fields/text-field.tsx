import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { AnyFieldApi } from "@tanstack/react-form";
import type { InputHTMLAttributes } from "react";
import { FormErrorMessage } from "../form-error-message";

type Props = {
	label?: string;
	error?: string;
	meta?: AnyFieldApi["state"]["meta"];
} & InputHTMLAttributes<HTMLInputElement>;

export function TextField({ className, label, error, name, meta, ...props }: Props) {
	return (
		<div className="space-y-2">
			<Label
				data-slot="form-label"
				data-error={!meta?.isValid}
				className={cn("data-[error=true]:text-destructive")}
				htmlFor={name}
			>
				{label}
			</Label>
			<Input
				aria-invalid={!meta?.isValid}
				name={name}
				className={cn("data-[error=true]:text-destructive", className)}
				{...props}
			/>
			<FormErrorMessage error={error} meta={meta} />
		</div>
	);
}
