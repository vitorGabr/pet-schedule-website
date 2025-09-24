"use client";

import { useCallback } from "react";
import { toast } from "sonner";

export const useShare = () => {
	const handleShare = useCallback(async (url?: string) => {
		const shareUrl = url || window.location.href;

		// Verifica se a API de compartilhamento nativa está disponível
		if (navigator.share) {
			try {
				await navigator.share({
					title: "Pet Website - Encontre os melhores serviços para seu pet",
					text: "Confira este serviço incrível para seu pet!",
					url: shareUrl,
				});
			} catch (error) {
				// Usuário cancelou o compartilhamento ou ocorreu um erro
				if ((error as Error).name !== "AbortError") {
					console.error("Erro ao compartilhar:", error);
					toast.error("Erro ao compartilhar. Tente novamente.");
				}
			}
		} else {
			// Fallback: copia para a área de transferência
			try {
				await navigator.clipboard.writeText(shareUrl);
				toast.success("Link copiado para a área de transferência!");
			} catch (error) {
				console.error("Erro ao copiar para área de transferência:", error);
				toast.error("Erro ao copiar link. Tente novamente.");
			}
		}
	}, []);

	return { handleShare };
};
