<?php
	session_start();
	include_once("includes/config.php");
	if(isset($_POST['comm']) && $_POST['comm']=='login')
	{
		$usrname=$_REQUEST['txtUsername'];	
		$password=$_REQUEST['txtPassword'];
		//$query="select * from tbl_admin";
		
		$query="select FranID,FranCode,FranPassword from tbl_franchisee";
		
		
		$result=mysql_query($query);
		$flg=0;
		while($row=mysql_fetch_array($result))
		{
			//die(md5($password));
			if($row[1]==$usrname && $row[2]==$password)
			//if($row[1]==$usrname && $row[2]==md5($password))
			
			{
				$_SESSION['vcare_user']=$row[0];
				$_SESSION['vcare_francode']=$row[1];
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