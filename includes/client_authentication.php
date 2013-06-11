<?php
session_start();
if(isset($_SESSION['vcare_user']))
{
	header("Location:user-home.php");
	exit;
}
?>