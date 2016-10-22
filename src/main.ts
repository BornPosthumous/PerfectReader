import Database from './db'
import {
    TextProcessor, 
    TextReader, 
    Source,
    RawText,
    ITextReader,
    ITextGetter,
    FileText,
    Raw
} from './process-text'
import axios from 'axios'
import TYPES from "./types"
//import Promise from 'bluebird'
import { injectable, inject, Kernel, interfaces } from "inversify";
import "reflect-metadata";

declare function setTimeout(callback: () => void, timeout: number): void

async function Test() {
    // const x = await Database.db.any('SELECT * FROM info')
    // const y = await Database.db.none('insert into text (id, text) values ($1, $2)', [1 , "Hello Nietzsche"])
    // const TH = new TextReader(Source.HTTP)
    // const TFS = new TextReader(Source.FS)
    // let prov: interfaces.Provider<Raw> = () =>  new Promise<Raw>((resolve) => { resolve("Hello Provider")});
    // console.log(await prov())

    var myKernel = new Kernel();
    // myKernel.bind<ITextGetter>(TYPES.TextGetter).to(RawText).whenTargetNamed("fs");
    // myKernel.bind<ITextGetter>(TYPES.TextGetter).to(FileText).whenTargetNamed("fs");
    // let rawText = myKernel.getNamed<ITextGetter>(TYPES.TextGetter, 'raw')
    // let fileText = myKernel.getNamed<ITextGetter>(TYPES.TextGetter, 'fs')
    myKernel.bind<ITextGetter>(TYPES.TextGetter).to(RawText);
    myKernel.bind<ITextReader>(TYPES.TextReader).to(TextReader)

    myKernel.bind<interfaces.Provider<ITextGetter>>
    (TYPES.IProvider).toProvider<ITextGetter>((context) => {
        return () => {
            return new Promise<ITextGetter>((resolve) => {
                let textGetter = context.kernel.get<ITextGetter>(TYPES.TextGetter);
                resolve(textGetter);
            });
        };
    })
    let textReader = myKernel.get<ITextReader>(TYPES.TextReader)

    textReader.textProvider().then( textGetter => {textReader.textGet = textGetter})
    
    textReader.getText("src/dummy.txt")

    // const TT = new TextReader( RawText)
    try {
        // await TH.init("http://www.textfiles.com/etext/AUTHORS/ARISTOTLE/aristotle-on-264.txt")
        // await TFS.init('src/dummy.txt')
        // await TT.init("Hello \r\n TO \n YOU")
        // console.log(TH.paragraphs[0])
        // console.log(TFS.paragraphs[0])
        // console.log(TT.paragraphs[0])
    } catch (e) {
        console.log(e)
    }
}

Test()