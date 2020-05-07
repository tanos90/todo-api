export class Item {
  name: string;
  status: boolean;
  public constructor(init?: Partial<Item>) {
    Object.assign(this, init);
  }
}
