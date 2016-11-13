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
import Validate from '../validate'
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
    @Validate
    @Post('/book')
    private async getBook ( req: IReq, res: Response, next: Next){
        this.logger.info("Getting all Paragraphs in book" , req.body)
        let result: IResult; 
        try{
            result = await this.ParagraphsService.getBook(req.body.book_id)
            res.json(result)

        } catch(e){
            this.logger.error(e)
            res.send(e)
        }
    }
    @Validate
    @Post('/getID')
    private async findByID(req: IReq, res:Response, next:Next){
        this.logger.info('Getting paragraph : ' , req.body)
        let result: IResult; 
        try{
            result = await this.ParagraphsService.get(req.body.id)
            res.send(200, result)
        } catch (e) {
            this.logger.error(e)
            res.send(e)
        }
    }
    @Validate
    @Post('/add')
    private async addParagraph(req: IReq, res:Response, next:Next){
        this.logger.info('Adding paragraph :' , req.body)
        let result: IResult; 
        try{
            const book_id_exists : IDBParagraph | null 
                = await this.ParagraphsService.findByID(req.body.book_id)
            
            if(!book_id_exists){ throw new Error("book_id not in db")}
                
            result = await this.ParagraphsService.add(req.body.book_id , req.body.paragraph) 
                    
        } catch (e) {
            res.send(e)
        }
        res.send(result)
        return next()
    }
    @Validate
    @Post('/update')
    private async update(req: IReq, res:Response, next:Next){
        this.logger.info("Updating paragraph : " , req.body)
        let result:IResult;
        try{
            const id_exists : IDBParagraph | null 
                = await this.ParagraphsService.findByID(req.body.id)
            
            if(!id_exists){throw new Error("id not in db")}

            result = await this.ParagraphsService.update(req.body.id, req.body.paragraph)
            res.send(result)
        } catch(e){
            this.logger.error(e)
            res.send(e)
        }
    }
    @Validate
    @Delete('/deleteID')
    private async removeByID (req: IReq, res:Response, next:Next){
        this.logger.info("Deleting paragraph :  " , req.body )
        let result:IResult;
        try{

            const id_exists : IDBParagraph | null 
                = await this.ParagraphsService.findByID(req.body.id)
            
            if(!id_exists){throw new Error("id not in db")}

            result = await this.ParagraphsService.removeByID(req.body.id)

        } catch(e) { 
            this.logger.warn(e)
            res.send(e)
        }
        res.send(result)
        return next()
    }
}