import { keccak256, stringToHex } from 'viem';

export function hashData(data) {
  return keccak256(stringToHex(JSON.stringify(data)));
}
