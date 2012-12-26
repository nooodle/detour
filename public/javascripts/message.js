'use strict';

define(['jquery'],
  function($) {

  var Message = function() {};
  var form = $('form');
  var messageView = $('#message-view');

  var MAX_TTL = 10000;

  Message.prototype.send = function(data) {
    $.ajax({
      url: '/message',
      data: data,
      type: 'POST',
      dataType: 'json',
      cache: false
    }).done(function(data) {
      form.find('input[name="message"]').val('');
      form.find('input[name="email"]').val('');
    }).error(function(data) {
      console.log(data.responseText);
    });
  };

  Message.prototype.view = function(preview) {
    $.ajax({
      url: '/message/' + preview.data('key'),
      type: 'GET',
      dataType: 'json',
      cache: false
    }).done(function(data) {
      messageView.text(data.message);
      setTimeout(function() {
        messageView.text('');
        preview.parent().remove();
      }, MAX_TTL);
    }).error(function(data) {
      console.log(data.responseText);
    });
  };

  return Message;
});
