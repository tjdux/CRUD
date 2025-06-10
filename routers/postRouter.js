import express from 'express';
import * as controller from '../Controller/postController.js'

const router = express.Router();

// 전체 게시글 조회
router.get('/', controller.getAllPosts)

// 특정 게시글 조회
router.get('/:postId', controller.getPost)

// 게시글 생성
router.post('/', controller.createPost)

// 게시글 수정
router.put('/:postId', controller.updatePost)

// 게시글 삭제
router.delete('/:postId', controller.deletePost)

export default router;