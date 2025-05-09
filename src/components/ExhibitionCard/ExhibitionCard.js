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
  }

  /**
   * @param {any} exhibition
   */
  set addExibitionData(exhibition) {
    const card = this.shadowRoot.querySelector('.exhibition-card');
    card.querySelector('img').setAttribute("src", exhibition.image_url);
    card.querySelector('.card-title').textContent = exhibition.title;
    card.querySelector('.card-description').innerHTML = exhibition.short_description;
    card.querySelector('.card-gallery').innerHTML = `<strong>Gallery:</strong> ${(exhibition.gallery_title)?exhibition.gallery_title: 'No information'}`;
    card.querySelector('.card-begdate').innerHTML = `<strong>Begin Date:</strong> ${(exhibition.aic_start_at)?exhibition.aic_start_at.substring(0,10): 'No information'}`;
    card.querySelector('.card-enddate').innerHTML = `<strong>End Date:</strong> ${(exhibition.aic_end_at)?exhibition.aic_end_at.substring(0,10): 'No information'}`;
    let artistsList = card.querySelector('.card-artists ul');
    let artists = exhibition.artist_ids.join(',');
    let artist = document.createElement('li');
    artist.textContent = artists;
    artistsList.appendChild(artist);
  }
}

customElements.define("exhibition-card", ExibitionCard);

export default ExibitionCard;