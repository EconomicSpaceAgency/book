import onboard from './onboard'

let label

const connect = async () => {return await onboard.connectWallet()}
const disconnect = () => {onboard.disconnectWallet({ label })}

export {connect, disconnect}