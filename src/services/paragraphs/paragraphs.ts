import { injectable, inject } from "inversify"
import { IParagraphsService } from '../../interfaces/paragraphs-service'
import "reflect-metadata";
import { IDatabase } from "pg-promise";
import { IExtensions } from "../../db";
import ILogger from "../../interfaces/logger";
import ILoggerFactory from "../../interfaces/logger-factory";
import { __ } from '../../config/constants'
import Raw from '../../interfaces/raw'
import Paragraphs from '../../interfaces/paragraphs'
import IDBParagraph from '../../interfaces/db-paragraph'

@injectable()
export class ParagraphsService implements IParagraphsService {
    private logger: ILogger;
    db: any;
    public constructor( @inject(__.LoggerFactory) LoggerFactory: ILoggerFactory,
        @inject(__.Database) db: IDatabase<IExtensions> & IExtensions
    ) {
        this.db = db;
        this.logger = LoggerFactory.getLogger(this)
    }
    public async onBootstrap() {
        this.logger.info('create paragraphs table');
        await this.db.paragraphs.create();
    }
    public async add(book_id: number, paragraph: string) {
        return await this.db.paragraphs.add(book_id, paragraph)
    }
    public async get(id: number) {
        return await this.db.paragraphs.get(id)
    }
    public async getAll() {
        return await this.db.paragraphs.getAll()
    }
    public async findByID(book_id: number) {
        return await this.db.paragraphs.findByID(book_id)
    }
    public async removeByID(id: number) {
        return await this.db.paragraphs.remove(id)
    }
    public async update(id: number, paragraph: string) {
        return await this.db.paragraphs.update(id, paragraph)
    }
    public async getBook(book_id: number) {
        return await this.db.paragraphs.getBook(book_id)
    }
}
