import IColumn from './column'
interface IResult {
    command:string,
    rowCount:number,
    rows:Array<any>,
    fields:Array<IColumn>,

    duration:number, // pg-promise extension

    // properties below are not available within Native Bindings:

    rowAsArray:boolean
}
export default IResult