/**
 * Data Manager
 * Handles local storage and data logic
 */
class DataManager {
    constructor() {
        this.STORAGE_KEY = 'inflation_app_items';
        this.items = this.loadItems();

        // Mock Database of Korean Daily Necessities Prices (Won)
        // Data Source: User Provided Reports (Comprehensive)
        this.PRICE_DB = {
            // ================= 곡물/가공 =================
            '쌀': { current: 4800, prev: 4900, unit: '1kg' },
            '밀가루': { current: 1800, prev: 1600, unit: '1kg' },
            '부침가루': { current: 2400, prev: 2200, unit: '1kg' },
            '국수': { current: 1500, prev: 1400, unit: '1봉(900g)' },
            '라면': { current: 920, prev: 850, unit: '1봉지' },
            '컵라면': { current: 1200, prev: 1100, unit: '1개' },
            '식빵': { current: 3200, prev: 2800, unit: '1봉' },
            '시리얼': { current: 6500, prev: 6000, unit: '1팩(500g)' },
            '떡국떡': { current: 4500, prev: 4000, unit: '1kg' },

            // ================= 정육/계란 =================
            '소고기(국산)': { current: 12000, prev: 11000, unit: '100g' },
            '소고기(수입)': { current: 3500, prev: 3200, unit: '100g' },
            '돼지고기(삼겹살)': { current: 2400, prev: 2600, unit: '100g' },
            '돼지고기(목살)': { current: 2200, prev: 2400, unit: '100g' },
            '닭고기': { current: 6500, prev: 6000, unit: '1kg' },
            '계란': { current: 580, prev: 550, unit: '1알' },
            '햄': { current: 4500, prev: 4200, unit: '1캔(200g)' },
            '소시지': { current: 3500, prev: 3200, unit: '1봉' },

            // ================= 수산물 =================
            '고등어': { current: 4500, prev: 4200, unit: '1마리' },
            '오징어': { current: 5000, prev: 4500, unit: '1마리' },
            '갈치': { current: 8000, prev: 7500, unit: '1마리' },
            '명태': { current: 3500, prev: 3200, unit: '1마리' },
            '멸치': { current: 4000, prev: 3800, unit: '1봉(국물용)' },
            '김': { current: 5000, prev: 4500, unit: '1속(100장)' },
            '미역': { current: 3000, prev: 2800, unit: '1봉' },
            '참치캔': { current: 2800, prev: 2500, unit: '1캔(150g)' },

            // ================= 채소/과일 =================
            '무': { current: 2500, prev: 2000, unit: '1개' },
            '배추': { current: 4500, prev: 3500, unit: '1포기' },
            '양파': { current: 1200, prev: 900, unit: '1개' },
            '파': { current: 2800, prev: 2500, unit: '1단' },
            '마늘': { current: 11000, prev: 10000, unit: '1kg' },
            '고추': { current: 1800, prev: 1500, unit: '1봉(100g)' },
            '오이': { current: 1500, prev: 1000, unit: '1개' },
            '상추': { current: 1200, prev: 1000, unit: '1봉(100g)' },
            '콩나물': { current: 1500, prev: 1400, unit: '1봉' },
            '두부': { current: 1600, prev: 1500, unit: '1모' },
            '사과': { current: 3200, prev: 2800, unit: '1개' },
            '배': { current: 4000, prev: 3500, unit: '1개' },
            '바나나': { current: 4500, prev: 4200, unit: '1송이' },
            '귤': { current: 6000, prev: 5500, unit: '1kg' },
            '포도': { current: 8000, prev: 7500, unit: '1kg' },

            // ================= 양념/오일 =================
            '설탕': { current: 2500, prev: 2300, unit: '1kg' },
            '소금': { current: 3500, prev: 3200, unit: '1kg' },
            '간장': { current: 6000, prev: 5800, unit: '1병(900ml)' },
            '식초': { current: 2000, prev: 1800, unit: '1병(900ml)' },
            '된장': { current: 5500, prev: 5200, unit: '1통(500g)' },
            '고추장': { current: 7500, prev: 7200, unit: '1통(500g)' },
            '식용유': { current: 5500, prev: 5000, unit: '1병(500ml)' },
            '참기름': { current: 8000, prev: 7500, unit: '1병(320ml)' },
            '케찹': { current: 2800, prev: 2600, unit: '1병' },
            '마요네즈': { current: 4200, prev: 3900, unit: '1병' },

            // ================= 간식/음료 =================
            '우유': { current: 2950, prev: 2800, unit: '1팩(1L)' },
            '치즈': { current: 5500, prev: 5200, unit: '1팩(10매)' },
            '요구르트': { current: 500, prev: 450, unit: '1병' },
            '생수': { current: 700, prev: 700, unit: '1병(500ml)' },
            '콜라': { current: 2200, prev: 2000, unit: '1캔' },
            '사이다': { current: 2000, prev: 1800, unit: '1캔' },
            '주스': { current: 3500, prev: 3200, unit: '1병(1.5L)' },
            '커피': { current: 4500, prev: 4500, unit: '1잔' },
            '과자': { current: 1700, prev: 1500, unit: '1봉지' },
            '스낵': { current: 1500, prev: 1300, unit: '1봉지' },
            '초콜릿': { current: 1200, prev: 1000, unit: '1개(50g)' },
            '아이스크림': { current: 1200, prev: 1000, unit: '1개' },
            '껌': { current: 500, prev: 500, unit: '1통' },
            '맥주': { current: 2900, prev: 2800, unit: '1캔' },
            '소주': { current: 1900, prev: 1800, unit: '1병' },
            '치킨': { current: 23000, prev: 22000, unit: '1마리' },

            // ================= 생활용품 =================
            '휴지': { current: 950, prev: 900, unit: '1롤' },
            '물티슈': { current: 2000, prev: 1800, unit: '1팩' },
            '샴푸': { current: 12000, prev: 11000, unit: '1통' },
            '린스': { current: 12000, prev: 11000, unit: '1통' },
            '비누': { current: 1500, prev: 1300, unit: '1개' },
            '치약': { current: 3000, prev: 2800, unit: '1개' },
            '세제': { current: 15000, prev: 14000, unit: '1통(3L)' },
            '휘발유': { current: 1680, prev: 1720, unit: '1L' }
        };
    }

