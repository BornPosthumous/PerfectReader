import { IDatabase } from "pg-promise"
import sqlProvider from "../sql"
import IDBParagraph from '../../interfaces/db-paragraph'
import IResult from "../../interfaces/result"
import * as pgp from "pg-promise"
const sql = sqlProvider.paragraphs;

export class Repository {
    private db: IDatabase<any>

    constructor(db: any) {
        this.db = db
    }
    public async create(): Promise<any> {
        return this.db.none(sql.create)
    }
    public async add(book_id: number, paragraph: string, count: number): Promise<IResult> {
        return await this.db.result(sql.add, [book_id, paragraph, count], (r: IResult) => r.rows)
    }
    public async findByID(id: number): Promise<any> {
        return await this.db.oneOrNone('SELECT * from texts where id = $1', id)
    }
    public async remove(id: number): Promise<IResult> {
        return this.db.result(sql.remove, id, (r: IResult) => r.rows)
    }
    public async update(id: number, paragraph: string): Promise<IResult> {
        return await this.db.result(sql.update, [id, paragraph], (r: IResult) => r.rows)
    }
    public async get(id: number): Promise<IResult> {
        return await this.db.one('SELECT * from paragraphs where id=$1', id)
    }
    public async getAll(): Promise<any> {
        return await this.db.any('SELECT * from paragraphs', [])
    }
    public async getBook(book_id: number): Promise<any[]> {
        return await this.db.any(sql.getBook, book_id)
    }
}
