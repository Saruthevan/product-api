const mongoose = require('mongoose');
const Counter = require('./counter');

const productSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    type: String,
    price: Number,
    rating: Number,
    warranty_years: Number,
    available: Boolean
});


productSchema.pre('save', async function(next) {
    if (this.isNew) {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'productid' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this._id = counter.seq;
    }
    next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
