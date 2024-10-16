const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getPosts = async (query) => {
  if (!Object.keys(query).length) {
    const posts = await prisma.post.findMany({
      select: {
        title: true,
        description: true,
        userId: true,
        User: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return posts;
  }
};

const getSinglePost = async (query) => {
  if (query?.id) {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(query.id),
      },
      select: {
        title: true,
        description: true,
        userId: true,
        User: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (post) {
      return post;
    } else {
      throw { status: 404, message: "Post not found" };
    }
  }
  throw { status: 400, message: "Please enter a correct Post ID" };
};

const addPost = async (body) => {
  const bodyKeys = Object.keys(body);
  const requiredKeys = ["userId", "title", "description"];
  console.log(bodyKeys);
  if (JSON.stringify(requiredKeys) == JSON.stringify(bodyKeys)) {
    const post = await prisma.post.create({
      data: {
        userId: body.userId,
        title: body.title,
        description: body.description,
      },
      select: {
        userId: true,
        title: true,
        description: true,
      },
    });
    return post;
  }
  throw { status: 400, message: "Please add all required fields" };
};

const updatePost = async (body, query) => {
  const keys = Object.keys(body);
  if (query?.id) {
    const postId = Number(query.id);
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        title: true,
        description: true,
      },
    });

    if (!post) {
      throw { status: 404, message: "Post not found" };
    } else {
      const updateData = {};
      for (const value of keys) {
        if (value in post) {
          updateData[value] = body[value];
        } else {
          throw {
            status: 400,
            message: "Update can't be completely done due to an unknown field",
          };
        }
      }
      const updatedPost = await prisma.post.update({
        where: {
          id: postId,
        },
        data: updateData,
        select: {
          title: true,
          description: true,
          userId: true,
        },
      });
      return updatedPost;
    }
  }
  throw { status: 400, message: "Please send a correct Post ID" };
};

const deletePost = async (query) => {
  if (query?.id) {
    const postId = Number(query.id);
    const post = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw { status: 404, message: "Post not found" };
    } else {
      return "Post is deleted";
    }
  }
  throw { status: 400, message: "Please enter a correct Post ID" };
};

module.exports = {
  getPosts,
  getSinglePost,
  addPost,
  updatePost,
  deletePost,
};
