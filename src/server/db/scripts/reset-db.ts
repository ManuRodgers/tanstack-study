import { neon } from "@neondatabase/serverless";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "@/env";

const client = neon(env.DATABASE_URL);
const db = drizzle({ client });

async function resetDatabase() {
	try {
		console.log("🔄 开始重置数据库...");

		// 获取所有表名（排除系统表）
		const tablesResult = await db.execute(sql`
			SELECT tablename 
			FROM pg_tables 
			WHERE schemaname = 'public'
		`);

		const tables = (tablesResult.rows as Array<{ tablename: string }>).map(
			(row) => row.tablename,
		);

		if (tables.length === 0) {
			console.log("✅ 数据库中没有表需要删除");
			return;
		}

		console.log(`📋 找到 ${tables.length} 个表: ${tables.join(", ")}`);

		// 禁用外键约束检查（PostgreSQL 使用 CASCADE）
		// 删除所有表（CASCADE 会自动删除依赖关系）
		const tableNames = tables.map((name) => `"${name}"`).join(", ");
		await db.execute(sql.raw(`DROP TABLE IF EXISTS ${tableNames} CASCADE`));

		console.log("✅ 所有表已成功删除");

		// 重置序列（如果有的话）
		await db.execute(sql`
			DO $$ 
			DECLARE 
				r RECORD;
			BEGIN
				FOR r IN (SELECT sequence_name FROM information_schema.sequences WHERE sequence_schema = 'public') 
				LOOP
					EXECUTE 'DROP SEQUENCE IF EXISTS ' || quote_ident(r.sequence_name) || ' CASCADE';
				END LOOP;
			END $$;
		`);

		console.log("✅ 序列已重置");
		console.log("🎉 数据库重置完成！");
	} catch (error) {
		console.error("❌ 重置数据库时发生错误:", error);
		process.exit(1);
	} finally {
		process.exit(0);
	}
}

resetDatabase();
