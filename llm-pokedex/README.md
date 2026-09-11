# LLM Pokédex

A polished Pokémon search app built with vanilla HTML, CSS, and JavaScript. It pulls data from the PokeAPI and displays a modern Pokédex-inspired card board with search, random generation, rarity labels, and flip-card details.

## Features

- Search by Pokémon name or Pokédex number
- Search multiple Pokémon at once by separating entries with commas or line breaks
- Display results in a responsive multi-card grid
- Flip cards to reveal the back side with extra details
- Random Pokémon button for quick discovery
- Clear button to reset the search and display area
- Loading indicator while data is being fetched
- Rarity badges for legendary, mythical, rare, baby, and common Pokémon
- Type badges and stat previews on the front of each card
- Full stat block, abilities, height, weight, and flavor text on the back of each card
- Responsive and mobile-friendly layout
- Polished gradient background and card styling for a more game-like Pokédex feel

## Tech Stack

- HTML
- CSS
- JavaScript
- PokeAPI

## Project Structure

- `index.html` — page structure, search form, and display container
- `style.css` — visual design, gradients, card layout, flip animation, and responsive styling
- `app.js` — API calls, search handling, multi-result rendering, and card generation logic

## How to Run

This project is a static front-end app, so you do not need Python or a build step to run it.

You can either:

1. Open `index.html` directly in a browser, or
2. Serve the folder with a lightweight local web server.

Example using a local web server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

If you prefer, you can also use any other local static server tool you already have installed.

## How to Use

- Type one or more Pokémon names or numbers into the search box.
- Separate multiple searches with commas or line breaks.
- Press Enter or click Search.
- Click any card to flip it and reveal more details.
- Use Random to load a random Pokémon.
- Use Clear to reset the input and card display.

## Notes

This app uses the public PokeAPI, so internet access is required to fetch Pokémon data.

## Future Enhancements

- Add Pokémon favorites or saved collection tracking
- Include generation, region, or habitat information
- Add a smoother card animation or zoom on hover
- Add filters by type or rarity
- Add a stronger loading spinner or skeleton card effect
