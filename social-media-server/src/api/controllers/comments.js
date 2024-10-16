const service = require("../services/comments");

const getComments = async (req, res) => {
  try {
    const query = req.query;
    const comments = await service.getComments(query);
    console.log(comments);
    if (!comments.length) {
      return res.status(404).send("No comments yet");
    }
    if (comments) res.status(200).json(comments);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const getSingleComment = async (req, res) => {
  try {
    const query = req.params;
    const comments = await service.getSingleComment(query);
    if (comments) {
      res.status(200).json(comments);
    }
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const addComment = async (req, res) => {
  try {
    const body = req.body;
    const comment = await service.addComment(body);
    if (comment) {
      res.status(200).json(comment);
    }
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const body = req.body;
    const query = req.params;
    const comment = await service.updateComment(body, query);
    if (comment) {
      res.status(200).json(comment);
    }
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const query = req.params;
    const comment = await service.deleteComment(query);
    console.log(comment);
    if (comment) {
      res.status(200).send(comment);
    }
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

module.exports = {
  getComments,
  getSingleComment,
  addComment,
  updateComment,
  deleteComment,
};
