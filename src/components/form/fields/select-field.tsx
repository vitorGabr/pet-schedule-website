"use client";

import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { AnyFieldApi } from "@tanstack/react-form";
import type { SelectHTMLAttributes } from "react";
import { FormErrorMessage } from "../form-error-message";

type Props<T extends string> = {
	label?: string;
	meta?: AnyFieldApi["state"]["meta"];
	options: { label: string; value: T }[];
	placeholder?: string;
	onValueChange: (value: T) => void;
} & SelectHTMLAttributes<HTMLSelectElement>;

export function SelectField<T extends string>({ className, label, meta, ...props }: Props<T>) {
	return (
		<div className="space-y-2 w-full">
			<Label
				data-error={!meta?.isValid}
				className={cn("data-[error=true]:text-destructive", className)}
				htmlFor={props.name}
			>
				{label}
			</Label>
			<Select value={props.value as T} onValueChange={(value) => props.onValueChange(value as T)}>
				<SelectTrigger className="w-full">
					<SelectValue
						aria-invalid={!meta?.isValid}
						className={cn("data-[error=true]:text-destructive")}
						placeholder={props.placeholder ?? ""}
						{...props}
					/>
				</SelectTrigger>
				<SelectContent>
					{props.options.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<FormErrorMessage meta={meta} />
		</div>
	);
}
