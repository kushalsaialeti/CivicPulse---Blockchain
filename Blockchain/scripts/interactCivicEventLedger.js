import hre from "hardhat";
import { keccak256, stringToHex } from "viem";

async function main() {
  const publicClient = await hre.viem.getPublicClient();
  const walletClient = await hre.viem.getWalletClient();

  const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

  const contract = await hre.viem.getContractAt(
    "CivicEventLedger",
    contractAddress,
    { walletClient, publicClient }
  );

  // 1️⃣ Create a civic event
  const tx = await contract.write.createEvent([
    "Complaint",
    keccak256(
      stringToHex("Pothole near main road")
    ),
  ]);

  console.log("Event created. Tx hash:", tx);

  // 2️⃣ Read event back
  const event = await contract.read.getEvent([1]);

  console.log("Fetched Event:");
  console.log(event);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
