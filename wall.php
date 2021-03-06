<!DOCTYPE HTML>
<html manifest="nothing.cache">

<head>
	<?php 
		if(isset($_GET["l"]))
		{
			$position = $_GET['l'];
		}
		else {
			$position = 0;
		}
	?>
	<script type="text/javascript">
		var userlng = <?= $position ?>;
    </script>
	<!-- turn off caching -->
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta http-equiv="cache-control" content="max-age=0" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="-1" />
	<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
	<meta http-equiv="pragma" content="no-cache" />
	<link rel="stylesheet" type="text/css" href="styles.css">
	<link rel="stylesheet" type="text/css" href="jquery.nouislider.min.css">
	<title>1WALL</title>
	<script type="text/javascript"
      src="https://maps.googleapis.com/maps/api/js?v=3?key={AIzaSyAbNAQqHqQQXfOYi4uFFWBhw0PnwyuTzcc}&sensor=false">
    </script>
	<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
	<script src="jquery.nouislider.min.js"></script>
	<script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
	<script src="jquery.event.drag-2.2.js"></script>
</head>

<body>
	<div id="shade" class="shade">
		<div id="status">Saving ...</div><br>
		<img id="loader" src="ajax-loader.gif"><br>
		<p>
			Thanks for trying 1WALL beta!<br>
			I really want to hear what you think of it, so I made <a href="https://docs.google.com/forms/d/1dthYwETvF5Hgzt-5zAoX0oo2vwgokloal7Kke92Z1ZQ/viewform">this tiny questionnaire</a> that'll take you about 3 min to complete and help me immensely to improve your experience. You'll also receive some free music as a reward!<br><br>
			Also, feel free to follow me on Twitter to get updates about stuff I&#39;m doing, and spread the word!<br><br>
			<a id="reloadLink" href=""><b>»» BACK TO THE WALL</b></a><br><br><br><br>
			<div id="twitter">
				<a href="https://twitter.com/j4kubfiala" class="twitter-follow-button" data-show-count="false">Follow @_jakubfiala</a>
				<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'http';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
				<a href="https://twitter.com/share" class="twitter-share-button" data-text="Just drew something on 1WALL" data-via="j4kubfiala" data-hashtags="1wall">Tweet</a>
				<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'http';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
			</div>
		</p>
	</div>
	<div id="shareShade" class="shade">
		<p>
			<b>Copy and paste the following link to share this part of 1WALL</b>
		</p><br>
		<span id="shareUrl"></span><br><br>
		<a id="shareClose"><b>CLOSE THIS</b></a><br><br><br><br>
	</div>
	<div id="loadShade" class="shade">
	<br><br><br><br>
		Loading ...<br><br>
		<img id="loader" src="ajax-loader.gif"><br>
	</div>
	<header>1WALL <span style="font-size: 20px;">by Jakub Fiala </span><span style="font-size: 10px;">powered by <a href="https://developers.google.com/maps/"><img style="position:relative; top:7px; display: inline;" src="google_white2.png"></a> Maps API</span><div id="instructions" style="font-size: 14px; position:relative; text-align:right; float:right; margin-right: 15px; top:25px;">Use arrow keys to move left & right. Press D to draw. Pick a colour from the palette below. Press D again to save your drawing.</span></header>
	<div id="menu">
		<img id="infoButton" class="menuButton" src="down.png" width="50px" height="50px" title="Info">
		<img id="drawButton" class="menuButton" src="draw.png" width="40px" height="40px" title="Draw" style="right: 5px">
		<img id="shareButton" class="menuButton" src="share.png" width="45px" height="45px" title="Share" style="right: 5px">
		<div id="slider" class="menuButton" style="right: 5px" draggable="false">
			<img id="sliderLine" src="sliderline.png" width="50px" draggable="false">
			<img id="sliderHead" src="sliderhead.png" width="50px" draggable="false">
		</div> 
	</div>
	</div>
	<div id="wall">
		<div id="map"></div>
		<canvas id="c"></canvas>
		
	</div>
	<div id="palette">
			<div id="pointer"><img src="colorpointer.png" width="50px" height="50px"></div>
			<div id="palLeft" class="nav" style="float:left;">
				<img src="arrow.png" width="50px" height="50px" style="opacity:0.8;">
			</div>
			<div id="palRight" class="nav" style="float:right;">
				<img src="arrowrev.png" width="50px" height="50px" style="opacity:0.8;">
			</div>
		</div>	

	<footer>
		(c) Jakub Fiala 2014
	</footer>


	<script src="wall.js"></script>
</body>

</html>