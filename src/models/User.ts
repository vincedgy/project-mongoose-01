import Address from "./Address";

export default class User {
  constructor(
    public firstName: string, 
    public lastName: string, 
    public email: string, 
    public age: number,
    public hobbies: Array<string>,
    public address?: Address
    ) {}
}