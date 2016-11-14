/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const kernel_1 = __webpack_require__(1);
	const constants_1 = __webpack_require__(4);
	const app = kernel_1.kernel.get(constants_1.__.App);
	app.bootstrap();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const inversify_1 = __webpack_require__(2);
	__webpack_require__(3);
	const constants_1 = __webpack_require__(4);
	const http_server_1 = __webpack_require__(5);
	const texts_1 = __webpack_require__(8);
	const highlight_1 = __webpack_require__(22);
	const paragraphs_1 = __webpack_require__(23);
	const texts_2 = __webpack_require__(24);
	const paragraphs_2 = __webpack_require__(27);
	const highlight_2 = __webpack_require__(28);
	const inversify_restify_utils_1 = __webpack_require__(7);
	const app_1 = __webpack_require__(29);
	const server_config_1 = __webpack_require__(30);
	const logger_factory_1 = __webpack_require__(31);
	const db_1 = __webpack_require__(33);
	const users_1 = __webpack_require__(42);
	const user_1 = __webpack_require__(43);
	const session_1 = __webpack_require__(45);
	const cache_1 = __webpack_require__(48);
	exports.kernel = new inversify_1.Kernel();
	exports.kernel
	    .bind(constants_1.default.LoggerFactory)
	    .toConstantValue(logger_factory_1.LoggerFactory);
	exports.kernel.bind(constants_1.default.ServerConfig)
	    .toConstantValue(server_config_1.ServerConfig);
	exports.kernel
	    .bind(constants_1.default.HTTPServer)
	    .to(http_server_1.HTTPServer)
	    .inSingletonScope();
	exports.kernel
	    .bind(constants_1.default.DatabaseProvider)
	    .to(db_1.default)
	    .inSingletonScope();
	exports.kernel
	    .bind(constants_1.default.Database)
	    .toConstantValue(exports.kernel.get(constants_1.default.DatabaseProvider).getDatabase());
	// UserService -
	exports.kernel
	    .bind(constants_1.default.UserService)
	    .to(user_1.default)
	    .inSingletonScope();
	// SessionService -
	exports.kernel
	    .bind(constants_1.default.SessionService)
	    .to(session_1.default)
	    .inSingletonScope();
	// CacheService -
	exports.kernel
	    .bind(constants_1.default.CacheService)
	    .to(cache_1.default)
	    .inSingletonScope();
	exports.kernel
	    .bind(inversify_restify_utils_1.TYPE.Controller)
	    .to(texts_1.TextsController)
	    .whenTargetNamed('TextsController');
	exports.kernel
	    .bind(inversify_restify_utils_1.TYPE.Controller)
	    .to(paragraphs_1.ParagraphsController)
	    .whenTargetNamed('ParagraphsController');
	exports.kernel
	    .bind(inversify_restify_utils_1.TYPE.Controller)
	    .to(highlight_1.HighlightController)
	    .whenTargetNamed('HighlightController');
	exports.kernel
	    .bind(constants_1.default.TextsService)
	    .to(texts_2.TextsService)
	    .inSingletonScope();
	exports.kernel
	    .bind(constants_1.default.ParagraphsService)
	    .to(paragraphs_2.ParagraphsService)
	    .inSingletonScope();
	exports.kernel
	    .bind(constants_1.default.HighlightService)
	    .to(highlight_2.HighlightService)
	    .inSingletonScope();
	exports.kernel.bind(inversify_restify_utils_1.TYPE.Controller)
	    .to(users_1.default)
	    .whenTargetNamed('UsersController');
	exports.kernel.bind(constants_1.default.App)
	    .to(app_1.App);


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("inversify");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("reflect-metadata");

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	exports.__ = {
	    App: Symbol('App'),
	    DatabaseProvider: Symbol('DatabaseProvider'),
	    Database: Symbol('Database'),
	    Logger: Symbol('Logger'),
	    LoggerFactory: Symbol('LoggerFactory'),
	    HTTPServer: Symbol('HTTPServer'),
	    ServerConfig: Symbol('ServerConfig'),
	    // Router: Symbol('Router'),
	    UserService: Symbol('UserService'),
	    SessionService: Symbol('SessionService'),
	    CacheService: Symbol('CacheService'),
	    TextsService: Symbol("ITextsService"),
	    ParagraphsService: Symbol("IParagraphsService"),
	    HighlightService: Symbol("IHighlightService"),
	    TextGetter: Symbol("ITextGetter"),
	    TextReader: Symbol("ITextReader"),
	};
	exports.API_BASE = '/api/';
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = exports.__;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	const inversify_1 = __webpack_require__(2);
	const restify_1 = __webpack_require__(6);
	const inversify_restify_utils_1 = __webpack_require__(7);
	const kernel_1 = __webpack_require__(1);
	const constants_1 = __webpack_require__(4);
	let HTTPServer = class HTTPServer {
	    constructor(serverConfig) {
	        this.toBootstrap = [];
	        this._serverConfig = serverConfig;
	        this.port = this._serverConfig.port;
	        this.router = new inversify_restify_utils_1.InversifyRestifyServer(kernel_1.kernel);
	    }
	    get version() { return this.server.version; }
	    set version(version) { this.server.version = version; }
	    get name() { return this.server.name; }
	    set name(name) { this.server.name = name; }
	    onBootstrap(fn) {
	        return new Promise((resolve, reject) => {
	            this.toBootstrap.push(() => {
	                return fn((err, result) => err ? reject(err) : resolve(result));
	            });
	        });
	    }
	    listen() {
	        this.logger = this.LoggerFactory.getLogger(this);
	        this.toBootstrap.forEach((fn) => {
	            fn();
	        });
	        this.server = this.router
	            .setConfig((app) => {
	            app.pre((req, res, next) => {
	                req.start = Date.now();
	                this.logger.info(`Creating server`);
	                next();
	            });
	            app.use(restify_1.queryParser());
	            app.use(restify_1.bodyParser());
	        })
	            .build();
	        this.server.on('after', (req, res, route, err) => {
	            err && err.name !== 'BadRequestError' && this.logger.error(err);
	            const request = this.logger['format'](req);
	            const start = req.start;
	            this.logger.info(`${request} status=${res.statusCode} time=${Date.now() - start}`);
	        });
	        this.server.on('uncaughtEception', (req, res, route, err) => {
	            this.logger.fatal(`route=${route}`, err);
	            process.exit(1);
	        });
	        this.server.on('unhandledRejection', (req, res, route, err) => {
	            this.logger.fatal(`route=${route}`, err);
	            process.exit(1);
	        });
	        this.server.on('InternalServer', (req, res, err, cb) => {
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
	                res.end(page);
	            }
	            cb();
	        });
	        this.server.on('BadRequest', (req, res, err, cb) => {
	            if (err.jse_cause) {
	                err.body.message = JSON.stringify({ errors: err.jse_cause.errors });
	            }
	            cb();
	        });
	        this.server.on('NotFound', (req, res, err, cb) => {
	            // req.uuid = uuid()
	            req.start = Date.now();
	            const page = `
	            <h1>404</h1>
	            `;
	            res.writeHead(404);
	            res.end(page);
	            cb();
	        });
	        this.server.listen(this.port);
	    }
	    close(cb) {
	        this.server.close(cb);
	    }
	};
	__decorate([
	    inversify_1.inject(constants_1.__.SessionService), 
	    __metadata('design:type', Object)
	], HTTPServer.prototype, "session", void 0);
	__decorate([
	    inversify_1.inject(constants_1.__.LoggerFactory), 
	    __metadata('design:type', Object)
	], HTTPServer.prototype, "LoggerFactory", void 0);
	HTTPServer = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(constants_1.__.ServerConfig)), 
	    __metadata('design:paramtypes', [Object])
	], HTTPServer);
	exports.HTTPServer = HTTPServer;


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("restify");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("inversify-restify-utils");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const inversify_restify_utils_1 = __webpack_require__(7);
	const inversify_1 = __webpack_require__(2);
	const constants_1 = __webpack_require__(4);
	const source_1 = __webpack_require__(9);
	const text_reader_1 = __webpack_require__(10);
	const validate_1 = __webpack_require__(13);
	let TextsController = class TextsController {
	    constructor(TextService, LoggerFactory, ParagraphsService) {
	        this.TextService = TextService;
	        this.LoggerFactory = LoggerFactory;
	        this.ParagraphsService = ParagraphsService;
	        this.logger = LoggerFactory.getLogger(this);
	    }
	    index(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info("Getting All Texts");
	            let result = yield this.TextService.getAll();
	            result = result.map((x) => x.id);
	            res.send(result);
	            return next();
	        });
	    }
	    //TODO OCR from web image
	    //TODO FIX OCR route w/ validator
	    getTextFromOCR(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            let result;
	            req.connection.setTimeout(10000000); //FIXME this is hacky way to keep request alive
	            try {
	                const path = req.query.path ? req.query.path : null;
	                if (!path) {
	                    throw new Error("No path on Query");
	                }
	                const title = req.query.title ? req.query.title : null;
	                if (!title) {
	                    throw new Error("No title on Query");
	                }
	                result = yield this.TextService.ocrTextFromFS(title, path);
	                res.send(200, result);
	            }
	            catch (e) {
	                this.logger.error(e);
	                res.send(e);
	            }
	        });
	    }
	    toParagraph(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info("Converting");
	            let result;
	            try {
	                const id = req.query.id ? req.query.id : null;
	                if (!id) {
	                    throw new Error("No Id on Query");
	                }
	                const id_exists = yield this.ParagraphsService.findByID(id);
	                if (!id_exists) {
	                    throw new Error("ID not in DB");
	                }
	                const id_deleted = id_exists.deleted;
	                if (id_deleted) {
	                    throw new Error("requested text is deleted");
	                }
	                // Should this logic go to the service?
	                const text = (yield this.TextService.findByID(id)).text;
	                const tr = new text_reader_1.TextReader(source_1.Source.TEXT);
	                yield tr.init(text);
	                tr.paragraphs.map(x => {
	                    this.ParagraphsService.add(id, x);
	                });
	                result = yield this.ParagraphsService.getBook(id);
	                res.json(result);
	            }
	            catch (e) {
	                this.logger.error(e);
	                res.send(e);
	            }
	        });
	    }
	    addText(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info("Adding Raw Text :  ", req.body);
	            let result;
	            try {
	                result = yield this.TextService.add(req.body.title, req.body.text);
	                res.send(200, result);
	            }
	            catch (e) {
	                res.send(e);
	            }
	            return next();
	        });
	    }
	    addTextFromFS(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info("Adding Text from FS :  ", req.body);
	            let result;
	            try {
	                result = yield this.TextService.addTextFromFS(req.body.title, req.body.path);
	                res.send(200, result);
	            }
	            catch (e) {
	                this.logger.error(e);
	                res.send(e);
	            }
	            return next();
	        });
	    }
	    addTextFromURL(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info("Adding Text from URL :  ", req.body);
	            let result;
	            try {
	                result = yield this.TextService.addTextFromURL(req.body.title, req.body.url);
	                res.send(200, result);
	            }
	            catch (e) {
	                this.logger.error(e);
	                res.send(e);
	            }
	            return next();
	        });
	    }
	    findByID(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info("Getting Text with ID: ", req.body);
	            //TODO Check if ID exists on getID route try catch
	            const response = (yield this.TextService.findByID(req.body.id));
	            if (!response.deleted) {
	                res.send(200, response);
	            }
	            else {
	                this.logger.info("Requested resource has deleted flag");
	                res.send("Resource found, but has deleted flag");
	            }
	            return next();
	        });
	    }
	    removeByID(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info("Deleting ID :  ", req.body);
	            let result;
	            try {
	                const id_exists = yield this.ParagraphsService.findByID(req.body.id);
	                if (!id_exists) {
	                    throw new Error("ID not in DB");
	                }
	                result = yield this.TextService.removeByID(req.body.id);
	                res.send(200, result);
	            }
	            catch (e) {
	                this.logger.error(e);
	                res.send(e);
	            }
	            return next();
	        });
	    }
	    update(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info("Updating Text by ID", req.body);
	            let result;
	            try {
	                const id_exists = yield this.TextService.findByID(req.body.id);
	                if (!id_exists) {
	                    throw new Error("ID not in db");
	                }
	                result = yield this.TextService.updateText(req.body.id, req.body.text);
	                res.send(result);
	            }
	            catch (e) {
	                this.logger.error(e);
	                res.send(e);
	            }
	        });
	    }
	    //TODO this route doesn't return the update object
	    updateTitle(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info("Updating Title by ID: ", req.body);
	            let result;
	            try {
	                const id_exists = yield this.TextService.findByID(req.body.id);
	                if (!id_exists) {
	                    throw new Error("id not in db");
	                }
	                result = yield this.TextService.updateTitle(req.body.id, req.body.title);
	                res.send(result);
	            }
	            catch (e) {
	                this.logger.error(e);
	                res.send(e);
	            }
	        });
	    }
	};
	__decorate([
	    inversify_restify_utils_1.Get('/'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], TextsController.prototype, "index", null);
	__decorate([
	    inversify_restify_utils_1.Post('/ocr'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], TextsController.prototype, "getTextFromOCR", null);
	__decorate([
	    inversify_restify_utils_1.Post('/convert'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], TextsController.prototype, "toParagraph", null);
	__decorate([
	    validate_1.default,
	    inversify_restify_utils_1.Post('/add/raw'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], TextsController.prototype, "addText", null);
	__decorate([
	    validate_1.default,
	    inversify_restify_utils_1.Post('/add/fs'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], TextsController.prototype, "addTextFromFS", null);
	__decorate([
	    validate_1.default,
	    inversify_restify_utils_1.Post('/add/url'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], TextsController.prototype, "addTextFromURL", null);
	__decorate([
	    validate_1.default,
	    inversify_restify_utils_1.Post('/getID'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], TextsController.prototype, "findByID", null);
	__decorate([
	    validate_1.default,
	    inversify_restify_utils_1.Delete('/deleteID'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], TextsController.prototype, "removeByID", null);
	__decorate([
	    validate_1.default,
	    inversify_restify_utils_1.Post('/update/text'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], TextsController.prototype, "update", null);
	__decorate([
	    validate_1.default,
	    inversify_restify_utils_1.Post('/update/title'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], TextsController.prototype, "updateTitle", null);
	TextsController = __decorate([
	    inversify_restify_utils_1.Controller(`${constants_1.API_BASE}/texts`),
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(constants_1.__.TextsService)),
	    __param(1, inversify_1.inject(constants_1.__.LoggerFactory)),
	    __param(2, inversify_1.inject(constants_1.__.ParagraphsService)), 
	    __metadata('design:paramtypes', [Object, Object, Object])
	], TextsController);
	exports.TextsController = TextsController;


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	(function (Source) {
	    Source[Source["FS"] = 1] = "FS";
	    Source[Source["HTTP"] = 2] = "HTTP";
	    Source[Source["TEXT"] = 3] = "TEXT";
	})(exports.Source || (exports.Source = {}));
	var Source = exports.Source;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const inversify_1 = __webpack_require__(2);
	const source_1 = __webpack_require__(9);
	const fs = __webpack_require__(11);
	const axios_1 = __webpack_require__(12);
	let TextReader = class TextReader {
	    constructor(src) {
	        this.initType = (get) => (text) => __awaiter(this, void 0, void 0, function* () {
	            const raw = yield get(text);
	            const paragraphs = TextProcessor.toParagraph(raw);
	            this._contents = { raw, paragraphs };
	        });
	        switch (src) {
	            case source_1.Source.FS:
	                this.init = this.initType(new FileText().get);
	                break;
	            case source_1.Source.TEXT:
	                this.init = this.initType(new RawText().get);
	                break;
	            case source_1.Source.HTTP:
	                this.init = this.initType(new UrlText().get);
	                break;
	        }
	    }
	    get contents() {
	        return this._contents;
	    }
	    get paragraphs() {
	        return this._contents.paragraphs;
	    }
	};
	TextReader = __decorate([
	    inversify_1.injectable(), 
	    __metadata('design:paramtypes', [Number])
	], TextReader);
	exports.TextReader = TextReader;
	class TextProcessor {
	    static toParagraph(text) {
	        return text
	            .split(/(?:\r\n\r\n|\r\r|\n\n)/g)
	            .map(x => x.replace(/(?:\r\n)/g, ""))
	            .map(x => x.trim())
	            .filter(x => x !== '');
	    }
	}
	exports.TextProcessor = TextProcessor;
	let RawText = class RawText {
	    get(text) { return Promise.resolve(text); }
	};
	RawText = __decorate([
	    inversify_1.injectable(), 
	    __metadata('design:paramtypes', [])
	], RawText);
	exports.RawText = RawText;
	let FileText = class FileText {
	    get(path) {
	        return new Promise((resolve, reject) => {
	            fs.readFile(path, 'utf8', (err, contents) => err ? reject(err) : resolve(contents));
	        });
	    }
	};
	FileText = __decorate([
	    inversify_1.injectable(), 
	    __metadata('design:paramtypes', [])
	], FileText);
	exports.FileText = FileText;
	let UrlText = class UrlText {
	    get(url) {
	        return new Promise((resolve, reject) => {
	            axios_1.default.get(url)
	                .then((response) => resolve(response.data), reject)
	                .catch((err) => reject(err));
	        });
	    }
	};
	UrlText = __decorate([
	    inversify_1.injectable(), 
	    __metadata('design:paramtypes', [])
	], UrlText);
	exports.UrlText = UrlText;


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("axios");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Validator_1 = __webpack_require__(14);
	const restify_errors_1 = __webpack_require__(15);
	const validators_1 = __webpack_require__(16);
	function Validate(target, propertyKey, descriptor) {
	    // Get the name of the valiator based on the contrller's constructor name and the method (route) we are accesing
	    // Ie ControllerName_routeName
	    //const validatorName = `${target.constructor.toString().match(/class ([\w|_]+)/)[1]}_${propertyKey}`;
	    // Try to get a validator class that we have declared
	    // This uses a proxy, so it won't return undefined -- it will throw an error if the validator doesn't exist
	    // const ValidationClass = Reflect.get(validators, validatorName);
	    //TODO rename these? 
	    // Validator now uses an object. 
	    const validatorName = `${target.constructor.toString().match(/class ([\w|_]+)/)[1]}`;
	    const ValidationSuper = Reflect.get(validators_1.default, validatorName);
	    const ValidationClass = Reflect.get(ValidationSuper, propertyKey);
	    // Store the original method, we're going to wrap it
	    const method = descriptor.value || function () { };
	    // We overwrite the route with our validation logic
	    descriptor.value = function (...args) {
	        // store references to req and next because we need to access them to serve a validation error
	        const req = args[0];
	        const next = args[args.length - 1];
	        try {
	            // construct the validation object (class)
	            const validationRequest = getValidationRequest(ValidationClass, req);
	            // init the validator (the thing that will check the validation)
	            const validator = new Validator_1.Validator();
	            // Validate or throw, we'll serve the error in the catch block
	            validator.validateOrThrow(validationRequest);
	            // if it passes validation, call the request with the original argmuents (i.e, req, res, next) -- 
	            // proceed as normal            
	            method.call(this, ...args);
	        }
	        catch (e) {
	            console.log(e);
	            // if we catch a vliadtion error, send it to the 400 error handler 
	            if (e.name === 'ValidationError') {
	                return next(new restify_errors_1.BadRequestError(e));
	            }
	            // something crazy happened, so serve a 500
	            next(new restify_errors_1.InternalServerError(e));
	        }
	    };
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Validate;
	function getValidationRequest(Klass, req) {
	    const instance = new Klass();
	    // there has to be a req body to validate...
	    if (Reflect.get(req, 'body')) {
	        // for the props in the body
	        for (let key in req.body) {
	            // don't write a null or undefined (i.e. prop exists w/o value)
	            if (Reflect.get(req.body, key)) {
	                const val = req.body[key];
	                // set it on the validation class we're currently building
	                Reflect.set(instance, key, String(val));
	            }
	        }
	    }
	    // return the validation class
	    return instance;
	}


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("validator.ts/Validator");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("restify-errors");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const text_1 = __webpack_require__(17);
	const paragraphs_1 = __webpack_require__(19);
	const highlight_1 = __webpack_require__(20);
	const users_1 = __webpack_require__(21);
	//TODO Mimic behavior with new set up?
	// const validators = new Proxy(_validators, {
	//     get(target: any , name: string){
	//         console.log("Running valid", _validators.TextsController)
	//         return name in target?
	//             target[name] : new Error(`Validator ${name} not found!`)
	//     }
	// })
	const validators = {
	    TextsController: text_1.default,
	    ParagraphsController: paragraphs_1.default,
	    HighlightController: highlight_1.default,
	    UsersController: users_1.default
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = validators;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const Validation_1 = __webpack_require__(18);
	//TODO create validators for highlights and paragraph controllers
	class findByID {
	    constructor() {
	        this.id = '';
	    }
	}
	__decorate([
	    Validation_1.IsNumeric(), 
	    __metadata('design:type', String)
	], findByID.prototype, "id", void 0);
	class addText {
	    constructor() {
	        this.title = '';
	        this.text = '';
	    }
	}
	__decorate([
	    Validation_1.NotEmpty(), 
	    __metadata('design:type', String)
	], addText.prototype, "title", void 0);
	__decorate([
	    Validation_1.NotEmpty(), 
	    __metadata('design:type', String)
	], addText.prototype, "text", void 0);
	class addTextFromFS {
	    constructor() {
	        this.title = '';
	        this.path = '';
	    }
	}
	__decorate([
	    Validation_1.NotEmpty(), 
	    __metadata('design:type', String)
	], addTextFromFS.prototype, "title", void 0);
	__decorate([
	    Validation_1.NotEmpty(), 
	    __metadata('design:type', String)
	], addTextFromFS.prototype, "path", void 0);
	class addTextFromURL {
	    constructor() {
	        this.title = '';
	        this.url = '';
	    }
	}
	__decorate([
	    Validation_1.NotEmpty(), 
	    __metadata('design:type', String)
	], addTextFromURL.prototype, "title", void 0);
	__decorate([
	    Validation_1.NotEmpty(), 
	    __metadata('design:type', String)
	], addTextFromURL.prototype, "url", void 0);
	class removeByID {
	    constructor() {
	        this.id = '';
	    }
	}
	__decorate([
	    Validation_1.IsNumeric(), 
	    __metadata('design:type', String)
	], removeByID.prototype, "id", void 0);
	class update {
	    constructor() {
	        this.id = '';
	        this.text = '';
	    }
	}
	__decorate([
	    Validation_1.IsNumeric(), 
	    __metadata('design:type', String)
	], update.prototype, "id", void 0);
	__decorate([
	    Validation_1.NotEmpty(), 
	    __metadata('design:type', String)
	], update.prototype, "text", void 0);
	class updateTitle {
	    constructor() {
	        this.id = '';
	        this.title = '';
	    }
	}
	__decorate([
	    Validation_1.IsNumeric(), 
	    __metadata('design:type', String)
	], updateTitle.prototype, "id", void 0);
	__decorate([
	    Validation_1.NotEmpty(), 
	    __metadata('design:type', String)
	], updateTitle.prototype, "title", void 0);
	const TextsController = {
	    update,
	    updateTitle,
	    removeByID,
	    addText,
	    addTextFromFS,
	    addTextFromURL,
	    findByID
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = TextsController;


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("validator.ts/decorator/Validation");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const Validation_1 = __webpack_require__(18);
	class findByID {
	    constructor() {
	        this.id = '';
	    }
	}
	__decorate([
	    Validation_1.IsNumeric(), 
	    __metadata('design:type', String)
	], findByID.prototype, "id", void 0);
	class addParagraph {
	    constructor() {
	        this.book_id = '';
	        this.paragraph = '';
	    }
	}
	__decorate([
	    Validation_1.IsNumeric(), 
	    __metadata('design:type', String)
	], addParagraph.prototype, "book_id", void 0);
	__decorate([
	    Validation_1.NotEmpty(), 
	    __metadata('design:type', String)
	], addParagraph.prototype, "paragraph", void 0);
	class removeByID {
	    constructor() {
	        this.id = '';
	    }
	}
	__decorate([
	    Validation_1.IsNumeric(), 
	    __metadata('design:type', String)
	], removeByID.prototype, "id", void 0);
	class update {
	    constructor() {
	        this.id = '';
	        this.paragraph = '';
	    }
	}
	__decorate([
	    Validation_1.IsNumeric(), 
	    __metadata('design:type', String)
	], update.prototype, "id", void 0);
	__decorate([
	    Validation_1.NotEmpty(), 
	    __metadata('design:type', String)
	], update.prototype, "paragraph", void 0);
	class getBook {
	    constructor() {
	        this.book_id = '';
	    }
	}
	__decorate([
	    Validation_1.IsNumeric(), 
	    __metadata('design:type', String)
	], getBook.prototype, "book_id", void 0);
	const ParagraphsController = {
	    update,
	    removeByID,
	    addParagraph,
	    findByID,
	    getBook
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ParagraphsController;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const Validation_1 = __webpack_require__(18);
	class findByID {
	    constructor() {
	        this.id = '';
	    }
	}
	__decorate([
	    Validation_1.IsNumeric(), 
	    __metadata('design:type', String)
	], findByID.prototype, "id", void 0);
	class addHighlight {
	    constructor() {
	        this.book_id = '';
	        this.paragraph_id = '';
	        this.start = '';
	        this.end = '';
	        this.text = '';
	    }
	}
	__decorate([
	    Validation_1.IsNumeric(), 
	    __metadata('design:type', String)
	], addHighlight.prototype, "book_id", void 0);
	__decorate([
	    Validation_1.IsNumeric(), 
	    __metadata('design:type', String)
	], addHighlight.prototype, "paragraph_id", void 0);
	__decorate([
	    Validation_1.IsNumeric(), 
	    __metadata('design:type', String)
	], addHighlight.prototype, "start", void 0);
	__decorate([
	    Validation_1.IsNumeric(), 
	    __metadata('design:type', String)
	], addHighlight.prototype, "end", void 0);
	__decorate([
	    Validation_1.NotEmpty(), 
	    __metadata('design:type', String)
	], addHighlight.prototype, "text", void 0);
	class removeByID {
	    constructor() {
	        this.id = '';
	    }
	}
	__decorate([
	    Validation_1.IsNumeric(), 
	    __metadata('design:type', String)
	], removeByID.prototype, "id", void 0);
	class update {
	    constructor() {
	        this.id = '';
	        this.text = '';
	    }
	}
	__decorate([
	    Validation_1.IsNumeric(), 
	    __metadata('design:type', String)
	], update.prototype, "id", void 0);
	__decorate([
	    Validation_1.NotEmpty(), 
	    __metadata('design:type', String)
	], update.prototype, "text", void 0);
	class getBook {
	    constructor() {
	        this.book_id = '';
	    }
	}
	__decorate([
	    Validation_1.IsNumeric(), 
	    __metadata('design:type', String)
	], getBook.prototype, "book_id", void 0);
	class getParagraph {
	    constructor() {
	        this.book_id = '';
	        this.paragraph_id = '';
	    }
	}
	__decorate([
	    Validation_1.IsNumeric(), 
	    __metadata('design:type', String)
	], getParagraph.prototype, "book_id", void 0);
	__decorate([
	    Validation_1.IsNumeric(), 
	    __metadata('design:type', String)
	], getParagraph.prototype, "paragraph_id", void 0);
	const HighlightController = {
	    update,
	    removeByID,
	    getParagraph,
	    findByID,
	    addHighlight,
	    getBook
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = HighlightController;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const Validation_1 = __webpack_require__(18);
	class authenticate {
	    constructor() {
	        this.email = ''; // TODO: It sucks to have to initialize these
	        this.password = '';
	    }
	}
	__decorate([
	    Validation_1.IsEmail(), 
	    __metadata('design:type', String)
	], authenticate.prototype, "email", void 0);
	__decorate([
	    // TODO: It sucks to have to initialize these
	    Validation_1.IsLength(6, 20), 
	    __metadata('design:type', String)
	], authenticate.prototype, "password", void 0);
	class create {
	    constructor() {
	        this.fname = '';
	        this.lname = '';
	        this.username = '';
	        this.password = '';
	        this.email = '';
	    }
	}
	__decorate([
	    Validation_1.IsLength(3, 20), 
	    __metadata('design:type', String)
	], create.prototype, "fname", void 0);
	__decorate([
	    Validation_1.IsLength(3, 20), 
	    __metadata('design:type', String)
	], create.prototype, "lname", void 0);
	__decorate([
	    Validation_1.IsLength(6, 20), 
	    __metadata('design:type', String)
	], create.prototype, "username", void 0);
	__decorate([
	    Validation_1.IsLength(6, 20), 
	    __metadata('design:type', String)
	], create.prototype, "password", void 0);
	__decorate([
	    Validation_1.IsEmail(), 
	    __metadata('design:type', String)
	], create.prototype, "email", void 0);
	const UsersController = {
	    authenticate,
	    create,
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = UsersController;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const inversify_restify_utils_1 = __webpack_require__(7);
	const inversify_1 = __webpack_require__(2);
	const constants_1 = __webpack_require__(4);
	const validate_1 = __webpack_require__(13);
	let HighlightController = class HighlightController {
	    constructor(LoggerFactory, HighlightService) {
	        this.LoggerFactory = LoggerFactory;
	        this.HighlightService = HighlightService;
	        this.logger = LoggerFactory.getLogger(this);
	    }
	    index(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info("Getting all highlights");
	            const result = yield this.HighlightService.getAll();
	            res.send(result);
	            return next();
	        });
	    }
	    getBook(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info("Getting highlights from book", req.body);
	            let result;
	            try {
	                result = yield this.HighlightService.getBook(req.body.book_id);
	                res.json(result);
	            }
	            catch (e) {
	                this.logger.error(e);
	                res.send(e);
	            }
	        });
	    }
	    findByID(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info('Getting highlight by id:', req.query);
	            let result;
	            try {
	                result = yield this.HighlightService.get(req.body.id);
	                res.send(200, result);
	            }
	            catch (e) {
	                this.logger.error(e);
	                res.send(e);
	            }
	        });
	    }
	    getParagraph(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info("Getting all highlights in paragraph", req.query);
	            let result;
	            try {
	                result = yield this.HighlightService.getParagraph(req.body.book_id, req.body.paragraph_id);
	                res.json(result);
	            }
	            catch (e) {
	                this.logger.error(e);
	                res.send(e);
	            }
	        });
	    }
	    addHighlight(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info('Adding highlight:', req.body);
	            let result;
	            try {
	                const book_id_exists = yield this.HighlightService.findByID(req.body.book_id);
	                if (!book_id_exists) {
	                    throw new Error("book_id not in db");
	                }
	                result = yield this.HighlightService
	                    .add(req.body.book_id, req.body.paragraph_id, req.body.text, req.body.start, req.body.end);
	                res.send(200, result);
	            }
	            catch (e) {
	                this.logger.error(e);
	                res.send(e);
	            }
	            return next();
	        });
	    }
	    update(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info("Updating highlight: ", req.body);
	            let result;
	            try {
	                const id_exists = yield this.HighlightService.findByID(req.body.id);
	                if (!id_exists) {
	                    throw new Error("id not in db");
	                }
	                result = yield this.HighlightService
	                    .update(req.body.id, req.body.text);
	                res.send(200, result);
	            }
	            catch (e) {
	                this.logger.error(e);
	                res.send(e);
	            }
	        });
	    }
	    removeByID(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info("Deleting highlight :  ", req.body);
	            let result;
	            try {
	                const id_exists = yield this.HighlightService.findByID(req.body.id);
	                if (!id_exists) {
	                    throw new Error("id not in db");
	                }
	                result = yield this.HighlightService.removeByID(req.body.id);
	                res.send(200, result);
	            }
	            catch (e) {
	                this.logger.warn(e);
	                res.send(e);
	            }
	            return next();
	        });
	    }
	};
	__decorate([
	    inversify_restify_utils_1.Get('/'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], HighlightController.prototype, "index", null);
	__decorate([
	    validate_1.default,
	    inversify_restify_utils_1.Post('/get/book'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], HighlightController.prototype, "getBook", null);
	__decorate([
	    validate_1.default,
	    inversify_restify_utils_1.Post('/get'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], HighlightController.prototype, "findByID", null);
	__decorate([
	    validate_1.default,
	    inversify_restify_utils_1.Post('/get/paragraph'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], HighlightController.prototype, "getParagraph", null);
	__decorate([
	    validate_1.default,
	    inversify_restify_utils_1.Post('/add'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], HighlightController.prototype, "addHighlight", null);
	__decorate([
	    validate_1.default,
	    inversify_restify_utils_1.Post('/update/text'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], HighlightController.prototype, "update", null);
	__decorate([
	    validate_1.default,
	    inversify_restify_utils_1.Delete('/deleteID'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], HighlightController.prototype, "removeByID", null);
	HighlightController = __decorate([
	    inversify_restify_utils_1.Controller(`${constants_1.API_BASE}/highlights`),
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(constants_1.__.LoggerFactory)),
	    __param(1, inversify_1.inject(constants_1.__.HighlightService)), 
	    __metadata('design:paramtypes', [Object, Object])
	], HighlightController);
	exports.HighlightController = HighlightController;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const inversify_restify_utils_1 = __webpack_require__(7);
	const inversify_1 = __webpack_require__(2);
	const constants_1 = __webpack_require__(4);
	const validate_1 = __webpack_require__(13);
	let ParagraphsController = class ParagraphsController {
	    constructor(LoggerFactory, ParagraphsService) {
	        this.LoggerFactory = LoggerFactory;
	        this.ParagraphsService = ParagraphsService;
	        this.logger = LoggerFactory.getLogger(this);
	    }
	    index(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info("Getting all Paragraphs");
	            const result = yield this.ParagraphsService.getAll();
	            res.send(result);
	            return next();
	        });
	    }
	    getBook(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info("Getting all Paragraphs in book", req.body);
	            let result;
	            try {
	                result = yield this.ParagraphsService.getBook(req.body.book_id);
	                res.json(result);
	            }
	            catch (e) {
	                this.logger.error(e);
	                res.send(e);
	            }
	        });
	    }
	    findByID(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info('Getting paragraph : ', req.body);
	            let result;
	            try {
	                result = yield this.ParagraphsService.get(req.body.id);
	                res.send(200, result);
	            }
	            catch (e) {
	                this.logger.error(e);
	                res.send(e);
	            }
	        });
	    }
	    addParagraph(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info('Adding paragraph :', req.body);
	            let result;
	            try {
	                const book_id_exists = yield this.ParagraphsService.findByID(req.body.book_id);
	                if (!book_id_exists) {
	                    throw new Error("book_id not in db");
	                }
	                result = yield this.ParagraphsService.add(req.body.book_id, req.body.paragraph);
	            }
	            catch (e) {
	                res.send(e);
	            }
	            res.send(result);
	            return next();
	        });
	    }
	    update(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info("Updating paragraph : ", req.body);
	            let result;
	            try {
	                const id_exists = yield this.ParagraphsService.findByID(req.body.id);
	                if (!id_exists) {
	                    throw new Error("id not in db");
	                }
	                result = yield this.ParagraphsService.update(req.body.id, req.body.paragraph);
	                res.send(result);
	            }
	            catch (e) {
	                this.logger.error(e);
	                res.send(e);
	            }
	        });
	    }
	    removeByID(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info("Deleting paragraph :  ", req.body);
	            let result;
	            try {
	                const id_exists = yield this.ParagraphsService.findByID(req.body.id);
	                if (!id_exists) {
	                    throw new Error("id not in db");
	                }
	                result = yield this.ParagraphsService.removeByID(req.body.id);
	            }
	            catch (e) {
	                this.logger.warn(e);
	                res.send(e);
	            }
	            res.send(result);
	            return next();
	        });
	    }
	};
	__decorate([
	    inversify_restify_utils_1.Get('/'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], ParagraphsController.prototype, "index", null);
	__decorate([
	    validate_1.default,
	    inversify_restify_utils_1.Post('/book'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], ParagraphsController.prototype, "getBook", null);
	__decorate([
	    validate_1.default,
	    inversify_restify_utils_1.Post('/getID'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], ParagraphsController.prototype, "findByID", null);
	__decorate([
	    validate_1.default,
	    inversify_restify_utils_1.Post('/add'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], ParagraphsController.prototype, "addParagraph", null);
	__decorate([
	    validate_1.default,
	    inversify_restify_utils_1.Post('/update'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], ParagraphsController.prototype, "update", null);
	__decorate([
	    validate_1.default,
	    inversify_restify_utils_1.Delete('/deleteID'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], ParagraphsController.prototype, "removeByID", null);
	ParagraphsController = __decorate([
	    inversify_restify_utils_1.Controller(`${constants_1.API_BASE}/paragraphs`),
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(constants_1.__.LoggerFactory)),
	    __param(1, inversify_1.inject(constants_1.__.ParagraphsService)), 
	    __metadata('design:paramtypes', [Object, Object])
	], ParagraphsController);
	exports.ParagraphsController = ParagraphsController;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const inversify_1 = __webpack_require__(2);
	const constants_1 = __webpack_require__(4);
	const source_1 = __webpack_require__(9);
	const text_reader_1 = __webpack_require__(10);
	let Tesseract = __webpack_require__(25);
	let Jimp = __webpack_require__(26);
	//TODO must find a way to fix JIMP asynchronicity
	//TODO how do we make the timeout period longer for ocrTextFromFS
	let TextsService = class TextsService {
	    constructor(LoggerFactory) {
	        this.logger = LoggerFactory.getLogger(this);
	    }
	    onBootstrap() {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info('create texts table');
	            yield this.db.texts.create();
	        });
	    }
	    add(title, text) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.texts.add(title, text);
	        });
	    }
	    addTextFromFS(title, path) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const textReader = new text_reader_1.TextReader(source_1.Source.FS);
	            yield textReader.init(path);
	            return yield this.db.texts
	                .add(title, textReader.contents.raw);
	        });
	    }
	    ocrTextFromFS(title, path) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const filename = "./temp.jpg";
	            //TODO Remove converted image !
	            const processImg = function () {
	                return __awaiter(this, void 0, void 0, function* () {
	                    return new Promise((resolve, reject) => {
	                        Jimp.read(path, function (err, img) {
	                            if (err) {
	                                reject(err);
	                            }
	                            img.greyscale().scale(0.75).write(filename);
	                            console.log("done");
	                            resolve("Done");
	                        });
	                    });
	                });
	            };
	            yield processImg();
	            // Doing this as just a timeout
	            // Doing this makes the marker set error go away, why...
	            // It looks like the file isnt done being written 
	            // (I did a test where i read file before and after/logged it to stdout )
	            yield Jimp.read("./rfid.jpg");
	            const text = yield Tesseract.recognize(filename)
	                .progress((message) => console.log(message))
	                .catch((err) => console.error(err))
	                .then((result) => result);
	            console.log("Text", text.text);
	            return yield this.db.texts.add(title, text.text);
	        });
	    }
	    addTextFromURL(title, url) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const textReader = new text_reader_1.TextReader(source_1.Source.HTTP);
	            yield textReader.init(url);
	            return yield this.db.texts
	                .add(title, textReader.contents.raw);
	        });
	    }
	    updateText(id, text) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.texts.updateText(id, text);
	        });
	    }
	    updateTitle(id, title) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.texts.updateTitle(id, title);
	        });
	    }
	    findByID(id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.texts.findByID(id);
	        });
	    }
	    removeByID(id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.texts.remove(id);
	        });
	    }
	    getAll() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.texts.getAll();
	        });
	    }
	};
	__decorate([
	    inversify_1.inject(constants_1.__.Database), 
	    __metadata('design:type', Object)
	], TextsService.prototype, "db", void 0);
	TextsService = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(constants_1.__.LoggerFactory)), 
	    __metadata('design:paramtypes', [Object])
	], TextsService);
	exports.TextsService = TextsService;


