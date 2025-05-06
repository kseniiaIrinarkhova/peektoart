//Router object
const Router = {
    init: () =>{
        console.log("Running...");
        //add event listener for all links in nav bar
        document.querySelectorAll('header a').forEach(link =>{
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

    },
}

export default Router;