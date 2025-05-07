const template = `
    <h2>Peek to Art</h2>
    <p>Welcome to this cheerful little corner of the internet! This website is a fun and simple project that brings you a taste of the amazing art, exhibitions, and talented artists from the Chicago Institute of Art. All the fascinating details you see here come straight from the public Chicago Institute of Art API, so you're getting real, up-to-date info curated from a world-class museum—without needing to leave your couch!</p>
    <p>This site was built by Kseniia Irinarkhova as part of the pre-work for the Code the Dream Academy course. It's not a massive masterpiece (yet!), but it’s a creative way to explore beautiful art and practice coding skills at the same time. So go ahead—click around, get inspired, and enjoy a joyful little journey through the world of Chicago’s vibrant art scene!</p>  
`;

class About extends HTMLElement {
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

customElements.define("about-info", About);

export default About;