/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("tesseract.js");

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("jimp");

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const inversify_1 = __webpack_require__(2);
	__webpack_require__(3);
	const constants_1 = __webpack_require__(4);
	let ParagraphsService = class ParagraphsService {
	    constructor(LoggerFactory) {
	        this.logger = LoggerFactory.getLogger(this);
	    }
	    onBootstrap() {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info('create paragraphs table');
	            yield this.db.paragraphs.create();
	        });
	    }
	    add(book_id, paragraph) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.paragraphs.add(book_id, paragraph);
	        });
	    }
	    get(id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.paragraphs.get(id);
	        });
	    }
	    getAll() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.paragraphs.getAll();
	        });
	    }
	    findByID(book_id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.paragraphs.findByID(book_id);
	        });
	    }
	    removeByID(id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.paragraphs.remove(id);
	        });
	    }
	    update(id, paragraph) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.paragraphs.update(id, paragraph);
	        });
	    }
	    getBook(book_id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.paragraphs.getBook(book_id);
	        });
	    }
	};
	__decorate([
	    inversify_1.inject(constants_1.__.Database), 
	    __metadata('design:type', Object)
	], ParagraphsService.prototype, "db", void 0);
	ParagraphsService = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(constants_1.__.LoggerFactory)), 
	    __metadata('design:paramtypes', [Object])
	], ParagraphsService);
	exports.ParagraphsService = ParagraphsService;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const inversify_1 = __webpack_require__(2);
	const constants_1 = __webpack_require__(4);
	let HighlightService = class HighlightService {
	    constructor(LoggerFactory) {
	        this.logger = LoggerFactory.getLogger(this);
	    }
	    onBootstrap() {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info('create highlight table');
	            yield this.db.highlights.create();
	        });
	    }
	    add(book_id, paragraph_id, text, start, end) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.highlights.add(book_id, paragraph_id, text, start, end);
	        });
	    }
	    get(id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.highlights.get(id);
	        });
	    }
	    getAll() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.highlights.getAll();
	        });
	    }
	    findByID(id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.highlights.findByID(id);
	        });
	    }
	    removeByID(id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.highlights.remove(id);
	        });
	    }
	    update(id, text) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.highlights.update(id, text);
	        });
	    }
	    getBook(book_id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.highlights.getBook(book_id);
	        });
	    }
	    getParagraph(book_id, paragraph_id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.highlights.getParagraph(book_id, paragraph_id);
	        });
	    }
	};
	__decorate([
	    inversify_1.inject(constants_1.__.Database), 
	    __metadata('design:type', Object)
	], HighlightService.prototype, "db", void 0);
	HighlightService = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(constants_1.__.LoggerFactory)), 
	    __metadata('design:paramtypes', [Object])
	], HighlightService);
	exports.HighlightService = HighlightService;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const inversify_1 = __webpack_require__(2);
	const constants_1 = __webpack_require__(4);
	let App = class App {
	    constructor(LoggerFactory) {
	        console.log(this.httpServer);
	    }
	    bootstrap() {
	        return __awaiter(this, void 0, void 0, function* () {
	            try {
	                this.httpServer.onBootstrap(this.userService.onBootstrap.bind(this.userService));
	                this.httpServer.onBootstrap(this.cache.onBootstrap.bind(this.cache));
	                this.httpServer.onBootstrap(this.textsService.onBootstrap.bind(this.textsService));
	                this.httpServer.onBootstrap(this.paragraphsService.onBootstrap.bind(this.paragraphsService));
	                this.httpServer.onBootstrap(this.highlightService.onBootstrap.bind(this.highlightService));
	            }
	            catch (e) {
	                this.logger.fatal(e);
	            }
	            this.httpServer.listen();
	            return true;
	        });
	    }
	    close() {
	        this.httpServer.close(() => {
	            console.log("Ending Server. Goodbye");
	        });
	    }
	};
	__decorate([
	    inversify_1.inject(constants_1.default.HTTPServer), 
	    __metadata('design:type', Object)
	], App.prototype, "httpServer", void 0);
	__decorate([
	    inversify_1.inject(constants_1.default.TextsService), 
	    __metadata('design:type', Object)
	], App.prototype, "textsService", void 0);
	__decorate([
	    inversify_1.inject(constants_1.default.ParagraphsService), 
	    __metadata('design:type', Object)
	], App.prototype, "paragraphsService", void 0);
	__decorate([
	    inversify_1.inject(constants_1.default.HighlightService), 
	    __metadata('design:type', Object)
	], App.prototype, "highlightService", void 0);
	__decorate([
	    inversify_1.inject(constants_1.default.UserService), 
	    __metadata('design:type', Object)
	], App.prototype, "userService", void 0);
	__decorate([
	    inversify_1.inject(constants_1.default.CacheService), 
	    __metadata('design:type', Object)
	], App.prototype, "cache", void 0);
	App = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(constants_1.default.LoggerFactory)), 
	    __metadata('design:paramtypes', [Object])
	], App);
	exports.App = App;


