const db = require("../database/db");
require("dotenv").config();

class Classes {
  constructor({
    class_id,
    category,
    class_name,
    class_time,
    duration,
    description,
    teacher_id,
  }) {
    this.id = class_id;
    this.category = category;
    this.className = class_name;
    this.classTime = class_time;
    this.duration = duration;
    this.description = description;
    this.teacher_id = teacher_id;
  }

  static async getAll() {
    const response = await db.query("SELECT * FROM classes");
    return response.rows.map((row) => new Classes(row));
  }

  static async getById(id) {
    const response = await db.query(
      "SELECT * FROM classes WHERE class_id = $1",
      [id]
    );
    if (response.rows.length !== 1) {
      throw new Error("Unable to locate class.");
    }
    return new Classes(response.rows[0]);
  }

  async create() {
    const query =
      "INSERT INTO classes (category, class_name, class_time, duration, description, teacher_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING class_id";
    const values = [
      this.category,
      this.className,
      this.classTime,
      this.duration,
      this.description,
      this.teacherId,
    ];
    const response = await db.query(query, values);
    this.id = response.rows[0].class_id;
    return this;
  }

  async update() {
    const query =
      "UPDATE classes SET category = $1, class_name = $2, class_time = $3, duration = $4, description = $5, teacher_id = $6 WHERE class_id = $7";
    const values = [
      this.category,
      this.className,
      this.classTime,
      this.duration,
      this.description,
      this.teacherId,
      this.id,
    ];
    await db.query(query, values);
    return this;
  }

  async delete() {
    await db.query("DELETE FROM classes WHERE class_id = $1", [this.id]);
  }
}

module.exports = Classes;
