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
    /**
     * This route gets all the highlights
     * @param {string} req -
     * @param {string} res -
     * @param {string} next -
     */
    @Get('/')
    private async index(req: IReq, res: Response, next: Next) {
        this.logger.info("Getting all highlights")
        const result:IResult = await this.HighlightService.getAll()
        res.send(result)
        return next()
    }
    @Get('/get/book')
    private async getBook ( req: IReq, res: Response, next: Next){
        this.logger.info("Getting highlights from book" , req.body)
        let result: IResult;
        try{
            const book_id: number | null
                = req.body.book_id ? req.body.book_id : null

            if(!book_id){ throw new Error("No book_id on query")}

            result = await this.HighlightService.getBook(book_id)
            res.json(result)
        } catch(e){
            this.logger.error(e)
            res.send(e)
        }
    }

    @Get('/get')
    private async get(req: IReq, res:Response, next:Next){
        this.logger.info('Getting highlight by id:' , req.body)
        let result: IResult;
        try{
            const id: number | null
                = req.body.id ? req.body.id : null

            if(!id){ throw new Error("No id on query")}

            result = await this.HighlightService.get(id)
            res.send(result)
        } catch (e) {
            this.logger.error(e)
            res.send(e)
        }
    }
    @Get('/get/paragraph')
    private async getParagraph ( req: IReq, res: Response, next: Next){
        this.logger.info("Getting all highlights in paragraph" , req.body)
        let result: IResult;
        try{
            const book_id: number | null
                = req.body.book_id ? req.body.book_id : null

            if(!book_id){ throw new Error("No book_id on query")}
            const paragraph_id: number | null
                = req.body.paragraph_id ? req.body.paragraph_id : null

            if(!book_id){ throw new Error("No book_id on query")}
            result = await this.HighlightService.getParagraph(book_id, paragraph_id)
            res.json(result)
        } catch(e){
            this.logger.error(e)
            res.send(e)
        }
    }
    @Post('/add')
    private async addHighlight(req: IReq, res:Response, next:Next){
        this.logger.info('Adding highlight:' , req.body)
        let result: IResult;
        try{
            const book_id: number | null
                = req.body.book_id ? req.body.book_id : null

            if(!book_id){ throw new Error("No book_id on query")}

            const book_id_exists : any | null
                = await this.HighlightService.findByID(book_id)

            if(!book_id_exists){ throw new Error("book_id not in db")}

            const paragraph_id: number | null
                = req.body.paragraph_id ? req.body.paragraph_id : null

            if(!book_id){ throw new Error("No paragraph_id on query")}

            const start: number | null
                = req.body.start ? req.body.start : null

            if(!start){ throw new Error("No start position on query")}

            const end: number | null
                = req.body.end ? req.body.end : null

            if(!end){ throw new Error("No end position on query")}

            const text: string | null
                = (req.body.text && req.body.text.length > 0 )
                ? req.body.text
                : null

            if(!text){ throw new Error("No text")}

            result = await this.HighlightService.add(book_id , paragraph_id, text, start, end)
            res.send(result)
        } catch (e) {
            this.logger.error(e)
            res.send(e)
        }

        return next()
    }
    @Post('/update/text')
    private async update(req: IReq, res:Response, next:Next){
        this.logger.info("Updating highlight: " , req.body)
        let result:IResult;
        try{
            const id : number | null
                = req.body.id ? req.body.id : null

            if(!id){ throw new Error("No id on query")}
            const id_exists : any | null
                = await this.HighlightService.findByID(id)

            if(!id_exists){throw new Error("id not in db")}

            const text: string | null
                = (req.body.text && req.body.text.length > 0 )
                ? req.body.text
                : null

            if(!text){ throw new Error("No text")}

            result = await this.HighlightService.update(id , text)
            res.send(result)
        } catch(e){
            this.logger.error(e)
            res.send(e)
        }
    }
    @Delete('/deleteID')
    private async removeByID (req: IReq, res:Response, next:Next){
        this.logger.info("Deleting highlight :  " , req.body )

        let result:IResult;
        try{
            const id : number | null =
                req.body.id ? req.body.id : null

            const id_exists : any | null
                = await this.HighlightService.findByID(id)

            if(!id_exists){throw new Error("id not in db")}

            result = await this.HighlightService.removeByID(id)

        } catch(e) {
            this.logger.warn(e)
            res.send(e)
        }
        res.send(result)
        return next()
    }
}
