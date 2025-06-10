import { prisma } from '../utils/prisma/index.js';

const findAllPosts = async function(){
  return await prisma.post.findMany();
}

const findPostByPostId = async function(postId){
  return await prisma.post.findUnique({
      where: {
        postId: postId
      }
    })
}

const createNewPost = async function(title, content, userId) {
  return await prisma.post.create({
      data: {
        title,
        content,
        userId
      }
    })
}

const updatePostByPostId = async function(postId, title, content){
  return await prisma.post.update({
      where: {postId: postId},
      data: {
        title: title || post.title,
        content: content || post.content
      }
    })
}

const deletePost = async function(postId){
  await prisma.post.delete({
      where: {
        postId: postId
      }
    })
}

const findPostByUserId = async function(userId){
  return await prisma.post.findMany({
      where: {
        userId: userId
      }
    })
}

export {
  findAllPosts,
  findPostByPostId,
  createNewPost,
  updatePostByPostId,
  deletePost,
  findPostByUserId
}