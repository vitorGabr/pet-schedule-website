import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { BreedListResponseOutputItemsItemBreedsItem } from "@/lib/http";
import { cn } from "@/lib/utils";

interface Animal {
	name: string;
	breeds: BreedListResponseOutputItemsItemBreedsItem[];
}

interface AnimalComboboxProps {
	animals: Animal[];
	value?: { id: string; name: string };
	onChange: (value: { name: string; id: string }) => void;
	isInvalid?: boolean;
	errors?: Array<{ message?: string } | undefined>;
}

export function AnimalCombobox({
	animals,
	value,
	isInvalid,
	errors,
	onChange,
}: AnimalComboboxProps) {
	const [open, setOpen] = React.useState(false);

	const displayValue = value ? value.name : "Selecione um animal ou raça...";

	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel htmlFor={"breed"}>Raça</FieldLabel>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-[300px] justify-between"
					>
						{displayValue}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[300px] p-0">
					<Command>
						<CommandInput placeholder="Busque por animais ou raças..." />
						<CommandList>
							<CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
							{animals.map((animal) => (
								<div key={animal.name}>
									<CommandGroup heading={animal.name}>
										{animal.breeds.map((breed) => {
											return (
												<CommandItem
													key={breed.id}
													value={breed.name}
													onSelect={(_) => {
														onChange({ id: breed.id, name: breed.name });
														setOpen(false);
													}}
												>
													<Check
														className={cn(
															value?.id === breed.id
																? "opacity-100"
																: "opacity-0",
														)}
													/>
													{breed.name}
												</CommandItem>
											);
										})}
									</CommandGroup>
									<CommandSeparator />
								</div>
							))}
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			{isInvalid && <FieldError errors={errors} />}
		</Field>
	);
}
