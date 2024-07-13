import '../styles/App.css'
import AppRouter from "./AppRouter.tsx";
import {createConfig, http, WagmiProvider} from "wagmi";
import {celo, celoAlfajores} from "@wagmi/chains";
import {rootstockTestnet, zircuitTestnet} from "@wagmi/core/chains";
import {connectorsForWallets, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {injectedWallet} from "@rainbow-me/rainbowkit/wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const connectors = connectorsForWallets(
    [
      {
        groupName: "Recommended",
        wallets: [injectedWallet],
      },
    ],
    {
      appName: "Celo Composer",
      projectId: "044601f65212332475a09bc14ceb3c34",
    }
);

const config = createConfig({
  connectors,
  chains: [celo, celoAlfajores, rootstockTestnet, zircuitTestnet],
  transports: {
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
    [rootstockTestnet.id]: http(),
    [zircuitTestnet.id]: http(),
  },
});

const queryClient = new QueryClient();

function App() {

  return (
      <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
              <RainbowKitProvider>
                <AppRouter />
              </RainbowKitProvider>
          </QueryClientProvider>
      </WagmiProvider>
  )
}

export default App
