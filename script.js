const charForm = document.getElementById('characterForm');
const charNameInput = document.getElementById('characterName');
const charRaceInput = document.getElementById('characterRace');
const charList = document.getElementById('characterList');
const characterCount = document.getElementById('characterCount');
const displayName = document.getElementById('displayName');
const displayRace = document.getElementById('displayRace');
const topHp = document.getElementById('topHp');
const topMaxHp = document.getElementById('topMaxHp');
const topXp = document.getElementById('topXp');
const topMp = document.getElementById('topMp');
const topMaxMp = document.getElementById('topMaxMp');
const traitCards = document.getElementById('traitCards');
const rosterCard = document.getElementById('rosterCard');
const playerCard = document.getElementById('playerCard');
const statActionButtons = document.querySelectorAll('[data-action]');
const saveIndicator = document.getElementById('saveIndicator');

const STORAGE_KEY = 'tabletopTraitState';

const TRAITS = [
  {
    key: 'constitution',
    label: 'Constitution',
    paths: [
      {
        key: 'mitigation',
        label: 'Mitigation',
        abilities: [
          { label: 'Blocker', description: 'block 1 dmg/round' },
          { label: 'Hardened', description: 'block 1 attack/day' },
          { label: 'Mitigator', description: 'block 2 dmg/hit' },
          { label: 'First Strike Guard', description: 'block all 1st attacks' }
        ]
      },
      {
        key: 'regeneration',
        label: 'Regeneration',
        abilities: [
          { label: 'Sustainer', description: 'heal 1 hp/round' },
          { label: 'Survivor', description: 'heal 5 hp/day' },
          { label: 'Regenerator', description: 'heal 2 hp/hit' },
          { label: 'Lifesteal', description: 'gain 3 hp/attack' }
        ]
      }
    ]
  },
  {
    key: 'dexterity',
    label: 'Dexterity',
    paths: [
      {
        key: 'reaction',
        label: 'Reaction',
        abilities: [
          { label: 'High Grounder', description: 'adv on 1st attack' },
          { label: 'Interceptor', description: 'catch 1 projectile/round' },
          { label: 'Dodger', description: 'dodge 1 attack/round' },
          { label: 'Perry', description: 'take a reactive action/round' }
        ]
      },
      {
        key: 'stealth',
        label: 'Stealth',
        abilities: [
          { label: 'Sneaker', description: 'unnoticed 20ft away' },
          { label: 'Smooth', description: 'double adv on sleight of hand' },
          { label: 'Hider', description: 'unnoticed in shadows' },
          { label: 'Climber', description: 'climb virtually anything' }
        ]
      }
    ]
  },
  {
    key: 'intelligence',
    label: 'Intelligence',
    paths: [
      {
        key: 'perception',
        label: 'Perception',
        abilities: [
          { label: 'Attentive', description: 'notice loot' },
          { label: 'Seeker', description: 'notice secret entrances' },
          { label: 'Seer', description: 'notice hidden enemies' },
          { label: 'Perceptive', description: 'notice mob weaknesses' }
        ]
      },
      {
        key: 'arcana',
        label: 'Arcana',
        abilities: [
          { label: 'Magnet', description: 'detect magic sources' },
          { label: 'Discerner', description: 'understand magic power' },
          { label: 'Illusionist', description: 'use mana to improve illusions' },
          { label: 'Herbalist', description: 'craft potions based on ingredients' }
        ]
      }
    ]
  },
  {
    key: 'magic',
    label: 'Magic',
    paths: [
      {
        key: 'pyromancer',
        label: 'Pyromancer',
        abilities: [
          { label: 'Floor is Lava', description: '1d2 in 15ft circle range 20ft' },
          { label: 'Tornado', description: '1d8 cone range 20ft' },
          { label: 'Firewall', description: '3d4 10ft wide range 20ft' },
          { label: 'Explosion', description: '2d8 15ft circle range 20ft' }
        ]
      },
      {
        key: 'cryomancer',
        label: 'Cryomancer',
        abilities: [
          { label: 'Ice Dagger', description: '1d4 range 15ft' },
          { label: 'Ice Scimitars', description: '2d4' },
          { label: 'Ice Spears', description: '1d12 range 30ft' },
          { label: 'Ice Shurikens', description: '4d4 range 20ft' }
        ]
      },
      {
        key: 'biomancer',
        label: 'Biomancer',
        abilities: [
          { label: 'Root', description: 'restrain 1 med or 2 small range 20ft' },
          { label: 'Vine', description: 'restrain 1 large, 2 med, or 3 small range 20ft' },
          { label: 'Sap', description: '40x40ft small stuck, med/large slowed' },
          { label: 'Tree', description: '1d4, 1d6, 1d8 or restrain 1 XL' }
        ]
      },
      {
        key: 'lunamancer',
        label: 'Lunamancer',
        abilities: [
          { label: 'Heal', description: '1d4' },
          { label: 'Protect', description: '10 hp shield 15ft diameter' },
          { label: 'Rejuvenate', description: '2d8 (dividable)' },
          { label: 'Patience', description: 'store healing for 1 attack' }
        ]
      }
    ]
  },
  {
    key: 'weapons',
    label: 'Weapons',
    paths: [
      {
        key: 'melee',
        label: 'Melee',
        abilities: [
          { label: 'Common Weapons', description: 'use d6 weapons common' },
          { label: 'Rare Weapons', description: 'use d8 weapons rare' },
          { label: 'Epic Weapons', description: 'use d10 weapons epic' },
          { label: 'Legendary Weapons', description: 'use d12 weapons legendary' }
        ]
      },
      {
        key: 'ranged',
        label: 'Ranged',
        abilities: [
          { label: 'Common Range', description: 'use d6 weapons common range 30ft' },
          { label: 'Rare Range', description: 'use d8 weapons rare range 50ft' },
          { label: 'Epic Range', description: 'use d10 weapons epic range 75ft' },
          { label: 'Legendary Range', description: 'use d12 weapons legendary range 120ft' }
        ]
      },
      {
        key: 'unarmed',
        label: 'Unarmed',
        abilities: [
          { label: 'Punch', description: '1d4' },
          { label: 'Combo', description: '2d4' },
          { label: 'Adept', description: 'disarm' },
          { label: 'Flurry', description: '3d4' }
        ]
      }
    ]
  }
];

