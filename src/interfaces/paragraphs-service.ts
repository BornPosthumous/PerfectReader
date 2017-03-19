import IResult from './result'

export interface IParagraphsService {
    onBootstrap: () => void;
    add: (book_id: number, paragraph: string, count: number) => Promise<any>;
    getAll: () => Promise<any>;
    get: (id: number) => Promise<any>;
    removeByID: (id: number) => Promise<any>;
    getBook: (book_id: number) => Promise<any>;
    findByID: (id: number) => Promise<any>;
    update: (id: number, paragraph: string) => Promise<any>;
}
