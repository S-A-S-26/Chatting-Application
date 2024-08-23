async function connectDb(){
    const mongoose = require('mongoose');

    const db=process.env.DB

    try {
        await mongoose.connect(db)
        .then(()=> console.log('Connected to MongoDB'))
    } catch (error) {
        console.log('Error connecting to MongoDB')
    }

}

module.exports = connectDb;