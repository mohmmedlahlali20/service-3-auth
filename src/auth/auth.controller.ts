import { Body, Controller, Post } from '@nestjs/common';
import { KeycloakService } from './keycloak.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly keycloakService: KeycloakService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const accessToken = await this.keycloakService.getAdminAccessToken();
    const user = await this.keycloakService.registerUser(accessToken, createUserDto);
    return {
      message: 'Utilisateur créé avec succès.',
      user,
    };
  }
}
