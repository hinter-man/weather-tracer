import { District } from "./district";

export class PostCode {
    constructor(
       public code: string,
       public community: string,
       public district: District | any 
    ) {}
}
