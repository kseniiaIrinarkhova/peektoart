//Router object
const Router = {
    init: () =>{
        console.log("Running...");
        //add event listener for all links in nav bar
        document.querySelector("site-header").shadowRoot.querySelectorAll('header a').forEach(link =>{
            link.addEventListener('click', e=>{
                //prevent default action for link's clicking
                e.preventDefault();
                const url = e.target.getAttribute('href');
                Router.nav(url);
            })
        })
        //check if user click on back button on browser
        window.addEventListener('popstate',(e)=>{
            //call route
            if(e.state === null){
                //if state stack is empty go to the first page
                Router.nav('/',true);
            }else{
                Router.nav(e.state.route,false);
            }
        });
    },
    /*
    function for navigating between routes
    route - route name
    addToHistory - parameter that helps user to go back 
    */
    nav: (route, addToHistory = true)=>{
        //add information about routes to state
        if(addToHistory){
            history.pushState({route},null,route);
        }
        //switch routes
        
        let el;
        switch(route){
            case "/":
                el = document.createElement("about-info");
                break;
            case "/exhibitions":
                el = document.createElement("exhibition-container");
                break;
            case "/artists":
                el = document.createElement("artist-container");
                break;
        }

        if(el){
            const entry = document.querySelector('#content');
            //clear content of the page
            entry.innerHTML = '';
            //add new content
            document.querySelector('#content').appendChild(el);
            //scroll to the beginning of the page for home and to context for other pages
        }else{
            // 404 error
        }
        

    },
}

export default Router;