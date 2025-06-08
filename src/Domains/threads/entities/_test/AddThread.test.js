const AddThread = require("../AddThread");

describe("a AddThread entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      title: "Thread Title",
      body: "Thread Body",
    };

    // Action and Assert
    expect(() => new AddThread(payload)).toThrowError(
      "ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type", () => {
    // Arrange
    const payload = {
      title: 123,
      body: 456,
      owner: true,
    };

    // Action and Assert
    expect(() => new AddThread(payload)).toThrowError(
      "ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should throw error when title contains more than 100 character", () => {
    // Arrange
    const payload = {
      title:
        "Thread title more than 100 character, Thread title more than 100 character, Thread title more than 100 character, Thread title more than 100 character.",
      body: "Thread Body",
      owner: "user-abc",
    };

    // Action and Assert
    expect(() => new AddThread(payload)).toThrowError(
      "ADD_THREAD.TITLE_LIMIT_CHAR"
    );
  });

  it("should create AddThread object correctly", () => {
    // Arrange
    const payload = {
      title: "Thread Title",
      body: "Thread Body",
      owner: "user-abc",
    };

    // Action
    const { title, body, owner } = new AddThread(payload);

    // Assert
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(owner).toEqual(payload.owner);
  });
});
