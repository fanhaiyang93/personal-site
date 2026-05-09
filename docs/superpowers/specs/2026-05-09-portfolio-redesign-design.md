# 个人作品站改版设计

## 目标
将现有作品站改版为「全栈负责人型」求职作品站，混合投递大厂数仓岗位、中小公司数据负责人、AI+数据新兴职位。

## 页面结构

```
Hero（差异化价值主张）
  ↓
数字成就横幅（4个核心数字）
  ↓
工作经历时间线（贝壳 + 360）
  ↓
精选项目（3个大卡片）
  ↓
技术能力
  ↓
其余项目列表
  ↓
联系方式
```

---

## 内容配置方案

所有展示内容通过 Markdown/YAML 配置文件管理，无需修改代码即可更新。

### 1. Hero 配置

**文件**: `src/content/hero.md`

```markdown
---
title: 数据架构师 + AI 工具开发者
tagline: 用 Agent 重新定义数据开发工作流
description: |
  8 年数仓架构经验，主导人力/财务主题域从 0 到 1。
  专注数仓架构、大规模数据处理与 AI+数据融合。
---

<!-- 可选：额外描述内容 -->
```

### 2. 数字成就横幅配置

**文件**: `src/data/metrics.ts`

```typescript
export interface Metric {
  value: string;      // 数字值，如 "12", "500+", "60%"
  label: string;      // 标签，如 "人团队", "张数仓表"
  description?: string; // 可选描述
}

export const metrics: Metric[] = [
  { value: "X", label: "人团队", description: "数据团队规模" },
  { value: "X", label: "张数仓表", description: "数据资产" },
  { value: "X", label: "个业务域", description: "财务/HR/安全等" },
  { value: "X%", label: "效率提升", description: "AI工具节省人工" },
];
```

### 3. 工作经历配置

**文件**: `src/content/experience/` 目录下 Markdown 文件

**schema** (`src/content/config.ts` 新增):

```typescript
const experienceCollection = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    role: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    location: z.string().optional(),
    highlights: z.array(z.string()), // 2-3 条成果
    order: z.number().default(0),
  }),
});
```

**示例文件**: `src/content/experience/beike.md`

```markdown
---
company: 贝壳找房
role: 数据仓库架构师
startDate: "2021-03"
endDate: "至今"
location: 北京
highlights:
  - "主导财务主题域数仓建设，覆盖 5 个财务子主题"
  - "推动 AI Native 转型，AI 工具节省 60% 人工"
  - "带领 X 人数据团队"
order: 1
---

负责财务/HR 主题域数仓架构设计与核心模型开发，推动团队 AI Native 工作方式落地。
```

### 4. 精选项目配置

**方案**: 在现有 `projects` collection 中新增 `featured` 字段（已存在），`featured: true` 的项目显示在精选区域，使用大卡片样式。

**精选项目选择**（建议 3 个）：
1. AI Native 数据开发工作方式（差异化亮点）
2. 财务汇聚项目（业务深度）
3. 贝壳 HR 数仓 或 360安全数仓（技术广度）

### 5. 联系方式配置

**文件**: `src/data/contact.ts`

```typescript
export interface Contact {
  email?: string;
  phone?: string;
  wechat?: string;
  github?: string;
  linkedin?: string;
}

export const contact: Contact = {
  email: "fanhy93@163.com",
  phone: "13611236008",
};
```

---

## 组件设计

### Hero.astro（重构）
- 读取 `src/content/hero.md` 配置
- 显示 title、tagline、description
- 保留现有 CTA 按钮（查看项目、下载简历）

### MetricsBanner.astro（新增）
- 读取 `src/data/metrics.ts`
- 横向排列 4 个数字指标
- 深色背景 + 绿色强调色数字

### ExperienceTimeline.astro（新增）
- 读取 `src/content/experience/` 下所有文件
- 按时间倒序显示
- 左侧公司/角色/时间，右侧职责概述 + 成果列表

### FeaturedProjects.astro（新增）
- 筛选 `featured: true` 的项目
- 大卡片布局（单列或双列）
- 显示标题、摘要、标签、量化成果

### ProjectCard.astro（现有，保持）
- 用于其余项目列表
- 小卡片布局

---

## 文件结构

```
src/
├── content/
│   ├── config.ts           # 新增 experience collection
│   ├── hero.md             # 新增：Hero 配置
│   ├── experience/         # 新增：工作经历
│   │   ├── beike.md
│   │   └── 360.md
│   └── projects/           # 现有：项目
├── data/
│   ├── skills.ts           # 现有
│   ├── metrics.ts          # 新增：数字成就
│   └── contact.ts          # 新增：联系方式
├── components/
│   ├── Hero.astro          # 重构
│   ├── MetricsBanner.astro # 新增
│   ├── ExperienceTimeline.astro # 新增
│   ├── FeaturedProjects.astro   # 新增
│   └── ...
└── pages/
    └── index.astro         # 重构页面结构
```

---

## 设计规范

保持现有设计系统：
- 背景：`zinc-950`
- 文字：`zinc-100` / `zinc-400` / `zinc-500`
- 强调：`#4ade80`（accent green）
- 字体：mono font override

新增组件遵循相同配色。

---

## 待填充占位数字

以下数字需要用户后续补充：

| 字段 | 当前占位 | 说明 |
|------|---------|------|
| 团队规模 | X | 带领的数据团队人数 |
| 数仓表数量 | X | 管理的数仓表规模 |
| 业务域数量 | X | 覆盖的业务域数量 |
| 效率提升 | X% | AI 工具节省的人工比例 |

---

## 验收标准

1. 所有文案内容通过 Markdown/TS 文件配置，修改内容无需改代码
2. 页面结构符合设计方案
3. 现有功能（项目详情页、简历下载）正常工作
4. 移动端响应式布局正常
