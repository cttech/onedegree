
var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

var app = angular.module(['onedegree'], []);

app.factory('Video', function($http) {

	return {

		get : function() {

			return $http.get(base + '/api/videos');

		}

	}

});


app.controller('VideoController', function($scope, Video, $sce) {

	$scope.videos = [];

	$scope.activeVideo = {};

	$scope.setActiveVideo = function(index) {

		var embedToBeTrusted = String($scope.videos[index].link);

		$scope.activeVideo = $scope.videos[index];
		$scope.activeVideo.link = $sce.trustAsResourceUrl(embedToBeTrusted);

		document.body.scrollTop = document.documentElement.scrollTop = 0;

	}

	$scope.getVideos = function() {

		console.log("this is happening");

		Video.get().success(function(response) {

			$scope.videos = response.data;
			squarify();
			ResponsiveVideo.init();
			$scope.setActiveVideo(0);	

			console.log($scope.videos);
			

		}).error(function(response) {

			console.log('something is going wrong');

		});
	}

	$scope.getVideos();

});








function mobile() {
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		return true;
	} else {
		return false;
	}
}


function squarify() {
	$('.square').each(function() {
		$(this).height($(this).width());
	});

	requestAnimationFrame(squarify);
}


var Mast = {

	init : function() {

		var _ = this;

		

		if (mobile()) {

			_.navButton.on('touchstart', function() {

				if (_.element.hasClass('opened')) {

					_.close();

				} else {

					_.open();

				}
			});
			
		} else {

			Mast.loop = requestAnimationFrame(Mast.sizing);

			_.navButton.click(function() {

				if (_.element.hasClass('opened')) {

					_.close();

				} else {

					_.open();

				}

			});
		}
	},

	element : $(".mast"),
	logo : $('.mast-logo'),
	navButton : $("#nav-button"),
	topContainer : $(".mast").children('.top-container'),
	bottomContainer : $(".mast").children('.bottom-container'),
	title : $('.title'),

	sizing : function() {

		var _ = this;
		var distance = $(window).scrollTop();
		var mastHeight = 160;
		var logoWidth = 130;


		if (distance > mastHeight) {

			Mast.getThinner(distance, mastHeight,logoWidth);
			Mast.title.css('font-size', '1.5rem');

		} else {

			Mast.getThicker();
			Mast.title.attr('style', '');

		}

		Mast.loop = requestAnimationFrame(Mast.sizing);

	},

	getThinner : function(distance, mastHeight, logoWidth) {

		Mast.element.height(mastHeight - ((distance - mastHeight) / 2));
		Mast.logo.width(logoWidth - ((distance - logoWidth) / 3));

	},

	getThicker : function() {

		Mast.element.attr('style', '');
		Mast.logo.attr('style', '');

	},

	open : function() {

		var _ = this;
		var containerOffset = 45.5;

		_.logo.attr('src', 'img/logo-white.svg');
		_.navButton.css('color', 'white').removeClass('fa-bars').addClass('fa-close');
		_.element.addClass('full-height opened green');
		_.title.hide();

		if (mobile()) {

			_.topContainer.css({ top : '12px', transform : 'translate(-50%, 0%)' });

		} else {

			cancelAnimationFrame(Mast.loop);
			_.topContainer.css({ top : containerOffset + 'px', transform : 'translate(-50%, 0%)' });
			
		}
		
		_.bottomContainer.fadeIn();
		_.getThicker();

	},

	close : function() {

		var _ = this;
		_.logo.attr('src', 'img/logo-green.svg');
		_.navButton.css('color', '#6bbb6f').removeClass('fa-close').addClass('fa-bars');
		_.element.removeClass('full-height opened green');
		_.topContainer.addClass('quick-transition');
		_.bottomContainer.fadeOut(100);
		_.title.fadeIn('fast');
		setTimeout(function(){_.topContainer.attr('style', '').removeClass('quick-transition')}, 100);

		if (!mobile()) {

			Mast.loop = requestAnimationFrame(Mast.sizing);

		}

		
	}

}


