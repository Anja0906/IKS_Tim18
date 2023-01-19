export interface IDriver {
  id: number;
  name: string;
  surname: string;
  profilePicture: string;
  telephoneNumber: string;
  email: string;
  password: string;
  address: string;
}

export class Driver implements IDriver{
  address!: string;
  email!: string;
  id!: number;
  name!: string;
  password!: string;
  profilePicture!: string;
  surname!: string;
  telephoneNumber!: string;

}

