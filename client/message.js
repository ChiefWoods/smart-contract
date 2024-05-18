import { Connection, Keypair, PublicKey, Transaction, SystemProgram, sendAndConfirmTransaction, TransactionInstruction } from "@solana/web3.js";
import { readFile } from 'fs/promises';
import * as borsh from 'borsh';

class MessageAccount {
  constructor (fields) {
    if (fields !== undefined) {
      this.message = fields.message;
    }
  }
}

const MessageSchema = new Map([
  [MessageAccount, { kind: 'struct', fields: [['message', 'String']] }]
]);

const fixedAccount = new MessageAccount({ message: '' });
while (fixedAccount.message.length < 280) {
  fixedAccount.message += ' ';
}
const ACCOUNT_SIZE = borsh.serialize(MessageSchema, fixedAccount).length;

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export async function establishPayer() {
  const secretKeyString = await readFile('wallet.json', 'utf8');
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
  return Keypair.fromSecretKey(secretKey);
}

export async function getProgramId() {
  const secretKeyString = await readFile('dist/program/message-keypair.json', 'utf8');
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
  const keypair = Keypair.fromSecretKey(secretKey);
  return keypair.publicKey;
}

export async function getAccountPubkey(payer, programId) {
  return await PublicKey.createWithSeed(payer.publicKey, 'fcc-seed', programId);
}

export async function checkProgram(connection, payer, programId, accountPubkey) {
  const programAccount = await connection.getAccountInfo(programId);

  if (!programAccount) {
    throw Error('Account not found');
  } else if (!programAccount.executable) {
    throw Error('Account not executable');
  }

  const programDataAccount = await connection.getAccountInfo(accountPubkey);

  if (!programDataAccount) {
    await createAccount(connection, payer, programId, accountPubkey);
  }
};

export async function createAccount(connection, payer, programId, accountPubkey) {
  const lamports = await connection.getMinimumBalanceForRentExemption(ACCOUNT_SIZE);
  const transaction = new Transaction(payer);
  const instruction = {
    basePubkey: payer.publicKey,
    fromPubkey: payer.publicKey,
    lamports,
    newAccountPubkey: accountPubkey,
    programId,
    seed: 'fcc-seed',
    space: ACCOUNT_SIZE,
  };
  const tx = SystemProgram.createAccountWithSeed(instruction);
  transaction.add(tx);
  await sendAndConfirmTransaction(connection, transaction, [payer]);
}

export async function changeMessage(connection, payer, programId, accountPubkey, message) {
  const transaction = {
    keys: [{ pubkey: accountPubkey, isSigner: false, isWritable: true }],
    programId,
    data: Buffer.from(message)
  };
  const instruction = new TransactionInstruction(transaction);
  await sendAndConfirmTransaction(connection, new Transaction().add(instruction), [payer]);
}

export async function getMessage(connection, accountPubkey) {
  const accountInfo = await connection.getAccountInfo(accountPubkey);
  const message = borsh.deserialize(MessageSchema, MessageAccount, accountInfo.data);
  return message.message;
}