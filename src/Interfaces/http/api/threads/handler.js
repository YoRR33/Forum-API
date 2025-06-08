const AddThreadUseCase = require("../../../../Applications/use_case/AddThreadUseCase");
const DetailsThreadUseCase = require("../../../../Applications/use_case/DetailThreadUseCase");

class ThreadHandler {
  constructor(container) {
    this._container = container;
    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getThreadHandler = this.getThreadHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const { id: owner } = request.auth.credentials;
    const { title, body } = request.payload;

    const addedThread = await addThreadUseCase.execute({ title, body, owner });

    return h
      .response({
        status: "success",
        data: {
          addedThread,
        },
      })
      .code(201);
  }

  async getThreadHandler(request, h) {
    const { threadId } = request.params;
    const useCase = this._container.getInstance(DetailsThreadUseCase.name);
    const thread = await useCase.execute(threadId);

    return h.response({
      status: "success",
      data: {
        thread,
      },
    });
  }
}

module.exports = ThreadHandler;
