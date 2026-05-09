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
