/* eslint-disable no-unused-vars */

class CommentRepository {
  async addComment(addComment) {
    throw new Error("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyAvailableCommentById(id) {
    throw new Error("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyCommentByOwner(commentId, owner) {
    throw new Error("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getCommentsByThreadId(threadId) {
    throw new Error("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async deleteCommentById(id) {
    throw new Error("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = CommentRepository;