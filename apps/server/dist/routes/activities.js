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
const index_1 = require("../middleware/index");
const db_1 = require("../db");
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.default.Router();
router.post('/addProduct', index_1.authenticateJwt, (req, res) => {
    const { name, description, originalPrice, image, maxBid, minBid, } = req.body;
    const sold = false;
    const sellerId = req.headers["userId"];
    const buyerId = "";
    const newProduct = new db_1.Product({
        name,
        description,
        originalPrice,
        image,
        maxBid,
        minBid,
        sold,
        sellerId,
        buyerId
    });
    newProduct.save()
        .then((savedProduct) => {
        res.status(201).json(savedProduct);
    })
        .catch((err) => {
        res.status(500).json({ error: 'Failed to create a new todo' });
    });
});
router.get('/yourProductsForSell', index_1.authenticateJwt, (req, res) => {
    const userId = req.headers["userId"];
    db_1.Product.find({ sellerId: userId })
        .then((product) => {
        res.json(product);
    })
        .catch((err) => {
        res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});
router.get('/yourBoughtProducts', index_1.authenticateJwt, (req, res) => {
    const userId = req.headers["userId"];
    db_1.User.findById({ _id: userId }).populate("productId").exec()
        .then((user) => {
        if (!user) {
            res.sendStatus(4002);
        }
        else
            res.json({ productId: user.productId });
    })
        .catch((err) => {
        res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});
router.delete('/product/sold/:productId', index_1.authenticateJwt, (req, res) => {
    const { productId } = req.params;
    const userId = req.headers["userId"];
    db_1.Product.deleteOne({ _id: productId, sellerId: userId })
        .then((updatedProduct) => {
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(updatedProduct);
    })
        .catch((err) => {
        res.status(500).json({ error: 'Failed to update todo' });
    });
});
router.get('/getAllProducts', index_1.authenticateJwt, (req, res) => {
    const userId = req.headers["userId"];
    db_1.Product.find()
        .then((products) => {
        if (!products) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(products);
    })
        .catch((err) => {
        res.status(500).json({ error: 'Failed to update todo' });
    });
});
router.put('/buy/:productId', index_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["userId"];
    const productId = req.params.productId;
    try {
        const product = yield db_1.Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        if (product.sold == true) {
            return res.status(404).json({ error: 'Already Sold' });
        }
        const user = yield db_1.User.findById(userId);
        if (!user || userId == undefined) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.balance < product.maxBid) {
            return res.json({ message: "Low Balance" });
        }
        const seller = yield db_1.User.findById(product.sellerId);
        if (!seller) {
            return res.json({ message: "no seller with this userId" });
        }
        if (product.sellerId == userId) {
            return res.json({ message: "You Can't Buy your own product" });
        }
        user.balance = user.balance - product.maxBid;
        const productIdAsObjectId = new mongoose_1.default.Types.ObjectId(productId);
        user.productId.push(productIdAsObjectId);
        product.buyerId = userId.toString();
        product.sold = true;
        console.log(seller.username);
        console.log(seller.balance);
        console.log(product.maxBid);
        let x = seller.balance + product.maxBid;
        seller.balance = x;
        let allBids = product.bids;
        allBids.forEach((element, index, array) => __awaiter(void 0, void 0, void 0, function* () {
            const tempUser = yield db_1.User.findById(element.userId);
            if (tempUser && element.amount != undefined) {
                tempUser.balance = tempUser.balance + element.amount;
                yield tempUser.save();
            }
        }));
        product.bids = new mongoose_1.default.Types.DocumentArray([]);
        // const user = await User.findOneAndUpdate(
        //   { _id: userId },
        //   { $push: { productId: productId } },
        //   { new: true }
        // );
        yield product.save();
        yield user.save();
        yield seller.save();
        res.json({ message: "Done" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update user or product' });
    }
}));
exports.default = router;
