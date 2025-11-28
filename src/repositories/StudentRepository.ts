import { promises as fs } from "fs";
import path from "path";
import { Student } from "../models/Student";

export class StudentRepository {
  private static dataPath = path.join(process.cwd(), "src/data/students.json");

  static async readJson(): Promise<Student[]> {
    try {
      const data = await fs.readFile(this.dataPath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading the json file", error);
      throw error;
    }
  }

  static async writeJson(students: Student[]): Promise<void> {
    try {
    await fs.writeFile(this.dataPath, JSON.stringify(students, null, 2), "utf8");
    } catch (error) {
      console.error("Error updating the Json file.", error);
      throw error;
    }
  }
}