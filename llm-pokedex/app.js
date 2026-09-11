// DOM Elements
const form = document.querySelector("#search-form");
const input = document.querySelector("#pokemon-input");
const pokemonDisplay = document.querySelector("#pokemon-display");
const messageArea = document.querySelector("#message-area");
const randomButton = document.querySelector("#random-btn");
const clearButton = document.querySelector("#clear-btn");

let isLoading = false;

if (!form || !input || !pokemonDisplay || !messageArea || !randomButton || !clearButton) {
    throw new Error("Required DOM elements are missing from the page.");
}

// --------------------
// API Functions
// --------------------
async function getPokemon(searchTerm) {
    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(searchTerm)}`
        );

        if (!response.ok) {
            throw new Error(`Pokemon not found (${response.status})`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
        return null;
    }
}

async function getPokemonSpecies(searchTerm) {
    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon-species/${encodeURIComponent(searchTerm)}`
        );

        if (!response.ok) {
            throw new Error(`Species data not found (${response.status})`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching species data:", error);
        return null;
    }
}

// --------------------
// Error Handling
// --------------------
function displayError(message) {
    pokemonDisplay.innerHTML = "";
    messageArea.textContent = message;
    messageArea.classList.remove("loading");
    isLoading = false;
}

function clearMessage() {
    messageArea.textContent = "";
    messageArea.classList.remove("loading");
    isLoading = false;
}

function showLoading() {
    isLoading = true;
    messageArea.textContent = "Searching Pokédex...";
    messageArea.classList.add("loading");
}

function hideLoading() {
    isLoading = false;
    messageArea.textContent = "";
    messageArea.classList.remove("loading");
}

function getEnglishValue(entries, key) {
    const match = entries?.find((entry) => entry.language?.name === "en");
    return match?.[key] ?? null;
}

function getRarity(speciesData) {
    if (speciesData?.is_legendary) return { label: "Legendary", tone: "legendary" };
    if (speciesData?.is_mythical) return { label: "Mythical", tone: "mythical" };
    if (speciesData?.is_ubiquitous === false) return { label: "Rare", tone: "rare" };
    if (speciesData?.is_baby) return { label: "Baby", tone: "baby" };
    return { label: "Common", tone: "common" };
}

function resetSearchState() {
    input.value = "";
    clearMessage();
    pokemonDisplay.innerHTML = "";
}

function normalizeSearchTerms(rawInput) {
    return [...new Set(
        rawInput
            .split(/[\n,]+/)
            .map((term) => term.trim().toLowerCase())
            .filter(Boolean)
    )];
}

