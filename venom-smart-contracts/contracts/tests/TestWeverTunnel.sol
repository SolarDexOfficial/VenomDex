pragma ton-solidity >= 0.62.0;

pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "ton-wton/everscale/contracts/Tunnel.sol";


contract TestWeverTunnel is Tunnels {
    constructor(
        address[] sources,
        address[] destinations,
        address owner_
    ) Tunnels(sources, destinations, owner_) public {}
}
