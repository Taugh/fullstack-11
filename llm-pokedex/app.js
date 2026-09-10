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

// --------------------
// Render Pokemon
// --------------------
function renderPokemon(data, speciesData) {
    pokemonDisplay.innerHTML = "";

    const card = document.createElement("div");
    card.classList.add("pokemon-card");

    const headerRow = document.createElement("div");
    headerRow.classList.add("pokemon-header");

    const name = document.createElement("h2");
    name.textContent = data.name
        ? data.name.charAt(0).toUpperCase() + data.name.slice(1)
        : "Unknown Pokémon";

    const id = document.createElement("p");
    id.classList.add("pokemon-id");
    id.textContent = `#${data.id ?? "?"}`;

    headerRow.appendChild(name);
    headerRow.appendChild(id);

    const image = document.createElement("img");
    image.src = data.sprites?.front_default || "https://placehold.co/96x96/ffffff/333333?text=No+Image";
    image.alt = data.name || "Pokémon image";
    image.loading = "lazy";

    const genus = getEnglishValue(speciesData.genera, "genus") || "Unknown Pokémon";
    const category = document.createElement("p");
    category.classList.add("pokemon-category");
    category.textContent = genus;

    const rarity = getRarity(speciesData);
    const rarityBadge = document.createElement("span");
    rarityBadge.classList.add("rarity-badge", `rarity-${rarity.tone}`);
    rarityBadge.textContent = rarity.label;

    const descriptionText = document.createElement("p");
    descriptionText.classList.add("pokemon-description");
    const description = getEnglishValue(speciesData.flavor_text_entries, "flavor_text");
    descriptionText.textContent = description
        ? description.replace(/\f/g, " ").replace(/\n/g, " ").trim()
        : "No description available.";

    const height = document.createElement("p");
    height.textContent = `Height: ${data.height ?? 0}`;

    const weight = document.createElement("p");
    weight.textContent = `Weight: ${data.weight ?? 0}`;

    const experience = document.createElement("p");
    experience.textContent = `Base Experience: ${data.base_experience ?? "N/A"}`;

    // --------------------
    // Types
    // --------------------
    const typeHeading = document.createElement("h3");
    typeHeading.textContent = "Types";

    const typeBadges = document.createElement("div");
    typeBadges.classList.add("type-badges");
    const types = Array.isArray(data.types) ? data.types : [];

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

    // --------------------
    // Abilities
    // --------------------
    const abilityHeading = document.createElement("h3");
    abilityHeading.textContent = "Abilities";

    const abilityList = document.createElement("ul");
    const abilities = Array.isArray(data.abilities) ? data.abilities : [];

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

    // --------------------
    // Stats
    // --------------------
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

    const stats = Array.isArray(data.stats) ? data.stats : [];

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

    // Append all elements to the card
    card.appendChild(headerRow);
    card.appendChild(image);
    card.appendChild(category);
    card.appendChild(rarityBadge);
    card.appendChild(descriptionText);
    card.appendChild(height);
    card.appendChild(weight);
    card.appendChild(experience);
    card.appendChild(typeHeading);
    card.appendChild(typeBadges);
    card.appendChild(abilityHeading);
    card.appendChild(abilityList);
    card.appendChild(statsHeading);
    card.appendChild(statsContainer);

    pokemonDisplay.appendChild(card);
}

// --------------------
// Form Submission
// --------------------
async function handleSearch(event) {
    event.preventDefault();

    const searchTerm = input.value.trim().toLowerCase();

    if (!searchTerm) {
        displayError("Please enter a Pokémon name or Pokédex number.");
        return;
    }

    showLoading();

    try {
        const pokemon = await getPokemon(searchTerm);
        const species = await getPokemonSpecies(searchTerm);

        if (!pokemon || !species) {
            displayError("Pokémon not found. Check the name or Pokédex number and try again.");
            input.blur();
            return;
        }

        clearMessage();
        renderPokemon(pokemon, species);
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
        renderPokemon(pokemon, species);
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
    input.value = "";
    clearMessage();
    pokemonDisplay.innerHTML = "";
});