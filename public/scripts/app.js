/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

{/* <div class="">
  <article>
    <header class="articleHeader">
      <div class="leftContent">
        <img src="https://i.imgur.com/73hZDYK.png" />
        <span class="person">Newton</span>
      </div>
      <span class="atPerson">@Sirisac</span>
    </header>
    If I have seen further it is by standing on the shoulders of giants. Hah ahah ah ahah aha hah ahah ahaha
        </article>
  <hr class="line">
    <footer>
      <p class="footerText">10 days ago</p>
      <section>

      </section>
    </footer>
      </div> */}

$(document).ready(function () {

  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];


  const createTweetElement = function (tweet) {
    let $article = $('<article>');
    let $header = $('<header>');
    let $div1 = $('<div>');
    let $div = $('<div>');
    let $footer = $('<footer>');
    let $hr = $('<hr>');

    $div1.prepend($('<img>', {src: tweet.user.avatars}));
    $('<span>').text(tweet.user.name).addClass('person').appendTo($div1);

    $div1.addClass('leftContent').prependTo($header);

    $('<span>').text(tweet.user.handle).addClass('atPerson').appendTo($header);

    $header.addClass('articleHeader').prependTo($article);
    $('<p>').text(tweet.content.text).appendTo($article);
    $article.prependTo($div);

    $hr.addClass('line').appendTo($div);

    $('<p>').addClass('footerText').text(tweet['created_at']).prependTo($footer);

    $footer.appendTo($div);
    $div.addClass(tweet.user.name);
    $div.addClass('tweetBox');
    console.log($div);
    return $div;

  };

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      console.log(tweet);

      $('.tweetContainer').append(createTweetElement(tweet));
    }
  };

  renderTweets(data);
});