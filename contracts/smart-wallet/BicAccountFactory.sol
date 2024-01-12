// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/utils/Create2.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

// Corres
import "./core/BaseAccountFactory.sol";
// Interfaces
import "./interfaces/IEntryPoint.sol";
import "./BicAccount.sol";

contract BicAccountFactory {
    event AccountCreated(address addr);

    BicAccount public immutable accountImplementation;


    constructor(
        IEntryPoint _entryPoint
    ) {
        // Create first simpple account implementation
        accountImplementation = new BicAccount(_entryPoint);
    }

    /**
     * create an account, and return its address.
     * returns the address even if the account is already deployed.
     * Note that during UserOperation execution, this method is called only if the account is not deployed.
     * This method returns an existing account address so that entryPoint.getSenderAddress() would work even after account creation
     */
    function createAccount(
        address owner,
        uint256 salt
    ) public returns (BicAccount ret) {
        address addr = computeAddress(owner, salt);
        uint codeSize = addr.code.length;
        if (codeSize > 0) {
            return BicAccount(payable(addr));
        }
        ret = BicAccount(
            payable(
                new ERC1967Proxy{salt: bytes32(salt)}(
                    address(accountImplementation),
                    abi.encodeCall(BicAccount.initialize, owner)
                )
            )
        );
        
        if(addr != address(ret)) {
            revert();
        }
        emit AccountCreated(address(ret));
    }

    /**
     * calculate the counterfactual address of this account as it would be returned by createAccount()
     */
    function computeAddress(
        address owner,
        uint256 salt
    ) public view returns (address) {
        return
            Create2.computeAddress(
                bytes32(salt),
                keccak256(
                    abi.encodePacked(
                        type(ERC1967Proxy).creationCode,
                        abi.encode(
                            address(accountImplementation),
                            abi.encodeCall(BicAccount.initialize, owner)
                        )
                    )
                )
            );
    }
}
