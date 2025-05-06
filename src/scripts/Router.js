//Router object
const Router = {
    init: () =>{
        console.log("Running...");
        document.querySelectorAll('header a').forEach(link =>{
            link.addEventListener('click', e=>{
                e.preventDefault();
            })
        })
    },
    nav: ()=>{},
}

export default Router;