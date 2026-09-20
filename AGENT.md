# 天气查询应用 · AI 开发指令

## 项目定位
个人练习用的天气查询 MVP。React 18 + TypeScript + Vite 5 + Tailwind CSS v4，天气数据来自天气API（tianqiapi.com），收藏城市存 LocalStorage。

- 产品范围见 `天气查询应用PRD.md`
- 技术契约见 `天气查询应用技术设计.md`
- **开发按 `任务拆解清单.md` 逐条执行，一次只做一条**

## 硬性约束（不得违反）
1. 禁止 `any`，必要时用 `unknown` + 类型守卫
2. API Key 只从 `import.meta.env` 读取，禁止硬编码；`.env.local` 不得提交
3. 网络请求只写在 `src/services/weather.ts`，组件内禁止出现 `fetch`
4. Tailwind 类名禁止动态拼接（如 `` `bg-${c}-500` ``），配色走 `constants/weather.ts` 中的完整静态类名
5. 组件只消费归一化后的类型（`CurrentWeather` 等），禁止在组件里直接读 API 原始字段
6. 不在渲染过程中发请求，一律通过 `useWeather` 触发
7. 每条任务完成后 `npm run typecheck` 必须 0 错误，再进入下一条

## 代码风格
- Prettier：无分号、单引号、`printWidth: 100`、`trailingComma: all`
- 组件 PascalCase；Hook `useXxx`；函数 camelCase
- 类型集中在 `src/types/`（唯一来源）；组件 props 类型写在组件文件内
- 路径别名 `@/` → `src/`

## 目录职责（不要越界）
| 目录 | 职责 |
|------|------|
| `src/types/` | 全部类型定义，冻结后不随意改 |
| `src/constants/` | 图标映射、AQI 配色、热门城市、缓存时长 |
| `src/utils/` | 纯函数：字段归一化、格式化、storage 封装 |
| `src/services/` | HTTP 请求 + 调用归一化 |
| `src/hooks/` | 数据状态与副作用（缓存、加载态、错误态） |
| `src/components/` | 展示与交互，不含业务逻辑 |
| `src/pages/` | 页面组装 |

## 完成标准（MVP 验收）
1. 搜索中文城市名能正确返回该城市天气
2. 实况 / 24 小时 / 空气质量 / 预警均正确展示，无 `NaN`、`undefined`
3. 收藏城市刷新后仍在，可切换、可删除
4. 加载 / 错误 / 空状态正常，请求失败后重试按钮真的能重试
5. `npm run typecheck` 0 错误，`npm run build` 成功
6. 浏览器控制台无报错
