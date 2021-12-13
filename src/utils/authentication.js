const jwt = require("jsonwebtoken");
const prisma = require("./dbClient");

const jwtSecret = process.env.JWT_SECRET;

const createToken = (user) => {
  return jwt.sign({ ...user }, jwtSecret, { expiresIn: "2days" });
};

const protect = (req, res, next) => {
  const token = req.headers.authorization;

  const validateUser = async (error, payload) => { // validate token
    if (error) {
      res.status(401).json({ error: "Not Authorised!" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (!user) {
      return res.status(401).end();
    }

    req.user = user;

    next();
  };

  jwt.verify(token, jwtSecret, validateUser);
};


const adminProtect = (req, res, next) => {
  const token = req.headers.authorization;

  const validateUser = async (error, payload) => { // validate token
    console.log({token, payload})
    
    if (error) {
      res.status(401).json({ error: "Not Authorised!" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (!user || user.role !== "ADMIN" ) {
      return res.status(401).end();
    }

    req.user = user;

    next();
  };

  jwt.verify(token, jwtSecret, validateUser);
};

module.exports = { createToken, protect, adminProtect };
