import * as model from '../model/userModel.js'
import { findPostByUserId } from '../Model/postModel.js';

const getAllUsers = async function(req, res) {
  try {
    const allUsers = await model.getAllUsers();
    return res.status(200).json({data: allUsers})
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: "서버 에러 발생" });
  }
}

const createUser = async function (req, res) {
  try {
    const { name, email, password } = req.body;
    const existingUser = await model.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: '이미 존재하는 이메일입니다.'})
    }
    const newUser = await model.createUser(name, email, password);

    const {password: _, ...userData} = newUser;

    return res.status(201).json({ message: '회원가입이 완료되었습니다.', data: userData })
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "서버 에러 발생" });
  }
}

const getUser = async function(req, res) {
  try {
    const userId = Number(req.params.userId);

    const user = await model.getUserByUserId(userId);

    if (!user){
      return res.status(404).json({message: "유저가 존재하지 않습니다."})
    }

    const {password: _, ...userData} = user
    return res.status(200).json({user: userData})
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "서버 에러 발생" });
  }
}

const updateUser = async function(req, res) {
    try {
    const userId = Number(req.params.userId);
    const { email, name, password, newPassword } = req.body;

    const user = await model.getUserByUserId(userId);

    if (!user) {
      return res.status(404).json({message: "유저가 존재하지 않습니다."})
    }

    if (user.password !== password) {
      return res.status(401).json({message: "비밀번호가 일치하지 않습니다."})
    }

    await model.updateUser(user, userId, name, email, newPassword);

    return res.status(200).json( {message: "사용자 정보가 성공적으로 수정되었습니다."});
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: "서버 에러 발생" });
  }
}

const deleteUser = async function(req, res) {
  try {
    const userId = Number(req.params.userId);
    const {password} = req.body;

    const user = await model.getUserByUserId(userId);

    if (!user) {
      return res.status(404).json({message: "유저가 존재하지 않습니다."})
    }

    if (user.password !== password) {
      return res.status(401).json({message: "비밀번호가 일치하지 않습니다."})
    }

    await model.deleteUser(userId);

    return res.status(200).json({ message: '사용자가 성공적으로 삭제되었습니다.' });
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: "서버 에러 발생" });
  }
}

const getPostsByUserId = async function(req, res) {
  const userId = Number(req.params.userId);

  const posts = await findPostByUserId(userId);

  if (posts.length === 0) {
    return res.status(404).json({message: "포스트가 존재하지 않습니다."})
  }

  return res.status(200).json({posts: posts})
}

export {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getPostsByUserId
}