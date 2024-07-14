export const abi = [
    {
        name: 'mintNFT',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [{ internalType: 'uint32', name: 'tokenId', type: 'uint32' },
            { internalType: 'string', name: 'uri', type: 'string' }],
        outputs: [],
    }
] as const