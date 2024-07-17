const mongoose = require('mongoose');

// MongoDB connection
const mongoURI = 'mongodb://127.0.0.1:27017/products';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
    console.log('Connected to MongoDB');

    // Product schema
    const productSchema = new mongoose.Schema({
        _id: Number,
        name: String,
        type: String,
        price: Number,
        rating: Number,
        warranty_years: Number,
        available: Boolean
    });

    const Product = mongoose.model('Product', productSchema);

    // Clear existing documents
    await Product.deleteMany({});
    console.log('All products have been deleted');

    mongoose.connection.close();
});
