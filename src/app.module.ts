import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infra/config/environment-config/environment-config.module';
import { TypeormModule } from './infra/config/typeorm/typeorm.module';
import { ExceptionsModule } from './infra/exceptions/exceptions.module';
import { RepositoriesModule } from './infra/repositories/repositories.module';

@Module({
  imports: [EnvironmentConfigModule, TypeormModule, ExceptionsModule, RepositoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
