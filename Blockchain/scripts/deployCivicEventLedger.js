import hre from "hardhat";

async function main() {
  const publicClient = await hre.viem.getPublicClient();
  const walletClient = await hre.viem.getWalletClient();

  const civicEventLedger = await hre.viem.deployContract(
    "CivicEventLedger",
    [],
    {
      walletClient,
    }
  );

  console.log("CivicEventLedger deployed to:", civicEventLedger.address);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
