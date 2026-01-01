import { useSuspenseQuery } from "@tanstack/react-query";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { createFileRoute, ErrorComponent } from "@tanstack/react-router";
import { todosQueryOptions } from "@/utils/queries/todos";

function IndexError({ error }: ErrorComponentProps) {
	return <ErrorComponent error={error} />;
}

export const Route = createFileRoute("/")({
	component: App,
	errorComponent: IndexError,
	loader: async ({ context: { queryClient } }) => {
		await queryClient.ensureQueryData(todosQueryOptions);
	},
});

function App() {
	const { data: todos } = useSuspenseQuery(todosQueryOptions);
	console.log("🚀 ~ App ~ todos:", todos);
	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
			hello
		</div>
	);
}
