import * as BigNum from '@phaetonhq/bignum';
import { gte as isVersionGte, gtr as isGreaterThanVersionInRange, ltr as isLessThanVersionInRange } from 'semver';
export declare const isNullCharacterIncluded: (input: string) => boolean;
export declare const isUsername: (username: string) => boolean;
export declare const isSignature: (signature: string) => boolean;
export declare const isGreaterThanZero: (amount: BigNum) => boolean;
export declare const isGreaterThanMaxTransactionAmount: (amount: BigNum) => boolean;
export declare const isGreaterThanMaxTransactionId: (id: BigNum) => boolean;
export declare const isNumberString: (num: string) => boolean;
export declare const isValidInteger: (num: unknown) => boolean;
export declare const hasNoDuplicate: (values: ReadonlyArray<string>) => boolean;
export declare const isStringBufferLessThan: (data: unknown, max: number) => boolean;
export declare const isHexString: (data: unknown) => boolean;
export declare const isEncryptedPassphrase: (data: string) => boolean;
export declare const isSemVer: (version: string) => boolean;
export declare const isRangedSemVer: (version: string) => boolean;
export declare const isLessThanRangedVersion: typeof isLessThanVersionInRange;
export declare const isGreaterThanRangedVersion: typeof isGreaterThanVersionInRange;
export declare const isProtocolString: (data: string) => boolean;
export declare const isIPV4: (data: string) => boolean;
export declare const isIPV6: (data: string) => boolean;
export declare const isIP: (data: string) => boolean;
export declare const isPort: (port: string) => boolean;
export declare const validatePublicKeysForDuplicates: (publicKeys: ReadonlyArray<string>) => boolean;
export declare const isStringEndsWith: (target: string, suffixes: ReadonlyArray<string>) => boolean;
export declare const isVersionMatch: typeof isVersionGte;
export declare const validatePublicKey: (publicKey: string) => boolean;
export declare const validatePublicKeys: (publicKeys: ReadonlyArray<string>) => boolean;
export declare const validateKeysgroup: (keysgroup: ReadonlyArray<string>, min: number, max: number) => boolean;
export declare const validateAddress: (address: string) => boolean;
export declare const validateNonTransferAmount: (data: string) => boolean;
export declare const validateTransferAmount: (data: string) => boolean;
export declare const validateFee: (data: string) => boolean;
export declare const isCsv: (data: string) => boolean;