// types/user.ts
export type UserRole = "Admin" | "Pharmacist";

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
}
