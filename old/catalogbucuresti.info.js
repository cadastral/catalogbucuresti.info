/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
(function(global, factory) {
    "use strict";
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ? factory(global, true) : function(w) {
            if (!w.document) {
                throw new Error("jQuery requires a window with a document");
            }
            return factory(w);
        }
        ;
    } else {
        factory(global);
    }
}
)(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
    "use strict";
    var arr = [];
    var document = window.document;
    var getProto = Object.getPrototypeOf;
    var slice = arr.slice;
    var concat = arr.concat;
    var push = arr.push;
    var indexOf = arr.indexOf;
    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var fnToString = hasOwn.toString;
    var ObjectFunctionString = fnToString.call(Object);
    var support = {};
    function DOMEval(code, doc) {
        doc = doc || document;
        var script = doc.createElement("script");
        script.text = code;
        doc.head.appendChild(script).parentNode.removeChild(script);
    }
    var version = "3.2.1"
      , jQuery = function(selector, context) {
        return new jQuery.fn.init(selector,context);
    }
      , rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
      , rmsPrefix = /^-ms-/
      , rdashAlpha = /-([a-z])/g
      , fcamelCase = function(all, letter) {
        return letter.toUpperCase();
    };
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        length: 0,
        toArray: function() {
            return slice.call(this);
        },
        get: function(num) {
            if (num == null) {
                return slice.call(this);
            }
            return num < 0 ? this[num + this.length] : this[num];
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            ret.prevObject = this;
            return ret;
        },
        each: function(callback) {
            return jQuery.each(this, callback);
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        slice: function() {
            return this.pushStack(slice.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(i) {
            var len = this.length
              , j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
        },
        end: function() {
            return this.prevObject || this.constructor();
        },
        push: push,
        sort: arr.sort,
        splice: arr.splice
    };
    jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[i] || {};
            i++;
        }
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {};
        }
        if (i === length) {
            target = this;
            i--;
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];
                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }
                        target[name] = jQuery.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    }
    ;
    jQuery.extend({
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        isReady: true,
        error: function(msg) {
            throw new Error(msg);
        },
        noop: function() {},
        isFunction: function(obj) {
            return jQuery.type(obj) === "function";
        },
        isWindow: function(obj) {
            return obj != null && obj === obj.window;
        },
        isNumeric: function(obj) {
            var type = jQuery.type(obj);
            return (type === "number" || type === "string") && !isNaN(obj - parseFloat(obj));
        },
        isPlainObject: function(obj) {
            var proto, Ctor;
            if (!obj || toString.call(obj) !== "[object Object]") {
                return false;
            }
            proto = getProto(obj);
            if (!proto) {
                return true;
            }
            Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
            return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        },
        type: function(obj) {
            if (obj == null) {
                return obj + "";
            }
            return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
        },
        globalEval: function(code) {
            DOMEval(code);
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },
        each: function(obj, callback) {
            var length, i = 0;
            if (isArrayLike(obj)) {
                length = obj.length;
                for (; i < length; i++) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            } else {
                for (i in obj) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            }
            return obj;
        },
        trim: function(text) {
            return text == null ? "" : (text + "").replace(rtrim, "");
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            if (arr != null) {
                if (isArrayLike(Object(arr))) {
                    jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
                } else {
                    push.call(ret, arr);
                }
            }
            return ret;
        },
        inArray: function(elem, arr, i) {
            return arr == null ? -1 : indexOf.call(arr, elem, i);
        },
        merge: function(first, second) {
            var len = +second.length
              , j = 0
              , i = first.length;
            for (; j < len; j++) {
                first[i++] = second[j];
            }
            first.length = i;
            return first;
        },
        grep: function(elems, callback, invert) {
            var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert;
            for (; i < length; i++) {
                callbackInverse = !callback(elems[i], i);
                if (callbackInverse !== callbackExpect) {
                    matches.push(elems[i]);
                }
            }
            return matches;
        },
        map: function(elems, callback, arg) {
            var length, value, i = 0, ret = [];
            if (isArrayLike(elems)) {
                length = elems.length;
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret.push(value);
                    }
                }
            } else {
                for (i in elems) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret.push(value);
                    }
                }
            }
            return concat.apply([], ret);
        },
        guid: 1,
        proxy: function(fn, context) {
            var tmp, args, proxy;
            if (typeof context === "string") {
                tmp = fn[context];
                context = fn;
                fn = tmp;
            }
            if (!jQuery.isFunction(fn)) {
                return undefined;
            }
            args = slice.call(arguments, 2);
            proxy = function() {
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            }
            ;
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;
            return proxy;
        },
        now: Date.now,
        support: support
    });
    if (typeof Symbol === "function") {
        jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
    }
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    function isArrayLike(obj) {
        var length = !!obj && "length"in obj && obj.length
          , type = jQuery.type(obj);
        if (type === "function" || jQuery.isWindow(obj)) {
            return false;
        }
        return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1)in obj;
    }
    var Sizzle = /*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
    (function(window) {
        var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function(a, b) {
            if (a === b) {
                hasDuplicate = true;
            }
            return 0;
        }, hasOwn = ({}).hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = function(list, elem) {
            var i = 0
              , len = list.length;
            for (; i < len; i++) {
                if (list[i] === elem) {
                    return i;
                }
            }
            return -1;
        }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+", attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + identifier + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + ".*" + ")\\)|)", rwhitespace = new RegExp(whitespace + "+","g"), rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$","g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]","g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            "ID": new RegExp("^#(" + identifier + ")"),
            "CLASS": new RegExp("^\\.(" + identifier + ")"),
            "TAG": new RegExp("^(" + identifier + "|[*])"),
            "ATTR": new RegExp("^" + attributes),
            "PSEUDO": new RegExp("^" + pseudos),
            "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)","i"),
            "bool": new RegExp("^(?:" + booleans + ")$","i"),
            "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)","i")
        }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)","ig"), funescape = function(_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 0x10000;
            return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
        }, rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, fcssescape = function(ch, asCodePoint) {
            if (asCodePoint) {
                if (ch === "\0") {
                    return "\uFFFD";
                }
                return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
            }
            return "\\" + ch;
        }, unloadHandler = function() {
            setDocument();
        }, disabledAncestor = addCombinator(function(elem) {
            return elem.disabled === true && ("form"in elem || "label"in elem);
        }, {
            dir: "parentNode",
            next: "legend"
        });
        try {
            push.apply((arr = slice.call(preferredDoc.childNodes)), preferredDoc.childNodes);
            arr[preferredDoc.childNodes.length].nodeType;
        } catch (e) {
            push = {
                apply: arr.length ? function(target, els) {
                    push_native.apply(target, slice.call(els));
                }
                : function(target, els) {
                    var j = target.length
                      , i = 0;
                    while ((target[j++] = els[i++])) {}
                    target.length = j - 1;
                }
            };
        }
        function Sizzle(selector, context, results, seed) {
            var m, i, elem, nid, match, groups, newSelector, newContext = context && context.ownerDocument, nodeType = context ? context.nodeType : 9;
            results = results || [];
            if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
                return results;
            }
            if (!seed) {
                if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
                    setDocument(context);
                }
                context = context || document;
                if (documentIsHTML) {
                    if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
                        if ((m = match[1])) {
                            if (nodeType === 9) {
                                if ((elem = context.getElementById(m))) {
                                    if (elem.id === m) {
                                        results.push(elem);
                                        return results;
                                    }
                                } else {
                                    return results;
                                }
                            } else {
                                if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                                    results.push(elem);
                                    return results;
                                }
                            }
                        } else if (match[2]) {
                            push.apply(results, context.getElementsByTagName(selector));
                            return results;
                        } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
                            push.apply(results, context.getElementsByClassName(m));
                            return results;
                        }
                    }
                    if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                        if (nodeType !== 1) {
                            newContext = context;
                            newSelector = selector;
                        } else if (context.nodeName.toLowerCase() !== "object") {
                            if ((nid = context.getAttribute("id"))) {
                                nid = nid.replace(rcssescape, fcssescape);
                            } else {
                                context.setAttribute("id", (nid = expando));
                            }
                            groups = tokenize(selector);
                            i = groups.length;
                            while (i--) {
                                groups[i] = "#" + nid + " " + toSelector(groups[i]);
                            }
                            newSelector = groups.join(",");
                            newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                        }
                        if (newSelector) {
                            try {
                                push.apply(results, newContext.querySelectorAll(newSelector));
                                return results;
                            } catch (qsaError) {} finally {
                                if (nid === expando) {
                                    context.removeAttribute("id");
                                }
                            }
                        }
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed);
        }
        function createCache() {
            var keys = [];
            function cache(key, value) {
                if (keys.push(key + " ") > Expr.cacheLength) {
                    delete cache[keys.shift()];
                }
                return (cache[key + " "] = value);
            }
            return cache;
        }
        function markFunction(fn) {
            fn[expando] = true;
            return fn;
        }
        function assert(fn) {
            var el = document.createElement("fieldset");
            try {
                return !!fn(el);
            } catch (e) {
                return false;
            } finally {
                if (el.parentNode) {
                    el.parentNode.removeChild(el);
                }
                el = null;
            }
        }
        function addHandle(attrs, handler) {
            var arr = attrs.split("|")
              , i = arr.length;
            while (i--) {
                Expr.attrHandle[arr[i]] = handler;
            }
        }
        function siblingCheck(a, b) {
            var cur = b && a
              , diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;
            if (diff) {
                return diff;
            }
            if (cur) {
                while ((cur = cur.nextSibling)) {
                    if (cur === b) {
                        return -1;
                    }
                }
            }
            return a ? 1 : -1;
        }
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && elem.type === type;
            }
            ;
        }
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return (name === "input" || name === "button") && elem.type === type;
            }
            ;
        }
        function createDisabledPseudo(disabled) {
            return function(elem) {
                if ("form"in elem) {
                    if (elem.parentNode && elem.disabled === false) {
                        if ("label"in elem) {
                            if ("label"in elem.parentNode) {
                                return elem.parentNode.disabled === disabled;
                            } else {
                                return elem.disabled === disabled;
                            }
                        }
                        return elem.isDisabled === disabled || elem.isDisabled !== !disabled && disabledAncestor(elem) === disabled;
                    }
                    return elem.disabled === disabled;
                } else if ("label"in elem) {
                    return elem.disabled === disabled;
                }
                return false;
            }
            ;
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                argument = +argument;
                return markFunction(function(seed, matches) {
                    var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length;
                    while (i--) {
                        if (seed[(j = matchIndexes[i])]) {
                            seed[j] = !(matches[j] = seed[j]);
                        }
                    }
                });
            });
        }
        function testContext(context) {
            return context && typeof context.getElementsByTagName !== "undefined" && context;
        }
        support = Sizzle.support = {};
        isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? documentElement.nodeName !== "HTML" : false;
        }
        ;
        setDocument = Sizzle.setDocument = function(node) {
            var hasCompare, subWindow, doc = node ? node.ownerDocument || node : preferredDoc;
            if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                return document;
            }
            document = doc;
            docElem = document.documentElement;
            documentIsHTML = !isXML(document);
            if (preferredDoc !== document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {
                if (subWindow.addEventListener) {
                    subWindow.addEventListener("unload", unloadHandler, false);
                } else if (subWindow.attachEvent) {
                    subWindow.attachEvent("onunload", unloadHandler);
                }
            }
            support.attributes = assert(function(el) {
                el.className = "i";
                return !el.getAttribute("className");
            });
            support.getElementsByTagName = assert(function(el) {
                el.appendChild(document.createComment(""));
                return !el.getElementsByTagName("*").length;
            });
            support.getElementsByClassName = rnative.test(document.getElementsByClassName);
            support.getById = assert(function(el) {
                docElem.appendChild(el).id = expando;
                return !document.getElementsByName || !document.getElementsByName(expando).length;
            });
            if (support.getById) {
                Expr.filter["ID"] = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                        return elem.getAttribute("id") === attrId;
                    }
                    ;
                }
                ;
                Expr.find["ID"] = function(id, context) {
                    if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                        var elem = context.getElementById(id);
                        return elem ? [elem] : [];
                    }
                }
                ;
            } else {
                Expr.filter["ID"] = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                        var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                        return node && node.value === attrId;
                    }
                    ;
                }
                ;
                Expr.find["ID"] = function(id, context) {
                    if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                        var node, i, elems, elem = context.getElementById(id);
                        if (elem) {
                            node = elem.getAttributeNode("id");
                            if (node && node.value === id) {
                                return [elem];
                            }
                            elems = context.getElementsByName(id);
                            i = 0;
                            while ((elem = elems[i++])) {
                                node = elem.getAttributeNode("id");
                                if (node && node.value === id) {
                                    return [elem];
                                }
                            }
                        }
                        return [];
                    }
                }
                ;
            }
            Expr.find["TAG"] = support.getElementsByTagName ? function(tag, context) {
                if (typeof context.getElementsByTagName !== "undefined") {
                    return context.getElementsByTagName(tag);
                } else if (support.qsa) {
                    return context.querySelectorAll(tag);
                }
            }
            : function(tag, context) {
                var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
                if (tag === "*") {
                    while ((elem = results[i++])) {
                        if (elem.nodeType === 1) {
                            tmp.push(elem);
                        }
                    }
                    return tmp;
                }
                return results;
            }
            ;
            Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
                if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
                    return context.getElementsByClassName(className);
                }
            }
            ;
            rbuggyMatches = [];
            rbuggyQSA = [];
            if ((support.qsa = rnative.test(document.querySelectorAll))) {
                assert(function(el) {
                    docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";
                    if (el.querySelectorAll("[msallowcapture^='']").length) {
                        rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
                    }
                    if (!el.querySelectorAll("[selected]").length) {
                        rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                    }
                    if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
                        rbuggyQSA.push("~=");
                    }
                    if (!el.querySelectorAll(":checked").length) {
                        rbuggyQSA.push(":checked");
                    }
                    if (!el.querySelectorAll("a#" + expando + "+*").length) {
                        rbuggyQSA.push(".#.+[+~]");
                    }
                });
                assert(function(el) {
                    el.innerHTML = "<a href='' disabled='disabled'></a>" + "<select disabled='disabled'><option/></select>";
                    var input = document.createElement("input");
                    input.setAttribute("type", "hidden");
                    el.appendChild(input).setAttribute("name", "D");
                    if (el.querySelectorAll("[name=d]").length) {
                        rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
                    }
                    if (el.querySelectorAll(":enabled").length !== 2) {
                        rbuggyQSA.push(":enabled", ":disabled");
                    }
                    docElem.appendChild(el).disabled = true;
                    if (el.querySelectorAll(":disabled").length !== 2) {
                        rbuggyQSA.push(":enabled", ":disabled");
                    }
                    el.querySelectorAll("*,:x");
                    rbuggyQSA.push(",.*:");
                });
            }
            if ((support.matchesSelector = rnative.test((matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)))) {
                assert(function(el) {
                    support.disconnectedMatch = matches.call(el, "*");
                    matches.call(el, "[s!='']:x");
                    rbuggyMatches.push("!=", pseudos);
                });
            }
            rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
            rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
            hasCompare = rnative.test(docElem.compareDocumentPosition);
            contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                var adown = a.nodeType === 9 ? a.documentElement : a
                  , bup = b && b.parentNode;
                return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
            }
            : function(a, b) {
                if (b) {
                    while ((b = b.parentNode)) {
                        if (b === a) {
                            return true;
                        }
                    }
                }
                return false;
            }
            ;
            sortOrder = hasCompare ? function(a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }
                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                if (compare) {
                    return compare;
                }
                compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
                if (compare & 1 || (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
                    if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
                        return -1;
                    }
                    if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
                        return 1;
                    }
                    return sortInput ? (indexOf(sortInput, a) - indexOf(sortInput, b)) : 0;
                }
                return compare & 4 ? -1 : 1;
            }
            : function(a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }
                var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [a], bp = [b];
                if (!aup || !bup) {
                    return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? (indexOf(sortInput, a) - indexOf(sortInput, b)) : 0;
                } else if (aup === bup) {
                    return siblingCheck(a, b);
                }
                cur = a;
                while ((cur = cur.parentNode)) {
                    ap.unshift(cur);
                }
                cur = b;
                while ((cur = cur.parentNode)) {
                    bp.unshift(cur);
                }
                while (ap[i] === bp[i]) {
                    i++;
                }
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
            }
            ;
            return document;
        }
        ;
        Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements);
        }
        ;
        Sizzle.matchesSelector = function(elem, expr) {
            if ((elem.ownerDocument || elem) !== document) {
                setDocument(elem);
            }
            expr = expr.replace(rattributeQuotes, "='$1']");
            if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
                try {
                    var ret = matches.call(elem, expr);
                    if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
                        return ret;
                    }
                } catch (e) {}
            }
            return Sizzle(expr, document, null, [elem]).length > 0;
        }
        ;
        Sizzle.contains = function(context, elem) {
            if ((context.ownerDocument || context) !== document) {
                setDocument(context);
            }
            return contains(context, elem);
        }
        ;
        Sizzle.attr = function(elem, name) {
            if ((elem.ownerDocument || elem) !== document) {
                setDocument(elem);
            }
            var fn = Expr.attrHandle[name.toLowerCase()]
              , val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
            return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }
        ;
        Sizzle.escape = function(sel) {
            return (sel + "").replace(rcssescape, fcssescape);
        }
        ;
        Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        }
        ;
        Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [], j = 0, i = 0;
            hasDuplicate = !support.detectDuplicates;
            sortInput = !support.sortStable && results.slice(0);
            results.sort(sortOrder);
            if (hasDuplicate) {
                while ((elem = results[i++])) {
                    if (elem === results[i]) {
                        j = duplicates.push(i);
                    }
                }
                while (j--) {
                    results.splice(duplicates[j], 1);
                }
            }
            sortInput = null;
            return results;
        }
        ;
        getText = Sizzle.getText = function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (!nodeType) {
                while ((node = elem[i++])) {
                    ret += getText(node);
                }
            } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                if (typeof elem.textContent === "string") {
                    return elem.textContent;
                } else {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                        ret += getText(elem);
                    }
                }
            } else if (nodeType === 3 || nodeType === 4) {
                return elem.nodeValue;
            }
            return ret;
        }
        ;
        Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: true
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: true
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                "ATTR": function(match) {
                    match[1] = match[1].replace(runescape, funescape);
                    match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
                    if (match[2] === "~=") {
                        match[3] = " " + match[3] + " ";
                    }
                    return match.slice(0, 4);
                },
                "CHILD": function(match) {
                    match[1] = match[1].toLowerCase();
                    if (match[1].slice(0, 3) === "nth") {
                        if (!match[3]) {
                            Sizzle.error(match[0]);
                        }
                        match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                        match[5] = +((match[7] + match[8]) || match[3] === "odd");
                    } else if (match[3]) {
                        Sizzle.error(match[0]);
                    }
                    return match;
                },
                "PSEUDO": function(match) {
                    var excess, unquoted = !match[6] && match[2];
                    if (matchExpr["CHILD"].test(match[0])) {
                        return null;
                    }
                    if (match[3]) {
                        match[2] = match[4] || match[5] || "";
                    } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                        match[0] = match[0].slice(0, excess);
                        match[2] = unquoted.slice(0, excess);
                    }
                    return match.slice(0, 3);
                }
            },
            filter: {
                "TAG": function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return nodeNameSelector === "*" ? function() {
                        return true;
                    }
                    : function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    }
                    ;
                },
                "CLASS": function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
                    });
                },
                "ATTR": function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        if (result == null) {
                            return operator === "!=";
                        }
                        if (!operator) {
                            return true;
                        }
                        result += "";
                        return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
                    }
                    ;
                },
                "CHILD": function(type, what, argument, first, last) {
                    var simple = type.slice(0, 3) !== "nth"
                      , forward = type.slice(-4) !== "last"
                      , ofType = what === "of-type";
                    return first === 1 && last === 0 ? function(elem) {
                        return !!elem.parentNode;
                    }
                    : function(elem, context, xml) {
                        var cache, uniqueCache, outerCache, node, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = false;
                        if (parent) {
                            if (simple) {
                                while (dir) {
                                    node = elem;
                                    while ((node = node[dir])) {
                                        if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                                            return false;
                                        }
                                    }
                                    start = dir = type === "only" && !start && "nextSibling";
                                }
                                return true;
                            }
                            start = [forward ? parent.firstChild : parent.lastChild];
                            if (forward && useCache) {
                                node = parent;
                                outerCache = node[expando] || (node[expando] = {});
                                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                                cache = uniqueCache[type] || [];
                                nodeIndex = cache[0] === dirruns && cache[1];
                                diff = nodeIndex && cache[2];
                                node = nodeIndex && parent.childNodes[nodeIndex];
                                while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                                    if (node.nodeType === 1 && ++diff && node === elem) {
                                        uniqueCache[type] = [dirruns, nodeIndex, diff];
                                        break;
                                    }
                                }
                            } else {
                                if (useCache) {
                                    node = elem;
                                    outerCache = node[expando] || (node[expando] = {});
                                    uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                                    cache = uniqueCache[type] || [];
                                    nodeIndex = cache[0] === dirruns && cache[1];
                                    diff = nodeIndex;
                                }
                                if (diff === false) {
                                    while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                                        if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                                            if (useCache) {
                                                outerCache = node[expando] || (node[expando] = {});
                                                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                                                uniqueCache[type] = [dirruns, diff];
                                            }
                                            if (node === elem) {
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            diff -= last;
                            return diff === first || (diff % first === 0 && diff / first >= 0);
                        }
                    }
                    ;
                },
                "PSEUDO": function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    if (fn[expando]) {
                        return fn(argument);
                    }
                    if (fn.length > 1) {
                        args = [pseudo, pseudo, "", argument];
                        return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                            var idx, matched = fn(seed, argument), i = matched.length;
                            while (i--) {
                                idx = indexOf(seed, matched[i]);
                                seed[idx] = !(matches[idx] = matched[i]);
                            }
                        }) : function(elem) {
                            return fn(elem, 0, args);
                        }
                        ;
                    }
                    return fn;
                }
            },
            pseudos: {
                "not": markFunction(function(selector) {
                    var input = []
                      , results = []
                      , matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        var elem, unmatched = matcher(seed, null, xml, []), i = seed.length;
                        while (i--) {
                            if ((elem = unmatched[i])) {
                                seed[i] = !(matches[i] = elem);
                            }
                        }
                    }) : function(elem, context, xml) {
                        input[0] = elem;
                        matcher(input, null, xml, results);
                        input[0] = null;
                        return !results.pop();
                    }
                    ;
                }),
                "has": markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0;
                    }
                    ;
                }),
                "contains": markFunction(function(text) {
                    text = text.replace(runescape, funescape);
                    return function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                    }
                    ;
                }),
                "lang": markFunction(function(lang) {
                    if (!ridentifier.test(lang || "")) {
                        Sizzle.error("unsupported lang: " + lang);
                    }
                    lang = lang.replace(runescape, funescape).toLowerCase();
                    return function(elem) {
                        var elemLang;
                        do {
                            if ((elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {
                                elemLang = elemLang.toLowerCase();
                                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                            }
                        } while ((elem = elem.parentNode) && elem.nodeType === 1);return false;
                    }
                    ;
                }),
                "target": function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                },
                "root": function(elem) {
                    return elem === docElem;
                },
                "focus": function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },
                "enabled": createDisabledPseudo(false),
                "disabled": createDisabledPseudo(true),
                "checked": function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                },
                "selected": function(elem) {
                    if (elem.parentNode) {
                        elem.parentNode.selectedIndex;
                    }
                    return elem.selected === true;
                },
                "empty": function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                        if (elem.nodeType < 6) {
                            return false;
                        }
                    }
                    return true;
                },
                "parent": function(elem) {
                    return !Expr.pseudos["empty"](elem);
                },
                "header": function(elem) {
                    return rheader.test(elem.nodeName);
                },
                "input": function(elem) {
                    return rinputs.test(elem.nodeName);
                },
                "button": function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === "button" || name === "button";
                },
                "text": function(elem) {
                    var attr;
                    return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
                },
                "first": createPositionalPseudo(function() {
                    return [0];
                }),
                "last": createPositionalPseudo(function(matchIndexes, length) {
                    return [length - 1];
                }),
                "eq": createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [argument < 0 ? argument + length : argument];
                }),
                "even": createPositionalPseudo(function(matchIndexes, length) {
                    var i = 0;
                    for (; i < length; i += 2) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                "odd": createPositionalPseudo(function(matchIndexes, length) {
                    var i = 1;
                    for (; i < length; i += 2) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (; --i >= 0; ) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (; ++i < length; ) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                })
            }
        };
        Expr.pseudos["nth"] = Expr.pseudos["eq"];
        for (i in {
            radio: true,
            checkbox: true,
            file: true,
            password: true,
            image: true
        }) {
            Expr.pseudos[i] = createInputPseudo(i);
        }
        for (i in {
            submit: true,
            reset: true
        }) {
            Expr.pseudos[i] = createButtonPseudo(i);
        }
        function setFilters() {}
        setFilters.prototype = Expr.filters = Expr.pseudos;
        Expr.setFilters = new setFilters();
        tokenize = Sizzle.tokenize = function(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) {
                return parseOnly ? 0 : cached.slice(0);
            }
            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;
            while (soFar) {
                if (!matched || (match = rcomma.exec(soFar))) {
                    if (match) {
                        soFar = soFar.slice(match[0].length) || soFar;
                    }
                    groups.push((tokens = []));
                }
                matched = false;
                if ((match = rcombinators.exec(soFar))) {
                    matched = match.shift();
                    tokens.push({
                        value: matched,
                        type: match[0].replace(rtrim, " ")
                    });
                    soFar = soFar.slice(matched.length);
                }
                for (type in Expr.filter) {
                    if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            type: type,
                            matches: match
                        });
                        soFar = soFar.slice(matched.length);
                    }
                }
                if (!matched) {
                    break;
                }
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
        }
        ;
        function toSelector(tokens) {
            var i = 0
              , len = tokens.length
              , selector = "";
            for (; i < len; i++) {
                selector += tokens[i].value;
            }
            return selector;
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir
              , skip = combinator.next
              , key = skip || dir
              , checkNonElements = base && key === "parentNode"
              , doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                while ((elem = elem[dir])) {
                    if (elem.nodeType === 1 || checkNonElements) {
                        return matcher(elem, context, xml);
                    }
                }
                return false;
            }
            : function(elem, context, xml) {
                var oldCache, uniqueCache, outerCache, newCache = [dirruns, doneName];
                if (xml) {
                    while ((elem = elem[dir])) {
                        if (elem.nodeType === 1 || checkNonElements) {
                            if (matcher(elem, context, xml)) {
                                return true;
                            }
                        }
                    }
                } else {
                    while ((elem = elem[dir])) {
                        if (elem.nodeType === 1 || checkNonElements) {
                            outerCache = elem[expando] || (elem[expando] = {});
                            uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
                            if (skip && skip === elem.nodeName.toLowerCase()) {
                                elem = elem[dir] || elem;
                            } else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                                return (newCache[2] = oldCache[2]);
                            } else {
                                uniqueCache[key] = newCache;
                                if ((newCache[2] = matcher(elem, context, xml))) {
                                    return true;
                                }
                            }
                        }
                    }
                }
                return false;
            }
            ;
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                var i = matchers.length;
                while (i--) {
                    if (!matchers[i](elem, context, xml)) {
                        return false;
                    }
                }
                return true;
            }
            : matchers[0];
        }
        function multipleContexts(selector, contexts, results) {
            var i = 0
              , len = contexts.length;
            for (; i < len; i++) {
                Sizzle(selector, contexts[i], results);
            }
            return results;
        }
        function condense(unmatched, map, filter, context, xml) {
            var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = map != null;
            for (; i < len; i++) {
                if ((elem = unmatched[i])) {
                    if (!filter || filter(elem, context, xml)) {
                        newUnmatched.push(elem);
                        if (mapped) {
                            map.push(i);
                        }
                    }
                }
            }
            return newUnmatched;
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            if (postFilter && !postFilter[expando]) {
                postFilter = setMatcher(postFilter);
            }
            if (postFinder && !postFinder[expando]) {
                postFinder = setMatcher(postFinder, postSelector);
            }
            return markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems, matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher) {
                    matcher(matcherIn, matcherOut, context, xml);
                }
                if (postFilter) {
                    temp = condense(matcherOut, postMap);
                    postFilter(temp, [], context, xml);
                    i = temp.length;
                    while (i--) {
                        if ((elem = temp[i])) {
                            matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                        }
                    }
                }
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            temp = [];
                            i = matcherOut.length;
                            while (i--) {
                                if ((elem = matcherOut[i])) {
                                    temp.push((matcherIn[i] = elem));
                                }
                            }
                            postFinder(null, (matcherOut = []), temp, xml);
                        }
                        i = matcherOut.length;
                        while (i--) {
                            if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                                seed[temp] = !(results[temp] = elem);
                            }
                        }
                    }
                } else {
                    matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
                    if (postFinder) {
                        postFinder(null, results, matcherOut, xml);
                    } else {
                        push.apply(results, matcherOut);
                    }
                }
            });
        }
        function matcherFromTokens(tokens) {
            var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                return elem === checkContext;
            }, implicitRelative, true), matchAnyContext = addCombinator(function(elem) {
                return indexOf(checkContext, elem) > -1;
            }, implicitRelative, true), matchers = [function(elem, context, xml) {
                var ret = (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                checkContext = null;
                return ret;
            }
            ];
            for (; i < len; i++) {
                if ((matcher = Expr.relative[tokens[i].type])) {
                    matchers = [addCombinator(elementMatcher(matchers), matcher)];
                } else {
                    matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
                    if (matcher[expando]) {
                        j = ++i;
                        for (; j < len; j++) {
                            if (Expr.relative[tokens[j].type]) {
                                break;
                            }
                        }
                        return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                            value: tokens[i - 2].type === " " ? "*" : ""
                        })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens));
                    }
                    matchers.push(matcher);
                }
            }
            return elementMatcher(matchers);
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0
              , byElement = elementMatchers.length > 0
              , superMatcher = function(seed, context, xml, results, outermost) {
                var elem, j, matcher, matchedCount = 0, i = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find["TAG"]("*", outermost), dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1), len = elems.length;
                if (outermost) {
                    outermostContext = context === document || context || outermost;
                }
                for (; i !== len && (elem = elems[i]) != null; i++) {
                    if (byElement && elem) {
                        j = 0;
                        if (!context && elem.ownerDocument !== document) {
                            setDocument(elem);
                            xml = !documentIsHTML;
                        }
                        while ((matcher = elementMatchers[j++])) {
                            if (matcher(elem, context || document, xml)) {
                                results.push(elem);
                                break;
                            }
                        }
                        if (outermost) {
                            dirruns = dirrunsUnique;
                        }
                    }
                    if (bySet) {
                        if ((elem = !matcher && elem)) {
                            matchedCount--;
                        }
                        if (seed) {
                            unmatched.push(elem);
                        }
                    }
                }
                matchedCount += i;
                if (bySet && i !== matchedCount) {
                    j = 0;
                    while ((matcher = setMatchers[j++])) {
                        matcher(unmatched, setMatched, context, xml);
                    }
                    if (seed) {
                        if (matchedCount > 0) {
                            while (i--) {
                                if (!(unmatched[i] || setMatched[i])) {
                                    setMatched[i] = pop.call(results);
                                }
                            }
                        }
                        setMatched = condense(setMatched);
                    }
                    push.apply(results, setMatched);
                    if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) {
                        Sizzle.uniqueSort(results);
                    }
                }
                if (outermost) {
                    dirruns = dirrunsUnique;
                    outermostContext = contextBackup;
                }
                return unmatched;
            };
            return bySet ? markFunction(superMatcher) : superMatcher;
        }
        compile = Sizzle.compile = function(selector, match) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
                if (!match) {
                    match = tokenize(selector);
                }
                i = match.length;
                while (i--) {
                    cached = matcherFromTokens(match[i]);
                    if (cached[expando]) {
                        setMatchers.push(cached);
                    } else {
                        elementMatchers.push(cached);
                    }
                }
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
                cached.selector = selector;
            }
            return cached;
        }
        ;
        select = Sizzle.select = function(selector, context, results, seed) {
            var i, tokens, token, type, find, compiled = typeof selector === "function" && selector, match = !seed && tokenize((selector = compiled.selector || selector));
            results = results || [];
            if (match.length === 1) {
                tokens = match[0] = match[0].slice(0);
                if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                    context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
                    if (!context) {
                        return results;
                    } else if (compiled) {
                        context = context.parentNode;
                    }
                    selector = selector.slice(tokens.shift().value.length);
                }
                i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
                while (i--) {
                    token = tokens[i];
                    if (Expr.relative[(type = token.type)]) {
                        break;
                    }
                    if ((find = Expr.find[type])) {
                        if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                            tokens.splice(i, 1);
                            selector = seed.length && toSelector(tokens);
                            if (!selector) {
                                push.apply(results, seed);
                                return results;
                            }
                            break;
                        }
                    }
                }
            }
            (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
            return results;
        }
        ;
        support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
        support.detectDuplicates = !!hasDuplicate;
        setDocument();
        support.sortDetached = assert(function(el) {
            return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
        });
        if (!assert(function(el) {
            el.innerHTML = "<a href='#'></a>";
            return el.firstChild.getAttribute("href") === "#";
        })) {
            addHandle("type|href|height|width", function(elem, name, isXML) {
                if (!isXML) {
                    return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
                }
            });
        }
        if (!support.attributes || !assert(function(el) {
            el.innerHTML = "<input/>";
            el.firstChild.setAttribute("value", "");
            return el.firstChild.getAttribute("value") === "";
        })) {
            addHandle("value", function(elem, name, isXML) {
                if (!isXML && elem.nodeName.toLowerCase() === "input") {
                    return elem.defaultValue;
                }
            });
        }
        if (!assert(function(el) {
            return el.getAttribute("disabled") == null;
        })) {
            addHandle(booleans, function(elem, name, isXML) {
                var val;
                if (!isXML) {
                    return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
                }
            });
        }
        return Sizzle;
    }
    )(window);
    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[":"] = jQuery.expr.pseudos;
    jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
    jQuery.escapeSelector = Sizzle.escape;
    var dir = function(elem, dir, until) {
        var matched = []
          , truncate = until !== undefined;
        while ((elem = elem[dir]) && elem.nodeType !== 9) {
            if (elem.nodeType === 1) {
                if (truncate && jQuery(elem).is(until)) {
                    break;
                }
                matched.push(elem);
            }
        }
        return matched;
    };
    var siblings = function(n, elem) {
        var matched = [];
        for (; n; n = n.nextSibling) {
            if (n.nodeType === 1 && n !== elem) {
                matched.push(n);
            }
        }
        return matched;
    };
    var rneedsContext = jQuery.expr.match.needsContext;
    function nodeName(elem, name) {
        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    }
    ;var rsingleTag = (/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i);
    var risSimple = /^.[^:#\[\.,]*$/;
    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) {
            return jQuery.grep(elements, function(elem, i) {
                return !!qualifier.call(elem, i, elem) !== not;
            });
        }
        if (qualifier.nodeType) {
            return jQuery.grep(elements, function(elem) {
                return (elem === qualifier) !== not;
            });
        }
        if (typeof qualifier !== "string") {
            return jQuery.grep(elements, function(elem) {
                return (indexOf.call(qualifier, elem) > -1) !== not;
            });
        }
        if (risSimple.test(qualifier)) {
            return jQuery.filter(qualifier, elements, not);
        }
        qualifier = jQuery.filter(qualifier, elements);
        return jQuery.grep(elements, function(elem) {
            return (indexOf.call(qualifier, elem) > -1) !== not && elem.nodeType === 1;
        });
    }
    jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];
        if (not) {
            expr = ":not(" + expr + ")";
        }
        if (elems.length === 1 && elem.nodeType === 1) {
            return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
        }
        return jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
            return elem.nodeType === 1;
        }));
    }
    ;
    jQuery.fn.extend({
        find: function(selector) {
            var i, ret, len = this.length, self = this;
            if (typeof selector !== "string") {
                return this.pushStack(jQuery(selector).filter(function() {
                    for (i = 0; i < len; i++) {
                        if (jQuery.contains(self[i], this)) {
                            return true;
                        }
                    }
                }));
            }
            ret = this.pushStack([]);
            for (i = 0; i < len; i++) {
                jQuery.find(selector, self[i], ret);
            }
            return len > 1 ? jQuery.uniqueSort(ret) : ret;
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], false));
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], true));
        },
        is: function(selector) {
            return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
        }
    });
    var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, init = jQuery.fn.init = function(selector, context, root) {
        var match, elem;
        if (!selector) {
            return this;
        }
        root = root || rootjQuery;
        if (typeof selector === "string") {
            if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
                match = [null, selector, null];
            } else {
                match = rquickExpr.exec(selector);
            }
            if (match && (match[1] || !context)) {
                if (match[1]) {
                    context = context instanceof jQuery ? context[0] : context;
                    jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
                    if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                        for (match in context) {
                            if (jQuery.isFunction(this[match])) {
                                this[match](context[match]);
                            } else {
                                this.attr(match, context[match]);
                            }
                        }
                    }
                    return this;
                } else {
                    elem = document.getElementById(match[2]);
                    if (elem) {
                        this[0] = elem;
                        this.length = 1;
                    }
                    return this;
                }
            } else if (!context || context.jquery) {
                return (context || root).find(selector);
            } else {
                return this.constructor(context).find(selector);
            }
        } else if (selector.nodeType) {
            this[0] = selector;
            this.length = 1;
            return this;
        } else if (jQuery.isFunction(selector)) {
            return root.ready !== undefined ? root.ready(selector) : selector(jQuery);
        }
        return jQuery.makeArray(selector, this);
    }
    ;
    init.prototype = jQuery.fn;
    rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/
      , guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
    };
    jQuery.fn.extend({
        has: function(target) {
            var targets = jQuery(target, this)
              , l = targets.length;
            return this.filter(function() {
                var i = 0;
                for (; i < l; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true;
                    }
                }
            });
        },
        closest: function(selectors, context) {
            var cur, i = 0, l = this.length, matched = [], targets = typeof selectors !== "string" && jQuery(selectors);
            if (!rneedsContext.test(selectors)) {
                for (; i < l; i++) {
                    for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                        if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
                            matched.push(cur);
                            break;
                        }
                    }
                }
            }
            return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
        },
        index: function(elem) {
            if (!elem) {
                return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
            }
            if (typeof elem === "string") {
                return indexOf.call(jQuery(elem), this[0]);
            }
            return indexOf.call(this, elem.jquery ? elem[0] : elem);
        },
        add: function(selector, context) {
            return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
        },
        addBack: function(selector) {
            return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
        }
    });
    function sibling(cur, dir) {
        while ((cur = cur[dir]) && cur.nodeType !== 1) {}
        return cur;
    }
    jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function(elem) {
            return dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until) {
            return dir(elem, "parentNode", until);
        },
        next: function(elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
            return dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
            return dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until) {
            return dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until) {
            return dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
            return siblings((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
            return siblings(elem.firstChild);
        },
        contents: function(elem) {
            if (nodeName(elem, "iframe")) {
                return elem.contentDocument;
            }
            if (nodeName(elem, "template")) {
                elem = elem.content || elem;
            }
            return jQuery.merge([], elem.childNodes);
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var matched = jQuery.map(this, fn, until);
            if (name.slice(-5) !== "Until") {
                selector = until;
            }
            if (selector && typeof selector === "string") {
                matched = jQuery.filter(selector, matched);
            }
            if (this.length > 1) {
                if (!guaranteedUnique[name]) {
                    jQuery.uniqueSort(matched);
                }
                if (rparentsprev.test(name)) {
                    matched.reverse();
                }
            }
            return this.pushStack(matched);
        }
        ;
    });
    var rnothtmlwhite = (/[^\x20\t\r\n\f]+/g);
    function createOptions(options) {
        var object = {};
        jQuery.each(options.match(rnothtmlwhite) || [], function(_, flag) {
            object[flag] = true;
        });
        return object;
    }
    jQuery.Callbacks = function(options) {
        options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);
        var firing, memory, fired, locked, list = [], queue = [], firingIndex = -1, fire = function() {
            locked = locked || options.once;
            fired = firing = true;
            for (; queue.length; firingIndex = -1) {
                memory = queue.shift();
                while (++firingIndex < list.length) {
                    if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                        firingIndex = list.length;
                        memory = false;
                    }
                }
            }
            if (!options.memory) {
                memory = false;
            }
            firing = false;
            if (locked) {
                if (memory) {
                    list = [];
                } else {
                    list = "";
                }
            }
        }, self = {
            add: function() {
                if (list) {
                    if (memory && !firing) {
                        firingIndex = list.length - 1;
                        queue.push(memory);
                    }
                    (function add(args) {
                        jQuery.each(args, function(_, arg) {
                            if (jQuery.isFunction(arg)) {
                                if (!options.unique || !self.has(arg)) {
                                    list.push(arg);
                                }
                            } else if (arg && arg.length && jQuery.type(arg) !== "string") {
                                add(arg);
                            }
                        });
                    }
                    )(arguments);
                    if (memory && !firing) {
                        fire();
                    }
                }
                return this;
            },
            remove: function() {
                jQuery.each(arguments, function(_, arg) {
                    var index;
                    while ((index = jQuery.inArray(arg, list, index)) > -1) {
                        list.splice(index, 1);
                        if (index <= firingIndex) {
                            firingIndex--;
                        }
                    }
                });
                return this;
            },
            has: function(fn) {
                return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
            },
            empty: function() {
                if (list) {
                    list = [];
                }
                return this;
            },
            disable: function() {
                locked = queue = [];
                list = memory = "";
                return this;
            },
            disabled: function() {
                return !list;
            },
            lock: function() {
                locked = queue = [];
                if (!memory && !firing) {
                    list = memory = "";
                }
                return this;
            },
            locked: function() {
                return !!locked;
            },
            fireWith: function(context, args) {
                if (!locked) {
                    args = args || [];
                    args = [context, args.slice ? args.slice() : args];
                    queue.push(args);
                    if (!firing) {
                        fire();
                    }
                }
                return this;
            },
            fire: function() {
                self.fireWith(this, arguments);
                return this;
            },
            fired: function() {
                return !!fired;
            }
        };
        return self;
    }
    ;
    function Identity(v) {
        return v;
    }
    function Thrower(ex) {
        throw ex;
    }
    function adoptValue(value, resolve, reject, noValue) {
        var method;
        try {
            if (value && jQuery.isFunction((method = value.promise))) {
                method.call(value).done(resolve).fail(reject);
            } else if (value && jQuery.isFunction((method = value.then))) {
                method.call(value, resolve, reject);
            } else {
                resolve.apply(undefined, [value].slice(noValue));
            }
        } catch (value) {
            reject.apply(undefined, [value]);
        }
    }
    jQuery.extend({
        Deferred: function(func) {
            var tuples = [["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2], ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]]
              , state = "pending"
              , promise = {
                state: function() {
                    return state;
                },
                always: function() {
                    deferred.done(arguments).fail(arguments);
                    return this;
                },
                "catch": function(fn) {
                    return promise.then(null, fn);
                },
                pipe: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                            var fn = jQuery.isFunction(fns[tuple[4]]) && fns[tuple[4]];
                            deferred[tuple[1]](function() {
                                var returned = fn && fn.apply(this, arguments);
                                if (returned && jQuery.isFunction(returned.promise)) {
                                    returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                                } else {
                                    newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
                                }
                            });
                        });
                        fns = null;
                    }).promise();
                },
                then: function(onFulfilled, onRejected, onProgress) {
                    var maxDepth = 0;
                    function resolve(depth, deferred, handler, special) {
                        return function() {
                            var that = this
                              , args = arguments
                              , mightThrow = function() {
                                var returned, then;
                                if (depth < maxDepth) {
                                    return;
                                }
                                returned = handler.apply(that, args);
                                if (returned === deferred.promise()) {
                                    throw new TypeError("Thenable self-resolution");
                                }
                                then = returned && (typeof returned === "object" || typeof returned === "function") && returned.then;
                                if (jQuery.isFunction(then)) {
                                    if (special) {
                                        then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special));
                                    } else {
                                        maxDepth++;
                                        then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
                                    }
                                } else {
                                    if (handler !== Identity) {
                                        that = undefined;
                                        args = [returned];
                                    }
                                    (special || deferred.resolveWith)(that, args);
                                }
                            }
                              , process = special ? mightThrow : function() {
                                try {
                                    mightThrow();
                                } catch (e) {
                                    if (jQuery.Deferred.exceptionHook) {
                                        jQuery.Deferred.exceptionHook(e, process.stackTrace);
                                    }
                                    if (depth + 1 >= maxDepth) {
                                        if (handler !== Thrower) {
                                            that = undefined;
                                            args = [e];
                                        }
                                        deferred.rejectWith(that, args);
                                    }
                                }
                            }
                            ;
                            if (depth) {
                                process();
                            } else {
                                if (jQuery.Deferred.getStackHook) {
                                    process.stackTrace = jQuery.Deferred.getStackHook();
                                }
                                window.setTimeout(process);
                            }
                        }
                        ;
                    }
                    return jQuery.Deferred(function(newDefer) {
                        tuples[0][3].add(resolve(0, newDefer, jQuery.isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith));
                        tuples[1][3].add(resolve(0, newDefer, jQuery.isFunction(onFulfilled) ? onFulfilled : Identity));
                        tuples[2][3].add(resolve(0, newDefer, jQuery.isFunction(onRejected) ? onRejected : Thrower));
                    }).promise();
                },
                promise: function(obj) {
                    return obj != null ? jQuery.extend(obj, promise) : promise;
                }
            }
              , deferred = {};
            jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2]
                  , stateString = tuple[5];
                promise[tuple[1]] = list.add;
                if (stateString) {
                    list.add(function() {
                        state = stateString;
                    }, tuples[3 - i][2].disable, tuples[0][2].lock);
                }
                list.add(tuple[3].fire);
                deferred[tuple[0]] = function() {
                    deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
                    return this;
                }
                ;
                deferred[tuple[0] + "With"] = list.fireWith;
            });
            promise.promise(deferred);
            if (func) {
                func.call(deferred, deferred);
            }
            return deferred;
        },
        when: function(singleValue) {
            var remaining = arguments.length
              , i = remaining
              , resolveContexts = Array(i)
              , resolveValues = slice.call(arguments)
              , master = jQuery.Deferred()
              , updateFunc = function(i) {
                return function(value) {
                    resolveContexts[i] = this;
                    resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value;
                    if (!(--remaining)) {
                        master.resolveWith(resolveContexts, resolveValues);
                    }
                }
                ;
            };
            if (remaining <= 1) {
                adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject, !remaining);
                if (master.state() === "pending" || jQuery.isFunction(resolveValues[i] && resolveValues[i].then)) {
                    return master.then();
                }
            }
            while (i--) {
                adoptValue(resolveValues[i], updateFunc(i), master.reject);
            }
            return master.promise();
        }
    });
    var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    jQuery.Deferred.exceptionHook = function(error, stack) {
        if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
            window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
        }
    }
    ;
    jQuery.readyException = function(error) {
        window.setTimeout(function() {
            throw error;
        });
    }
    ;
    var readyList = jQuery.Deferred();
    jQuery.fn.ready = function(fn) {
        readyList.then(fn).catch(function(error) {
            jQuery.readyException(error);
        });
        return this;
    }
    ;
    jQuery.extend({
        isReady: false,
        readyWait: 1,
        ready: function(wait) {
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                return;
            }
            jQuery.isReady = true;
            if (wait !== true && --jQuery.readyWait > 0) {
                return;
            }
            readyList.resolveWith(document, [jQuery]);
        }
    });
    jQuery.ready.then = readyList.then;
    function completed() {
        document.removeEventListener("DOMContentLoaded", completed);
        window.removeEventListener("load", completed);
        jQuery.ready();
    }
    if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
        window.setTimeout(jQuery.ready);
    } else {
        document.addEventListener("DOMContentLoaded", completed);
        window.addEventListener("load", completed);
    }
    var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0
          , len = elems.length
          , bulk = key == null;
        if (jQuery.type(key) === "object") {
            chainable = true;
            for (i in key) {
                access(elems, fn, i, key[i], true, emptyGet, raw);
            }
        } else if (value !== undefined) {
            chainable = true;
            if (!jQuery.isFunction(value)) {
                raw = true;
            }
            if (bulk) {
                if (raw) {
                    fn.call(elems, value);
                    fn = null;
                } else {
                    bulk = fn;
                    fn = function(elem, key, value) {
                        return bulk.call(jQuery(elem), value);
                    }
                    ;
                }
            }
            if (fn) {
                for (; i < len; i++) {
                    fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
                }
            }
        }
        if (chainable) {
            return elems;
        }
        if (bulk) {
            return fn.call(elems);
        }
        return len ? fn(elems[0], key) : emptyGet;
    };
    var acceptData = function(owner) {
        return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
    };
    function Data() {
        this.expando = jQuery.expando + Data.uid++;
    }
    Data.uid = 1;
    Data.prototype = {
        cache: function(owner) {
            var value = owner[this.expando];
            if (!value) {
                value = {};
                if (acceptData(owner)) {
                    if (owner.nodeType) {
                        owner[this.expando] = value;
                    } else {
                        Object.defineProperty(owner, this.expando, {
                            value: value,
                            configurable: true
                        });
                    }
                }
            }
            return value;
        },
        set: function(owner, data, value) {
            var prop, cache = this.cache(owner);
            if (typeof data === "string") {
                cache[jQuery.camelCase(data)] = value;
            } else {
                for (prop in data) {
                    cache[jQuery.camelCase(prop)] = data[prop];
                }
            }
            return cache;
        },
        get: function(owner, key) {
            return key === undefined ? this.cache(owner) : owner[this.expando] && owner[this.expando][jQuery.camelCase(key)];
        },
        access: function(owner, key, value) {
            if (key === undefined || ((key && typeof key === "string") && value === undefined)) {
                return this.get(owner, key);
            }
            this.set(owner, key, value);
            return value !== undefined ? value : key;
        },
        remove: function(owner, key) {
            var i, cache = owner[this.expando];
            if (cache === undefined) {
                return;
            }
            if (key !== undefined) {
                if (Array.isArray(key)) {
                    key = key.map(jQuery.camelCase);
                } else {
                    key = jQuery.camelCase(key);
                    key = key in cache ? [key] : (key.match(rnothtmlwhite) || []);
                }
                i = key.length;
                while (i--) {
                    delete cache[key[i]];
                }
            }
            if (key === undefined || jQuery.isEmptyObject(cache)) {
                if (owner.nodeType) {
                    owner[this.expando] = undefined;
                } else {
                    delete owner[this.expando];
                }
            }
        },
        hasData: function(owner) {
            var cache = owner[this.expando];
            return cache !== undefined && !jQuery.isEmptyObject(cache);
        }
    };
    var dataPriv = new Data();
    var dataUser = new Data();
    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
      , rmultiDash = /[A-Z]/g;
    function getData(data) {
        if (data === "true") {
            return true;
        }
        if (data === "false") {
            return false;
        }
        if (data === "null") {
            return null;
        }
        if (data === +data + "") {
            return +data;
        }
        if (rbrace.test(data)) {
            return JSON.parse(data);
        }
        return data;
    }
    function dataAttr(elem, key, data) {
        var name;
        if (data === undefined && elem.nodeType === 1) {
            name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
            data = elem.getAttribute(name);
            if (typeof data === "string") {
                try {
                    data = getData(data);
                } catch (e) {}
                dataUser.set(elem, key, data);
            } else {
                data = undefined;
            }
        }
        return data;
    }
    jQuery.extend({
        hasData: function(elem) {
            return dataUser.hasData(elem) || dataPriv.hasData(elem);
        },
        data: function(elem, name, data) {
            return dataUser.access(elem, name, data);
        },
        removeData: function(elem, name) {
            dataUser.remove(elem, name);
        },
        _data: function(elem, name, data) {
            return dataPriv.access(elem, name, data);
        },
        _removeData: function(elem, name) {
            dataPriv.remove(elem, name);
        }
    });
    jQuery.fn.extend({
        data: function(key, value) {
            var i, name, data, elem = this[0], attrs = elem && elem.attributes;
            if (key === undefined) {
                if (this.length) {
                    data = dataUser.get(elem);
                    if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
                        i = attrs.length;
                        while (i--) {
                            if (attrs[i]) {
                                name = attrs[i].name;
                                if (name.indexOf("data-") === 0) {
                                    name = jQuery.camelCase(name.slice(5));
                                    dataAttr(elem, name, data[name]);
                                }
                            }
                        }
                        dataPriv.set(elem, "hasDataAttrs", true);
                    }
                }
                return data;
            }
            if (typeof key === "object") {
                return this.each(function() {
                    dataUser.set(this, key);
                });
            }
            return access(this, function(value) {
                var data;
                if (elem && value === undefined) {
                    data = dataUser.get(elem, key);
                    if (data !== undefined) {
                        return data;
                    }
                    data = dataAttr(elem, key);
                    if (data !== undefined) {
                        return data;
                    }
                    return;
                }
                this.each(function() {
                    dataUser.set(this, key, value);
                });
            }, null, value, arguments.length > 1, null, true);
        },
        removeData: function(key) {
            return this.each(function() {
                dataUser.remove(this, key);
            });
        }
    });
    jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            if (elem) {
                type = (type || "fx") + "queue";
                queue = dataPriv.get(elem, type);
                if (data) {
                    if (!queue || Array.isArray(data)) {
                        queue = dataPriv.access(elem, type, jQuery.makeArray(data));
                    } else {
                        queue.push(data);
                    }
                }
                return queue || [];
            }
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type)
              , startLength = queue.length
              , fn = queue.shift()
              , hooks = jQuery._queueHooks(elem, type)
              , next = function() {
                jQuery.dequeue(elem, type);
            };
            if (fn === "inprogress") {
                fn = queue.shift();
                startLength--;
            }
            if (fn) {
                if (type === "fx") {
                    queue.unshift("inprogress");
                }
                delete hooks.stop;
                fn.call(elem, next, hooks);
            }
            if (!startLength && hooks) {
                hooks.empty.fire();
            }
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    dataPriv.remove(elem, [type + "queue", key]);
                })
            });
        }
    });
    jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--;
            }
            if (arguments.length < setter) {
                return jQuery.queue(this[0], type);
            }
            return data === undefined ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type);
                if (type === "fx" && queue[0] !== "inprogress") {
                    jQuery.dequeue(this, type);
                }
            });
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type);
            });
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", []);
        },
        promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                if (!(--count)) {
                    defer.resolveWith(elements, [elements]);
                }
            };
            if (typeof type !== "string") {
                obj = type;
                type = undefined;
            }
            type = type || "fx";
            while (i--) {
                tmp = dataPriv.get(elements[i], type + "queueHooks");
                if (tmp && tmp.empty) {
                    count++;
                    tmp.empty.add(resolve);
                }
            }
            resolve();
            return defer.promise(obj);
        }
    });
    var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
    var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$","i");
    var cssExpand = ["Top", "Right", "Bottom", "Left"];
    var isHiddenWithinTree = function(elem, el) {
        elem = el || elem;
        return elem.style.display === "none" || elem.style.display === "" && jQuery.contains(elem.ownerDocument, elem) && jQuery.css(elem, "display") === "none";
    };
    var swap = function(elem, options, callback, args) {
        var ret, name, old = {};
        for (name in options) {
            old[name] = elem.style[name];
            elem.style[name] = options[name];
        }
        ret = callback.apply(elem, args || []);
        for (name in options) {
            elem.style[name] = old[name];
        }
        return ret;
    };
    function adjustCSS(elem, prop, valueParts, tween) {
        var adjusted, scale = 1, maxIterations = 20, currentValue = tween ? function() {
            return tween.cur();
        }
        : function() {
            return jQuery.css(elem, prop, "");
        }
        , initial = currentValue(), unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"), initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));
        if (initialInUnit && initialInUnit[3] !== unit) {
            unit = unit || initialInUnit[3];
            valueParts = valueParts || [];
            initialInUnit = +initial || 1;
            do {
                scale = scale || ".5";
                initialInUnit = initialInUnit / scale;
                jQuery.style(elem, prop, initialInUnit + unit);
            } while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
        }
        if (valueParts) {
            initialInUnit = +initialInUnit || +initial || 0;
            adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
            if (tween) {
                tween.unit = unit;
                tween.start = initialInUnit;
                tween.end = adjusted;
            }
        }
        return adjusted;
    }
    var defaultDisplayMap = {};
    function getDefaultDisplay(elem) {
        var temp, doc = elem.ownerDocument, nodeName = elem.nodeName, display = defaultDisplayMap[nodeName];
        if (display) {
            return display;
        }
        temp = doc.body.appendChild(doc.createElement(nodeName));
        display = jQuery.css(temp, "display");
        temp.parentNode.removeChild(temp);
        if (display === "none") {
            display = "block";
        }
        defaultDisplayMap[nodeName] = display;
        return display;
    }
    function showHide(elements, show) {
        var display, elem, values = [], index = 0, length = elements.length;
        for (; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }
            display = elem.style.display;
            if (show) {
                if (display === "none") {
                    values[index] = dataPriv.get(elem, "display") || null;
                    if (!values[index]) {
                        elem.style.display = "";
                    }
                }
                if (elem.style.display === "" && isHiddenWithinTree(elem)) {
                    values[index] = getDefaultDisplay(elem);
                }
            } else {
                if (display !== "none") {
                    values[index] = "none";
                    dataPriv.set(elem, "display", display);
                }
            }
        }
        for (index = 0; index < length; index++) {
            if (values[index] != null) {
                elements[index].style.display = values[index];
            }
        }
        return elements;
    }
    jQuery.fn.extend({
        show: function() {
            return showHide(this, true);
        },
        hide: function() {
            return showHide(this);
        },
        toggle: function(state) {
            if (typeof state === "boolean") {
                return state ? this.show() : this.hide();
            }
            return this.each(function() {
                if (isHiddenWithinTree(this)) {
                    jQuery(this).show();
                } else {
                    jQuery(this).hide();
                }
            });
        }
    });
    var rcheckableType = (/^(?:checkbox|radio)$/i);
    var rtagName = (/<([a-z][^\/\0>\x20\t\r\n\f]+)/i);
    var rscriptType = (/^$|\/(?:java|ecma)script/i);
    var wrapMap = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    function getAll(context, tag) {
        var ret;
        if (typeof context.getElementsByTagName !== "undefined") {
            ret = context.getElementsByTagName(tag || "*");
        } else if (typeof context.querySelectorAll !== "undefined") {
            ret = context.querySelectorAll(tag || "*");
        } else {
            ret = [];
        }
        if (tag === undefined || tag && nodeName(context, tag)) {
            return jQuery.merge([context], ret);
        }
        return ret;
    }
    function setGlobalEval(elems, refElements) {
        var i = 0
          , l = elems.length;
        for (; i < l; i++) {
            dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
        }
    }
    var rhtml = /<|&#?\w+;/;
    function buildFragment(elems, context, scripts, selection, ignored) {
        var elem, tmp, tag, wrap, contains, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length;
        for (; i < l; i++) {
            elem = elems[i];
            if (elem || elem === 0) {
                if (jQuery.type(elem) === "object") {
                    jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
                } else if (!rhtml.test(elem)) {
                    nodes.push(context.createTextNode(elem));
                } else {
                    tmp = tmp || fragment.appendChild(context.createElement("div"));
                    tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                    wrap = wrapMap[tag] || wrapMap._default;
                    tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
                    j = wrap[0];
                    while (j--) {
                        tmp = tmp.lastChild;
                    }
                    jQuery.merge(nodes, tmp.childNodes);
                    tmp = fragment.firstChild;
                    tmp.textContent = "";
                }
            }
        }
        fragment.textContent = "";
        i = 0;
        while ((elem = nodes[i++])) {
            if (selection && jQuery.inArray(elem, selection) > -1) {
                if (ignored) {
                    ignored.push(elem);
                }
                continue;
            }
            contains = jQuery.contains(elem.ownerDocument, elem);
            tmp = getAll(fragment.appendChild(elem), "script");
            if (contains) {
                setGlobalEval(tmp);
            }
            if (scripts) {
                j = 0;
                while ((elem = tmp[j++])) {
                    if (rscriptType.test(elem.type || "")) {
                        scripts.push(elem);
                    }
                }
            }
        }
        return fragment;
    }
    (function() {
        var fragment = document.createDocumentFragment()
          , div = fragment.appendChild(document.createElement("div"))
          , input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("checked", "checked");
        input.setAttribute("name", "t");
        div.appendChild(input);
        support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
        div.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
    }
    )();
    var documentElement = document.documentElement;
    var rkeyEvent = /^key/
      , rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/
      , rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
    function returnTrue() {
        return true;
    }
    function returnFalse() {
        return false;
    }
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }
    function on(elem, types, selector, data, fn, one) {
        var origFn, type;
        if (typeof types === "object") {
            if (typeof selector !== "string") {
                data = data || selector;
                selector = undefined;
            }
            for (type in types) {
                on(elem, type, selector, data, types[type], one);
            }
            return elem;
        }
        if (data == null && fn == null) {
            fn = selector;
            data = selector = undefined;
        } else if (fn == null) {
            if (typeof selector === "string") {
                fn = data;
                data = undefined;
            } else {
                fn = data;
                data = selector;
                selector = undefined;
            }
        }
        if (fn === false) {
            fn = returnFalse;
        } else if (!fn) {
            return elem;
        }
        if (one === 1) {
            origFn = fn;
            fn = function(event) {
                jQuery().off(event);
                return origFn.apply(this, arguments);
            }
            ;
            fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
        }
        return elem.each(function() {
            jQuery.event.add(this, types, fn, data, selector);
        });
    }
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem);
            if (!elemData) {
                return;
            }
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }
            if (selector) {
                jQuery.find.matchesSelector(documentElement, selector);
            }
            if (!handler.guid) {
                handler.guid = jQuery.guid++;
            }
            if (!(events = elemData.events)) {
                events = elemData.events = {};
            }
            if (!(eventHandle = elemData.handle)) {
                eventHandle = elemData.handle = function(e) {
                    return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
                }
                ;
            }
            types = (types || "").match(rnothtmlwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();
                if (!type) {
                    continue;
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                special = jQuery.event.special[type] || {};
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn);
                if (!(handlers = events[type])) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;
                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle);
                        }
                    }
                }
                if (special.add) {
                    special.add.call(elem, handleObj);
                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid;
                    }
                }
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj);
                } else {
                    handlers.push(handleObj);
                }
                jQuery.event.global[type] = true;
            }
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
            if (!elemData || !(events = elemData.events)) {
                return;
            }
            types = (types || "").match(rnothtmlwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();
                if (!type) {
                    for (type in events) {
                        jQuery.event.remove(elem, type + types[t], handler, selector, true);
                    }
                    continue;
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                handlers = events[type] || [];
                tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
                origCount = j = handlers.length;
                while (j--) {
                    handleObj = handlers[j];
                    if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                        handlers.splice(j, 1);
                        if (handleObj.selector) {
                            handlers.delegateCount--;
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj);
                        }
                    }
                }
                if (origCount && !handlers.length) {
                    if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                        jQuery.removeEvent(elem, type, elemData.handle);
                    }
                    delete events[type];
                }
            }
            if (jQuery.isEmptyObject(events)) {
                dataPriv.remove(elem, "handle events");
            }
        },
        dispatch: function(nativeEvent) {
            var event = jQuery.event.fix(nativeEvent);
            var i, j, ret, matched, handleObj, handlerQueue, args = new Array(arguments.length), handlers = (dataPriv.get(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
            args[0] = event;
            for (i = 1; i < arguments.length; i++) {
                args[i] = arguments[i];
            }
            event.delegateTarget = this;
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                return;
            }
            handlerQueue = jQuery.event.handlers.call(this, event, handlers);
            i = 0;
            while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                event.currentTarget = matched.elem;
                j = 0;
                while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
                    if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {
                        event.handleObj = handleObj;
                        event.data = handleObj.data;
                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                        if (ret !== undefined) {
                            if ((event.result = ret) === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }
            if (special.postDispatch) {
                special.postDispatch.call(this, event);
            }
            return event.result;
        },
        handlers: function(event, handlers) {
            var i, handleObj, sel, matchedHandlers, matchedSelectors, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && cur.nodeType && !(event.type === "click" && event.button >= 1)) {
                for (; cur !== this; cur = cur.parentNode || this) {
                    if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
                        matchedHandlers = [];
                        matchedSelectors = {};
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];
                            sel = handleObj.selector + " ";
                            if (matchedSelectors[sel] === undefined) {
                                matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
                            }
                            if (matchedSelectors[sel]) {
                                matchedHandlers.push(handleObj);
                            }
                        }
                        if (matchedHandlers.length) {
                            handlerQueue.push({
                                elem: cur,
                                handlers: matchedHandlers
                            });
                        }
                    }
                }
            }
            cur = this;
            if (delegateCount < handlers.length) {
                handlerQueue.push({
                    elem: cur,
                    handlers: handlers.slice(delegateCount)
                });
            }
            return handlerQueue;
        },
        addProp: function(name, hook) {
            Object.defineProperty(jQuery.Event.prototype, name, {
                enumerable: true,
                configurable: true,
                get: jQuery.isFunction(hook) ? function() {
                    if (this.originalEvent) {
                        return hook(this.originalEvent);
                    }
                }
                : function() {
                    if (this.originalEvent) {
                        return this.originalEvent[name];
                    }
                }
                ,
                set: function(value) {
                    Object.defineProperty(this, name, {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: value
                    });
                }
            });
        },
        fix: function(originalEvent) {
            return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
        },
        special: {
            load: {
                noBubble: true
            },
            focus: {
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus) {
                        this.focus();
                        return false;
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === safeActiveElement() && this.blur) {
                        this.blur();
                        return false;
                    }
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if (this.type === "checkbox" && this.click && nodeName(this, "input")) {
                        this.click();
                        return false;
                    }
                },
                _default: function(event) {
                    return nodeName(event.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    if (event.result !== undefined && event.originalEvent) {
                        event.originalEvent.returnValue = event.result;
                    }
                }
            }
        }
    };
    jQuery.removeEvent = function(elem, type, handle) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handle);
        }
    }
    ;
    jQuery.Event = function(src, props) {
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src,props);
        }
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse;
            this.target = (src.target && src.target.nodeType === 3) ? src.target.parentNode : src.target;
            this.currentTarget = src.currentTarget;
            this.relatedTarget = src.relatedTarget;
        } else {
            this.type = src;
        }
        if (props) {
            jQuery.extend(this, props);
        }
        this.timeStamp = src && src.timeStamp || jQuery.now();
        this[jQuery.expando] = true;
    }
    ;
    jQuery.Event.prototype = {
        constructor: jQuery.Event,
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        isSimulated: false,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue;
            if (e && !this.isSimulated) {
                e.preventDefault();
            }
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue;
            if (e && !this.isSimulated) {
                e.stopPropagation();
            }
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue;
            if (e && !this.isSimulated) {
                e.stopImmediatePropagation();
            }
            this.stopPropagation();
        }
    };
    jQuery.each({
        altKey: true,
        bubbles: true,
        cancelable: true,
        changedTouches: true,
        ctrlKey: true,
        detail: true,
        eventPhase: true,
        metaKey: true,
        pageX: true,
        pageY: true,
        shiftKey: true,
        view: true,
        "char": true,
        charCode: true,
        key: true,
        keyCode: true,
        button: true,
        buttons: true,
        clientX: true,
        clientY: true,
        offsetX: true,
        offsetY: true,
        pointerId: true,
        pointerType: true,
        screenX: true,
        screenY: true,
        targetTouches: true,
        toElement: true,
        touches: true,
        which: function(event) {
            var button = event.button;
            if (event.which == null && rkeyEvent.test(event.type)) {
                return event.charCode != null ? event.charCode : event.keyCode;
            }
            if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
                if (button & 1) {
                    return 1;
                }
                if (button & 2) {
                    return 3;
                }
                if (button & 4) {
                    return 2;
                }
                return 0;
            }
            return event.which;
        }
    }, jQuery.event.addProp);
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                if (!related || (related !== target && !jQuery.contains(target, related))) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix;
                }
                return ret;
            }
        };
    });
    jQuery.fn.extend({
        on: function(types, selector, data, fn) {
            return on(this, types, selector, data, fn);
        },
        one: function(types, selector, data, fn) {
            return on(this, types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
                return this;
            }
            if (typeof types === "object") {
                for (type in types) {
                    this.off(type, selector, types[type]);
                }
                return this;
            }
            if (selector === false || typeof selector === "function") {
                fn = selector;
                selector = undefined;
            }
            if (fn === false) {
                fn = returnFalse;
            }
            return this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
            });
        }
    });
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi
      , rnoInnerhtml = /<script|<style|<link/i
      , rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i
      , rscriptTypeMasked = /^true\/(.*)/
      , rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    function manipulationTarget(elem, content) {
        if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
            return jQuery(">tbody", elem)[0] || elem;
        }
        return elem;
    }
    function disableScript(elem) {
        elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
        return elem;
    }
    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        if (match) {
            elem.type = match[1];
        } else {
            elem.removeAttribute("type");
        }
        return elem;
    }
    function cloneCopyEvent(src, dest) {
        var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
        if (dest.nodeType !== 1) {
            return;
        }
        if (dataPriv.hasData(src)) {
            pdataOld = dataPriv.access(src);
            pdataCur = dataPriv.set(dest, pdataOld);
            events = pdataOld.events;
            if (events) {
                delete pdataCur.handle;
                pdataCur.events = {};
                for (type in events) {
                    for (i = 0,
                    l = events[type].length; i < l; i++) {
                        jQuery.event.add(dest, type, events[type][i]);
                    }
                }
            }
        }
        if (dataUser.hasData(src)) {
            udataOld = dataUser.access(src);
            udataCur = jQuery.extend({}, udataOld);
            dataUser.set(dest, udataCur);
        }
    }
    function fixInput(src, dest) {
        var nodeName = dest.nodeName.toLowerCase();
        if (nodeName === "input" && rcheckableType.test(src.type)) {
            dest.checked = src.checked;
        } else if (nodeName === "input" || nodeName === "textarea") {
            dest.defaultValue = src.defaultValue;
        }
    }
    function domManip(collection, args, callback, ignored) {
        args = concat.apply([], args);
        var fragment, first, scripts, hasScripts, node, doc, i = 0, l = collection.length, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
        if (isFunction || (l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value))) {
            return collection.each(function(index) {
                var self = collection.eq(index);
                if (isFunction) {
                    args[0] = value.call(this, index, self.html());
                }
                domManip(self, args, callback, ignored);
            });
        }
        if (l) {
            fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
            first = fragment.firstChild;
            if (fragment.childNodes.length === 1) {
                fragment = first;
            }
            if (first || ignored) {
                scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                hasScripts = scripts.length;
                for (; i < l; i++) {
                    node = fragment;
                    if (i !== iNoClone) {
                        node = jQuery.clone(node, true, true);
                        if (hasScripts) {
                            jQuery.merge(scripts, getAll(node, "script"));
                        }
                    }
                    callback.call(collection[i], node, i);
                }
                if (hasScripts) {
                    doc = scripts[scripts.length - 1].ownerDocument;
                    jQuery.map(scripts, restoreScript);
                    for (i = 0; i < hasScripts; i++) {
                        node = scripts[i];
                        if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
                            if (node.src) {
                                if (jQuery._evalUrl) {
                                    jQuery._evalUrl(node.src);
                                }
                            } else {
                                DOMEval(node.textContent.replace(rcleanScript, ""), doc);
                            }
                        }
                    }
                }
            }
        }
        return collection;
    }
    function remove(elem, selector, keepData) {
        var node, nodes = selector ? jQuery.filter(selector, elem) : elem, i = 0;
        for (; (node = nodes[i]) != null; i++) {
            if (!keepData && node.nodeType === 1) {
                jQuery.cleanData(getAll(node));
            }
            if (node.parentNode) {
                if (keepData && jQuery.contains(node.ownerDocument, node)) {
                    setGlobalEval(getAll(node, "script"));
                }
                node.parentNode.removeChild(node);
            }
        }
        return elem;
    }
    jQuery.extend({
        htmlPrefilter: function(html) {
            return html.replace(rxhtmlTag, "<$1></$2>");
        },
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var i, l, srcElements, destElements, clone = elem.cloneNode(true), inPage = jQuery.contains(elem.ownerDocument, elem);
            if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
                destElements = getAll(clone);
                srcElements = getAll(elem);
                for (i = 0,
                l = srcElements.length; i < l; i++) {
                    fixInput(srcElements[i], destElements[i]);
                }
            }
            if (dataAndEvents) {
                if (deepDataAndEvents) {
                    srcElements = srcElements || getAll(elem);
                    destElements = destElements || getAll(clone);
                    for (i = 0,
                    l = srcElements.length; i < l; i++) {
                        cloneCopyEvent(srcElements[i], destElements[i]);
                    }
                } else {
                    cloneCopyEvent(elem, clone);
                }
            }
            destElements = getAll(clone, "script");
            if (destElements.length > 0) {
                setGlobalEval(destElements, !inPage && getAll(elem, "script"));
            }
            return clone;
        },
        cleanData: function(elems) {
            var data, elem, type, special = jQuery.event.special, i = 0;
            for (; (elem = elems[i]) !== undefined; i++) {
                if (acceptData(elem)) {
                    if ((data = elem[dataPriv.expando])) {
                        if (data.events) {
                            for (type in data.events) {
                                if (special[type]) {
                                    jQuery.event.remove(elem, type);
                                } else {
                                    jQuery.removeEvent(elem, type, data.handle);
                                }
                            }
                        }
                        elem[dataPriv.expando] = undefined;
                    }
                    if (elem[dataUser.expando]) {
                        elem[dataUser.expando] = undefined;
                    }
                }
            }
        }
    });
    jQuery.fn.extend({
        detach: function(selector) {
            return remove(this, selector, true);
        },
        remove: function(selector) {
            return remove(this, selector);
        },
        text: function(value) {
            return access(this, function(value) {
                return value === undefined ? jQuery.text(this) : this.empty().each(function() {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        this.textContent = value;
                    }
                });
            }, null, value, arguments.length);
        },
        append: function() {
            return domManip(this, arguments, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },
        prepend: function() {
            return domManip(this, arguments, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },
        before: function() {
            return domManip(this, arguments, function(elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this);
                }
            });
        },
        after: function() {
            return domManip(this, arguments, function(elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this.nextSibling);
                }
            });
        },
        empty: function() {
            var elem, i = 0;
            for (; (elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {
                    jQuery.cleanData(getAll(elem, false));
                    elem.textContent = "";
                }
            }
            return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
            return this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function(value) {
            return access(this, function(value) {
                var elem = this[0] || {}
                  , i = 0
                  , l = this.length;
                if (value === undefined && elem.nodeType === 1) {
                    return elem.innerHTML;
                }
                if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                    value = jQuery.htmlPrefilter(value);
                    try {
                        for (; i < l; i++) {
                            elem = this[i] || {};
                            if (elem.nodeType === 1) {
                                jQuery.cleanData(getAll(elem, false));
                                elem.innerHTML = value;
                            }
                        }
                        elem = 0;
                    } catch (e) {}
                }
                if (elem) {
                    this.empty().append(value);
                }
            }, null, value, arguments.length);
        },
        replaceWith: function() {
            var ignored = [];
            return domManip(this, arguments, function(elem) {
                var parent = this.parentNode;
                if (jQuery.inArray(this, ignored) < 0) {
                    jQuery.cleanData(getAll(this));
                    if (parent) {
                        parent.replaceChild(elem, this);
                    }
                }
            }, ignored);
        }
    });
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0;
            for (; i <= last; i++) {
                elems = i === last ? this : this.clone(true);
                jQuery(insert[i])[original](elems);
                push.apply(ret, elems.get());
            }
            return this.pushStack(ret);
        }
        ;
    });
    var rmargin = (/^margin/);
    var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$","i");
    var getStyles = function(elem) {
        var view = elem.ownerDocument.defaultView;
        if (!view || !view.opener) {
            view = window;
        }
        return view.getComputedStyle(elem);
    };
    (function() {
        function computeStyleTests() {
            if (!div) {
                return;
            }
            div.style.cssText = "box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
            div.innerHTML = "";
            documentElement.appendChild(container);
            var divStyle = window.getComputedStyle(div);
            pixelPositionVal = divStyle.top !== "1%";
            reliableMarginLeftVal = divStyle.marginLeft === "2px";
            boxSizingReliableVal = divStyle.width === "4px";
            div.style.marginRight = "50%";
            pixelMarginRightVal = divStyle.marginRight === "4px";
            documentElement.removeChild(container);
            div = null;
        }
        var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal, container = document.createElement("div"), div = document.createElement("div");
        if (!div.style) {
            return;
        }
        div.style.backgroundClip = "content-box";
        div.cloneNode(true).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";
        container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
        container.appendChild(div);
        jQuery.extend(support, {
            pixelPosition: function() {
                computeStyleTests();
                return pixelPositionVal;
            },
            boxSizingReliable: function() {
                computeStyleTests();
                return boxSizingReliableVal;
            },
            pixelMarginRight: function() {
                computeStyleTests();
                return pixelMarginRightVal;
            },
            reliableMarginLeft: function() {
                computeStyleTests();
                return reliableMarginLeftVal;
            }
        });
    }
    )();
    function curCSS(elem, name, computed) {
        var width, minWidth, maxWidth, ret, style = elem.style;
        computed = computed || getStyles(elem);
        if (computed) {
            ret = computed.getPropertyValue(name) || computed[name];
            if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
                ret = jQuery.style(elem, name);
            }
            if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {
                width = style.width;
                minWidth = style.minWidth;
                maxWidth = style.maxWidth;
                style.minWidth = style.maxWidth = style.width = ret;
                ret = computed.width;
                style.width = width;
                style.minWidth = minWidth;
                style.maxWidth = maxWidth;
            }
        }
        return ret !== undefined ? ret + "" : ret;
    }
    function addGetHookIf(conditionFn, hookFn) {
        return {
            get: function() {
                if (conditionFn()) {
                    delete this.get;
                    return;
                }
                return (this.get = hookFn).apply(this, arguments);
            }
        };
    }
    var rdisplayswap = /^(none|table(?!-c[ea]).+)/
      , rcustomProp = /^--/
      , cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }
      , cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
    }
      , cssPrefixes = ["Webkit", "Moz", "ms"]
      , emptyStyle = document.createElement("div").style;
    function vendorPropName(name) {
        if (name in emptyStyle) {
            return name;
        }
        var capName = name[0].toUpperCase() + name.slice(1)
          , i = cssPrefixes.length;
        while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in emptyStyle) {
                return name;
            }
        }
    }
    function finalPropName(name) {
        var ret = jQuery.cssProps[name];
        if (!ret) {
            ret = jQuery.cssProps[name] = vendorPropName(name) || name;
        }
        return ret;
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rcssNum.exec(value);
        return matches ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        var i, val = 0;
        if (extra === (isBorderBox ? "border" : "content")) {
            i = 4;
        } else {
            i = name === "width" ? 1 : 0;
        }
        for (; i < 4; i += 2) {
            if (extra === "margin") {
                val += jQuery.css(elem, extra + cssExpand[i], true, styles);
            }
            if (isBorderBox) {
                if (extra === "content") {
                    val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                }
                if (extra !== "margin") {
                    val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
            } else {
                val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                if (extra !== "padding") {
                    val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
            }
        }
        return val;
    }
    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox, styles = getStyles(elem), val = curCSS(elem, name, styles), isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
        if (rnumnonpx.test(val)) {
            return val;
        }
        valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
        if (val === "auto") {
            val = elem["offset" + name[0].toUpperCase() + name.slice(1)];
        }
        val = parseFloat(val) || 0;
        return (val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles)) + "px";
    }
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return ret === "" ? "1" : ret;
                    }
                }
            }
        },
        cssNumber: {
            "animationIterationCount": true,
            "columnCount": true,
            "fillOpacity": true,
            "flexGrow": true,
            "flexShrink": true,
            "fontWeight": true,
            "lineHeight": true,
            "opacity": true,
            "order": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(elem, name, value, extra) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return;
            }
            var ret, type, hooks, origName = jQuery.camelCase(name), isCustomProp = rcustomProp.test(name), style = elem.style;
            if (!isCustomProp) {
                name = finalPropName(origName);
            }
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (value !== undefined) {
                type = typeof value;
                if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
                    value = adjustCSS(elem, name, ret);
                    type = "number";
                }
                if (value == null || value !== value) {
                    return;
                }
                if (type === "number") {
                    value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
                }
                if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                    style[name] = "inherit";
                }
                if (!hooks || !("set"in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
                    if (isCustomProp) {
                        style.setProperty(name, value);
                    } else {
                        style[name] = value;
                    }
                }
            } else {
                if (hooks && "get"in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                    return ret;
                }
                return style[name];
            }
        },
        css: function(elem, name, extra, styles) {
            var val, num, hooks, origName = jQuery.camelCase(name), isCustomProp = rcustomProp.test(name);
            if (!isCustomProp) {
                name = finalPropName(origName);
            }
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (hooks && "get"in hooks) {
                val = hooks.get(elem, true, extra);
            }
            if (val === undefined) {
                val = curCSS(elem, name, styles);
            }
            if (val === "normal" && name in cssNormalTransform) {
                val = cssNormalTransform[name];
            }
            if (extra === "" || extra) {
                num = parseFloat(val);
                return extra === true || isFinite(num) ? num || 0 : val;
            }
            return val;
        }
    });
    jQuery.each(["height", "width"], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                if (computed) {
                    return rdisplayswap.test(jQuery.css(elem, "display")) && (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function() {
                        return getWidthOrHeight(elem, name, extra);
                    }) : getWidthOrHeight(elem, name, extra);
                }
            },
            set: function(elem, value, extra) {
                var matches, styles = extra && getStyles(elem), subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);
                if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
                    elem.style[name] = value;
                    value = jQuery.css(elem, name);
                }
                return setPositiveNumber(elem, value, subtract);
            }
        };
    });
    jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function(elem, computed) {
        if (computed) {
            return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {
                marginLeft: 0
            }, function() {
                return elem.getBoundingClientRect().left;
            })) + "px";
        }
    });
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                var i = 0
                  , expanded = {}
                  , parts = typeof value === "string" ? value.split(" ") : [value];
                for (; i < 4; i++) {
                    expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                }
                return expanded;
            }
        };
        if (!rmargin.test(prefix)) {
            jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
        }
    });
    jQuery.fn.extend({
        css: function(name, value) {
            return access(this, function(elem, name, value) {
                var styles, len, map = {}, i = 0;
                if (Array.isArray(name)) {
                    styles = getStyles(elem);
                    len = name.length;
                    for (; i < len; i++) {
                        map[name[i]] = jQuery.css(elem, name[i], false, styles);
                    }
                    return map;
                }
                return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        }
    });
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem,options,prop,end,easing);
    }
    jQuery.Tween = Tween;
    Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || jQuery.easing._default;
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            if (this.options.duration) {
                this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
            } else {
                this.pos = eased = percent;
            }
            this.now = (this.end - this.start) * eased + this.start;
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
            }
            if (hooks && hooks.set) {
                hooks.set(this);
            } else {
                Tween.propHooks._default.set(this);
            }
            return this;
        }
    };
    Tween.prototype.init.prototype = Tween.prototype;
    Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
                    return tween.elem[tween.prop];
                }
                result = jQuery.css(tween.elem, tween.prop, "");
                return !result || result === "auto" ? 0 : result;
            },
            set: function(tween) {
                if (jQuery.fx.step[tween.prop]) {
                    jQuery.fx.step[tween.prop](tween);
                } else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
                    jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                } else {
                    tween.elem[tween.prop] = tween.now;
                }
            }
        }
    };
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
                tween.elem[tween.prop] = tween.now;
            }
        }
    };
    jQuery.easing = {
        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return 0.5 - Math.cos(p * Math.PI) / 2;
        },
        _default: "swing"
    };
    jQuery.fx = Tween.prototype.init;
    jQuery.fx.step = {};
    var fxNow, inProgress, rfxtypes = /^(?:toggle|show|hide)$/, rrun = /queueHooks$/;
    function schedule() {
        if (inProgress) {
            if (document.hidden === false && window.requestAnimationFrame) {
                window.requestAnimationFrame(schedule);
            } else {
                window.setTimeout(schedule, jQuery.fx.interval);
            }
            jQuery.fx.tick();
        }
    }
    function createFxNow() {
        window.setTimeout(function() {
            fxNow = undefined;
        });
        return (fxNow = jQuery.now());
    }
    function genFx(type, includeWidth) {
        var which, i = 0, attrs = {
            height: type
        };
        includeWidth = includeWidth ? 1 : 0;
        for (; i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs["margin" + which] = attrs["padding" + which] = type;
        }
        if (includeWidth) {
            attrs.opacity = attrs.width = type;
        }
        return attrs;
    }
    function createTween(value, prop, animation) {
        var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index = 0, length = collection.length;
        for (; index < length; index++) {
            if ((tween = collection[index].call(animation, prop, value))) {
                return tween;
            }
        }
    }
    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display, isBox = "width"in props || "height"in props, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHiddenWithinTree(elem), dataShow = dataPriv.get(elem, "fxshow");
        if (!opts.queue) {
            hooks = jQuery._queueHooks(elem, "fx");
            if (hooks.unqueued == null) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function() {
                    if (!hooks.unqueued) {
                        oldfire();
                    }
                }
                ;
            }
            hooks.unqueued++;
            anim.always(function() {
                anim.always(function() {
                    hooks.unqueued--;
                    if (!jQuery.queue(elem, "fx").length) {
                        hooks.empty.fire();
                    }
                });
            });
        }
        for (prop in props) {
            value = props[prop];
            if (rfxtypes.test(value)) {
                delete props[prop];
                toggle = toggle || value === "toggle";
                if (value === (hidden ? "hide" : "show")) {
                    if (value === "show" && dataShow && dataShow[prop] !== undefined) {
                        hidden = true;
                    } else {
                        continue;
                    }
                }
                orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
            }
        }
        propTween = !jQuery.isEmptyObject(props);
        if (!propTween && jQuery.isEmptyObject(orig)) {
            return;
        }
        if (isBox && elem.nodeType === 1) {
            opts.overflow = [style.overflow, style.overflowX, style.overflowY];
            restoreDisplay = dataShow && dataShow.display;
            if (restoreDisplay == null) {
                restoreDisplay = dataPriv.get(elem, "display");
            }
            display = jQuery.css(elem, "display");
            if (display === "none") {
                if (restoreDisplay) {
                    display = restoreDisplay;
                } else {
                    showHide([elem], true);
                    restoreDisplay = elem.style.display || restoreDisplay;
                    display = jQuery.css(elem, "display");
                    showHide([elem]);
                }
            }
            if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
                if (jQuery.css(elem, "float") === "none") {
                    if (!propTween) {
                        anim.done(function() {
                            style.display = restoreDisplay;
                        });
                        if (restoreDisplay == null) {
                            display = style.display;
                            restoreDisplay = display === "none" ? "" : display;
                        }
                    }
                    style.display = "inline-block";
                }
            }
        }
        if (opts.overflow) {
            style.overflow = "hidden";
            anim.always(function() {
                style.overflow = opts.overflow[0];
                style.overflowX = opts.overflow[1];
                style.overflowY = opts.overflow[2];
            });
        }
        propTween = false;
        for (prop in orig) {
            if (!propTween) {
                if (dataShow) {
                    if ("hidden"in dataShow) {
                        hidden = dataShow.hidden;
                    }
                } else {
                    dataShow = dataPriv.access(elem, "fxshow", {
                        display: restoreDisplay
                    });
                }
                if (toggle) {
                    dataShow.hidden = !hidden;
                }
                if (hidden) {
                    showHide([elem], true);
                }
                anim.done(function() {
                    if (!hidden) {
                        showHide([elem]);
                    }
                    dataPriv.remove(elem, "fxshow");
                    for (prop in orig) {
                        jQuery.style(elem, prop, orig[prop]);
                    }
                });
            }
            propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
            if (!(prop in dataShow)) {
                dataShow[prop] = propTween.start;
                if (hidden) {
                    propTween.end = propTween.start;
                    propTween.start = 0;
                }
            }
        }
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) {
            name = jQuery.camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (Array.isArray(value)) {
                easing = value[1];
                value = props[index] = value[0];
            }
            if (index !== name) {
                props[name] = value;
                delete props[index];
            }
            hooks = jQuery.cssHooks[name];
            if (hooks && "expand"in hooks) {
                value = hooks.expand(value);
                delete props[name];
                for (index in value) {
                    if (!(index in props)) {
                        props[index] = value[index];
                        specialEasing[index] = easing;
                    }
                }
            } else {
                specialEasing[name] = easing;
            }
        }
    }
    function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = Animation.prefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem;
        }), tick = function() {
            if (stopped) {
                return false;
            }
            var currentTime = fxNow || createFxNow()
              , remaining = Math.max(0, animation.startTime + animation.duration - currentTime)
              , temp = remaining / animation.duration || 0
              , percent = 1 - temp
              , index = 0
              , length = animation.tweens.length;
            for (; index < length; index++) {
                animation.tweens[index].run(percent);
            }
            deferred.notifyWith(elem, [animation, percent, remaining]);
            if (percent < 1 && length) {
                return remaining;
            }
            if (!length) {
                deferred.notifyWith(elem, [animation, 1, 0]);
            }
            deferred.resolveWith(elem, [animation]);
            return false;
        }, animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(true, {
                specialEasing: {},
                easing: jQuery.easing._default
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                animation.tweens.push(tween);
                return tween;
            },
            stop: function(gotoEnd) {
                var index = 0
                  , length = gotoEnd ? animation.tweens.length : 0;
                if (stopped) {
                    return this;
                }
                stopped = true;
                for (; index < length; index++) {
                    animation.tweens[index].run(1);
                }
                if (gotoEnd) {
                    deferred.notifyWith(elem, [animation, 1, 0]);
                    deferred.resolveWith(elem, [animation, gotoEnd]);
                } else {
                    deferred.rejectWith(elem, [animation, gotoEnd]);
                }
                return this;
            }
        }), props = animation.props;
        propFilter(props, animation.opts.specialEasing);
        for (; index < length; index++) {
            result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
            if (result) {
                if (jQuery.isFunction(result.stop)) {
                    jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
                }
                return result;
            }
        }
        jQuery.map(props, createTween, animation);
        if (jQuery.isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation);
        }
        animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        }));
        return animation;
    }
    jQuery.Animation = jQuery.extend(Animation, {
        tweeners: {
            "*": [function(prop, value) {
                var tween = this.createTween(prop, value);
                adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
                return tween;
            }
            ]
        },
        tweener: function(props, callback) {
            if (jQuery.isFunction(props)) {
                callback = props;
                props = ["*"];
            } else {
                props = props.match(rnothtmlwhite);
            }
            var prop, index = 0, length = props.length;
            for (; index < length; index++) {
                prop = props[index];
                Animation.tweeners[prop] = Animation.tweeners[prop] || [];
                Animation.tweeners[prop].unshift(callback);
            }
        },
        prefilters: [defaultPrefilter],
        prefilter: function(callback, prepend) {
            if (prepend) {
                Animation.prefilters.unshift(callback);
            } else {
                Animation.prefilters.push(callback);
            }
        }
    });
    jQuery.speed = function(speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        if (jQuery.fx.off) {
            opt.duration = 0;
        } else {
            if (typeof opt.duration !== "number") {
                if (opt.duration in jQuery.fx.speeds) {
                    opt.duration = jQuery.fx.speeds[opt.duration];
                } else {
                    opt.duration = jQuery.fx.speeds._default;
                }
            }
        }
        if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx";
        }
        opt.old = opt.complete;
        opt.complete = function() {
            if (jQuery.isFunction(opt.old)) {
                opt.old.call(this);
            }
            if (opt.queue) {
                jQuery.dequeue(this, opt.queue);
            }
        }
        ;
        return opt;
    }
    ;
    jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHiddenWithinTree).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop)
              , optall = jQuery.speed(speed, easing, callback)
              , doAnimation = function() {
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                if (empty || dataPriv.get(this, "finish")) {
                    anim.stop(true);
                }
            };
            doAnimation.finish = doAnimation;
            return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop(gotoEnd);
            };
            if (typeof type !== "string") {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if (clearQueue && type !== false) {
                this.queue(type || "fx", []);
            }
            return this.each(function() {
                var dequeue = true
                  , index = type != null && type + "queueHooks"
                  , timers = jQuery.timers
                  , data = dataPriv.get(this);
                if (index) {
                    if (data[index] && data[index].stop) {
                        stopQueue(data[index]);
                    }
                } else {
                    for (index in data) {
                        if (data[index] && data[index].stop && rrun.test(index)) {
                            stopQueue(data[index]);
                        }
                    }
                }
                for (index = timers.length; index--; ) {
                    if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                        timers[index].anim.stop(gotoEnd);
                        dequeue = false;
                        timers.splice(index, 1);
                    }
                }
                if (dequeue || !gotoEnd) {
                    jQuery.dequeue(this, type);
                }
            });
        },
        finish: function(type) {
            if (type !== false) {
                type = type || "fx";
            }
            return this.each(function() {
                var index, data = dataPriv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                data.finish = true;
                jQuery.queue(this, type, []);
                if (hooks && hooks.stop) {
                    hooks.stop.call(this, true);
                }
                for (index = timers.length; index--; ) {
                    if (timers[index].elem === this && timers[index].queue === type) {
                        timers[index].anim.stop(true);
                        timers.splice(index, 1);
                    }
                }
                for (index = 0; index < length; index++) {
                    if (queue[index] && queue[index].finish) {
                        queue[index].finish.call(this);
                    }
                }
                delete data.finish;
            });
        }
    });
    jQuery.each(["toggle", "show", "hide"], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
        }
        ;
    });
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        }
        ;
    });
    jQuery.timers = [];
    jQuery.fx.tick = function() {
        var timer, i = 0, timers = jQuery.timers;
        fxNow = jQuery.now();
        for (; i < timers.length; i++) {
            timer = timers[i];
            if (!timer() && timers[i] === timer) {
                timers.splice(i--, 1);
            }
        }
        if (!timers.length) {
            jQuery.fx.stop();
        }
        fxNow = undefined;
    }
    ;
    jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer);
        jQuery.fx.start();
    }
    ;
    jQuery.fx.interval = 13;
    jQuery.fx.start = function() {
        if (inProgress) {
            return;
        }
        inProgress = true;
        schedule();
    }
    ;
    jQuery.fx.stop = function() {
        inProgress = null;
    }
    ;
    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    jQuery.fn.delay = function(time, type) {
        time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
        type = type || "fx";
        return this.queue(type, function(next, hooks) {
            var timeout = window.setTimeout(next, time);
            hooks.stop = function() {
                window.clearTimeout(timeout);
            }
            ;
        });
    }
    ;
    (function() {
        var input = document.createElement("input")
          , select = document.createElement("select")
          , opt = select.appendChild(document.createElement("option"));
        input.type = "checkbox";
        support.checkOn = input.value !== "";
        support.optSelected = opt.selected;
        input = document.createElement("input");
        input.value = "t";
        input.type = "radio";
        support.radioValue = input.value === "t";
    }
    )();
    var boolHook, attrHandle = jQuery.expr.attrHandle;
    jQuery.fn.extend({
        attr: function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name);
            });
        }
    });
    jQuery.extend({
        attr: function(elem, name, value) {
            var ret, hooks, nType = elem.nodeType;
            if (nType === 3 || nType === 8 || nType === 2) {
                return;
            }
            if (typeof elem.getAttribute === "undefined") {
                return jQuery.prop(elem, name, value);
            }
            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
            }
            if (value !== undefined) {
                if (value === null) {
                    jQuery.removeAttr(elem, name);
                    return;
                }
                if (hooks && "set"in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;
                }
                elem.setAttribute(name, value + "");
                return value;
            }
            if (hooks && "get"in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret;
            }
            ret = jQuery.find.attr(elem, name);
            return ret == null ? undefined : ret;
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
                        var val = elem.value;
                        elem.setAttribute("type", value);
                        if (val) {
                            elem.value = val;
                        }
                        return value;
                    }
                }
            }
        },
        removeAttr: function(elem, value) {
            var name, i = 0, attrNames = value && value.match(rnothtmlwhite);
            if (attrNames && elem.nodeType === 1) {
                while ((name = attrNames[i++])) {
                    elem.removeAttribute(name);
                }
            }
        }
    });
    boolHook = {
        set: function(elem, value, name) {
            if (value === false) {
                jQuery.removeAttr(elem, name);
            } else {
                elem.setAttribute(name, name);
            }
            return name;
        }
    };
    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        attrHandle[name] = function(elem, name, isXML) {
            var ret, handle, lowercaseName = name.toLowerCase();
            if (!isXML) {
                handle = attrHandle[lowercaseName];
                attrHandle[lowercaseName] = ret;
                ret = getter(elem, name, isXML) != null ? lowercaseName : null;
                attrHandle[lowercaseName] = handle;
            }
            return ret;
        }
        ;
    });
    var rfocusable = /^(?:input|select|textarea|button)$/i
      , rclickable = /^(?:a|area)$/i;
    jQuery.fn.extend({
        prop: function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
            return this.each(function() {
                delete this[jQuery.propFix[name] || name];
            });
        }
    });
    jQuery.extend({
        prop: function(elem, name, value) {
            var ret, hooks, nType = elem.nodeType;
            if (nType === 3 || nType === 8 || nType === 2) {
                return;
            }
            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name];
            }
            if (value !== undefined) {
                if (hooks && "set"in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;
                }
                return (elem[name] = value);
            }
            if (hooks && "get"in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret;
            }
            return elem[name];
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    var tabindex = jQuery.find.attr(elem, "tabindex");
                    if (tabindex) {
                        return parseInt(tabindex, 10);
                    }
                    if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
                        return 0;
                    }
                    return -1;
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    });
    if (!support.optSelected) {
        jQuery.propHooks.selected = {
            get: function(elem) {
                var parent = elem.parentNode;
                if (parent && parent.parentNode) {
                    parent.parentNode.selectedIndex;
                }
                return null;
            },
            set: function(elem) {
                var parent = elem.parentNode;
                if (parent) {
                    parent.selectedIndex;
                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex;
                    }
                }
            }
        };
    }
    jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        jQuery.propFix[this.toLowerCase()] = this;
    });
    function stripAndCollapse(value) {
        var tokens = value.match(rnothtmlwhite) || [];
        return tokens.join(" ");
    }
    function getClass(elem) {
        return elem.getAttribute && elem.getAttribute("class") || "";
    }
    jQuery.fn.extend({
        addClass: function(value) {
            var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).addClass(value.call(this, j, getClass(this)));
                });
            }
            if (typeof value === "string" && value) {
                classes = value.match(rnothtmlwhite) || [];
                while ((elem = this[i++])) {
                    curValue = getClass(elem);
                    cur = elem.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");
                    if (cur) {
                        j = 0;
                        while ((clazz = classes[j++])) {
                            if (cur.indexOf(" " + clazz + " ") < 0) {
                                cur += clazz + " ";
                            }
                        }
                        finalValue = stripAndCollapse(cur);
                        if (curValue !== finalValue) {
                            elem.setAttribute("class", finalValue);
                        }
                    }
                }
            }
            return this;
        },
        removeClass: function(value) {
            var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).removeClass(value.call(this, j, getClass(this)));
                });
            }
            if (!arguments.length) {
                return this.attr("class", "");
            }
            if (typeof value === "string" && value) {
                classes = value.match(rnothtmlwhite) || [];
                while ((elem = this[i++])) {
                    curValue = getClass(elem);
                    cur = elem.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");
                    if (cur) {
                        j = 0;
                        while ((clazz = classes[j++])) {
                            while (cur.indexOf(" " + clazz + " ") > -1) {
                                cur = cur.replace(" " + clazz + " ", " ");
                            }
                        }
                        finalValue = stripAndCollapse(cur);
                        if (curValue !== finalValue) {
                            elem.setAttribute("class", finalValue);
                        }
                    }
                }
            }
            return this;
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value;
            if (typeof stateVal === "boolean" && type === "string") {
                return stateVal ? this.addClass(value) : this.removeClass(value);
            }
            if (jQuery.isFunction(value)) {
                return this.each(function(i) {
                    jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
                });
            }
            return this.each(function() {
                var className, i, self, classNames;
                if (type === "string") {
                    i = 0;
                    self = jQuery(this);
                    classNames = value.match(rnothtmlwhite) || [];
                    while ((className = classNames[i++])) {
                        if (self.hasClass(className)) {
                            self.removeClass(className);
                        } else {
                            self.addClass(className);
                        }
                    }
                } else if (value === undefined || type === "boolean") {
                    className = getClass(this);
                    if (className) {
                        dataPriv.set(this, "__className__", className);
                    }
                    if (this.setAttribute) {
                        this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
                    }
                }
            });
        },
        hasClass: function(selector) {
            var className, elem, i = 0;
            className = " " + selector + " ";
            while ((elem = this[i++])) {
                if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
                    return true;
                }
            }
            return false;
        }
    });
    var rreturn = /\r/g;
    jQuery.fn.extend({
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
                    if (hooks && "get"in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                        return ret;
                    }
                    ret = elem.value;
                    if (typeof ret === "string") {
                        return ret.replace(rreturn, "");
                    }
                    return ret == null ? "" : ret;
                }
                return;
            }
            isFunction = jQuery.isFunction(value);
            return this.each(function(i) {
                var val;
                if (this.nodeType !== 1) {
                    return;
                }
                if (isFunction) {
                    val = value.call(this, i, jQuery(this).val());
                } else {
                    val = value;
                }
                if (val == null) {
                    val = "";
                } else if (typeof val === "number") {
                    val += "";
                } else if (Array.isArray(val)) {
                    val = jQuery.map(val, function(value) {
                        return value == null ? "" : value + "";
                    });
                }
                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                if (!hooks || !("set"in hooks) || hooks.set(this, val, "value") === undefined) {
                    this.value = val;
                }
            });
        }
    });
    jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return val != null ? val : stripAndCollapse(jQuery.text(elem));
                }
            },
            select: {
                get: function(elem) {
                    var value, option, i, options = elem.options, index = elem.selectedIndex, one = elem.type === "select-one", values = one ? null : [], max = one ? index + 1 : options.length;
                    if (index < 0) {
                        i = max;
                    } else {
                        i = one ? index : 0;
                    }
                    for (; i < max; i++) {
                        option = options[i];
                        if ((option.selected || i === index) && !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
                            value = jQuery(option).val();
                            if (one) {
                                return value;
                            }
                            values.push(value);
                        }
                    }
                    return values;
                },
                set: function(elem, value) {
                    var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length;
                    while (i--) {
                        option = options[i];
                        if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
                            optionSet = true;
                        }
                    }
                    if (!optionSet) {
                        elem.selectedIndex = -1;
                    }
                    return values;
                }
            }
        }
    });
    jQuery.each(["radio", "checkbox"], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                if (Array.isArray(value)) {
                    return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1);
                }
            }
        };
        if (!support.checkOn) {
            jQuery.valHooks[this].get = function(elem) {
                return elem.getAttribute("value") === null ? "on" : elem.value;
            }
            ;
        }
    });
    var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
    jQuery.extend(jQuery.event, {
        trigger: function(event, data, elem, onlyHandlers) {
            var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [elem || document], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            cur = tmp = elem = elem || document;
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return;
            }
            if (type.indexOf(".") > -1) {
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;
            event = event[jQuery.expando] ? event : new jQuery.Event(type,typeof event === "object" && event);
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            event.result = undefined;
            if (!event.target) {
                event.target = elem;
            }
            data = data == null ? [event] : jQuery.makeArray(data, [event]);
            special = jQuery.event.special[type] || {};
            if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                return;
            }
            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                bubbleType = special.delegateType || type;
                if (!rfocusMorph.test(bubbleType + type)) {
                    cur = cur.parentNode;
                }
                for (; cur; cur = cur.parentNode) {
                    eventPath.push(cur);
                    tmp = cur;
                }
                if (tmp === (elem.ownerDocument || document)) {
                    eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
            }
            i = 0;
            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                event.type = i > 1 ? bubbleType : special.bindType || type;
                handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
                if (handle) {
                    handle.apply(cur, data);
                }
                handle = ontype && cur[ontype];
                if (handle && handle.apply && acceptData(cur)) {
                    event.result = handle.apply(cur, data);
                    if (event.result === false) {
                        event.preventDefault();
                    }
                }
            }
            event.type = type;
            if (!onlyHandlers && !event.isDefaultPrevented()) {
                if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
                    if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
                        tmp = elem[ontype];
                        if (tmp) {
                            elem[ontype] = null;
                        }
                        jQuery.event.triggered = type;
                        elem[type]();
                        jQuery.event.triggered = undefined;
                        if (tmp) {
                            elem[ontype] = tmp;
                        }
                    }
                }
            }
            return event.result;
        },
        simulate: function(type, elem, event) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: true
            });
            jQuery.event.trigger(e, null, elem);
        }
    });
    jQuery.fn.extend({
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            if (elem) {
                return jQuery.event.trigger(type, data, elem, true);
            }
        }
    });
    jQuery.each(("blur focus focusin focusout resize scroll click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup contextmenu").split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        }
        ;
    });
    jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        }
    });
    support.focusin = "onfocusin"in window;
    if (!support.focusin) {
        jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function(orig, fix) {
            var handler = function(event) {
                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
            };
            jQuery.event.special[fix] = {
                setup: function() {
                    var doc = this.ownerDocument || this
                      , attaches = dataPriv.access(doc, fix);
                    if (!attaches) {
                        doc.addEventListener(orig, handler, true);
                    }
                    dataPriv.access(doc, fix, (attaches || 0) + 1);
                },
                teardown: function() {
                    var doc = this.ownerDocument || this
                      , attaches = dataPriv.access(doc, fix) - 1;
                    if (!attaches) {
                        doc.removeEventListener(orig, handler, true);
                        dataPriv.remove(doc, fix);
                    } else {
                        dataPriv.access(doc, fix, attaches);
                    }
                }
            };
        });
    }
    var location = window.location;
    var nonce = jQuery.now();
    var rquery = (/\?/);
    jQuery.parseXML = function(data) {
        var xml;
        if (!data || typeof data !== "string") {
            return null;
        }
        try {
            xml = (new window.DOMParser()).parseFromString(data, "text/xml");
        } catch (e) {
            xml = undefined;
        }
        if (!xml || xml.getElementsByTagName("parsererror").length) {
            jQuery.error("Invalid XML: " + data);
        }
        return xml;
    }
    ;
    var rbracket = /\[\]$/
      , rCRLF = /\r?\n/g
      , rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i
      , rsubmittable = /^(?:input|select|textarea|keygen)/i;
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (Array.isArray(obj)) {
            jQuery.each(obj, function(i, v) {
                if (traditional || rbracket.test(prefix)) {
                    add(prefix, v);
                } else {
                    buildParams(prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, traditional, add);
                }
            });
        } else if (!traditional && jQuery.type(obj) === "object") {
            for (name in obj) {
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }
        } else {
            add(prefix, obj);
        }
    }
    jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, valueOrFunction) {
            var value = jQuery.isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
            s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
        };
        if (Array.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
            jQuery.each(a, function() {
                add(this.name, this.value);
            });
        } else {
            for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add);
            }
        }
        return s.join("&");
    }
    ;
    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            }).filter(function() {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                if (val == null) {
                    return null;
                }
                if (Array.isArray(val)) {
                    return jQuery.map(val, function(val) {
                        return {
                            name: elem.name,
                            value: val.replace(rCRLF, "\r\n")
                        };
                    });
                }
                return {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                };
            }).get();
        }
    });
    var r20 = /%20/g
      , rhash = /#.*$/
      , rantiCache = /([?&])_=[^&]*/
      , rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg
      , rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
      , rnoContent = /^(?:GET|HEAD)$/
      , rprotocol = /^\/\//
      , prefilters = {}
      , transports = {}
      , allTypes = "*/".concat("*")
      , originAnchor = document.createElement("a");
    originAnchor.href = location.href;
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
            if (jQuery.isFunction(func)) {
                while ((dataType = dataTypes[i++])) {
                    if (dataType[0] === "+") {
                        dataType = dataType.slice(1) || "*";
                        (structure[dataType] = structure[dataType] || []).unshift(func);
                    } else {
                        (structure[dataType] = structure[dataType] || []).push(func);
                    }
                }
            }
        }
        ;
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        var inspected = {}
          , seekingTransport = (structure === transports);
        function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
                    options.dataTypes.unshift(dataTypeOrTransport);
                    inspect(dataTypeOrTransport);
                    return false;
                } else if (seekingTransport) {
                    return !(selected = dataTypeOrTransport);
                }
            });
            return selected;
        }
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }
    function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) {
            if (src[key] !== undefined) {
                (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep);
        }
        return target;
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
        var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
            }
        }
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break;
                }
            }
        }
        if (dataTypes[0]in responses) {
            finalDataType = dataTypes[0];
        } else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) {
                    firstDataType = type;
                }
            }
            finalDataType = finalDataType || firstDataType;
        }
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
        }
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
        if (dataTypes[1]) {
            for (conv in s.converters) {
                converters[conv.toLowerCase()] = s.converters[conv];
            }
        }
        current = dataTypes.shift();
        while (current) {
            if (s.responseFields[current]) {
                jqXHR[s.responseFields[current]] = response;
            }
            if (!prev && isSuccess && s.dataFilter) {
                response = s.dataFilter(response, s.dataType);
            }
            prev = current;
            current = dataTypes.shift();
            if (current) {
                if (current === "*") {
                    current = prev;
                } else if (prev !== "*" && prev !== current) {
                    conv = converters[prev + " " + current] || converters["* " + current];
                    if (!conv) {
                        for (conv2 in converters) {
                            tmp = conv2.split(" ");
                            if (tmp[1] === current) {
                                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                                if (conv) {
                                    if (conv === true) {
                                        conv = converters[conv2];
                                    } else if (converters[conv2] !== true) {
                                        current = tmp[0];
                                        dataTypes.unshift(tmp[1]);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    if (conv !== true) {
                        if (conv && s.throws) {
                            response = conv(response);
                        } else {
                            try {
                                response = conv(response);
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e : "No conversion from " + prev + " to " + current
                                };
                            }
                        }
                    }
                }
            }
        }
        return {
            state: "success",
            data: response
        };
    }
    jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: location.href,
            type: "GET",
            isLocal: rlocalProtocol.test(location.protocol),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": true,
                "text json": JSON.parse,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: true,
                context: true
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            if (typeof url === "object") {
                options = url;
                url = undefined;
            }
            options = options || {};
            var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, urlAnchor, completed, fireGlobals, i, uncached, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, strAbort = "canceled", jqXHR = {
                readyState: 0,
                getResponseHeader: function(key) {
                    var match;
                    if (completed) {
                        if (!responseHeaders) {
                            responseHeaders = {};
                            while ((match = rheaders.exec(responseHeadersString))) {
                                responseHeaders[match[1].toLowerCase()] = match[2];
                            }
                        }
                        match = responseHeaders[key.toLowerCase()];
                    }
                    return match == null ? null : match;
                },
                getAllResponseHeaders: function() {
                    return completed ? responseHeadersString : null;
                },
                setRequestHeader: function(name, value) {
                    if (completed == null) {
                        name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
                        requestHeaders[name] = value;
                    }
                    return this;
                },
                overrideMimeType: function(type) {
                    if (completed == null) {
                        s.mimeType = type;
                    }
                    return this;
                },
                statusCode: function(map) {
                    var code;
                    if (map) {
                        if (completed) {
                            jqXHR.always(map[jqXHR.status]);
                        } else {
                            for (code in map) {
                                statusCode[code] = [statusCode[code], map[code]];
                            }
                        }
                    }
                    return this;
                },
                abort: function(statusText) {
                    var finalText = statusText || strAbort;
                    if (transport) {
                        transport.abort(finalText);
                    }
                    done(0, finalText);
                    return this;
                }
            };
            deferred.promise(jqXHR);
            s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//");
            s.type = options.method || options.type || s.method || s.type;
            s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];
            if (s.crossDomain == null) {
                urlAnchor = document.createElement("a");
                try {
                    urlAnchor.href = s.url;
                    urlAnchor.href = urlAnchor.href;
                    s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
                } catch (e) {
                    s.crossDomain = true;
                }
            }
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional);
            }
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
            if (completed) {
                return jqXHR;
            }
            fireGlobals = jQuery.event && s.global;
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart");
            }
            s.type = s.type.toUpperCase();
            s.hasContent = !rnoContent.test(s.type);
            cacheURL = s.url.replace(rhash, "");
            if (!s.hasContent) {
                uncached = s.url.slice(cacheURL.length);
                if (s.data) {
                    cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;
                    delete s.data;
                }
                if (s.cache === false) {
                    cacheURL = cacheURL.replace(rantiCache, "$1");
                    uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + (nonce++) + uncached;
                }
                s.url = cacheURL + uncached;
            } else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
                s.data = s.data.replace(r20, "+");
            }
            if (s.ifModified) {
                if (jQuery.lastModified[cacheURL]) {
                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
                }
                if (jQuery.etag[cacheURL]) {
                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
                }
            }
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader("Content-Type", s.contentType);
            }
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i]);
            }
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {
                return jqXHR.abort();
            }
            strAbort = "abort";
            completeDeferred.add(s.complete);
            jqXHR.done(s.success);
            jqXHR.fail(s.error);
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
            if (!transport) {
                done(-1, "No Transport");
            } else {
                jqXHR.readyState = 1;
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [jqXHR, s]);
                }
                if (completed) {
                    return jqXHR;
                }
                if (s.async && s.timeout > 0) {
                    timeoutTimer = window.setTimeout(function() {
                        jqXHR.abort("timeout");
                    }, s.timeout);
                }
                try {
                    completed = false;
                    transport.send(requestHeaders, done);
                } catch (e) {
                    if (completed) {
                        throw e;
                    }
                    done(-1, e);
                }
            }
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                if (completed) {
                    return;
                }
                completed = true;
                if (timeoutTimer) {
                    window.clearTimeout(timeoutTimer);
                }
                transport = undefined;
                responseHeadersString = headers || "";
                jqXHR.readyState = status > 0 ? 4 : 0;
                isSuccess = status >= 200 && status < 300 || status === 304;
                if (responses) {
                    response = ajaxHandleResponses(s, jqXHR, responses);
                }
                response = ajaxConvert(s, response, jqXHR, isSuccess);
                if (isSuccess) {
                    if (s.ifModified) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if (modified) {
                            jQuery.lastModified[cacheURL] = modified;
                        }
                        modified = jqXHR.getResponseHeader("etag");
                        if (modified) {
                            jQuery.etag[cacheURL] = modified;
                        }
                    }
                    if (status === 204 || s.type === "HEAD") {
                        statusText = "nocontent";
                    } else if (status === 304) {
                        statusText = "notmodified";
                    } else {
                        statusText = response.state;
                        success = response.data;
                        error = response.error;
                        isSuccess = !error;
                    }
                } else {
                    error = statusText;
                    if (status || !statusText) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0;
                        }
                    }
                }
                jqXHR.status = status;
                jqXHR.statusText = (nativeStatusText || statusText) + "";
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
                } else {
                    deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
                }
                jqXHR.statusCode(statusCode);
                statusCode = undefined;
                if (fireGlobals) {
                    globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
                }
                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                    if (!(--jQuery.active)) {
                        jQuery.event.trigger("ajaxStop");
                    }
                }
            }
            return jqXHR;
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        getScript: function(url, callback) {
            return jQuery.get(url, undefined, callback, "script");
        }
    });
    jQuery.each(["get", "post"], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }
            return jQuery.ajax(jQuery.extend({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            }, jQuery.isPlainObject(url) && url));
        }
        ;
    });
    jQuery._evalUrl = function(url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            cache: true,
            async: false,
            global: false,
            "throws": true
        });
    }
    ;
    jQuery.fn.extend({
        wrapAll: function(html) {
            var wrap;
            if (this[0]) {
                if (jQuery.isFunction(html)) {
                    html = html.call(this[0]);
                }
                wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    wrap.insertBefore(this[0]);
                }
                wrap.map(function() {
                    var elem = this;
                    while (elem.firstElementChild) {
                        elem = elem.firstElementChild;
                    }
                    return elem;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapInner(html.call(this, i));
                });
            }
            return this.each(function() {
                var self = jQuery(this)
                  , contents = self.contents();
                if (contents.length) {
                    contents.wrapAll(html);
                } else {
                    self.append(html);
                }
            });
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function(selector) {
            this.parent(selector).not("body").each(function() {
                jQuery(this).replaceWith(this.childNodes);
            });
            return this;
        }
    });
    jQuery.expr.pseudos.hidden = function(elem) {
        return !jQuery.expr.pseudos.visible(elem);
    }
    ;
    jQuery.expr.pseudos.visible = function(elem) {
        return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
    }
    ;
    jQuery.ajaxSettings.xhr = function() {
        try {
            return new window.XMLHttpRequest();
        } catch (e) {}
    }
    ;
    var xhrSuccessStatus = {
        0: 200,
        1223: 204
    }
      , xhrSupported = jQuery.ajaxSettings.xhr();
    support.cors = !!xhrSupported && ("withCredentials"in xhrSupported);
    support.ajax = xhrSupported = !!xhrSupported;
    jQuery.ajaxTransport(function(options) {
        var callback, errorCallback;
        if (support.cors || xhrSupported && !options.crossDomain) {
            return {
                send: function(headers, complete) {
                    var i, xhr = options.xhr();
                    xhr.open(options.type, options.url, options.async, options.username, options.password);
                    if (options.xhrFields) {
                        for (i in options.xhrFields) {
                            xhr[i] = options.xhrFields[i];
                        }
                    }
                    if (options.mimeType && xhr.overrideMimeType) {
                        xhr.overrideMimeType(options.mimeType);
                    }
                    if (!options.crossDomain && !headers["X-Requested-With"]) {
                        headers["X-Requested-With"] = "XMLHttpRequest";
                    }
                    for (i in headers) {
                        xhr.setRequestHeader(i, headers[i]);
                    }
                    callback = function(type) {
                        return function() {
                            if (callback) {
                                callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;
                                if (type === "abort") {
                                    xhr.abort();
                                } else if (type === "error") {
                                    if (typeof xhr.status !== "number") {
                                        complete(0, "error");
                                    } else {
                                        complete(xhr.status, xhr.statusText);
                                    }
                                } else {
                                    complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? {
                                        binary: xhr.response
                                    } : {
                                        text: xhr.responseText
                                    }, xhr.getAllResponseHeaders());
                                }
                            }
                        }
                        ;
                    }
                    ;
                    xhr.onload = callback();
                    errorCallback = xhr.onerror = callback("error");
                    if (xhr.onabort !== undefined) {
                        xhr.onabort = errorCallback;
                    } else {
                        xhr.onreadystatechange = function() {
                            if (xhr.readyState === 4) {
                                window.setTimeout(function() {
                                    if (callback) {
                                        errorCallback();
                                    }
                                });
                            }
                        }
                        ;
                    }
                    callback = callback("abort");
                    try {
                        xhr.send(options.hasContent && options.data || null);
                    } catch (e) {
                        if (callback) {
                            throw e;
                        }
                    }
                },
                abort: function() {
                    if (callback) {
                        callback();
                    }
                }
            };
        }
    });
    jQuery.ajaxPrefilter(function(s) {
        if (s.crossDomain) {
            s.contents.script = false;
        }
    });
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(text) {
                jQuery.globalEval(text);
                return text;
            }
        }
    });
    jQuery.ajaxPrefilter("script", function(s) {
        if (s.cache === undefined) {
            s.cache = false;
        }
        if (s.crossDomain) {
            s.type = "GET";
        }
    });
    jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, callback;
            return {
                send: function(_, complete) {
                    script = jQuery("<script>").prop({
                        charset: s.scriptCharset,
                        src: s.url
                    }).on("load error", callback = function(evt) {
                        script.remove();
                        callback = null;
                        if (evt) {
                            complete(evt.type === "error" ? 404 : 200, evt.type);
                        }
                    }
                    );
                    document.head.appendChild(script[0]);
                },
                abort: function() {
                    if (callback) {
                        callback();
                    }
                }
            };
        }
    });
    var oldCallbacks = []
      , rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
            this[callback] = true;
            return callback;
        }
    });
    jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");
        if (jsonProp || s.dataTypes[0] === "jsonp") {
            callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
            if (jsonProp) {
                s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
            } else if (s.jsonp !== false) {
                s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
            }
            s.converters["script json"] = function() {
                if (!responseContainer) {
                    jQuery.error(callbackName + " was not called");
                }
                return responseContainer[0];
            }
            ;
            s.dataTypes[0] = "json";
            overwritten = window[callbackName];
            window[callbackName] = function() {
                responseContainer = arguments;
            }
            ;
            jqXHR.always(function() {
                if (overwritten === undefined) {
                    jQuery(window).removeProp(callbackName);
                } else {
                    window[callbackName] = overwritten;
                }
                if (s[callbackName]) {
                    s.jsonpCallback = originalSettings.jsonpCallback;
                    oldCallbacks.push(callbackName);
                }
                if (responseContainer && jQuery.isFunction(overwritten)) {
                    overwritten(responseContainer[0]);
                }
                responseContainer = overwritten = undefined;
            });
            return "script";
        }
    });
    support.createHTMLDocument = (function() {
        var body = document.implementation.createHTMLDocument("").body;
        body.innerHTML = "<form></form><form></form>";
        return body.childNodes.length === 2;
    }
    )();
    jQuery.parseHTML = function(data, context, keepScripts) {
        if (typeof data !== "string") {
            return [];
        }
        if (typeof context === "boolean") {
            keepScripts = context;
            context = false;
        }
        var base, parsed, scripts;
        if (!context) {
            if (support.createHTMLDocument) {
                context = document.implementation.createHTMLDocument("");
                base = context.createElement("base");
                base.href = document.location.href;
                context.head.appendChild(base);
            } else {
                context = document;
            }
        }
        parsed = rsingleTag.exec(data);
        scripts = !keepScripts && [];
        if (parsed) {
            return [context.createElement(parsed[1])];
        }
        parsed = buildFragment([data], context, scripts);
        if (scripts && scripts.length) {
            jQuery(scripts).remove();
        }
        return jQuery.merge([], parsed.childNodes);
    }
    ;
    jQuery.fn.load = function(url, params, callback) {
        var selector, type, response, self = this, off = url.indexOf(" ");
        if (off > -1) {
            selector = stripAndCollapse(url.slice(off));
            url = url.slice(0, off);
        }
        if (jQuery.isFunction(params)) {
            callback = params;
            params = undefined;
        } else if (params && typeof params === "object") {
            type = "POST";
        }
        if (self.length > 0) {
            jQuery.ajax({
                url: url,
                type: type || "GET",
                dataType: "html",
                data: params
            }).done(function(responseText) {
                response = arguments;
                self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
            }).always(callback && function(jqXHR, status) {
                self.each(function() {
                    callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
                });
            }
            );
        }
        return this;
    }
    ;
    jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn);
        }
        ;
    });
    jQuery.expr.pseudos.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
        }).length;
    }
    ;
    jQuery.offset = {
        setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
            if (position === "static") {
                elem.style.position = "relative";
            }
            curOffset = curElem.offset();
            curCSSTop = jQuery.css(elem, "top");
            curCSSLeft = jQuery.css(elem, "left");
            calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;
            } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0;
            }
            if (jQuery.isFunction(options)) {
                options = options.call(elem, i, jQuery.extend({}, curOffset));
            }
            if (options.top != null) {
                props.top = (options.top - curOffset.top) + curTop;
            }
            if (options.left != null) {
                props.left = (options.left - curOffset.left) + curLeft;
            }
            if ("using"in options) {
                options.using.call(elem, props);
            } else {
                curElem.css(props);
            }
        }
    };
    jQuery.fn.extend({
        offset: function(options) {
            if (arguments.length) {
                return options === undefined ? this : this.each(function(i) {
                    jQuery.offset.setOffset(this, options, i);
                });
            }
            var doc, docElem, rect, win, elem = this[0];
            if (!elem) {
                return;
            }
            if (!elem.getClientRects().length) {
                return {
                    top: 0,
                    left: 0
                };
            }
            rect = elem.getBoundingClientRect();
            doc = elem.ownerDocument;
            docElem = doc.documentElement;
            win = doc.defaultView;
            return {
                top: rect.top + win.pageYOffset - docElem.clientTop,
                left: rect.left + win.pageXOffset - docElem.clientLeft
            };
        },
        position: function() {
            if (!this[0]) {
                return;
            }
            var offsetParent, offset, elem = this[0], parentOffset = {
                top: 0,
                left: 0
            };
            if (jQuery.css(elem, "position") === "fixed") {
                offset = elem.getBoundingClientRect();
            } else {
                offsetParent = this.offsetParent();
                offset = this.offset();
                if (!nodeName(offsetParent[0], "html")) {
                    parentOffset = offsetParent.offset();
                }
                parentOffset = {
                    top: parentOffset.top + jQuery.css(offsetParent[0], "borderTopWidth", true),
                    left: parentOffset.left + jQuery.css(offsetParent[0], "borderLeftWidth", true)
                };
            }
            return {
                top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
            };
        },
        offsetParent: function() {
            return this.map(function() {
                var offsetParent = this.offsetParent;
                while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent || documentElement;
            });
        }
    });
    jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = "pageYOffset" === prop;
        jQuery.fn[method] = function(val) {
            return access(this, function(elem, method, val) {
                var win;
                if (jQuery.isWindow(elem)) {
                    win = elem;
                } else if (elem.nodeType === 9) {
                    win = elem.defaultView;
                }
                if (val === undefined) {
                    return win ? win[prop] : elem[method];
                }
                if (win) {
                    win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
                } else {
                    elem[method] = val;
                }
            }, method, val, arguments.length);
        }
        ;
    });
    jQuery.each(["top", "left"], function(i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
            if (computed) {
                computed = curCSS(elem, prop);
                return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
            }
        });
    });
    jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean")
                  , extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
                return access(this, function(elem, type, value) {
                    var doc;
                    if (jQuery.isWindow(elem)) {
                        return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
                    }
                    if (elem.nodeType === 9) {
                        doc = elem.documentElement;
                        return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
                    }
                    return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : undefined, chainable);
            }
            ;
        });
    });
    jQuery.fn.extend({
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn);
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
            return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        }
    });
    jQuery.holdReady = function(hold) {
        if (hold) {
            jQuery.readyWait++;
        } else {
            jQuery.ready(true);
        }
    }
    ;
    jQuery.isArray = Array.isArray;
    jQuery.parseJSON = JSON.parse;
    jQuery.nodeName = nodeName;
    if (typeof define === "function" && define.amd) {
        define("jquery", [], function() {
            return jQuery;
        });
    }
    var _jQuery = window.jQuery
      , _$ = window.$;
    jQuery.noConflict = function(deep) {
        if (window.$ === jQuery) {
            window.$ = _$;
        }
        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery;
        }
        return jQuery;
    }
    ;
    if (!noGlobal) {
        window.jQuery = window.$ = jQuery;
    }
    return jQuery;
});
;;!function(i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
}(function(i) {
    "use strict";
    var e = window.Slick || {};
    (e = function() {
        var e = 0;
        return function(t, o) {
            var s, n = this;
            n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: i(t),
                appendDots: i(t),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(e, t) {
                    return i('<button type="button" />').text(t + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            },
            n.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            },
            i.extend(n, n.initials),
            n.activeBreakpoint = null,
            n.animType = null,
            n.animProp = null,
            n.breakpoints = [],
            n.breakpointSettings = [],
            n.cssTransitions = !1,
            n.focussed = !1,
            n.interrupted = !1,
            n.hidden = "hidden",
            n.paused = !0,
            n.positionProp = null,
            n.respondTo = null,
            n.rowCount = 1,
            n.shouldClick = !0,
            n.$slider = i(t),
            n.$slidesCache = null,
            n.transformType = null,
            n.transitionType = null,
            n.visibilityChange = "visibilitychange",
            n.windowWidth = 0,
            n.windowTimer = null,
            s = i(t).data("slick") || {},
            n.options = i.extend({}, n.defaults, o, s),
            n.currentSlide = n.options.initialSlide,
            n.originalSettings = n.options,
            void 0 !== document.mozHidden ? (n.hidden = "mozHidden",
            n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden",
            n.visibilityChange = "webkitvisibilitychange"),
            n.autoPlay = i.proxy(n.autoPlay, n),
            n.autoPlayClear = i.proxy(n.autoPlayClear, n),
            n.autoPlayIterator = i.proxy(n.autoPlayIterator, n),
            n.changeSlide = i.proxy(n.changeSlide, n),
            n.clickHandler = i.proxy(n.clickHandler, n),
            n.selectHandler = i.proxy(n.selectHandler, n),
            n.setPosition = i.proxy(n.setPosition, n),
            n.swipeHandler = i.proxy(n.swipeHandler, n),
            n.dragHandler = i.proxy(n.dragHandler, n),
            n.keyHandler = i.proxy(n.keyHandler, n),
            n.instanceUid = e++,
            n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/,
            n.registerBreakpoints(),
            n.init(!0)
        }
    }()).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }
    ,
    e.prototype.addSlide = e.prototype.slickAdd = function(e, t, o) {
        var s = this;
        if ("boolean" == typeof t)
            o = t,
            t = null;
        else if (t < 0 || t >= s.slideCount)
            return !1;
        s.unload(),
        "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack),
        s.$slides = s.$slideTrack.children(this.options.slide),
        s.$slideTrack.children(this.options.slide).detach(),
        s.$slideTrack.append(s.$slides),
        s.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e)
        }),
        s.$slidesCache = s.$slides,
        s.reinit()
    }
    ,
    e.prototype.animateHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.animate({
                height: e
            }, i.options.speed)
        }
    }
    ,
    e.prototype.animateSlide = function(e, t) {
        var o = {}
          , s = this;
        s.animateHeight(),
        !0 === s.options.rtl && !1 === s.options.vertical && (e = -e),
        !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
            left: e
        }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
            top: e
        }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
        i({
            animStart: s.currentLeft
        }).animate({
            animStart: e
        }, {
            duration: s.options.speed,
            easing: s.options.easing,
            step: function(i) {
                i = Math.ceil(i),
                !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)",
                s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)",
                s.$slideTrack.css(o))
            },
            complete: function() {
                t && t.call()
            }
        })) : (s.applyTransition(),
        e = Math.ceil(e),
        !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)",
        s.$slideTrack.css(o),
        t && setTimeout(function() {
            s.disableTransition(),
            t.call()
        }, s.options.speed))
    }
    ,
    e.prototype.getNavTarget = function() {
        var e = this
          , t = e.options.asNavFor;
        return t && null !== t && (t = i(t).not(e.$slider)),
        t
    }
    ,
    e.prototype.asNavFor = function(e) {
        var t = this.getNavTarget();
        null !== t && "object" == typeof t && t.each(function() {
            var t = i(this).slick("getSlick");
            t.unslicked || t.slideHandler(e, !0)
        })
    }
    ,
    e.prototype.applyTransition = function(i) {
        var e = this
          , t = {};
        !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase,
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }
    ,
    e.prototype.autoPlay = function() {
        var i = this;
        i.autoPlayClear(),
        i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
    }
    ,
    e.prototype.autoPlayClear = function() {
        var i = this;
        i.autoPlayTimer && clearInterval(i.autoPlayTimer)
    }
    ,
    e.prototype.autoPlayIterator = function() {
        var i = this
          , e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll,
        i.currentSlide - 1 == 0 && (i.direction = 1))),
        i.slideHandler(e))
    }
    ,
    e.prototype.buildArrows = function() {
        var e = this;
        !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"),
        e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"),
        e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows),
        e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows),
        !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }
    ,
    e.prototype.buildDots = function() {
        var e, t, o = this;
        if (!0 === o.options.dots) {
            for (o.$slider.addClass("slick-dotted"),
            t = i("<ul />").addClass(o.options.dotsClass),
            e = 0; e <= o.getDotCount(); e += 1)
                t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
            o.$dots = t.appendTo(o.options.appendDots),
            o.$dots.find("li").first().addClass("slick-active")
        }
    }
    ,
    e.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"),
        e.slideCount = e.$slides.length,
        e.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "")
        }),
        e.$slider.addClass("slick-slider"),
        e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(),
        e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(),
        e.$slideTrack.css("opacity", 0),
        !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1),
        i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
        e.setupInfinite(),
        e.buildArrows(),
        e.buildDots(),
        e.updateDots(),
        e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
        !0 === e.options.draggable && e.$list.addClass("draggable")
    }
    ,
    e.prototype.buildRows = function() {
        var i, e, t, o, s, n, r, l = this;
        if (o = document.createDocumentFragment(),
        n = l.$slider.children(),
        l.options.rows > 1) {
            for (r = l.options.slidesPerRow * l.options.rows,
            s = Math.ceil(n.length / r),
            i = 0; i < s; i++) {
                var d = document.createElement("div");
                for (e = 0; e < l.options.rows; e++) {
                    var a = document.createElement("div");
                    for (t = 0; t < l.options.slidesPerRow; t++) {
                        var c = i * r + (e * l.options.slidesPerRow + t);
                        n.get(c) && a.appendChild(n.get(c))
                    }
                    d.appendChild(a)
                }
                o.appendChild(d)
            }
            l.$slider.empty().append(o),
            l.$slider.children().children().children().css({
                width: 100 / l.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }
    ,
    e.prototype.checkResponsive = function(e, t) {
        var o, s, n, r = this, l = !1, d = r.$slider.width(), a = window.innerWidth || i(window).width();
        if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)),
        r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            s = null;
            for (o in r.breakpoints)
                r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
            null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s,
            "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]),
            !0 === e && (r.currentSlide = r.options.initialSlide),
            r.refresh(e)),
            l = s) : (r.activeBreakpoint = s,
            "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]),
            !0 === e && (r.currentSlide = r.options.initialSlide),
            r.refresh(e)),
            l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null,
            r.options = r.originalSettings,
            !0 === e && (r.currentSlide = r.options.initialSlide),
            r.refresh(e),
            l = s),
            e || !1 === l || r.$slider.trigger("breakpoint", [r, l])
        }
    }
    ,
    e.prototype.changeSlide = function(e, t) {
        var o, s, n, r = this, l = i(e.currentTarget);
        switch (l.is("a") && e.preventDefault(),
        l.is("li") || (l = l.closest("li")),
        n = r.slideCount % r.options.slidesToScroll != 0,
        o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll,
        e.data.message) {
        case "previous":
            s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o,
            r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
            break;
        case "next":
            s = 0 === o ? r.options.slidesToScroll : o,
            r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
            break;
        case "index":
            var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
            r.slideHandler(r.checkNavigable(d), !1, t),
            l.children().trigger("focus");
            break;
        default:
            return
        }
    }
    ,
    e.prototype.checkNavigable = function(i) {
        var e, t;
        if (e = this.getNavigableIndexes(),
        t = 0,
        i > e[e.length - 1])
            i = e[e.length - 1];
        else
            for (var o in e) {
                if (i < e[o]) {
                    i = t;
                    break
                }
                t = e[o]
            }
        return i
    }
    ,
    e.prototype.cleanUpEvents = function() {
        var e = this;
        e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)),
        !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)),
        e.$slider.off("focus.slick blur.slick"),
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
        e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
        !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
        e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
        e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
        e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
        e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
        e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
        e.$list.off("click.slick", e.clickHandler),
        i(document).off(e.visibilityChange, e.visibility),
        e.cleanUpSlideEvents(),
        !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler),
        i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange),
        i(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
        i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault),
        i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
    }
    ,
    e.prototype.cleanUpSlideEvents = function() {
        var e = this;
        e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }
    ,
    e.prototype.cleanUpRows = function() {
        var i, e = this;
        e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"),
        e.$slider.empty().append(i))
    }
    ,
    e.prototype.clickHandler = function(i) {
        !1 === this.shouldClick && (i.stopImmediatePropagation(),
        i.stopPropagation(),
        i.preventDefault())
    }
    ,
    e.prototype.destroy = function(e) {
        var t = this;
        t.autoPlayClear(),
        t.touchObject = {},
        t.cleanUpEvents(),
        i(".slick-cloned", t.$slider).detach(),
        t.$dots && t.$dots.remove(),
        t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
        t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
        t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            i(this).attr("style", i(this).data("originalStyling"))
        }),
        t.$slideTrack.children(this.options.slide).detach(),
        t.$slideTrack.detach(),
        t.$list.detach(),
        t.$slider.append(t.$slides)),
        t.cleanUpRows(),
        t.$slider.removeClass("slick-slider"),
        t.$slider.removeClass("slick-initialized"),
        t.$slider.removeClass("slick-dotted"),
        t.unslicked = !0,
        e || t.$slider.trigger("destroy", [t])
    }
    ,
    e.prototype.disableTransition = function(i) {
        var e = this
          , t = {};
        t[e.transitionType] = "",
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }
    ,
    e.prototype.fadeSlide = function(i, e) {
        var t = this;
        !1 === t.cssTransitions ? (t.$slides.eq(i).css({
            zIndex: t.options.zIndex
        }),
        t.$slides.eq(i).animate({
            opacity: 1
        }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i),
        t.$slides.eq(i).css({
            opacity: 1,
            zIndex: t.options.zIndex
        }),
        e && setTimeout(function() {
            t.disableTransition(i),
            e.call()
        }, t.options.speed))
    }
    ,
    e.prototype.fadeSlideOut = function(i) {
        var e = this;
        !1 === e.cssTransitions ? e.$slides.eq(i).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(i),
        e.$slides.eq(i).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }
    ,
    e.prototype.filterSlides = e.prototype.slickFilter = function(i) {
        var e = this;
        null !== i && (e.$slidesCache = e.$slides,
        e.unload(),
        e.$slideTrack.children(this.options.slide).detach(),
        e.$slidesCache.filter(i).appendTo(e.$slideTrack),
        e.reinit())
    }
    ,
    e.prototype.focusHandler = function() {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(t) {
            t.stopImmediatePropagation();
            var o = i(this);
            setTimeout(function() {
                e.options.pauseOnFocus && (e.focussed = o.is(":focus"),
                e.autoPlay())
            }, 0)
        })
    }
    ,
    e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }
    ,
    e.prototype.getDotCount = function() {
        var i = this
          , e = 0
          , t = 0
          , o = 0;
        if (!0 === i.options.infinite)
            if (i.slideCount <= i.options.slidesToShow)
                ++o;
            else
                for (; e < i.slideCount; )
                    ++o,
                    e = t + i.options.slidesToScroll,
                    t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else if (!0 === i.options.centerMode)
            o = i.slideCount;
        else if (i.options.asNavFor)
            for (; e < i.slideCount; )
                ++o,
                e = t + i.options.slidesToScroll,
                t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else
            o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
        return o - 1
    }
    ,
    e.prototype.getLeft = function(i) {
        var e, t, o, s, n = this, r = 0;
        return n.slideOffset = 0,
        t = n.$slides.first().outerHeight(!0),
        !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1,
        s = -1,
        !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)),
        r = t * n.options.slidesToShow * s),
        n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1,
        r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1,
        r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth,
        r = (i + n.options.slidesToShow - n.slideCount) * t),
        n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0,
        r = 0),
        !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0,
        n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)),
        e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r,
        !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow),
        e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0,
        !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1),
        e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0,
        e += (n.$list.width() - o.outerWidth()) / 2)),
        e
    }
    ,
    e.prototype.getOption = e.prototype.slickGetOption = function(i) {
        return this.options[i]
    }
    ,
    e.prototype.getNavigableIndexes = function() {
        var i, e = this, t = 0, o = 0, s = [];
        for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll,
        o = -1 * e.options.slidesToScroll,
        i = 2 * e.slideCount); t < i; )
            s.push(t),
            t = o + e.options.slidesToScroll,
            o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return s
    }
    ,
    e.prototype.getSlick = function() {
        return this
    }
    ,
    e.prototype.getSlideCount = function() {
        var e, t, o = this;
        return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0,
        !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function(s, n) {
            if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft)
                return e = n,
                !1
        }),
        Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
    }
    ,
    e.prototype.goTo = e.prototype.slickGoTo = function(i, e) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(i)
            }
        }, e)
    }
    ,
    e.prototype.init = function(e) {
        var t = this;
        i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"),
        t.buildRows(),
        t.buildOut(),
        t.setProps(),
        t.startLoad(),
        t.loadSlider(),
        t.initializeEvents(),
        t.updateArrows(),
        t.updateDots(),
        t.checkResponsive(!0),
        t.focusHandler()),
        e && t.$slider.trigger("init", [t]),
        !0 === t.options.accessibility && t.initADA(),
        t.options.autoplay && (t.paused = !1,
        t.autoPlay())
    }
    ,
    e.prototype.initADA = function() {
        var e = this
          , t = Math.ceil(e.slideCount / e.options.slidesToShow)
          , o = e.getNavigableIndexes().filter(function(i) {
            return i >= 0 && i < e.slideCount
        });
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }),
        null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t) {
            var s = o.indexOf(t);
            i(this).attr({
                role: "tabpanel",
                id: "slick-slide" + e.instanceUid + t,
                tabindex: -1
            }),
            -1 !== s && i(this).attr({
                "aria-describedby": "slick-slide-control" + e.instanceUid + s
            })
        }),
        e.$dots.attr("role", "tablist").find("li").each(function(s) {
            var n = o[s];
            i(this).attr({
                role: "presentation"
            }),
            i(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + e.instanceUid + s,
                "aria-controls": "slick-slide" + e.instanceUid + n,
                "aria-label": s + 1 + " of " + t,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(e.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++)
            e.$slides.eq(s).attr("tabindex", 0);
        e.activateADA()
    }
    ,
    e.prototype.initArrowEvents = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, i.changeSlide),
        i.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, i.changeSlide),
        !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler),
        i.$nextArrow.on("keydown.slick", i.keyHandler)))
    }
    ,
    e.prototype.initDotEvents = function() {
        var e = this;
        !0 === e.options.dots && (i("li", e.$dots).on("click.slick", {
            message: "index"
        }, e.changeSlide),
        !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)),
        !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }
    ,
    e.prototype.initSlideEvents = function() {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)))
    }
    ,
    e.prototype.initializeEvents = function() {
        var e = this;
        e.initArrowEvents(),
        e.initDotEvents(),
        e.initSlideEvents(),
        e.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, e.swipeHandler),
        e.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, e.swipeHandler),
        e.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, e.swipeHandler),
        e.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, e.swipeHandler),
        e.$list.on("click.slick", e.clickHandler),
        i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
        !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)),
        i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)),
        i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
        i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
        i(e.setPosition)
    }
    ,
    e.prototype.initUI = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(),
        i.$nextArrow.show()),
        !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show()
    }
    ,
    e.prototype.keyHandler = function(i) {
        var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "next" : "previous"
            }
        }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "previous" : "next"
            }
        }))
    }
    ,
    e.prototype.lazyLoad = function() {
        function e(e) {
            i("img[data-lazy]", e).each(function() {
                var e = i(this)
                  , t = i(this).attr("data-lazy")
                  , o = i(this).attr("data-srcset")
                  , s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes")
                  , r = document.createElement("img");
                r.onload = function() {
                    e.animate({
                        opacity: 0
                    }, 100, function() {
                        o && (e.attr("srcset", o),
                        s && e.attr("sizes", s)),
                        e.attr("src", t).animate({
                            opacity: 1
                        }, 200, function() {
                            e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }),
                        n.$slider.trigger("lazyLoaded", [n, e, t])
                    })
                }
                ,
                r.onerror = function() {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
                    n.$slider.trigger("lazyLoadError", [n, e, t])
                }
                ,
                r.src = t
            })
        }
        var t, o, s, n = this;
        if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)),
        s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide,
        s = Math.ceil(o + n.options.slidesToShow),
        !0 === n.options.fade && (o > 0 && o--,
        s <= n.slideCount && s++)),
        t = n.$slider.find(".slick-slide").slice(o, s),
        "anticipated" === n.options.lazyLoad)
            for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++)
                r < 0 && (r = n.slideCount - 1),
                t = (t = t.add(d.eq(r))).add(d.eq(l)),
                r--,
                l++;
        e(t),
        n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
    }
    ,
    e.prototype.loadSlider = function() {
        var i = this;
        i.setPosition(),
        i.$slideTrack.css({
            opacity: 1
        }),
        i.$slider.removeClass("slick-loading"),
        i.initUI(),
        "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
    }
    ,
    e.prototype.next = e.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }
    ,
    e.prototype.orientationChange = function() {
        var i = this;
        i.checkResponsive(),
        i.setPosition()
    }
    ,
    e.prototype.pause = e.prototype.slickPause = function() {
        var i = this;
        i.autoPlayClear(),
        i.paused = !0
    }
    ,
    e.prototype.play = e.prototype.slickPlay = function() {
        var i = this;
        i.autoPlay(),
        i.options.autoplay = !0,
        i.paused = !1,
        i.focussed = !1,
        i.interrupted = !1
    }
    ,
    e.prototype.postSlide = function(e) {
        var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [t, e]),
        t.animating = !1,
        t.slideCount > t.options.slidesToShow && t.setPosition(),
        t.swipeLeft = null,
        t.options.autoplay && t.autoPlay(),
        !0 === t.options.accessibility && (t.initADA(),
        t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()))
    }
    ,
    e.prototype.prev = e.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }
    ,
    e.prototype.preventDefault = function(i) {
        i.preventDefault()
    }
    ,
    e.prototype.progressiveLazyLoad = function(e) {
        e = e || 1;
        var t, o, s, n, r, l = this, d = i("img[data-lazy]", l.$slider);
        d.length ? (t = d.first(),
        o = t.attr("data-lazy"),
        s = t.attr("data-srcset"),
        n = t.attr("data-sizes") || l.$slider.attr("data-sizes"),
        (r = document.createElement("img")).onload = function() {
            s && (t.attr("srcset", s),
            n && t.attr("sizes", n)),
            t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),
            !0 === l.options.adaptiveHeight && l.setPosition(),
            l.$slider.trigger("lazyLoaded", [l, t, o]),
            l.progressiveLazyLoad()
        }
        ,
        r.onerror = function() {
            e < 3 ? setTimeout(function() {
                l.progressiveLazyLoad(e + 1)
            }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
            l.$slider.trigger("lazyLoadError", [l, t, o]),
            l.progressiveLazyLoad())
        }
        ,
        r.src = o) : l.$slider.trigger("allImagesLoaded", [l])
    }
    ,
    e.prototype.refresh = function(e) {
        var t, o, s = this;
        o = s.slideCount - s.options.slidesToShow,
        !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
        s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
        t = s.currentSlide,
        s.destroy(!0),
        i.extend(s, s.initials, {
            currentSlide: t
        }),
        s.init(),
        e || s.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1)
    }
    ,
    e.prototype.registerBreakpoints = function() {
        var e, t, o, s = this, n = s.options.responsive || null;
        if ("array" === i.type(n) && n.length) {
            s.respondTo = s.options.respondTo || "window";
            for (e in n)
                if (o = s.breakpoints.length - 1,
                n.hasOwnProperty(e)) {
                    for (t = n[e].breakpoint; o >= 0; )
                        s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1),
                        o--;
                    s.breakpoints.push(t),
                    s.breakpointSettings[t] = n[e].settings
                }
            s.breakpoints.sort(function(i, e) {
                return s.options.mobileFirst ? i - e : e - i
            })
        }
    }
    ,
    e.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"),
        e.slideCount = e.$slides.length,
        e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
        e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
        e.registerBreakpoints(),
        e.setProps(),
        e.setupInfinite(),
        e.buildArrows(),
        e.updateArrows(),
        e.initArrowEvents(),
        e.buildDots(),
        e.updateDots(),
        e.initDotEvents(),
        e.cleanUpSlideEvents(),
        e.initSlideEvents(),
        e.checkResponsive(!1, !0),
        !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
        e.setPosition(),
        e.focusHandler(),
        e.paused = !e.options.autoplay,
        e.autoPlay(),
        e.$slider.trigger("reInit", [e])
    }
    ,
    e.prototype.resize = function() {
        var e = this;
        i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay),
        e.windowDelay = window.setTimeout(function() {
            e.windowWidth = i(window).width(),
            e.checkResponsive(),
            e.unslicked || e.setPosition()
        }, 50))
    }
    ,
    e.prototype.removeSlide = e.prototype.slickRemove = function(i, e, t) {
        var o = this;
        if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i,
        o.slideCount < 1 || i < 0 || i > o.slideCount - 1)
            return !1;
        o.unload(),
        !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(),
        o.$slides = o.$slideTrack.children(this.options.slide),
        o.$slideTrack.children(this.options.slide).detach(),
        o.$slideTrack.append(o.$slides),
        o.$slidesCache = o.$slides,
        o.reinit()
    }
    ,
    e.prototype.setCSS = function(i) {
        var e, t, o = this, s = {};
        !0 === o.options.rtl && (i = -i),
        e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px",
        t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px",
        s[o.positionProp] = i,
        !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {},
        !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")",
        o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)",
        o.$slideTrack.css(s)))
    }
    ,
    e.prototype.setDimensions = function() {
        var i = this;
        !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
            padding: "0px " + i.options.centerPadding
        }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow),
        !0 === i.options.centerMode && i.$list.css({
            padding: i.options.centerPadding + " 0px"
        })),
        i.listWidth = i.$list.width(),
        i.listHeight = i.$list.height(),
        !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow),
        i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth),
        i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
        var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
        !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
    }
    ,
    e.prototype.setFade = function() {
        var e, t = this;
        t.$slides.each(function(o, s) {
            e = t.slideWidth * o * -1,
            !0 === t.options.rtl ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            }) : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            })
        }),
        t.$slides.eq(t.currentSlide).css({
            zIndex: t.options.zIndex - 1,
            opacity: 1
        })
    }
    ,
    e.prototype.setHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.css("height", e)
        }
    }
    ,
    e.prototype.setOption = e.prototype.slickSetOption = function() {
        var e, t, o, s, n, r = this, l = !1;
        if ("object" === i.type(arguments[0]) ? (o = arguments[0],
        l = arguments[1],
        n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0],
        s = arguments[1],
        l = arguments[2],
        "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")),
        "single" === n)
            r.options[o] = s;
        else if ("multiple" === n)
            i.each(o, function(i, e) {
                r.options[i] = e
            });
        else if ("responsive" === n)
            for (t in s)
                if ("array" !== i.type(r.options.responsive))
                    r.options.responsive = [s[t]];
                else {
                    for (e = r.options.responsive.length - 1; e >= 0; )
                        r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1),
                        e--;
                    r.options.responsive.push(s[t])
                }
        l && (r.unload(),
        r.reinit())
    }
    ,
    e.prototype.setPosition = function() {
        var i = this;
        i.setDimensions(),
        i.setHeight(),
        !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(),
        i.$slider.trigger("setPosition", [i])
    }
    ,
    e.prototype.setProps = function() {
        var i = this
          , e = document.body.style;
        i.positionProp = !0 === i.options.vertical ? "top" : "left",
        "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"),
        void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0),
        i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex),
        void 0 !== e.OTransform && (i.animType = "OTransform",
        i.transformType = "-o-transform",
        i.transitionType = "OTransition",
        void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)),
        void 0 !== e.MozTransform && (i.animType = "MozTransform",
        i.transformType = "-moz-transform",
        i.transitionType = "MozTransition",
        void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)),
        void 0 !== e.webkitTransform && (i.animType = "webkitTransform",
        i.transformType = "-webkit-transform",
        i.transitionType = "webkitTransition",
        void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)),
        void 0 !== e.msTransform && (i.animType = "msTransform",
        i.transformType = "-ms-transform",
        i.transitionType = "msTransition",
        void 0 === e.msTransform && (i.animType = !1)),
        void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform",
        i.transformType = "transform",
        i.transitionType = "transition"),
        i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType
    }
    ,
    e.prototype.setSlideClasses = function(i) {
        var e, t, o, s, n = this;
        if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"),
        n.$slides.eq(i).addClass("slick-current"),
        !0 === n.options.centerMode) {
            var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
            e = Math.floor(n.options.slidesToShow / 2),
            !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i,
            t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")),
            0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")),
            n.$slides.eq(i).addClass("slick-center")
        } else
            i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow,
            o = !0 === n.options.infinite ? n.options.slidesToShow + i : i,
            n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
    }
    ,
    e.prototype.setupInfinite = function() {
        var e, t, o, s = this;
        if (!0 === s.options.fade && (s.options.centerMode = !1),
        !0 === s.options.infinite && !1 === s.options.fade && (t = null,
        s.slideCount > s.options.slidesToShow)) {
            for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow,
            e = s.slideCount; e > s.slideCount - o; e -= 1)
                t = e - 1,
                i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < o + s.slideCount; e += 1)
                t = e,
                i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
            s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                i(this).attr("id", "")
            })
        }
    }
    ,
    e.prototype.interrupt = function(i) {
        var e = this;
        i || e.autoPlay(),
        e.interrupted = i
    }
    ,
    e.prototype.selectHandler = function(e) {
        var t = this
          , o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide")
          , s = parseInt(o.attr("data-slick-index"));
        s || (s = 0),
        t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s)
    }
    ,
    e.prototype.slideHandler = function(i, e, t) {
        var o, s, n, r, l, d = null, a = this;
        if (e = e || !1,
        !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i))
            if (!1 === e && a.asNavFor(i),
            o = i,
            d = a.getLeft(o),
            r = a.getLeft(a.currentSlide),
            a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft,
            !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll))
                !1 === a.options.fade && (o = a.currentSlide,
                !0 !== t ? a.animateSlide(r, function() {
                    a.postSlide(o)
                }) : a.postSlide(o));
            else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll))
                !1 === a.options.fade && (o = a.currentSlide,
                !0 !== t ? a.animateSlide(r, function() {
                    a.postSlide(o)
                }) : a.postSlide(o));
            else {
                if (a.options.autoplay && clearInterval(a.autoPlayTimer),
                s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o,
                a.animating = !0,
                a.$slider.trigger("beforeChange", [a, a.currentSlide, s]),
                n = a.currentSlide,
                a.currentSlide = s,
                a.setSlideClasses(a.currentSlide),
                a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide),
                a.updateDots(),
                a.updateArrows(),
                !0 === a.options.fade)
                    return !0 !== t ? (a.fadeSlideOut(n),
                    a.fadeSlide(s, function() {
                        a.postSlide(s)
                    })) : a.postSlide(s),
                    void a.animateHeight();
                !0 !== t ? a.animateSlide(d, function() {
                    a.postSlide(s)
                }) : a.postSlide(s)
            }
    }
    ,
    e.prototype.startLoad = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(),
        i.$nextArrow.hide()),
        !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(),
        i.$slider.addClass("slick-loading")
    }
    ,
    e.prototype.swipeDirection = function() {
        var i, e, t, o, s = this;
        return i = s.touchObject.startX - s.touchObject.curX,
        e = s.touchObject.startY - s.touchObject.curY,
        t = Math.atan2(e, i),
        (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)),
        o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
    }
    ,
    e.prototype.swipeEnd = function(i) {
        var e, t, o = this;
        if (o.dragging = !1,
        o.swiping = !1,
        o.scrolling)
            return o.scrolling = !1,
            !1;
        if (o.interrupted = !1,
        o.shouldClick = !(o.touchObject.swipeLength > 10),
        void 0 === o.touchObject.curX)
            return !1;
        if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]),
        o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (t = o.swipeDirection()) {
            case "left":
            case "down":
                e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(),
                o.currentDirection = 0;
                break;
            case "right":
            case "up":
                e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(),
                o.currentDirection = 1
            }
            "vertical" != t && (o.slideHandler(e),
            o.touchObject = {},
            o.$slider.trigger("swipe", [o, t]))
        } else
            o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide),
            o.touchObject = {})
    }
    ,
    e.prototype.swipeHandler = function(i) {
        var e = this;
        if (!(!1 === e.options.swipe || "ontouchend"in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse")))
            switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1,
            e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold,
            !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
            i.data.action) {
            case "start":
                e.swipeStart(i);
                break;
            case "move":
                e.swipeMove(i);
                break;
            case "end":
                e.swipeEnd(i)
            }
    }
    ,
    e.prototype.swipeMove = function(i) {
        var e, t, o, s, n, r, l = this;
        return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null,
        !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide),
        l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX,
        l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY,
        l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))),
        r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))),
        !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0,
        !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r),
        t = l.swipeDirection(),
        void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0,
        i.preventDefault()),
        s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1),
        !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
        o = l.touchObject.swipeLength,
        l.touchObject.edgeHit = !1,
        !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction,
        l.touchObject.edgeHit = !0),
        !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s,
        !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s),
        !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null,
        !1) : void l.setCSS(l.swipeLeft))))
    }
    ,
    e.prototype.swipeStart = function(i) {
        var e, t = this;
        if (t.interrupted = !0,
        1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow)
            return t.touchObject = {},
            !1;
        void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]),
        t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX,
        t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY,
        t.dragging = !0
    }
    ,
    e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
        var i = this;
        null !== i.$slidesCache && (i.unload(),
        i.$slideTrack.children(this.options.slide).detach(),
        i.$slidesCache.appendTo(i.$slideTrack),
        i.reinit())
    }
    ,
    e.prototype.unload = function() {
        var e = this;
        i(".slick-cloned", e.$slider).remove(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(),
        e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(),
        e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }
    ,
    e.prototype.unslick = function(i) {
        var e = this;
        e.$slider.trigger("unslick", [e, i]),
        e.destroy()
    }
    ,
    e.prototype.updateArrows = function() {
        var i = this;
        Math.floor(i.options.slidesToShow / 2),
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }
    ,
    e.prototype.updateDots = function() {
        var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(),
        i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
    }
    ,
    e.prototype.visibility = function() {
        var i = this;
        i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
    }
    ,
    i.fn.slick = function() {
        var i, t, o = this, s = arguments[0], n = Array.prototype.slice.call(arguments, 1), r = o.length;
        for (i = 0; i < r; i++)
            if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i],s) : t = o[i].slick[s].apply(o[i].slick, n),
            void 0 !== t)
                return t;
        return o
    }
});
;;window.yii = (function($) {
    var pub = {
        reloadableScripts: [],
        clickableSelector: 'a, button, input[type="submit"], input[type="button"], input[type="reset"], ' + 'input[type="image"]',
        changeableSelector: 'select, input, textarea',
        getCsrfParam: function() {
            return $('meta[name=csrf-param]').attr('content');
        },
        getCsrfToken: function() {
            return $('meta[name=csrf-token]').attr('content');
        },
        setCsrfToken: function(name, value) {
            $('meta[name=csrf-param]').attr('content', name);
            $('meta[name=csrf-token]').attr('content', value);
        },
        refreshCsrfToken: function() {
            var token = pub.getCsrfToken();
            if (token) {
                $('form input[name="' + pub.getCsrfParam() + '"]').val(token);
            }
        },
        confirm: function(message, ok, cancel) {
            if (window.confirm(message)) {
                !ok || ok();
            } else {
                !cancel || cancel();
            }
        },
        handleAction: function($e, event) {
            var $form = $e.attr('data-form') ? $('#' + $e.attr('data-form')) : $e.closest('form'), method = !$e.data('method') && $form ? $form.attr('method') : $e.data('method'), action = $e.attr('href'), isValidAction = action && action !== '#', params = $e.data('params'), areValidParams = params && $.isPlainObject(params), pjax = $e.data('pjax'), usePjax = pjax !== undefined && pjax !== 0 && $.support.pjax, pjaxContainer, pjaxOptions = {};
            if (usePjax) {
                pjaxContainer = $e.data('pjax-container');
                if (pjaxContainer === undefined || !pjaxContainer.length) {
                    pjaxContainer = $e.closest('[data-pjax-container]').attr('id') ? ('#' + $e.closest('[data-pjax-container]').attr('id')) : '';
                }
                if (!pjaxContainer.length) {
                    pjaxContainer = 'body';
                }
                pjaxOptions = {
                    container: pjaxContainer,
                    push: !!$e.data('pjax-push-state'),
                    replace: !!$e.data('pjax-replace-state'),
                    scrollTo: $e.data('pjax-scrollto'),
                    pushRedirect: $e.data('pjax-push-redirect'),
                    replaceRedirect: $e.data('pjax-replace-redirect'),
                    skipOuterContainers: $e.data('pjax-skip-outer-containers'),
                    timeout: $e.data('pjax-timeout'),
                    originalEvent: event,
                    originalTarget: $e
                };
            }
            if (method === undefined) {
                if (isValidAction) {
                    usePjax ? $.pjax.click(event, pjaxOptions) : window.location.assign(action);
                } else if ($e.is(':submit') && $form.length) {
                    if (usePjax) {
                        $form.on('submit', function(e) {
                            $.pjax.submit(e, pjaxOptions);
                        });
                    }
                    $form.trigger('submit');
                }
                return;
            }
            var oldMethod, oldAction, newForm = !$form.length;
            if (!newForm) {
                oldMethod = $form.attr('method');
                $form.attr('method', method);
                if (isValidAction) {
                    oldAction = $form.attr('action');
                    $form.attr('action', action);
                }
            } else {
                if (!isValidAction) {
                    action = pub.getCurrentUrl();
                }
                $form = $('<form/>', {
                    method: method,
                    action: action
                });
                var target = $e.attr('target');
                if (target) {
                    $form.attr('target', target);
                }
                if (!/(get|post)/i.test(method)) {
                    $form.append($('<input/>', {
                        name: '_method',
                        value: method,
                        type: 'hidden'
                    }));
                    method = 'post';
                    $form.attr('method', method);
                }
                if (/post/i.test(method)) {
                    var csrfParam = pub.getCsrfParam();
                    if (csrfParam) {
                        $form.append($('<input/>', {
                            name: csrfParam,
                            value: pub.getCsrfToken(),
                            type: 'hidden'
                        }));
                    }
                }
                $form.hide().appendTo('body');
            }
            var activeFormData = $form.data('yiiActiveForm');
            if (activeFormData) {
                activeFormData.submitObject = $e;
            }
            if (areValidParams) {
                $.each(params, function(name, value) {
                    $form.append($('<input/>').attr({
                        name: name,
                        value: value,
                        type: 'hidden'
                    }));
                });
            }
            if (usePjax) {
                $form.on('submit', function(e) {
                    $.pjax.submit(e, pjaxOptions);
                });
            }
            $form.trigger('submit');
            $.when($form.data('yiiSubmitFinalizePromise')).done(function() {
                if (newForm) {
                    $form.remove();
                    return;
                }
                if (oldAction !== undefined) {
                    $form.attr('action', oldAction);
                }
                $form.attr('method', oldMethod);
                if (areValidParams) {
                    $.each(params, function(name) {
                        $('input[name="' + name + '"]', $form).remove();
                    });
                }
            });
        },
        getQueryParams: function(url) {
            var pos = url.indexOf('?');
            if (pos < 0) {
                return {};
            }
            var pairs = $.grep(url.substring(pos + 1).split('#')[0].split('&'), function(value) {
                return value !== '';
            });
            var params = {};
            for (var i = 0, len = pairs.length; i < len; i++) {
                var pair = pairs[i].split('=');
                var name = decodeURIComponent(pair[0].replace(/\+/g, '%20'));
                var value = decodeURIComponent(pair[1].replace(/\+/g, '%20'));
                if (!name.length) {
                    continue;
                }
                if (params[name] === undefined) {
                    params[name] = value || '';
                } else {
                    if (!$.isArray(params[name])) {
                        params[name] = [params[name]];
                    }
                    params[name].push(value || '');
                }
            }
            return params;
        },
        initModule: function(module) {
            if (module.isActive !== undefined && !module.isActive) {
                return;
            }
            if ($.isFunction(module.init)) {
                module.init();
            }
            $.each(module, function() {
                if ($.isPlainObject(this)) {
                    pub.initModule(this);
                }
            });
        },
        init: function() {
            initCsrfHandler();
            initRedirectHandler();
            initAssetFilters();
            initDataMethods();
        },
        getBaseCurrentUrl: function() {
            return window.location.protocol + '//' + window.location.host;
        },
        getCurrentUrl: function() {
            return window.location.href;
        }
    };
    function initCsrfHandler() {
        $.ajaxPrefilter(function(options, originalOptions, xhr) {
            if (!options.crossDomain && pub.getCsrfParam()) {
                xhr.setRequestHeader('X-CSRF-Token', pub.getCsrfToken());
            }
        });
        pub.refreshCsrfToken();
    }
    function initRedirectHandler() {
        $(document).ajaxComplete(function(event, xhr) {
            var url = xhr && xhr.getResponseHeader('X-Redirect');
            if (url) {
                window.location.assign(url);
            }
        });
    }
    function initAssetFilters() {
        var loadedScripts = {};
        $('script[src]').each(function() {
            var url = getAbsoluteUrl(this.src);
            loadedScripts[url] = true;
        });
        $.ajaxPrefilter('script', function(options, originalOptions, xhr) {
            if (options.dataType == 'jsonp') {
                return;
            }
            var url = getAbsoluteUrl(options.url)
              , forbiddenRepeatedLoad = loadedScripts[url] === true && !isReloadableAsset(url)
              , cleanupRunning = loadedScripts[url] !== undefined && loadedScripts[url]['xhrDone'] === true;
            if (forbiddenRepeatedLoad || cleanupRunning) {
                xhr.abort();
                return;
            }
            if (loadedScripts[url] === undefined || loadedScripts[url] === true) {
                loadedScripts[url] = {
                    xhrList: [],
                    xhrDone: false
                };
            }
            xhr.done(function(data, textStatus, jqXHR) {
                if (loadedScripts[jqXHR.yiiUrl]['xhrDone'] === true) {
                    return;
                }
                loadedScripts[jqXHR.yiiUrl]['xhrDone'] = true;
                for (var i = 0, len = loadedScripts[jqXHR.yiiUrl]['xhrList'].length; i < len; i++) {
                    var singleXhr = loadedScripts[jqXHR.yiiUrl]['xhrList'][i];
                    if (singleXhr && singleXhr.readyState !== XMLHttpRequest.DONE) {
                        singleXhr.abort();
                    }
                }
                loadedScripts[jqXHR.yiiUrl] = true;
            }).fail(function(jqXHR, textStatus) {
                if (textStatus === 'abort') {
                    return;
                }
                delete loadedScripts[jqXHR.yiiUrl]['xhrList'][jqXHR.yiiIndex];
                var allFailed = true;
                for (var i = 0, len = loadedScripts[jqXHR.yiiUrl]['xhrList'].length; i < len; i++) {
                    if (loadedScripts[jqXHR.yiiUrl]['xhrList'][i]) {
                        allFailed = false;
                    }
                }
                if (allFailed) {
                    delete loadedScripts[jqXHR.yiiUrl];
                }
            });
            xhr.yiiIndex = loadedScripts[url]['xhrList'].length;
            xhr.yiiUrl = url;
            loadedScripts[url]['xhrList'][xhr.yiiIndex] = xhr;
        });
        $(document).ajaxComplete(function() {
            var styleSheets = [];
            $('link[rel=stylesheet]').each(function() {
                var url = getAbsoluteUrl(this.href);
                if (isReloadableAsset(url)) {
                    return;
                }
                $.inArray(url, styleSheets) === -1 ? styleSheets.push(url) : $(this).remove();
            });
        });
    }
    function initDataMethods() {
        var handler = function(event) {
            var $this = $(this)
              , method = $this.data('method')
              , message = $this.data('confirm')
              , form = $this.data('form');
            if (method === undefined && message === undefined && form === undefined) {
                return true;
            }
            if (message !== undefined) {
                $.proxy(pub.confirm, this)(message, function() {
                    pub.handleAction($this, event);
                });
            } else {
                pub.handleAction($this, event);
            }
            event.stopImmediatePropagation();
            return false;
        };
        $(document).on('click.yii', pub.clickableSelector, handler).on('change.yii', pub.changeableSelector, handler);
    }
    function isReloadableAsset(url) {
        for (var i = 0; i < pub.reloadableScripts.length; i++) {
            var rule = getAbsoluteUrl(pub.reloadableScripts[i]);
            var match = new RegExp("^" + escapeRegExp(rule).split('\\*').join('.+') + "$").test(url);
            if (match === true) {
                return true;
            }
        }
        return false;
    }
    function escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
    function getAbsoluteUrl(url) {
        return url.charAt(0) === '/' ? pub.getBaseCurrentUrl() + url : url;
    }
    return pub;
}
)(window.jQuery);
window.jQuery(function() {
    window.yii.initModule(window.yii);
});
;;"use strict";
!function(t) {
    var i, n;
    i = function() {
        function i(i, n) {
            var o;
            this.options = n,
            this.$element = t(i),
            this.didInit = !1,
            o = this,
            this.$element.on("click.slickLightbox", this.options.itemSelector, function(i) {
                var n, e;
                if (i.preventDefault(),
                n = t(this),
                n.blur(),
                "function" != typeof o.options.shouldOpen || o.options.shouldOpen(o, n, i))
                    return e = o.$element.find(o.options.itemSelector),
                    o.elementIsSlick() && (e = o.filterOutSlickClones(e),
                    n = o.handlePossibleCloneClick(n, e)),
                    o.init(e.index(n))
            })
        }
        return i.prototype.init = function(t) {
            return this.didInit = !0,
            this.detectIE(),
            this.createModal(),
            this.bindEvents(),
            this.initSlick(t),
            this.open()
        }
        ,
        i.prototype.createModalItems = function() {
            var i, n, o, e, s, l;
            return e = this.options.lazyPlaceholder || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
            o = function(t, i, n) {
                return '<div class="slick-lightbox-slick-item">\n  <div class="slick-lightbox-slick-item-inner">\n    <img class="slick-lightbox-slick-img" ' + (!0 === n ? ' data-lazy="' + t + '" src="' + e + '" ' : ' src="' + t + '" ') + " />\n    " + i + "\n  </div>\n</div>"
            }
            ,
            this.options.images ? l = t.map(this.options.images, function(t) {
                return function(i) {
                    return o(i, t.options.lazy)
                }
            }(this)) : (i = this.filterOutSlickClones(this.$element.find(this.options.itemSelector)),
            s = i.length,
            n = function(t) {
                return function(i, n) {
                    var e, l, r;
                    return l = {
                        index: n,
                        length: s
                    },
                    e = t.getElementCaption(i, l),
                    r = t.getElementSrc(i),
                    o(r, e, t.options.lazy)
                }
            }(this),
            l = t.map(i, n)),
            l
        }
        ,
        i.prototype.createModal = function() {
            var i, n;
            return n = this.createModalItems(),
            i = '<div class="slick-lightbox slick-lightbox-hide-init' + (this.isIE ? " slick-lightbox-ie" : "") + '" style="background: ' + this.options.background + ';">\n  <div class="slick-lightbox-inner">\n    <div class="slick-lightbox-slick slick-caption-' + this.options.captionPosition + '">' + n.join("") + "</div>\n  <div>\n<div>",
            this.$modalElement = t(i),
            this.$parts = {},
            this.$parts.closeButton = t(this.options.layouts.closeButton),
            this.$modalElement.find(".slick-lightbox-inner").append(this.$parts.closeButton),
            t("body").append(this.$modalElement)
        }
        ,
        i.prototype.initSlick = function(i) {
            var n;
            return n = {
                initialSlide: i
            },
            this.options.lazy && (n.lazyLoad = "ondemand"),
            null != this.options.slick ? "function" == typeof this.options.slick ? this.slick = this.options.slick(this.$modalElement) : this.slick = this.$modalElement.find(".slick-lightbox-slick").slick(t.extend({}, this.options.slick, n)) : this.slick = this.$modalElement.find(".slick-lightbox-slick").slick(n),
            this.$modalElement.trigger("init.slickLightbox")
        }
        ,
        i.prototype.open = function() {
            return this.options.useHistoryApi && this.writeHistory(),
            this.$element.trigger("show.slickLightbox"),
            setTimeout(function(t) {
                return function() {
                    return t.$element.trigger("shown.slickLightbox")
                }
            }(this), this.getTransitionDuration()),
            this.$modalElement.removeClass("slick-lightbox-hide-init")
        }
        ,
        i.prototype.close = function() {
            return this.$element.trigger("hide.slickLightbox"),
            setTimeout(function(t) {
                return function() {
                    return t.$element.trigger("hidden.slickLightbox")
                }
            }(this), this.getTransitionDuration()),
            this.$modalElement.addClass("slick-lightbox-hide"),
            this.destroy()
        }
        ,
        i.prototype.bindEvents = function() {
            var i;
            if (i = function(t) {
                return function() {
                    var i;
                    return i = t.$modalElement.find(".slick-lightbox-inner").height(),
                    t.$modalElement.find(".slick-lightbox-slick-item").height(i),
                    t.$modalElement.find(".slick-lightbox-slick-img, .slick-lightbox-slick-item-inner").css("max-height", Math.round(t.options.imageMaxHeight * i))
                }
            }(this),
            t(window).on("orientationchange.slickLightbox resize.slickLightbox", i),
            this.options.useHistoryApi && t(window).on("popstate.slickLightbox", function(t) {
                return function() {
                    return t.close()
                }
            }(this)),
            this.$modalElement.on("init.slickLightbox", i),
            this.$modalElement.on("destroy.slickLightbox", function(t) {
                return function() {
                    return t.destroy()
                }
            }(this)),
            this.$element.on("destroy.slickLightbox", function(t) {
                return function() {
                    return t.destroy(!0)
                }
            }(this)),
            this.$parts.closeButton.on("click.slickLightbox touchstart.slickLightbox", function(t) {
                return function(i) {
                    return i.preventDefault(),
                    t.close()
                }
            }(this)),
            (this.options.closeOnEscape || this.options.navigateByKeyboard) && t(document).on("keydown.slickLightbox", function(t) {
                return function(i) {
                    var n;
                    if (n = i.keyCode ? i.keyCode : i.which,
                    t.options.navigateByKeyboard && (37 === n ? t.slideSlick("left") : 39 === n && t.slideSlick("right")),
                    t.options.closeOnEscape && 27 === n)
                        return t.close()
                }
            }(this)),
            this.options.closeOnBackdropClick)
                return this.$modalElement.on("click.slickLightbox touchstart.slickLightbox", ".slick-lightbox-slick-img", function(t) {
                    return t.stopPropagation()
                }),
                this.$modalElement.on("click.slickLightbox", ".slick-lightbox-slick-item", function(t) {
                    return function(i) {
                        return i.preventDefault(),
                        t.close()
                    }
                }(this))
        }
        ,
        i.prototype.slideSlick = function(t) {
            return "left" === t ? this.slick.slick("slickPrev") : this.slick.slick("slickNext")
        }
        ,
        i.prototype.detectIE = function() {
            if (this.isIE = !1,
            /MSIE (\d+\.\d+);/.test(navigator.userAgent) && new Number(RegExp.$1) < 9)
                return this.isIE = !0
        }
        ,
        i.prototype.getElementCaption = function(i, n) {
            return this.options.caption ? '<span class="slick-lightbox-slick-caption">' + function() {
                switch (typeof this.options.caption) {
                case "function":
                    return this.options.caption(i, n);
                case "string":
                    return t(i).data(this.options.caption)
                }
            }
            .call(this) + "</span>" : ""
        }
        ,
        i.prototype.getElementSrc = function(i) {
            switch (typeof this.options.src) {
            case "function":
                return this.options.src(i);
            case "string":
                return t(i).attr(this.options.src);
            default:
                return i.href
            }
        }
        ,
        i.prototype.unbindEvents = function() {
            return t(window).off(".slickLightbox"),
            t(document).off(".slickLightbox"),
            this.$modalElement.off(".slickLightbox")
        }
        ,
        i.prototype.destroy = function(t) {
            if (null == t && (t = !1),
            this.didInit && (this.unbindEvents(),
            setTimeout(function(t) {
                return function() {
                    return t.$modalElement.remove()
                }
            }(this), this.options.destroyTimeout)),
            t)
                return this.$element.off(".slickLightbox"),
                this.$element.off(".slickLightbox", this.options.itemSelector)
        }
        ,
        i.prototype.destroyPrevious = function() {
            return t("body").children(".slick-lightbox").trigger("destroy.slickLightbox")
        }
        ,
        i.prototype.getTransitionDuration = function() {
            var t;
            return this.transitionDuration ? this.transitionDuration : (t = this.$modalElement.css("transition-duration"),
            this.transitionDuration = void 0 === t ? 500 : t.indexOf("ms") > -1 ? parseFloat(t) : 1e3 * parseFloat(t))
        }
        ,
        i.prototype.writeHistory = function() {
            return "undefined" != typeof history && null !== history && "function" == typeof history.pushState ? history.pushState(null, null, "") : void 0
        }
        ,
        i.prototype.filterOutSlickClones = function(i) {
            return this.elementIsSlick() ? i = i.filter(function() {
                var i;
                return i = t(this),
                !i.hasClass("slick-cloned") && 0 === i.parents(".slick-cloned").length
            }) : i
        }
        ,
        i.prototype.handlePossibleCloneClick = function(i, n) {
            var o;
            return this.elementIsSlick() && i.closest(".slick-slide").hasClass("slick-cloned") ? (o = i.attr("href"),
            n.filter(function() {
                return t(this).attr("href") === o
            }).first()) : i
        }
        ,
        i.prototype.elementIsSlick = function() {
            return this.$element.hasClass("slick-slider")
        }
        ,
        i
    }(),
    n = {
        background: "rgba(0,0,0,.8)",
        closeOnEscape: !0,
        closeOnBackdropClick: !0,
        destroyTimeout: 500,
        itemSelector: "a",
        navigateByKeyboard: !0,
        src: !1,
        caption: !1,
        captionPosition: "dynamic",
        images: !1,
        slick: {},
        useHistoryApi: !1,
        layouts: {
            closeButton: '<button type="button" class="slick-lightbox-close"></button>'
        },
        shouldOpen: null,
        imageMaxHeight: .9,
        lazy: !1
    },
    t.fn.slickLightbox = function(o) {
        return o = t.extend({}, n, o),
        t(this).each(function() {
            return this.slickLightbox = new i(this,o)
        }),
        this
    }
    ,
    t.fn.unslickLightbox = function() {
        return t(this).trigger("destroy.slickLightbox").each(function() {
            return this.slickLightbox = null
        })
    }
}(jQuery);
;;jQuery.fn.extend({
    pan: function() {
        var panWrapper = document.createElement('div');
        $(panWrapper).addClass("panWrapper");
        var panImg = document.createElement('img');
        $(panImg).addClass("i").css("position", "absolute");
        var zi = document.createElement('a');
        $(zi).addClass("controls in");
        $(panWrapper).append(zi);
        var zo = document.createElement('a');
        $(zo).addClass("controls out");
        $(panWrapper).append(zo);
        var close = document.createElement('a');
        $(close).addClass("controls close");
        $(panWrapper).append(close);
        $(panWrapper).append(panImg);
        $("body").append(panWrapper);
        $(this).click(function(e) {
            var t = $(this);
            var big = t.attr("data-big");
            $(".panWrapper").show();
            $(".panWrapper img.i").css("width", "auto").attr("src", big).load(function() {
                panInit(e);
            });
            return false;
        });
        $(zi).click(function(e) {
            var panImg = $(".panWrapper img.i");
            panImg.css("width", parseInt(parseInt(panImg.css("width")) * 1.2));
            panInit(e);
        });
        $(zo).click(function(e) {
            var panImg = $(".panWrapper img.i");
            panImg.css("width", parseInt(parseInt(panImg.css("width")) / 1.2) + 1);
            panInit(e);
        });
        $(close).click(function(e) {
            $(".panWrapper").fadeOut("slow");
        });
        $(panImg).click(function() {
            $(close).click();
        });
        $(panWrapper).mousemove(function(e) {
            panInit(e);
        });
        $("body").keydown(function(e) {
            if (e.keyCode == 27) {
                $(close).click();
            }
        });
        $(panWrapper).mousewheel(function(whellEvent) {
            if (whellEvent.deltaY > 0)
                $(zo).click();
            else
                $(zi).click();
            panInit(whellEvent);
        });
        function panInit(event) {
            var panImg = $(".panWrapper img.i");
            var panWrapper = $(".panWrapper");
            var w = parseInt(panImg.css("width"));
            var h = parseInt(panImg.css("height"));
            var x = parseInt(panImg.css("left"));
            var y = parseInt(panImg.css("top"));
            var ml = 0 - (w - $(panWrapper).width());
            var mt = 0 - (h - $(panWrapper).height());
            var scrollOffset = window.pageYOffset || document.documentElement.scrollTop;
            var nl = parseInt((ml * parseInt(event.pageX)) / parseInt($(panWrapper).width()));
            var nt = parseInt((mt * parseInt(event.pageY - scrollOffset)) / parseInt($(panWrapper).height()));
            if (parseInt($(panWrapper).width()) > w && parseInt($(panWrapper).height()) > h) {
                panImg.css("left", ((parseInt($(panWrapper).width()) - w) / 2));
                panImg.css("top", ((parseInt($(panWrapper).height()) - h) / 2));
            } else if (parseInt($(panWrapper).width()) > w) {
                panImg.css("left", ((parseInt($(panWrapper).width()) - w) / 2));
                panImg.css("top", nt);
            } else if (parseInt($(panWrapper).height()) > h) {
                panImg.css("left", nl);
                panImg.css("top", ((parseInt($(panWrapper).height()) - h) / 2));
            } else {
                panImg.css("left", nl);
                panImg.css("top", nt);
            }
        }
    }
});
(function() {
    var prefix = "", _addEventListener, onwheel, support;
    if (window.addEventListener) {
        _addEventListener = "addEventListener";
    } else {
        _addEventListener = "attachEvent";
        prefix = "on";
    }
    if (document.onmousewheel !== undefined) {
        support = "mousewheel";
    }
    try {
        WheelEvent("wheel");
        support = "wheel";
    } catch (e) {}
    if (!support) {
        support = "DOMMouseScroll";
    }
    window.addWheelListener = function(elem, callback, useCapture) {
        _addWheelListener(elem, support, callback, useCapture);
        if (support == "DOMMouseScroll") {
            _addWheelListener(elem, "MozMousePixelScroll", callback, useCapture);
        }
    }
    ;
    function _addWheelListener(elem, eventName, callback, useCapture) {
        elem[_addEventListener](prefix + eventName, support == "wheel" ? callback : function(originalEvent) {
            !originalEvent && (originalEvent = window.event);
            var event = {
                originalEvent: originalEvent,
                target: originalEvent.target || originalEvent.srcElement,
                type: "wheel",
                deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
                deltaX: 0,
                delatZ: 0,
                pageX: originalEvent.pageX,
                pageY: originalEvent.pageY,
                preventDefault: function() {
                    originalEvent.preventDefault ? originalEvent.preventDefault() : originalEvent.returnValue = false;
                }
            };
            if (support == "mousewheel") {
                event.deltaY = -1 / 40 * originalEvent.wheelDelta;
                originalEvent.wheelDeltaX && (event.deltaX = -1 / 40 * originalEvent.wheelDeltaX);
            } else {
                event.deltaY = originalEvent.detail;
            }
            return callback(event);
        }
        , useCapture || false);
    }
    $.fn.mousewheel = function(handler) {
        return this.each(function() {
            window.addWheelListener(this, handler, true);
        });
    }
    ;
}
)(jQuery);
;;/*!
 * Social Share Kit v1.0.15 (http://socialsharekit.com)
 * Copyright 2015 Social Share Kit / Kaspars Sprogis.
 * @Licensed under Creative Commons Attribution-NonCommercial 3.0 license:
 * https://github.com/darklow/social-share-kit/blob/master/LICENSE
 * ---
 */
var SocialShareKit = function() {
    function e(e) {
        return b(e).share()
    }
    function t(e) {
        "loading" != document.readyState ? e() : document.addEventListener ? document.addEventListener("DOMContentLoaded", e) : document.attachEvent("onreadystatechange", function() {
            "loading" != document.readyState && e()
        })
    }
    function n(e) {
        return document.querySelectorAll(e)
    }
    function r(e, t) {
        for (var n = 0; n < e.length; n++)
            t(e[n], n)
    }
    function o(e, t, n) {
        e.addEventListener ? e.addEventListener(t, n) : e.attachEvent("on" + t, function() {
            n.call(e)
        })
    }
    function i(e, t, n) {
        e.removeEventListener ? e.removeEventListener(t, n) : e.detachEvent("on" + t, n)
    }
    function a(e) {
        return e.className.match(y)
    }
    function c(e) {
        var t = e || window.event;
        return t.preventDefault ? t.preventDefault() : (t.returnValue = !1,
        t.cancelBubble = !0),
        t.currentTarget || t.srcElement
    }
    function s(e, t, n) {
        var r, o, i, a;
        return t && n ? (o = document.documentElement.clientWidth / 2 - t / 2,
        i = (document.documentElement.clientHeight - n) / 2,
        a = "status=1,resizable=yes,width=" + t + ",height=" + n + ",top=" + i + ",left=" + o,
        r = window.open(e, "", a)) : r = window.open(e),
        r.focus(),
        r
    }
    function u(e, t, n) {
        var r, o = h(e, t, n), i = d(e, t, n, o), a = "undefined" != typeof o.title ? o.title : l(t), c = "undefined" != typeof o.text ? o.text : p(t), s = o.image ? o.image : f("og:image"), u = "undefined" != typeof o.via ? o.via : f("twitter:site"), m = {
            shareUrl: i,
            title: a,
            text: c,
            image: s,
            via: u,
            options: e,
            shareUrlEncoded: function() {
                return encodeURIComponent(this.shareUrl)
            }
        };
        switch (t) {
        case "facebook":
            r = "https://www.facebook.com/share.php?u=" + m.shareUrlEncoded();
            break;
        case "twitter":
            r = "https://twitter.com/intent/tweet?url=" + m.shareUrlEncoded() + "&text=" + encodeURIComponent(a + (c && a ? " - " : "") + c),
            u && (r += "&via=" + u.replace("@", ""));
            break;
        case "google-plus":
            r = "https://plus.google.com/share?url=" + m.shareUrlEncoded();
            break;
        case "pinterest":
            r = "https://pinterest.com/pin/create/button/?url=" + m.shareUrlEncoded() + "&description=" + encodeURIComponent(c),
            s && (r += "&media=" + encodeURIComponent(s));
            break;
        case "tumblr":
            r = "https://www.tumblr.com/share/link?url=" + m.shareUrlEncoded() + "&name=" + encodeURIComponent(a) + "&description=" + encodeURIComponent(c);
            break;
        case "linkedin":
            r = "https://www.linkedin.com/shareArticle?mini=true&url=" + m.shareUrlEncoded() + "&title=" + encodeURIComponent(a) + "&summary=" + encodeURIComponent(c);
            break;
        case "vk":
            r = "https://vkontakte.ru/share.php?url=" + m.shareUrlEncoded();
            break;
        case "buffer":
            r = "https://buffer.com/add?source=button&url=" + m.shareUrlEncoded() + "&text=" + encodeURIComponent(c);
            break;
        case "email":
            r = "mailto:?subject=" + encodeURIComponent(a) + "&body=" + encodeURIComponent(a + "\n" + i + "\n\n" + c + "\n")
        }
        return m.networkUrl = r,
        e.onBeforeOpen && e.onBeforeOpen(n, t, m),
        m.networkUrl
    }
    function d(e, t, n, r) {
        return r = r || h(e, t, n),
        r.url || window.location.href
    }
    function l(e) {
        var t;
        return "twitter" == e && (t = f("twitter:title")),
        t || document.title
    }
    function p(e) {
        var t;
        return "twitter" == e && (t = f("twitter:description")),
        t || f("description")
    }
    function f(e, t) {
        var r, o = n("meta[" + (t ? t : 0 === e.indexOf("og:") ? "property" : "name") + '="' + e + '"]');
        return o.length && (r = o[0].getAttribute("content") || ""),
        r || ""
    }
    function h(e, t, n) {
        var r, o, i, a, c = ["url", "title", "text", "image"], s = {}, u = n.parentNode;
        "twitter" == t && c.push("via");
        for (a in c)
            o = c[a],
            i = "data-" + o,
            r = n.getAttribute(i) || u.getAttribute(i) || (e[t] && "undefined" != typeof e[t][o] ? e[t][o] : e[o]),
            "undefined" != typeof r && (s[o] = r);
        return s
    }
    function m(e, t) {
        var n = document.createElement("div");
        n.innerHTML = t,
        n.className = "ssk-num",
        e.appendChild(n)
    }
    function w(e, t, n, r) {
        var o, i, a, c = encodeURIComponent(t);
        switch (e) {
        case "facebook":
            o = "https://graph.facebook.com/?id=" + c,
            i = function(e) {
                return r(e.share ? e.share.share_count : 0)
            }
            ;
            break;
        case "twitter":
            n && n.twitter && n.twitter.countCallback && n.twitter.countCallback(t, r);
            break;
        case "google-plus":
            return o = "https://clients6.google.com/rpc?key=AIzaSyCKSbrvQasunBoV16zDH9R33D88CeLr9gQ",
            a = '[{"method":"pos.plusones.get","id":"p","params":{"id":"' + t + '","userId":"@viewer","groupId":"@self","nolog":true},"jsonrpc":"2.0","key":"p","apiVersion":"v1"}]',
            i = function(e) {
                if (e = JSON.parse(e),
                e.length)
                    return r(e[0].result.metadata.globalCounts.count)
            }
            ,
            void v(o, i, a);
        case "linkedin":
            o = "https://www.linkedin.com/countserv/count/share?url=" + c,
            i = function(e) {
                return r(e.count)
            }
            ;
            break;
        case "pinterest":
            o = "https://api.pinterest.com/v1/urls/count.json?url=" + c,
            i = function(e) {
                return r(e.count)
            }
            ;
            break;
        case "vk":
            o = "https://vk.com/share.php?act=count&url=" + c,
            i = function(e) {
                return r(e)
            }
            ;
            break;
        case "buffer":
            o = "https://api.bufferapp.com/1/links/shares.json?url=" + c,
            i = function(e) {
                return r(e.shares)
            }
        }
        o && i && k(e, o, i, a)
    }
    function v(e, t, n) {
        var r = new XMLHttpRequest;
        r.onreadystatechange = function() {
            4 === this.readyState && this.status >= 200 && this.status < 400 && t(this.responseText)
        }
        ,
        r.open("POST", e, !0),
        r.setRequestHeader("Content-Type", "application/json"),
        r.send(n)
    }
    function k(e, t, n) {
        var r = "cb_" + e + "_" + Math.round(1e5 * Math.random())
          , o = document.createElement("script");
        return window[r] = function(e) {
            try {
                delete window[r]
            } catch (e) {}
            document.body.removeChild(o),
            n(e)
        }
        ,
        "vk" == e ? window.VK = {
            Share: {
                count: function(e, t) {
                    window[r](t)
                }
            }
        } : "google-plus" == e && (window.services = {
            gplus: {
                cb: window[r]
            }
        }),
        o.src = t + (t.indexOf("?") >= 0 ? "&" : "?") + "callback=" + r,
        document.body.appendChild(o),
        !0
    }
    var b, g, y = /(twitter|facebook|google-plus|pinterest|tumblr|vk|linkedin|buffer|email)/, U = "*|*";
    return g = function(e) {
        var t = e || {}
          , r = t.selector || ".ssk";
        this.nodes = n(r),
        this.options = t
    }
    ,
    g.prototype = {
        share: function() {
            function e(e) {
                var t, n = c(e), r = a(n), o = r[0];
                if (r && (t = u(p, o, n))) {
                    if (window.twttr && n.getAttribute("href").indexOf("twitter.com/intent/") !== -1)
                        return void n.setAttribute("href", t);
                    if ("email" !== o) {
                        var i, d;
                        "buffer" === o ? (i = 800,
                        d = 680) : (i = 575,
                        d = 400);
                        var l = s(t, i, d);
                        if (p.onOpen && p.onOpen(n, o, t, l),
                        p.onClose)
                            var f = window.setInterval(function() {
                                l.closed !== !1 && (window.clearInterval(f),
                                p.onClose(n, o, t, l))
                            }, 250)
                    } else
                        document.location = t
                }
            }
            function n() {
                var e, t;
                for (e in f)
                    t = e.split(U),
                    function(e) {
                        w(t[0], t[1], p, function(t) {
                            for (var n in e)
                                m(e[n], t)
                        })
                    }(f[e])
            }
            var l = this.nodes
              , p = this.options
              , f = {}
              , h = function() {
                l.length && (r(l, function(t) {
                    var n, r = a(t);
                    if (r) {
                        if (t.getAttribute("data-ssk-ready")) {
                            if (!p.reinitialize || !t._skkListener)
                                return;
                            i(t, "click", t._skkListener)
                        }
                        t.setAttribute("data-ssk-ready", !0),
                        o(t, "click", e),
                        t._skkListener = e,
                        t.parentNode.className.indexOf("ssk-count") !== -1 && (r = r[0],
                        n = r + U + d(p, r, t),
                        n in f || (f[n] = []),
                        f[n].push(t))
                    }
                }),
                n())
            };
            return p.forceInit === !0 ? h() : t(h),
            this.nodes
        }
    },
    b = function(e) {
        return new g(e)
    }
    ,
    {
        init: e
    }
}();
window.SocialShareKit = SocialShareKit;
;;(function() {
    let _dropdownOpened = false;
    function setDropdownHeight() {
        let dropdownH = $('#mapdiv').height() - 40;
        $('.filters .dropdown-menu').height(dropdownH + "px");
    }
    $(document).on('click', '.fav-btn', function() {
        $(this).children().toggleClass('hidden');
    });
    $(document).on('click', '#dropdownMenu1', function() {
        $('body').addClass('filters-open');
        if (!_dropdownOpened) {
            $.get('/map/filters', function(r) {
                $("#dropdownMenu1").siblings('.dropdown-menu').replaceWith(r);
                $("#dropdownMenu1").siblings('.dropdown-menu').toggle();
                if ($(window).width() < 1100) {
                    setDropdownHeight();
                }
                $('.filters #form-filters > .row').children(':not(.row-main)').addClass('col-sm-6 col-xs-12');
                _dropdownOpened = true;
            })
        } else {
            $(this).siblings('.dropdown-menu').toggle();
            if ($(window).width() < 1100) {
                setDropdownHeight();
            }
            $('.filters #form-filters > .row').children(':not(.row-main)').addClass('col-sm-6 col-xs-12');
        }
    });
    $(window).scroll(function() {
        if ($(this).scrollTop() > $('.site-about .header').height()) {
            $('.about-menu').removeClass('hidden');
            $('#scrollToTop').removeClass("hide");
        } else {
            $('.about-menu').addClass('hidden');
            $('#scrollToTop').addClass("hide");
        }
    });
    $(function() {
        var navBarsHeight = $('#w0').height() + 67;
        $('.site-about .header .link, .about-menu .link').on('click', function(e) {
            e.preventDefault();
            var target = $(this).attr('href');
            var body = $("html, body");
            body.animate({
                scrollTop: $(target).offset().top - navBarsHeight
            }, 500, 'swing');
        });
    });
    $('#scrollToTop').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, "slow");
        return false;
    });
    SocialShareKit.init();
    $('body').on('click', ".filters .dropdown-menu .filters-close", function(evt) {
        $(".filters .dropdown-menu .filters-close").parent().hide();
        $('body').removeClass('filters-open');
    });
    $('body').on('click', '.filters .dropdown-menu .filters-submit', function() {
        $('#form-filters').submit();
    });
    $(document).on('load', function() {
        if ($(window).width() < 1100) {
            setDropdownHeight();
        }
    });
    $(window).on('resize orientationchange', function() {
        if ($(window).width() < 1100) {
            setDropdownHeight();
        }
    });
    $('.map-filters').on('click', '.filters-clear', function() {
        window.location.href = window.location.origin;
    });
    $(window).on('load', function() {
        let slickCtn = $('#evo-photo-slick');
        if (slickCtn) {
            slickCtn.slick({
                dots: false,
                infinite: false,
                arrows: true,
                speed: 300,
                slidesToShow: 4,
                slidesToScroll: 2,
                responsive: [{
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
                        arrows: true,
                        infinite: true,
                        dots: false
                    }
                }, {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: true,
                        dots: false
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: true,
                        dots: false
                    }
                }]
            });
            if ($(window).width > 1099) {
                let aboutPhoto = slickCtn.find('.about-photo');
                aboutPhoto.each(function(idx, elem) {
                    $("body > .panWrapper").remove();
                    $(elem).on('click', function(e) {
                        e.stopPropagation();
                        $(this).pan();
                    });
                });
            } else {
                slickCtn.slickLightbox({
                    itemSelector: 'a.slick-slide',
                    navigateKeyboard: true
                })
            }
        }
    });
}
)(jQuery);
;;!function(t, i) {
    "object" == typeof exports && "undefined" != typeof module ? i(exports) : "function" == typeof define && define.amd ? define(["exports"], i) : i(t.L = {})
}(this, function(t) {
    "use strict";
    function i(t) {
        var i, e, n, o;
        for (e = 1,
        n = arguments.length; e < n; e++) {
            o = arguments[e];
            for (i in o)
                t[i] = o[i]
        }
        return t
    }
    function e(t, i) {
        var e = Array.prototype.slice;
        if (t.bind)
            return t.bind.apply(t, e.call(arguments, 1));
        var n = e.call(arguments, 2);
        return function() {
            return t.apply(i, n.length ? n.concat(e.call(arguments)) : arguments)
        }
    }
    function n(t) {
        return t._leaflet_id = t._leaflet_id || ++ti,
        t._leaflet_id
    }
    function o(t, i, e) {
        var n, o, s, r;
        return r = function() {
            n = !1,
            o && (s.apply(e, o),
            o = !1)
        }
        ,
        s = function() {
            n ? o = arguments : (t.apply(e, arguments),
            setTimeout(r, i),
            n = !0)
        }
    }
    function s(t, i, e) {
        var n = i[1]
          , o = i[0]
          , s = n - o;
        return t === n && e ? t : ((t - o) % s + s) % s + o
    }
    function r() {
        return !1
    }
    function a(t, i) {
        var e = Math.pow(10, void 0 === i ? 6 : i);
        return Math.round(t * e) / e
    }
    function h(t) {
        return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
    }
    function u(t) {
        return h(t).split(/\s+/)
    }
    function l(t, i) {
        t.hasOwnProperty("options") || (t.options = t.options ? Qt(t.options) : {});
        for (var e in i)
            t.options[e] = i[e];
        return t.options
    }
    function c(t, i, e) {
        var n = [];
        for (var o in t)
            n.push(encodeURIComponent(e ? o.toUpperCase() : o) + "=" + encodeURIComponent(t[o]));
        return (i && -1 !== i.indexOf("?") ? "&" : "?") + n.join("&")
    }
    function _(t, i) {
        return t.replace(ii, function(t, e) {
            var n = i[e];
            if (void 0 === n)
                throw new Error("No value provided for variable " + t);
            return "function" == typeof n && (n = n(i)),
            n
        })
    }
    function d(t, i) {
        for (var e = 0; e < t.length; e++)
            if (t[e] === i)
                return e;
        return -1
    }
    function p(t) {
        return window["webkit" + t] || window["moz" + t] || window["ms" + t]
    }
    function m(t) {
        var i = +new Date
          , e = Math.max(0, 16 - (i - oi));
        return oi = i + e,
        window.setTimeout(t, e)
    }
    function f(t, i, n) {
        if (!n || si !== m)
            return si.call(window, e(t, i));
        t.call(i)
    }
    function g(t) {
        t && ri.call(window, t)
    }
    function v() {}
    function y(t) {
        if ("undefined" != typeof L && L && L.Mixin) {
            t = ei(t) ? t : [t];
            for (var i = 0; i < t.length; i++)
                t[i] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", (new Error).stack)
        }
    }
    function x(t, i, e) {
        this.x = e ? Math.round(t) : t,
        this.y = e ? Math.round(i) : i
    }
    function w(t, i, e) {
        return t instanceof x ? t : ei(t) ? new x(t[0],t[1]) : void 0 === t || null === t ? t : "object" == typeof t && "x"in t && "y"in t ? new x(t.x,t.y) : new x(t,i,e)
    }
    function P(t, i) {
        if (t)
            for (var e = i ? [t, i] : t, n = 0, o = e.length; n < o; n++)
                this.extend(e[n])
    }
    function b(t, i) {
        return !t || t instanceof P ? t : new P(t,i)
    }
    function T(t, i) {
        if (t)
            for (var e = i ? [t, i] : t, n = 0, o = e.length; n < o; n++)
                this.extend(e[n])
    }
    function z(t, i) {
        return t instanceof T ? t : new T(t,i)
    }
    function M(t, i, e) {
        if (isNaN(t) || isNaN(i))
            throw new Error("Invalid LatLng object: (" + t + ", " + i + ")");
        this.lat = +t,
        this.lng = +i,
        void 0 !== e && (this.alt = +e)
    }
    function C(t, i, e) {
        return t instanceof M ? t : ei(t) && "object" != typeof t[0] ? 3 === t.length ? new M(t[0],t[1],t[2]) : 2 === t.length ? new M(t[0],t[1]) : null : void 0 === t || null === t ? t : "object" == typeof t && "lat"in t ? new M(t.lat,"lng"in t ? t.lng : t.lon,t.alt) : void 0 === i ? null : new M(t,i,e)
    }
    function Z(t, i, e, n) {
        if (ei(t))
            return this._a = t[0],
            this._b = t[1],
            this._c = t[2],
            void (this._d = t[3]);
        this._a = t,
        this._b = i,
        this._c = e,
        this._d = n
    }
    function S(t, i, e, n) {
        return new Z(t,i,e,n)
    }
    function E(t) {
        return document.createElementNS("http://www.w3.org/2000/svg", t)
    }
    function k(t, i) {
        var e, n, o, s, r, a, h = "";
        for (e = 0,
        o = t.length; e < o; e++) {
            for (n = 0,
            s = (r = t[e]).length; n < s; n++)
                a = r[n],
                h += (n ? "L" : "M") + a.x + " " + a.y;
            h += i ? Xi ? "z" : "x" : ""
        }
        return h || "M0 0"
    }
    function I(t) {
        return navigator.userAgent.toLowerCase().indexOf(t) >= 0
    }
    function A(t, i, e, n) {
        return "touchstart" === i ? O(t, e, n) : "touchmove" === i ? W(t, e, n) : "touchend" === i && H(t, e, n),
        this
    }
    function B(t, i, e) {
        var n = t["_leaflet_" + i + e];
        return "touchstart" === i ? t.removeEventListener(Qi, n, !1) : "touchmove" === i ? t.removeEventListener(te, n, !1) : "touchend" === i && (t.removeEventListener(ie, n, !1),
        t.removeEventListener(ee, n, !1)),
        this
    }
    function O(t, i, n) {
        var o = e(function(t) {
            if ("mouse" !== t.pointerType && t.MSPOINTER_TYPE_MOUSE && t.pointerType !== t.MSPOINTER_TYPE_MOUSE) {
                if (!(ne.indexOf(t.target.tagName) < 0))
                    return;
                $(t)
            }
            j(t, i)
        });
        t["_leaflet_touchstart" + n] = o,
        t.addEventListener(Qi, o, !1),
        se || (document.documentElement.addEventListener(Qi, R, !0),
        document.documentElement.addEventListener(te, D, !0),
        document.documentElement.addEventListener(ie, N, !0),
        document.documentElement.addEventListener(ee, N, !0),
        se = !0)
    }
    function R(t) {
        oe[t.pointerId] = t,
        re++
    }
    function D(t) {
        oe[t.pointerId] && (oe[t.pointerId] = t)
    }
    function N(t) {
        delete oe[t.pointerId],
        re--
    }
    function j(t, i) {
        t.touches = [];
        for (var e in oe)
            t.touches.push(oe[e]);
        t.changedTouches = [t],
        i(t)
    }
    function W(t, i, e) {
        var n = function(t) {
            (t.pointerType !== t.MSPOINTER_TYPE_MOUSE && "mouse" !== t.pointerType || 0 !== t.buttons) && j(t, i)
        };
        t["_leaflet_touchmove" + e] = n,
        t.addEventListener(te, n, !1)
    }
    function H(t, i, e) {
        var n = function(t) {
            j(t, i)
        };
        t["_leaflet_touchend" + e] = n,
        t.addEventListener(ie, n, !1),
        t.addEventListener(ee, n, !1)
    }
    function F(t, i, e) {
        function n(t) {
            var i;
            if (Ui) {
                if (!Pi || "mouse" === t.pointerType)
                    return;
                i = re
            } else
                i = t.touches.length;
            if (!(i > 1)) {
                var e = Date.now()
                  , n = e - (s || e);
                r = t.touches ? t.touches[0] : t,
                a = n > 0 && n <= h,
                s = e
            }
        }
        function o(t) {
            if (a && !r.cancelBubble) {
                if (Ui) {
                    if (!Pi || "mouse" === t.pointerType)
                        return;
                    var e, n, o = {};
                    for (n in r)
                        e = r[n],
                        o[n] = e && e.bind ? e.bind(r) : e;
                    r = o
                }
                r.type = "dblclick",
                i(r),
                s = null
            }
        }
        var s, r, a = !1, h = 250;
        return t[ue + ae + e] = n,
        t[ue + he + e] = o,
        t[ue + "dblclick" + e] = i,
        t.addEventListener(ae, n, !1),
        t.addEventListener(he, o, !1),
        t.addEventListener("dblclick", i, !1),
        this
    }
    function U(t, i) {
        var e = t[ue + ae + i]
          , n = t[ue + he + i]
          , o = t[ue + "dblclick" + i];
        return t.removeEventListener(ae, e, !1),
        t.removeEventListener(he, n, !1),
        Pi || t.removeEventListener("dblclick", o, !1),
        this
    }
    function V(t, i, e, n) {
        if ("object" == typeof i)
            for (var o in i)
                G(t, o, i[o], e);
        else
            for (var s = 0, r = (i = u(i)).length; s < r; s++)
                G(t, i[s], e, n);
        return this
    }
    function q(t, i, e, n) {
        if ("object" == typeof i)
            for (var o in i)
                K(t, o, i[o], e);
        else if (i)
            for (var s = 0, r = (i = u(i)).length; s < r; s++)
                K(t, i[s], e, n);
        else {
            for (var a in t[le])
                K(t, a, t[le][a]);
            delete t[le]
        }
        return this
    }
    function G(t, i, e, o) {
        var s = i + n(e) + (o ? "_" + n(o) : "");
        if (t[le] && t[le][s])
            return this;
        var r = function(i) {
            return e.call(o || t, i || window.event)
        }
          , a = r;
        Ui && 0 === i.indexOf("touch") ? A(t, i, r, s) : !Vi || "dblclick" !== i || !F || Ui && Si ? "addEventListener"in t ? "mousewheel" === i ? t.addEventListener("onwheel"in t ? "wheel" : "mousewheel", r, !1) : "mouseenter" === i || "mouseleave" === i ? (r = function(i) {
            i = i || window.event,
            ot(t, i) && a(i)
        }
        ,
        t.addEventListener("mouseenter" === i ? "mouseover" : "mouseout", r, !1)) : ("click" === i && Ti && (r = function(t) {
            st(t, a)
        }
        ),
        t.addEventListener(i, r, !1)) : "attachEvent"in t && t.attachEvent("on" + i, r) : F(t, r, s),
        t[le] = t[le] || {},
        t[le][s] = r
    }
    function K(t, i, e, o) {
        var s = i + n(e) + (o ? "_" + n(o) : "")
          , r = t[le] && t[le][s];
        if (!r)
            return this;
        Ui && 0 === i.indexOf("touch") ? B(t, i, s) : !Vi || "dblclick" !== i || !U || Ui && Si ? "removeEventListener"in t ? "mousewheel" === i ? t.removeEventListener("onwheel"in t ? "wheel" : "mousewheel", r, !1) : t.removeEventListener("mouseenter" === i ? "mouseover" : "mouseleave" === i ? "mouseout" : i, r, !1) : "detachEvent"in t && t.detachEvent("on" + i, r) : U(t, s),
        t[le][s] = null
    }
    function Y(t) {
        return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = !0 : t.cancelBubble = !0,
        nt(t),
        this
    }
    function X(t) {
        return G(t, "mousewheel", Y),
        this
    }
    function J(t) {
        return V(t, "mousedown touchstart dblclick", Y),
        G(t, "click", et),
        this
    }
    function $(t) {
        return t.preventDefault ? t.preventDefault() : t.returnValue = !1,
        this
    }
    function Q(t) {
        return $(t),
        Y(t),
        this
    }
    function tt(t, i) {
        if (!i)
            return new x(t.clientX,t.clientY);
        var e = i.getBoundingClientRect()
          , n = e.width / i.offsetWidth || 1
          , o = e.height / i.offsetHeight || 1;
        return new x(t.clientX / n - e.left - i.clientLeft,t.clientY / o - e.top - i.clientTop)
    }
    function it(t) {
        return Pi ? t.wheelDeltaY / 2 : t.deltaY && 0 === t.deltaMode ? -t.deltaY / ce : t.deltaY && 1 === t.deltaMode ? 20 * -t.deltaY : t.deltaY && 2 === t.deltaMode ? 60 * -t.deltaY : t.deltaX || t.deltaZ ? 0 : t.wheelDelta ? (t.wheelDeltaY || t.wheelDelta) / 2 : t.detail && Math.abs(t.detail) < 32765 ? 20 * -t.detail : t.detail ? t.detail / -32765 * 60 : 0
    }
    function et(t) {
        _e[t.type] = !0
    }
    function nt(t) {
        var i = _e[t.type];
        return _e[t.type] = !1,
        i
    }
    function ot(t, i) {
        var e = i.relatedTarget;
        if (!e)
            return !0;
        try {
            for (; e && e !== t; )
                e = e.parentNode
        } catch (t) {
            return !1
        }
        return e !== t
    }
    function st(t, i) {
        var e = t.timeStamp || t.originalEvent && t.originalEvent.timeStamp
          , n = pi && e - pi;
        n && n > 100 && n < 500 || t.target._simulatedClick && !t._simulated ? Q(t) : (pi = e,
        i(t))
    }
    function rt(t) {
        return "string" == typeof t ? document.getElementById(t) : t
    }
    function at(t, i) {
        var e = t.style[i] || t.currentStyle && t.currentStyle[i];
        if ((!e || "auto" === e) && document.defaultView) {
            var n = document.defaultView.getComputedStyle(t, null);
            e = n ? n[i] : null
        }
        return "auto" === e ? null : e
    }
    function ht(t, i, e) {
        var n = document.createElement(t);
        return n.className = i || "",
        e && e.appendChild(n),
        n
    }
    function ut(t) {
        var i = t.parentNode;
        i && i.removeChild(t)
    }
    function lt(t) {
        for (; t.firstChild; )
            t.removeChild(t.firstChild)
    }
    function ct(t) {
        var i = t.parentNode;
        i.lastChild !== t && i.appendChild(t)
    }
    function _t(t) {
        var i = t.parentNode;
        i.firstChild !== t && i.insertBefore(t, i.firstChild)
    }
    function dt(t, i) {
        if (void 0 !== t.classList)
            return t.classList.contains(i);
        var e = gt(t);
        return e.length > 0 && new RegExp("(^|\\s)" + i + "(\\s|$)").test(e)
    }
    function pt(t, i) {
        if (void 0 !== t.classList)
            for (var e = u(i), n = 0, o = e.length; n < o; n++)
                t.classList.add(e[n]);
        else if (!dt(t, i)) {
            var s = gt(t);
            ft(t, (s ? s + " " : "") + i)
        }
    }
    function mt(t, i) {
        void 0 !== t.classList ? t.classList.remove(i) : ft(t, h((" " + gt(t) + " ").replace(" " + i + " ", " ")))
    }
    function ft(t, i) {
        void 0 === t.className.baseVal ? t.className = i : t.className.baseVal = i
    }
    function gt(t) {
        return void 0 === t.className.baseVal ? t.className : t.className.baseVal
    }
    function vt(t, i) {
        "opacity"in t.style ? t.style.opacity = i : "filter"in t.style && yt(t, i)
    }
    function yt(t, i) {
        var e = !1
          , n = "DXImageTransform.Microsoft.Alpha";
        try {
            e = t.filters.item(n)
        } catch (t) {
            if (1 === i)
                return
        }
        i = Math.round(100 * i),
        e ? (e.Enabled = 100 !== i,
        e.Opacity = i) : t.style.filter += " progid:" + n + "(opacity=" + i + ")"
    }
    function xt(t) {
        for (var i = document.documentElement.style, e = 0; e < t.length; e++)
            if (t[e]in i)
                return t[e];
        return !1
    }
    function wt(t, i, e) {
        var n = i || new x(0,0);
        t.style[pe] = (Oi ? "translate(" + n.x + "px," + n.y + "px)" : "translate3d(" + n.x + "px," + n.y + "px,0)") + (e ? " scale(" + e + ")" : "")
    }
    function Lt(t, i) {
        t._leaflet_pos = i,
        Ni ? wt(t, i) : (t.style.left = i.x + "px",
        t.style.top = i.y + "px")
    }
    function Pt(t) {
        return t._leaflet_pos || new x(0,0)
    }
    function bt() {
        V(window, "dragstart", $)
    }
    function Tt() {
        q(window, "dragstart", $)
    }
    function zt(t) {
        for (; -1 === t.tabIndex; )
            t = t.parentNode;
        t.style && (Mt(),
        ve = t,
        ye = t.style.outline,
        t.style.outline = "none",
        V(window, "keydown", Mt))
    }
    function Mt() {
        ve && (ve.style.outline = ye,
        ve = void 0,
        ye = void 0,
        q(window, "keydown", Mt))
    }
    function Ct(t, i) {
        if (!i || !t.length)
            return t.slice();
        var e = i * i;
        return t = kt(t, e),
        t = St(t, e)
    }
    function Zt(t, i, e) {
        return Math.sqrt(Rt(t, i, e, !0))
    }
    function St(t, i) {
        var e = t.length
          , n = new (typeof Uint8Array != void 0 + "" ? Uint8Array : Array)(e);
        n[0] = n[e - 1] = 1,
        Et(t, n, i, 0, e - 1);
        var o, s = [];
        for (o = 0; o < e; o++)
            n[o] && s.push(t[o]);
        return s
    }
    function Et(t, i, e, n, o) {
        var s, r, a, h = 0;
        for (r = n + 1; r <= o - 1; r++)
            (a = Rt(t[r], t[n], t[o], !0)) > h && (s = r,
            h = a);
        h > e && (i[s] = 1,
        Et(t, i, e, n, s),
        Et(t, i, e, s, o))
    }
    function kt(t, i) {
        for (var e = [t[0]], n = 1, o = 0, s = t.length; n < s; n++)
            Ot(t[n], t[o]) > i && (e.push(t[n]),
            o = n);
        return o < s - 1 && e.push(t[s - 1]),
        e
    }
    function It(t, i, e, n, o) {
        var s, r, a, h = n ? Se : Bt(t, e), u = Bt(i, e);
        for (Se = u; ; ) {
            if (!(h | u))
                return [t, i];
            if (h & u)
                return !1;
            a = Bt(r = At(t, i, s = h || u, e, o), e),
            s === h ? (t = r,
            h = a) : (i = r,
            u = a)
        }
    }
    function At(t, i, e, n, o) {
        var s, r, a = i.x - t.x, h = i.y - t.y, u = n.min, l = n.max;
        return 8 & e ? (s = t.x + a * (l.y - t.y) / h,
        r = l.y) : 4 & e ? (s = t.x + a * (u.y - t.y) / h,
        r = u.y) : 2 & e ? (s = l.x,
        r = t.y + h * (l.x - t.x) / a) : 1 & e && (s = u.x,
        r = t.y + h * (u.x - t.x) / a),
        new x(s,r,o)
    }
    function Bt(t, i) {
        var e = 0;
        return t.x < i.min.x ? e |= 1 : t.x > i.max.x && (e |= 2),
        t.y < i.min.y ? e |= 4 : t.y > i.max.y && (e |= 8),
        e
    }
    function Ot(t, i) {
        var e = i.x - t.x
          , n = i.y - t.y;
        return e * e + n * n
    }
    function Rt(t, i, e, n) {
        var o, s = i.x, r = i.y, a = e.x - s, h = e.y - r, u = a * a + h * h;
        return u > 0 && ((o = ((t.x - s) * a + (t.y - r) * h) / u) > 1 ? (s = e.x,
        r = e.y) : o > 0 && (s += a * o,
        r += h * o)),
        a = t.x - s,
        h = t.y - r,
        n ? a * a + h * h : new x(s,r)
    }
    function Dt(t) {
        return !ei(t[0]) || "object" != typeof t[0][0] && void 0 !== t[0][0]
    }
    function Nt(t) {
        return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),
        Dt(t)
    }
    function jt(t, i, e) {
        var n, o, s, r, a, h, u, l, c, _ = [1, 4, 2, 8];
        for (o = 0,
        u = t.length; o < u; o++)
            t[o]._code = Bt(t[o], i);
        for (r = 0; r < 4; r++) {
            for (l = _[r],
            n = [],
            o = 0,
            s = (u = t.length) - 1; o < u; s = o++)
                a = t[o],
                h = t[s],
                a._code & l ? h._code & l || ((c = At(h, a, l, i, e))._code = Bt(c, i),
                n.push(c)) : (h._code & l && ((c = At(h, a, l, i, e))._code = Bt(c, i),
                n.push(c)),
                n.push(a));
            t = n
        }
        return t
    }
    function Wt(t, i) {
        var e, n, o, s, r = "Feature" === t.type ? t.geometry : t, a = r ? r.coordinates : null, h = [], u = i && i.pointToLayer, l = i && i.coordsToLatLng || Ht;
        if (!a && !r)
            return null;
        switch (r.type) {
        case "Point":
            return e = l(a),
            u ? u(t, e) : new Xe(e);
        case "MultiPoint":
            for (o = 0,
            s = a.length; o < s; o++)
                e = l(a[o]),
                h.push(u ? u(t, e) : new Xe(e));
            return new qe(h);
        case "LineString":
        case "MultiLineString":
            return n = Ft(a, "LineString" === r.type ? 0 : 1, l),
            new tn(n,i);
        case "Polygon":
        case "MultiPolygon":
            return n = Ft(a, "Polygon" === r.type ? 1 : 2, l),
            new en(n,i);
        case "GeometryCollection":
            for (o = 0,
            s = r.geometries.length; o < s; o++) {
                var c = Wt({
                    geometry: r.geometries[o],
                    type: "Feature",
                    properties: t.properties
                }, i);
                c && h.push(c)
            }
            return new qe(h);
        default:
            throw new Error("Invalid GeoJSON object.")
        }
    }
    function Ht(t) {
        return new M(t[1],t[0],t[2])
    }
    function Ft(t, i, e) {
        for (var n, o = [], s = 0, r = t.length; s < r; s++)
            n = i ? Ft(t[s], i - 1, e) : (e || Ht)(t[s]),
            o.push(n);
        return o
    }
    function Ut(t, i) {
        return i = "number" == typeof i ? i : 6,
        void 0 !== t.alt ? [a(t.lng, i), a(t.lat, i), a(t.alt, i)] : [a(t.lng, i), a(t.lat, i)]
    }
    function Vt(t, i, e, n) {
        for (var o = [], s = 0, r = t.length; s < r; s++)
            o.push(i ? Vt(t[s], i - 1, e, n) : Ut(t[s], n));
        return !i && e && o.push(o[0]),
        o
    }
    function qt(t, e) {
        return t.feature ? i({}, t.feature, {
            geometry: e
        }) : Gt(e)
    }
    function Gt(t) {
        return "Feature" === t.type || "FeatureCollection" === t.type ? t : {
            type: "Feature",
            properties: {},
            geometry: t
        }
    }
    function Kt(t, i) {
        return new nn(t,i)
    }
    function Yt(t, i) {
        return new dn(t,i)
    }
    function Xt(t) {
        return Yi ? new fn(t) : null
    }
    function Jt(t) {
        return Xi || Ji ? new xn(t) : null
    }
    var $t = Object.freeze;
    Object.freeze = function(t) {
        return t
    }
    ;
    var Qt = Object.create || function() {
        function t() {}
        return function(i) {
            return t.prototype = i,
            new t
        }
    }()
      , ti = 0
      , ii = /\{ *([\w_-]+) *\}/g
      , ei = Array.isArray || function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }
      , ni = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
      , oi = 0
      , si = window.requestAnimationFrame || p("RequestAnimationFrame") || m
      , ri = window.cancelAnimationFrame || p("CancelAnimationFrame") || p("CancelRequestAnimationFrame") || function(t) {
        window.clearTimeout(t)
    }
      , ai = (Object.freeze || Object)({
        freeze: $t,
        extend: i,
        create: Qt,
        bind: e,
        lastId: ti,
        stamp: n,
        throttle: o,
        wrapNum: s,
        falseFn: r,
        formatNum: a,
        trim: h,
        splitWords: u,
        setOptions: l,
        getParamString: c,
        template: _,
        isArray: ei,
        indexOf: d,
        emptyImageUrl: ni,
        requestFn: si,
        cancelFn: ri,
        requestAnimFrame: f,
        cancelAnimFrame: g
    });
    v.extend = function(t) {
        var e = function() {
            this.initialize && this.initialize.apply(this, arguments),
            this.callInitHooks()
        }
          , n = e.__super__ = this.prototype
          , o = Qt(n);
        o.constructor = e,
        e.prototype = o;
        for (var s in this)
            this.hasOwnProperty(s) && "prototype" !== s && "__super__" !== s && (e[s] = this[s]);
        return t.statics && (i(e, t.statics),
        delete t.statics),
        t.includes && (y(t.includes),
        i.apply(null, [o].concat(t.includes)),
        delete t.includes),
        o.options && (t.options = i(Qt(o.options), t.options)),
        i(o, t),
        o._initHooks = [],
        o.callInitHooks = function() {
            if (!this._initHooksCalled) {
                n.callInitHooks && n.callInitHooks.call(this),
                this._initHooksCalled = !0;
                for (var t = 0, i = o._initHooks.length; t < i; t++)
                    o._initHooks[t].call(this)
            }
        }
        ,
        e
    }
    ,
    v.include = function(t) {
        return i(this.prototype, t),
        this
    }
    ,
    v.mergeOptions = function(t) {
        return i(this.prototype.options, t),
        this
    }
    ,
    v.addInitHook = function(t) {
        var i = Array.prototype.slice.call(arguments, 1)
          , e = "function" == typeof t ? t : function() {
            this[t].apply(this, i)
        }
        ;
        return this.prototype._initHooks = this.prototype._initHooks || [],
        this.prototype._initHooks.push(e),
        this
    }
    ;
    var hi = {
        on: function(t, i, e) {
            if ("object" == typeof t)
                for (var n in t)
                    this._on(n, t[n], i);
            else
                for (var o = 0, s = (t = u(t)).length; o < s; o++)
                    this._on(t[o], i, e);
            return this
        },
        off: function(t, i, e) {
            if (t)
                if ("object" == typeof t)
                    for (var n in t)
                        this._off(n, t[n], i);
                else
                    for (var o = 0, s = (t = u(t)).length; o < s; o++)
                        this._off(t[o], i, e);
            else
                delete this._events;
            return this
        },
        _on: function(t, i, e) {
            this._events = this._events || {};
            var n = this._events[t];
            n || (n = [],
            this._events[t] = n),
            e === this && (e = void 0);
            for (var o = {
                fn: i,
                ctx: e
            }, s = n, r = 0, a = s.length; r < a; r++)
                if (s[r].fn === i && s[r].ctx === e)
                    return;
            s.push(o)
        },
        _off: function(t, i, e) {
            var n, o, s;
            if (this._events && (n = this._events[t]))
                if (i) {
                    if (e === this && (e = void 0),
                    n)
                        for (o = 0,
                        s = n.length; o < s; o++) {
                            var a = n[o];
                            if (a.ctx === e && a.fn === i)
                                return a.fn = r,
                                this._firingCount && (this._events[t] = n = n.slice()),
                                void n.splice(o, 1)
                        }
                } else {
                    for (o = 0,
                    s = n.length; o < s; o++)
                        n[o].fn = r;
                    delete this._events[t]
                }
        },
        fire: function(t, e, n) {
            if (!this.listens(t, n))
                return this;
            var o = i({}, e, {
                type: t,
                target: this,
                sourceTarget: e && e.sourceTarget || this
            });
            if (this._events) {
                var s = this._events[t];
                if (s) {
                    this._firingCount = this._firingCount + 1 || 1;
                    for (var r = 0, a = s.length; r < a; r++) {
                        var h = s[r];
                        h.fn.call(h.ctx || this, o)
                    }
                    this._firingCount--
                }
            }
            return n && this._propagateEvent(o),
            this
        },
        listens: function(t, i) {
            var e = this._events && this._events[t];
            if (e && e.length)
                return !0;
            if (i)
                for (var n in this._eventParents)
                    if (this._eventParents[n].listens(t, i))
                        return !0;
            return !1
        },
        once: function(t, i, n) {
            if ("object" == typeof t) {
                for (var o in t)
                    this.once(o, t[o], i);
                return this
            }
            var s = e(function() {
                this.off(t, i, n).off(t, s, n)
            }, this);
            return this.on(t, i, n).on(t, s, n)
        },
        addEventParent: function(t) {
            return this._eventParents = this._eventParents || {},
            this._eventParents[n(t)] = t,
            this
        },
        removeEventParent: function(t) {
            return this._eventParents && delete this._eventParents[n(t)],
            this
        },
        _propagateEvent: function(t) {
            for (var e in this._eventParents)
                this._eventParents[e].fire(t.type, i({
                    layer: t.target,
                    propagatedFrom: t.target
                }, t), !0)
        }
    };
    hi.addEventListener = hi.on,
    hi.removeEventListener = hi.clearAllEventListeners = hi.off,
    hi.addOneTimeEventListener = hi.once,
    hi.fireEvent = hi.fire,
    hi.hasEventListeners = hi.listens;
    var ui = v.extend(hi)
      , li = Math.trunc || function(t) {
        return t > 0 ? Math.floor(t) : Math.ceil(t)
    }
    ;
    x.prototype = {
        clone: function() {
            return new x(this.x,this.y)
        },
        add: function(t) {
            return this.clone()._add(w(t))
        },
        _add: function(t) {
            return this.x += t.x,
            this.y += t.y,
            this
        },
        subtract: function(t) {
            return this.clone()._subtract(w(t))
        },
        _subtract: function(t) {
            return this.x -= t.x,
            this.y -= t.y,
            this
        },
        divideBy: function(t) {
            return this.clone()._divideBy(t)
        },
        _divideBy: function(t) {
            return this.x /= t,
            this.y /= t,
            this
        },
        multiplyBy: function(t) {
            return this.clone()._multiplyBy(t)
        },
        _multiplyBy: function(t) {
            return this.x *= t,
            this.y *= t,
            this
        },
        scaleBy: function(t) {
            return new x(this.x * t.x,this.y * t.y)
        },
        unscaleBy: function(t) {
            return new x(this.x / t.x,this.y / t.y)
        },
        round: function() {
            return this.clone()._round()
        },
        _round: function() {
            return this.x = Math.round(this.x),
            this.y = Math.round(this.y),
            this
        },
        floor: function() {
            return this.clone()._floor()
        },
        _floor: function() {
            return this.x = Math.floor(this.x),
            this.y = Math.floor(this.y),
            this
        },
        ceil: function() {
            return this.clone()._ceil()
        },
        _ceil: function() {
            return this.x = Math.ceil(this.x),
            this.y = Math.ceil(this.y),
            this
        },
        trunc: function() {
            return this.clone()._trunc()
        },
        _trunc: function() {
            return this.x = li(this.x),
            this.y = li(this.y),
            this
        },
        distanceTo: function(t) {
            var i = (t = w(t)).x - this.x
              , e = t.y - this.y;
            return Math.sqrt(i * i + e * e)
        },
        equals: function(t) {
            return (t = w(t)).x === this.x && t.y === this.y
        },
        contains: function(t) {
            return t = w(t),
            Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y)
        },
        toString: function() {
            return "Point(" + a(this.x) + ", " + a(this.y) + ")"
        }
    },
    P.prototype = {
        extend: function(t) {
            return t = w(t),
            this.min || this.max ? (this.min.x = Math.min(t.x, this.min.x),
            this.max.x = Math.max(t.x, this.max.x),
            this.min.y = Math.min(t.y, this.min.y),
            this.max.y = Math.max(t.y, this.max.y)) : (this.min = t.clone(),
            this.max = t.clone()),
            this
        },
        getCenter: function(t) {
            return new x((this.min.x + this.max.x) / 2,(this.min.y + this.max.y) / 2,t)
        },
        getBottomLeft: function() {
            return new x(this.min.x,this.max.y)
        },
        getTopRight: function() {
            return new x(this.max.x,this.min.y)
        },
        getTopLeft: function() {
            return this.min
        },
        getBottomRight: function() {
            return this.max
        },
        getSize: function() {
            return this.max.subtract(this.min)
        },
        contains: function(t) {
            var i, e;
            return (t = "number" == typeof t[0] || t instanceof x ? w(t) : b(t))instanceof P ? (i = t.min,
            e = t.max) : i = e = t,
            i.x >= this.min.x && e.x <= this.max.x && i.y >= this.min.y && e.y <= this.max.y
        },
        intersects: function(t) {
            t = b(t);
            var i = this.min
              , e = this.max
              , n = t.min
              , o = t.max
              , s = o.x >= i.x && n.x <= e.x
              , r = o.y >= i.y && n.y <= e.y;
            return s && r
        },
        overlaps: function(t) {
            t = b(t);
            var i = this.min
              , e = this.max
              , n = t.min
              , o = t.max
              , s = o.x > i.x && n.x < e.x
              , r = o.y > i.y && n.y < e.y;
            return s && r
        },
        isValid: function() {
            return !(!this.min || !this.max)
        }
    },
    T.prototype = {
        extend: function(t) {
            var i, e, n = this._southWest, o = this._northEast;
            if (t instanceof M)
                i = t,
                e = t;
            else {
                if (!(t instanceof T))
                    return t ? this.extend(C(t) || z(t)) : this;
                if (i = t._southWest,
                e = t._northEast,
                !i || !e)
                    return this
            }
            return n || o ? (n.lat = Math.min(i.lat, n.lat),
            n.lng = Math.min(i.lng, n.lng),
            o.lat = Math.max(e.lat, o.lat),
            o.lng = Math.max(e.lng, o.lng)) : (this._southWest = new M(i.lat,i.lng),
            this._northEast = new M(e.lat,e.lng)),
            this
        },
        pad: function(t) {
            var i = this._southWest
              , e = this._northEast
              , n = Math.abs(i.lat - e.lat) * t
              , o = Math.abs(i.lng - e.lng) * t;
            return new T(new M(i.lat - n,i.lng - o),new M(e.lat + n,e.lng + o))
        },
        getCenter: function() {
            return new M((this._southWest.lat + this._northEast.lat) / 2,(this._southWest.lng + this._northEast.lng) / 2)
        },
        getSouthWest: function() {
            return this._southWest
        },
        getNorthEast: function() {
            return this._northEast
        },
        getNorthWest: function() {
            return new M(this.getNorth(),this.getWest())
        },
        getSouthEast: function() {
            return new M(this.getSouth(),this.getEast())
        },
        getWest: function() {
            return this._southWest.lng
        },
        getSouth: function() {
            return this._southWest.lat
        },
        getEast: function() {
            return this._northEast.lng
        },
        getNorth: function() {
            return this._northEast.lat
        },
        contains: function(t) {
            t = "number" == typeof t[0] || t instanceof M || "lat"in t ? C(t) : z(t);
            var i, e, n = this._southWest, o = this._northEast;
            return t instanceof T ? (i = t.getSouthWest(),
            e = t.getNorthEast()) : i = e = t,
            i.lat >= n.lat && e.lat <= o.lat && i.lng >= n.lng && e.lng <= o.lng
        },
        intersects: function(t) {
            t = z(t);
            var i = this._southWest
              , e = this._northEast
              , n = t.getSouthWest()
              , o = t.getNorthEast()
              , s = o.lat >= i.lat && n.lat <= e.lat
              , r = o.lng >= i.lng && n.lng <= e.lng;
            return s && r
        },
        overlaps: function(t) {
            t = z(t);
            var i = this._southWest
              , e = this._northEast
              , n = t.getSouthWest()
              , o = t.getNorthEast()
              , s = o.lat > i.lat && n.lat < e.lat
              , r = o.lng > i.lng && n.lng < e.lng;
            return s && r
        },
        toBBoxString: function() {
            return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",")
        },
        equals: function(t, i) {
            return !!t && (t = z(t),
            this._southWest.equals(t.getSouthWest(), i) && this._northEast.equals(t.getNorthEast(), i))
        },
        isValid: function() {
            return !(!this._southWest || !this._northEast)
        }
    },
    M.prototype = {
        equals: function(t, i) {
            return !!t && (t = C(t),
            Math.max(Math.abs(this.lat - t.lat), Math.abs(this.lng - t.lng)) <= (void 0 === i ? 1e-9 : i))
        },
        toString: function(t) {
            return "LatLng(" + a(this.lat, t) + ", " + a(this.lng, t) + ")"
        },
        distanceTo: function(t) {
            return _i.distance(this, C(t))
        },
        wrap: function() {
            return _i.wrapLatLng(this)
        },
        toBounds: function(t) {
            var i = 180 * t / 40075017
              , e = i / Math.cos(Math.PI / 180 * this.lat);
            return z([this.lat - i, this.lng - e], [this.lat + i, this.lng + e])
        },
        clone: function() {
            return new M(this.lat,this.lng,this.alt)
        }
    };
    var ci = {
        latLngToPoint: function(t, i) {
            var e = this.projection.project(t)
              , n = this.scale(i);
            return this.transformation._transform(e, n)
        },
        pointToLatLng: function(t, i) {
            var e = this.scale(i)
              , n = this.transformation.untransform(t, e);
            return this.projection.unproject(n)
        },
        project: function(t) {
            return this.projection.project(t)
        },
        unproject: function(t) {
            return this.projection.unproject(t)
        },
        scale: function(t) {
            return 256 * Math.pow(2, t)
        },
        zoom: function(t) {
            return Math.log(t / 256) / Math.LN2
        },
        getProjectedBounds: function(t) {
            if (this.infinite)
                return null;
            var i = this.projection.bounds
              , e = this.scale(t);
            return new P(this.transformation.transform(i.min, e),this.transformation.transform(i.max, e))
        },
        infinite: !1,
        wrapLatLng: function(t) {
            var i = this.wrapLng ? s(t.lng, this.wrapLng, !0) : t.lng;
            return new M(this.wrapLat ? s(t.lat, this.wrapLat, !0) : t.lat,i,t.alt)
        },
        wrapLatLngBounds: function(t) {
            var i = t.getCenter()
              , e = this.wrapLatLng(i)
              , n = i.lat - e.lat
              , o = i.lng - e.lng;
            if (0 === n && 0 === o)
                return t;
            var s = t.getSouthWest()
              , r = t.getNorthEast();
            return new T(new M(s.lat - n,s.lng - o),new M(r.lat - n,r.lng - o))
        }
    }
      , _i = i({}, ci, {
        wrapLng: [-180, 180],
        R: 6371e3,
        distance: function(t, i) {
            var e = Math.PI / 180
              , n = t.lat * e
              , o = i.lat * e
              , s = Math.sin((i.lat - t.lat) * e / 2)
              , r = Math.sin((i.lng - t.lng) * e / 2)
              , a = s * s + Math.cos(n) * Math.cos(o) * r * r
              , h = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return this.R * h
        }
    })
      , di = {
        R: 6378137,
        MAX_LATITUDE: 85.0511287798,
        project: function(t) {
            var i = Math.PI / 180
              , e = this.MAX_LATITUDE
              , n = Math.max(Math.min(e, t.lat), -e)
              , o = Math.sin(n * i);
            return new x(this.R * t.lng * i,this.R * Math.log((1 + o) / (1 - o)) / 2)
        },
        unproject: function(t) {
            var i = 180 / Math.PI;
            return new M((2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * i,t.x * i / this.R)
        },
        bounds: function() {
            var t = 6378137 * Math.PI;
            return new P([-t, -t],[t, t])
        }()
    };
    Z.prototype = {
        transform: function(t, i) {
            return this._transform(t.clone(), i)
        },
        _transform: function(t, i) {
            return i = i || 1,
            t.x = i * (this._a * t.x + this._b),
            t.y = i * (this._c * t.y + this._d),
            t
        },
        untransform: function(t, i) {
            return i = i || 1,
            new x((t.x / i - this._b) / this._a,(t.y / i - this._d) / this._c)
        }
    };
    var pi, mi, fi, gi, vi = i({}, _i, {
        code: "EPSG:3857",
        projection: di,
        transformation: function() {
            var t = .5 / (Math.PI * di.R);
            return S(t, .5, -t, .5)
        }()
    }), yi = i({}, vi, {
        code: "EPSG:900913"
    }), xi = document.documentElement.style, wi = "ActiveXObject"in window, Li = wi && !document.addEventListener, Pi = "msLaunchUri"in navigator && !("documentMode"in document), bi = I("webkit"), Ti = I("android"), zi = I("android 2") || I("android 3"), Mi = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), Ci = Ti && I("Google") && Mi < 537 && !("AudioNode"in window), Zi = !!window.opera, Si = I("chrome"), Ei = I("gecko") && !bi && !Zi && !wi, ki = !Si && I("safari"), Ii = I("phantom"), Ai = "OTransition"in xi, Bi = 0 === navigator.platform.indexOf("Win"), Oi = wi && "transition"in xi, Ri = "WebKitCSSMatrix"in window && "m11"in new window.WebKitCSSMatrix && !zi, Di = "MozPerspective"in xi, Ni = !window.L_DISABLE_3D && (Oi || Ri || Di) && !Ai && !Ii, ji = "undefined" != typeof orientation || I("mobile"), Wi = ji && bi, Hi = ji && Ri, Fi = !window.PointerEvent && window.MSPointerEvent, Ui = !(!window.PointerEvent && !Fi), Vi = !window.L_NO_TOUCH && (Ui || "ontouchstart"in window || window.DocumentTouch && document instanceof window.DocumentTouch), qi = ji && Zi, Gi = ji && Ei, Ki = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, Yi = !!document.createElement("canvas").getContext, Xi = !(!document.createElementNS || !E("svg").createSVGRect), Ji = !Xi && function() {
        try {
            var t = document.createElement("div");
            t.innerHTML = '<v:shape adj="1"/>';
            var i = t.firstChild;
            return i.style.behavior = "url(#default#VML)",
            i && "object" == typeof i.adj
        } catch (t) {
            return !1
        }
    }(), $i = (Object.freeze || Object)({
        ie: wi,
        ielt9: Li,
        edge: Pi,
        webkit: bi,
        android: Ti,
        android23: zi,
        androidStock: Ci,
        opera: Zi,
        chrome: Si,
        gecko: Ei,
        safari: ki,
        phantom: Ii,
        opera12: Ai,
        win: Bi,
        ie3d: Oi,
        webkit3d: Ri,
        gecko3d: Di,
        any3d: Ni,
        mobile: ji,
        mobileWebkit: Wi,
        mobileWebkit3d: Hi,
        msPointer: Fi,
        pointer: Ui,
        touch: Vi,
        mobileOpera: qi,
        mobileGecko: Gi,
        retina: Ki,
        canvas: Yi,
        svg: Xi,
        vml: Ji
    }), Qi = Fi ? "MSPointerDown" : "pointerdown", te = Fi ? "MSPointerMove" : "pointermove", ie = Fi ? "MSPointerUp" : "pointerup", ee = Fi ? "MSPointerCancel" : "pointercancel", ne = ["INPUT", "SELECT", "OPTION"], oe = {}, se = !1, re = 0, ae = Fi ? "MSPointerDown" : Ui ? "pointerdown" : "touchstart", he = Fi ? "MSPointerUp" : Ui ? "pointerup" : "touchend", ue = "_leaflet_", le = "_leaflet_events", ce = Bi && Si ? 2 * window.devicePixelRatio : Ei ? window.devicePixelRatio : 1, _e = {}, de = (Object.freeze || Object)({
        on: V,
        off: q,
        stopPropagation: Y,
        disableScrollPropagation: X,
        disableClickPropagation: J,
        preventDefault: $,
        stop: Q,
        getMousePosition: tt,
        getWheelDelta: it,
        fakeStop: et,
        skipped: nt,
        isExternalTarget: ot,
        addListener: V,
        removeListener: q
    }), pe = xt(["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"]), me = xt(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]), fe = "webkitTransition" === me || "OTransition" === me ? me + "End" : "transitionend";
    if ("onselectstart"in document)
        mi = function() {
            V(window, "selectstart", $)
        }
        ,
        fi = function() {
            q(window, "selectstart", $)
        }
        ;
    else {
        var ge = xt(["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]);
        mi = function() {
            if (ge) {
                var t = document.documentElement.style;
                gi = t[ge],
                t[ge] = "none"
            }
        }
        ,
        fi = function() {
            ge && (document.documentElement.style[ge] = gi,
            gi = void 0)
        }
    }
    var ve, ye, xe = (Object.freeze || Object)({
        TRANSFORM: pe,
        TRANSITION: me,
        TRANSITION_END: fe,
        get: rt,
        getStyle: at,
        create: ht,
        remove: ut,
        empty: lt,
        toFront: ct,
        toBack: _t,
        hasClass: dt,
        addClass: pt,
        removeClass: mt,
        setClass: ft,
        getClass: gt,
        setOpacity: vt,
        testProp: xt,
        setTransform: wt,
        setPosition: Lt,
        getPosition: Pt,
        disableTextSelection: mi,
        enableTextSelection: fi,
        disableImageDrag: bt,
        enableImageDrag: Tt,
        preventOutline: zt,
        restoreOutline: Mt
    }), we = ui.extend({
        run: function(t, i, e, n) {
            this.stop(),
            this._el = t,
            this._inProgress = !0,
            this._duration = e || .25,
            this._easeOutPower = 1 / Math.max(n || .5, .2),
            this._startPos = Pt(t),
            this._offset = i.subtract(this._startPos),
            this._startTime = +new Date,
            this.fire("start"),
            this._animate()
        },
        stop: function() {
            this._inProgress && (this._step(!0),
            this._complete())
        },
        _animate: function() {
            this._animId = f(this._animate, this),
            this._step()
        },
        _step: function(t) {
            var i = +new Date - this._startTime
              , e = 1e3 * this._duration;
            i < e ? this._runFrame(this._easeOut(i / e), t) : (this._runFrame(1),
            this._complete())
        },
        _runFrame: function(t, i) {
            var e = this._startPos.add(this._offset.multiplyBy(t));
            i && e._round(),
            Lt(this._el, e),
            this.fire("step")
        },
        _complete: function() {
            g(this._animId),
            this._inProgress = !1,
            this.fire("end")
        },
        _easeOut: function(t) {
            return 1 - Math.pow(1 - t, this._easeOutPower)
        }
    }), Le = ui.extend({
        options: {
            crs: vi,
            center: void 0,
            zoom: void 0,
            minZoom: void 0,
            maxZoom: void 0,
            layers: [],
            maxBounds: void 0,
            renderer: void 0,
            zoomAnimation: !0,
            zoomAnimationThreshold: 4,
            fadeAnimation: !0,
            markerZoomAnimation: !0,
            transform3DLimit: 8388608,
            zoomSnap: 1,
            zoomDelta: 1,
            trackResize: !0
        },
        initialize: function(t, i) {
            i = l(this, i),
            this._initContainer(t),
            this._initLayout(),
            this._onResize = e(this._onResize, this),
            this._initEvents(),
            i.maxBounds && this.setMaxBounds(i.maxBounds),
            void 0 !== i.zoom && (this._zoom = this._limitZoom(i.zoom)),
            i.center && void 0 !== i.zoom && this.setView(C(i.center), i.zoom, {
                reset: !0
            }),
            this._handlers = [],
            this._layers = {},
            this._zoomBoundLayers = {},
            this._sizeChanged = !0,
            this.callInitHooks(),
            this._zoomAnimated = me && Ni && !qi && this.options.zoomAnimation,
            this._zoomAnimated && (this._createAnimProxy(),
            V(this._proxy, fe, this._catchTransitionEnd, this)),
            this._addLayers(this.options.layers)
        },
        setView: function(t, e, n) {
            return e = void 0 === e ? this._zoom : this._limitZoom(e),
            t = this._limitCenter(C(t), e, this.options.maxBounds),
            n = n || {},
            this._stop(),
            this._loaded && !n.reset && !0 !== n && (void 0 !== n.animate && (n.zoom = i({
                animate: n.animate
            }, n.zoom),
            n.pan = i({
                animate: n.animate,
                duration: n.duration
            }, n.pan)),
            this._zoom !== e ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, e, n.zoom) : this._tryAnimatedPan(t, n.pan)) ? (clearTimeout(this._sizeTimer),
            this) : (this._resetView(t, e),
            this)
        },
        setZoom: function(t, i) {
            return this._loaded ? this.setView(this.getCenter(), t, {
                zoom: i
            }) : (this._zoom = t,
            this)
        },
        zoomIn: function(t, i) {
            return t = t || (Ni ? this.options.zoomDelta : 1),
            this.setZoom(this._zoom + t, i)
        },
        zoomOut: function(t, i) {
            return t = t || (Ni ? this.options.zoomDelta : 1),
            this.setZoom(this._zoom - t, i)
        },
        setZoomAround: function(t, i, e) {
            var n = this.getZoomScale(i)
              , o = this.getSize().divideBy(2)
              , s = (t instanceof x ? t : this.latLngToContainerPoint(t)).subtract(o).multiplyBy(1 - 1 / n)
              , r = this.containerPointToLatLng(o.add(s));
            return this.setView(r, i, {
                zoom: e
            })
        },
        _getBoundsCenterZoom: function(t, i) {
            i = i || {},
            t = t.getBounds ? t.getBounds() : z(t);
            var e = w(i.paddingTopLeft || i.padding || [0, 0])
              , n = w(i.paddingBottomRight || i.padding || [0, 0])
              , o = this.getBoundsZoom(t, !1, e.add(n));
            if ((o = "number" == typeof i.maxZoom ? Math.min(i.maxZoom, o) : o) === 1 / 0)
                return {
                    center: t.getCenter(),
                    zoom: o
                };
            var s = n.subtract(e).divideBy(2)
              , r = this.project(t.getSouthWest(), o)
              , a = this.project(t.getNorthEast(), o);
            return {
                center: this.unproject(r.add(a).divideBy(2).add(s), o),
                zoom: o
            }
        },
        fitBounds: function(t, i) {
            if (!(t = z(t)).isValid())
                throw new Error("Bounds are not valid.");
            var e = this._getBoundsCenterZoom(t, i);
            return this.setView(e.center, e.zoom, i)
        },
        fitWorld: function(t) {
            return this.fitBounds([[-90, -180], [90, 180]], t)
        },
        panTo: function(t, i) {
            return this.setView(t, this._zoom, {
                pan: i
            })
        },
        panBy: function(t, i) {
            if (t = w(t).round(),
            i = i || {},
            !t.x && !t.y)
                return this.fire("moveend");
            if (!0 !== i.animate && !this.getSize().contains(t))
                return this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()),
                this;
            if (this._panAnim || (this._panAnim = new we,
            this._panAnim.on({
                step: this._onPanTransitionStep,
                end: this._onPanTransitionEnd
            }, this)),
            i.noMoveStart || this.fire("movestart"),
            !1 !== i.animate) {
                pt(this._mapPane, "leaflet-pan-anim");
                var e = this._getMapPanePos().subtract(t).round();
                this._panAnim.run(this._mapPane, e, i.duration || .25, i.easeLinearity)
            } else
                this._rawPanBy(t),
                this.fire("move").fire("moveend");
            return this
        },
        flyTo: function(t, i, e) {
            function n(t) {
                var i = (g * g - m * m + (t ? -1 : 1) * x * x * v * v) / (2 * (t ? g : m) * x * v)
                  , e = Math.sqrt(i * i + 1) - i;
                return e < 1e-9 ? -18 : Math.log(e)
            }
            function o(t) {
                return (Math.exp(t) - Math.exp(-t)) / 2
            }
            function s(t) {
                return (Math.exp(t) + Math.exp(-t)) / 2
            }
            function r(t) {
                return o(t) / s(t)
            }
            function a(t) {
                return m * (s(w) / s(w + y * t))
            }
            function h(t) {
                return m * (s(w) * r(w + y * t) - o(w)) / x
            }
            function u(t) {
                return 1 - Math.pow(1 - t, 1.5)
            }
            function l() {
                var e = (Date.now() - L) / b
                  , n = u(e) * P;
                e <= 1 ? (this._flyToFrame = f(l, this),
                this._move(this.unproject(c.add(_.subtract(c).multiplyBy(h(n) / v)), p), this.getScaleZoom(m / a(n), p), {
                    flyTo: !0
                })) : this._move(t, i)._moveEnd(!0)
            }
            if (!1 === (e = e || {}).animate || !Ni)
                return this.setView(t, i, e);
            this._stop();
            var c = this.project(this.getCenter())
              , _ = this.project(t)
              , d = this.getSize()
              , p = this._zoom;
            t = C(t),
            i = void 0 === i ? p : i;
            var m = Math.max(d.x, d.y)
              , g = m * this.getZoomScale(p, i)
              , v = _.distanceTo(c) || 1
              , y = 1.42
              , x = y * y
              , w = n(0)
              , L = Date.now()
              , P = (n(1) - w) / y
              , b = e.duration ? 1e3 * e.duration : 1e3 * P * .8;
            return this._moveStart(!0, e.noMoveStart),
            l.call(this),
            this
        },
        flyToBounds: function(t, i) {
            var e = this._getBoundsCenterZoom(t, i);
            return this.flyTo(e.center, e.zoom, i)
        },
        setMaxBounds: function(t) {
            return (t = z(t)).isValid() ? (this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds),
            this.options.maxBounds = t,
            this._loaded && this._panInsideMaxBounds(),
            this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null,
            this.off("moveend", this._panInsideMaxBounds))
        },
        setMinZoom: function(t) {
            var i = this.options.minZoom;
            return this.options.minZoom = t,
            this._loaded && i !== t && (this.fire("zoomlevelschange"),
            this.getZoom() < this.options.minZoom) ? this.setZoom(t) : this
        },
        setMaxZoom: function(t) {
            var i = this.options.maxZoom;
            return this.options.maxZoom = t,
            this._loaded && i !== t && (this.fire("zoomlevelschange"),
            this.getZoom() > this.options.maxZoom) ? this.setZoom(t) : this
        },
        panInsideBounds: function(t, i) {
            this._enforcingBounds = !0;
            var e = this.getCenter()
              , n = this._limitCenter(e, this._zoom, z(t));
            return e.equals(n) || this.panTo(n, i),
            this._enforcingBounds = !1,
            this
        },
        invalidateSize: function(t) {
            if (!this._loaded)
                return this;
            t = i({
                animate: !1,
                pan: !0
            }, !0 === t ? {
                animate: !0
            } : t);
            var n = this.getSize();
            this._sizeChanged = !0,
            this._lastCenter = null;
            var o = this.getSize()
              , s = n.divideBy(2).round()
              , r = o.divideBy(2).round()
              , a = s.subtract(r);
            return a.x || a.y ? (t.animate && t.pan ? this.panBy(a) : (t.pan && this._rawPanBy(a),
            this.fire("move"),
            t.debounceMoveend ? (clearTimeout(this._sizeTimer),
            this._sizeTimer = setTimeout(e(this.fire, this, "moveend"), 200)) : this.fire("moveend")),
            this.fire("resize", {
                oldSize: n,
                newSize: o
            })) : this
        },
        stop: function() {
            return this.setZoom(this._limitZoom(this._zoom)),
            this.options.zoomSnap || this.fire("viewreset"),
            this._stop()
        },
        locate: function(t) {
            if (t = this._locateOptions = i({
                timeout: 1e4,
                watch: !1
            }, t),
            !("geolocation"in navigator))
                return this._handleGeolocationError({
                    code: 0,
                    message: "Geolocation not supported."
                }),
                this;
            var n = e(this._handleGeolocationResponse, this)
              , o = e(this._handleGeolocationError, this);
            return t.watch ? this._locationWatchId = navigator.geolocation.watchPosition(n, o, t) : navigator.geolocation.getCurrentPosition(n, o, t),
            this
        },
        stopLocate: function() {
            return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId),
            this._locateOptions && (this._locateOptions.setView = !1),
            this
        },
        _handleGeolocationError: function(t) {
            var i = t.code
              , e = t.message || (1 === i ? "permission denied" : 2 === i ? "position unavailable" : "timeout");
            this._locateOptions.setView && !this._loaded && this.fitWorld(),
            this.fire("locationerror", {
                code: i,
                message: "Geolocation error: " + e + "."
            })
        },
        _handleGeolocationResponse: function(t) {
            var i = new M(t.coords.latitude,t.coords.longitude)
              , e = i.toBounds(t.coords.accuracy)
              , n = this._locateOptions;
            if (n.setView) {
                var o = this.getBoundsZoom(e);
                this.setView(i, n.maxZoom ? Math.min(o, n.maxZoom) : o)
            }
            var s = {
                latlng: i,
                bounds: e,
                timestamp: t.timestamp
            };
            for (var r in t.coords)
                "number" == typeof t.coords[r] && (s[r] = t.coords[r]);
            this.fire("locationfound", s)
        },
        addHandler: function(t, i) {
            if (!i)
                return this;
            var e = this[t] = new i(this);
            return this._handlers.push(e),
            this.options[t] && e.enable(),
            this
        },
        remove: function() {
            if (this._initEvents(!0),
            this._containerId !== this._container._leaflet_id)
                throw new Error("Map container is being reused by another instance");
            try {
                delete this._container._leaflet_id,
                delete this._containerId
            } catch (t) {
                this._container._leaflet_id = void 0,
                this._containerId = void 0
            }
            void 0 !== this._locationWatchId && this.stopLocate(),
            this._stop(),
            ut(this._mapPane),
            this._clearControlPos && this._clearControlPos(),
            this._clearHandlers(),
            this._loaded && this.fire("unload");
            var t;
            for (t in this._layers)
                this._layers[t].remove();
            for (t in this._panes)
                ut(this._panes[t]);
            return this._layers = [],
            this._panes = [],
            delete this._mapPane,
            delete this._renderer,
            this
        },
        createPane: function(t, i) {
            var e = ht("div", "leaflet-pane" + (t ? " leaflet-" + t.replace("Pane", "") + "-pane" : ""), i || this._mapPane);
            return t && (this._panes[t] = e),
            e
        },
        getCenter: function() {
            return this._checkIfLoaded(),
            this._lastCenter && !this._moved() ? this._lastCenter : this.layerPointToLatLng(this._getCenterLayerPoint())
        },
        getZoom: function() {
            return this._zoom
        },
        getBounds: function() {
            var t = this.getPixelBounds();
            return new T(this.unproject(t.getBottomLeft()),this.unproject(t.getTopRight()))
        },
        getMinZoom: function() {
            return void 0 === this.options.minZoom ? this._layersMinZoom || 0 : this.options.minZoom
        },
        getMaxZoom: function() {
            return void 0 === this.options.maxZoom ? void 0 === this._layersMaxZoom ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom
        },
        getBoundsZoom: function(t, i, e) {
            t = z(t),
            e = w(e || [0, 0]);
            var n = this.getZoom() || 0
              , o = this.getMinZoom()
              , s = this.getMaxZoom()
              , r = t.getNorthWest()
              , a = t.getSouthEast()
              , h = this.getSize().subtract(e)
              , u = b(this.project(a, n), this.project(r, n)).getSize()
              , l = Ni ? this.options.zoomSnap : 1
              , c = h.x / u.x
              , _ = h.y / u.y
              , d = i ? Math.max(c, _) : Math.min(c, _);
            return n = this.getScaleZoom(d, n),
            l && (n = Math.round(n / (l / 100)) * (l / 100),
            n = i ? Math.ceil(n / l) * l : Math.floor(n / l) * l),
            Math.max(o, Math.min(s, n))
        },
        getSize: function() {
            return this._size && !this._sizeChanged || (this._size = new x(this._container.clientWidth || 0,this._container.clientHeight || 0),
            this._sizeChanged = !1),
            this._size.clone()
        },
        getPixelBounds: function(t, i) {
            var e = this._getTopLeftPoint(t, i);
            return new P(e,e.add(this.getSize()))
        },
        getPixelOrigin: function() {
            return this._checkIfLoaded(),
            this._pixelOrigin
        },
        getPixelWorldBounds: function(t) {
            return this.options.crs.getProjectedBounds(void 0 === t ? this.getZoom() : t)
        },
        getPane: function(t) {
            return "string" == typeof t ? this._panes[t] : t
        },
        getPanes: function() {
            return this._panes
        },
        getContainer: function() {
            return this._container
        },
        getZoomScale: function(t, i) {
            var e = this.options.crs;
            return i = void 0 === i ? this._zoom : i,
            e.scale(t) / e.scale(i)
        },
        getScaleZoom: function(t, i) {
            var e = this.options.crs;
            i = void 0 === i ? this._zoom : i;
            var n = e.zoom(t * e.scale(i));
            return isNaN(n) ? 1 / 0 : n
        },
        project: function(t, i) {
            return i = void 0 === i ? this._zoom : i,
            this.options.crs.latLngToPoint(C(t), i)
        },
        unproject: function(t, i) {
            return i = void 0 === i ? this._zoom : i,
            this.options.crs.pointToLatLng(w(t), i)
        },
        layerPointToLatLng: function(t) {
            var i = w(t).add(this.getPixelOrigin());
            return this.unproject(i)
        },
        latLngToLayerPoint: function(t) {
            return this.project(C(t))._round()._subtract(this.getPixelOrigin())
        },
        wrapLatLng: function(t) {
            return this.options.crs.wrapLatLng(C(t))
        },
        wrapLatLngBounds: function(t) {
            return this.options.crs.wrapLatLngBounds(z(t))
        },
        distance: function(t, i) {
            return this.options.crs.distance(C(t), C(i))
        },
        containerPointToLayerPoint: function(t) {
            return w(t).subtract(this._getMapPanePos())
        },
        layerPointToContainerPoint: function(t) {
            return w(t).add(this._getMapPanePos())
        },
        containerPointToLatLng: function(t) {
            var i = this.containerPointToLayerPoint(w(t));
            return this.layerPointToLatLng(i)
        },
        latLngToContainerPoint: function(t) {
            return this.layerPointToContainerPoint(this.latLngToLayerPoint(C(t)))
        },
        mouseEventToContainerPoint: function(t) {
            return tt(t, this._container)
        },
        mouseEventToLayerPoint: function(t) {
            return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))
        },
        mouseEventToLatLng: function(t) {
            return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))
        },
        _initContainer: function(t) {
            var i = this._container = rt(t);
            if (!i)
                throw new Error("Map container not found.");
            if (i._leaflet_id)
                throw new Error("Map container is already initialized.");
            V(i, "scroll", this._onScroll, this),
            this._containerId = n(i)
        },
        _initLayout: function() {
            var t = this._container;
            this._fadeAnimated = this.options.fadeAnimation && Ni,
            pt(t, "leaflet-container" + (Vi ? " leaflet-touch" : "") + (Ki ? " leaflet-retina" : "") + (Li ? " leaflet-oldie" : "") + (ki ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
            var i = at(t, "position");
            "absolute" !== i && "relative" !== i && "fixed" !== i && (t.style.position = "relative"),
            this._initPanes(),
            this._initControlPos && this._initControlPos()
        },
        _initPanes: function() {
            var t = this._panes = {};
            this._paneRenderers = {},
            this._mapPane = this.createPane("mapPane", this._container),
            Lt(this._mapPane, new x(0,0)),
            this.createPane("tilePane"),
            this.createPane("shadowPane"),
            this.createPane("overlayPane"),
            this.createPane("markerPane"),
            this.createPane("tooltipPane"),
            this.createPane("popupPane"),
            this.options.markerZoomAnimation || (pt(t.markerPane, "leaflet-zoom-hide"),
            pt(t.shadowPane, "leaflet-zoom-hide"))
        },
        _resetView: function(t, i) {
            Lt(this._mapPane, new x(0,0));
            var e = !this._loaded;
            this._loaded = !0,
            i = this._limitZoom(i),
            this.fire("viewprereset");
            var n = this._zoom !== i;
            this._moveStart(n, !1)._move(t, i)._moveEnd(n),
            this.fire("viewreset"),
            e && this.fire("load")
        },
        _moveStart: function(t, i) {
            return t && this.fire("zoomstart"),
            i || this.fire("movestart"),
            this
        },
        _move: function(t, i, e) {
            void 0 === i && (i = this._zoom);
            var n = this._zoom !== i;
            return this._zoom = i,
            this._lastCenter = t,
            this._pixelOrigin = this._getNewPixelOrigin(t),
            (n || e && e.pinch) && this.fire("zoom", e),
            this.fire("move", e)
        },
        _moveEnd: function(t) {
            return t && this.fire("zoomend"),
            this.fire("moveend")
        },
        _stop: function() {
            return g(this._flyToFrame),
            this._panAnim && this._panAnim.stop(),
            this
        },
        _rawPanBy: function(t) {
            Lt(this._mapPane, this._getMapPanePos().subtract(t))
        },
        _getZoomSpan: function() {
            return this.getMaxZoom() - this.getMinZoom()
        },
        _panInsideMaxBounds: function() {
            this._enforcingBounds || this.panInsideBounds(this.options.maxBounds)
        },
        _checkIfLoaded: function() {
            if (!this._loaded)
                throw new Error("Set map center and zoom first.")
        },
        _initEvents: function(t) {
            this._targets = {},
            this._targets[n(this._container)] = this;
            var i = t ? q : V;
            i(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress", this._handleDOMEvent, this),
            this.options.trackResize && i(window, "resize", this._onResize, this),
            Ni && this.options.transform3DLimit && (t ? this.off : this.on).call(this, "moveend", this._onMoveEnd)
        },
        _onResize: function() {
            g(this._resizeRequest),
            this._resizeRequest = f(function() {
                this.invalidateSize({
                    debounceMoveend: !0
                })
            }, this)
        },
        _onScroll: function() {
            this._container.scrollTop = 0,
            this._container.scrollLeft = 0
        },
        _onMoveEnd: function() {
            var t = this._getMapPanePos();
            Math.max(Math.abs(t.x), Math.abs(t.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom())
        },
        _findEventTargets: function(t, i) {
            for (var e, o = [], s = "mouseout" === i || "mouseover" === i, r = t.target || t.srcElement, a = !1; r; ) {
                if ((e = this._targets[n(r)]) && ("click" === i || "preclick" === i) && !t._simulated && this._draggableMoved(e)) {
                    a = !0;
                    break
                }
                if (e && e.listens(i, !0)) {
                    if (s && !ot(r, t))
                        break;
                    if (o.push(e),
                    s)
                        break
                }
                if (r === this._container)
                    break;
                r = r.parentNode
            }
            return o.length || a || s || !ot(r, t) || (o = [this]),
            o
        },
        _handleDOMEvent: function(t) {
            if (this._loaded && !nt(t)) {
                var i = t.type;
                "mousedown" !== i && "keypress" !== i || zt(t.target || t.srcElement),
                this._fireDOMEvent(t, i)
            }
        },
        _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
        _fireDOMEvent: function(t, e, n) {
            if ("click" === t.type) {
                var o = i({}, t);
                o.type = "preclick",
                this._fireDOMEvent(o, o.type, n)
            }
            if (!t._stopped && (n = (n || []).concat(this._findEventTargets(t, e))).length) {
                var s = n[0];
                "contextmenu" === e && s.listens(e, !0) && $(t);
                var r = {
                    originalEvent: t
                };
                if ("keypress" !== t.type) {
                    var a = s.getLatLng && (!s._radius || s._radius <= 10);
                    r.containerPoint = a ? this.latLngToContainerPoint(s.getLatLng()) : this.mouseEventToContainerPoint(t),
                    r.layerPoint = this.containerPointToLayerPoint(r.containerPoint),
                    r.latlng = a ? s.getLatLng() : this.layerPointToLatLng(r.layerPoint)
                }
                for (var h = 0; h < n.length; h++)
                    if (n[h].fire(e, r, !0),
                    r.originalEvent._stopped || !1 === n[h].options.bubblingMouseEvents && -1 !== d(this._mouseEvents, e))
                        return
            }
        },
        _draggableMoved: function(t) {
            return (t = t.dragging && t.dragging.enabled() ? t : this).dragging && t.dragging.moved() || this.boxZoom && this.boxZoom.moved()
        },
        _clearHandlers: function() {
            for (var t = 0, i = this._handlers.length; t < i; t++)
                this._handlers[t].disable()
        },
        whenReady: function(t, i) {
            return this._loaded ? t.call(i || this, {
                target: this
            }) : this.on("load", t, i),
            this
        },
        _getMapPanePos: function() {
            return Pt(this._mapPane) || new x(0,0)
        },
        _moved: function() {
            var t = this._getMapPanePos();
            return t && !t.equals([0, 0])
        },
        _getTopLeftPoint: function(t, i) {
            return (t && void 0 !== i ? this._getNewPixelOrigin(t, i) : this.getPixelOrigin()).subtract(this._getMapPanePos())
        },
        _getNewPixelOrigin: function(t, i) {
            var e = this.getSize()._divideBy(2);
            return this.project(t, i)._subtract(e)._add(this._getMapPanePos())._round()
        },
        _latLngToNewLayerPoint: function(t, i, e) {
            var n = this._getNewPixelOrigin(e, i);
            return this.project(t, i)._subtract(n)
        },
        _latLngBoundsToNewLayerBounds: function(t, i, e) {
            var n = this._getNewPixelOrigin(e, i);
            return b([this.project(t.getSouthWest(), i)._subtract(n), this.project(t.getNorthWest(), i)._subtract(n), this.project(t.getSouthEast(), i)._subtract(n), this.project(t.getNorthEast(), i)._subtract(n)])
        },
        _getCenterLayerPoint: function() {
            return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
        },
        _getCenterOffset: function(t) {
            return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())
        },
        _limitCenter: function(t, i, e) {
            if (!e)
                return t;
            var n = this.project(t, i)
              , o = this.getSize().divideBy(2)
              , s = new P(n.subtract(o),n.add(o))
              , r = this._getBoundsOffset(s, e, i);
            return r.round().equals([0, 0]) ? t : this.unproject(n.add(r), i)
        },
        _limitOffset: function(t, i) {
            if (!i)
                return t;
            var e = this.getPixelBounds()
              , n = new P(e.min.add(t),e.max.add(t));
            return t.add(this._getBoundsOffset(n, i))
        },
        _getBoundsOffset: function(t, i, e) {
            var n = b(this.project(i.getNorthEast(), e), this.project(i.getSouthWest(), e))
              , o = n.min.subtract(t.min)
              , s = n.max.subtract(t.max);
            return new x(this._rebound(o.x, -s.x),this._rebound(o.y, -s.y))
        },
        _rebound: function(t, i) {
            return t + i > 0 ? Math.round(t - i) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(i))
        },
        _limitZoom: function(t) {
            var i = this.getMinZoom()
              , e = this.getMaxZoom()
              , n = Ni ? this.options.zoomSnap : 1;
            return n && (t = Math.round(t / n) * n),
            Math.max(i, Math.min(e, t))
        },
        _onPanTransitionStep: function() {
            this.fire("move")
        },
        _onPanTransitionEnd: function() {
            mt(this._mapPane, "leaflet-pan-anim"),
            this.fire("moveend")
        },
        _tryAnimatedPan: function(t, i) {
            var e = this._getCenterOffset(t)._trunc();
            return !(!0 !== (i && i.animate) && !this.getSize().contains(e)) && (this.panBy(e, i),
            !0)
        },
        _createAnimProxy: function() {
            var t = this._proxy = ht("div", "leaflet-proxy leaflet-zoom-animated");
            this._panes.mapPane.appendChild(t),
            this.on("zoomanim", function(t) {
                var i = pe
                  , e = this._proxy.style[i];
                wt(this._proxy, this.project(t.center, t.zoom), this.getZoomScale(t.zoom, 1)),
                e === this._proxy.style[i] && this._animatingZoom && this._onZoomTransitionEnd()
            }, this),
            this.on("load moveend", function() {
                var t = this.getCenter()
                  , i = this.getZoom();
                wt(this._proxy, this.project(t, i), this.getZoomScale(i, 1))
            }, this),
            this._on("unload", this._destroyAnimProxy, this)
        },
        _destroyAnimProxy: function() {
            ut(this._proxy),
            delete this._proxy
        },
        _catchTransitionEnd: function(t) {
            this._animatingZoom && t.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd()
        },
        _nothingToAnimate: function() {
            return !this._container.getElementsByClassName("leaflet-zoom-animated").length
        },
        _tryAnimatedZoom: function(t, i, e) {
            if (this._animatingZoom)
                return !0;
            if (e = e || {},
            !this._zoomAnimated || !1 === e.animate || this._nothingToAnimate() || Math.abs(i - this._zoom) > this.options.zoomAnimationThreshold)
                return !1;
            var n = this.getZoomScale(i)
              , o = this._getCenterOffset(t)._divideBy(1 - 1 / n);
            return !(!0 !== e.animate && !this.getSize().contains(o)) && (f(function() {
                this._moveStart(!0, !1)._animateZoom(t, i, !0)
            }, this),
            !0)
        },
        _animateZoom: function(t, i, n, o) {
            this._mapPane && (n && (this._animatingZoom = !0,
            this._animateToCenter = t,
            this._animateToZoom = i,
            pt(this._mapPane, "leaflet-zoom-anim")),
            this.fire("zoomanim", {
                center: t,
                zoom: i,
                noUpdate: o
            }),
            setTimeout(e(this._onZoomTransitionEnd, this), 250))
        },
        _onZoomTransitionEnd: function() {
            this._animatingZoom && (this._mapPane && mt(this._mapPane, "leaflet-zoom-anim"),
            this._animatingZoom = !1,
            this._move(this._animateToCenter, this._animateToZoom),
            f(function() {
                this._moveEnd(!0)
            }, this))
        }
    }), Pe = v.extend({
        options: {
            position: "topright"
        },
        initialize: function(t) {
            l(this, t)
        },
        getPosition: function() {
            return this.options.position
        },
        setPosition: function(t) {
            var i = this._map;
            return i && i.removeControl(this),
            this.options.position = t,
            i && i.addControl(this),
            this
        },
        getContainer: function() {
            return this._container
        },
        addTo: function(t) {
            this.remove(),
            this._map = t;
            var i = this._container = this.onAdd(t)
              , e = this.getPosition()
              , n = t._controlCorners[e];
            return pt(i, "leaflet-control"),
            -1 !== e.indexOf("bottom") ? n.insertBefore(i, n.firstChild) : n.appendChild(i),
            this
        },
        remove: function() {
            return this._map ? (ut(this._container),
            this.onRemove && this.onRemove(this._map),
            this._map = null,
            this) : this
        },
        _refocusOnMap: function(t) {
            this._map && t && t.screenX > 0 && t.screenY > 0 && this._map.getContainer().focus()
        }
    }), be = function(t) {
        return new Pe(t)
    };
    Le.include({
        addControl: function(t) {
            return t.addTo(this),
            this
        },
        removeControl: function(t) {
            return t.remove(),
            this
        },
        _initControlPos: function() {
            function t(t, o) {
                var s = e + t + " " + e + o;
                i[t + o] = ht("div", s, n)
            }
            var i = this._controlCorners = {}
              , e = "leaflet-"
              , n = this._controlContainer = ht("div", e + "control-container", this._container);
            t("top", "left"),
            t("top", "right"),
            t("bottom", "left"),
            t("bottom", "right")
        },
        _clearControlPos: function() {
            for (var t in this._controlCorners)
                ut(this._controlCorners[t]);
            ut(this._controlContainer),
            delete this._controlCorners,
            delete this._controlContainer
        }
    });
    var Te = Pe.extend({
        options: {
            collapsed: !0,
            position: "topright",
            autoZIndex: !0,
            hideSingleBase: !1,
            sortLayers: !1,
            sortFunction: function(t, i, e, n) {
                return e < n ? -1 : n < e ? 1 : 0
            }
        },
        initialize: function(t, i, e) {
            l(this, e),
            this._layerControlInputs = [],
            this._layers = [],
            this._lastZIndex = 0,
            this._handlingClick = !1;
            for (var n in t)
                this._addLayer(t[n], n);
            for (n in i)
                this._addLayer(i[n], n, !0)
        },
        onAdd: function(t) {
            this._initLayout(),
            this._update(),
            this._map = t,
            t.on("zoomend", this._checkDisabledLayers, this);
            for (var i = 0; i < this._layers.length; i++)
                this._layers[i].layer.on("add remove", this._onLayerChange, this);
            return this._container
        },
        addTo: function(t) {
            return Pe.prototype.addTo.call(this, t),
            this._expandIfNotCollapsed()
        },
        onRemove: function() {
            this._map.off("zoomend", this._checkDisabledLayers, this);
            for (var t = 0; t < this._layers.length; t++)
                this._layers[t].layer.off("add remove", this._onLayerChange, this)
        },
        addBaseLayer: function(t, i) {
            return this._addLayer(t, i),
            this._map ? this._update() : this
        },
        addOverlay: function(t, i) {
            return this._addLayer(t, i, !0),
            this._map ? this._update() : this
        },
        removeLayer: function(t) {
            t.off("add remove", this._onLayerChange, this);
            var i = this._getLayer(n(t));
            return i && this._layers.splice(this._layers.indexOf(i), 1),
            this._map ? this._update() : this
        },
        expand: function() {
            pt(this._container, "leaflet-control-layers-expanded"),
            this._form.style.height = null;
            var t = this._map.getSize().y - (this._container.offsetTop + 50);
            return t < this._form.clientHeight ? (pt(this._form, "leaflet-control-layers-scrollbar"),
            this._form.style.height = t + "px") : mt(this._form, "leaflet-control-layers-scrollbar"),
            this._checkDisabledLayers(),
            this
        },
        collapse: function() {
            return mt(this._container, "leaflet-control-layers-expanded"),
            this
        },
        _initLayout: function() {
            var t = "leaflet-control-layers"
              , i = this._container = ht("div", t)
              , e = this.options.collapsed;
            i.setAttribute("aria-haspopup", !0),
            J(i),
            X(i);
            var n = this._form = ht("form", t + "-list");
            e && (this._map.on("click", this.collapse, this),
            Ti || V(i, {
                mouseenter: this.expand,
                mouseleave: this.collapse
            }, this));
            var o = this._layersLink = ht("a", t + "-toggle", i);
            o.href = "#",
            o.title = "Layers",
            Vi ? (V(o, "click", Q),
            V(o, "click", this.expand, this)) : V(o, "focus", this.expand, this),
            e || this.expand(),
            this._baseLayersList = ht("div", t + "-base", n),
            this._separator = ht("div", t + "-separator", n),
            this._overlaysList = ht("div", t + "-overlays", n),
            i.appendChild(n)
        },
        _getLayer: function(t) {
            for (var i = 0; i < this._layers.length; i++)
                if (this._layers[i] && n(this._layers[i].layer) === t)
                    return this._layers[i]
        },
        _addLayer: function(t, i, n) {
            this._map && t.on("add remove", this._onLayerChange, this),
            this._layers.push({
                layer: t,
                name: i,
                overlay: n
            }),
            this.options.sortLayers && this._layers.sort(e(function(t, i) {
                return this.options.sortFunction(t.layer, i.layer, t.name, i.name)
            }, this)),
            this.options.autoZIndex && t.setZIndex && (this._lastZIndex++,
            t.setZIndex(this._lastZIndex)),
            this._expandIfNotCollapsed()
        },
        _update: function() {
            if (!this._container)
                return this;
            lt(this._baseLayersList),
            lt(this._overlaysList),
            this._layerControlInputs = [];
            var t, i, e, n, o = 0;
            for (e = 0; e < this._layers.length; e++)
                n = this._layers[e],
                this._addItem(n),
                i = i || n.overlay,
                t = t || !n.overlay,
                o += n.overlay ? 0 : 1;
            return this.options.hideSingleBase && (t = t && o > 1,
            this._baseLayersList.style.display = t ? "" : "none"),
            this._separator.style.display = i && t ? "" : "none",
            this
        },
        _onLayerChange: function(t) {
            this._handlingClick || this._update();
            var i = this._getLayer(n(t.target))
              , e = i.overlay ? "add" === t.type ? "overlayadd" : "overlayremove" : "add" === t.type ? "baselayerchange" : null;
            e && this._map.fire(e, i)
        },
        _createRadioElement: function(t, i) {
            var e = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"' + (i ? ' checked="checked"' : "") + "/>"
              , n = document.createElement("div");
            return n.innerHTML = e,
            n.firstChild
        },
        _addItem: function(t) {
            var i, e = document.createElement("label"), o = this._map.hasLayer(t.layer);
            t.overlay ? ((i = document.createElement("input")).type = "checkbox",
            i.className = "leaflet-control-layers-selector",
            i.defaultChecked = o) : i = this._createRadioElement("leaflet-base-layers", o),
            this._layerControlInputs.push(i),
            i.layerId = n(t.layer),
            V(i, "click", this._onInputClick, this);
            var s = document.createElement("span");
            s.innerHTML = " " + t.name;
            var r = document.createElement("div");
            return e.appendChild(r),
            r.appendChild(i),
            r.appendChild(s),
            (t.overlay ? this._overlaysList : this._baseLayersList).appendChild(e),
            this._checkDisabledLayers(),
            e
        },
        _onInputClick: function() {
            var t, i, e = this._layerControlInputs, n = [], o = [];
            this._handlingClick = !0;
            for (var s = e.length - 1; s >= 0; s--)
                t = e[s],
                i = this._getLayer(t.layerId).layer,
                t.checked ? n.push(i) : t.checked || o.push(i);
            for (s = 0; s < o.length; s++)
                this._map.hasLayer(o[s]) && this._map.removeLayer(o[s]);
            for (s = 0; s < n.length; s++)
                this._map.hasLayer(n[s]) || this._map.addLayer(n[s]);
            this._handlingClick = !1,
            this._refocusOnMap()
        },
        _checkDisabledLayers: function() {
            for (var t, i, e = this._layerControlInputs, n = this._map.getZoom(), o = e.length - 1; o >= 0; o--)
                t = e[o],
                i = this._getLayer(t.layerId).layer,
                t.disabled = void 0 !== i.options.minZoom && n < i.options.minZoom || void 0 !== i.options.maxZoom && n > i.options.maxZoom
        },
        _expandIfNotCollapsed: function() {
            return this._map && !this.options.collapsed && this.expand(),
            this
        },
        _expand: function() {
            return this.expand()
        },
        _collapse: function() {
            return this.collapse()
        }
    })
      , ze = Pe.extend({
        options: {
            position: "topleft",
            zoomInText: "+",
            zoomInTitle: "Zoom in",
            zoomOutText: "&#x2212;",
            zoomOutTitle: "Zoom out"
        },
        onAdd: function(t) {
            var i = "leaflet-control-zoom"
              , e = ht("div", i + " leaflet-bar")
              , n = this.options;
            return this._zoomInButton = this._createButton(n.zoomInText, n.zoomInTitle, i + "-in", e, this._zoomIn),
            this._zoomOutButton = this._createButton(n.zoomOutText, n.zoomOutTitle, i + "-out", e, this._zoomOut),
            this._updateDisabled(),
            t.on("zoomend zoomlevelschange", this._updateDisabled, this),
            e
        },
        onRemove: function(t) {
            t.off("zoomend zoomlevelschange", this._updateDisabled, this)
        },
        disable: function() {
            return this._disabled = !0,
            this._updateDisabled(),
            this
        },
        enable: function() {
            return this._disabled = !1,
            this._updateDisabled(),
            this
        },
        _zoomIn: function(t) {
            !this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1))
        },
        _zoomOut: function(t) {
            !this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1))
        },
        _createButton: function(t, i, e, n, o) {
            var s = ht("a", e, n);
            return s.innerHTML = t,
            s.href = "#",
            s.title = i,
            s.setAttribute("role", "button"),
            s.setAttribute("aria-label", i),
            J(s),
            V(s, "click", Q),
            V(s, "click", o, this),
            V(s, "click", this._refocusOnMap, this),
            s
        },
        _updateDisabled: function() {
            var t = this._map
              , i = "leaflet-disabled";
            mt(this._zoomInButton, i),
            mt(this._zoomOutButton, i),
            (this._disabled || t._zoom === t.getMinZoom()) && pt(this._zoomOutButton, i),
            (this._disabled || t._zoom === t.getMaxZoom()) && pt(this._zoomInButton, i)
        }
    });
    Le.mergeOptions({
        zoomControl: !0
    }),
    Le.addInitHook(function() {
        this.options.zoomControl && (this.zoomControl = new ze,
        this.addControl(this.zoomControl))
    });
    var Me = Pe.extend({
        options: {
            position: "bottomleft",
            maxWidth: 100,
            metric: !0,
            imperial: !0
        },
        onAdd: function(t) {
            var i = ht("div", "leaflet-control-scale")
              , e = this.options;
            return this._addScales(e, "leaflet-control-scale-line", i),
            t.on(e.updateWhenIdle ? "moveend" : "move", this._update, this),
            t.whenReady(this._update, this),
            i
        },
        onRemove: function(t) {
            t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this)
        },
        _addScales: function(t, i, e) {
            t.metric && (this._mScale = ht("div", i, e)),
            t.imperial && (this._iScale = ht("div", i, e))
        },
        _update: function() {
            var t = this._map
              , i = t.getSize().y / 2
              , e = t.distance(t.containerPointToLatLng([0, i]), t.containerPointToLatLng([this.options.maxWidth, i]));
            this._updateScales(e)
        },
        _updateScales: function(t) {
            this.options.metric && t && this._updateMetric(t),
            this.options.imperial && t && this._updateImperial(t)
        },
        _updateMetric: function(t) {
            var i = this._getRoundNum(t)
              , e = i < 1e3 ? i + " m" : i / 1e3 + " km";
            this._updateScale(this._mScale, e, i / t)
        },
        _updateImperial: function(t) {
            var i, e, n, o = 3.2808399 * t;
            o > 5280 ? (i = o / 5280,
            e = this._getRoundNum(i),
            this._updateScale(this._iScale, e + " mi", e / i)) : (n = this._getRoundNum(o),
            this._updateScale(this._iScale, n + " ft", n / o))
        },
        _updateScale: function(t, i, e) {
            t.style.width = Math.round(this.options.maxWidth * e) + "px",
            t.innerHTML = i
        },
        _getRoundNum: function(t) {
            var i = Math.pow(10, (Math.floor(t) + "").length - 1)
              , e = t / i;
            return e = e >= 10 ? 10 : e >= 5 ? 5 : e >= 3 ? 3 : e >= 2 ? 2 : 1,
            i * e
        }
    })
      , Ce = Pe.extend({
        options: {
            position: "bottomright",
            prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
        },
        initialize: function(t) {
            l(this, t),
            this._attributions = {}
        },
        onAdd: function(t) {
            t.attributionControl = this,
            this._container = ht("div", "leaflet-control-attribution"),
            J(this._container);
            for (var i in t._layers)
                t._layers[i].getAttribution && this.addAttribution(t._layers[i].getAttribution());
            return this._update(),
            this._container
        },
        setPrefix: function(t) {
            return this.options.prefix = t,
            this._update(),
            this
        },
        addAttribution: function(t) {
            return t ? (this._attributions[t] || (this._attributions[t] = 0),
            this._attributions[t]++,
            this._update(),
            this) : this
        },
        removeAttribution: function(t) {
            return t ? (this._attributions[t] && (this._attributions[t]--,
            this._update()),
            this) : this
        },
        _update: function() {
            if (this._map) {
                var t = [];
                for (var i in this._attributions)
                    this._attributions[i] && t.push(i);
                var e = [];
                this.options.prefix && e.push(this.options.prefix),
                t.length && e.push(t.join(", ")),
                this._container.innerHTML = e.join(" | ")
            }
        }
    });
    Le.mergeOptions({
        attributionControl: !0
    }),
    Le.addInitHook(function() {
        this.options.attributionControl && (new Ce).addTo(this)
    });
    Pe.Layers = Te,
    Pe.Zoom = ze,
    Pe.Scale = Me,
    Pe.Attribution = Ce,
    be.layers = function(t, i, e) {
        return new Te(t,i,e)
    }
    ,
    be.zoom = function(t) {
        return new ze(t)
    }
    ,
    be.scale = function(t) {
        return new Me(t)
    }
    ,
    be.attribution = function(t) {
        return new Ce(t)
    }
    ;
    var Ze = v.extend({
        initialize: function(t) {
            this._map = t
        },
        enable: function() {
            return this._enabled ? this : (this._enabled = !0,
            this.addHooks(),
            this)
        },
        disable: function() {
            return this._enabled ? (this._enabled = !1,
            this.removeHooks(),
            this) : this
        },
        enabled: function() {
            return !!this._enabled
        }
    });
    Ze.addTo = function(t, i) {
        return t.addHandler(i, this),
        this
    }
    ;
    var Se, Ee = {
        Events: hi
    }, ke = Vi ? "touchstart mousedown" : "mousedown", Ie = {
        mousedown: "mouseup",
        touchstart: "touchend",
        pointerdown: "touchend",
        MSPointerDown: "touchend"
    }, Ae = {
        mousedown: "mousemove",
        touchstart: "touchmove",
        pointerdown: "touchmove",
        MSPointerDown: "touchmove"
    }, Be = ui.extend({
        options: {
            clickTolerance: 3
        },
        initialize: function(t, i, e, n) {
            l(this, n),
            this._element = t,
            this._dragStartTarget = i || t,
            this._preventOutline = e
        },
        enable: function() {
            this._enabled || (V(this._dragStartTarget, ke, this._onDown, this),
            this._enabled = !0)
        },
        disable: function() {
            this._enabled && (Be._dragging === this && this.finishDrag(),
            q(this._dragStartTarget, ke, this._onDown, this),
            this._enabled = !1,
            this._moved = !1)
        },
        _onDown: function(t) {
            if (!t._simulated && this._enabled && (this._moved = !1,
            !dt(this._element, "leaflet-zoom-anim") && !(Be._dragging || t.shiftKey || 1 !== t.which && 1 !== t.button && !t.touches || (Be._dragging = this,
            this._preventOutline && zt(this._element),
            bt(),
            mi(),
            this._moving)))) {
                this.fire("down");
                var i = t.touches ? t.touches[0] : t;
                this._startPoint = new x(i.clientX,i.clientY),
                V(document, Ae[t.type], this._onMove, this),
                V(document, Ie[t.type], this._onUp, this)
            }
        },
        _onMove: function(t) {
            if (!t._simulated && this._enabled)
                if (t.touches && t.touches.length > 1)
                    this._moved = !0;
                else {
                    var i = t.touches && 1 === t.touches.length ? t.touches[0] : t
                      , e = new x(i.clientX,i.clientY).subtract(this._startPoint);
                    (e.x || e.y) && (Math.abs(e.x) + Math.abs(e.y) < this.options.clickTolerance || ($(t),
                    this._moved || (this.fire("dragstart"),
                    this._moved = !0,
                    this._startPos = Pt(this._element).subtract(e),
                    pt(document.body, "leaflet-dragging"),
                    this._lastTarget = t.target || t.srcElement,
                    window.SVGElementInstance && this._lastTarget instanceof SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement),
                    pt(this._lastTarget, "leaflet-drag-target")),
                    this._newPos = this._startPos.add(e),
                    this._moving = !0,
                    g(this._animRequest),
                    this._lastEvent = t,
                    this._animRequest = f(this._updatePosition, this, !0)))
                }
        },
        _updatePosition: function() {
            var t = {
                originalEvent: this._lastEvent
            };
            this.fire("predrag", t),
            Lt(this._element, this._newPos),
            this.fire("drag", t)
        },
        _onUp: function(t) {
            !t._simulated && this._enabled && this.finishDrag()
        },
        finishDrag: function() {
            mt(document.body, "leaflet-dragging"),
            this._lastTarget && (mt(this._lastTarget, "leaflet-drag-target"),
            this._lastTarget = null);
            for (var t in Ae)
                q(document, Ae[t], this._onMove, this),
                q(document, Ie[t], this._onUp, this);
            Tt(),
            fi(),
            this._moved && this._moving && (g(this._animRequest),
            this.fire("dragend", {
                distance: this._newPos.distanceTo(this._startPos)
            })),
            this._moving = !1,
            Be._dragging = !1
        }
    }), Oe = (Object.freeze || Object)({
        simplify: Ct,
        pointToSegmentDistance: Zt,
        closestPointOnSegment: function(t, i, e) {
            return Rt(t, i, e)
        },
        clipSegment: It,
        _getEdgeIntersection: At,
        _getBitCode: Bt,
        _sqClosestPointOnSegment: Rt,
        isFlat: Dt,
        _flat: Nt
    }), Re = (Object.freeze || Object)({
        clipPolygon: jt
    }), De = {
        project: function(t) {
            return new x(t.lng,t.lat)
        },
        unproject: function(t) {
            return new M(t.y,t.x)
        },
        bounds: new P([-180, -90],[180, 90])
    }, Ne = {
        R: 6378137,
        R_MINOR: 6356752.314245179,
        bounds: new P([-20037508.34279, -15496570.73972],[20037508.34279, 18764656.23138]),
        project: function(t) {
            var i = Math.PI / 180
              , e = this.R
              , n = t.lat * i
              , o = this.R_MINOR / e
              , s = Math.sqrt(1 - o * o)
              , r = s * Math.sin(n)
              , a = Math.tan(Math.PI / 4 - n / 2) / Math.pow((1 - r) / (1 + r), s / 2);
            return n = -e * Math.log(Math.max(a, 1e-10)),
            new x(t.lng * i * e,n)
        },
        unproject: function(t) {
            for (var i, e = 180 / Math.PI, n = this.R, o = this.R_MINOR / n, s = Math.sqrt(1 - o * o), r = Math.exp(-t.y / n), a = Math.PI / 2 - 2 * Math.atan(r), h = 0, u = .1; h < 15 && Math.abs(u) > 1e-7; h++)
                i = s * Math.sin(a),
                i = Math.pow((1 - i) / (1 + i), s / 2),
                a += u = Math.PI / 2 - 2 * Math.atan(r * i) - a;
            return new M(a * e,t.x * e / n)
        }
    }, je = (Object.freeze || Object)({
        LonLat: De,
        Mercator: Ne,
        SphericalMercator: di
    }), We = i({}, _i, {
        code: "EPSG:3395",
        projection: Ne,
        transformation: function() {
            var t = .5 / (Math.PI * Ne.R);
            return S(t, .5, -t, .5)
        }()
    }), He = i({}, _i, {
        code: "EPSG:4326",
        projection: De,
        transformation: S(1 / 180, 1, -1 / 180, .5)
    }), Fe = i({}, ci, {
        projection: De,
        transformation: S(1, 0, -1, 0),
        scale: function(t) {
            return Math.pow(2, t)
        },
        zoom: function(t) {
            return Math.log(t) / Math.LN2
        },
        distance: function(t, i) {
            var e = i.lng - t.lng
              , n = i.lat - t.lat;
            return Math.sqrt(e * e + n * n)
        },
        infinite: !0
    });
    ci.Earth = _i,
    ci.EPSG3395 = We,
    ci.EPSG3857 = vi,
    ci.EPSG900913 = yi,
    ci.EPSG4326 = He,
    ci.Simple = Fe;
    var Ue = ui.extend({
        options: {
            pane: "overlayPane",
            attribution: null,
            bubblingMouseEvents: !0
        },
        addTo: function(t) {
            return t.addLayer(this),
            this
        },
        remove: function() {
            return this.removeFrom(this._map || this._mapToAdd)
        },
        removeFrom: function(t) {
            return t && t.removeLayer(this),
            this
        },
        getPane: function(t) {
            return this._map.getPane(t ? this.options[t] || t : this.options.pane)
        },
        addInteractiveTarget: function(t) {
            return this._map._targets[n(t)] = this,
            this
        },
        removeInteractiveTarget: function(t) {
            return delete this._map._targets[n(t)],
            this
        },
        getAttribution: function() {
            return this.options.attribution
        },
        _layerAdd: function(t) {
            var i = t.target;
            if (i.hasLayer(this)) {
                if (this._map = i,
                this._zoomAnimated = i._zoomAnimated,
                this.getEvents) {
                    var e = this.getEvents();
                    i.on(e, this),
                    this.once("remove", function() {
                        i.off(e, this)
                    }, this)
                }
                this.onAdd(i),
                this.getAttribution && i.attributionControl && i.attributionControl.addAttribution(this.getAttribution()),
                this.fire("add"),
                i.fire("layeradd", {
                    layer: this
                })
            }
        }
    });
    Le.include({
        addLayer: function(t) {
            if (!t._layerAdd)
                throw new Error("The provided object is not a Layer.");
            var i = n(t);
            return this._layers[i] ? this : (this._layers[i] = t,
            t._mapToAdd = this,
            t.beforeAdd && t.beforeAdd(this),
            this.whenReady(t._layerAdd, t),
            this)
        },
        removeLayer: function(t) {
            var i = n(t);
            return this._layers[i] ? (this._loaded && t.onRemove(this),
            t.getAttribution && this.attributionControl && this.attributionControl.removeAttribution(t.getAttribution()),
            delete this._layers[i],
            this._loaded && (this.fire("layerremove", {
                layer: t
            }),
            t.fire("remove")),
            t._map = t._mapToAdd = null,
            this) : this
        },
        hasLayer: function(t) {
            return !!t && n(t)in this._layers
        },
        eachLayer: function(t, i) {
            for (var e in this._layers)
                t.call(i, this._layers[e]);
            return this
        },
        _addLayers: function(t) {
            for (var i = 0, e = (t = t ? ei(t) ? t : [t] : []).length; i < e; i++)
                this.addLayer(t[i])
        },
        _addZoomLimit: function(t) {
            !isNaN(t.options.maxZoom) && isNaN(t.options.minZoom) || (this._zoomBoundLayers[n(t)] = t,
            this._updateZoomLevels())
        },
        _removeZoomLimit: function(t) {
            var i = n(t);
            this._zoomBoundLayers[i] && (delete this._zoomBoundLayers[i],
            this._updateZoomLevels())
        },
        _updateZoomLevels: function() {
            var t = 1 / 0
              , i = -1 / 0
              , e = this._getZoomSpan();
            for (var n in this._zoomBoundLayers) {
                var o = this._zoomBoundLayers[n].options;
                t = void 0 === o.minZoom ? t : Math.min(t, o.minZoom),
                i = void 0 === o.maxZoom ? i : Math.max(i, o.maxZoom)
            }
            this._layersMaxZoom = i === -1 / 0 ? void 0 : i,
            this._layersMinZoom = t === 1 / 0 ? void 0 : t,
            e !== this._getZoomSpan() && this.fire("zoomlevelschange"),
            void 0 === this.options.maxZoom && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom),
            void 0 === this.options.minZoom && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom)
        }
    });
    var Ve = Ue.extend({
        initialize: function(t, i) {
            l(this, i),
            this._layers = {};
            var e, n;
            if (t)
                for (e = 0,
                n = t.length; e < n; e++)
                    this.addLayer(t[e])
        },
        addLayer: function(t) {
            var i = this.getLayerId(t);
            return this._layers[i] = t,
            this._map && this._map.addLayer(t),
            this
        },
        removeLayer: function(t) {
            var i = t in this._layers ? t : this.getLayerId(t);
            return this._map && this._layers[i] && this._map.removeLayer(this._layers[i]),
            delete this._layers[i],
            this
        },
        hasLayer: function(t) {
            return !!t && (t in this._layers || this.getLayerId(t)in this._layers)
        },
        clearLayers: function() {
            return this.eachLayer(this.removeLayer, this)
        },
        invoke: function(t) {
            var i, e, n = Array.prototype.slice.call(arguments, 1);
            for (i in this._layers)
                (e = this._layers[i])[t] && e[t].apply(e, n);
            return this
        },
        onAdd: function(t) {
            this.eachLayer(t.addLayer, t)
        },
        onRemove: function(t) {
            this.eachLayer(t.removeLayer, t)
        },
        eachLayer: function(t, i) {
            for (var e in this._layers)
                t.call(i, this._layers[e]);
            return this
        },
        getLayer: function(t) {
            return this._layers[t]
        },
        getLayers: function() {
            var t = [];
            return this.eachLayer(t.push, t),
            t
        },
        setZIndex: function(t) {
            return this.invoke("setZIndex", t)
        },
        getLayerId: function(t) {
            return n(t)
        }
    })
      , qe = Ve.extend({
        addLayer: function(t) {
            return this.hasLayer(t) ? this : (t.addEventParent(this),
            Ve.prototype.addLayer.call(this, t),
            this.fire("layeradd", {
                layer: t
            }))
        },
        removeLayer: function(t) {
            return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]),
            t.removeEventParent(this),
            Ve.prototype.removeLayer.call(this, t),
            this.fire("layerremove", {
                layer: t
            })) : this
        },
        setStyle: function(t) {
            return this.invoke("setStyle", t)
        },
        bringToFront: function() {
            return this.invoke("bringToFront")
        },
        bringToBack: function() {
            return this.invoke("bringToBack")
        },
        getBounds: function() {
            var t = new T;
            for (var i in this._layers) {
                var e = this._layers[i];
                t.extend(e.getBounds ? e.getBounds() : e.getLatLng())
            }
            return t
        }
    })
      , Ge = v.extend({
        options: {
            popupAnchor: [0, 0],
            tooltipAnchor: [0, 0]
        },
        initialize: function(t) {
            l(this, t)
        },
        createIcon: function(t) {
            return this._createIcon("icon", t)
        },
        createShadow: function(t) {
            return this._createIcon("shadow", t)
        },
        _createIcon: function(t, i) {
            var e = this._getIconUrl(t);
            if (!e) {
                if ("icon" === t)
                    throw new Error("iconUrl not set in Icon options (see the docs).");
                return null
            }
            var n = this._createImg(e, i && "IMG" === i.tagName ? i : null);
            return this._setIconStyles(n, t),
            n
        },
        _setIconStyles: function(t, i) {
            var e = this.options
              , n = e[i + "Size"];
            "number" == typeof n && (n = [n, n]);
            var o = w(n)
              , s = w("shadow" === i && e.shadowAnchor || e.iconAnchor || o && o.divideBy(2, !0));
            t.className = "leaflet-marker-" + i + " " + (e.className || ""),
            s && (t.style.marginLeft = -s.x + "px",
            t.style.marginTop = -s.y + "px"),
            o && (t.style.width = o.x + "px",
            t.style.height = o.y + "px")
        },
        _createImg: function(t, i) {
            return i = i || document.createElement("img"),
            i.src = t,
            i
        },
        _getIconUrl: function(t) {
            return Ki && this.options[t + "RetinaUrl"] || this.options[t + "Url"]
        }
    })
      , Ke = Ge.extend({
        options: {
            iconUrl: "marker-icon.png",
            iconRetinaUrl: "marker-icon-2x.png",
            shadowUrl: "marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
        },
        _getIconUrl: function(t) {
            return Ke.imagePath || (Ke.imagePath = this._detectIconPath()),
            (this.options.imagePath || Ke.imagePath) + Ge.prototype._getIconUrl.call(this, t)
        },
        _detectIconPath: function() {
            var t = ht("div", "leaflet-default-icon-path", document.body)
              , i = at(t, "background-image") || at(t, "backgroundImage");
            return document.body.removeChild(t),
            i = null === i || 0 !== i.indexOf("url") ? "" : i.replace(/^url\(["']?/, "").replace(/marker-icon\.png["']?\)$/, "")
        }
    })
      , Ye = Ze.extend({
        initialize: function(t) {
            this._marker = t
        },
        addHooks: function() {
            var t = this._marker._icon;
            this._draggable || (this._draggable = new Be(t,t,!0)),
            this._draggable.on({
                dragstart: this._onDragStart,
                predrag: this._onPreDrag,
                drag: this._onDrag,
                dragend: this._onDragEnd
            }, this).enable(),
            pt(t, "leaflet-marker-draggable")
        },
        removeHooks: function() {
            this._draggable.off({
                dragstart: this._onDragStart,
                predrag: this._onPreDrag,
                drag: this._onDrag,
                dragend: this._onDragEnd
            }, this).disable(),
            this._marker._icon && mt(this._marker._icon, "leaflet-marker-draggable")
        },
        moved: function() {
            return this._draggable && this._draggable._moved
        },
        _adjustPan: function(t) {
            var i = this._marker
              , e = i._map
              , n = this._marker.options.autoPanSpeed
              , o = this._marker.options.autoPanPadding
              , s = L.DomUtil.getPosition(i._icon)
              , r = e.getPixelBounds()
              , a = e.getPixelOrigin()
              , h = b(r.min._subtract(a).add(o), r.max._subtract(a).subtract(o));
            if (!h.contains(s)) {
                var u = w((Math.max(h.max.x, s.x) - h.max.x) / (r.max.x - h.max.x) - (Math.min(h.min.x, s.x) - h.min.x) / (r.min.x - h.min.x), (Math.max(h.max.y, s.y) - h.max.y) / (r.max.y - h.max.y) - (Math.min(h.min.y, s.y) - h.min.y) / (r.min.y - h.min.y)).multiplyBy(n);
                e.panBy(u, {
                    animate: !1
                }),
                this._draggable._newPos._add(u),
                this._draggable._startPos._add(u),
                L.DomUtil.setPosition(i._icon, this._draggable._newPos),
                this._onDrag(t),
                this._panRequest = f(this._adjustPan.bind(this, t))
            }
        },
        _onDragStart: function() {
            this._oldLatLng = this._marker.getLatLng(),
            this._marker.closePopup().fire("movestart").fire("dragstart")
        },
        _onPreDrag: function(t) {
            this._marker.options.autoPan && (g(this._panRequest),
            this._panRequest = f(this._adjustPan.bind(this, t)))
        },
        _onDrag: function(t) {
            var i = this._marker
              , e = i._shadow
              , n = Pt(i._icon)
              , o = i._map.layerPointToLatLng(n);
            e && Lt(e, n),
            i._latlng = o,
            t.latlng = o,
            t.oldLatLng = this._oldLatLng,
            i.fire("move", t).fire("drag", t)
        },
        _onDragEnd: function(t) {
            g(this._panRequest),
            delete this._oldLatLng,
            this._marker.fire("moveend").fire("dragend", t)
        }
    })
      , Xe = Ue.extend({
        options: {
            icon: new Ke,
            interactive: !0,
            draggable: !1,
            autoPan: !1,
            autoPanPadding: [50, 50],
            autoPanSpeed: 10,
            keyboard: !0,
            title: "",
            alt: "",
            zIndexOffset: 0,
            opacity: 1,
            riseOnHover: !1,
            riseOffset: 250,
            pane: "markerPane",
            bubblingMouseEvents: !1
        },
        initialize: function(t, i) {
            l(this, i),
            this._latlng = C(t)
        },
        onAdd: function(t) {
            this._zoomAnimated = this._zoomAnimated && t.options.markerZoomAnimation,
            this._zoomAnimated && t.on("zoomanim", this._animateZoom, this),
            this._initIcon(),
            this.update()
        },
        onRemove: function(t) {
            this.dragging && this.dragging.enabled() && (this.options.draggable = !0,
            this.dragging.removeHooks()),
            delete this.dragging,
            this._zoomAnimated && t.off("zoomanim", this._animateZoom, this),
            this._removeIcon(),
            this._removeShadow()
        },
        getEvents: function() {
            return {
                zoom: this.update,
                viewreset: this.update
            }
        },
        getLatLng: function() {
            return this._latlng
        },
        setLatLng: function(t) {
            var i = this._latlng;
            return this._latlng = C(t),
            this.update(),
            this.fire("move", {
                oldLatLng: i,
                latlng: this._latlng
            })
        },
        setZIndexOffset: function(t) {
            return this.options.zIndexOffset = t,
            this.update()
        },
        setIcon: function(t) {
            return this.options.icon = t,
            this._map && (this._initIcon(),
            this.update()),
            this._popup && this.bindPopup(this._popup, this._popup.options),
            this
        },
        getElement: function() {
            return this._icon
        },
        update: function() {
            if (this._icon && this._map) {
                var t = this._map.latLngToLayerPoint(this._latlng).round();
                this._setPos(t)
            }
            return this
        },
        _initIcon: function() {
            var t = this.options
              , i = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide")
              , e = t.icon.createIcon(this._icon)
              , n = !1;
            e !== this._icon && (this._icon && this._removeIcon(),
            n = !0,
            t.title && (e.title = t.title),
            "IMG" === e.tagName && (e.alt = t.alt || "")),
            pt(e, i),
            t.keyboard && (e.tabIndex = "0"),
            this._icon = e,
            t.riseOnHover && this.on({
                mouseover: this._bringToFront,
                mouseout: this._resetZIndex
            });
            var o = t.icon.createShadow(this._shadow)
              , s = !1;
            o !== this._shadow && (this._removeShadow(),
            s = !0),
            o && (pt(o, i),
            o.alt = ""),
            this._shadow = o,
            t.opacity < 1 && this._updateOpacity(),
            n && this.getPane().appendChild(this._icon),
            this._initInteraction(),
            o && s && this.getPane("shadowPane").appendChild(this._shadow)
        },
        _removeIcon: function() {
            this.options.riseOnHover && this.off({
                mouseover: this._bringToFront,
                mouseout: this._resetZIndex
            }),
            ut(this._icon),
            this.removeInteractiveTarget(this._icon),
            this._icon = null
        },
        _removeShadow: function() {
            this._shadow && ut(this._shadow),
            this._shadow = null
        },
        _setPos: function(t) {
            Lt(this._icon, t),
            this._shadow && Lt(this._shadow, t),
            this._zIndex = t.y + this.options.zIndexOffset,
            this._resetZIndex()
        },
        _updateZIndex: function(t) {
            this._icon.style.zIndex = this._zIndex + t
        },
        _animateZoom: function(t) {
            var i = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
            this._setPos(i)
        },
        _initInteraction: function() {
            if (this.options.interactive && (pt(this._icon, "leaflet-interactive"),
            this.addInteractiveTarget(this._icon),
            Ye)) {
                var t = this.options.draggable;
                this.dragging && (t = this.dragging.enabled(),
                this.dragging.disable()),
                this.dragging = new Ye(this),
                t && this.dragging.enable()
            }
        },
        setOpacity: function(t) {
            return this.options.opacity = t,
            this._map && this._updateOpacity(),
            this
        },
        _updateOpacity: function() {
            var t = this.options.opacity;
            vt(this._icon, t),
            this._shadow && vt(this._shadow, t)
        },
        _bringToFront: function() {
            this._updateZIndex(this.options.riseOffset)
        },
        _resetZIndex: function() {
            this._updateZIndex(0)
        },
        _getPopupAnchor: function() {
            return this.options.icon.options.popupAnchor
        },
        _getTooltipAnchor: function() {
            return this.options.icon.options.tooltipAnchor
        }
    })
      , Je = Ue.extend({
        options: {
            stroke: !0,
            color: "#3388ff",
            weight: 3,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round",
            dashArray: null,
            dashOffset: null,
            fill: !1,
            fillColor: null,
            fillOpacity: .2,
            fillRule: "evenodd",
            interactive: !0,
            bubblingMouseEvents: !0
        },
        beforeAdd: function(t) {
            this._renderer = t.getRenderer(this)
        },
        onAdd: function() {
            this._renderer._initPath(this),
            this._reset(),
            this._renderer._addPath(this)
        },
        onRemove: function() {
            this._renderer._removePath(this)
        },
        redraw: function() {
            return this._map && this._renderer._updatePath(this),
            this
        },
        setStyle: function(t) {
            return l(this, t),
            this._renderer && this._renderer._updateStyle(this),
            this
        },
        bringToFront: function() {
            return this._renderer && this._renderer._bringToFront(this),
            this
        },
        bringToBack: function() {
            return this._renderer && this._renderer._bringToBack(this),
            this
        },
        getElement: function() {
            return this._path
        },
        _reset: function() {
            this._project(),
            this._update()
        },
        _clickTolerance: function() {
            return (this.options.stroke ? this.options.weight / 2 : 0) + this._renderer.options.tolerance
        }
    })
      , $e = Je.extend({
        options: {
            fill: !0,
            radius: 10
        },
        initialize: function(t, i) {
            l(this, i),
            this._latlng = C(t),
            this._radius = this.options.radius
        },
        setLatLng: function(t) {
            return this._latlng = C(t),
            this.redraw(),
            this.fire("move", {
                latlng: this._latlng
            })
        },
        getLatLng: function() {
            return this._latlng
        },
        setRadius: function(t) {
            return this.options.radius = this._radius = t,
            this.redraw()
        },
        getRadius: function() {
            return this._radius
        },
        setStyle: function(t) {
            var i = t && t.radius || this._radius;
            return Je.prototype.setStyle.call(this, t),
            this.setRadius(i),
            this
        },
        _project: function() {
            this._point = this._map.latLngToLayerPoint(this._latlng),
            this._updateBounds()
        },
        _updateBounds: function() {
            var t = this._radius
              , i = this._radiusY || t
              , e = this._clickTolerance()
              , n = [t + e, i + e];
            this._pxBounds = new P(this._point.subtract(n),this._point.add(n))
        },
        _update: function() {
            this._map && this._updatePath()
        },
        _updatePath: function() {
            this._renderer._updateCircle(this)
        },
        _empty: function() {
            return this._radius && !this._renderer._bounds.intersects(this._pxBounds)
        },
        _containsPoint: function(t) {
            return t.distanceTo(this._point) <= this._radius + this._clickTolerance()
        }
    })
      , Qe = $e.extend({
        initialize: function(t, e, n) {
            if ("number" == typeof e && (e = i({}, n, {
                radius: e
            })),
            l(this, e),
            this._latlng = C(t),
            isNaN(this.options.radius))
                throw new Error("Circle radius cannot be NaN");
            this._mRadius = this.options.radius
        },
        setRadius: function(t) {
            return this._mRadius = t,
            this.redraw()
        },
        getRadius: function() {
            return this._mRadius
        },
        getBounds: function() {
            var t = [this._radius, this._radiusY || this._radius];
            return new T(this._map.layerPointToLatLng(this._point.subtract(t)),this._map.layerPointToLatLng(this._point.add(t)))
        },
        setStyle: Je.prototype.setStyle,
        _project: function() {
            var t = this._latlng.lng
              , i = this._latlng.lat
              , e = this._map
              , n = e.options.crs;
            if (n.distance === _i.distance) {
                var o = Math.PI / 180
                  , s = this._mRadius / _i.R / o
                  , r = e.project([i + s, t])
                  , a = e.project([i - s, t])
                  , h = r.add(a).divideBy(2)
                  , u = e.unproject(h).lat
                  , l = Math.acos((Math.cos(s * o) - Math.sin(i * o) * Math.sin(u * o)) / (Math.cos(i * o) * Math.cos(u * o))) / o;
                (isNaN(l) || 0 === l) && (l = s / Math.cos(Math.PI / 180 * i)),
                this._point = h.subtract(e.getPixelOrigin()),
                this._radius = isNaN(l) ? 0 : h.x - e.project([u, t - l]).x,
                this._radiusY = h.y - r.y
            } else {
                var c = n.unproject(n.project(this._latlng).subtract([this._mRadius, 0]));
                this._point = e.latLngToLayerPoint(this._latlng),
                this._radius = this._point.x - e.latLngToLayerPoint(c).x
            }
            this._updateBounds()
        }
    })
      , tn = Je.extend({
        options: {
            smoothFactor: 1,
            noClip: !1
        },
        initialize: function(t, i) {
            l(this, i),
            this._setLatLngs(t)
        },
        getLatLngs: function() {
            return this._latlngs
        },
        setLatLngs: function(t) {
            return this._setLatLngs(t),
            this.redraw()
        },
        isEmpty: function() {
            return !this._latlngs.length
        },
        closestLayerPoint: function(t) {
            for (var i, e, n = 1 / 0, o = null, s = Rt, r = 0, a = this._parts.length; r < a; r++)
                for (var h = this._parts[r], u = 1, l = h.length; u < l; u++) {
                    var c = s(t, i = h[u - 1], e = h[u], !0);
                    c < n && (n = c,
                    o = s(t, i, e))
                }
            return o && (o.distance = Math.sqrt(n)),
            o
        },
        getCenter: function() {
            if (!this._map)
                throw new Error("Must add layer to map before using getCenter()");
            var t, i, e, n, o, s, r, a = this._rings[0], h = a.length;
            if (!h)
                return null;
            for (t = 0,
            i = 0; t < h - 1; t++)
                i += a[t].distanceTo(a[t + 1]) / 2;
            if (0 === i)
                return this._map.layerPointToLatLng(a[0]);
            for (t = 0,
            n = 0; t < h - 1; t++)
                if (o = a[t],
                s = a[t + 1],
                e = o.distanceTo(s),
                (n += e) > i)
                    return r = (n - i) / e,
                    this._map.layerPointToLatLng([s.x - r * (s.x - o.x), s.y - r * (s.y - o.y)])
        },
        getBounds: function() {
            return this._bounds
        },
        addLatLng: function(t, i) {
            return i = i || this._defaultShape(),
            t = C(t),
            i.push(t),
            this._bounds.extend(t),
            this.redraw()
        },
        _setLatLngs: function(t) {
            this._bounds = new T,
            this._latlngs = this._convertLatLngs(t)
        },
        _defaultShape: function() {
            return Dt(this._latlngs) ? this._latlngs : this._latlngs[0]
        },
        _convertLatLngs: function(t) {
            for (var i = [], e = Dt(t), n = 0, o = t.length; n < o; n++)
                e ? (i[n] = C(t[n]),
                this._bounds.extend(i[n])) : i[n] = this._convertLatLngs(t[n]);
            return i
        },
        _project: function() {
            var t = new P;
            this._rings = [],
            this._projectLatlngs(this._latlngs, this._rings, t);
            var i = this._clickTolerance()
              , e = new x(i,i);
            this._bounds.isValid() && t.isValid() && (t.min._subtract(e),
            t.max._add(e),
            this._pxBounds = t)
        },
        _projectLatlngs: function(t, i, e) {
            var n, o, s = t[0]instanceof M, r = t.length;
            if (s) {
                for (o = [],
                n = 0; n < r; n++)
                    o[n] = this._map.latLngToLayerPoint(t[n]),
                    e.extend(o[n]);
                i.push(o)
            } else
                for (n = 0; n < r; n++)
                    this._projectLatlngs(t[n], i, e)
        },
        _clipPoints: function() {
            var t = this._renderer._bounds;
            if (this._parts = [],
            this._pxBounds && this._pxBounds.intersects(t))
                if (this.options.noClip)
                    this._parts = this._rings;
                else {
                    var i, e, n, o, s, r, a, h = this._parts;
                    for (i = 0,
                    n = 0,
                    o = this._rings.length; i < o; i++)
                        for (e = 0,
                        s = (a = this._rings[i]).length; e < s - 1; e++)
                            (r = It(a[e], a[e + 1], t, e, !0)) && (h[n] = h[n] || [],
                            h[n].push(r[0]),
                            r[1] === a[e + 1] && e !== s - 2 || (h[n].push(r[1]),
                            n++))
                }
        },
        _simplifyPoints: function() {
            for (var t = this._parts, i = this.options.smoothFactor, e = 0, n = t.length; e < n; e++)
                t[e] = Ct(t[e], i)
        },
        _update: function() {
            this._map && (this._clipPoints(),
            this._simplifyPoints(),
            this._updatePath())
        },
        _updatePath: function() {
            this._renderer._updatePoly(this)
        },
        _containsPoint: function(t, i) {
            var e, n, o, s, r, a, h = this._clickTolerance();
            if (!this._pxBounds || !this._pxBounds.contains(t))
                return !1;
            for (e = 0,
            s = this._parts.length; e < s; e++)
                for (n = 0,
                o = (r = (a = this._parts[e]).length) - 1; n < r; o = n++)
                    if ((i || 0 !== n) && Zt(t, a[o], a[n]) <= h)
                        return !0;
            return !1
        }
    });
    tn._flat = Nt;
    var en = tn.extend({
        options: {
            fill: !0
        },
        isEmpty: function() {
            return !this._latlngs.length || !this._latlngs[0].length
        },
        getCenter: function() {
            if (!this._map)
                throw new Error("Must add layer to map before using getCenter()");
            var t, i, e, n, o, s, r, a, h, u = this._rings[0], l = u.length;
            if (!l)
                return null;
            for (s = r = a = 0,
            t = 0,
            i = l - 1; t < l; i = t++)
                e = u[t],
                n = u[i],
                o = e.y * n.x - n.y * e.x,
                r += (e.x + n.x) * o,
                a += (e.y + n.y) * o,
                s += 3 * o;
            return h = 0 === s ? u[0] : [r / s, a / s],
            this._map.layerPointToLatLng(h)
        },
        _convertLatLngs: function(t) {
            var i = tn.prototype._convertLatLngs.call(this, t)
              , e = i.length;
            return e >= 2 && i[0]instanceof M && i[0].equals(i[e - 1]) && i.pop(),
            i
        },
        _setLatLngs: function(t) {
            tn.prototype._setLatLngs.call(this, t),
            Dt(this._latlngs) && (this._latlngs = [this._latlngs])
        },
        _defaultShape: function() {
            return Dt(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0]
        },
        _clipPoints: function() {
            var t = this._renderer._bounds
              , i = this.options.weight
              , e = new x(i,i);
            if (t = new P(t.min.subtract(e),t.max.add(e)),
            this._parts = [],
            this._pxBounds && this._pxBounds.intersects(t))
                if (this.options.noClip)
                    this._parts = this._rings;
                else
                    for (var n, o = 0, s = this._rings.length; o < s; o++)
                        (n = jt(this._rings[o], t, !0)).length && this._parts.push(n)
        },
        _updatePath: function() {
            this._renderer._updatePoly(this, !0)
        },
        _containsPoint: function(t) {
            var i, e, n, o, s, r, a, h, u = !1;
            if (!this._pxBounds.contains(t))
                return !1;
            for (o = 0,
            a = this._parts.length; o < a; o++)
                for (s = 0,
                r = (h = (i = this._parts[o]).length) - 1; s < h; r = s++)
                    e = i[s],
                    n = i[r],
                    e.y > t.y != n.y > t.y && t.x < (n.x - e.x) * (t.y - e.y) / (n.y - e.y) + e.x && (u = !u);
            return u || tn.prototype._containsPoint.call(this, t, !0)
        }
    })
      , nn = qe.extend({
        initialize: function(t, i) {
            l(this, i),
            this._layers = {},
            t && this.addData(t)
        },
        addData: function(t) {
            var i, e, n, o = ei(t) ? t : t.features;
            if (o) {
                for (i = 0,
                e = o.length; i < e; i++)
                    ((n = o[i]).geometries || n.geometry || n.features || n.coordinates) && this.addData(n);
                return this
            }
            var s = this.options;
            if (s.filter && !s.filter(t))
                return this;
            var r = Wt(t, s);
            return r ? (r.feature = Gt(t),
            r.defaultOptions = r.options,
            this.resetStyle(r),
            s.onEachFeature && s.onEachFeature(t, r),
            this.addLayer(r)) : this
        },
        resetStyle: function(t) {
            return t.options = i({}, t.defaultOptions),
            this._setLayerStyle(t, this.options.style),
            this
        },
        setStyle: function(t) {
            return this.eachLayer(function(i) {
                this._setLayerStyle(i, t)
            }, this)
        },
        _setLayerStyle: function(t, i) {
            "function" == typeof i && (i = i(t.feature)),
            t.setStyle && t.setStyle(i)
        }
    })
      , on = {
        toGeoJSON: function(t) {
            return qt(this, {
                type: "Point",
                coordinates: Ut(this.getLatLng(), t)
            })
        }
    };
    Xe.include(on),
    Qe.include(on),
    $e.include(on),
    tn.include({
        toGeoJSON: function(t) {
            var i = !Dt(this._latlngs)
              , e = Vt(this._latlngs, i ? 1 : 0, !1, t);
            return qt(this, {
                type: (i ? "Multi" : "") + "LineString",
                coordinates: e
            })
        }
    }),
    en.include({
        toGeoJSON: function(t) {
            var i = !Dt(this._latlngs)
              , e = i && !Dt(this._latlngs[0])
              , n = Vt(this._latlngs, e ? 2 : i ? 1 : 0, !0, t);
            return i || (n = [n]),
            qt(this, {
                type: (e ? "Multi" : "") + "Polygon",
                coordinates: n
            })
        }
    }),
    Ve.include({
        toMultiPoint: function(t) {
            var i = [];
            return this.eachLayer(function(e) {
                i.push(e.toGeoJSON(t).geometry.coordinates)
            }),
            qt(this, {
                type: "MultiPoint",
                coordinates: i
            })
        },
        toGeoJSON: function(t) {
            var i = this.feature && this.feature.geometry && this.feature.geometry.type;
            if ("MultiPoint" === i)
                return this.toMultiPoint(t);
            var e = "GeometryCollection" === i
              , n = [];
            return this.eachLayer(function(i) {
                if (i.toGeoJSON) {
                    var o = i.toGeoJSON(t);
                    if (e)
                        n.push(o.geometry);
                    else {
                        var s = Gt(o);
                        "FeatureCollection" === s.type ? n.push.apply(n, s.features) : n.push(s)
                    }
                }
            }),
            e ? qt(this, {
                geometries: n,
                type: "GeometryCollection"
            }) : {
                type: "FeatureCollection",
                features: n
            }
        }
    });
    var sn = Kt
      , rn = Ue.extend({
        options: {
            opacity: 1,
            alt: "",
            interactive: !1,
            crossOrigin: !1,
            errorOverlayUrl: "",
            zIndex: 1,
            className: ""
        },
        initialize: function(t, i, e) {
            this._url = t,
            this._bounds = z(i),
            l(this, e)
        },
        onAdd: function() {
            this._image || (this._initImage(),
            this.options.opacity < 1 && this._updateOpacity()),
            this.options.interactive && (pt(this._image, "leaflet-interactive"),
            this.addInteractiveTarget(this._image)),
            this.getPane().appendChild(this._image),
            this._reset()
        },
        onRemove: function() {
            ut(this._image),
            this.options.interactive && this.removeInteractiveTarget(this._image)
        },
        setOpacity: function(t) {
            return this.options.opacity = t,
            this._image && this._updateOpacity(),
            this
        },
        setStyle: function(t) {
            return t.opacity && this.setOpacity(t.opacity),
            this
        },
        bringToFront: function() {
            return this._map && ct(this._image),
            this
        },
        bringToBack: function() {
            return this._map && _t(this._image),
            this
        },
        setUrl: function(t) {
            return this._url = t,
            this._image && (this._image.src = t),
            this
        },
        setBounds: function(t) {
            return this._bounds = z(t),
            this._map && this._reset(),
            this
        },
        getEvents: function() {
            var t = {
                zoom: this._reset,
                viewreset: this._reset
            };
            return this._zoomAnimated && (t.zoomanim = this._animateZoom),
            t
        },
        setZIndex: function(t) {
            return this.options.zIndex = t,
            this._updateZIndex(),
            this
        },
        getBounds: function() {
            return this._bounds
        },
        getElement: function() {
            return this._image
        },
        _initImage: function() {
            var t = "IMG" === this._url.tagName
              , i = this._image = t ? this._url : ht("img");
            pt(i, "leaflet-image-layer"),
            this._zoomAnimated && pt(i, "leaflet-zoom-animated"),
            this.options.className && pt(i, this.options.className),
            i.onselectstart = r,
            i.onmousemove = r,
            i.onload = e(this.fire, this, "load"),
            i.onerror = e(this._overlayOnError, this, "error"),
            this.options.crossOrigin && (i.crossOrigin = ""),
            this.options.zIndex && this._updateZIndex(),
            t ? this._url = i.src : (i.src = this._url,
            i.alt = this.options.alt)
        },
        _animateZoom: function(t) {
            var i = this._map.getZoomScale(t.zoom)
              , e = this._map._latLngBoundsToNewLayerBounds(this._bounds, t.zoom, t.center).min;
            wt(this._image, e, i)
        },
        _reset: function() {
            var t = this._image
              , i = new P(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast()))
              , e = i.getSize();
            Lt(t, i.min),
            t.style.width = e.x + "px",
            t.style.height = e.y + "px"
        },
        _updateOpacity: function() {
            vt(this._image, this.options.opacity)
        },
        _updateZIndex: function() {
            this._image && void 0 !== this.options.zIndex && null !== this.options.zIndex && (this._image.style.zIndex = this.options.zIndex)
        },
        _overlayOnError: function() {
            this.fire("error");
            var t = this.options.errorOverlayUrl;
            t && this._url !== t && (this._url = t,
            this._image.src = t)
        }
    })
      , an = rn.extend({
        options: {
            autoplay: !0,
            loop: !0
        },
        _initImage: function() {
            var t = "VIDEO" === this._url.tagName
              , i = this._image = t ? this._url : ht("video");
            if (pt(i, "leaflet-image-layer"),
            this._zoomAnimated && pt(i, "leaflet-zoom-animated"),
            i.onselectstart = r,
            i.onmousemove = r,
            i.onloadeddata = e(this.fire, this, "load"),
            t) {
                for (var n = i.getElementsByTagName("source"), o = [], s = 0; s < n.length; s++)
                    o.push(n[s].src);
                this._url = n.length > 0 ? o : [i.src]
            } else {
                ei(this._url) || (this._url = [this._url]),
                i.autoplay = !!this.options.autoplay,
                i.loop = !!this.options.loop;
                for (var a = 0; a < this._url.length; a++) {
                    var h = ht("source");
                    h.src = this._url[a],
                    i.appendChild(h)
                }
            }
        }
    })
      , hn = Ue.extend({
        options: {
            offset: [0, 7],
            className: "",
            pane: "popupPane"
        },
        initialize: function(t, i) {
            l(this, t),
            this._source = i
        },
        onAdd: function(t) {
            this._zoomAnimated = t._zoomAnimated,
            this._container || this._initLayout(),
            t._fadeAnimated && vt(this._container, 0),
            clearTimeout(this._removeTimeout),
            this.getPane().appendChild(this._container),
            this.update(),
            t._fadeAnimated && vt(this._container, 1),
            this.bringToFront()
        },
        onRemove: function(t) {
            t._fadeAnimated ? (vt(this._container, 0),
            this._removeTimeout = setTimeout(e(ut, void 0, this._container), 200)) : ut(this._container)
        },
        getLatLng: function() {
            return this._latlng
        },
        setLatLng: function(t) {
            return this._latlng = C(t),
            this._map && (this._updatePosition(),
            this._adjustPan()),
            this
        },
        getContent: function() {
            return this._content
        },
        setContent: function(t) {
            return this._content = t,
            this.update(),
            this
        },
        getElement: function() {
            return this._container
        },
        update: function() {
            this._map && (this._container.style.visibility = "hidden",
            this._updateContent(),
            this._updateLayout(),
            this._updatePosition(),
            this._container.style.visibility = "",
            this._adjustPan())
        },
        getEvents: function() {
            var t = {
                zoom: this._updatePosition,
                viewreset: this._updatePosition
            };
            return this._zoomAnimated && (t.zoomanim = this._animateZoom),
            t
        },
        isOpen: function() {
            return !!this._map && this._map.hasLayer(this)
        },
        bringToFront: function() {
            return this._map && ct(this._container),
            this
        },
        bringToBack: function() {
            return this._map && _t(this._container),
            this
        },
        _updateContent: function() {
            if (this._content) {
                var t = this._contentNode
                  , i = "function" == typeof this._content ? this._content(this._source || this) : this._content;
                if ("string" == typeof i)
                    t.innerHTML = i;
                else {
                    for (; t.hasChildNodes(); )
                        t.removeChild(t.firstChild);
                    t.appendChild(i)
                }
                this.fire("contentupdate")
            }
        },
        _updatePosition: function() {
            if (this._map) {
                var t = this._map.latLngToLayerPoint(this._latlng)
                  , i = w(this.options.offset)
                  , e = this._getAnchor();
                this._zoomAnimated ? Lt(this._container, t.add(e)) : i = i.add(t).add(e);
                var n = this._containerBottom = -i.y
                  , o = this._containerLeft = -Math.round(this._containerWidth / 2) + i.x;
                this._container.style.bottom = n + "px",
                this._container.style.left = o + "px"
            }
        },
        _getAnchor: function() {
            return [0, 0]
        }
    })
      , un = hn.extend({
        options: {
            maxWidth: 300,
            minWidth: 50,
            maxHeight: null,
            autoPan: !0,
            autoPanPaddingTopLeft: null,
            autoPanPaddingBottomRight: null,
            autoPanPadding: [5, 5],
            keepInView: !1,
            closeButton: !0,
            autoClose: !0,
            closeOnEscapeKey: !0,
            className: ""
        },
        openOn: function(t) {
            return t.openPopup(this),
            this
        },
        onAdd: function(t) {
            hn.prototype.onAdd.call(this, t),
            t.fire("popupopen", {
                popup: this
            }),
            this._source && (this._source.fire("popupopen", {
                popup: this
            }, !0),
            this._source instanceof Je || this._source.on("preclick", Y))
        },
        onRemove: function(t) {
            hn.prototype.onRemove.call(this, t),
            t.fire("popupclose", {
                popup: this
            }),
            this._source && (this._source.fire("popupclose", {
                popup: this
            }, !0),
            this._source instanceof Je || this._source.off("preclick", Y))
        },
        getEvents: function() {
            var t = hn.prototype.getEvents.call(this);
            return (void 0 !== this.options.closeOnClick ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this._close),
            this.options.keepInView && (t.moveend = this._adjustPan),
            t
        },
        _close: function() {
            this._map && this._map.closePopup(this)
        },
        _initLayout: function() {
            var t = "leaflet-popup"
              , i = this._container = ht("div", t + " " + (this.options.className || "") + " leaflet-zoom-animated")
              , e = this._wrapper = ht("div", t + "-content-wrapper", i);
            if (this._contentNode = ht("div", t + "-content", e),
            J(e),
            X(this._contentNode),
            V(e, "contextmenu", Y),
            this._tipContainer = ht("div", t + "-tip-container", i),
            this._tip = ht("div", t + "-tip", this._tipContainer),
            this.options.closeButton) {
                var n = this._closeButton = ht("a", t + "-close-button", i);
                n.href = "#close",
                n.innerHTML = "&#215;",
                V(n, "click", this._onCloseButtonClick, this)
            }
        },
        _updateLayout: function() {
            var t = this._contentNode
              , i = t.style;
            i.width = "",
            i.whiteSpace = "nowrap";
            var e = t.offsetWidth;
            e = Math.min(e, this.options.maxWidth),
            e = Math.max(e, this.options.minWidth),
            i.width = e + 1 + "px",
            i.whiteSpace = "",
            i.height = "";
            var n = t.offsetHeight
              , o = this.options.maxHeight;
            o && n > o ? (i.height = o + "px",
            pt(t, "leaflet-popup-scrolled")) : mt(t, "leaflet-popup-scrolled"),
            this._containerWidth = this._container.offsetWidth
        },
        _animateZoom: function(t) {
            var i = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center)
              , e = this._getAnchor();
            Lt(this._container, i.add(e))
        },
        _adjustPan: function() {
            if (!(!this.options.autoPan || this._map._panAnim && this._map._panAnim._inProgress)) {
                var t = this._map
                  , i = parseInt(at(this._container, "marginBottom"), 10) || 0
                  , e = this._container.offsetHeight + i
                  , n = this._containerWidth
                  , o = new x(this._containerLeft,-e - this._containerBottom);
                o._add(Pt(this._container));
                var s = t.layerPointToContainerPoint(o)
                  , r = w(this.options.autoPanPadding)
                  , a = w(this.options.autoPanPaddingTopLeft || r)
                  , h = w(this.options.autoPanPaddingBottomRight || r)
                  , u = t.getSize()
                  , l = 0
                  , c = 0;
                s.x + n + h.x > u.x && (l = s.x + n - u.x + h.x),
                s.x - l - a.x < 0 && (l = s.x - a.x),
                s.y + e + h.y > u.y && (c = s.y + e - u.y + h.y),
                s.y - c - a.y < 0 && (c = s.y - a.y),
                (l || c) && t.fire("autopanstart").panBy([l, c])
            }
        },
        _onCloseButtonClick: function(t) {
            this._close(),
            Q(t)
        },
        _getAnchor: function() {
            return w(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0])
        }
    });
    Le.mergeOptions({
        closePopupOnClick: !0
    }),
    Le.include({
        openPopup: function(t, i, e) {
            return t instanceof un || (t = new un(e).setContent(t)),
            i && t.setLatLng(i),
            this.hasLayer(t) ? this : (this._popup && this._popup.options.autoClose && this.closePopup(),
            this._popup = t,
            this.addLayer(t))
        },
        closePopup: function(t) {
            return t && t !== this._popup || (t = this._popup,
            this._popup = null),
            t && this.removeLayer(t),
            this
        }
    }),
    Ue.include({
        bindPopup: function(t, i) {
            return t instanceof un ? (l(t, i),
            this._popup = t,
            t._source = this) : (this._popup && !i || (this._popup = new un(i,this)),
            this._popup.setContent(t)),
            this._popupHandlersAdded || (this.on({
                click: this._openPopup,
                keypress: this._onKeyPress,
                remove: this.closePopup,
                move: this._movePopup
            }),
            this._popupHandlersAdded = !0),
            this
        },
        unbindPopup: function() {
            return this._popup && (this.off({
                click: this._openPopup,
                keypress: this._onKeyPress,
                remove: this.closePopup,
                move: this._movePopup
            }),
            this._popupHandlersAdded = !1,
            this._popup = null),
            this
        },
        openPopup: function(t, i) {
            if (t instanceof Ue || (i = t,
            t = this),
            t instanceof qe)
                for (var e in this._layers) {
                    t = this._layers[e];
                    break
                }
            return i || (i = t.getCenter ? t.getCenter() : t.getLatLng()),
            this._popup && this._map && (this._popup._source = t,
            this._popup.update(),
            this._map.openPopup(this._popup, i)),
            this
        },
        closePopup: function() {
            return this._popup && this._popup._close(),
            this
        },
        togglePopup: function(t) {
            return this._popup && (this._popup._map ? this.closePopup() : this.openPopup(t)),
            this
        },
        isPopupOpen: function() {
            return !!this._popup && this._popup.isOpen()
        },
        setPopupContent: function(t) {
            return this._popup && this._popup.setContent(t),
            this
        },
        getPopup: function() {
            return this._popup
        },
        _openPopup: function(t) {
            var i = t.layer || t.target;
            this._popup && this._map && (Q(t),
            i instanceof Je ? this.openPopup(t.layer || t.target, t.latlng) : this._map.hasLayer(this._popup) && this._popup._source === i ? this.closePopup() : this.openPopup(i, t.latlng))
        },
        _movePopup: function(t) {
            this._popup.setLatLng(t.latlng)
        },
        _onKeyPress: function(t) {
            13 === t.originalEvent.keyCode && this._openPopup(t)
        }
    });
    var ln = hn.extend({
        options: {
            pane: "tooltipPane",
            offset: [0, 0],
            direction: "auto",
            permanent: !1,
            sticky: !1,
            interactive: !1,
            opacity: .9
        },
        onAdd: function(t) {
            hn.prototype.onAdd.call(this, t),
            this.setOpacity(this.options.opacity),
            t.fire("tooltipopen", {
                tooltip: this
            }),
            this._source && this._source.fire("tooltipopen", {
                tooltip: this
            }, !0)
        },
        onRemove: function(t) {
            hn.prototype.onRemove.call(this, t),
            t.fire("tooltipclose", {
                tooltip: this
            }),
            this._source && this._source.fire("tooltipclose", {
                tooltip: this
            }, !0)
        },
        getEvents: function() {
            var t = hn.prototype.getEvents.call(this);
            return Vi && !this.options.permanent && (t.preclick = this._close),
            t
        },
        _close: function() {
            this._map && this._map.closeTooltip(this)
        },
        _initLayout: function() {
            var t = "leaflet-tooltip " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
            this._contentNode = this._container = ht("div", t)
        },
        _updateLayout: function() {},
        _adjustPan: function() {},
        _setPosition: function(t) {
            var i = this._map
              , e = this._container
              , n = i.latLngToContainerPoint(i.getCenter())
              , o = i.layerPointToContainerPoint(t)
              , s = this.options.direction
              , r = e.offsetWidth
              , a = e.offsetHeight
              , h = w(this.options.offset)
              , u = this._getAnchor();
            "top" === s ? t = t.add(w(-r / 2 + h.x, -a + h.y + u.y, !0)) : "bottom" === s ? t = t.subtract(w(r / 2 - h.x, -h.y, !0)) : "center" === s ? t = t.subtract(w(r / 2 + h.x, a / 2 - u.y + h.y, !0)) : "right" === s || "auto" === s && o.x < n.x ? (s = "right",
            t = t.add(w(h.x + u.x, u.y - a / 2 + h.y, !0))) : (s = "left",
            t = t.subtract(w(r + u.x - h.x, a / 2 - u.y - h.y, !0))),
            mt(e, "leaflet-tooltip-right"),
            mt(e, "leaflet-tooltip-left"),
            mt(e, "leaflet-tooltip-top"),
            mt(e, "leaflet-tooltip-bottom"),
            pt(e, "leaflet-tooltip-" + s),
            Lt(e, t)
        },
        _updatePosition: function() {
            var t = this._map.latLngToLayerPoint(this._latlng);
            this._setPosition(t)
        },
        setOpacity: function(t) {
            this.options.opacity = t,
            this._container && vt(this._container, t)
        },
        _animateZoom: function(t) {
            var i = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
            this._setPosition(i)
        },
        _getAnchor: function() {
            return w(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0])
        }
    });
    Le.include({
        openTooltip: function(t, i, e) {
            return t instanceof ln || (t = new ln(e).setContent(t)),
            i && t.setLatLng(i),
            this.hasLayer(t) ? this : this.addLayer(t)
        },
        closeTooltip: function(t) {
            return t && this.removeLayer(t),
            this
        }
    }),
    Ue.include({
        bindTooltip: function(t, i) {
            return t instanceof ln ? (l(t, i),
            this._tooltip = t,
            t._source = this) : (this._tooltip && !i || (this._tooltip = new ln(i,this)),
            this._tooltip.setContent(t)),
            this._initTooltipInteractions(),
            this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(),
            this
        },
        unbindTooltip: function() {
            return this._tooltip && (this._initTooltipInteractions(!0),
            this.closeTooltip(),
            this._tooltip = null),
            this
        },
        _initTooltipInteractions: function(t) {
            if (t || !this._tooltipHandlersAdded) {
                var i = t ? "off" : "on"
                  , e = {
                    remove: this.closeTooltip,
                    move: this._moveTooltip
                };
                this._tooltip.options.permanent ? e.add = this._openTooltip : (e.mouseover = this._openTooltip,
                e.mouseout = this.closeTooltip,
                this._tooltip.options.sticky && (e.mousemove = this._moveTooltip),
                Vi && (e.click = this._openTooltip)),
                this[i](e),
                this._tooltipHandlersAdded = !t
            }
        },
        openTooltip: function(t, i) {
            if (t instanceof Ue || (i = t,
            t = this),
            t instanceof qe)
                for (var e in this._layers) {
                    t = this._layers[e];
                    break
                }
            return i || (i = t.getCenter ? t.getCenter() : t.getLatLng()),
            this._tooltip && this._map && (this._tooltip._source = t,
            this._tooltip.update(),
            this._map.openTooltip(this._tooltip, i),
            this._tooltip.options.interactive && this._tooltip._container && (pt(this._tooltip._container, "leaflet-clickable"),
            this.addInteractiveTarget(this._tooltip._container))),
            this
        },
        closeTooltip: function() {
            return this._tooltip && (this._tooltip._close(),
            this._tooltip.options.interactive && this._tooltip._container && (mt(this._tooltip._container, "leaflet-clickable"),
            this.removeInteractiveTarget(this._tooltip._container))),
            this
        },
        toggleTooltip: function(t) {
            return this._tooltip && (this._tooltip._map ? this.closeTooltip() : this.openTooltip(t)),
            this
        },
        isTooltipOpen: function() {
            return this._tooltip.isOpen()
        },
        setTooltipContent: function(t) {
            return this._tooltip && this._tooltip.setContent(t),
            this
        },
        getTooltip: function() {
            return this._tooltip
        },
        _openTooltip: function(t) {
            var i = t.layer || t.target;
            this._tooltip && this._map && this.openTooltip(i, this._tooltip.options.sticky ? t.latlng : void 0)
        },
        _moveTooltip: function(t) {
            var i, e, n = t.latlng;
            this._tooltip.options.sticky && t.originalEvent && (i = this._map.mouseEventToContainerPoint(t.originalEvent),
            e = this._map.containerPointToLayerPoint(i),
            n = this._map.layerPointToLatLng(e)),
            this._tooltip.setLatLng(n)
        }
    });
    var cn = Ge.extend({
        options: {
            iconSize: [12, 12],
            html: !1,
            bgPos: null,
            className: "leaflet-div-icon"
        },
        createIcon: function(t) {
            var i = t && "DIV" === t.tagName ? t : document.createElement("div")
              , e = this.options;
            if (i.innerHTML = !1 !== e.html ? e.html : "",
            e.bgPos) {
                var n = w(e.bgPos);
                i.style.backgroundPosition = -n.x + "px " + -n.y + "px"
            }
            return this._setIconStyles(i, "icon"),
            i
        },
        createShadow: function() {
            return null
        }
    });
    Ge.Default = Ke;
    var _n = Ue.extend({
        options: {
            tileSize: 256,
            opacity: 1,
            updateWhenIdle: ji,
            updateWhenZooming: !0,
            updateInterval: 200,
            zIndex: 1,
            bounds: null,
            minZoom: 0,
            maxZoom: void 0,
            maxNativeZoom: void 0,
            minNativeZoom: void 0,
            noWrap: !1,
            pane: "tilePane",
            className: "",
            keepBuffer: 2
        },
        initialize: function(t) {
            l(this, t)
        },
        onAdd: function() {
            this._initContainer(),
            this._levels = {},
            this._tiles = {},
            this._resetView(),
            this._update()
        },
        beforeAdd: function(t) {
            t._addZoomLimit(this)
        },
        onRemove: function(t) {
            this._removeAllTiles(),
            ut(this._container),
            t._removeZoomLimit(this),
            this._container = null,
            this._tileZoom = void 0
        },
        bringToFront: function() {
            return this._map && (ct(this._container),
            this._setAutoZIndex(Math.max)),
            this
        },
        bringToBack: function() {
            return this._map && (_t(this._container),
            this._setAutoZIndex(Math.min)),
            this
        },
        getContainer: function() {
            return this._container
        },
        setOpacity: function(t) {
            return this.options.opacity = t,
            this._updateOpacity(),
            this
        },
        setZIndex: function(t) {
            return this.options.zIndex = t,
            this._updateZIndex(),
            this
        },
        isLoading: function() {
            return this._loading
        },
        redraw: function() {
            return this._map && (this._removeAllTiles(),
            this._update()),
            this
        },
        getEvents: function() {
            var t = {
                viewprereset: this._invalidateAll,
                viewreset: this._resetView,
                zoom: this._resetView,
                moveend: this._onMoveEnd
            };
            return this.options.updateWhenIdle || (this._onMove || (this._onMove = o(this._onMoveEnd, this.options.updateInterval, this)),
            t.move = this._onMove),
            this._zoomAnimated && (t.zoomanim = this._animateZoom),
            t
        },
        createTile: function() {
            return document.createElement("div")
        },
        getTileSize: function() {
            var t = this.options.tileSize;
            return t instanceof x ? t : new x(t,t)
        },
        _updateZIndex: function() {
            this._container && void 0 !== this.options.zIndex && null !== this.options.zIndex && (this._container.style.zIndex = this.options.zIndex)
        },
        _setAutoZIndex: function(t) {
            for (var i, e = this.getPane().children, n = -t(-1 / 0, 1 / 0), o = 0, s = e.length; o < s; o++)
                i = e[o].style.zIndex,
                e[o] !== this._container && i && (n = t(n, +i));
            isFinite(n) && (this.options.zIndex = n + t(-1, 1),
            this._updateZIndex())
        },
        _updateOpacity: function() {
            if (this._map && !Li) {
                vt(this._container, this.options.opacity);
                var t = +new Date
                  , i = !1
                  , e = !1;
                for (var n in this._tiles) {
                    var o = this._tiles[n];
                    if (o.current && o.loaded) {
                        var s = Math.min(1, (t - o.loaded) / 200);
                        vt(o.el, s),
                        s < 1 ? i = !0 : (o.active ? e = !0 : this._onOpaqueTile(o),
                        o.active = !0)
                    }
                }
                e && !this._noPrune && this._pruneTiles(),
                i && (g(this._fadeFrame),
                this._fadeFrame = f(this._updateOpacity, this))
            }
        },
        _onOpaqueTile: r,
        _initContainer: function() {
            this._container || (this._container = ht("div", "leaflet-layer " + (this.options.className || "")),
            this._updateZIndex(),
            this.options.opacity < 1 && this._updateOpacity(),
            this.getPane().appendChild(this._container))
        },
        _updateLevels: function() {
            var t = this._tileZoom
              , i = this.options.maxZoom;
            if (void 0 !== t) {
                for (var e in this._levels)
                    this._levels[e].el.children.length || e === t ? (this._levels[e].el.style.zIndex = i - Math.abs(t - e),
                    this._onUpdateLevel(e)) : (ut(this._levels[e].el),
                    this._removeTilesAtZoom(e),
                    this._onRemoveLevel(e),
                    delete this._levels[e]);
                var n = this._levels[t]
                  , o = this._map;
                return n || ((n = this._levels[t] = {}).el = ht("div", "leaflet-tile-container leaflet-zoom-animated", this._container),
                n.el.style.zIndex = i,
                n.origin = o.project(o.unproject(o.getPixelOrigin()), t).round(),
                n.zoom = t,
                this._setZoomTransform(n, o.getCenter(), o.getZoom()),
                n.el.offsetWidth,
                this._onCreateLevel(n)),
                this._level = n,
                n
            }
        },
        _onUpdateLevel: r,
        _onRemoveLevel: r,
        _onCreateLevel: r,
        _pruneTiles: function() {
            if (this._map) {
                var t, i, e = this._map.getZoom();
                if (e > this.options.maxZoom || e < this.options.minZoom)
                    this._removeAllTiles();
                else {
                    for (t in this._tiles)
                        (i = this._tiles[t]).retain = i.current;
                    for (t in this._tiles)
                        if ((i = this._tiles[t]).current && !i.active) {
                            var n = i.coords;
                            this._retainParent(n.x, n.y, n.z, n.z - 5) || this._retainChildren(n.x, n.y, n.z, n.z + 2)
                        }
                    for (t in this._tiles)
                        this._tiles[t].retain || this._removeTile(t)
                }
            }
        },
        _removeTilesAtZoom: function(t) {
            for (var i in this._tiles)
                this._tiles[i].coords.z === t && this._removeTile(i)
        },
        _removeAllTiles: function() {
            for (var t in this._tiles)
                this._removeTile(t)
        },
        _invalidateAll: function() {
            for (var t in this._levels)
                ut(this._levels[t].el),
                this._onRemoveLevel(t),
                delete this._levels[t];
            this._removeAllTiles(),
            this._tileZoom = void 0
        },
        _retainParent: function(t, i, e, n) {
            var o = Math.floor(t / 2)
              , s = Math.floor(i / 2)
              , r = e - 1
              , a = new x(+o,+s);
            a.z = +r;
            var h = this._tileCoordsToKey(a)
              , u = this._tiles[h];
            return u && u.active ? (u.retain = !0,
            !0) : (u && u.loaded && (u.retain = !0),
            r > n && this._retainParent(o, s, r, n))
        },
        _retainChildren: function(t, i, e, n) {
            for (var o = 2 * t; o < 2 * t + 2; o++)
                for (var s = 2 * i; s < 2 * i + 2; s++) {
                    var r = new x(o,s);
                    r.z = e + 1;
                    var a = this._tileCoordsToKey(r)
                      , h = this._tiles[a];
                    h && h.active ? h.retain = !0 : (h && h.loaded && (h.retain = !0),
                    e + 1 < n && this._retainChildren(o, s, e + 1, n))
                }
        },
        _resetView: function(t) {
            var i = t && (t.pinch || t.flyTo);
            this._setView(this._map.getCenter(), this._map.getZoom(), i, i)
        },
        _animateZoom: function(t) {
            this._setView(t.center, t.zoom, !0, t.noUpdate)
        },
        _clampZoom: function(t) {
            var i = this.options;
            return void 0 !== i.minNativeZoom && t < i.minNativeZoom ? i.minNativeZoom : void 0 !== i.maxNativeZoom && i.maxNativeZoom < t ? i.maxNativeZoom : t
        },
        _setView: function(t, i, e, n) {
            var o = this._clampZoom(Math.round(i));
            (void 0 !== this.options.maxZoom && o > this.options.maxZoom || void 0 !== this.options.minZoom && o < this.options.minZoom) && (o = void 0);
            var s = this.options.updateWhenZooming && o !== this._tileZoom;
            n && !s || (this._tileZoom = o,
            this._abortLoading && this._abortLoading(),
            this._updateLevels(),
            this._resetGrid(),
            void 0 !== o && this._update(t),
            e || this._pruneTiles(),
            this._noPrune = !!e),
            this._setZoomTransforms(t, i)
        },
        _setZoomTransforms: function(t, i) {
            for (var e in this._levels)
                this._setZoomTransform(this._levels[e], t, i)
        },
        _setZoomTransform: function(t, i, e) {
            var n = this._map.getZoomScale(e, t.zoom)
              , o = t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(i, e)).round();
            Ni ? wt(t.el, o, n) : Lt(t.el, o)
        },
        _resetGrid: function() {
            var t = this._map
              , i = t.options.crs
              , e = this._tileSize = this.getTileSize()
              , n = this._tileZoom
              , o = this._map.getPixelWorldBounds(this._tileZoom);
            o && (this._globalTileRange = this._pxBoundsToTileRange(o)),
            this._wrapX = i.wrapLng && !this.options.noWrap && [Math.floor(t.project([0, i.wrapLng[0]], n).x / e.x), Math.ceil(t.project([0, i.wrapLng[1]], n).x / e.y)],
            this._wrapY = i.wrapLat && !this.options.noWrap && [Math.floor(t.project([i.wrapLat[0], 0], n).y / e.x), Math.ceil(t.project([i.wrapLat[1], 0], n).y / e.y)]
        },
        _onMoveEnd: function() {
            this._map && !this._map._animatingZoom && this._update()
        },
        _getTiledPixelBounds: function(t) {
            var i = this._map
              , e = i._animatingZoom ? Math.max(i._animateToZoom, i.getZoom()) : i.getZoom()
              , n = i.getZoomScale(e, this._tileZoom)
              , o = i.project(t, this._tileZoom).floor()
              , s = i.getSize().divideBy(2 * n);
            return new P(o.subtract(s),o.add(s))
        },
        _update: function(t) {
            var i = this._map;
            if (i) {
                var e = this._clampZoom(i.getZoom());
                if (void 0 === t && (t = i.getCenter()),
                void 0 !== this._tileZoom) {
                    var n = this._getTiledPixelBounds(t)
                      , o = this._pxBoundsToTileRange(n)
                      , s = o.getCenter()
                      , r = []
                      , a = this.options.keepBuffer
                      , h = new P(o.getBottomLeft().subtract([a, -a]),o.getTopRight().add([a, -a]));
                    if (!(isFinite(o.min.x) && isFinite(o.min.y) && isFinite(o.max.x) && isFinite(o.max.y)))
                        throw new Error("Attempted to load an infinite number of tiles");
                    for (var u in this._tiles) {
                        var l = this._tiles[u].coords;
                        l.z === this._tileZoom && h.contains(new x(l.x,l.y)) || (this._tiles[u].current = !1)
                    }
                    if (Math.abs(e - this._tileZoom) > 1)
                        this._setView(t, e);
                    else {
                        for (var c = o.min.y; c <= o.max.y; c++)
                            for (var _ = o.min.x; _ <= o.max.x; _++) {
                                var d = new x(_,c);
                                if (d.z = this._tileZoom,
                                this._isValidTile(d)) {
                                    var p = this._tiles[this._tileCoordsToKey(d)];
                                    p ? p.current = !0 : r.push(d)
                                }
                            }
                        if (r.sort(function(t, i) {
                            return t.distanceTo(s) - i.distanceTo(s)
                        }),
                        0 !== r.length) {
                            this._loading || (this._loading = !0,
                            this.fire("loading"));
                            var m = document.createDocumentFragment();
                            for (_ = 0; _ < r.length; _++)
                                this._addTile(r[_], m);
                            this._level.el.appendChild(m)
                        }
                    }
                }
            }
        },
        _isValidTile: function(t) {
            var i = this._map.options.crs;
            if (!i.infinite) {
                var e = this._globalTileRange;
                if (!i.wrapLng && (t.x < e.min.x || t.x > e.max.x) || !i.wrapLat && (t.y < e.min.y || t.y > e.max.y))
                    return !1
            }
            if (!this.options.bounds)
                return !0;
            var n = this._tileCoordsToBounds(t);
            return z(this.options.bounds).overlaps(n)
        },
        _keyToBounds: function(t) {
            return this._tileCoordsToBounds(this._keyToTileCoords(t))
        },
        _tileCoordsToNwSe: function(t) {
            var i = this._map
              , e = this.getTileSize()
              , n = t.scaleBy(e)
              , o = n.add(e);
            return [i.unproject(n, t.z), i.unproject(o, t.z)]
        },
        _tileCoordsToBounds: function(t) {
            var i = this._tileCoordsToNwSe(t)
              , e = new T(i[0],i[1]);
            return this.options.noWrap || (e = this._map.wrapLatLngBounds(e)),
            e
        },
        _tileCoordsToKey: function(t) {
            return t.x + ":" + t.y + ":" + t.z
        },
        _keyToTileCoords: function(t) {
            var i = t.split(":")
              , e = new x(+i[0],+i[1]);
            return e.z = +i[2],
            e
        },
        _removeTile: function(t) {
            var i = this._tiles[t];
            i && (Ci || i.el.setAttribute("src", ni),
            ut(i.el),
            delete this._tiles[t],
            this.fire("tileunload", {
                tile: i.el,
                coords: this._keyToTileCoords(t)
            }))
        },
        _initTile: function(t) {
            pt(t, "leaflet-tile");
            var i = this.getTileSize();
            t.style.width = i.x + "px",
            t.style.height = i.y + "px",
            t.onselectstart = r,
            t.onmousemove = r,
            Li && this.options.opacity < 1 && vt(t, this.options.opacity),
            Ti && !zi && (t.style.WebkitBackfaceVisibility = "hidden")
        },
        _addTile: function(t, i) {
            var n = this._getTilePos(t)
              , o = this._tileCoordsToKey(t)
              , s = this.createTile(this._wrapCoords(t), e(this._tileReady, this, t));
            this._initTile(s),
            this.createTile.length < 2 && f(e(this._tileReady, this, t, null, s)),
            Lt(s, n),
            this._tiles[o] = {
                el: s,
                coords: t,
                current: !0
            },
            i.appendChild(s),
            this.fire("tileloadstart", {
                tile: s,
                coords: t
            })
        },
        _tileReady: function(t, i, n) {
            if (this._map) {
                i && this.fire("tileerror", {
                    error: i,
                    tile: n,
                    coords: t
                });
                var o = this._tileCoordsToKey(t);
                (n = this._tiles[o]) && (n.loaded = +new Date,
                this._map._fadeAnimated ? (vt(n.el, 0),
                g(this._fadeFrame),
                this._fadeFrame = f(this._updateOpacity, this)) : (n.active = !0,
                this._pruneTiles()),
                i || (pt(n.el, "leaflet-tile-loaded"),
                this.fire("tileload", {
                    tile: n.el,
                    coords: t
                })),
                this._noTilesToLoad() && (this._loading = !1,
                this.fire("load"),
                Li || !this._map._fadeAnimated ? f(this._pruneTiles, this) : setTimeout(e(this._pruneTiles, this), 250)))
            }
        },
        _getTilePos: function(t) {
            return t.scaleBy(this.getTileSize()).subtract(this._level.origin)
        },
        _wrapCoords: function(t) {
            var i = new x(this._wrapX ? s(t.x, this._wrapX) : t.x,this._wrapY ? s(t.y, this._wrapY) : t.y);
            return i.z = t.z,
            i
        },
        _pxBoundsToTileRange: function(t) {
            var i = this.getTileSize();
            return new P(t.min.unscaleBy(i).floor(),t.max.unscaleBy(i).ceil().subtract([1, 1]))
        },
        _noTilesToLoad: function() {
            for (var t in this._tiles)
                if (!this._tiles[t].loaded)
                    return !1;
            return !0
        }
    })
      , dn = _n.extend({
        options: {
            minZoom: 0,
            maxZoom: 18,
            subdomains: "abc",
            errorTileUrl: "",
            zoomOffset: 0,
            tms: !1,
            zoomReverse: !1,
            detectRetina: !1,
            crossOrigin: !1
        },
        initialize: function(t, i) {
            this._url = t,
            (i = l(this, i)).detectRetina && Ki && i.maxZoom > 0 && (i.tileSize = Math.floor(i.tileSize / 2),
            i.zoomReverse ? (i.zoomOffset--,
            i.minZoom++) : (i.zoomOffset++,
            i.maxZoom--),
            i.minZoom = Math.max(0, i.minZoom)),
            "string" == typeof i.subdomains && (i.subdomains = i.subdomains.split("")),
            Ti || this.on("tileunload", this._onTileRemove)
        },
        setUrl: function(t, i) {
            return this._url = t,
            i || this.redraw(),
            this
        },
        createTile: function(t, i) {
            var n = document.createElement("img");
            return V(n, "load", e(this._tileOnLoad, this, i, n)),
            V(n, "error", e(this._tileOnError, this, i, n)),
            this.options.crossOrigin && (n.crossOrigin = ""),
            n.alt = "",
            n.setAttribute("role", "presentation"),
            n.src = this.getTileUrl(t),
            n
        },
        getTileUrl: function(t) {
            var e = {
                r: Ki ? "@2x" : "",
                s: this._getSubdomain(t),
                x: t.x,
                y: t.y,
                z: this._getZoomForUrl()
            };
            if (this._map && !this._map.options.crs.infinite) {
                var n = this._globalTileRange.max.y - t.y;
                this.options.tms && (e.y = n),
                e["-y"] = n
            }
            return _(this._url, i(e, this.options))
        },
        _tileOnLoad: function(t, i) {
            Li ? setTimeout(e(t, this, null, i), 0) : t(null, i)
        },
        _tileOnError: function(t, i, e) {
            var n = this.options.errorTileUrl;
            n && i.getAttribute("src") !== n && (i.src = n),
            t(e, i)
        },
        _onTileRemove: function(t) {
            t.tile.onload = null
        },
        _getZoomForUrl: function() {
            var t = this._tileZoom
              , i = this.options.maxZoom
              , e = this.options.zoomReverse
              , n = this.options.zoomOffset;
            return e && (t = i - t),
            t + n
        },
        _getSubdomain: function(t) {
            var i = Math.abs(t.x + t.y) % this.options.subdomains.length;
            return this.options.subdomains[i]
        },
        _abortLoading: function() {
            var t, i;
            for (t in this._tiles)
                this._tiles[t].coords.z !== this._tileZoom && ((i = this._tiles[t].el).onload = r,
                i.onerror = r,
                i.complete || (i.src = ni,
                ut(i),
                delete this._tiles[t]))
        }
    })
      , pn = dn.extend({
        defaultWmsParams: {
            service: "WMS",
            request: "GetMap",
            layers: "",
            styles: "",
            format: "image/jpeg",
            transparent: !1,
            version: "1.1.1"
        },
        options: {
            crs: null,
            uppercase: !1
        },
        initialize: function(t, e) {
            this._url = t;
            var n = i({}, this.defaultWmsParams);
            for (var o in e)
                o in this.options || (n[o] = e[o]);
            var s = (e = l(this, e)).detectRetina && Ki ? 2 : 1
              , r = this.getTileSize();
            n.width = r.x * s,
            n.height = r.y * s,
            this.wmsParams = n
        },
        onAdd: function(t) {
            this._crs = this.options.crs || t.options.crs,
            this._wmsVersion = parseFloat(this.wmsParams.version);
            var i = this._wmsVersion >= 1.3 ? "crs" : "srs";
            this.wmsParams[i] = this._crs.code,
            dn.prototype.onAdd.call(this, t)
        },
        getTileUrl: function(t) {
            var i = this._tileCoordsToNwSe(t)
              , e = this._crs
              , n = b(e.project(i[0]), e.project(i[1]))
              , o = n.min
              , s = n.max
              , r = (this._wmsVersion >= 1.3 && this._crs === He ? [o.y, o.x, s.y, s.x] : [o.x, o.y, s.x, s.y]).join(",")
              , a = L.TileLayer.prototype.getTileUrl.call(this, t);
            return a + c(this.wmsParams, a, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + r
        },
        setParams: function(t, e) {
            return i(this.wmsParams, t),
            e || this.redraw(),
            this
        }
    });
    dn.WMS = pn,
    Yt.wms = function(t, i) {
        return new pn(t,i)
    }
    ;
    var mn = Ue.extend({
        options: {
            padding: .1,
            tolerance: 0
        },
        initialize: function(t) {
            l(this, t),
            n(this),
            this._layers = this._layers || {}
        },
        onAdd: function() {
            this._container || (this._initContainer(),
            this._zoomAnimated && pt(this._container, "leaflet-zoom-animated")),
            this.getPane().appendChild(this._container),
            this._update(),
            this.on("update", this._updatePaths, this)
        },
        onRemove: function() {
            this.off("update", this._updatePaths, this),
            this._destroyContainer()
        },
        getEvents: function() {
            var t = {
                viewreset: this._reset,
                zoom: this._onZoom,
                moveend: this._update,
                zoomend: this._onZoomEnd
            };
            return this._zoomAnimated && (t.zoomanim = this._onAnimZoom),
            t
        },
        _onAnimZoom: function(t) {
            this._updateTransform(t.center, t.zoom)
        },
        _onZoom: function() {
            this._updateTransform(this._map.getCenter(), this._map.getZoom())
        },
        _updateTransform: function(t, i) {
            var e = this._map.getZoomScale(i, this._zoom)
              , n = Pt(this._container)
              , o = this._map.getSize().multiplyBy(.5 + this.options.padding)
              , s = this._map.project(this._center, i)
              , r = this._map.project(t, i).subtract(s)
              , a = o.multiplyBy(-e).add(n).add(o).subtract(r);
            Ni ? wt(this._container, a, e) : Lt(this._container, a)
        },
        _reset: function() {
            this._update(),
            this._updateTransform(this._center, this._zoom);
            for (var t in this._layers)
                this._layers[t]._reset()
        },
        _onZoomEnd: function() {
            for (var t in this._layers)
                this._layers[t]._project()
        },
        _updatePaths: function() {
            for (var t in this._layers)
                this._layers[t]._update()
        },
        _update: function() {
            var t = this.options.padding
              , i = this._map.getSize()
              , e = this._map.containerPointToLayerPoint(i.multiplyBy(-t)).round();
            this._bounds = new P(e,e.add(i.multiplyBy(1 + 2 * t)).round()),
            this._center = this._map.getCenter(),
            this._zoom = this._map.getZoom()
        }
    })
      , fn = mn.extend({
        getEvents: function() {
            var t = mn.prototype.getEvents.call(this);
            return t.viewprereset = this._onViewPreReset,
            t
        },
        _onViewPreReset: function() {
            this._postponeUpdatePaths = !0
        },
        onAdd: function() {
            mn.prototype.onAdd.call(this),
            this._draw()
        },
        _initContainer: function() {
            var t = this._container = document.createElement("canvas");
            V(t, "mousemove", o(this._onMouseMove, 32, this), this),
            V(t, "click dblclick mousedown mouseup contextmenu", this._onClick, this),
            V(t, "mouseout", this._handleMouseOut, this),
            this._ctx = t.getContext("2d")
        },
        _destroyContainer: function() {
            delete this._ctx,
            ut(this._container),
            q(this._container),
            delete this._container
        },
        _updatePaths: function() {
            if (!this._postponeUpdatePaths) {
                this._redrawBounds = null;
                for (var t in this._layers)
                    this._layers[t]._update();
                this._redraw()
            }
        },
        _update: function() {
            if (!this._map._animatingZoom || !this._bounds) {
                this._drawnLayers = {},
                mn.prototype._update.call(this);
                var t = this._bounds
                  , i = this._container
                  , e = t.getSize()
                  , n = Ki ? 2 : 1;
                Lt(i, t.min),
                i.width = n * e.x,
                i.height = n * e.y,
                i.style.width = e.x + "px",
                i.style.height = e.y + "px",
                Ki && this._ctx.scale(2, 2),
                this._ctx.translate(-t.min.x, -t.min.y),
                this.fire("update")
            }
        },
        _reset: function() {
            mn.prototype._reset.call(this),
            this._postponeUpdatePaths && (this._postponeUpdatePaths = !1,
            this._updatePaths())
        },
        _initPath: function(t) {
            this._updateDashArray(t),
            this._layers[n(t)] = t;
            var i = t._order = {
                layer: t,
                prev: this._drawLast,
                next: null
            };
            this._drawLast && (this._drawLast.next = i),
            this._drawLast = i,
            this._drawFirst = this._drawFirst || this._drawLast
        },
        _addPath: function(t) {
            this._requestRedraw(t)
        },
        _removePath: function(t) {
            var i = t._order
              , e = i.next
              , n = i.prev;
            e ? e.prev = n : this._drawLast = n,
            n ? n.next = e : this._drawFirst = e,
            delete t._order,
            delete this._layers[L.stamp(t)],
            this._requestRedraw(t)
        },
        _updatePath: function(t) {
            this._extendRedrawBounds(t),
            t._project(),
            t._update(),
            this._requestRedraw(t)
        },
        _updateStyle: function(t) {
            this._updateDashArray(t),
            this._requestRedraw(t)
        },
        _updateDashArray: function(t) {
            if (t.options.dashArray) {
                var i, e = t.options.dashArray.split(","), n = [];
                for (i = 0; i < e.length; i++)
                    n.push(Number(e[i]));
                t.options._dashArray = n
            }
        },
        _requestRedraw: function(t) {
            this._map && (this._extendRedrawBounds(t),
            this._redrawRequest = this._redrawRequest || f(this._redraw, this))
        },
        _extendRedrawBounds: function(t) {
            if (t._pxBounds) {
                var i = (t.options.weight || 0) + 1;
                this._redrawBounds = this._redrawBounds || new P,
                this._redrawBounds.extend(t._pxBounds.min.subtract([i, i])),
                this._redrawBounds.extend(t._pxBounds.max.add([i, i]))
            }
        },
        _redraw: function() {
            this._redrawRequest = null,
            this._redrawBounds && (this._redrawBounds.min._floor(),
            this._redrawBounds.max._ceil()),
            this._clear(),
            this._draw(),
            this._redrawBounds = null
        },
        _clear: function() {
            var t = this._redrawBounds;
            if (t) {
                var i = t.getSize();
                this._ctx.clearRect(t.min.x, t.min.y, i.x, i.y)
            } else
                this._ctx.clearRect(0, 0, this._container.width, this._container.height)
        },
        _draw: function() {
            var t, i = this._redrawBounds;
            if (this._ctx.save(),
            i) {
                var e = i.getSize();
                this._ctx.beginPath(),
                this._ctx.rect(i.min.x, i.min.y, e.x, e.y),
                this._ctx.clip()
            }
            this._drawing = !0;
            for (var n = this._drawFirst; n; n = n.next)
                t = n.layer,
                (!i || t._pxBounds && t._pxBounds.intersects(i)) && t._updatePath();
            this._drawing = !1,
            this._ctx.restore()
        },
        _updatePoly: function(t, i) {
            if (this._drawing) {
                var e, n, o, s, r = t._parts, a = r.length, h = this._ctx;
                if (a) {
                    for (this._drawnLayers[t._leaflet_id] = t,
                    h.beginPath(),
                    e = 0; e < a; e++) {
                        for (n = 0,
                        o = r[e].length; n < o; n++)
                            s = r[e][n],
                            h[n ? "lineTo" : "moveTo"](s.x, s.y);
                        i && h.closePath()
                    }
                    this._fillStroke(h, t)
                }
            }
        },
        _updateCircle: function(t) {
            if (this._drawing && !t._empty()) {
                var i = t._point
                  , e = this._ctx
                  , n = Math.max(Math.round(t._radius), 1)
                  , o = (Math.max(Math.round(t._radiusY), 1) || n) / n;
                this._drawnLayers[t._leaflet_id] = t,
                1 !== o && (e.save(),
                e.scale(1, o)),
                e.beginPath(),
                e.arc(i.x, i.y / o, n, 0, 2 * Math.PI, !1),
                1 !== o && e.restore(),
                this._fillStroke(e, t)
            }
        },
        _fillStroke: function(t, i) {
            var e = i.options;
            e.fill && (t.globalAlpha = e.fillOpacity,
            t.fillStyle = e.fillColor || e.color,
            t.fill(e.fillRule || "evenodd")),
            e.stroke && 0 !== e.weight && (t.setLineDash && t.setLineDash(i.options && i.options._dashArray || []),
            t.globalAlpha = e.opacity,
            t.lineWidth = e.weight,
            t.strokeStyle = e.color,
            t.lineCap = e.lineCap,
            t.lineJoin = e.lineJoin,
            t.stroke())
        },
        _onClick: function(t) {
            for (var i, e, n = this._map.mouseEventToLayerPoint(t), o = this._drawFirst; o; o = o.next)
                (i = o.layer).options.interactive && i._containsPoint(n) && !this._map._draggableMoved(i) && (e = i);
            e && (et(t),
            this._fireEvent([e], t))
        },
        _onMouseMove: function(t) {
            if (this._map && !this._map.dragging.moving() && !this._map._animatingZoom) {
                var i = this._map.mouseEventToLayerPoint(t);
                this._handleMouseHover(t, i)
            }
        },
        _handleMouseOut: function(t) {
            var i = this._hoveredLayer;
            i && (mt(this._container, "leaflet-interactive"),
            this._fireEvent([i], t, "mouseout"),
            this._hoveredLayer = null)
        },
        _handleMouseHover: function(t, i) {
            for (var e, n, o = this._drawFirst; o; o = o.next)
                (e = o.layer).options.interactive && e._containsPoint(i) && (n = e);
            n !== this._hoveredLayer && (this._handleMouseOut(t),
            n && (pt(this._container, "leaflet-interactive"),
            this._fireEvent([n], t, "mouseover"),
            this._hoveredLayer = n)),
            this._hoveredLayer && this._fireEvent([this._hoveredLayer], t)
        },
        _fireEvent: function(t, i, e) {
            this._map._fireDOMEvent(i, e || i.type, t)
        },
        _bringToFront: function(t) {
            var i = t._order
              , e = i.next
              , n = i.prev;
            e && (e.prev = n,
            n ? n.next = e : e && (this._drawFirst = e),
            i.prev = this._drawLast,
            this._drawLast.next = i,
            i.next = null,
            this._drawLast = i,
            this._requestRedraw(t))
        },
        _bringToBack: function(t) {
            var i = t._order
              , e = i.next
              , n = i.prev;
            n && (n.next = e,
            e ? e.prev = n : n && (this._drawLast = n),
            i.prev = null,
            i.next = this._drawFirst,
            this._drawFirst.prev = i,
            this._drawFirst = i,
            this._requestRedraw(t))
        }
    })
      , gn = function() {
        try {
            return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"),
            function(t) {
                return document.createElement("<lvml:" + t + ' class="lvml">')
            }
        } catch (t) {
            return function(t) {
                return document.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
            }
        }
    }()
      , vn = {
        _initContainer: function() {
            this._container = ht("div", "leaflet-vml-container")
        },
        _update: function() {
            this._map._animatingZoom || (mn.prototype._update.call(this),
            this.fire("update"))
        },
        _initPath: function(t) {
            var i = t._container = gn("shape");
            pt(i, "leaflet-vml-shape " + (this.options.className || "")),
            i.coordsize = "1 1",
            t._path = gn("path"),
            i.appendChild(t._path),
            this._updateStyle(t),
            this._layers[n(t)] = t
        },
        _addPath: function(t) {
            var i = t._container;
            this._container.appendChild(i),
            t.options.interactive && t.addInteractiveTarget(i)
        },
        _removePath: function(t) {
            var i = t._container;
            ut(i),
            t.removeInteractiveTarget(i),
            delete this._layers[n(t)]
        },
        _updateStyle: function(t) {
            var i = t._stroke
              , e = t._fill
              , n = t.options
              , o = t._container;
            o.stroked = !!n.stroke,
            o.filled = !!n.fill,
            n.stroke ? (i || (i = t._stroke = gn("stroke")),
            o.appendChild(i),
            i.weight = n.weight + "px",
            i.color = n.color,
            i.opacity = n.opacity,
            n.dashArray ? i.dashStyle = ei(n.dashArray) ? n.dashArray.join(" ") : n.dashArray.replace(/( *, *)/g, " ") : i.dashStyle = "",
            i.endcap = n.lineCap.replace("butt", "flat"),
            i.joinstyle = n.lineJoin) : i && (o.removeChild(i),
            t._stroke = null),
            n.fill ? (e || (e = t._fill = gn("fill")),
            o.appendChild(e),
            e.color = n.fillColor || n.color,
            e.opacity = n.fillOpacity) : e && (o.removeChild(e),
            t._fill = null)
        },
        _updateCircle: function(t) {
            var i = t._point.round()
              , e = Math.round(t._radius)
              , n = Math.round(t._radiusY || e);
            this._setPath(t, t._empty() ? "M0 0" : "AL " + i.x + "," + i.y + " " + e + "," + n + " 0,23592600")
        },
        _setPath: function(t, i) {
            t._path.v = i
        },
        _bringToFront: function(t) {
            ct(t._container)
        },
        _bringToBack: function(t) {
            _t(t._container)
        }
    }
      , yn = Ji ? gn : E
      , xn = mn.extend({
        getEvents: function() {
            var t = mn.prototype.getEvents.call(this);
            return t.zoomstart = this._onZoomStart,
            t
        },
        _initContainer: function() {
            this._container = yn("svg"),
            this._container.setAttribute("pointer-events", "none"),
            this._rootGroup = yn("g"),
            this._container.appendChild(this._rootGroup)
        },
        _destroyContainer: function() {
            ut(this._container),
            q(this._container),
            delete this._container,
            delete this._rootGroup,
            delete this._svgSize
        },
        _onZoomStart: function() {
            this._update()
        },
        _update: function() {
            if (!this._map._animatingZoom || !this._bounds) {
                mn.prototype._update.call(this);
                var t = this._bounds
                  , i = t.getSize()
                  , e = this._container;
                this._svgSize && this._svgSize.equals(i) || (this._svgSize = i,
                e.setAttribute("width", i.x),
                e.setAttribute("height", i.y)),
                Lt(e, t.min),
                e.setAttribute("viewBox", [t.min.x, t.min.y, i.x, i.y].join(" ")),
                this.fire("update")
            }
        },
        _initPath: function(t) {
            var i = t._path = yn("path");
            t.options.className && pt(i, t.options.className),
            t.options.interactive && pt(i, "leaflet-interactive"),
            this._updateStyle(t),
            this._layers[n(t)] = t
        },
        _addPath: function(t) {
            this._rootGroup || this._initContainer(),
            this._rootGroup.appendChild(t._path),
            t.addInteractiveTarget(t._path)
        },
        _removePath: function(t) {
            ut(t._path),
            t.removeInteractiveTarget(t._path),
            delete this._layers[n(t)]
        },
        _updatePath: function(t) {
            t._project(),
            t._update()
        },
        _updateStyle: function(t) {
            var i = t._path
              , e = t.options;
            i && (e.stroke ? (i.setAttribute("stroke", e.color),
            i.setAttribute("stroke-opacity", e.opacity),
            i.setAttribute("stroke-width", e.weight),
            i.setAttribute("stroke-linecap", e.lineCap),
            i.setAttribute("stroke-linejoin", e.lineJoin),
            e.dashArray ? i.setAttribute("stroke-dasharray", e.dashArray) : i.removeAttribute("stroke-dasharray"),
            e.dashOffset ? i.setAttribute("stroke-dashoffset", e.dashOffset) : i.removeAttribute("stroke-dashoffset")) : i.setAttribute("stroke", "none"),
            e.fill ? (i.setAttribute("fill", e.fillColor || e.color),
            i.setAttribute("fill-opacity", e.fillOpacity),
            i.setAttribute("fill-rule", e.fillRule || "evenodd")) : i.setAttribute("fill", "none"))
        },
        _updatePoly: function(t, i) {
            this._setPath(t, k(t._parts, i))
        },
        _updateCircle: function(t) {
            var i = t._point
              , e = Math.max(Math.round(t._radius), 1)
              , n = "a" + e + "," + (Math.max(Math.round(t._radiusY), 1) || e) + " 0 1,0 "
              , o = t._empty() ? "M0 0" : "M" + (i.x - e) + "," + i.y + n + 2 * e + ",0 " + n + 2 * -e + ",0 ";
            this._setPath(t, o)
        },
        _setPath: function(t, i) {
            t._path.setAttribute("d", i)
        },
        _bringToFront: function(t) {
            ct(t._path)
        },
        _bringToBack: function(t) {
            _t(t._path)
        }
    });
    Ji && xn.include(vn),
    Le.include({
        getRenderer: function(t) {
            var i = t.options.renderer || this._getPaneRenderer(t.options.pane) || this.options.renderer || this._renderer;
            return i || (i = this._renderer = this.options.preferCanvas && Xt() || Jt()),
            this.hasLayer(i) || this.addLayer(i),
            i
        },
        _getPaneRenderer: function(t) {
            if ("overlayPane" === t || void 0 === t)
                return !1;
            var i = this._paneRenderers[t];
            return void 0 === i && (i = xn && Jt({
                pane: t
            }) || fn && Xt({
                pane: t
            }),
            this._paneRenderers[t] = i),
            i
        }
    });
    var wn = en.extend({
        initialize: function(t, i) {
            en.prototype.initialize.call(this, this._boundsToLatLngs(t), i)
        },
        setBounds: function(t) {
            return this.setLatLngs(this._boundsToLatLngs(t))
        },
        _boundsToLatLngs: function(t) {
            return t = z(t),
            [t.getSouthWest(), t.getNorthWest(), t.getNorthEast(), t.getSouthEast()]
        }
    });
    xn.create = yn,
    xn.pointsToPath = k,
    nn.geometryToLayer = Wt,
    nn.coordsToLatLng = Ht,
    nn.coordsToLatLngs = Ft,
    nn.latLngToCoords = Ut,
    nn.latLngsToCoords = Vt,
    nn.getFeature = qt,
    nn.asFeature = Gt,
    Le.mergeOptions({
        boxZoom: !0
    });
    var Ln = Ze.extend({
        initialize: function(t) {
            this._map = t,
            this._container = t._container,
            this._pane = t._panes.overlayPane,
            this._resetStateTimeout = 0,
            t.on("unload", this._destroy, this)
        },
        addHooks: function() {
            V(this._container, "mousedown", this._onMouseDown, this)
        },
        removeHooks: function() {
            q(this._container, "mousedown", this._onMouseDown, this)
        },
        moved: function() {
            return this._moved
        },
        _destroy: function() {
            ut(this._pane),
            delete this._pane
        },
        _resetState: function() {
            this._resetStateTimeout = 0,
            this._moved = !1
        },
        _clearDeferredResetState: function() {
            0 !== this._resetStateTimeout && (clearTimeout(this._resetStateTimeout),
            this._resetStateTimeout = 0)
        },
        _onMouseDown: function(t) {
            if (!t.shiftKey || 1 !== t.which && 1 !== t.button)
                return !1;
            this._clearDeferredResetState(),
            this._resetState(),
            mi(),
            bt(),
            this._startPoint = this._map.mouseEventToContainerPoint(t),
            V(document, {
                contextmenu: Q,
                mousemove: this._onMouseMove,
                mouseup: this._onMouseUp,
                keydown: this._onKeyDown
            }, this)
        },
        _onMouseMove: function(t) {
            this._moved || (this._moved = !0,
            this._box = ht("div", "leaflet-zoom-box", this._container),
            pt(this._container, "leaflet-crosshair"),
            this._map.fire("boxzoomstart")),
            this._point = this._map.mouseEventToContainerPoint(t);
            var i = new P(this._point,this._startPoint)
              , e = i.getSize();
            Lt(this._box, i.min),
            this._box.style.width = e.x + "px",
            this._box.style.height = e.y + "px"
        },
        _finish: function() {
            this._moved && (ut(this._box),
            mt(this._container, "leaflet-crosshair")),
            fi(),
            Tt(),
            q(document, {
                contextmenu: Q,
                mousemove: this._onMouseMove,
                mouseup: this._onMouseUp,
                keydown: this._onKeyDown
            }, this)
        },
        _onMouseUp: function(t) {
            if ((1 === t.which || 1 === t.button) && (this._finish(),
            this._moved)) {
                this._clearDeferredResetState(),
                this._resetStateTimeout = setTimeout(e(this._resetState, this), 0);
                var i = new T(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));
                this._map.fitBounds(i).fire("boxzoomend", {
                    boxZoomBounds: i
                })
            }
        },
        _onKeyDown: function(t) {
            27 === t.keyCode && this._finish()
        }
    });
    Le.addInitHook("addHandler", "boxZoom", Ln),
    Le.mergeOptions({
        doubleClickZoom: !0
    });
    var Pn = Ze.extend({
        addHooks: function() {
            this._map.on("dblclick", this._onDoubleClick, this)
        },
        removeHooks: function() {
            this._map.off("dblclick", this._onDoubleClick, this)
        },
        _onDoubleClick: function(t) {
            var i = this._map
              , e = i.getZoom()
              , n = i.options.zoomDelta
              , o = t.originalEvent.shiftKey ? e - n : e + n;
            "center" === i.options.doubleClickZoom ? i.setZoom(o) : i.setZoomAround(t.containerPoint, o)
        }
    });
    Le.addInitHook("addHandler", "doubleClickZoom", Pn),
    Le.mergeOptions({
        dragging: !0,
        inertia: !zi,
        inertiaDeceleration: 3400,
        inertiaMaxSpeed: 1 / 0,
        easeLinearity: .2,
        worldCopyJump: !1,
        maxBoundsViscosity: 0
    });
    var bn = Ze.extend({
        addHooks: function() {
            if (!this._draggable) {
                var t = this._map;
                this._draggable = new Be(t._mapPane,t._container),
                this._draggable.on({
                    dragstart: this._onDragStart,
                    drag: this._onDrag,
                    dragend: this._onDragEnd
                }, this),
                this._draggable.on("predrag", this._onPreDragLimit, this),
                t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this),
                t.on("zoomend", this._onZoomEnd, this),
                t.whenReady(this._onZoomEnd, this))
            }
            pt(this._map._container, "leaflet-grab leaflet-touch-drag"),
            this._draggable.enable(),
            this._positions = [],
            this._times = []
        },
        removeHooks: function() {
            mt(this._map._container, "leaflet-grab"),
            mt(this._map._container, "leaflet-touch-drag"),
            this._draggable.disable()
        },
        moved: function() {
            return this._draggable && this._draggable._moved
        },
        moving: function() {
            return this._draggable && this._draggable._moving
        },
        _onDragStart: function() {
            var t = this._map;
            if (t._stop(),
            this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
                var i = z(this._map.options.maxBounds);
                this._offsetLimit = b(this._map.latLngToContainerPoint(i.getNorthWest()).multiplyBy(-1), this._map.latLngToContainerPoint(i.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),
                this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity))
            } else
                this._offsetLimit = null;
            t.fire("movestart").fire("dragstart"),
            t.options.inertia && (this._positions = [],
            this._times = [])
        },
        _onDrag: function(t) {
            if (this._map.options.inertia) {
                var i = this._lastTime = +new Date
                  , e = this._lastPos = this._draggable._absPos || this._draggable._newPos;
                this._positions.push(e),
                this._times.push(i),
                this._prunePositions(i)
            }
            this._map.fire("move", t).fire("drag", t)
        },
        _prunePositions: function(t) {
            for (; this._positions.length > 1 && t - this._times[0] > 50; )
                this._positions.shift(),
                this._times.shift()
        },
        _onZoomEnd: function() {
            var t = this._map.getSize().divideBy(2)
              , i = this._map.latLngToLayerPoint([0, 0]);
            this._initialWorldOffset = i.subtract(t).x,
            this._worldWidth = this._map.getPixelWorldBounds().getSize().x
        },
        _viscousLimit: function(t, i) {
            return t - (t - i) * this._viscosity
        },
        _onPreDragLimit: function() {
            if (this._viscosity && this._offsetLimit) {
                var t = this._draggable._newPos.subtract(this._draggable._startPos)
                  , i = this._offsetLimit;
                t.x < i.min.x && (t.x = this._viscousLimit(t.x, i.min.x)),
                t.y < i.min.y && (t.y = this._viscousLimit(t.y, i.min.y)),
                t.x > i.max.x && (t.x = this._viscousLimit(t.x, i.max.x)),
                t.y > i.max.y && (t.y = this._viscousLimit(t.y, i.max.y)),
                this._draggable._newPos = this._draggable._startPos.add(t)
            }
        },
        _onPreDragWrap: function() {
            var t = this._worldWidth
              , i = Math.round(t / 2)
              , e = this._initialWorldOffset
              , n = this._draggable._newPos.x
              , o = (n - i + e) % t + i - e
              , s = (n + i + e) % t - i - e
              , r = Math.abs(o + e) < Math.abs(s + e) ? o : s;
            this._draggable._absPos = this._draggable._newPos.clone(),
            this._draggable._newPos.x = r
        },
        _onDragEnd: function(t) {
            var i = this._map
              , e = i.options
              , n = !e.inertia || this._times.length < 2;
            if (i.fire("dragend", t),
            n)
                i.fire("moveend");
            else {
                this._prunePositions(+new Date);
                var o = this._lastPos.subtract(this._positions[0])
                  , s = (this._lastTime - this._times[0]) / 1e3
                  , r = e.easeLinearity
                  , a = o.multiplyBy(r / s)
                  , h = a.distanceTo([0, 0])
                  , u = Math.min(e.inertiaMaxSpeed, h)
                  , l = a.multiplyBy(u / h)
                  , c = u / (e.inertiaDeceleration * r)
                  , _ = l.multiplyBy(-c / 2).round();
                _.x || _.y ? (_ = i._limitOffset(_, i.options.maxBounds),
                f(function() {
                    i.panBy(_, {
                        duration: c,
                        easeLinearity: r,
                        noMoveStart: !0,
                        animate: !0
                    })
                })) : i.fire("moveend")
            }
        }
    });
    Le.addInitHook("addHandler", "dragging", bn),
    Le.mergeOptions({
        keyboard: !0,
        keyboardPanDelta: 80
    });
    var Tn = Ze.extend({
        keyCodes: {
            left: [37],
            right: [39],
            down: [40],
            up: [38],
            zoomIn: [187, 107, 61, 171],
            zoomOut: [189, 109, 54, 173]
        },
        initialize: function(t) {
            this._map = t,
            this._setPanDelta(t.options.keyboardPanDelta),
            this._setZoomDelta(t.options.zoomDelta)
        },
        addHooks: function() {
            var t = this._map._container;
            t.tabIndex <= 0 && (t.tabIndex = "0"),
            V(t, {
                focus: this._onFocus,
                blur: this._onBlur,
                mousedown: this._onMouseDown
            }, this),
            this._map.on({
                focus: this._addHooks,
                blur: this._removeHooks
            }, this)
        },
        removeHooks: function() {
            this._removeHooks(),
            q(this._map._container, {
                focus: this._onFocus,
                blur: this._onBlur,
                mousedown: this._onMouseDown
            }, this),
            this._map.off({
                focus: this._addHooks,
                blur: this._removeHooks
            }, this)
        },
        _onMouseDown: function() {
            if (!this._focused) {
                var t = document.body
                  , i = document.documentElement
                  , e = t.scrollTop || i.scrollTop
                  , n = t.scrollLeft || i.scrollLeft;
                this._map._container.focus(),
                window.scrollTo(n, e)
            }
        },
        _onFocus: function() {
            this._focused = !0,
            this._map.fire("focus")
        },
        _onBlur: function() {
            this._focused = !1,
            this._map.fire("blur")
        },
        _setPanDelta: function(t) {
            var i, e, n = this._panKeys = {}, o = this.keyCodes;
            for (i = 0,
            e = o.left.length; i < e; i++)
                n[o.left[i]] = [-1 * t, 0];
            for (i = 0,
            e = o.right.length; i < e; i++)
                n[o.right[i]] = [t, 0];
            for (i = 0,
            e = o.down.length; i < e; i++)
                n[o.down[i]] = [0, t];
            for (i = 0,
            e = o.up.length; i < e; i++)
                n[o.up[i]] = [0, -1 * t]
        },
        _setZoomDelta: function(t) {
            var i, e, n = this._zoomKeys = {}, o = this.keyCodes;
            for (i = 0,
            e = o.zoomIn.length; i < e; i++)
                n[o.zoomIn[i]] = t;
            for (i = 0,
            e = o.zoomOut.length; i < e; i++)
                n[o.zoomOut[i]] = -t
        },
        _addHooks: function() {
            V(document, "keydown", this._onKeyDown, this)
        },
        _removeHooks: function() {
            q(document, "keydown", this._onKeyDown, this)
        },
        _onKeyDown: function(t) {
            if (!(t.altKey || t.ctrlKey || t.metaKey)) {
                var i, e = t.keyCode, n = this._map;
                if (e in this._panKeys) {
                    if (n._panAnim && n._panAnim._inProgress)
                        return;
                    i = this._panKeys[e],
                    t.shiftKey && (i = w(i).multiplyBy(3)),
                    n.panBy(i),
                    n.options.maxBounds && n.panInsideBounds(n.options.maxBounds)
                } else if (e in this._zoomKeys)
                    n.setZoom(n.getZoom() + (t.shiftKey ? 3 : 1) * this._zoomKeys[e]);
                else {
                    if (27 !== e || !n._popup || !n._popup.options.closeOnEscapeKey)
                        return;
                    n.closePopup()
                }
                Q(t)
            }
        }
    });
    Le.addInitHook("addHandler", "keyboard", Tn),
    Le.mergeOptions({
        scrollWheelZoom: !0,
        wheelDebounceTime: 40,
        wheelPxPerZoomLevel: 60
    });
    var zn = Ze.extend({
        addHooks: function() {
            V(this._map._container, "mousewheel", this._onWheelScroll, this),
            this._delta = 0
        },
        removeHooks: function() {
            q(this._map._container, "mousewheel", this._onWheelScroll, this)
        },
        _onWheelScroll: function(t) {
            var i = it(t)
              , n = this._map.options.wheelDebounceTime;
            this._delta += i,
            this._lastMousePos = this._map.mouseEventToContainerPoint(t),
            this._startTime || (this._startTime = +new Date);
            var o = Math.max(n - (+new Date - this._startTime), 0);
            clearTimeout(this._timer),
            this._timer = setTimeout(e(this._performZoom, this), o),
            Q(t)
        },
        _performZoom: function() {
            var t = this._map
              , i = t.getZoom()
              , e = this._map.options.zoomSnap || 0;
            t._stop();
            var n = this._delta / (4 * this._map.options.wheelPxPerZoomLevel)
              , o = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(n)))) / Math.LN2
              , s = e ? Math.ceil(o / e) * e : o
              , r = t._limitZoom(i + (this._delta > 0 ? s : -s)) - i;
            this._delta = 0,
            this._startTime = null,
            r && ("center" === t.options.scrollWheelZoom ? t.setZoom(i + r) : t.setZoomAround(this._lastMousePos, i + r))
        }
    });
    Le.addInitHook("addHandler", "scrollWheelZoom", zn),
    Le.mergeOptions({
        tap: !0,
        tapTolerance: 15
    });
    var Mn = Ze.extend({
        addHooks: function() {
            V(this._map._container, "touchstart", this._onDown, this)
        },
        removeHooks: function() {
            q(this._map._container, "touchstart", this._onDown, this)
        },
        _onDown: function(t) {
            if (t.touches) {
                if ($(t),
                this._fireClick = !0,
                t.touches.length > 1)
                    return this._fireClick = !1,
                    void clearTimeout(this._holdTimeout);
                var i = t.touches[0]
                  , n = i.target;
                this._startPos = this._newPos = new x(i.clientX,i.clientY),
                n.tagName && "a" === n.tagName.toLowerCase() && pt(n, "leaflet-active"),
                this._holdTimeout = setTimeout(e(function() {
                    this._isTapValid() && (this._fireClick = !1,
                    this._onUp(),
                    this._simulateEvent("contextmenu", i))
                }, this), 1e3),
                this._simulateEvent("mousedown", i),
                V(document, {
                    touchmove: this._onMove,
                    touchend: this._onUp
                }, this)
            }
        },
        _onUp: function(t) {
            if (clearTimeout(this._holdTimeout),
            q(document, {
                touchmove: this._onMove,
                touchend: this._onUp
            }, this),
            this._fireClick && t && t.changedTouches) {
                var i = t.changedTouches[0]
                  , e = i.target;
                e && e.tagName && "a" === e.tagName.toLowerCase() && mt(e, "leaflet-active"),
                this._simulateEvent("mouseup", i),
                this._isTapValid() && this._simulateEvent("click", i)
            }
        },
        _isTapValid: function() {
            return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance
        },
        _onMove: function(t) {
            var i = t.touches[0];
            this._newPos = new x(i.clientX,i.clientY),
            this._simulateEvent("mousemove", i)
        },
        _simulateEvent: function(t, i) {
            var e = document.createEvent("MouseEvents");
            e._simulated = !0,
            i.target._simulatedClick = !0,
            e.initMouseEvent(t, !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null),
            i.target.dispatchEvent(e)
        }
    });
    Vi && !Ui && Le.addInitHook("addHandler", "tap", Mn),
    Le.mergeOptions({
        touchZoom: Vi && !zi,
        bounceAtZoomLimits: !0
    });
    var Cn = Ze.extend({
        addHooks: function() {
            pt(this._map._container, "leaflet-touch-zoom"),
            V(this._map._container, "touchstart", this._onTouchStart, this)
        },
        removeHooks: function() {
            mt(this._map._container, "leaflet-touch-zoom"),
            q(this._map._container, "touchstart", this._onTouchStart, this)
        },
        _onTouchStart: function(t) {
            var i = this._map;
            if (t.touches && 2 === t.touches.length && !i._animatingZoom && !this._zooming) {
                var e = i.mouseEventToContainerPoint(t.touches[0])
                  , n = i.mouseEventToContainerPoint(t.touches[1]);
                this._centerPoint = i.getSize()._divideBy(2),
                this._startLatLng = i.containerPointToLatLng(this._centerPoint),
                "center" !== i.options.touchZoom && (this._pinchStartLatLng = i.containerPointToLatLng(e.add(n)._divideBy(2))),
                this._startDist = e.distanceTo(n),
                this._startZoom = i.getZoom(),
                this._moved = !1,
                this._zooming = !0,
                i._stop(),
                V(document, "touchmove", this._onTouchMove, this),
                V(document, "touchend", this._onTouchEnd, this),
                $(t)
            }
        },
        _onTouchMove: function(t) {
            if (t.touches && 2 === t.touches.length && this._zooming) {
                var i = this._map
                  , n = i.mouseEventToContainerPoint(t.touches[0])
                  , o = i.mouseEventToContainerPoint(t.touches[1])
                  , s = n.distanceTo(o) / this._startDist;
                if (this._zoom = i.getScaleZoom(s, this._startZoom),
                !i.options.bounceAtZoomLimits && (this._zoom < i.getMinZoom() && s < 1 || this._zoom > i.getMaxZoom() && s > 1) && (this._zoom = i._limitZoom(this._zoom)),
                "center" === i.options.touchZoom) {
                    if (this._center = this._startLatLng,
                    1 === s)
                        return
                } else {
                    var r = n._add(o)._divideBy(2)._subtract(this._centerPoint);
                    if (1 === s && 0 === r.x && 0 === r.y)
                        return;
                    this._center = i.unproject(i.project(this._pinchStartLatLng, this._zoom).subtract(r), this._zoom)
                }
                this._moved || (i._moveStart(!0, !1),
                this._moved = !0),
                g(this._animRequest);
                var a = e(i._move, i, this._center, this._zoom, {
                    pinch: !0,
                    round: !1
                });
                this._animRequest = f(a, this, !0),
                $(t)
            }
        },
        _onTouchEnd: function() {
            this._moved && this._zooming ? (this._zooming = !1,
            g(this._animRequest),
            q(document, "touchmove", this._onTouchMove),
            q(document, "touchend", this._onTouchEnd),
            this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom))) : this._zooming = !1
        }
    });
    Le.addInitHook("addHandler", "touchZoom", Cn),
    Le.BoxZoom = Ln,
    Le.DoubleClickZoom = Pn,
    Le.Drag = bn,
    Le.Keyboard = Tn,
    Le.ScrollWheelZoom = zn,
    Le.Tap = Mn,
    Le.TouchZoom = Cn;
    var Zn = window.L;
    window.L = t,
    Object.freeze = $t,
    t.version = "1.3.1",
    t.noConflict = function() {
        return window.L = Zn,
        this
    }
    ,
    t.Control = Pe,
    t.control = be,
    t.Browser = $i,
    t.Evented = ui,
    t.Mixin = Ee,
    t.Util = ai,
    t.Class = v,
    t.Handler = Ze,
    t.extend = i,
    t.bind = e,
    t.stamp = n,
    t.setOptions = l,
    t.DomEvent = de,
    t.DomUtil = xe,
    t.PosAnimation = we,
    t.Draggable = Be,
    t.LineUtil = Oe,
    t.PolyUtil = Re,
    t.Point = x,
    t.point = w,
    t.Bounds = P,
    t.bounds = b,
    t.Transformation = Z,
    t.transformation = S,
    t.Projection = je,
    t.LatLng = M,
    t.latLng = C,
    t.LatLngBounds = T,
    t.latLngBounds = z,
    t.CRS = ci,
    t.GeoJSON = nn,
    t.geoJSON = Kt,
    t.geoJson = sn,
    t.Layer = Ue,
    t.LayerGroup = Ve,
    t.layerGroup = function(t, i) {
        return new Ve(t,i)
    }
    ,
    t.FeatureGroup = qe,
    t.featureGroup = function(t) {
        return new qe(t)
    }
    ,
    t.ImageOverlay = rn,
    t.imageOverlay = function(t, i, e) {
        return new rn(t,i,e)
    }
    ,
    t.VideoOverlay = an,
    t.videoOverlay = function(t, i, e) {
        return new an(t,i,e)
    }
    ,
    t.DivOverlay = hn,
    t.Popup = un,
    t.popup = function(t, i) {
        return new un(t,i)
    }
    ,
    t.Tooltip = ln,
    t.tooltip = function(t, i) {
        return new ln(t,i)
    }
    ,
    t.Icon = Ge,
    t.icon = function(t) {
        return new Ge(t)
    }
    ,
    t.DivIcon = cn,
    t.divIcon = function(t) {
        return new cn(t)
    }
    ,
    t.Marker = Xe,
    t.marker = function(t, i) {
        return new Xe(t,i)
    }
    ,
    t.TileLayer = dn,
    t.tileLayer = Yt,
    t.GridLayer = _n,
    t.gridLayer = function(t) {
        return new _n(t)
    }
    ,
    t.SVG = xn,
    t.svg = Jt,
    t.Renderer = mn,
    t.Canvas = fn,
    t.canvas = Xt,
    t.Path = Je,
    t.CircleMarker = $e,
    t.circleMarker = function(t, i) {
        return new $e(t,i)
    }
    ,
    t.Circle = Qe,
    t.circle = function(t, i, e) {
        return new Qe(t,i,e)
    }
    ,
    t.Polyline = tn,
    t.polyline = function(t, i) {
        return new tn(t,i)
    }
    ,
    t.Polygon = en,
    t.polygon = function(t, i) {
        return new en(t,i)
    }
    ,
    t.Rectangle = wn,
    t.rectangle = function(t, i) {
        return new wn(t,i)
    }
    ,
    t.Map = Le,
    t.map = function(t, i) {
        return new Le(t,i)
    }
});
;;!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e.Leaflet = e.Leaflet || {},
    e.Leaflet.markercluster = e.Leaflet.markercluster || {}))
}(this, function(e) {
    "use strict";
    var t = L.MarkerClusterGroup = L.FeatureGroup.extend({
        options: {
            maxClusterRadius: 80,
            iconCreateFunction: null,
            clusterPane: L.Marker.prototype.options.pane,
            spiderfyOnMaxZoom: !0,
            showCoverageOnHover: !0,
            zoomToBoundsOnClick: !0,
            singleMarkerMode: !1,
            disableClusteringAtZoom: null,
            removeOutsideVisibleBounds: !0,
            animate: !0,
            animateAddingMarkers: !1,
            spiderfyDistanceMultiplier: 1,
            spiderLegPolylineOptions: {
                weight: 1.5,
                color: "#222",
                opacity: .5
            },
            chunkedLoading: !1,
            chunkInterval: 200,
            chunkDelay: 50,
            chunkProgress: null,
            polygonOptions: {}
        },
        initialize: function(e) {
            L.Util.setOptions(this, e),
            this.options.iconCreateFunction || (this.options.iconCreateFunction = this._defaultIconCreateFunction),
            this._featureGroup = L.featureGroup(),
            this._featureGroup.addEventParent(this),
            this._nonPointGroup = L.featureGroup(),
            this._nonPointGroup.addEventParent(this),
            this._inZoomAnimation = 0,
            this._needsClustering = [],
            this._needsRemoving = [],
            this._currentShownBounds = null,
            this._queue = [],
            this._childMarkerEventHandlers = {
                dragstart: this._childMarkerDragStart,
                move: this._childMarkerMoved,
                dragend: this._childMarkerDragEnd
            };
            var t = L.DomUtil.TRANSITION && this.options.animate;
            L.extend(this, t ? this._withAnimation : this._noAnimation),
            this._markerCluster = t ? L.MarkerCluster : L.MarkerClusterNonAnimated
        },
        addLayer: function(e) {
            if (e instanceof L.LayerGroup)
                return this.addLayers([e]);
            if (!e.getLatLng)
                return this._nonPointGroup.addLayer(e),
                this.fire("layeradd", {
                    layer: e
                }),
                this;
            if (!this._map)
                return this._needsClustering.push(e),
                this.fire("layeradd", {
                    layer: e
                }),
                this;
            if (this.hasLayer(e))
                return this;
            this._unspiderfy && this._unspiderfy(),
            this._addLayer(e, this._maxZoom),
            this.fire("layeradd", {
                layer: e
            }),
            this._topClusterLevel._recalculateBounds(),
            this._refreshClustersIcons();
            var t = e
              , i = this._zoom;
            if (e.__parent)
                for (; t.__parent._zoom >= i; )
                    t = t.__parent;
            return this._currentShownBounds.contains(t.getLatLng()) && (this.options.animateAddingMarkers ? this._animationAddLayer(e, t) : this._animationAddLayerNonAnimated(e, t)),
            this
        },
        removeLayer: function(e) {
            return e instanceof L.LayerGroup ? this.removeLayers([e]) : e.getLatLng ? this._map ? e.__parent ? (this._unspiderfy && (this._unspiderfy(),
            this._unspiderfyLayer(e)),
            this._removeLayer(e, !0),
            this.fire("layerremove", {
                layer: e
            }),
            this._topClusterLevel._recalculateBounds(),
            this._refreshClustersIcons(),
            e.off(this._childMarkerEventHandlers, this),
            this._featureGroup.hasLayer(e) && (this._featureGroup.removeLayer(e),
            e.clusterShow && e.clusterShow()),
            this) : this : (!this._arraySplice(this._needsClustering, e) && this.hasLayer(e) && this._needsRemoving.push({
                layer: e,
                latlng: e._latlng
            }),
            this.fire("layerremove", {
                layer: e
            }),
            this) : (this._nonPointGroup.removeLayer(e),
            this.fire("layerremove", {
                layer: e
            }),
            this)
        },
        addLayers: function(e, t) {
            if (!L.Util.isArray(e))
                return this.addLayer(e);
            var i, n = this._featureGroup, r = this._nonPointGroup, s = this.options.chunkedLoading, o = this.options.chunkInterval, a = this.options.chunkProgress, h = e.length, l = 0, u = !0;
            if (this._map) {
                var _ = (new Date).getTime()
                  , d = L.bind(function() {
                    for (var c = (new Date).getTime(); h > l; l++) {
                        if (s && 0 === l % 200) {
                            var p = (new Date).getTime() - c;
                            if (p > o)
                                break
                        }
                        if (i = e[l],
                        i instanceof L.LayerGroup)
                            u && (e = e.slice(),
                            u = !1),
                            this._extractNonGroupLayers(i, e),
                            h = e.length;
                        else if (i.getLatLng) {
                            if (!this.hasLayer(i) && (this._addLayer(i, this._maxZoom),
                            t || this.fire("layeradd", {
                                layer: i
                            }),
                            i.__parent && 2 === i.__parent.getChildCount())) {
                                var f = i.__parent.getAllChildMarkers()
                                  , m = f[0] === i ? f[1] : f[0];
                                n.removeLayer(m)
                            }
                        } else
                            r.addLayer(i),
                            t || this.fire("layeradd", {
                                layer: i
                            })
                    }
                    a && a(l, h, (new Date).getTime() - _),
                    l === h ? (this._topClusterLevel._recalculateBounds(),
                    this._refreshClustersIcons(),
                    this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds)) : setTimeout(d, this.options.chunkDelay)
                }, this);
                d()
            } else
                for (var c = this._needsClustering; h > l; l++)
                    i = e[l],
                    i instanceof L.LayerGroup ? (u && (e = e.slice(),
                    u = !1),
                    this._extractNonGroupLayers(i, e),
                    h = e.length) : i.getLatLng ? this.hasLayer(i) || c.push(i) : r.addLayer(i);
            return this
        },
        removeLayers: function(e) {
            var t, i, n = e.length, r = this._featureGroup, s = this._nonPointGroup, o = !0;
            if (!this._map) {
                for (t = 0; n > t; t++)
                    i = e[t],
                    i instanceof L.LayerGroup ? (o && (e = e.slice(),
                    o = !1),
                    this._extractNonGroupLayers(i, e),
                    n = e.length) : (this._arraySplice(this._needsClustering, i),
                    s.removeLayer(i),
                    this.hasLayer(i) && this._needsRemoving.push({
                        layer: i,
                        latlng: i._latlng
                    }),
                    this.fire("layerremove", {
                        layer: i
                    }));
                return this
            }
            if (this._unspiderfy) {
                this._unspiderfy();
                var a = e.slice()
                  , h = n;
                for (t = 0; h > t; t++)
                    i = a[t],
                    i instanceof L.LayerGroup ? (this._extractNonGroupLayers(i, a),
                    h = a.length) : this._unspiderfyLayer(i)
            }
            for (t = 0; n > t; t++)
                i = e[t],
                i instanceof L.LayerGroup ? (o && (e = e.slice(),
                o = !1),
                this._extractNonGroupLayers(i, e),
                n = e.length) : i.__parent ? (this._removeLayer(i, !0, !0),
                this.fire("layerremove", {
                    layer: i
                }),
                r.hasLayer(i) && (r.removeLayer(i),
                i.clusterShow && i.clusterShow())) : (s.removeLayer(i),
                this.fire("layerremove", {
                    layer: i
                }));
            return this._topClusterLevel._recalculateBounds(),
            this._refreshClustersIcons(),
            this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds),
            this
        },
        clearLayers: function() {
            return this._map || (this._needsClustering = [],
            this._needsRemoving = [],
            delete this._gridClusters,
            delete this._gridUnclustered),
            this._noanimationUnspiderfy && this._noanimationUnspiderfy(),
            this._featureGroup.clearLayers(),
            this._nonPointGroup.clearLayers(),
            this.eachLayer(function(e) {
                e.off(this._childMarkerEventHandlers, this),
                delete e.__parent
            }, this),
            this._map && this._generateInitialClusters(),
            this
        },
        getBounds: function() {
            var e = new L.LatLngBounds;
            this._topClusterLevel && e.extend(this._topClusterLevel._bounds);
            for (var t = this._needsClustering.length - 1; t >= 0; t--)
                e.extend(this._needsClustering[t].getLatLng());
            return e.extend(this._nonPointGroup.getBounds()),
            e
        },
        eachLayer: function(e, t) {
            var i, n, r, s = this._needsClustering.slice(), o = this._needsRemoving;
            for (this._topClusterLevel && this._topClusterLevel.getAllChildMarkers(s),
            n = s.length - 1; n >= 0; n--) {
                for (i = !0,
                r = o.length - 1; r >= 0; r--)
                    if (o[r].layer === s[n]) {
                        i = !1;
                        break
                    }
                i && e.call(t, s[n])
            }
            this._nonPointGroup.eachLayer(e, t)
        },
        getLayers: function() {
            var e = [];
            return this.eachLayer(function(t) {
                e.push(t)
            }),
            e
        },
        getLayer: function(e) {
            var t = null;
            return e = parseInt(e, 10),
            this.eachLayer(function(i) {
                L.stamp(i) === e && (t = i)
            }),
            t
        },
        hasLayer: function(e) {
            if (!e)
                return !1;
            var t, i = this._needsClustering;
            for (t = i.length - 1; t >= 0; t--)
                if (i[t] === e)
                    return !0;
            for (i = this._needsRemoving,
            t = i.length - 1; t >= 0; t--)
                if (i[t].layer === e)
                    return !1;
            return !(!e.__parent || e.__parent._group !== this) || this._nonPointGroup.hasLayer(e)
        },
        zoomToShowLayer: function(e, t) {
            "function" != typeof t && (t = function() {}
            );
            var i = function() {
                !e._icon && !e.__parent._icon || this._inZoomAnimation || (this._map.off("moveend", i, this),
                this.off("animationend", i, this),
                e._icon ? t() : e.__parent._icon && (this.once("spiderfied", t, this),
                e.__parent.spiderfy()))
            };
            e._icon && this._map.getBounds().contains(e.getLatLng()) ? t() : e.__parent._zoom < Math.round(this._map._zoom) ? (this._map.on("moveend", i, this),
            this._map.panTo(e.getLatLng())) : (this._map.on("moveend", i, this),
            this.on("animationend", i, this),
            e.__parent.zoomToBounds())
        },
        onAdd: function(e) {
            this._map = e;
            var t, i, n;
            if (!isFinite(this._map.getMaxZoom()))
                throw "Map has no maxZoom specified";
            for (this._featureGroup.addTo(e),
            this._nonPointGroup.addTo(e),
            this._gridClusters || this._generateInitialClusters(),
            this._maxLat = e.options.crs.projection.MAX_LATITUDE,
            t = 0,
            i = this._needsRemoving.length; i > t; t++)
                n = this._needsRemoving[t],
                n.newlatlng = n.layer._latlng,
                n.layer._latlng = n.latlng;
            for (t = 0,
            i = this._needsRemoving.length; i > t; t++)
                n = this._needsRemoving[t],
                this._removeLayer(n.layer, !0),
                n.layer._latlng = n.newlatlng;
            this._needsRemoving = [],
            this._zoom = Math.round(this._map._zoom),
            this._currentShownBounds = this._getExpandedVisibleBounds(),
            this._map.on("zoomend", this._zoomEnd, this),
            this._map.on("moveend", this._moveEnd, this),
            this._spiderfierOnAdd && this._spiderfierOnAdd(),
            this._bindEvents(),
            i = this._needsClustering,
            this._needsClustering = [],
            this.addLayers(i, !0)
        },
        onRemove: function(e) {
            e.off("zoomend", this._zoomEnd, this),
            e.off("moveend", this._moveEnd, this),
            this._unbindEvents(),
            this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", ""),
            this._spiderfierOnRemove && this._spiderfierOnRemove(),
            delete this._maxLat,
            this._hideCoverage(),
            this._featureGroup.remove(),
            this._nonPointGroup.remove(),
            this._featureGroup.clearLayers(),
            this._map = null
        },
        getVisibleParent: function(e) {
            for (var t = e; t && !t._icon; )
                t = t.__parent;
            return t || null
        },
        _arraySplice: function(e, t) {
            for (var i = e.length - 1; i >= 0; i--)
                if (e[i] === t)
                    return e.splice(i, 1),
                    !0
        },
        _removeFromGridUnclustered: function(e, t) {
            for (var i = this._map, n = this._gridUnclustered, r = Math.floor(this._map.getMinZoom()); t >= r && n[t].removeObject(e, i.project(e.getLatLng(), t)); t--)
                ;
        },
        _childMarkerDragStart: function(e) {
            e.target.__dragStart = e.target._latlng
        },
        _childMarkerMoved: function(e) {
            if (!this._ignoreMove && !e.target.__dragStart) {
                var t = e.target._popup && e.target._popup.isOpen();
                this._moveChild(e.target, e.oldLatLng, e.latlng),
                t && e.target.openPopup()
            }
        },
        _moveChild: function(e, t, i) {
            e._latlng = t,
            this.removeLayer(e),
            e._latlng = i,
            this.addLayer(e)
        },
        _childMarkerDragEnd: function(e) {
            var t = e.target.__dragStart;
            delete e.target.__dragStart,
            t && this._moveChild(e.target, t, e.target._latlng)
        },
        _removeLayer: function(e, t, i) {
            var n = this._gridClusters
              , r = this._gridUnclustered
              , s = this._featureGroup
              , o = this._map
              , a = Math.floor(this._map.getMinZoom());
            t && this._removeFromGridUnclustered(e, this._maxZoom);
            var h, l = e.__parent, u = l._markers;
            for (this._arraySplice(u, e); l && (l._childCount--,
            l._boundsNeedUpdate = !0,
            !(l._zoom < a)); )
                t && l._childCount <= 1 ? (h = l._markers[0] === e ? l._markers[1] : l._markers[0],
                n[l._zoom].removeObject(l, o.project(l._cLatLng, l._zoom)),
                r[l._zoom].addObject(h, o.project(h.getLatLng(), l._zoom)),
                this._arraySplice(l.__parent._childClusters, l),
                l.__parent._markers.push(h),
                h.__parent = l.__parent,
                l._icon && (s.removeLayer(l),
                i || s.addLayer(h))) : l._iconNeedsUpdate = !0,
                l = l.__parent;
            delete e.__parent
        },
        _isOrIsParent: function(e, t) {
            for (; t; ) {
                if (e === t)
                    return !0;
                t = t.parentNode
            }
            return !1
        },
        fire: function(e, t, i) {
            if (t && t.layer instanceof L.MarkerCluster) {
                if (t.originalEvent && this._isOrIsParent(t.layer._icon, t.originalEvent.relatedTarget))
                    return;
                e = "cluster" + e
            }
            L.FeatureGroup.prototype.fire.call(this, e, t, i)
        },
        listens: function(e, t) {
            return L.FeatureGroup.prototype.listens.call(this, e, t) || L.FeatureGroup.prototype.listens.call(this, "cluster" + e, t)
        },
        _defaultIconCreateFunction: function(e) {
            var t = e.getChildCount()
              , i = " marker-cluster-";
            return i += 10 > t ? "small" : 100 > t ? "medium" : "large",
            new L.DivIcon({
                html: "<div><span>" + t + "</span></div>",
                className: "marker-cluster" + i,
                iconSize: new L.Point(40,40)
            })
        },
        _bindEvents: function() {
            var e = this._map
              , t = this.options.spiderfyOnMaxZoom
              , i = this.options.showCoverageOnHover
              , n = this.options.zoomToBoundsOnClick;
            (t || n) && this.on("clusterclick", this._zoomOrSpiderfy, this),
            i && (this.on("clustermouseover", this._showCoverage, this),
            this.on("clustermouseout", this._hideCoverage, this),
            e.on("zoomend", this._hideCoverage, this))
        },
        _zoomOrSpiderfy: function(e) {
            for (var t = e.layer, i = t; 1 === i._childClusters.length; )
                i = i._childClusters[0];
            i._zoom === this._maxZoom && i._childCount === t._childCount && this.options.spiderfyOnMaxZoom ? t.spiderfy() : this.options.zoomToBoundsOnClick && t.zoomToBounds(),
            e.originalEvent && 13 === e.originalEvent.keyCode && this._map._container.focus()
        },
        _showCoverage: function(e) {
            var t = this._map;
            this._inZoomAnimation || (this._shownPolygon && t.removeLayer(this._shownPolygon),
            e.layer.getChildCount() > 2 && e.layer !== this._spiderfied && (this._shownPolygon = new L.Polygon(e.layer.getConvexHull(),this.options.polygonOptions),
            t.addLayer(this._shownPolygon)))
        },
        _hideCoverage: function() {
            this._shownPolygon && (this._map.removeLayer(this._shownPolygon),
            this._shownPolygon = null)
        },
        _unbindEvents: function() {
            var e = this.options.spiderfyOnMaxZoom
              , t = this.options.showCoverageOnHover
              , i = this.options.zoomToBoundsOnClick
              , n = this._map;
            (e || i) && this.off("clusterclick", this._zoomOrSpiderfy, this),
            t && (this.off("clustermouseover", this._showCoverage, this),
            this.off("clustermouseout", this._hideCoverage, this),
            n.off("zoomend", this._hideCoverage, this))
        },
        _zoomEnd: function() {
            this._map && (this._mergeSplitClusters(),
            this._zoom = Math.round(this._map._zoom),
            this._currentShownBounds = this._getExpandedVisibleBounds())
        },
        _moveEnd: function() {
            if (!this._inZoomAnimation) {
                var e = this._getExpandedVisibleBounds();
                this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), this._zoom, e),
                this._topClusterLevel._recursivelyAddChildrenToMap(null, Math.round(this._map._zoom), e),
                this._currentShownBounds = e
            }
        },
        _generateInitialClusters: function() {
            var e = Math.ceil(this._map.getMaxZoom())
              , t = Math.floor(this._map.getMinZoom())
              , i = this.options.maxClusterRadius
              , n = i;
            "function" != typeof i && (n = function() {
                return i
            }
            ),
            null !== this.options.disableClusteringAtZoom && (e = this.options.disableClusteringAtZoom - 1),
            this._maxZoom = e,
            this._gridClusters = {},
            this._gridUnclustered = {};
            for (var r = e; r >= t; r--)
                this._gridClusters[r] = new L.DistanceGrid(n(r)),
                this._gridUnclustered[r] = new L.DistanceGrid(n(r));
            this._topClusterLevel = new this._markerCluster(this,t - 1)
        },
        _addLayer: function(e, t) {
            var i, n, r = this._gridClusters, s = this._gridUnclustered, o = Math.floor(this._map.getMinZoom());
            for (this.options.singleMarkerMode && this._overrideMarkerIcon(e),
            e.on(this._childMarkerEventHandlers, this); t >= o; t--) {
                i = this._map.project(e.getLatLng(), t);
                var a = r[t].getNearObject(i);
                if (a)
                    return a._addChild(e),
                    e.__parent = a,
                    void 0;
                if (a = s[t].getNearObject(i)) {
                    var h = a.__parent;
                    h && this._removeLayer(a, !1);
                    var l = new this._markerCluster(this,t,a,e);
                    r[t].addObject(l, this._map.project(l._cLatLng, t)),
                    a.__parent = l,
                    e.__parent = l;
                    var u = l;
                    for (n = t - 1; n > h._zoom; n--)
                        u = new this._markerCluster(this,n,u),
                        r[n].addObject(u, this._map.project(a.getLatLng(), n));
                    return h._addChild(u),
                    this._removeFromGridUnclustered(a, t),
                    void 0
                }
                s[t].addObject(e, i)
            }
            this._topClusterLevel._addChild(e),
            e.__parent = this._topClusterLevel
        },
        _refreshClustersIcons: function() {
            this._featureGroup.eachLayer(function(e) {
                e instanceof L.MarkerCluster && e._iconNeedsUpdate && e._updateIcon()
            })
        },
        _enqueue: function(e) {
            this._queue.push(e),
            this._queueTimeout || (this._queueTimeout = setTimeout(L.bind(this._processQueue, this), 300))
        },
        _processQueue: function() {
            for (var e = 0; e < this._queue.length; e++)
                this._queue[e].call(this);
            this._queue.length = 0,
            clearTimeout(this._queueTimeout),
            this._queueTimeout = null
        },
        _mergeSplitClusters: function() {
            var e = Math.round(this._map._zoom);
            this._processQueue(),
            this._zoom < e && this._currentShownBounds.intersects(this._getExpandedVisibleBounds()) ? (this._animationStart(),
            this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), this._zoom, this._getExpandedVisibleBounds()),
            this._animationZoomIn(this._zoom, e)) : this._zoom > e ? (this._animationStart(),
            this._animationZoomOut(this._zoom, e)) : this._moveEnd()
        },
        _getExpandedVisibleBounds: function() {
            return this.options.removeOutsideVisibleBounds ? L.Browser.mobile ? this._checkBoundsMaxLat(this._map.getBounds()) : this._checkBoundsMaxLat(this._map.getBounds().pad(1)) : this._mapBoundsInfinite
        },
        _checkBoundsMaxLat: function(e) {
            var t = this._maxLat;
            return void 0 !== t && (e.getNorth() >= t && (e._northEast.lat = 1 / 0),
            e.getSouth() <= -t && (e._southWest.lat = -1 / 0)),
            e
        },
        _animationAddLayerNonAnimated: function(e, t) {
            if (t === e)
                this._featureGroup.addLayer(e);
            else if (2 === t._childCount) {
                t._addToMap();
                var i = t.getAllChildMarkers();
                this._featureGroup.removeLayer(i[0]),
                this._featureGroup.removeLayer(i[1])
            } else
                t._updateIcon()
        },
        _extractNonGroupLayers: function(e, t) {
            var i, n = e.getLayers(), r = 0;
            for (t = t || []; r < n.length; r++)
                i = n[r],
                i instanceof L.LayerGroup ? this._extractNonGroupLayers(i, t) : t.push(i);
            return t
        },
        _overrideMarkerIcon: function(e) {
            var t = e.options.icon = this.options.iconCreateFunction({
                getChildCount: function() {
                    return 1
                },
                getAllChildMarkers: function() {
                    return [e]
                }
            });
            return t
        }
    });
    L.MarkerClusterGroup.include({
        _mapBoundsInfinite: new L.LatLngBounds(new L.LatLng(-1 / 0,-1 / 0),new L.LatLng(1 / 0,1 / 0))
    }),
    L.MarkerClusterGroup.include({
        _noAnimation: {
            _animationStart: function() {},
            _animationZoomIn: function(e, t) {
                this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), e),
                this._topClusterLevel._recursivelyAddChildrenToMap(null, t, this._getExpandedVisibleBounds()),
                this.fire("animationend")
            },
            _animationZoomOut: function(e, t) {
                this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), e),
                this._topClusterLevel._recursivelyAddChildrenToMap(null, t, this._getExpandedVisibleBounds()),
                this.fire("animationend")
            },
            _animationAddLayer: function(e, t) {
                this._animationAddLayerNonAnimated(e, t)
            }
        },
        _withAnimation: {
            _animationStart: function() {
                this._map._mapPane.className += " leaflet-cluster-anim",
                this._inZoomAnimation++
            },
            _animationZoomIn: function(e, t) {
                var i, n = this._getExpandedVisibleBounds(), r = this._featureGroup, s = Math.floor(this._map.getMinZoom());
                this._ignoreMove = !0,
                this._topClusterLevel._recursively(n, e, s, function(s) {
                    var o, a = s._latlng, h = s._markers;
                    for (n.contains(a) || (a = null),
                    s._isSingleParent() && e + 1 === t ? (r.removeLayer(s),
                    s._recursivelyAddChildrenToMap(null, t, n)) : (s.clusterHide(),
                    s._recursivelyAddChildrenToMap(a, t, n)),
                    i = h.length - 1; i >= 0; i--)
                        o = h[i],
                        n.contains(o._latlng) || r.removeLayer(o)
                }),
                this._forceLayout(),
                this._topClusterLevel._recursivelyBecomeVisible(n, t),
                r.eachLayer(function(e) {
                    e instanceof L.MarkerCluster || !e._icon || e.clusterShow()
                }),
                this._topClusterLevel._recursively(n, e, t, function(e) {
                    e._recursivelyRestoreChildPositions(t)
                }),
                this._ignoreMove = !1,
                this._enqueue(function() {
                    this._topClusterLevel._recursively(n, e, s, function(e) {
                        r.removeLayer(e),
                        e.clusterShow()
                    }),
                    this._animationEnd()
                })
            },
            _animationZoomOut: function(e, t) {
                this._animationZoomOutSingle(this._topClusterLevel, e - 1, t),
                this._topClusterLevel._recursivelyAddChildrenToMap(null, t, this._getExpandedVisibleBounds()),
                this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), e, this._getExpandedVisibleBounds())
            },
            _animationAddLayer: function(e, t) {
                var i = this
                  , n = this._featureGroup;
                n.addLayer(e),
                t !== e && (t._childCount > 2 ? (t._updateIcon(),
                this._forceLayout(),
                this._animationStart(),
                e._setPos(this._map.latLngToLayerPoint(t.getLatLng())),
                e.clusterHide(),
                this._enqueue(function() {
                    n.removeLayer(e),
                    e.clusterShow(),
                    i._animationEnd()
                })) : (this._forceLayout(),
                i._animationStart(),
                i._animationZoomOutSingle(t, this._map.getMaxZoom(), this._zoom)))
            }
        },
        _animationZoomOutSingle: function(e, t, i) {
            var n = this._getExpandedVisibleBounds()
              , r = Math.floor(this._map.getMinZoom());
            e._recursivelyAnimateChildrenInAndAddSelfToMap(n, r, t + 1, i);
            var s = this;
            this._forceLayout(),
            e._recursivelyBecomeVisible(n, i),
            this._enqueue(function() {
                if (1 === e._childCount) {
                    var o = e._markers[0];
                    this._ignoreMove = !0,
                    o.setLatLng(o.getLatLng()),
                    this._ignoreMove = !1,
                    o.clusterShow && o.clusterShow()
                } else
                    e._recursively(n, i, r, function(e) {
                        e._recursivelyRemoveChildrenFromMap(n, r, t + 1)
                    });
                s._animationEnd()
            })
        },
        _animationEnd: function() {
            this._map && (this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", "")),
            this._inZoomAnimation--,
            this.fire("animationend")
        },
        _forceLayout: function() {
            L.Util.falseFn(document.body.offsetWidth)
        }
    }),
    L.markerClusterGroup = function(e) {
        return new L.MarkerClusterGroup(e)
    }
    ;
    var i = L.MarkerCluster = L.Marker.extend({
        options: L.Icon.prototype.options,
        initialize: function(e, t, i, n) {
            L.Marker.prototype.initialize.call(this, i ? i._cLatLng || i.getLatLng() : new L.LatLng(0,0), {
                icon: this,
                pane: e.options.clusterPane
            }),
            this._group = e,
            this._zoom = t,
            this._markers = [],
            this._childClusters = [],
            this._childCount = 0,
            this._iconNeedsUpdate = !0,
            this._boundsNeedUpdate = !0,
            this._bounds = new L.LatLngBounds,
            i && this._addChild(i),
            n && this._addChild(n)
        },
        getAllChildMarkers: function(e, t) {
            e = e || [];
            for (var i = this._childClusters.length - 1; i >= 0; i--)
                this._childClusters[i].getAllChildMarkers(e);
            for (var n = this._markers.length - 1; n >= 0; n--)
                t && this._markers[n].__dragStart || e.push(this._markers[n]);
            return e
        },
        getChildCount: function() {
            return this._childCount
        },
        zoomToBounds: function(e) {
            for (var t, i = this._childClusters.slice(), n = this._group._map, r = n.getBoundsZoom(this._bounds), s = this._zoom + 1, o = n.getZoom(); i.length > 0 && r > s; ) {
                s++;
                var a = [];
                for (t = 0; t < i.length; t++)
                    a = a.concat(i[t]._childClusters);
                i = a
            }
            r > s ? this._group._map.setView(this._latlng, s) : o >= r ? this._group._map.setView(this._latlng, o + 1) : this._group._map.fitBounds(this._bounds, e)
        },
        getBounds: function() {
            var e = new L.LatLngBounds;
            return e.extend(this._bounds),
            e
        },
        _updateIcon: function() {
            this._iconNeedsUpdate = !0,
            this._icon && this.setIcon(this)
        },
        createIcon: function() {
            return this._iconNeedsUpdate && (this._iconObj = this._group.options.iconCreateFunction(this),
            this._iconNeedsUpdate = !1),
            this._iconObj.createIcon()
        },
        createShadow: function() {
            return this._iconObj.createShadow()
        },
        _addChild: function(e, t) {
            this._iconNeedsUpdate = !0,
            this._boundsNeedUpdate = !0,
            this._setClusterCenter(e),
            e instanceof L.MarkerCluster ? (t || (this._childClusters.push(e),
            e.__parent = this),
            this._childCount += e._childCount) : (t || this._markers.push(e),
            this._childCount++),
            this.__parent && this.__parent._addChild(e, !0)
        },
        _setClusterCenter: function(e) {
            this._cLatLng || (this._cLatLng = e._cLatLng || e._latlng)
        },
        _resetBounds: function() {
            var e = this._bounds;
            e._southWest && (e._southWest.lat = 1 / 0,
            e._southWest.lng = 1 / 0),
            e._northEast && (e._northEast.lat = -1 / 0,
            e._northEast.lng = -1 / 0)
        },
        _recalculateBounds: function() {
            var e, t, i, n, r = this._markers, s = this._childClusters, o = 0, a = 0, h = this._childCount;
            if (0 !== h) {
                for (this._resetBounds(),
                e = 0; e < r.length; e++)
                    i = r[e]._latlng,
                    this._bounds.extend(i),
                    o += i.lat,
                    a += i.lng;
                for (e = 0; e < s.length; e++)
                    t = s[e],
                    t._boundsNeedUpdate && t._recalculateBounds(),
                    this._bounds.extend(t._bounds),
                    i = t._wLatLng,
                    n = t._childCount,
                    o += i.lat * n,
                    a += i.lng * n;
                this._latlng = this._wLatLng = new L.LatLng(o / h,a / h),
                this._boundsNeedUpdate = !1
            }
        },
        _addToMap: function(e) {
            e && (this._backupLatlng = this._latlng,
            this.setLatLng(e)),
            this._group._featureGroup.addLayer(this)
        },
        _recursivelyAnimateChildrenIn: function(e, t, i) {
            this._recursively(e, this._group._map.getMinZoom(), i - 1, function(e) {
                var i, n, r = e._markers;
                for (i = r.length - 1; i >= 0; i--)
                    n = r[i],
                    n._icon && (n._setPos(t),
                    n.clusterHide())
            }, function(e) {
                var i, n, r = e._childClusters;
                for (i = r.length - 1; i >= 0; i--)
                    n = r[i],
                    n._icon && (n._setPos(t),
                    n.clusterHide())
            })
        },
        _recursivelyAnimateChildrenInAndAddSelfToMap: function(e, t, i, n) {
            this._recursively(e, n, t, function(r) {
                r._recursivelyAnimateChildrenIn(e, r._group._map.latLngToLayerPoint(r.getLatLng()).round(), i),
                r._isSingleParent() && i - 1 === n ? (r.clusterShow(),
                r._recursivelyRemoveChildrenFromMap(e, t, i)) : r.clusterHide(),
                r._addToMap()
            })
        },
        _recursivelyBecomeVisible: function(e, t) {
            this._recursively(e, this._group._map.getMinZoom(), t, null, function(e) {
                e.clusterShow()
            })
        },
        _recursivelyAddChildrenToMap: function(e, t, i) {
            this._recursively(i, this._group._map.getMinZoom() - 1, t, function(n) {
                if (t !== n._zoom)
                    for (var r = n._markers.length - 1; r >= 0; r--) {
                        var s = n._markers[r];
                        i.contains(s._latlng) && (e && (s._backupLatlng = s.getLatLng(),
                        s.setLatLng(e),
                        s.clusterHide && s.clusterHide()),
                        n._group._featureGroup.addLayer(s))
                    }
            }, function(t) {
                t._addToMap(e)
            })
        },
        _recursivelyRestoreChildPositions: function(e) {
            for (var t = this._markers.length - 1; t >= 0; t--) {
                var i = this._markers[t];
                i._backupLatlng && (i.setLatLng(i._backupLatlng),
                delete i._backupLatlng)
            }
            if (e - 1 === this._zoom)
                for (var n = this._childClusters.length - 1; n >= 0; n--)
                    this._childClusters[n]._restorePosition();
            else
                for (var r = this._childClusters.length - 1; r >= 0; r--)
                    this._childClusters[r]._recursivelyRestoreChildPositions(e)
        },
        _restorePosition: function() {
            this._backupLatlng && (this.setLatLng(this._backupLatlng),
            delete this._backupLatlng)
        },
        _recursivelyRemoveChildrenFromMap: function(e, t, i, n) {
            var r, s;
            this._recursively(e, t - 1, i - 1, function(e) {
                for (s = e._markers.length - 1; s >= 0; s--)
                    r = e._markers[s],
                    n && n.contains(r._latlng) || (e._group._featureGroup.removeLayer(r),
                    r.clusterShow && r.clusterShow())
            }, function(e) {
                for (s = e._childClusters.length - 1; s >= 0; s--)
                    r = e._childClusters[s],
                    n && n.contains(r._latlng) || (e._group._featureGroup.removeLayer(r),
                    r.clusterShow && r.clusterShow())
            })
        },
        _recursively: function(e, t, i, n, r) {
            var s, o, a = this._childClusters, h = this._zoom;
            if (h >= t && (n && n(this),
            r && h === i && r(this)),
            t > h || i > h)
                for (s = a.length - 1; s >= 0; s--)
                    o = a[s],
                    o._boundsNeedUpdate && o._recalculateBounds(),
                    e.intersects(o._bounds) && o._recursively(e, t, i, n, r)
        },
        _isSingleParent: function() {
            return this._childClusters.length > 0 && this._childClusters[0]._childCount === this._childCount
        }
    });
    L.Marker.include({
        clusterHide: function() {
            var e = this.options.opacity;
            return this.setOpacity(0),
            this.options.opacity = e,
            this
        },
        clusterShow: function() {
            return this.setOpacity(this.options.opacity)
        }
    }),
    L.DistanceGrid = function(e) {
        this._cellSize = e,
        this._sqCellSize = e * e,
        this._grid = {},
        this._objectPoint = {}
    }
    ,
    L.DistanceGrid.prototype = {
        addObject: function(e, t) {
            var i = this._getCoord(t.x)
              , n = this._getCoord(t.y)
              , r = this._grid
              , s = r[n] = r[n] || {}
              , o = s[i] = s[i] || []
              , a = L.Util.stamp(e);
            this._objectPoint[a] = t,
            o.push(e)
        },
        updateObject: function(e, t) {
            this.removeObject(e),
            this.addObject(e, t)
        },
        removeObject: function(e, t) {
            var i, n, r = this._getCoord(t.x), s = this._getCoord(t.y), o = this._grid, a = o[s] = o[s] || {}, h = a[r] = a[r] || [];
            for (delete this._objectPoint[L.Util.stamp(e)],
            i = 0,
            n = h.length; n > i; i++)
                if (h[i] === e)
                    return h.splice(i, 1),
                    1 === n && delete a[r],
                    !0
        },
        eachObject: function(e, t) {
            var i, n, r, s, o, a, h, l = this._grid;
            for (i in l) {
                o = l[i];
                for (n in o)
                    for (a = o[n],
                    r = 0,
                    s = a.length; s > r; r++)
                        h = e.call(t, a[r]),
                        h && (r--,
                        s--)
            }
        },
        getNearObject: function(e) {
            var t, i, n, r, s, o, a, h, l = this._getCoord(e.x), u = this._getCoord(e.y), _ = this._objectPoint, d = this._sqCellSize, c = null;
            for (t = u - 1; u + 1 >= t; t++)
                if (r = this._grid[t])
                    for (i = l - 1; l + 1 >= i; i++)
                        if (s = r[i])
                            for (n = 0,
                            o = s.length; o > n; n++)
                                a = s[n],
                                h = this._sqDist(_[L.Util.stamp(a)], e),
                                (d > h || d >= h && null === c) && (d = h,
                                c = a);
            return c
        },
        _getCoord: function(e) {
            var t = Math.floor(e / this._cellSize);
            return isFinite(t) ? t : e
        },
        _sqDist: function(e, t) {
            var i = t.x - e.x
              , n = t.y - e.y;
            return i * i + n * n
        }
    },
    function() {
        L.QuickHull = {
            getDistant: function(e, t) {
                var i = t[1].lat - t[0].lat
                  , n = t[0].lng - t[1].lng;
                return n * (e.lat - t[0].lat) + i * (e.lng - t[0].lng)
            },
            findMostDistantPointFromBaseLine: function(e, t) {
                var i, n, r, s = 0, o = null, a = [];
                for (i = t.length - 1; i >= 0; i--)
                    n = t[i],
                    r = this.getDistant(n, e),
                    r > 0 && (a.push(n),
                    r > s && (s = r,
                    o = n));
                return {
                    maxPoint: o,
                    newPoints: a
                }
            },
            buildConvexHull: function(e, t) {
                var i = []
                  , n = this.findMostDistantPointFromBaseLine(e, t);
                return n.maxPoint ? (i = i.concat(this.buildConvexHull([e[0], n.maxPoint], n.newPoints)),
                i = i.concat(this.buildConvexHull([n.maxPoint, e[1]], n.newPoints))) : [e[0]]
            },
            getConvexHull: function(e) {
                var t, i = !1, n = !1, r = !1, s = !1, o = null, a = null, h = null, l = null, u = null, _ = null;
                for (t = e.length - 1; t >= 0; t--) {
                    var d = e[t];
                    (i === !1 || d.lat > i) && (o = d,
                    i = d.lat),
                    (n === !1 || d.lat < n) && (a = d,
                    n = d.lat),
                    (r === !1 || d.lng > r) && (h = d,
                    r = d.lng),
                    (s === !1 || d.lng < s) && (l = d,
                    s = d.lng)
                }
                n !== i ? (_ = a,
                u = o) : (_ = l,
                u = h);
                var c = [].concat(this.buildConvexHull([_, u], e), this.buildConvexHull([u, _], e));
                return c
            }
        }
    }(),
    L.MarkerCluster.include({
        getConvexHull: function() {
            var e, t, i = this.getAllChildMarkers(), n = [];
            for (t = i.length - 1; t >= 0; t--)
                e = i[t].getLatLng(),
                n.push(e);
            return L.QuickHull.getConvexHull(n)
        }
    }),
    L.MarkerCluster.include({
        _2PI: 2 * Math.PI,
        _circleFootSeparation: 25,
        _circleStartAngle: 0,
        _spiralFootSeparation: 28,
        _spiralLengthStart: 11,
        _spiralLengthFactor: 5,
        _circleSpiralSwitchover: 9,
        spiderfy: function() {
            if (this._group._spiderfied !== this && !this._group._inZoomAnimation) {
                var e, t = this.getAllChildMarkers(null, !0), i = this._group, n = i._map, r = n.latLngToLayerPoint(this._latlng);
                this._group._unspiderfy(),
                this._group._spiderfied = this,
                t.length >= this._circleSpiralSwitchover ? e = this._generatePointsSpiral(t.length, r) : (r.y += 10,
                e = this._generatePointsCircle(t.length, r)),
                this._animationSpiderfy(t, e)
            }
        },
        unspiderfy: function(e) {
            this._group._inZoomAnimation || (this._animationUnspiderfy(e),
            this._group._spiderfied = null)
        },
        _generatePointsCircle: function(e, t) {
            var i, n, r = this._group.options.spiderfyDistanceMultiplier * this._circleFootSeparation * (2 + e), s = r / this._2PI, o = this._2PI / e, a = [];
            for (s = Math.max(s, 35),
            a.length = e,
            i = 0; e > i; i++)
                n = this._circleStartAngle + i * o,
                a[i] = new L.Point(t.x + s * Math.cos(n),t.y + s * Math.sin(n))._round();
            return a
        },
        _generatePointsSpiral: function(e, t) {
            var i, n = this._group.options.spiderfyDistanceMultiplier, r = n * this._spiralLengthStart, s = n * this._spiralFootSeparation, o = n * this._spiralLengthFactor * this._2PI, a = 0, h = [];
            for (h.length = e,
            i = e; i >= 0; i--)
                e > i && (h[i] = new L.Point(t.x + r * Math.cos(a),t.y + r * Math.sin(a))._round()),
                a += s / r + 5e-4 * i,
                r += o / a;
            return h
        },
        _noanimationUnspiderfy: function() {
            var e, t, i = this._group, n = i._map, r = i._featureGroup, s = this.getAllChildMarkers(null, !0);
            for (i._ignoreMove = !0,
            this.setOpacity(1),
            t = s.length - 1; t >= 0; t--)
                e = s[t],
                r.removeLayer(e),
                e._preSpiderfyLatlng && (e.setLatLng(e._preSpiderfyLatlng),
                delete e._preSpiderfyLatlng),
                e.setZIndexOffset && e.setZIndexOffset(0),
                e._spiderLeg && (n.removeLayer(e._spiderLeg),
                delete e._spiderLeg);
            i.fire("unspiderfied", {
                cluster: this,
                markers: s
            }),
            i._ignoreMove = !1,
            i._spiderfied = null
        }
    }),
    L.MarkerClusterNonAnimated = L.MarkerCluster.extend({
        _animationSpiderfy: function(e, t) {
            var i, n, r, s, o = this._group, a = o._map, h = o._featureGroup, l = this._group.options.spiderLegPolylineOptions;
            for (o._ignoreMove = !0,
            i = 0; i < e.length; i++)
                s = a.layerPointToLatLng(t[i]),
                n = e[i],
                r = new L.Polyline([this._latlng, s],l),
                a.addLayer(r),
                n._spiderLeg = r,
                n._preSpiderfyLatlng = n._latlng,
                n.setLatLng(s),
                n.setZIndexOffset && n.setZIndexOffset(1e6),
                h.addLayer(n);
            this.setOpacity(.3),
            o._ignoreMove = !1,
            o.fire("spiderfied", {
                cluster: this,
                markers: e
            })
        },
        _animationUnspiderfy: function() {
            this._noanimationUnspiderfy()
        }
    }),
    L.MarkerCluster.include({
        _animationSpiderfy: function(e, t) {
            var i, n, r, s, o, a, h = this, l = this._group, u = l._map, _ = l._featureGroup, d = this._latlng, c = u.latLngToLayerPoint(d), p = L.Path.SVG, f = L.extend({}, this._group.options.spiderLegPolylineOptions), m = f.opacity;
            for (void 0 === m && (m = L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity),
            p ? (f.opacity = 0,
            f.className = (f.className || "") + " leaflet-cluster-spider-leg") : f.opacity = m,
            l._ignoreMove = !0,
            i = 0; i < e.length; i++)
                n = e[i],
                a = u.layerPointToLatLng(t[i]),
                r = new L.Polyline([d, a],f),
                u.addLayer(r),
                n._spiderLeg = r,
                p && (s = r._path,
                o = s.getTotalLength() + .1,
                s.style.strokeDasharray = o,
                s.style.strokeDashoffset = o),
                n.setZIndexOffset && n.setZIndexOffset(1e6),
                n.clusterHide && n.clusterHide(),
                _.addLayer(n),
                n._setPos && n._setPos(c);
            for (l._forceLayout(),
            l._animationStart(),
            i = e.length - 1; i >= 0; i--)
                a = u.layerPointToLatLng(t[i]),
                n = e[i],
                n._preSpiderfyLatlng = n._latlng,
                n.setLatLng(a),
                n.clusterShow && n.clusterShow(),
                p && (r = n._spiderLeg,
                s = r._path,
                s.style.strokeDashoffset = 0,
                r.setStyle({
                    opacity: m
                }));
            this.setOpacity(.3),
            l._ignoreMove = !1,
            setTimeout(function() {
                l._animationEnd(),
                l.fire("spiderfied", {
                    cluster: h,
                    markers: e
                })
            }, 200)
        },
        _animationUnspiderfy: function(e) {
            var t, i, n, r, s, o, a = this, h = this._group, l = h._map, u = h._featureGroup, _ = e ? l._latLngToNewLayerPoint(this._latlng, e.zoom, e.center) : l.latLngToLayerPoint(this._latlng), d = this.getAllChildMarkers(null, !0), c = L.Path.SVG;
            for (h._ignoreMove = !0,
            h._animationStart(),
            this.setOpacity(1),
            i = d.length - 1; i >= 0; i--)
                t = d[i],
                t._preSpiderfyLatlng && (t.closePopup(),
                t.setLatLng(t._preSpiderfyLatlng),
                delete t._preSpiderfyLatlng,
                o = !0,
                t._setPos && (t._setPos(_),
                o = !1),
                t.clusterHide && (t.clusterHide(),
                o = !1),
                o && u.removeLayer(t),
                c && (n = t._spiderLeg,
                r = n._path,
                s = r.getTotalLength() + .1,
                r.style.strokeDashoffset = s,
                n.setStyle({
                    opacity: 0
                })));
            h._ignoreMove = !1,
            setTimeout(function() {
                var e = 0;
                for (i = d.length - 1; i >= 0; i--)
                    t = d[i],
                    t._spiderLeg && e++;
                for (i = d.length - 1; i >= 0; i--)
                    t = d[i],
                    t._spiderLeg && (t.clusterShow && t.clusterShow(),
                    t.setZIndexOffset && t.setZIndexOffset(0),
                    e > 1 && u.removeLayer(t),
                    l.removeLayer(t._spiderLeg),
                    delete t._spiderLeg);
                h._animationEnd(),
                h.fire("unspiderfied", {
                    cluster: a,
                    markers: d
                })
            }, 200)
        }
    }),
    L.MarkerClusterGroup.include({
        _spiderfied: null,
        unspiderfy: function() {
            this._unspiderfy.apply(this, arguments)
        },
        _spiderfierOnAdd: function() {
            this._map.on("click", this._unspiderfyWrapper, this),
            this._map.options.zoomAnimation && this._map.on("zoomstart", this._unspiderfyZoomStart, this),
            this._map.on("zoomend", this._noanimationUnspiderfy, this),
            L.Browser.touch || this._map.getRenderer(this)
        },
        _spiderfierOnRemove: function() {
            this._map.off("click", this._unspiderfyWrapper, this),
            this._map.off("zoomstart", this._unspiderfyZoomStart, this),
            this._map.off("zoomanim", this._unspiderfyZoomAnim, this),
            this._map.off("zoomend", this._noanimationUnspiderfy, this),
            this._noanimationUnspiderfy()
        },
        _unspiderfyZoomStart: function() {
            this._map && this._map.on("zoomanim", this._unspiderfyZoomAnim, this)
        },
        _unspiderfyZoomAnim: function(e) {
            L.DomUtil.hasClass(this._map._mapPane, "leaflet-touching") || (this._map.off("zoomanim", this._unspiderfyZoomAnim, this),
            this._unspiderfy(e))
        },
        _unspiderfyWrapper: function() {
            this._unspiderfy()
        },
        _unspiderfy: function(e) {
            this._spiderfied && this._spiderfied.unspiderfy(e)
        },
        _noanimationUnspiderfy: function() {
            this._spiderfied && this._spiderfied._noanimationUnspiderfy()
        },
        _unspiderfyLayer: function(e) {
            e._spiderLeg && (this._featureGroup.removeLayer(e),
            e.clusterShow && e.clusterShow(),
            e.setZIndexOffset && e.setZIndexOffset(0),
            this._map.removeLayer(e._spiderLeg),
            delete e._spiderLeg)
        }
    }),
    L.MarkerClusterGroup.include({
        refreshClusters: function(e) {
            return e ? e instanceof L.MarkerClusterGroup ? e = e._topClusterLevel.getAllChildMarkers() : e instanceof L.LayerGroup ? e = e._layers : e instanceof L.MarkerCluster ? e = e.getAllChildMarkers() : e instanceof L.Marker && (e = [e]) : e = this._topClusterLevel.getAllChildMarkers(),
            this._flagParentsIconsNeedUpdate(e),
            this._refreshClustersIcons(),
            this.options.singleMarkerMode && this._refreshSingleMarkerModeMarkers(e),
            this
        },
        _flagParentsIconsNeedUpdate: function(e) {
            var t, i;
            for (t in e)
                for (i = e[t].__parent; i; )
                    i._iconNeedsUpdate = !0,
                    i = i.__parent
        },
        _refreshSingleMarkerModeMarkers: function(e) {
            var t, i;
            for (t in e)
                i = e[t],
                this.hasLayer(i) && i.setIcon(this._overrideMarkerIcon(i))
        }
    }),
    L.Marker.include({
        refreshIconOptions: function(e, t) {
            var i = this.options.icon;
            return L.setOptions(i, e),
            this.setIcon(i),
            t && this.__parent && this.__parent._group.refreshClusters(this),
            this
        }
    }),
    e.MarkerClusterGroup = t,
    e.MarkerCluster = i
});
;;let p = function() {
    let c = this;
    c.ctn = $('.evo-tooltip');
    c.init = function(data) {
        c.setPopupData(data);
        c.initSlick();
        c.initEvents();
    }
    ;
    c.helpers = {
        'panSlickImage': function() {
            $("body > .panWrapper").remove();
            let slickImgContainer = $('.slick-lightbox-slick-item-inner');
            slickImgContainer.each(function(idx, elem) {
                let imgContainer = $(elem);
                let slickImg = imgContainer.find('.slick-lightbox-slick-img:eq(0)');
                let slickImgSrc = slickImg.attr('src');
                imgContainer.attr('data-big', slickImgSrc);
                imgContainer.pan();
            });
        }
    };
    c.initSlick = function() {
        let mainImg = $('.main-image-c');
        let imgCtn = $('.image-c');
        if (mainImg.children().length == 0) {
            mainImg.css('background-image', 'url(/img/images/no-image-found.jpg)');
            $('.document-view .gallery').css('height', '100%');
        } else {
            mainImg.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                asNavFor: '.image-c',
                fade: true
            });
            mainImg.slickLightbox({
                itemSelector: 'a',
                navigateKeyboard: true
            }).on({
                'shown.slickLightbox': c.helpers['panSlickImage']
            });
            imgCtn.slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                centerPadding: '60px',
                centerMode: true,
                focusOnSelect: true,
                asNavFor: '.main-image-c',
                arrows: true,
                dots: true,
                prevArrow: '<div class="prev"></div>',
                nextArrow: '<div class="next"></div>',
                responsive: [{
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                }]
            });
        }
        setTimeout(function() {
            $("body").removeClass("loading-overlay-open");
        }, 1000);
    }
    ;
    c.initEvents = function() {
        $('.close').on('click', function() {
            $("body").removeClass('tooltip-open');
            c.ctn.children().remove();
        });
    }
    ;
    c.setPopupData = function(data) {
        c.ctn.html(data);
        $("body").addClass('tooltip-open');
    }
    ;
    return c;
};
let iconDangerous = L.divIcon({
    className: 'evo-map-icon icon-dangerous'
});
let iconMarker = L.divIcon({
    className: 'evo-map-icon icon-marker'
});
let iconMonuments = L.divIcon({
    className: 'evo-map-icon icon-monuments'
});
var zoom = 15;
var cluster_markers;
var map_layers = [];
streetmap_layer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
map_layers.push(streetmap_layer);
cluster_markers = L.markerClusterGroup({
    disableClusteringAtZoom: 17,
    spiderfyOnMaxZoom: false,
    maxClusterRadius: 100,
    showCoverageOnHover: false,
});
jj
var dangerous_layer = [];
var monument_layer = [];
var icon_layer = [];

for (let i = 0; i < places.length; i++) {
    var place_type = places[i].type;
    if (places[i].type == undefined)
        place_type = 'imobile';
    let icon_styling = '';
    switch (place_type) {
    case 'dangerous':
        icon_styling = iconDangerous;
        break;
    case 'monuments':
        icon_styling = iconMonuments;
        break;
    case 'imobile':
        icon_styling = iconMarker;
    }
    let marker = L.marker([places[i].lat, places[i].lng], {
        icon: icon_styling,
        riseOnHover: true,
        riseOffset: 9999
    });
    switch (place_type) {
    case 'dangerous':
        dangerous_layer.push(marker);
        break;
    case 'monuments':
        monument_layer.push(marker);
        break;
    case 'imobile':
        icon_layer.push(marker);
    }
    html = "<div id='place-id-" + places[i].id + "' class='evo-icon-popup'></div>";
    marker.bindPopup(html, {
        'closeButton': false,
        'maxWidth': 300,
    });
    if ($(window).width() > 1025) {
        marker.on('mouseover', function() {
            marker.openPopup();
            $.ajax({
                url: '/map/popup-preview',
                method: 'GET',
                data: {
                    id: places[i].id
                },
                success: function(data) {
                    $("#place-id-" + places[i].id).html(data);
                }
            })
        });
        marker.on('mouseout', function() {
            marker.closePopup();
        });
    }
    marker.addTo(cluster_markers).on('click', (function(i, marker) {
        return function() {
            $("body").addClass("loading-overlay-open");
            $.ajax({
                type: "POST",
                url: '/map/document-details',
                data: {
                    id: places[i].id
                },
                success: function(data) {
                    window.evoPopup = p().init(data);
                }
            });
        }
    }
    )(i, marker));
}

dangerous_group = L.featureGroup(dangerous_layer);
monument_group = L.featureGroup(monument_layer);
icon_group = L.featureGroup(icon_layer);
cluster_markers.addLayer(dangerous_group);
cluster_markers.addLayer(monument_group);
cluster_markers.addLayer(icon_group);
map_layers.push(cluster_markers);
map_layers.push(streetmap_layer);
let drawnItems = new L.FeatureGroup();
map_layers.push(drawnItems);

for (let i = 0; i < areas.length; i++) {
    let area_polygon = L.polygon(areas[i].coordinates, {
        color: areas[i].backgroundColor,
        fillOpacity: 0.3
    });
    area_polygon.on('mouseover', function() {
        this.setStyle({
            fillOpacity: 0.4,
            color: areas[i].backgroundColor
        });
    });
    area_polygon.on('mouseout', function() {
        this.setStyle({
            fillOpacity: 0.3,
            color: areas[i].backgroundColor
        });
    });
    drawnItems.addLayer(area_polygon);
}

var map = L.map('mapdiv', {
    drawControl: true,
    zoomSnap: 0.2,
    zoomDelta: 0.2,
    layers: map_layers
}).setView([44.434073, 26.116179], zoom);
map.fitBounds(cluster_markers.getBounds());
console.log(map_layers);
$('input.filter_check').on('click', function() {
    name_map = {
        "Alerte": dangerous_group,
        "Monumente istorice": monument_group,
        "Imobile": icon_group
    }
    clicked = $(this).attr('name');
    console.log($(this));
    show = $(this)[0].checked;
    if (show) {
        console.log(name_map[clicked]);
        cluster_markers.addLayer(name_map[clicked]);
    } else {
        console.log(name_map[clicked]);
        cluster_markers.removeLayer(name_map[clicked]);
    }
});
exclusiveAttribute.forEach(function(elementArray) {
    elementArray.forEach(function(element) {
        $('body').on('change', '#filter-' + element + ' > select ', function() {
            if ($(this).val() && $(this).val().length > 0) {
                elementArray.forEach(function(e) {
                    if (!(e == element)) {
                        $('#filter-' + e + ' > select ').val('');
                        $('#filter-' + e + ' > select ').attr('disabled', 'disabled')
                    }
                });
            } else {
                elementArray.forEach(function(e) {
                    if (!(e == element)) {
                        $('#filter-' + e + ' > select ').val('');
                        $('#filter-' + e + ' > select ').attr('disabled', false)
                    }
                });
            }
        });
    })
});
;;/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */
if (typeof jQuery === 'undefined') {
    throw new Error('Bootstrap\'s JavaScript requires jQuery')
}
+function($) {
    'use strict';
    var version = $.fn.jquery.split(' ')[0].split('.')
    if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
        throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
    }
}(jQuery);
+function($) {
    'use strict';
    function transitionEnd() {
        var el = document.createElement('bootstrap')
        var transEndEventNames = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        }
        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return {
                    end: transEndEventNames[name]
                }
            }
        }
        return false
    }
    $.fn.emulateTransitionEnd = function(duration) {
        var called = false
        var $el = this
        $(this).one('bsTransitionEnd', function() {
            called = true
        })
        var callback = function() {
            if (!called)
                $($el).trigger($.support.transition.end)
        }
        setTimeout(callback, duration)
        return this
    }
    $(function() {
        $.support.transition = transitionEnd()
        if (!$.support.transition)
            return
        $.event.special.bsTransitionEnd = {
            bindType: $.support.transition.end,
            delegateType: $.support.transition.end,
            handle: function(e) {
                if ($(e.target).is(this))
                    return e.handleObj.handler.apply(this, arguments)
            }
        }
    })
}(jQuery);
+function($) {
    'use strict';
    var dismiss = '[data-dismiss="alert"]'
    var Alert = function(el) {
        $(el).on('click', dismiss, this.close)
    }
    Alert.VERSION = '3.3.7'
    Alert.TRANSITION_DURATION = 150
    Alert.prototype.close = function(e) {
        var $this = $(this)
        var selector = $this.attr('data-target')
        if (!selector) {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '')
        }
        var $parent = $(selector === '#' ? [] : selector)
        if (e)
            e.preventDefault()
        if (!$parent.length) {
            $parent = $this.closest('.alert')
        }
        $parent.trigger(e = $.Event('close.bs.alert'))
        if (e.isDefaultPrevented())
            return
        $parent.removeClass('in')
        function removeElement() {
            $parent.detach().trigger('closed.bs.alert').remove()
        }
        $.support.transition && $parent.hasClass('fade') ? $parent.one('bsTransitionEnd', removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION) : removeElement()
    }
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.alert')
            if (!data)
                $this.data('bs.alert', (data = new Alert(this)))
            if (typeof option == 'string')
                data[option].call($this)
        })
    }
    var old = $.fn.alert
    $.fn.alert = Plugin
    $.fn.alert.Constructor = Alert
    $.fn.alert.noConflict = function() {
        $.fn.alert = old
        return this
    }
    $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)
}(jQuery);
+function($) {
    'use strict';
    var Button = function(element, options) {
        this.$element = $(element)
        this.options = $.extend({}, Button.DEFAULTS, options)
        this.isLoading = false
    }
    Button.VERSION = '3.3.7'
    Button.DEFAULTS = {
        loadingText: 'loading...'
    }
    Button.prototype.setState = function(state) {
        var d = 'disabled'
        var $el = this.$element
        var val = $el.is('input') ? 'val' : 'html'
        var data = $el.data()
        state += 'Text'
        if (data.resetText == null)
            $el.data('resetText', $el[val]())
        setTimeout($.proxy(function() {
            $el[val](data[state] == null ? this.options[state] : data[state])
            if (state == 'loadingText') {
                this.isLoading = true
                $el.addClass(d).attr(d, d).prop(d, true)
            } else if (this.isLoading) {
                this.isLoading = false
                $el.removeClass(d).removeAttr(d).prop(d, false)
            }
        }, this), 0)
    }
    Button.prototype.toggle = function() {
        var changed = true
        var $parent = this.$element.closest('[data-toggle="buttons"]')
        if ($parent.length) {
            var $input = this.$element.find('input')
            if ($input.prop('type') == 'radio') {
                if ($input.prop('checked'))
                    changed = false
                $parent.find('.active').removeClass('active')
                this.$element.addClass('active')
            } else if ($input.prop('type') == 'checkbox') {
                if (($input.prop('checked')) !== this.$element.hasClass('active'))
                    changed = false
                this.$element.toggleClass('active')
            }
            $input.prop('checked', this.$element.hasClass('active'))
            if (changed)
                $input.trigger('change')
        } else {
            this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
            this.$element.toggleClass('active')
        }
    }
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.button')
            var options = typeof option == 'object' && option
            if (!data)
                $this.data('bs.button', (data = new Button(this,options)))
            if (option == 'toggle')
                data.toggle()
            else if (option)
                data.setState(option)
        })
    }
    var old = $.fn.button
    $.fn.button = Plugin
    $.fn.button.Constructor = Button
    $.fn.button.noConflict = function() {
        $.fn.button = old
        return this
    }
    $(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function(e) {
        var $btn = $(e.target).closest('.btn')
        Plugin.call($btn, 'toggle')
        if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
            e.preventDefault()
            if ($btn.is('input,button'))
                $btn.trigger('focus')
            else
                $btn.find('input:visible,button:visible').first().trigger('focus')
        }
    }).on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function(e) {
        $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })
}(jQuery);
+function($) {
    'use strict';
    var Carousel = function(element, options) {
        this.$element = $(element)
        this.$indicators = this.$element.find('.carousel-indicators')
        this.options = options
        this.paused = null
        this.sliding = null
        this.interval = null
        this.$active = null
        this.$items = null
        this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))
        this.options.pause == 'hover' && !('ontouchstart'in document.documentElement) && this.$element.on('mouseenter.bs.carousel', $.proxy(this.pause, this)).on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
    }
    Carousel.VERSION = '3.3.7'
    Carousel.TRANSITION_DURATION = 600
    Carousel.DEFAULTS = {
        interval: 5000,
        pause: 'hover',
        wrap: true,
        keyboard: true
    }
    Carousel.prototype.keydown = function(e) {
        if (/input|textarea/i.test(e.target.tagName))
            return
        switch (e.which) {
        case 37:
            this.prev();
            break
        case 39:
            this.next();
            break
        default:
            return
        }
        e.preventDefault()
    }
    Carousel.prototype.cycle = function(e) {
        e || (this.paused = false)
        this.interval && clearInterval(this.interval)
        this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
        return this
    }
    Carousel.prototype.getItemIndex = function(item) {
        this.$items = item.parent().children('.item')
        return this.$items.index(item || this.$active)
    }
    Carousel.prototype.getItemForDirection = function(direction, active) {
        var activeIndex = this.getItemIndex(active)
        var willWrap = (direction == 'prev' && activeIndex === 0) || (direction == 'next' && activeIndex == (this.$items.length - 1))
        if (willWrap && !this.options.wrap)
            return active
        var delta = direction == 'prev' ? -1 : 1
        var itemIndex = (activeIndex + delta) % this.$items.length
        return this.$items.eq(itemIndex)
    }
    Carousel.prototype.to = function(pos) {
        var that = this
        var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))
        if (pos > (this.$items.length - 1) || pos < 0)
            return
        if (this.sliding)
            return this.$element.one('slid.bs.carousel', function() {
                that.to(pos)
            })
        if (activeIndex == pos)
            return this.pause().cycle()
        return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
    }
    Carousel.prototype.pause = function(e) {
        e || (this.paused = true)
        if (this.$element.find('.next, .prev').length && $.support.transition) {
            this.$element.trigger($.support.transition.end)
            this.cycle(true)
        }
        this.interval = clearInterval(this.interval)
        return this
    }
    Carousel.prototype.next = function() {
        if (this.sliding)
            return
        return this.slide('next')
    }
    Carousel.prototype.prev = function() {
        if (this.sliding)
            return
        return this.slide('prev')
    }
    Carousel.prototype.slide = function(type, next) {
        var $active = this.$element.find('.item.active')
        var $next = next || this.getItemForDirection(type, $active)
        var isCycling = this.interval
        var direction = type == 'next' ? 'left' : 'right'
        var that = this
        if ($next.hasClass('active'))
            return (this.sliding = false)
        var relatedTarget = $next[0]
        var slideEvent = $.Event('slide.bs.carousel', {
            relatedTarget: relatedTarget,
            direction: direction
        })
        this.$element.trigger(slideEvent)
        if (slideEvent.isDefaultPrevented())
            return
        this.sliding = true
        isCycling && this.pause()
        if (this.$indicators.length) {
            this.$indicators.find('.active').removeClass('active')
            var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
            $nextIndicator && $nextIndicator.addClass('active')
        }
        var slidEvent = $.Event('slid.bs.carousel', {
            relatedTarget: relatedTarget,
            direction: direction
        })
        if ($.support.transition && this.$element.hasClass('slide')) {
            $next.addClass(type)
            $next[0].offsetWidth
            $active.addClass(direction)
            $next.addClass(direction)
            $active.one('bsTransitionEnd', function() {
                $next.removeClass([type, direction].join(' ')).addClass('active')
                $active.removeClass(['active', direction].join(' '))
                that.sliding = false
                setTimeout(function() {
                    that.$element.trigger(slidEvent)
                }, 0)
            }).emulateTransitionEnd(Carousel.TRANSITION_DURATION)
        } else {
            $active.removeClass('active')
            $next.addClass('active')
            this.sliding = false
            this.$element.trigger(slidEvent)
        }
        isCycling && this.cycle()
        return this
    }
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.carousel')
            var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
            var action = typeof option == 'string' ? option : options.slide
            if (!data)
                $this.data('bs.carousel', (data = new Carousel(this,options)))
            if (typeof option == 'number')
                data.to(option)
            else if (action)
                data[action]()
            else if (options.interval)
                data.pause().cycle()
        })
    }
    var old = $.fn.carousel
    $.fn.carousel = Plugin
    $.fn.carousel.Constructor = Carousel
    $.fn.carousel.noConflict = function() {
        $.fn.carousel = old
        return this
    }
    var clickHandler = function(e) {
        var href
        var $this = $(this)
        var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''))
        if (!$target.hasClass('carousel'))
            return
        var options = $.extend({}, $target.data(), $this.data())
        var slideIndex = $this.attr('data-slide-to')
        if (slideIndex)
            options.interval = false
        Plugin.call($target, options)
        if (slideIndex) {
            $target.data('bs.carousel').to(slideIndex)
        }
        e.preventDefault()
    }
    $(document).on('click.bs.carousel.data-api', '[data-slide]', clickHandler).on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)
    $(window).on('load', function() {
        $('[data-ride="carousel"]').each(function() {
            var $carousel = $(this)
            Plugin.call($carousel, $carousel.data())
        })
    })
}(jQuery);
+function($) {
    'use strict';
    var Collapse = function(element, options) {
        this.$element = $(element)
        this.options = $.extend({}, Collapse.DEFAULTS, options)
        this.$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],' + '[data-toggle="collapse"][data-target="#' + element.id + '"]')
        this.transitioning = null
        if (this.options.parent) {
            this.$parent = this.getParent()
        } else {
            this.addAriaAndCollapsedClass(this.$element, this.$trigger)
        }
        if (this.options.toggle)
            this.toggle()
    }
    Collapse.VERSION = '3.3.7'
    Collapse.TRANSITION_DURATION = 350
    Collapse.DEFAULTS = {
        toggle: true
    }
    Collapse.prototype.dimension = function() {
        var hasWidth = this.$element.hasClass('width')
        return hasWidth ? 'width' : 'height'
    }
    Collapse.prototype.show = function() {
        if (this.transitioning || this.$element.hasClass('in'))
            return
        var activesData
        var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')
        if (actives && actives.length) {
            activesData = actives.data('bs.collapse')
            if (activesData && activesData.transitioning)
                return
        }
        var startEvent = $.Event('show.bs.collapse')
        this.$element.trigger(startEvent)
        if (startEvent.isDefaultPrevented())
            return
        if (actives && actives.length) {
            Plugin.call(actives, 'hide')
            activesData || actives.data('bs.collapse', null)
        }
        var dimension = this.dimension()
        this.$element.removeClass('collapse').addClass('collapsing')[dimension](0).attr('aria-expanded', true)
        this.$trigger.removeClass('collapsed').attr('aria-expanded', true)
        this.transitioning = 1
        var complete = function() {
            this.$element.removeClass('collapsing').addClass('collapse in')[dimension]('')
            this.transitioning = 0
            this.$element.trigger('shown.bs.collapse')
        }
        if (!$.support.transition)
            return complete.call(this)
        var scrollSize = $.camelCase(['scroll', dimension].join('-'))
        this.$element.one('bsTransitionEnd', $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
    }
    Collapse.prototype.hide = function() {
        if (this.transitioning || !this.$element.hasClass('in'))
            return
        var startEvent = $.Event('hide.bs.collapse')
        this.$element.trigger(startEvent)
        if (startEvent.isDefaultPrevented())
            return
        var dimension = this.dimension()
        this.$element[dimension](this.$element[dimension]())[0].offsetHeight
        this.$element.addClass('collapsing').removeClass('collapse in').attr('aria-expanded', false)
        this.$trigger.addClass('collapsed').attr('aria-expanded', false)
        this.transitioning = 1
        var complete = function() {
            this.transitioning = 0
            this.$element.removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse')
        }
        if (!$.support.transition)
            return complete.call(this)
        this.$element[dimension](0).one('bsTransitionEnd', $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)
    }
    Collapse.prototype.toggle = function() {
        this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }
    Collapse.prototype.getParent = function() {
        return $(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function(i, element) {
            var $element = $(element)
            this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
        }, this)).end()
    }
    Collapse.prototype.addAriaAndCollapsedClass = function($element, $trigger) {
        var isOpen = $element.hasClass('in')
        $element.attr('aria-expanded', isOpen)
        $trigger.toggleClass('collapsed', !isOpen).attr('aria-expanded', isOpen)
    }
    function getTargetFromTrigger($trigger) {
        var href
        var target = $trigger.attr('data-target') || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')
        return $(target)
    }
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.collapse')
            var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)
            if (!data && options.toggle && /show|hide/.test(option))
                options.toggle = false
            if (!data)
                $this.data('bs.collapse', (data = new Collapse(this,options)))
            if (typeof option == 'string')
                data[option]()
        })
    }
    var old = $.fn.collapse
    $.fn.collapse = Plugin
    $.fn.collapse.Constructor = Collapse
    $.fn.collapse.noConflict = function() {
        $.fn.collapse = old
        return this
    }
    $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function(e) {
        var $this = $(this)
        if (!$this.attr('data-target'))
            e.preventDefault()
        var $target = getTargetFromTrigger($this)
        var data = $target.data('bs.collapse')
        var option = data ? 'toggle' : $this.data()
        Plugin.call($target, option)
    })
}(jQuery);
+function($) {
    'use strict';
    var backdrop = '.dropdown-backdrop'
    var toggle = '[data-toggle="dropdown"]'
    var Dropdown = function(element) {
        $(element).on('click.bs.dropdown', this.toggle)
    }
    Dropdown.VERSION = '3.3.7'
    function getParent($this) {
        var selector = $this.attr('data-target')
        if (!selector) {
            selector = $this.attr('href')
            selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '')
        }
        var $parent = selector && $(selector)
        return $parent && $parent.length ? $parent : $this.parent()
    }
    function clearMenus(e) {
        if (e && e.which === 3)
            return
        $(backdrop).remove()
        $(toggle).each(function() {
            var $this = $(this)
            var $parent = getParent($this)
            var relatedTarget = {
                relatedTarget: this
            }
            if (!$parent.hasClass('open'))
                return
            if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target))
                return
            $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
            if (e.isDefaultPrevented())
                return
            $this.attr('aria-expanded', 'false')
            $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
        })
    }
    Dropdown.prototype.toggle = function(e) {
        var $this = $(this)
        if ($this.is('.disabled, :disabled'))
            return
        var $parent = getParent($this)
        var isActive = $parent.hasClass('open')
        clearMenus()
        if (!isActive) {
            if ('ontouchstart'in document.documentElement && !$parent.closest('.navbar-nav').length) {
                $(document.createElement('div')).addClass('dropdown-backdrop').insertAfter($(this)).on('click', clearMenus)
            }
            var relatedTarget = {
                relatedTarget: this
            }
            $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))
            if (e.isDefaultPrevented())
                return
            $this.trigger('focus').attr('aria-expanded', 'true')
            $parent.toggleClass('open').trigger($.Event('shown.bs.dropdown', relatedTarget))
        }
        return false
    }
    Dropdown.prototype.keydown = function(e) {
        if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName))
            return
        var $this = $(this)
        e.preventDefault()
        e.stopPropagation()
        if ($this.is('.disabled, :disabled'))
            return
        var $parent = getParent($this)
        var isActive = $parent.hasClass('open')
        if (!isActive && e.which != 27 || isActive && e.which == 27) {
            if (e.which == 27)
                $parent.find(toggle).trigger('focus')
            return $this.trigger('click')
        }
        var desc = ' li:not(.disabled):visible a'
        var $items = $parent.find('.dropdown-menu' + desc)
        if (!$items.length)
            return
        var index = $items.index(e.target)
        if (e.which == 38 && index > 0)
            index--
        if (e.which == 40 && index < $items.length - 1)
            index++
        if (!~index)
            index = 0
        $items.eq(index).trigger('focus')
    }
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.dropdown')
            if (!data)
                $this.data('bs.dropdown', (data = new Dropdown(this)))
            if (typeof option == 'string')
                data[option].call($this)
        })
    }
    var old = $.fn.dropdown
    $.fn.dropdown = Plugin
    $.fn.dropdown.Constructor = Dropdown
    $.fn.dropdown.noConflict = function() {
        $.fn.dropdown = old
        return this
    }
    $(document).on('click.bs.dropdown.data-api', clearMenus).on('click.bs.dropdown.data-api', '.dropdown form', function(e) {
        e.stopPropagation()
    }).on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)
}(jQuery);
+function($) {
    'use strict';
    var Modal = function(element, options) {
        this.options = options
        this.$body = $(document.body)
        this.$element = $(element)
        this.$dialog = this.$element.find('.modal-dialog')
        this.$backdrop = null
        this.isShown = null
        this.originalBodyPad = null
        this.scrollbarWidth = 0
        this.ignoreBackdropClick = false
        if (this.options.remote) {
            this.$element.find('.modal-content').load(this.options.remote, $.proxy(function() {
                this.$element.trigger('loaded.bs.modal')
            }, this))
        }
    }
    Modal.VERSION = '3.3.7'
    Modal.TRANSITION_DURATION = 300
    Modal.BACKDROP_TRANSITION_DURATION = 150
    Modal.DEFAULTS = {
        backdrop: true,
        keyboard: true,
        show: true
    }
    Modal.prototype.toggle = function(_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget)
    }
    Modal.prototype.show = function(_relatedTarget) {
        var that = this
        var e = $.Event('show.bs.modal', {
            relatedTarget: _relatedTarget
        })
        this.$element.trigger(e)
        if (this.isShown || e.isDefaultPrevented())
            return
        this.isShown = true
        this.checkScrollbar()
        this.setScrollbar()
        this.$body.addClass('modal-open')
        this.escape()
        this.resize()
        this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))
        this.$dialog.on('mousedown.dismiss.bs.modal', function() {
            that.$element.one('mouseup.dismiss.bs.modal', function(e) {
                if ($(e.target).is(that.$element))
                    that.ignoreBackdropClick = true
            })
        })
        this.backdrop(function() {
            var transition = $.support.transition && that.$element.hasClass('fade')
            if (!that.$element.parent().length) {
                that.$element.appendTo(that.$body)
            }
            that.$element.show().scrollTop(0)
            that.adjustDialog()
            if (transition) {
                that.$element[0].offsetWidth
            }
            that.$element.addClass('in')
            that.enforceFocus()
            var e = $.Event('shown.bs.modal', {
                relatedTarget: _relatedTarget
            })
            transition ? that.$dialog.one('bsTransitionEnd', function() {
                that.$element.trigger('focus').trigger(e)
            }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger('focus').trigger(e)
        })
    }
    Modal.prototype.hide = function(e) {
        if (e)
            e.preventDefault()
        e = $.Event('hide.bs.modal')
        this.$element.trigger(e)
        if (!this.isShown || e.isDefaultPrevented())
            return
        this.isShown = false
        this.escape()
        this.resize()
        $(document).off('focusin.bs.modal')
        this.$element.removeClass('in').off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal')
        this.$dialog.off('mousedown.dismiss.bs.modal')
        $.support.transition && this.$element.hasClass('fade') ? this.$element.one('bsTransitionEnd', $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal()
    }
    Modal.prototype.enforceFocus = function() {
        $(document).off('focusin.bs.modal').on('focusin.bs.modal', $.proxy(function(e) {
            if (document !== e.target && this.$element[0] !== e.target && !this.$element.has(e.target).length) {
                this.$element.trigger('focus')
            }
        }, this))
    }
    Modal.prototype.escape = function() {
        if (this.isShown && this.options.keyboard) {
            this.$element.on('keydown.dismiss.bs.modal', $.proxy(function(e) {
                e.which == 27 && this.hide()
            }, this))
        } else if (!this.isShown) {
            this.$element.off('keydown.dismiss.bs.modal')
        }
    }
    Modal.prototype.resize = function() {
        if (this.isShown) {
            $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
        } else {
            $(window).off('resize.bs.modal')
        }
    }
    Modal.prototype.hideModal = function() {
        var that = this
        this.$element.hide()
        this.backdrop(function() {
            that.$body.removeClass('modal-open')
            that.resetAdjustments()
            that.resetScrollbar()
            that.$element.trigger('hidden.bs.modal')
        })
    }
    Modal.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null
    }
    Modal.prototype.backdrop = function(callback) {
        var that = this
        var animate = this.$element.hasClass('fade') ? 'fade' : ''
        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate
            this.$backdrop = $(document.createElement('div')).addClass('modal-backdrop ' + animate).appendTo(this.$body)
            this.$element.on('click.dismiss.bs.modal', $.proxy(function(e) {
                if (this.ignoreBackdropClick) {
                    this.ignoreBackdropClick = false
                    return
                }
                if (e.target !== e.currentTarget)
                    return
                this.options.backdrop == 'static' ? this.$element[0].focus() : this.hide()
            }, this))
            if (doAnimate)
                this.$backdrop[0].offsetWidth
            this.$backdrop.addClass('in')
            if (!callback)
                return
            doAnimate ? this.$backdrop.one('bsTransitionEnd', callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass('in')
            var callbackRemove = function() {
                that.removeBackdrop()
                callback && callback()
            }
            $.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one('bsTransitionEnd', callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove()
        } else if (callback) {
            callback()
        }
    }
    Modal.prototype.handleUpdate = function() {
        this.adjustDialog()
    }
    Modal.prototype.adjustDialog = function() {
        var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
            paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
        })
    }
    Modal.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: '',
            paddingRight: ''
        })
    }
    Modal.prototype.checkScrollbar = function() {
        var fullWindowWidth = window.innerWidth
        if (!fullWindowWidth) {
            var documentElementRect = document.documentElement.getBoundingClientRect()
            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
        this.scrollbarWidth = this.measureScrollbar()
    }
    Modal.prototype.setScrollbar = function() {
        var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
        this.originalBodyPad = document.body.style.paddingRight || ''
        if (this.bodyIsOverflowing)
            this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
    }
    Modal.prototype.resetScrollbar = function() {
        this.$body.css('padding-right', this.originalBodyPad)
    }
    Modal.prototype.measureScrollbar = function() {
        var scrollDiv = document.createElement('div')
        scrollDiv.className = 'modal-scrollbar-measure'
        this.$body.append(scrollDiv)
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
        this.$body[0].removeChild(scrollDiv)
        return scrollbarWidth
    }
    function Plugin(option, _relatedTarget) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.modal')
            var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)
            if (!data)
                $this.data('bs.modal', (data = new Modal(this,options)))
            if (typeof option == 'string')
                data[option](_relatedTarget)
            else if (options.show)
                data.show(_relatedTarget)
        })
    }
    var old = $.fn.modal
    $.fn.modal = Plugin
    $.fn.modal.Constructor = Modal
    $.fn.modal.noConflict = function() {
        $.fn.modal = old
        return this
    }
    $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function(e) {
        var $this = $(this)
        var href = $this.attr('href')
        var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, '')))
        var option = $target.data('bs.modal') ? 'toggle' : $.extend({
            remote: !/#/.test(href) && href
        }, $target.data(), $this.data())
        if ($this.is('a'))
            e.preventDefault()
        $target.one('show.bs.modal', function(showEvent) {
            if (showEvent.isDefaultPrevented())
                return
            $target.one('hidden.bs.modal', function() {
                $this.is(':visible') && $this.trigger('focus')
            })
        })
        Plugin.call($target, option, this)
    })
}(jQuery);
+function($) {
    'use strict';
    var Tooltip = function(element, options) {
        this.type = null
        this.options = null
        this.enabled = null
        this.timeout = null
        this.hoverState = null
        this.$element = null
        this.inState = null
        this.init('tooltip', element, options)
    }
    Tooltip.VERSION = '3.3.7'
    Tooltip.TRANSITION_DURATION = 150
    Tooltip.DEFAULTS = {
        animation: true,
        placement: 'top',
        selector: false,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: 'hover focus',
        title: '',
        delay: 0,
        html: false,
        container: false,
        viewport: {
            selector: 'body',
            padding: 0
        }
    }
    Tooltip.prototype.init = function(type, element, options) {
        this.enabled = true
        this.type = type
        this.$element = $(element)
        this.options = this.getOptions(options)
        this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
        this.inState = {
            click: false,
            hover: false,
            focus: false
        }
        if (this.$element[0]instanceof document.constructor && !this.options.selector) {
            throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
        }
        var triggers = this.options.trigger.split(' ')
        for (var i = triggers.length; i--; ) {
            var trigger = triggers[i]
            if (trigger == 'click') {
                this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
            } else if (trigger != 'manual') {
                var eventIn = trigger == 'hover' ? 'mouseenter' : 'focusin'
                var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'
                this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
                this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
            }
        }
        this.options.selector ? (this._options = $.extend({}, this.options, {
            trigger: 'manual',
            selector: ''
        })) : this.fixTitle()
    }
    Tooltip.prototype.getDefaults = function() {
        return Tooltip.DEFAULTS
    }
    Tooltip.prototype.getOptions = function(options) {
        options = $.extend({}, this.getDefaults(), this.$element.data(), options)
        if (options.delay && typeof options.delay == 'number') {
            options.delay = {
                show: options.delay,
                hide: options.delay
            }
        }
        return options
    }
    Tooltip.prototype.getDelegateOptions = function() {
        var options = {}
        var defaults = this.getDefaults()
        this._options && $.each(this._options, function(key, value) {
            if (defaults[key] != value)
                options[key] = value
        })
        return options
    }
    Tooltip.prototype.enter = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type)
        if (!self) {
            self = new this.constructor(obj.currentTarget,this.getDelegateOptions())
            $(obj.currentTarget).data('bs.' + this.type, self)
        }
        if (obj instanceof $.Event) {
            self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
        }
        if (self.tip().hasClass('in') || self.hoverState == 'in') {
            self.hoverState = 'in'
            return
        }
        clearTimeout(self.timeout)
        self.hoverState = 'in'
        if (!self.options.delay || !self.options.delay.show)
            return self.show()
        self.timeout = setTimeout(function() {
            if (self.hoverState == 'in')
                self.show()
        }, self.options.delay.show)
    }
    Tooltip.prototype.isInStateTrue = function() {
        for (var key in this.inState) {
            if (this.inState[key])
                return true
        }
        return false
    }
    Tooltip.prototype.leave = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type)
        if (!self) {
            self = new this.constructor(obj.currentTarget,this.getDelegateOptions())
            $(obj.currentTarget).data('bs.' + this.type, self)
        }
        if (obj instanceof $.Event) {
            self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
        }
        if (self.isInStateTrue())
            return
        clearTimeout(self.timeout)
        self.hoverState = 'out'
        if (!self.options.delay || !self.options.delay.hide)
            return self.hide()
        self.timeout = setTimeout(function() {
            if (self.hoverState == 'out')
                self.hide()
        }, self.options.delay.hide)
    }
    Tooltip.prototype.show = function() {
        var e = $.Event('show.bs.' + this.type)
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e)
            var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
            if (e.isDefaultPrevented() || !inDom)
                return
            var that = this
            var $tip = this.tip()
            var tipId = this.getUID(this.type)
            this.setContent()
            $tip.attr('id', tipId)
            this.$element.attr('aria-describedby', tipId)
            if (this.options.animation)
                $tip.addClass('fade')
            var placement = typeof this.options.placement == 'function' ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement
            var autoToken = /\s?auto?\s?/i
            var autoPlace = autoToken.test(placement)
            if (autoPlace)
                placement = placement.replace(autoToken, '') || 'top'
            $tip.detach().css({
                top: 0,
                left: 0,
                display: 'block'
            }).addClass(placement).data('bs.' + this.type, this)
            this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
            this.$element.trigger('inserted.bs.' + this.type)
            var pos = this.getPosition()
            var actualWidth = $tip[0].offsetWidth
            var actualHeight = $tip[0].offsetHeight
            if (autoPlace) {
                var orgPlacement = placement
                var viewportDim = this.getPosition(this.$viewport)
                placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top' : placement == 'top' && pos.top - actualHeight < viewportDim.top ? 'bottom' : placement == 'right' && pos.right + actualWidth > viewportDim.width ? 'left' : placement == 'left' && pos.left - actualWidth < viewportDim.left ? 'right' : placement
                $tip.removeClass(orgPlacement).addClass(placement)
            }
            var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)
            this.applyPlacement(calculatedOffset, placement)
            var complete = function() {
                var prevHoverState = that.hoverState
                that.$element.trigger('shown.bs.' + that.type)
                that.hoverState = null
                if (prevHoverState == 'out')
                    that.leave(that)
            }
            $.support.transition && this.$tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete()
        }
    }
    Tooltip.prototype.applyPlacement = function(offset, placement) {
        var $tip = this.tip()
        var width = $tip[0].offsetWidth
        var height = $tip[0].offsetHeight
        var marginTop = parseInt($tip.css('margin-top'), 10)
        var marginLeft = parseInt($tip.css('margin-left'), 10)
        if (isNaN(marginTop))
            marginTop = 0
        if (isNaN(marginLeft))
            marginLeft = 0
        offset.top += marginTop
        offset.left += marginLeft
        $.offset.setOffset($tip[0], $.extend({
            using: function(props) {
                $tip.css({
                    top: Math.round(props.top),
                    left: Math.round(props.left)
                })
            }
        }, offset), 0)
        $tip.addClass('in')
        var actualWidth = $tip[0].offsetWidth
        var actualHeight = $tip[0].offsetHeight
        if (placement == 'top' && actualHeight != height) {
            offset.top = offset.top + height - actualHeight
        }
        var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)
        if (delta.left)
            offset.left += delta.left
        else
            offset.top += delta.top
        var isVertical = /top|bottom/.test(placement)
        var arrowDelta = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
        var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'
        $tip.offset(offset)
        this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
    }
    Tooltip.prototype.replaceArrow = function(delta, dimension, isVertical) {
        this.arrow().css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%').css(isVertical ? 'top' : 'left', '')
    }
    Tooltip.prototype.setContent = function() {
        var $tip = this.tip()
        var title = this.getTitle()
        $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
        $tip.removeClass('fade in top bottom left right')
    }
    Tooltip.prototype.hide = function(callback) {
        var that = this
        var $tip = $(this.$tip)
        var e = $.Event('hide.bs.' + this.type)
        function complete() {
            if (that.hoverState != 'in')
                $tip.detach()
            if (that.$element) {
                that.$element.removeAttr('aria-describedby').trigger('hidden.bs.' + that.type)
            }
            callback && callback()
        }
        this.$element.trigger(e)
        if (e.isDefaultPrevented())
            return
        $tip.removeClass('in')
        $.support.transition && $tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete()
        this.hoverState = null
        return this
    }
    Tooltip.prototype.fixTitle = function() {
        var $e = this.$element
        if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
            $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
        }
    }
    Tooltip.prototype.hasContent = function() {
        return this.getTitle()
    }
    Tooltip.prototype.getPosition = function($element) {
        $element = $element || this.$element
        var el = $element[0]
        var isBody = el.tagName == 'BODY'
        var elRect = el.getBoundingClientRect()
        if (elRect.width == null) {
            elRect = $.extend({}, elRect, {
                width: elRect.right - elRect.left,
                height: elRect.bottom - elRect.top
            })
        }
        var isSvg = window.SVGElement && el instanceof window.SVGElement
        var elOffset = isBody ? {
            top: 0,
            left: 0
        } : (isSvg ? null : $element.offset())
        var scroll = {
            scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop()
        }
        var outerDims = isBody ? {
            width: $(window).width(),
            height: $(window).height()
        } : null
        return $.extend({}, elRect, scroll, outerDims, elOffset)
    }
    Tooltip.prototype.getCalculatedOffset = function(placement, pos, actualWidth, actualHeight) {
        return placement == 'bottom' ? {
            top: pos.top + pos.height,
            left: pos.left + pos.width / 2 - actualWidth / 2
        } : placement == 'top' ? {
            top: pos.top - actualHeight,
            left: pos.left + pos.width / 2 - actualWidth / 2
        } : placement == 'left' ? {
            top: pos.top + pos.height / 2 - actualHeight / 2,
            left: pos.left - actualWidth
        } : {
            top: pos.top + pos.height / 2 - actualHeight / 2,
            left: pos.left + pos.width
        }
    }
    Tooltip.prototype.getViewportAdjustedDelta = function(placement, pos, actualWidth, actualHeight) {
        var delta = {
            top: 0,
            left: 0
        }
        if (!this.$viewport)
            return delta
        var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
        var viewportDimensions = this.getPosition(this.$viewport)
        if (/right|left/.test(placement)) {
            var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll
            var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
            if (topEdgeOffset < viewportDimensions.top) {
                delta.top = viewportDimensions.top - topEdgeOffset
            } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) {
                delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
            }
        } else {
            var leftEdgeOffset = pos.left - viewportPadding
            var rightEdgeOffset = pos.left + viewportPadding + actualWidth
            if (leftEdgeOffset < viewportDimensions.left) {
                delta.left = viewportDimensions.left - leftEdgeOffset
            } else if (rightEdgeOffset > viewportDimensions.right) {
                delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
            }
        }
        return delta
    }
    Tooltip.prototype.getTitle = function() {
        var title
        var $e = this.$element
        var o = this.options
        title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title)
        return title
    }
    Tooltip.prototype.getUID = function(prefix) {
        do
            prefix += ~~(Math.random() * 1000000)
        while (document.getElementById(prefix))return prefix
    }
    Tooltip.prototype.tip = function() {
        if (!this.$tip) {
            this.$tip = $(this.options.template)
            if (this.$tip.length != 1) {
                throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
            }
        }
        return this.$tip
    }
    Tooltip.prototype.arrow = function() {
        return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
    }
    Tooltip.prototype.enable = function() {
        this.enabled = true
    }
    Tooltip.prototype.disable = function() {
        this.enabled = false
    }
    Tooltip.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }
    Tooltip.prototype.toggle = function(e) {
        var self = this
        if (e) {
            self = $(e.currentTarget).data('bs.' + this.type)
            if (!self) {
                self = new this.constructor(e.currentTarget,this.getDelegateOptions())
                $(e.currentTarget).data('bs.' + this.type, self)
            }
        }
        if (e) {
            self.inState.click = !self.inState.click
            if (self.isInStateTrue())
                self.enter(self)
            else
                self.leave(self)
        } else {
            self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
        }
    }
    Tooltip.prototype.destroy = function() {
        var that = this
        clearTimeout(this.timeout)
        this.hide(function() {
            that.$element.off('.' + that.type).removeData('bs.' + that.type)
            if (that.$tip) {
                that.$tip.detach()
            }
            that.$tip = null
            that.$arrow = null
            that.$viewport = null
            that.$element = null
        })
    }
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.tooltip')
            var options = typeof option == 'object' && option
            if (!data && /destroy|hide/.test(option))
                return
            if (!data)
                $this.data('bs.tooltip', (data = new Tooltip(this,options)))
            if (typeof option == 'string')
                data[option]()
        })
    }
    var old = $.fn.tooltip
    $.fn.tooltip = Plugin
    $.fn.tooltip.Constructor = Tooltip
    $.fn.tooltip.noConflict = function() {
        $.fn.tooltip = old
        return this
    }
}(jQuery);
+function($) {
    'use strict';
    var Popover = function(element, options) {
        this.init('popover', element, options)
    }
    if (!$.fn.tooltip)
        throw new Error('Popover requires tooltip.js')
    Popover.VERSION = '3.3.7'
    Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
        placement: 'right',
        trigger: 'click',
        content: '',
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    })
    Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)
    Popover.prototype.constructor = Popover
    Popover.prototype.getDefaults = function() {
        return Popover.DEFAULTS
    }
    Popover.prototype.setContent = function() {
        var $tip = this.tip()
        var title = this.getTitle()
        var content = this.getContent()
        $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
        $tip.find('.popover-content').children().detach().end()[this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'](content)
        $tip.removeClass('fade top bottom left right in')
        if (!$tip.find('.popover-title').html())
            $tip.find('.popover-title').hide()
    }
    Popover.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }
    Popover.prototype.getContent = function() {
        var $e = this.$element
        var o = this.options
        return $e.attr('data-content') || (typeof o.content == 'function' ? o.content.call($e[0]) : o.content)
    }
    Popover.prototype.arrow = function() {
        return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
    }
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.popover')
            var options = typeof option == 'object' && option
            if (!data && /destroy|hide/.test(option))
                return
            if (!data)
                $this.data('bs.popover', (data = new Popover(this,options)))
            if (typeof option == 'string')
                data[option]()
        })
    }
    var old = $.fn.popover
    $.fn.popover = Plugin
    $.fn.popover.Constructor = Popover
    $.fn.popover.noConflict = function() {
        $.fn.popover = old
        return this
    }
}(jQuery);
+function($) {
    'use strict';
    function ScrollSpy(element, options) {
        this.$body = $(document.body)
        this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
        this.options = $.extend({}, ScrollSpy.DEFAULTS, options)
        this.selector = (this.options.target || '') + ' .nav li > a'
        this.offsets = []
        this.targets = []
        this.activeTarget = null
        this.scrollHeight = 0
        this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
        this.refresh()
        this.process()
    }
    ScrollSpy.VERSION = '3.3.7'
    ScrollSpy.DEFAULTS = {
        offset: 10
    }
    ScrollSpy.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }
    ScrollSpy.prototype.refresh = function() {
        var that = this
        var offsetMethod = 'offset'
        var offsetBase = 0
        this.offsets = []
        this.targets = []
        this.scrollHeight = this.getScrollHeight()
        if (!$.isWindow(this.$scrollElement[0])) {
            offsetMethod = 'position'
            offsetBase = this.$scrollElement.scrollTop()
        }
        this.$body.find(this.selector).map(function() {
            var $el = $(this)
            var href = $el.data('target') || $el.attr('href')
            var $href = /^#./.test(href) && $(href)
            return ($href && $href.length && $href.is(':visible') && [[$href[offsetMethod]().top + offsetBase, href]]) || null
        }).sort(function(a, b) {
            return a[0] - b[0]
        }).each(function() {
            that.offsets.push(this[0])
            that.targets.push(this[1])
        })
    }
    ScrollSpy.prototype.process = function() {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
        var scrollHeight = this.getScrollHeight()
        var maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height()
        var offsets = this.offsets
        var targets = this.targets
        var activeTarget = this.activeTarget
        var i
        if (this.scrollHeight != scrollHeight) {
            this.refresh()
        }
        if (scrollTop >= maxScroll) {
            return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
        }
        if (activeTarget && scrollTop < offsets[0]) {
            this.activeTarget = null
            return this.clear()
        }
        for (i = offsets.length; i--; ) {
            activeTarget != targets[i] && scrollTop >= offsets[i] && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1]) && this.activate(targets[i])
        }
    }
    ScrollSpy.prototype.activate = function(target) {
        this.activeTarget = target
        this.clear()
        var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]'
        var active = $(selector).parents('li').addClass('active')
        if (active.parent('.dropdown-menu').length) {
            active = active.closest('li.dropdown').addClass('active')
        }
        active.trigger('activate.bs.scrollspy')
    }
    ScrollSpy.prototype.clear = function() {
        $(this.selector).parentsUntil(this.options.target, '.active').removeClass('active')
    }
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.scrollspy')
            var options = typeof option == 'object' && option
            if (!data)
                $this.data('bs.scrollspy', (data = new ScrollSpy(this,options)))
            if (typeof option == 'string')
                data[option]()
        })
    }
    var old = $.fn.scrollspy
    $.fn.scrollspy = Plugin
    $.fn.scrollspy.Constructor = ScrollSpy
    $.fn.scrollspy.noConflict = function() {
        $.fn.scrollspy = old
        return this
    }
    $(window).on('load.bs.scrollspy.data-api', function() {
        $('[data-spy="scroll"]').each(function() {
            var $spy = $(this)
            Plugin.call($spy, $spy.data())
        })
    })
}(jQuery);
+function($) {
    'use strict';
    var Tab = function(element) {
        this.element = $(element)
    }
    Tab.VERSION = '3.3.7'
    Tab.TRANSITION_DURATION = 150
    Tab.prototype.show = function() {
        var $this = this.element
        var $ul = $this.closest('ul:not(.dropdown-menu)')
        var selector = $this.data('target')
        if (!selector) {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '')
        }
        if ($this.parent('li').hasClass('active'))
            return
        var $previous = $ul.find('.active:last a')
        var hideEvent = $.Event('hide.bs.tab', {
            relatedTarget: $this[0]
        })
        var showEvent = $.Event('show.bs.tab', {
            relatedTarget: $previous[0]
        })
        $previous.trigger(hideEvent)
        $this.trigger(showEvent)
        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented())
            return
        var $target = $(selector)
        this.activate($this.closest('li'), $ul)
        this.activate($target, $target.parent(), function() {
            $previous.trigger({
                type: 'hidden.bs.tab',
                relatedTarget: $this[0]
            })
            $this.trigger({
                type: 'shown.bs.tab',
                relatedTarget: $previous[0]
            })
        })
    }
    Tab.prototype.activate = function(element, container, callback) {
        var $active = container.find('> .active')
        var transition = callback && $.support.transition && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)
        function next() {
            $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', false)
            element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded', true)
            if (transition) {
                element[0].offsetWidth
                element.addClass('in')
            } else {
                element.removeClass('fade')
            }
            if (element.parent('.dropdown-menu').length) {
                element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', true)
            }
            callback && callback()
        }
        $active.length && transition ? $active.one('bsTransitionEnd', next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next()
        $active.removeClass('in')
    }
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.tab')
            if (!data)
                $this.data('bs.tab', (data = new Tab(this)))
            if (typeof option == 'string')
                data[option]()
        })
    }
    var old = $.fn.tab
    $.fn.tab = Plugin
    $.fn.tab.Constructor = Tab
    $.fn.tab.noConflict = function() {
        $.fn.tab = old
        return this
    }
    var clickHandler = function(e) {
        e.preventDefault()
        Plugin.call($(this), 'show')
    }
    $(document).on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler).on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)
}(jQuery);
+function($) {
    'use strict';
    var Affix = function(element, options) {
        this.options = $.extend({}, Affix.DEFAULTS, options)
        this.$target = $(this.options.target).on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this)).on('click.bs.affix.data-api', $.proxy(this.checkPositionWithEventLoop, this))
        this.$element = $(element)
        this.affixed = null
        this.unpin = null
        this.pinnedOffset = null
        this.checkPosition()
    }
    Affix.VERSION = '3.3.7'
    Affix.RESET = 'affix affix-top affix-bottom'
    Affix.DEFAULTS = {
        offset: 0,
        target: window
    }
    Affix.prototype.getState = function(scrollHeight, height, offsetTop, offsetBottom) {
        var scrollTop = this.$target.scrollTop()
        var position = this.$element.offset()
        var targetHeight = this.$target.height()
        if (offsetTop != null && this.affixed == 'top')
            return scrollTop < offsetTop ? 'top' : false
        if (this.affixed == 'bottom') {
            if (offsetTop != null)
                return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
            return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
        }
        var initializing = this.affixed == null
        var colliderTop = initializing ? scrollTop : position.top
        var colliderHeight = initializing ? targetHeight : height
        if (offsetTop != null && scrollTop <= offsetTop)
            return 'top'
        if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom))
            return 'bottom'
        return false
    }
    Affix.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset)
            return this.pinnedOffset
        this.$element.removeClass(Affix.RESET).addClass('affix')
        var scrollTop = this.$target.scrollTop()
        var position = this.$element.offset()
        return (this.pinnedOffset = position.top - scrollTop)
    }
    Affix.prototype.checkPositionWithEventLoop = function() {
        setTimeout($.proxy(this.checkPosition, this), 1)
    }
    Affix.prototype.checkPosition = function() {
        if (!this.$element.is(':visible'))
            return
        var height = this.$element.height()
        var offset = this.options.offset
        var offsetTop = offset.top
        var offsetBottom = offset.bottom
        var scrollHeight = Math.max($(document).height(), $(document.body).height())
        if (typeof offset != 'object')
            offsetBottom = offsetTop = offset
        if (typeof offsetTop == 'function')
            offsetTop = offset.top(this.$element)
        if (typeof offsetBottom == 'function')
            offsetBottom = offset.bottom(this.$element)
        var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)
        if (this.affixed != affix) {
            if (this.unpin != null)
                this.$element.css('top', '')
            var affixType = 'affix' + (affix ? '-' + affix : '')
            var e = $.Event(affixType + '.bs.affix')
            this.$element.trigger(e)
            if (e.isDefaultPrevented())
                return
            this.affixed = affix
            this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null
            this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
        }
        if (affix == 'bottom') {
            this.$element.offset({
                top: scrollHeight - height - offsetBottom
            })
        }
    }
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.affix')
            var options = typeof option == 'object' && option
            if (!data)
                $this.data('bs.affix', (data = new Affix(this,options)))
            if (typeof option == 'string')
                data[option]()
        })
    }
    var old = $.fn.affix
    $.fn.affix = Plugin
    $.fn.affix.Constructor = Affix
    $.fn.affix.noConflict = function() {
        $.fn.affix = old
        return this
    }
    $(window).on('load', function() {
        $('[data-spy="affix"]').each(function() {
            var $spy = $(this)
            var data = $spy.data()
            data.offset = data.offset || {}
            if (data.offsetBottom != null)
                data.offset.bottom = data.offsetBottom
            if (data.offsetTop != null)
                data.offset.top = data.offsetTop
            Plugin.call($spy, data)
        })
    })
}(jQuery);
;