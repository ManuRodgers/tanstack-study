import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
			hello
			<Link to="/demo/elysia-example" className="text-blue-500">
				Elysia Example
			</Link>
		</div>
	);
}
