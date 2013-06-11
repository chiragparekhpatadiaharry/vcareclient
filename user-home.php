<?php
ob_start();
session_start();
if(!isset($_SESSION['vcare_user']))
{
	header("Location:index.php");
	exit;
}
include_once "includes/functions.php";
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
    
        <title>Home</title>
        
        <!-- load jquery library -->
        <script type="text/javascript" src="js-template/jquery-191.js"></script>
        
        <script type="text/javascript">
            
            function calcTotal()
            {
                var gtotal=0;
                var qty_name = 'txtEpinQty[]';
                var amt_name = 'hidPinAmt[]';
                var qtys = document.getElementsByName(qty_name);
                var amts = document.getElementsByName(amt_name);
                var c_qty=0;
                for (var i=0; i<qtys.length; i++)
			    {
				   //alert(qtys[i].value);
                   if(qtys[i].value!=0)
                   {
                        c_qty+=1;
                        gtotal+=amts[i].value*qtys[i].value;
                   }
			    }
                $("#total").text(gtotal);
            }
        </script>
        
    </head>

<body>

<?php include_once "includes/header.php"; ?>

         
        
        <?php
            if($_SESSION['profile_authentication'])  
            {
        ?>
            
        <div class="tabbable">
          <ul class="nav nav-tabs">
            <li class="active"><a href="#tab1" data-toggle="tab">My Profile</a></li>
            <li><a href="#tab2" data-toggle="tab">Income</a></li>
            <li><a href="#tab3" data-toggle="tab">Geneology</a></li>
            <li><a href="#tab4" data-toggle="tab">Repurchase</a></li>
          </ul>
          <div class="tab-content">
            <div class="tab-pane active" id="tab1">
            
              <div class="tabbable">
                  <ul class="nav nav-tabs">
                    <li class="active"><a href="#tab11" data-toggle="tab">Profile</a></li>
                    <li><a href="#tab12" data-toggle="tab">Welcome Letter</a></li>
                    <li><a href="#tab13" data-toggle="tab">Package Product</a></li>
                    <li><a href="#tab14" data-toggle="tab">E-Pins</a></li>
                  </ul>
                  <div class="tab-content">
                    <div class="tab-pane active" id="tab11">
                      <p>Profile</p>
                    </div>
                    <div class="tab-pane" id="tab12">
                      <p>Welcome Letter</p>
                    </div>
                    <div class="tab-pane" id="tab13">
                      <p>Package Product</p>
                    </div>
                    <div class="tab-pane" id="tab14">
                    
                      <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                      <table class="table table-hover">
                        <caption><span style="font-size: 14px;" class="label label-warning">Order E-Pins</span></caption>
                        <tr>
                            <td colspan="2"><span class="label label-info">E-Pin Detail</span></td>
                        </tr>
                        <?php echo printEpinAmtQty(); ?>
                      
                        <tr>
                            <td colspan="2"><span class="label label-info">E-Pin Payment Detail</span></td>
                        </tr>
                        <tr>
                            <td>Amount</td>
                            <td><div id="total"></div></td>
                        </tr>
                        <tr>
                            <td>Discount</td>
                            <td><div id="discount"></div></td>
                        </tr>
                        <tr>
                            <td>Net Amount</td>
                            <td><div id="netAmt"></div></td>
                        </tr>
                      </table>
                        
                      <div style="margin-left:48%;">
                        <input class="btn btn-success btn-large" type="submit" value="Save" />
                      </div>
                      
                      </form>
                      
                    </div>
                  </div>
                </div>
                
            </div>
            <div class="tab-pane" id="tab2">
              <p>Howdy, I'm in Section 2.</p>
            </div>
            <div class="tab-pane" id="tab3">
              <p>Howdy, I'm in Section 2.</p>
            </div>
            <div class="tab-pane" id="tab4">
              <p>Howdy, I'm in Section 2.</p>
            </div>
          </div>
        </div>
        
		<?php
            }
            else
            {
        ?>
        <!-- the welcome center aligned message -->
        <div class="intro">
        	<h5>Welcome to Vcare! We are a divison of Vartman Marketing &amp; Retail Trading Co.Pvt.Ltd.<br> and situated in Morvi.</h5>
        </div>
         
        <div class="alert alert-block alert-danger" style="width:;">
            <button type="button" class="close" data-dismiss="alert">X</button> 
            <h4 class='alert-heading'>Not Logged In..!</h4>  
            <p>You have not logged in into your personal account.<a style="color: green;font-weight: bold;;" href="#showForm" href="#" data-toggle="modal">Click here to Login</a>.</p>
            
            <!-- Personal Login Form-->
        	<div id="showForm" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        	<div class="modal-header">
        		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
        		<h3 style="color: black;" id="myModalLabel">Login to Your Profile</h3>
        	</div>
        	<form name="addEducation" class="form-horizontal" id="form" action="" method="post" enctype="multipart/form-data">
        	<div class="modal-body" id="data">
        		<div class="control-group">
        			<label style="color: black;" class="control-label">Personal Password</label>
        			<div class="controls" style="border: 1px solid gray;">
        				<input type="password"   class="input-xlarge" id="txtProfilePassword" name="txtProfilePassword" required />
        				<input type="hidden" name="comm" value='profileLogin'>
        			</div>
        		</div>
        	</div>
        	<div class="modal-footer">
        		<button class="btn btn-primary" type="submit" id="btnSave">Login</button>
        		<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
        	</div>
        	</form>
        	</div>
            <!-- Personal Login End -->
        </div>
        <?php
            }
        ?>
        
        
<?php include_once "includes/footer.php"; ?>


<script type="text/javascript">
	$(function() 
	{
		$("#form").submit(function()
		{
			var formData = new FormData($("#form")[0]);
			$.ajax({
				url: 'profile_login.php',
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
    
    $(document).ready(function() {
        $(".numeric").keydown(function(event) {
            // Allow: backspace, delete, tab, escape, and enter
            if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || 
                 // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) || 
                 // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault(); 
                }   
            }
        });
    });
</script>

</body>
</html>