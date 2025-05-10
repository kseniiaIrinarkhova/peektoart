const template = `
    <h2>Oooops.... Error 404!</h2>
    <p>Something goes wrong. Page not found.</p>
`;

class ErrorPage extends HTMLElement {
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

customElements.define("error-page", ErrorPage);

export default ErrorPage;