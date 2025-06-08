const AddCommentUseCase = require("../../../../Applications/use_case/AddCommentUseCase");
const DeleteCommentUseCase = require("../../../../Applications/use_case/DeleteCommentUseCase");

class CommentsHandler {
  constructor(container) {
    this._container = container;

    this.postCommentHandler = this.postCommentHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
  }

  async postCommentHandler(request, h) {
    const { id: owner } = request.auth.credentials;
    const { content } = request.payload;
    const { threadId } = request.params;

    const addedComment = await this._container
      .getInstance(AddCommentUseCase.name)
      .execute({
        threadId,
        content,
        owner,
      });

    return h
      .response({
        status: "success",
        data: {
          addedComment,
        },
      })
      .code(201);
  }

  async deleteCommentHandler(request, h) {
    const { id: owner } = request.auth.credentials;
    const { threadId, commentId } = request.params;

    await this._container.getInstance(DeleteCommentUseCase.name).execute({
      commentId,
      threadId,
      owner,
    });

    return h
      .response({
        status: "success",
      })
      .code(200);
  }
}

module.exports = CommentsHandler;
