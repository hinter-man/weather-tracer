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
    new ErrorMessage('postcode', 'required', 'Post Code must not be empty.')
];