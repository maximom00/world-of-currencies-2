// script.js
const exchangeRates = {
    USD: { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 151.50, SAR: 3.75, AED: 3.67, EGP: 47.50 },
    EUR: { USD: 1.09, EUR: 1, GBP: 0.86, JPY: 164.50, SAR: 4.08, AED: 4.00, EGP: 51.60 },
    GBP: { USD: 1.27, EUR: 1.16, GBP: 1, JPY: 191.20, SAR: 4.75, AED: 4.65, EGP: 60.00 },
    JPY: { USD: 0.0066, EUR: 0.0061, GBP: 0.0052, JPY: 1, SAR: 0.025, AED: 0.024, EGP: 0.31 },
    SAR: { USD: 0.27, EUR: 0.25, GBP: 0.21, JPY: 40.20, SAR: 1, AED: 0.98, EGP: 12.67 },
    AED: { USD: 0.27, EUR: 0.25, GBP: 0.21, JPY: 41.20, SAR: 1.02, AED: 1, EGP: 12.95 },
    EGP: { USD: 0.021, EUR: 0.019, GBP: 0.017, JPY: 3.20, SAR: 0.079, AED: 0.077, EGP: 1 }
};

const stockData = {
    global: [
        { name: "S&P 500", price: 5218.75, change: 0.42, symbol: "SPX" },
        { name: "NASDAQ", price: 16341.32, change: 0.67, symbol: "IXIC" },
        { name: "Dow Jones", price: 39312.24, change: 0.28, symbol: "DJI" }
    ],
    arabic: [
        { name: "تداول السعودي", price: 12245.67, change: 1.15, symbol: "TASI" },
        { name: "DFM", price: 4231.56, change: 0.83, symbol: "DFMGI" },
        { name: "مصر", price: 25678.90, change: -0.32, symbol: "EGX30" }
    ],
    commodities: [
        { name: "الذهب", price: 2314.50, change: -0.35, symbol: "XAU", unit: "أونصة" },
        { name: "النفط (برنت)", price: 85.72, change: 1.24, symbol: "BZ", unit: "برميل" }
    ]
};

const currencySymbols = {
    USD: "$", EUR: "€", GBP: "£", JPY: "¥", 
    SAR: "ر.س", AED: "د.إ", EGP: "ج.م"
};

const currencyNames = {
    USD: "الدولار الأمريكي", EUR: "اليورو", GBP: "الجنيه الإسترليني",
    JPY: "الين الياباني", SAR: "الريال السعودي", AED: "الدرهم الإماراتي",
    EGP: "الجنيه المصري"
};

function openTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
    
    if (tabId === 'exchange-rates') updateExchangeRatesTable();
    if (tabId === 'stock-market') updateStockMarketData();
}

function updateCurrencySymbol() {
    const fromCurrency = document.getElementById('from').value;
    document.getElementById('from-symbol').textContent = currencySymbols[fromCurrency];
}

function appendNumber(number) {
    const amountInput = document.getElementById('amount');
    amountInput.value = amountInput.value === '0' ? number : amountInput.value + number;
}

function appendDecimal() {
    const amountInput = document.getElementById('amount');
    if (!amountInput.value.includes('.')) amountInput.value += '.';
}

function clearAmount() {
    document.getElementById('amount').value = '0';
}

function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from').value;
    const toCurrency = document.getElementById('to').value;
    const resultDiv = document.getElementById('result');
    
    if (isNaN(amount)) {
        resultDiv.innerHTML = '<div style="color: var(--negative-color);">الرجاء إدخال مبلغ صحيح</div>';
        return;
    }
    
    if (amount <= 0) {
        resultDiv.innerHTML = '<div style="color: var(--negative-color);">الرجاء إدخال مبلغ أكبر من الصفر</div>';
        return;
    }
    
    if (fromCurrency === toCurrency) {
        resultDiv.innerHTML = `
            <div style="font-size: 18px; margin-bottom: 8px;">${amount.toFixed(2)} ${fromCurrency} = ${amount.toFixed(2)} ${toCurrency}</div>
            <div style="color: #777; font-size: 14px;">نفس العملة - لا يوجد تحويل</div>
        `;
        return;
    }
    
    const rate = exchangeRates[fromCurrency][toCurrency];
    const convertedAmount = (amount * rate).toFixed(2);
    
    resultDiv.innerHTML = `
        <div style="font-size: 18px; margin-bottom: 8px;">${amount.toFixed(2)} ${fromCurrency} = ${convertedAmount} ${toCurrency}</div>
        <div style="color: #777; font-size: 14px;">سعر الصرف: 1 ${fromCurrency} = ${rate.toFixed(6)} ${toCurrency}</div>
    `;
}

function updateExchangeRatesTable() {
    const baseCurrency = document.getElementById('base-currency').value;
    const tableBody = document.getElementById('rates-table-body');
    tableBody.innerHTML = '';
    
    const displayCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'SAR', 'AED', 'EGP'];
    
    displayCurrencies.forEach(currency => {
        if (currency !== baseCurrency) {
            const rate = exchangeRates[baseCurrency][currency];
            const change24h = (Math.random() * 2 - 1).toFixed(2);
            const changeClass = change24h >= 0 ? 'up' : 'down';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${currencyNames[currency]} (${currency})</td>
                <td>${rate.toFixed(6)}</td>
                <td class="${changeClass}">${change24h >= 0 ? '+' : ''}${change24h}%</td>
            `;
            tableBody.appendChild(row);
        }
    });
}

function updateStockMarketData() {
    renderStockCards('global-indices', stockData.global);
    renderStockCards('arabic-indices', stockData.arabic);
    renderStockCards('commodities', stockData.commodities);
}

function renderStockCards(containerId, stocks) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    stocks.forEach(stock => {
        const changeClass = stock.change >= 0 ? 'up' : 'down';
        const card = document.createElement('div');
        card.className = `stock-card ${changeClass}`;
        card.innerHTML = `
            <div class="stock-name">${stock.name} (${stock.symbol})</div>
            <div class="stock-price">${stock.price.toLocaleString()}${stock.unit ? ' ' + stock.unit : ''}</div>
            <div class="stock-change ${changeClass}">${stock.change >= 0 ? '+' : ''}${stock.change}%</div>
        `;
        container.appendChild(card);
    });
}

window.onload = function() {
    updateCurrencySymbol();
    updateExchangeRatesTable();
    updateStockMarketData();
    
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    });
};