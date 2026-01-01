import { z } from "zod";

export const TodoSchema = z.object({
	id: z.number(),
	name: z.string(),
});

export type Todo = z.infer<typeof TodoSchema>;
