"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cryptography = require("@phaetonhq/phaeton-cryptography");
const utils_1 = require("./utils");
exports.createSignatureObject = (transaction, passphrase) => {
    if (!utils_1.verifyTransaction(transaction)) {
        throw new Error('Invalid transaction.');
    }
    if (!transaction.id) {
        throw new Error('Transaction ID is required to create a signature object.');
    }
    const { publicKey } = cryptography.getPrivateAndPublicKeyFromPassphrase(passphrase);
    return {
        transactionId: transaction.id,
        publicKey,
        signature: utils_1.multiSignTransaction(transaction, passphrase),
    };
};
//# sourceMappingURL=create_signature_object.js.map
