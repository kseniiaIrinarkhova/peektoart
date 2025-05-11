const template = `
<link rel="stylesheet" href="../src/components/SiteFooter/SiteFooter.css" />
    <footer>
    <p>&copy; 2025 PeekToArt. Website created by 
    <a href="https://github.com/kseniiairinarkhova" target="_blank" rel="noopener noreferrer">
      Kseniia Irinarkhova
    </a>. 
    All information about artworks, exhibitions, and artists is sourced from the 
    <a href="https://api.artic.edu/docs/#introduction" target="_blank" rel="noopener noreferrer">
      Art Institute of Chicago Open API
    </a>.
  </p>
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