// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {ProviderRegistry} from "../src/ProviderRegistry.sol";
import {ClaimsRegistry} from "../src/ClaimsRegistry.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        console.log("Deploying contracts with account:", deployer);
        console.log("Account balance:", deployer.balance);

        vm.startBroadcast(deployerPrivateKey);

        // Deploy ProviderRegistry
        ProviderRegistry providerRegistry = new ProviderRegistry();
        console.log("ProviderRegistry deployed at:", address(providerRegistry));

        // Deploy ClaimsRegistry
        ClaimsRegistry claimsRegistry = new ClaimsRegistry(address(providerRegistry));
        console.log("ClaimsRegistry deployed at:", address(claimsRegistry));

        // Grant VERIFIER_ROLE to ClaimsRegistry so it can update provider stats
        providerRegistry.grantRole(providerRegistry.VERIFIER_ROLE(), address(claimsRegistry));
        console.log("Granted VERIFIER_ROLE to ClaimsRegistry");

        vm.stopBroadcast();

        // Log deployment summary
        console.log("\n=== Deployment Summary ===");
        console.log("Network: Sepolia");
        console.log("ProviderRegistry:", address(providerRegistry));
        console.log("ClaimsRegistry:", address(claimsRegistry));
        console.log("Admin:", deployer);
    }
}

contract DeployLocal is Script {
    function run() public {
        // Use Anvil's default test account
        uint256 deployerPrivateKey =
            0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;

        vm.startBroadcast(deployerPrivateKey);

        ProviderRegistry providerRegistry = new ProviderRegistry();
        ClaimsRegistry claimsRegistry = new ClaimsRegistry(address(providerRegistry));

        providerRegistry.grantRole(providerRegistry.VERIFIER_ROLE(), address(claimsRegistry));

        vm.stopBroadcast();

        console.log("ProviderRegistry:", address(providerRegistry));
        console.log("ClaimsRegistry:", address(claimsRegistry));
    }
}
