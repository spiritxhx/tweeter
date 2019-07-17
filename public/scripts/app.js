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
    $('.tweetContainer').prepend(createTweetElement(tweet));
  }
};

//render the new added elements
const loadTweets = () => {
  $.get('/tweets')
    .then(data => {
      renderTweets([data[data.length - 1]]);
    });
};

$(document).ready(() => {

  //post new tweets
  $('form').on('submit', (event) => {
    event.preventDefault();
    if ($('textarea').val().length === 0) {
      alert('empty tweets!');
    } else if ($('textarea').val().length > 140) {
      alert('tweets too long!');
    } else {
      $.post('/tweets', $('form').serialize())
        .then(() => {
          $('.counter').text('140');
          $('textarea').val("");
          loadTweets();
        })
        .fail(error => console.log(error));
    }
  });

  //initial render
  $.get('/tweets')
    .then((data) => {
      renderTweets(data);
    });
});