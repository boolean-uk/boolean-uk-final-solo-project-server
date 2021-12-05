const { user } = require("../../utils/database");
const prisma = require("../../utils/database");

async function getAllGames(req, res) {
  const userId = req.body.id;
  try {
    const games = await prisma.games.findMany({
      where: {
        userId,
      },
    });
    res.json({ games });
  } catch (error) {
    console.error({ error: error.message });
  }
}

async function createGame(req, res) {
  const id = req.body.userId;
  console.log("REQ", id);

  try {
    const newGame = await prisma.game.create({
      data: {
        status: "start",
      },
    });

    const result = await prisma.usersOnGames.create({
      data: {
        userId: parseInt(id),
        gameId: newGame.id,
      },
    });

    res.json(newGame);
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getAllGames, createGame };
