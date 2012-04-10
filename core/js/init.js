/*
 * HMTL 5 APP, lunchify
 * Created by C2 Interactive
 * Author C2 Interactive
 *
 * http://www.c2.se
 */

$(document).ready(function(){
    settings.init();  
});

var container = $('#slide');
var item = $('#settings');

settings = {    
    started : false,

    init : function(){
        settings.draggable();
    },

    draggable : function(){          

        item.mousedown(function(e){
        
            e.preventDefault();
            
            
            var self = this;
            var element = $(this).offset();
            
            element.width = $(this).width();
            element.height = $(this).height();
            element.css_top = parseInt($(this).css('top')); 

            mouse_position = {
                y : e.pageY - element.top,
            };
            
            area = parseInt(container.height());
            drag = parseInt(item.css('top'));


            $(document).mousemove(function(e){

                settings.started = true;
                var y = e.pageY - element.top;

                var properties = { top: element.css_top + y - mouse_position.y }
                
                properties.top = (properties.top > area - element.height - 0) ? area - element.height - 0 : properties.top;
                //properties.top = (properties.top < drag) ? drag : properties.top;

                $(self).css(properties);
                
            });
        });

        $(document).mouseup(function(){
            if(settings.started) {
                $(document).unbind('mousemove');
                settings.end();
                settings.started = false;
            }
        });        
    },

    /* Make it animate back if the user havent dragged it more than.. */
    end : function(){
        var drag = parseInt(item.css('top'));
        if ( drag > (parseInt(container.height()) - parseInt(item.height()) - 160 )) {
            settings.down(); /* if dragged more than... */
        } else {
            item.animate({
                'top': '-466'
            }, 329, 'easeInOutSine', function () {});
        }
    },

    down : function(){
        item.animate({
            'top': '0'
        }, 229, 'easeInOutSine', function () {});
    }        
}


/* Make it draggable */
item.draggable({
    containment: 'parent',
    axis: 'y',
    start: function(event, ui) {
        $(document).mousemove(function(){
            if(settings.started){
                var top = item.css('top').substring(0, item.css('top').height - 2);
                var height = container.height() - item.height();
            }
        });
    },
    stop: function(event, ui){
        $(document).unbind('mousemove');
    }
});

item.mousedown(function(){
    settings.started = true;
});
$(document).mouseup(function(){
    if (settings.started){
        settings.end();
        settings.started = false;
    } 
});