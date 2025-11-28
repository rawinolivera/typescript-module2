export class Student {
  constructor(
    public id: number,
    public name: string,
    public dateOfBirth: Date,
    public email: string,
    public program: string,
    public school: string
  ) {}
}