import { createPublicClient, createWalletClient, http } from 'viem';
import { hardhat } from 'viem/chains';

export const publicClient = createPublicClient({
  chain: hardhat,
  transport: http('http://127.0.0.1:8545'),
});

export const walletClient = createWalletClient({
  chain: hardhat,
  transport: http('http://127.0.0.1:8545'),
});
