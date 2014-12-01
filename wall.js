//CANVAS BY JAKUB FIALA


//GET SIZE OF WINDOW–––––---------------------------------------------------------------------
var dim = (function () {
	      var _pW, _pH;
	      if (document.body && document.body.offsetWidth) {
	        _pW = document.body.offsetWidth;
	        _pH = document.body.offsetHeight;
	      }
	      if (document.compatMode == 'CSS1Compat' && document.documentElement && document.documentElement.offsetWidth) {
	        _pW = document.documentElement.offsetWidth;
	        _pH = document.documentElement.offsetHeight;
	      }
	      if (window.innerWidth && window.innerHeight) {
	        _pW = window.outerWidth;
	        _pH = window.outerHeight;
	      }

	      return { width : _pW, height : _pH };
	    })();

//canvas clearing functions
CanvasRenderingContext2D.prototype.clearAll = 
  CanvasRenderingContext2D.prototype.clear || function (preserveTransform) {
    if (preserveTransform) {
      this.save();
      this.setTransform(1, 0, 0, 1, 0, 0);
    }

    this.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (preserveTransform) {
      this.restore();
    }

};

CanvasRenderingContext2D.prototype.clear = 
  CanvasRenderingContext2D.prototype.clear || function (preserveTransform) {
    if (preserveTransform) {
      this.save();
      this.setTransform(1, 0, 0, 1, 0, 0);
    }

    this.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (preserveTransform) {
      this.restore();
    }
};



//CANVAS DISPLAY HANDLING-------------------------------------------------------------------
var size = 100; //tile size
var canvas = document.getElementById("c");
	canvas.height = 600;
	canvas.width = dim.width+size;
	context = canvas.getContext("2d");
var horTiles = Math.floor(canvas.width/size);
var verTiles = Math.floor(canvas.height/size);
var jump = 17.578125;


//GOOGLE MAPS API SETUP-----------------------------------------
document.getElementById("map").style.height = verTiles*size;

var canvasMapTypeOptions = {
	getTileUrl: function(coords,zoom) {
		var time = new Date().getTime();
		return "http://igor.gold.ac.uk/~mu201jf/data/tile" + coords.x + "_" + coords.y + "_" + (zoom-3) + ".png?trt=" + time;
		//return "http://jftest.wz.sk/data/tiles/tile2_2.png";
	},
	tileSize: new google.maps.Size(size,size),
	minZoom: 0,
  	maxZoom: 5,
  	name: "Canvas"
}

var canvasMapType = new google.maps.ImageMapType(canvasMapTypeOptions);
//canvasMapType.projection = new MercatorProjection();

function initialize() {
	var newlng = userlng*jump;
	var mapOptions = {
  		center: new google.maps.LatLng(77.3539357714852, newlng, true),
  		zoom: 3,
  		streetViewControl: false,
  		mapTypeControlOptions: {
      		mapTypeIds: ["canvas"]
    	},
    	backgroundColor: "#fff",
    	disableDefaultUI: true,
	};
	canvasMap = new google.maps.Map(document.getElementById("map"), mapOptions);
	canvasMap.mapTypes.set('canvas', canvasMapType);
	canvasMap.setMapTypeId('canvas');
	/*canvasMap.panBy(size,0);
	jump = canvasMap.getCenter().lng();
	console.log("jump:",jump);
	//target position on wall
	var newlng = userlng*jump;
	canvasMap.setCenter(new google.maps.LatLng(77.3539357714852, newlng, true));*/
	//hide loading screen when ready
	google.maps.event.addListener(canvasMap, 'tilesloaded', function() {
    	$("#loadShade").fadeOut(1000);
  	});
}





function saveTiles() {
	//get canvas dataURL
	var url = canvas.toDataURL("image/png");
	console.log(url);
	//set reload link to current position
	$("#reloadLink").attr("href","http://igor.gold.ac.uk/~mu201jf/wall.php?l=" + canvasMap.getCenter().lng()/jump);
	//show saving screen
	$("#shade").fadeIn(1000);
	//send to server
	$.ajax({
		url:"savetiles.php",
		cache: false, 
		data: {
			data: url,
			lng: (canvasMap.getCenter().lng()/jump+4), //don't ask me how I came up with this. Magic.
			hor: horTiles,
			ver: verTiles
		},
		type: "POST",
		success: function(resp){
			//console.log(resp);
			$("#status").html("Saved!");
			$("#loader").hide();
		},
		error: function() {
			console.log("problem occured");
		},
		complete: function() {
		
		}
	});
}

