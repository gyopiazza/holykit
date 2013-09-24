(function($) {
    $.fn.dropnav = function(options) {

        var
        defaults = {
            hover: 'hover',
            open: 'open',
            selector: this.selector,
            delay: 400
        },
        settings = $.extend({}, defaults, options);
        
        var show = function($trigger) {
          // console.log('------------');
          // console.log('Show');
          // console.log($.data(this, timer));
          // clearTimeout($.data(this, timer));
          $trigger.addClass(settings.hover);
          $trigger.find(settings.selector+':eq(0)').addClass(settings.open);
        }

        var hide = function($trigger) {
          // console.log('------------');
          // console.log('Hide');
          // console.log($.data(this, timer));
          // var $item = $(item);
          // timer = setTimeout(function() {
              $trigger.removeClass(settings.hover);
              $trigger.find(settings.selector+':eq(0)').removeClass(settings.open);    
          // }, settings.delay);
        }

        this.each(function() {
            var $this = $(this),
                timer,
                $trigger = $this.attr('data-trigger');
            
            console.log('------------');
            console.log('------------');
            console.log('------------');
            console.log('------------');
            
            // Next item
            if ($trigger == 'next') {
                console.log('next');
                $trigger = $this.prev();
            // Previous item
            } else if ($trigger == 'prev') {
                console.log('prev');
                $trigger = $this.prev();
            // Selector
            } else if ($trigger) {
                console.log('selector');
                $trigger = $($trigger);
            } else {
                console.log('default');
                $trigger = $this.parent().eq(0);
            }
            
            
            
            console.log($trigger);
            console.log($this);
            // $.data(this, 'timer');

            if ($this.attr('data-trigger-event') == 'click') {
              $trigger.toggleClick(function(){ show($trigger); }, function(){ hide($trigger); });
            } else {
              $trigger.hover(function(){ show($trigger); }, function(){ hide($trigger); });
            }

            // // Mouse over
            // $this.parent().eq(0).hover(function () {
            //     clearTimeout(timer);
            //     var $item = $(this);
            //     $item.addClass(settings.hover);
            //     $item.find(settings.selector+':eq(0)').addClass(settings.open);
            
            // // Mouse out
            // }, function () {
            //     clearTimeout(timer);
            //     var $item = $(this);
            //     timer = setTimeout(function() {
            //         $item.removeClass(settings.hover);
            //         $item.find(settings.selector+':eq(0)').removeClass(settings.open);    
            //     }, settings.delay);
                
            // });
            
            
            // // Mouse over
            // $this.parent().eq(0).hover(function () {
            //     clearTimeout(timer);
            //     var $item = $(this);
            //     $item.addClass(settings.hover);
            //     $item.find(settings.selector+':eq(0)').addClass(settings.open);
            
            // // Mouse out
            // }, function () {
            //     clearTimeout(timer);
            //     var $item = $(this);
            //     timer = setTimeout(function() {
            //         $item.removeClass(settings.hover);
            //         $item.find(settings.selector+':eq(0)').removeClass(settings.open);    
            //     }, settings.delay);
                
            // });
            
        }); // each
        
        // Allow the chain
        return this;
    }
})(jQuery);



// Replacement for the deprecated toggle()
// Pass a N number of functions to loop through them
(function($) {
    $.fn.toggleClick = function(){
      var functions = arguments, iteration = 0;
      return this.click(function() {
        functions[iteration].apply(this,arguments);
        iteration = (iteration+1) %functions.length;
      });
    }
})(jQuery);






/**
 * jQuery Mouse Direction Plugin
 * @version: 1.1
 * @author Hasin Hayder [hasin@leevio.com | http://hasin.me]
 */
(function ($) {
    var options = {};
    var oldx = 0;
    var oldy = 0;
    var direction="";
    $.mousedirection = function (opts) {
        var defaults = {
        };
        options = $.extend(defaults, opts);
        $(document).bind("mousemove", function (e) {
            var activeElement = e.target || e.srcElement;
            if (e.pageX > oldx && e.pageY > oldy) {
                direction="bottom-right";
            }
            else if (e.pageX > oldx && e.pageY < oldy) {
                direction="top-right";
            }
            else if (e.pageX < oldx && e.pageY < oldy) {
                direction="top-left";
            }
            else if (e.pageX < oldx && e.pageY > oldy) {
                direction="bottom-left";
            }
            else if (e.pageX > oldx && e.pageY == oldy) {
                direction="right";
            }
            else if (e.pageX == oldx && e.pageY > oldy) {
                direction="down";
            }
            else if (e.pageX == oldx && e.pageY < oldy) {
                direction="up";
            }
            else if (e.pageX < oldx && e.pageY == oldy) {
                direction="left";
            }
            $(activeElement).trigger(direction);
            $(activeElement).trigger({type:"mousedirection",direction:direction});
            oldx=e.pageX;
            oldy=e.pageY;
        });
    }
})(jQuery);























