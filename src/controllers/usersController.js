const databaseConnect = require("../database/sqlite/index")

const appError = require('../utils/appError');

const { hash, compare } = require("bcryptjs")
class usersController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const hashedPassword = await hash(password, 8)

    // if (!name) {
    //   throw new appError('Nome é obrigatório')
    //   return
    // };

    const database = await databaseConnect();

    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)" , [ email ]);

    if(checkUserExists) {
      throw new appError("Este e-mail já está em uso");
    }

    await database.run(
      `INSERT INTO users ( name, email, password ) VALUES (?, ?, ?)`, 
      [name, email, hashedPassword]
    )

    return res.status(201).json()

  };

  async update(req, res) {
    const { name, email, password, old_password } = req.body;
    const {id} = req.params

    const database = await databaseConnect();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if(!user) {
      throw new appError("Este usuário não existe.")
    };

    const checkEmailExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if(checkEmailExists && checkEmailExists.id !== user.id) {
      throw new appError("Este email já está em uso.")
    };

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(password && !old_password) {
      throw new appError("Por favor, informe a senha antiga.")
    };

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword) {
        throw new appError("Senha antiga está incorreta. Por favor, tente novamente")
      }
    };

    user.password = await hash(password,8)

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME("now")
      WHERE id = ?
    `, [user.name, user.email, user.password, id]
    );

    return res.status(201).json();

  };
};

module.exports = usersController;
