import { StudentService } from "./services/StudentServices";

async function main() {
  const service = new StudentService();

  console.log("\nLoading Students from JSON file...");
  await service.loadStudents();

  console.log("All Students:");
  service.getAll().forEach(s => console.log(`${s.id} - ${s.name} - ${s.program} - ${s.school}`));

  console.log("\nList by school:");
  service.filterBySchool("BYU-Idaho").forEach(s => console.log(`${s.name} - School: ${s.school}`));

  console.log("\nList by program:");
  service.filterByProgram("Accounting").forEach(s => console.log(`${s.name} - Program: ${s.program}`));

  console.log("\nCount by Program");
  const total = service.countByProgram("Accounting");
  console.log(`Total of Student in the program: ${total}\n`);
}

main();