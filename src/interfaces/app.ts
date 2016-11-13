interface IApp {
    bootstrap: () => Promise<Boolean>
    close: () => void
}
export default IApp