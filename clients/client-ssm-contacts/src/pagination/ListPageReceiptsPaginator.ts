// smithy-typescript generated code
import { Paginator } from "@aws-sdk/types";

import {
  ListPageReceiptsCommand,
  ListPageReceiptsCommandInput,
  ListPageReceiptsCommandOutput,
} from "../commands/ListPageReceiptsCommand";
import { SSMContactsClient } from "../SSMContactsClient";
import { SSMContactsPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: SSMContactsClient,
  input: ListPageReceiptsCommandInput,
  ...args: any
): Promise<ListPageReceiptsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListPageReceiptsCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateListPageReceipts(
  config: SSMContactsPaginationConfiguration,
  input: ListPageReceiptsCommandInput,
  ...additionalArguments: any
): Paginator<ListPageReceiptsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListPageReceiptsCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof SSMContactsClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected SSMContacts | SSMContactsClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
