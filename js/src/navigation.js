// NOTES

// Instead of using the 'dropnav' as the selector, use the container.
// By default the first element is the trigger, the second is the target


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
    
        var toggle = function($trigger) {
            // console.log(e.target);
            $trigger.toggleClass(settings.hover);
            
            var $target = $trigger.find(settings.selector+':eq(0)');
                        
            $target.toggleClass(settings.open);
        }
    

        this.each(function() {
            var $this = $(this),
                timer,
                $trigger = $this.attr('data-trigger');
            
            // console.log('------------');
            // console.log('------------');
            // console.log('------------');
            // console.log('------------');
            
            // Next item
            if ($trigger == 'next') {
                // console.log('next');
                $trigger = $this.prev();
            // Previous item
            } else if ($trigger == 'prev') {
                // console.log('prev');
                $trigger = $this.prev();
            // Selector
            } else if ($trigger) {
                // console.log('selector');
                $trigger = $($trigger);
            } else {
                // console.log('default');
                $trigger = $this.parent().eq(0);
            }

            if ($this.attr('data-trigger-event') == 'click') {
                $trigger.toggleClick(function(e){
                    e.preventDefault();
                    toggle($trigger);
                }, function(e){
                    e.preventDefault();
                    toggle($trigger);
                });
            } else {
                $trigger.hover(function(){
                    toggle($trigger);
                }, function(){
                    toggle($trigger);
                });
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