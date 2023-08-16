import { DisplayError, FieldError } from './display-error';

export class InputError extends Error implements DisplayError {
  statusCode: number;

  constructor(public readonly fields: FieldError[]) {
    super('InputError');
    this.name = 'InputError';
    this.statusCode = 400;
    this.message = 'InputError';
  }
}
