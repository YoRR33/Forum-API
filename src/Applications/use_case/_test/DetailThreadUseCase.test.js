const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const CommentRepository = require("../../../Domains/comments/CommentRepository");
const ReplyRepository = require("../../../Domains/replies/ReplyRepository");
const DetailThreadUseCase = require("../DetailThreadUseCase");

describe("DetailThreadUseCase", () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it("should orchestrating the detail thread action correctly", async () => {
    // Arrange
    const threadId = "thread-123";
    const mockThread = {
      id: threadId,
      title: "Thread Title",
      body: "Thread Body",
      date: "2025-04-28T10:00:24.301Z",
      username: "user123",
    };

    const mockComments = [
      {
        id: "comment-123",
        username: "user123",
        date: "2025-04-28T10:01:15.640Z",
        content: "Comment Content 1",
        is_delete: true,
      },
      {
        id: "comment-456",
        username: "user456",
        date: "2025-04-28T10:01:15.640Z",
        content: "Comment Content 2",
        is_delete: false,
      },
      {
        id: "comment-789",
        username: "user789",
        date: "2025-04-28T10:01:15.640Z",
        content: "Comment Content 3",
        is_delete: false,
      },
    ];

    const mockReplies = [
      {
        id: "reply-123",
        content: "Reply Content 1",
        date: "2025-04-28T10:52:35.170Z",
        username: "user123",
        comment_id: "comment-123",
        is_delete: true,
      },
      {
        id: "reply-456",
        content: "Reply Content 2",
        date: "2025-04-28T10:52:35.170Z",
        username: "user456",
        comment_id: "comment-456",
        is_delete: false,
      },
    ];

    const expectedDetailThread = {
      id: threadId,
      title: "Thread Title",
      body: "Thread Body",
      date: "2025-04-28T10:00:24.301Z",
      username: "user123",
      comments: [
        {
          id: "comment-123",
          username: "user123",
          date: "2025-04-28T10:01:15.640Z",
          content: "**komentar telah dihapus**",
          replies: [
            {
              id: "reply-123",
              content: "**balasan telah dihapus**",
              date: "2025-04-28T10:52:35.170Z",
              username: "user123",
            },
          ],
        },
        {
          id: "comment-456",
          username: "user456",
          date: "2025-04-28T10:01:15.640Z",
          content: "Comment Content 2",
          replies: [
            {
              id: "reply-456",
              content: "Reply Content 2",
              date: "2025-04-28T10:52:35.170Z",
              username: "user456",
            },
          ],
        },
        {
          id: "comment-789",
          username: "user789",
          date: "2025-04-28T10:01:15.640Z",
          content: "Comment Content 3",
          replies: [],
        },
      ],
    };

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyRepository();

    /** mocking needed function */
    mockThreadRepository.getThreadById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockThread));
    mockCommentRepository.getCommentsByThreadId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockComments));
    mockReplyRepository.getRepliesByThreadId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockReplies));

    /** creating use case instance */
    const detailThreadUseCase = new DetailThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    // Action
    const detailedThread = await detailThreadUseCase.execute(threadId);

    // Assert
    expect(detailedThread).toStrictEqual(expectedDetailThread);
    expect(mockThreadRepository.getThreadById).toBeCalledWith(threadId);
    expect(mockCommentRepository.getCommentsByThreadId).toBeCalledWith(
      threadId
    );
    expect(mockReplyRepository.getRepliesByThreadId).toBeCalledWith(threadId);
  });
});
