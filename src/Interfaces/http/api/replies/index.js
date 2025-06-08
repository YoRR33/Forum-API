const Replieshandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "replies",
  register: async (server, { container }) => {
    const repliesHandler = new Replieshandler(container);
    server.route(routes(repliesHandler));
  },
};
