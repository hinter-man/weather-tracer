import { TabType } from "../station-measurement/station-measurement.component";

export class Preference {
    constructor(
        public stationId: number,
        public tabType: TabType,
        public typeOfMeasures: Array<number>
    ) {}
}
