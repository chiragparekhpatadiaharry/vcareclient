<?php session_start() ?>
<div class="header-wrapper">
	<div class="container">
    	<div class="row-fluid">
        	<div class="span4 logo-container">
					<a href="index.php" style="outline:none;border:0px">
						<div id="logo">
						</div>
					</a>
            </div>
        	<div class="span8">
            
                <div id="menu-wrapper">
                    <!-- menu that is displayed only on tablets and bigger screen resolutions
                    then is transformed into a dropdown menu for mobile devices -->
                    <ul id="rmenu-id" class="sf-menu sf-js-enabled">
                        <li><a href="index.php">Home</a></li>
                        <!--<li><a href="#">Quick Links</a></li>-->                          
                        <li class=""><a href="#">Products</a>
                            <ul style="display: none; opacity: 1;">
                                <li><a href="#">Product 1</a></li>
                                <li><a href="#">Product 2</a></li>
                                <li><a href="#">Product 3</a></li>                                
		                        <li><a href="#">Product 4</a></li> 
		                        <li><a href="#">Product 5</a></li>
                                <li class=""><a href="#">More Products »</a>
                                    <ul style="display: none; opacity: 1;">
                                        <li><a href="#">Product 6</a></li>
                                        <li><a href="#">Product 7</a></li>                        
                                        <li><a href="#">Product 8</a></li>
                                    </ul>                            
                                </li>
                            </ul>
                        </li> 
                        <li><a href="#">Contact Us</a></li>
                        
                        <?php if(!(isset($_SESSION['vcare_user']) && !empty($_SESSION['vcare_user']))){ ?>
                        <li><a href="#showLoginForm" data-toggle="modal"><i class="icon-user"></i> Sign In</a></li>
                       </ul>
                       
                        <?php }else{?>
                        </ul>
                        
                        <div style="clear: both;"></div>
                        <!--<div style="text-align: right;padding: 5px !important;"><span class="label label-info">Welcome, <?= getLoggedInUserName($_SESSION['vcare_user']); ?> !</span> | <a style="color: white;" class="btn btn-danger btn-mini" href="logout2.php"><i class="icon-off"></i> Sign Out</a></div>--> 
                        <div style="margin-bottom: 5px;" class="btn-group pull-right">
                          <a style="color: white;" class="btn dropdown-toggle btn-info" data-toggle="dropdown" href="#">
                            <?= getLoggedInUserName($_SESSION['vcare_user']) ?>
                            <span class="caret"></span>
                          </a>
                          <ul class="dropdown-menu">
                            <li><a href="logout2.php"><i class="icon-off"></i> Sign Out</a></li>
                            <li><a href="user-home.php"><i class="icon-user"></i> Profile</a></li>
                          </ul>
                        </div>
                        <?php }?>
                    
                </div><!-- end of #menu-wrapper -->
                       	
            </div><!-- end of .span8 -->    
                 
        </div>

 
    </div><!-- end of .container -->   
    
</div><!-- end of .header-wrapper --> 

<div class="hdec-wrapper"></div>


<!-- #start content(body) section -->   
<div class="content-wrapper">
	<div class="container">