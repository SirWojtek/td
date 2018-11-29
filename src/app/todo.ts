export class Todo {
  id: number;
  title = '';
  complete = false;
  timeSpend = 0; // seconds

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
