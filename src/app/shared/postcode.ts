import { District } from "./district";

export class PostCode {
    constructor(
       public Code: string,
       public Community: string,
       public Disctrict: District 
    ) {}
}
