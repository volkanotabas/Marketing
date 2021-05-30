<script>
  
//    _
//   | |
//   | |__  _   _ _ __   ___
//   | '_ \| | | | '_ \ / _ \
//   | | | | |_| | |_) |  __/
//   |_| |_|\__, | .__/ \___|
//           __/ | |
//          |___/|_|

hype = {
	pagedata: {},
	logger: {
		groupOpened: false
	},
	modal: {},
	exitIntent: {},
	create: {},
	hyperootdomain: window.location.host,
	listenedFunctions: {},
	lastListenedEvent: null,
	dataLayerIndex: -1,
	dataLayerEcIndex: -1,
	loggerstarted: false,
	what: Object.prototype.toString,
	asciilogo: "  _                      \n | |                     \n | |__  _   _ _ __   ___ \n | '_ \\| | | | '_ \\ / _ \\\n | | | | |_| | |_) |  __/\n |_| |_|\\__, | .__/ \\___|\n         __/ | |         \n        |___/|_|         "
};

hype.isObjectEmpty = function (obj) {
	for (var prop in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, prop)) {
			return false;
		}
	}
	return true;
};

hype.cleanObjectValues = function (o) {
	var newobj = {};

	for (var k in o) {
		if (o.hasOwnProperty(k)) {

			if (hype.what.call(o[k]) == "[object Object]") {

				if (isObjectEmpty(o[k]) == false) {
					newobj[k] = o[k]
				};

			} else if (hype.what.call(o[k]) == "[object Array]") {

				if (o[k].length !== 0) {
					if (o[k][0] !== "") {
						newobj[k] = o[k]
					}
				}

			} else if (hype.what.call(o[k]) == "[object String]") {
				if (o[k] !== "" && o[k] !== "undefined" && o[k] !== "null") {
					newobj[k] = o[k]
				}
			} else if (hype.what.call(o[k]) == "[object Number]") {
				newobj[k] = o[k]

			} else if (hype.what.call(o[k]) == "[object Boolean]") {
				newobj[k] = o[k]

			}
		}
	}

	return newobj;

};


window.hype.addObjectValue = function (o, n, v) {

	if (hype.what.call(o) == "[object Object]") {

		if (hype.what.call(v) == "[object Object]") {

			if (isObjectEmpty(v) == false) {
				o[n] = v;
			};

		} else if (hype.what.call(v) == "[object Array]") {

			if (v.length !== 0) {
				if (v[0] !== "") {
					o[n] = v;
				}
			}

		} else if (hype.what.call(v) == "[object String]") {
			if (v !== "" && v !== "undefined" && v !== "null" && n !== "") {
				o[n] = v;
			}
		} else if (hype.what.call(v) == "[object Number]") {
			o[n] = v;

		} else if (hype.what.call(v) == "[object Boolean]") {
			o[n] = v;

		} else {

		}

	}

};

window.hype.isDataLayerLoaded = function () {

	if (window.hasOwnProperty("dataLayer") == true) {
		for (var i = 0, len = window.dataLayer.length; i < len; i++) {

			if (window.dataLayer[i].hasOwnProperty("ecommerce") == true) {
				window.hype.dataLayerEcIndex = i;
			};

			if (window.dataLayer[i].hasOwnProperty("arrPort") == true) {
				window.hype.dataLayerIndex = i;
			};

		};
	}

	if (hype.dataLayerIndex !== -1) {
		return true
	} else {
		return false
	}
};

//Datalayerdan veri çekmek için.
//İnd parametresi ile sondan bir önceki iki önceki üç önceki değerler çekilebilir. 0 demek en sonunda değer, 1 demek bir önceki değer, 2 demek iki önceki değer demektir.
window.hype.getDataLayerVariable = function(k,ind) {

	if (ind == null || ind == ""){
		ind = 0;
	}

	var found_values_list = [];

	if (window.hasOwnProperty("dataLayer") == true) {
		for (var i = 0, len = window.dataLayer.length; i < len; i++) {

			if (window.dataLayer[i].hasOwnProperty(k) == true) {
				found_values_list.push(window.dataLayer[i][k]);

			};


		};
	}

	if (found_values_list.length == 0){
		return null
	}else{
		return found_values_list[found_values_list.length-1-ind];
	}


};

