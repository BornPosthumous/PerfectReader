import { kernel } from './config/kernel'
import { HTTPServer } from './core/http-server'
import { __ } from './config/constants'
import IApp from './interfaces/app'
var Jimp = require('jimp')

const app = kernel.get<IApp>(__.App)
app.bootstrap()
