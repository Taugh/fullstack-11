# LLM Pokédex

A lightweight Pokémon search app built with vanilla HTML, CSS, and JavaScript. It fetches Pokémon data from the PokeAPI and displays detailed information including the Pokémon's name, ID, image, types, abilities, base stats, and flavor text.

## Features

- Search by Pokémon name or Pokédex number
- Random Pokémon button
- Clear search field and reset state
- Error handling for invalid searches
- Loading indicator while the app fetches data
- Pokédex-style card layout with rarity badge and type badges
- Responsive design for desktop and smaller screens

## Tech Stack

- HTML
- CSS
- JavaScript
- PokeAPI

## Project Structure

- `index.html` — page structure and form elements
- `style.css` — styling and Pokédex-inspired layout
- `app.js` — API calls, render logic, form handling, and UI behavior

## How to Run

1. Open the project folder in your browser, or use a local static server.
2. Open `index.html` directly in a browser, or run a simple local server from the project directory.

Example:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## How to Use

- Type a Pokémon name or number into the search box.
- Press Enter or click Search.
- Use Random to generate a random Pokémon.
- Use Clear to reset the input and card display.

## Notes

This app uses the public PokeAPI, so internet access is required to fetch Pokémon data.

## Future Enhancements

- Add a spinner animation while loading
- Add stronger rarity logic based on legends, mythicals, and special forms
- Include generation or region information
- Add a favorites or saved Pokémon feature
