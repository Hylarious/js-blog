'use strict';
const titleClickHandler = function() {
    console.log('Link was clicked!', window.event)

    // remove class 'active' form all links

    // add class active to the clicked link
    // remove cladd active form all articles 
    // get href atribute from the clicked link 
    // find the correct article using selector (href)
    // add class active to the correct article
}


const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}