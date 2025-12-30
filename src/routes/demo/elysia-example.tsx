import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getTreaty } from "../api.$";

export const Route = createFileRoute("/demo/elysia-example")({
	component: ElysiaExample,
	loader: async () => {
		// 在 loader 中使用 Eden Treaty (服务器端，无 HTTP 开销)
		const names = await getTreaty()
			.names.get()
			.then((res) => res.data);
		console.log("🚀 ~ ElysiaExample ~ names:", names);
		const todos = await getTreaty()
			.todos.get()
			.then((res) => res.data);
		console.log("🚀 ~ ElysiaExample ~ todos:", todos);
		return {
			names,
			todos,
		};
	},
});

function ElysiaExample() {
	const { names: initialNames, todos: initialTodos } = Route.useLoaderData();

	// 在组件中使用 React Query 和 Eden Treaty (客户端)
	const { data: namesResponse } = useQuery({
		queryKey: ["api", "names"],
		queryFn: () => getTreaty().names.get(),
	});

	const { data: todosResponse } = useQuery({
		queryKey: ["api", "todos"],
		queryFn: () => getTreaty().todos.get(),
	});

	const names = namesResponse?.data ?? initialNames;
	const todos = todosResponse?.data ?? initialTodos;

	return (
		<div className="min-h-screen bg-gradient-to-br from-zinc-800 to-black p-4 text-white">
			<div className="w-full max-w-2xl mx-auto p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border-8 border-black/10">
				<h1 className="text-3xl font-bold mb-6 text-cyan-400">
					Elysia + Eden Treaty Example
				</h1>

				<div className="space-y-6">
					<section>
						<h2 className="text-xl font-semibold mb-3 text-purple-400">
							Names API
						</h2>
						<ul className="space-y-2">
							{names?.map((name, index) => (
								<li
									key={index}
									className="bg-white/10 border border-white/20 rounded-lg p-3"
								>
									{name}
								</li>
							))}
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-semibold mb-3 text-purple-400">
							Todos API
						</h2>
						<ul className="space-y-2">
							{todos?.map((todo) => (
								<li
									key={todo.id}
									className="bg-white/10 border border-white/20 rounded-lg p-3"
								>
									<span className="font-medium">{todo.name}</span>
									<span className="text-white/60 ml-2">(ID: {todo.id})</span>
								</li>
							))}
						</ul>
					</section>
				</div>
			</div>
		</div>
	);
}
