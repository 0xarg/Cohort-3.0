import { generateMnemonic, mnemonicToSeedSync } from "bip39";
// import {encode, decode} from 'bs58'
import decode from 'bs58';
import encode from 'bs58';

const mnemonic = generateMnemonic();
console.log("Generated Mnemonic:", mnemonic);
const seed = encode(mnemonicToSeedSync(mnemonic));

console.log(encode());
