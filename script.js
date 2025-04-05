/* styles.css */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}

:root {
    --primary-color: #3498db;
    --secondary-color: #2980b9;
    --background-color: #f5f5f5;
    --card-color: #ffffff;
    --text-color: #333333;
    --tab-active-color: #3498db;
    --tab-inactive-color: #dddddd;
    --positive-color: #2ecc71;
    --negative-color: #e74c3c;
}

body {
    font-family: 'Arial', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    overflow-x: hidden;
    touch-action: manipulation;
}

.container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    min-height: 100vh;
}

.header {
    text-align: center;
    margin-bottom: 20px;
    padding-top: 10px;
}

.tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.tab {
    padding: 15px 20px;
    cursor: pointer;
    background-color: var(--tab-inactive-color);
    transition: all 0.3s;
    font-weight: bold;
    text-align: center;
    flex: 1;
    font-size: 14px;
}

.tab.active {
    background-color: var(--tab-active-color);
    color: white;
}

.tab-content {
    display: none;
    background-color: var(--card-color);
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
}

.tab-content.active {
    display: block;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    font-size: 14px;
}

input, select {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
}

.amount-input {
    position: relative;
}

.amount-input input {
    padding-left: 50px;
    font-size: 20px;
    text-align: right;
}

.currency-symbol {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    color: #777;
}

.keypad {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 15px;
}

.keypad button {
    padding: 15px;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    background-color: #f0f0f0;
    cursor: pointer;
    transition: all 0.2s;
}

.keypad button:hover {
    background-color: #e0e0e0;
}

.keypad button.clear {
    grid-column: span 2;
    background-color: var(--negative-color);
    color: white;
}

.convert-btn {
    width: 100%;
    padding: 15px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.2s;
}

.result {
    margin-top: 20px;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 8px;
    text-align: center;
    font-size: 16px;
}

.exchange-rates-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
    font-size: 14px;
}

.exchange-rates-table th, 
.exchange-rates-table td {
    padding: 10px;
    text-align: center;
    border: 1px solid #ddd;
}

.exchange-rates-table th {
    background-color: var(--primary-color);
    color: white;
}

.stock-market {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
    margin-top: 15px;
}

.stock-card {
    background-color: white;
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    border-left: 4px solid var(--primary-color);
}

.up { color: var(--positive-color); }
.down { color: var(--negative-color); }

@media (max-width: 600px) {
    .container { padding: 10px; }
    .tab { padding: 12px 10px; font-size: 12px; }
    .tab-content { padding: 15px; }
    .stock-market { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 400px) {
    .stock-market { grid-template-columns: 1fr; }
}
