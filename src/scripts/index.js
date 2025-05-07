import Router from "./Router.js";
import SiteHeader from "../components/SiteHeader/SiteHeader.js";
import SiteFooter from "../components/SiteFooter/SiteFooter.js";
import About from "../components/About/About.js";
import ExibitionCard from "../components/ExibitionCard/ExibitionCard.js";
import Exibitions from "../components/Exibitions/Exibitions.js";
import ArtistCard from "../components/ArtistCard/ArtistCard.js";
import Artists from "../components/Artists/Artists.js";

//add header style
window.addEventListener("scroll", function(){
    //get header element
    let header = this.document.querySelector("site-header").shadowRoot.querySelector("header");
    // add additional css class 'Sticky' while scrolling the page
    header.classList.toggle("sticky", this.window.scrollY>0);
});

//create a router object to do the single page app routing
window.app ={};
app.router = Router;

window.addEventListener('DOMContentLoaded', ()=>{
    //init router
    app.router.init();
})
