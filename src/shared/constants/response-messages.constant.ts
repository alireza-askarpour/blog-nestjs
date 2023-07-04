export enum ResponseMessages {
  UNAUTHORIZED = 'UNAUTHORIZED',
  BAD_REQUEST = 'BAD_REQUEST',
  CREATED = 'CREATED',
  OK = 'OK',
  SERVER_ERROR = 'SERVER_ERROR',
  INVALID_USERNAME_PASSWORD = 'INVALID_USERNAME_PASSWORD',
  USERNAME_ALREADY_EXISTED = 'USERNAME_ALREADY_EXISTED',
  CATEGORY_ALREADY_EXISTS = 'CATEGORY_ALREADY_EXISTS',
  CATEGORY_NOT_FOUND = 'CATEGORY_NOT_FOUND',
  PARENT_CATEGORY_NOT_EXISTS = 'PARENT_CATEGORY_NOT_EXISTS',
  FAILED_UPDATE_CATEGORY = 'FAILED_UPDATE_CATEGORY',
  FAILED_DELETE_CATEGORY = 'FAILED_DELETE_CATEGORY',
  SLUG_ALREADY_EXIST = 'SLUG_ALREADY_EXIST',
  FAILED_CREATE_POST = 'FAILED_CREATE_POST',
}
