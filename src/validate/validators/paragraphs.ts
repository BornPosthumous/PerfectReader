import { NotEmpty, IsNumeric } from "validator.ts/decorator/Validation";

class findByID {
    @IsNumeric()
    id: string = ''
}
class addParagraph{
    @IsNumeric()
    book_id: string = ''

    @NotEmpty()
    paragraph: string = ''
}

class removeByID {
    @IsNumeric()
    id: string = ''
}

class update {
    @IsNumeric()
    id: string = ''

    @NotEmpty()
    paragraph: string = ''
}
class getBook {
    @IsNumeric()
    book_id: string =''
}

const ParagraphsController = {
    update,
    removeByID,
    addParagraph,
    findByID,
    getBook
} 
export default ParagraphsController
