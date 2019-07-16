$(document).ready(function () {
  let num = 0;
  $('textarea').on('input', function () {
    num = $(this).val().length;
    $(this).closest('section').find('span').html(`${140 - num}`);
    if (num > 140) {
      // $(this).closest('section').find('span').html(`Input oversized!`);
      $(this).closest('section').find('span').css({ 'color': 'red' });
    }
    // console.log(num);
  })

});