    loadItems() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    saveItems() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
    }

    addItem(item) {
        this.items.push({
            id: Date.now(),
            ...item
        });
        this.saveItems();
    }

    deleteItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveItems();
    }

    getRecommendedPrice(name) {
        // 1. Check strict/partial match in DB
        for (const [key, val] of Object.entries(this.PRICE_DB)) {
            if (name.includes(key)) return { ...val, source: 'db' };
        }

        // 2. No Fallback (User requested exact list only)
        return null;
    }

    calculateStats() {
        let currentTotal = 0;
        let prevTotal = 0;

        this.items.forEach(item => {
            currentTotal += item.price * item.quantity;
            prevTotal += item.prevPrice * item.quantity;
        });

        const inflationRate = prevTotal === 0 ? 0 : ((currentTotal - prevTotal) / prevTotal) * 100;

        return {
            totalSpend: currentTotal,
            inflationRate: inflationRate.toFixed(1),
            nationalCPI: 2.1 // Calculated from provided CSV (117.42 vs 114.91)
        };
    }

    mockUpdatePrices() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.items = this.items.map(item => {
                    const dbPrice = this.getRecommendedPrice(item.name);
                    let newPrice, prevPrice;

                    if (dbPrice) {
                        // If in DB, drift towards the "Real" market price + random daily fluctuation
                        // We assume the user inputted price might be outdated, so we update "Current" to DB current
                        // and shift the old Current to Prev (simulating time passing)
                        prevPrice = item.price;
                        // Add some volatility to the DB price so it's not always static
                        const volatility = (Math.random() * 0.05) - 0.02; // +/- 2%
                        newPrice = Math.floor(dbPrice.current * (1 + volatility));
                    } else {
                        // Fallback for unknown items: pure simulated inflation
                        prevPrice = item.price;
                        // Random high inflation (0% to +5%)
                        newPrice = Math.floor(item.price * (1 + Math.random() * 0.05));
                    }

                    return {
                        ...item,
                        prevPrice: prevPrice,
                        price: newPrice
                    };
                });
                this.saveItems();
                resolve();
            }, 1500);
        });
    }
}

/**
 * Chart Manager
 * Handles Chart.js rendering
 */
class ChartManager {
    constructor(canvasId) {
        this.ctx = document.getElementById(canvasId).getContext('2d');
        this.chart = null;
    }

