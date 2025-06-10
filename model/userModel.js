import { prisma } from '../utils/prisma/index.js';

const getAllUsers = async function(){
  return await prisma.user.findMany({
      omit: {
        password: true
      }
    });
}

const getUserByEmail = async function(email){
  return await prisma.user.findUnique({
      where: { email },
    })
}

const getUserByUserId = async function(userId){
  return await prisma.user.findUnique({
      where: {
        userId: userId
      }
    })
}

const createUser = async function (name, email, password){
  return await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    })
}

const updateUser = async function(user, userId, name, email, newPassword){
  await prisma.user.update({
  where: {userId: userId},
  data: {
    email: email || user.email,
    name: name || user.name,
    password: newPassword || user.password,
  }
})
}

const deleteUser = async function(userId){
  await prisma.user.delete({
    where: {userId: userId}
  })
}

export {
  getAllUsers,
  getUserByEmail,
  getUserByUserId,
  createUser,
  updateUser,
  deleteUser
}