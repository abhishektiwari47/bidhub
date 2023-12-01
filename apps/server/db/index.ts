import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bidSchema = new mongoose.Schema({
    amount: Number,
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  });

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    balance: {type:Number,required:true},
    fullName:String,
    hostelName:String,
    hostelRoom:String,
    imageLink:String,
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
    sellPrice:Number||undefined,
    sellerId: String,
    buyerId: String,
    bids:[bidSchema||null]
});
const querySchema = new mongoose.Schema({
  userId:String,
  query:String,
  reply:String||undefined
})


export const User = mongoose.model('User', userSchema);
export const Product = mongoose.model('Product', productSchema);
export const Query = mongoose.model('Query',querySchema);
