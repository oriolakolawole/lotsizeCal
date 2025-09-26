// Load manually updated Forex exchange rates
let rates = {};

fetch('exchangeRates.json')
    .then(res => res.json())
    .then(data => { rates = data.rates; })
    .catch(err => console.error("Error loading exchange rates:", err));

// Commodity lot sizes and pip sizes
let commodities = {
    "XAUUSD": { lotSize: 100, pipSize: 0.01 },   // Gold
    "XAGUSD": { lotSize: 5000, pipSize: 0.01 },  // Silver
    "WTI": { lotSize: 1000, pipSize: 0.01 },     // Crude Oil
    "BRENT": { lotSize: 1000, pipSize: 0.01 }    // Brent Oil
};

// Indices lot sizes and point/pip sizes (Exness values)
let indices = {
    "US30": { lotSize: 1, pipSize: 1 },
    "NASDAQ": { lotSize: 1, pipSize: 0.1 },
    "SPX50": { lotSize: 1, pipSize: 0.1 },
    "GER40": { lotSize: 1, pipSize: 1.16649 },
    "UK100": { lotSize: 1, pipSize: 1.16631 }
};

// Crypto lot sizes and pip sizes (Exness values)
let crypto = {
    "BTCUSD": { lotSize: 1, pipSize: 0.1 },
    "ETHUSD": { lotSize: 1, pipSize: 0.1 }
};

const assetSelect = document.getElementById('asset');

document.getElementById("calculateBtn").addEventListener("click", () => {
    let asset = assetSelect.value;
    let balance = parseFloat(document.getElementById('balance').value);
    let riskPercent = parseFloat(document.getElementById('risk').value);
    let stopLoss = parseFloat(document.getElementById('stoploss').value);
    let spread = parseFloat(document.getElementById('spread').value);
    let commission = parseFloat(document.getElementById('commission').value);

    // Validate inputs
    if(isNaN(balance) || balance <= 0 ||
       isNaN(riskPercent) || riskPercent <= 0 ||
       isNaN(stopLoss) || stopLoss <= 0 ||
       isNaN(spread) || spread < 0 ||
       isNaN(commission) || commission < 0) {
        alert("Please enter valid positive numbers. Spread and commission can be zero.");
        return;
    }

    let pipValueUSD;

    if(asset in commodities) {
        // Commodity pip value
        pipValueUSD = commodities[asset].lotSize * commodities[asset].pipSize;
    } else if(asset in indices) {
        // Index pip/point value (Exness)
        pipValueUSD = indices[asset].lotSize * indices[asset].pipSize;
    } else if(asset in crypto) {
        // Crypto pip value (Exness)
        pipValueUSD = crypto[asset].lotSize * crypto[asset].pipSize;
    } else {
        // Forex calculation
        let pipSize = asset.endsWith("JPY") ? 0.01 : 0.0001;
        let lotSizeUnits = 100000;
        let quote = asset.slice(3,6);

        if(quote === 'USD') {
            pipValueUSD = pipSize * lotSizeUnits;
        } else if(quote === 'JPY') {
            pipValueUSD = (pipSize * lotSizeUnits) / rates[quote];
        } else {
            pipValueUSD = pipSize * lotSizeUnits * (1 / rates[quote]);
        }
    }

    // Total stop loss including spread
    let totalStopLoss = stopLoss + spread;

    // Risk in USD
    let riskAmount = (riskPercent / 100) * balance;

    // Lot size calculation
    let lotSize = riskAmount / (totalStopLoss * pipValueUSD + commission);
    lotSize = lotSize.toFixed(2);
    pipValueUSD = pipValueUSD.toFixed(5);

    // Broker note for clarity
    let brokerNote = (asset in indices || asset in crypto) ? " (Exness pip value)" : "";

    document.getElementById('result').innerText =
        `Recommended Lot Size: ${lotSize} lots\nPip Value: $${pipValueUSD} per pip${brokerNote}`;
});
