import { HttpRequest } from "@aws-sdk/protocol-http";
import {
  AbsoluteLocation,
  BuildHandler,
  BuildHandlerArguments,
  BuildHandlerOptions,
  BuildHandlerOutput,
  HandlerExecutionContext,
  MetadataBearer,
  Pluggable,
  UserAgentPair,
} from "@aws-sdk/types";
import { getUserAgentPrefix } from "@aws-sdk/util-endpoints";

import { UserAgentResolvedConfig } from "./configurations";
import {
  SPACE,
  UA_ESCAPE_CHAR,
  UA_NAME_ESCAPE_REGEX,
  UA_NAME_SEPARATOR,
  UA_VALUE_ESCAPE_REGEX,
  USER_AGENT,
  X_AMZ_USER_AGENT,
} from "./constants";

/**
 * Build user agent header sections from:
 * 1. runtime-specific default user agent provider;
 * 2. custom user agent from `customUserAgent` client config;
 * 3. handler execution context set by internal SDK components;
 * The built user agent will be set to `x-amz-user-agent` header for ALL the
 * runtimes.
 * Please note that any override to the `user-agent` or `x-amz-user-agent` header
 * in the HTTP request is discouraged. Please use `customUserAgent` client
 * config or middleware setting the `userAgent` context to generate desired user
 * agent.
 */
export const userAgentMiddleware =
  (options: UserAgentResolvedConfig) =>
  <Output extends MetadataBearer>(
    next: BuildHandler<any, any>,
    context: HandlerExecutionContext
  ): BuildHandler<any, any> =>
  async (args: BuildHandlerArguments<any>): Promise<BuildHandlerOutput<Output>> => {
    const { request } = args;
    if (!HttpRequest.isInstance(request)) return next(args);
    const { headers } = request;
    const userAgent = context?.userAgent?.map(escapeUserAgent) || [];
    const defaultUserAgent = (await options.defaultUserAgentProvider()).map(escapeUserAgent);
    const customUserAgent = options?.customUserAgent?.map(escapeUserAgent) || [];
    const prefix = getUserAgentPrefix();

    // Set value to AWS-specific user agent header
    const sdkUserAgentValue = (prefix ? [prefix] : [])
      .concat([...defaultUserAgent, ...userAgent, ...customUserAgent])
      .join(SPACE);

    // Get value to be sent with non-AWS-specific user agent header.
    const normalUAValue = [
      ...defaultUserAgent.filter((section) => section.startsWith("aws-sdk-")),
      ...customUserAgent,
    ].join(SPACE);

    if (options.runtime !== "browser") {
      if (normalUAValue) {
        headers[X_AMZ_USER_AGENT] = headers[X_AMZ_USER_AGENT]
          ? `${headers[USER_AGENT]} ${normalUAValue}`
          : normalUAValue;
      }
      headers[USER_AGENT] = sdkUserAgentValue;
    } else {
      headers[X_AMZ_USER_AGENT] = sdkUserAgentValue;
    }

    return next({
      ...args,
      request,
    });
  };

/**
 * Escape the each pair according to https://tools.ietf.org/html/rfc5234 and join the pair with pattern `name/version`.
 * User agent name may include prefix like `md/`, `api/`, `os/` etc., we should not escape the `/` after the prefix.
 * @private
 */
const escapeUserAgent = (userAgentPair: UserAgentPair): string => {
  const name = userAgentPair[0]
    .split(UA_NAME_SEPARATOR)
    .map((part) => part.replace(UA_NAME_ESCAPE_REGEX, UA_ESCAPE_CHAR))
    .join(UA_NAME_SEPARATOR);
  const version = userAgentPair[1]?.replace(UA_VALUE_ESCAPE_REGEX, UA_ESCAPE_CHAR);

  const prefixSeparatorIndex = name.indexOf(UA_NAME_SEPARATOR);
  const prefix = name.substring(0, prefixSeparatorIndex); // If no prefix, prefix is just ""

  let uaName = name.substring(prefixSeparatorIndex + 1);
  if (prefix === "api") {
    uaName = uaName.toLowerCase();
  }

  return [prefix, uaName, version]
    .filter((item) => item && item.length > 0)
    .reduce((acc, item, index) => {
      switch (index) {
        case 0:
          return item;
        case 1:
          return `${acc}/${item}`;
        default:
          return `${acc}#${item}`;
      }
    }, "") as string;
};

export const getUserAgentMiddlewareOptions: BuildHandlerOptions & AbsoluteLocation = {
  name: "getUserAgentMiddleware",
  step: "build",
  priority: "low",
  tags: ["SET_USER_AGENT", "USER_AGENT"],
  override: true,
};

export const getUserAgentPlugin = (config: UserAgentResolvedConfig): Pluggable<any, any> => ({
  applyToStack: (clientStack) => {
    clientStack.add(userAgentMiddleware(config), getUserAgentMiddlewareOptions);
  },
});
