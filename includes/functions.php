<?php
    include_once "config.php";
    function getLoggedInUserName($fid)
    {
        
        $rs=mysql_query("select FranCode,Title,FirstName,LastName from tbl_franchisee where FranID=".$fid."");
        $name="";
        while($r=mysql_fetch_array($rs))
        {
            $name=$r["Title"]." ".$r["FirstName"]." ".$r["LastName"]." (".$r["FranCode"].")";
            break;
        }
        return $name;
    }
    
    function printEpinAmtQty()
    {
        $rs=mysql_query("select PinAmount from tbl_pin_profile_master where Status=1");
        while($r=mysql_fetch_array($rs))
        {
?>
            <tr>
                <td>
                    E-pin Amount of Rs. <?= $r["PinAmount"];?>
                    <input type="hidden" name="hidPinAmt[]" value="<?= $r["PinAmount"];?>" />
                </td>
                <td><input class="numeric" type="text" name="txtEpinQty[]" onblur="calcTotal();" /></td>
            </tr>
<?php
        }
        $rs2=mysql_query("select PinDiscount from tbl_pin_discount where Status=1");
        $discount="";
        while($r2=mysql_fetch_array($rs2))
        {
            echo $r2[0];
        }
    }
?>