// Types partagés pour toute l'application
export type UserRole = 'etudiant' | 'admin';

export interface User {
  id: string;
  nom: string;
  email: string;
  role: UserRole;
}
