// orval.config.ts
import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: { target: "http://localhost:3333/swagger/json" },
    output: {
      workspace: "./src/lib/http",
      target: "./generated/endpoints",
      schemas: "./generated/models",
      mode: "tags-split",
      client: "react-query",
      httpClient: "axios",
      namingConvention: "kebab-case",
      clean: true,
      biome: true,
      indexFiles: true,
      override: {
        mutator: { path: "../client-fetch.ts", name: "customFetch" },
        query: { useQuery: true, signal: false },
      },
    },
  },
  apiPublic: {
    input: { target: "http://localhost:3333/swagger/json" },
    output: {
      workspace: "./src/lib/http-public",
      target: "./generated/endpoints",
      schemas: "./generated/models",
      mode: "tags-split",
      httpClient: "axios",
      namingConvention: "kebab-case",
      clean: true,
      biome: true,
      indexFiles: true,
      override: {
        mutator: { path: "../client-fetch-public.ts", name: "customFetch" },
      },
    },
  },
});
