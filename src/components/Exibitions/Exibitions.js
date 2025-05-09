import { getExhibitionsData } from "../../scripts/apiConfig.js";
const template = `
    <h2>Exibitions</h2>
    <div class="exibition-container">
    </div>
`;



class Exibitions extends HTMLElement {
    constructor() {
        super();

        //add shadow to be sure that it works at Chrome
        const shadow = this.attachShadow({ mode: "open" });
        const temlateEl = document.createElement('template');
        temlateEl.innerHTML = template;
        //made a deep clone of html
        shadow.appendChild(temlateEl.content.cloneNode(true));

        this.exhibitionContainer = this.shadowRoot.querySelector('.exibition-container')
        this.exhibitionContainer.innerHTML = `<div>Loading exhibitions data...</div>`;
        // this.render(exhibitions)

    }
    async connectedCallback(){
        try {
            const data = await this.fetchExhibitions();
            this.render(data)
        } catch (error) {
            this.shadowRoot.innerHTML = '<div>Error connected callback.</div>'
            console.error(error);
        }
        
    }
    async fetchExhibitions(){
        try {
            const exhibitions = await getExhibitionsData();
            return exhibitions;
            
        } catch (error) {
            this.shadowRoot.innerHTML = '<div>Error fetching exhibition data.</div>'
            console.error(error);
        }
    }
    render(data){
        this.exhibitionContainer.innerHTML = '';
        let el = document.createElement('p');
        //get data from API
        data.forEach((exibition)=>{
            const exibitionEl = document.createElement("exibition-card");
            exibitionEl.addExibitionData = exibition;
            this.exhibitionContainer.appendChild(exibitionEl);
        })
    }
}

customElements.define("exibition-container", Exibitions);

export default Exibitions;