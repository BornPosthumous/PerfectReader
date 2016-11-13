import { injectable, inject } from "inversify"
import Raw  from '../interfaces/raw'
import Paragraphs from '../interfaces/paragraphs'
import { Text } from '../interfaces/text'
import { Source } from '../enums/source'
import * as fs from 'fs'
import axios from 'axios'
import { ITextReader } from '../interfaces/text-reader'
import { ITextGetter } from '../interfaces/text-getter'

@injectable()
export class TextReader implements ITextReader {
    public _contents: Text
    public init: Function
    private _RawText: ITextGetter
    public _raw: Raw
    constructor(src: Source){
        switch(src){
            case Source.FS:
                this.init = this.initType( new FileText().get)
                break;
            case Source.TEXT: 
                this.init = this.initType( new RawText().get)
                break;
            case Source.HTTP:
                this.init =  this.initType( new UrlText().get)
                break;
        }
    }
    private initType: Function = ( get: Function) => async (text: Raw) => {
        const raw = await get(text)
        const paragraphs:Paragraphs = TextProcessor.toParagraph(raw)
        this._contents = {raw, paragraphs}        
    }
    get contents(): Text {
        return this._contents
    }
    get paragraphs(): Paragraphs {
        return this._contents.paragraphs
    }
}

export class TextProcessor {
    public static toParagraph(text: Raw): Paragraphs {
        return text
            .split(/(?:\r\n\r\n|\r\r|\n\n)/g)
            .map(x => x.replace(/(?:\r\n)/g, ""))
            .map(x => x.trim())
            .filter(x => x !== '')
    }
}

@injectable()
export class RawText implements ITextGetter {
    public get(text: Raw){ return Promise.resolve(text) } 
}

@injectable()
export class FileText implements ITextGetter {
    public get(path: string): Promise<Raw> {
        return new Promise<Raw>((resolve, reject) => {
            fs.readFile(path, 'utf8', (err: Error, contents: Raw) => err ? reject(err): resolve(contents)) 
        })
    }
}

@injectable()
export class UrlText implements ITextGetter {
    public get(url: string) : Promise<Raw> {
        return new Promise<Raw>((resolve, reject) => {
            axios.get(url)
                .then((response) => resolve(response.data), reject)
                .catch((err) => reject(err))
        })
    }
}

