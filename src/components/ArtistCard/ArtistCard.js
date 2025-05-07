const template = `
<link rel="stylesheet" href="../src/components/ArtistCard/ArtistCard.css" />
    <div class="artist-card">
    </div>
`;

class ArtistCard extends HTMLElement {
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
     * @param {any} artist
     */
    set addArtistData(artist){
        console.log(artist);
        const card = this.shadowRoot.querySelector('.artist-card');
        const content = document.createElement('p');
        content.textContent = `${artist.name}`
        card.appendChild(content)
    }
}

customElements.define("artist-card", ArtistCard);

export default ArtistCard;