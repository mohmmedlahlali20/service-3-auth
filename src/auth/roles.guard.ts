
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  // Injection de Reflector, qui permet d'accéder aux métadonnées définies sur les routes
  constructor(private reflector: Reflector) {}

  // Implémentation de la méthode canActivate qui détermine si l'accès à la route est autorisé
  canActivate(context: ExecutionContext): boolean {
    // Récupération des rôles requis depuis les métadonnées de la route
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    
    // Si aucune métadonnée de rôles n'est trouvée, l'accès est autorisé
    if (!requiredRoles) {
      return true;
    }

    // Récupération de l'utilisateur depuis la requête HTTP
    const { user } = context.switchToHttp().getRequest();
 
    // Vérification si l'utilisateur possède l'un des rôles requis
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}