import Onboard from '@web3-onboard/core'
import injectedModule, { ProviderLabel } from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'
import coinbaseWalletModule from '@web3-onboard/coinbase'
import magicModule from '@web3-onboard/magic'
// import logoSVG from "../../imgs/logo.svg";

const injected = injectedModule({
  // display specific unavailable wallets
  displayUnavailable: false,
  filter: {
    // allow only on non android mobile
    [ProviderLabel.Detected]: ['desktop'],
    [ProviderLabel.Coinbase]: ['desktop']
  }
  // sort: wallets => {
  //   const metaMask = wallets.find(
  //     ({ label }) => label === ProviderLabel.walletConnect
  //   )
  //   return (
  //     [
  //       metaMask,
  //       ...wallets.filter(
  //         ({ label }) =>
  //           label !== ProviderLabel.walletConnect
  //       )
  //     ]
  //       // remove undefined values
  //       .filter(wallet => wallet)
  //   )
  // }

})
const walletConnect = walletConnectModule({projectId: `${import.meta.env.VITE_WALLET_CONNECT_API_KEY}`,   qrcodeModalOptions: {
  mobileLinks: ['rainbow', 'metamask', 'argent', 'trust', 'imtoken', 'pillar', 'coinbase']
}}, )

const coinbaseWallet = coinbaseWalletModule()
const magicWallet = magicModule({apiKey: `${import.meta.env.VITE_MAGIC_AUTH_MODULE_API_KEY}`});

const wallets = [walletConnect, injected, coinbaseWallet, magicWallet]

// technical debt - enviornment variables
const chains = [
  {
    id: 11155111,
    token: 'ETH Sepolia',
    label: 'Sepolia Testnet',
    rpcUrl: `https://eth-sepolia.g.alchemy.com/v2/${import.meta.env.VITE_RPC_URL_SEPOLIA}`
  },
  // {
  //   id: 137,
  //   token: 'MATIC',
  //   label: 'Matic Mainnet',
  //   rpcUrl: `https://polygon-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_RPC_URL_POLYGON}`
  // },
]

const appMetadata = {
  name: 'Economic Space Agency',
  icon: 'https://ecsa-nft.mypinata.cloud/ipfs/QmVpHdfo8sK7f8i696toFhS8ujYBFEMpGPs59hey1vGuV2',
  logo: 'https://ecsa-nft.mypinata.cloud/ipfs/QmY4J21VH43hinqznakNWV3jcmH8HBST6bW2gyWWBD3BUt',
  description: 'Protocols for Postcapitalist Expression',
  recommendedInjectedWallets: [
    { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
    { name: 'MetaMask', url: 'https://metamask.io' }
  ]
}
let onboard

if (!onboard) {
  onboard = Onboard({
    wallets,
    chains,
    appMetadata
  })
}

export default onboard