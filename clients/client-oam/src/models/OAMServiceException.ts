// smithy-typescript generated code
import {
  ServiceException as __ServiceException,
  ServiceExceptionOptions as __ServiceExceptionOptions,
} from "@aws-sdk/smithy-client";

export { __ServiceException, __ServiceExceptionOptions };

/**
 * @public
 *
 * Base exception class for all service exceptions from OAM service.
 */
export class OAMServiceException extends __ServiceException {
  /**
   * @internal
   */
  constructor(options: __ServiceExceptionOptions) {
    super(options);
    Object.setPrototypeOf(this, OAMServiceException.prototype);
  }
}
