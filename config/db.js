const mongoose = require( 'mongoose' );
const colors = require('colors');

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to db... ${mongoose.connection.host.blue}`);
    } catch (error) {
        console.log(`Connection failed... ${error}`.red);
    }
};

module.exports = connectDB;