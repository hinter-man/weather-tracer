import { PostCode } from "./postcode";

export class Station {
    constructor(
        public Id?: number,
        public Name?: string,
        public Type?: string,
        public Address?: string,
        public PostCode?: PostCode | any,
        public Longitude?: number,
        public Latitude?: number
    ) {}
}
