import { treaty } from "@elysiajs/eden";
import { createFileRoute } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";
import { type App, app } from "@/server/app";

const handle = ({ request }: { request: Request }) => app.fetch(request);

export const Route = createFileRoute("/api/$")({
	server: {
		handlers: {
			GET: handle,
			POST: handle,
			PUT: handle,
			PATCH: handle,
			DELETE: handle,
		},
	},
});

export const getTreaty = createIsomorphicFn()
	.server(() => treaty(app).api)
	.client(() => {
		// 在生产环境中使用相对 URL，在开发环境中使用 localhost
		const baseUrl =
			typeof window !== "undefined"
				? window.location.origin
				: "http://localhost:3001";
		return treaty<App>(baseUrl).api;
	});
