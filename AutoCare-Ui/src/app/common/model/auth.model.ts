export class LoginDTO {
  constructor(
    public username: string = '',
    public password: string = '',
    public captcha: string = '',
  ) {
  }
}

export class LoginResponseDTO {
  constructor(
    public token: string | null = ''
  ) {
  }
}
