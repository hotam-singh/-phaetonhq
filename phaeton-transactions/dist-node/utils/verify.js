"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNum = require("@phaetonhq/bignum");
const base_transaction_1 = require("../base_transaction");
const errors_1 = require("../errors");
const format_1 = require("../utils/format");
const sign_and_validate_1 = require("./sign_and_validate");
exports.verifySenderPublicKey = (id, sender, publicKey) => sender.publicKey && sender.publicKey !== publicKey
    ? new errors_1.TransactionError('Invalid sender publicKey', id, '.senderPublicKey', publicKey, sender.publicKey)
    : undefined;
exports.verifySenderId = (id, sender, address) => sender.address.toUpperCase() !== address.toUpperCase()
    ? new errors_1.TransactionError('Invalid sender address', id, '.senderId', address.toUpperCase(), sender.address.toUpperCase())
    : undefined;
exports.verifyBalance = (id, account, amount) => new BigNum(account.balance).lt(new BigNum(amount))
    ? new errors_1.TransactionError(`Account does not have enough PHA: ${account.address}, balance: ${format_1.convertBeddowsToPHA(account.balance.toString())}`, id, '.balance')
    : undefined;
exports.verifyAmountBalance = (id, account, amount, fee) => {
    const balance = new BigNum(account.balance);
    if (balance.gte(0) && balance.lt(new BigNum(amount))) {
        return new errors_1.TransactionError(`Account does not have enough PHA: ${account.address}, balance: ${format_1.convertBeddowsToPHA(balance.plus(fee).toString())}`, id, '.balance');
    }
    return undefined;
};
exports.verifySecondSignature = (id, sender, signSignature, transactionBytes) => {
    if (!sender.secondPublicKey && signSignature) {
        return new errors_1.TransactionError('Sender does not have a secondPublicKey', id, '.signSignature');
    }
    if (!sender.secondPublicKey) {
        return undefined;
    }
    if (!signSignature) {
        return new errors_1.TransactionError('Missing signSignature', id, '.signSignature');
    }
    const { valid, error } = sign_and_validate_1.validateSignature(sender.secondPublicKey, signSignature, transactionBytes, id);
    if (valid) {
        return undefined;
    }
    return error;
};
const isMultisignatureAccount = (account) => !!(account.membersPublicKeys &&
    account.membersPublicKeys.length > 0 &&
    account.multiMin);
exports.verifyMultiSignatures = (id, sender, signatures, transactionBytes) => {
    if (!isMultisignatureAccount(sender) && signatures.length > 0) {
        return {
            status: base_transaction_1.MultisignatureStatus.FAIL,
            errors: [
                new errors_1.TransactionError('Sender is not a multisignature account', id, '.signatures'),
            ],
        };
    }
    if (!isMultisignatureAccount(sender)) {
        return {
            status: base_transaction_1.MultisignatureStatus.NONMULTISIGNATURE,
            errors: [],
        };
    }
    const { valid, errors } = sign_and_validate_1.validateMultisignatures(sender.membersPublicKeys, signatures, sender.multiMin, transactionBytes, id);
    if (valid) {
        return {
            status: base_transaction_1.MultisignatureStatus.READY,
            errors: [],
        };
    }
    if (errors &&
        errors.length === 1 &&
        errors[0] instanceof errors_1.TransactionPendingError) {
        return {
            status: base_transaction_1.MultisignatureStatus.PENDING,
            errors,
        };
    }
    return {
        status: base_transaction_1.MultisignatureStatus.FAIL,
        errors: errors || [],
    };
};
//# sourceMappingURL=verify.js.map
