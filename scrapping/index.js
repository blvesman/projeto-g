const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

const url = 'https://precodoscombustiveis.com.br/pt-br/city/brasil/sao-paulo/sao-paulo/3830'

async function scrapeData() {
    try {

        const { data } = await axios.get(url)
        const $ = cheerio.load(data)

        const preco = $('#ListCountry > div:nth-child(3) > div.col-xl-3.p-5.pr-md-5.pl-md-4.pt-md-2 > div:nth-child(2) > div > span:nth-child(5)').text()

        fs.writeFile("preco.json", JSON.stringify(preco), (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log("Successfully written data to file");
          });

        console.log(preco)

    } catch(e){
        console.log(e)
    }
}

scrapeData()