const defaultTraits = TRAITS.reduce((result, trait) => {
  result[trait.key] = trait.paths.reduce((paths, path) => {
    paths[path.key] = 0;
    return paths;
  }, {});
  return result;
}, {});

let state = {
  characters: [],
  selectedIndex: -1
};

let uiState = {
  expandedTrait: null,
  expandedPaths: {},
  rosterOpen: false
};

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

// Escapes user-entered text (character name/race) before it's inserted via
// innerHTML, so a name like "<img src=x onerror=...>" can't execute.
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

function flashSaveIndicator(message) {
  saveIndicator.textContent = message;
  clearTimeout(flashSaveIndicator._t);
  flashSaveIndicator._t = setTimeout(() => { saveIndicator.textContent = ''; }, 1200);
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    const parsed = JSON.parse(saved);
    state = parsed;
    state.characters = state.characters || [];
    state.selectedIndex = clampNumber(parsed.selectedIndex ?? -1, -1, state.characters.length - 1);

    state.characters.forEach((character) => {
      normalizeCharacter(character);
    });
  } catch (error) {
    console.error('loadState', error);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    flashSaveIndicator('Saved');
  } catch (error) {
    console.error('saveState', error);
    flashSaveIndicator('Save failed');
  }
}

function getSelectedCharacter() {
  if (state.selectedIndex < 0 || state.selectedIndex >= state.characters.length) {
    return null;
  }
  return state.characters[state.selectedIndex];
}

