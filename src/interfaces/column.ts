interface IColumn {
    name:string,
    dataTypeID:number,

    // properties below are not available within Native Bindings:

    tableID:number,
    columnID:number,
    dataTypeSize:number,
    dataTypeModifier:number,
    format:string
}
export default IColumn