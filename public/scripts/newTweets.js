$(() => {
  const $form = $('form');
  $form.on('submit', (event) => {
    event.preventDefault();
    console.log('submit button clicked!');
    $.post('/tweets', $('form').serialize())
      .then(() => {
        console.log('success');
      });
  });
});