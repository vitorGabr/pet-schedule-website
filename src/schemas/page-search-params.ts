import {
	createLoader,
	createSearchParamsCache,
	type inferParserType,
	parseAsIndex,
	parseAsInteger,
	parseAsString,
} from "nuqs/server";

export const pageSearchParamsSchema = {
	q: parseAsString,
	page: parseAsIndex.withDefault(1),
	limit: parseAsInteger.withDefault(10),
	id: parseAsString,
};

export const pageSearchParamsCache = createSearchParamsCache(pageSearchParamsSchema);
export const pageSearchLoader = createLoader(pageSearchParamsSchema);
export type PageSearchParams = inferParserType<typeof pageSearchParamsSchema>;
