import { Item } from './item.model';

export class Todo {
  id: string;
  name: string;
  items: Item[];
  show = true;
  public constructor(init?: Partial<Todo>) {
    Object.assign(this, init);
  }
}
