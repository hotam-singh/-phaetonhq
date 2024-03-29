import * as BigNum from '@phaetonhq/bignum';
import { transfer } from './0_transfer';
import { TransferTransaction } from './0_transfer_transaction';
import { registerSecondPassphrase } from './1_register_second_passphrase';
import { SecondSignatureTransaction } from './1_second_signature_transaction';
import { DelegateTransaction } from './2_delegate_transaction';
import { registerDelegate } from './2_register_delegate';
import { castVotes } from './3_cast_votes';
import { VoteTransaction } from './3_vote_transaction';
import { MultisignatureTransaction } from './4_multisignature_transaction';
import { registerMultisignature } from './4_register_multisignature_account';
import { createDapp } from './5_create_dapp';
import { DappTransaction } from './5_dapp_transaction';
import { BaseTransaction, StateStore, StateStorePrepare } from './base_transaction';
import * as constants from './constants';
import { createSignatureObject } from './create_signature_object';
import { convertToAssetError, TransactionError } from './errors';
import { Status, TransactionResponse } from './response';
import { TransactionJSON } from './transaction_types';
import { transactionInterface } from './utils';
declare const exposedUtils: {
    BigNum: typeof BigNum;
    convertBeddowsToPHA: (beddowsAmount?: string | undefined) => string;
    convertPHAToBeddows: (lskAmount?: string | undefined) => string;
    isValidInteger: (num: unknown) => boolean;
    multiSignTransaction: (transaction: TransactionJSON, passphrase: string) => string;
    prependMinusToPublicKeys: (publicKeys: ReadonlyArray<string>) => ReadonlyArray<string>;
    prependPlusToPublicKeys: (publicKeys: ReadonlyArray<string>) => ReadonlyArray<string>;
    stringEndsWith: (target: string, suffixes: ReadonlyArray<string>) => boolean;
    validator: import("ajv").Ajv;
    validateAddress: (address: string) => boolean;
    validateKeysgroup: (keysgroup: ReadonlyArray<string>) => boolean;
    validatePublicKey: (publicKey: string) => boolean;
    validatePublicKeys: (publicKeys: ReadonlyArray<string>) => boolean;
    verifyAmountBalance: (id: string, account: import("./transaction_types").Account, amount: BigNum, fee: BigNum) => TransactionError | undefined;
    validateNonTransferAmount: (data: string) => boolean;
    validateTransferAmount: (data: string) => boolean;
    signTransaction: (transaction: TransactionJSON, passphrase: string) => string;
    getTransactionBytes: (transaction: TransactionJSON) => Buffer;
    getTransactionId: (transaction: TransactionJSON) => string;
    verifyTransaction: (transaction: TransactionJSON, secondPublicKey?: string | undefined) => boolean;
    checkPublicKeysForDuplicates: (publicKeys: ReadonlyArray<string>) => boolean;
    getTransactionHash: (transaction: TransactionJSON) => Buffer;
    prepareTransaction: (partialTransaction: Partial<TransactionJSON>, passphrase?: string | undefined, secondPassphrase?: string | undefined, timeOffset?: number | undefined) => TransactionJSON;
    signRawTransaction: ({ transaction, passphrase, secondPassphrase, timeOffset, }: import("./utils").SignRawTransactionInput) => TransactionJSON;
    validateFee: (data: string) => boolean;
    validateTransaction: (tx: TransactionJSON) => import("./utils/validation/validate_transaction").ValidationResult;
};
export { BaseTransaction, StateStore, StateStorePrepare, TransferTransaction, transfer, SecondSignatureTransaction, registerSecondPassphrase, DelegateTransaction, registerDelegate, VoteTransaction, castVotes, MultisignatureTransaction, registerMultisignature, DappTransaction, createDapp, createSignatureObject, Status, TransactionResponse, TransactionJSON, TransactionError, transactionInterface, convertToAssetError, constants, exposedUtils as utils, };
