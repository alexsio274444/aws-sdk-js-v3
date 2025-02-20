// smithy-typescript generated code
import { EndpointParameterInstructions, getEndpointPlugin } from "@aws-sdk/middleware-endpoint";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
import {
  FinalizeHandlerArguments,
  Handler,
  HandlerExecutionContext,
  HttpHandlerOptions as __HttpHandlerOptions,
  MetadataBearer as __MetadataBearer,
  MiddlewareStack,
} from "@aws-sdk/types";
import { HttpRequest as __HttpRequest, HttpResponse as __HttpResponse } from "@smithy/protocol-http";
import { SerdeContext as __SerdeContext } from "@smithy/types";

import { LexModelsV2ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../LexModelsV2Client";
import { DescribeTestSetDiscrepancyReportRequest, DescribeTestSetDiscrepancyReportResponse } from "../models/models_0";
import {
  de_DescribeTestSetDiscrepancyReportCommand,
  se_DescribeTestSetDiscrepancyReportCommand,
} from "../protocols/Aws_restJson1";

/**
 * @public
 */
export { __MetadataBearer, $Command };
/**
 * @public
 *
 * The input for {@link DescribeTestSetDiscrepancyReportCommand}.
 */
export interface DescribeTestSetDiscrepancyReportCommandInput extends DescribeTestSetDiscrepancyReportRequest {}
/**
 * @public
 *
 * The output of {@link DescribeTestSetDiscrepancyReportCommand}.
 */
export interface DescribeTestSetDiscrepancyReportCommandOutput
  extends DescribeTestSetDiscrepancyReportResponse,
    __MetadataBearer {}

/**
 * @public
 * <p>Gets metadata information about the test set discrepancy report.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { LexModelsV2Client, DescribeTestSetDiscrepancyReportCommand } from "@aws-sdk/client-lex-models-v2"; // ES Modules import
 * // const { LexModelsV2Client, DescribeTestSetDiscrepancyReportCommand } = require("@aws-sdk/client-lex-models-v2"); // CommonJS import
 * const client = new LexModelsV2Client(config);
 * const input = { // DescribeTestSetDiscrepancyReportRequest
 *   testSetDiscrepancyReportId: "STRING_VALUE", // required
 * };
 * const command = new DescribeTestSetDiscrepancyReportCommand(input);
 * const response = await client.send(command);
 * // { // DescribeTestSetDiscrepancyReportResponse
 * //   testSetDiscrepancyReportId: "STRING_VALUE",
 * //   testSetId: "STRING_VALUE",
 * //   creationDateTime: new Date("TIMESTAMP"),
 * //   target: { // TestSetDiscrepancyReportResourceTarget
 * //     botAliasTarget: { // TestSetDiscrepancyReportBotAliasTarget
 * //       botId: "STRING_VALUE", // required
 * //       botAliasId: "STRING_VALUE", // required
 * //       localeId: "STRING_VALUE", // required
 * //     },
 * //   },
 * //   testSetDiscrepancyReportStatus: "InProgress" || "Completed" || "Failed",
 * //   lastUpdatedDataTime: new Date("TIMESTAMP"),
 * //   testSetDiscrepancyTopErrors: { // TestSetDiscrepancyErrors
 * //     intentDiscrepancies: [ // TestSetIntentDiscrepancyList // required
 * //       { // TestSetIntentDiscrepancyItem
 * //         intentName: "STRING_VALUE", // required
 * //         errorMessage: "STRING_VALUE", // required
 * //       },
 * //     ],
 * //     slotDiscrepancies: [ // TestSetSlotDiscrepancyList // required
 * //       { // TestSetSlotDiscrepancyItem
 * //         intentName: "STRING_VALUE", // required
 * //         slotName: "STRING_VALUE", // required
 * //         errorMessage: "STRING_VALUE", // required
 * //       },
 * //     ],
 * //   },
 * //   testSetDiscrepancyRawOutputUrl: "STRING_VALUE",
 * //   failureReasons: [ // FailureReasons
 * //     "STRING_VALUE",
 * //   ],
 * // };
 *
 * ```
 *
 * @param DescribeTestSetDiscrepancyReportCommandInput - {@link DescribeTestSetDiscrepancyReportCommandInput}
 * @returns {@link DescribeTestSetDiscrepancyReportCommandOutput}
 * @see {@link DescribeTestSetDiscrepancyReportCommandInput} for command's `input` shape.
 * @see {@link DescribeTestSetDiscrepancyReportCommandOutput} for command's `response` shape.
 * @see {@link LexModelsV2ClientResolvedConfig | config} for LexModelsV2Client's `config` shape.
 *
 * @throws {@link InternalServerException} (server fault)
 *  <p>The service encountered an unexpected condition. Try your request
 *          again.</p>
 *
 * @throws {@link ResourceNotFoundException} (client fault)
 *  <p>You asked to describe a resource that doesn't exist. Check the
 *          resource that you are requesting and try again.</p>
 *
 * @throws {@link ServiceQuotaExceededException} (client fault)
 *  <p>You have reached a quota for your bot. </p>
 *
 * @throws {@link ThrottlingException} (client fault)
 *  <p>Your request rate is too high. Reduce the frequency of
 *          requests.</p>
 *
 * @throws {@link ValidationException} (client fault)
 *  <p>One of the input parameters in your request isn't valid. Check the
 *          parameters and try your request again.</p>
 *
 * @throws {@link LexModelsV2ServiceException}
 * <p>Base exception class for all service exceptions from LexModelsV2 service.</p>
 *
 */
export class DescribeTestSetDiscrepancyReportCommand extends $Command<
  DescribeTestSetDiscrepancyReportCommandInput,
  DescribeTestSetDiscrepancyReportCommandOutput,
  LexModelsV2ClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  public static getEndpointParameterInstructions(): EndpointParameterInstructions {
    return {
      UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
      Endpoint: { type: "builtInParams", name: "endpoint" },
      Region: { type: "builtInParams", name: "region" },
      UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" },
    };
  }

  /**
   * @public
   */
  constructor(readonly input: DescribeTestSetDiscrepancyReportCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: LexModelsV2ClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<DescribeTestSetDiscrepancyReportCommandInput, DescribeTestSetDiscrepancyReportCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
    this.middlewareStack.use(
      getEndpointPlugin(configuration, DescribeTestSetDiscrepancyReportCommand.getEndpointParameterInstructions())
    );

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "LexModelsV2Client";
    const commandName = "DescribeTestSetDiscrepancyReportCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: (_: any) => _,
      outputFilterSensitiveLog: (_: any) => _,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  /**
   * @internal
   */
  private serialize(
    input: DescribeTestSetDiscrepancyReportCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return se_DescribeTestSetDiscrepancyReportCommand(input, context);
  }

  /**
   * @internal
   */
  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<DescribeTestSetDiscrepancyReportCommandOutput> {
    return de_DescribeTestSetDiscrepancyReportCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
