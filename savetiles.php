<?php
	//echo "fuck me ";
	define('UPLOAD_DIR', 'data/');
	$img = $_POST['data'];
	$lng = $_POST['lng'];
	$hor = $_POST['hor'];
	$ver = $_POST['ver'];
	$img = str_replace('data:image/png;base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$data = base64_decode($img);
	$image = imagecreatefromstring($data);
	imagealphablending($image,true);
	for ($x=0; $x<$hor; $x++) {
		for ($y=0; $y<$ver; $y++) {
			$xlng = $x+$lng;
			$address = UPLOAD_DIR . "tile" . $xlng . "_" . $y . "_0.png";
			$cropped = file_exists($address) ? imagecreatefrompng($address) : imagecreatefrompng(UPLOAD_DIR . "empty.png");
			imagealphablending($cropped,true);
			imagecopyresampled($cropped, $image, 0, 0, $x*100, $y*100, 100, 100, 100, 100);		
			imagealphablending($cropped,false);
			imagesavealpha($cropped,true);
			$success = imagepng($cropped, $address);
			imagedestroy($cropped);
			echo $success ? $address."\n" : ' Unable to save the file.'."\n";
		}
  	}
?>