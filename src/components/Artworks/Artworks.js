import { getArtworks } from "../../scripts/apiConfig.js";
const template = `
<link rel="stylesheet" href="../src/components/ArtistDetails/ArtistDetails.css" />
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
        this.artwork_ids = [];
        this.artworks = [];
    }

    /**
     * @param {any} artwork_ids
     */
    set artworkIDs(artwork_ids) {
        this.artwork_ids = artwork_ids;
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
            this.artworks = await getArtworks(this.artwork_ids);
            console.log(this.artworks)

        } catch (error) {
            this.shadowRoot.innerHTML = '<div>Error fetching artist data.</div>'
            console.error(error);
        }
    }

    render() {
        const artworks = this.shadowRoot.querySelector('.artwork-container');
        artworks.innerHTML = 'Gallery'
    }

}

customElements.define("artwork-container", Artworks);

export default Artworks;