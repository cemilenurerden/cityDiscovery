// domain/common/Result.ts
// Result type pattern for error handling

export type Result<T> = Success<T> | Failure;

export class Success<T> {
  readonly value: T;
  readonly isSuccess = true;
  readonly isFailure = false;

  constructor(value: T) {
    this.value = value;
  }
}

export class Failure {
  readonly error: AppError;
  readonly isSuccess = false;
  readonly isFailure = true;

  constructor(error: AppError) {
    this.error = error;
  }
}

export class AppError {
  constructor(
    public readonly message: string,
    public readonly type: ErrorType,
    public readonly code?: string
  ) {}
}

export enum ErrorType {
  NetworkFailure = 'NetworkFailure',
  AuthFailure = 'AuthFailure',
  ValidationFailure = 'ValidationFailure',
  NotFoundFailure = 'NotFoundFailure',
  UnknownFailure = 'UnknownFailure',
}

// Helper functions
export const success = <T>(value: T): Result<T> => new Success(value);
export const failure = (error: AppError): Failure => new Failure(error);
