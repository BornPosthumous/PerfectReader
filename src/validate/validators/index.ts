import {IsLength, IsEmail, IsInt, NotEmpty, IsNumeric} from "validator.ts/decorator/Validation";
import TextsController from './text'
import ParagraphsController from './paragraphs'
import HighlightController from './highlight'

//TODO Mimic behavior with new set up?
// const validators = new Proxy(_validators, {
//     get(target: any , name: string){
//         console.log("Running valid", _validators.TextsController)
//         return name in target?
//             target[name] : new Error(`Validator ${name} not found!`)
//     }
// })

const validators = {
    TextsController,
    ParagraphsController,
    HighlightController,
};

export default validators