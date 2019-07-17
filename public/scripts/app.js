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



const createTweetElement = tweet => {
  let $article = $('<article>');
  let $header = $('<header>');
  let $leftOfHeader = $('<div>');
  let $div = $('<div>');
  let $footer = $('<footer>');
  let $hr = $('<hr>');

  $('<span>').text(tweet.user.name).addClass('person').appendTo($leftOfHeader);
  $('<span>').text(tweet.user.handle).addClass('atPerson').appendTo($header);

  $leftOfHeader.prepend($('<img>', { src: tweet.user.avatars }));
  $leftOfHeader.addClass('leftContent').prependTo($header);

  $('<p>').text(tweet.content.text).appendTo($article);

  $header.addClass('articleHeader').prependTo($article);
  $article.prependTo($div);
  $hr.addClass('line').appendTo($div);

  $('<p>').addClass('footerText').text(tweet['created_at']).prependTo($footer);

  $footer.appendTo($div);
  $div.addClass(tweet.user.name);
  $div.addClass('tweetBox');
  return $div;

};

const renderTweets = tweets => {
  for (const tweet of tweets) {
    $('.tweetContainer').append(createTweetElement(tweet));
  }
};


$(document).ready(() => {
  // renderTweets(data);
  const loadTweets = () => {
    const $form = $('form');
    $form.on('submit', (event) => {
      event.preventDefault();
      $.get('/tweets')
        .then((data) => {
          renderTweets(data);
        });
    });
  };
  loadTweets();
});