function getMaxHp(selected) {
  if (!selected) return 20;
  const constitution = selected.traits.constitution
    ? Object.values(selected.traits.constitution).reduce((sum, level) => sum + level, 0)
    : 0;
  return 20 + constitution * 3;
}

function getMaxMp(selected) {
  if (!selected) return 0;
  const magic = selected.traits.magic
    ? Object.values(selected.traits.magic).reduce((sum, level) => sum + level, 0)
    : 0;
  return magic * 3;
}

function adjustSelectedHp(amount) {
  const selected = getSelectedCharacter();
  if (!selected) return;
  selected.hp = clampNumber((selected.hp || 0) + amount, 0, getMaxHp(selected));
  renderPlayer();
  saveState();
}

function adjustSelectedXp(amount) {
  const selected = getSelectedCharacter();
  if (!selected) return;
  selected.xp = clampNumber((selected.xp || 0) + amount, 0, 999);
  renderPlayer();
  renderTraits();
  saveState();
}

function adjustSelectedMp(amount) {
  const selected = getSelectedCharacter();
  if (!selected) return;
  selected.mp = clampNumber((selected.mp || 0) + amount, 0, getMaxMp(selected));
  renderPlayer();
  saveState();
}

function resetSelectedMp() {
  const selected = getSelectedCharacter();
  if (!selected) return;
  selected.mp = getMaxMp(selected);
  renderPlayer();
  saveState();
}

function resetSelectedHp() {
  const selected = getSelectedCharacter();
  if (!selected) return;
  selected.hp = getMaxHp(selected);
  renderPlayer();
  saveState();
}

function createCharacter(name, race) {
  return {
    name,
    race,
    hp: 20,
    xp: 0,
    mp: 0,
    patienceHealed: 0,
    traits: JSON.parse(JSON.stringify(defaultTraits))
  };
}

function normalizeCharacter(character) {
  character.hp = clampNumber(character.hp ?? 20, 0, getMaxHp(character));
  character.xp = character.xp ?? 0;
  character.mp = clampNumber(character.mp ?? 0, 0, getMaxMp(character));
  character.patienceHealed = clampNumber(character.patienceHealed ?? 0, 0, 999999);
  character.traits = {
    ...defaultTraits,
    ...(character.traits || {})
  };

  TRAITS.forEach((trait) => {
    trait.paths.forEach((path) => {
      character.traits[trait.key][path.key] = clampNumber(
        character.traits[trait.key][path.key] || 0,
        0,
        path.abilities.length
      );
    });
  });
}

function renderPlayer() {
  const selected = getSelectedCharacter();
  displayName.textContent = selected?.name || '—';
  displayRace.textContent = selected?.race || '—';
  topHp.textContent = selected?.hp != null ? selected.hp : '—';
  topMaxHp.textContent = selected ? getMaxHp(selected) : '—';
  topXp.textContent = selected?.xp != null ? selected.xp : '—';
  topMp.textContent = selected?.mp != null ? selected.mp : '—';
  topMaxMp.textContent = selected ? getMaxMp(selected) : '—';
}

function renderRoster() {
  charList.innerHTML = '';
  characterCount.textContent = `${state.characters.length}`;
  rosterCard?.classList.toggle('hidden', !uiState.rosterOpen);

  state.characters.forEach((character, index) => {
    const activeCount = TRAITS.reduce((sum, trait) => {
      return sum + Object.values(character.traits[trait.key]).reduce((sub, level) => sub + level, 0);
    }, 0);

    const item = document.createElement('li');
    item.tabIndex = 0;
    item.className = index === state.selectedIndex ? 'active' : '';
    // name/race are user-entered, so they're escaped before going into innerHTML.
    item.innerHTML = `<strong>${escapeHtml(character.name)}</strong><span>${escapeHtml(character.race)} · ${activeCount}</span>`;

    item.addEventListener('click', () => selectCharacter(index));
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectCharacter(index);
      }
    });

    charList.appendChild(item);
  });
}

