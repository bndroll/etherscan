import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresConfig } from './config/postgres.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EtherscanModule } from './etherscan/etherscan.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV.trim()}.env`,
      isGlobal: true,
      load: [PostgresConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.getOrThrow('postgres'),
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    EtherscanModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
