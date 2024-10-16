const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getComments = async (query) => {
  if (!Object.keys(query).length) {
    const comments = await prisma.comment.findMany({
      select: {
        comment: true,
        createdAt: true,
        User: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        Post: {
          select: {
            title: true,
            description: true,
            User: {
              select: {
                email: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });
    return comments;
  }
};

const getSingleComment = async (query) => {
  if (query?.id) {
    const comment = await prisma.comment.findUnique({
      where: {
        id: Number(query.id),
      },
      select: {
        comment: true,
        createdAt: true,
        User: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        Post: {
          select: {
            title: true,
            description: true,
            User: {
              select: {
                email: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    if (comment) {
      return comment;
    } else {
      throw { status: 404, message: "Comment not found" };
    }
  }
  throw { status: 400, message: "Please enter a correct Comment ID" };
};

const addComment = async (body) => {
  const bodyKeys = Object.keys(body);
  const requiredKeys = ["userId", "postId", "comment"];
  console.log(bodyKeys);
  if (JSON.stringify(requiredKeys) == JSON.stringify(bodyKeys)) {
    const comment = await prisma.comment.create({
      data: {
        userId: body.userId,
        postId: body.postId,
        comment: body.comment,
      },
      select: {
        comment: true,
        createdAt: true,
        User: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return comment;
  }
  throw { status: 400, message: "Please add all required fields" };
};

const updateComment = async (body, query) => {
  const keys = Object.keys(body);
  if (query?.id) {
    const commentId = Number(query.id);
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
      select: {
        comment: true,
      },
    });
    if (!comment) {
      throw { status: 404, message: "Comment not found" };
    } else {
      const updateData = {};
      for (const value of keys) {
        if (value in comment) {
          updateData[value] = body[value];
        } else {
          throw {
            status: 400,
            message: "Update can't be completely done due to an unknown field",
          };
        }
      }
      const updatedComment = await prisma.comment.update({
        where: {
          id: commentId,
        },
        data: updateData,
        select: {
          comment: true,
          createdAt: true,
          User: {
            select: {
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });
      return updatedComment;
    }
  }
  throw { status: 400, message: "Please send a correct Comment ID" };
};

const deleteComment = async (query) => {
  if (query?.id) {
    const commentId = Number(query.id);
    const comment = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      throw { status: 404, message: "Comment not found" };
    } else {
      return "Comment is deleted";
    }
  }
  throw { status: 400, message: "Please enter a correct Comment ID" };
};

module.exports = {
  getComments,
  getSingleComment,
  addComment,
  updateComment,
  deleteComment,
};
