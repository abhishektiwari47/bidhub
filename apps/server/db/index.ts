import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    productId: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    originalPrice:Number,
    image:String,
    maxBid:Number,
    minBid:Number,
    sold: Boolean,
    sellerId: String,
    buyerId: String
});

export const User = mongoose.model('User', userSchema);
export const Product = mongoose.model('Product', productSchema);
