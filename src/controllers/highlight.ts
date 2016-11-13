import { Request, Response, Next } from "restify";
import { InversifyRestifyServer, Controller, Get, Post, Delete } from "inversify-restify-utils";
import { injectable, inject,  } from "inversify"
import { __ , API_BASE } from "../config/constants"
import IController from '../interfaces/controller'
import ILoggerFactory  from '../interfaces/logger-factory'
import ILogger from '../interfaces/logger'
import { IHighlightService } from "../interfaces/highlight-service"
import IReq from '../interfaces/req'
import IResult from '../interfaces/result'
import Validate from '../validate'

@Controller(`${API_BASE}/highlights`)
@injectable()
export class HighlightController implements IController {
    private logger: ILogger

    constructor(
        @inject(__.LoggerFactory) private LoggerFactory : ILoggerFactory,
        @inject(__.HighlightService) private HighlightService : IHighlightService
    ) {
        this.logger = LoggerFactory.getLogger(this)
    }

    @Get('/')
    private async index(req: IReq, res: Response, next: Next) {
        this.logger.info("Getting all highlights")
        const result:IResult = await this.HighlightService.getAll()
        res.send(result)
        return next()
    }
    @Validate
    @Post('/get/book')
    private async getBook ( req: IReq, res: Response, next: Next){
        this.logger.info("Getting highlights from book" , req.body)
        let result: IResult; 
        try{
            result = await this.HighlightService.getBook(req.body.book_id)
            res.json(result)
        } catch(e){
            this.logger.error(e)
            res.send(e)
        }
    }
    @Validate
    @Post('/get')
    private async findByID(req: IReq, res:Response, next:Next){
        this.logger.info('Getting highlight by id:' , req.query)
        let result: IResult; 
        try{
            result = await this.HighlightService.get(req.body.id)
            res.send(200, result)
        } catch (e) {
            this.logger.error(e)
            res.send(e)
        }
    }
    @Validate
    @Post('/get/paragraph')
    private async getParagraph ( req: IReq, res: Response, next: Next){
        this.logger.info("Getting all highlights in paragraph" , req.query)
        let result: IResult; 
        try{
            result = await this.HighlightService.getParagraph(req.body.book_id, req.body.paragraph_id)
            res.json(result)
        } catch(e){
            this.logger.error(e)
            res.send(e)
        }
    }
    @Validate
    @Post('/add')
    private async addHighlight(req: IReq, res:Response, next:Next){
        this.logger.info('Adding highlight:' , req.body)
        let result: IResult; 
        try{

            const book_id_exists : any | null 
                = await this.HighlightService.findByID(req.body.book_id)
            
            if(!book_id_exists){ throw new Error("book_id not in db")}
                
            result = await this.HighlightService
                .add(   req.body.book_id , 
                        req.body.paragraph_id, 
                        req.body.text,
                        req.body.start, 
                        req.body.end ) 
            res.send(200, result)   
        } catch (e) {
            this.logger.error(e)
            res.send(e)
        }

        return next()
    }
    @Validate
    @Post('/update/text')
    private async update(req: IReq, res:Response, next:Next){
        this.logger.info("Updating highlight: " , req.body)
        let result:IResult;
        try{
            const id_exists : any | null 
                = await this.HighlightService.findByID(req.body.id)
            
            if(!id_exists){throw new Error("id not in db")}
            result = await this.HighlightService
                .update(req.body.id , req.body.text)
            
            res.send(200, result)
        } catch(e){
            this.logger.error(e)
            res.send(e)
        }
    }
    @Validate
    @Delete('/deleteID')
    private async removeByID (req: IReq, res:Response, next:Next){
        this.logger.info("Deleting highlight :  " , req.body )
        let result:IResult;
        try{
            const id_exists : any | null 
                = await this.HighlightService.findByID(req.body.id)
            
            if(!id_exists){throw new Error("id not in db")}

            result = await this.HighlightService.removeByID(req.body.id)
            res.send(200, result)

        } catch(e) { 
            this.logger.warn(e)
            res.send(e)
        }
        return next()
    }
}