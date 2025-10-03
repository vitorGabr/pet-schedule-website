import type { AnyFieldApi } from "@tanstack/react-form";
import { FieldError } from "../ui/field";

type Props = React.ComponentProps<"p"> & {
	error?: string | undefined;
	meta?: AnyFieldApi["state"]["meta"];
};

export function FormErrorMessage({ className, error, meta, ...props }: Props) {
	const body = error
		? String(error ?? "")
		: meta?.errors.map((e) => e.message).join(", ");
	if (!meta?.isValid) {
		return (
			<FieldError data-slot="form-message" className={className} {...props}>
				{body}
			</FieldError>
		);
	}

	return null;
}
