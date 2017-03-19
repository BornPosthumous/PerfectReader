import { injectable, inject } from "inversify"
import { ITextsService } from '../../interfaces/texts-service'
import { IDatabase } from "pg-promise";
import { IExtensions } from "../../db";
import { __ } from '../../config/constants'
import { Source } from '../../enums/source'
import { ITextGetter } from '../../interfaces/text-getter'
import { TextReader } from '../../factories/text-reader'
import ILogger from "../../interfaces/logger";
import ILoggerFactory from "../../interfaces/logger-factory";
import * as fs from "fs";

let Tesseract = require('tesseract.js')
let Jimp = require('jimp')


//TODO must find a way to fix JIMP asynchronicity
//TODO how do we make the timeout period longer for ocrTextFromFS

@injectable()
export class TextsService implements ITextsService {
    db: any;
    private logger: ILogger;

    public constructor(
        @inject(__.LoggerFactory) LoggerFactory: ILoggerFactory,
        @inject(__.Database) db: IDatabase<IExtensions> & IExtensions
    ) {
        this.db = db;
        this.logger = LoggerFactory.getLogger(this)
    }
    public async onBootstrap() {
        this.logger.info('create texts table');
        await this.db.texts.create();
    }
    public async add(title: string, text: string) {
        return await this.db.texts.add(title, text)
    }
    public async addTextFromFS(title: string, path: string) {
        const textReader = new TextReader(Source.FS)
        await textReader.init(path)
        return await this.db.texts
            .add(title, textReader.contents.raw)
    }

    public async ocrTextFromFS(title: string, path: string) {
        const filename = "./temp.jpg"
        //TODO Remove converted image !
        const processImg = async function() {
            return new Promise((resolve: any, reject: any) => {
                Jimp.read(path, function(err: any, img: any) {
                    if (err) { reject(err) }
                    img.greyscale().scale(0.75).write(filename)
                    console.log("done")
                    resolve("Done")
                })
            })
        }
        await processImg()
        // Doing this as just a timeout
        // Doing this makes the marker set error go away, why...
        // It looks like the file isnt done being written 
        // (I did a test where i read file before and after/logged it to stdout )
        await Jimp.read("./rfid.jpg")
        const text = await Tesseract.recognize(filename)
            .progress((message: any) => console.log(message))
            .catch((err: any) => console.error(err))
            .then((result: any) => result)

        console.log("Text", text.text)

        return await this.db.texts.add(title, text.text)
    }

    public async addTextFromURL(title: string, url: string) {
        const textReader = new TextReader(Source.HTTP)
        await textReader.init(url)
        return await this.db.texts
            .add(title, textReader.contents.raw)
    }
    public async updateText(id: number, text: string) {
        return await this.db.texts.updateText(id, text)
    }
    public async updateTitle(id: number, title: string) {
        return await this.db.texts.updateTitle(id, title)
    }
    public async findByID(id: number) {
        return await this.db.texts.findByID(id)
    }
    public async removeByID(id: number) {
        return await this.db.texts.remove(id)
    }
    public async getAll() {
        return await this.db.texts.getAll()
    }
}

