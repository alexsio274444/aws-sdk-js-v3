// smithy-typescript generated code
import { Paginator } from "@aws-sdk/types";

import { CognitoIdentityProviderClient } from "../CognitoIdentityProviderClient";
import {
  ListUserPoolsCommand,
  ListUserPoolsCommandInput,
  ListUserPoolsCommandOutput,
} from "../commands/ListUserPoolsCommand";
import { CognitoIdentityProviderPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: CognitoIdentityProviderClient,
  input: ListUserPoolsCommandInput,
  ...args: any
): Promise<ListUserPoolsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListUserPoolsCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateListUserPools(
  config: CognitoIdentityProviderPaginationConfiguration,
  input: ListUserPoolsCommandInput,
  ...additionalArguments: any
): Paginator<ListUserPoolsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListUserPoolsCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof CognitoIdentityProviderClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected CognitoIdentityProvider | CognitoIdentityProviderClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
