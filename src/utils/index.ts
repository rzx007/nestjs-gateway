import { readFileSync } from 'fs';
import { join } from 'node:path';
import { cwd } from 'process';
import { parse } from 'yaml';

// 获取运行环境
export const getEnv = () => {
  return process.env.RUNNING_ENV;
};

// 读取项目配置
export const getConfig = () => {
  const environment = getEnv();
  const yamlPath = join(cwd(), `./.config/.${environment}.yaml`);
  const file = readFileSync(yamlPath, 'utf-8');
  return parse(file);
};
