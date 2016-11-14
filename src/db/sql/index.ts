import { QueryFile } from "pg-promise"
import * as path from "path"

export class SQL_Helper { 
    public static readFile(file: string){
        const fullpath: string = path.join('../src/db/sql', file)
        const options = {
            minify: true,
            params: {
                schema: 'public'
            }
        }
        return new QueryFile(fullpath, options)
    }
}
export default {
    users: {
        create: SQL_Helper.readFile('users/create.sql'),
        empty: SQL_Helper.readFile('users/empty.sql'),
        init: SQL_Helper.readFile('users/init.sql'),
        drop: SQL_Helper.readFile('users/drop.sql'),
        add: SQL_Helper.readFile('users/add.sql'),
        updatePassword: SQL_Helper.readFile('users/update-password.sql'),
        createUsersView: SQL_Helper.readFile('users/users-view.sql'),
        remove: SQL_Helper.readFile('users/remove.sql'),
    },
    texts: {
       create: SQL_Helper.readFile('texts/create.sql'),
       add: SQL_Helper.readFile('texts/add.sql'),
       remove: SQL_Helper.readFile('texts/remove.sql'),
       update: SQL_Helper.readFile('texts/update.sql'),
       updateTitle: SQL_Helper.readFile('texts/update-title.sql')
    },
    paragraphs: {
        create: SQL_Helper.readFile('paragraphs/create.sql'),
        add: SQL_Helper.readFile('paragraphs/add.sql'),
        remove: SQL_Helper.readFile('paragraphs/remove.sql'),
        getBook: SQL_Helper.readFile('paragraphs/getBook.sql'),
        update: SQL_Helper.readFile('paragraphs/update.sql')
    },
    highlights: {
        create: SQL_Helper.readFile('highlights/create.sql'),
        add: SQL_Helper.readFile('highlights/add.sql'),
        getBook: SQL_Helper.readFile('highlights/getBook.sql'),
        getParagraph: SQL_Helper.readFile('highlights/getParagraph.sql'),
        remove: SQL_Helper.readFile('highlights/remove.sql'),
        update: SQL_Helper.readFile('highlights/update.sql')
    }
}