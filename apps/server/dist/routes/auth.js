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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware/");
const index_1 = require("../constants/index");
const db_1 = require("../db");
const router = express_1.default.Router();
const validation_1 = require("validation");
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parseResponse = validation_1.InputValidation.safeParse(req.body);
    if (!parseResponse.success) {
        return res.status(411).json({
            msg: "err"
        });
    }
    const { username, password, hostelName, hostelRoom, fullName, imageLink } = req.body;
    const user = yield db_1.User.findOne({ username: username });
    if (user) {
        res.status(403).json({ message: 'User already exists' });
    }
    else {
        const newUser = new db_1.User({ username: username, password: password, productId: [], hostelName, hostelRoom, fullName, balance: 100, imageLink });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, index_1.SECRET, { expiresIn: '24h' });
        res.json({ message: 'User created successfully', token });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parseResponse = validation_1.InputValidation.safeParse(req.body);
    if (!parseResponse.success) {
        return res.status(411).json({
            msg: "err"
        });
    }
    const { username, password } = req.body;
    const user = yield db_1.User.findOne({ username, password });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ id: user._id }, index_1.SECRET, { expiresIn: '9h' });
        res.json({ message: 'Logged in successfully', token });
    }
    else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
}));
router.get('/me', middleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["userId"];
    const user = yield db_1.User.findOne({ _id: userId });
    if (user) {
        res.json({ userId: userId, username: user.username, fullName: user.fullName, hostelName: user.hostelName, hostelRoom: user.hostelRoom, balance: user.balance, productId: user.productId, imageLink: user.imageLink });
    }
    else {
        res.status(403).json({ message: 'User not logged in' });
    }
}));
router.get('/getSeller/:sellerId', middleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sellerId } = req.params;
    console.log("this is seller id");
    console.log(sellerId);
    const seller = yield db_1.User.findOne({ _id: sellerId });
    if (seller) {
        res.json({ userId: sellerId, username: seller.username, fullName: seller.fullName, hostelName: seller.hostelName, hostelRoom: seller.hostelRoom, balance: seller.balance, productId: seller.productId, imageLink: seller.imageLink });
    }
    else {
        res.status(403).json({ message: 'User not logged in' });
    }
}));
exports.default = router;
