import {IsLength, IsEmail, IsInt, NotEmpty, IsNumeric} from "validator.ts/decorator/Validation";

//TODO create validators for highlights and paragraph controllers
class findByID {
    @IsNumeric()
    id: string = ''
}

class addText{
    @NotEmpty()
    title: string = ''

    @NotEmpty()
    text: string = ''
}

class addTextFromFS {
    @NotEmpty()
    title: string = ''

    @NotEmpty()
    path: string = ''
}
class addTextFromURL {
    @NotEmpty()
    title: string = ''

    @NotEmpty()
    url: string = ''
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

class updateTitle{
    @IsNumeric()
    id: string = ''
    
    @NotEmpty()
    title: string = ''  
}

const TextsController = {
    update,
    updateTitle,
    removeByID,
    addText,
    addTextFromFS,
    addTextFromURL,
    findByID
} 
export default TextsController
