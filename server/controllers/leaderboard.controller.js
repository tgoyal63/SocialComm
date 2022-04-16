// Importing File Dependencies
const { controllerBoilerPlate, controllerResponse } = require('../utils/controller.utils.js');
const leaderboardService = require('../services/leaderboard.service.js');

module.exports = {

  // Creating User
  global: ('/leaderboard/global', controllerBoilerPlate(async (req) => {
    const data = await leaderboardService.findGlobal();
    const response = data.map((e) =>
      (({ name, username, rating }) => ({ name, username, rating }))(e)
    );
    return controllerResponse(200, 'Successful', response);
  })),

};