import { getExhibitionsData } from "../../scripts/apiConfig.js";
const template = `
<link rel="stylesheet" href="../src/components/Exhibitions/Exhibitions.css" />
    <h2>Exhibition</h2>
    <div class="exhibition-container">
    </div>
`;



class Exhibitions extends HTMLElement {
    constructor() {
        super();

        //add shadow to be sure that it works at Chrome
        const shadow = this.attachShadow({ mode: "open" });
        const temlateEl = document.createElement('template');
        temlateEl.innerHTML = template;
        //made a deep clone of html
        shadow.appendChild(temlateEl.content.cloneNode(true));

        this.exhibitionContainer = this.shadowRoot.querySelector('.exhibition-container')
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
        console.log(data)
        //get data from API
        data.forEach((exhibition)=>{
            const exhibitionEl = document.createElement("exhibition-card");
            exhibitionEl.addExibitionData = exhibition;
            this.exhibitionContainer.appendChild(exhibitionEl);
        })
    }
}

customElements.define("exhibition-container", Exhibitions);

export default Exhibitions;