function selectCharacter(index) {
  state.selectedIndex = index;
  uiState.expandedTrait = null;
  uiState.expandedPaths = {};
  uiState.rosterOpen = true;
  renderRoster();
  renderPlayer();
  renderTraits();
  saveState();
}

function toggleRoster() {
  uiState.rosterOpen = !uiState.rosterOpen;
  renderRoster();
}

function renderTraits() {
  traitCards.innerHTML = '';
  const selected = getSelectedCharacter();
  if (!selected) {
    traitCards.innerHTML = '<div class="trait-card"><div class="trait-head"><strong class="empty-note">Select or add a character to see traits</strong></div></div>';
    return;
  }

  const sortedTraits = [...TRAITS]
    .map((trait) => ({
      trait,
      total: Object.values(selected.traits[trait.key]).reduce((sum, value) => sum + value, 0)
    }))
    .sort((a, b) => b.total - a.total || a.trait.label.localeCompare(b.trait.label));

  sortedTraits.forEach(({ trait, total: traitTotal }) => {
    const isOpen = uiState.expandedTrait === trait.key;

    const card = document.createElement('div');
    card.className = `trait-card${isOpen ? ' open' : ''}`;
    card.innerHTML = `
      <div class="trait-head" role="button" tabindex="0" aria-expanded="${isOpen}">
        <strong>${trait.label}</strong>
        <span>${traitTotal} active</span>
      </div>
      <div class="path-list" style="display: ${isOpen ? 'grid' : 'none'};">
        ${trait.paths
          .map((path) => {
            const level = selected.traits[trait.key][path.key] || 0;
            const pathOpen = uiState.expandedPaths[`${trait.key}:${path.key}`];
            return `
              <div class="path-item">
                <button class="path-button" data-trait="${trait.key}" data-path="${path.key}" aria-expanded="${!!pathOpen}">
                  <strong>${path.label}</strong>
                  <span>${level}/${path.abilities.length}</span>
                </button>
                <div class="path-details${pathOpen ? ' open' : ''}">
                  <ul class="ability-list">
                    ${[...path.abilities]
                      .map((ability, index) => ({ ability, index }))
                      .sort((a, b) => {
                        const levelA = a.index < level ? 1 : 0;
                        const levelB = b.index < level ? 1 : 0;
                        return levelB - levelA || a.index - b.index;
                      })
                      .map(({ ability, index }) => {
                        const active = index < level;
                        const isHighestActive = index + 1 === level;
                        const isNextLevel = index === level;
                        const upgradeCost = index + 1;
                        const canAffordUpgrade = selected.xp >= upgradeCost;
                        const disabled = index > level || (index === level && !canAffordUpgrade) || (index < level && !isHighestActive);
                        const costLabel = isNextLevel
                          ? `-${upgradeCost}xp`
                          : isHighestActive
                          ? `+${upgradeCost}xp`
                          : '';
                        const costClass = isNextLevel ? 'buy' : isHighestActive ? 'refund' : '';
                        return `
                          <li class="ability-item ${active ? 'active' : ''} ${disabled ? 'locked' : ''}">
                            <button type="button" data-trait="${trait.key}" data-path="${path.key}" data-index="${index}" ${disabled ? 'disabled' : ''}>
                              <span class="ability-text">
                                <span class="ability-title">${ability.label}</span>
                                <span class="ability-subtitle">${ability.description}</span>
                              </span>
                              ${costLabel ? `<span class="ability-cost ${costClass}">${costLabel}</span>` : ''}
                            </button>
                          </li>
                        `;
                      })
                      .join('')}
                  </ul>
                  ${trait.key === 'magic' && path.key === 'lunamancer' && level >= path.abilities.length
                    ? `
                    <div class="patience-tracker">
                      <span class="ability-text">
                        <span class="ability-title">Patience</span>
                        <span class="ability-subtitle">healing stored: ${selected.patienceHealed || 0}</span>
                      </span>
                      <div class="patience-controls">
                        <button type="button" class="patience-btn" data-patience-action="subtract">-1</button>
                        <button type="button" class="patience-btn" data-patience-action="add">+1</button>
                        <button type="button" class="patience-btn patience-reset" data-patience-action="reset">Reset</button>
                      </div>
                    </div>
                    `
                    : ''}
                </div>
              </div>
            `;
          })
          .join('')}
      </div>
    `;

    const head = card.querySelector('.trait-head');
    const toggleTrait = () => {
      uiState.expandedTrait = isOpen ? null : trait.key;
      renderTraits();
    };
    head.addEventListener('click', toggleTrait);
    head.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleTrait();
      }
    });

    card.querySelectorAll('.path-button').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        const key = `${button.dataset.trait}:${button.dataset.path}`;
        uiState.expandedPaths[key] = !uiState.expandedPaths[key];
        renderTraits();
      });
    });

    card.querySelectorAll('.ability-item button').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        const traitKey = button.dataset.trait;
        const pathKey = button.dataset.path;
        const index = Number(button.dataset.index);
        const currentLevel = selected.traits[traitKey][pathKey] || 0;
        const isHighestActive = index + 1 === currentLevel;
        const isNextLevel = index === currentLevel;
        const cost = index + 1;
        const maxLevel = TRAITS.find((t) => t.key === traitKey).paths.find((p) => p.key === pathKey).abilities.length;

        if (isNextLevel) {
          selected.traits[traitKey][pathKey] = clampNumber(currentLevel + 1, 0, maxLevel);
          selected.xp = clampNumber((selected.xp || 0) - cost, 0, 999);
        } else if (isHighestActive) {
          selected.traits[traitKey][pathKey] = clampNumber(currentLevel - 1, 0, maxLevel);
          selected.xp = clampNumber((selected.xp || 0) + cost, 0, 999);
        }

        normalizeCharacter(selected);
        renderRoster();
        renderPlayer();
        renderTraits();
        saveState();
      });
    });

    card.querySelectorAll('.patience-btn').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        const action = button.dataset.patienceAction;
        if (action === 'add') selected.patienceHealed = clampNumber((selected.patienceHealed || 0) + 1, 0, 999999);
        if (action === 'subtract') selected.patienceHealed = clampNumber((selected.patienceHealed || 0) - 1, 0, 999999);
        if (action === 'reset') selected.patienceHealed = 0;
        renderTraits();
        saveState();
      });
    });

    traitCards.appendChild(card);
  });
}

charForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = charNameInput.value.trim();
  const race = charRaceInput.value.trim();
  if (!name || !race) return;

  const character = createCharacter(name, race);
  state.characters.push(character);
  state.selectedIndex = state.characters.length - 1;
  charNameInput.value = '';
  charRaceInput.value = '';

  renderRoster();
  renderPlayer();
  renderTraits();
  saveState();
});

playerCard?.addEventListener('click', toggleRoster);
playerCard?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    toggleRoster();
  }
});

statActionButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    // Without this, clicking a stat button also bubbled up to playerCard's
    // click handler and toggled the roster open/closed every time.
    event.stopPropagation();
    const action = button.dataset.action;
    if (action === 'hpUp') adjustSelectedHp(1);
    if (action === 'hpDown') adjustSelectedHp(-1);
    if (action === 'hpReset') resetSelectedHp();
    if (action === 'xpUp') adjustSelectedXp(1);
    if (action === 'xpDown') adjustSelectedXp(-1);
    if (action === 'mpUp') adjustSelectedMp(1);
    if (action === 'mpDown') adjustSelectedMp(-1);
    if (action === 'mpReset') resetSelectedMp();
  });
});

loadState();
renderRoster();
renderPlayer();
renderTraits();
