import { redirect } from "next/navigation";
import type { InputHTMLAttributes } from "react";

export const metadata = {
	title: "Contato • PETI",
	description:
		"Fale conosco para dúvidas, sugestões ou parcerias. Estamos aqui para ajudar.",
};

export async function sendContactMessage(formData: FormData) {
	"use server";
	const name = String(formData.get("name") ?? "").trim();
	const email = String(formData.get("email") ?? "").trim();
	const message = String(formData.get("message") ?? "").trim();

	if (!name || !email || !message) {
		redirect("/contato?success=0");
	}

	redirect("/contato?success=1");
}

export default async function ContatoPage(props: PageProps<"/contact">) {
	const searchParams = await props.searchParams;
	const success = searchParams.success as string;

	return (
		<>
			<div className="mx-auto max-w-3xl text-center">
				<h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
					Entre em contato
				</h1>
				<p className="mt-2 text-balance text-muted-foreground">
					Tem dúvidas sobre nossos serviços, precisa de ajuda com um agendamento
					ou quer falar sobre parcerias? Envie uma mensagem pelo formulário ou
					use nossos canais ao lado.
				</p>
			</div>

			<section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
				<form
					action={sendContactMessage}
					className="rounded-xl border bg-card p-6"
				>
					{success === "1" ? (
						<div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
							Mensagem enviada! Responderemos em breve.
						</div>
					) : null}
					{success === "0" ? (
						<div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
							Preencha nome, e-mail e mensagem.
						</div>
					) : null}
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<TextField
							id="name"
							name="name"
							label="Seu nome"
							placeholder="Ex: João da Silva"
							required
						/>
						<TextField
							id="email"
							name="email"
							label="Seu e-mail"
							type="email"
							placeholder="Ex: joao@gmail.com"
							required
						/>
					</div>
					<div className="mt-4">
						<TextField
							id="subject"
							name="subject"
							label="Assunto"
							placeholder="Ex: Suporte"
							required
						/>
					</div>
					<div className="mt-4">
						<TextAreaField
							id="message"
							name="message"
							label="Mensagem"
							rows={6}
							placeholder="Ex: Olá, gostaria de saber mais sobre os serviços..."
							required
						/>
					</div>
					<div className="mt-6">
						<button
							type="submit"
							className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
						>
							Enviar mensagem
						</button>
					</div>
				</form>

				<aside className="flex flex-col gap-6">
					<div className="rounded-xl border bg-card p-6">
						<h2 className="text-xl font-semibold text-foreground">
							Informações de contato
						</h2>
						<ul className="mt-4 space-y-3 text-sm text-muted-foreground">
							<li className="flex items-center gap-3">
								<span aria-hidden>📞</span>
								<a
									href="tel:+5511999999999"
									className="hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring rounded"
								>
									(11) 99999-9999
								</a>
							</li>
							<li className="flex items-center gap-3">
								<span aria-hidden>✉️</span>
								<a
									href="mailto:suporte@peti.com"
									className="hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring rounded"
								>
									suporte@peti.com
								</a>
							</li>
							<li className="flex items-center gap-3">
								<span aria-hidden>📍</span>
								<span>Av. Exemplo, 123 - São Paulo, SP</span>
							</li>
						</ul>
					</div>

					<div className="rounded-xl border bg-card p-1">
						<iframe
							title="Mapa de localização"
							className="h-64 w-full rounded-lg"
							aria-label="Mapa de localização do PETI"
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.253380229149!2d-46.6565717!3d-23.5953519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8a6b3f0ad%3A0x8c8f1b0c0e1d3b0!2sParque%20Ibirapuera!5e0!3m2!1spt-BR!2sBR!4v1700000000000"
						/>
					</div>
				</aside>
			</section>
		</>
	);
}

const TextAreaField = (
	props: InputHTMLAttributes<HTMLTextAreaElement> & {
		label: string;
		rows: number;
	},
) => {
	return (
		<div className="w-full">
			<label
				htmlFor={props.id}
				className="mb-1 block text-sm font-medium text-foreground"
			>
				{props.label}
			</label>
			<textarea
				{...props}
				rows={props.rows}
				className="block w-full resize-y rounded-lg border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-ring"
			/>
		</div>
	);
};

const TextField = (
	props: InputHTMLAttributes<HTMLInputElement> & { label: string },
) => {
	return (
		<div className="w-full">
			<label
				htmlFor={props.id}
				className="mb-1 block text-sm font-medium text-foreground"
			>
				{props.label}
			</label>
			<input
				{...props}
				className="block w-full resize-y rounded-lg border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-ring"
			/>
		</div>
	);
};
