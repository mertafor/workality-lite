<?php 
session_start();

if($_REQUEST['thumbnail']) { 
	$_SESSION['visitor']['thumbnail'] = $_REQUEST['thumbnail'];
	exit;	
}

if(isset($_REQUEST['workslider'])) { 
	$_SESSION['visitor']['workslider'] = $_REQUEST['workslider'];
	exit;	
}

if(isset($_REQUEST['blogslider'])) { 
	$_SESSION['visitor']['blogslider'] = $_REQUEST['blogslider'];
	exit;	
}
	
if(isset($_REQUEST['blogsidebar'])) { 
	$_SESSION['visitor']['blogsidebar'] = $_REQUEST['blogsidebar'];
	exit;	
}

?>
