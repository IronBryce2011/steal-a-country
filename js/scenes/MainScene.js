export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });

    // track when we last spawned a sprite
    this.lastSpawn = 0;
    this.spawnCooldown = 2000; // 2 seconds
    // definitions for random flag sprites we'll use later
    // each entry has a key (safe JS var name), a display name and a color used to draw a placeholder
    // plus cost and income values (money per second). To add a new country, add an entry here.
    // Countries grouped by rarity (you can add new countries and assign a rarity)
 // Revert to a compact set of example countries (simpler state)
this.countryDefs = [
  { key: 'brazil', name: 'Brazil', imageUrl: 'https://flagcdn.com/64x48/br.png', color: 0x1f8b4c, rarity: 'common', cost: 25, income: 3 },
  { key: 'india', name: 'India', imageUrl: 'https://flagcdn.com/64x48/in.png', color: 0xff9933, rarity: 'common', cost: 500, income: 20 },
  { key: 'china', name: 'China', imageUrl: 'https://flagcdn.com/64x48/cn.png', color: 0xff0000, rarity: 'uncommon', cost: 3000, income: 120 },
  { key: 'usa', name: 'United_States', imageUrl: 'https://flagcdn.com/64x48/us.png', color: 0x2b6cff, rarity: 'legendary', cost: 600000, income: 25000 },
  { key: 'france', name: 'France', imageUrl: 'https://flagcdn.com/64x48/fr.png', color: 0x2b2b8f, rarity: 'epic', cost: 150000, income: 8500 },
  { key: 'japan', name: 'Japan', imageUrl: 'https://flagcdn.com/64x48/jp.png', color: 0xffffff, rarity: 'epic', cost: 130000, income: 6000 },
  { key: 'canada', name: 'Canada', imageUrl: 'https://flagcdn.com/64x48/ca.png', color: 0xff0000, rarity: 'rare', cost: 90000, income: 4000 },
  { key: 'germany', name: 'Germany', imageUrl: 'https://flagcdn.com/64x48/de.png', color: 0x000000, rarity: 'rare', cost: 65000, income: 3500 },
  { key: 'uk', name: 'United_Kingdom', imageUrl: 'https://flagcdn.com/64x48/gb.png', color: 0x0000ff, rarity: 'uncommon', cost: 4000, income: 150 },
  { key: 'italy', name: 'Italy', imageUrl: 'https://flagcdn.com/64x48/it.png', color: 0x008000, rarity: 'uncommon', cost: 5000, income: 180 },
  { key: 'mexico', name: 'Mexico', imageUrl: 'https://flagcdn.com/64x48/mx.png', color: 0x006847, rarity: 'rare', cost: 80000, income: 3500 },
  { key: 'russia', name: 'Russia', imageUrl: 'https://flagcdn.com/64x48/ru.png', color: 0x0039a6, rarity: 'epic', cost: 130000, income: 5500 },
  { key: 'australia', name: 'Australia', imageUrl: 'https://flagcdn.com/64x48/au.png', color: 0x00008b, rarity: 'legendary', cost: 500000, income: 20000 },
  { key: 'south_korea', name: 'South_Korea', imageUrl: 'https://flagcdn.com/64x48/kr.png', color: 0xffffff, rarity: 'rare', cost: 70000, income: 3200 },
  { key: 'spain', name: 'Spain', imageUrl: 'https://flagcdn.com/64x48/es.png', color: 0xff0000, rarity: 'uncommon', cost: 4000, income: 160 },
  { key: 'argentina', name: 'Argentina', imageUrl: 'https://flagcdn.com/64x48/ar.png', color: 0x74acdf, rarity: 'common', cost: 200, income: 12 },
  { key: 'south_africa', name: 'South_Africa', imageUrl: 'https://flagcdn.com/64x48/za.png', color: 0x006400, rarity: 'uncommon', cost: 6000, income: 250 },
  { key: 'sweden', name: 'Sweden', imageUrl: 'https://flagcdn.com/64x48/se.png', color: 0xffcc00, rarity: 'rare', cost: 80000, income: 3800 },
  { key: 'norway', name: 'Norway', imageUrl: 'https://flagcdn.com/64x48/no.png', color: 0xff0000, rarity: 'rare', cost: 75000, income: 3600 },
  { key: 'finland', name: 'Finland', imageUrl: 'https://flagcdn.com/64x48/fi.png', color: 0x003580, rarity: 'rare', cost: 70000, income: 3300 },
  { key: 'denmark', name: 'Denmark', imageUrl: 'https://flagcdn.com/64x48/dk.png', color: 0xc60c30, rarity: 'uncommon', cost: 4500, income: 180 },
  { key: 'switzerland', name: 'Switzerland', imageUrl: 'https://flagcdn.com/64x48/ch.png', color: 0xff0000, rarity: 'epic', cost: 140000, income: 5000 },
  { key: 'netherlands', name: 'Netherlands', imageUrl: 'https://flagcdn.com/64x48/nl.png', color: 0xff0000, rarity: 'uncommon', cost: 5000, income: 200 },
  { key: 'belgium', name: 'Belgium', imageUrl: 'https://flagcdn.com/64x48/be.png', color: 0xffcc00, rarity: 'uncommon', cost: 5200, income: 210 },
  { key: 'austria', name: 'Austria', imageUrl: 'https://flagcdn.com/64x48/at.png', color: 0xff0000, rarity: 'rare', cost: 75000, income: 3100 },
  { key: 'poland', name: 'Poland', imageUrl: 'https://flagcdn.com/64x48/pl.png', color: 0xff0000, rarity: 'uncommon', cost: 6000, income: 250 },
  { key: 'greece', name: 'Greece', imageUrl: 'https://flagcdn.com/64x48/gr.png', color: 0x0000ff, rarity: 'uncommon', cost: 6500, income: 270 },
  { key: 'turkey', name: 'Turkey', imageUrl: 'https://flagcdn.com/64x48/tr.png', color: 0xff0000, rarity: 'rare', cost: 75000, income: 3500 },
  { key: 'egypt', name: 'Egypt', imageUrl: 'https://flagcdn.com/64x48/eg.png', color: 0xff0000, rarity: 'uncommon', cost: 5500, income: 230 },
  { key: 'nigeria', name: 'Nigeria', imageUrl: 'https://flagcdn.com/64x48/ng.png', color: 0x008000, rarity: 'common', cost: 250, income: 12 },
  { key: 'kenya', name: 'Kenya', imageUrl: 'https://flagcdn.com/64x48/ke.png', color: 0xff0000, rarity: 'common', cost: 350, income: 14 },
  { key: 'vatican_city', name: 'Vatican_City', imageUrl: 'https://flagcdn.com/64x48/va.png', color: 0xffff00, rarity: 'mythic', cost: 12000000, income: 60000 },
  { key: 'majapahit', name: 'Majapahit Empire', imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.5cIFvUCZ8O1RJvRDo4tGQQHaEY?rs=1&pid=ImgDetMain&o=7&rm=3', color: 0xffd700, rarity: 'godly', cost: 60000000, income: 300000 },
  { key: 'tee_mobil', name: 'Tee_Mobil University', imageUrl: 'https://ibb.co/F4z7G0ND', color: 0x000000, rarity: 'tee_mobil', cost: 10000000000, income: 1000000000 },
];



    // rarity distribution provided (percentages). We'll normalize them in case they don't sum to 100.
    // include new rarities 'mythic' and 'godly' between legendary and secret
    // distribution tuned so common/uncommon are high, rare medium, epic low, legendary very low,
    // mythic low, godly & secret extremely rare
    this.rarityOrder = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic', 'godly', 'secret', 'tee_mobil'];
    this.rarityWeights = {
      common: 50,
      uncommon: 30,
      rare: 13,
      epic: 4,
      legendary: 2,
      mythic: 0.88,
      godly: 0.1,
      secret: 0.0999999999,
      tee_mobil: 0.0000000001, 
    };
    // normalize
    const total = Object.values(this.rarityWeights).reduce((s, v) => s + v, 0) || 1;
    this.rarityProbs = this.rarityOrder.map(r => this.rarityWeights[r] / total);
    // tune how strongly income affects rarity. 1 = inverse, 2 = inverse-square, etc.
    this.rarityPower = 1;
    // Rebirth settings (cost scaling and multiplier per rebirth)
    this.rebirthBaseCost = 10000000; // base cost for first rebirth
    this.rebirthCostScale = 2; // cost multiplier per rebirth (exponential)
    this.rebirthMultiplierPer = 2; // each rebirth multiplies income by this factor
    // guarantee the first N spawns are Brazil to bootstrap the game
    this.guaranteeBrazilSpawns = 5; // change this number to control how many initial guaranteed Brazils
  }

  preload() {
  // create textures for flags. entries in countryDefs may either include a
  // `color` (draw a 64x48 colored rectangle) or an `imageUrl` (preload that image)
    this.createRectangleTexture();

    // listen for any load errors and create a fallback texture for failures
    // store failures so we can create fallback textures in create()
    this._flagLoadFailures = {};
    this.load.on('loaderror', (file) => {
      if (file && file.key && file.key.startsWith('flag_')) {
        this._flagLoadFailures[file.key] = true;
      }
    });
  }

  create() {
    // After preload, ensure any image load failures get fallbacks generated
    this.countryDefs.forEach(def => {
      const key = `flag_${def.key}`;
      if (this._flagLoadFailures && this._flagLoadFailures[key]) {
        // create colored fallback if image failed to load
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        const color = (typeof def.color !== 'undefined') ? def.color : 0x888888;
        g.fillStyle(color, 1);
  g.fillRect(0, 0, 64, 48);
  g.generateTexture(key, 64, 48);
        g.destroy();
      }
    });

    // a group to hold the falling sprites
    this.fallingGroup = this.add.group();

    // global counter for clicked sprites
    // attach to window so other parts of the app can read it
    if (typeof window !== 'undefined') {
      // generic single counter kept for backward compatibility
      window.clickedCount = window.clickedCount || 0;
      // per-type counters (e.g., red, green, blue)
      window.gameCounters = window.gameCounters || {};
      // initialize per-country counters using the countryDefs keys
      this.countryDefs.forEach(def => {
        window[def.key] = window[def.key] || 0;
        window.gameCounters[def.key] = window.gameCounters[def.key] || 0;
      });
      // starting money (keep as integer) and accumulated income
      window.money = (typeof window.money !== 'undefined') ? Math.floor(window.money) : 25;
      window.incomePerSecond = window.incomePerSecond || 0;
      // scene-local fractional buffer for income accumulation (not exposed globally)
      this.moneyRemainder = this.moneyRemainder || 0;
      // rebirth persistent counters/multipliers
      window.rebirthCount = window.rebirthCount || 0;
      window.rebirthMultiplier = window.rebirthMultiplier || 1;
    }

    // --- UI: Money display, Menu button and panel ---
    const padding = 10;
    // Money display at top-right (moved so menu on left doesn't hide falling stats)
  this.moneyText = this.add.text(this.scale.width - 140, padding, `$${(window.money || 0)}`, { font: '16px Arial', color: '#ffffff', backgroundColor: '#000000', padding: { x: 6, y: 4 } }).setOrigin(0, 0);

    // Menu button at top-left
    this.menuButton = this.add.text(10, padding, 'Menu', {
      font: '16px Arial',
      color: '#ffffff',
      backgroundColor: '#333333',
      padding: { x: 8, y: 6 },
    }).setOrigin(0, 0).setInteractive();

    // Rebirth HUD button next to Menu (opens separate rebirth panel)
    this.rebirthButton = this.add.text(80, padding, 'Rebirth', {
      font: '16px Arial',
      color: '#ffffff',
      backgroundColor: '#552255',
      padding: { x: 8, y: 6 },
    }).setOrigin(0, 0).setInteractive();

    // Create a separate rebirth panel (hidden)
    this.rebirthPanel = this.add.container(200, 80).setVisible(false);
    const rBg = this.add.rectangle(0, 0, 260, 140, 0x220022, 0.95).setOrigin(0, 0);
    this.rebirthPanel.add(rBg);
    this.rebirthPanelTitle = this.add.text(12, 8, 'Rebirth', { font: '16px Arial', color: '#ffddff' }).setOrigin(0, 0);
    this.rebirthPanel.add(this.rebirthPanelTitle);
    this.rebirthPanelInfo = this.add.text(12, 36, `Rebirths: ${window.rebirthCount || 0}\nNext Cost: $${this.getNextRebirthCost()}\nMultiplier: x${window.rebirthMultiplier || 1}`, { font: '14px Arial', color: '#ffffff' }).setOrigin(0, 0);
    this.rebirthPanel.add(this.rebirthPanelInfo);

    // Confirm and Cancel buttons
    this.rebirthConfirm = this.add.text(20, 100, 'Confirm', { font: '14px Arial', color: '#ffffff', backgroundColor: '#8844aa', padding: { x: 8, y: 6 } }).setOrigin(0, 0).setInteractive();
    this.rebirthCancel = this.add.text(140, 100, 'Cancel', { font: '14px Arial', color: '#ffffff', backgroundColor: '#444444', padding: { x: 8, y: 6 } }).setOrigin(0, 0).setInteractive();
    this.rebirthPanel.add(this.rebirthConfirm);
    this.rebirthPanel.add(this.rebirthCancel);

    // hook up HUD rebirth button
    this.rebirthButton.on('pointerdown', () => {
      // update info then show
      if (this.rebirthPanelInfo) this.rebirthPanelInfo.setText(`Rebirths: ${window.rebirthCount || 0}\nNext Cost: $${this.getNextRebirthCost()}\nMultiplier: x${window.rebirthMultiplier || 1}`);
      this.rebirthPanel.setVisible(true);
    });
    this.rebirthCancel.on('pointerdown', () => { this.rebirthPanel.setVisible(false); });
    this.rebirthConfirm.on('pointerdown', () => { this.attemptRebirth(); this.rebirthPanel.setVisible(false); });

    // Steal HUD button (costs a lot more now and grants one uniformly random country from a restricted pool)
    // Increased price to make stealing a late-game option
    this.stealButton = this.add.text(150, padding, 'Steal $100M', {
      font: '16px Arial',
      color: '#ffffff',
      backgroundColor: '#884400',
      padding: { x: 8, y: 6 },
    }).setOrigin(0, 0).setInteractive();
    this.stealButton.on('pointerdown', () => { this.attemptSteal(); });

  // Panel (hidden by default) — moved to left so stats on falling items are easier to read
  this.menuPanel = this.add.container(10, 40).setVisible(false);
  const panelBg = this.add.rectangle(0, 0, 220, 180, 0x222222, 0.95).setOrigin(0, 0);
    this.menuPanel.add(panelBg);

  // header for money and income
  this.menuHeader = this.add.text(10, 8, `Money: $0.00\nIncome: 0.00/sec`, { font: '14px Arial', color: '#ffffff' }).setOrigin(0, 0);
  this.menuPanel.add(this.menuHeader);

  // rebirth info line (click to rebirth)
  // ensure window rebirth vars exist
  window.rebirthCount = window.rebirthCount || 0;
  window.rebirthMultiplier = window.rebirthMultiplier || 1;
  const nextCost = Math.floor(this.rebirthBaseCost * Math.pow(this.rebirthCostScale, (window.rebirthCount || 0)));
  this.rebirthText = this.add.text(10, 36, `Rebirths: ${window.rebirthCount} | Next: $${nextCost} | x${window.rebirthMultiplier}`, { font: '12px Arial', color: '#ff88ff' }).setOrigin(0, 0).setInteractive();
  this.rebirthText.on('pointerdown', () => { this.attemptRebirth(); });
  this.menuPanel.add(this.rebirthText);

  // We'll render the country list in multiple columns with a smaller font so it can scale to many entries.
  this.menuTexts = {};
  this.menuSmallFont = '10px Arial';
  this.menuColWidth = 200; // width available per column
  this.menuHeaderY = 8; // starting Y offset for header
  // create an inner container we'll populate dynamically when opening the menu
  this.menuContent = this.add.container(10, 36);
  this.menuPanel.add(this.menuContent);

    // toggle menu on button click
    this.menuButton.on('pointerdown', () => {
      const isVisible = this.menuPanel.visible;
      if (!isVisible) {
        this.refreshMenuCounts();
      }
      this.menuPanel.setVisible(!isVisible);
    });
  }

  // compute next rebirth cost (integer)
  getNextRebirthCost() {
    const rc = window.rebirthCount || 0;
    return Math.floor(this.rebirthBaseCost * Math.pow(this.rebirthCostScale, rc));
  }

  // Attempt to steal a random country for a flat cost (uniform random across all countries)
  attemptSteal() {
    if (typeof window === 'undefined') return;
  const cost = 100000000; // 100,000,000 (100M)
  if ((window.money || 0) < cost) {
      if (this.moneyText) {
        this.moneyText.setStyle({ color: '#ff3333' });
        this.time.delayedCall(300, () => this.moneyText.setStyle({ color: '#ffffff' }), [], this);
      }
      return;
    }
    // deduct
    window.money = (window.money || 0) - cost;
  // pick a uniformly random country from a restricted steal pool:
  // exclude the special 'tee_mobil' entry and any 'secret'-rarity items
  let stealPool = this.countryDefs.filter(d => d.key !== 'tee_mobil' && d.rarity !== 'secret');
  // if the filter leaves the pool empty for any reason, fall back to excluding only tee_mobil
  if (!stealPool || stealPool.length === 0) stealPool = this.countryDefs.filter(d => d.key !== 'tee_mobil');
  const idx = Math.floor(Math.random() * stealPool.length);
  const def = stealPool[idx];
    // award ownership and income (apply rebirth multiplier)
    window[def.key] = (window[def.key] || 0) + 1;
    window.gameCounters[def.key] = (window.gameCounters[def.key] || 0) + 1;
    const mult = (window.rebirthMultiplier || 1);
    window.incomePerSecond = (window.incomePerSecond || 0) + (def.income * mult);
    // update UI
    if (this.moneyText) this.moneyText.setText(`$${Math.floor(window.money)}`);
    if (this.menuPanel && this.menuPanel.visible) this.refreshMenuCounts();
    // visual feedback: briefly flash the steal button
    if (this.stealButton) {
      this.stealButton.setStyle({ backgroundColor: '#66aa66' });
      this.time.delayedCall(250, () => this.stealButton.setStyle({ backgroundColor: '#884400' }), [], this);
    }
  }

  // attempt to perform a rebirth
  attemptRebirth() {
    if (typeof window === 'undefined') return;
    const cost = this.getNextRebirthCost();
    if ((window.money || 0) < cost) {
      if (this.moneyText) {
        this.moneyText.setStyle({ color: '#ff3333' });
        this.time.delayedCall(300, () => this.moneyText.setStyle({ color: '#ffffff' }), [], this);
      }
      return;
    }
    // pay cost
    window.money = (window.money || 0) - cost;
    // increment rebirth count and multiplier
    window.rebirthCount = (window.rebirthCount || 0) + 1;
    window.rebirthMultiplier = Math.pow(this.rebirthMultiplierPer, window.rebirthCount);
    // reset owned counts and income/money (player restarts progression)
    this.countryDefs.forEach(def => {
      window[def.key] = 0;
      if (window.gameCounters) window.gameCounters[def.key] = 0;
    });
    window.incomePerSecond = 0;
  // reset money to 10,000,000 × rebirthCount after rebirth
  window.money = 100 * (window.rebirthCount || 0);
    // update UI
    if (this.menuPanel && this.menuPanel.visible) this.refreshMenuCounts();
    if (this.moneyText) this.moneyText.setText(`$${Math.floor(window.money)}`);
    if (this.rebirthText) this.rebirthText.setText(`Rebirths: ${window.rebirthCount} | Next: $${this.getNextRebirthCost()} | x${window.rebirthMultiplier}`);
  }

  refreshMenuCounts() {
    // update menu text lines from window.gameCounters or direct window vars
    if (typeof window !== 'undefined') {
      const money = Math.floor(window.money || 0);
      const income = (window.incomePerSecond || 0).toFixed(2);
      const nextCost = this.getNextRebirthCost();
      if (this.menuHeader) this.menuHeader.setText(`Money: $${money}\nIncome: ${income}/sec`);
      if (this.rebirthText) this.rebirthText.setText(`Rebirths: ${window.rebirthCount || 0} | Next: $${nextCost} | x${window.rebirthMultiplier || 1}`);
      // Rebuild menu content into multiple columns using smaller font
      if (this.menuContent) {
        // clear previous content
        this.menuContent.removeAll(true);
        this.menuTexts = {};

        // Build a flat list grouped by rarity where each item is { isHeader, text, key }
        const entries = [];
        this.rarityOrder.forEach(rarity => {
          const headerText = `${rarity.toUpperCase()}`;
          entries.push({ isHeader: true, text: headerText, rarity });
          this.countryDefs.filter(d => d.rarity === rarity).forEach(def => {
            const owned = (window.gameCounters && window.gameCounters[def.key]) ? window.gameCounters[def.key] : (window[def.key] || 0);
            const per = ((def.income * (window.rebirthMultiplier || 1))).toFixed(2);
            const line = `${def.name}: ${owned} (Cost: $${def.cost}, +${per}/s)`;
            entries.push({ isHeader: false, text: line, key: def.key, def });
          });
        });

        // layout parameters
        const font = this.menuSmallFont || '10px Arial';
        const colWidth = this.menuColWidth || 200;
        const panelHeight = 300; // approximate visible area; we will compute rows per column
        const lineHeight = 14; // small font line height
        const rowsPerCol = Math.max(6, Math.floor(panelHeight / lineHeight));

        // compute number of columns needed
        const cols = Math.ceil(entries.length / rowsPerCol);

        // create text objects column by column
        for (let c = 0; c < cols; c++) {
          const colX = c * colWidth;
          const startIdx = c * rowsPerCol;
          const endIdx = Math.min(startIdx + rowsPerCol, entries.length);
          let row = 0;
          for (let i = startIdx; i < endIdx; i++) {
            const e = entries[i];
            const y = row * lineHeight;
            if (e.isHeader) {
              const t = this.add.text(colX + 6, y, e.text, { font, color: '#ffff66' }).setOrigin(0, 0);
              this.menuContent.add(t);
            } else {
              const t = this.add.text(colX + 6, y, e.text, { font, color: '#ffffff' }).setOrigin(0, 0).setInteractive();
              // store ref for dynamic updates and click to attempt purchase
              this.menuContent.add(t);
              this.menuTexts[e.key] = t;
              // clicking the menu line will attempt to buy one of the country (if affordable)
              t.on('pointerdown', () => {
                const def = e.def;
                if ((window.money || 0) >= def.cost) {
                  window.money = (window.money || 0) - def.cost;
                  window[def.key] = (window[def.key] || 0) + 1;
                  window.gameCounters[def.key] = (window.gameCounters[def.key] || 0) + 1;
                  const mult = (window.rebirthMultiplier || 1);
                  window.incomePerSecond = (window.incomePerSecond || 0) + (def.income * mult);
                  if (this.moneyText) this.moneyText.setText(`$${Math.floor(window.money)}`);
                  this.refreshMenuCounts();
                } else {
                  if (this.moneyText) {
                    this.moneyText.setStyle({ color: '#ff3333' });
                    this.time.delayedCall(300, () => this.moneyText.setStyle({ color: '#ffffff' }), [], this);
                  }
                }
              });
            }
            row += 1;
          }
        }
      }
    }
  }

  update(time, delta) {
    // spawn new sprite if enough time passed
    if (time > this.lastSpawn + this.spawnCooldown) {
      this.spawnFaller();
      this.lastSpawn = time;
    }

    // move sprites/containers down each frame
    this.fallingGroup.children.each(child => {
      // support container with custom vy
      if (child.vy !== undefined) {
        child.y += child.vy;
        // approximate height: if container has width/height use those, else fallback to 32
        const h = (child.list && child.list[0] && child.list[0].height) ? child.list[0].height : 32;
        if (child.y > this.scale.height + h) {
          child.destroy();
        }
      } else {
        // assume a sprite
        child.y += 2;
        if (child.y > this.scale.height + child.height) {
          child.destroy();
        }
      }
    }, this);

    // accumulate passive income: delta is ms, incomePerSecond is per second
    if (typeof window !== 'undefined') {
      const income = window.incomePerSecond || 0;
      if (income > 0) {
        const gained = income * (delta / 1000);
        // accumulate fractional income in a remainder buffer; only add whole integer dollars to window.money
        this.moneyRemainder = (this.moneyRemainder || 0) + gained;
        if (this.moneyRemainder >= 1) {
          const whole = Math.floor(this.moneyRemainder);
          window.money = (window.money || 0) + whole;
          this.moneyRemainder -= whole;
        }
        // update money UI (integer)
        if (this.moneyText) this.moneyText.setText(`$${(window.money || 0)}`);
        // if menu is open, update header
        if (this.menuPanel && this.menuPanel.visible && this.menuHeader) {
          this.menuHeader.setText(`Money: $${(window.money || 0)}\nIncome: ${((window.incomePerSecond || 0)).toFixed(2)}/sec`);
        }
      }
    }
  }

  spawnFaller() {
    // spawn at x = 750 at the top (y = 0)
    // If configured, guarantee the first few spawns are Brazil to bootstrap the game
    let def = null;
    if (this.guaranteeBrazilSpawns && this.guaranteeBrazilSpawns > 0) {
      def = this.countryDefs.find(d => d.key === 'brazil') || this.countryDefs[0];
      this.guaranteeBrazilSpawns -= 1;
    } else {
      // pick a rarity first based on configured rarityProbs
      let rr = Math.random();
      let acc = 0;
      let chosenRarity = this.rarityOrder[this.rarityOrder.length - 1];
      for (let i = 0; i < this.rarityProbs.length; i++) {
        acc += this.rarityProbs[i];
        if (rr <= acc) { chosenRarity = this.rarityOrder[i]; break; }
      }
      // pick a random country uniformly from that rarity group
      const candidates = this.countryDefs.filter(d => d.rarity === chosenRarity);
      def = candidates.length ? candidates[Math.floor(Math.random() * candidates.length)] : this.countryDefs[Math.floor(Math.random() * this.countryDefs.length)];
    }

    // create a container so we can show sprite + price/income labels
  // clamp X so labels on the right side don't go off-screen; leave room for labels (about 100px)
  const clampX = Math.max(10, Math.min(this.scale.width - 120, 750));
  const x = clampX;
  const y = 0;
  const container = this.add.container(x, y);

    const flag = this.add.sprite(0, 0, `flag_${def.key}`).setOrigin(0, 0);
  // ensure sprite displays at 64x48 regardless of source image size
  flag.setDisplaySize(64, 48);
  container.add(flag);

    // show price and income as small labels to the right of the flag (avoid overlap with 64x48 flag)
    const labelX = 72; // flag width (64) + small gap (8)
    const priceText = this.add.text(labelX, 4, `$${def.cost}`, { font: '12px Arial', color: '#ffffff' }).setOrigin(0, 0);
    const incomeText = this.add.text(labelX, 22, `+${def.income}/s`, { font: '12px Arial', color: '#aaffaa' }).setOrigin(0, 0);
    container.add(priceText);
    container.add(incomeText);

  // show rarity label to the left of the flag (slightly centered vertically)
  const rarityText = this.add.text(-60, 14, def.rarity.toUpperCase(), { font: '10px Arial', color: '#ffdd88' }).setOrigin(0, 0);
  container.add(rarityText);

    // store info on container for purchase logic
    container.countryDef = def;

    // make interactive area (use the flag as hit area)
    flag.setInteractive();
    const onClick = () => {
      const def = container.countryDef;
      if (typeof window !== 'undefined') {
        if ((window.money || 0) >= def.cost) {
          window.money = (window.money || 0) - def.cost;
          window[def.key] = (window[def.key] || 0) + 1;
          window.gameCounters[def.key] = (window.gameCounters[def.key] || 0) + 1;
          // apply rebirth multiplier to purchased income
          const mult = (window.rebirthMultiplier || 1);
          window.incomePerSecond = (window.incomePerSecond || 0) + (def.income * mult);
          if (this.moneyText) this.moneyText.setText(`$${Math.floor(window.money)}`);
          if (this.menuPanel.visible) this.refreshMenuCounts();
        } else {
          if (this.moneyText) {
            this.moneyText.setStyle({ color: '#ff3333' });
            this.time.delayedCall(300, () => this.moneyText.setStyle({ color: '#ffffff' }), [], this);
          }
        }
      }
      // destroy container
      flag.off('pointerdown', onClick);
      container.destroy();
    };
    flag.on('pointerdown', onClick, this);

    // add container to group; move it each frame by adding a simple custom update on the container
    this.fallingGroup.add(container);
    // attach custom velocity for the container
    container.vy = 2;
    // override the group's children each loop will provide container objects too
  }

  createRectangleTexture() {
    // For each country we either preload an image (if imageUrl present)
    // or generate a small colored rectangle texture from the provided color.
    this.countryDefs.forEach(def => {
      const key = `flag_${def.key}`;
      if (def.imageUrl) {
        // queue image load for this key; Phaser will fetch during preload
        // (supports http(s) and data: URLs). Note: remote servers must allow CORS.
        this.load.image(key, def.imageUrl);
      } else {
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        const color = (typeof def.color !== 'undefined') ? def.color : 0x888888;
        g.fillStyle(color, 1);
        g.fillRect(0, 0, 64, 48);
        g.generateTexture(key, 64, 48);
        g.destroy();
      }
    });
  }
} 