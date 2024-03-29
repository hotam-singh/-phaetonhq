import * as BigNum from '@phaetonhq/bignum';
import { SignatureObject } from './create_signature_object';
import { TransactionError } from './errors';
import { Status } from './response';
import { Account, TransactionJSON } from './transaction_types';
export interface TransactionResponse {
    readonly id: string;
    readonly status: Status;
    readonly errors: ReadonlyArray<TransactionError>;
}
export interface StateStoreGetter<T> {
    get(key: string): T;
    find(func: (item: T) => boolean): T | undefined;
}
export interface StateStoreDefaultGetter<T> {
    getOrDefault(key: string): T;
}
export interface StateStoreSetter<T> {
    set(key: string, value: T): void;
}
export interface StateStore {
    readonly account: StateStoreGetter<Account> & StateStoreDefaultGetter<Account> & StateStoreSetter<Account>;
    readonly transaction: StateStoreGetter<TransactionJSON>;
}
export interface StateStoreCache<T> {
    cache(filterArray: ReadonlyArray<{
        readonly [key: string]: string;
    }>): Promise<ReadonlyArray<T>>;
}
export interface StateStorePrepare {
    readonly account: StateStoreCache<Account>;
    readonly transaction: StateStoreCache<TransactionJSON>;
}
export declare enum MultisignatureStatus {
    UNKNOWN = 0,
    NONMULTISIGNATURE = 1,
    PENDING = 2,
    READY = 3,
    FAIL = 4
}
export declare const ENTITY_ACCOUNT = "account";
export declare const ENTITY_TRANSACTION = "transaction";
export declare abstract class BaseTransaction {
    readonly amount: BigNum;
    readonly recipientId: string;
    readonly blockId?: string;
    readonly height?: number;
    readonly relays?: number;
    readonly confirmations?: number;
    readonly recipientPublicKey?: string;
    readonly signatures: string[];
    readonly timestamp: number;
    readonly type: number;
    readonly containsUniqueData?: boolean;
    readonly fee: BigNum;
    readonly asset: object;
    receivedAt?: Date;
    static TYPE: number;
    static FEE: string;
    protected _id?: string;
    protected _senderId?: string;
    protected _senderPublicKey?: string;
    protected _signature?: string;
    protected _signSignature?: string;
    protected _multisignatureStatus: MultisignatureStatus;
    protected abstract validateAsset(): ReadonlyArray<TransactionError>;
    protected abstract applyAsset(store: StateStore): ReadonlyArray<TransactionError>;
    protected abstract undoAsset(store: StateStore): ReadonlyArray<TransactionError>;
    protected abstract verifyAgainstTransactions(transactions: ReadonlyArray<TransactionJSON>): ReadonlyArray<TransactionError>;
    protected abstract assetFromSync(raw: any): object | undefined;
    constructor(rawTransaction: unknown);
    readonly id: string;
    readonly senderId: string;
    readonly senderPublicKey: string;
    readonly signature: string;
    readonly signSignature: string | undefined;
    toJSON(): TransactionJSON;
    stringify(): string;
    isReady(): boolean;
    getBytes(): Buffer;
    validate(): TransactionResponse;
    validateFee(): TransactionError | undefined;
    verifyAgainstOtherTransactions(transactions: ReadonlyArray<TransactionJSON>): TransactionResponse;
    apply(store: StateStore): TransactionResponse;
    undo(store: StateStore): TransactionResponse;
    prepare(store: StateStorePrepare): Promise<void>;
    addMultisignature(store: StateStore, signatureObject: SignatureObject): TransactionResponse;
    addVerifiedMultisignature(signature: string): TransactionResponse;
    processMultisignatures(store: StateStore): TransactionResponse;
    isExpired(date?: Date): boolean;
    sign(passphrase: string, secondPassphrase?: string): void;
    fromSync(raw: any): TransactionJSON | null;
    protected getBasicBytes(): Buffer;
    assetToJSON(): object;
    protected assetToBytes(): Buffer;
    private _verify;
    private _validateSchema;
}
