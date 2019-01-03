const db = require('./db');

class Image {
    constructor(id, name, url, user_id){
        this.id=id;
        this.name=name;
        this.url=url;
    }
    static addImage(name, url, user_id){
        return db
            .one(
                `insert into images
                (name, url, user_id)
                values
                ($1, $2, $3)
                returning id`,
                    [name, url, user_id]
            )
            .then(result => {
                return new Image(result.id, name, url, user_id);
            });
    }
    static getByUser(user_id){
        return db.any(`select * from images where user_id = $1`, [user_id]);
    }
    static getById(id){
        return db.one(`select * from images where id=$1`, [id]);
    }

    static updateName(id, newName){
        return db.result(`update images set name=$1, where id=$2`,
        [newName, id]);
    }

    static delete(id){
        return db.result(`delete from images where id=$1`, [id]);
    }
}

module.exports = Image;