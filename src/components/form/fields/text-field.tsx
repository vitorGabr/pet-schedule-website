import type { AnyFieldApi } from "@tanstack/react-form";
import type { InputHTMLAttributes } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FormErrorMessage } from "../form-error-message";

type Props = {
	label?: string;
	error?: string;
	meta?: AnyFieldApi["state"]["meta"];
} & InputHTMLAttributes<HTMLInputElement>;

export function TextField({
	className,
	label,
	error,
	name,
	meta,
	...props
}: Props) {
	return (
		<Field data-invalid={!meta?.isValid}>
			<FieldLabel htmlFor={name}>{label}</FieldLabel>
			<Input
				id={name}
				type="text"
				placeholder={props.placeholder}
				className={className}
				aria-invalid={!meta?.isValid}
				{...props}
			/>
			<FormErrorMessage error={error} meta={meta} />
		</Field>
	);
}
