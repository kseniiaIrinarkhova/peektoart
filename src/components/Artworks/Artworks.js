import { getArtworks } from "../../scripts/apiConfig.js";
const template = `
<link rel="stylesheet" href="../src/components/Artworks/Artworks.css" />
    <h2>Artworks gallery.</h2>
    <div class="artwork-container">      
    </div>
`;

class Artworks extends HTMLElement {
    constructor() {
        super();

        //add shadow to be sure that it works at Chrome
        const shadow = this.attachShadow({ mode: "open" });
        const temlateEl = document.createElement('template');
        temlateEl.innerHTML = template;
        //made a deep clone of html
        shadow.appendChild(temlateEl.content.cloneNode(true));
        this.artworks = [];
        this.exhibition_id = '';
        this.artworksContainer = this.shadowRoot.querySelector('.artwork-container')
        this.artworksContainer.innerHTML = `<div>Loading artworks data...</div>`;
    }


    /**
     * @param {string} exhibition_id
     */
    set exhibitionID(exhibition_id) {
        this.exhibition_id = exhibition_id;
    }


    async connectedCallback() {
        //try to get information about artist and render it
        try {
            await this.fetchArtworks();
            this.render()
        } catch (error) {
            this.shadowRoot.innerHTML = '<div>Error connected callback.</div>'
            console.error(error);
        }

    }
    async fetchArtworks() {
        try {
            this.artworks = await getArtworks(this.exhibition_id);

        } catch (error) {
            this.shadowRoot.innerHTML = '<div>Error fetching artist data.</div>'
            console.error(error);
        }
    }

    render() {
        this.artworksContainer.innerHTML = '';

        //get data from API
        this.artworks.forEach((artwork) => {
            const artworkEl = document.createElement("artwork-card");
            artworkEl.artworkData = artwork;
            this.artworksContainer.appendChild(artworkEl);
        })
    }

}

customElements.define("artwork-container", Artworks);

export default Artworks;