//Datalayerdan veri çekmek için
window.hype.getDataLayerIndexByEvent = function (e) {

	var returnedkey = -1;

	if (window.hasOwnProperty("dataLayer") == true) {
		for (var i = 0, len = window.dataLayer.length; i < len; i++) {

			if (window.dataLayer[i].hasOwnProperty("event") == true) {
				if (window.dataLayer[i].event == e) {
					returnedkey = i;
				}

			};
		};
	}

	return returnedkey;
};

// Log fonksiyonlar Başlangıç //
hype.logger.isActive = function () {
	if (Storage) {
		if (localStorage.getItem("hypeLogger") === true) {
			return true;
		} else {
			return false;
		}
	}
};

hype.logger.activate = function () {
	if (Storage) {
		localStorage.setItem("hypeLogger", true);
		if (confirm("Hype logger aktifleştirildi, sayfayı yenileyim mi?")) {
			location.reload();
		}
	}
};

hype.logger.stop = function () {
	if (Storage) {
		localStorage.setItem("hypeLogger", false);
		if (confirm("Hype logger kapatıldı, sayfayı yenileyim mi?")) {
			location.reload();
		}
	}
};

hype.logger.info = function (e) {
	if (localStorage.getItem("hypeLogger") == "true") {
		if (hype.loggerstarted === false) {
			hype.logger.info(hype.asciilogo);
			hype.loggerstarted = true;
		}
		console.info("[HYPE Bilgi]: " + e);
	}
};

hype.logger.warn = function (e) {
	if (localStorage.getItem("hypeLogger") == "true") {
		if (hype.loggerstarted === false) {
			hype.logger.info(hype.asciilogo);
			hype.loggerstarted = true;
		}
		console.warn("[HYPE Uyarı]: " + e);
	}

};

hype.logger.group = function () {
	if (localStorage.getItem("hypeLogger") == "true") {
		if (hype.logger.groupOpened === false) {
			console.group();
			hype.logger.groupOpened = true;
		}

	}
};

hype.logger.groupEnd = function () {
	if (localStorage.getItem("hypeLogger") == "true") {
		console.groupEnd();
		hype.logger.groupOpened = false;
	}
};
// Log fonksiyonlar Bitiş //

window.hype.checkifloaded = function (ifade, fonk, cyclelimit, maxwaitlimit, slot) {

	var loaded = false;

	if (typeof (window.hype.checkerSlot) == "undefined") {
		window.hype.checkerSlot = [];
	};

	var slotarray = window.hype.checkerSlot;

	if (typeof (slot) !== "number") {
		slot = slotarray.length;
		slotarray[slotarray.length] = 0;
	};

	var cyclebeklemeayari = cyclelimit || 100; //Her kontrolden sonra kaç ms bekleyelim
	var maxbeklemeayari = maxwaitlimit || 50; //Maksimum kaç saniye bekleyelim

	setTimeout(function () {
		if (window.eval(ifade) === false && slotarray[slot] < (maxbeklemeayari * 1000 / cyclebeklemeayari) && loaded === false) {
			hype.logger.info(ifade + " ifadesi true dönmedi, " + cyclelimit + "ms bekliyorum.");
			slotarray[slot]++;
			window.hype.checkifloaded(ifade, fonk, cyclebeklemeayari, maxbeklemeayari, slot);

		} else {
			if (slotarray[slot] >= (maxbeklemeayari * 1000 / cyclebeklemeayari)) {
				hype.logger.warn("süre doldu ne yazik ki bulamadik");

			} else {

				hype.logger.info("ifade " + ((slotarray[slot] + 1) * 50 / 1000) + " saniyede bulundu, fonksiyonu calistiriyorum");
				loaded = true;
				fonk();

			}
		}
	}, cyclebeklemeayari);
};

