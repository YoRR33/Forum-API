const Like = require("../../Domains/likes/entities/Like");

class LikeDislikeCommentUsecase {
  constructor({ commentLikeRepository, commentRepository, threadRepository }) {
    this._commentLikeRepository = commentLikeRepository;
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(userId, { threadId, commentId }) {
    await this._threadRepository.verifyAvailableThreadById(threadId);
    await this._commentRepository.verifyAvailableCommentById(
      commentId,
      threadId
    );

    const like = new Like({ commentId, owner: userId });

    const isLiked = await this._commentLikeRepository.verifyUserCommentLike(
      like
    );
    if (isLiked) {
      return this._commentLikeRepository.deleteLike(like);
    } else {
      return this._commentLikeRepository.addLike(like);
    }
  }
}

module.exports = LikeDislikeCommentUsecase;
