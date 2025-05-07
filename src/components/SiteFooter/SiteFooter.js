const template = `
<link rel="stylesheet" href="../src/components/SiteFooter/SiteFooter.css" />
    <footer>
    <p>CopyRight</p>
    </footer>
    
`;

class SiteFooter extends HTMLElement {
    constructor() {
        super();

        //add shadow to be sure that it works at Chrome
        const shadow = this.attachShadow({ mode: "open" });
        const temlateEl = document.createElement('template');
        temlateEl.innerHTML = template;
        //made a deep clone of html
        shadow.appendChild(temlateEl.content.cloneNode(true));
    }
}

customElements.define("site-footer", SiteFooter);

export default SiteFooter;