// silenebilir
hype.treatAsUTC = function (date) {
	var result = new Date(date);
	result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
	return result;
};

window.hype.dateIsBetween = function (theDate, firstDate, secondDate) {

	if (typeof (theDate) == "undefined") {
		return false;
	}

	var pattern = /(\d{2})\-(\d{2})-(\d{4})/;

	if (typeof firstDate.getMonth === 'function') {
		var firstDate2 = firstDate;
	} else {
		var firstDate2 = new Date(firstDate.replace(pattern, '$3-$2-$1'));
	}

	if (typeof secondDate.getMonth === 'function') {
		var secondDate2 = secondDate;
	} else {
		var secondDate2 = new Date(secondDate.replace(pattern, '$3-$2-$1'));
	}

	if (typeof theDate.getMonth === 'function') {
		var theDate2 = secondDate;
	} else {
		var theDate2 = new Date(theDate.replace(pattern, '$3-$2-$1'));
	}

	if ((theDate2 < secondDate2 && theDate2 > firstDate2) || (theDate2.getTime() == firstDate2.getTime() && firstDate2.getTime() == secondDate2.getTime())) {
		return true;
	} else {
		return false;
	}

};

hype.setCookie = function (cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	if (exdays == 0) {
		document.cookie = cname + "=" + cvalue + "; " + "domain=." + hype.hyperootdomain +
			";path=/";
	} else {
		document.cookie = cname + "=" + cvalue + "; " + expires + "; domain=." +
			hype.hyperootdomain + ";path=/";
	}
}

