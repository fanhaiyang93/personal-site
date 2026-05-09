# 个人作品站改版实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有作品站改版为「全栈负责人型」求职作品站，所有内容通过配置文件管理。

**Architecture:** Astro 内容集合 + TypeScript 数据文件，组件读取配置渲染，保持现有设计系统。

**Tech Stack:** Astro 5, Tailwind CSS, TypeScript, Content Collections

---

## 文件结构

```
src/
├── content/
│   ├── config.ts           # 修改：新增 experience collection, hero collection
│   ├── hero.md             # 新增：Hero 配置
│   └── experience/         # 新增目录
│       ├── beike.md
│       └── 360.md
├── data/
│   ├── skills.ts           # 保持不变
│   ├── metrics.ts          # 新增：数字成就
│   └── contact.ts          # 新增：联系方式
├── components/
│   ├── Hero.astro          # 重构：读取 hero.md
│   ├── MetricsBanner.astro # 新增
│   ├── ExperienceTimeline.astro # 新增
│   ├── FeaturedProjects.astro   # 新增
│   ├── SkillSection.astro  # 保持不变
│   └── ProjectCard.astro   # 保持不变
└── pages/
    └── index.astro         # 重构：组装新页面结构
```

---

## Task 1: 新增数据文件

**Files:**
- Create: `src/data/metrics.ts`
- Create: `src/data/contact.ts`

- [ ] **Step 1: 创建 metrics.ts**

```typescript
export interface Metric {
  value: string;
  label: string;
  description?: string;
}

export const metrics: Metric[] = [
  { value: "X", label: "人团队", description: "数据团队规模" },
  { value: "X", label: "张数仓表", description: "数据资产" },
  { value: "X", label: "个业务域", description: "财务/HR/安全等" },
  { value: "X%", label: "效率提升", description: "AI工具节省人工" },
];
```

- [ ] **Step 2: 创建 contact.ts**

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

- [ ] **Step 3: 提交**

```bash
git add src/data/metrics.ts src/data/contact.ts
git commit -m "feat: add metrics and contact data files

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 2: 扩展内容集合配置

**Files:**
- Modify: `src/content/config.ts`

- [ ] **Step 1: 读取现有 config.ts 内容**

Run: `cat src/content/config.ts`

- [ ] **Step 2: 扩展 config.ts 添加 hero 和 experience 集合**

将现有内容替换为：

```typescript
import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    company: z.string(),
    tags: z.array(z.string()),
    summary: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const heroCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
  }),
});

const experienceCollection = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    role: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    location: z.string().optional(),
    highlights: z.array(z.string()),
    order: z.number().default(0),
  }),
});

export const collections = {
  projects: projectsCollection,
  hero: heroCollection,
  experience: experienceCollection,
};
```

- [ ] **Step 3: 提交**

```bash
git add src/content/config.ts
git commit -m "feat: add hero and experience content collections

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 3: 创建内容文件

**Files:**
- Create: `src/content/hero.md`
- Create: `src/content/experience/beike.md`
- Create: `src/content/experience/360.md`

- [ ] **Step 1: 创建 hero.md**

```markdown
---
title: 数据架构师 + AI 工具开发者
tagline: 用 Agent 重新定义数据开发工作流
description: 8 年数仓架构经验，主导人力/财务主题域从 0 到 1。专注数仓架构、大规模数据处理与 AI+数据融合。
---
```

- [ ] **Step 2: 创建 experience 目录和 beike.md**

```bash
mkdir -p src/content/experience
```

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

- [ ] **Step 3: 创建 360.md**

```markdown
---
company: 360安全
role: 数据仓库工程师
startDate: "2018-06"
endDate: "2021-03"
location: 北京
highlights:
  - "主导安全主题域数仓建设"
  - "日均处理 X 条日志数据"
order: 2
---

负责安全主题域数仓架构设计与核心模型开发。
```

- [ ] **Step 4: 提交**

```bash
git add src/content/hero.md src/content/experience/
git commit -m "feat: add hero and experience content files

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 4: 创建 MetricsBanner 组件

**Files:**
- Create: `src/components/MetricsBanner.astro`

- [ ] **Step 1: 创建 MetricsBanner.astro**

```astro
---
import { metrics } from '../data/metrics';
---

