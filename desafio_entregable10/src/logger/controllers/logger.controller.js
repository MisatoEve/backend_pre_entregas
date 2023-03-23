import __dirname from "../../utils.js";

export const getLoggerTest = (req, res) => {
  try {
    req.logger.debug("Debug Test");
    req.logger.info("Info Test");
    req.logger.http("Http Test");
    req.logger.warning("Warning Test");
    req.logger.error("Error Test");
    req.logger.fatal("Fatal Error Test");
  } catch (error) {
    req.logger.error(error);
  }
};
