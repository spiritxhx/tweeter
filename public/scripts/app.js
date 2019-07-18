/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = tweet => {
  const $article = $('<article>');
  const $header = $('<header>');
  const $leftOfHeader = $('<div>');
  const $div = $('<div>');
  const $footer = $('<footer>');
  const $hr = $('<hr>');
  const $flag = $('<i>').addClass('fas fa-flag');
  const $fontAwsomeIcons = $('<span>').addClass('fontAwesome');
  const $retweet = $('<i>').addClass('fas fa-retweet');
  const $like = $('<i>').addClass('fas fa-heart');

  //set the font awesome container
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

  //get the time from the given string in database
  let createdTime = new Date(tweet['created_at']);
  // .toString().slice(4, 24)

  $('<p>').addClass('footerText').addClass('timeago').text(jQuery.timeago(createdTime)).prependTo($footer);
  $footer.append($fontAwsomeIcons);
  $footer.appendTo($div);
  $div.addClass(tweet.user.name);
  $div.addClass('tweetBox');
  return $div;

};

//loop through the Array of data and render it within the tweetContainer
const renderTweets = tweets => {
  for (const tweet of tweets) {
    $('.tweetContainer').prepend(createTweetElement(tweet));
  }
};

//render the new added elements(last element of the data)
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
  const $errorBox2 = $('<p>').addClass('error').text('Tweets are too long (more than 140 characters)!');
  //hide the errorBox by default
  $errorBox.prependTo($('.container')).hide();
  $errorBox2.prependTo($('.container')).hide();

  //post new tweets
  $('form').on('submit', (event) => {
    event.preventDefault();

    //empty input error
    if ($('textarea').val().length === 0) {
      $errorBox.slideDown();      //open the errorBox
      $errorBox2.hide();          //close the potential other errorBox

      //inputs are too long
    } else if ($('textarea').val().length > 140) {
      $errorBox2.slideDown();      //open the errorBox
      $errorBox.hide();            //close the potential other errorBox
    } else {

      //post the tweet contents into the server
      $errorBox.slideUp();
      $errorBox2.slideUp();
      $.post('/tweets', $('form').serialize())
        .then(() => {
          $('.counter').text('140');    //clear the counter
          $('textarea').val("");        //clear the input texts
          loadTweets();                 //wait until the post is done then render the new list
        })
        .fail(error => console.log(error));
    }
  });

  //initial render the tweets from database
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

  //hide the compose tweet box on load in
  $('.new-tweet').hide();
});