/***/ },
/* 30 */
/***/ function(module, exports) {

	"use strict";
	exports.ServerConfig = {
	    port: 8080,
	    name: "Restify",
	    version: "1.0"
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const bunyan_1 = __webpack_require__(32);
	const inversify_1 = __webpack_require__(2);
	let LoggerFactory_1 = class LoggerFactory {
	    static makeDefaultConfig() {
	        return { name: '', serializers: bunyan_1.stdSerializers };
	    }
	    static makeConfig(name, options) {
	        options.name = name;
	        return options;
	    }
	    static createLogger(name) {
	        if (!LoggerFactory_1.loggers[name]) {
	            const logger = bunyan_1.createLogger(LoggerFactory_1.makeConfig(name, LoggerFactory_1.config));
	            logger['format'] = (req) => {
	                return `req=${req.uuid}${req.session ? ` session=${req.session}` : ''}`;
	            };
	            LoggerFactory_1.loggers[name] = logger;
	        }
	        return LoggerFactory_1.loggers[name];
	    }
	    static getLogger(name) {
	        // Get the constructors name and add it to loggers
	        return LoggerFactory_1.createLogger(name.constructor.toString().match(/class ([\w|_]+)/)[1]);
	    }
	};
	let LoggerFactory = LoggerFactory_1;
	LoggerFactory.config = LoggerFactory.makeDefaultConfig();
	LoggerFactory.loggers = {};
	LoggerFactory = LoggerFactory_1 = __decorate([
	    inversify_1.injectable(), 
	    __metadata('design:paramtypes', [])
	], LoggerFactory);
	exports.LoggerFactory = LoggerFactory;


/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("bunyan");

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const inversify_1 = __webpack_require__(2);
	const promise = __webpack_require__(34);
	const pgPromise = __webpack_require__(35);
	const users_1 = __webpack_require__(36);
	const texts_1 = __webpack_require__(39);
	const highlights_1 = __webpack_require__(40);
	const paragraphs_1 = __webpack_require__(41);
	let DatabaseProvider = class DatabaseProvider {
	    constructor() {
	        const options = {
	            promiseLib: promise,
	            extend: (obj) => {
	                obj.users = new users_1.Repository(obj);
	                obj.texts = new texts_1.Repository(obj);
	                obj.paragraphs = new paragraphs_1.Repository(obj);
	                obj.highlights = new highlights_1.Repository(obj);
	            }
	        };
	        const config = {
	            host: 'localhost',
	            port: 5432,
	            database: process.env.PG_DATABASE || 'postgres',
	            user: process.env.PG_USER || 'postgres',
	            password: process.env.PG_PASSWORD || 'postgres'
	        };
	        const pgp = pgPromise(options);
	        this.db = pgp(config); // gross type cast
	    }
	    getDatabase() {
	        return this.db;
	    }
	};
	DatabaseProvider = __decorate([
	    inversify_1.injectable(), 
	    __metadata('design:paramtypes', [])
	], DatabaseProvider);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = DatabaseProvider;


/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = require("bluebird");

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = require("pg-promise");

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const sql_1 = __webpack_require__(37);
	const sql = sql_1.default.users;
	class Repository {
	    constructor(db) {
	        this.db = db;
	    }
	    create() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.none(sql.create);
	        });
	    }
	    init() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.tx('Init-Users', (t) => t.map(sql.init, null, (row) => row.id));
	        });
	    }
	    drop() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.none(sql.drop);
	        });
	    }
	    empty() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.none(sql.empty);
	        });
	    }
	    createUsersView() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.none(sql.createUsersView);
	        });
	    }
	    add(user) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.one(sql.add, user, (u) => u.id);
	        });
	    }
	    remove(id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.result(sql.remove, id, (r) => r.rowcount);
	        });
	    }
	    find(id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.oneOrNone('SELECT * from Users_View WHERE id = $1', id);
	        });
	    }
	    findPasswordHashById(id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.oneOrNone('SELECT password from Users where id = $1', id);
	        });
	    }
	    findByEmail(email) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.oneOrNone('SELECT * from Users_View WHERE email = $1', email);
	        });
	    }
	    all() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.any('SELECT * from Users_View ');
	        });
	    }
	    total() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.one('SELECT count(*) FROM Users', [], (a) => +a.count);
	        });
	    }
	    updatePassword(password, id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.oneOrNone(sql.updatePassword, [password, id], (u) => u.id);
	        });
	    }
	}
	exports.Repository = Repository;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const pg_promise_1 = __webpack_require__(35);
	const path = __webpack_require__(38);
	class SQL_Helper {
	    static readFile(file) {
	        const fullpath = path.join('../src/db/sql', file);
	        const options = {
	            minify: true,
	            params: {
	                schema: 'public'
	            }
	        };
	        return new pg_promise_1.QueryFile(fullpath, options);
	    }
	}
	exports.SQL_Helper = SQL_Helper;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    users: {
	        create: SQL_Helper.readFile('users/create.sql'),
	        empty: SQL_Helper.readFile('users/empty.sql'),
	        init: SQL_Helper.readFile('users/init.sql'),
	        drop: SQL_Helper.readFile('users/drop.sql'),
	        add: SQL_Helper.readFile('users/add.sql'),
	        updatePassword: SQL_Helper.readFile('users/update-password.sql'),
	        createUsersView: SQL_Helper.readFile('users/users-view.sql'),
	        remove: SQL_Helper.readFile('users/remove.sql'),
	    },
	    texts: {
	        create: SQL_Helper.readFile('texts/create.sql'),
	        add: SQL_Helper.readFile('texts/add.sql'),
	        remove: SQL_Helper.readFile('texts/remove.sql'),
	        update: SQL_Helper.readFile('texts/update.sql'),
	        updateTitle: SQL_Helper.readFile('texts/update-title.sql')
	    },
	    paragraphs: {
	        create: SQL_Helper.readFile('paragraphs/create.sql'),
	        add: SQL_Helper.readFile('paragraphs/add.sql'),
	        remove: SQL_Helper.readFile('paragraphs/remove.sql'),
	        getBook: SQL_Helper.readFile('paragraphs/getBook.sql'),
	        update: SQL_Helper.readFile('paragraphs/update.sql')
	    },
	    highlights: {
	        create: SQL_Helper.readFile('highlights/create.sql'),
	        add: SQL_Helper.readFile('highlights/add.sql'),
	        getBook: SQL_Helper.readFile('highlights/getBook.sql'),
	        getParagraph: SQL_Helper.readFile('highlights/getParagraph.sql'),
	        remove: SQL_Helper.readFile('highlights/remove.sql'),
	        update: SQL_Helper.readFile('highlights/update.sql')
	    }
	};


