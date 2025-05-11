import { getArtistsNames } from "../../scripts/apiConfig.js";
const template = `
<link rel="stylesheet" href="../src/components/ExhibitionCard/ExhibitionCard.css" />
    <div class="exhibition-card">
      <img src="" alt="Exhibition Image">
      <div class="card-content">
        <div class="card-title"></div>
        <div class="card-description"></div>
        <div class="card-info">
          <div class="card-gallery"> </div>
          <div class="card-begdate"> </div>
          <div class="card-enddate"> </div>
          <div class="card-artworks"> </div>
        </div>
        <div class="card-artists">
          <strong>Artists:</strong>
          <ul>            
          </ul>
        </div>
      </div>
    </div>
`;

class ExibitionCard extends HTMLElement {
  constructor() {
    super();

    //add shadow to be sure that it works at Chrome
    const shadow = this.attachShadow({ mode: "open" });
    const temlateEl = document.createElement('template');
    temlateEl.innerHTML = template;
    //made a deep clone of html
    shadow.appendChild(temlateEl.content.cloneNode(true));
    this.exhibition = {};
  }

  /**
   * @param {any} exhibition
   */
  set exhibitionData(exhibition) {
    this.exhibition = exhibition;
  }
  async connectedCallback(){
    try {
      if(this.exhibition.artist_ids.length){
        const artists = await this.fetchArtistsInfo(this.exhibition.artist_ids);
        this.exhibition.artist_ids = artists;
      }
        this.render(this.exhibition)
    } catch (error) {
        this.shadowRoot.innerHTML = '<div>Error connected callback.</div>'
        console.error(error);
    }
    
}
async fetchArtistsInfo(artist_ids){
  try {
    const artists = await getArtistsNames(artist_ids);
    return artists;
    
} catch (error) {
    this.shadowRoot.innerHTML = '<div>Error fetching artists data.</div>'
    console.error(error);
}
}

  render(data){
    const card = this.shadowRoot.querySelector('.exhibition-card');
    card.setAttribute('id',this.exhibition.id);
    card.querySelector('img').setAttribute("src", data.image_url);
    card.querySelector('.card-title').textContent = data.title;
    card.querySelector('.card-description').innerHTML = data.short_description;
    card.querySelector('.card-gallery').innerHTML = `<strong>Gallery:</strong> ${(data.gallery_title)?data.gallery_title: 'No information'}`;
    card.querySelector('.card-begdate').innerHTML = `<strong>Begin Date:</strong> ${(data.aic_start_at)?data.aic_start_at.substring(0,10): 'No information'}`;
    card.querySelector('.card-enddate').innerHTML = `<strong>End Date:</strong> ${(data.aic_end_at)?data.aic_end_at.substring(0,10): 'No information'}`;
    let artistsList = card.querySelector('.card-artists ul');
    if(data.artist_ids.length){
      data.artist_ids.forEach((artist) => {
        let listEl = document.createElement('li');
        listEl.innerHTML = `<a href="#/artists/${artist.id}">${artist.title}</a>`;
        artistsList.appendChild(listEl);
      });
    }else{
      card.querySelector('.card-artists').textContent = 'No information about exhibition artists.'
    }
    if(data.artwork_ids.length){
      card.querySelector('.card-artworks').innerHTML = `
      <a href="#/artworks/exhibition/${this.exhibition.id}">Artworks</a>
      `

    }else{
      card.querySelector('.card-artworks').textContent = 'No information about exhibition artworks.'
    }
  }
  
}

customElements.define("exhibition-card", ExibitionCard);

export default ExibitionCard;