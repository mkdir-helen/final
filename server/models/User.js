const db = require('./db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
class User {
    constructor(id, name, email, username, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.username = username;
        this.password = password;
    }
    //CREATE
    static addUser(name, email, username, password) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        return db
            .one(
                `insert into users
                (name, email, username, password)
                    values
                        ($1, $2, $3, $4)
                        returning id`,
                [name, email, username, hash]
            )
            .then(data => {
                return new User(data.id, name, email, username);
            });
    }
    //RETRIEVE
    static getAll() {
        return db.any(`select * from users`);
    }

    static getByUsername(username) {
        return db
            .one(`select * from users where username=$1`, [username])
            .then(user => {
                return new User(
                    user.id,
                    user.name,
                    user.email,
                    user.username,
                    user.password
                );
            });
    }

    static getByEmail(email) {
        return db
            .one(`select * from users where email=$1`, [email])
            .then(user => {
                return new User(
                    user.id,
                    user.name,
                    user.email,
                    user.username,
                    user.password
                );
            });
    }

    static getById(id) {
        return db
            .one(`select * from users where id=$1`, [id])
            .then(user => {
                return new User(
                    user.id,
                    user.name,
                    user.email,
                    user.username,
                    user.password
                );
            });
    }

    checkPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }

    //UPDATE
    updateEmail(newEmail) {
        return db.result(
            `update users
            set email=$1
            where id=$2`,
            [newEmail, this.id]
        );
    }
    updateName(newName) {
        return db.result(
            `update users
            set name=$1
            where id=$2`,
            [newName, this.id]
        );
    }
    updateUsername(newUsername) {
        return db.result(
            `update users
            set username=$1
            where id=$2`,
            [newUsername, this.id]
        );
    }
}


module.exports = User;