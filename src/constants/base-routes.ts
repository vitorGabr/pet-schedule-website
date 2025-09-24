import { Route } from "next";

type MenuLink = { href: Route<string>; label: string };

export const BASE_ROUTES: MenuLink[] = [
    { href: "/", label: "Início" },
    //@ts-expect-error
    { href: "/s", label: "Pesquisa" },
    { href: "/about", label: "Sobre nós" },
    { href: "/cotacao", label: "Para Empresas" },
    { href: "/contact", label: "Contato" },
];

export const AUTH_ROUTES: MenuLink[] = [
    { href: "/appointments", label: "Agendamentos" },
    { href: "/pets", label: "Pets" },
]