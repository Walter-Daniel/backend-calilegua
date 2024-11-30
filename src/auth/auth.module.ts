import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { OperatorsModule } from 'src/operators/operators.module';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [OperatorsModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