/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const sql_1 = __webpack_require__(37);
	const sql = sql_1.default.texts;
	class Repository {
	    constructor(db) {
	        this.db = db;
	    }
	    create() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.none(sql.create);
	        });
	    }
	    add(title, text) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.any(sql.add, [title, text]);
	        });
	    }
	    findByID(id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.oneOrNone('SELECT * from texts where id = $1', id);
	        });
	    }
	    remove(id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.result(sql.remove, id, (r) => r);
	        });
	    }
	    getAll() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.any('SELECT * from texts where deleted = false');
	        });
	    }
	    updateText(id, text) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.result(sql.update, [id, text], (r) => r.rows);
	        });
	    }
	    updateTitle(id, title) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.result(sql.updateTitle, [id, title], (r) => r.rows);
	        });
	    }
	}
	exports.Repository = Repository;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const sql_1 = __webpack_require__(37);
	const sql = sql_1.default.highlights;
	class Repository {
	    constructor(db) {
	        this.db = db;
	    }
	    create() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.none(sql.create);
	        });
	    }
	    add(book_id, paragraph_id, text, start, end) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.result(sql.add, [book_id, paragraph_id, text, start, end], (r) => r);
	        });
	    }
	    findByID(id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.oneOrNone('SELECT * from highlights where id = $1', id);
	        });
	    }
	    remove(id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.result(sql.remove, id, (r) => r.rows);
	        });
	    }
	    update(id, text) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.result(sql.update, [id, text], (r) => r);
	        });
	    }
	    get(id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.result('SELECT * from highlights where id=$1', id, (r) => r.rows);
	        });
	    }
	    getAll() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.result('SELECT * from highlights', [], (r) => r.rows);
	        });
	    }
	    getBook(book_id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.result(sql.getBook, book_id, (r) => r.rows);
	        });
	    }
	    getParagraph(book_id, paragraph_id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.result(sql.getParagraph, [book_id, paragraph_id], (r) => r.rows);
	        });
	    }
	}
	exports.Repository = Repository;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const sql_1 = __webpack_require__(37);
	const sql = sql_1.default.paragraphs;
	class Repository {
	    constructor(db) {
	        this.db = db;
	    }
	    create() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.none(sql.create);
	        });
	    }
	    add(book_id, paragraph) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.result(sql.add, [book_id, paragraph], (r) => r.rows);
	        });
	    }
	    findByID(id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield this.db.oneOrNone('SELECT * from texts where id = $1', id);
	        });
	    }
	    remove(id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.result(sql.remove, id, (r) => r.rows);
	        });
	    }
	    update(id, paragraph) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.result(sql.update, [id, paragraph], (r) => r.rows);
	        });
	    }
	    get(id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.result('SELECT * from paragraphs where id=$1', id, (r) => r.rows);
	        });
	    }
	    getAll() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.result('SELECT * from paragraphs', [], (r) => r.rows);
	        });
	    }
	    getBook(book_id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.result(sql.getBook, book_id, (r) => r.rows);
	        });
	    }
	}
	exports.Repository = Repository;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const restify_errors_1 = __webpack_require__(15);
	const inversify_restify_utils_1 = __webpack_require__(7);
	const inversify_1 = __webpack_require__(2);
	const constants_1 = __webpack_require__(4);
	const validate_1 = __webpack_require__(13);
	let UsersController = class UsersController {
	    constructor(LoggerFactory) {
	        this.logger = LoggerFactory.getLogger(this);
	    }
	    get(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const users = yield this.userService.getAll();
	            return users;
	        });
	    }
	    create(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const id = yield this.userService.add(req.body);
	            const user = yield this.userService.findById(id);
	            res.send(200, user);
	            return next();
	        });
	    }
	    empty(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            yield this.userService.empty();
	            res.send(200);
	            return next();
	        });
	    }
	    authenticate(req, res, next) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const user = yield this.userService.findByEmail(req.body.email);
	            if (!user) {
	                return next(new restify_errors_1.BadRequestError('User not found'));
	            }
	            const session = yield this.userService.authenticate(req.body.password, user);
	            res.send({ id_token: session });
	            return next();
	        });
	    }
	};
	__decorate([
	    inversify_1.inject(constants_1.default.UserService), 
	    __metadata('design:type', Object)
	], UsersController.prototype, "userService", void 0);
	__decorate([
	    inversify_1.inject(constants_1.default.Database), 
	    __metadata('design:type', Object)
	], UsersController.prototype, "db", void 0);
	__decorate([
	    inversify_restify_utils_1.Get('/'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], UsersController.prototype, "get", null);
	__decorate([
	    validate_1.default,
	    inversify_restify_utils_1.Post('/add'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], UsersController.prototype, "create", null);
	__decorate([
	    inversify_restify_utils_1.Post('/empty'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], UsersController.prototype, "empty", null);
	__decorate([
	    validate_1.default,
	    inversify_restify_utils_1.Post('/authenticate'), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object, Function]), 
	    __metadata('design:returntype', Promise)
	], UsersController.prototype, "authenticate", null);
	UsersController = __decorate([
	    inversify_1.injectable(),
	    inversify_restify_utils_1.Controller(`${constants_1.API_BASE}/users`),
	    __param(0, inversify_1.inject(constants_1.default.LoggerFactory)), 
	    __metadata('design:paramtypes', [Object])
	], UsersController);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = UsersController;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const inversify_1 = __webpack_require__(2);
	const bcrypt_1 = __webpack_require__(44);
	const Validator_1 = __webpack_require__(14);
	const Validation_1 = __webpack_require__(18);
	const bluebird_1 = __webpack_require__(34);
	const constants_1 = __webpack_require__(4);
	const validator = new Validator_1.Validator();
	const SALT_WORK_FACTOR = 10;
	const hashAsync = bluebird_1.promisify(bcrypt_1.hash);
	const compareAsync = bluebird_1.promisify(bcrypt_1.compare);
	let UserService = class UserService {
	    constructor(LoggerFactory) {
	        this.logger = LoggerFactory.getLogger(this);
	    }
	    onBootstrap() {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.logger.info('create users table');
	            yield this.db.users.create();
	            this.logger.info('create users view');
	            yield this.db.users.createUsersView();
	        });
	    }
	    findByEmail(email) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.users.findByEmail(email);
	        });
	    }
	    findById(id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.users.find(+id);
	        });
	    }
	    getAll() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.users.all();
	        });
	    }
	    add(req) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const emailExists = yield this.db.users.findByEmail(req.email);
	            if (emailExists) {
	                throw new Error('Email already exists');
	            }
	            req.password = yield hashAsync(req.password, SALT_WORK_FACTOR);
	            const id = yield this.db.users.add(req);
	            return id;
	        });
	    }
	    updatePassword(userId, oldPassword, newPassword) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const user = yield this.db.users.find(userId);
	            const passwordHash = user.password;
	            const candidateHash = yield hashAsync(oldPassword, SALT_WORK_FACTOR);
	            const valid = yield compareAsync(candidateHash, passwordHash);
	            if (valid) {
	                return this.db.users.updatePassword(newPassword, userId);
	            }
	            return Promise.reject(new Error());
	        });
	    }
	    authenticate(candidate, user) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const { password } = yield this.db.users.findPasswordHashById(+user.id);
	            if (!bcrypt_1.hash) {
	                return Promise.reject(new Error('User not found'));
	            }
	            const auth = yield compareAsync(candidate, password);
	            const session = yield this.session.setSession(user);
	            return session;
	        });
	    }
	    empty() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return this.db.users.empty();
	        });
	    }
	};
	__decorate([
	    inversify_1.inject(constants_1.default.Database), 
	    __metadata('design:type', Object)
	], UserService.prototype, "db", void 0);
	__decorate([
	    inversify_1.inject(constants_1.default.SessionService), 
	    __metadata('design:type', Object)
	], UserService.prototype, "session", void 0);
	UserService = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(constants_1.default.LoggerFactory)), 
	    __metadata('design:paramtypes', [Object])
	], UserService);
	class ValidateUserReq {
	    set id(id) {
	        this._id = id + '';
	    }
	}
	__decorate([
	    Validation_1.IsNumeric(), 
	    __metadata('design:type', String)
	], ValidateUserReq.prototype, "_id", void 0);
	__decorate([
	    Validation_1.IsLength(6, 20), 
	    __metadata('design:type', String)
	], ValidateUserReq.prototype, "password", void 0);
	class User {
	}
	__decorate([
	    Validation_1.IsLength(6, 20), 
	    __metadata('design:type', String)
	], User.prototype, "username", void 0);
	__decorate([
	    Validation_1.IsEmail(), 
	    __metadata('design:type', String)
	], User.prototype, "email", void 0);
	__decorate([
	    Validation_1.IsLength(6, 20), 
	    __metadata('design:type', String)
	], User.prototype, "password", void 0);
	__decorate([
	    Validation_1.IsLength(3, 20), 
	    __metadata('design:type', String)
	], User.prototype, "fname", void 0);
	__decorate([
	    Validation_1.IsLength(3, 20), 
	    __metadata('design:type', String)
	], User.prototype, "lname", void 0);
	exports.User = User;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = UserService;


