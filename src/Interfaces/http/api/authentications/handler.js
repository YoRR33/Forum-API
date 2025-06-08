const LoginUserUseCase = require("../../../../Applications/use_case/LoginUserUseCase");
const RefreshAuthenticationUseCase = require("../../../../Applications/use_case/RefreshAuthenticationUseCase");
const LogoutUserUseCase = require("../../../../Applications/use_case/LogoutUserUseCase");

class AuthenticationsHandler {
  constructor(container) {
    this._container = container;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler =
      this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(request, h) {
    const { accessToken, refreshToken } = await this._container
      .getInstance(LoginUserUseCase.name)
      .execute(request.payload);

    return h
      .response({
        status: "success",
        data: {
          accessToken,
          refreshToken,
        },
      })
      .code(201);
  }

  async putAuthenticationHandler(request) {
    const accessToken = await this._container
      .getInstance(RefreshAuthenticationUseCase.name)
      .execute(request.payload);

    return {
      status: "success",
      data: {
        accessToken,
      },
    };
  }

  async deleteAuthenticationHandler(request) {
    await this._container
      .getInstance(LogoutUserUseCase.name)
      .execute(request.payload);

    return {
      status: "success",
    };
  }
}

module.exports = AuthenticationsHandler;
