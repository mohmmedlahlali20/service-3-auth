import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/role.decorator';

@Controller('user')
@UseGuards(AuthGuard('keycloak'), RolesGuard) // applique une vérification d'authentification avec Keycloak et ensuite une vérification des rôles de l'utilisateur.
export class UsersController {
    constructor(private readonly userService: UsersService) { }


    @Get('getOne')
    @Roles('admin') // Ce décorateur applique un rôle spécifique admin à la méthode getStringOne. Cela signifie que seul un utilisateur ayant le rôle admin pourra accéder à cette route.
    getStringOne(): string {
        return this.userService.getStringOne();
    }

    @Get('getTwo')
    @Roles('RH') // Ce décorateur applique le rôle RH à la méthode getStringTwo, indiquant que seul un utilisateur avec le rôle RH pourra accéder à cette route.
    getStringTwo(): string {
        return this.userService.getStringTwo();
    }
}