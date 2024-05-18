import {
  establishConnection,
  getProgramId,
  establishPayer,
  getAccountPubkey,
  checkProgram,
  changeMessage,
  getMessage
} from "./message.js";

async function main() {
  const args = process.argv.slice(2);

  if (!args.length) {
    throw Error("No message provided");
  }

  const connection = establishConnection();
  console.log("Changing message");
  const programId = await getProgramId();
  const payer = await establishPayer();
  const accountPubkey = await getAccountPubkey(payer, programId);
  await checkProgram(connection, payer, programId, accountPubkey);
  await changeMessage(connection, payer, programId, accountPubkey, args[0]);
  const message = await getMessage(connection, accountPubkey);
  console.log('New message:', message.trim());
}

await main();
