import { Student } from "../models/Student";
import { StudentRepository } from "../repositories/StudentRepository";

export class StudentService {
  private students: Student[] = [];

  async loadStudents() {
    const data = await StudentRepository.readJson();
    this.students = data.map(s =>
      new Student(s.id, s.name, new Date(s.dateOfBirth), s.email, s.program, s.school)
    );
  }

  filterBySchool(school: string): Student[] {
    return this.students.filter(s => s.school === school);
  }

  filterByProgram(program: string): Student[] {
    return this.students.filter(s => s.program === program);
  }

  getAll(): Student[] {
    return this.students;
  }

  async saveChanges() {
    await StudentRepository.writeJson(this.students);
  }

  countByProgram(program: string, index = 0): number {
    if (index >= this.students.length) return 0;

    const add = this.students[index].program === program ? 1 : 0;
    return add + this.countByProgram(program, index + 1);
  }
}