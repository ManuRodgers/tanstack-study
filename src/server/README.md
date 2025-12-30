# Server 模块

这个文件夹包含所有 Elysia 服务器相关的代码。

## 文件结构

```
server/
├── app.ts              # Elysia 应用主文件，配置所有路由
├── index.ts            # 导出文件
├── routes/             # API 路由模块
│   ├── names.ts        # Names API 路由
│   └── todos.ts        # Todos API 路由
└── README.md           # 本文件
```

## 使用方式

### 在路由中使用 Eden Treaty

Eden Treaty 提供了端到端的类型安全。在路由文件中导入 `getTreaty`：

```tsx
import { getTreaty } from '../api.$'

// 在 loader 中使用（服务器端，无 HTTP 开销）
export const Route = createFileRoute('/my-route')({
  loader: async () => {
    const response = await getTreaty().names.get()
    return response.data
  }
})

// 在组件中使用（客户端，通过 HTTP）
function MyComponent() {
  const { data } = useQuery({
    queryKey: ['names'],
    queryFn: () => getTreaty().names.get().then(r => r.data)
  })
}
```

### 添加新的 API 路由

1. 在 `routes/` 文件夹中创建新的路由文件
2. 在 `app.ts` 中导入并使用该路由

示例：

```typescript
// server/routes/users.ts
import { Elysia } from 'elysia'

export const users = new Elysia()
  .get('/users', () => {
    return [{ id: 1, name: 'John' }]
  })
  .post('/users', async ({ body }) => {
    // 处理创建用户逻辑
  })
```

然后在 `app.ts` 中：

```typescript
import { users } from './routes/users'

export const app = new Elysia({
  prefix: '/api',
})
  .use(users)
  // ... 其他路由
```

## API 端点

- `GET /api/` - Hello Elysia!
- `GET /api/names` - 获取名称列表
- `GET /api/todos` - 获取待办事项列表
- `POST /api/todos` - 创建新的待办事项

## 类型安全

所有 API 调用都通过 Eden Treaty 提供完整的类型安全。类型定义在 `app.ts` 中导出：

```typescript
import type { App } from '@/server/app'
```