    init() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.5)');
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0.0)');

        this.chart = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: ['5개월 전', '4개월 전', '3개월 전', '2개월 전', '지난달', '이번달'],
                datasets: [{
                    label: '내 장바구니 물가 (예상 추이)',
                    data: [0, 0, 0, 0, 0, 0],
                    borderColor: '#8b5cf6',
                    backgroundColor: gradient,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#8b5cf6',
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(20, 20, 30, 0.9)',
                        titleColor: '#a78bfa',
                        bodyColor: '#fff',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#94a3b8' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#94a3b8' }
                    }
                },
                interaction: { intersect: false, mode: 'index' },
            }
        });
    }

    update(currentTotal, prevTotal) {
        const data = [];
        const diff = currentTotal - prevTotal;

        for (let i = 5; i >= 0; i--) {
            const val = currentTotal - (diff * i);
            const noise = (Math.random() * diff * 0.2) * (i === 0 ? 0 : 1);
            data.unshift(Math.floor(val + noise));
        }

        data[5] = currentTotal;
        data[4] = prevTotal;
        const step = (prevTotal * 0.98) - (prevTotal * 0.95);
        data[3] = Math.floor(prevTotal - step * 2);
        data[2] = Math.floor(prevTotal - step * 5);
        data[1] = Math.floor(prevTotal - step * 6);
        data[0] = Math.floor(prevTotal - step * 8);

        this.chart.data.datasets[0].data = data;
        this.chart.update();
    }
}

/**
 * UI Manager
 * Handles DOM updates
 */
class UIManager {
    constructor() {
        this.inflationDisplay = document.getElementById('inflation-rate-display');
        this.spendDisplay = document.getElementById('total-spend-display');
        this.itemsList = document.getElementById('items-list');
        this.modal = document.getElementById('item-modal');
    }

    updateDashboard(stats) {
        const rate = parseFloat(stats.inflationRate);
        this.inflationDisplay.textContent = `${rate > 0 ? '+' : ''}${rate}%`;

        this.inflationDisplay.className = 'card-value';
        if (rate > 0) this.inflationDisplay.classList.add('high');
        else if (rate < 0) this.inflationDisplay.style.color = '#2dd4bf';
        else this.inflationDisplay.style.color = 'white';

        // Add National CPI Comparison context
        const cpiDiff = (rate - stats.nationalCPI).toFixed(1);
        const subText = document.querySelector('#inflation-card .card-sub');
        if (subText) {
            subText.innerHTML = `공식 물가(${stats.nationalCPI}%)보다 <strong style="color: ${cpiDiff > 0 ? '#f43f5e' : '#2dd4bf'}">${cpiDiff > 0 ? '+' : ''}${cpiDiff}%p</strong> ${cpiDiff > 0 ? '높음' : '낮음'}`;
        }

        this.spendDisplay.textContent = `${stats.totalSpend.toLocaleString()} KRW`;
    }

