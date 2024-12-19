import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class KeycloakService {
  private readonly keycloakAdminUrl = 'http://localhost:8080/admin/realms/cinematy/users'; // URL API Admin
  private readonly keycloakTokenUrl = 'http://localhost:8080/realms/cinematy/protocol/openid-connect/token';

  /**
   * Crée un utilisateur dans Keycloak via l'API.
   */

  async registerUser(accessToken: string, userData: any) {
    try {
      const response = await axios.post(this.keycloakAdminUrl, userData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      // Log the error response if available
      console.error('Error creating user:', error.response?.data || error.message);
      // Throw the error with more information
      throw new Error(`Failed to create user: ${error.response?.data?.error || error.message}`);
    }
  }
  

  /**
   * Récupère un token d'accès admin pour appeler les API Keycloak.
   */
  async getAdminAccessToken() {
    const params = new URLSearchParams();
    params.append('client_id', 'admin-cli'); // Correct key
    params.append('username','admin'); // Use environment variables
    params.append('password','admin');
    params.append('grant_type', 'password');

    try {
      const response = await axios.post(this.keycloakTokenUrl, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      return response.data.access_token;
    } catch (error) {
      console.error('Erreur lors de la récupération du token admin:', error.response?.data || error.message);
      throw new Error('Impossible de récupérer le token admin.');
    }
  }
}