//PALETTE----------------------------------------------------------------------
var numColors = 40;
var curColor = "#000";
var colors = ["#000","#00A0B0","#6A4A3C","#CC333F","#EB6841","#EDC951","#FFFBA0","#99B898","#FECEA8","#FF847C","#E84A5F","#2A363B","#1B676B","#519548","#88C425","#BEF202","#EAFDE6","#3DECFF","#69D2E7","#A7DBD8","#E0E4CC","#C9B849","#C96823","#BE3100","#6F0B00","#241714","#8B0050","#EB0038","#FD8100","#F5B100","#F4E500","#4E4D4A","#353432","#94BA65","#2790B0","#2B4E72","#594F4F","#547980","#45ADA8","#9DE0AD","#E5FCC2"];
var $palette = $("palette");

function paletteInit() {
	$("#pointer").css({ opacity: 0.7 });
	//populate with colours
	for (var i = 0; i < numColors; i++) {
		var colorbox = $("<div></div>", { style: "background-color:"+colors[i], "class": "colorBox", id: colors[i]});
		colorbox.appendTo("#palette");
		colorbox.click(function(){
			curColor = $(this).attr("id");
			$("#pointer").animate({left: $(this).offset().left}, 300);
		})
	}
}

//UI----------------------------------------------------------------------
//mostly event listeners and CSS setters + functionality for UI elements
var menuOn = false;

function initUI() {
	var initMenuAlpha = 0.5;
	var hoverMenuAlpha = 0.8;
	$("header").css("top",-50);
	$("header").css({opacity: initMenuAlpha});
	$("#menu").css("left",dim.width-60);
	$("#menu").css("opacity",initMenuAlpha);
	$('#sliderHead').drag(function( ev, dd ){
		 if (dd.offsetY < 420 && dd.offsetY > 180) {
	         $( this ).css({top: dd.offsetY});
	         weight = ((dd.offsetY-420)/(180-420) * (20-1) + 1);
		 }
    });
	$("#menu").hover(function() {
		$(this).animate({ opacity: hoverMenuAlpha }, 200);
	}, function() {
		if (!menuOn && !drawing) {
			$(this).animate({ opacity: initMenuAlpha }, 50);
		}	
	});
	$("#infoButton").click(function() {
		if (!menuOn) {
			$("header").animate({ top: 0, opacity: hoverMenuAlpha}, 300);
			$("#sliderHead").animate({ top: "+=55"}, 300);
			$("#menu").animate({ top: 56, height: "-=55"}, 300, function() {
				$("#infoButton").attr("src","up.png");
			});
			$("#menu").css("opacity", hoverMenuAlpha);
		}
		else {
			$("header").animate({ top: -50, opacity: initMenuAlpha}, 300);
			$("#sliderHead").animate({ top: "-=55"}, 300);
			$("#menu").animate({ top: 0, opacity: initMenuAlpha, height: "+=55"}, 300, function() {
				$("#infoButton").attr("src","down.png");
			});
		}
		menuOn = !menuOn;
	});
	$("#drawButton").click(function() {
		if (!drawing) {
			$(this).attr("src", "save.png");
			$(this).attr("title", "Save");
		}
		if (drawing) {
			saveTiles();
		}
		drawing = !drawing;
	});
	$("#shareButton").click(function() {
		$("#shareUrl").html("igor.gold.ac.uk/~mu201jf/wall.php?l=" + canvasMap.getCenter().lng()/jump);
		$("#shareShade").fadeIn(1000);
	});
	$("#shareClose").click(function() {
		$("#shareShade").fadeOut(1000);
	});
	$("#palette").hover(function() {
		$(".nav").fadeIn("fast");
	}, function() {
		$(".nav").fadeOut("fast");
	});
	$("#palRight").css("left", dim.width-50);
	$("#palLeft").click(function() {
		if ($(colors[0]).css("left") != "0px") {
			$(".colorBox").animate({left: "+=100"}, 200);
			$("#pointer").animate({left: "+=100"}, 200);
		}
	});
	$("#palRight").click(function() {
			$(".colorBox").animate({left: "-=100"}, 200);
			$("#pointer").animate({left: "-=100"}, 200);
	});
}



