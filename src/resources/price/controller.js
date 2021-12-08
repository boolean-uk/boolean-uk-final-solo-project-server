const prisma = require("../../utils/database");
const puppeteer = require('puppeteer');

// const getPrice = (async () => {console.log("inside getPrice")
//     try {
//     const shoppingUrl = 'https://www.sainsburys.co.uk/shop/gb/groceries';
//     const browser = await puppeteer.launch({headless: true});
//     const page = await browser.newPage();

//     await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
//     await page.goto(shoppingUrl);
//     let data = await page.evaluate(()=> {
//     console.log("string here")
//         let results = []
//         let items = document.querySelectorAll('.mNavigationPropositionTile-titleTableRow')
//         console.log("items: ", items)
//         items.forEach((item) => {
//             results.push({
//                 title: item.querySelector('.mNavigationPropositionTile-titleText').innerText
//             })
//         })
//         return results
//     })

//     console.log("data: ", data)
//     await browser.close();
//   } catch (error) {
//       console.error(error)
//   }


// })

const getIngredientPrice = (async ()=> {console.log("inside getIngredientPrice")
try {
    const shoppingUrl = 'https://www.tesco.com/groceries/en-GB/search?query=tomato';
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
    await page.goto(shoppingUrl, {waitUntil: 'networkidle2'});
    let data = await page.evaluate(()=> {
        let results = []
        let items = document.querySelectorAll('.product-tile-wrapper')
        
        items.forEach((item) => {
            const priceEl = item.querySelector('.value')
            const unitOfMeasureEl = item.querySelector('.weight')
            if (priceEl){
            results.push({
                product: item.querySelector('.ui__StyledLink-sc-18aswmp-0').innerText,
                price: parseFloat(priceEl.innerText),
                unitOfMeasure: unitOfMeasureEl.innerText.replace('/',''),
                link: item.querySelector('.ui__StyledLink-sc-18aswmp-0').href
            })
        }
        })
        return results
    })
    // ('.tile-content')
    console.log("data: ", data)
    await browser.close();
  } catch (error) {
      console.error(error)
  }


})



module.exports = {
    getIngredientPrice
}