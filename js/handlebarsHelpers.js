define([
	"handlebars"
], function(Handlebars) {

	Handlebars.registerHelper('compare', function(lvalue, rvalue, options) {
		if (arguments.length < 3) {
			throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
		}

		var currOperator = options.hash.operator || "==";
		var operators = {
			'==': function (l, r) { return l == r; },
			'===': function (l, r) { return l === r; },
			'!=': function (l, r) { return l != r; },
			'!==': function (l, r) { return l !== r; },
			'<': function (l, r) { return l < r; },
			'>': function (l, r) { return l > r; },
			'<=': function (l, r) { return l <= r; },
			'>=': function (l, r) { return l >= r; },
			'typeof': function (l, r) { return typeof l == r; }
		};

		if (!operators[currOperator]) {
			throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + currOperator);
		}

		var result = operators[currOperator](lvalue, rvalue);
		if (result) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});

});