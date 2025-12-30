import { Elysia } from "elysia";
import { names } from "./routes/names";
import { todos } from "./routes/todos";

export const app = new Elysia({
	prefix: "/api",
	aot: false, // 禁用提前编译以兼容 Cloudflare Workers
})
	.use(names)
	.use(todos)
	.get("/", () => "Hello Elysia!");

export type App = typeof app;
