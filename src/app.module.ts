import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
import { getConfig } from './utils';
import { ThirdPartyModule } from './third-party/third-party.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './authentication/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@/authorization/guards/roles.guard';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_CONFIG').host,
        port: configService.get('MYSQL_CONFIG').port,
        username: configService.get('MYSQL_CONFIG').username,
        password: configService.get('MYSQL_CONFIG').password,
        database: configService.get('MYSQL_CONFIG').database,
        autoLoadEntities: true, // 自定导入实体类
        synchronize: true,
      }),
    }),
    UserModule,
    UploadModule,
    ThirdPartyModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