<section class="py-12 px-6 bg-zinc-900/50 border-y border-zinc-800">
  <div class="mx-auto max-w-5xl">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
      {metrics.map((metric) => (
        <div class="text-center">
          <div class="text-3xl md:text-4xl font-bold text-accent mb-1">
            {metric.value}
          </div>
          <div class="text-zinc-400 text-sm">{metric.label}</div>
          {metric.description && (
            <div class="text-zinc-600 text-xs mt-1">{metric.description}</div>
          )}
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: 提交**

```bash
git add src/components/MetricsBanner.astro
git commit -m "feat: add MetricsBanner component

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 5: 创建 ExperienceTimeline 组件

**Files:**
- Create: `src/components/ExperienceTimeline.astro`

- [ ] **Step 1: 创建 ExperienceTimeline.astro**

```astro
---
import { getCollection } from 'astro:content';

const allExperience = await getCollection('experience');
const experiences = allExperience.sort((a, b) => a.data.order - b.data.order);
---

<section id="experience" class="py-20 px-6">
  <div class="mx-auto max-w-5xl">
    <div class="font-mono text-accent text-sm tracking-widest mb-2">// 经历</div>
    <h2 class="text-2xl font-bold text-white mb-10">工作经历</h2>

    <div class="space-y-8">
      {experiences.map((exp, index) => (
        <div class="relative pl-8 border-l-2 border-zinc-800 hover:border-accent transition-colors">
          <div class="absolute -left-2 top-0 w-4 h-4 rounded-full bg-zinc-950 border-2 border-zinc-700"></div>

          <div class="mb-4">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <h3 class="text-lg font-semibold text-white">{exp.data.company}</h3>
                <p class="text-zinc-400">{exp.data.role}</p>
              </div>
              <div class="text-zinc-500 text-sm font-mono">
                {exp.data.startDate} — {exp.data.endDate}
                {exp.data.location && <span class="ml-2">· {exp.data.location}</span>}
              </div>
            </div>
          </div>

          <div class="text-zinc-400 text-sm mb-4">
            <p>{exp.body}</p>
          </div>

          <ul class="space-y-2">
            {exp.data.highlights.map((highlight) => (
              <li class="flex items-start gap-2 text-sm text-zinc-300">
                <span class="text-accent mt-1">▸</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: 提交**

```bash
git add src/components/ExperienceTimeline.astro
git commit -m "feat: add ExperienceTimeline component

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 6: 创建 FeaturedProjects 组件

**Files:**
- Create: `src/components/FeaturedProjects.astro`

- [ ] **Step 1: 创建 FeaturedProjects.astro**

```astro
---
import { getCollection } from 'astro:content';

const allProjects = await getCollection('projects');
const featuredProjects = allProjects
  .filter((p) => p.data.featured)
  .sort((a, b) => a.data.order - b.data.order);
---

<section id="featured" class="py-20 px-6">
  <div class="mx-auto max-w-5xl">
    <div class="font-mono text-accent text-sm tracking-widest mb-2">// 精选</div>
    <h2 class="text-2xl font-bold text-white mb-10">精选项目</h2>

    <div class="space-y-6">
      {featuredProjects.map((project) => (
        <a
          href={`/projects/${project.id.replace(/\.md$/, '')}`}
          class="block p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-accent transition-colors group"
        >
          <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div>
              <h3 class="text-xl font-semibold text-white group-hover:text-accent transition-colors">
                {project.data.title}
              </h3>
              <p class="text-zinc-500 text-sm font-mono mt-1">
                {project.data.company} · {project.data.date}
              </p>
            </div>
            <div class="flex flex-wrap gap-2">
              {project.data.tags.map((tag) => (
                <span class="px-2 py-1 bg-zinc-800 text-zinc-400 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <p class="text-zinc-400 mb-4">{project.data.summary}</p>

          <div class="text-accent text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            查看详情
            <span>→</span>
          </div>
        </a>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: 提交**

```bash
git add src/components/FeaturedProjects.astro
git commit -m "feat: add FeaturedProjects component

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 7: 重构 Hero 组件

**Files:**
- Modify: `src/components/Hero.astro`

- [ ] **Step 1: 重写 Hero.astro 读取配置**

```astro
---
import { getCollection } from 'astro:content';

const heroEntries = await getCollection('hero');
const hero = heroEntries[0];
---

<section class="pt-32 pb-20 px-6">
  <div class="mx-auto max-w-5xl">
    <div class="mb-3 font-mono text-accent text-sm tracking-widest">// {hero.data.title}</div>
    <h1 class="text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight">
      {hero.data.tagline}
    </h1>
    <p class="text-xl text-zinc-400 mb-10 max-w-2xl">
      {hero.data.description}
    </p>
    <div class="flex gap-4 flex-wrap">
      <a
        href="/#projects"
        class="px-6 py-3 bg-accent text-zinc-950 font-semibold rounded hover:bg-green-300 transition-colors text-sm"
      >
        查看项目
      </a>
      <a
        href="/resume.pdf"
        target="_blank"
        class="px-6 py-3 border border-zinc-700 text-zinc-300 rounded hover:border-accent hover:text-accent transition-colors text-sm"
      >
        下载简历 PDF
      </a>
    </div>
    <div class="mt-12 flex gap-6 text-zinc-600 text-sm font-mono">
      <span>贝壳找房 · 2021-至今</span>
      <span>·</span>
      <span>360安全 · 2018-2021</span>
    </div>
  </div>
</section>
```

- [ ] **Step 2: 提交**

```bash
git add src/components/Hero.astro
git commit -m "refactor: Hero component to read from content collection

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 8: 重构首页组装新结构

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: 重写 index.astro**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import MetricsBanner from '../components/MetricsBanner.astro';
import ExperienceTimeline from '../components/ExperienceTimeline.astro';
import FeaturedProjects from '../components/FeaturedProjects.astro';
import SkillSection from '../components/SkillSection.astro';
import ProjectCard from '../components/ProjectCard.astro';
import { getCollection } from 'astro:content';
import { contact } from '../data/contact';

const allProjects = await getCollection('projects');
const nonFeaturedProjects = allProjects
  .filter((p) => !p.data.featured)
  .sort((a, b) => a.data.order - b.data.order);
---

<BaseLayout title="范海洋 · 数仓架构师">
  <Nav />
  <main>
    <Hero />
    <MetricsBanner />
    <ExperienceTimeline />
    <FeaturedProjects />
    <SkillSection />

    <section id="projects" class="py-20 px-6 border-t border-zinc-800">
      <div class="mx-auto max-w-5xl">
        <div class="font-mono text-accent text-sm tracking-widest mb-2">// 更多项目</div>
        <h2 class="text-2xl font-bold text-white mb-10">其他项目</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nonFeaturedProjects.map((project) => (
            <ProjectCard
              title={project.data.title}
              id={project.id.replace(/\.md$/, '')}
              date={project.data.date}
              company={project.data.company}
              tags={project.data.tags}
              summary={project.data.summary}
              featured={project.data.featured}
            />
          ))}
        </div>
      </div>
    </section>

    <footer class="py-12 px-6 border-t border-zinc-800 text-center text-zinc-600 text-sm font-mono">
      <p>{contact.email} · {contact.phone}</p>
      <p class="mt-1">© 2026 范海洋</p>
    </footer>
  </main>
</BaseLayout>
```

- [ ] **Step 2: 提交**

```bash
git add src/pages/index.astro
git commit -m "refactor: restructure homepage with new sections

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 9: 更新项目标记精选

**Files:**
- Modify: `src/content/projects/beike-ai-native.md`
- Modify: `src/content/projects/beike-fin-huiju.md`
- Modify: `src/content/projects/beike-hr-dw.md`

- [ ] **Step 1: 标记 AI Native 项目为精选**

将 `beike-ai-native.md` 的 frontmatter 中 `featured: true` 保持不变（已经是 true）

- [ ] **Step 2: 标记财务汇聚项目为精选**

修改 `beike-fin-huiju.md`，将 `featured: false` 改为 `featured: true`

- [ ] **Step 3: 标记 HR 数仓项目为精选**

修改 `beike-hr-dw.md`，将 `featured: false` 改为 `featured: true`

- [ ] **Step 4: 提交**

```bash
git add src/content/projects/
git commit -m "feat: mark featured projects

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 10: 本地测试

**Files:**
- 无文件修改，仅测试

- [ ] **Step 1: 启动开发服务器**

```bash
npm run dev
```

Expected: 服务器启动成功，显示本地 URL（如 http://localhost:4321）

- [ ] **Step 2: 浏览器验证**

打开开发服务器 URL，检查：

1. Hero 区域显示配置的标题和描述
2. 数字横幅显示 4 个占位数字
3. 工作经历时间线显示贝壳和 360 两段
4. 精选项目显示 3 个大卡片
5. 技能区域正常
6. 其他项目显示非精选项目
7. 页脚显示联系方式

- [ ] **Step 3: 测试响应式**

调整浏览器窗口宽度，确认移动端布局正常（单列显示）

- [ ] **Step 4: 测试项目详情页**

点击任意项目卡片，确认详情页正常加载

- [ ] **Step 5: 测试简历下载**

点击「下载简历 PDF」按钮，确认 PDF 正常打开

---

## Task 11: 最终提交

**Files:**
- 无新文件

- [ ] **Step 1: 确认所有修改已提交**

```bash
git status
```

Expected: 工作区干净

- [ ] **Step 2: 查看提交历史**

```bash
git log --oneline -10
```

Expected: 显示本次改版的所有提交

---

## 验收清单

- [ ] 所有文案内容通过 Markdown/TS 文件配置
- [ ] 页面结构：Hero → 数字横幅 → 时间线 → 精选项目 → 技能 → 其他项目 → 联系
- [ ] Hero 显示配置的差异化价值主张
- [ ] 数字横幅显示 4 个占位数字
- [ ] 工作经历显示职责概述 + 成果列表
- [ ] 精选项目显示 3 个大卡片
- [ ] 现有功能（项目详情页、简历下载）正常
- [ ] 移动端响应式布局正常
