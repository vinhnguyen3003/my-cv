
//Toggle Menu
let btnOpenMenu = document.getElementsByClassName("page-right__open-btn")[0];
let btnCloseMenu = document.getElementsByClassName("page-left__close")[0];
let toggleMenu = document.getElementsByClassName("page-left")[0];
btnOpenMenu.addEventListener("click", function(){
    toggleMenu.classList.add("--show");
    btnOpenMenu.classList.add("--hidden");
})
btnCloseMenu.addEventListener("click", function(){
    toggleMenu.classList.remove("--show");
    btnOpenMenu.classList.remove("--hidden");
})

//Menu item action

 let menuItems = document.getElementsByClassName("menu-item");
// Array.from(menuItems).forEach((item, index)=>{
//     item.onclick = (e) =>{
//         let activeItem = document.querySelector('.menu-item.--active');
//         activeItem.classList.remove("--active");
//         item.classList.add("--active");
//     }
// })

// On scroll animation

let scroll = window.requestAnimationFrame || function(callback) {window.setTimeout(callback, 1000/60)}

let elToShow = document.querySelectorAll('.play-on-scroll')

isElInViewPort = (el) => {
    let rect = el.getBoundingClientRect()
    return (
        (rect.top <= 0 && rect.bottom >= 0)
        ||
        (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) && rect.top <= (window.innerHeight || document.documentElement.clientHeight))
        ||
        (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    )
}

loop = () => {
    elToShow.forEach((item, index) => {
        if (isElInViewPort(item)) {
            item.classList.add('start')
        } else {
            item.classList.remove('start')
        }
    })

    scroll(loop)
}

loop()

//Click on menu to scroll

var box = document.documentElement,
    //menuItems = document.getElementsByClassName("menu-item"),
    targetElms = document.querySelectorAll('.section-wrapper'); // <-- Scroll to here within ".box"

window.onscroll = () =>{
    for( let i = 0; i < targetElms.length; i++){
        //console.log(box.scrollTop)
        //console.log(getRelativePos(targetElms[i]).top)
        if(box.scrollTop > getRelativePos(targetElms[i]).top - 5 && box.scrollTop <getRelativePos(targetElms[i+1]).top - 5){
            let activeItem = document.querySelector('.menu-item.--active');
            activeItem.classList.remove("--active");
            menuItems[i].classList.add("--active");
        }
    }
}
Array.from(menuItems).forEach((menuItem, index)=>{
    menuItem.onclick = () => {
        toggleMenu.classList.remove("--show");
        btnOpenMenu.classList.remove("--hidden");
            //handle last menuItem when click 
            let activeItem = document.querySelector('.menu-item.--active');
            activeItem.classList.remove("--active");
            menuItem.classList.add("--active");
        scrollToElm(box, targetElms[index], 600);
    }
})
// document.querySelector('button').addEventListener('click', function () {
//     scrollToElm(box, targetElm, 600);
// });


function scrollToElm(container, elm, duration) {
    var pos = getRelativePos(elm);
    scrollTo(container, pos.top, 1.5);  // duration in seconds
}

function getRelativePos(elm) {
    var pPos = elm.parentNode.getBoundingClientRect(), // parent pos
        cPos = elm.getBoundingClientRect(), // target pos
        pos = {};

        pos.top = cPos.top - pPos.top + elm.parentNode.scrollTop,
        pos.right = cPos.right - pPos.right,
        pos.bottom = cPos.bottom - pPos.bottom,
        pos.left = cPos.left - pPos.left;
    return pos;
}

function scrollTo(element, to, duration, onDone) {
    var start = element.scrollTop,
        change = to - start,
        startTime = performance.now(),
        val, now, elapsed, t;
    function animateScroll() {
        now = performance.now();
        elapsed = (now - startTime) / 1000;
        t = (elapsed / duration);

        element.scrollTop = start + change * easeInOutQuad(t);

        if (t < 1)
            window.requestAnimationFrame(animateScroll);
        else
            onDone && onDone();
    };

    animateScroll();
}

function easeInOutQuad(t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t };


