interface IHTTPServer { 
    onBootstrap: any
    listen: () => void
    close: ((cb: Function) => void)
}
export default IHTTPServer