const LikeDislikeCommentUseCase = require("../LikeDislikeCommentUsecase");
const CommentLikeRepository = require("../../../Domains/likes/CommentLikeRepository");
const CommentRepository = require("../../../Domains/comments/CommentRepository");
const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const Like = require("../../../Domains/likes/entities/Like");

describe("LikeDislikeCommentUseCase", () => {
  it("should orchestrating the like comment action correctly if comment is not liked", async () => {
    // Data input
    const userId = "user-123";
    const threadId = "thread-123";
    const commentId = "comment-123";

    // Objek like yang dibutuhkan
    const like = new Like({ commentId, owner: userId });

    // Mock repository
    const mockThreadRepo = new ThreadRepository();
    const mockCommentRepo = new CommentRepository();
    const mockLikeRepo = new CommentLikeRepository();

    // Simulasi: thread dan komentar tersedia
    mockThreadRepo.verifyAvailableThreadById = jest.fn(() => Promise.resolve());
    mockCommentRepo.verifyAvailableCommentById = jest.fn(() =>
      Promise.resolve()
    );

    // Simulasi: pengguna BELUM menyukai komentar ini
    mockLikeRepo.verifyUserCommentLike = jest.fn(() => Promise.resolve(false));
    mockLikeRepo.addLike = jest.fn(() => Promise.resolve());

    // Buat use case
    const useCase = new LikeDislikeCommentUseCase({
      commentLikeRepository: mockLikeRepo,
      commentRepository: mockCommentRepo,
      threadRepository: mockThreadRepo,
    });

    // Jalankan use case
    await useCase.execute(userId, { threadId, commentId });

    // Verifikasi bahwa semua langkah dijalankan dengan benar
    expect(mockThreadRepo.verifyAvailableThreadById).toHaveBeenCalledWith(
      threadId
    );
    expect(mockCommentRepo.verifyAvailableCommentById).toHaveBeenCalledWith(
      commentId,
      threadId
    );
    expect(mockLikeRepo.verifyUserCommentLike).toHaveBeenCalledWith(like);
    expect(mockLikeRepo.addLike).toHaveBeenCalledWith(like);
  });

  it("should orchestrating the dislike comment action correctly if comment is liked", async () => {
    // Data input
    const userId = "user-123";
    const threadId = "thread-123";
    const commentId = "comment-123";

    // Objek like
    const like = new Like({ commentId, owner: userId });

    // Mock repository
    const mockThreadRepo = new ThreadRepository();
    const mockCommentRepo = new CommentRepository();
    const mockLikeRepo = new CommentLikeRepository();

    // Simulasi: thread dan komentar tersedia
    mockThreadRepo.verifyAvailableThreadById = jest.fn(() => Promise.resolve());
    mockCommentRepo.verifyAvailableCommentById = jest.fn(() =>
      Promise.resolve()
    );

    // Simulasi: pengguna SUDAH menyukai komentar ini
    mockLikeRepo.verifyUserCommentLike = jest.fn(() => Promise.resolve(true));
    mockLikeRepo.deleteLike = jest.fn(() => Promise.resolve());

    // Buat use case
    const useCase = new LikeDislikeCommentUseCase({
      commentLikeRepository: mockLikeRepo,
      commentRepository: mockCommentRepo,
      threadRepository: mockThreadRepo,
    });

    // Jalankan use case
    await useCase.execute(userId, { threadId, commentId });

    // Verifikasi bahwa semua langkah dijalankan dengan benar
    expect(mockThreadRepo.verifyAvailableThreadById).toHaveBeenCalledWith(
      threadId
    );
    expect(mockCommentRepo.verifyAvailableCommentById).toHaveBeenCalledWith(
      commentId,
      threadId
    );
    expect(mockLikeRepo.verifyUserCommentLike).toHaveBeenCalledWith(like);
    expect(mockLikeRepo.deleteLike).toHaveBeenCalledWith(like);
  });
});
