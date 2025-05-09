const template = `
<link rel="stylesheet" href="../src/components/ExibitionCard/ExibitionCard.css" />
    <div class="exibition-card">
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
     * @param {any} exibition
     */
    set addExibitionData(exibition){
        const card = this.shadowRoot.querySelector('.exibition-card');
        const content = document.createElement('div');
        content.innerHTML = exibition.short_description
        card.appendChild(content)
    }
}

customElements.define("exibition-card", ExibitionCard);

export default ExibitionCard;