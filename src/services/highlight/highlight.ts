import { injectable, inject } from "inversify"
import { IHighlightService } from '../../interfaces/highlight-service'
import {IDatabase} from "pg-promise";
import { IExtensions } from "../../db";
import ILogger from "../../interfaces/logger";
import ILoggerFactory from "../../interfaces/logger-factory";
import { __ } from '../../config/constants'
import IResult from '../../interfaces/result'

@injectable()
export class HighlightService implements IHighlightService {
    @inject(__.Database) db: IDatabase<IExtensions> & IExtensions;
    private logger: ILogger;

    public constructor( @inject(__.LoggerFactory) LoggerFactory: ILoggerFactory) {
        this.logger = LoggerFactory.getLogger(this)
    }
    public async onBootstrap() {
        this.logger.info('create highlight table');
        await this.db.highlights.create();
    }
    public async add (book_id:number, paragraph_id: number, text: string, start:number, end:number):Promise<IResult> {
        return await this.db.highlights.add(book_id, paragraph_id, text, start, end)
    }
    public async get(id: number):Promise<IResult>{
        return await this.db.highlights.get(id)
    }
    public async getAll():Promise<IResult>{
        return await this.db.highlights.getAll()
    }
    public async findByID (id: number):Promise<IResult>{
        return await this.db.highlights.findByID(id)
    }
    public async removeByID(id: number):Promise<IResult>{
        return await this.db.highlights.remove(id)
    }
    public async update( id: number, text: string):Promise<IResult>{
        return await this.db.highlights.update(id, text)
    }
    public async getBook(book_id: number):Promise<IResult>{
        return await this.db.highlights.getBook(book_id)     
    }
    public async getParagraph(book_id:number, paragraph_id: number):Promise<IResult>{
        return await this.db.highlights.getParagraph(book_id, paragraph_id)
    }
}