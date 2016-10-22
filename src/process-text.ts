import * as fs from 'fs'
import axios from 'axios'
//import * as Promise from 'bluebird'
import { injectable, inject, Kernel , interfaces} from "inversify";
import "reflect-metadata";
import TYPES from "./types"

export type Raw = string
export type Paragraphs = Array<Raw>
export interface Text {
    raw: Raw;
    paragraphs: Paragraphs;
}

export enum Source {
    FS = 1,
    HTTP,
    TEXT
}
export interface ITextGetter {
    get(text: Raw) : Promise<Raw>
}

@injectable()
export class RawText implements ITextGetter {
    public get(text: Raw){ return Promise.resolve(text) } 
}

@injectable()
export class FileText implements ITextGetter {
    public get(path: String): Promise<Raw> {
        return new Promise<Raw>((resolve, reject) => {
            fs.readFile(path, 'utf8', (err: Error, contents: Raw) => err ? reject(err): resolve(contents)) 
        })
    }
}

export class UrlText {
    public static get(url: string) : Promise<Raw> {
        return new Promise<Raw>((resolve, reject) => {
            axios.get(url)
                .then((response) => resolve(response.data), reject)
                .catch((err) => reject(err))
        })
    }
}
export interface ITextReader {
    getText(str :string) : void;
    textProvider: interfaces.Provider<ITextGetter>;
    textGet: ITextGetter;
}

@injectable()
export class TextReader implements ITextReader {
    public _contents: Text
    public init: Function
    private _RawText: ITextGetter
    public _raw: Raw
    private _textGetter: ITextGetter
    public textProvider: interfaces.Provider<ITextGetter>
    public textGet : ITextGetter
    constructor( 
        @inject(TYPES.TextGetter) textGetter : ITextGetter,
        @inject(TYPES.IProvider) textProvider : interfaces.Provider<ITextGetter> 
        ){
        this.textProvider = textProvider
        this.textGet = null;
        this._textGetter = textGetter
        // if(src == Source.FS){
        //     this.init = this.initType(FileText.get)
        // } else if (src == Source.HTTP){
        //     this.init = this.initType(UrlText.get)
        // } else {
        //     //this.init = this.initType(RawText.get)
        // }
        // switch(src){    // Not sure why this doesn't work!
        //     case Source.FS:
        //         console.log("Hit FS")
        //         this.init = this.initFS
        //     case Source.TEXT: 
        //         console.log("Hit TExt")
        //         this.init = this.initText
        //     case Source.HTTP:
        //         console.log("Hit HTTP")
        //         this.init = this.initHTTP
        // }
    }
    public async getText( str : Raw ){
        this._raw = await this.textGet.get(str)
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
