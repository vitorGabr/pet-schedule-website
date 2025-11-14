"use client";

import type { AnyFieldApi } from "@tanstack/react-form";
import type { SelectHTMLAttributes } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FormErrorMessage } from "../form-error-message";

type Props<T extends string> = {
	label?: string;
	meta?: AnyFieldApi["state"]["meta"];
	options: { label: string; value: T }[];
	placeholder?: string;
	onValueChange: (value: T) => void;
} & SelectHTMLAttributes<HTMLSelectElement>;

export function SelectField<T extends string>({
	className,
	label,
	meta,
	onValueChange,
	...props
}: Props<T>) {
	return (
		<Field data-invalid={!meta?.isValid}>
			{label && <FieldLabel htmlFor={props.name}>{label}</FieldLabel>}
			<Select
				value={props.value as T}
				onValueChange={(value) => onValueChange(value as T)}
			>
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
		</Field>
	);
}
