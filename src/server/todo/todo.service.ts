import { eq } from "drizzle-orm";
import { db } from "../db";
import { todosTable } from "../db/schema";
import type { TodoInsert, TodoUpdate } from "./todo.schema";

export class TodoService {
	// 获取所有 todos
	static async getTodos() {
		return await db.select().from(todosTable);
	}

	// 根据 ID 获取单个 todo
	static async getTodoById(id: string) {
		const result = await db
			.select()
			.from(todosTable)
			.where(eq(todosTable.id, id))
			.limit(1);

		return result[0] || null;
	}

	// 创建 todo
	static async createTodo(data: TodoInsert) {
		const result = await db.insert(todosTable).values(data).returning();

		return result[0];
	}

	// 更新 todo
	static async updateTodo(id: string, data: TodoUpdate) {
		const result = await db
			.update(todosTable)
			.set({ ...data, updatedAt: new Date() })
			.where(eq(todosTable.id, id))
			.returning();

		return result[0] || null;
	}

	// 删除 todo
	static async deleteTodo(id: string) {
		const result = await db
			.delete(todosTable)
			.where(eq(todosTable.id, id))
			.returning();

		return result[0] || null;
	}
}
