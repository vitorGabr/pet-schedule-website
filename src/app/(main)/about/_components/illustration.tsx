export const Illustration = () => {
	return (
		<div className="relative isolate overflow-hidden rounded-2xl border bg-card p-6 shadow-sm">
			<svg
				viewBox="0 0 400 260"
				role="img"
				aria-label="Ilustração de pessoas com seus pets"
				className="mx-auto h-56 w-full max-w-md"
			>
				<defs>
					<linearGradient id="g" x1="0" x2="1">
						<stop offset="0%" stopColor="currentColor" />
						<stop offset="100%" stopColor="currentColor" />
					</linearGradient>
				</defs>
				<rect width="400" height="260" rx="16" className="fill-muted" />
				<circle cx="85" cy="150" r="36" className="fill-accent" />
				<circle cx="200" cy="120" r="48" className="fill-secondary" />
				<circle cx="310" cy="160" r="40" className="fill-primary/20" />
				<g className="text-primary">
					<rect
						x="65"
						y="120"
						width="40"
						height="70"
						rx="8"
						className="fill-current"
					/>
					<rect
						x="180"
						y="98"
						width="44"
						height="92"
						rx="8"
						className="fill-current"
					/>
					<rect
						x="288"
						y="130"
						width="44"
						height="60"
						rx="8"
						className="fill-current"
					/>
				</g>
			</svg>
		</div>
	);
};
