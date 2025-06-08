const AddReplyUseCase = require("../../../../Applications/use_case/AddReplyUseCase");
const DeleteReplyUseCase = require("../../../../Applications/use_case/DeleteReplyUseCase");

class RepliesHandler {
  constructor(container) {
    this._container = container;

    this.postCommentReplyHandler = this.postCommentReplyHandler.bind(this);
    this.deleteCommentReplyHandler = this.deleteCommentReplyHandler.bind(this);
  }

  async postCommentReplyHandler(request, h) {
    const { content } = request.payload;
    const { threadId, commentId } = request.params;
    const { id: owner } = request.auth.credentials;

    const replies = await this._container
      .getInstance(AddReplyUseCase.name)
      .execute({
        threadId,
        commentId,
        content,
        owner,
      });

    return h
      .response({
        status: "success",
        data: {
          // replies, baru diubah
          addedReply: replies,
        },
      })
      .code(201);
  }

  async deleteCommentReplyHandler(request, h) {
    const { id: owner } = request.auth.credentials;
    const { threadId, commentId, replyId } = request.params;

    await this._container.getInstance(DeleteReplyUseCase.name).execute({
      threadId,
      commentId,
      replyId,
      owner,
    });

    return h
      .response({
        status: "success",
      })
      .code(200);
  }
}

module.exports = RepliesHandler;