var SecondaryTeamMemberOverlay = {

	init : function() {
		_ = this;

		$('.secondary-team-member').hover(function() {

			_.slideIn($(this));

		}, function() {

			_.slideOut($(this));

		});

	},

	slideIn : function(element) {

		var overlay = element.find('.overlay');

		overlay.css({top : '0%', right : '0%'});

	},

	slideOut : function(element) {

		var overlay = element.find('.overlay');

		overlay.attr('style', '');

	}

}


var ProcessLine = {

	init : function() {

		var _ = this;

		_.setPathLength();
		_.draw();

	},

	element : document.querySelector('.process-line .animated-process-line'),

	colorTransitionPoints : [4777, 3242, 1715, 709, 163],

	colorTransitionElements : [
		{ icon : '#discover-icon', title : '#discover-title' },
		{ icon : '#analyze-icon', title : '#analyze-title' },
		{ icon : '#develop-icon', title : '#develop-title' },
		{ icon : '#implement-icon', title : '#implement-title' },
		{ icon : '#monitor-icon', title : '#monitor-title' }
	],

	setPathLength : function() {

		var path = ProcessLine.element;
		var length = path.getTotalLength();

		path.style.strokeDasharray = length + ' ' + length;
		path.style.strokeDashoffset = length;

	},

	draw : function() {

		var path = ProcessLine.element;
		var length = path.getTotalLength();
		var distance = $(window).scrollTop();

		for(i = 0; i < ProcessLine.colorTransitionPoints.length; i++) {

			if (parseInt(path.style.strokeDashoffset) < ProcessLine.colorTransitionPoints[i]) {

				$(ProcessLine.colorTransitionElements[i].icon).css({color: '#6bbb6f', fontSize : '7rem'});
				$(ProcessLine.colorTransitionElements[i].title).css('width','150px');

			} else {

				$(ProcessLine.colorTransitionElements[i].icon).attr('style', '');
				$(ProcessLine.colorTransitionElements[i].title).attr('style', '');

			}

		}

		path.style.strokeDashoffset = (length - (distance * 2.1));
		ProcessLine.loop = requestAnimationFrame(ProcessLine.draw)

	} 
}



var MediumPosts = {

	init : function() {

		this.setWidth();

	},

	initialElements : $(".m-story"),

	setWidth : function() {

		var loadedElements = $(".medium-container iframe");

		if ($(window).width() > 1000) {

			this.initialElements.each(function() {

				$(this).attr('data-width', "33%");

			})
			loadedElements.each(function() {

				$(this).attr('width', "33%");

			});

		} else {

			this.initialElements.each(function() {

				$(this).attr('data-width', "100%");

			});

			loadedElements.each(function() {

				$(this).attr('width', "100%");

			});
		}
	}
}

var HomeBanner = {

	init : function() {

		this.sizing();
		this.slideshow();

	},

	element : $(".home-banner"),

	sizing : function() {

		var windowHeight = $(window).height();
		var mastHeight = 160;
		var bannerHeight = windowHeight - mastHeight - ( mastHeight * 0.666);

		this.element.css('height', bannerHeight + 'px' );

	},

	slideshow : function() {

		$("#skippr-targer").skippr({

			transition : 'fade',
			arrows : false

		});

	}

}

var ResponsiveVideo = {

	init : function() {

		this.responsive();

	},

	responsive : function() {

		$(".active-video-container").fitVids();

		requestAnimationFrame(ResponsiveVideo.responsive);

	}

}

$(document).ready(function() {

	Mast.init();
	squarify();

	if (thisPage === '/') {

		HomeBanner.init();

	}

	if (thisPage === '/' || thisPage === 'blog') {

		MediumPosts.init();

	}

	if (thisPage === 'team') {

		SecondaryTeamMemberOverlay.init();

	}

	if (thisPage === 'process' && $(window).width() > 1000) {

		ProcessLine.init();

	}

	if (thisPage === 'videos') {

		// Video.init();

	}

});

$(window).resize(function() {

	squarify();

	if (thisPage === '/') {

		HomeBanner.init();

	}

	if (thisPage === '/' || thisPage === 'blog') {

		MediumPosts.init();

	}

});







