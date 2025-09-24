import { cn } from "@/lib/utils";
import type { AnyFieldApi } from "@tanstack/react-form";

type Props = React.ComponentProps<"p"> & {
	error?: string | undefined;
	meta?: AnyFieldApi["state"]["meta"];
};

export function FormErrorMessage({ className, error, meta, ...props }: Props) {
	const body = error ? String(error ?? "") : meta?.errors.join(", ");

	if (meta?.isTouched && meta?.isValid) {
		return (
			<>
				<p
					data-slot="form-message"
					className={cn("text-destructive text-sm first-letter:capitalize", className)}
					{...props}
				>
					{body}
				</p>
				{meta?.isValidating && (
					<p
						data-slot="form-message"
						className={cn("text-sm first-letter:capitalize", className)}
						{...props}
					>
						Validando...
					</p>
				)}
			</>
		);
	}

	return null;
}
