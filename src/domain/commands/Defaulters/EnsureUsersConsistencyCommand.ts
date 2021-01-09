import { DefaultersExcelContent } from "../../../infraestructure/Rest/defaulters";

export class EnsureUsersConsistencyCommand {
    constructor(public rows: DefaultersExcelContent[]){}
}