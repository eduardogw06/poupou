interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  photo: string;
  google_id: string;
  is_admin: boolean;
  dark_theme: boolean;
}

export { ICreateUserDTO };
