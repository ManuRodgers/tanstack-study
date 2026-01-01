import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { todosQueryOptions } from "@/utils/queries/todos";

export const Route = createFileRoute("/")({
	component: App,
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
