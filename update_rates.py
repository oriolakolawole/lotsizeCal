import requests
import json
import os
from datetime import datetime

def get_usd_exchange_rates(api_key):
    """
    Get live exchange rates for USD to 7 major currencies
    
    Args:
        api_key (str): Your exchangerate.host API key
    
    Returns:
        dict: Exchange rates in your desired format
    """
    url = "https://api.exchangerate.host/live"
    
    params = {
        "access_key": api_key,
        "source": "USD",
        "currencies": "EUR,GBP,JPY,AUD,CAD,CHF,NZD"
    }
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        
        # Check if request was successful
        if not data.get("success", False):
            error_info = data.get("error", {}).get("info", "Unknown error")
            raise Exception(f"API Error: {error_info}")
        
        # Extract rates from quotes and format
        quotes = data.get("quotes", {})
        rates = {}
        
        for quote_key, rate_value in quotes.items():
            # Remove USD prefix (e.g., "USDEUR" -> "EUR")
            currency = quote_key[3:]  # Remove first 3 characters (USD)
            rates[currency] = rate_value
        
        # Get current date from timestamp
        timestamp = data.get("timestamp", 0)
        current_date = datetime.fromtimestamp(timestamp).strftime("%Y-%m-%d")
        
        # Return in your desired format
        return {
            "base": "USD",
            "date": current_date,
            "rates": rates
        }
        
    except requests.exceptions.RequestException as e:
        raise Exception(f"Request failed: {str(e)}")
    except Exception as e:
        raise Exception(f"Error: {str(e)}")

# Usage
if __name__ == "__main__":
    # Replace with your actual API key
    API_KEY = os.getenv("MY_API_KEY")
    
    try:
        exchange_rates = get_usd_exchange_rates(API_KEY)
        
        # Save to exchangeRates.json file
        with open("exchangeRates.json", "w") as file:
            json.dump(exchange_rates, file, indent=2)
        
        print("Exchange rates saved to exchangeRates.json")
        
    except Exception as e:
        print(f"Failed to get exchange rates: {e}")

