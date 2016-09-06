(function() {
	'use strict';
	var elements;
	function polyfillElement(element) {
		var textNode = element.children[0];
		while (textNode.clientHeight > element.clientHeight) {
 		   textNode.innerText = textNode.innerText.replace(/\W*\s(\S)*$/, '...');
		}
	}

	function reapply() {
		for (var i = 0; i < elements.length; i++) {
			var textNode = elements[i].children[0];
			textNode.innerText = elements[i].dataset.ellipsis;
			if(textNode.clientHeight > elements[i].clientHeight) {
				polyfillElement(elements[i]);	
			}
		}
	}

	function add() {
		if (typeof(document.body.style.webkitLineClamp) !== "undefined") {
			return;
		}
		elements = document.querySelectorAll('[data-ellipsis]');
		reapply();
		window.addEventListener('resize', reapply);
		window.addEventListener('orientationchange', reapply);
	}

	function remove() {
		window.removeEventListener('resize', reapply);
		window.removeEventListener('orientationchange', reapply);
		elements.forEach(function(element) {
			var textNode = element.children[0];
			textNode.innerText = element.dataset.ellipsis;
		});
	}

	var polyfill = {
		add: add,
		reapply: reapply,
		remove: remove
	};

	window.lineClamp = window.lineClamp || {
		polyfillElement: polyfillElement,
		polyfill: polyfill
	};

}());

lineClamp.polyfill.add();
// lineClamp.polyfill.remove();