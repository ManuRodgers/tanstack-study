import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-zod";
import type { z } from "zod";
import { todosTable } from "../db/schema";

// Select schema - 用于验证从数据库查询返回的数据
export const TodoSelectSchema = createSelectSchema(todosTable);
export type Todo = typeof todosTable.$inferSelect;

// Insert schema - 用于验证插入数据库的数据
export const TodoInsertSchema = createInsertSchema(todosTable);
export type TodoInsert = typeof todosTable.$inferInsert;

// Update schema - 用于验证更新数据库的数据
export const TodoUpdateSchema = createUpdateSchema(todosTable);
export type TodoUpdate = z.infer<typeof TodoUpdateSchema>;

// 为了向后兼容，保留原来的 TodoSchema
export const TodoSchema = TodoSelectSchema;
