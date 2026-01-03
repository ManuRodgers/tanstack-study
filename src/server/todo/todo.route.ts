import { Elysia } from "elysia";
import { z } from "zod";
import { TodoInsertSchema, TodoUpdateSchema } from "./todo.schema";
import { TodoService } from "./todo.service";

export const todos = new Elysia()
	// GET /todos - 获取所有 todos
	.get("/todos", async () => {
		const todos = await TodoService.getTodos();
		return { data: todos };
	})
	// GET /todos/:id - 根据 ID 获取单个 todo
	.get(
		"/todos/:id",
		async ({ params, set }) => {
			const todo = await TodoService.getTodoById(params.id);
			if (!todo) {
				set.status = 404;
				return { message: "Todo not found" };
			}
			return { data: todo };
		},
		{
			params: z.object({
				id: z.uuid(),
			}),
		},
	)
	// POST /todos - 创建新 todo
	.post(
		"/todos",
		async ({ body, set }) => {
			try {
				const todo = await TodoService.createTodo(body);
				set.status = 201;
				return { data: todo };
			} catch (err) {
				set.status = 400;
				return {
					message: "Failed to create todo",
					error: String(err),
				};
			}
		},
		{
			body: TodoInsertSchema,
		},
	)
	// PUT /todos/:id - 更新 todo
	.put(
		"/todos/:id",
		async ({ params, body, set }) => {
			const todo = await TodoService.updateTodo(params.id, body);
			if (!todo) {
				set.status = 404;
				return { message: "Todo not found" };
			}
			return { data: todo };
		},
		{
			params: z.object({
				id: z.uuid(),
			}),
			body: TodoUpdateSchema,
		},
	)
	// DELETE /todos/:id - 删除 todo
	.delete(
		"/todos/:id",
		async ({ params, set }) => {
			const todo = await TodoService.deleteTodo(params.id);
			if (!todo) {
				set.status = 404;
				return { message: "Todo not found" };
			}
			return { message: "Todo deleted successfully", data: todo };
		},
		{
			params: z.object({
				id: z.uuid(),
			}),
		},
	);
