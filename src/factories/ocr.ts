import * as fs from 'fs';
let Tesseract = require('tesseract.js')


class OCR {
    private _result:string;
    private _path:string;

    constructor(path:string){
        this._path = path
    }
    public async process(path:string){
        await Tesseract.recognize('sharpened.jpg')
            .progress((message:any) => console.log(message))
            .catch((err:any) => console.error(err))
            .then((result:any) => console.log(result))
            .finally((resultOrError:any) => resultOrError.text)
    }
}
export default OCR