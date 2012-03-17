jQuery.fn.extend({
  livecss: function(options) {
    var self;
    self = jQuery.fn.livecss;
    return jQuery(this).each(function(i, el) {
      self.init(el);
      return console.log('watching stylesheet ' + jQuery(el).attr('href'));
    });
  }
});

jQuery.extend(jQuery.fn.livecss, {
  init: function(el) {
    return this.startChecking(jQuery(el).attr('href'));
  },
  startChecking: function(path) {
    var _this = this;
    return setTimeout((function() {
      return _this.check(path);
    }), 1000);
  },
  check: function(path) {
    var n_path, t,
      _this = this;
    t = new Date;
    n_path = path.replace(/\?.*/, '') + "?" + t.getTime();
    jQuery("head").append("<link rel='stylesheet' href='" + n_path + "' type='text/css' />");
    setTimeout((function() {
      return _this.remove(path);
    }), 100);
    return setTimeout((function() {
      return _this.check(n_path);
    }), 1000);
  },
  remove: function(path) {
    return jQuery("link[rel='stylesheet'][href='" + path + "']").remove();
  }
});

jQuery(document).ready(function() {
  jQuery("link[rel='stylesheet']").livecss();
});