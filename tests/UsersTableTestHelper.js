// /* istanbul ignore file */
// const pool = require("../src/Infrastructures/database/postgres/pool");

// const UsersTableTestHelper = {
//   async addUser({
//     id = "user-123",
//     username = "dicoding",
//     password = "secret",
//     fullname = "Dicoding Indonesia",
//   }) {
//     const query = {
//       text: "INSERT INTO users VALUES($1, $2, $3, $4)",
//       values: [id, username, password, fullname],
//     };

//     await pool.query(query);
//   },

//   async findUsersById(id) {
//     const query = {
//       text: "SELECT * FROM users WHERE id = $1",
//       values: [id],
//     };

//     const result = await pool.query(query);
//     return result.rows;
//   },

//   async cleanTable() {
//     await pool.query("DELETE FROM users WHERE 1=1");
//   },
// };

// module.exports = UsersTableTestHelper;

/* istanbul ignore file */
const pool = require("../src/Infrastructures/database/postgres/pool");

const UsersTableTestHelper = {
  async addUser({
    id = `user-${Date.now()}`, // ID unik berdasarkan timestamp
    username = `user_${Date.now()}`, // Username juga dibuat unik
    password = "secret",
    fullname = "Dicoding Indonesia",
  }) {
    const query = {
      text: "INSERT INTO users VALUES($1, $2, $3, $4)",
      values: [id, username, password, fullname],
    };

    try {
      await pool.query(query);
    } catch (error) {
      console.error("Gagal menambahkan user ke database:", error.message);
      throw error;
    }
  },

  async findUsersById(id) {
    const query = {
      text: "SELECT * FROM users WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query("DELETE FROM users");
  },
};

module.exports = UsersTableTestHelper;
