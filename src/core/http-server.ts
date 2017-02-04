import { injectable, inject } from "inversify"
import IBootstrap from '../interfaces/bootstrap'
import IServerConfig from '../interfaces/server-config'
import IHTTPServer from '../interfaces/http-server'
import { Server, queryParser, bodyParser, CORS } from "restify"
import { InversifyRestifyServer } from "inversify-restify-utils"
import { kernel } from "../config/kernel"
import { __ } from "../config/constants"
import { LoggerFactory } from "./logger-factory"
import IReq from "../interfaces/req"
import IRes from "../interfaces/res"
import ILogger from "../interfaces/logger"
import ILoggerFactory from "../interfaces/logger-factory"

@injectable()
export class HTTPServer implements IHTTPServer {
    private server: Server;
    private port: number;
    private router: InversifyRestifyServer;
    private _serverConfig: IServerConfig;
    @inject(__.LoggerFactory) LoggerFactory: ILoggerFactory;
    public logger: ILogger

    public constructor(
        @inject(__.ServerConfig) serverConfig: IServerConfig
    ) {
        this._serverConfig = serverConfig
        this.port = this._serverConfig.port;
        this.router = new InversifyRestifyServer(<any>kernel)
    }

    public get version(): string { return this.server.version }
    public set version(version) { this.server.version = version }

    public get name(): string { return this.server.name }
    public set name(name) { this.server.name = name }

    private toBootstrap: Array<IBootstrap> = [];
    public onBootstrap(fn: (cb: (err: Error, res: any) => void) => void): Promise<any> {
        return new Promise((resolve, reject) => {
            this.toBootstrap.push(() => {
                return fn((err, result) => err ? reject(err) : resolve(result))
            })
        })
    }

    public listen(): void {
        this.logger = this.LoggerFactory.getLogger(this)
        this.toBootstrap.forEach((fn) => {
            fn()
        });

        this.server = <Server>this.router
            .setConfig((app: Server) => {
                app.pre((req: any, res: any, next: Function) => {
                    req.start = Date.now();
                    next()
                });
                app.use(CORS({
                    origins: ['http://localhost:4200'],
                    credentials: true
                }));
                app.use(queryParser())
                app.use(bodyParser())
            })
            .build()


        this.server.on('after', (req: IReq, res: IRes, route: string, err: Error) => {
            err && err.name !== 'BadRequestError' && this.logger.error(err);
            const request: string = this.logger['format'](req)
            const start: any = req.start;
            this.logger.info(`${request} status=${res.statusCode} time=${Date.now() - start}`)
        });

        this.server.on('uncaughtEception', (req: IReq, res: IRes, route: string, err: Error) => {
            this.logger.fatal(`route=${route}`, err);
            process.exit(1)
        });

        this.server.on('unhandledRejection', (req: IReq, res: IRes, route: string, err: Error) => {
            this.logger.fatal(`route=${route}`, err);
            process.exit(1)
        });

        this.server.on('InternalServer', (req: IReq, res: IRes, err: any, cb: Function) => {
            this.logger.error(err);

            // TODO InternalServerError Page
            const page = `
            <h1>sorry, this is broken right now... try again later?</h1>
            ${true ? `<div style="background: #feeeee">
                <pre>${err.stack}</pre>
              </div>` : ''}
            `;

            res.writeHead(500);
            if (req.method === 'GET') {
                res.end(page)
            }
            cb()
        });

        this.server.on('BadRequest', (req: any, res: any, err: any, cb: Function) => {
            if (err.jse_cause) {
                err.body.message = JSON.stringify({ errors: err.jse_cause.errors })
            }
            cb()
        });

        this.server.on('NotFound', (req: any, res: any, err: any, cb: Function) => {
            // req.uuid = uuid()
            console.log("Not found");
            req.start = Date.now()

            const page = `
            <h1>404</h1>
            `;

            res.writeHead(404);
            res.end(page);
            cb();
        });

        this.server.listen(this.port)
    }
    public close(cb: Function): void {
        this.server.close(cb)
    }
}

