import { kernel } from './config/kernel'
import { HTTPServer } from './core/http-server'
import { __ } from './config/constants'
import IApp from './interfaces/app'

const app = kernel.get<IApp>(__.App)
app.bootstrap()


//TODO Refactor db routes to no longer use result type
//TODO Should also add types to the routes
//TODO Must add correct type refactored dependency injections
