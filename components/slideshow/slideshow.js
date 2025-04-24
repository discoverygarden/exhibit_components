(function ($, Drupal, once) {
  Drupal.behaviors.button = {
    attach: function attach(context) {
      $('.slideshow', context).once('slideshow').each(function () {
        // Component-specific JavaScript code here
        UIkit.slideshow(this, options);
        // console.log('My component initialized!');
      });
    },
  };
})(jQuery, Drupal, once);
