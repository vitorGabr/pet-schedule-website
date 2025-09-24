export function formatCurrency(
	value?: number | null | undefined,
	options: { showZeroAsEmpty?: boolean; locale?: string; currency?: string } = {},
): string {
	const { showZeroAsEmpty = false, locale = "pt-BR", currency = "BRL" } = options;

	// Trata valores nulos, undefined ou NaN
	if (value == null || Number.isNaN(value)) {
		return showZeroAsEmpty ? "" : "R$ 0,00";
	}

	// Se o valor é 0 e showZeroAsEmpty está ativo
	if (value === 0 && showZeroAsEmpty) {
		return "";
	}

	try {
		return new Intl.NumberFormat(locale, {
			style: "currency",
			currency: currency,
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(value);
	} catch (error) {
		// Fallback em caso de erro na formatação
		console.warn("Erro ao formatar moeda:", error);
		return `${currency === "BRL" ? "R$" : currency} ${value.toFixed(2).replace(".", ",")}`;
	}
}

export function formatNegativeCurrency(value?: number | null | undefined): string {
	const formatted = formatCurrency(value);

	if (value && value < 0) {
		return formatted.replace("-", "- ");
	}

	return formatted;
}

export function formatCompactCurrency(value?: number | null | undefined): string {
	if (value == null || Number.isNaN(value)) {
		return "R$ 0";
	}

	try {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
			notation: "compact",
			compactDisplay: "short",
			maximumFractionDigits: 1,
		}).format(value);
	} catch {
		const absValue = Math.abs(value);
		const sign = value < 0 ? "-" : "";

		if (absValue >= 1e9) {
			return `${sign}R$ ${(absValue / 1e9).toFixed(1)}B`;
		} else if (absValue >= 1e6) {
			return `${sign}R$ ${(absValue / 1e6).toFixed(1)}M`;
		} else if (absValue >= 1e3) {
			return `${sign}R$ ${(absValue / 1e3).toFixed(1)}K`;
		}

		return formatCurrency(value);
	}
}
