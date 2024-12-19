
import { SetMetadata } from '@nestjs/common';

// Définition du décorateur 'Roles' qui permet de spécifier les rôles requis pour accéder à une ressource
export const Roles = (...roles: string[]) => 
  // Utilisation de SetMetadata pour associer les rôles passés à la clé 'roles' dans les métadonnées de la route
  SetMetadata('roles', roles);
