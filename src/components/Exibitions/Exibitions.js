const template = `
    <h2>Exibitions</h2>
    <div class="exibition-container">
    </div>
`;

const data= [{
    name: "Exibition 1"
},
{name:"Exibition 2"}
];

class Exibitions extends HTMLElement {
    constructor() {
        super();

        //add shadow to be sure that it works at Chrome
        const shadow = this.attachShadow({ mode: "open" });
        const temlateEl = document.createElement('template');
        temlateEl.innerHTML = template;
        //made a deep clone of html
        shadow.appendChild(temlateEl.content.cloneNode(true));

        this.exibitionContainer = this.shadowRoot.querySelector('.exibition-container')
        let el = document.createElement('p');
        //get data from API
        data.forEach((exibition)=>{
            const exibitionEl = document.createElement("exibition-card");
            exibitionEl.addExibitionData = exibition;
            this.exibitionContainer.appendChild(exibitionEl);
        })

    }
}

customElements.define("exibition-container", Exibitions);

export default Exibitions;