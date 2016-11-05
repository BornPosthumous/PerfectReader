export const __ = {
    App: Symbol('App'),

    DatabaseProvider: Symbol('DatabaseProvider'),
    Database: Symbol('Database'),

    Logger: Symbol('Logger'),
    LoggerFactory: Symbol('LoggerFactory'),

    HTTPServer: Symbol('HTTPServer'),
    ServerConfig: Symbol('ServerConfig'),
    // Router: Symbol('Router'),

    // UserService: Symbol('UserService'),
    // SessionService: Symbol('SessionService'),
    // CacheService: Symbol('CacheService'),
    TextsService: Symbol("ITextsService"),
    ParagraphsService: Symbol("IParagraphsService"),
    HighlightService: Symbol("IHighlightService"),
    TextGetter: Symbol("ITextGetter"),
    TextReader: Symbol("ITextReader"),

}

export const API_BASE = '/api/';

export default __
