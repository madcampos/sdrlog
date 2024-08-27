/* eslint-ignore */
// @ts-nocheck

const BINARY_FILE_PATH = new URL('mozjpeg.wasm', import.meta.url).href;
var mozjpeg = function() {
	var n = 'undefined' != typeof document && document.currentScript ? document.currentScript.src : void 0;
	return function(r) {
		var t, e = void 0 !== (r = r || {}) ? r : {};
		e.ready = new Promise(function(n, r) {
			t = n, r;
		});
		var i, o = {};
		for (i in e) { e.hasOwnProperty(i) && (o[i] = e[i]); }
		var a,
			u = [],
			f = './this.program',
			c = function(n, r) {
				throw r;
			},
			l = !0,
			s = !1,
			p = '';
		(l || s) &&
			(s ? p = self.location.href : document.currentScript && (p = document.currentScript.src),
				n && (p = n),
				p = 0 !== p.indexOf('blob:') ? p.substr(0, p.lastIndexOf('/') + 1) : '',
				function(n) {
					var r = new XMLHttpRequest();
					return r.open('GET', n, !1), r.send(null), r.responseText;
				},
				s && (a = function(n) {
					var r = new XMLHttpRequest();
					return r.open('GET', n, !1), r.responseType = 'arraybuffer', r.send(null), new Uint8Array(r.response);
				}),
				function(n, r, t) {
					var e = new XMLHttpRequest();
					e.open('GET', n, !0),
						e.responseType = 'arraybuffer',
						e.onload = function() {
							200 == e.status || 0 == e.status && e.response ? r(e.response) : t();
						},
						e.onerror = t,
						e.send(null);
				});
		var d = e.print || console.log.bind(console), v = e.printErr || console.warn.bind(console);
		for (i in o) { o.hasOwnProperty(i) && (e[i] = o[i]); }
		o = null, e.arguments && (u = e.arguments), e.thisProgram && (f = e.thisProgram), e.quit && (c = e.quit);
		var y,
			h,
			m,
			g = function(n) {
				n;
			};
		e.wasmBinary && (y = e.wasmBinary), e.noExitRuntime && (h = e.noExitRuntime), 'object' != typeof WebAssembly && v('no native wasm support detected');
		var w = new WebAssembly.Table({ initial: 140, maximum: 140, element: 'anyfunc' }), _ = !1, C = 'undefined' != typeof TextDecoder ? new TextDecoder('utf8') : void 0;
		function b(n, r, t) {
			for (var e = r + t, i = r; n[i] && !(i >= e);) { ++i; }
			if (i - r > 16 && n.subarray && C) { return C.decode(n.subarray(r, i)); }
			for (var o = ''; r < i;) {
				var a = n[r++];
				if (128 & a) {
					var u = 63 & n[r++];
					if (192 != (224 & a)) {
						var f = 63 & n[r++];
						if ((a = 224 == (240 & a) ? (15 & a) << 12 | u << 6 | f : (7 & a) << 18 | u << 12 | f << 6 | 63 & n[r++]) < 65536) { o += String.fromCharCode(a); }
						else {
							var c = a - 65536;
							o += String.fromCharCode(55296 | c >> 10, 56320 | 1023 & c);
						}
					} else { o += String.fromCharCode((31 & a) << 6 | u); }
				} else { o += String.fromCharCode(a); }
			}
			return o;
		}
		function T(n, r) {
			return n ? b(I, n, r) : '';
		}
		var A = 'undefined' != typeof TextDecoder ? new TextDecoder('utf-16le') : void 0;
		function E(n, r) {
			for (var t = n, e = t >> 1, i = e + r / 2; !(e >= i) && O[e];) { ++e; }
			if ((t = e << 1) - n > 32 && A) { return A.decode(I.subarray(n, t)); }
			for (var o = 0, a = '';;) {
				var u = U[n + 2 * o >> 1];
				if (0 == u || o == r / 2) { return a; }
				++o, a += String.fromCharCode(u);
			}
		}
		function P(n, r, t) {
			if (void 0 === t && (t = 2147483647), t < 2) { return 0; }
			for (var e = r, i = (t -= 2) < 2 * n.length ? t / 2 : n.length, o = 0; o < i; ++o) {
				var a = n.charCodeAt(o);
				U[r >> 1] = a, r += 2;
			}
			return U[r >> 1] = 0, r - e;
		}
		function W(n) {
			return 2 * n.length;
		}
		function F(n, r) {
			for (var t = 0, e = ''; !(t >= r / 4);) {
				var i = j[n + 4 * t >> 2];
				if (0 == i) { break; }
				if (++t, i >= 65536) {
					var o = i - 65536;
					e += String.fromCharCode(55296 | o >> 10, 56320 | 1023 & o);
				} else { e += String.fromCharCode(i); }
			}
			return e;
		}
		function R(n, r, t) {
			if (void 0 === t && (t = 2147483647), t < 4) { return 0; }
			for (var e = r, i = e + t - 4, o = 0; o < n.length; ++o) {
				var a = n.charCodeAt(o);
				if (a >= 55296 && a <= 57343) { a = 65536 + ((1023 & a) << 10) | 1023 & n.charCodeAt(++o); }
				if (j[r >> 2] = a, (r += 4) + 4 > i) { break; }
			}
			return j[r >> 2] = 0, r - e;
		}
		function k(n) {
			for (var r = 0, t = 0; t < n.length; ++t) {
				var e = n.charCodeAt(t);
				e >= 55296 && e <= 57343 && ++t, r += 4;
			}
			return r;
		}
		var S, x, I, U, O, j, M, D, H;
		function B(n) {
			S = n,
				e.HEAP8 = x = new Int8Array(n),
				e.HEAP16 = U = new Int16Array(n),
				e.HEAP32 = j = new Int32Array(n),
				e.HEAPU8 = I = new Uint8Array(n),
				e.HEAPU16 = O = new Uint16Array(n),
				e.HEAPU32 = M = new Uint32Array(n),
				e.HEAPF32 = D = new Float32Array(n),
				e.HEAPF64 = H = new Float64Array(n);
		}
		var L = e.INITIAL_MEMORY || 16777216;
		function N(n) {
			for (; n.length > 0;) {
				var r = n.shift();
				if ('function' != typeof r) {
					var t = r.func;
					'number' == typeof t ? void 0 === r.arg ? e.dynCall_v(t) : e.dynCall_vi(t, r.arg) : t(void 0 === r.arg ? null : r.arg);
				} else { r(e); }
			}
		}
		(m = e.wasmMemory ? e.wasmMemory : new WebAssembly.Memory({ initial: L / 65536, maximum: 32768 })) && (S = m.buffer), L = S.byteLength, B(S), j[39392] = 5400608;
		var z = [], V = [], q = [], G = [];
		var X = 0, Y = null, J = null;
		function $(n) {
			throw e.onAbort && e.onAbort(n), d(n += ''), v(n), _ = !0, 1, n = 'abort(' + n + '). Build with -s ASSERTIONS=1 for more info.', new WebAssembly.RuntimeError(n);
		}
		e.preloadedImages = {}, e.preloadedAudios = {};
		var K = 'data:application/octet-stream;base64,';
		function Q(n) {
			return r = n, t = K, String.prototype.startsWith ? r.startsWith(t) : 0 === r.indexOf(t);
			var r, t;
		}
		var Z, nn = BINARY_FILE_PATH;
		function rn() {
			try {
				if (y) { return new Uint8Array(y); }
				if (a) { return a(nn); }
				throw 'both async and sync fetching of the wasm failed';
			} catch (n) {
				$(n);
			}
		}
		Q(nn) || (Z = nn, nn = e.locateFile ? e.locateFile(Z, p) : p + Z),
			V.push({
				func: function() {
					zn();
				}
			});
		var tn = {};
		function en() {
			return en.uncaught_exceptions > 0;
		}
		var on = {};
		function an(n) {
			for (; n.length;) {
				var r = n.pop();
				n.pop()(r);
			}
		}
		function un(n) {
			return this.fromWireType(M[n >> 2]);
		}
		var fn = {}, cn = {}, ln = {}, sn = 48, pn = 57;
		function dn(n) {
			if (void 0 === n) { return '_unknown'; }
			var r = (n = n.replace(/[^a-zA-Z0-9_]/g, '$')).charCodeAt(0);
			return r >= sn && r <= pn ? '_' + n : n;
		}
		function vn(n, r) {
			return n = dn(n), new Function('body', 'return function ' + n + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(r);
		}
		function yn(n, r) {
			var t = vn(r, function(n) {
				this.name = r, this.message = n;
				var t = new Error(n).stack;
				void 0 !== t && (this.stack = this.toString() + '\n' + t.replace(/^Error(:[^\n]*)?\n/, ''));
			});
			return t.prototype = Object.create(n.prototype),
				t.prototype.constructor = t,
				t.prototype.toString = function() {
					return void 0 === this.message ? this.name : this.name + ': ' + this.message;
				},
				t;
		}
		var hn = void 0;
		function mn(n) {
			throw new hn(n);
		}
		function gn(n, r, t) {
			function e(r) {
				var e = t(r);
				e.length !== n.length && mn('Mismatched type converter count');
				for (var i = 0; i < n.length; ++i) { An(n[i], e[i]); }
			}
			n.forEach(function(n) {
				ln[n] = r;
			});
			var i = new Array(r.length), o = [], a = 0;
			r.forEach(function(n, r) {
				cn.hasOwnProperty(n) ? i[r] = cn[n] : (o.push(n),
					fn.hasOwnProperty(n) || (fn[n] = []),
					fn[n].push(function() {
						i[r] = cn[n], ++a === o.length && e(i);
					}));
			}), 0 === o.length && e(i);
		}
		function wn(n) {
			switch (n) {
				case 1:
					return 0;
				case 2:
					return 1;
				case 4:
					return 2;
				case 8:
					return 3;
				default:
					throw new TypeError('Unknown type size: ' + n);
			}
		}
		var _n = void 0;
		function Cn(n) {
			for (var r = '', t = n; I[t];) { r += _n[I[t++]]; }
			return r;
		}
		var bn = void 0;
		function Tn(n) {
			throw new bn(n);
		}
		function An(n, r, t) {
			if (t = t || {}, !('argPackAdvance' in r)) { throw new TypeError('registerType registeredInstance requires argPackAdvance'); }
			var e = r.name;
			if (n || Tn('type "' + e + '" must have a positive integer typeid pointer'), cn.hasOwnProperty(n)) {
				if (t.ignoreDuplicateRegistrations) { return; }
				Tn("Cannot register type '" + e + "' twice");
			}
			if (cn[n] = r, delete ln[n], fn.hasOwnProperty(n)) {
				var i = fn[n];
				delete fn[n],
					i.forEach(function(n) {
						n();
					});
			}
		}
		var En = [], Pn = [{}, { value: void 0 }, { value: null }, { value: !0 }, { value: !1 }];
		function Wn(n) {
			n > 4 && 0 == --Pn[n].refcount && (Pn[n] = void 0, En.push(n));
		}
		function Fn() {
			for (var n = 0, r = 5; r < Pn.length; ++r) { void 0 !== Pn[r] && ++n; }
			return n;
		}
		function Rn() {
			for (var n = 5; n < Pn.length; ++n) { if (void 0 !== Pn[n]) { return Pn[n]; } }
			return null;
		}
		function kn(n) {
			switch (n) {
				case void 0:
					return 1;
				case null:
					return 2;
				case !0:
					return 3;
				case !1:
					return 4;
				default:
					var r = En.length ? En.pop() : Pn.length;
					return Pn[r] = { refcount: 1, value: n }, r;
			}
		}
		function Sn(n) {
			if (null === n) { return 'null'; }
			var r = typeof n;
			return 'object' === r || 'array' === r || 'function' === r ? n.toString() : '' + n;
		}
		function xn(n, r, t, e, i) {
			var o = r.length;
			o < 2 && Tn("argTypes array size mismatch! Must at least get return value and 'this' types!");
			for (var a = null !== r[1] && null !== t, u = !1, f = 1; f < r.length; ++f) {
				if (null !== r[f] && void 0 === r[f].destructorFunction) {
					u = !0;
					break;
				}
			}
			var c = 'void' !== r[0].name, l = '', s = '';
			for (f = 0; f < o - 2; ++f) { l += (0 !== f ? ', ' : '') + 'arg' + f, s += (0 !== f ? ', ' : '') + 'arg' + f + 'Wired'; }
			var p = 'return function ' + dn(n) + '(' + l + ') {\nif (arguments.length !== ' + (o - 2) + ") {\nthrowBindingError('function " + n +
				" called with ' + arguments.length + ' arguments, expected " + (o - 2) + " args!');\n}\n";
			u && (p += 'var destructors = [];\n');
			var d = u ? 'destructors' : 'null', v = ['throwBindingError', 'invoker', 'fn', 'runDestructors', 'retType', 'classParam'], y = [Tn, e, i, an, r[0], r[1]];
			a && (p += 'var thisWired = classParam.toWireType(' + d + ', this);\n');
			for (f = 0; f < o - 2; ++f) {
				p += 'var arg' + f + 'Wired = argType' + f + '.toWireType(' + d + ', arg' + f + '); // ' + r[f + 2].name + '\n', v.push('argType' + f), y.push(r[f + 2]);
			}
			if (a && (s = 'thisWired' + (s.length > 0 ? ', ' : '') + s), p += (c ? 'var rv = ' : '') + 'invoker(fn' + (s.length > 0 ? ', ' : '') + s + ');\n', u) {
				p += 'runDestructors(destructors);\n';
			} else {for (f = a ? 1 : 2; f < r.length; ++f) {
					var h = 1 === f ? 'thisWired' : 'arg' + (f - 2) + 'Wired';
					null !== r[f].destructorFunction && (p += h + '_dtor(' + h + '); // ' + r[f].name + '\n', v.push(h + '_dtor'), y.push(r[f].destructorFunction));
				}}
			return c && (p += 'var ret = retType.fromWireType(rv);\nreturn ret;\n'),
				p += '}\n',
				v.push(p),
				function(n, r) {
					if (!(n instanceof Function)) { throw new TypeError('new_ called with constructor type ' + typeof n + ' which is not a function'); }
					var t = vn(n.name || 'unknownFunctionName', function() {});
					t.prototype = n.prototype;
					var e = new t(), i = n.apply(e, r);
					return i instanceof Object ? i : e;
				}(Function, v).apply(null, y);
		}
		function In(n, r, t) {
			e.hasOwnProperty(n)
				? ((void 0 === t || void 0 !== e[n].overloadTable && void 0 !== e[n].overloadTable[t]) && Tn("Cannot register public name '" + n + "' twice"),
					function(n, r, t) {
						if (void 0 === n[r].overloadTable) {
							var e = n[r];
							n[r] = function() {
								return n[r].overloadTable.hasOwnProperty(arguments.length) ||
									Tn("Function '" + t + "' called with an invalid number of arguments (" + arguments.length + ') - expects one of (' + n[r].overloadTable + ')!'),
									n[r].overloadTable[arguments.length].apply(this, arguments);
							},
								n[r].overloadTable = [],
								n[r].overloadTable[e.argCount] = e;
						}
					}(e, n, n),
					e.hasOwnProperty(t) && Tn('Cannot register multiple overloads of a function with the same number of arguments (' + t + ')!'),
					e[n].overloadTable[t] = r)
				: (e[n] = r, void 0 !== t && (e[n].numArguments = t));
		}
		function Un(n, r) {
			n = Cn(n);
			var t = function(t) {
				for (var e = [], i = 1; i < n.length; ++i) { e.push('a' + i); }
				var o = 'return function dynCall_' + n + '_' + r + '(' + e.join(', ') + ') {\n';
				return o += '    return dynCall(rawFunction' + (e.length ? ', ' : '') + e.join(', ') + ');\n', o += '};\n', new Function('dynCall', 'rawFunction', o)(t, r);
			}(e['dynCall_' + n]);
			return 'function' != typeof t && Tn('unknown function pointer with signature ' + n + ': ' + r), t;
		}
		var On = void 0;
		function jn(n) {
			var r = Gn(n), t = Cn(r);
			return qn(r), t;
		}
		function Mn(n) {
			try {
				return m.grow(n - S.byteLength + 65535 >>> 16), B(m.buffer), 1;
			} catch (n) {}
		}
		var Dn = {};
		function Hn() {
			if (!Hn.strings) {
				var n = {
					USER: 'web_user',
					LOGNAME: 'web_user',
					PATH: '/',
					PWD: '/',
					HOME: '/home/web_user',
					LANG: ('object' == typeof navigator && navigator.languages && navigator.languages[0] || 'C').replace('-', '_') + '.UTF-8',
					_: f || './this.program'
				};
				for (var r in Dn) { n[r] = Dn[r]; }
				var t = [];
				for (var r in n) { t.push(r + '=' + n[r]); }
				Hn.strings = t;
			}
			return Hn.strings;
		}
		var Bn = {
			mappings: {},
			buffers: [null, [], []],
			printChar: function(n, r) {
				var t = Bn.buffers[n];
				0 === r || 10 === r ? ((1 === n ? d : v)(b(t, 0)), t.length = 0) : t.push(r);
			},
			varargs: void 0,
			get: function() {
				return Bn.varargs += 4, j[Bn.varargs - 4 >> 2];
			},
			getStr: function(n) {
				return T(n);
			},
			get64: function(n, r) {
				return n;
			}
		};
		hn = e.InternalError = yn(Error, 'InternalError'),
			function() {
				for (var n = new Array(256), r = 0; r < 256; ++r) { n[r] = String.fromCharCode(r); }
				_n = n;
			}(),
			bn = e.BindingError = yn(Error, 'BindingError'),
			e.count_emval_handles = Fn,
			e.get_first_emval = Rn,
			On = e.UnboundTypeError = yn(Error, 'UnboundTypeError');
		var Ln,
			Nn = {
				n: function(n) {
					return Vn(n);
				},
				m: function(n, r, t) {
					throw tn[n] = { ptr: n, adjusted: [n], type: r, destructor: t, refcount: 0, caught: !1, rethrown: !1 },
						n,
						'uncaught_exception' in en ? en.uncaught_exceptions++ : en.uncaught_exceptions = 1,
						n;
				},
				u: function(n) {
					var r = on[n];
					delete on[n];
					var t = r.rawConstructor, e = r.rawDestructor, i = r.fields;
					gn(
						[n],
						i.map(function(n) {
							return n.getterReturnType;
						}).concat(i.map(function(n) {
							return n.setterArgumentType;
						})),
						function(n) {
							var o = {};
							return i.forEach(function(r, t) {
								var e = r.fieldName, a = n[t], u = r.getter, f = r.getterContext, c = n[t + i.length], l = r.setter, s = r.setterContext;
								o[e] = {
									read: function(n) {
										return a.fromWireType(u(f, n));
									},
									write: function(n, r) {
										var t = [];
										l(s, n, c.toWireType(t, r)), an(t);
									}
								};
							}),
								[{
									name: r.name,
									fromWireType: function(n) {
										var r = {};
										for (var t in o) { r[t] = o[t].read(n); }
										return e(n), r;
									},
									toWireType: function(n, r) {
										for (var i in o) { if (!(i in r)) { throw new TypeError('Missing field:  "' + i + '"'); } }
										var a = t();
										for (i in o) { o[i].write(a, r[i]); }
										return null !== n && n.push(e, a), a;
									},
									argPackAdvance: 8,
									readValueFromPointer: un,
									destructorFunction: e
								}];
						}
					);
				},
				x: function(n, r, t, e, i) {
					var o = wn(t);
					An(n, {
						name: r = Cn(r),
						fromWireType: function(n) {
							return !!n;
						},
						toWireType: function(n, r) {
							return r ? e : i;
						},
						argPackAdvance: 8,
						readValueFromPointer: function(n) {
							var e;
							if (1 === t) { e = x; }
							else if (2 === t) { e = U; }
							else {
								if (4 !== t) { throw new TypeError('Unknown boolean type size: ' + r); }
								e = j;
							}
							return this.fromWireType(e[n >> o]);
						},
						destructorFunction: null
					});
				},
				w: function(n, r) {
					An(n, {
						name: r = Cn(r),
						fromWireType: function(n) {
							var r = Pn[n].value;
							return Wn(n), r;
						},
						toWireType: function(n, r) {
							return kn(r);
						},
						argPackAdvance: 8,
						readValueFromPointer: un,
						destructorFunction: null
					});
				},
				h: function(n, r, t) {
					var e = wn(t);
					An(n, {
						name: r = Cn(r),
						fromWireType: function(n) {
							return n;
						},
						toWireType: function(n, r) {
							if ('number' != typeof r && 'boolean' != typeof r) { throw new TypeError('Cannot convert "' + Sn(r) + '" to ' + this.name); }
							return r;
						},
						argPackAdvance: 8,
						readValueFromPointer: function(n, r) {
							switch (r) {
								case 2:
									return function(n) {
										return this.fromWireType(D[n >> 2]);
									};
								case 3:
									return function(n) {
										return this.fromWireType(H[n >> 3]);
									};
								default:
									throw new TypeError('Unknown float type: ' + n);
							}
						}(r, e),
						destructorFunction: null
					});
				},
				d: function(n, r, t, i, o, a) {
					var u = function(n, r) {
						for (var t = [], e = 0; e < n; e++) { t.push(j[(r >> 2) + e]); }
						return t;
					}(r, t);
					n = Cn(n),
						o = Un(i, o),
						In(n, function() {
							!function(n, r) {
								var t = [], e = {};
								throw r.forEach(function n(r) {
									e[r] || cn[r] || (ln[r] ? ln[r].forEach(n) : (t.push(r), e[r] = !0));
								}),
									new On(n + ': ' + t.map(jn).join([', ']));
							}('Cannot call ' + n + ' due to unbound types', u);
						}, r - 1),
						gn([], u, function(t) {
							var i = [t[0], null].concat(t.slice(1));
							return function(n, r, t) {
								e.hasOwnProperty(n) || mn('Replacing nonexistant public symbol'),
									void 0 !== e[n].overloadTable && void 0 !== t ? e[n].overloadTable[t] = r : (e[n] = r, e[n].argCount = t);
							}(n, xn(n, i, null, o, a), r - 1),
								[];
						});
				},
				b: function(n, r, t, e, i) {
					r = Cn(r), -1 === i && (i = 4294967295);
					var o = wn(t),
						a = function(n) {
							return n;
						};
					if (0 === e) {
						var u = 32 - 8 * t;
						a = function(n) {
							return n << u >>> u;
						};
					}
					var f = -1 != r.indexOf('unsigned');
					An(n, {
						name: r,
						fromWireType: a,
						toWireType: function(n, t) {
							if ('number' != typeof t && 'boolean' != typeof t) { throw new TypeError('Cannot convert "' + Sn(t) + '" to ' + this.name); }
							if (t < e || t > i) {
								throw new TypeError(
									'Passing a number "' + Sn(t) + '" from JS side to C/C++ side to an argument of type "' + r + '", which is outside the valid range [' + e +
										', ' + i + ']!'
								);
							}
							return f ? t >>> 0 : 0 | t;
						},
						argPackAdvance: 8,
						readValueFromPointer: function(n, r, t) {
							switch (r) {
								case 0:
									return t
										? function(n) {
											return x[n];
										}
										: function(n) {
											return I[n];
										};
								case 1:
									return t
										? function(n) {
											return U[n >> 1];
										}
										: function(n) {
											return O[n >> 1];
										};
								case 2:
									return t
										? function(n) {
											return j[n >> 2];
										}
										: function(n) {
											return M[n >> 2];
										};
								default:
									throw new TypeError('Unknown integer type: ' + n);
							}
						}(r, o, 0 !== e),
						destructorFunction: null
					});
				},
				a: function(n, r, t) {
					var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][r];
					function i(n) {
						var r = M, t = r[n >>= 2], i = r[n + 1];
						return new e(S, i, t);
					}
					An(n, { name: t = Cn(t), fromWireType: i, argPackAdvance: 8, readValueFromPointer: i }, { ignoreDuplicateRegistrations: !0 });
				},
				i: function(n, r) {
					var t = 'std::string' === (r = Cn(r));
					An(n, {
						name: r,
						fromWireType: function(n) {
							var r, e = M[n >> 2];
							if (t) {
								for (var i = n + 4, o = 0; o <= e; ++o) {
									var a = n + 4 + o;
									if (0 == I[a] || o == e) {
										var u = T(i, a - i);
										void 0 === r ? r = u : (r += String.fromCharCode(0), r += u), i = a + 1;
									}
								}
							} else {
								var f = new Array(e);
								for (o = 0; o < e; ++o) { f[o] = String.fromCharCode(I[n + 4 + o]); }
								r = f.join('');
							}
							return qn(n), r;
						},
						toWireType: function(n, r) {
							r instanceof ArrayBuffer && (r = new Uint8Array(r));
							var e = 'string' == typeof r;
							e || r instanceof Uint8Array || r instanceof Uint8ClampedArray || r instanceof Int8Array || Tn('Cannot pass non-string to std::string');
							var i = (t && e
									? function() {
										return function(n) {
											for (var r = 0, t = 0; t < n.length; ++t) {
												var e = n.charCodeAt(t);
												e >= 55296 && e <= 57343 && (e = 65536 + ((1023 & e) << 10) | 1023 & n.charCodeAt(++t)),
													e <= 127 ? ++r : r += e <= 2047 ? 2 : e <= 65535 ? 3 : 4;
											}
											return r;
										}(r);
									}
									: function() {
										return r.length;
									})(),
								o = Vn(4 + i + 1);
							if (M[o >> 2] = i, t && e) {
								!function(n, r, t, e) {
									if (!(e > 0)) { return 0; }
									for (var i = t + e - 1, o = 0; o < n.length; ++o) {
										var a = n.charCodeAt(o);
										if (a >= 55296 && a <= 57343 && (a = 65536 + ((1023 & a) << 10) | 1023 & n.charCodeAt(++o)), a <= 127) {
											if (t >= i) { break; }
											r[t++] = a;
										} else if (a <= 2047) {
											if (t + 1 >= i) { break; }
											r[t++] = 192 | a >> 6, r[t++] = 128 | 63 & a;
										} else if (a <= 65535) {
											if (t + 2 >= i) { break; }
											r[t++] = 224 | a >> 12, r[t++] = 128 | a >> 6 & 63, r[t++] = 128 | 63 & a;
										} else {
											if (t + 3 >= i) { break; }
											r[t++] = 240 | a >> 18, r[t++] = 128 | a >> 12 & 63, r[t++] = 128 | a >> 6 & 63, r[t++] = 128 | 63 & a;
										}
									}
									r[t] = 0;
								}(r, I, o + 4, i + 1);
							} else if (e) {
								for (var a = 0; a < i; ++a) {
									var u = r.charCodeAt(a);
									u > 255 && (qn(o), Tn('String has UTF-16 code units that do not fit in 8 bits')), I[o + 4 + a] = u;
								}
							} else { for (a = 0; a < i; ++a) { I[o + 4 + a] = r[a]; } }
							return null !== n && n.push(qn, o), o;
						},
						argPackAdvance: 8,
						readValueFromPointer: un,
						destructorFunction: function(n) {
							qn(n);
						}
					});
				},
				e: function(n, r, t) {
					var e, i, o, a, u;
					t = Cn(t),
						2 === r
							? (e = E,
								i = P,
								a = W,
								o = function() {
									return O;
								},
								u = 1)
							: 4 === r && (e = F,
								i = R,
								a = k,
								o = function() {
									return M;
								},
								u = 2),
						An(n, {
							name: t,
							fromWireType: function(n) {
								for (var t, i = M[n >> 2], a = o(), f = n + 4, c = 0; c <= i; ++c) {
									var l = n + 4 + c * r;
									if (0 == a[l >> u] || c == i) {
										var s = e(f, l - f);
										void 0 === t ? t = s : (t += String.fromCharCode(0), t += s), f = l + r;
									}
								}
								return qn(n), t;
							},
							toWireType: function(n, e) {
								'string' != typeof e && Tn('Cannot pass non-string to C++ string type ' + t);
								var o = a(e), f = Vn(4 + o + r);
								return M[f >> 2] = o >> u, i(e, f + 4, o + r), null !== n && n.push(qn, f), f;
							},
							argPackAdvance: 8,
							readValueFromPointer: un,
							destructorFunction: function(n) {
								qn(n);
							}
						});
				},
				z: function(n, r, t, e, i, o) {
					on[n] = { name: Cn(r), rawConstructor: Un(t, e), rawDestructor: Un(i, o), fields: [] };
				},
				f: function(n, r, t, e, i, o, a, u, f, c) {
					on[n].fields.push({ fieldName: Cn(r), getterReturnType: t, getter: Un(e, i), getterContext: o, setterArgumentType: a, setter: Un(u, f), setterContext: c });
				},
				y: function(n, r) {
					An(n, { isVoid: !0, name: r = Cn(r), argPackAdvance: 0, fromWireType: function() {}, toWireType: function(n, r) {} });
				},
				k: Wn,
				l: function(n) {
					n > 4 && (Pn[n].refcount += 1);
				},
				A: function(n, r) {
					var t, e, i;
					return e = '_emval_take_value', void 0 === (i = cn[t = n]) && Tn(e + ' has unknown type ' + jn(t)), kn((n = i).readValueFromPointer(r));
				},
				r: function() {
					$();
				},
				q: function(n, r, t) {
					I.copyWithin(n, r, r + t);
				},
				c: function(n) {
					n >>>= 0;
					var r = I.length;
					if (n > 2147483648) { return !1; }
					for (var t, e, i = 1; i <= 4; i *= 2) {
						var o = r * (1 + .2 / i);
						if (o = Math.min(o, n + 100663296), Mn(Math.min(2147483648, ((t = Math.max(16777216, n, o)) % (e = 65536) > 0 && (t += e - t % e), t)))) { return !0; }
					}
					return !1;
				},
				s: function(n, r) {
					var t = 0;
					return Hn().forEach(function(e, i) {
						var o = r + t;
						j[n + 4 * i >> 2] = o,
							function(n, r, t) {
								for (var e = 0; e < n.length; ++e) { x[r++ >> 0] = n.charCodeAt(e); }
								t || (x[r >> 0] = 0);
							}(e, o),
							t += e.length + 1;
					}),
						0;
				},
				t: function(n, r) {
					var t = Hn();
					j[n >> 2] = t.length;
					var e = 0;
					return t.forEach(function(n) {
						e += n.length + 1;
					}),
						j[r >> 2] = e,
						0;
				},
				j: function(n) {
					!function(n, r) {
						r && h && 0 === n || (h || (_ = !0, n, !0, e.onExit && e.onExit(n)),
							c(
								n,
								new function(n) {
									this.name = 'ExitStatus', this.message = 'Program terminated with exit(' + n + ')', this.status = n;
								}(n)
							));
					}(n);
				},
				v: function(n) {
					return 0;
				},
				o: function(n, r, t, e, i) {},
				g: function(n, r, t, e) {
					for (var i = 0, o = 0; o < t; o++) {
						for (var a = j[r + 8 * o >> 2], u = j[r + (8 * o + 4) >> 2], f = 0; f < u; f++) { Bn.printChar(n, I[a + f]); }
						i += u;
					}
					return j[e >> 2] = i, 0;
				},
				memory: m,
				p: function(n) {
					g(0 | n);
				},
				table: w
			},
			zn = (function() {
				var n = { a: Nn };
				function r(n, r) {
					var t = n.exports;
					e.asm = t,
						function(n) {
							if (X--, e.monitorRunDependencies && e.monitorRunDependencies(X), 0 == X && (null !== Y && (clearInterval(Y), Y = null), J)) {
								var r = J;
								J = null, r();
							}
						}();
				}
				function t(n) {
					r(n.instance);
				}
				function i(r) {
					return (y || !l && !s || 'function' != typeof fetch
						? new Promise(function(n, r) {
							n(rn());
						})
						: fetch(nn, { credentials: 'same-origin' }).then(function(n) {
							if (!n.ok) { throw "failed to load wasm binary file at '" + nn + "'"; }
							return n.arrayBuffer();
						}).catch(function() {
							return rn();
						})).then(function(r) {
							return WebAssembly.instantiate(r, n);
						}).then(r, function(n) {
							v('failed to asynchronously prepare wasm: ' + n), $(n);
						});
				}
				if (X++, e.monitorRunDependencies && e.monitorRunDependencies(X), e.instantiateWasm) {
					try {
						return e.instantiateWasm(n, r);
					} catch (n) {
						return v('Module.instantiateWasm callback failed with error: ' + n), !1;
					}
				}
				(function() {
					if (y || 'function' != typeof WebAssembly.instantiateStreaming || Q(nn) || 'function' != typeof fetch) { return i(t); }
					fetch(nn, { credentials: 'same-origin' }).then(function(r) {
						return WebAssembly.instantiateStreaming(r, n).then(t, function(n) {
							return v('wasm streaming compile failed: ' + n), v('falling back to ArrayBuffer instantiation'), i(t);
						});
					});
				})();
			}(),
				e.___wasm_call_ctors = function() {
					return (zn = e.___wasm_call_ctors = e.asm.B).apply(null, arguments);
				}),
			Vn = e._malloc = function() {
				return (Vn = e._malloc = e.asm.C).apply(null, arguments);
			},
			qn = e._free = function() {
				return (qn = e._free = e.asm.D).apply(null, arguments);
			},
			Gn = e.___getTypeName = function() {
				return (Gn = e.___getTypeName = e.asm.E).apply(null, arguments);
			};
		e.___embind_register_native_and_builtin_types = function() {
			return (e.___embind_register_native_and_builtin_types = e.asm.F).apply(null, arguments);
		},
			e.dynCall_vi = function() {
				return (e.dynCall_vi = e.asm.G).apply(null, arguments);
			},
			e.dynCall_viiiii = function() {
				return (e.dynCall_viiiii = e.asm.H).apply(null, arguments);
			},
			e.dynCall_viiiiiiii = function() {
				return (e.dynCall_viiiiiiii = e.asm.I).apply(null, arguments);
			},
			e.dynCall_viii = function() {
				return (e.dynCall_viii = e.asm.J).apply(null, arguments);
			},
			e.dynCall_vii = function() {
				return (e.dynCall_vii = e.asm.K).apply(null, arguments);
			},
			e.dynCall_iii = function() {
				return (e.dynCall_iii = e.asm.L).apply(null, arguments);
			},
			e.dynCall_viiii = function() {
				return (e.dynCall_viiii = e.asm.M).apply(null, arguments);
			},
			e.dynCall_viiiiiii = function() {
				return (e.dynCall_viiiiiii = e.asm.N).apply(null, arguments);
			},
			e.dynCall_ii = function() {
				return (e.dynCall_ii = e.asm.O).apply(null, arguments);
			},
			e.dynCall_iiiiii = function() {
				return (e.dynCall_iiiiii = e.asm.P).apply(null, arguments);
			},
			e.dynCall_iiiiiii = function() {
				return (e.dynCall_iiiiiii = e.asm.Q).apply(null, arguments);
			},
			e.dynCall_iiiii = function() {
				return (e.dynCall_iiiii = e.asm.R).apply(null, arguments);
			},
			e.dynCall_iiii = function() {
				return (e.dynCall_iiii = e.asm.S).apply(null, arguments);
			},
			e.dynCall_i = function() {
				return (e.dynCall_i = e.asm.T).apply(null, arguments);
			},
			e.dynCall_jiji = function() {
				return (e.dynCall_jiji = e.asm.U).apply(null, arguments);
			},
			e.dynCall_viiiiii = function() {
				return (e.dynCall_viiiiii = e.asm.V).apply(null, arguments);
			};
		function Xn(n) {
			function r() {
				Ln || (Ln = !0,
					e.calledRun = !0,
					_ || (!0,
						N(V),
						N(q),
						t(e),
						e.onRuntimeInitialized && e.onRuntimeInitialized(),
						function() {
							if (e.postRun) { for ('function' == typeof e.postRun && (e.postRun = [e.postRun]); e.postRun.length;) { n = e.postRun.shift(), G.unshift(n); } }
							var n;
							N(G);
						}()));
			}
			n = n || u,
				X > 0 || (!function() {
					if (e.preRun) { for ('function' == typeof e.preRun && (e.preRun = [e.preRun]); e.preRun.length;) { n = e.preRun.shift(), z.unshift(n); } }
					var n;
					N(z);
				}(),
					X > 0 || (e.setStatus
						? (e.setStatus('Running...'),
							setTimeout(function() {
								setTimeout(function() {
									e.setStatus('');
								}, 1), r();
							}, 1))
						: r()));
		}
		if (
			J = function n() {
				Ln || Xn(), Ln || (J = n);
			},
				e.run = Xn,
				e.preInit
		) { for ('function' == typeof e.preInit && (e.preInit = [e.preInit]); e.preInit.length > 0;) { e.preInit.pop()(); } }
		return h = !0, Xn(), r.ready;
	};
}();
export default mozjpeg;
