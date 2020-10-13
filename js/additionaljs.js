$(document).ready(function(){
  $("#flip").click(function(){
    $("#flip .fa-chevron-down").toggleClass("rotate180");
	$("#flipped").stop().slideToggle(500);
  });
});

function expand(id) {
  var container = document.getElementById(id);
  if (container.style.display === "none") {
    container.style.display = "inline-block";
  } else {
    container.style.display = "none";
  }
}

function switchDisp(id1, id2) {
  var container1 = document.getElementById(id1);
  var container2 = document.getElementById(id2);
  container1.style.display = "inline-block";
  container2.style.display = "none";
}

function switchTabs(id1,id2,id3,id4) {
  if (id3==undefined && id4==undefined) {
	var active = document.getElementById(id1);
	var inactive = document.getElementById(id2);
	active.className = "languageTab languageActive";
	inactive.className = "languageTab";
  }
  else {
	var active = document.getElementById(id1);
	var inactive2 = document.getElementById(id2);
	var inactive3 = document.getElementById(id3);
	var inactive4 = document.getElementById(id4);
	active.className = "languageTab languageActive";
	inactive2.className = "languageTab";
	inactive3.className = "languageTab"; 
	inactive4.className = "languageTab"; 
  }	
}

function minus(id) {
  var div = document.getElementById(id);
  var className = div.getAttribute("class");
  if(className=="fa fa-plus-square-o") {
    div.className = "fa fa-minus-square-o";
  }
  else{
    div.className = "fa fa-plus-square-o";
  }
}

function expandAll(idArray) {
	for (var i = 0; i < idArray.length;i++) {
		var container = document.getElementById(idArray[i])
		if (container.style.display === "none") {
		container.style.display = "inline-block";
	    } else {
		  container.style.display = "inline-block";
		}
	}
}

function collapseAll(idArray) {
	for (var i = 0; i < idArray.length;i++) {
		var container = document.getElementById(idArray[i])
		if (container.style.display !== "none") {
		container.style.display = "none";
	    } else {
		  container.style.display = "none";
		}
	}
}

function minusAll(plusArray) {
	for (var i = 0; i< plusArray.length; i++) {
		var div = document.getElementById(plusArray[i])
		var className = div.getAttribute("class");
		div.className = "fa fa-minus-square-o";
	}
}

function plusAll(plusArray) {
	for (var i = 0; i< plusArray.length; i++) {
		var div = document.getElementById(plusArray[i])
		var className = div.getAttribute("class");
		div.className = "fa fa-plus-square-o";
	}
}

function permHover(idPic, idTxt) {
	var elemPic = document.getElementById(idPic);
	var elemTxt = document.getElementById(idTxt);
	elemPic.classList.toggle("hovered");
	elemTxt.classList.toggle("hovered");
}

function hoverRemove(idArray) {
	for (var i = 0; i< idArray.length; i++) {
	  var elem = document.getElementById(idArray[i]);
	  elem.classList.remove("hovered");
	}
}

(function () {
  changeCodeFontSize(0)
  codeView()
}
)()

function codeView () {
  var pre = document.getElementsByTagName('pre')
  for (var i = 0; i < pre.length; i++) {
    pre[i].innerHTML = '<span class="line-number"></span>' + pre[i].innerHTML + '<span class="cl"></span>'
    var num = pre[i].innerHTML.split(/\n/).length
    for (var j = 0; j < num; j++) {
      var lineNum = pre[i].getElementsByTagName('span')[0]
      lineNum.innerHTML += '<span>' + (j + 1) + '</span>'
    }
  }
}

function changeCodeFontSize (size) {
  if (size == 0) { return }
  var elements = document.getElementsByTagName('pre')
  for (var i = 0; i < elements.length; i++) {
    elements[i].style['font-size'] = size + 'px'
  }
}

function codeCopy (id) {
  var element = document.getElementById(id)
  var text = element.innerHTML
  text.select
  element.focus

  try {
    document.execCommand('copy')
    copyCodeToClipboard(text, id)
  } catch (err) {
    console.error('Something went wrong to copy to clipboard', err)
  }
}

function copyCodeToClipboard (text, id) {
  if (!navigator.clipboard) {
    console.warn('Re-try')
    codeCopy(id)
    return
  }
  navigator.clipboard.writeText(text).then(function () {
    // done
  }, function (err) {
    console.error('Could not copy text: ', err)
  })
}

function showToast() {
  // Get the snackbar DIV
  var x = document.getElementById("toast");
  // Add the "show" class to DIV
  x.className = "show";
  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

document.addEventListener("DOMContentLoaded",() => {
	const rows = document.querySelectorAll("tr[data-href]");
	rows.forEach(row => {
		row.addEventListener("click", () => {
			window.open(row.dataset.href,"_blank");
		});
	});
})

document.addEventListener("DOMContentLoaded",() => {
	const rows = document.querySelectorAll("td[data-href]");
	rows.forEach(row => {
		row.addEventListener("click", () => {
			window.open(row.dataset.href,"_blank");
		});
	});
})

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

$('.dataCat').hover(function() {
    var t = parseInt($(this).index()) + 1;
    $('.dataCat:nth-child(' + t + ')').addClass('highlighted');
},
function() {
    var t = parseInt($(this).index()) + 1;
    $('.dataCat:nth-child(' + t + ')').removeClass('highlighted');
});

$('.dataCont').hover(function() {
    var t = parseInt($(this).index()) + 1;
    $('.dataCont:nth-child(' + t + ')').addClass('highlighted');
},
function() {
    var t = parseInt($(this).index()) + 1;
    $('.dataCont:nth-child(' + t + ')').removeClass('highlighted');
});

var extern = document.getElementsByTagName("link")[0].import;
var absatz = extern.getElementsByTagName("p")[0];
window.addEventListener("load", function() {
  document.getElementsByTagName("html")[0].replaceChild(extern.getElementsByTagName("body")[0], document.getElementsByTagName("body")[0]);
}, false);