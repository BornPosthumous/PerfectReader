import IResult from './result'

export interface IHighlightService {
    onBootstrap: ()=> void;
    add: (book_id:number, paragraph_id: number, text: string, start:number, end:number)=> Promise<IResult>;
    getAll: () => Promise<IResult>;
    get: (id: number) => Promise<IResult>;
    removeByID: (id: number) => Promise<IResult>;
    getBook: (book_id: number) => Promise<IResult>;
    findByID: (id: number) => Promise<IResult>;
    update: ( id: number, text: string) => Promise<IResult>;
    getParagraph: (book_id: number, paragraph_id: number) => Promise<IResult>;
}