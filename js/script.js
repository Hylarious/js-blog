'use strict';
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';


function generateTitleList() {
  // console.log('generateTitleList worked!');
  //  remove contents of titleList 

  const titleList = document.querySelector(optTitleListSelector);
  // console.log(titleList);
  titleList.innerHTML = '';

  //  for each articles
  const articles = document.querySelectorAll(optArticleSelector);
  // console.log(articles);

  for (let article of articles) {
    //  get the article id 
    const articleId = article.getAttribute('id');
    //  find the title element ;
    //  get the title from the title element 
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    //  create HTML of the link 
    // console.log(article.innerHTML);
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    // console.log(linkHTML);

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
  // console.log(articleSelector);
  // [DONE] find the correct article using selector (href)
  const targetArticle = document.querySelector(articleSelector);
  // console.log(targetArticle);
  // [DONE] add class active to the correct article
  targetArticle.classList.add('active');

};
const links = document.querySelectorAll('.titles a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.dataset.tags;
    // console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const tagHtml = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      // console.log(tagHtml);
      /* add generated code to html variable */
      html = html + tagHtml;
      // console.log(html);
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML += html;

    /* END LOOP: for every article: */
  }
}

generateTags();

// function tagClickHandler(event) {
//   /* prevent default action for this event */

//   /* make new constant named "clickedElement" and give it the value of "this" */

//   /* make a new constant "href" and read the attribute "href" of the clicked element */

//   /* make a new constant "tag" and extract tag from the "href" constant */

//   /* find all tag links with class active */

//   /* START LOOP: for each active tag link */

//   /* remove class active */

//   /* END LOOP: for each active tag link */

//   /* find all tag links with "href" attribute equal to the "href" constant */

//   /* START LOOP: for each found tag link */

//   /* add class active */

//   /* END LOOP: for each found tag link */

//   /* execute function "generateTitleLinks" with article selector as argument */
// }

// function addClickListenersToTags() {
//   /* find all links to tags */

//   /* START LOOP: for each link */

//   /* add tagClickHandler as event listener for that link */

//   /* END LOOP: for each link */
// }

// addClickListenersToTags();