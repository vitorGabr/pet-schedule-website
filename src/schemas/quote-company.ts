import z from "zod";

export const quoteCompanySchema = z.object({
	companyName: z.string('Campo obrigatório').min(1, "Informe o nome da empresa"),
	ownerName: z.string('Campo obrigatório').min(1, "Informe o nome do responsável"),
	email: z.email("E-mail inválido"),
	phone: z.string('Campo obrigatório').min(8, "Telefone inválido"),
	city: z.string('Campo obrigatório').min(1, "Informe a cidade"),
	state: z.string('Campo obrigatório').min(1, "Informe o estado"),
	businessType: z.string().min(1, "Selecione o tipo de negócio"),
	employeeCount: z.string().optional(),
	currentSoftware: z.string().optional(),
	monthlyRevenue: z.string().optional(),
	services: z.array(z.string()).min(1, "Selecione ao menos um serviço"),
	challenges: z.string().optional(),
	expectations: z.string().optional(),
	hasWebsite: z.boolean(),
	acceptsTerms: z.boolean("É necessário aceitar os termos").default(false),
});

export type QuoteCompanySchema = z.input<typeof quoteCompanySchema>;
