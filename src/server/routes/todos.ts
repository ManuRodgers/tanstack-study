import { Elysia } from "elysia";

const todosData = [
	{
		id: 1,
		name: "Buy groceries",
	},
	{
		id: 2,
		name: "Buy mobile phone",
	},
	{
		id: 3,
		name: "Buy laptop",
	},
];

export const todos = new Elysia()
	.get("/todos", () => {
		return todosData;
	})
	.post("/todos", async ({ body }) => {
		const { name } = (await body) as { name: string };
		const todo = {
			id: todosData.length + 1,
			name,
		};
		todosData.push(todo);
		return todo;
	});
