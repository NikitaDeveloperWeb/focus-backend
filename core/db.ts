import mongoose from 'mongoose';

mongoose.Promise = Promise;

mongoose.connect(
  process.env.MONGOLAB_URI ||
    'mongodb+srv://UserAdm:kodfg123@cluster0.3ydia.mongodb.net/focus?retryWrites=true&w=majority' ||
    'mongodb://127.0.0.1:27017/focus',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'CONNECTION ERROR:'));

export { db, mongoose };
