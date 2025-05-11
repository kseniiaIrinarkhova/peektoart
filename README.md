# Distinctiveness and Complexity

**Peek to Art** is a Single Page Application (SPA) built with **Vanilla JavaScript** that connects to the [Art Institute of Chicago API](https://api.artic.edu/docs/#introduction). It displays a collection of artworks, exhibitions, and artist details, allowing users to explore rich art data in a minimalistic UI. The application uses Shadow DOM-based Web Components, a custom client-side router, and dynamic rendering of data from a public API. Error handling and routing logic are included to enhance user experience.


# Technical documentation of the project
## Code specification
The application is organized using a modular folder structure under `/src`:

```
src/
│
├── components/              # Custom web components
│   ├── About/               # Informational views
│   ├── ArtistDetails/       # Individual artist detail view
│   ├── ArtworkCard/         # Artwork card component with styles
│   ├── Artworks/            # List or grid of artwork cards
│   ├── ErrorPage/           # Error page component
│   ├── ExhibitionCard/      # Exhibition card component
│   ├── Exhibitions/         # List of exhibitions
│   ├── SiteFooter/          # Footer component
│   └── SiteHeader/          # Header with site navigation
│
├── imgs/                    # Static assets
│   ├── art_icon.svg
│   └── image_not_available.png
│
├── scripts/                 # Entry point and router logic
│   ├── apiConfig.js         # API endpoint and key config
│   ├── index.js             # App bootstrap logic
│   └── Router.js            # SPA router with history management
│
├── styles/                  # Shared styles
│   └── style.css
│
└── index.html               # Root HTML file
```
Each major visual element is a **custom component**, and `Router.js` handles dynamic navigation without full page reloads. Components communicate through shared state and dynamic DOM manipulation via `shadowRoot`.

## Installation

To run the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kseniiaIrinarkhova/peektoart
   cd peektoart
   ```

2. **Install dependencies** (if using a bundler or live server setup):
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

> Note: If you're using the [Live Server VS Code extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), right-click `index.html` and select **"Open with Live Server"**.



# Author
Project prepared as a pre-work assignment at *Code The Dream* by [Kseniia Irinarkhova](https://www.linkedin.com/in/kseniia-irinarkhova/).

# Additional Resources
[Art Institute of Chicago API](https://api.artic.edu/docs/#introduction)
[SVG icons](https://www.svgrepo.com/)
