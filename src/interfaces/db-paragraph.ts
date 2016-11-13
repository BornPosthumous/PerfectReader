import Raw from './raw'

interface IDBParagraph {
    book_id: number; 
    paragraph: Raw;
    deleted? : boolean;
    id?: number;
}

export default IDBParagraph