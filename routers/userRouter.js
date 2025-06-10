import express from 'express';
import * as controller from '../Controller/userController.js'

const router = express.Router();

// 유저 전체 목록 조회
router.get('/', controller.getAllUsers)

// 유저 생성
router.post('/', controller.createUser)

// 특정 유저 정보 조회
router.get('/:userId', controller.getUser)

// 유저 정보 수정
router.put("/:userId", controller.updateUser)

// 유저 삭제
router.delete('/:userId', controller.deleteUser)

// 특정 유저의 게시글 조회
router.get('/:userId/posts', controller.getPostsByUserId)

export default router;