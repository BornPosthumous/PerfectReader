import { Kernel } from "inversify"
import "reflect-metadata";
import __ from "../config/constants";
import IApp from '../interfaces/app'
import IController from '../interfaces/controller'
import IServerConfig from '../interfaces/server-config'
import IHTTPServer from '../interfaces/http-server'
import { ITextsService } from '../interfaces/texts-service'
import { IHighlightService } from '../interfaces/highlight-service'
import { IParagraphsService} from '../interfaces/paragraphs-service'
import { HTTPServer } from '../core/http-server'
import { TextsController } from '../controllers/texts'
import { HighlightController } from '../controllers/highlight'
import { ParagraphsController } from '../controllers/paragraphs'
import { TextsService } from '../services/texts/texts'
import { ParagraphsService } from '../services/paragraphs/paragraphs'
import { HighlightService } from '../services/highlight/highlight'
import { TYPE } from 'inversify-restify-utils'
import { App } from '../core/app'
import { ServerConfig } from '../config/server-config'
import { LoggerFactory } from '../core/logger-factory'
import IDatabaseProvider from "../interfaces/database-provider";
import DatabaseProvider from "../db";
import {IDatabase} from "pg-promise";
import {IExtensions} from "../db/index";

export const kernel = new Kernel();

kernel
    .bind<LoggerFactory>(__.LoggerFactory)
    .toConstantValue(LoggerFactory)

kernel.bind<IServerConfig>(__.ServerConfig)
    .toConstantValue(<IServerConfig>ServerConfig)
kernel
    .bind<IHTTPServer>(__.HTTPServer)
    .to(HTTPServer)
    .inSingletonScope()

kernel
    .bind<IDatabaseProvider>(__.DatabaseProvider)
    .to(DatabaseProvider)
    .inSingletonScope();
kernel
    .bind<IDatabase<IExtensions>>(__.Database)
    .toConstantValue(kernel.get<IDatabaseProvider>(__.DatabaseProvider).getDatabase());

kernel
    .bind<IController>(<any>TYPE.Controller)
    .to(TextsController)
    .whenTargetNamed('TextsController')
    
kernel
    .bind<IController>(<any>TYPE.Controller)
    .to(ParagraphsController)
    .whenTargetNamed('ParagraphsController')

kernel
    .bind<IController>(<any>TYPE.Controller)
    .to(HighlightController)
    .whenTargetNamed('HighlightController')

kernel
    .bind<ITextsService>(__.TextsService)
    .to(TextsService)
    .inSingletonScope()

kernel
    .bind<IParagraphsService>(__.ParagraphsService)
    .to(ParagraphsService)
    .inSingletonScope()

kernel
    .bind<IHighlightService>(__.HighlightService)
    .to(HighlightService)
    .inSingletonScope()

kernel.bind<IApp>(__.App)
    .to(App)