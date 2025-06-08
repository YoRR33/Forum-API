const AddComment = require("../AddComment");

describe("AddComment entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      threadId: "thread-123",
      content: "Thread Comment",
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError(
      "ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      threadId: 123,
      content: "Thread Comment",
      owner: "user-123",
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError(
      "ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create AddComment object correctly", () => {
    // Arrange
    const payload = {
      threadId: "thread-123",
      content: "Thread Comment",
      owner: "user-123",
    };

    // Action
    const { threadId, content, owner } = new AddComment(payload);

    // Assert
    expect(threadId).toEqual(payload.threadId);
    expect(content).toEqual(payload.content);
    expect(owner).toEqual(payload.owner);
  });
});
