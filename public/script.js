const fetchBtn = document.getElementById('fetchBtn');
const mainContent = document.getElementById('mainContent');
const loader = document.getElementById('loader');

fetchBtn.addEventListener('click', async () => {
    try {
        loader.classList.remove('hidden');
        mainContent.classList.add('hidden');

        const response = await fetch('/api/get-random-profile');
        const data = await response.json();

        if (data.error) throw new Error(data.error);

        renderUI(data);
    } catch (err) {
        alert('Error: ' + err.message);
    } finally {
        loader.classList.add('hidden');
    }
});

function renderUI(data) {
    const { user, country, exchange, news } = data;

    document.getElementById('userImg').src = user.picture;
    document.getElementById('userName').textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById('userGender').textContent = user.gender;
    document.getElementById('userAge').textContent = `${user.age} years old (${new Date(user.dob).toLocaleDateString()})`;
    document.getElementById('userAddress').textContent = user.address;
    document.getElementById('userCity').textContent = `${user.city}, ${user.country}`;

    document.getElementById('countryFlag').src = country.flag;
    document.getElementById('countryName').textContent = country.name;
    document.getElementById('countryCapital').textContent = country.capital;
    document.getElementById('countryLangs').textContent = country.languages;
    document.getElementById('countryCurrency').textContent = country.currency;

    document.getElementById('rateUsd').textContent = exchange.usd;
    document.getElementById('rateKzt').textContent = exchange.kzt;

    const newsGrid = document.getElementById('newsGrid');
    newsGrid.innerHTML = news.map(article => `
        <div class="news-card">
            ${article.image ? `<img src="${article.image}" alt="news">` : ''}
            <div class="news-content">
                <h4>${article.title}</h4>
                <p>${article.description || 'No decription'}</p>
                <a href="${article.url}" target="_blank" class="news-link">Read →</a>
            </div>
        </div>
    `).join('');

    mainContent.classList.remove('hidden');
}