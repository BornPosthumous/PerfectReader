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
        return await this.db.none(sql.create)
    }
    public async add(book_id: number, paragraph_id: number, text: string, start:number, end: number ){
        return await this.db.none(sql.add, [book_id, paragraph_id, text, start, end])
    }
    public async findByID ( id: number){
       return await this.db.oneOrNone('SELECT * from highlights where id = $1', id)
    }
    public async remove(id: number){
        return await this.db.any(sql.remove, id)
    }
    public async update(id: number, text: string){
        return await this.db.none(sql.update, [id, text])
    }
    public async get(id: number){
        return await this.db.any('SELECT * from highlights where id=$1', id)
    }
    public async getAll(){
        return await this.db.any('SELECT * from highlights', [])
    }
    public async getBook(book_id: number){
        return await this.db.one(sql.getBook, book_id)
    }
    public async getParagraph(book_id: number, paragraph_id: number){
        return await this.db.any(sql.getParagraph, [book_id, paragraph_id])
    }
}
