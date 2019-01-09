import { TypeOfMeasurement } from "./typeofmeasurement";

export class Measurement {
    constructor(
        public StationId: number,
        public Timestamp: Date, 
        public TypeOfMeasure: TypeOfMeasurement,
        public Value: number
    ) {}
}
