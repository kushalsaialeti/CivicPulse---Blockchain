import hre from "hardhat";
import { keccak256, stringToHex } from "viem";

async function main() {
  const publicClient = await hre.viem.getPublicClient();
  const walletClient = await hre.viem.getWalletClient();

  // 1️⃣ Deploy
  const contract = await hre.viem.deployContract(
    "CivicEventLedger",
    [],
    { walletClient }
  );

  console.log("Contract deployed at:", contract.address);

  // 2️⃣ Create event
  const tx = await contract.write.createEvent([
    "Complaint",
    keccak256(stringToHex("Pothole near main road")),
  ]);

  console.log("Event created. Tx hash:", tx);

  // 3️⃣ Read event
  const event = await contract.read.getEvent([1]);

  console.log("Fetched Event:");
  console.log(event);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
