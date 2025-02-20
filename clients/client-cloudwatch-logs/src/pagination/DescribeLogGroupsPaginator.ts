// smithy-typescript generated code
import { Paginator } from "@aws-sdk/types";

import { CloudWatchLogsClient } from "../CloudWatchLogsClient";
import {
  DescribeLogGroupsCommand,
  DescribeLogGroupsCommandInput,
  DescribeLogGroupsCommandOutput,
} from "../commands/DescribeLogGroupsCommand";
import { CloudWatchLogsPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: CloudWatchLogsClient,
  input: DescribeLogGroupsCommandInput,
  ...args: any
): Promise<DescribeLogGroupsCommandOutput> => {
  // @ts-ignore
  return await client.send(new DescribeLogGroupsCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateDescribeLogGroups(
  config: CloudWatchLogsPaginationConfiguration,
  input: DescribeLogGroupsCommandInput,
  ...additionalArguments: any
): Paginator<DescribeLogGroupsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.nextToken
  let token: typeof input.nextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: DescribeLogGroupsCommandOutput;
  while (hasNext) {
    input.nextToken = token;
    input["limit"] = config.pageSize;
    if (config.client instanceof CloudWatchLogsClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected CloudWatchLogs | CloudWatchLogsClient");
    }
    yield page;
    const prevToken = token;
    token = page.nextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
