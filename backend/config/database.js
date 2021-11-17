const mongoose = require('mongoose');

const connectDatabase = async () => {
  const conn = await mongoose.connect(process.env.DB_LOCAL_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'shopit',
  });

  console.log(`MongoDB Database connected with HOST: ${conn.connection.host}`);
};

module.exports = connectDatabase;
