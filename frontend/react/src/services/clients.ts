import { createPublicClient, http, type PublicClient } from "viem";
import { localhost, sepolia } from "viem/chains";

export const pubClient = createPublicClient({
  chain: sepolia,
  transport: http("https://eth-sepolia.g.alchemy.com/v2/WwmyBWYYAuWLTHY0KykCb"),
});
