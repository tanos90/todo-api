export class UserLogin {
  username: string;
  password: string;
  public constructor(init?: Partial<UserLogin>) {
    Object.assign(this, init);
  }
}
