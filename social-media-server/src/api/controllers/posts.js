const service = require("../services/posts");

const getPosts = async (req, res) => {
  try {
    const query = req.query;
    const posts = await service.getPosts(query);
    if (!posts.length) {
      return res.status(404).send("No posts yet");
    }
    if (posts) res.status(200).json(posts);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const getSinglePost = async (req, res) => {
  try {
    const query = req.params;
    const posts = await service.getSinglePost(query);
    if (posts) {
      res.status(200).json(posts);
    }
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const addPost = async (req, res) => {
  try {
    const userId = req.userId;
    const body = req.body;
    const post = await service.addPost(body, userId);
    if (post) {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const body = req.body;
    const query = req.params;
    const post = await service.updatePost(body, query);
    if (post) {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const query = req.params;
    const post = await service.deletePost(query);
    if (post) {
      res.status(200).send(post);
    }
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

module.exports = {
  getPosts,
  getSinglePost,
  addPost,
  updatePost,
  deletePost,
};
