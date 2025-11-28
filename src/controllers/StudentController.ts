import { Request, Response } from "express";
import { Student } from "../models/Student";
import { StudentRepository } from "../repositories/StudentRepository";

export class StudentController {

  static async getStudents(req: Request, res: Response){
    try {
      const students = await StudentRepository.readJson();
      return res.json(students);              
    } catch (error: any) {
      return res.status(500).json({ message: "Error reading data", error });
    }
  }

  static async getStudentById(req: Request, res: Response){
    try {
      const students = await StudentRepository.readJson();
      const id = Number(req.params.id);

      const student = students.find((s: any) => s.id === id);

      if(!student){
        return res.status(404).json({ message: "Student not found" });
      }

      return res.json(student);

    } catch (error: any) {
      return res.status(500).json({ message: "Error reading data", error });
    }
  }

  static async createStudent(req: Request, res: Response){
    try {
      const students = await StudentRepository.readJson();
      const {id, name, dateOfBirth, email, program, school} = req.body;
      const studentExist = students.find((s: any) => s.id === id);
      if(studentExist){
        return res.status(400).json({ mesagge: `The ID ${id} already exists` });
      }
      const newStudent = new Student(id, name, dateOfBirth, email, program, school);
      students.push(newStudent);

      await StudentRepository.writeJson(students);
      
      return res.status(201).json(newStudent);
    } catch (error: any) {
      return res.status(500).json({ message: "Error adding a new record", error });
    }
  }

  static async updateStudent(req: Request, res: Response){
    try {
      const students = await StudentRepository.readJson();
      const id = Number(req.params.id);
      const { name, dateOfBirth, email, program, school } = req.body;
      const index = students.findIndex((s: any) => s.id === id);

    if (index === -1){
      return res.status(404).json({ message: `Student with ID ${id} not found`});
    }

    students[index] = {
      ...students[index],
      name,
      dateOfBirth,
      email,
      program,
      school
    };

    await StudentRepository.writeJson(students);

    return res.status(200).json({
      message: `Student with ID ${id} updated`, student: students[index]
    });
    } catch (error: any) {
      return res.status(500).json({ message: "Error updating data." });
    }
  }

  //DELETE
  static async deleteStudent(req: Request, res:Response){
    try {
      const students = await StudentRepository.readJson();
      const id = Number(req.params.id);
      const index = students.findIndex((s: any) => s.id === id);

      if(index === -1){
        return res.status(404).json({ message: `Student with ID ${id} not found.`});
      }

      const removeStudent = students[index];
      students.splice(index, 1);

      await StudentRepository.writeJson(students);
      return res.status(200).json({ message: `Student with ID ${id} deleted successfully`, student: removeStudent });
    } catch (error: any) {
      return res.status(500).json({ message: "Error deleting record."});
    }
  }
}