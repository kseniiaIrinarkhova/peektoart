//add header style
window.addEventListener("scroll", function(){
    //get header element
    let header = this.document.querySelector("header");
    // add additional css class 'Sticky' while scrolling the page
    header.classList.toggle("sticky", this.window.scrollY>0);
});
