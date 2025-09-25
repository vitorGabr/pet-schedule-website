"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function BackButton() {
	const navigate = useRouter();
	return (
		<Button variant="ghost" className="gap-2" onClick={() => navigate.back()}>
			<ArrowLeft className="h-4 w-4" /> Voltar
		</Button>
	);
}
