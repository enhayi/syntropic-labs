/**
 * Syntropic Labs — Real-Time Microstructure Telemetry Engine
 * Generates live tick-level feeds, order book imbalance shifts,
 * and high-precision execution latency telemetry.
 */

(function () {
  const tickerItems = [
    { id: 'tick-btc', symbol: 'BTC/USD', price: 94824.50, change: 1.84, spread: 0.10, ofi: 0.24 },
    { id: 'tick-eth', symbol: 'ETH/USD', price: 3418.20, change: 2.15, spread: 0.15, ofi: 0.18 },
    { id: 'tick-sol', symbol: 'SOL/USD', price: 198.75, change: 4.32, spread: 0.35, ofi: 0.42 },
    { id: 'tick-vix', symbol: 'IMPLIED_VOL_30D', price: 54.2, change: -1.2, isIndex: true },
    { id: 'tick-latency', symbol: 'CLUSTER_LATENCY', val: '0.38μs', status: 'LOCKED' },
    { id: 'tick-sharpe', symbol: 'SHARPE_LTM', val: '3.84', status: 'NET' }
  ];

  function updateTicker() {
    // Randomly select one asset to perturb slightly
    const idx = Math.floor(Math.random() * 3);
    const item = tickerItems[idx];
    const delta = (Math.random() - 0.48) * (item.price * 0.0003);
    item.price += delta;
    item.ofi = Math.max(-0.9, Math.min(0.9, item.ofi + (Math.random() - 0.5) * 0.08));

    const elements = document.querySelectorAll('.' + item.id + ', #' + item.id);
    elements.forEach(el => {
      const priceStr = item.price > 1000 
        ? item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : item.price.toFixed(2);
      
      const ofiSign = item.ofi >= 0 ? '+' : '';
      const ofiClass = item.ofi >= 0 ? 'text-emerald-400' : 'text-rose-400';

      el.innerHTML = `
        <span class="text-slate-400 font-mono">${item.symbol}:</span>
        <span class="font-mono text-white font-medium">$${priceStr}</span>
        <span class="text-xs font-mono ${item.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}">▲ +${item.change}%</span>
        <span class="text-xs font-mono text-slate-500">| OFI: <span class="${ofiClass}">${ofiSign}${item.ofi.toFixed(2)}</span></span>
      `;
    });

    // Occasionally perturb latency metric
    const latencyElements = document.querySelectorAll('.tick-latency-val, #tick-latency-val');
    if (latencyElements.length && Math.random() > 0.6) {
      const lat = (0.35 + Math.random() * 0.09).toFixed(2);
      latencyElements.forEach(el => {
        el.textContent = lat + 'μs';
      });
    }
  }

  setInterval(updateTicker, 850);
})();
