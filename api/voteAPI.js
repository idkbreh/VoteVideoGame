const Game = require('../models/games');  // Import your Game model
const User = require('../models/users');  // Import your User model

module.exports = async (req, res) => {
    const { game_name } = req.query;
    const userID = req.session.UniqueID;

    if (!game_name || !userID) {
        const Errors = "Need to Login First !";
        req.flash('danger', Errors);
        return res.redirect('/');
    }

    try {
        const user = await User.findOne({ _id: userID });

        if (!user) { return res.status(404).json({ error: 'User not found' });}
        if (user.Vote === '1') { 
            const Errors = "This USER Already VOTE";
            req.flash('danger', Errors);
            return res.redirect('/');
        }
        const game = await Game.findOne({ GameName: game_name });
        if (!game) {return res.status(404).json({ error: 'Game not found' });}
        const numericVoteCount = parseInt(game.VoteCount, 10);
        const updatedGame = await Game.findOneAndUpdate(
            { GameName: game_name },
            { $set: { VoteCount: numericVoteCount + 1 } },
            { new: true }
        );
        await User.findOneAndUpdate(
            { _id: userID },
            { Vote: '1' },
            { new: true }
        );

        console.log('Vote counted for game:', game_name, 'by user ID:', userID);
        const Errors = "Success VOTE";
        req.flash('success', Errors);
        return res.redirect('/');
    } catch (error) {
        console.error('Error counting vote:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};