import { Request, Response, Next } from "restify";
import { InversifyRestifyServer, Controller, Get, Put, Post, Delete } from "inversify-restify-utils";
import { injectable, inject } from "inversify"
import { __, API_BASE } from "../config/constants"
import IController from '../interfaces/controller'
import { ITextsService } from '../interfaces/texts-service'
import { Source } from '../enums/source'
import { TextReader } from '../factories/text-reader'
import ILoggerFactory from '../interfaces/logger-factory'
import ILogger from '../interfaces/logger'
import { IParagraphsService } from '../interfaces/paragraphs-service'
import IReq from "../interfaces/req"
import IResult from '../interfaces/result'
import Validate from '../validate'
import fs = require("fs");
import * as path from 'path'


@Controller(`${API_BASE}/texts`)
@injectable()
export class TextsController implements IController {
    private logger: ILogger

    constructor(
        @inject(__.TextsService) private TextService: ITextsService,
        @inject(__.LoggerFactory) private LoggerFactory: ILoggerFactory,
        @inject(__.ParagraphsService) private ParagraphsService: IParagraphsService
    ) {
        this.logger = LoggerFactory.getLogger(this)
    }

    @Get('/')
    private async index(req: IReq, res: Response, next: Next) {
        this.logger.info("Getting All Texts")
        let result: any =
            await this.TextService.getAll()
        result = result.map((x: any) => x.id)
        res.send(result)
        return next()
    }

    //TODO OCR from web image
    //TODO FIX OCR route w/ validator
    @Post('/ocr')
    private async getTextFromOCR(req: IReq, res: Response, next: Next) {
        let result: any;
        req.connection.setTimeout(10000000) //FIXME this is hacky way to keep request alive
        try {
            const path: string | null
                = req.query.path ? req.query.path : null
            if (!path) { throw new Error("No path on Query") }
            const title: string | null
                = req.query.title ? req.query.title : null
            if (!title) { throw new Error("No title on Query") }

            result = await this.TextService.ocrTextFromFS(title, path)
            res.send(200, result)
        } catch (e) {
            this.logger.error(e)
            res.send(e)
        }
    }
    @Post('/multipart')
    private async fileUpload(req: IReq, res: Response, next: Next) {
        this.logger.info("Making file")
        let filepath = path.resolve('./', 'temp', 'test.txt')
        console.log("Filepath", filepath)
        req.body.path = filepath;
        req.body.title = "Test File"

        await fs.writeFile(filepath, req.params.file, 'utf8', function(err) {
            if (err) {
                return console.log(err);
            }
        });

        let result: IResult;
        try {
            result = await this.TextService.addTextFromFS(req.body.title, req.body.path)
            let id = result[0].id
            console.log("ID", id)
            req.body.id = id;
        } catch (e) {
            this.logger.error(e)
            res.send(e)
        }
        return next('convert');
    }


    @Post({ path: '/convert', name: 'convert' })
    private async toParagraph(req: IReq, res: Response, next: Next) {
        this.logger.info("Converting")
        let result: IResult;

        try {
            const id: number | null
                = req.body.id ? req.body.id : null
            if (!id) { throw new Error("No Id on Query") }

            const id_exists = await this.ParagraphsService.findByID(id)
            if (!id_exists) { throw new Error("ID not in DB") }

            const id_deleted = id_exists.deleted
            if (id_deleted) { throw new Error("requested text is deleted") }

            // Should this logic go to the service?
            const text = (await this.TextService.findByID(id)).text
            const tr = new TextReader(Source.TEXT)
            await tr.init(text)

            let paragraphs = tr.paragraphs;
            let results = await Promise.all(
                paragraphs.map(async (p, i): Promise<void> => {
                    await this.ParagraphsService.add(id, p, i)
                    return
                }));

            paragraphs = await this.ParagraphsService.getBook(id)
            res.json({ id, paragraphs })

        } catch (e) {
            this.logger.error(e)
            res.send(e)
        }
    }

    @Validate
    @Post({ path: '/add/raw' })
    private async addText(req: IReq, res: Response, next: Next) {
        this.logger.info("Adding Raw Text :  ", req.body)
        let result: IResult;
        try {
            result = await this.TextService.add(req.body.title, req.body.text)
            res.send(200, result)
        } catch (e) {
            res.send(e)
        }
        return next()
    }

    @Validate
    @Post({ path: '/add/fs', name: 'addfs' })
    private async addTextFromFS(req: IReq, res: Response, next: Next) {
        this.logger.info("Adding Text from FS :  ", req.body)
        let result: IResult;
        try {
            result = await this.TextService.addTextFromFS(req.body.title, req.body.path)
            res.send(200, result)
        } catch (e) {
            this.logger.error(e)
            res.send(e)
        }
        return next()
    }
    @Validate
    @Post('/add/url')
    private async addTextFromURL(req: IReq, res: Response, next: Next) {
        this.logger.info("Adding Text from URL :  ", req.body)
        let result: IResult;
        try {
            result = await this.TextService.addTextFromURL(req.body.title, req.body.url)
            res.send(200, result)
        } catch (e) {
            this.logger.error(e)
            res.send(e)
        }
        return next()
    }
    @Validate
    @Post('/getID')
    private async findByID(req: IReq, res: Response, next: Next) {
        this.logger.info("Getting Text with ID: ", req.body)

        //TODO Check if ID exists on getID route try catch

        const response = (await this.TextService.findByID(req.body.id))

        if (!response.deleted) {
            res.send(200, response)
        } else {
            this.logger.info("Requested resource has deleted flag")
            res.send("Resource found, but has deleted flag")
        }
        return next()
    }

    @Validate
    @Delete('/deleteID')
    private async removeByID(req: IReq, res: Response, next: Next) {
        this.logger.info("Deleting ID :  ", req.body)
        let result: IResult;
        try {
            const id_exists = await this.ParagraphsService.findByID(req.body.id)
            if (!id_exists) { throw new Error("ID not in DB") }

            result = await this.TextService.removeByID(req.body.id)
            res.send(200, result)

        } catch (e) {
            this.logger.error(e)
            res.send(e)
        }
        return next()
    }

    @Validate
    @Post('/update/text')
    private async update(req: IReq, res: Response, next: Next) {
        this.logger.info("Updating Text by ID", req.body)
        req.body = JSON.parse(req.body);
        let result: IResult;
        try {
            const id_exists: any | null
                = await this.TextService.findByID(req.body.id)

            if (!id_exists) { throw new Error("ID not in db") }

            result = await this.TextService.updateText(req.body.id, req.body.text)
            res.send(result)

        } catch (e) {
            this.logger.error(e)
            res.send(e)
        }
    }

    //TODO this route doesn't return the update object
    @Validate
    @Post('/update/title')
    private async updateTitle(req: IReq, res: Response, next: Next) {
        this.logger.info("Updating Title by ID: ", req.body)
        let result: IResult;
        try {
            const id_exists: any | null
                = await this.TextService.findByID(req.body.id)

            if (!id_exists) { throw new Error("id not in db") }

            result = await this.TextService.updateTitle(req.body.id, req.body.title)
            res.send(result)

        } catch (e) {
            this.logger.error(e)
            res.send(e)
        }
    }
}
