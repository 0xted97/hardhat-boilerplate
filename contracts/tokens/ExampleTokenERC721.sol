pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ExampleTokenERC721 is ERC721 {
    constructor() ERC721("MyCollectible", "MCO") {
    }
}