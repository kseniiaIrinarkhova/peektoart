import Router from "./Router.js";
import ErrorPage from "../components/ErrorPage/ErrorPage.js";
import SiteHeader from "../components/SiteHeader/SiteHeader.js";
import SiteFooter from "../components/SiteFooter/SiteFooter.js";
import About from "../components/About/About.js";
import ExhibitionCard from "../components/ExhibitionCard/ExhibitionCard.js";
import Exhibitions from "../components/Exhibitions/Exhibitions.js";
import ArtistDetails from "../components/ArtistDetails/ArtistDetails.js";
import Artworks from "../components/Artworks/Artworks.js";
import ArtworkCard from "../components/ArtworkCard/ArtworkCard.js";

import { getExhibitionsData } from "./apiConfig.js";

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
