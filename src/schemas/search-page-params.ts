import {
	createLoader,
	createSearchParamsCache,
	type inferParserType,
	parseAsString,
} from "nuqs/server";
import { pageSearchParamsSchema } from "./page-search-params";

export const searchPageParams = { ...pageSearchParamsSchema, tag: parseAsString };
export const searchPageCache = createSearchParamsCache(searchPageParams);
export const searchPageLoader = createLoader(searchPageParams);
export type SearchPageParams = inferParserType<typeof searchPageParams>;
