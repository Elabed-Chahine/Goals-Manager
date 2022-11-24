const mongoose = require('mongoose');

const connectDB = () => {
    const conn = mongoose
      .connect(process.env.MONGO_URI)
      .then((conn) => {
        console.log(`mongo connected by : ${conn.connection.host}`.cyan.underline);
      })
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });
}
module.exports= connectDB