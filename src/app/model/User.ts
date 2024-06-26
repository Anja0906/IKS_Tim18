export interface User {
  id: number;
  name: string;
  surname : string;
  profilePicture : string;
  telephoneNumber : string;
  email: string;
  address: string;
  password: string;
  blocked : boolean;
  active : boolean;
}