/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = require("bcrypt");

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const inversify_1 = __webpack_require__(2);
	const jsonwebtoken_1 = __webpack_require__(46);
	const fs_1 = __webpack_require__(11);
	const path = __webpack_require__(38);
	const node_uuid_1 = __webpack_require__(47);
	const constants_1 = __webpack_require__(4);
	const KEY_FILE = path.resolve(process.cwd(), 'keys');
	// TODO: CHANGE KEYS
	const PRIVATE_KEY = fs_1.readFileSync(`${KEY_FILE}/privkey.pem`);
	const PUBLIC_KEY = fs_1.readFileSync(`${KEY_FILE}/pubkey.pem`);
	let SessionService = class SessionService {
	    constructor(LoggerFactory) {
	        this.logger = LoggerFactory.getLogger(this);
	    }
	    getSession(token) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return new Promise((resolve, reject) => {
	                jsonwebtoken_1.verify(token, PUBLIC_KEY, (err, decoded) => {
	                    if (err) {
	                        reject(err);
	                        return;
	                    }
	                    resolve(decoded);
	                });
	            });
	        });
	    }
	    setSession(user) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const sessionId = node_uuid_1.v4();
	            const token = jsonwebtoken_1.sign({ ['session-id']: sessionId }, PRIVATE_KEY, { algorithm: 'RS256' });
	            yield this.cache.set(sessionId, JSON.stringify(user));
	            return token;
	        });
	    }
	    clearSession() {
	        return __awaiter(this, void 0, void 0, function* () {
	        });
	    }
	};
	__decorate([
	    inversify_1.inject(constants_1.default.CacheService), 
	    __metadata('design:type', Object)
	], SessionService.prototype, "cache", void 0);
	SessionService = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(constants_1.default.LoggerFactory)), 
	    __metadata('design:paramtypes', [Object])
	], SessionService);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = SessionService;


