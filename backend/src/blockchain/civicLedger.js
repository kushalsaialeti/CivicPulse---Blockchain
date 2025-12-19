import { publicClient, walletClient } from './client.js';
import abi from './abi.json' assert { type: "json" };

const CONTRACT_ADDRESS = process.env.CIVIC_LEDGER_ADDRESS;

export async function writeEvent(eventType, dataHash) {
  const [account] = await walletClient.getAddresses();

  return walletClient.writeContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: 'createEvent',
    args: [eventType, dataHash],
    account,
  });
}

export async function readEvent(eventId) {
  return publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: 'getEvent',
    args: [eventId],
  });
}
