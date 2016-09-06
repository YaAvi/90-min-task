(function() {
	'use strict';
	var elements;
	function polyfillElement(element) {
		if (element.style.webkitLineClamp) {
			return;
		}

		var textNode = element.children[0];
		while (textNode.clientHeight > element.clientHeight) {
 		   textNode.innerText = textNode.innerText.replace(/\W*\s(\S)*$/, '...');
		}
	}

	function reapply() {
		elements.forEach(function(element) {
			var textNode = element.children[0];
			textNode.innerText = element.dataset.ellipsis;
			if(textNode.clientHeight > element.clientHeight) {
				polyfillElement(element);	
			}
		});
	}

	function add() {
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