/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = require("node-uuid");

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const inversify_1 = __webpack_require__(2);
	const redis_1 = __webpack_require__(49);
	const constants_1 = __webpack_require__(4);
	let CacheService = class CacheService {
	    constructor(LoggerFactory) {
	        this.logger = LoggerFactory.getLogger(this);
	    }
	    onBootstrap() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return new Promise((resolve, reject) => {
	                this.logger.info('connecting to redis');
	                this.client = redis_1.createClient();
	                Reflect.get(this.client, 'on').call(this, 'ready', () => {
	                    this.logger.info('connected');
	                    resolve(true);
	                });
	                Reflect.get(this.client, 'on').call(this, 'err', (err) => {
	                    this.logger.error(err);
	                    reject(false);
	                });
	                Reflect.get(this.client, 'on').call(this, 'reconnecting', (err) => this.logger.info(`reconnecting ${err ? 'err=' + err : ''}`));
	            });
	        });
	    }
	    get(key) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return new Promise((resolve, reject) => {
	                this.client.get(key, (err, value) => {
	                    if (err) {
	                        reject(err);
	                        return;
	                    }
	                    const str = value;
	                    resolve(str);
	                });
	            });
	        });
	    }
	    set(key, value) {
	        return __awaiter(this, void 0, void 0, function* () {
	            const time = Date.now();
	            return new Promise((resolve, reject) => {
	                this.client.set(key, value, (err, value) => {
	                    if (err) {
	                        reject(err);
	                        return;
	                    }
	                    this.logger.info(`key=${key} time=${Date.now() - time}`);
	                    resolve(true);
	                });
	            });
	        });
	    }
	};
	CacheService = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(constants_1.default.LoggerFactory)), 
	    __metadata('design:paramtypes', [Object])
	], CacheService);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = CacheService;


/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = require("redis");

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map