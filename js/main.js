$(".search a").click(function() {
    $(this).parent(".search").toggleClass("collapsed");
  });




  $(document).ready(function(){
    $('#nav-icon3').click(function(){
      $(this).toggleClass('open .navbar-nav ');
    });
  });





  window.onscroll = function() {
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    if(top <= 99) {
		$("nav.navbar").css("padding", "30px 20px");
    $('<style>.nav-link:after{bottom: -38px!important;}</style>').appendTo('head');
    $("input.input-scroll").css("top", "35px");
    $("a.search-scroll").css("top", "33px");
    $("nav.navbar").css("margin-top", "50px");
    $('<style>@media only screen and (max-width: 767.5px) {.search {top: 30px!important;}</style>').appendTo('head');
    }
    else {
		$("nav.navbar").css("padding", "18px 20px");
    $('<style>.nav-link:after{bottom: -26px!important;}</style>').appendTo('head');
    $("input.input-scroll").css("top", "25px");
    $("nav.navbar").css("margin-top", "15px");
    $("a.search-scroll").css("top", "20px");
    $('<style>@media only screen and (max-width: 767.5px) {.search {top: 18px!important;}</style>').appendTo('head');
    
}} 


//paralax

jQuery(window).on('scroll', function () {

	/* PARALLAX EFFECT ON HEADER */
	$(window).scroll(function() {
		var scrollTop = $(window).scrollTop();
		var paralasicValue = $('.paralasic').attr('data-paralasic');
		$('.paralasic').css('background-position', 'center top -' + scrollTop * paralasicValue + 'px'); /* 1.8 - default value. Increase less to go stopping the effect */
	});

});


///offers
initIsotope();


function initIsotope()
{
  var sortingButtons = $('.item_sorting_btn');

  if($('.item_grid').length)
  {
    var grid = $('.item_grid').isotope({
      itemSelector: '.item',
            getSortData:
            {
              price: function(itemElement)
              {
                var priceEle = $(itemElement).find('.item_price').text().replace( 'From $', '' );
                return parseFloat(priceEle);
              },
              name: '.item_title',
              stars: function(itemElement)
              {
                var starsEle = $(itemElement).find('.rating');
                var stars = starsEle.attr("data-rating");
                return stars;
              }
            },
            animationOptions:
            {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        
        // Sort based on the value from the sorting_type dropdown
        sortingButtons.each(function()
        {
          $(this).on('click', function()
          {
            var parent = $(this).parent().parent().find('.sorting_text');
              parent.text($(this).text());
              var option = $(this).attr('data-isotope-option');
              option = JSON.parse( option );
            grid.isotope( option );
          });
        });

        // Filtering
        $('.item_filter_btn').on('click', function()
        {
          var parent = $(this).parent().parent().find('.sorting_text');
          parent.text($(this).text());
          var filterValue = $(this).attr('data-filter');
      grid.isotope({ filter: filterValue });
        });

        // Change view to Box
        if($('.box_view').length)
        {
          var box = $('.box_view');
          box.on('click', function()
          {
            if(window.innerWidth > 767)
            {
              $('.item').addClass('box');
              var option = '{ "sortBy": "original-order" }';
              option = JSON.parse(option);
          grid.isotope(option);
            }	
          });
        }

        // Change view to List
        if($('.detail_view').length)
        {
          var detail = $('.detail_view');
          detail.on('click', function()
          {
            if(window.innerWidth > 767)
            {
              $('.item').removeClass('box');
              var option = '{ "sortBy": "original-order" }';
              option = JSON.parse(option);
              grid.isotope(option);
              setTimeout(function()
              {
                grid.isotope(option);
              },500);
            }
          });
        }
  }
}

// contact
initGoogleMap();
function initGoogleMap()
	{
		var myLatlng = new google.maps.LatLng(41.7326304,44.6987675);
    	var mapOptions = 
    	{
    		center: myLatlng,
	       	zoom: 13,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			draggable: true,
			scrollwheel: false,
			zoomControl: true,
			zoomControlOptions:
			{
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false,
			fullscreenControl: true,
			styles:[]
    	}

    	// Initialize a map with options
    	map = new google.maps.Map(document.getElementById('map'), mapOptions);
    	map.panBy(0, 0);

    	// Use an image for a marker
		// var image = 'images/map_marker.png';
		var image = 
		{
			url:'images/marker.png',
			size: new google.maps.Size(230, 150),
			anchor: new google.maps.Point(206, 125) //setting the anchor for larger icons
		};

		var imageSmall =
		{
			url:'images/dot.png',
			size: new google.maps.Size(54, 54),
			anchor: new google.maps.Point(27, 27) //setting the anchor for larger icons
		};

		var marker = new google.maps.Marker(
		{
			position: new google.maps.LatLng(34.043238,-118.258338),
			map: map
		});

		if($(window).width() < 720)
    	{
    		marker.setIcon(imageSmall);
    	}
    	else
    	{
    		map.panBy(75, 0);
    		marker.setIcon(image);
    	}

		// Re-center map after window resize
		google.maps.event.addDomListener(window, 'resize', function()
		{
			setTimeout(function()
			{
				google.maps.event.trigger(map, "resize");
				map.setCenter(myLatlng);
				if($(window).width() < 720)
		    	{
		    		marker.setIcon(imageSmall);
		    	}
		    	else
		    	{
		    		map.panBy(75, 0);
		    		marker.setIcon(image);
		    	}
			}, 1400);
		});
	}