    renderItems(items, onDelete) {
        this.itemsList.innerHTML = '';

        if (items.length === 0) {
            this.itemsList.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <i data-lucide="shopping-basket" style="width: 48px; height: 48px; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <p>등록된 품목이 없습니다.<br>오른쪽 상단 '품목 추가' 버튼을 눌러보세요.</p>
                </div>
            `;
        } else {
            items.forEach(item => {
                const boxTotal = item.price * (item.quantity || 1);
                const prevTotal = item.prevPrice * (item.quantity || 1);

                const diff = boxTotal - prevTotal;
                const percent = prevTotal === 0 ? 0 : ((diff / prevTotal) * 100).toFixed(1);
                const isUp = diff > 0;

                const card = document.createElement('div');
                card.className = 'card item-card glass';
                card.innerHTML = `
                    <div class="item-info">
                        <div class="item-name">${item.name}</div>
                        <div style="font-size: 0.85rem; color: #9ca3af;">${item.quantity}개 × ${parseInt(item.price).toLocaleString()}원</div>
                    </div>
                    <div class="item-price">${boxTotal.toLocaleString()}원</div>
                    <div style="margin-top: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
                        <span class="item-change" style="color: ${isUp ? '#f43f5e' : '#2dd4bf'}">
                            ${isUp ? '▲' : '▼'} ${Math.abs(diff).toLocaleString()}원 (${percent}%)
                        </span>
                        <button class="delete-btn icon-btn" style="width: 32px; height: 32px; padding: 0.2rem;">
                            <i data-lucide="trash-2" style="width: 16px;"></i>
                        </button>
                    </div>
                `;

                const deleteBtn = card.querySelector('.delete-btn');
                deleteBtn.addEventListener('click', () => onDelete(item.id));

                this.itemsList.appendChild(card);
            });
        }

        if (window.lucide) lucide.createIcons();
    }

    toggleModal(show) {
        if (show) this.modal.classList.remove('hidden');
        else this.modal.classList.add('hidden');
    }

    switchTab(tabId) {
        document.querySelectorAll('.view-section').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.nav-links li').forEach(el => el.classList.remove('active'));

        if (tabId === 'dashboard') {
            document.getElementById('view-dashboard').style.display = 'block';
            document.getElementById('nav-dashboard').parentElement.classList.add('active');
        } else {
            document.getElementById('view-items').style.display = 'block';
            document.getElementById('nav-items').parentElement.classList.add('active');
        }
    }
}

/**
 * App Main Event Controller
 */
class App {
    constructor() {
        this.dataManager = new DataManager();
        this.uiManager = new UIManager();
        this.chartManager = new ChartManager('trendChart');
    }

    init() {
        this.chartManager.init();
        this.refreshUI();
        this.bindEvents();
        if (window.lucide) lucide.createIcons();
    }

    refreshUI() {
        const stats = this.dataManager.calculateStats();
        this.uiManager.updateDashboard(stats);

        let currentTotal = stats.totalSpend;
        let prevTotal = 0;
        this.dataManager.items.forEach(i => prevTotal += i.prevPrice * i.quantity);

        this.chartManager.update(currentTotal, prevTotal);

        this.uiManager.renderItems(this.dataManager.items, (id) => {
            if (confirm('정말 삭제하시겠습니까?')) {
                this.dataManager.deleteItem(id);
                this.refreshUI();
            }
        });
    }

    bindEvents() {
        document.getElementById('nav-dashboard').addEventListener('click', (e) => {
            e.preventDefault();
            this.uiManager.switchTab('dashboard');
        });

        document.getElementById('nav-items').addEventListener('click', (e) => {
            e.preventDefault();
            this.uiManager.switchTab('items');
        });

        document.getElementById('add-item-btn').addEventListener('click', () => {
            this.uiManager.toggleModal(true);
        });

        document.getElementById('close-modal').addEventListener('click', () => {
            this.uiManager.toggleModal(false);
        });

        document.getElementById('item-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('item-name').value;
            // ... (rest of logic)
        });

        // Auto-fill price based on name input
        document.getElementById('item-name').addEventListener('input', (e) => {
            const val = e.target.value;
            if (val.length < 1) return;

            const rec = this.dataManager.getRecommendedPrice(val);
            const hint = document.querySelector('#item-form .hint');

            if (rec) {
                document.getElementById('item-price').value = rec.current;
                document.getElementById('item-prev-price').value = rec.prev;
                hint.textContent = `✅ [${rec.unit} 기준] 데이터베이스 가격을 찾았습니다.`;
                hint.style.color = '#4ade80';
                updateTotalCalc();
            } else {
                // No match logic
                hint.textContent = '직접 가격을 입력해주세요 (목록에 없는 품목)';
                hint.style.color = 'var(--text-secondary)';
            }
        });

        document.getElementById('item-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('item-name').value;
            const price = parseInt(document.getElementById('item-price').value);
            const prevPrice = parseInt(document.getElementById('item-prev-price').value);
            const quantity = parseInt(document.getElementById('item-qty').value);

            this.dataManager.addItem({ name, price, prevPrice, quantity });
            this.uiManager.toggleModal(false);
            e.target.reset();
            this.refreshUI();
        });

        document.getElementById('refresh-all-btn').addEventListener('click', async () => {
            const btn = document.getElementById('refresh-all-btn');
            const icon = btn.querySelector('i');

            icon.style.animation = 'spin 2s linear infinite';
            btn.disabled = true;

            await this.dataManager.mockUpdatePrices();

            icon.style.animation = '';
            btn.disabled = false;

            this.refreshUI();
            alert('최신 가격 정보를 업데이트했습니다! (Agent Mock)');
        });
    }
}

// Add spin animation dynamically
const style = document.createElement('style');
style.innerHTML = `
@keyframes spin { 100% { transform: rotate(360deg); } }
`;
document.head.appendChild(style);

// Start App
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});
