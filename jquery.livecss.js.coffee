jQuery.fn.extend
  livecss: (options) ->
    self = jQuery.fn.livecss
    jQuery(this).each (i, el) ->
      self.init el
      console.log 'watching stylesheet ' + jQuery(el).attr('href')

jQuery.extend jQuery.fn.livecss,
  
  init: (el) ->
    this.startChecking jQuery(el).attr('href')

  startChecking: (path) ->
    setTimeout((=> this.check(path)), 1000)
    
  check: (path) ->
    t = new Date
    n_path = path.replace(/\?.*/,'') + "?" + t.getTime()
    jQuery("head").append "<link rel='stylesheet' href='#{n_path}' type='text/css' />"
    setTimeout((=> this.remove(path)), 100)
    setTimeout((=> this.check(n_path)), 1000)
    
  remove: (path) ->
    jQuery("link[rel='stylesheet'][href='#{path}']").remove()
    
    
jQuery(document).ready ->
    jQuery("link[rel='stylesheet']").livecss()
    return