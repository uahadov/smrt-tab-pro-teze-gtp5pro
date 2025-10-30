document.addEventListener("DOMContentLoaded", () => {
  // Element Seçimi
  const elements = {
    settingsBtn: document.getElementById("settingsBtn"),
    settingsPanel: document.querySelector(".settings-panel"),
    closeSettings: document.getElementById("closeSettings"),
    themeSelector: document.getElementById("themeSelector"),
    customColorPicker: document.getElementById("customColorPicker"),
    customColorSection: document.getElementById("customColorSection"),
    socialMedia: document.querySelector(".social-media"),
    aiTools: document.querySelector(".ai-tools"),
    searchInput: document.getElementById("searchInput"),
    toggleBtn: document.getElementById("toggleBtn"),
    customName: document.getElementById("customName"),
    customUrl: document.getElementById("customUrl"),
    customCategory: document.getElementById("customCategory"),
    addCustom: document.getElementById("addCustom"),
    removeLinkBtn: document.getElementById("removeLinkBtn"),
    bgUpload: document.getElementById("bgUpload"),
    removeBgBtn: document.getElementById("removeBgBtn"),
    location: document.getElementById("location"),
    date: document.getElementById("date"),
    time: document.getElementById("time"),
    temperature: document.getElementById("temperature"),
    humidity: document.getElementById("humidity"),
    weather: document.getElementById("weather"),
    newsData: document.getElementById("newsData"),
    quoteText: document.getElementById("quoteText"),
    quoteAuthor: document.getElementById("quoteAuthor"),
    pomodoroTimer: document.getElementById("pomodoroTimer"),
    pomodoroStart: document.getElementById("pomodoroStart"),
    pomodoroReset: document.getElementById("pomodoroReset"),
    todoInput: document.getElementById("todoInput"),
    addTodo: document.getElementById("addTodo"),
    todoList: document.getElementById("todoList"),
    notesArea: document.getElementById("notesArea"),
    refreshInterval: document.getElementById("refreshInterval"),
    animationsEnabled: document.getElementById("animationsEnabled"),
    soundEnabled: document.getElementById("soundEnabled"),
    exportData: document.getElementById("exportData"),
    importData: document.getElementById("importData"),
    importFile: document.getElementById("importFile"),
    resetData: document.getElementById("resetData"),
    layoutModeBtn: document.getElementById("layoutModeBtn"),
    layoutModeToggle: document.getElementById("layoutModeToggle"),
    layoutModeIndicator: document.getElementById("layoutModeIndicator"),
    exitLayoutMode: document.getElementById("exitLayoutMode"),
    resetLayout: document.getElementById("resetLayout"),
    pomodoroWorkTime: document.getElementById("pomodoroWorkTime"),
    pomodoroBreakTime: document.getElementById("pomodoroBreakTime"),
    cryptoSelector: document.getElementById("cryptoSelector"),
    addCrypto: document.getElementById("addCrypto"),
    selectedCryptos: document.getElementById("selectedCryptos"),
    stockSelector: document.getElementById("stockSelector"),
    addStock: document.getElementById("addStock"),
    selectedStocks: document.getElementById("selectedStocks"),
    marketRefreshInterval: document.getElementById("marketRefreshInterval"),
    cryptoData: document.getElementById("cryptoData"),
    stocksData: document.getElementById("stocksData"),
    newsCount: document.getElementById("newsCount"),
    showLayoutBtn: document.getElementById("showLayoutBtn"),
  }

  let activeTab = "social"
  let draggedElement = null
  const MAX_BG_SIZE = 5 * 1024 * 1024
  let pomodoroInterval = null
  let pomodoroWorkTime = 25 * 60
  let pomodoroBreakTime = 5 * 60
  let pomodoroTime = pomodoroWorkTime
  let isPomodoroPaused = true
  let isBreakTime = false
  let todos = []
  let refreshIntervalId = null
  let marketRefreshIntervalId = null
  let selectedCryptoList = ["bitcoin", "ethereum"]
  let selectedStockList = ["BIST100", "USDTRY"]
  let isLayoutMode = false
  let isResizing = false
  let currentResizingElement = null

  // Minimum boyutlar
  const MIN_WIDTH = 150
  const MIN_HEIGHT = 120

  const cryptoOptions = [
    { id: "bitcoin", name: "Bitcoin (BTC)" },
    { id: "ethereum", name: "Ethereum (ETH)" },
    { id: "tether", name: "Tether (USDT)" },
    { id: "binancecoin", name: "BNB (BNB)" },
    { id: "ripple", name: "XRP (XRP)" },
    { id: "usd-coin", name: "USD Coin (USDC)" },
    { id: "staked-ether", name: "Lido Staked ETH (STETH)" },
    { id: "cardano", name: "Cardano (ADA)" },
    { id: "dogecoin", name: "Dogecoin (DOGE)" },
    { id: "solana", name: "Solana (SOL)" },
    { id: "matic-network", name: "Polygon (MATIC)" },
    { id: "polkadot", name: "Polkadot (DOT)" },
    { id: "wrapped-bitcoin", name: "Wrapped Bitcoin (WBTC)" },
    { id: "dai", name: "Dai (DAI)" },
    { id: "shiba-inu", name: "Shiba Inu (SHIB)" },
    { id: "avalanche-2", name: "Avalanche (AVAX)" },
    { id: "chainlink", name: "Chainlink (LINK)" },
    { id: "uniswap", name: "Uniswap (UNI)" },
    { id: "cosmos", name: "Cosmos Hub (ATOM)" },
    { id: "ethereum-classic", name: "Ethereum Classic (ETC)" },
    { id: "litecoin", name: "Litecoin (LTC)" },
    { id: "near", name: "NEAR Protocol (NEAR)" },
    { id: "algorand", name: "Algorand (ALGO)" },
    { id: "bitcoin-cash", name: "Bitcoin Cash (BCH)" },
    { id: "vechain", name: "VeChain (VET)" },
    { id: "filecoin", name: "Filecoin (FIL)" },
    { id: "apecoin", name: "ApeCoin (APE)" },
    { id: "internet-computer", name: "Internet Computer (ICP)" },
    { id: "hedera-hashgraph", name: "Hedera (HBAR)" },
    { id: "cronos", name: "Cronos (CRO)" },
    { id: "the-sandbox", name: "The Sandbox (SAND)" },
    { id: "decentraland", name: "Decentraland (MANA)" },
    { id: "aave", name: "Aave (AAVE)" },
    { id: "maker", name: "Maker (MKR)" },
    { id: "compound-ether", name: "Compound Ether (CETH)" },
    { id: "theta-token", name: "Theta Network (THETA)" },
    { id: "axie-infinity", name: "Axie Infinity (AXS)" },
    { id: "elrond-erd-2", name: "MultiversX (EGLD)" },
    { id: "pancakeswap-token", name: "PancakeSwap (CAKE)" },
    { id: "klay-token", name: "Klaytn (KLAY)" },
    { id: "fantom", name: "Fantom (FTM)" },
    { id: "flow", name: "Flow (FLOW)" },
    { id: "eos", name: "EOS (EOS)" },
    { id: "tezos", name: "Tezos (XTZ)" },
    { id: "stellar", name: "Stellar (XLM)" },
    { id: "monero", name: "Monero (XMR)" },
    { id: "iota", name: "IOTA (MIOTA)" },
    { id: "neo", name: "Neo (NEO)" },
    { id: "helium", name: "Helium (HNT)" },
    { id: "quant-network", name: "Quant (QNT)" },
    { id: "chiliz", name: "Chiliz (CHZ)" },
    { id: "basic-attention-token", name: "Basic Attention (BAT)" },
    { id: "enjincoin", name: "Enjin Coin (ENJ)" },
    { id: "gala", name: "Gala (GALA)" }
  ]

  const stockOptions = [
    { id: "BIST100", name: "BIST 100" },
    { id: "USDTRY", name: "USD/TRY" },
    { id: "EURTRY", name: "EUR/TRY" },
    { id: "GBPTRY", name: "GBP/TRY" },
    { id: "JPYTRY", name: "JPY/TRY" },
    { id: "CHFTRY", name: "CHF/TRY" },
    { id: "CADTRY", name: "CAD/TRY" },
    { id: "AUDTRY", name: "AUD/TRY" },
    { id: "AAPL", name: "Apple (AAPL)" },
    { id: "MSFT", name: "Microsoft (MSFT)" },
    { id: "GOOGL", name: "Alphabet (GOOGL)" },
    { id: "AMZN", name: "Amazon (AMZN)" },
    { id: "TSLA", name: "Tesla (TSLA)" },
    { id: "META", name: "Meta (META)" },
    { id: "NVDA", name: "NVIDIA (NVDA)" },
    { id: "NFLX", name: "Netflix (NFLX)" },
    { id: "BABA", name: "Alibaba (BABA)" },
    { id: "V", name: "Visa (V)" },
    { id: "JPM", name: "JPMorgan (JPM)" },
    { id: "JNJ", name: "Johnson & Johnson (JNJ)" },
    { id: "WMT", name: "Walmart (WMT)" },
    { id: "PG", name: "Procter & Gamble (PG)" },
    { id: "UNH", name: "UnitedHealth (UNH)" },
    { id: "HD", name: "Home Depot (HD)" },
    { id: "MA", name: "Mastercard (MA)" },
    { id: "BAC", name: "Bank of America (BAC)" },
    { id: "DIS", name: "Disney (DIS)" },
    { id: "ADBE", name: "Adobe (ADBE)" },
    { id: "CRM", name: "Salesforce (CRM)" },
    { id: "XOM", name: "Exxon Mobil (XOM)" },
    { id: "KO", name: "Coca-Cola (KO)" },
    { id: "CVX", name: "Chevron (CVX)" },
    { id: "LLY", name: "Eli Lilly (LLY)" },
    { id: "ABBV", name: "AbbVie (ABBV)" },
    { id: "PEP", name: "PepsiCo (PEP)" },
    { id: "COST", name: "Costco (COST)" },
    { id: "AVGO", name: "Broadcom (AVGO)" },
    { id: "TMO", name: "Thermo Fisher (TMO)" },
    { id: "ACN", name: "Accenture (ACN)" },
    { id: "MCD", name: "McDonald's (MCD)" },
    { id: "ABT", name: "Abbott (ABT)" },
    { id: "CSCO", name: "Cisco (CSCO)" },
    { id: "DHR", name: "Danaher (DHR)" },
    { id: "TXN", name: "Texas Instruments (TXN)" },
    { id: "VZ", name: "Verizon (VZ)" },
    { id: "ORCL", name: "Oracle (ORCL)" },
    { id: "COP", name: "ConocoPhillips (COP)" },
    { id: "WFC", name: "Wells Fargo (WFC)" },
    { id: "INTC", name: "Intel (INTC)" },
    { id: "NEE", name: "NextEra Energy (NEE)" },
    { id: "BMY", name: "Bristol Myers (BMY)" },
    { id: "PM", name: "Philip Morris (PM)" },
    { id: "UPS", name: "UPS (UPS)" },
    { id: "RTX", name: "Raytheon (RTX)" }
  ]

  initialize()

  async function initialize() {
    await loadSettings()
    setupEventListeners()
    initializeDefaultLinks()
    await loadCustomLinks()
    setupGeolocation()
    startClock()
    applyTabState()
    await loadCryptoData()
    await loadStockData()
    await loadNews()
    await loadQuote()
    await loadTodos()
    await loadNotes()
    setupProductivityTools()
    setupRefreshInterval()
    setupLayoutMode()
    setupCryptoStockCustomization()
    setupMarketRefreshInterval()
    setupResizeSystem()
  }

  async function loadSettings() {
    try {
      const data = await window.chrome.storage.local.get([
        "theme",
        "customColor",
        "weather",
        "datetime",
        "crypto",
        "stocks",
        "news",
        "quote",
        "pomodoro",
        "todo",
        "notes",
        "customBg",
        "refreshInterval",
        "animationsEnabled",
        "soundEnabled",
        "pomodoroWorkTime",
        "pomodoroBreakTime",
        "selectedCryptos",
        "selectedStocks",
        "marketRefreshInterval",
        "elementPositions",
        "newsCount",
        "showLayoutBtn",
        "widgetSizes",
        "hiddenDefaultLinks",
      ])

      document.body.setAttribute("data-theme", data.theme || "dark")
      elements.themeSelector.value = data.theme || "dark"

      if (data.theme === "custom") {
        elements.customColorSection.style.display = "block"
        if (data.customColor) {
          elements.customColorPicker.value = data.customColor
          updateCustomColorCSS(data.customColor)
        }
      }

      ;["weather", "datetime", "crypto", "stocks", "news", "quote", "pomodoro", "todo", "notes"].forEach((widget) => {
        const isVisible = data[widget] !== false
        const widgetElement = document.querySelector(`.${widget}-widget`)
        if (widgetElement) {
          widgetElement.style.display = isVisible ? "block" : "none"
        }
        const checkbox = document.querySelector(`input[name="${widget}"]`)
        if (checkbox) {
          checkbox.checked = isVisible
        }
      })

      if (elements.refreshInterval) {
        elements.refreshInterval.value = data.refreshInterval || "600000"
      }
      if (elements.animationsEnabled) {
        elements.animationsEnabled.checked = data.animationsEnabled !== false
        toggleAnimations(data.animationsEnabled !== false)
      }
      if (elements.soundEnabled) {
        elements.soundEnabled.checked = data.soundEnabled !== false
      }

      if (data.customBg) {
        document.body.style.backgroundImage = `url(${data.customBg})`
      }

      if (elements.pomodoroWorkTime) {
        pomodoroWorkTime = (data.pomodoroWorkTime || 25) * 60
        elements.pomodoroWorkTime.value = data.pomodoroWorkTime || 25
      }
      if (elements.pomodoroBreakTime) {
        pomodoroBreakTime = (data.pomodoroBreakTime || 5) * 60
        elements.pomodoroBreakTime.value = data.pomodoroBreakTime || 5
      }

      selectedCryptoList = data.selectedCryptos || ["bitcoin", "ethereum"]
      selectedStockList = data.selectedStocks || ["BIST100", "USDTRY"]

      if (elements.marketRefreshInterval) {
        elements.marketRefreshInterval.value = data.marketRefreshInterval || "60000"
      }

      if (elements.newsCount) {
        elements.newsCount.value = data.newsCount || "5"
      }

      if (elements.showLayoutBtn) {
        elements.showLayoutBtn.checked = data.showLayoutBtn !== false
        toggleLayoutBtnVisibility(data.showLayoutBtn !== false)
      }

      if (data.elementPositions) {
        loadElementPositions(data.elementPositions)
      }

      if (data.widgetSizes) {
        loadWidgetSizes(data.widgetSizes)
      }

      populateCryptoSelector()
      populateStockSelector()
    } catch (error) {
      console.error("Ayarlar yüklenirken hata:", error)
    }
  }

  function populateCryptoSelector() {
    if (!elements.cryptoSelector) return
    
    elements.cryptoSelector.innerHTML = ""
    cryptoOptions.forEach(crypto => {
      const option = document.createElement("option")
      option.value = crypto.id
      option.textContent = crypto.name
      elements.cryptoSelector.appendChild(option)
    })
  }

  function populateStockSelector() {
    if (!elements.stockSelector) return
    
    elements.stockSelector.innerHTML = ""
    stockOptions.forEach(stock => {
      const option = document.createElement("option")
      option.value = stock.id
      option.textContent = stock.name
      elements.stockSelector.appendChild(option)
    })
  }

  function setupEventListeners() {
    elements.settingsBtn.addEventListener("click", toggleSettings)
    if (elements.closeSettings) {
      elements.closeSettings.addEventListener("click", closeSettingsPanel)
    }
    document.addEventListener("click", closeSettings)

    elements.themeSelector.addEventListener("change", updateTheme)
    if (elements.customColorPicker) {
      elements.customColorPicker.addEventListener("change", updateCustomColor)
    }

    elements.searchInput.addEventListener("keypress", handleSearch)
    elements.toggleBtn.addEventListener("click", toggleAI)
    elements.addCustom.addEventListener("click", addCustomLink)
    elements.removeLinkBtn.addEventListener("click", toggleRemoveMode)
    elements.bgUpload.addEventListener("change", handleBgUpload)
    elements.removeBgBtn.addEventListener("click", removeBackground)

    if (elements.refreshInterval) {
      elements.refreshInterval.addEventListener("change", updateRefreshInterval)
    }
    if (elements.animationsEnabled) {
      elements.animationsEnabled.addEventListener("change", toggleAnimationsEnabled)
    }
    if (elements.soundEnabled) {
      elements.soundEnabled.addEventListener("change", toggleSoundEnabled)
    }

    if (elements.exportData) {
      elements.exportData.addEventListener("click", exportSettings)
    }
    if (elements.importData) {
      elements.importData.addEventListener("click", () => elements.importFile.click())
    }
    if (elements.importFile) {
      elements.importFile.addEventListener("change", importSettings)
    }
    if (elements.resetData) {
      elements.resetData.addEventListener("click", resetAllSettings)
    }

    document.querySelectorAll(".widget-controls input, .toggle-label input").forEach((input) => {
      input.addEventListener("change", toggleWidgetVisibility)
    })

    if (elements.layoutModeBtn) {
      elements.layoutModeBtn.addEventListener("click", toggleLayoutMode)
    }
    if (elements.layoutModeToggle) {
      elements.layoutModeToggle.addEventListener("click", toggleLayoutMode)
    }
    if (elements.exitLayoutMode) {
      elements.exitLayoutMode.addEventListener("click", exitLayoutMode)
    }
    if (elements.resetLayout) {
      elements.resetLayout.addEventListener("click", resetLayout)
    }
    if (elements.pomodoroWorkTime) {
      elements.pomodoroWorkTime.addEventListener("change", updatePomodoroSettings)
    }
    if (elements.pomodoroBreakTime) {
      elements.pomodoroBreakTime.addEventListener("change", updatePomodoroSettings)
    }
    if (elements.addCrypto) {
      elements.addCrypto.addEventListener("click", addCrypto)
    }
    if (elements.addStock) {
      elements.addStock.addEventListener("click", addStock)
    }
    if (elements.marketRefreshInterval) {
      elements.marketRefreshInterval.addEventListener("change", updateMarketRefreshInterval)
    }
    if (elements.newsCount) {
      elements.newsCount.addEventListener("change", updateNewsCount)
    }
    if (elements.showLayoutBtn) {
      elements.showLayoutBtn.addEventListener("change", toggleShowLayoutBtn)
    }
  }

  function setupResizeSystem() {
    document.querySelectorAll(".draggable-element").forEach((element) => {
      addResizeHandles(element)
    })
  }

  function addResizeHandles(element) {
    const resizeHandle = document.createElement("div")
    resizeHandle.className = "resize-handle"
    resizeHandle.innerHTML = "⟲"
    resizeHandle.style.cssText = `
      position: absolute;
      bottom: -10px;
      right: -10px;
      width: 20px;
      height: 20px;
      background: var(--accent-color);
      border: 2px solid white;
      border-radius: 50%;
      cursor: nw-resize;
      display: none;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: white;
      z-index: 1000;
    `

    element.appendChild(resizeHandle)

    let startX, startY, startWidth, startHeight

    resizeHandle.addEventListener("mousedown", (e) => {
      if (!isLayoutMode) return
      
      isResizing = true
      currentResizingElement = element
      startX = e.clientX
      startY = e.clientY
      
      const rect = element.getBoundingClientRect()
      startWidth = rect.width
      startHeight = rect.height
      
      e.stopPropagation()
      e.preventDefault()
    })

    document.addEventListener("mousemove", (e) => {
      if (!isResizing || !isLayoutMode || currentResizingElement !== element) return

      const deltaX = e.clientX - startX
      const deltaY = e.clientY - startY

      const newWidth = Math.max(MIN_WIDTH, startWidth + deltaX)
      const newHeight = Math.max(MIN_HEIGHT, startHeight + deltaY)

      element.style.width = `${newWidth}px`
      element.style.height = `${newHeight}px`
    })

    document.addEventListener("mouseup", () => {
      if (isResizing && currentResizingElement === element) {
        isResizing = false
        currentResizingElement = null
        saveWidgetSizes()
      }
    })
  }

  async function saveWidgetSizes() {
    const sizes = {}
    document.querySelectorAll(".draggable-element").forEach((element) => {
      const id = element.dataset.elementId
      if (id && (element.style.width || element.style.height)) {
        sizes[id] = {
          width: element.style.width,
          height: element.style.height,
        }
      }
    })
    await window.chrome.storage.local.set({ widgetSizes: sizes })
  }

  function loadWidgetSizes(sizes) {
    Object.entries(sizes).forEach(([id, size]) => {
      const element = document.querySelector(`[data-element-id="${id}"]`)
      if (element && size) {
        if (size.width) element.style.width = size.width
        if (size.height) element.style.height = size.height
      }
    })
  }

  async function toggleShowLayoutBtn(e) {
    const show = e.target.checked
    await window.chrome.storage.local.set({ showLayoutBtn: show })
    toggleLayoutBtnVisibility(show)
  }

  function toggleLayoutBtnVisibility(show) {
    const layoutBtn = elements.layoutModeBtn
    if (layoutBtn) {
      layoutBtn.style.display = show ? "flex" : "none"
    }
  }

  async function updateNewsCount(e) {
    const count = parseInt(e.target.value) || 5
    await window.chrome.storage.local.set({ newsCount: count })
    await loadNews()
    showNotification(`Haber sayısı ${count} olarak güncellendi!`, "success")
  }

  async function loadNews() {
    if (!elements.newsData) return
    
    try {
      const newsCount = parseInt(elements.newsCount?.value || "5")
      elements.newsData.innerHTML = '<div class="news-item">Haberler yükleniyor...</div>'
      
      const newsFeeds = [
        "https://www.hurriyet.com.tr/rss/anasayfa",
        "https://www.milliyet.com.tr/rss/rss/gundemrss.xml",
        "https://www.sabah.com.tr/rss/anasayfa.xml"
      ]

      const randomFeed = newsFeeds[Math.floor(Math.random() * newsFeeds.length)]
      const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(randomFeed)}&count=${newsCount}`
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)
      
      const response = await fetch(proxyUrl, { 
        cache: "no-store",
        signal: controller.signal 
      })
      clearTimeout(timeoutId)
      
      const data = await response.json()

      if (data.status === "ok" && Array.isArray(data.items) && data.items.length > 0) {
        elements.newsData.innerHTML = data.items
          .slice(0, newsCount)
          .map((news) => `
            <div class="news-item" onclick="window.open('${news.link}', '_blank')" title="${news.description || news.title}">
              ${news.title}
            </div>
          `)
          .join("")
      } else {
        throw new Error("Geçersiz haber verisi")
      }
    } catch (error) {
      console.error("Haberler yüklenemedi:", error)
      const mockNews = [
        { title: "Teknoloji sektöründe yeni gelişmeler", url: "https://www.hurriyet.com.tr" },
        { title: "Ekonomi haberleri gündemde", url: "https://www.sabah.com.tr" },
        { title: "Spor dünyasından son dakika", url: "https://www.milliyet.com.tr" },
        { title: "Siyaset arenasında son durum", url: "https://www.cnnturk.com" },
        { title: "Dünya gündeminden haberler", url: "https://www.ntv.com.tr" },
      ]

      const newsCount = parseInt(elements.newsCount?.value || "5")
      elements.newsData.innerHTML = mockNews
        .slice(0, newsCount)
        .map((news) => `<div class="news-item" onclick="window.open('${news.url}', '_blank')">${news.title}</div>`)
        .join("")
    }
  }

  function updateCustomColorCSS(color) {
    const lighterColor = adjustBrightness(color, 30)
    const darkerColor = adjustBrightness(color, -20)
    document.documentElement.style.setProperty("--custom-gradient", `linear-gradient(45deg, ${color}, ${lighterColor})`)
    document.documentElement.style.setProperty("--custom-accent", color)
  }

  async function updateCustomColor(e) {
    const color = e.target.value
    updateCustomColorCSS(color)
    await window.chrome.storage.local.set({ customColor: color })
  }

  function adjustBrightness(hex, percent) {
    const num = Number.parseInt(hex.replace("#", ""), 16)
    const amt = Math.round(2.55 * percent)
    const R = (num >> 16) + amt
    const G = ((num >> 8) & 0x00ff) + amt
    const B = (num & 0x0000ff) + amt
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    )
  }

  async function updateTheme(e) {
    const theme = e.target.value
    document.body.setAttribute("data-theme", theme)
    elements.customColorSection.style.display = theme === "custom" ? "block" : "none"
    await window.chrome.storage.local.set({ theme })

    if (theme === "custom" && elements.customColorPicker.value) {
      updateCustomColorCSS(elements.customColorPicker.value)
    }
  }

  async function toggleWidgetVisibility(e) {
    const widget = e.target.name
    const isVisible = e.target.checked

    const widgetElement = document.querySelector(`.${widget}-widget`)
    if (widgetElement) {
      widgetElement.style.display = isVisible ? "block" : "none"
    }
    await window.chrome.storage.local.set({ [widget]: isVisible })
  }

  async function updateRefreshInterval(e) {
    const interval = Number.parseInt(e.target.value)
    await window.chrome.storage.local.set({ refreshInterval: interval })
    setupRefreshInterval()
  }

  function setupRefreshInterval() {
    if (refreshIntervalId) {
      clearInterval(refreshIntervalId)
    }

    const interval = Number.parseInt(elements.refreshInterval?.value || "600000")
    if (interval > 0) {
      refreshIntervalId = setInterval(async () => {
        await loadCryptoData()
        await loadStockData()
        await loadNews()
        await loadQuote()
      }, interval)
    }
  }

  async function toggleAnimationsEnabled(e) {
    const enabled = e.target.checked
    await window.chrome.storage.local.set({ animationsEnabled: enabled })
    toggleAnimations(enabled)
  }

  function toggleAnimations(enabled) {
    document.body.style.setProperty("--animation-duration", enabled ? "0.3s" : "0s")
    if (!enabled) {
      document.body.classList.add("no-animations")
    } else {
      document.body.classList.remove("no-animations")
    }
  }

  async function toggleSoundEnabled(e) {
    const enabled = e.target.checked
    await window.chrome.storage.local.set({ soundEnabled: enabled })
  }

  async function exportSettings() {
    try {
      const allData = await window.chrome.storage.local.get(null)
      const dataStr = JSON.stringify(allData, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })

      const url = URL.createObjectURL(dataBlob)
      const a = document.createElement("a")
      a.href = url
      a.download = `smarttab-pro-settings-${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      showNotification("Ayarlar başarıyla dışa aktarıldı!", "success")
    } catch (error) {
      console.error("Export error:", error)
      showNotification("Dışa aktarma sırasında hata oluştu!", "error")
    }
  }

  async function importSettings(e) {
    const file = e.target.files[0]
    if (!file) return

    try {
      const text = await file.text()
      const data = JSON.parse(text)

      await window.chrome.storage.local.clear()
      await window.chrome.storage.local.set(data)

      showNotification("Ayarlar başarıyla içe aktarıldı! Sayfa yenileniyor...", "success")
      setTimeout(() => window.location.reload(), 1500)
    } catch (error) {
      console.error("Import error:", error)
      showNotification("İçe aktarma sırasında hata oluştu!", "error")
    }
  }

  async function resetAllSettings() {
    if (confirm("Tüm ayarları sıfırlamak istediğinizden emin misiniz? Bu işlem geri alınamaz.")) {
      try {
        await window.chrome.storage.local.clear()
        showNotification("Tüm ayarlar sıfırlandı! Sayfa yenileniyor...", "success")
        setTimeout(() => window.location.reload(), 1500)
      } catch (error) {
        console.error("Reset error:", error)
        showNotification("Sıfırlama sırasında hata oluştu!", "error")
      }
    }
  }

  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.textContent = message
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      background: ${type === "success" ? "#00b894" : type === "error" ? "#e17055" : "#6c5ce7"};
      color: white;
      border-radius: 8px;
      z-index: 10000;
      font-size: 0.9rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      animation: slideIn 0.3s ease;
    `

    document.body.appendChild(notification)
    setTimeout(() => {
      notification.style.animation = "slideOut 0.3s ease"
      setTimeout(() => notification.remove(), 300)
    }, 3000)
  }

  async function loadCryptoData() {
    if (!elements.cryptoData || selectedCryptoList.length === 0) return

    try {
      const cryptoIds = selectedCryptoList.join(",")
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=usd&include_24hr_change=true`,
      )
      const data = await response.json()

      elements.cryptoData.innerHTML = selectedCryptoList
        .map((cryptoId) => {
          const cryptoData = data[cryptoId]
          if (!cryptoData) return ""

          const price = cryptoData.usd
          const change = cryptoData.usd_24h_change || 0
          const changeClass = change >= 0 ? "positive" : "negative"
          const changeSymbol = change >= 0 ? "+" : ""

          const crypto = cryptoOptions.find(c => c.id === cryptoId)
          const cryptoName = crypto ? crypto.name.split(' ')[0] : cryptoId.toUpperCase()

          return `
          <div class="crypto-item">
            <span>${cryptoName}:</span>
            <div>
              <span class="price">${price.toLocaleString()}</span>
              <span class="change ${changeClass}">${changeSymbol}${change.toFixed(2)}%</span>
            </div>
            <button class="remove-crypto-btn" data-crypto-id="${cryptoId}" title="Kaldır">×</button>
          </div>
        `
        })
        .join("")
      
      document.querySelectorAll('.remove-crypto-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation()
          const cryptoId = btn.dataset.cryptoId
          window.removeCrypto(cryptoId)
        })
      })
    } catch (error) {
      console.error("Kripto verileri yüklenemedi:", error)
      if (elements.cryptoData) {
        elements.cryptoData.innerHTML = '<div class="crypto-item">Veri yüklenemedi</div>'
      }
    }
  }

  async function loadStockData() {
    if (!elements.stocksData || selectedStockList.length === 0) return

    try {
      elements.stocksData.innerHTML = ""

      for (const stockId of selectedStockList) {
        let stockData = { name: stockId, price: "Yükleniyor...", change: 0 }

        if (stockId.includes("TRY")) {
          const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD")
          const data = await response.json()

          if (stockId === "USDTRY") {
            stockData = { name: "USD/TRY", price: `₺${data.rates.TRY.toFixed(2)}`, change: 0 }
          } else if (stockId === "EURTRY") {
            const eurRate = data.rates.TRY / data.rates.EUR
            stockData = { name: "EUR/TRY", price: `₺${eurRate.toFixed(2)}`, change: 0 }
          } else if (stockId === "GBPTRY") {
            const gbpRate = data.rates.TRY / data.rates.GBP
            stockData = { name: "GBP/TRY", price: `₺${gbpRate.toFixed(2)}`, change: 0 }
          } else if (stockId === "JPYTRY") {
            const jpyRate = data.rates.TRY / data.rates.JPY
            stockData = { name: "JPY/TRY", price: `₺${jpyRate.toFixed(4)}`, change: 0 }
          } else if (stockId === "CHFTRY") {
            const chfRate = data.rates.TRY / data.rates.CHF
            stockData = { name: "CHF/TRY", price: `₺${chfRate.toFixed(2)}`, change: 0 }
          } else if (stockId === "CADTRY") {
            const cadRate = data.rates.TRY / data.rates.CAD
            stockData = { name: "CAD/TRY", price: `₺${cadRate.toFixed(2)}`, change: 0 }
          } else if (stockId === "AUDTRY") {
            const audRate = data.rates.TRY / data.rates.AUD
            stockData = { name: "AUD/TRY", price: `₺${audRate.toFixed(2)}`, change: 0 }
          }
        } else if (stockId === "BIST100") {
          stockData = { name: "BIST100", price: "10,247", change: 1.2 }
        } else {
          const mockPrices = {
            AAPL: { price: 175.43, change: 2.1 },
            MSFT: { price: 378.85, change: 1.5 },
            GOOGL: { price: 2847.52, change: -0.8 },
            AMZN: { price: 3127.45, change: 0.9 },
            TSLA: { price: 248.42, change: -2.3 },
            META: { price: 325.67, change: 1.8 },
            NVDA: { price: 456.78, change: 3.2 },
            NFLX: { price: 412.34, change: -1.1 },
            BABA: { price: 85.21, change: 0.4 },
            V: { price: 234.56, change: 0.7 },
            JPM: { price: 145.67, change: 1.3 },
            JNJ: { price: 165.43, change: 0.2 },
            WMT: { price: 152.89, change: 0.8 },
            PG: { price: 148.34, change: 0.5 },
            UNH: { price: 512.67, change: 1.1 },
            HD: { price: 324.45, change: 0.6 },
            MA: { price: 367.89, change: 0.9 },
            BAC: { price: 32.45, change: 1.4 },
            DIS: { price: 98.76, change: -0.7 },
            ADBE: { price: 487.23, change: 2.1 },
          }

          if (mockPrices[stockId]) {
            const mock = mockPrices[stockId]
            stockData = { name: stockId, price: `${mock.price}`, change: mock.change }
          }
        }

        const changeClass = stockData.change >= 0 ? "positive" : "negative"
        const changeSymbol = stockData.change >= 0 ? "+" : ""

        elements.stocksData.innerHTML += `
          <div class="stock-item">
            <span>${stockData.name}:</span>
            <div>
              <span class="price">${stockData.price}</span>
              ${stockData.change !== 0 ? `<span class="change ${changeClass}">${changeSymbol}${stockData.change.toFixed(2)}%</span>` : ""}
            </div>
            <button class="remove-stock-btn" data-stock-id="${stockId}" title="Kaldır">×</button>
          </div>
        `
      }
      
      document.querySelectorAll('.remove-stock-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation()
          const stockId = btn.dataset.stockId
          window.removeStock(stockId)
        })
      })
    } catch (error) {
      console.error("Borsa verileri yüklenemedi:", error)
      if (elements.stocksData) {
        elements.stocksData.innerHTML = '<div class="stock-item">Veri yüklenemedi</div>'
      }
    }
  }

  async function loadQuote() {
    const quotes = [
      { text: "Başarı, hazırlık ile fırsatın buluştuğu andır.", author: "Seneca" },
      { text: "Hayatta en önemli şey, sürekli öğrenmeye devam etmektir.", author: "Albert Einstein" },
      { text: "Bugün yapabileceğin şeyi yarına bırakma.", author: "Benjamin Franklin" },
      { text: "Başarısızlık, başarıya giden yolda bir duraktır.", author: "William D. Brown" },
      { text: "Hayal kurmak her şeyin başlangıcıdır.", author: "George Bernard Shaw" },
      { text: "Zorluklar karakteri ortaya çıkarır.", author: "Epictetus" },
    ]

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

    if (elements.quoteText) {
      elements.quoteText.textContent = `"${randomQuote.text}"`
    }
    if (elements.quoteAuthor) {
      elements.quoteAuthor.textContent = `- ${randomQuote.author}`
    }
  }

  function setupLayoutMode() {
    document.querySelectorAll(".draggable-element").forEach((element) => {
      setupDraggableElement(element)
    })
  }

  function setupDraggableElement(element) {
    let isDragging = false
    let startX, startY, startLeft, startTop

    element.addEventListener("mousedown", (e) => {
      if (!isLayoutMode || isResizing) return
      if (e.target.classList.contains("resize-handle")) return
      if (e.target.closest('.remove-crypto-btn') || e.target.closest('.remove-stock-btn')) return

      isDragging = true
      element.classList.add("dragging")

      startX = e.clientX
      startY = e.clientY

      const rect = element.getBoundingClientRect()
      startLeft = rect.left
      startTop = rect.top

      e.preventDefault()
    })

    document.addEventListener("mousemove", (e) => {
      if (!isDragging || !isLayoutMode || isResizing) return

      const deltaX = e.clientX - startX
      const deltaY = e.clientY - startY

      const newLeft = startLeft + deltaX
      const newTop = startTop + deltaY

      element.style.left = `${newLeft}px`
      element.style.top = `${newTop}px`
      element.style.right = "auto"
      element.style.bottom = "auto"
      element.style.transform = "none"
    })

    document.addEventListener("mouseup", () => {
      if (isDragging) {
        isDragging = false
        element.classList.remove("dragging")
        saveElementPositions()
      }
    })
  }

  function toggleLayoutMode() {
    isLayoutMode = !isLayoutMode
    document.body.classList.toggle("layout-mode-active", isLayoutMode)

    document.querySelectorAll(".resize-handle").forEach(handle => {
      handle.style.display = isLayoutMode ? "flex" : "none"
    })

    if (elements.layoutModeIndicator) {
      elements.layoutModeIndicator.style.display = isLayoutMode ? "flex" : "none"
    }

    if (elements.layoutModeToggle) {
      elements.layoutModeToggle.textContent = isLayoutMode ? "🔓 Düzen Modunu Kapat" : "🔓 Düzen Modunu Aç"
    }
  }

  function exitLayoutMode() {
    isLayoutMode = false
    document.body.classList.remove("layout-mode-active")
    
    document.querySelectorAll(".resize-handle").forEach(handle => {
      handle.style.display = "none"
    })

    if (elements.layoutModeIndicator) {
      elements.layoutModeIndicator.style.display = "none"
    }
    if (elements.layoutModeToggle) {
      elements.layoutModeToggle.textContent = "🔓 Düzen Modunu Aç"
    }
  }

  async function saveElementPositions() {
    const positions = {}
    document.querySelectorAll(".draggable-element").forEach((element) => {
      const id = element.dataset.elementId
      if (id) {
        positions[id] = {
          left: element.style.left,
          top: element.style.top,
          right: element.style.right,
          bottom: element.style.bottom,
          transform: element.style.transform,
        }
      }
    })
    await window.chrome.storage.local.set({ elementPositions: positions })
  }

  function loadElementPositions(positions) {
    Object.entries(positions).forEach(([id, pos]) => {
      const element = document.querySelector(`[data-element-id="${id}"]`)
      if (element && pos) {
        if (pos.left) element.style.left = pos.left
        if (pos.top) element.style.top = pos.top
        if (pos.right) element.style.right = pos.right
        if (pos.bottom) element.style.bottom = pos.bottom
        if (pos.transform) element.style.transform = pos.transform
      }
    })
  }

  async function resetLayout() {
    if (confirm("Tüm öğelerin konumlarını varsayılan haline sıfırlamak istediğinizden emin misiniz?")) {
      await window.chrome.storage.local.remove(["elementPositions", "widgetSizes"])
      showNotification("Düzen sıfırlandı! Sayfa yenileniyor...", "success")
      setTimeout(() => window.location.reload(), 1500)
    }
  }

  async function updatePomodoroSettings() {
    const workTime = Number.parseInt(elements.pomodoroWorkTime.value) || 25
    const breakTime = Number.parseInt(elements.pomodoroBreakTime.value) || 5

    pomodoroWorkTime = workTime * 60
    pomodoroBreakTime = breakTime * 60

    if (isPomodoroPaused) {
      pomodoroTime = isBreakTime ? pomodoroBreakTime : pomodoroWorkTime
      updatePomodoroDisplay()
    }

    await window.chrome.storage.local.set({
      pomodoroWorkTime: workTime,
      pomodoroBreakTime: breakTime,
    })

    showNotification("Pomodoro ayarları güncellendi!", "success")
  }

  function setupCryptoStockCustomization() {
    updateSelectedCryptos()
    updateSelectedStocks()
  }

  async function addCrypto() {
    const cryptoId = elements.cryptoSelector.value
    const cryptoOption = cryptoOptions.find(c => c.id === cryptoId)
    const cryptoText = cryptoOption ? cryptoOption.name : cryptoId

    if (!selectedCryptoList.includes(cryptoId)) {
      selectedCryptoList.push(cryptoId)
      updateSelectedCryptos()
      await saveCryptoStockSettings()
      await loadCryptoData()
      showNotification(`${cryptoText} eklendi!`, "success")
    } else {
      showNotification(`${cryptoText} zaten ekli!`, "error")
    }
  }

  async function addStock() {
    const stockId = elements.stockSelector.value
    const stockOption = stockOptions.find(s => s.id === stockId)
    const stockText = stockOption ? stockOption.name : stockId

    if (!selectedStockList.includes(stockId)) {
      selectedStockList.push(stockId)
      updateSelectedStocks()
      await saveCryptoStockSettings()
      await loadStockData()
      showNotification(`${stockText} eklendi!`, "success")
    } else {
      showNotification(`${stockText} zaten ekli!`, "error")
    }
  }

  function updateSelectedCryptos() {
    if (!elements.selectedCryptos) return

    elements.selectedCryptos.innerHTML = selectedCryptoList
      .map((cryptoId) => {
        const crypto = cryptoOptions.find(c => c.id === cryptoId)
        const name = crypto ? crypto.name : cryptoId.toUpperCase()

        return `
        <div class="selected-item">
          <span>${name}</span>
          <button class="remove-btn" data-remove-crypto="${cryptoId}">×</button>
        </div>
      `
      })
      .join("")
    
    elements.selectedCryptos.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cryptoId = btn.dataset.removeCrypto
        window.removeCrypto(cryptoId)
      })
    })
  }

  function updateSelectedStocks() {
    if (!elements.selectedStocks) return

    elements.selectedStocks.innerHTML = selectedStockList
      .map((stockId) => {
        const stock = stockOptions.find(s => s.id === stockId)
        const name = stock ? stock.name : stockId

        return `
        <div class="selected-item">
          <span>${name}</span>
          <button class="remove-btn" data-remove-stock="${stockId}">×</button>
        </div>
      `
      })
      .join("")
    
    elements.selectedStocks.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const stockId = btn.dataset.removeStock
        window.removeStock(stockId)
      })
    })
  }

  window.removeCrypto = async (cryptoId) => {
    selectedCryptoList = selectedCryptoList.filter((id) => id !== cryptoId)
    updateSelectedCryptos()
    await saveCryptoStockSettings()
    await loadCryptoData()
    
    const crypto = cryptoOptions.find(c => c.id === cryptoId)
    const name = crypto ? crypto.name : cryptoId
    showNotification(`${name} kaldırıldı!`, "success")
  }

  window.removeStock = async (stockId) => {
    selectedStockList = selectedStockList.filter((id) => id !== stockId)
    updateSelectedStocks()
    await saveCryptoStockSettings()
    await loadStockData()
    
    const stock = stockOptions.find(s => s.id === stockId)
    const name = stock ? stock.name : stockId
    showNotification(`${name} kaldırıldı!`, "success")
  }

  async function saveCryptoStockSettings() {
    await window.chrome.storage.local.set({
      selectedCryptos: selectedCryptoList,
      selectedStocks: selectedStockList,
    })
  }

  function setupMarketRefreshInterval() {
    updateMarketRefreshInterval()
  }

  async function updateMarketRefreshInterval() {
    if (marketRefreshIntervalId) {
      clearInterval(marketRefreshIntervalId)
    }

    const interval = Number.parseInt(elements.marketRefreshInterval?.value || "60000")
    await window.chrome.storage.local.set({ marketRefreshInterval: interval })

    if (interval > 0) {
      marketRefreshIntervalId = setInterval(async () => {
        await loadCryptoData()
        await loadStockData()
      }, interval)
    }
  }

  function setupProductivityTools() {
    if (elements.pomodoroStart) {
      elements.pomodoroStart.addEventListener("click", togglePomodoro)
    }
    if (elements.pomodoroReset) {
      elements.pomodoroReset.addEventListener("click", resetPomodoro)
    }

    if (elements.addTodo) {
      elements.addTodo.addEventListener("click", addTodo)
    }
    if (elements.todoInput) {
      elements.todoInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTodo()
      })
    }

    if (elements.notesArea) {
      elements.notesArea.addEventListener("input", saveNotes)
    }

    updatePomodoroDisplay()
  }

  function togglePomodoro() {
    if (isPomodoroPaused) {
      startPomodoro()
      elements.pomodoroStart.textContent = "Duraklat"
    } else {
      pausePomodoro()
      elements.pomodoroStart.textContent = "Başla"
    }
    isPomodoroPaused = !isPomodoroPaused
  }

  function startPomodoro() {
    pomodoroInterval = setInterval(() => {
      pomodoroTime--
      updatePomodoroDisplay()

      if (pomodoroTime <= 0) {
        if (isBreakTime) {
          isBreakTime = false
          pomodoroTime = pomodoroWorkTime
          showNotification("Mola bitti! Çalışma zamanı başlıyor.", "success")
        } else {
          isBreakTime = true
          pomodoroTime = pomodoroBreakTime
          showNotification(`Pomodoro tamamlandı! ${pomodoroBreakTime / 60} dakika mola zamanı.`, "success")
        }
        playNotificationSound()
        updatePomodoroDisplay()
      }
    }, 1000)
  }

  function pausePomodoro() {
    if (pomodoroInterval) {
      clearInterval(pomodoroInterval)
      pomodoroInterval = null
    }
  }

  function resetPomodoro() {
    pausePomodoro()
    isBreakTime = false
    pomodoroTime = pomodoroWorkTime
    isPomodoroPaused = true
    elements.pomodoroStart.textContent = "Başla"
    updatePomodoroDisplay()
  }

  function updatePomodoroDisplay() {
    const minutes = Math.floor(pomodoroTime / 60)
    const seconds = pomodoroTime % 60
    if (elements.pomodoroTimer) {
      const timeText = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      const modeText = isBreakTime ? " (Mola)" : ""
      elements.pomodoroTimer.textContent = timeText + modeText
    }
  }

  function playNotificationSound() {
    if (elements.soundEnabled?.checked) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = 800
      oscillator.type = "sine"

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    }
  }

  async function addTodo() {
    const text = elements.todoInput.value.trim()
    if (!text) return

    const todo = {
      id: Date.now(),
      text: text,
      completed: false,
    }

    todos.push(todo)
    elements.todoInput.value = ""
    renderTodos()
    await saveTodos()
  }

  function renderTodos() {
    if (!elements.todoList) return

    elements.todoList.innerHTML = todos
      .map(
        (todo) => `
      <div class="todo-item ${todo.completed ? "completed" : ""}">
        <input type="checkbox" ${todo.completed ? "checked" : ""} 
               onchange="toggleTodo(${todo.id})">
        <span>${todo.text}</span>
        <button class="todo-delete" onclick="deleteTodo(${todo.id})" title="Sil">×</button>
      </div>
    `,
      )
      .join("")
  }

  window.toggleTodo = async (id) => {
    const todo = todos.find((t) => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
      renderTodos()
      await saveTodos()
    }
  }

  window.deleteTodo = async (id) => {
    todos = todos.filter((t) => t.id !== id)
    renderTodos()
    await saveTodos()
    showNotification("Görev silindi!", "success")
  }

  async function saveTodos() {
    await window.chrome.storage.local.set({ todos: todos })
  }

  async function loadTodos() {
    try {
      const data = await window.chrome.storage.local.get(["todos"])
      todos = data.todos || []
      renderTodos()
    } catch (error) {
      console.error("Yapılacaklar yüklenemedi:", error)
    }
  }

  async function saveNotes() {
    const notes = elements.notesArea.value
    await window.chrome.storage.local.set({ notes: notes })
  }

  async function loadNotes() {
    try {
      const data = await window.chrome.storage.local.get(["notes"])
      if (elements.notesArea && data.notes) {
        elements.notesArea.value = data.notes
      }
    } catch (error) {
      console.error("Notlar yüklenemedi:", error)
    }
  }

  function handleSearch(e) {
    if (e.key === "Enter" && elements.searchInput.value.trim()) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(elements.searchInput.value.trim())}`
    }
  }

  function toggleAI() {
    activeTab = activeTab === "social" ? "ai" : "social"
    applyTabState()
  }

  function applyTabState() {
    elements.socialMedia.classList.remove("visible")
    elements.aiTools.classList.remove("visible")
    elements.socialMedia.classList.add("hidden")
    elements.aiTools.classList.add("hidden")

    if (activeTab === "social") {
      elements.socialMedia.classList.remove("hidden")
      elements.socialMedia.classList.add("visible")
    } else {
      elements.aiTools.classList.remove("hidden")
      elements.aiTools.classList.add("visible")
    }
  }

  async function initializeDefaultLinks() {
    const socials = [
      { name: "YouTube", url: "https://youtube.com" },
      { name: "Instagram", url: "https://instagram.com" },
      { name: "Gmail", url: "https://mail.google.com" },
      { name: "Telegram", url: "https://web.telegram.org" },
      { name: "WhatsApp", url: "https://web.whatsapp.com" },
      { name: "Twitter", url: "https://twitter.com" },
    ]

    const ais = [
      { name: "ChatGPT", url: "https://chat.openai.com" },
      { name: "Gemini", url: "https://gemini.google.com" },
      { name: "Copilot", url: "https://copilot.microsoft.com" },
      { name: "DeepSeek", url: "https://deepseek.com" },
      { name: "Meta AI", url: "https://meta.ai" },
    ]

    const { hiddenDefaultLinks = [] } = await window.chrome.storage.local.get("hiddenDefaultLinks")

    socials.forEach((link) => {
      if (!hiddenDefaultLinks.includes(link.url)) {
        createLinkButton(link, elements.socialMedia, true)
      }
    })
    ais.forEach((link) => {
      if (!hiddenDefaultLinks.includes(link.url)) {
        createLinkButton(link, elements.aiTools, true)
      }
    })
  }

  function createLinkButton(link, container, isDefault = false) {
    const button = document.createElement("button")
    button.className = "icon-btn"
    button.dataset.url = link.url
    button.dataset.isDefault = isDefault.toString()

    const imageName = link.name.toLowerCase().replace(/ /g, "-")
    const categoryFolder = container === elements.socialMedia ? "social-media" : "ai-tools"

    button.innerHTML = `
      <img src="images/${categoryFolder}/${imageName}.png" 
           alt="${link.name}"
           loading="lazy">
      <span class="tooltip">${link.name}</span>
      <span class="remove-btn">×</span>
    `

    button.querySelector(".remove-btn").addEventListener("click", (e) => {
      e.stopPropagation()
      handleRemoveLink(button)
    })

    button.addEventListener("click", () => {
      if (!document.body.classList.contains("remove-mode")) {
        window.open(link.url, "_blank")
      }
    })

    addDragAndDrop(button)
    container.appendChild(button)
  }

  async function setupGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          await getLocation(position.coords)
          await getWeather(position.coords)
        },
        (error) => console.error("Konum izni reddedildi:", error),
      )
    }
  }

  async function getLocation(coords) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`,
      )
      const data = await response.json()
      elements.location.textContent = `${data.address.city || data.address.town || data.address.village}, ${data.address.country}`
    } catch (error) {
      console.error("Konum alınamadı:", error)
      elements.location.textContent = "Konum alınamadı"
    }
  }

  async function getWeather(coords) {
    const API_KEY = "6a59a2c3577e9b24d3e742b910ba1e97"
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&lang=tr&appid=${API_KEY}`,
      )
      const data = await response.json()
      elements.temperature.textContent = `${Math.round(data.main.temp)}°C`
      elements.humidity.textContent = `Nem: ${data.main.humidity}%`
      const icon = document.createElement("img")
      icon.className = "weather-icon"
      icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      elements.weather.prepend(icon)
    } catch (error) {
      console.error("Hava durumu alınamadı:", error)
    }
  }

  function startClock() {
    setInterval(() => {
      const now = new Date()
      elements.date.textContent = now.toLocaleDateString("tr-TR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
      elements.time.textContent = now.toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    }, 1000)
  }

  async function addCustomLink() {
    const name = elements.customName.value.trim()
    const url = elements.customUrl.value.trim()
    const category = elements.customCategory.value

    if (name && url) {
      const targetContainer = category === "social" ? elements.socialMedia : elements.aiTools
      createLinkButton({ name, url }, targetContainer, false)
      await saveCustomLink(category, { name, url })
      elements.customName.value = ""
      elements.customUrl.value = ""
      showNotification("Link başarıyla eklendi!", "success")
    }
  }

  async function saveCustomLink(category, link) {
    const key = `customLinks_${category}`
    const { [key]: existingLinks = [] } = await window.chrome.storage.local.get(key)
    const updatedLinks = [...existingLinks, link]
    await window.chrome.storage.local.set({ [key]: updatedLinks })
  }

  async function loadCustomLinks() {
    const loadCategory = async (category) => {
      const key = `customLinks_${category}`
      const { [key]: links = [] } = await window.chrome.storage.local.get(key)
      links.forEach((link) => {
        createLinkButton(link, category === "social" ? elements.socialMedia : elements.aiTools, false)
      })
    }

    await loadCategory("social")
    await loadCategory("ai")
  }

  function toggleRemoveMode() {
    document.body.classList.toggle("remove-mode")
    const isRemoveMode = document.body.classList.contains("remove-mode")
    elements.removeLinkBtn.textContent = isRemoveMode ? "✅ Kaldırma Modunu Kapat" : "🗑️ Link Kaldırma Modunu Aç"
  }

  async function handleRemoveLink(button) {
    const url = button.dataset.url
    const isDefault = button.dataset.isDefault === "true"
    
    if (isDefault) {
      button.remove()
      await saveHiddenDefaultLink(url)
      showNotification("Default link kalıcı olarak kaldırıldı!", "success")
    } else {
      button.remove()
      await removeCustomLink(url)
      showNotification("Link kaldırıldı!", "success")
    }
  }

  async function saveHiddenDefaultLink(url) {
    const { hiddenDefaultLinks = [] } = await window.chrome.storage.local.get("hiddenDefaultLinks")
    if (!hiddenDefaultLinks.includes(url)) {
      hiddenDefaultLinks.push(url)
      await window.chrome.storage.local.set({ hiddenDefaultLinks })
    }
  }

  async function removeCustomLink(url) {
    const removeFromCategory = async (category) => {
      const key = `customLinks_${category}`
      const { [key]: links = [] } = await window.chrome.storage.local.get(key)
      const updatedLinks = links.filter((link) => link.url !== url)
      await window.chrome.storage.local.set({ [key]: updatedLinks })
    }

    await removeFromCategory("social")
    await removeFromCategory("ai")
  }

  async function handleBgUpload(e) {
    const file = e.target.files[0]

    if (!file) return

    if (file.size > MAX_BG_SIZE) {
      showNotification("Dosya boyutu çok büyük! Maksimum 5MB boyutunda resimler kullanabilirsiniz.", "error")
      e.target.value = ""
      return
    }

    if (!file.type.startsWith("image/")) {
      showNotification("Lütfen geçerli bir resim dosyası seçin!", "error")
      e.target.value = ""
      return
    }

    const reader = new FileReader()
    reader.onload = async (event) => {
      document.body.style.backgroundImage = `url(${event.target.result})`
      await window.chrome.storage.local.set({ customBg: event.target.result })
      showNotification("Arka plan başarıyla değiştirildi!", "success")
    }
    reader.readAsDataURL(file)
  }

  async function removeBackground() {
    document.body.style.backgroundImage = ""
    elements.bgUpload.value = ""
    await window.chrome.storage.local.remove("customBg")
    showNotification("Arka plan kaldırıldı!", "success")
  }

  function addDragAndDrop(element) {
    element.draggable = true
    element.addEventListener("dragstart", dragStartHandler)
    element.addEventListener("dragover", dragOverHandler)
    element.addEventListener("drop", dropHandler)
  }

  function dragStartHandler(e) {
    draggedElement = this
    e.dataTransfer.effectAllowed = "move"
  }

  function dragOverHandler(e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  function dropHandler(e) {
    e.preventDefault()
    if (draggedElement !== this) {
      const container = this.parentElement
      container.insertBefore(draggedElement, this)
    }
  }

  function toggleSettings(e) {
    e.stopPropagation()
    elements.settingsPanel.classList.toggle("visible")
  }

  function closeSettingsPanel() {
    elements.settingsPanel.classList.remove("visible")
  }

  function closeSettings(e) {
    if (
      !elements.settingsPanel.contains(e.target) &&
      e.target !== elements.settingsBtn &&
      !e.target.closest(".settings-btn")
    ) {
      elements.settingsPanel.classList.remove("visible")
    }
  }

  const style = document.createElement("style")
  style.textContent = `
    .no-animations * {
      animation-duration: 0s !important;
      transition-duration: 0s !important;
    }
    
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }

    .resize-handle {
      transition: all 0.2s ease;
    }

    .resize-handle:hover {
      background: var(--accent-color) !important;
      transform: scale(1.2);
      box-shadow: 0 0 15px var(--accent-color);
    }

    .dragging {
      opacity: 0.7;
      z-index: 1000;
      cursor: grabbing !important;
    }

    .layout-mode-active .draggable-element {
      border: 2px dashed rgba(108, 92, 231, 0.5);
      border-radius: 8px;
      cursor: grab;
    }

    .layout-mode-active .draggable-element:hover {
      border-color: var(--accent-color);
      background: rgba(108, 92, 231, 0.1);
    }

    .crypto-item, .stock-item {
      position: relative;
      padding-right: 30px;
    }

    .remove-crypto-btn, .remove-stock-btn {
      position: absolute;
      top: 50%;
      right: 5px;
      transform: translateY(-50%);
      background: #e17055;
      color: white;
      border: none;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      font-size: 14px;
      cursor: pointer;
      display: none;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }

    .crypto-item:hover .remove-crypto-btn,
    .stock-item:hover .remove-stock-btn {
      display: flex;
    }

    .remove-crypto-btn:hover,
    .remove-stock-btn:hover {
      background: #d63031;
      transform: translateY(-50%) scale(1.1);
    }

    .todo-delete {
      background: #e17055;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 2px 8px;
      font-size: 12px;
      cursor: pointer;
      margin-left: auto;
      transition: all 0.2s ease;
    }

    .todo-delete:hover {
      background: #d63031;
      transform: scale(1.05);
    }
  `
  document.head.appendChild(style)
})