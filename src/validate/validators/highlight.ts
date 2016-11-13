import {NotEmpty, IsNumeric} from "validator.ts/decorator/Validation";

class findByID {
    @IsNumeric()
    id: string = ''
}
class addHighlight{
    @IsNumeric()
    book_id: string = ''

    @IsNumeric()
    paragraph_id: string = ''
    
    @IsNumeric()
    start: string = ''
    
    @IsNumeric()
    end: string = ''

    @NotEmpty()
    text: string = ''
}
class removeByID {
    @IsNumeric()
    id: string = ''
}
class update {
    @IsNumeric()
    id: string = ''

    @NotEmpty()
    text: string = ''
}
class getBook {
    @IsNumeric()
    book_id: string = ''
}
class getParagraph {
    @IsNumeric()
    book_id: string = ''

    @IsNumeric()
    paragraph_id: string = ''
}
const HighlightController = {
    update,
    removeByID,
    getParagraph,
    findByID,
    addHighlight,
    getBook
} 
export default HighlightController
