"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cryptography = require("@phaetonhq/phaeton-cryptography");
const errors_1 = require("../errors");
const get_transaction_bytes_1 = require("./get_transaction_bytes");
exports.getId = (transactionBytes) => {
    const transactionHash = cryptography.hash(transactionBytes);
    const bufferFromFirstEntriesReversed = cryptography.getFirstEightBytesReversed(transactionHash);
    const transactionId = cryptography.bufferToIntAsString(bufferFromFirstEntriesReversed);
    return transactionId;
};
exports.validateTransactionId = (id, bytes) => {
    const expectedId = exports.getId(bytes);
    return id !== expectedId
        ? new errors_1.TransactionError(`Invalid transaction id`, id, '.id', id, expectedId)
        : undefined;
};
exports.getTransactionId = (transaction) => {
    const transactionBytes = get_transaction_bytes_1.getTransactionBytes(transaction);
    const transactionHash = cryptography.hash(transactionBytes);
    const bufferFromFirstEntriesReversed = cryptography.getFirstEightBytesReversed(transactionHash);
    const firstEntriesToNumber = cryptography.bufferToIntAsString(bufferFromFirstEntriesReversed);
    return firstEntriesToNumber;
};
//# sourceMappingURL=transaction_id.js.map
