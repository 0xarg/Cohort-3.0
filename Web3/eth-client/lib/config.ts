import { mainnet } from "wagmi/chains";
import { createConfig, http, injected } from "wagmi";

export const config = createConfig({
  connectors: [injected()],
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(
      "https://eth-mainnet.g.alchemy.com/v2/nsie4CkPWDSvgFDKT6Yhg"
    ),
  },
});
