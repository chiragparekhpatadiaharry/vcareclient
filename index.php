<?php
    //i am adding comment for test
	include("includes/client_authentication.php");
?>
<!DOCTYPE html>
<html class=" js csstransforms3d csstransitions js"><head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
        <meta charset="utf-8">
        <meta name="description" content="vcare">
            
        <!-- load oswald and pt sans fonts from google fonts -->
        <link rel="stylesheet" type="text/css" href="css-template/css.css" />
        <link rel="stylesheet" type="text/css" href="css-template/css_002.css" />
        
        <!-- load bootstrap css library -->
        <link rel="stylesheet" type="text/css" media="all" href="css-template/bootstrap.css" />
        <link rel="stylesheet" type="text/css" media="all" href="css-template/bootstrap-responsive.css" />        
        
        <!-- load prettyphoto css library -->
        <link rel="stylesheet" type="text/css" media="all" href="css-template/prettyPhoto.css" />
                
        <!-- load template specific css styles -->           
		<link rel="stylesheet" type="text/css" media="all" href="css-template/style.css" /> 
		<link rel="stylesheet" type="text/css" media="all" href="css-template/blue_skin.css" />              
	
        <!--[if lte IE 8]>
    	<link rel="stylesheet" type="text/css" media="all" href="css/ie.css" />
        <![endif]-->
        
        
        <link rel="stylesheet" type="text/css" media="all" href="css-template/bootstrap-modal.css" />
        
        <link rel="stylesheet" type="text/css" media="all" href="css-template/toastr.css" />
        
        <!-- load jquery library -->
        <script type="text/javascript" src="js-template/jquery-191.js"></script>
        
        <script type="text/javascript">
        	$(function() 
        	{
        		$("#form").submit(function()
        		{
        			var formData = new FormData($("#form")[0]);
        			$.ajax({
        				url: 'login.php',
        				type:'POST',
        				data: formData,
        				processData: false,  
        				contentType: false, 
        				cache: false,
        				mimeType: 'multipart/form-data',
        				success: function(html)
        				{
        					if($.trim(html)=='error')
        					{
        						showtoast('error');
        					}
        					else
        					{
                                toastr.info("Login successful. Redirecting...");
        						window.location.href=html;
        					}
        				}                   
        		});
        		return false
        		});
        	});
        	function showtoast(msg)
        	{
        		toastr.error("Invalid Username or Password");
        	}
        </script>
        
        <script type="text/javascript">    
	
    	jQuery(window).load(function(){
    
    		jQuery('.large-swrapper .flexslider').flexslider({
    			animation: "fade",
    			controlNav: true,
    			directionNav: false,
    			prevText: "&laquo;",           //String: Set the text for the "previous" directionNav item
    			nextText: "&raquo;",               //String: Set the text for the "next" directionNav item		
    			slideshowSpeed: 3800,           //Integer: Set the speed of the slideshow cycling, in milliseconds
    			animationSpeed: 900,            //Integer: Set the speed of animations, in milliseconds		
    			easing: "easeOutQuad",               //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!		
    			start: function(slider) {
    				slider.removeClass('lflex-loading');
    			}
    		});	
    		
    	}); //end of window load  
    	  
    	</script>
            
        <title>Welcome to Vcare</title>
        
    </head>

<body>

<?php include_once "includes/header.php"; ?>


<!-- login form modal -->
<div id="showLoginForm" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
				<h3 style="color: black;" id="myModalLabel">Login</h3>
			</div>
			<form name="addEducation" class="form-horizontal" id="form" action="" method="post" enctype="multipart/form-data">
			<div class="modal-body" id="data">
				<div class="control-group">
					<label style="color: black;" class="control-label">Franchisee Code</label>
					<div class="controls" style="border: 1px solid gray;">
						<input style="color: black;"  type="text" class="input-xlarge" id="txtUsername" name="txtUsername" required />
					</div>
				</div>
				<div class="control-group">
					<label style="color: black;" class="control-label">Password</label>
					<div class="controls" style="border: 1px solid gray;">
						<input style="color: black;" type="password"   class="input-xlarge" id="txtPassword" name="txtPassword" required />
						<input type="hidden" name="comm" value='login'>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-primary" type="submit" id="btnSave">Login</button>
				<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
			</div>
			</form>
</div>




        <!-- the welcome center aligned message -->
        <div class="intro">
        	<h5>Welcome to Vcare! We are a divison of Vartman Marketing &amp; Retail Trading Co.Pvt.Ltd.<br> and situated in Morvi.</h5>
        </div>  
          	
        
        <!-- start slider wrapper -->
        <div class="large-swrapper">
        
            <div class="flexslider">
                <ul class="slides">
                    <li class="" style="width: 100%; float: left; margin-right: -100%; position: relative; display: none;">
                        <a href="#"><img src="images/template/lslide_img2.jpg" alt=""></a>
                    </li>
                    <li class="flex-active-slide" style="width: 100%; float: left; margin-right: -100%; position: relative; display: list-item;">
                        <div class="ls-info">
                            <h3><a href="#">Creative typography arrangements</a></h3>
                        </div>                    
                        <img src="images/template/lslide_img1.jpg" alt="">                              
                    </li>
                    <li class="" style="width: 100%; float: left; margin-right: -100%; position: relative; display: none;">
                        <img src="images/template/lslide_img3.jpg" alt="">    
                        <div class="ls-info">
                            <h3><a href="#">Drake’s food for tonight</a></h3>
                        </div>                                
                    </li>
                </ul>
            <ol class="flex-control-nav flex-control-paging"><li><a class="">1</a></li><li><a class="flex-active">2</a></li><li><a class="">3</a></li></ol></div>        

		</div>        
        <div class="clearboth"></div>
        <!-- end slider wrapper -->   
                
            

            
        <div class="row-fluid">
            
            <div class="span3 service-box">
                <img src="images/template/s_icon1.png" alt="" class="sb-img">
                <h3><a href="#">Vcare Point</a></h3>
                <p>Pixel perfect spacing and artistic typography are here for the taking!</p>
            </div>
            
            <div class="span3 service-box">
                <img src="images/template/s_icon2.png" alt="" class="sb-img">
                <h3><a href="#">Warehouse</a></h3>
                <p>Color variations like you never seen before makes this project one of its kind!</p>                 
            </div>
            
            <div class="span3 service-box">
                <img src="images/template/s_icon3.png" alt="" class="sb-img">
                <h3><a href="#">Clients</a></h3>
                <p>A new, funny but very useful script enhances Moonrise’s portfolio section :)</p>                  
            </div>    
            
            <div class="span3 service-box">
                <img src="images/template/s_icon4.png" alt="" class="sb-img">
                <h3><a href="#">Workers</a></h3>
                <p>Powered with Bootstrap, this is not just unique, but also feature rich!</p>                  
            </div>                                            
            
        </div><!-- end of .row-fluid -->
            
            

    	
		





<?php include_once "includes/footer.php"; ?>

</body>
</html>