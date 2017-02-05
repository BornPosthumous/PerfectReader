import { IDatabase } from "pg-promise"
import sqlProvider from "../sql"
import IResult from '../../interfaces/result'
const sql = sqlProvider.texts;

export class Repository {
    private db: IDatabase<any>

    constructor(db: any) {
        this.db = db
    }
    public async create() {
        return this.db.none(sql.create)
    }
    public async add(title: string, text: string): Promise<Array<any>> {
        return await this.db.any(sql.add, [title, text])
    }
    public async findByID(id: number): Promise<IResult> {
        return await this.db.oneOrNone('SELECT * from texts where id = $1', id)
    }
    public async remove(id: number): Promise<IResult> {
        return this.db.result(sql.remove, id, (r: IResult) => r)
    }
    public async getAll(): Promise<any> {
        return this.db.any('SELECT * from texts where deleted = false')
    }
    public async updateText(id: number, text: string): Promise<IResult> {
        return this.db.result(sql.update, [id, text], (r: IResult) => r.rows)
    }
    public async updateTitle(id: number, title: string): Promise<IResult> {
        return this.db.result(sql.updateTitle, [id, title], (r: IResult) => r.rows)
    }

}
