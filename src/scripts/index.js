import Router from "./Router.js";
import SiteHeader from "../components/SiteHeader/SiteHeader.js";
import SiteFooter from "../components/SiteFooter/SiteFooter.js";
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
