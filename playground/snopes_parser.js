const rp = require('request-promise');
const $ = require('cheerio');





const test_article = 'https://www.snopes.com/fact-check/armed-robber-shot-customers/'
const snopes_url = 'https://www.snopes.com/fact-check/category/photos/';

rp(snopes_url)
    .then(function(html){
        var article_urls = []
        $('.article-link', html).each(function(i, elem) {
            
            // Get only the Fauxtography articles on the page
            if ($('.breadcrumbs', elem).text().trim() == 'Fauxtography') {
                article_urls.push($(elem).attr('href'));
            }
        });
        return Promise.all(
            article_urls.map(function(url) {
                return getArticleData(url);
            })
        );
    })
    .then(function(data) {
        console.log(data);
    })
    
    .catch(function(err){

    });



const getArticleData = function(url) {
    return rp(url)
      .then(function(html){
        //success!
        return {
            image_url: $('.main-image', html).attr('src'),
            rating: $('.rating-wrapper', html).children('a').children('span').text()
        };
      })
      .catch(function(err){
        //handle error
      });
    
    
}


// var a = getArticleData(test_article)
//             .then(function(data) {
//                 console.log(data);
//             })
//             .catch(function(err) {
//                 console.log(err);
//             })
