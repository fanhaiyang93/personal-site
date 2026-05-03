export interface SkillGroup {
  category: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: '数仓架构',
    skills: [
      '维度建模 (Kimball)',
      'ODS/DWD/DWS/OLAP/RPT 分层设计',
      '湖仓一体 (Hive + Iceberg)',
      'StarRocks OLAP 接入',
      '指标体系建设',
      '数据血缘治理',
    ],
  },
  {
    category: '技术栈',
    skills: [
      'Hive 1.2.x',
      'Spark',
      'StarRocks',
      'ClickHouse',
      'Flink',
      'Python',
      'Shell',
    ],
  },
  {
    category: '数据治理',
    skills: [
      '数据质量监控',
      '数据安全分级',
      '权限管控体系',
      '元数据管理',
      '指标口径治理',
    ],
  },
  {
    category: 'AI 应用',
    skills: [
      'AI Agent 开发',
      'MCP 服务开发',
      'Prompt 工程',
      'OLAP + LLM 融合架构',
      'Claude / LLM 应用',
    ],
  },
  {
    category: '团队管理',
    skills: [
      '技术规范建设',
      '团队技术方向规划',
      '跨部门协作',
      'AI Native 工作方式推广',
    ],
  },
];
