
//
function bindTreeMenu(id, clpAllTrig, expAllTrig) {

	//
	function collapse(node, childUl) {
		node.className = node.className.replace("open", "close");
		childUl.hide();
	}
	//
	function expand(node, childUl) {
		node.className = node.className.replace("close", "open");
		childUl.show();
	}
	//
	function toggle(node) {
		var childUl = $(">ul", node);
		if (childUl.is(":visible")) {
			collapse(node, childUl);
		} else {
			expand(node, childUl);
		}
	}
	//
	function setTrigger(node) {
		var spacerImg = "static/images/treeMenu/spacer.gif";
		if (spacerImg) {
			$(node.firstChild).before("<img class=\"trigger\" src=\"" + spacerImg + "\" border=\"0\" />");
		}
		var trigger = $(">.trigger", node);
		trigger.click(function (event) {
			toggle(node);
		});
		if (!$.browser.msie) {
			trigger.css("float", "left");
		}
	}
	//
	function checkChilds(node, chk) {
		$(">ul :checkbox", node).each(function() {
			this.checked = chk.checked;
			checkChilds(this.parentNode, this);
		});
	}
	function checkParents(node, chk) {
		if (chk.checked) {
			//$("<ul :checkbox", node).each(function() {
			//	this.checked = true;
			//});
			var treeRoot = document.getElementById(id);
			var curNode = node;
			var chks;
			for (;;curNode = curNode.parentNode.parentNode) {
				if (curNode == treeRoot) break;
				chks = curNode.childNodes;//getElementsByTagName("input");
				for (var i in chks) {
					if (chks[i].type == "checkbox") {
						chks[i].checked = true;
						break;
					}
				}
			}
		}
	}
	//
	function collapseAll() {
		$("#" + id + " li").each(function() {
			if ($(this).children("ul").length) {
				collapse(this, $(">ul", this));
			}
		});
	}
	//
	function expandAll() {
		$("#" + id + " li").each(function() {
			if ($(this).children("ul").length) {
				expand(this, $(">ul", this));
			}
		});
	}
	//
	if (clpAllTrig) {
		$(clpAllTrig).click(collapseAll);
	}
	if (expAllTrig) {
		$(expAllTrig).click(expandAll);
	}

	$("#" + id + " li").each(function () {
	    //
		if ($(this).children("ul").length) {
	        //
			this.className = "tree-node-open";
			setTrigger(this);
		}
	});
	$("#" + id + " :checkbox").each(function() {
		$(this).click(function() {
			checkChilds(this.parentNode, this);
			checkParents(this.parentNode, this);
		});
	});
}