hype.getCookie = function (cname) {
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

hype.checkCookie = function (cookiename) {
	if (hype.getCookie(cookiename) != "") {
		return true;
	} else {
		return false;
	};
}

hype.removeCookie = function (cname) {
	var expires = "expires=Thu, 01 Jan 1970 00:00:00 UTC;";
	document.cookie = cname + "=; " + expires + "domain=." + hype.hyperootdomain + ";path=/";
	document.cookie = cname + "=; " + expires + "path=/";
	document.cookie = cname + "=; " + expires;
}

hype.toFixed = function (value, precision) {
	var precision = precision || 0,
		power = Math.pow(10, precision),
		absValue = Math.abs(Math.round(value * power)),
		result = (value < 0 ? '-' : '') + String(Math.floor(absValue / power));

	if (precision > 0) {
		var fraction = String(absValue % power),
			padding = new Array(Math.max(precision - fraction.length, 0) + 1).join(
				'0');
		result += '.' + padding + fraction;
	}
	return result;
};

window.hype.isInCampSaleDate = function (tarih1, tarih2) {

	var today_ms = new Date();
	var date1_ms = new Date(tarih1);
	date1_ms.setHours(0);
	date1_ms.setMinutes(1)
	var date2_ms = new Date(tarih2);
	date2_ms.setHours(23);
	date2_ms.setMinutes(59)

	if ((date2_ms > today_ms && date1_ms < today_ms) || (today_ms.toDateString() == date1_ms.toDateString() && date1_ms.toDateString() == date2_ms.toDateString())) {
		return true;
	} else {
		return false;
	};

};

window.hype.isInCampSaleDate2 = function (tarih1) {

	var date1 = new Date();
	var pattern = /(\d{2})\-(\d{2})-(\d{4})/;

	if (typeof tarih1.getMonth === 'function') {
		var date2 = tarih1;
	} else {
		var date2 = new Date(tarih1.replace(pattern, '$3-$2-$1'));
	};

	var timeDiff = Math.abs(date2.getTime() - date1.getTime());
	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

	if (10 < diffDays) {
		return true;
		// hype.logger.info(true);
	} else {
		return false;
		// hype.logger.info(false);
	}
};

//Bu tarih şu 2 tarihin arasında mı?
window.hype.dateIsBetween = function (theDate, firstDate, secondDate) {

	if (typeof (theDate) == "undefined") {
		return false;
	}

	var pattern = /(\d{2})\-(\d{2})-(\d{4})/;

	if (typeof firstDate.getMonth === 'function') {
		var firstDate2 = firstDate;
	} else {
		var firstDate2 = new Date(firstDate.replace(pattern, '$3-$2-$1'));
	}

	if (typeof secondDate.getMonth === 'function') {
		var secondDate2 = secondDate;
	} else {
		var secondDate2 = new Date(secondDate.replace(pattern, '$3-$2-$1'));
	}

	if (typeof theDate.getMonth === 'function') {
		var theDate2 = secondDate;
	} else {
		var theDate2 = new Date(theDate.replace(pattern, '$3-$2-$1'));
	}
	if ((theDate2 < secondDate2 && theDate2 > firstDate2) || (theDate2.getTime() == firstDate2.getTime() && firstDate2.getTime() == secondDate2.getTime())) {
		return true;
	} else {
		return false;
	}

};

hype.titleChange = function (options) {
	titleName = options.titleName || "HYPE";
	// favicon = options.favicon || "";
	session = options.session || 0;
	var oldTitle = window.document.title;
	if (session != 0) {
		if (titleName != "") {
			window.document.title = titleName;
		}
		window.fakeCookie = 0;
		window.onbeforeunload = function (e) {
			localStorage.removeItem("sessionTimeout");
		};
		if (localStorage.getItem("sessionTimeout")) {
			var oldTime = localStorage.getItem("sessionTimeout");
			var newArray = oldTime.split(":");
			var newTime = newArray[0].trim() + "." + newArray[1].trim();
			newTime = parseFloat(newTime);
			var countdown = newTime * 60 * 1000;
		} else {
			var countdown = session * 60 * 1000;
		}
		var timerId = setInterval(function () {
			countdown -= 1000;
			var min = Math.floor(countdown / (60 * 1000));
			//var sec = Math.floor(countdown - (min * 60 * 1000));  // wrong
			var sec = Math.floor((countdown - (min * 60 * 1000)) / 1000); //correct
			localStorage.setItem("sessionTimeout", min + " : " + sec);

			if (countdown <= 1) {
				clearInterval(timerId);
			} else {
				window.document.title = localStorage.getItem("sessionTimeout") + " - " + titleName;
				if (min == 0 && sec == 1) {
					window.document.title = window.document.title;
				}
			}
		}, 1000);
	} else {
		if (titleName != "") {
			window.document.title = titleName;
		}
	}
	if (favicon != "") {
		window.favico = document.createElement("link");
		window.document.head.appendChild(favico);
		window.favico.outerHTML = '<link rel="icon" id="favicon" href="' + favicon + '">';
	}
}

//Modal yaratma
hype.modal = function (options) {
	if (options == undefined) {
		options = {}
	}
	var className = options.className || "",
		idName = options.idName || "",
		width = options.width || "50vw",
		height = options.height || "500px",
		left = options.left || "calc(50% - 25vw)",
		right = options.right || "auto",
		top = options.top || "calc(50% - 250px)",
		bottom = options.bottom || "auto",
		background = options.background || "#fff",
		padding = options.padding || "25px",
		position = options.position || "fixed",
		display = options.display || "block",
		closeImg = options.closeImg || "https://hypeistanbul.com/img/close.jpg",
		html = options.html || "";

	var hypeStyle = '<style class="hypeModalStyle">';
	hypeStyle += '.hypeModal {width:' + width + '; height:' + height + '; left:' + left + '; right:' + right + '; top:' + top + '; bottom:' + bottom + '; background:' + background + '; padding:' + padding + '; position:' + position + '; z-index: 9999; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; display:' + display + ';} .hypeModalBlocker {width:100%; height:100vh; position:' + position + '; left:0; top:0; z-index: 9990; background:rgba(0,0,0,0.7);  display:' + display + ';} .hypeClose {width:40px; height:40px; position:absolute; right:-20px; top:-20px; background:url(' + closeImg + ') no-repeat center center; background-size:100%;}';
	hypeStyle += '</style>';
	document.head.insertAdjacentHTML("beforeend", hypeStyle);
	// beforebegin <div>afterbegin - foo - beforeend</div> afterend

	var hypeHtml = '<div class="hypeModal ' + className + '" id="' + idName + '"> <a href="javascript:;" class="hypeClose"></a> <div class="hypeModalContent"> ' + html + ' </div>  </div>';
	document.querySelector("body").insertAdjacentHTML("beforeend", hypeHtml);

	if (document.querySelectorAll(".hypeModalBlocker").length == 0) {
		var hypeHtml = '<div class="hypeModalBlocker"> </div>';
		document.querySelector("body").insertAdjacentHTML("beforeend", hypeHtml);
	} else {
		document.querySelector(".hypeModalBlocker").style.display = "block";
	}

	if (document.querySelectorAll(".hypeClose").length !== 0) {
		for (var i = 0; i < document.querySelectorAll(".hypeClose").length; i++) {
			document.querySelectorAll(".hypeClose")[i].addEventListener("click", function () {
				hype.modal.hide();
			});
		}
	}

	if (document.querySelectorAll(".hypeModalBlocker").length !== 0) {
		for (var i = 0; i < document.querySelectorAll(".hypeModalBlocker").length; i++) {
			document.querySelectorAll(".hypeModalBlocker")[i].addEventListener("click", function () {
				hype.modal.hide();
			});
		}
	}
};

// modal kapatma
hype.modal.hide = function (selectorName) {
	var hypeSelector = selectorName || ".hypeModal";
	var hypeLength = document.querySelectorAll(hypeSelector).length;
	if (document.querySelectorAll(".hypeModalBlocker").length !== 0) {
		document.querySelector(".hypeModalBlocker").style.display = "none";
	}
	for (var i = 0; i < hypeLength; i++) {
		if (document.querySelectorAll(hypeSelector).length !== 0) {
			document.querySelectorAll(hypeSelector)[i].style.display = "none";
		}
	}
}

// modal açma
hype.modal.show = function (selectorName) {
	var hypeSelector = selectorName || ".hypeModal";
	var hypeLength = document.querySelectorAll(hypeSelector).length;
	if (document.querySelectorAll(".hypeModalBlocker").length !== 0) {
		document.querySelector(".hypeModalBlocker").style.display = "block";
	}
	for (var i = 0; i < hypeLength; i++) {
		if (document.querySelectorAll(hypeSelector).length !== 0) {
			document.querySelectorAll(hypeSelector)[i].style.display = "block";
		}
	}
}

hype.sessionStorageContain = function (query) {
  var i, results = [];
  for (i in sessionStorage) {
    if (sessionStorage.hasOwnProperty(i)) {
      if (i.match(query) || (!query && typeof i === 'string')) {
        value = JSON.parse(sessionStorage.getItem(i));
        results.push({key:i,val:value});
      }
    }
  }
  return results;
}

hype.localStorageContain = function (query) {
  var i, results = [];
  for (i in localStorage) {
    if (localStorage.hasOwnProperty(i)) {
      if (i.match(query) || (!query && typeof i === 'string')) {
        value = JSON.parse(localStorage.getItem(i));
        results.push({key:i,val:value});
      }
    }
  }
  return results;
}


// exit intent
hype.exitIntent = function (options, func) {
	if (options == undefined) {
		options = {}
	}
	var cookie = options.cookie || "1"; // default cookie atar // 1 cookie var demek, 0 cookie yok demek

	if (typeof func !== "function") {
		var func = function () {
			hype.logger.warn("Herhangi bir fonksiyon yazılması lazım!");
		}
	} else {
		var func = func;
	}

	document.addEventListener("mouseleave", function (e) {
		if (e.clientY < 0) {
			if (cookie == "1") {
				if (hype.checkCookie("hype-exit") !== true) {
					hype.setCookie("hype-exit", true);
					cookieStatus = false;
					func();
				}
			} else {
				func();
			}
		}
	}, false);
}


//
// hype.tab = function(options) {
// 	if (options == undefined) {
// 		options = {}
// 	}
// 	var selectorList = options.selectorList || "";
// 	var selectorContent = options.selectorContent || "";
// 	var activeIndex = options.activeIndex || "0";
// 	//
// 	var hypeStyle = '<style id="hypeTabsEffect">';
// 	hypeStyle += '.hypeTabContent {display: none; height: 0; opacity: 0; overflow: hidden; transition: height 350ms ease-in-out;} .hypeTabContent.hypeFadeIn {display: block; height: auto; opacity: 1;}';
// 	hypeStyle += '</style>';
// 	document.head.insertAdjacentHTML("beforeend",hypeStyle);
// 	// beforebegin <div>afterbegin - foo - beforeend</div> afterend
// 	var checks = document.querySelectorAll(".tab-links > li");
// 	for (var i = 0; i < checks.length; i++) {
// 		document.querySelectorAll(".tab-links > li")[i].classList.add("hypeTabList--"+i);
// 		document.querySelector(".hypeTabList--"+i).addEventListener("click", function() {
// 			hype.logger.info("1");
// 			document.querySelectorAll(".tab")[0].classList.add("hypeFadeIn");
// 			// document.querySelectorAll(".tab")[0].classList.add("hypeTabContent");
// 		});
// 	}
// }

// window.hype = function(selector) {
//     var selectorType = 'querySelectorAll';
//     if (selector.indexOf('#') === 0) {
//         selectorType = 'getElementById';
//         selector = selector.substr(1, selector.length);
//     }
//     return document[selectorType](selector);
// };

hype.inputFilter = function(textbox, inputFilter, hvalue) {
	if (inputFilter == "number") {
		inputFilter = function(value) { return /^\d*$/.test(value)};
	}else if (inputFilter == "text") {
		inputFilter = function(value) {return /^[a-z]*$/i.test(value)};
	}else if (inputFilter == "limit") {
		inputFilter = function(value) { return /^\d*$/.test(value) && (value === "" || parseInt(value) <= hvalue);};
	}
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      }
    });
  });
}


