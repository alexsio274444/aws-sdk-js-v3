import { Decoder, Encoder, EventStreamPayloadHandlerProvider, MessageSigner, Provider } from "@aws-sdk/types";

import { EventStreamPayloadHandler } from "./EventStreamPayloadHandler";

/** NodeJS event stream utils provider */
export const eventStreamPayloadHandlerProvider: EventStreamPayloadHandlerProvider = (options: {
  utf8Encoder: Encoder;
  utf8Decoder: Decoder;
  messageSigner: Provider<MessageSigner>;
}) => new EventStreamPayloadHandler(options);
