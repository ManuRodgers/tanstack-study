import { queryOptions } from "@tanstack/react-query";
import { getTreaty } from "@/routes/api.$";

export const todosQueryOptions = queryOptions({
	queryKey: ["api", "todos"],
	queryFn: async () => {
		const res = await getTreaty().todos.get();
		return res.data;
	},
});

