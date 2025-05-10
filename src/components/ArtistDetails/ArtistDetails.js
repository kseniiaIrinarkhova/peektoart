import { getArtistInfo } from "../../scripts/apiConfig.js";
const template = `
<link rel="stylesheet" href="../src/components/ArtistDetails/ArtistDetails.css" />
    <div class="artist">
      <div class="artist-content">
        <div class="artist-info"></div>
        <div class="artist-biography"></div>
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
    set artistID(artist_id) {
        this.artist_id = artist_id;
    }


    async connectedCallback() {
        //try to get information about artist and render it
        try {

            if (this.artist_id) {
                await this.fetchArtistsInfo();
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
    async fetchArtistsInfo() {
        try {
            this.artist_info = await getArtistInfo(this.artist_id);

        } catch (error) {
            this.shadowRoot.innerHTML = '<div>Error fetching artist data.</div>'
            console.error(error);
        }
    }

    render() {
        const card = this.shadowRoot.querySelector('.artist');
        card.setAttribute('id', this.artist_id);
        let dates = '';
        if(this.artist_info.birth_date){
            dates = `( ${this.artist_info.birth_date} - `;
            if(this.artist_info.death_date){
                dates += `${this.artist_info.death_date}`;
            }
            dates += ` )`;
        }

        card.querySelector('.artist-info').innerHTML = `
        <h2>${this.artist_info.title} ${dates}</h2>
        `;

        card.querySelector('.artist-biography').innerHTML = (this.artist_info.description)?
        this.artist_info.description
        : `<p>There is no information about artist biography.</p>`
    }

}

customElements.define("artist-details", ArtistDetails);

export default ArtistDetails;