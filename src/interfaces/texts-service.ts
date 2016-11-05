export interface ITextsService {
    onBootstrap: () => void;
    add: (title: string, text: string) => Promise<any>;
    findByID: (id: number) => Promise<any>;
    addTextFromFS: (title: string, path: string) => Promise<any>;
    addTextFromURL: (title: string, url: string) => Promise<any>;
    removeByID: (id: number) => Promise<any>;
    getAll: () => Promise<any>;
    updateText: (id: number, text: string) => Promise<any>;
    updateTitle: (id:number, title: string) => Promise<any>;
    ocrTextFromFS: any;
}