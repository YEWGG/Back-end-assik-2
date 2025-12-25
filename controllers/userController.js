const axios = require('axios');

exports.getRandomUserData = async (req, res) => {
    try {
        const userRes = await axios.get('https://randomuser.me/api/');
        const user = userRes.data.results[0];

        const userData = {
            firstName: user.name.first,
            lastName: user.name.last,
            gender: user.gender,
            picture: user.picture.large,
            age: user.dob.age,
            dob: user.dob.date,
            city: user.location.city,
            country: user.location.country,
            address: `${user.location.street.name} ${user.location.street.number}`
        };

        const countryRes = await axios.get(`https://restcountries.com/v3.1/name/${userData.country}?fullText=true`);
        const country = countryRes.data[0];
        
        const currencyCode = Object.keys(country.currencies)[0];
        const countryData = {
            name: country.name.common,
            capital: country.capital ? country.capital[0] : 'N/A',
            languages: Object.values(country.languages).join(', '),
            currency: `${currencyCode} (${country.currencies[currencyCode].name})`,
            flag: country.flags.svg
        };

        const exchKey = process.env.EXCHANGE_RATE_KEY;
        const exchRes = await axios.get(`https://v6.exchangerate-api.com/v6/${exchKey}/latest/${currencyCode}`);
        const rates = exchRes.data.conversion_rates;
        
        const exchangeData = {
            usd: `1 ${currencyCode} = ${rates.USD.toFixed(2)} USD`,
            kzt: `1 ${currencyCode} = ${rates.KZT.toFixed(2)} KZT`
        };

        const newsKey = process.env.NEWS_API_KEY;
       
        const newsRes = await axios.get(`https://newsapi.org/v2/everything?q=${userData.country}&language=en&pageSize=5&apiKey=${newsKey}`);
        
        const newsData = newsRes.data.articles.map(art => ({
            title: art.title,
            image: art.urlToImage,
            description: art.description,
            url: art.url
        }));

        res.json({ user: userData, country: countryData, exchange: exchangeData, news: newsData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving data from API servers' });
    }
};