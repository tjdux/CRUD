import * as model from '../model/postModel.js'

const getAllPosts = async function(req, res) {
  try {
    const allPosts = await model.findAllPosts();
    return res.status(200).json({data: allPosts})
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "서버 에러 발생" });
  }
}

const getPost = async function(req, res) {
  try {
    const postId = Number(req.params.postId);

    const post = await model.findPostByPostId(postId);

    if (!post) {
      return res.status(404).json({message: "포스트가 존재하지 않습니다."})
    }

    return res.status(200).json({post: post})
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "서버 에러 발생" });
  }
}

const createPost = async function (req, res) {
  try {
    const {title, content, userId} = req.body;

    const newPost = await model.createNewPost(title, content, userId)

    return res.status(201).json({message: '새로운 포스트가 추가되었습니다.', newPost})
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: "서버 에러 발생" });
  }
}

const updatePost = async function(req, res) {
  try{
    const postId = Number(req.params.postId);
    const {title, content, userId} = req.body;

    const post = await model.findPostByPostId(postId)

    if (!post){
      return res.status(404).json({message: "포스트가 존재하지 않습니다."})
    }

    if (userId !== post.userId){
      return res.status(401).json({message: "수정 권한이 없습니다."})
    }

    const updatedPost = await model.updatePostByPostId(postId, title, content)
    
    return res.status(200).json({message: '포스트가 수정되었습니다.', updatedPost}) 
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: "서버 에러 발생" });
  }
}

const deletePost = async function(req, res) {
  try {
    const postId = Number(req.params.postId);
    const { userId } = req.body;

    const post = await model.findPostByPostId(postId);

    if (!post){
      return res.status(404).json({message: "포스트가 존재하지 않습니다."})
    }

    if (post.userId !== userId) {
      return res.status(401).json({message: "삭제 권한이 없습니다."})
    }

    await model.deletePost(postId);

    return res.status(200).json({message: '포스트가 삭제되었습니다.'}) 
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: "서버 에러 발생" });
  }
}

export {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
}