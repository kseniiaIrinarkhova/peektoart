//Router object
const Router = {
    init: () => {
        console.log("Running...");
        //add event listener for all links in nav bar
        document.querySelector("site-header").shadowRoot.querySelectorAll('header a').forEach(link => {
            link.addEventListener('click', e => {
                //prevent default action for link's clicking
                e.preventDefault();
                const url = e.target.getAttribute('href');
                Router.nav(url);
            })
        })

        window.addEventListener('hashchange', () => {
            const path = location.hash.slice(1) || '/';
            Router.nav(path, false);
        });

        window.addEventListener('load', () => {
            const path = location.hash.slice(1) || '/';
            Router.nav(path, false);
        });

    },
    /*
    function for navigating between routes
    route - route name
    addToHistory - parameter that helps user to go back 
    */
    nav: (route, addToHistory = true) => {

        if (addToHistory) {
            location.hash = route;
            return; // nav will be triggered by hashchange
          }

        //switch routes
        let el;
        switch (route) {
            case "/":
                el = document.createElement("about-info");
                break;
            case "/exhibitions":
                el = document.createElement("exhibition-container");
                break;
            case "/artworks":
                el = document.createElement("artwork-container");
                break;
            case '/errorpage':
                el = document.createElement("error-page");
                break;
            default:
                if (route.startsWith("/artists")) {
                    //get informationa about specific artist
                    const artistId = route.split("/")[2];
                    //create artist detail page
                    el = document.createElement("artist-details");
                    el.artistID = artistId ;
                } else {
                    // nav to error page
                    Router.nav("/errorpage");
                    return;
                }
                break;
        }

        

        const entry = document.querySelector('#content');
        //clear content of the page
        entry.innerHTML = '';
        //add new content
        document.querySelector('#content').appendChild(el);


    },
}

export default Router;