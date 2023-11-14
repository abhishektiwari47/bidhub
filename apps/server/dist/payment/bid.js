"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const router = express_1.default.Router();
const db_1 = require("../db");
const mongoose_1 = __importDefault(require("mongoose"));
router.put('/addBid/:productId', middleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["userId"];
    const { productId } = req.params;
    const product = yield db_1.Product.findById(productId);
    const user = yield db_1.User.findById(userId);
    const amount = req.body.amount;
    if (!userId || !amount) {
        return res.send(400).json({ error: "No userId or amount" });
    }
    if (!product) {
        return res.status(404).json({ error: 'product not found' });
    }
    if (!user) {
        return res.status(404).json({ error: 'user not found' });
    }
    if (userId == product.sellerId) {
        return res.status(400).json({ error: "userId is same as sellerId." });
    }
    if (amount > product.maxBid || amount < product.minBid) {
        return res.json({ error: "Amount should be not less than minBid or greater than maxBid" });
    }
    else if (amount === product.maxBid) {
        return res.json({ message: "You can not bid at Maximum biding pricing. Would you like to buy it?" });
    }
    const productWhereThisUserHasBid = yield db_1.Product.findOne({
        _id: productId,
        'bids.userId': userId, // Match the bid by the specific user
    });
    if (productWhereThisUserHasBid) {
        const bidIndex = productWhereThisUserHasBid.bids.findIndex((bid) => { var _a; return ((_a = bid === null || bid === void 0 ? void 0 : bid.userId) === null || _a === void 0 ? void 0 : _a.toString()) === userId; });
        console.log(productWhereThisUserHasBid.bids);
        console.log(userId);
        if (bidIndex !== -1) {
            productWhereThisUserHasBid.bids[bidIndex].amount = amount;
            yield productWhereThisUserHasBid.save();
            return res.json(productWhereThisUserHasBid);
        }
        else {
            return res.json("Bid not found for this user.");
        }
    }
    const bid = {
        userId: new mongoose_1.default.Types.ObjectId(userId.toString()),
        amount: amount
    };
    user.balance = Number(user.balance) - Number(amount);
    user.save();
    product.bids.push(bid);
    product.save();
    return res.status(200).json(product);
}));
router.get('/allYourBids', middleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["userId"];
    const productWhereThisUserHasBid = yield db_1.Product.find({
        'bids.userId': userId, // Match the bid by the specific user
    });
    if (productWhereThisUserHasBid) {
        return res.json(productWhereThisUserHasBid);
    }
    else {
        return res.json({ message: "No bidding done by You" });
    }
}));
router.delete('/removeBid/:productId', middleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params;
    const userId = req.headers["userId"];
    let amount;
    const productWhereThisUserHasBid = yield db_1.Product.findOne({
        'bids.userId': userId
    });
    if (productWhereThisUserHasBid) {
        const bid = productWhereThisUserHasBid.bids.find(bid => bid.userId == userId);
        if (bid) {
            amount = bid.amount;
            // Now, 'amount' contains the amount of the bid made by the user.
            console.log(amount);
        }
        else {
            console.log("Bid not found for this user");
        }
    }
    else {
        console.log("Product not found");
    }
    let user = yield db_1.User.findById(userId);
    if (productWhereThisUserHasBid && user) {
        user.balance = user.balance + Number(amount);
        yield user.save();
        const bidIndex = productWhereThisUserHasBid.bids.findIndex(bid => bid.userId == userId);
        if (bidIndex !== -1) {
            productWhereThisUserHasBid.bids.splice(bidIndex, 1);
            yield productWhereThisUserHasBid.save();
            return res.json({ message: "Bid removed successfully" });
        }
        else {
            return res.json({ error: "Bid not found for this user" });
        }
    }
    else if (!user) {
        return res.json({ error: "User not found" });
    }
    else if (!productWhereThisUserHasBid) {
        return res.json({ error: "Product not found" });
    }
    else {
        return res.json({ message: "No bidding done by You" });
    }
}));
exports.default = router;
