const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const products = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life. Deep bass, crystal-clear highs, and ultra-comfortable ear cushions for all-day listening.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Electronics',
    brand: 'SoundMax',
    countInStock: 25,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Smart Fitness Watch',
    description: 'Track your health and fitness with this advanced smartwatch. Features heart rate monitoring, GPS tracking, sleep analysis, and 7-day battery life.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Electronics',
    brand: 'FitPro',
    countInStock: 15,
    rating: 4.2,
    numReviews: 8,
  },
  {
    name: 'Classic Leather Jacket',
    description: 'Timeless genuine leather jacket with a modern fit. Premium quality leather, satin lining, and multiple pockets. Perfect for any occasion.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    category: 'Clothing',
    brand: 'UrbanStyle',
    countInStock: 10,
    rating: 4.7,
    numReviews: 15,
  },
  {
    name: 'JavaScript: The Definitive Guide',
    description: 'The comprehensive guide to JavaScript programming. Covers ES2023+, async/await, modules, and modern web APIs. Essential for every developer.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500',
    category: 'Books',
    brand: "O'Reilly",
    countInStock: 50,
    rating: 4.8,
    numReviews: 22,
  },
  {
    name: 'Minimalist Desk Lamp',
    description: 'Elegant LED desk lamp with adjustable brightness and color temperature. Touch controls, USB charging port, and sleek aluminum design.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=500',
    category: 'Home',
    brand: 'LumiCraft',
    countInStock: 30,
    rating: 4.3,
    numReviews: 9,
  },
  {
    name: 'Premium Yoga Mat',
    description: 'Extra thick, non-slip yoga mat with alignment lines. Made from eco-friendly TPE material. Perfect for yoga, pilates, and floor exercises.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    category: 'Sports',
    brand: 'ZenFlex',
    countInStock: 40,
    rating: 4.6,
    numReviews: 18,
  },
  {
    name: 'Organic Skincare Set',
    description: 'Complete skincare routine with cleanser, toner, serum, and moisturizer. Made with 100% organic ingredients. Suitable for all skin types.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500',
    category: 'Beauty',
    brand: 'PureGlow',
    countInStock: 20,
    rating: 4.4,
    numReviews: 11,
  },
  {
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof portable speaker with 360-degree sound. 20-hour battery, built-in microphone, and compact design for adventures anywhere.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    category: 'Electronics',
    brand: 'SoundMax',
    countInStock: 35,
    rating: 4.1,
    numReviews: 7,
  },
  {
    name: 'Running Shoes Ultra Boost',
    description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper. Designed for comfort on long runs and daily training.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'Sports',
    brand: 'SwiftRun',
    countInStock: 22,
    rating: 4.5,
    numReviews: 14,
  },
  {
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 handcrafted ceramic mugs in earth tones. Microwave and dishwasher safe. Each holds 12oz. Perfect for coffee and tea lovers.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500',
    category: 'Home',
    brand: 'ClayCraft',
    countInStock: 45,
    rating: 4.3,
    numReviews: 6,
  },
  {
    name: 'Cotton Crew Neck T-Shirt Pack',
    description: 'Pack of 3 premium cotton t-shirts in classic colors. Pre-shrunk, tagless, and ultra-soft. Available in multiple sizes.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    category: 'Clothing',
    brand: 'BasicCo',
    countInStock: 60,
    rating: 4.0,
    numReviews: 10,
  },
  {
    name: 'Vitamin C Brightening Serum',
    description: 'Powerful antioxidant serum with 20% Vitamin C, hyaluronic acid, and vitamin E. Brightens skin, reduces dark spots, and boosts collagen.',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500',
    category: 'Beauty',
    brand: 'PureGlow',
    countInStock: 28,
    rating: 4.6,
    numReviews: 20,
  },
];

const seedDB = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      isAdmin: true,
    });

    await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'john123',
    });

    await Product.insertMany(products);

    console.log('Database seeded successfully!');
    console.log('Admin: admin@example.com / admin123');
    console.log('User:  john@example.com / john123');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
