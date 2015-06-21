/**
 * Created by Shivam Mathur on 13-06-2015.
 */
var y = window.innerHeight;
var x = window.innerWidth;
window.onload = mobile_check;
    function mobile_check(){
     return x < 1000;
    }
window.onresize = mobile_check;

/** mobile check returns 'true' if device is mobile
 */