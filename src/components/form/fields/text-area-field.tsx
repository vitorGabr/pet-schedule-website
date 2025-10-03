"use client";

import type { AnyFieldApi } from "@tanstack/react-form";
import type { TextareaHTMLAttributes } from "react";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { FormErrorMessage } from "../form-error-message";

type Props = {
	label?: string;
	meta?: AnyFieldApi["state"]["meta"];
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextAreaField({ className, label, meta, ...props }: Props) {
	return (
		<Field data-invalid={!meta?.isValid}>
			{label && (
				<Label htmlFor={props.name} className="mb-2">
					{label}
				</Label>
			)}
			<Textarea
				id={props.name}
				className={cn("min-h-[100px] resize-y", className)}
				aria-invalid={!meta?.isValid}
				{...props}
			/>
			<FormErrorMessage meta={meta} />
		</Field>
	);
}
