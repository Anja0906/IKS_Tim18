export interface User {
  id: number;
  firstName: string;
  lastName : string;
  imageLink : string;
  telephone : string;
  email: string;
  address: string;
  password: string;
  blocked : boolean;
  active : boolean;
}
