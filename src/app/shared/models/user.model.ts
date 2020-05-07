export class User {
  username: string;
  role: string;
  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
