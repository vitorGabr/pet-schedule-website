import { Button } from "@/components/ui/button";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { addDays, format, isSameDay, startOfToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type Props = { selectedDate: Date; setSelectedDate: (date: Date) => void };
const listDays = Array.from({ length: 15 }, (_, i) => addDays(startOfToday(), i));

export function SelectionDate({ selectedDate, setSelectedDate }: Props) {
	const [api, setApi] = useState<CarouselApi>();

	const nextPage = () => api?.scrollNext();
	const prevPage = () => api?.scrollPrev();

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h4 className="font-semibold flex items-center gap-2">
					<Calendar className="h-4 w-4" />
					Selecionar Data
				</h4>
				<div className="flex gap-2 items-center">
					<span className="text-sm font-medium first-letter:capitalize">
						{format(selectedDate, "MMMM yyyy")}
					</span>
					<Button variant="outline" size="sm" onClick={prevPage}>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button variant="outline" size="sm" onClick={nextPage}>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
			<Carousel opts={{ slidesToScroll: 7, align: "start" }} className="w-full" setApi={setApi}>
				<CarouselContent>
					{listDays.map((date) => {
						return (
							<CarouselItem key={date.toISOString()} className="basis-[14.28%]">
								<button
									type="button"
									onClick={() => setSelectedDate(date)}
									className={cn(
										`p-3 w-full rounded-lg max-h-[15vh] text-center border bg-primary text-primary-foreground`,
										!isSameDay(date, selectedDate) && "bg-muted/50 text-muted-foreground",
									)}
								>
									<div className="text-xs font-medium truncate w-full">
										{format(date, "EEE", { locale: ptBR })}
									</div>
									<div className="text-sm font-bold">{format(date, "d")}</div>
								</button>
							</CarouselItem>
						);
					})}
				</CarouselContent>
			</Carousel>
		</div>
	);
}
