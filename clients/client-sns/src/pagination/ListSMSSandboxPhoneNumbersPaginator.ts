// smithy-typescript generated code
import { Paginator } from "@aws-sdk/types";

import {
  ListSMSSandboxPhoneNumbersCommand,
  ListSMSSandboxPhoneNumbersCommandInput,
  ListSMSSandboxPhoneNumbersCommandOutput,
} from "../commands/ListSMSSandboxPhoneNumbersCommand";
import { SNSClient } from "../SNSClient";
import { SNSPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: SNSClient,
  input: ListSMSSandboxPhoneNumbersCommandInput,
  ...args: any
): Promise<ListSMSSandboxPhoneNumbersCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListSMSSandboxPhoneNumbersCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateListSMSSandboxPhoneNumbers(
  config: SNSPaginationConfiguration,
  input: ListSMSSandboxPhoneNumbersCommandInput,
  ...additionalArguments: any
): Paginator<ListSMSSandboxPhoneNumbersCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListSMSSandboxPhoneNumbersCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof SNSClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected SNS | SNSClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
