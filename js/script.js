'use strict';
const titleClickHandler = function(event) {
    console.log('Link was clicked!', event)

    // [DONE] remove class 'active' form all links
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }
    // [DONE] add class active to the clicked link
    const clickedElement = this;
    clickedElement.classList.add('active');
    // [DONE] remove class active form all articles 
    const activeArticles = document.querySelectorAll('.post.active');
    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }
    // [IN PROGRESS] get href atribute from the clicked link 

    // [IN PROGRESS] find the correct article using selector (href)
    // [IN PROGRESS] add class active to the correct article
}


const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}