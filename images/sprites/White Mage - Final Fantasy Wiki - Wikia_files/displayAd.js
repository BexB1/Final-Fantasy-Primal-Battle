var e9Manager;
var e9;
var expoDisplayAd = (function() {
   var init = {
      fetchAd: function() {
         e9Manager.setTKey("aomneMVAQw4GrW0FQJT6atR9QSQQVlwd");
         if (e9 !== undefined)
          {
            if (e9.displayAdFlag !== undefined)
             {
               if (e9.displayAdFlag === true)
                  e9.displayAd();
             }
	    else
             {
               e9Manager.displayAdFromE9(e9);
             }
          }
	 else
	  {
            e9Manager.fetchAds();
          }
       }
    }

   return init;
})();

expoDisplayAd.fetchAd();
