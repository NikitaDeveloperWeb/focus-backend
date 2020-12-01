import { model, Schema, Document } from 'mongoose';

export interface UserModelInterface {
  _id?: string;
  email: string;
  fullname: string;
  username: string;
  date: string;
  avatarUrl?: string;
  password: string;
  confirmHash: string;
  confirmed?: boolean;
}

export type UserModelDocumentInterface = UserModelInterface & Document;

//схема таблицы
const UserSchema = new Schema(
  {
    email: {
      unique: true,
      required: true,
      type: String,
    },
    fullname: {
      required: true,
      type: String,
    },
    username: {
      unique: true,
      required: true,
      type: String,
    },
    date: {
      required: true,
      type: String,
    },
    avatarUrl: {
      required: false,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    confirmHash: {
      required: true,
      type: String,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

//скрытие из базы данных пароля и хеша
UserSchema.set('toJSON', {
  transform: function (_, obj) {
    delete obj.password;
    delete obj.confirmHash;
    return obj;
  },
});

export const UserModel = model<UserModelDocumentInterface>('User', UserSchema);
