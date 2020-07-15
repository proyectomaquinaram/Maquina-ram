const menuBTn = document.querySelector(".menu-btn")
let menuOpen = false;
menuBTn.addEventListener("click",()=>{
    if (!menuOpen){
        menuOpen = true
        menuBTn.classList.add("open")
    } else{
        menuBTn.classList.remove("open")
        menuOpen = false;
    }
})