function buildFlipCard(pokemonData, speciesData) {
    const card = document.createElement("div");
    card.classList.add("flip-card");

    const inner = document.createElement("div");
    inner.classList.add("flip-card-inner");

    const front = document.createElement("div");
    front.classList.add("flip-card-face", "flip-card-front");

    const back = document.createElement("div");
    back.classList.add("flip-card-face", "flip-card-back");

    const headerRow = document.createElement("div");
    headerRow.classList.add("pokemon-header");

    const name = document.createElement("h2");
    name.textContent = pokemonData.name
        ? pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)
        : "Unknown Pokémon";

    const id = document.createElement("p");
    id.classList.add("pokemon-id");
    id.textContent = `#${pokemonData.id ?? "?"}`;

    headerRow.appendChild(name);
    headerRow.appendChild(id);

    const image = document.createElement("img");
    image.src = pokemonData.sprites?.front_default || "https://placehold.co/96x96/ffffff/333333?text=No+Image";
    image.alt = pokemonData.name || "Pokémon image";
    image.loading = "lazy";

    const genus = getEnglishValue(speciesData.genera, "genus") || "Unknown Pokémon";
    const category = document.createElement("p");
    category.classList.add("pokemon-category");
    category.textContent = genus;

    const rarity = getRarity(speciesData);
    const rarityBadge = document.createElement("span");
    rarityBadge.classList.add("rarity-badge", `rarity-${rarity.tone}`);
    rarityBadge.textContent = rarity.label;

    const description = getEnglishValue(speciesData.flavor_text_entries, "flavor_text");
    const summaryText = description
        ? description.replace(/\f/g, " ").replace(/\n/g, " ").replace(/\s+/g, " ").trim()
        : "No summary available.";

    const summary = document.createElement("p");
    summary.classList.add("pokemon-summary");
    const teaser = summaryText.length > 55 ? `${summaryText.slice(0, 55).trim()}...` : summaryText;
    summary.textContent = teaser;

    const statPreview = document.createElement("div");
    statPreview.classList.add("front-stat-grid");

    const previewStats = [
        { label: "HP", value: pokemonData.stats?.[0]?.base_stat ?? 0 },
        { label: "ATK", value: pokemonData.stats?.[1]?.base_stat ?? 0 },
        { label: "SPD", value: pokemonData.stats?.[5]?.base_stat ?? 0 }
    ];

    previewStats.forEach((stat) => {
        const pill = document.createElement("div");
        pill.classList.add("front-stat-pill");

        const label = document.createElement("span");
        label.textContent = stat.label;

        const value = document.createElement("strong");
        value.textContent = stat.value;

        pill.appendChild(label);
        pill.appendChild(value);
        statPreview.appendChild(pill);
    });

    const typeHeading = document.createElement("h3");
    typeHeading.textContent = "Types";

    const typeBadges = document.createElement("div");
    typeBadges.classList.add("type-badges");
    const types = Array.isArray(pokemonData.types) ? pokemonData.types : [];

    if (!types.length) {
        const badge = document.createElement("span");
        badge.classList.add("type-badge");
        badge.textContent = "Unknown";
        typeBadges.appendChild(badge);
    } else {
        types.forEach((type) => {
            const badge = document.createElement("span");
            const typeName = (type.type?.name || "Unknown").toLowerCase();
            badge.classList.add("type-badge", `type-${typeName}`);
            badge.textContent = typeName;
            typeBadges.appendChild(badge);
        });
    }

    front.appendChild(headerRow);
    front.appendChild(image);
    front.appendChild(category);
    front.appendChild(rarityBadge);
    front.appendChild(summary);
    front.appendChild(statPreview);
    front.appendChild(typeHeading);
    front.appendChild(typeBadges);

    const backHeader = document.createElement("div");
    backHeader.classList.add("pokemon-header");
    const backName = document.createElement("h3");
    backName.textContent = name.textContent;
    const backId = document.createElement("p");
    backId.classList.add("pokemon-id");
    backId.textContent = `#${pokemonData.id ?? "?"}`;
    backHeader.appendChild(backName);
    backHeader.appendChild(backId);

    const descriptionText = document.createElement("p");
    descriptionText.classList.add("pokemon-description");
    descriptionText.textContent = summaryText || "No description available.";

    const backInfo = document.createElement("div");
    backInfo.classList.add("back-info");

    const height = document.createElement("p");
    height.textContent = `Height: ${pokemonData.height ?? 0}`;

    const weight = document.createElement("p");
    weight.textContent = `Weight: ${pokemonData.weight ?? 0}`;

    const experience = document.createElement("p");
    experience.textContent = `Base Experience: ${pokemonData.base_experience ?? "N/A"}`;

    const abilityHeading = document.createElement("h3");
    abilityHeading.textContent = "Abilities";

    const abilityList = document.createElement("ul");
    const abilities = Array.isArray(pokemonData.abilities) ? pokemonData.abilities : [];

    if (!abilities.length) {
        const li = document.createElement("li");
        li.textContent = "Unknown";
        abilityList.appendChild(li);
    } else {
        abilities.forEach((ability) => {
            const li = document.createElement("li");
            li.textContent = ability.ability?.name || "Unknown";
            abilityList.appendChild(li);
        });
    }

    const statsHeading = document.createElement("h3");
    statsHeading.textContent = "Base Stats";

    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats-container");

    const statLabels = {
        hp: "HP",
        attack: "Attack",
        defense: "Defense",
        "special-attack": "Special Attack",
        "special-defense": "Special Defense",
        speed: "Speed"
    };

    const stats = Array.isArray(pokemonData.stats) ? pokemonData.stats : [];

    if (!stats.length) {
        const fallback = document.createElement("p");
        fallback.textContent = "No stats available.";
        statsContainer.appendChild(fallback);
    } else {
        stats.forEach((stat) => {
            const statRow = document.createElement("div");
            statRow.classList.add("stat-row");

            const statName = document.createElement("span");
            statName.classList.add("stat-name");
            statName.textContent = statLabels[stat.stat?.name] || "Unknown";

            const statValue = document.createElement("span");
            statValue.classList.add("stat-value");
            statValue.textContent = stat.base_stat ?? 0;

            const barContainer = document.createElement("div");
            barContainer.classList.add("bar-container");

            const bar = document.createElement("div");
            bar.classList.add("bar");
            const normalizedValue = Number(stat.base_stat ?? 0);
            bar.style.width = `${(normalizedValue / 255) * 100}%`;

            barContainer.appendChild(bar);
            statRow.appendChild(statName);
            statRow.appendChild(statValue);
            statRow.appendChild(barContainer);
            statsContainer.appendChild(statRow);
        });
    }

    backInfo.appendChild(height);
    backInfo.appendChild(weight);
    backInfo.appendChild(experience);
    back.appendChild(backHeader);
    back.appendChild(descriptionText);
    back.appendChild(abilityHeading);
    back.appendChild(abilityList);
    back.appendChild(statsHeading);
    back.appendChild(statsContainer);
    back.appendChild(backInfo);

    card.addEventListener("click", () => {
        card.classList.toggle("is-flipped");
    });

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    return card;
}

