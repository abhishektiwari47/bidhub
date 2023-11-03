"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
    balance: { type: Number, required: true },
    fullName: String,
    hostelName: String,
    hostelRoom: String,
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
    sellerId: String,
    buyerId: String
});
exports.User = mongoose_1.default.model('User', userSchema);
exports.Product = mongoose_1.default.model('Product', productSchema);