/*
 * Droppy 0.1.2
 * (c) 2008 Jason Frame (jason@onehackoranother.com)
 */ (function($) {

    $.fn.droppy = function(options) {

        options = $.extend({
            speed: 250,
            className: 'dropdown',
            trigger: 'hover',
            close_delay: 300
        }, options || {});
        
        this.each(function() {
        
            var root = this,
                zIndex = 1000;
        
            // $(root).addClass(options.className);
            $(root).find('li:has(> ul) > a').addClass('has-subnav');
        
            function getSubnav(ele) {
                if (ele.nodeName.toLowerCase() == 'li') {
                    var subnav = $('> ul', ele);
                    return subnav.length ? subnav[0] : null;
                }
                else {
                    return ele;
                }
            };
        
            function getActuator(ele) {
                if (ele.nodeName.toLowerCase() == 'ul') {
                    return $(ele).parents('li')[0];
                }
                else {
                    return ele;
                }
            };

            function hide() {
                var subnav = getSubnav(this);
                if (!subnav) return;
                $.data(subnav, 'cancelHide', false);
                setTimeout(function() {
                    if (!$.data(subnav, 'cancelHide')) {
                        $('> a', this).removeClass('hover');
                        $(subnav).fadeOut(options.speed);
                        // $(subnav).slideUp(options.speed);
                    }
                }, 500);
            };

            function show() {
                var subnav = getSubnav(this);
                if (!subnav) return;
                $.data(subnav, 'cancelHide', true);
                $(subnav).css({
                    zIndex: zIndex++
                }).fadeIn(options.speed);
                // }).slideDown(options.speed);
                if (this.nodeName.toLowerCase() == 'ul') {
                    var li = getActuator(this);
                    $(li).addClass('hover');
                    $('> a', li).addClass('hover');
                }
                return false;
            };

            if (options.trigger == 'click') {
                $('> li', this).click(function(evt) {
                    evt.preventDefault();
                    if (evt.target == this || evt.target.parentNode == this) {
                        show.call(this);
                    }
                });
                $('> li ul, > li li', this).hover(show, function() {});
                $('ul, li', this).hover(function() {}, hide);
            }
            else {
                if (typeof $.fn.hoverIntent == 'function') {
                    $('ul, li', this).hoverIntent($.extend({
                        sensitivity: 2,
                        interval: 50,
                        timeout: 100
                    }, options.hoverIntent || {}, {
                        over: show,
                        out: hide
                    }));
                }
                else {
                    $('ul, li', this).hover(show, hide);
                }
            }
            
            
            $('li', this).hover(

            function() {
                $(this).addClass('hover');
                $('> a', this).addClass('hover');
            },

            function() {
                $(this).removeClass('hover');
                $('> a', this).removeClass('hover');
            });

        });

    };

})(jQuery);








/* ============================================================
 * bootstrap-dropdown.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=dropdown]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , isActive

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) {
        if ('ontouchstart' in document.documentElement) {
          // if mobile we we use a backdrop because click events don't delegate
          $('<div class="dropdown-backdrop"/>').insertBefore($(this)).on('click', clearMenus)
        }
        $parent.toggleClass('open')
      }

      $this.focus()

      return false
    }

  , keydown: function (e) {
      var $this
        , $items
        , $active
        , $parent
        , isActive
        , index

      if (!/(38|40|27)/.test(e.keyCode)) return

      $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) {
        if (e.which == 27) $parent.find(toggle).focus()
        return $this.click()
      }

      $items = $('[role=menu] li:not(.divider):visible a', $parent)

      if (!$items.length) return

      index = $items.index($items.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index--                                        // up
      if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
      if (!~index) index = 0

      $items
        .eq(index)
        .focus()
    }

  }

  function clearMenus() {
    $('.dropdown-backdrop').remove()
    $(toggle).each(function () {
      getParent($(this)).removeClass('open')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = selector && $(selector)

    if (!$parent || !$parent.length) $parent = $this.parent()

    return $parent
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


 /* DROPDOWN NO CONFLICT
  * ==================== */

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(document)
    .on('click.dropdown.data-api', clearMenus)
    .on('click.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);