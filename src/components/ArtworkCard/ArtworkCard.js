import { getArtistsNames } from "../../scripts/apiConfig.js";
const template = `
<link rel="stylesheet" href="../src/components/ArtworkCard/ArtworkCard.css" />
    <div class="artwork-card">
      <img src="" alt="Artwork Image">
      <div class="card-content">
        <div class="card-title"></div>
        <div class="card-artist">
        </div>
      </div>
    </div>
`;

class ArtworkCard extends HTMLElement {
  constructor() {
    super();

    //add shadow to be sure that it works at Chrome
    const shadow = this.attachShadow({ mode: "open" });
    const temlateEl = document.createElement('template');
    temlateEl.innerHTML = template;
    //made a deep clone of html
    shadow.appendChild(temlateEl.content.cloneNode(true));
    this.artwork = {};
  }

  /**
   * @param {any} artwork
   */
  set artworkData(artwork) {
    this.artwork = artwork;
  }
  async connectedCallback() {
    try {
      if (this.artwork.artist_id) {
        const artist = await this.fetchArtistInfo(this.artwork.artist_id);
        this.artwork.artist_id = artist;
      }
      this.render()
    } catch (error) {
      this.shadowRoot.innerHTML = '<div>Error connected callback.</div>'
      console.error(error);
    }

  }
  async fetchArtistInfo(artist_id) {
    try {
      const artists = await getArtistsNames([artist_id]);
      return artists[0];

    } catch (error) {
      this.shadowRoot.innerHTML = '<div>Error fetching artists data.</div>'
      console.error(error);
    }
  }

  render() {
    const card = this.shadowRoot.querySelector('.artwork-card');
    card.setAttribute('id', this.artwork.id);
    card.querySelector('img').setAttribute("src", this.createImageURL(this.artwork.image_id));
    card.querySelector('.card-title').textContent = this.artwork.title;
    let artist = card.querySelector('.card-artist');
    if (this.artwork.artist_id) {
      artist.innerHTML = `<a href="#/artists/${this.artwork.artist_id.id}">${this.artwork.artist_id.title}</a>`;
    } else {
      artist.textContent = 'No information about artwork artists.'
    }
  }
  createImageURL(image_id) {
    if (image_id) {
      return `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`;

    } else {
      return `/src/imgs/image_not_available.png`
    }
  }

}



customElements.define("artwork-card", ArtworkCard);

export default ArtworkCard;