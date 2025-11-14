import { RatingEligibilityResponseOutputReason } from "@/lib/http/generated/models";

export const ratingEligibilityMessage = {
	ALREADY_RATED:
		"Você já compartilhou uma avaliação para esta empresa. Obrigado!",
	NO_COMPLETED_APPOINTMENT:
		"Conclua um atendimento com esta empresa para liberar a avaliação.",
} satisfies Record<RatingEligibilityResponseOutputReason, string>;
