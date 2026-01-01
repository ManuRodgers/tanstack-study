import { Elysia } from "elysia";
import { todos } from "./todo/todo.route";

export const app = new Elysia({
	prefix: "/api",
	aot: false, // 禁用提前编译以兼容 Cloudflare Workers
})
	.use(todos)
	.get("/", () => "Hello Elysia!");

export type App = typeof app;
