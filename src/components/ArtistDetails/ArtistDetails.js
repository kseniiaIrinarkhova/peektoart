import { getArtistInfo } from "../../scripts/apiConfig.js";
const template = `
<link rel="stylesheet" href="../src/components/ArtistDetails/ArtistDetails.css" />
    <div class="artist">
      <img src="" alt="Artist Portrait">
      <div class="artist-content">
        <div class="artist-title"></div>
        <div class="artist-gallery">
        </div>
      </div>
    </div>
`;

class ArtistDetails extends HTMLElement {
    constructor() {
        super();

        //add shadow to be sure that it works at Chrome
        const shadow = this.attachShadow({ mode: "open" });
        const temlateEl = document.createElement('template');
        temlateEl.innerHTML = template;
        //made a deep clone of html
        shadow.appendChild(temlateEl.content.cloneNode(true));
        this.artist_id = "";
        this.artist_info = {};
    }

    /**
     * @param {any} artist_id
     */
    set addArtistID(artist_id) {
        this.artist_id = artist_id;
    }


    async connectedCallback() {
        //try to get information about artist and render it
        try {

            if (this.artist_id) {
                await this.fetchArtistsInfo(this.artist_id);
            }
            else {
                throw "Error with getting artist ID"
            }
            this.render()
        } catch (error) {
            this.shadowRoot.innerHTML = '<div>Error connected callback.</div>'
            console.error(error);
        }

    }
    async fetchArtistsInfo(artist_id) {
        try {
            this.artist_info = await getArtistInfo(artist_id);

        } catch (error) {
            this.shadowRoot.innerHTML = '<div>Error fetching artist data.</div>'
            console.error(error);
        }
    }

    render() {
        const card = this.shadowRoot.querySelector('.artist');
        card.setAttribute('id', this.artist_id);
        card.querySelector('img').setAttribute("src", this.artist_info.image_url);
        card.querySelector('.artist-title').textContent = this.artist_info.title;
    }

}

customElements.define("artist-info", ArtistDetails);

export default ArtistDetails;