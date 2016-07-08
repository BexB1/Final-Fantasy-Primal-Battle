/*************************************************************************/
//Contenu dans le JS de la page aha
/*************************************************************************/

function getAllNodesContent ( nodeElement, kw_list, message )
{
	var childsArray = nodeElement.childNodes;
	var pass = 1;
	var returnValue = "unlocked";

	for(var i = 0; i < childsArray.length; i++){
		if ( childsArray[i].nodeName != "SCRIPT" && childsArray[i].nodeName != "IFRAME" && childsArray[i].nodeName != "IMG" && childsArray[i].nodeName != "A" ) {
			/*if ( childsArray[i].nodeName == "A" )
			{
				pass = 0;
				if ( window.location.host == childsArray[i].host ){
					pass = 1;
				}
			}*/
			if ( pass == 1 ){
				if(childsArray[i].hasChildNodes()){
					returnValue = getAllNodesContent ( childsArray[i], kw_list, message );
					if ( returnValue == "locked" ){
						return "locked";
					}
				}else {
					if ( childsArray[i].nodeName == "#text" ) {
						returnValue = getAllWordsFromText ( childsArray[i].textContent, kw_list, message , "content");
						if ( returnValue == "locked" ){
							return "locked";
						}
					}
				}
			}
		}	
	}
	if ( document.body == nodeElement )
	{
	    var url_words = new Array();
            var str = document.location.href;
            var res1 = str.split("-");
            for(var i= 0; i < res1.length; i++)
            {
                var res2 = res1[i].split("_");
                for(var j= 0; j < res2.length; j++)
                {
                    var res3 = res2[j].split(".");
                    for(var k= 0; k < res3.length; k++)
                    {
                        var res4 = res3[k].split("/");
                        for(var l= 0; l < res4.length; l++)
                        {
                            var res5 = res4[l].split("&");
                            for(var m= 0; m < res5.length; m++)
                            {
                                var res6 = res5[m].split("=");
                                for(var n= 0; n < res6.length; n++)
                                {
                                    if ( typeof(res6[n]) != "undefined" && res6[n] != "" && res6[n] != "\n" ) {
                                        url_words.push(res6[n].replace("%20", " ").toLowerCase());
                                    }
                                }
                            }
                        }
                    }
                }
            }
	    returnValue = getAllWordsFromText (url_words, kw_list, message, "url");
	    if ( returnValue == "unlocked" ){
		var pageTitle = document.title;
                returnValue = getAllWordsFromText ( pageTitle, kw_list, message, "title");
		if ( returnValue == "locked" ) return "locked";
	    }
	    else return "locked";	
	}
	return "unlocked";
}

// sample mode Array contient les mots de l'url. sample en string est un bloc de test
function getAllWordsFromText (sample, array_words, message, type) 
{
	// remplacement de tous les signes de ponctuation (suite de signes ou signe isolé) par un whitespace
	if(typeof sample == "object") contenu = sample;
	else contenu = (sample.toLowerCase()).replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]+/g, ' ');
	
	var blocking_keyword = "";
	var blocking_keywords_nb = array_words.length;

	for ( var i = 0; i < blocking_keywords_nb; i ++ ) {

                var word = array_words[i];
                var word_splitted = word.split("+");
		//tous les mots de la combinaison doivent etre dans le texte
                if( word_splitted.length > 1 ){

                    var nb_occ   = 0;
                    for ( var j = 0; j < word_splitted.length; j ++ ) {
			final_word = (typeof sample !== "object") ? " "+word_splitted[j].toLowerCase()+" " : word_splitted[j].toLowerCase();
                        nb_occ += contenu.indexOf(final_word) > 0 ? 1 : 0;
                    }
                    if(nb_occ  == word_splitted.length) blocking_keyword = word;
                }
		//mot simple
		else{
		    final_word = ( typeof sample !== "object") ? " "+word.toLowerCase()+" " : word.toLowerCase();
                    if( contenu.indexOf(final_word) >= 0 ) blocking_keyword = word;
                }

		if(blocking_keyword){
			//bloquer les publicités
			message += "&alerte_desc="+type+":"+word;
                        useFirewallForcedBlock(message);
                        return "locked";
		}
        }	
  	return "unlocked";
}	

