"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = exports.InputValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.InputValidation = zod_1.default.object({
    username: zod_1.default.string().max(10),
    password: zod_1.default.string().max(10)
});
exports.x = 4;
