"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { AnyFieldApi } from "@tanstack/react-form";
import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { FormErrorMessage } from "../form-error-message";

type Props = {
	label?: string;
	meta?: AnyFieldApi["state"]["meta"];
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextAreaField({ className, label, meta, ...props }: Props) {
	return (
		<div className="space-y-2">
			<Label
				data-slot="form-label"
				data-error={!meta?.isValid}
				className={cn("data-[error=true]:text-destructive", className)}
				htmlFor={props.name}
			>
				{label}
			</Label>
			<Textarea aria-invalid={!meta?.isValid} onBlur={props.onBlur} {...props} />
			<FormErrorMessage meta={meta} />
		</div>
	);
}
