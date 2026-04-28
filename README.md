# Lot Size Calculator

A web-based trading tool that calculates the correct position size for any trade based on your account balance, risk percentage, and stop-loss.

**[Live Demo](https://oriolakolawole.github.io/lotsizeCal)**

---

## What It Does

Position sizing is one of the most critical aspects of risk management in trading. This calculator takes three inputs and instantly tells you the correct lot size to use so you never risk more than your defined percentage per trade.

$$\text{Lot Size} = \frac{\text{Account Balance} \times \text{Risk \%}}{\text{Stop Loss (pips)} \times \text{Pip Value}}$$

Exchange rates are fetched and stored in `exchangeRates.json`, so the calculator works correctly regardless of the instrument being traded.

---

## Features

- **Instant lot size calculation** based on account balance, risk %, and stop-loss
- **Multiple instrument support** via periodically updated exchange rates
- **Clean web interface** : works in any browser, no installation needed
- **Automated rate updates** via a Python backend script and GitHub Actions

---

## How to Use

1. Enter your **account balance** and select your account currency
2. Enter your **risk percentage** (e.g. 1%)
3. Enter your **stop-loss in pips**
4. Select your **trading instrument**
5. The correct lot size is calculated instantly

---

## Local Setup

```bash
# Clone the repository
git clone https://github.com/oriolakolawole/lotsizeCal.git
cd lotsizeCal

# Install Python dependencies (for rate updates)
pip install -r requirements.txt

# Open the calculator in your browser
open index.html
```

No build step required — it runs directly in the browser.

---

## Exchange Rate Updates

Exchange rates are maintained in `exchangeRates.json` and updated automatically via a **GitHub Actions** workflow that runs `update_rates.py` on a schedule.

To update rates manually:

```bash
python update_rates.py
```

---

## Dependencies

| File | Purpose |
|---|---|
| `index.html` | Main calculator UI |
| `script.js` | Calculation logic and dynamic UI |
| `style.css` | Styling and layout |
| `exchangeRates.json` | Cached exchange rates for multiple pairs support |
| `update_rates.py` | Python script to fetch and refresh exchange rates |
| `requirements.txt` | Python dependencies for `update_rates.py` |
| `.github/workflows` | GitHub Actions for automated rate updates |

---

## Repository Structure

```
.
├── index.html               # Web calculator frontend
├── script.js                # Calculator logic
├── style.css                # Styles
├── exchangeRates.json       # Exchange rate data
├── update_rates.py          # Rate update script
├── requirements.txt         # Python dependencies
└── .github/
    └── workflows/           # Automated rate update pipeline
```

---

## Disclaimer

This tool is for **educational and personal use only** and does not constitute financial advice. Always apply your own risk management judgment when trading.