function renderPokemonList(pokemonResults) {
    pokemonDisplay.innerHTML = "";

    pokemonResults.forEach((result) => {
        if (!result?.pokemon || !result?.species) {
            return;
        }

        const card = buildFlipCard(result.pokemon, result.species);
        pokemonDisplay.appendChild(card);
    });
}

// --------------------
// Form Submission
// --------------------
async function handleSearch(event) {
    event.preventDefault();

    const rawSearch = input.value.trim();
    const searchTerms = normalizeSearchTerms(rawSearch);

    if (!searchTerms.length) {
        displayError("Please enter a Pokémon name or Pokédex number.");
        return;
    }

    showLoading();

    try {
        const results = await Promise.all(
            searchTerms.map(async (searchTerm) => {
                const pokemon = await getPokemon(searchTerm);
                const species = await getPokemonSpecies(searchTerm);

                if (!pokemon || !species) {
                    return null;
                }

                return { pokemon, species };
            })
        );

        const validResults = results.filter(Boolean);

        if (!validResults.length) {
            displayError("Pokémon not found. Check the name or Pokédex number and try again.");
            input.blur();
            return;
        }

        clearMessage();
        renderPokemonList(validResults);
    } catch (error) {
        console.error("Search failed:", error);
        displayError("Unable to load Pokémon data right now. Please try again.");
    } finally {
        input.blur();
        if (isLoading) {
            hideLoading();
        }
    }
}

async function handleRandomPokemon() {
    const randomId = Math.floor(Math.random() * 1025) + 1;
    input.value = String(randomId);
    showLoading();

    try {
        const pokemon = await getPokemon(randomId);
        const species = await getPokemonSpecies(randomId);

        if (!pokemon || !species) {
            displayError("A random Pokémon could not be loaded. Please try again.");
            input.blur();
            return;
        }

        clearMessage();
        renderPokemonList([{ pokemon, species }]);
    } catch (error) {
        console.error("Random Pokémon search failed:", error);
        displayError("Unable to load a random Pokémon right now.");
    } finally {
        input.blur();
        if (isLoading) {
            hideLoading();
        }
    }
}

// Event Listener
form.addEventListener("submit", handleSearch);
randomButton.addEventListener("click", handleRandomPokemon);
clearButton.addEventListener("click", resetSearchState);
input.addEventListener("focus", () => {
    if (input.value.trim()) {
        input.value = "";
    }
    clearMessage();
    pokemonDisplay.innerHTML = "";
});