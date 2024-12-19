import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { KeycloakStrategy } from './keycloack.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'keycloak' })],
  providers: [KeycloakStrategy],
  exports: [PassportModule],
})
export class AuthModule {}