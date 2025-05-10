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
        //check if user click on back button on browser
        window.addEventListener('popstate', (e) => {
            //call route
            if (e.state === null) {
                //if state stack is empty go to the first page
                Router.nav('/', true);
            } else {
                Router.nav(e.state.route, false);
            }
        });

    },
    /*
    function for navigating between routes
    route - route name
    addToHistory - parameter that helps user to go back 
    */
    nav: (route, addToHistory = true) => {
        
        //switch routes
        let el;
        switch (route) {
            case "/":
                el = document.createElement("about-info");
                break;
            case "/exhibitions":
                el = document.createElement("exhibition-container");
                break;
            case "/artists":
                el = document.createElement("artist-container");
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
                    el.setAttribute("id", artistId);
                } else {
                    // nav to error page
                    Router.nav("/errorpage");
                    return;
                }
                break;
        }

        //add information about routes to state
        if (addToHistory) {
            history.pushState({ route }, null, route);
        }

        const entry = document.querySelector('#content');
        //clear content of the page
        entry.innerHTML = '';
        //add new content
        document.querySelector('#content').appendChild(el);


    },
}

export default Router;