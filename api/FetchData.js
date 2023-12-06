const Game = require('../models/games')
module.exports = async (req, res) => {
    try {
      const games = await Game.find();
      const formattedGames = games.map(({ GameName,ImageURL, VoteCount }) => ({ GameName,ImageURL, VoteCount }));
      res.json(formattedGames);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }