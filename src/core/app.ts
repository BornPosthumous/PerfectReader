import { inject, injectable } from 'inversify'
import __ from "../config/constants"
import IApp from "../interfaces/app"
import IHTTPServer from '../interfaces/http-server'
import {ITextsService} from "../interfaces/texts-service"
import ILogger from "../interfaces/logger"
import ILoggerFactory from "../interfaces/logger-factory"
import { IParagraphsService } from '../interfaces/paragraphs-service'
import { IHighlightService } from '../interfaces/highlight-service'
import IUserService from '../interfaces/user-service'
import ICacheService  from '../interfaces/cache-service'


@injectable()
export class App implements IApp {
    @inject(__.HTTPServer) httpServer: IHTTPServer
    @inject(__.TextsService) textsService: ITextsService
    @inject(__.ParagraphsService) paragraphsService: IParagraphsService  
    @inject(__.HighlightService) highlightService: IHighlightService 
    @inject(__.UserService) userService: IUserService;
    @inject(__.CacheService) cache: ICacheService;
    
    public logger: ILogger
    
    constructor(@inject(__.LoggerFactory) LoggerFactory: ILoggerFactory) {
        console.log(this.httpServer)
    }
    public async bootstrap(): Promise<Boolean>{
        try{
            this.httpServer.onBootstrap(this.userService.onBootstrap.bind(this.userService));
            this.httpServer.onBootstrap(this.cache.onBootstrap.bind(this.cache))
            this.httpServer.onBootstrap(this.textsService.onBootstrap.bind(this.textsService))
            this.httpServer.onBootstrap(this.paragraphsService.onBootstrap.bind(this.paragraphsService))
            this.httpServer.onBootstrap(this.highlightService.onBootstrap.bind(this.highlightService))
        } catch (e) {
            this.logger.fatal(e)
        }
        this.httpServer.listen()
        return true
    }
    public close(){
        this.httpServer.close(()=>{
            console.log("Ending Server. Goodbye")
        })
    }
}

