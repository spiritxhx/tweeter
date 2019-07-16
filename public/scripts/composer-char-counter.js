$(document).ready(function () {
  $('textarea').on('keydown', function (event) {
    let num = $('textarea').val().length;
    $(this).closest('section').find('span').html(`${140 - num}`);
    // console.log(num);
  })

});