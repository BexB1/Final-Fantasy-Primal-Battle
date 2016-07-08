(function() {
    var scripts = document.getElementsByTagName('script');
    var index = scripts.length - 1;
    var my_script = scripts[index];
 //   if (my_script.src.indexOf('tagman.js') !== -1) {
        var query_string = my_script.src.replace(/^[^\?]+\??/, '');
        var qs_array = query_string.split("%2C");
    	var tmcampid = qs_array[0];
        var tmplaceref = qs_array[1];
    	var tmclickref = qs_array[2];
        //document.write('<img src="https://pfa.levexis.com/audibleuk/tman.cgi?tmad=i&tmcampid=' + tmcampid + '&tmplaceref=' + tmplaceref + '&tmclickref=' + tmclickref + '"/>');
        var i = document.createElement('img');
		i.src = "https://pfa.levexis.com/audibleuk/tman.cgi?tmad=i&tmcampid=" + tmcampid + '&tmplaceref=' + tmplaceref + '&tmclickref=' + tmclickref + '&tmtag=image';
 //   }
}());