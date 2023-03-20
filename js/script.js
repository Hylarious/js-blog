'use strict';
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleList() {
  console.log('generateTitleList worked!');
  //  remove contents of titleList 

  const titleList = document.querySelector(optTitleListSelector);
  console.log(titleList);
  titleList.innerHTML = '';

  //  for each articles
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  for (let article of articles) {
    //  get the article id 
    const articleId = article.getAttribute('id');
    //  find the title element ;
    //  get the title from the title element 
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    //  create HTML of the link 
    console.log(article.innerHTML);
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    //  insert link into titleLis
    titleList.innerHTML += linkHTML;
  }
}

generateTitleList();
const titleClickHandler = function(event) {
  console.log('Link was clicked!', event);

  // [DONE] remove class 'active' form all links
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  // [DONE] add class active to the clicked link
  event.preventDefault();
  const clickedElement = this;
  clickedElement.classList.add('active');
  // [DONE] remove class active form all articles 
  const activeArticles = document.querySelectorAll('.post.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  // [DONE] get href atribute from the clicked link 
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);
  // [DONE] find the correct article using selector (href)
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);
  // [DONE] add class active to the correct article
  targetArticle.classList.add('active');

};
const links = document.querySelectorAll('.titles a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}