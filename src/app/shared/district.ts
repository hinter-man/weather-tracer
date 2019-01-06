import { Province } from "./province";

export class District {
    constructor(
        public id: number,
        public name: string,
        public province: Province | any
    ) {}
}
