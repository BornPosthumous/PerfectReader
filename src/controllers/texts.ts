import { Request, Response, Next } from "restify";
import { InversifyRestifyServer, Controller, Get, Post, Delete } from "inversify-restify-utils";
import { injectable, inject } from "inversify"
import { __ , API_BASE } from "../config/constants"
import IController from '../interfaces/controller'
import { ITextsService } from '../interfaces/texts-service'
import { Source } from '../enums/source'
import {TextReader} from '../factories/text-reader'
import ILoggerFactory  from '../interfaces/logger-factory'
import ILogger from '../interfaces/logger'
import { IParagraphsService } from '../interfaces/paragraphs-service'
import IReq from "../interfaces/req"
import IResult from '../interfaces/result'


@Controller(`${API_BASE}/texts`)
@injectable()
export class TextsController implements IController {
    private logger: ILogger

    constructor( 
        @inject(__.TextsService) private TextService: ITextsService,
        @inject(__.LoggerFactory) private LoggerFactory : ILoggerFactory,
        @inject(__.ParagraphsService) private ParagraphsService: IParagraphsService
    ) { 
        this.logger = LoggerFactory.getLogger(this)
    }

    @Get('/')
    private async index(req: IReq, res: Response, next: Next) {
        this.logger.info("Getting All Texts")
        let result:any = 
            await this.TextService.getAll()
          result = result.map((x:any) => x.id)
        res.send(result)
        return next()
    }
    //TODO OCR from web image

    @Post('/ocr')
    private async getTextFromOCR(req: IReq, res: Response, next: Next){
        let result: any;
        req.connection.setTimeout(10000000)
        try{
             const path: string | null
                = req.query.path ? req.query.path : null
            if ( !path ) { throw new Error("No path on Query")}
            const title: string | null
                = req.query.title ? req.query.title : null
            if ( !title ) { throw new Error("No title on Query")}
            
            result = await this.TextService.ocrTextFromFS(title, path)
            res.send(200, result)
        } catch(e){
            this.logger.error(e)
            res.send(e)
        }
    }
    @Post('/convert')
     private async toParagraph(req: IReq, res: Response, next: Next) {
        this.logger.info("Converting")
        let result: IResult;
        try{
             const id: number | null 
                = req.query.id ? req.query.id : null
            if ( !id ) { throw new Error("No Id on Query")}

            const id_exists = await this.ParagraphsService.findByID(id)
            if ( !id_exists ) { throw new Error("ID not in DB")}

            const id_deleted = id_exists.deleted
            if(id_deleted) { throw new Error("requested text is deleted")}

            // Should this logic go to the service?
            const text = (await this.TextService.findByID(id)).text
            const tr = new TextReader(Source.TEXT)
            await tr.init(text)
            tr.paragraphs.map(x =>{
                this.ParagraphsService.add(id, x)
            })
            result = await this.ParagraphsService.getBook(id)
            res.json(result)
        } catch (e){
            this.logger.error(e)
            res.send(e)
        }
     }
    @Post('/add/raw')
    private async addText(req: IReq, res:Response, next:Next){
        this.logger.info("Adding Raw Text :  " , req.query )
        let result: IResult;
        try{
            const title: string | null 
                = req.query.title ? req.query.title : null
            if ( !title ) { throw new Error("No Title on Query")}
            
            const text: string | null 
                = req.query.text ? req.query.text : null
            if ( !text ) { throw new Error("No text on Query") }
            
            result = await this.TextService.add(title, text)
            res.send(result)
        } catch (e){
            res.send(e)
        }
        return next()
    }
    @Post('/add/fs')
    private async addTextFromFS(req: IReq, res:Response, next:Next){
        this.logger.info("Adding Text from FS :  " , req.query )
        let result: IResult;
        try{
            const title: string | null 
                = req.query.title ? req.query.title : null
            if ( !title ) { throw new Error("No Title on Query")}
            const path: string | null 
                    = req.query.path ? req.query.path : null
            if ( !path ) { throw new Error("No path on Query") }

            result = await this.TextService.addTextFromFS(title,path)
            res.send(result)
        } catch (e){
            this.logger.error(e)
            res.send(e)
        }
        return next()
    }
    @Post('/add/url')
    private async addTextFromURL(req: IReq, res:Response, next:Next){
        this.logger.info("Adding Text from URL :  " , req.query )
        let result: IResult;
        try{            
            const title: string | null 
                = req.query.title ? req.query.title : null
            if ( !title ) { throw new Error("No Title on Query")}
            const url: string | null 
                    = req.query.url ? req.query.url : null
            if ( !url ) { throw new Error("No url on Query") }

            result = await this.TextService.addTextFromURL(title, url)
            res.send(result)

        } catch (e){
            this.logger.error(e)
            res.send(e)
        }
        return next()
    }
    @Get('/getID')
    private async findByID (req: IReq, res:Response, next:Next){
        this.logger.info("Getting Text with ID: " , req.query )
        const id: number | null 
                = req.query.id ? req.query.id : null
            if ( !id ) { throw new Error("No Id on Query")}

        const response = (await this.TextService.findByID(id))
        if(!response.deleted){ 
            res.send(response)
        } else {
            this.logger.info("Requested resource has deleted flag") 
            res.send("Resource found, but has deleted flag") 
        }
        return next()
    }
    @Delete('/deleteID')
    private async removeByID (req: IReq, res:Response, next:Next){
        this.logger.info("Deleting ID :  " , req.query )
        // console.log(req.query.id)
        // const id : number = req.query.id
        // res.send( (await this.TextService.removeByID(id)))
        let result: IResult;
        try{            
            const id: number | null 
                = req.query.id ? req.query.id : null
            if ( !id ) { throw new Error("No Id on Query")}

            const id_exists = await this.ParagraphsService.findByID(id)
            if ( !id_exists ) { throw new Error("ID not in DB")}

            result = await this.TextService.removeByID(id)
            res.send(result)

        } catch (e){
            this.logger.error(e)
            res.send(e)
        }
        return next()
    }
    @Post('/update/text')
    private async update(req: IReq, res:Response, next:Next){
        this.logger.info("Updating Text by ID" , req.query)
        let result:IResult;
        try{
            const id : number | null 
                = req.query.id ? req.query.id : null
            
            if(!id){ throw new Error("No id on query")}

            const id_exists : any | null 
                = await this.TextService.findByID(id)
            
            if(!id_exists){throw new Error("id not in db")}

            const text: string | null 
                = (req.query.text && req.query.text.length > 0 )
                ? req.query.text
                : null

            if(!text){ throw new Error("No text")}
            
            result = await this.TextService.updateText(id, text)
            res.send(result)

        } catch(e){
            this.logger.error(e)
            res.send(e)
        }
    }
    @Post('/update/title')
    private async updateTitle(req: IReq, res:Response, next:Next){
        this.logger.info("Updating Title by ID: " , req.query)
        let result:IResult;
        try{
            const id : number | null 
                = req.query.id ? req.query.id : null
            
            if(!id){ throw new Error("No id on query")}

            const id_exists : any | null 
                = await this.TextService.findByID(id)
            
            if(!id_exists){throw new Error("id not in db")}

            const title: string | null 
                = (req.query.title && req.query.title.length > 0 )
                ? req.query.title
                : null

            if(!title){ throw new Error("No title on query")}
            
            result = await this.TextService.updateTitle(id, title)
            res.send(result)

        } catch(e){
            this.logger.error(e)
            res.send(e)
        }
    }

}