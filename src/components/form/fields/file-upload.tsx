"use client";

import type { AnyFieldApi } from "@tanstack/react-form";
import { CameraIcon, XIcon } from "lucide-react";
import Image from "next/image";
import type { InputHTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import { FormErrorMessage } from "../form-error-message";

type FileUploadProps = {
	meta?: AnyFieldApi["state"]["meta"];
	previewUrl?: string | null;
	value?: File | null;
	onChange: (value: File | null) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "value">;

export function FileUpload({
	meta,
	previewUrl,
	value,
	...props
}: FileUploadProps) {
	const preview =
		value instanceof File || value === null
			? URL.createObjectURL(value as File)
			: previewUrl;

	return (
		<div className="flex flex-col items-center gap-2">
			<div className="relative inline-flex">
				{/* Drop area */}
				<label
					htmlFor={props.name}
					className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/50 relative flex size-20 items-center justify-center overflow-hidden rounded-full border border-dashed transition-colors outline-none focus-visible:ring-[3px] has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none"
					aria-label={previewUrl ? "Change image" : "Upload image"}
				>
					{preview ? (
						<Image
							className="size-full object-cover"
							src={preview}
							alt={"Visualização do arquivo"}
							width={64}
							height={64}
							style={{ objectFit: "cover" }}
						/>
					) : (
						<div aria-hidden="true">
							<CameraIcon className="size-4 opacity-60" />
						</div>
					)}
				</label>
				{previewUrl && (
					<Button
						onClick={() => props.onChange(null)}
						size="icon"
						className="border-background focus-visible:border-background absolute -top-1 -right-1 size-6 rounded-full border-2 shadow-none"
						aria-label="Remove image"
					>
						<XIcon className="size-3.5" />
					</Button>
				)}
				<input
					id={props.name}
					{...props}
					onChange={(e) => {
						if (e.target.files && e.target.files.length > 0) {
							props.onChange(e.target.files[0]);
						}
					}}
					type="file"
					className="sr-only"
					aria-label="Enviar arquivo"
					tabIndex={-1}
				/>
			</div>
			<FormErrorMessage meta={meta} />
		</div>
	);
}
