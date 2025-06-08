const DeleteCommentUseCase = require("../DeleteCommentUseCase");
const CommentRepository = require("../../../Domains/comments/CommentRepository");
const ThreadRepository = require("../../../Domains/threads/ThreadRepository");

describe("DeleteCommentUseCase", () => {
  it("should orchestrating the delete comment action correctly", async () => {
    // Arrange
    const useCasePayload = {
      threadId: "thread-123",
      commentId: "comment-123",
      owner: "user-123",
    };
    /**
     *     * creating dependency of use case
     */
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.verifyAvailableThreadById = jest.fn(() =>
      Promise.resolve()
    );
    mockCommentRepository.verifyAvailableCommentById = jest.fn(() =>
      Promise.resolve()
    );
    mockCommentRepository.verifyCommentByOwner = jest.fn(() =>
      Promise.resolve()
    );
    mockCommentRepository.deleteCommentById = jest.fn(() =>
      Promise.resolve()
    );

    /** creating use case instance */
    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Action
    await deleteCommentUseCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.verifyAvailableThreadById).toBeCalledWith(
      useCasePayload.threadId
    );
    expect(mockCommentRepository.verifyAvailableCommentById).toBeCalledWith(
      useCasePayload.commentId
    );
    expect(mockCommentRepository.verifyCommentByOwner).toBeCalledWith(
      useCasePayload.commentId,
      useCasePayload.owner
    );
    expect(mockCommentRepository.deleteCommentById).toBeCalledWith(
      useCasePayload.commentId
    );
  });
});
