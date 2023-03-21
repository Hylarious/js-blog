'use strict';
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.list.authors';

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

function generateTitleLinks(customSelector = '') {
  // console.log('generateTitleList worked!');
  //  remove contents of titleList 

  const titleList = document.querySelector(optTitleListSelector);
  // console.log(titleList);
  titleList.innerHTML = '';

  //  for each articles
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
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
  const links = document.querySelectorAll('.titles a');
  // console.log(links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();


function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  // console.log(articles);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.dataset.tags;

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const tagHtml = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */
      html = tagHtml;
      // console.log(html);
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML += html;
      // console.log(tagsWrapper);
      /* END LOOP: for every article: */
    }
  }
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  // console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let link of activeLinks) {
    /* remove class active */
    link.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let link of tagLinks) {
    /* remove class active */
    link.classList.remove('active');
    /* add class active */
    link.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

}

/* execute function "generateTitleLinks" with article selector as argument */


function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('[href*="#tag-"]');
  /* START LOOP: for each link */
  for (let link of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();


/*AUTHORS*/
function generateAuthors() {
  // find all articles
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    //get author name
    const author = article.dataset.author;
    const title = article.children[0];
    //add author name in html
    title.insertAdjacentHTML('afterend', '<a href="' + author + '"class="author"> by ' + author + '</a>');
  }
}
generateAuthors();


function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  console.log(href);
  generateTitleLinks('[data-author="' + href + '"]');
}

function addClickListenersToAuthors() {
  /* find all links to authors */
  const authorLinks = document.querySelectorAll('.author');
  /* START LOOP: for each link */
  for (let link of authorLinks) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();
// function generateAuthorsList() {
//   const authorsList = document.querySelector(optArticleAuthorSelector);
//   console.log(authorsList);
//   authorsList.innerHTML = '';
//   const articles = document.querySelectorAll(optArticleSelector);
//   console.log(articles);
// 

//   for (let article of articles) {
//     const articleId = article.getAttribute('id');
//     const articleAuthor = article.getAttribute('data-author'); 
//     if (articleAuthor in authorDic){}
//     const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleAuthor + '</span></a></li>';
//     console.log(articleAuthor);
//     authorsList.innerHTML += linkHTML;
//   }
//   
//   //     for (let article of articles) {
//   //         //  get the article id 
//   //         const articleId = article.getAttribute('id');
//   //         //  find the title element ;
//   //         //  get the title from the title element 
//   //         const articleTitle = article.querySelector(optTitleSelector).innerHTML;
//   //         //  create HTML of the link 
//   //         // console.log(article.innerHTML);
//   //         const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
//   //         // console.log(linkHTML);

//   //         //  insert link into titleLis
//   //         titleList.innerHTML += linkHTML;
//   //     }
//   //     const links = document.querySelectorAll('.titles a');
//   //     // console.log(links);

//   //     for (let link of links) {
//   //         link.addEventListener('click', titleClickHandler);
//   //     }
//   // }
// }

// generateAuthorsList();