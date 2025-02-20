import { AwsCredentialIdentity } from "@aws-sdk/types";

/**
 * @internal
 */
export interface ImdsCredentials {
  AccessKeyId: string;
  SecretAccessKey: string;
  Token: string;
  Expiration: string;
}

/**
 * @internal
 */
export const isImdsCredentials = (arg: any): arg is ImdsCredentials =>
  Boolean(arg) &&
  typeof arg === "object" &&
  typeof arg.AccessKeyId === "string" &&
  typeof arg.SecretAccessKey === "string" &&
  typeof arg.Token === "string" &&
  typeof arg.Expiration === "string";

/**
 * @internal
 */
export const fromImdsCredentials = (creds: ImdsCredentials): AwsCredentialIdentity => ({
  accessKeyId: creds.AccessKeyId,
  secretAccessKey: creds.SecretAccessKey,
  sessionToken: creds.Token,
  expiration: new Date(creds.Expiration),
});
