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
  let $flag = $('<i>').addClass('fas fa-flag');
  let $fontAwsomeIcons = $('<span>').addClass('fontAwesome');
  let $retweet = $('<i>').addClass('fas fa-retweet');
  let $like = $('<i>').addClass('fas fa-heart');

  $fontAwsomeIcons.append($flag);
  $fontAwsomeIcons.append($retweet);
  $fontAwsomeIcons.append($like);

  $('<span>').text(tweet.user.name).addClass('person').appendTo($leftOfHeader);
  $('<span>').text(tweet.user.handle).addClass('atPerson').appendTo($header);

  $leftOfHeader.prepend($('<img>', { src: tweet.user.avatars }));
  $leftOfHeader.addClass('leftContent').prependTo($header);

  $('<p>').text(tweet.content.text).appendTo($article);

  $header.addClass('articleHeader').prependTo($article);
  $article.prependTo($div);
  $hr.addClass('line').appendTo($div);

  $('<p>').addClass('footerText').text(tweet['created_at']).prependTo($footer);
  $footer.append($fontAwsomeIcons);
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

// main function
$(document).ready(() => {

  //create the error box
  const $errorBox = $('<p>').addClass('error').text("Empty tweets! You didn't input anything!");
  $errorBox.prependTo($('.container')).hide();
  const $errorBox2 = $('<p>').addClass('error').text('Tweets are too long (more than 140 characters)!');
  $errorBox2.prependTo($('.container')).hide();

  //post new tweets
  $('form').on('submit', (event) => {
    event.preventDefault();
    if ($('textarea').val().length === 0) {
      $errorBox.slideDown();
    } else if ($('textarea').val().length > 140) {
      $errorBox2.slideDown();
    } else {
      $errorBox.slideUp();
      $errorBox2.slideUp();
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
      $('textarea').focus();
    });

  //toggle effects in create new tweeets on top right corner
  $('.createTweets').click(() => {
    $('.new-tweet').toggle('fast', () => {
      $('textarea').focus();
    });
  });

});