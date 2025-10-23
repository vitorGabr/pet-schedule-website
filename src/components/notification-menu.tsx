'use client'

import { useUser } from "@clerk/nextjs";
import { Inbox } from "@novu/nextjs";
import { Bell } from "lucide-react";

export function NotificationMenu() {
	const { user } = useUser();
	
	if (!user) {
		return null;
	}

	return (
		<Inbox
			applicationIdentifier={
				process.env.NEXT_PUBLIC_NOVU_APPLICATION_IDENTIFIER ?? ""
			}
			subscriberId={user.publicMetadata.appUserId as string}
			renderBell={() => <Bell className="size-4 text-primary" />}
			localization={{
				locale: "pt-BR",

				// Filtros / abas
				"inbox.filters.dropdownOptions.unread": "Somente não lidas",
				"inbox.filters.dropdownOptions.default": "Todas",
				"inbox.filters.dropdownOptions.archived": "Arquivadas",
				"inbox.filters.dropdownOptions.snoozed": "Adiado",

				"inbox.filters.labels.unread": "Não lidas",
				"inbox.filters.labels.default": "Caixa",
				"inbox.filters.labels.archived": "Arquivadas",
				"inbox.filters.labels.snoozed": "Adiado",

				// Notificações / lista
				"notifications.emptyNotice": "Sem notificações por enquanto",
				"notifications.actions.readAll": "Marcar todas como lidas",
				"notifications.actions.archiveAll": "Arquivar todas",
				"notifications.actions.archiveRead": "Arquivar lidas",
				"notifications.newNotifications": ({
					notificationCount,
				}: {
					notificationCount: number;
				}) =>
					`${notificationCount} nova${notificationCount > 1 ? "s" : ""} notificação${notificationCount > 1 ? "s" : ""}`,

				"notification.snoozedUntil": "Adiado até",

				// Ações da notificação (tooltips etc.)
				"notification.actions.read.tooltip": "Marcar como lida",
				"notification.actions.unread.tooltip": "Marcar como não lida",
				"notification.actions.archive.tooltip": "Arquivar",
				"notification.actions.unarchive.tooltip": "Desarquivar",
				"notification.actions.snooze.tooltip": "Adiar",
				"notification.actions.unsnooze.tooltip": "Retomar",

				// Menu snooze
				"snooze.options.anHourFromNow": "Em 1 hora",
				"snooze.options.inOneDay": "Amanhã",
				"snooze.options.inOneWeek": "Na próxima semana",
				"snooze.options.customTime": "Hora personalizada...",

				"snooze.datePicker.timePickerLabel": "Hora",
				"snooze.datePicker.apply": "Aplicar",
				"snooze.datePicker.cancel": "Cancelar",
				"snooze.datePicker.pastDateTooltip": "Selecione um horário no futuro",
				"snooze.datePicker.noDateSelectedTooltip":
					"Por favor selecione uma data",
				"snooze.datePicker.exceedingLimitTooltip": ({
					days,
				}: {
					days: number;
				}) =>
					`O tempo selecionado não pode exceder ${days === 1 ? "24 horas" : `${days} dias`}`,

				// Preferências
				"preferences.title": "Preferências",
				"preferences.emptyNotice":
					"Nenhuma preferência específica de notificação ainda",
				"preferences.global": "Preferências Globais",
				"preferences.group.info":
					"Se aplica a todas as notificações deste grupo.",
				"preferences.workflow.disabled.notice":
					"Entre em contato com o administrador para ativar o gerenciamento de assinaturas para esta notificação crítica.",
				"preferences.workflow.disabled.tooltip": "Entre em contato para editar",

				// Se tiver workflows específicos que você quer nomear
				dynamic: {
					// exemplo: workflow identifier => nome no UI
					"id-do-workflow-1": "Novos Comentários",
					"id-do-workflow-2": "Atualizações Importantes",
				},
			}}
		/>
	);
}
