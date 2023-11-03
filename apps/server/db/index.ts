import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    balance: {type:Number,required:true},
    fullName:String,
    hostelName:String,
    hostelRoom:String,
    productId: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    originalPrice:Number,
    image:String,
    maxBid:{type:Number,required:true},
    minBid:{type:Number,required:true},
    sold: Boolean,
    sellerId: String,
    buyerId: String
});

export const User = mongoose.model('User', userSchema);
export const Product = mongoose.model('Product', productSchema);