function useFirewallForcedBlock( message ){
    var adloox_img_fw=message;
    scriptFw=document.createElement("script");
    scriptFw.src=adloox_img_fw;
    document.body.appendChild(scriptFw);
}
/*************************************************************************/
var firstNode = document.body;
var contentTab = ["4u 9525","4u9525","911","abartig","abdeslam","abdominal injury","abduct","abgeknallt","abgeschossen","abortion","abschaum","absturz","absturzgebiet","absturzregion","abuse","abusive","afghanistan","agus supriatna","ah5017","air algerie","air products","airbus","airbus a320","airbus a321-200","al-quaeda","al-sawabe","alan giese","alcohol abuse","alcohol addict","alcohol addiction","alcohol dependence","alcoholic","alcoholism","alps plane crash","alter wichser","am strich","amara culture centre","american mike gordon","anal","andrew tosh","angegriffen","angriff","animal welfare","anjem choudary","ankara","anorexia","anti semitic","anulingus","anus","anwar al-awlaki","apartheid","arsch","arschfotze","arschgesicht","arschloch","arse","arsehole","ash cloud","asphyxiation","ass","ass bag","ass bandit","ass banger","ass face","ass fuck","ass fucker","ass goblin","ass hat","ass head","ass hole","ass hopper","ass jacker","ass lick","ass licker","ass monkey","ass munch","ass muncher","ass nigger","ass pirate","ass shit","ass shole","ass sucker","ass wad","ass wipe","assad","assault","assbite","assclown","asscock","asscracker","asses","ataturk airport","atom","atombombe","atomrakete","atomunfall","atouchement","atr-72","atr42-300","attack","attacke","attentat","attouchement","aufgeilen","baby car seat","baggage delay","baggage handling","baise","bambang soelistyo","bampot","bangkok","bangkok bomb","barcelona to duesseldorf","barcelona to düsseldorf","basané","bashar","bastard","bataclan concert hall","bataclan theatre","battery chickens","battery farming","bdsm","beaner","beastiality","behead","beheaded","beheading","belästigen","belästigung","bellevue","bernard cazeneuve","beschiss","beurette","bewaffnet","bewaffnete","bfm tv","bifle","bilal hadfi","binali yildirim","binge drink","binge drinking","bintang","bisexualité","bisexuel","bitch","bitchass","bitches","bitchtits","bitchy","bite","bjs","black box","black boxes","blackbox","blackbox black box blackboxes","blasen","blow job","blowjob","blue mosque","bob munro","bob patterson","bobby shepherd","boing","boko haram","bollocks","bollox","bomb","bombe","bomber","bombing","bondage","boner","boob","bougnoule","boulevard beaumarchais","boulevard voltaire","brahim abdeslam","branle","branlette","brexit","brother fucker","broutteminou","bruselas","brüssel","brussels","brutal","bruxelles","bugged","bugger","buggering","bukkake","bulgaria","bulimia","bulle","bullshit","bullying","bumble fuck","bumsen","bumslokal","burgas","burn","busen","butt","butt plug","buttfucka","buttfucker","cabu","caca","callgirl","camel toe","car seat","carbon monoxide","carnage","carpet muncher","cartoonists","catholic","charb","charlie hebdo","chasse à lhomme","cheadle","cherif hebdo","cherif kouachi","chidlom district","childline","chinc","chink","choad","chode","choking","cholera","christain","christi shepherd","christianne shepherd","christopher tehrani","christos louvros","citizens informer","clit","clit face","clit fuck","clitoris","club 18-30","cluster fuck","cocain","cocaine","cock","cock ass","cock bite","cock burger","cock face","cock fucker","cock head","cock jockey","cock knoker","cock master","cock mongler","cock mongruel","cock monkey","cock muncher","cock nose","cock nugget","cock shit","cock smith","cock smoker","cock sucker","cockring","cocks","cofcc","coit","cokin","cokine","columbine","compensation","condom","condoms","conservative citizens foundation","contamination","coochie","coochy","coon","cooter","copulation","coquine","costa concordia","couille","council of conservative citizens","cracker","crash","crash testing","crimea","crimestoppers","cruise liner sank","cruise ship sank","cul","cum","cum bubble","cum dumpster","cum guzzler","cum jockey","cum slut","cum tart","cuni","cunnie","cunnilingus","cunnillingus","cunt","cunt face","cunt hole","cunt licker","cunt rag","cunt slut","cybersexe","dago","damian grammaticas","damn","dangerous fittings","david hinchliff","dead","death","death row","deaths","decapitate","decapitation","deep throat","deepthroat","defloration","deggo","desnudas","destroy","dewani","dewsbury factory","dick","dick bag","dick beaters","dick face","dick fuck","dick fucker","dick head","dick hole","dick juice","dick milk","dick monger","dick slap","dick sucker","dick wad","dick weasel","dick weed","dick wod","dicks","dieb","diebstahl","died","dike","dildo","dildos","dimitrios xidias","dipshit","disaster","disasters","disease","disruptive passenger","diverted","djihad","dogging","dominatrix","don robert
graham lund","don robert","doochbag","dookie","douche","douche bag","douche waffle","dragged","drecksack","drecksau","drogen","drowned","drug abuse","drug addict","drug addiction","drugged","drugs","drummer lee rigby","drunk","drunk female","drunken","dum shit","dumass","dumb ass","dumb fuck","dumb shit","dyke","e coli","eagles of death metal","earthquake","ebola","echangisme","échangiste","ecstasy","edl","edward snowden","egyptair","eier","eierlutscher","einbrecher","einbruch","einen runterholen","eingebrochen","eingestuerzt","eingestürzt","einsturz","embraer phenom 300","emergency","emergency landing","enculé","enflure","enfoiré","english defence league","entführen","entführung","entköpfung","erawan shrine","erdrunken","érection","eric van der sypt","erogene","erotic","erotica","erotika","érotique","erschlagen","escort service","etchells road","ethan mcken","execution","executions","exhibitionist","exhibitionists","explosion","extrem","extremer","extremisim","extremism","extremist","extremiste","extremists","facesitting","fag","fag bag","fag fucker","fag tard","faggit","faggot","faggot cock","fanny","fantasme","fat ass","fatwa","faules miststueck","felation","fellatio","fellation","feltch","female cabin crew","femdom","ferenc illes","fesseln","fétichisme","fetichiste","fetisch","fetish","fick dich","fick mich","ficken","fils2pute","filsdepute","financial ombudsman service","fist","fisted","fisting","fkk","flagellation","flamer","flight crash","flight crashed","flight delay","flight disappeared","flight missing","flight vanished","flood","floods","flugabsturz","flugzeugkatastrophe","flugzeugunglück","flugzeugunglueck","food poisoning","food standards","foot fetish","foreign tourists","forniquer","fotze","fouf","foufoune","foutre","france plane crash","fraud","free sex","french factory","frigide","fritzl","fuad basya","fucck","fuck","fuck ass","fuck bag","fuck boy","fuck brain","fuck butt","fuck face","fuck head","fuck hole","fuck in","fuck me","fuck nut","fuck nutt","fuck off","fuck stick","fuck tard","fuck up","fuck wad","fuck wit","fuck witt","fuck you","fucked","fucker","fucker sucker","fuckin","fuckin bitch","fucking","fucking bitch","fucks","fudge packer","fuk me","fuk you","fukin bitch","fullisade","fummeln","fuuck","gadaffi","gaddafi","gaggers","gang bang","gangbang","garce","gary glitter","gate j","gatwick","gay","gay ass","gay bob","gay bois","gay boys","gay fuckist","gay lord","gay tard","gay wad","gaydo gay fuck","gaza","gbh","geil","geiler bock","geiles luder","geköpft","geneva convention","genital warts","genocide","georgios chrysikopoulos","germanwings","gerontophobe","geschlechtsverkehr","gewehr","giese","gilf","gloryhole","gmp","god damn","god damnit","godemichet","gooch","gook","gordon lee baum","gorgeprofonde","gouine","gouvia","gringo","group sex","guantanamo bay","gun","hack","hacken","hacking","haltern","hamas","handjob","hängetitte","hard core","hard on","hardcore","hardcore sex","harriet green","head impact","hebdo","heeb","heisse","heiβ","heiβe","hell","hentai","hercules","heroin","high risk","hijack","hinunterholen","hit and run","hiv","hiv aids","hoe","holocaust","homicide","homo","homo dumbshit","homofuerst","homophobe","homophobia","homophobic","homophobique","hong kong protest","honkey","honte","hooker","hornochse","horny","hospital","hostage","hotel apologised","hotel apology","hotel bellevue","hotel food poisoning","hotel illness","hotel infestation","hotel palm marina","huhrensohn","humping","hungarian slaves","hure","hurenficker","hurengesicht","hurensohn","ian watkins","illness","illuminati","imam sadiq mosque","imperial mahaba","incest","inceste","indonesian plane","infestation","infidel","injured","interrogation","investigators","ira","iraq","isis","islam","islamic state","islamist militants","israel","istanbul","istanbul governors office","jackass","jakarta","jalan thamrin","james bell","james foley","janos orsos","jap","jayapura","jerk off","jew","jewish","jigaboo","jihad","jihadi john","jihadist","jimmy savile","jizz","jo cox","john doe","john lewis car park","joko widodo","jouir","jude","judenvernichtung","julian assange","jungle bunny","junglebunny","junkie","kackbratze","kama sutra","kamasutra","kanone","kantaoui beach","karpathos","katastrophe","keller","ketamine","kfc","kidnap","kieran mitchell","kike","kill","killing","kills 27","kinky","knarre","kobane","kogalymavia","kokain","kollision","kondom","kooch","kootch","köpfen","kouachi","kozee sleep","krankheit","krebs","kunt","kuwait","kyke","la belle equipe","la casa nostra","landslide","landslides","las lagunas","lawsuit","layzee sleep","le carillon","le carillon bar","le petit cambodge","leck mich","les deux alpes","les halles","lesbian","lesbo","lewd acts","lewes crown court","lezzie","libya","life boats","life-show","lifeboats","linkstraeger","linksträger","lisle-dabeau","listeria","lloyd pitchford","lms","lolita","lolitas","lolittas","louis corcyra beach hotel","lude","luder","lufthansa","lyon attack","madeleine mccann","maelbeek","major bob patterson","malaria","malaysia airlines","man decapitated","mange-merde","mangemerde","marc gander","marc-jean ghyssels","masochisme","massacre","massaker","massenvernichtung","masturbateur","masturbation","masturber","mated","mating","max clifford","mccain","mcfagget","mdma","medan","menace","méolans-revel","message for america","mh17","mh370","michael adebolajo","mick","miefen","mieser stricher","mijas golf resort","mile high club","milf","milfs","minge","mirage studios complex","misile","missbrauch","missgeburt","missonarstellung","miststück","miβbrauch","moerder","mohamed abrini","mohammed","mohammed abdeslam","mohammed rafiq","molenbeek","molest","money mail","mord","mörder","mothafucka","mother fucker","mother fuker","motherfucker","motherfucking","ms804","muff","muff diver","mugging","muhammad","munging","murder","murderer","murders","muschi","muschi lecker","muslim","mutterficker","naked","national defence league","naturism","naturist","nazi","ndl","necrophilia","neger","nègre","negro","neil shepherd","netanyahu","newcastle evening chronicle","news of the world","niakoué","nichola bell","nicola gibson","nigga","nigger","niggers","niglet","niquer","no survivors","north korea","north west ambulance service","notfall","nspcc","nuclear","nuclear war","nuclear weapons","nude","nudes","nudist","nudity","nuklear","nuklearwaffen","nut sack","nutsack","nympho","oasch","oben ohne","obese","obesity","obscéne","oksibil","omar ismail mostefai","onanieren","onanisme","operation yew tree","operation yewtree","opfer","opfern","oral sex","orgasme","orgie","orgy","orsch","osama bin laden","oscar pistorius","overdose","p0rn","paederast","paedo","paedo and incest websites","paedophile","paki","panooch","panty","papua","paris attacks","paris shooting","passengers killed","peaches geldof","pecker","peckerhead","pederast","pederasty","pédophile","pédophilie","peep shows","peep-show","penis","penis fucker","penis puffer","pent house","persian kitty","perversions","petros stoyiannos","pevers","peverser","pflaume","phallus","phone hacking","piracy","piss","piss flaps","pissed","pissed off","pisser","pissing","pissnelke","pistole","pkk kurdish militants","plague","plane crash","plane disappeared","plane missing","plane vanished","play boy","play mates","playboy","plunges+balcony","poisoned","poisoning","poisons","pole smoker","polizei","polizeieinsatz","pollock","poon","poonani","poonany","poontang","porch monkey","porchmonkey","porn","porn star","porn stars","porn tube","porno","porno star","pornographic putin","pornographie","pornography","pornos","pornoszene","porteouverte","pr0n","prawit wongsuwong","prayuth chan-ocha","prépuce","prick","prise dotages forcenés","procreate","procreated","procreates","procreating","prophet mohammed","prostituée","prostitute","pubien","pubis","punanny","punta","pussies","pussy","pussy licking","putain","pute","puto","queef","queer","queer bait","queer hole","queutard","racism","racisme","racist","radical preacher","rakete","rampage","rant","rape","raped","raper","rapes","raping","rapist","rassismus","rassist","rassistisch","ratchaprasong","rebel","recep akdag","recep tayyip erdogan","red tube","redtube","renob","rettung","rettungseinsatz","richard carson","rim","rim job","rim jobs","rimjob","riot","road rage","robbery","robert shepherd","rock concert","roger alan giese","roger giese","rolf harris","rotlicht","royal kenz hotel","rue de charonne","rue de la station","runterholen","ruski","russian investigators","ruth beatson","sack","sadist","sado","sadomaso","sadomasochisme","saeufer","saint-quentin-fallavier","salah abdeslam","salaud","salmonella","salopard","salope","saloperie","sand nigger","sandnigger","sandor sziros","sarinah","sau","saufen","säufer","saunauntersitzer","scam","scandal","scandals","scat","scatophile","scharf","scharfe","scheide","scheise","scheisse","scheissegal","scheissen","scheisser","scheissfreundlich","scheissgesicht","scheisskerl","scheisskopf","scheiβe","schiesserei","schieβerei","schlampe","schlong","schnepfe","schockiert","schrecklich","schrullig","schuetze","schütze","schwanz","schwanz lecker","schwanz lutschen","schwanzlutscher","schweinepriest","schwuchtel","schwul","schwuler","scrote","seedy","segregationist","segregationist citizens councils of america","seifeddine rezgui","selbstbefriedigung","sentani","sentani airport","september 11","serials","serialz","severely injured","sex","sex chat","sex club","sex dvd","sex shop","sex shops","sex sites","sex toys","sex video","sex videos","sex-shop","sexaktiv","sexism","sexismus","sexist","sexshop","sexstellung","sexual","sexualität","sexually transmitted","sexuellementtransmissible","sexvideo","sexxx","sexy","sgdf","shane virmani","sharon wood","she male","shelling","shia","shishkoff","shit","shit ass","shit bag","shit bagger","shit brains","shit breath","shit cunt","shit dick","shit face","shit faced","shit head","shit hole","shit house","shit spitter","shit stain","shitter","shittiest","shitting","shitty","shiz","shiznit","shooting","sickness","siddik turgan","sinai crash","sinai desert","sinai peninsula","sinking","sitzpinkler","skank","skeet","skull fuck","slater and gordon","slaves","sleaze blunder","slut","slutbag","sluts","smeg","smut","snatch","snuff","sodomie","sodomisé","sodomisée","sodomist","sodomists","sodomite","sodomites","sodomitic","sodomitical","sodomy","softcore","soumission","sousse","sousse beach","sperme","spermizid","spic","spick","spital","splooge","st marys sexual assault referral centre","stade de france","ständer","starb","starben","sterben","sti","stirbt","stockport","stomach pump","strap on","strapon","strich","stricherin","strichjunge","strichmädchen","strippen","stripping","striptease","suicidal","suicide","suicide bomber","sultanahmet","sunny beach resort","supremacists","suruc","suruçmassacre","suruçtakatliamva","swift air","swinger","swinger club","swingers","syria","taliban","talmud","tard","tease","teensex","terror","terror attack","terrorism","terrorisme","terrorist","terroriste","terrorists","testicle","testicule","teub","teuch","teucha","thamrin","the federation of socialist youth associations","the political cesspool","theft","thomas cook compensation","threesomes","thundercunt","tignous","timothy staines","tit","tit anime","tit fuck","titfuck","tits","titte","titten","titties","tittyfuck","tod","todesopfer","todesschuetze","topless","torrent","torture","tot","tote","tragedy","train crash","tranny","transasia airways","transgender","transport research laboratory","transsexual","traque","trauern","trigana","trigana air","truckahev","trümmer","tsunami","tunis","tunisia","tunisia attack","tunisian resort town","tussi","twat","twat waffle","twatlips","twats","twink","überdosis","überfall","überfallen","ueberfall","ueberfallen","ukraine","uncle fucker","underage girls","unfall","unglück","unglueck","untergegangen","upskirt","upskirts","vagin","vagina","verdächtige","verdammt","verfickt","vergammelt","vergammeltes","verge","vergewaltiger","vergewaltigte","vergewaltigung","verhurt","verhurtes","vermisste","vernichtung","verpiss dich","verseuchen","verseuchung","versunken","vibrator","victims","viol","vjayjay","voegeln","vögeln","volcanic eruption","völkermord","von hinten","vorwärtseinparker","voyer web","voyeurism","voyeurisme","voyeurweb","vulve","waffen","wank","wanking","war","wares","warez","warmduscher","watchdog","wetback","white citizens council","white nationalism","white separatism","whore","whorebag","whoreface","wichser","wilmslow road","wilmslow-handforth","wixer","wolinski","woolwich","wop","wythenshawe hospital","x rated","xrated","xxx","xxxrated","yacine sali","youpin","yvonne munro","zaventem","zerstoerung","zerstörung","zeub","zgueg","zguègue","zicke","zoe pitchford","zoosex","zusammensturz"];
var message = "//data49.adlooxtracking.com/ads/ic2.php?fw=1&iframe=1&version=2&client=infectiousmedia_dbm&banniere=ban1infdbm&id_editeur=1_ADLOOX_ID_4454185_ADLOOX_ID_11888089_ADLOOX_ID_1827445_ADLOOX_ID_https%3A%2F%2Ffinalfantasy.wikia.com%2Fwiki%2FWhite_Mage&campagne=infectious_dbm&methode=%3B&fai=SafeFrame+Container&url_referrer=http%3A%2F%2Ffinalfantasy.wikia.com%2Fwiki%2FWhite_Mage%3Ffile%3DFFRK_White_Mage_sprites.png&ads_forceblock=1&log=1&visite_id=55869438757";
getAllNodesContent ( firstNode, contentTab, message );
var adloox_impression=1;