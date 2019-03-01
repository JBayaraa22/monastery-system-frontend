import { Book } from "./book";

export interface Receipt{
    receiptNumber : number
    printedDate   : Date
    from      : string
    toWhom    : string
    books     : Array<Book>,
    printedBy : string,
    price     : number,
    status    : number,
    [key : string] : any
}