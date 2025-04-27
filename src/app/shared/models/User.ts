import { immerable } from 'immer';

export class User {
  static [immerable] = true;

  constructor(
    public id: string,
    public fullName: string,
    public email: string,
    public password: string
  ) {}
}
