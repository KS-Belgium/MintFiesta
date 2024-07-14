export const abi = [
    {
        name: 'mintNFT',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [{ internalType: 'address', name: 'recipient', type: 'address' },
            { internalType: 'string', name: 'tokenURI', type: 'string' }],
        outputs: [],
    },
    {
        name: 'Minted',
        type: 'event',
        inputs: [{ indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' }]
    }
] as const