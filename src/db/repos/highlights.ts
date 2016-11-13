import { IDatabase } from "pg-promise"
import sqlProvider from "../sql"
import IResult from "../../interfaces/result"
const sql = sqlProvider.highlights;

export class Repository {
    private db: IDatabase<any>
    
    constructor(db: any){
        this.db = db
    }
    public async create(){
        return this.db.none(sql.create)
    }
    public async add(book_id: number, paragraph_id: number, text: string, start:number, end: number ){
        return await this.db.result(sql.add, [book_id, paragraph_id, text, start, end], (r: any) => r)
    }
    public async findByID ( id: number){
       return await this.db.oneOrNone('SELECT * from highlights where id = $1', id)
    }
    public async remove(id: number){
        return this.db.result(sql.remove, id, (r: IResult) =>  r.rows)
    }
    public async update(id: number, text: string){
        return this.db.result(sql.update, [id, text], (r: IResult) =>  r)
    }
    public async get(id: number){
        return this.db.result('SELECT * from highlights where id=$1', id, (r:IResult) => r.rows)
    }
    public async getAll(){
        return this.db.result('SELECT * from highlights', [], (r:IResult) => r.rows)
    }
    public async getBook(book_id: number){
        return this.db.result(sql.getBook, book_id, (r:IResult) => r.rows)
    }
    public async getParagraph(book_id: number, paragraph_id: number){
        return this.db.result(sql.getParagraph, [book_id, paragraph_id], (r:IResult) => r.rows)
    }
}