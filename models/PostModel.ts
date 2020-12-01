import { model, Schema, Document } from 'mongoose';
import { UserModelDocumentInterface } from './UserModel';

export interface PostModelInterface {
  _id?: string;
  text: string;
  userID: UserModelDocumentInterface;
  user: UserModelDocumentInterface;
}

export type PostModelDocumentInterface = PostModelInterface & Document;

//схема таблицы
const PostSchema = new Schema<PostModelInterface>(
  {
    text: {
      required: true,
      type: String,
      maxlength: 1000,
    },
    user: {
      required: true,
      type: String,
    },
    userID: {
      required: true,
      ref: 'User',
      type: Schema.Types.ObjectId,
    },
    imageUrl: {
      required: true,
      type: String,
    },
    published: {
      required: true,
      type: String,
    },
    // like: {
    //   required: false,
    //   type: Number,
    // },
    // date: {
    //   required: true,
    //   type: String,
    // },
  },
  {
    timestamps: false,
  },
);

export const PostModel = model<PostModelDocumentInterface>('Post', PostSchema);
