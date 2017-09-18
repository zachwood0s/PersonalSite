$('a[href*="#"]')
// Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
        // On-page links
        if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
        && 
        location.hostname == this.hostname
        ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
            scrollTop: target.offset().top
            }, 500);
        }
        }
    });


(function(){
    var nav = document.getElementById("navSlider");
    var dot = document.getElementById("dot");

    var aLinks = nav.getElementsByTagName("a");
    var positions= [];
    for(var i = 0; i<aLinks.length; i++){
        var aLink = aLinks[i];
        var linkedElm = aLink.href;

        var id = linkedElm.substr(linkedElm.indexOf("#")+1);
        var element = document.getElementById(id);
        positions.push(element.offsetTop);
        //console.log(id);
    }

    function moveDot(){

        for(var i = 0; i<positions.length-1; i++){
            var pos1 = positions[i];
            var pos2 = positions[i+1];
            var screenPos = window.scrollY;
            if(screenPos > pos1 && screenPos < pos2){
                var percent = 0;

                //Snapping to dots
                if(Math.abs(pos2 - screenPos) <= .05 *(pos2 - pos1)) {
                    dot.style.left = aLinks[i+1].offsetLeft+"px";
                }
                else if(Math.abs(pos1 - screenPos) <= .05 *(pos2 - pos1)){
                    dot.style.left = aLinks[i].offsetLeft+"px";
                }
                else{
                    percent = (window.scrollY - pos1)/(pos2 - pos1)*.25+.25*i;
                    dot.style.left = percent*100 +"%";
                }
                
            }
        }
    }

    window.onscroll = function(){
        moveDot();
    }
    window.onload = function(){
        moveDot();
    }
})();