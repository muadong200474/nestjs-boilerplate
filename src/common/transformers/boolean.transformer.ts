import { TransformFnParams } from 'class-transformer/types/interfaces';

/**
 * Transform string value to boolean (use for multipart/form-data)
 * @param value
 * @returns true if value is one of [true, 'enabled', 'true', 1, '1']
 */
export const booleanTransformer = (params: TransformFnParams): boolean =>
  [true, 'enabled', 'true', 1, '1'].indexOf(params.value) > -1;
