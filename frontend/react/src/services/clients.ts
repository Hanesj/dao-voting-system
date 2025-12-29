import { createPublicClient, http, type PublicClient } from "viem";
import { localhost } from "viem/chains";

export const pubClient = createPublicClient({
  chain: localhost,
  transport: http("https://eth-sepolia.g.alchemy.com/v2/WwmyBWYYAuWLTHY0KykCb"),
});
