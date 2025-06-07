export class Profile {

  constructor(
    id: number,
    name: string,
    password: string,
    email: string
  ) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.email = email;
  }

  id?: number = 0;
  name: string = '';
  password: string = '';
  email: string = '';
  created_at?: string  = '';
}
