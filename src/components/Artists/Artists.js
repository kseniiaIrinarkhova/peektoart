const template = `
    <h2>Artists</h2>
    <div class="artist-container">
    </div>
`;

const data= [{
    name: "Artist 1"
},
{name:"Artist 2"}
];

class Artists extends HTMLElement {
    constructor() {
        super();

        //add shadow to be sure that it works at Chrome
        const shadow = this.attachShadow({ mode: "open" });
        const temlateEl = document.createElement('template');
        temlateEl.innerHTML = template;
        //made a deep clone of html
        shadow.appendChild(temlateEl.content.cloneNode(true));

        this.artistContainer = this.shadowRoot.querySelector('.artist-container')
        let el = document.createElement('p');
        //get data from API
        data.forEach((artist)=>{
            const artistEl = document.createElement("artist-card");
            artistEl.addArtistData = artist;
            this.artistContainer.appendChild(artistEl);
        })

    }
}

customElements.define("artist-container", Artists);

export default Artists;