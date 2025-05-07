const template = `
<link rel="stylesheet" href="../src/components/ExibitionCard/ExibitionCard.css" />
    <div class="exibition-card">
    <p>Card Test</p>
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
        console.log(exibition);
    }
}

customElements.define("exibition-card", ExibitionCard);

export default ExibitionCard;