hype.insertAfter = function (el, referenceNode) {
	referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

hype.insertBefore = function (el, referenceNode) {
	referenceNode.parentNode.insertBefore(el, referenceNode);
}

// example
// append
hype.append = function (options) {
	if (options == undefined) {
		options = {}
	}
	var selectorName = options.selectorName || "body",
		position = options.position || "beforeend";
	html = options.html || "";
	document.querySelector(selectorName).insertAdjacentHTML(position, html);
	// beforebegin <div>afterbegin - foo - beforeend</div> afterend
}


hype.abtest = function (cookiename, testname, testnumber, fonk) {
	if (hype.getCookie(cookiename) == 0) {
		dataLayer.push({
			'event': 'GAEvent',
			'eventCategory': 'Testing',
			'eventAction': testname,
			'eventLabel': 'Test ' + testnumber + ': Original'
		});

	} else {
		dataLayer.push({
			'event': 'GAEvent',
			'eventCategory': 'Testing',
			'eventAction': testname,
			'eventLabel': 'Test ' + testnumber + ': Variation 1'
		});
		fonk();
	}
};

// device kontrolü
hype.isMobile = function () {
	var isMobile = false; //initiate as false
	// device detection
	if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
		/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
		return isMobile = true;
	} else {
		return isMobile = false;

	}
}

