import { Elysia } from "elysia";

export const names = new Elysia().get("/names", () => {
	return ["Alice", "Bob", "Charlie"];
});
