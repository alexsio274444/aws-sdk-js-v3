// smithy-typescript generated code
import { Paginator } from "@aws-sdk/types";

import {
  SearchGameSessionsCommand,
  SearchGameSessionsCommandInput,
  SearchGameSessionsCommandOutput,
} from "../commands/SearchGameSessionsCommand";
import { GameLiftClient } from "../GameLiftClient";
import { GameLiftPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: GameLiftClient,
  input: SearchGameSessionsCommandInput,
  ...args: any
): Promise<SearchGameSessionsCommandOutput> => {
  // @ts-ignore
  return await client.send(new SearchGameSessionsCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateSearchGameSessions(
  config: GameLiftPaginationConfiguration,
  input: SearchGameSessionsCommandInput,
  ...additionalArguments: any
): Paginator<SearchGameSessionsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: SearchGameSessionsCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["Limit"] = config.pageSize;
    if (config.client instanceof GameLiftClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected GameLift | GameLiftClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
