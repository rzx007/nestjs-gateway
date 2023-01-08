import { Provider } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { getConfig } from '@/utils/index';
import { join } from 'path';

// 直接使用 typeorm，自由封装 Providers 导入使用
// 这只是示例

const databaseType: DataSourceOptions['type'] = 'mysql';
const { MYSQL_CONFIG } = getConfig();
const MYSQL_DATABASE_CONFIG = {
  ...MYSQL_CONFIG,
  type: databaseType,
  entities: [join(__dirname, `../../**/*.entity{.ts,.js}`)],
};
const MYSQL_DATA_SOURCE = new DataSource(MYSQL_DATABASE_CONFIG);

export const MySqlDbProvider: Provider = {
  provide: 'MYSQL_DATA_SOURCE',
  useFactory: async () => {
    await MYSQL_DATA_SOURCE.initialize();
    return MYSQL_DATA_SOURCE;
  },
};
