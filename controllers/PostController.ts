import express = require('express');
import { validationResult } from 'express-validator';
import { PostModel, PostModelDocumentInterface, PostModelInterface } from '../models/PostModel';
import { UserModelInterface } from '../models/UserModel';
import { isValidObjectId } from '../utils/isValidObjectId';

//controller user
class PostController {
  //get all posts
  async index(_: any, res: express.Response): Promise<void> {
    try {
      const posts = await PostModel.find({}).exec();

      res.json(posts);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        massages: JSON.stringify(error),
      });
    }
  }
  // async like(_: any, res: express.Response): Promise<void> {
  //   try {
  //     const posts = await PostModel.find({}).exec();

  //     res.json(posts);
  //   } catch (error) {
  //     res.status(500).json({
  //       status: 'error',
  //       massages: JSON.stringify(error),
  //     });
  //   }
  // }

  //create post
  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user as UserModelInterface;

      if (user?._id) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          res.status(400).json({ status: 'error', errors: errors.array() });
          return;
        }

        const data: any = {
          text: req.body.text,
          imageUrl: req.body.imageUrl,
          user: req.body.user,
          userID: user._id,
          published: req.body.published,
        };
        console.log(data);
        const post = await PostModel.create(data);
        // console.log(post);
        res.json({
          status: 'success',
          data: post,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 'error',
        massages: JSON.stringify(error),
      });
      console.log(error);
    }
  }

  // delete post
  async delete(req: express.Request, res: express.Response): Promise<void> {
    const user = req.user as UserModelInterface;
    try {
      if (user) {
        const postId = req.params.id;
        //проверка на валидность id
        if (!isValidObjectId(postId)) {
          res.status(400).send();
          return;
        }
        const post = await PostModel.findById(postId);

        if (post) {
          if (String(post.user._id) === String(user._id)) {
            post.remove();
            res.send();
          } else {
            res.status(403).send();
          }
        } else {
          res.status(404).send();
        }
      }
    } catch (error) {
      res.status(500).json({
        status: 'error',
        massages: JSON.stringify(error),
      });
    }
  }

  //get one post
  async show(req: any, res: express.Response): Promise<void> {
    try {
      const postId = req.params.id;
      //проверка на валидность id
      if (!isValidObjectId(postId)) {
        res.status(400).send();
        return;
      }

      const post = await PostModel.findById(postId).exec();

      //проверка на существование пользователя по этому id
      if (!post) {
        res.status(404).send();
        return;
      }
      res.json({
        status: 'success',
        data: post,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        massages: JSON.stringify(error),
      });
    }
  }

  //update post
  async update(req: express.Request, res: express.Response): Promise<void> {
    const user = req.user as UserModelInterface;
    try {
      if (user) {
        const postId = req.params.id;
        //проверка на валидность id
        if (!isValidObjectId(postId)) {
          res.status(400).send();
          return;
        }
        const post = await PostModel.findById(postId);

        if (post) {
          if (String(post.user._id) === String(user._id)) {
            const text = req.body.text;
            post.text = text;
            post.save();
            res.send();
          } else {
            res.status(403).send();
          }
        } else {
          res.status(404).send();
        }
      }
    } catch (error) {
      res.status(500).json({
        status: 'error',
        massages: JSON.stringify(error),
      });
    }
  }
}
export const PostCtrl = new PostController();
