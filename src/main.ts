console.log("Main")
import { kernel } from './config/kernel'
import { HTTPServer } from './core/http-server'
import { __ } from './config/constants'
import IApp from './interfaces/app'

console.log("APP")
const app = kernel.get<IApp>(__.App)
console.log("Bootstrapping");
app.bootstrap()
console.log("Bootstrapped")

