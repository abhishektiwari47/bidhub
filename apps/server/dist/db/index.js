"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = exports.Product = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const bidSchema = new mongoose_1.default.Schema({
    amount: Number,
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User',
    },
});
const userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
    balance: { type: Number, required: true },
    fullName: String,
    hostelName: String,
    hostelRoom: String,
    imageLink: String,
    productId: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});
const productSchema = new mongoose_1.default.Schema({
    name: String,
    description: String,
    originalPrice: Number,
    image: String,
    maxBid: { type: Number, required: true },
    minBid: { type: Number, required: true },
    sold: Boolean,
    sellPrice: Number || undefined,
    sellerId: String,
    buyerId: String,
    bids: [bidSchema || null]
});
const querySchema = new mongoose_1.default.Schema({
    userId: String,
    query: String,
    reply: String || undefined
});
exports.User = mongoose_1.default.model('User', userSchema);
exports.Product = mongoose_1.default.model('Product', productSchema);
exports.Query = mongoose_1.default.model('Query', querySchema);
