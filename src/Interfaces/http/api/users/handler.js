const AddUserUseCase = require("../../../../Applications/use_case/AddUserUseCase");

class UsersHandler {
  constructor(container) {
    this._container = container;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(request, h) {
    const addedUser = await this._container
      .getInstance(AddUserUseCase.name)
      .execute(request.payload);

    return h
      .response({
        status: "success",
        data: {
          addedUser,
        },
      })
      .code(201);
  }
}

module.exports = UsersHandler;