// click function
hype.click = function (selector, func) {
	document.querySelectorAll(selector).forEach(function (element) {
		element.addEventListener("click", func);
	});
}

// focus function
hype.focus = function (selector, func) {
	document.querySelectorAll(selector).forEach(function (element) {
		element.addEventListener("focus", func);
	});
}

// blur function
hype.blur = function (selector, func) {
	document.querySelectorAll(selector).forEach(function (element) {
		element.addEventListener("blur", func);
	});
}

// change function
hype.change = function (selector, func) {
	document.querySelectorAll(selector).forEach(function (element) {
		element.addEventListener("change", func);
	});
}

// keyup function
hype.keyup = function (selector, func) {
	document.querySelectorAll(selector).forEach(function (element) {
		element.addEventListener("keyup", func);
	});
}

// keypress function
hype.keypress = function (selector, func) {
	document.querySelectorAll(selector).forEach(function (element) {
		element.addEventListener("keypress", func);
	});
}
// keydown function
hype.keydown = function (selector, func) {
	document.querySelectorAll(selector).forEach(function (element) {
		element.addEventListener("keydown", func);
	});
}
// show function
hype.show = function (selector) {
	document.querySelectorAll(selector).forEach(function (element) {
		element.style.display = "block";
	});
}
// addclass function
hype.addclass = function (selector, className) {
	document.querySelectorAll(selector).forEach(function (element) {
		element.classList.add(className);
	});
}
// removeclass function
hype.removeclass = function (selector, className) {
	document.querySelectorAll(selector).forEach(function (element) {
		if (element.classList.contains(className)) {
			element.classList.remove(className);
		}
	});
}
// hide function
hype.hide = function (selector) {
	document.querySelectorAll(selector).forEach(function (element) {
		element.style.display = "none";
	});
}
// show function
hype.show = function (selector) {
	document.querySelectorAll(selector).forEach(function (element) {
		if (element.style.display == "none") {
			element.style.display = "";
		}
	});
}

