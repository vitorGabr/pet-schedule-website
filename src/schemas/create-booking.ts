import { set, startOfMinute } from "date-fns";
import z from "zod";

export const createBookingSchema = z
	.object({
		date: z.date("Você deve selecionar uma data"),
		time: z.iso.time("Você deve selecionar um horário"),
		serviceId: z.string("Você deve selecionar um serviço"),
		animalId: z.string("Você deve selecionar um animal"),
		disease: z
			.enum(
				[
					"none",
					"diabetes",
					"heart_disease",
					"arthritis",
					"allergies",
					"skin_condition",
					"other",
				],
				"Você deve selecionar uma doença",
			)
			.optional(),
		coatType: z.enum(
			["short", "medium", "long", "curly"],
			"Você deve selecionar um tipo de pelagem",
		),
	})
	.transform(({ time, ...rest }) => {
		const [hour, minute] = time.split(":").map(Number);
		return {
			...rest,
			date: startOfMinute(
				set(rest.date, { hours: hour, minutes: minute }),
			).toISOString(),
		};
	});
