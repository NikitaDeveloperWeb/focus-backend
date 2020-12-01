import mongoose from 'mongoose'

mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/focus',{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:true,
  useFindAndModify:false,
});

const db =mongoose.connection;

db.on('error', console.error.bind(console,"CONNECTION ERROR:"));

export {db, mongoose}