hype.whichDevice = function() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

// getAttribute function
//hype.getattribute(".carousel-item.carousel-active","data-id")
hype.getattribute = function (selector, attr) {
	var element = document.querySelector(selector);
	element.getAttribute(attr);
}
// getAttribute function
//hype.getattribute(".carousel-item.carousel-active","data-id")
hype.setattribute = function (selector, attr, value) {
	var element = document.querySelector(selector);
	element.setAttribute(attr, value);
}
// parent function
//hype.parent(".carousel-item.carousel-active")
hype.parent = function (selector) {
	var element = document.querySelector(selector);
	return element.parentNode;
}
// selectAll function
//hype.selectAll(".div");
hype.selectAll = function (selector) {
	return document.querySelectorAll(selector);
}
// select function
hype.select = function (selector) {
	return document.querySelector(selector);
}
// screenwidth function
hype.screenwidth = function () {
	var w = window,
		d = document,
		e = d.documentElement,
		g = d.getElementsByTagName('body')[0],
		x = w.innerWidth || e.clientWidth || g.clientWidth,
		y = w.innerHeight || e.clientHeight || g.clientHeight;
	return x;
}
// ajaxget function
hype.ajaxget = function (url, func) {

	var hypexhttp = new XMLHttpRequest();

	hypexhttp.open("GET", url, true);
	hypexhttp.send();

	hypexhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {

			func(this.responseText);

		}

	};

}
// ajaxpost function
hype.ajaxpost = function (url, body, type, func) {

	if (typeof (type) == "function") {
		func = type;
		type = "url";
	}

	var hypexhttp = new XMLHttpRequest();

	hypexhttp.open("POST", url, true);

	if (type == "url" || type == "URL") {
		hypexhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	} else if (type == "json" || type == "JSON") {
		hypexhttp.setRequestHeader("Content-type", "application/json");
	}

	hypexhttp.send(body);

	hypexhttp.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {

			func(this.responseText);

		}

	};

}
// encode64 function
hype.encode64=function (string) {
	 return btoa(string);
}
// decode64 function
hype.decode64=function (key) {
	return atob(key);
}
//getUrlParameter - Bu fonksiyon parametreli bir sayfada çalıştırılmalıdır.
hype.getUrlParameter = function(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

hype.phoneMask = function(hypeSelector) {
  document.querySelector(hypeSelector).onkeyup = function(e) {
    if (e.keyCode == 37 || e.keyCode == 40 || e.keyCode == 39 || e.keyCode == 38) {

    } else {
      var hypeText = document.querySelector(hypeSelector).value;
      if (document.querySelector(hypeSelector).selectionStart == 0 || document.querySelector(hypeSelector).selectionStart == 1) {
        var val = document.querySelector(hypeSelector).value;
        var reg = /^0|1|2|3|4|6|7|8|9/gi;
        if (val.match(reg)) {
          document.querySelector(hypeSelector).value = val.replace(reg, '');
        }
      }
      if (hypeText.indexOf("05") == -1) {
        hypeText = "05";
        document.querySelector(hypeSelector).value = hypeText;
      }
      if (e.keyCode == 8) {
        if (hypeText.length < 2) {
          document.querySelector(hypeSelector).value = "05";
        }
      }
    }
  };
  if (typeof hype.inputFilter == "function") {
    hype.inputFilter(document.querySelector(hypeSelector), "number");
  }
}

//appendchild function
hype.appendChild=function(createElementSelector,createChildNodeSelector,positionSelector) {
	var node = document.createElement(createElementSelector);
	var childnode = document.createTextNode(createChildNodeSelector);
	node.appendChild(childnode);
	document.querySelector(positionSelector).appendChild(node);
  }
hype.addListenFuncList = function (e, c) {

	hype.listenedFunctions = hype.listenedFunctions || {};
	if (hype.listenedFunctions.hasOwnProperty(e) == true) {
		hype.listenedFunctions[e].push(c);
	} else {
		hype.listenedFunctions[e] = [c];
	}

};

window.hype.executeListenedEvent = function (e) {

	if (e == "" || e == "undefined" || e == "null") {
		return
	}

	window.hj = window.hj || function () {
		(hj.q = hj.q || []).push(arguments)
	};
	hj('trigger', e);

	window.hype.logger.info("dataLayera " + e + " eventi pushlandı.");

	if (e !== "" && e !== "undefined" && e !== "null") {

		if (window.hype.listenedFunctions.hasOwnProperty(e) == true) {
			for (var i = 0; i < hype.listenedFunctions[e].length; i++) {
				hype.listenedFunctions[e][i](window.dataLayer[hype.getDataLayerIndexByEvent(e)]);
			}
			window.hype.logger.info(e + " eventine ait fonksiyon bulundu ve çağrıldı.");
		}
	}
	if (document.querySelector("#hypedllistener") !== null) {
		document.querySelector("#hypedllistener").remove();
	}
}

window.hype.isThisFlightTransfer = function () {

	if (hype.getDataLayerIndexByEvent("ecAddToCart") !== -1) {

		var e = dataLayer[hype.getDataLayerIndexByEvent("ecAddToCart")];

		if (e.eventLabel == "Ticket") {
			if (e.ecommerce.hasOwnProperty("add")) {
				if (e.ecommerce.add.products[0].hasOwnProperty("dimension14")) {
					if (e.ecommerce.add.products[0].dimension14 == "True") {
						return true
					} else {
						return false
					}
				}
			}
		}

	}

}


//sendAnalyticsData("Video","Play","Hero Video");
window.hype.sendAnalyticsData = function (c, a, l) {

	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({
		"event": "GAEvent",
		"eventCategory": c,
		"eventAction": a,
		"eventLabel": l
	});

}

hype.isDataLayerLoaded();  
   
</script>
