const template = `
<link rel="stylesheet" href="../src/components/SiteHeader/SiteHeader.css" />
    <header>
    <a href="/" class="logo">Peek to Art</a>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/exhibitions">Exhibitions</a></li>
        <li><a href="/artists">Artists</a></li>
      </ul>
    </header>
    
`;

class SiteHeader extends HTMLElement {
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

customElements.define("site-header", SiteHeader);

export default SiteHeader;