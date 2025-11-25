"use client";

import { addDays, format } from "date-fns";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCalculateServicePriceDuration } from "@/lib/http/generated/endpoints/reservas/reservas";
import { CalculateServicePriceDurationRequestDtoCoatType } from "@/lib/http/generated/models";
import { formatCurrency } from "@/utils/currency";

type BookingPriceSummaryProps = {
    serviceId: string;
    animalId?: string;
    coatType?: string;
    disease?: string;
    initialPrice: number;
    initialDuration: number;
    date?: Date;
    time?: string;
    bookingButton?: React.ReactNode;
};

export function BookingPriceSummary({
    serviceId,
    animalId,
    coatType,
    disease,
    initialPrice,
    initialDuration,
    date,
    time,
    bookingButton,
}: BookingPriceSummaryProps) {
    const {
        mutate: calculatePrice,
        data: calculatedData,
        isPending,
        isError,
        error,
    } = useCalculateServicePriceDuration();

    useEffect(() => {
        if (serviceId && animalId && coatType) {
            calculatePrice({
                data: {
                    serviceId,
                    animalId,
                    coatType: coatType as CalculateServicePriceDurationRequestDtoCoatType,
                    disease,
                },
            });
        }
    }, [serviceId, animalId, coatType, disease, calculatePrice]);

    const price = calculatedData?.price ?? initialPrice;
    const duration = calculatedData?.duration ?? initialDuration;

    if (isError) {
        return (
            <div className="flex px-4 justify-between pt-4 items-center gap-4 border-t">
                <Alert variant="destructive">
                    <AlertDescription>
                        {(error as any)?.response?.data?.message ??
                            "O estabelecimento não atende a este animal com as condições selecionadas."}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="flex px-4 justify-between pt-4 items-center gap-4 border-t">
            <div>
                <div className="font-semibold">
                    Total:{" "}
                    {isPending ? (
                        <span className="text-muted-foreground">Calculando...</span>
                    ) : (
                        formatCurrency(price / 100)
                    )}
                </div>
                <div className="text-sm text-muted-foreground">
                    {time && date && `${time} - ${format(addDays(date, 0), "dd/MM/yyyy")}`}
                    <span className="mx-2">•</span>
                    {duration} min
                </div>
            </div>
            {bookingButton}
        </div>
    );
}
