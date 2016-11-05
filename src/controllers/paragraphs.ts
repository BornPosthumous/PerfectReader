import { Request, Response, Next } from "restify";
import { InversifyRestifyServer, Controller, Get, Post, Delete } from "inversify-restify-utils";
import { injectable, inject,  } from "inversify"
import { __ , API_BASE } from "../config/constants"
import IController from '../interfaces/controller'
import ILoggerFactory  from '../interfaces/logger-factory'
import ILogger from '../interfaces/logger'
import { IParagraphsService } from "../interfaces/paragraphs-service"
import IDBParagraph from '../interfaces/db-paragraph'
import IReq from '../interfaces/req'
import IResult from '../interfaces/result'

@Controller(`${API_BASE}/paragraphs`)
@injectable()
export class ParagraphsController implements IController {
    private logger: ILogger

    constructor(
        @inject(__.LoggerFactory) private LoggerFactory : ILoggerFactory,
        @inject(__.ParagraphsService) private ParagraphsService : IParagraphsService
    ) {
        this.logger = LoggerFactory.getLogger(this)
    }

    @Get('/')
    private async index(req: IReq, res: Response, next: Next) {
        this.logger.info("Getting all Paragraphs")
        const result:IResult = await this.ParagraphsService.getAll()
        res.send(result)
        return next()
    }
    @Get('/book')
    private async getBook ( req: IReq, res: Response, next: Next){
        this.logger.info("Getting all Paragraphs in book" , req.query)
        let result: IResult; 
        try{
            const book_id: number | null 
                = req.query.book_id ? req.query.book_id : null

            if(!book_id){ throw new Error("No book_id on query")}

            result = await this.ParagraphsService.getBook(book_id)

            res.json(result)
        } catch(e){
            this.logger.error(e)
            res.send(e)
        }
    }
    @Get('/get')
    private async get(req: IReq, res:Response, next:Next){
        this.logger.info('Getting paragraph : ' , req.query)
        let result: IResult; 
        try{
            const id: number | null 
                = req.query.id ? req.query.id : null

            if(!id){ throw new Error("No id on query")}

            result = await this.ParagraphsService.get(id)
            res.send(result)
        } catch (e) {
            this.logger.error(e)
            res.send(e)
        }
    }

    @Post('/add')
    private async addText(req: IReq, res:Response, next:Next){
        this.logger.info('Adding paragraph :' , req.query)
        let result: IResult; 
        try{
            const book_id: number | null 
                = req.query.book_id ? req.query.book_id : null

            if(!book_id){ throw new Error("No book_id on query")}

            const book_id_exists : IDBParagraph | null 
                = await this.ParagraphsService.findByID(book_id)
            
            if(!book_id_exists){ throw new Error("book_id not in db")}
                
            const paragraph: string | null 
                = (req.query.paragraph && req.query.paragraph.length > 0 )
                ? req.query.paragraph
                : null

            if(!paragraph){ throw new Error("No paragraph")}

            result = await this.ParagraphsService.add(book_id , paragraph) 
                    
        } catch (e) {
            res.send(e)
        }
        res.send(result)
        return next()
    }
    @Post('/update')
    private async update(req: IReq, res:Response, next:Next){
        this.logger.info("Updating paragraph : " , req.query)
        let result:IResult;
        try{
            const id : number | null 
                = req.query.id ? req.query.id : null
            
            if(!id){ throw new Error("No id on query")}

            const id_exists : IDBParagraph | null 
                = await this.ParagraphsService.findByID(id)
            
            if(!id_exists){throw new Error("id not in db")}
            const paragraph: string | null 
                = (req.query.paragraph && req.query.paragraph.length > 0 )
                ? req.query.paragraph
                : null

            if(!paragraph){ throw new Error("No paragraph")}

            result = await this.ParagraphsService.update(id, paragraph)
            res.send(result)
        } catch(e){
            this.logger.error(e)
            res.send(e)
        }
    }
    @Delete('/deleteID')
    private async removeByID (req: IReq, res:Response, next:Next){
        this.logger.info("Deleting paragraph :  " , req.query )
        let result:IResult;
        try{
            const id : number | null = 
                req.query.id ? req.query.id : null

            const id_exists : IDBParagraph | null 
                = await this.ParagraphsService.findByID(id)
            
            if(!id_exists){throw new Error("id not in db")}

            result = await this.ParagraphsService.removeByID(id)

        } catch(e) { 
            this.logger.warn(e)
            res.send(e)
        }
        res.send(result)
        return next()
    }
}