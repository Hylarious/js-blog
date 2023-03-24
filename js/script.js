'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTagLink: Handlebars.compile(document.querySelector('#template-article-tag-link').innerHTML),
  articleAuthorLink: Handlebars.compile(document.querySelector('#template-article-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML)
};
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optTagListSelector = '.list.tags',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size',
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
  // [DONE] find the correct article using selector (href)
  const targetArticle = document.querySelector(articleSelector);
  // [DONE] add class active to the correct article
  targetArticle.classList.add('active');
};


function generateTitleLinks(customSelector = '') {
  // [DONE] remove contents of titleList 
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  // [DONE] for each articles
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for (let article of articles) {
    // [DONE] get the article id 
    const articleId = article.getAttribute('id');
    //  [DONE]find the title element ;
    //  [DONE]get the title from the title element 
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    // [DONE] create HTML of the link 
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);
    //  [DONE]insert link into titleLis
    titleList.innerHTML += linkHTML;
  }

  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}


generateTitleLinks();


function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999
  };
  for (let tag in tags) {
    // console.log(tag + ' is used ' + tags[tag] + ' times');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    } else(tags[tag] < params.min);
    params.min = tags[tag];
  }

  return params;
}


function calculateTagClass(count, params) {
  const normalizeCount = count - params.min;
  const normalizeMax = params.max - params.min;
  const percentage = normalizeCount / normalizeMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return (optCloudClassPrefix + classNumber);


}


function generateTags() {
  /* [DONE]create a new variable allTags with an empty object */
  let allTags = {};
  //[DONE]create nev variable with empty arr
  /*[DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  /*[DONE] START LOOP: for every article: */
  for (let article of articles) {
    /* [DONE]find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* [DONE]make html variable with empty string */
    let html = '';
    /* [DONE]get tags from data-tags attribute */
    const articleTags = article.dataset.tags;

    /* [DONE]split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* [DONE]START LOOP: for each tag */
    for (let tag of articleTagsArray) {

      /* [DONE]generate HTML of the link */
      const linkHTMLData = { id: tag, title: tag };
      const linkHTML = templates.articleTagLink(linkHTMLData);
      // const linkHtml = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      /* [DONE]add generated code to html variable */
      html = linkHTML;


      /* [DONE] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /*  [DONE]add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
        /* END LOOP: for every article: */
      }
      /*[DONE] insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML += html;
      console.log(tagsWrapper.innerHTML);
    }

    /* [ DONE] find list of tags in right column */
    const tagList = document.querySelector(optTagListSelector);
    // console.log(tagList);
    const tagsParams = calculateTagsParams(allTags);
    // console.log('tagsParams:', tagsParams);
    /* [DONE] create variable for all links HTML code */
    const allTagsData = { tags: [] };

    /* [DONE] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [DONE] generate code of a link and add it to allTagsHTML */
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });

      // allTagsHTML += '<li class="' + calculateTagClass(allTags[tag], tagsParams) + '"><a href="#tag-' + tag + '">' + tag + '</a></li > ';
    }

    /* [DONE] END LOOP: for each tag in allTags: */
    /*[DONE] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);

  }
}


generateTags();


function tagClickHandler(event) {
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* [DONE] find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* [DONE] START LOOP: for each active tag link */
  for (let link of activeLinks) {
    /* [DONE] remove class active */
    link.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* [DONE] START LOOP: for each found tag link */
  for (let link of tagLinks) {
    /* [DONE] remove class active */
    link.classList.remove('active');
    /* [DONE] add class active */
    link.classList.add('active');
    /* END LOOP: for each found tag link */
  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}


function addClickListenersToTags() {

  /* [DONE] find all links to tags */
  const tagLinks = document.querySelectorAll('[href*="#tag-"]');
  /* [DONE] START LOOP: for each link */
  for (let link of tagLinks) {
    /*[DONE]  add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}


addClickListenersToTags();


/*AUTHORS*/
function generateAuthors() {
  let allAuthors = {};
  // [DONE] find all articles
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    // [DONE] get author name
    const author = article.dataset.author;
    const title = article.children[0];
    if (!allAuthors[author]) {
      /*  [DONE]add tag to allAuthors object */
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
      /* END LOOP: for every article: */
    }
    const linkHTMLData = { id: author, title: author };
    const linkHTML = templates.articleAuthorLink(linkHTMLData);
    // [DONE] add author name in html
    title.insertAdjacentHTML('afterend', linkHTML);
  }
  const authorsList = document.querySelector(optArticleAuthorSelector);
  const allAuthorsData = { authors: [] };
  for (let authors in allAuthors) {
    /* [DONE] generate code of a link and add it to allAuthorsHTML */
    allAuthorsData.authors.push({
      authors: authors,
      count: allAuthors[authors]
    });
    // console.log(allAuthorsData)
    // allAuthorsHTML += '<li><a href="' + authors + '" class="author"><span>' + authors + '</span></a></li> ';
  }
  authorsList.innerHTML = templates.authorLink(allAuthorsData);
}


generateAuthors();


function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');

  // console.log(href);
  // generateTitleLinks('[data-author="' + href + '"]');
  // const otherHrefs = document.querySelectorAll('href' !== href);
  // console.log(otherHrefs);
  const activeLinks = document.querySelectorAll('a:not([href="' + href + '"])');

  /* [DONE] START LOOP: for each active tag link */
  for (let link of activeLinks) {
    /* [DONE] remove class active */
    link.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(authorLinks);
  /* [DONE] START LOOP: for each found tag link */
  for (let link of authorLinks) {
    /* [DONE] remove class active */
    // link.classList.remove('active');
    //   document.querySelectorAll('a.active').forEach(function(activeLink) {
    //   activeLink.classList.remove('active');
    // });
    /* [DONE] add class active */
    link.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  generateTitleLinks('[data-author="' + href + '"]');
}


function addClickListenersToAuthors() {
  /* [DONE]find all links to authors */
  const authorLinks = document.querySelectorAll('.author');
  /* [DONE] START LOOP: for each link */
  for (let link of authorLinks) {
    /* [DONE] add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}


addClickListenersToAuthors();