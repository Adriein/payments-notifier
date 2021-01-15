import { DefaultersExcelContent } from "../../../Infraestructure/Rest/defaulters";

export class EnsureUsersConsistencyCommand {
    constructor(public rows: DefaultersExcelContent[]){}
}