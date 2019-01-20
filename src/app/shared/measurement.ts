import { TypeOfMeasurement } from "./typeofmeasurement";

export class Measurement {
    constructor(
        public StationId?: number,
        public TypeOfMeasure?: TypeOfMeasurement,
        public Timestamp?: Date | any, 
        public Value?: number,
        public Min?: number,
        public Max?: number,
        public Avg?: number,
        public Sum?: number
    ) {}
}
