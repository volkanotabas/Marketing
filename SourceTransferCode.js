
window.svo = window.svo || {};
window.svo.svorootdomain = "x.com";//Buraya sitenin root domaini yazılmalıdır.

svo.setCookie = function(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	if (exdays == 0) {
		document.cookie = cname + "=" + cvalue + "; " + "domain=." + svo.svorootdomain +
			";path=/";
	} else {
		document.cookie = cname + "=" + cvalue + "; " + expires + "; domain=." +
			svo.svorootdomain + ";path=/";
	}
}

svo.getCookie = function(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

svo.checkCookie = function(cookiename) {
	if (svo.getCookie(cookiename) != "") {
		return true;
	} else {
		return false;
	};
}


//Gel all URL params
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
		vars[key] = value;
	});
	return vars;
}

//Set all Url params to a global variable
window.svo_url_params = getUrlVars();
window.svo_utm_medium_value = null;
window.svo_utm_source_value = null;
window.svo_utm_term_value = null;
window.svo_utm_campaign_value = null;
window.svo_utm_content_value = null;
window.svo_splitted_utm_value = null;
window.svo_referrer = document.referrer;

//Check if there is a utm_medium param in the url
if (window.svo_url_params.hasOwnProperty("utm_medium")) {
	window.svo_utm_medium_value = window.svo_url_params.utm_medium;
}
//Check if there is a utm_source param in the url
if (window.svo_url_params.hasOwnProperty("utm_source")) {
	window.svo_utm_source_value = window.svo_url_params.utm_source;
}

//Check if there is a utm_campaign param in the url
if (window.svo_url_params.hasOwnProperty("utm_campaign")) {
	window.svo_utm_campaign_value = window.svo_url_params.utm_campaign;
}

//Check if there is a utm_term param in the url
if (window.svo_url_params.hasOwnProperty("utm_term")) {
	window.svo_utm_term_value = window.svo_url_params.utm_term;
}

//Check if there is a utm_term param in the url
if (window.svo_url_params.hasOwnProperty("utm_content")) {
	window.svo_utm_content_value = window.svo_url_params.utm_content;
}


//UTM değerine göre kaynak bilgisini mapleme yaptım. Mapping sonucunda eğer utm değeri varsa reklama, geçmiyorsa direct, organic veya referrera yazacak şekilde yönlendirdim.
function svoutmmapping() {
	if (window.svo_utm_medium_value !== null && window.svo_utm_medium_value.length > 0) {
		var svo_utm_url_medium = window.svo_utm_medium_value;
		var svo_utm_url_source = window.svo_utm_source_value;
		var svo_utm_url_campaign = window.svo_utm_campaign_value;
		var svo_utm_url_content = window.svo_utm_content_value;
		var svo_utm_url_term = window.svo_utm_term_value;
		return "utm_source=" + svo_utm_url_source + "&" + "utm_medium=" + svo_utm_url_medium + "&" + "utm_campaign=" + svo_utm_url_campaign + "&" + "utm_content=" +
			svo_utm_url_content + "&" + "utm_term=" + svo_utm_url_term;
	} else if ((svo_referrer == "" || svo_referrer == undefined || svo_referrer == null)) {
		return "utm_source=(direct)" + "&" + "utm_medium=(none)";
	} else {
		return "utm_source=" + window.svo_referrer + "&utm_medium=referral";
	}

}

var svo_org_source_value = null;
var svo_org_source_exist = window.svo.checkCookie("svo_org_source");


//If there is no source cookie, then its landing page. We should set a new source cookie. Or if there is utm_source or tl param in the url we should update the cookie.
if (svo_org_source_exist == false || svo_url_params.hasOwnProperty("utm_source") == true || svo_url_params.hasOwnProperty("utm_medium") == true) {
	svo_org_source_value = svoutmmapping();
	window.svo.setCookie("svo_org_source", svo_org_source_value);
} else {
	svo_org_source_value = window.svo.getCookie("svo_org_source");
};




