import { Province } from "./province";

export class District {
    constructor(
        public Id: number,
        public Name: string,
        public Province: Province
    ) {}
}
