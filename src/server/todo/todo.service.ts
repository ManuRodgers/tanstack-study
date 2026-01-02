import { db } from "../db";
import { todosTable } from "../db/schema";

export class TodoService {
	static async getTodos() {
		return await db.select().from(todosTable);
	}
}
