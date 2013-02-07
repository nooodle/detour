'use strict';

define(['jquery'],
  function($) {

  var body = $('body');

  var User = function() {
    this.form = null;
  };

  User.prototype.logout = function () {
    $.ajax({
      url: '/logout',
      type: 'POST',
      data: { _csrf: body.data('csrf') },
      dataType: 'json',
      cache: false
    }).done(function (data) {
      document.location.href = '/';
    });
  };

  User.prototype.addContact = function (data) {
    var self = this;

    this.form = $('#contacts-form');

    $.ajax({
      url: '/contact',
      data: data,
      type: 'POST',
      dataType: 'json',
      cache : false
    }).done(function (data) {
      self.form.find('#contact-status')
        .text('Added!')
        .addClass('on');
      self.form.find('input[name="email"]').val('');
    }).error(function (data) {
      self.form.find('#contact-status')
        .text(JSON.parse(data.responseText).message)
        .addClass('on');
    });
  };

  User.prototype.deleteContact = function (data) {
    $.ajax({
      url: '/contact',
      data: data,
      type: 'DELETE',
      dataType: 'json',
      cache : false
    });
  };

  User.prototype.getContacts = function () {
    var self = this;

    this.form = $('#message-form');

    $.ajax({
      url: '/contacts',
      type: 'GET',
      async: false
    }).done(function (data) {
      self.form.find('#contacts').html(data);
      self.form.find('#contact-status')
        .empty()
        .removeClass('on');
    }).error(function (data) {
      self.form.find('#contact-status')
        .text(JSON.parse(data.responseText).message)
        .addClass('on');
    });
  };

  User.prototype.addEmailNotification = function (data) {
    var self = this;

    this.form = $('#email-notification-form');

    $.ajax({
      url: '/emailNotification',
      data: data,
      type: 'POST',
      dataType: 'json',
      cache : false
    }).done(function (data) {
      var message = 'Updated!';

      self.form.find('#email-notification-status')
        .text(message)
        .addClass('on');
    }).error(function (data) {
      self.form.find('#email-notification-status')
        .text(JSON.parse(data.responseText).message)
        .addClass('on');
    });
  };

  return User;
});
