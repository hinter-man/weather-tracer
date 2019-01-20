export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}

export const StationErrorMessages = [
  new ErrorMessage('name', 'required', 'Name must not be empty'),
  new ErrorMessage('type', 'maxlength', 'less than 50 characters.'),
  new ErrorMessage('address', 'maxlength', 'less than 100 characters'),
  new ErrorMessage('postcode', 'required', 'Post Code must not be empty.'),
  new ErrorMessage('latitude', 'required', 'Latitude must not be empty.'),
  new ErrorMessage('latitude', 'min', 'Latitude must be in range of -90 and +90.'),
  new ErrorMessage('latitude', 'max', 'Latitude must be in range of -90 and +90.'),
  new ErrorMessage('longitude', 'required', 'Longitude must not be empty.'),
  new ErrorMessage('longitude', 'min', 'Longitude must be in range of -180 and +180.'),
  new ErrorMessage('longitude', 'max', 'Longitude must be in range of -180 and +180.'),
];

export const MeasurementErrorMessages = [
  new ErrorMessage('stationid', 'required', 'Station Id must not be empty'),
  new ErrorMessage('typeofmeasure', 'required', 'Type of Measure must not be empty'),
  new ErrorMessage('value', 'required', 'value must not be empty'),
]