//DRAWING----------------------------------------------------------------------
//initialise variables
var mouseX;
var mouseY;
var context;
var mX;
var mY;
var smoothing = 0.6;
//thickness is the actual size of the brush, weight & maxWeight determine the range
var thickness = 2;
var targetThickness = 2;
weight = 2;
maxWeight = weight+10;
var drawing = false;

//make a class for Point
function Point(x, y) {
	this.x = x;
	this.y = y;
}

Point.prototype.set = function(sx, sy) {
	this.x = sx;
	this.y = sy;
}

function lineDistance( x1, y1, x2, y2 )
{
  var xs = 0;
  var ys = 0;
 
  xs = x2 - x1;
  xs = xs * xs;
 
  ys = y2 - y1;
  ys = ys * ys;
 
  return Math.sqrt( xs + ys );
}

var pmouse = new Point(0,0); 

function setup() {

	getMouse
	canvas.addEventListener('mousemove', getMouse, false);
	//touch handler
	canvas.addEventListener('touchmove', function(e) {
			mouseX = e.changedTouches[0].clientX;
			mouseY = e.changedTouches[0].clientY;
			e.preventDefault();
		}
	, false);

	function getMouse (mousePosition) {
		if (mousePosition.layerX || mousePosition.layerX == 0) { // Firefox?
    		mouseX = mousePosition.layerX;
    		mouseY = mousePosition.layerY;
  		} 
  		else if (mousePosition.offsetX || mousePosition.offsetX == 0) { // Opera?
    		mouseX = mousePosition.offsetX;
    		mouseY = mousePosition.offsetY;
  		};
	}
	initialize(); //gmaps
	paletteInit(); //palette (add colours)
	initUI(); //ui (event handlers mainly)

	return setInterval(draw, 10);
};

var mouseDown = 0;
document.body.onmousedown = function() { 
	pmouse.set(mouseX,mouseY);
	mouseDown = 1;
}
document.body.onmouseup = function() {
	mouseDown = 0;
}
//touch listeners (not working yet)
document.body.addEventListener('touchstart', function(e) {
	pmouse.set(mouseX,mouseY);
	mouseDown = 1;
	e.preventDefault();
}, false);

document.body.addEventListener('touchend', function(e) {
	mouseDown = 0;
	e.preventDefault();
}, false);

//keyboard listeners
document.onkeypress = function(event) {
	if (event.keyCode == 99) {
		context.clearAll();
	};
	if (event.which == 99) {
		context.clearAll();
	};
	if(event.keyCode == 100 || event.which == 100) {
		if (drawing) {
			saveTiles();
		}
		drawing = !drawing;
		$("#drawButton").attr("src", "save.png");
	}
}

document.onkeydown = function(event) {
	if (!drawing) {
		if (event.keyCode == 37) {	//left
			canvasMap.panBy(-size,0);

		}
		if (event.keyCode == 39) {	//right
			canvasMap.panBy(size,0);
		}
		console.log("lng:",canvasMap.getCenter().lng(),"lat:",canvasMap.getCenter().lat(),"x:",canvasMap.getCenter().lng()/jump);
	}
};

//drawing algorithm
function draw() {

	if (drawing) {
		//styling
		document.body.style.cursor = "crosshair";
		context.lineCap = "round";
		context.lineJoin = "round";
		context.strokeStyle = curColor;
		context.fillStyle = curColor;
		//set pmouse if not set before
		if (pmouse.x == 0 && pmouse.y == 0) {
			pmouse.set(mouseX,mouseY);
		}
		//draw
		if (mouseDown) {
			mX = mouseX;
			mY = mouseY;
			//calculate smoothed coordinates
			mX -= (mX-pmouse.x) * smoothing;
			mY -= (mY-pmouse.y) * smoothing;
			
			//set thickness
			targetThickness = ((lineDistance(mX,mY,pmouse.x,pmouse.y)-1)/(50-1) * (maxWeight-weight) + weight);
			if (thickness > targetThickness) {
				thickness -= 0.5;
			}
			if (thickness < targetThickness) {
				thickness += 0.5;
			}
			context.lineWidth = thickness;
			//draw using quad interpolation
			context.beginPath();
			context.moveTo(pmouse.x, pmouse.y);
			context.quadraticCurveTo(pmouse.x, pmouse.y, mX, mY);
			context.stroke();
			context.closePath();
			//set pmouse to current position
			pmouse.set(mX, mY);
		}
	}
	else {
		document.body.style.cursor = "default";
	}	
}

setup();
