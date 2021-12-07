const prisma = require('../../utils/dbClient');

async function getAssets(req, res) { 

    try {

        const userAssets = await prisma.trade.findMany({
            where : { 
                userId : req.user.id
            },
            include : { 
                user : true
            }
        })

        res.status(200).json({userAssets})
        
    } catch (error) {
        console.error(error)

        res.status(500).json({error: error.message})
    }
}

async function buyAssets(req, res) {

    const { assetSymbol, price} = req.body
    
    const quantity = parseFloat(req.body.quantity)
    
    try {

        const asset = await prisma.trade.create({
            data : {
                assetSymbol,
                price,
                quantity,
                type : "BUY",
                userId: req.user.id
            }
        });

        res.status(200).json({asset})
        
    } catch (error) {
        
        console.error(error);

        res.status(500).json({error: error.message});

    }

}

module.exports = {buyAssets, getAssets};

