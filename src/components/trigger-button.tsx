"use client";

import { Slot } from "@radix-ui/react-slot";
import { useShallow } from "zustand/react/shallow";
import { useModalStore } from "@/stores/modal-store";

interface TriggerButtonProps {
	modal: { key: string; data: any };
	children: React.ReactNode;
}

export function TriggerButton({ children, modal }: TriggerButtonProps) {
	const open = useModalStore(useShallow((s) => s.open));
	return <Slot onClick={() => open(modal)}>{children}</Slot>;
}
