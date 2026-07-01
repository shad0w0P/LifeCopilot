export interface UserProfile {
  id: number;
  firebase_uid: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  is_active: boolean;
}
