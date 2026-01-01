import { Elysia } from "elysia";
import { TodoService } from "./todo.service";

export const todos = new Elysia().get("/todos", () => {
	return TodoService.getTodos();
});
