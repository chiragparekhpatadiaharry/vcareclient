<?php
	session_start();
	include_once("includes/config.php");
	if(isset($_POST['comm']) && $_POST['comm']=='profileLogin')
	{
		$password=$_REQUEST['txtProfilePassword'];
		//$query="select * from tbl_admin";
		
		$query="select PersonalPassword from tbl_franchisee";
		
		
		$result=mysql_query($query);
		$flg=0;
		while($row=mysql_fetch_array($result))
		{
			//die(md5($password));
			if($row[0]==$password)
			//if($row[1]==$usrname && $row[2]==md5($password))
			
			{
				$_SESSION['profile_authentication']=$row[0];
				$flg=1;
			}
		}
		if($flg==1)
		{
			echo "user-home.php";
		}
		else
		{
			echo "error";
		}
	}	
?>