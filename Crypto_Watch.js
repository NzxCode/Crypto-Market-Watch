const container = document.getElementById('container');
let dataGlobal = [];

async function ambilData() {
    try {
        let response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=idr&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        
        if (!response.ok) {
            throw new Error('Gagal mengambil data');
        }

        dataGlobal = await response.json();
        renderData(dataGlobal);

    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<h2 style="color:red; text-align:center;">Gagal mengambil data! Cek API/Internet.</h2>';
    }
}

function renderData(data) {
    if (data.length === 0) {
        container.innerHTML = '<p style="text-align:center;">Data tidak ditemukan.</p>';
        return;
    }

    let htmlArray = data.map(coin => {
        let hargaFormat = coin.current_price.toLocaleString('id-ID');
        
        return `
            <div class="card">
                <img src="${coin.image}" alt="${coin.name}">
                <h3>${coin.name}</h3>
                <span class="symbol">${coin.symbol}</span>
                <p class="price">Rp ${hargaFormat}</p>
            </div>
        `;
    });
    container.innerHTML = htmlArray.join('');
}

const inputSearch = document.getElementById('inputSearch');
inputSearch.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredData = dataGlobal.filter(coin => {
        return coin.name.toLowerCase().includes(searchString);
    });
    renderData(filteredData);
});

ambilData();