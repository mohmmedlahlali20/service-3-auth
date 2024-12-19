import { Injectable } from '@nestjs/common'; 
import { PassportStrategy } from '@nestjs/passport'; 
import { Strategy, ExtractJwt } from 'passport-jwt'; 
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class KeycloakStrategy extends PassportStrategy(Strategy, 'keycloak') { // Définit une stratégie Passport appelée 'keycloak'.
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrait le JWT depuis l'en-tête d'autorisation.
      ignoreExpiration: false, // Rejette les jetons expirés.
      audience: ['cinematy', 'account'], // Définit les audiences acceptées dans le JWT. À la place de auth, il faut mettre le titre du Clients que nous avons déjà créé dans Keycloak
      issuer: 'http://localhost:8080/realms/cinematy', // Identifie l'émetteur attendu du JWT. À la place de auth, il faut mettre le nom du Realm
      algorithms: ['RS256'], // Spécifie l'algorithme utilisé pour signer le JWT.
      secretOrKeyProvider: passportJwtSecret({
        cache: true, // Active la mise en cache des clés JWKS.
        rateLimit: true, // Active une limite de requêtes pour JWKS.
        jwksRequestsPerMinute: 5, // Définit un maximum de 5 requêtes par minute.
        jwksUri: 'http://localhost:8080/realms/cinematy/protocol/openid-connect/certs' // URL pour récupérer les clés publiques JWKS de Keycloak.À la place de XXX, il faut mettre le nom du Realm
      }),
    });
  }

  async validate(payload: any) { // Valide le contenu du JWT après vérification.
    const roles = [
        ...(payload.realm_access?.roles || []), // Récupère les rôles globaux associés au JWT.
        ...(payload.resource_access?.account?.roles || []) // Récupère les rôles spécifiques à la ressource 'account'.
      ];
    return {
      userId: payload.sub, // Identifiant unique de l'utilisateur.
      username: payload.preferred_username, // Nom d'utilisateur préféré.
      roles, // Liste des rôles associés à l'utilisateur.
    };
  }
}
