export const SectionTitle = ({
	overline,
	title,
	highlight,
	description,
}: {
	overline?: string;
	title: string;
	highlight?: string;
	description?: string;
}) => {
	if (!title) return null;

	return (
		<header className="mx-auto max-w-4xl text-center">
			{overline ? (
				<p className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
					{overline}
				</p>
			) : null}
			<h1 className="text-pretty text-3xl font-black leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
				{title}{" "}
				{highlight ? <span className="text-primary">{highlight}</span> : null}
			</h1>
			{description ? (
				<p className="mx-auto mt-4 max-w-3xl text-balance text-base text-muted-foreground sm:text-lg">
					{description}
				</p>
			) : null}
		</header>
	);
};
