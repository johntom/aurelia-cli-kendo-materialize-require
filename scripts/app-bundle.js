define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.title = 'Aurelia';
      config.map([{ route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome', nav: true, title: 'Welcome' }, { route: 'users', name: 'users', moduleId: 'users', nav: true, title: 'Github Users' }, { route: 'child-router', name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }, { route: 'kendo', moduleId: './kendo/index', nav: true, title: 'kendo' }, { route: 'parallax', moduleId: './parallax/index', nav: true, title: 'parallax' }]);

      this.router = router;
    };

    return App;
  }();
});;
define('text!app.css',[],function(){return ".customer-photo {\r\n    display: inline-block;\r\n    width: 32px;\r\n    height: 32px;\r\n    border-radius: 50%;\r\n    background-size: 32px 35px;\r\n    background-position: center center;\r\n    vertical-align: middle;\r\n    line-height: 32px;\r\n    box-shadow: inset 0 0 1px #999, inset 0 0 10px rgba(0,0,0,.2);\r\n    margin-left: 5px;\r\n}\r\n\r\n.customer-name {\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n    line-height: 32px;\r\n    padding-left: 3px;\r\n}";});;
define('text!app.html',[],function(){return "<template><require from=\"bootstrap/dist/css/bootstrap.min.css\"></require><require from=\"nav-bar.html\"></require><nav-bar router.bind=\"router\"></nav-bar><div class=\"page-host\"><router-view></router-view></div></template>";});;
define('blur-image',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.BlurImageCustomAttribute = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var BlurImageCustomAttribute = exports.BlurImageCustomAttribute = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = function () {
		function BlurImageCustomAttribute(element) {
			_classCallCheck(this, BlurImageCustomAttribute);

			this.element = element;
		}

		BlurImageCustomAttribute.prototype.valueChanged = function valueChanged(newImage) {
			var _this = this;

			if (newImage.complete) {
				drawBlur(this.element, newImage);
			} else {
				newImage.onload = function () {
					return drawBlur(_this.element, newImage);
				};
			}
		};

		return BlurImageCustomAttribute;
	}()) || _class);


	var mul_table = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];

	var shg_table = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];

	var BLUR_RADIUS = 40;

	function stackBlurCanvasRGBA(canvas, top_x, top_y, width, height, radius) {
		if (isNaN(radius) || radius < 1) return;
		radius |= 0;

		var context = canvas.getContext("2d");
		var imageData;

		try {
			imageData = context.getImageData(top_x, top_y, width, height);
		} catch (e) {
			throw new Error("unable to access image data: " + e);
		}

		var pixels = imageData.data;

		var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, r_out_sum, g_out_sum, b_out_sum, a_out_sum, r_in_sum, g_in_sum, b_in_sum, a_in_sum, pr, pg, pb, pa, rbs;

		var div = radius + radius + 1;
		var w4 = width << 2;
		var widthMinus1 = width - 1;
		var heightMinus1 = height - 1;
		var radiusPlus1 = radius + 1;
		var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

		var stackStart = new BlurStack();
		var stack = stackStart;
		for (i = 1; i < div; i++) {
			stack = stack.next = new BlurStack();
			if (i == radiusPlus1) var stackEnd = stack;
		}
		stack.next = stackStart;
		var stackIn = null;
		var stackOut = null;

		yw = yi = 0;

		var mul_sum = mul_table[radius];
		var shg_sum = shg_table[radius];

		for (y = 0; y < height; y++) {
			r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;

			r_out_sum = radiusPlus1 * (pr = pixels[yi]);
			g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
			b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
			a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

			r_sum += sumFactor * pr;
			g_sum += sumFactor * pg;
			b_sum += sumFactor * pb;
			a_sum += sumFactor * pa;

			stack = stackStart;

			for (i = 0; i < radiusPlus1; i++) {
				stack.r = pr;
				stack.g = pg;
				stack.b = pb;
				stack.a = pa;
				stack = stack.next;
			}

			for (i = 1; i < radiusPlus1; i++) {
				p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
				r_sum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
				g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
				b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
				a_sum += (stack.a = pa = pixels[p + 3]) * rbs;

				r_in_sum += pr;
				g_in_sum += pg;
				b_in_sum += pb;
				a_in_sum += pa;

				stack = stack.next;
			}

			stackIn = stackStart;
			stackOut = stackEnd;
			for (x = 0; x < width; x++) {
				pixels[yi + 3] = pa = a_sum * mul_sum >> shg_sum;
				if (pa != 0) {
					pa = 255 / pa;
					pixels[yi] = (r_sum * mul_sum >> shg_sum) * pa;
					pixels[yi + 1] = (g_sum * mul_sum >> shg_sum) * pa;
					pixels[yi + 2] = (b_sum * mul_sum >> shg_sum) * pa;
				} else {
					pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
				}

				r_sum -= r_out_sum;
				g_sum -= g_out_sum;
				b_sum -= b_out_sum;
				a_sum -= a_out_sum;

				r_out_sum -= stackIn.r;
				g_out_sum -= stackIn.g;
				b_out_sum -= stackIn.b;
				a_out_sum -= stackIn.a;

				p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;

				r_in_sum += stackIn.r = pixels[p];
				g_in_sum += stackIn.g = pixels[p + 1];
				b_in_sum += stackIn.b = pixels[p + 2];
				a_in_sum += stackIn.a = pixels[p + 3];

				r_sum += r_in_sum;
				g_sum += g_in_sum;
				b_sum += b_in_sum;
				a_sum += a_in_sum;

				stackIn = stackIn.next;

				r_out_sum += pr = stackOut.r;
				g_out_sum += pg = stackOut.g;
				b_out_sum += pb = stackOut.b;
				a_out_sum += pa = stackOut.a;

				r_in_sum -= pr;
				g_in_sum -= pg;
				b_in_sum -= pb;
				a_in_sum -= pa;

				stackOut = stackOut.next;

				yi += 4;
			}
			yw += width;
		}

		for (x = 0; x < width; x++) {
			g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;

			yi = x << 2;
			r_out_sum = radiusPlus1 * (pr = pixels[yi]);
			g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
			b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
			a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

			r_sum += sumFactor * pr;
			g_sum += sumFactor * pg;
			b_sum += sumFactor * pb;
			a_sum += sumFactor * pa;

			stack = stackStart;

			for (i = 0; i < radiusPlus1; i++) {
				stack.r = pr;
				stack.g = pg;
				stack.b = pb;
				stack.a = pa;
				stack = stack.next;
			}

			yp = width;

			for (i = 1; i <= radius; i++) {
				yi = yp + x << 2;

				r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
				g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
				b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
				a_sum += (stack.a = pa = pixels[yi + 3]) * rbs;

				r_in_sum += pr;
				g_in_sum += pg;
				b_in_sum += pb;
				a_in_sum += pa;

				stack = stack.next;

				if (i < heightMinus1) {
					yp += width;
				}
			}

			yi = x;
			stackIn = stackStart;
			stackOut = stackEnd;
			for (y = 0; y < height; y++) {
				p = yi << 2;
				pixels[p + 3] = pa = a_sum * mul_sum >> shg_sum;
				if (pa > 0) {
					pa = 255 / pa;
					pixels[p] = (r_sum * mul_sum >> shg_sum) * pa;
					pixels[p + 1] = (g_sum * mul_sum >> shg_sum) * pa;
					pixels[p + 2] = (b_sum * mul_sum >> shg_sum) * pa;
				} else {
					pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
				}

				r_sum -= r_out_sum;
				g_sum -= g_out_sum;
				b_sum -= b_out_sum;
				a_sum -= a_out_sum;

				r_out_sum -= stackIn.r;
				g_out_sum -= stackIn.g;
				b_out_sum -= stackIn.b;
				a_out_sum -= stackIn.a;

				p = x + ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;

				r_sum += r_in_sum += stackIn.r = pixels[p];
				g_sum += g_in_sum += stackIn.g = pixels[p + 1];
				b_sum += b_in_sum += stackIn.b = pixels[p + 2];
				a_sum += a_in_sum += stackIn.a = pixels[p + 3];

				stackIn = stackIn.next;

				r_out_sum += pr = stackOut.r;
				g_out_sum += pg = stackOut.g;
				b_out_sum += pb = stackOut.b;
				a_out_sum += pa = stackOut.a;

				r_in_sum -= pr;
				g_in_sum -= pg;
				b_in_sum -= pb;
				a_in_sum -= pa;

				stackOut = stackOut.next;

				yi += width;
			}
		}

		context.putImageData(imageData, top_x, top_y);
	}

	function BlurStack() {
		this.r = 0;
		this.g = 0;
		this.b = 0;
		this.a = 0;
		this.next = null;
	}

	function drawBlur(canvas, image) {
		var w = canvas.width;
		var h = canvas.height;
		var canvasContext = canvas.getContext('2d');
		canvasContext.drawImage(image, 0, 0, w, h);
		stackBlurCanvasRGBA(canvas, 0, 0, w, h, BLUR_RADIUS);
	};
});;
define('child-router',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ChildRouter = exports.ChildRouter = function () {
    function ChildRouter() {
      _classCallCheck(this, ChildRouter);

      this.heading = 'Child Router';
    }

    ChildRouter.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome', nav: true, title: 'Welcome' }, { route: 'users', name: 'users', moduleId: 'users', nav: true, title: 'Github Users' }, { route: 'child-router', name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }]);

      this.router = router;
    };

    return ChildRouter;
  }();
});;
define('text!child-router.html',[],function(){return "<template><section class=\"au-animate\"><h2>${heading}</h2><div><div class=\"col-md-2\"><ul class=\"well nav nav-pills nav-stacked\"><li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\"><a href.bind=\"row.href\">${row.title}</a></li></ul></div><div class=\"col-md-10\" style=\"padding:0\"><router-view></router-view></div></div></section></template>";});;
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});;
define('text!kendo/app.css',[],function(){return ".customer-photo {\r\n    display: inline-block;\r\n    width: 32px;\r\n    height: 32px;\r\n    border-radius: 50%;\r\n    background-size: 32px 35px;\r\n    background-position: center center;\r\n    vertical-align: middle;\r\n    line-height: 32px;\r\n    box-shadow: inset 0 0 1px #999, inset 0 0 10px rgba(0,0,0,.2);\r\n    margin-left: 5px;\r\n}\r\n\r\n.customer-name {\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n    line-height: 32px;\r\n    padding-left: 3px;\r\n}";});;
define('kendo/index',["exports", "aurelia-framework", "aurelia-materialize-bridge", "aurelia-router"], function (exports, _aureliaFramework, _aureliaMaterializeBridge, _aureliaRouter) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UpperValueConverter = exports.Kendo = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _dec, _class;

  var Kendo = exports.Kendo = (_dec = (0, _aureliaFramework.inject)(_aureliaMaterializeBridge.MdToastService, _aureliaRouter.AppRouter), _dec(_class = function () {
    function Kendo(toast, router) {
      _classCallCheck(this, Kendo);

      this.heading = 'Welcome to the Aurelia Navigation-Kendo-Systemjs-Cli App!';
      this.firstName = 'John';
      this.lastName = 'Doe';
      this.previousValue = this.fullName;
      this.pageable = {
        refresh: true,
        pageSizes: true,
        buttonCount: 10
      };
      this.resizable = {
        content: true,
        toolbar: true
      };

      this.modal = _aureliaMaterializeBridge.MdModal;
      this.toast = toast;

      this.datasource = {
        type: 'odata',
        transport: {
          read: '//demos.telerik.com/kendo-ui/service/Northwind.svc/Customers'
        },
        pageSize: 5
      };
    }

    Kendo.prototype.agree = function agree(e) {
      this.toast.show("You agreed!", 4000);
    };

    Kendo.prototype.disagree = function disagree(e) {
      this.toast.show("You disagreed!", 4000);
    };

    Kendo.prototype.openModal = function openModal() {
      this.modal.open();
    };

    Kendo.prototype.testToast = function testToast() {
      this.toast.show("You disagreed!", 4000);
    };

    Kendo.prototype.submit = function submit() {
      this.previousValue = this.fullName;

      alert("Welcome, " + this.fullName + "!");
    };

    Kendo.prototype.canDeactivate = function canDeactivate() {
      if (this.fullName !== this.previousValue) {
        return confirm('Are you sure you want to leave?');
      }
    };

    _createClass(Kendo, [{
      key: "fullName",
      get: function get() {
        return this.firstName + " " + this.lastName;
      }
    }]);

    return Kendo;
  }()) || _class);

  var UpperValueConverter = exports.UpperValueConverter = function () {
    function UpperValueConverter() {
      _classCallCheck(this, UpperValueConverter);
    }

    UpperValueConverter.prototype.toView = function toView(value) {
      return value && value.toUpperCase();
    };

    return UpperValueConverter;
  }();
});;
define('text!kendo/index.html',[],function(){return "<template><require from=\"./app.css\"></require><require from=\"materialize-css/dist/css/materialize.css\"></require><section class=\"au-animate\"><br><br><br><h4>${heading}</h4><div class=\"demo-section k-content\"><h4>Show e-mails from:</h4><input id=\"datepicker\" ak-datepicker=\"k-value.bind:'10/10/2011'\" style=\"width:100%\"><h4 style=\"margin-top:2em\">Add to archive mail from:</h4><input id=\"monthpicker\" ak-datepicker=\"k-value.bind:'November 2011'; k-start.bind:'year'; k-depth.bind: 'year';k-format.bind:'MMMM yyyy';\" style=\"width:100%\"><p></p></div><ak-grid k-data-source.bind=\"datasource\" k-pageable.bind=\"pageable\" k-sortable.bind=\"true\"><ak-col k-title=\"Contact Name\" k-field=\"ContactName\"><ak-template><div class=\"customer-photo\" style=\"background-image:url(http://demos.telerik.com/kendo-ui/content/web/Customers/${CustomerID}.jpg)\"></div><div class=\"customer-name\">${ContactName}</div></ak-template></ak-col><ak-col k-title=\"Contact Name\" k-field=\"ContactName\"></ak-col><ak-col k-title=\"Contact Title\" k-field=\"ContactTitle\"></ak-col><ak-col k-title=\"Company Name\" k-field=\"CompanyName\"></ak-col><ak-col k-field=\"Country\"></ak-col></ak-grid><div class=\"demo-section wide k-content\"><textarea ak-rich-editor style=\"height:440px\">\r\n\r\n        &lt;p&gt;&lt;img src=&quot;http://demos.telerik.com/kendo-ui/content/web/editor/kendo-ui-web.png&quot; alt=&quot;Editor for ASP.NET MVC logo&quot; style=&quot;display:block;margin-left:auto;margin-right:auto;&quot; /&gt;&lt;/p&gt;\r\n        &lt;p&gt;\r\n            Kendo UI Editor allows your users to edit HTML in a familiar, user-friendly way.&lt;br /&gt;\r\n            In this version, the Editor provides the core HTML editing engine, which includes basic text formatting, hyperlinks, lists,\r\n            and image handling. The widget &lt;strong&gt;outputs identical HTML&lt;/strong&gt; across all major browsers, follows\r\n            accessibility standards and provides API for content manipulation.\r\n        &lt;/p&gt;\r\n        &lt;p&gt;Features include:&lt;/p&gt;\r\n        &lt;ul&gt;\r\n            &lt;li&gt;Text formatting &amp; alignment&lt;/li&gt;\r\n            &lt;li&gt;Bulleted and numbered lists&lt;/li&gt;\r\n            &lt;li&gt;Hyperlink and image dialogs&lt;/li&gt;\r\n            &lt;li&gt;Cross-browser support&lt;/li&gt;\r\n            &lt;li&gt;Identical HTML output across browsers&lt;/li&gt;\r\n            &lt;li&gt;Gracefully degrades to a &lt;code&gt;textarea&lt;/code&gt; when JavaScript is turned off&lt;/li&gt;\r\n        &lt;/ul&gt;\r\n        &lt;p&gt;\r\n            Read &lt;a href=&quot;http://docs.telerik.com/kendo-ui&quot;&gt;more details&lt;/a&gt; or send us your\r\n            &lt;a href=&quot;http://www.telerik.com/forums/&quot;&gt;feedback&lt;/a&gt;!\r\n        &lt;/p&gt;\r\n        </textarea></div><div id=\"example\"><div class=\"demo-section wide k-content\"><h2>Invite Attendees</h2><label for=\"required\">Required</label><ak-multiselect k-value.two-way=\"required\"><select multiple=\"multiple\" data-placeholder=\"Select attendees...\"><option>Steven White</option><option>Nancy King</option><option>Nancy Davolio</option><option>Robert Davolio</option><option>Michael Leverling</option><option>Andrew Callahan</option><option>Michael Suyama</option><option selected=\"selected\">Anne King</option><option>Laura Peacock</option><option>Robert Fuller</option><option>Janet White</option><option>Nancy Leverling</option><option>Robert Buchanan</option><option>Margaret Buchanan</option><option selected=\"selected\">Andrew Fuller</option><option>Anne Davolio</option><option>Andrew Suyama</option><option>Nige Buchanan</option><option>Laura Fuller</option></select></ak-multiselect><label for=\"optional\">Optional</label><ak-multiselect k-auto-close.bind=\"false\" k-value.two-way=\"optional\"><select multiple=\"multiple\" data-placeholder=\"Select attendees...\"><option>Steven White</option><option>Nancy King</option><option>Nancy Davolio</option><option>Robert Davolio</option><option>Michael Leverling</option><option>Andrew Callahan</option><option>Michael Suyama</option><option>Anne King</option><option>Laura Peacock</option><option>Robert Fuller</option><option>Janet White</option><option>Nancy Leverling</option><option>Robert Buchanan</option><option>Margaret Buchanan</option><option>Andrew Fuller</option><option>Anne Davolio</option><option>Andrew Suyama</option><option>Nige Buchanan</option><option>Laura Fuller</option></select></ak-multiselect><button ak-button click.delegate=\"showAttendees()\">Send Invitation</button></div><div class=\"demo-section wide k-content\"><h2>Invite Attendees</h2><label for=\"required\">Required</label><ak-multiselect k-value.two-way=\"required\"><select multiple=\"multiple\" data-placeholder=\"Select attendees...\"><option>Steven White</option><option>Nancy King</option><option>Nancy Davolio</option><option>Robert Davolio</option><option>Michael Leverling</option><option>Andrew Callahan</option><option>Michael Suyama</option><option selected=\"selected\">Anne King</option><option>Laura Peacock</option><option>Robert Fuller</option><option>Janet White</option><option>Nancy Leverling</option><option>Robert Buchanan</option><option>Margaret Buchanan</option><option selected=\"selected\">Andrew Fuller</option><option>Anne Davolio</option><option>Andrew Suyama</option><option>Nige Buchanan</option><option>Laura Fuller</option></select></ak-multiselect><label for=\"optional\">Optional</label><ak-multiselect k-auto-close.bind=\"false\" k-value.two-way=\"optional\"><select multiple=\"multiple\" data-placeholder=\"Select attendees...\"><option>Steven White</option><option>Nancy King</option><option>Nancy Davolio</option><option>Robert Davolio</option><option>Michael Leverling</option><option>Andrew Callahan</option><option>Michael Suyama</option><option>Anne King</option><option>Laura Peacock</option><option>Robert Fuller</option><option>Janet White</option><option>Nancy Leverling</option><option>Robert Buchanan</option><option>Margaret Buchanan</option><option>Andrew Fuller</option><option>Anne Davolio</option><option>Andrew Suyama</option><option>Nige Buchanan</option><option>Laura Fuller</option></select></ak-multiselect><button ak-button click.delegate=\"showAttendees()\">Send Invitation</button><br><br><br><br></div></div></section></template>";});;
define('main',['exports', './environment', 'bootstrap', 'kendo/css/web/kendo.common.min.css', 'kendo/css/web/kendo.default.min.css', 'kendo/js/kendo.datepicker', 'kendo/js/kendo.grid', 'kendo/js/kendo.editor', 'kendo/js/kendo.multiselect'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.plugin('aurelia-materialize-bridge', function (b) {
      return b.useAll().preventWavesAttach();
    });

    aurelia.use.standardConfiguration().feature('resources').plugin('aurelia-kendoui-bridge').globalResources("aurelia-kendoui-bridge/datepicker/datepicker").globalResources("aurelia-kendoui-bridge/grid/grid").globalResources("aurelia-kendoui-bridge/grid/col").globalResources("aurelia-kendoui-bridge/common/template").globalResources("aurelia-kendoui-bridge/common/template").globalResources("aurelia-kendoui-bridge/multiselect/multiselect").globalResources("aurelia-kendoui-bridge/editor/editor");

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('kendo/css/web/kendo.common.min.css',['__inject_css__','text!kendo/css/web/kendo.common.min.css'],function(i,c){i(c,'_au_css:kendo/css/web/kendo.common.min.css');});

define('kendo/css/web/kendo.default.min.css',['__inject_css__','text!kendo/css/web/kendo.default.min.css'],function(i,c){i(c,'_au_css:kendo/css/web/kendo.default.min.css');});
;
define('text!nav-bar.html',[],function(){return "<template bindable=\"router\"><nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\"><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#navigation-navbar-collapse-1\"><span class=\"sr-only\">Toggle Navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <a class=\"navbar-brand\" href=\"#\"><i class=\"fa fa-home\"></i> <span>${router.title}</span></a></div><div class=\"collapse navbar-collapse\" id=\"navigation-navbar-collapse-1\"><ul class=\"nav navbar-nav\"><li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\"><a data-toggle=\"collapse\" data-target=\"#navigation-navbar-collapse-1.in\" href.bind=\"row.href\">${row.title}</a></li></ul><ul class=\"nav navbar-nav navbar-right\"><li class=\"loader\" if.bind=\"router.isNavigating\"><i class=\"fa fa-spinner fa-spin fa-2x\"></i></li></ul></div></nav></template>";});;
define('text!parallax/app.css',[],function(){return ".customer-photo {\r\n    display: inline-block;\r\n    width: 32px;\r\n    height: 32px;\r\n    border-radius: 50%;\r\n    background-size: 32px 35px;\r\n    background-position: center center;\r\n    vertical-align: middle;\r\n    line-height: 32px;\r\n    box-shadow: inset 0 0 1px #999, inset 0 0 10px rgba(0,0,0,.2);\r\n    margin-left: 5px;\r\n}\r\n\r\n.customer-name {\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n    line-height: 32px;\r\n    padding-left: 3px;\r\n}\r\n\r\n.md-parallax-demo .parallax {\r\n    z-index: 0;\r\n  }\r\n  ";});;
define('parallax/index',["exports", "aurelia-framework", "aurelia-materialize-bridge", "aurelia-router"], function (exports, _aureliaFramework, _aureliaMaterializeBridge, _aureliaRouter) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Modal = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Modal = exports.Modal = (_dec = (0, _aureliaFramework.inject)(_aureliaMaterializeBridge.MdToastService, _aureliaRouter.AppRouter), _dec(_class = function Modal() {
    _classCallCheck(this, Modal);

    this.heading = 'Welcome to Parallax!';
    this.firstName = 'John';
    this.lastName = 'Doe';
    this.previousValue = this.fullName;
  }) || _class);
});;
define('text!parallax/index.html',[],function(){return "<template><require from=\"./app.css\"></require><div class=\"md-parallax-demo\"><div class=\"row\"><div class=\"col s12 m8\"><md-card title=\"Parallax\"><p>scroll down</p></md-card></div></div><div class=\"parallax-container\"><div md-parallax><img src=\"https://aurelia-ui-toolkits.github.io/demo-materialize/images/parallax-1.jpg\"></div></div><div class=\"row\"><div class=\"col s12 m8\"><md-card title=\"More content\"><p>some more scrolling content</p></md-card></div></div><div class=\"parallax-container\"><div md-parallax><img src=\"https://aurelia-ui-toolkits.github.io/demo-materialize/images/parallax-2.jpg\"></div></div><div class=\"row\"><div class=\"col s12 m8\"><md-card title=\"More content\"><p>even more scrolling content</p></md-card></div></div><div class=\"parallax-container\"><div md-parallax><img src=\"https://aurelia-ui-toolkits.github.io/demo-materialize/images/parallax-1.jpg\"></div></div><div class=\"row\"><div class=\"col s12 m8\"><md-card title=\"More content\"><p>some more scrolling content</p></md-card></div></div><div class=\"parallax-container\"><div md-parallax><img src=\"https://aurelia-ui-toolkits.github.io/demo-materialize/images/parallax-2.jpg\"></div></div><div class=\"row\"><div class=\"col s12 m8\"><md-card title=\"More content\"><p>even more scrolling content</p></md-card></div></div></div></template>";});;
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});;
define('users',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Users = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function Users(http) {
      _classCallCheck(this, Users);

      this.heading = 'Github Users';
      this.users = [];

      http.configure(function (config) {
        config.useStandardConfiguration().withBaseUrl('https://api.github.com/');
      });

      this.http = http;
    }

    Users.prototype.activate = function activate() {
      var _this = this;

      return this.http.fetch('users').then(function (response) {
        return response.json();
      }).then(function (users) {
        return _this.users = users;
      });
    };

    return Users;
  }()) || _class);
});;
define('text!users.html',[],function(){return "<template><require from=\"blur-image\"></require><link href=\"styles/styles.css\" rel=\"stylesheet\"><section class=\"au-animate\"><h2>${heading}</h2><div class=\"row au-stagger\"><div class=\"col-sm-6 col-md-3 card-container au-animate\" repeat.for=\"user of users\"><div class=\"card\"><canvas class=\"header-bg\" width=\"250\" height=\"70\" blur-image.bind=\"image\"></canvas><div class=\"avatar\"><img src.bind=\"user.avatar_url\" crossorigin ref=\"image\"></div><div class=\"content\"><p class=\"name\">${user.login}</p><p><a target=\"_blank\" class=\"btn btn-default\" href.bind=\"user.html_url\">Contact</a></p></div></div></div></div></section></template>";});;
define('welcome',["exports", "aurelia-framework", "aurelia-materialize-bridge", "aurelia-router"], function (exports, _aureliaFramework, _aureliaMaterializeBridge, _aureliaRouter) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UpperValueConverter = exports.Welcome = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _dec, _class;

  var Welcome = exports.Welcome = (_dec = (0, _aureliaFramework.inject)(_aureliaMaterializeBridge.MdToastService, _aureliaRouter.AppRouter), _dec(_class = function () {
    function Welcome(toast, router) {
      _classCallCheck(this, Welcome);

      this.heading = 'Welcome to the Aurelia Navigation-Kendo-Meterialize-Cli-require App!';
      this.firstName = 'John';
      this.lastName = 'Doe';
      this.previousValue = this.fullName;
      this.pageable = {
        refresh: true,
        pageSizes: true,
        buttonCount: 10
      };
      this.resizable = {
        content: true,
        toolbar: true
      };

      this.modal = _aureliaMaterializeBridge.MdModal;
      this.toast = toast;

      this.datasource = {
        type: 'odata',
        transport: {
          read: '//demos.telerik.com/kendo-ui/service/Northwind.svc/Customers'
        },
        pageSize: 5
      };
    }

    Welcome.prototype.agree = function agree(e) {
      this.toast.show("You agreed!", 4000);
    };

    Welcome.prototype.disagree = function disagree(e) {
      this.toast.show("You disagreed!", 4000);
    };

    Welcome.prototype.openModal = function openModal() {
      this.modal.open();
    };

    Welcome.prototype.testToast = function testToast() {
      this.toast.show("You disagreed!", 4000);
    };

    Welcome.prototype.submit = function submit() {
      this.previousValue = this.fullName;

      alert("Welcome, " + this.fullName + "!");
    };

    Welcome.prototype.canDeactivate = function canDeactivate() {
      if (this.fullName !== this.previousValue) {
        return confirm('Are you sure you want to leave?');
      }
    };

    _createClass(Welcome, [{
      key: "fullName",
      get: function get() {
        return this.firstName + " " + this.lastName;
      }
    }]);

    return Welcome;
  }()) || _class);

  var UpperValueConverter = exports.UpperValueConverter = function () {
    function UpperValueConverter() {
      _classCallCheck(this, UpperValueConverter);
    }

    UpperValueConverter.prototype.toView = function toView(value) {
      return value && value.toUpperCase();
    };

    return UpperValueConverter;
  }();
});;
define('text!welcome.html',[],function(){return "<template><require from=\"./app.css\"></require><section class=\"au-animate\"><br><br><br><h4>${heading}</h4><form role=\"form\" submit.delegate=\"submit()\"><div class=\"form-group\"><label for=\"fn\">First Name</label> <input type=\"text\" value.bind=\"firstName\" class=\"form-control\" id=\"fn\" placeholder=\"first name\"></div><div class=\"form-group\"><label for=\"ln\">Last Name</label> <input type=\"text\" value.bind=\"lastName\" class=\"form-control\" id=\"ln\" placeholder=\"last name\"></div><div class=\"form-group\"><label>Full Name</label><p class=\"help-block\">${fullName | upper}</p></div><button type=\"submit\" class=\"btn btn-default\">Submit</button></form><div class=\"button-row\"><button md-button=\"disabled.bind: !firstButtonEnabled; flat.bind: !firstButtonRaised\"><i class=\"left material-icons\">mode_edit</i>I'm a basic button</button> <button md-button=\"flat: true;\">I'm a flat button</button></div><div class=\"button-row\"><button md-button=\"large: true;\">I'm a large button</button> <button md-button=\"flat: true; large: true;\">I'm a large flat button</button></div><div class=\"button-row\"><button md-button=\"disabled: true;\">I'm a basic disabled button</button> <button md-button=\"disabled: true; flat: true;\">I'm a flat disabled button</button></div><div class=\"button-row\"><button md-button class=\"primary\">I'm a primary colored button</button></div><div class=\"button-row\"><button md-button=\"flat: true;\" class=\"primary-text\">I'm a flat primary colored button</button></div><div class=\"actions\"><hr>First button:<md-switch label-on=\"enabled\" label-off=\"disabled\" checked.bind=\"firstButtonEnabled\"></md-switch><md-switch label-on=\"raised\" label-off=\"flat\" checked.bind=\"firstButtonRaised\"></md-switch></div><div><div>Materialize <button md-button click.delegate=\"testToast()\">testToast</button><p><a md-button class=\"modal-trigger\" href=\"#modal1\">show modal (href with ID)</a></p><p style=\"margin-top:15px\"><button md-button click.delegate=\"openModal()\">show modal (button without ID)</button></p></div><div id=\"modal1\" md-modal md-modal.ref=\"modal\"><div class=\"modal-content\"><h4>Modal Header</h4><p>A bunch of text</p></div><div class=\"modal-footer\"><a click.delegate=\"agree()\" md-button=\"flat: true;\" md-waves=\"color: accent;\" class=\"modal-action modal-close\">Agree</a> <a click.delegate=\"disagree()\" md-button=\"flat: true;\" md-waves=\"color: accent;\" class=\"modal-action modal-close\">Disagree</a></div></div></div></section></template>";});;
define('welcome/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Welcome = exports.Welcome = function Welcome() {
    _classCallCheck(this, Welcome);

    this.heading = "Welcome to the Nina Meledandri's Gallery!";
  };
});;
define('text!welcome/index.html',[],function(){return "<template><section><br><br><div class=\"row\"><div class=\"container-fluid\"><div class=\"col s12\"><div class=\"container\"><a href=\"#/works\"><img class=\"responsive-img\" width=\"1200px\" src=\"images/home.jpg\" alt=\"header\" border=\"0\"></a></div><br><span class=\"centertitle\"><p class=\"centertitle\">nina meledandri</p><p class=\"centertext\">paintings, photographs &amp; somewhere in between</p><p class=\"centertext\">&nbsp;</p><p class=\"centertext\"><a class=\"href\" href=\"#/works\">enter</a></p><p class=\"centertext\">&nbsp;</p></span></div></div></div></section></template>";});;
define('resources',['resources/index'],function(m){return m;});
//# sourceMappingURL=app-bundle.js.map