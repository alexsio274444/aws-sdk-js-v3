// smithy-typescript generated code
import { Paginator } from "@aws-sdk/types";

import { SearchUsersCommand, SearchUsersCommandInput, SearchUsersCommandOutput } from "../commands/SearchUsersCommand";
import { ConnectClient } from "../ConnectClient";
import { ConnectPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: ConnectClient,
  input: SearchUsersCommandInput,
  ...args: any
): Promise<SearchUsersCommandOutput> => {
  // @ts-ignore
  return await client.send(new SearchUsersCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateSearchUsers(
  config: ConnectPaginationConfiguration,
  input: SearchUsersCommandInput,
  ...additionalArguments: any
): Paginator<SearchUsersCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: SearchUsersCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof ConnectClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected Connect | ConnectClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
