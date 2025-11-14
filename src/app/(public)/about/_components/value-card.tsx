export const ValueCard = ({
	icon,
	title,
	children,
}: {
	icon: React.ReactNode;
	title: string;
	children: React.ReactNode;
}) => {
	if (!title) return null;

	return (
		<div className="group rounded-xl bg-card p-6 border transition-all hover:border-primary focus-within:ring-2 focus-within:ring-ring">
			<div className="flex items-center gap-3">
				<span
					aria-hidden
					className="inline-flex size-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground"
				>
					{icon}
				</span>
				<h3 className="text-lg font-semibold text-foreground">{title}</h3>
			</div>
			<p className="mt-3 text-sm text-muted-foreground">{children}</p>
		</div>
	);
};
