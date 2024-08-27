/* eslint-ignore */
// @ts-nocheck

const BINARY_FILE_PATH = new URL('snes9x_libretro.wasm', import.meta.url).href,
	moduleDefaults = {
		noInitialRun: !0,
		arguments: ['/rom.bin', '--verbose'],
		print(e) {
			console.log(`stdout: ${e}`);
		},
		printErr(e) {
			console.log(`stderr: ${e}`);
		}
	};
export default function(e = {}) {
	var r, t = void 0 !== e ? { ...moduleDefaults, ...e } : moduleDefaults, n = {};
	for (r in t) { t.hasOwnProperty(r) && (n[r] = t[r]); }
	var o,
		a = [],
		i = './this.program',
		u = function(e, r) {
			throw r;
		},
		s = !1,
		c = !1,
		f = !1;
	s = 'object' == typeof window,
		c = 'function' == typeof importScripts,
		f = 'object' == typeof process && 'object' == typeof process.versions && 'string' == typeof process.versions.node,
		o = !s && !f && !c;
	var l, d, m, p, v, g = '';
	f
		? (g = c ? require('path').dirname(g) + '/' : __dirname + '/',
			l = function(e, r) {
				return p || (p = require('fs')), v || (v = require('path')), e = v.normalize(e), p.readFileSync(e, r ? null : 'utf8');
			},
			m = function(e) {
				var r = l(e, !0);
				return r.buffer || (r = new Uint8Array(r)), A(r.buffer), r;
			},
			process.argv.length > 1 && (i = process.argv[1].replace(/\\/g, '/')),
			a = process.argv.slice(2),
			'undefined' != typeof module && (module.exports = t),
			process.on('uncaughtException', function(e) {
				if (!(e instanceof Ir)) { throw e; }
			}),
			process.on('unhandledRejection', oe),
			u = function(e) {
				process.exit(e);
			},
			t.inspect = function() {
				return '[Emscripten Module object]';
			})
		: o
		? ('undefined' != typeof read && (l = function(e) {
			return read(e);
		}),
			m = function(e) {
				var r;
				return 'function' == typeof readbuffer ? new Uint8Array(readbuffer(e)) : (A('object' == typeof (r = read(e, 'binary'))), r);
			},
			'undefined' != typeof scriptArgs ? a = scriptArgs : void 0 !== arguments && (a = arguments),
			'function' == typeof quit && (u = function(e) {
				quit(e);
			}),
			'undefined' != typeof print &&
			('undefined' == typeof console && (console = {}), console.log = print, console.warn = console.error = 'undefined' != typeof printErr ? printErr : print))
		: (s || c) &&
			(c ? g = self.location.href : 'undefined' != typeof document && document.currentScript && (g = document.currentScript.src),
				g = 0 !== g.indexOf('blob:') ? g.substr(0, g.lastIndexOf('/') + 1) : '',
				l = function(e) {
					var r = new XMLHttpRequest();
					return r.open('GET', e, !1), r.send(null), r.responseText;
				},
				c && (m = function(e) {
					var r = new XMLHttpRequest();
					return r.open('GET', e, !1), r.responseType = 'arraybuffer', r.send(null), new Uint8Array(r.response);
				}),
				d = function(e, r, t) {
					var n = new XMLHttpRequest();
					n.open('GET', e, !0),
						n.responseType = 'arraybuffer',
						n.onload = function() {
							200 == n.status || 0 == n.status && n.response ? r(n.response) : t();
						},
						n.onerror = t,
						n.send(null);
				});
	var h = t.print || console.log.bind(console), E = t.printErr || console.warn.bind(console);
	for (r in n) { n.hasOwnProperty(r) && (t[r] = n[r]); }
	n = null, t.arguments && (a = t.arguments), t.thisProgram && (i = t.thisProgram), t.quit && (u = t.quit);
	var w = 16;
	var b,
		y = 0,
		x = function(e) {
			y = e;
		},
		k = function() {
			return y;
		};
	t.wasmBinary && (b = t.wasmBinary);
	var _, D = t.noExitRuntime || !1;
	'object' != typeof WebAssembly && oe('no native wasm support detected');
	var S = !1;
	function A(e, r) {
		e || oe('Assertion failed: ' + r);
	}
	var L, C, B, F, T, M, P, R, O, I = 'undefined' != typeof TextDecoder ? new TextDecoder('utf8') : void 0;
	function N(e, r, t) {
		for (var n = r + t, o = r; e[o] && !(o >= n);) { ++o; }
		if (o - r > 16 && e.subarray && I) { return I.decode(e.subarray(r, o)); }
		for (var a = ''; r < o;) {
			var i = e[r++];
			if (128 & i) {
				var u = 63 & e[r++];
				if (192 != (224 & i)) {
					var s = 63 & e[r++];
					if ((i = 224 == (240 & i) ? (15 & i) << 12 | u << 6 | s : (7 & i) << 18 | u << 12 | s << 6 | 63 & e[r++]) < 65536) { a += String.fromCharCode(i); }
					else {
						var c = i - 65536;
						a += String.fromCharCode(55296 | c >> 10, 56320 | 1023 & c);
					}
				} else { a += String.fromCharCode((31 & i) << 6 | u); }
			} else { a += String.fromCharCode(i); }
		}
		return a;
	}
	function U(e, r) {
		return e ? N(B, e, r) : '';
	}
	function z(e, r, t, n) {
		if (!(n > 0)) { return 0; }
		for (var o = t, a = t + n - 1, i = 0; i < e.length; ++i) {
			var u = e.charCodeAt(i);
			if (u >= 55296 && u <= 57343) { u = 65536 + ((1023 & u) << 10) | 1023 & e.charCodeAt(++i); }
			if (u <= 127) {
				if (t >= a) { break; }
				r[t++] = u;
			} else if (u <= 2047) {
				if (t + 1 >= a) { break; }
				r[t++] = 192 | u >> 6, r[t++] = 128 | 63 & u;
			} else if (u <= 65535) {
				if (t + 2 >= a) { break; }
				r[t++] = 224 | u >> 12, r[t++] = 128 | u >> 6 & 63, r[t++] = 128 | 63 & u;
			} else {
				if (t + 3 >= a) { break; }
				r[t++] = 240 | u >> 18, r[t++] = 128 | u >> 12 & 63, r[t++] = 128 | u >> 6 & 63, r[t++] = 128 | 63 & u;
			}
		}
		return r[t] = 0, t - o;
	}
	function j(e, r, t) {
		return z(e, B, r, t);
	}
	function H(e) {
		for (var r = 0, t = 0; t < e.length; ++t) {
			var n = e.charCodeAt(t);
			n >= 55296 && n <= 57343 && (n = 65536 + ((1023 & n) << 10) | 1023 & e.charCodeAt(++t)), n <= 127 ? ++r : r += n <= 2047 ? 2 : n <= 65535 ? 3 : 4;
		}
		return r;
	}
	function G(e) {
		var r = H(e) + 1, t = Ar(r);
		return t && z(e, C, t, r), t;
	}
	function V(e) {
		var r = H(e) + 1, t = Pr(r);
		return z(e, C, t, r), t;
	}
	function q(e) {
		L = e,
			t.HEAP8 = C = new Int8Array(e),
			t.HEAP16 = F = new Int16Array(e),
			t.HEAP32 = M = new Int32Array(e),
			t.HEAPU8 = B = new Uint8Array(e),
			t.HEAPU16 = T = new Uint16Array(e),
			t.HEAPU32 = P = new Uint32Array(e),
			t.HEAPF32 = R = new Float32Array(e),
			t.HEAPF64 = O = new Float64Array(e);
	}
	t.INITIAL_MEMORY;
	var X, Y = [], W = [], Q = [], K = [], Z = [];
	W.push({
		func: function() {
			Dr();
		}
	});
	var $ = 0, J = null, ee = null;
	function re(e) {
		return e;
	}
	function te(e) {
		$++, t.monitorRunDependencies && t.monitorRunDependencies($);
	}
	function ne(e) {
		if ($--, t.monitorRunDependencies && t.monitorRunDependencies($), 0 == $ && (null !== J && (clearInterval(J), J = null), ee)) {
			var r = ee;
			ee = null, r();
		}
	}
	function oe(e) {
		throw t.onAbort && t.onAbort(e), E(e += ''), S = !0, 1, e = 'abort(' + e + '). Build with -s ASSERTIONS=1 for more info.', new WebAssembly.RuntimeError(e);
	}
	function ae(e, r) {
		return String.prototype.startsWith ? e.startsWith(r) : 0 === e.indexOf(r);
	}
	t.preloadedImages = {}, t.preloadedAudios = {};
	var ie = 'data:application/octet-stream;base64,';
	function ue(e) {
		return ae(e, ie);
	}
	var se = 'file://';
	function ce(e) {
		return ae(e, se);
	}
	var fe, le, de, me, pe = BINARY_FILE_PATH;
	function ve(e) {
		try {
			if (e == pe && b) { return new Uint8Array(b); }
			if (m) { return m(e); }
			throw 'both async and sync fetching of the wasm failed';
		} catch (e) {
			oe(e);
		}
	}
	function ge(e) {
		for (; e.length > 0;) {
			var r = e.shift();
			if ('function' != typeof r) {
				var n = r.func;
				'number' == typeof n ? void 0 === r.arg ? X.get(n)() : X.get(n)(r.arg) : n(void 0 === r.arg ? null : r.arg);
			} else { r(t); }
		}
	}
	function he(e, r) {
		if (we.mainLoop.timingMode = e, we.mainLoop.timingValue = r, !we.mainLoop.func) { return 1; }
		if (0 == e) {
			we.mainLoop.scheduler = function() {
				var e = 0 | Math.max(0, we.mainLoop.tickStartTime + r - me());
				setTimeout(we.mainLoop.runner, e);
			}, we.mainLoop.method = 'timeout';
		} else if (1 == e) {
			we.mainLoop.scheduler = function() {
				we.requestAnimationFrame(we.mainLoop.runner);
			}, we.mainLoop.method = 'rAF';
		} else if (2 == e) {
			if ('undefined' == typeof setImmediate) {
				var n = [];
				addEventListener('message', function(e) {
					'setimmediate' !== e.data && 'setimmediate' !== e.data.target || (e.stopPropagation(), n.shift()());
				}, !0),
					setImmediate = function(e) {
						n.push(e),
							c
								? (void 0 === t.setImmediates && (t.setImmediates = []), t.setImmediates.push(e), postMessage({ target: 'setimmediate' }))
								: postMessage('setimmediate', '*');
					};
			}
			we.mainLoop.scheduler = function() {
				setImmediate(we.mainLoop.runner);
			}, we.mainLoop.method = 'immediate';
		}
		return 0;
	}
	function Ee(e, r, t, n, o) {
		D = !0,
			A(
				!we.mainLoop.func,
				'emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.'
			),
			we.mainLoop.func = e,
			we.mainLoop.arg = n;
		var a = we.mainLoop.currentlyRunningMainloop;
		if (
			we.mainLoop.runner = function() {
				if (!S) {
					if (we.mainLoop.queue.length > 0) {
						var r = Date.now(), t = we.mainLoop.queue.shift();
						if (t.func(t.arg), we.mainLoop.remainingBlockers) {
							var n = we.mainLoop.remainingBlockers, o = n % 1 == 0 ? n - 1 : Math.floor(n);
							t.counted ? we.mainLoop.remainingBlockers = o : (o += .5, we.mainLoop.remainingBlockers = (8 * n + o) / 9);
						}
						if (
							console.log('main loop blocker "' + t.name + '" took ' + (Date.now() - r) + ' ms'), we.mainLoop.updateStatus(), a < we.mainLoop.currentlyRunningMainloop
						) { return; }
						setTimeout(we.mainLoop.runner, 0);
					} else {a < we.mainLoop.currentlyRunningMainloop ||
							(we.mainLoop.currentFrameNumber = we.mainLoop.currentFrameNumber + 1 | 0,
								1 == we.mainLoop.timingMode && we.mainLoop.timingValue > 1 && we.mainLoop.currentFrameNumber % we.mainLoop.timingValue != 0
									? we.mainLoop.scheduler()
									: (0 == we.mainLoop.timingMode && (we.mainLoop.tickStartTime = me()),
										xe.newRenderingFrameStarted(),
										we.mainLoop.runIter(e),
										a < we.mainLoop.currentlyRunningMainloop ||
										('object' == typeof SDL && SDL.audio && SDL.audio.queueNewAudioData && SDL.audio.queueNewAudioData(), we.mainLoop.scheduler())));}
				}
			},
				o || (r && r > 0 ? he(0, 1e3 / r) : he(1, 1), we.mainLoop.scheduler()),
				t
		) { throw 'unwind'; }
	}
	ue(pe) || (fe = pe, pe = t.locateFile ? t.locateFile(fe, g) : g + fe),
		me = f
			? function() {
				var e = process.hrtime();
				return 1e3 * e[0] + e[1] / 1e6;
			}
			: 'undefined' != typeof dateNow
			? dateNow
			: function() {
				return performance.now();
			};
	var we = {
			mainLoop: {
				scheduler: null,
				method: '',
				currentlyRunningMainloop: 0,
				func: null,
				arg: 0,
				timingMode: 0,
				timingValue: 0,
				currentFrameNumber: 0,
				queue: [],
				pause: function() {
					we.mainLoop.scheduler = null, we.mainLoop.currentlyRunningMainloop++;
				},
				resume: function() {
					we.mainLoop.currentlyRunningMainloop++;
					var e = we.mainLoop.timingMode, r = we.mainLoop.timingValue, t = we.mainLoop.func;
					we.mainLoop.func = null, Ee(t, 0, !1, we.mainLoop.arg, !0), he(e, r), we.mainLoop.scheduler();
				},
				updateStatus: function() {
					if (t.setStatus) {
						var e = t.statusMessage || 'Please wait...', r = we.mainLoop.remainingBlockers, n = we.mainLoop.expectedBlockers;
						r ? r < n ? t.setStatus(e + ' (' + (n - r) + '/' + n + ')') : t.setStatus(e) : t.setStatus('');
					}
				},
				runIter: function(e) {
					if (!S) {
						if (t.preMainLoop) { if (!1 === t.preMainLoop()) { return; } }
						try {
							e();
						} catch (e) {
							if (e instanceof Ir) { return; }
							if ('unwind' == e) { return; }
							throw e && 'object' == typeof e && e.stack && E('exception thrown: ' + [e, e.stack]), e;
						}
						t.postMainLoop && t.postMainLoop();
					}
				}
			},
			isFullscreen: !1,
			pointerLock: !1,
			moduleContextCreatedCallbacks: [],
			workers: [],
			init: function() {
				if (t.preloadPlugins || (t.preloadPlugins = []), !we.initted) {
					we.initted = !0;
					try {
						new Blob(), we.hasBlobConstructor = !0;
					} catch (e) {
						we.hasBlobConstructor = !1, console.log('warning: no blob constructor, cannot create blobs with mimetypes');
					}
					we.BlobBuilder = 'undefined' != typeof MozBlobBuilder
						? MozBlobBuilder
						: 'undefined' != typeof WebKitBlobBuilder
						? WebKitBlobBuilder
						: we.hasBlobConstructor
						? null
						: console.log('warning: no BlobBuilder'),
						we.URLObject = 'undefined' != typeof window ? window.URL ? window.URL : window.webkitURL : void 0,
						t.noImageDecoding || void 0 !== we.URLObject ||
						(console.log('warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.'), t.noImageDecoding = !0);
					var e = {
						canHandle: function(e) {
							return !t.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(e);
						}
					};
					e.handle = function(e, r, n, o) {
						var a = null;
						if (we.hasBlobConstructor) {
							try {
								(a = new Blob([e], { type: we.getMimetype(r) })).size !== e.length && (a = new Blob([new Uint8Array(e).buffer], { type: we.getMimetype(r) }));
							} catch (e) {
								!function e(r) {
									e.shown || (e.shown = {}), e.shown[r] || (e.shown[r] = 1, E(r));
								}('Blob constructor present but fails: ' + e + '; falling back to blob builder');
							}
						}
						if (!a) {
							var i = new we.BlobBuilder();
							i.append(new Uint8Array(e).buffer), a = i.getBlob();
						}
						var u = we.URLObject.createObjectURL(a), s = new Image();
						s.onload = function() {
							A(s.complete, 'Image ' + r + ' could not be decoded');
							var o = document.createElement('canvas');
							o.width = s.width, o.height = s.height, o.getContext('2d').drawImage(s, 0, 0), t.preloadedImages[r] = o, we.URLObject.revokeObjectURL(u), n && n(e);
						},
							s.onerror = function(e) {
								console.log('Image ' + u + ' could not be decoded'), o && o();
							},
							s.src = u;
					}, t.preloadPlugins.push(e);
					var r = {
						canHandle: function(e) {
							return !t.noAudioDecoding && e.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
						},
						handle: function(e, r, n, o) {
							var a = !1;
							function i(o) {
								a || (a = !0, t.preloadedAudios[r] = o, n && n(e));
							}
							function u() {
								a || (a = !0, t.preloadedAudios[r] = new Audio(), o && o());
							}
							if (!we.hasBlobConstructor) { return u(); }
							try {
								var s = new Blob([e], { type: we.getMimetype(r) });
							} catch (e) {
								return u();
							}
							var c = we.URLObject.createObjectURL(s), f = new Audio();
							f.addEventListener('canplaythrough', function() {
								i(f);
							}, !1),
								f.onerror = function(t) {
									a ||
										(console.log('warning: browser could not fully decode audio ' + r + ', trying slower base64 approach'),
											f.src = 'data:audio/x-' + r.substr(-3) + ';base64,' + function(e) {
												for (var r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', t = '', n = 0, o = 0, a = 0; a < e.length; a++) {
													for (n = n << 8 | e[a], o += 8; o >= 6;) {
														var i = n >> o - 6 & 63;
														o -= 6, t += r[i];
													}
												}
												return 2 == o ? (t += r[(3 & n) << 4], t += '==') : 4 == o && (t += r[(15 & n) << 2], t += '='), t;
											}(e),
											i(f));
								},
								f.src = c,
								we.safeSetTimeout(function() {
									i(f);
								}, 1e4);
						}
					};
					t.preloadPlugins.push(r);
					var n = t.canvas;
					n &&
						(n.requestPointerLock = n.requestPointerLock || n.mozRequestPointerLock || n.webkitRequestPointerLock || n.msRequestPointerLock || function() {},
							n.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock || document.msExitPointerLock ||
								function() {},
							n.exitPointerLock = n.exitPointerLock.bind(document),
							document.addEventListener('pointerlockchange', o, !1),
							document.addEventListener('mozpointerlockchange', o, !1),
							document.addEventListener('webkitpointerlockchange', o, !1),
							document.addEventListener('mspointerlockchange', o, !1),
							t.elementPointerLock && n.addEventListener('click', function(e) {
								!we.pointerLock && t.canvas.requestPointerLock && (t.canvas.requestPointerLock(), e.preventDefault());
							}, !1));
				}
				function o() {
					we.pointerLock = document.pointerLockElement === t.canvas || document.mozPointerLockElement === t.canvas || document.webkitPointerLockElement === t.canvas ||
						document.msPointerLockElement === t.canvas;
				}
			},
			createContext: function(e, r, n, o) {
				if (r && t.ctx && e == t.canvas) { return t.ctx; }
				var a, i;
				if (r) {
					var u = { antialias: !1, alpha: !1, majorVersion: 1 };
					if (o) { for (var s in o) { u[s] = o[s]; } }
					void 0 !== xe && (i = xe.createContext(e, u)) && (a = xe.getContext(i).GLctx);
				} else { a = e.getContext('2d'); }
				return a
					? (n &&
						(r || A(void 0 === mr, 'cannot set in module if GLctx is used, but we are a non-GL context that would replace it'),
							t.ctx = a,
							r && xe.makeContextCurrent(i),
							t.useWebGL = r,
							we.moduleContextCreatedCallbacks.forEach(function(e) {
								e();
							}),
							we.init()),
						a)
					: null;
			},
			destroyContext: function(e, r, t) {},
			fullscreenHandlersInstalled: !1,
			lockPointer: void 0,
			resizeCanvas: void 0,
			requestFullscreen: function(e, r) {
				we.lockPointer = e, we.resizeCanvas = r, void 0 === we.lockPointer && (we.lockPointer = !0), void 0 === we.resizeCanvas && (we.resizeCanvas = !1);
				var n = t.canvas;
				function o() {
					we.isFullscreen = !1;
					var e = n.parentNode;
					(document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement ||
							document.webkitCurrentFullScreenElement) === e
						? (n.exitFullscreen = we.exitFullscreen,
							we.lockPointer && n.requestPointerLock(),
							we.isFullscreen = !0,
							we.resizeCanvas ? we.setFullscreenCanvasSize() : we.updateCanvasDimensions(n))
						: (e.parentNode.insertBefore(n, e), e.parentNode.removeChild(e), we.resizeCanvas ? we.setWindowedCanvasSize() : we.updateCanvasDimensions(n)),
						t.onFullScreen && t.onFullScreen(we.isFullscreen),
						t.onFullscreen && t.onFullscreen(we.isFullscreen);
				}
				we.fullscreenHandlersInstalled ||
					(we.fullscreenHandlersInstalled = !0,
						document.addEventListener('fullscreenchange', o, !1),
						document.addEventListener('mozfullscreenchange', o, !1),
						document.addEventListener('webkitfullscreenchange', o, !1),
						document.addEventListener('MSFullscreenChange', o, !1));
				var a = document.createElement('div');
				n.parentNode.insertBefore(a, n),
					a.appendChild(n),
					a.requestFullscreen = a.requestFullscreen || a.mozRequestFullScreen || a.msRequestFullscreen || (a.webkitRequestFullscreen
						? function() {
							a.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
						}
						: null) ||
						(a.webkitRequestFullScreen
							? function() {
								a.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
							}
							: null),
					a.requestFullscreen();
			},
			exitFullscreen: function() {
				return !!we.isFullscreen &&
					((document.exitFullscreen || document.cancelFullScreen || document.mozCancelFullScreen || document.msExitFullscreen || document.webkitCancelFullScreen ||
						function() {}).apply(document, []),
						!0);
			},
			nextRAF: 0,
			fakeRequestAnimationFrame: function(e) {
				var r = Date.now();
				if (0 === we.nextRAF) { we.nextRAF = r + 1e3 / 60; }
				else { for (; r + 2 >= we.nextRAF;) { we.nextRAF += 1e3 / 60; } }
				var t = Math.max(we.nextRAF - r, 0);
				setTimeout(e, t);
			},
			requestAnimationFrame: function(e) {
				'function' != typeof requestAnimationFrame ? (0, we.fakeRequestAnimationFrame)(e) : requestAnimationFrame(e);
			},
			safeRequestAnimationFrame: function(e) {
				return we.requestAnimationFrame(function() {
					S || e();
				});
			},
			safeSetTimeout: function(e, r) {
				return D = !0,
					setTimeout(function() {
						S || e();
					}, r);
			},
			getMimetype: function(e) {
				return {
					jpg: 'image/jpeg',
					jpeg: 'image/jpeg',
					png: 'image/png',
					bmp: 'image/bmp',
					ogg: 'audio/ogg',
					wav: 'audio/wav',
					mp3: 'audio/mpeg'
				}[e.substr(e.lastIndexOf('.') + 1)];
			},
			getUserMedia: function(e) {
				window.getUserMedia || (window.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia), window.getUserMedia(e);
			},
			getMovementX: function(e) {
				return e.movementX || e.mozMovementX || e.webkitMovementX || 0;
			},
			getMovementY: function(e) {
				return e.movementY || e.mozMovementY || e.webkitMovementY || 0;
			},
			getMouseWheelDelta: function(e) {
				var r = 0;
				switch (e.type) {
					case 'DOMMouseScroll':
						r = e.detail / 3;
						break;
					case 'mousewheel':
						r = e.wheelDelta / 120;
						break;
					case 'wheel':
						switch (r = e.deltaY, e.deltaMode) {
							case 0:
								r /= 100;
								break;
							case 1:
								r /= 3;
								break;
							case 2:
								r *= 80;
								break;
							default:
								throw 'unrecognized mouse wheel delta mode: ' + e.deltaMode;
						}
						break;
					default:
						throw 'unrecognized mouse wheel event: ' + e.type;
				}
				return r;
			},
			mouseX: 0,
			mouseY: 0,
			mouseMovementX: 0,
			mouseMovementY: 0,
			touches: {},
			lastTouches: {},
			calculateMouseEvent: function(e) {
				if (we.pointerLock) {
					'mousemove' != e.type && 'mozMovementX' in e
						? we.mouseMovementX = we.mouseMovementY = 0
						: (we.mouseMovementX = we.getMovementX(e), we.mouseMovementY = we.getMovementY(e)),
						'undefined' != typeof SDL
							? (we.mouseX = SDL.mouseX + we.mouseMovementX, we.mouseY = SDL.mouseY + we.mouseMovementY)
							: (we.mouseX += we.mouseMovementX, we.mouseY += we.mouseMovementY);
				} else {
					var r = t.canvas.getBoundingClientRect(),
						n = t.canvas.width,
						o = t.canvas.height,
						a = void 0 !== window.scrollX ? window.scrollX : window.pageXOffset,
						i = void 0 !== window.scrollY ? window.scrollY : window.pageYOffset;
					if ('touchstart' === e.type || 'touchend' === e.type || 'touchmove' === e.type) {
						var u = e.touch;
						if (void 0 === u) { return; }
						var s = u.pageX - (a + r.left), c = u.pageY - (i + r.top), f = { x: s *= n / r.width, y: c *= o / r.height };
						if ('touchstart' === e.type) { we.lastTouches[u.identifier] = f, we.touches[u.identifier] = f; }
						else if ('touchend' === e.type || 'touchmove' === e.type) {
							var l = we.touches[u.identifier];
							l || (l = f), we.lastTouches[u.identifier] = l, we.touches[u.identifier] = f;
						}
						return;
					}
					var d = e.pageX - (a + r.left), m = e.pageY - (i + r.top);
					d *= n / r.width, m *= o / r.height, we.mouseMovementX = d - we.mouseX, we.mouseMovementY = m - we.mouseY, we.mouseX = d, we.mouseY = m;
				}
			},
			asyncLoad: function(e, r, t, n) {
				var o = n ? '' : re('al ' + e);
				d(e, function(t) {
					A(t, 'Loading data file "' + e + '" failed (no arrayBuffer).'), r(new Uint8Array(t)), o && ne();
				}, function(r) {
					if (!t) { throw 'Loading data file "' + e + '" failed.'; }
					t();
				}), o && te();
			},
			resizeListeners: [],
			updateResizeListeners: function() {
				var e = t.canvas;
				we.resizeListeners.forEach(function(r) {
					r(e.width, e.height);
				});
			},
			setCanvasSize: function(e, r, n) {
				var o = t.canvas;
				we.updateCanvasDimensions(o, e, r), n || we.updateResizeListeners();
			},
			windowedWidth: 0,
			windowedHeight: 0,
			setFullscreenCanvasSize: function() {
				if ('undefined' != typeof SDL) {
					var e = P[SDL.screen >> 2];
					e |= 8388608, M[SDL.screen >> 2] = e;
				}
				we.updateCanvasDimensions(t.canvas), we.updateResizeListeners();
			},
			setWindowedCanvasSize: function() {
				if ('undefined' != typeof SDL) {
					var e = P[SDL.screen >> 2];
					e &= -8388609, M[SDL.screen >> 2] = e;
				}
				we.updateCanvasDimensions(t.canvas), we.updateResizeListeners();
			},
			updateCanvasDimensions: function(e, r, n) {
				r && n ? (e.widthNative = r, e.heightNative = n) : (r = e.widthNative, n = e.heightNative);
				var o = r, a = n;
				if (
					t.forcedAspectRatio && t.forcedAspectRatio > 0 &&
					(o / a < t.forcedAspectRatio ? o = Math.round(a * t.forcedAspectRatio) : a = Math.round(o / t.forcedAspectRatio)),
						(document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement ||
								document.webkitCurrentFullScreenElement) === e.parentNode && 'undefined' != typeof screen
				) {
					var i = Math.min(screen.width / o, screen.height / a);
					o = Math.round(o * i), a = Math.round(a * i);
				}
				we.resizeCanvas
					? (e.width != o && (e.width = o), e.height != a && (e.height = a), void 0 !== e.style && (e.style.removeProperty('width'), e.style.removeProperty('height')))
					: (e.width != r && (e.width = r),
						e.height != n && (e.height = n),
						void 0 !== e.style && (o != r || a != n
							? (e.style.setProperty('width', o + 'px', 'important'), e.style.setProperty('height', a + 'px', 'important'))
							: (e.style.removeProperty('width'), e.style.removeProperty('height'))));
			},
			wgetRequests: {},
			nextWgetRequestHandle: 0,
			getNextWgetRequestHandle: function() {
				var e = we.nextWgetRequestHandle;
				return we.nextWgetRequestHandle++, e;
			}
		},
		be = {
			BUFFER_SIZE: 2048,
			context: null,
			buffers: [],
			numBuffers: 0,
			bufIndex: 0,
			bufOffset: 0,
			startTime: 0,
			nonblock: !1,
			currentTimeWorkaround: !1,
			setStartTime: function() {
				be.context.currentTime ? (be.startTime = window.performance.now() - 1e3 * be.context.currentTime, t.resumeMainLoop()) : window.setTimeout(be.setStartTime, 0);
			},
			getCurrentPerfTime: function() {
				return be.startTime ? (window.performance.now() - be.startTime) / 1e3 : 0;
			},
			process: function(e) {
				for (var r = be.getCurrentPerfTime(), t = 0; t < be.bufIndex; t++) {
					if (0 !== be.buffers[t].endTime && be.buffers[t].endTime < r) {
						be.buffers[t].endTime = 0;
						var n = be.buffers.splice(t, 1);
						be.buffers[be.numBuffers - 1] = n[0], t--, be.bufIndex--;
					}
				}
			},
			fillBuffer: function(e, r) {
				var t = 0;
				const n = be.buffers[be.bufIndex].getChannelData(0), o = be.buffers[be.bufIndex].getChannelData(1);
				for (; r && be.bufOffset !== be.BUFFER_SIZE;) { n[be.bufOffset] = R[e + 8 * t >> 2], o[be.bufOffset] = R[e + (8 * t + 4) >> 2], be.bufOffset++, t++, r--; }
				return t;
			},
			queueAudio: function() {
				var e, r = be.bufIndex;
				e = be.bufIndex ? be.buffers[be.bufIndex - 1].endTime : be.context.currentTime, be.buffers[r].endTime = e + be.buffers[r].duration;
				const t = be.context.createBufferSource();
				t.buffer = be.buffers[r], t.connect(be.context.destination), t.start(e), be.bufIndex++, be.bufOffset = 0;
			},
			block: function() {
				do {
					be.process();
				} while (be.bufIndex === be.numBuffers);
			}
		};
	var ye = {
		RETRO_CAMERA_BUFFER_OPENGL_TEXTURE: 0,
		RETRO_CAMERA_BUFFER_RAW_FRAMEBUFFER: 1,
		tmp: null,
		contexts: [],
		counter: 0,
		ready: function(e) {
			return 2 == ye.contexts[e].runMode && !ye.contexts[e].videoElement.paused && 0 != ye.contexts[e].videoElement.videoWidth &&
				0 != ye.contexts[e].videoElement.videoHeight;
		}
	};
	var xe = {
		counter: 1,
		buffers: [],
		programs: [],
		framebuffers: [],
		renderbuffers: [],
		textures: [],
		uniforms: [],
		shaders: [],
		vaos: [],
		contexts: [],
		offscreenCanvases: {},
		timerQueriesEXT: [],
		byteSizeByTypeRoot: 5120,
		byteSizeByType: [1, 1, 2, 2, 4, 4, 4, 2, 3, 4, 8],
		programInfos: {},
		stringCache: {},
		unpackAlignment: 4,
		recordError: function(e) {
			xe.lastError || (xe.lastError = e);
		},
		getNewId: function(e) {
			for (var r = xe.counter++, t = e.length; t < r; t++) { e[t] = null; }
			return r;
		},
		MAX_TEMP_BUFFER_SIZE: 2097152,
		numTempVertexBuffersPerSize: 64,
		log2ceilLookup: function(e) {
			return 32 - Math.clz32(0 === e ? 0 : e - 1);
		},
		generateTempBuffers: function(e, r) {
			var t = xe.log2ceilLookup(xe.MAX_TEMP_BUFFER_SIZE);
			r.tempVertexBufferCounters1 = [],
				r.tempVertexBufferCounters2 = [],
				r.tempVertexBufferCounters1.length = r.tempVertexBufferCounters2.length = t + 1,
				r.tempVertexBuffers1 = [],
				r.tempVertexBuffers2 = [],
				r.tempVertexBuffers1.length = r.tempVertexBuffers2.length = t + 1,
				r.tempIndexBuffers = [],
				r.tempIndexBuffers.length = t + 1;
			for (var n = 0; n <= t; ++n) {
				r.tempIndexBuffers[n] = null, r.tempVertexBufferCounters1[n] = r.tempVertexBufferCounters2[n] = 0;
				var o = xe.numTempVertexBuffersPerSize;
				r.tempVertexBuffers1[n] = [], r.tempVertexBuffers2[n] = [];
				var a = r.tempVertexBuffers1[n], i = r.tempVertexBuffers2[n];
				a.length = i.length = o;
				for (var u = 0; u < o; ++u) { a[u] = i[u] = null; }
			}
			if (e) {
				r.tempQuadIndexBuffer = mr.createBuffer(), r.GLctx.bindBuffer(34963, r.tempQuadIndexBuffer);
				for (
					var s = xe.MAX_TEMP_BUFFER_SIZE >> 1, c = new Uint16Array(s), f = (n = 0, 0);
					!(c[n++] = f, n >= s || (c[n++] = f + 1, n >= s) || (c[n++] = f + 2, n >= s) || (c[n++] = f, n >= s) || (c[n++] = f + 2, n >= s) || (c[n++] = f + 3, n >= s));
				) { f += 4; }
				r.GLctx.bufferData(34963, c, 35044), r.GLctx.bindBuffer(34963, null);
			}
		},
		getTempVertexBuffer: function(e) {
			var r = xe.log2ceilLookup(e), t = xe.currentContext.tempVertexBuffers1[r], n = xe.currentContext.tempVertexBufferCounters1[r];
			xe.currentContext.tempVertexBufferCounters1[r] = xe.currentContext.tempVertexBufferCounters1[r] + 1 & xe.numTempVertexBuffersPerSize - 1;
			var o = t[n];
			if (o) { return o; }
			var a = mr.getParameter(34964);
			return t[n] = mr.createBuffer(), mr.bindBuffer(34962, t[n]), mr.bufferData(34962, 1 << r, 35048), mr.bindBuffer(34962, a), t[n];
		},
		getTempIndexBuffer: function(e) {
			var r = xe.log2ceilLookup(e), t = xe.currentContext.tempIndexBuffers[r];
			if (t) { return t; }
			var n = mr.getParameter(34965);
			return xe.currentContext.tempIndexBuffers[r] = mr.createBuffer(),
				mr.bindBuffer(34963, xe.currentContext.tempIndexBuffers[r]),
				mr.bufferData(34963, 1 << r, 35048),
				mr.bindBuffer(34963, n),
				xe.currentContext.tempIndexBuffers[r];
		},
		newRenderingFrameStarted: function() {
			if (xe.currentContext) {
				var e = xe.currentContext.tempVertexBuffers1;
				xe.currentContext.tempVertexBuffers1 = xe.currentContext.tempVertexBuffers2,
					xe.currentContext.tempVertexBuffers2 = e,
					e = xe.currentContext.tempVertexBufferCounters1,
					xe.currentContext.tempVertexBufferCounters1 = xe.currentContext.tempVertexBufferCounters2,
					xe.currentContext.tempVertexBufferCounters2 = e;
				for (var r = xe.log2ceilLookup(xe.MAX_TEMP_BUFFER_SIZE), t = 0; t <= r; ++t) { xe.currentContext.tempVertexBufferCounters1[t] = 0; }
			}
		},
		getSource: function(e, r, t, n) {
			for (var o = '', a = 0; a < r; ++a) {
				var i = n ? M[n + 4 * a >> 2] : -1;
				o += U(M[t + 4 * a >> 2], i < 0 ? void 0 : i);
			}
			return o;
		},
		calcBufLength: function(e, r, t, n) {
			return t > 0 ? n * t : e * xe.byteSizeByType[r - xe.byteSizeByTypeRoot] * n;
		},
		usedTempBuffers: [],
		preDrawHandleClientVertexAttribBindings: function(e) {
			xe.resetBufferBinding = !1;
			for (var r = 0; r < xe.currentContext.maxVertexAttribs; ++r) {
				var t = xe.currentContext.clientBuffers[r];
				if (t.clientside && t.enabled) {
					xe.resetBufferBinding = !0;
					var n = xe.calcBufLength(t.size, t.type, t.stride, e), o = xe.getTempVertexBuffer(n);
					mr.bindBuffer(34962, o),
						mr.bufferSubData(34962, 0, B.subarray(t.ptr, t.ptr + n)),
						t.vertexAttribPointerAdaptor.call(mr, r, t.size, t.type, t.normalized, t.stride, 0);
				}
			}
		},
		postDrawHandleClientVertexAttribBindings: function() {
			xe.resetBufferBinding && mr.bindBuffer(34962, xe.buffers[mr.currentArrayBufferBinding]);
		},
		createContext: function(e, r) {
			var t = e.getContext('webgl', r);
			return t ? xe.registerContext(t, r) : 0;
		},
		registerContext: function(e, r) {
			var t = xe.getNewId(xe.contexts), n = { handle: t, attributes: r, version: r.majorVersion, GLctx: e };
			e.canvas && (e.canvas.GLctxObject = n),
				xe.contexts[t] = n,
				(void 0 === r.enableExtensionsByDefault || r.enableExtensionsByDefault) && xe.initExtensions(n),
				n.maxVertexAttribs = n.GLctx.getParameter(34921),
				n.clientBuffers = [];
			for (var o = 0; o < n.maxVertexAttribs; o++) {
				n.clientBuffers[o] = { enabled: !1, clientside: !1, size: 0, type: 0, normalized: 0, stride: 0, ptr: 0, vertexAttribPointerAdaptor: null };
			}
			return xe.generateTempBuffers(!1, n), t;
		},
		makeContextCurrent: function(e) {
			return xe.currentContext = xe.contexts[e], t.ctx = mr = xe.currentContext && xe.currentContext.GLctx, !(e && !mr);
		},
		getContext: function(e) {
			return xe.contexts[e];
		},
		deleteContext: function(e) {
			xe.currentContext === xe.contexts[e] && (xe.currentContext = null),
				'object' == typeof Ge && Ge.removeAllHandlersOnTarget(xe.contexts[e].GLctx.canvas),
				xe.contexts[e] && xe.contexts[e].GLctx.canvas && (xe.contexts[e].GLctx.canvas.GLctxObject = void 0),
				xe.contexts[e] = null;
		},
		initExtensions: function(e) {
			if (e || (e = xe.currentContext), !e.initExtensionsDone) {
				e.initExtensionsDone = !0;
				var r, t = e.GLctx;
				!function(e) {
					var r = e.getExtension('ANGLE_instanced_arrays');
					if (r) {
						e.vertexAttribDivisor = function(e, t) {
							r.vertexAttribDivisorANGLE(e, t);
						},
							e.drawArraysInstanced = function(e, t, n, o) {
								r.drawArraysInstancedANGLE(e, t, n, o);
							},
							e.drawElementsInstanced = function(e, t, n, o, a) {
								r.drawElementsInstancedANGLE(e, t, n, o, a);
							};
					}
				}(t),
					function(e) {
						var r = e.getExtension('OES_vertex_array_object');
						if (r) {
							e.createVertexArray = function() {
								return r.createVertexArrayOES();
							},
								e.deleteVertexArray = function(e) {
									r.deleteVertexArrayOES(e);
								},
								e.bindVertexArray = function(e) {
									r.bindVertexArrayOES(e);
								},
								e.isVertexArray = function(e) {
									return r.isVertexArrayOES(e);
								};
						}
					}(t),
					function(e) {
						var r = e.getExtension('WEBGL_draw_buffers');
						if (r) {
							e.drawBuffers = function(e, t) {
								r.drawBuffersWEBGL(e, t);
							};
						}
					}(t),
					t.disjointTimerQueryExt = t.getExtension('EXT_disjoint_timer_query'),
					(r = t).multiDrawWebgl = r.getExtension('WEBGL_multi_draw'),
					(t.getSupportedExtensions() || []).forEach(function(e) {
						e.indexOf('lose_context') < 0 && e.indexOf('debug') < 0 && t.getExtension(e);
					});
			}
		},
		populateUniformTable: function(e) {
			for (
				var r = xe.programs[e],
					t = xe.programInfos[e] = { uniforms: {}, maxUniformLength: 0, maxAttributeLength: -1, maxUniformBlockNameLength: -1 },
					n = t.uniforms,
					o = mr.getProgramParameter(r, 35718),
					a = 0;
				a < o;
				++a
			) {
				var i = mr.getActiveUniform(r, a), u = i.name;
				t.maxUniformLength = Math.max(t.maxUniformLength, u.length + 1), ']' == u.slice(-1) && (u = u.slice(0, u.lastIndexOf('[')));
				var s = mr.getUniformLocation(r, u);
				if (s) {
					var c = xe.getNewId(xe.uniforms);
					n[u] = [i.size, c], xe.uniforms[c] = s;
					for (var f = 1; f < i.size; ++f) {
						var l = u + '[' + f + ']';
						s = mr.getUniformLocation(r, l), c = xe.getNewId(xe.uniforms), xe.uniforms[c] = s;
					}
				}
			}
		}
	};
	function ke(e, r) {
		mr.bindTexture(e, xe.textures[r]);
	}
	function _e(e, r) {
		P[e >> 2] = r, P[e + 4 >> 2] = (r - P[e >> 2]) / 4294967296;
	}
	function De(e, r, t) {
		if (r) {
			var n = void 0;
			switch (e) {
				case 36346:
					n = 1;
					break;
				case 36344:
					return void (0 != t && 1 != t && xe.recordError(1280));
				case 36345:
					n = 0;
					break;
				case 34466:
					var o = mr.getParameter(34467);
					n = o ? o.length : 0;
			}
			if (void 0 === n) {
				var a = mr.getParameter(e);
				switch (typeof a) {
					case 'number':
						n = a;
						break;
					case 'boolean':
						n = a ? 1 : 0;
						break;
					case 'string':
						return void xe.recordError(1280);
					case 'object':
						if (null === a) {
							switch (e) {
								case 34964:
								case 35725:
								case 34965:
								case 36006:
								case 36007:
								case 32873:
								case 34229:
								case 34068:
									n = 0;
									break;
								default:
									return void xe.recordError(1280);
							}
						} else {
							if (a instanceof Float32Array || a instanceof Uint32Array || a instanceof Int32Array || a instanceof Array) {
								for (var i = 0; i < a.length; ++i) {
									switch (t) {
										case 0:
											M[r + 4 * i >> 2] = a[i];
											break;
										case 2:
											R[r + 4 * i >> 2] = a[i];
											break;
										case 4:
											C[r + i >> 0] = a[i] ? 1 : 0;
									}
								}
								return;
							}
							try {
								n = 0 | a.name;
							} catch (r) {
								return xe.recordError(1280),
									void E('GL_INVALID_ENUM in glGet' + t + 'v: Unknown object returned from WebGL getParameter(' + e + ')! (error: ' + r + ')');
							}
						}
						break;
					default:
						return xe.recordError(1280),
							void E('GL_INVALID_ENUM in glGet' + t + 'v: Native code calling glGet' + t + 'v(' + e + ') and it returns ' + a + ' of type ' + typeof a + '!');
				}
			}
			switch (t) {
				case 1:
					_e(r, n);
					break;
				case 0:
					M[r >> 2] = n;
					break;
				case 2:
					R[r >> 2] = n;
					break;
				case 4:
					C[r >> 0] = n ? 1 : 0;
			}
		} else { xe.recordError(1281); }
	}
	function Se(e, r) {
		De(e, r, 0);
	}
	function Ae(e, r, t, n) {
		for (var o = 0; o < e; o++) {
			var a = mr[t](), i = a && xe.getNewId(n);
			a ? (a.name = i, n[i] = a) : xe.recordError(1282), M[r + 4 * o >> 2] = i;
		}
	}
	function Le(e, r) {
		Ae(e, r, 'createTexture', xe.textures);
	}
	function Ce(e, r, t) {
		mr.texParameteri(e, r, t);
	}
	function Be(e, r) {
		for (var t = 0; t < e; t++) {
			var n = M[r + 4 * t >> 2], o = xe.textures[n];
			o && (mr.deleteTexture(o), o.name = 0, xe.textures[n] = null);
		}
	}
	function Fe() {
		if (!Fe.called) {
			Fe.called = !0;
			var e = (new Date()).getFullYear(), r = new Date(e, 0, 1), t = new Date(e, 6, 1), n = r.getTimezoneOffset(), o = t.getTimezoneOffset(), a = Math.max(n, o);
			M[Fr() >> 2] = 60 * a, M[Br() >> 2] = Number(n != o);
			var i = f(r), u = f(t), s = G(i), c = G(u);
			o < n ? (M[Cr() >> 2] = s, M[Cr() + 4 >> 2] = c) : (M[Cr() >> 2] = c, M[Cr() + 4 >> 2] = s);
		}
		function f(e) {
			var r = e.toTimeString().match(/\(([A-Za-z ]+)\)$/);
			return r ? r[1] : 'GMT';
		}
	}
	function Te(e) {
		return M[Lr() >> 2] = e, e;
	}
	var Me = {
		splitPath: function(e) {
			return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(e).slice(1);
		},
		normalizeArray: function(e, r) {
			for (var t = 0, n = e.length - 1; n >= 0; n--) {
				var o = e[n];
				'.' === o ? e.splice(n, 1) : '..' === o ? (e.splice(n, 1), t++) : t && (e.splice(n, 1), t--);
			}
			if (r) { for (; t; t--) { e.unshift('..'); } }
			return e;
		},
		normalize: function(e) {
			var r = '/' === e.charAt(0), t = '/' === e.substr(-1);
			return (e = Me.normalizeArray(
				e.split('/').filter(function(e) {
					return !!e;
				}),
				!r
			).join('/')) || r || (e = '.'),
				e && t && (e += '/'),
				(r ? '/' : '') + e;
		},
		dirname: function(e) {
			var r = Me.splitPath(e), t = r[0], n = r[1];
			return t || n ? (n && (n = n.substr(0, n.length - 1)), t + n) : '.';
		},
		basename: function(e) {
			if ('/' === e) { return '/'; }
			var r = (e = (e = Me.normalize(e)).replace(/\/$/, '')).lastIndexOf('/');
			return -1 === r ? e : e.substr(r + 1);
		},
		extname: function(e) {
			return Me.splitPath(e)[3];
		},
		join: function() {
			var e = Array.prototype.slice.call(arguments, 0);
			return Me.normalize(e.join('/'));
		},
		join2: function(e, r) {
			return Me.normalize(e + '/' + r);
		}
	};
	var Pe = {
			resolve: function() {
				for (var e = '', r = !1, t = arguments.length - 1; t >= -1 && !r; t--) {
					var n = t >= 0 ? arguments[t] : Ne.cwd();
					if ('string' != typeof n) { throw new TypeError('Arguments to path.resolve must be strings'); }
					if (!n) { return ''; }
					e = n + '/' + e, r = '/' === n.charAt(0);
				}
				return (r ? '/' : '') + (e = Me.normalizeArray(
							e.split('/').filter(function(e) {
								return !!e;
							}),
							!r
						).join('/')) || '.';
			},
			relative: function(e, r) {
				function t(e) {
					for (var r = 0; r < e.length && '' === e[r]; r++);
					for (var t = e.length - 1; t >= 0 && '' === e[t]; t--);
					return r > t ? [] : e.slice(r, t - r + 1);
				}
				e = Pe.resolve(e).substr(1), r = Pe.resolve(r).substr(1);
				for (var n = t(e.split('/')), o = t(r.split('/')), a = Math.min(n.length, o.length), i = a, u = 0; u < a; u++) {
					if (n[u] !== o[u]) {
						i = u;
						break;
					}
				}
				var s = [];
				for (u = i; u < n.length; u++) { s.push('..'); }
				return (s = s.concat(o.slice(i))).join('/');
			}
		},
		Re = {
			ttys: [],
			init: function() {},
			shutdown: function() {},
			register: function(e, r) {
				Re.ttys[e] = { input: [], output: [], ops: r }, Ne.registerDevice(e, Re.stream_ops);
			},
			stream_ops: {
				open: function(e) {
					var r = Re.ttys[e.node.rdev];
					if (!r) { throw new Ne.ErrnoError(43); }
					e.tty = r, e.seekable = !1;
				},
				close: function(e) {
					e.tty.ops.flush(e.tty);
				},
				flush: function(e) {
					e.tty.ops.flush(e.tty);
				},
				read: function(e, r, t, n, o) {
					if (!e.tty || !e.tty.ops.get_char) { throw new Ne.ErrnoError(60); }
					for (var a = 0, i = 0; i < n; i++) {
						var u;
						try {
							u = e.tty.ops.get_char(e.tty);
						} catch (e) {
							throw new Ne.ErrnoError(29);
						}
						if (void 0 === u && 0 === a) { throw new Ne.ErrnoError(6); }
						if (null == u) { break; }
						a++, r[t + i] = u;
					}
					return a && (e.node.timestamp = Date.now()), a;
				},
				write: function(e, r, t, n, o) {
					if (!e.tty || !e.tty.ops.put_char) { throw new Ne.ErrnoError(60); }
					try {
						for (var a = 0; a < n; a++) { e.tty.ops.put_char(e.tty, r[t + a]); }
					} catch (e) {
						throw new Ne.ErrnoError(29);
					}
					return n && (e.node.timestamp = Date.now()), a;
				}
			},
			default_tty_ops: {
				get_char: function(e) {
					if (!e.input.length) {
						var r = null;
						if (f) {
							var t = Buffer.alloc ? Buffer.alloc(256) : new Buffer(256), n = 0;
							try {
								n = p.readSync(process.stdin.fd, t, 0, 256, null);
							} catch (e) {
								if (-1 == e.toString().indexOf('EOF')) { throw e; }
								n = 0;
							}
							r = n > 0 ? t.slice(0, n).toString('utf-8') : null;
						} else {'undefined' != typeof window && 'function' == typeof window.prompt
								? null !== (r = window.prompt('Input: ')) && (r += '\n')
								: 'function' == typeof readline && null !== (r = readline()) && (r += '\n');}
						if (!r) { return null; }
						e.input = xr(r, !0);
					}
					return e.input.shift();
				},
				put_char: function(e, r) {
					null === r || 10 === r ? (h(N(e.output, 0)), e.output = []) : 0 != r && e.output.push(r);
				},
				flush: function(e) {
					e.output && e.output.length > 0 && (h(N(e.output, 0)), e.output = []);
				}
			},
			default_tty1_ops: {
				put_char: function(e, r) {
					null === r || 10 === r ? (E(N(e.output, 0)), e.output = []) : 0 != r && e.output.push(r);
				},
				flush: function(e) {
					e.output && e.output.length > 0 && (E(N(e.output, 0)), e.output = []);
				}
			}
		};
	function Oe(e) {
		for (
			var r = function(e, r) {
					return r || (r = w), Math.ceil(e / r) * r;
				}(e, 16384),
				t = Ar(r);
			e < r;
		) { C[t + e++] = 0; }
		return t;
	}
	var Ie = {
			ops_table: null,
			mount: function(e) {
				return Ie.createNode(null, '/', 16895, 0);
			},
			createNode: function(e, r, t, n) {
				if (Ne.isBlkdev(t) || Ne.isFIFO(t)) { throw new Ne.ErrnoError(63); }
				Ie.ops_table || (Ie.ops_table = {
					dir: {
						node: {
							getattr: Ie.node_ops.getattr,
							setattr: Ie.node_ops.setattr,
							lookup: Ie.node_ops.lookup,
							mknod: Ie.node_ops.mknod,
							rename: Ie.node_ops.rename,
							unlink: Ie.node_ops.unlink,
							rmdir: Ie.node_ops.rmdir,
							readdir: Ie.node_ops.readdir,
							symlink: Ie.node_ops.symlink
						},
						stream: { llseek: Ie.stream_ops.llseek }
					},
					file: {
						node: { getattr: Ie.node_ops.getattr, setattr: Ie.node_ops.setattr },
						stream: {
							llseek: Ie.stream_ops.llseek,
							read: Ie.stream_ops.read,
							write: Ie.stream_ops.write,
							allocate: Ie.stream_ops.allocate,
							mmap: Ie.stream_ops.mmap,
							msync: Ie.stream_ops.msync
						}
					},
					link: { node: { getattr: Ie.node_ops.getattr, setattr: Ie.node_ops.setattr, readlink: Ie.node_ops.readlink }, stream: {} },
					chrdev: { node: { getattr: Ie.node_ops.getattr, setattr: Ie.node_ops.setattr }, stream: Ne.chrdev_stream_ops }
				});
				var o = Ne.createNode(e, r, t, n);
				return Ne.isDir(o.mode)
					? (o.node_ops = Ie.ops_table.dir.node, o.stream_ops = Ie.ops_table.dir.stream, o.contents = {})
					: Ne.isFile(o.mode)
					? (o.node_ops = Ie.ops_table.file.node, o.stream_ops = Ie.ops_table.file.stream, o.usedBytes = 0, o.contents = null)
					: Ne.isLink(o.mode)
					? (o.node_ops = Ie.ops_table.link.node, o.stream_ops = Ie.ops_table.link.stream)
					: Ne.isChrdev(o.mode) && (o.node_ops = Ie.ops_table.chrdev.node, o.stream_ops = Ie.ops_table.chrdev.stream),
					o.timestamp = Date.now(),
					e && (e.contents[r] = o, e.timestamp = o.timestamp),
					o;
			},
			getFileDataAsTypedArray: function(e) {
				return e.contents ? e.contents.subarray ? e.contents.subarray(0, e.usedBytes) : new Uint8Array(e.contents) : new Uint8Array(0);
			},
			expandFileStorage: function(e, r) {
				var t = e.contents ? e.contents.length : 0;
				if (!(t >= r)) {
					r = Math.max(r, t * (t < 1048576 ? 2 : 1.125) >>> 0), 0 != t && (r = Math.max(r, 256));
					var n = e.contents;
					e.contents = new Uint8Array(r), e.usedBytes > 0 && e.contents.set(n.subarray(0, e.usedBytes), 0);
				}
			},
			resizeFileStorage: function(e, r) {
				if (e.usedBytes != r) {
					if (0 == r) { e.contents = null, e.usedBytes = 0; }
					else {
						var t = e.contents;
						e.contents = new Uint8Array(r), t && e.contents.set(t.subarray(0, Math.min(r, e.usedBytes))), e.usedBytes = r;
					}
				}
			},
			node_ops: {
				getattr: function(e) {
					var r = {};
					return r.dev = Ne.isChrdev(e.mode) ? e.id : 1,
						r.ino = e.id,
						r.mode = e.mode,
						r.nlink = 1,
						r.uid = 0,
						r.gid = 0,
						r.rdev = e.rdev,
						Ne.isDir(e.mode) ? r.size = 4096 : Ne.isFile(e.mode) ? r.size = e.usedBytes : Ne.isLink(e.mode) ? r.size = e.link.length : r.size = 0,
						r.atime = new Date(e.timestamp),
						r.mtime = new Date(e.timestamp),
						r.ctime = new Date(e.timestamp),
						r.blksize = 4096,
						r.blocks = Math.ceil(r.size / r.blksize),
						r;
				},
				setattr: function(e, r) {
					void 0 !== r.mode && (e.mode = r.mode), void 0 !== r.timestamp && (e.timestamp = r.timestamp), void 0 !== r.size && Ie.resizeFileStorage(e, r.size);
				},
				lookup: function(e, r) {
					throw Ne.genericErrors[44];
				},
				mknod: function(e, r, t, n) {
					return Ie.createNode(e, r, t, n);
				},
				rename: function(e, r, t) {
					if (Ne.isDir(e.mode)) {
						var n;
						try {
							n = Ne.lookupNode(r, t);
						} catch (e) {}
						if (n) { for (var o in n.contents) { throw new Ne.ErrnoError(55); } }
					}
					delete e.parent.contents[e.name], e.parent.timestamp = Date.now(), e.name = t, r.contents[t] = e, r.timestamp = e.parent.timestamp, e.parent = r;
				},
				unlink: function(e, r) {
					delete e.contents[r], e.timestamp = Date.now();
				},
				rmdir: function(e, r) {
					var t = Ne.lookupNode(e, r);
					for (var n in t.contents) { throw new Ne.ErrnoError(55); }
					delete e.contents[r], e.timestamp = Date.now();
				},
				readdir: function(e) {
					var r = ['.', '..'];
					for (var t in e.contents) { e.contents.hasOwnProperty(t) && r.push(t); }
					return r;
				},
				symlink: function(e, r, t) {
					var n = Ie.createNode(e, r, 41471, 0);
					return n.link = t, n;
				},
				readlink: function(e) {
					if (!Ne.isLink(e.mode)) { throw new Ne.ErrnoError(28); }
					return e.link;
				}
			},
			stream_ops: {
				read: function(e, r, t, n, o) {
					var a = e.node.contents;
					if (o >= e.node.usedBytes) { return 0; }
					var i = Math.min(e.node.usedBytes - o, n);
					if (i > 8 && a.subarray) { r.set(a.subarray(o, o + i), t); }
					else { for (var u = 0; u < i; u++) { r[t + u] = a[o + u]; } }
					return i;
				},
				write: function(e, r, t, n, o, a) {
					if (r.buffer === C.buffer && (a = !1), !n) { return 0; }
					var i = e.node;
					if (i.timestamp = Date.now(), r.subarray && (!i.contents || i.contents.subarray)) {
						if (a) { return i.contents = r.subarray(t, t + n), i.usedBytes = n, n; }
						if (0 === i.usedBytes && 0 === o) { return i.contents = r.slice(t, t + n), i.usedBytes = n, n; }
						if (o + n <= i.usedBytes) { return i.contents.set(r.subarray(t, t + n), o), n; }
					}
					if (Ie.expandFileStorage(i, o + n), i.contents.subarray && r.subarray) { i.contents.set(r.subarray(t, t + n), o); }
					else { for (var u = 0; u < n; u++) { i.contents[o + u] = r[t + u]; } }
					return i.usedBytes = Math.max(i.usedBytes, o + n), n;
				},
				llseek: function(e, r, t) {
					var n = r;
					if (1 === t ? n += e.position : 2 === t && Ne.isFile(e.node.mode) && (n += e.node.usedBytes), n < 0) { throw new Ne.ErrnoError(28); }
					return n;
				},
				allocate: function(e, r, t) {
					Ie.expandFileStorage(e.node, r + t), e.node.usedBytes = Math.max(e.node.usedBytes, r + t);
				},
				mmap: function(e, r, t, n, o, a) {
					if (0 !== r) { throw new Ne.ErrnoError(28); }
					if (!Ne.isFile(e.node.mode)) { throw new Ne.ErrnoError(43); }
					var i, u, s = e.node.contents;
					if (2 & a || s.buffer !== L) {
						if ((n > 0 || n + t < s.length) && (s = s.subarray ? s.subarray(n, n + t) : Array.prototype.slice.call(s, n, n + t)), u = !0, !(i = Oe(t))) {
							throw new Ne.ErrnoError(48);
						}
						C.set(s, i);
					} else { u = !1, i = s.byteOffset; }
					return { ptr: i, allocated: u };
				},
				msync: function(e, r, t, n, o) {
					if (!Ne.isFile(e.node.mode)) { throw new Ne.ErrnoError(43); }
					if (2 & o) { return 0; }
					Ie.stream_ops.write(e, r, 0, n, t, !1);
					return 0;
				}
			}
		},
		Ne = {
			root: null,
			mounts: [],
			devices: {},
			streams: [],
			nextInode: 1,
			nameTable: null,
			currentPath: '/',
			initialized: !1,
			ignorePermissions: !0,
			trackingDelegate: {},
			tracking: { openFlags: { READ: 1, WRITE: 2 } },
			ErrnoError: null,
			genericErrors: {},
			filesystems: null,
			syncFSRequests: 0,
			lookupPath: function(e, r) {
				if (r = r || {}, !(e = Pe.resolve(Ne.cwd(), e))) { return { path: '', node: null }; }
				var t = { follow_mount: !0, recurse_count: 0 };
				for (var n in t) { void 0 === r[n] && (r[n] = t[n]); }
				if (r.recurse_count > 8) { throw new Ne.ErrnoError(32); }
				for (
					var o = Me.normalizeArray(
							e.split('/').filter(function(e) {
								return !!e;
							}),
							!1
						),
						a = Ne.root,
						i = '/',
						u = 0;
					u < o.length;
					u++
				) {
					var s = u === o.length - 1;
					if (s && r.parent) { break; }
					if (a = Ne.lookupNode(a, o[u]), i = Me.join2(i, o[u]), Ne.isMountpoint(a) && (!s || s && r.follow_mount) && (a = a.mounted.root), !s || r.follow) {
						for (var c = 0; Ne.isLink(a.mode);) {
							var f = Ne.readlink(i);
							if (i = Pe.resolve(Me.dirname(i), f), a = Ne.lookupPath(i, { recurse_count: r.recurse_count }).node, c++ > 40) {
								throw new Ne.ErrnoError(32);
							}
						}
					}
				}
				return { path: i, node: a };
			},
			getPath: function(e) {
				for (var r;;) {
					if (Ne.isRoot(e)) {
						var t = e.mount.mountpoint;
						return r ? '/' !== t[t.length - 1] ? t + '/' + r : t + r : t;
					}
					r = r ? e.name + '/' + r : e.name, e = e.parent;
				}
			},
			hashName: function(e, r) {
				for (var t = 0, n = 0; n < r.length; n++) { t = (t << 5) - t + r.charCodeAt(n) | 0; }
				return (e + t >>> 0) % Ne.nameTable.length;
			},
			hashAddNode: function(e) {
				var r = Ne.hashName(e.parent.id, e.name);
				e.name_next = Ne.nameTable[r], Ne.nameTable[r] = e;
			},
			hashRemoveNode: function(e) {
				var r = Ne.hashName(e.parent.id, e.name);
				if (Ne.nameTable[r] === e) { Ne.nameTable[r] = e.name_next; }
				else {for (var t = Ne.nameTable[r]; t;) {
						if (t.name_next === e) {
							t.name_next = e.name_next;
							break;
						}
						t = t.name_next;
					}}
			},
			lookupNode: function(e, r) {
				var t = Ne.mayLookup(e);
				if (t) { throw new Ne.ErrnoError(t, e); }
				for (var n = Ne.hashName(e.id, r), o = Ne.nameTable[n]; o; o = o.name_next) {
					var a = o.name;
					if (o.parent.id === e.id && a === r) { return o; }
				}
				return Ne.lookup(e, r);
			},
			createNode: function(e, r, t, n) {
				var o = new Ne.FSNode(e, r, t, n);
				return Ne.hashAddNode(o), o;
			},
			destroyNode: function(e) {
				Ne.hashRemoveNode(e);
			},
			isRoot: function(e) {
				return e === e.parent;
			},
			isMountpoint: function(e) {
				return !!e.mounted;
			},
			isFile: function(e) {
				return 32768 == (61440 & e);
			},
			isDir: function(e) {
				return 16384 == (61440 & e);
			},
			isLink: function(e) {
				return 40960 == (61440 & e);
			},
			isChrdev: function(e) {
				return 8192 == (61440 & e);
			},
			isBlkdev: function(e) {
				return 24576 == (61440 & e);
			},
			isFIFO: function(e) {
				return 4096 == (61440 & e);
			},
			isSocket: function(e) {
				return 49152 == (49152 & e);
			},
			flagModes: { 'r': 0, 'r+': 2, 'w': 577, 'w+': 578, 'a': 1089, 'a+': 1090 },
			modeStringToFlags: function(e) {
				var r = Ne.flagModes[e];
				if (void 0 === r) { throw new Error('Unknown file open mode: ' + e); }
				return r;
			},
			flagsToPermissionString: function(e) {
				var r = ['r', 'w', 'rw'][3 & e];
				return 512 & e && (r += 'w'), r;
			},
			nodePermissions: function(e, r) {
				return Ne.ignorePermissions
					? 0
					: (-1 === r.indexOf('r') || 292 & e.mode) && (-1 === r.indexOf('w') || 146 & e.mode) && (-1 === r.indexOf('x') || 73 & e.mode)
					? 0
					: 2;
			},
			mayLookup: function(e) {
				var r = Ne.nodePermissions(e, 'x');
				return r || (e.node_ops.lookup ? 0 : 2);
			},
			mayCreate: function(e, r) {
				try {
					Ne.lookupNode(e, r);
					return 20;
				} catch (e) {}
				return Ne.nodePermissions(e, 'wx');
			},
			mayDelete: function(e, r, t) {
				var n;
				try {
					n = Ne.lookupNode(e, r);
				} catch (e) {
					return e.errno;
				}
				var o = Ne.nodePermissions(e, 'wx');
				if (o) { return o; }
				if (t) {
					if (!Ne.isDir(n.mode)) { return 54; }
					if (Ne.isRoot(n) || Ne.getPath(n) === Ne.cwd()) { return 10; }
				} else if (Ne.isDir(n.mode)) { return 31; }
				return 0;
			},
			mayOpen: function(e, r) {
				return e
					? Ne.isLink(e.mode) ? 32 : Ne.isDir(e.mode) && ('r' !== Ne.flagsToPermissionString(r) || 512 & r) ? 31 : Ne.nodePermissions(e, Ne.flagsToPermissionString(r))
					: 44;
			},
			MAX_OPEN_FDS: 4096,
			nextfd: function(e, r) {
				e = e || 0, r = r || Ne.MAX_OPEN_FDS;
				for (var t = e; t <= r; t++) { if (!Ne.streams[t]) { return t; } }
				throw new Ne.ErrnoError(33);
			},
			getStream: function(e) {
				return Ne.streams[e];
			},
			createStream: function(e, r, t) {
				Ne.FSStream || (Ne.FSStream = function() {},
					Ne.FSStream.prototype = {
						object: {
							get: function() {
								return this.node;
							},
							set: function(e) {
								this.node = e;
							}
						},
						isRead: {
							get: function() {
								return 1 != (2097155 & this.flags);
							}
						},
						isWrite: {
							get: function() {
								return 0 != (2097155 & this.flags);
							}
						},
						isAppend: {
							get: function() {
								return 1024 & this.flags;
							}
						}
					});
				var n = new Ne.FSStream();
				for (var o in e) { n[o] = e[o]; }
				e = n;
				var a = Ne.nextfd(r, t);
				return e.fd = a, Ne.streams[a] = e, e;
			},
			closeStream: function(e) {
				Ne.streams[e] = null;
			},
			chrdev_stream_ops: {
				open: function(e) {
					var r = Ne.getDevice(e.node.rdev);
					e.stream_ops = r.stream_ops, e.stream_ops.open && e.stream_ops.open(e);
				},
				llseek: function() {
					throw new Ne.ErrnoError(70);
				}
			},
			major: function(e) {
				return e >> 8;
			},
			minor: function(e) {
				return 255 & e;
			},
			makedev: function(e, r) {
				return e << 8 | r;
			},
			registerDevice: function(e, r) {
				Ne.devices[e] = { stream_ops: r };
			},
			getDevice: function(e) {
				return Ne.devices[e];
			},
			getMounts: function(e) {
				for (var r = [], t = [e]; t.length;) {
					var n = t.pop();
					r.push(n), t.push.apply(t, n.mounts);
				}
				return r;
			},
			syncfs: function(e, r) {
				'function' == typeof e && (r = e, e = !1),
					Ne.syncFSRequests++,
					Ne.syncFSRequests > 1 && E('warning: ' + Ne.syncFSRequests + ' FS.syncfs operations in flight at once, probably just doing extra work');
				var t = Ne.getMounts(Ne.root.mount), n = 0;
				function o(e) {
					return Ne.syncFSRequests--, r(e);
				}
				function a(e) {
					if (e) { return a.errored ? void 0 : (a.errored = !0, o(e)); }
					++n >= t.length && o(null);
				}
				t.forEach(function(r) {
					if (!r.type.syncfs) { return a(null); }
					r.type.syncfs(r, e, a);
				});
			},
			mount: function(e, r, t) {
				var n, o = '/' === t, a = !t;
				if (o && Ne.root) { throw new Ne.ErrnoError(10); }
				if (!o && !a) {
					var i = Ne.lookupPath(t, { follow_mount: !1 });
					if (t = i.path, n = i.node, Ne.isMountpoint(n)) { throw new Ne.ErrnoError(10); }
					if (!Ne.isDir(n.mode)) { throw new Ne.ErrnoError(54); }
				}
				var u = { type: e, opts: r, mountpoint: t, mounts: [] }, s = e.mount(u);
				return s.mount = u, u.root = s, o ? Ne.root = s : n && (n.mounted = u, n.mount && n.mount.mounts.push(u)), s;
			},
			unmount: function(e) {
				var r = Ne.lookupPath(e, { follow_mount: !1 });
				if (!Ne.isMountpoint(r.node)) { throw new Ne.ErrnoError(28); }
				var t = r.node, n = t.mounted, o = Ne.getMounts(n);
				Object.keys(Ne.nameTable).forEach(function(e) {
					for (var r = Ne.nameTable[e]; r;) {
						var t = r.name_next;
						-1 !== o.indexOf(r.mount) && Ne.destroyNode(r), r = t;
					}
				}), t.mounted = null;
				var a = t.mount.mounts.indexOf(n);
				t.mount.mounts.splice(a, 1);
			},
			lookup: function(e, r) {
				return e.node_ops.lookup(e, r);
			},
			mknod: function(e, r, t) {
				var n = Ne.lookupPath(e, { parent: !0 }).node, o = Me.basename(e);
				if (!o || '.' === o || '..' === o) { throw new Ne.ErrnoError(28); }
				var a = Ne.mayCreate(n, o);
				if (a) { throw new Ne.ErrnoError(a); }
				if (!n.node_ops.mknod) { throw new Ne.ErrnoError(63); }
				return n.node_ops.mknod(n, o, r, t);
			},
			create: function(e, r) {
				return r = void 0 !== r ? r : 438, r &= 4095, r |= 32768, Ne.mknod(e, r, 0);
			},
			mkdir: function(e, r) {
				return r = void 0 !== r ? r : 511, r &= 1023, r |= 16384, Ne.mknod(e, r, 0);
			},
			mkdirTree: function(e, r) {
				for (var t = e.split('/'), n = '', o = 0; o < t.length; ++o) {
					if (t[o]) {
						n += '/' + t[o];
						try {
							Ne.mkdir(n, r);
						} catch (e) {
							if (20 != e.errno) { throw e; }
						}
					}
				}
			},
			mkdev: function(e, r, t) {
				return void 0 === t && (t = r, r = 438), r |= 8192, Ne.mknod(e, r, t);
			},
			symlink: function(e, r) {
				if (!Pe.resolve(e)) { throw new Ne.ErrnoError(44); }
				var t = Ne.lookupPath(r, { parent: !0 }).node;
				if (!t) { throw new Ne.ErrnoError(44); }
				var n = Me.basename(r), o = Ne.mayCreate(t, n);
				if (o) { throw new Ne.ErrnoError(o); }
				if (!t.node_ops.symlink) { throw new Ne.ErrnoError(63); }
				return t.node_ops.symlink(t, n, e);
			},
			rename: function(e, r) {
				var t, n, o = Me.dirname(e), a = Me.dirname(r), i = Me.basename(e), u = Me.basename(r);
				if (t = Ne.lookupPath(e, { parent: !0 }).node, n = Ne.lookupPath(r, { parent: !0 }).node, !t || !n) { throw new Ne.ErrnoError(44); }
				if (t.mount !== n.mount) { throw new Ne.ErrnoError(75); }
				var s, c = Ne.lookupNode(t, i), f = Pe.relative(e, a);
				if ('.' !== f.charAt(0)) { throw new Ne.ErrnoError(28); }
				if ('.' !== (f = Pe.relative(r, o)).charAt(0)) { throw new Ne.ErrnoError(55); }
				try {
					s = Ne.lookupNode(n, u);
				} catch (e) {}
				if (c !== s) {
					var l = Ne.isDir(c.mode), d = Ne.mayDelete(t, i, l);
					if (d) { throw new Ne.ErrnoError(d); }
					if (d = s ? Ne.mayDelete(n, u, l) : Ne.mayCreate(n, u)) { throw new Ne.ErrnoError(d); }
					if (!t.node_ops.rename) { throw new Ne.ErrnoError(63); }
					if (Ne.isMountpoint(c) || s && Ne.isMountpoint(s)) { throw new Ne.ErrnoError(10); }
					if (n !== t && (d = Ne.nodePermissions(t, 'w'))) { throw new Ne.ErrnoError(d); }
					try {
						Ne.trackingDelegate.willMovePath && Ne.trackingDelegate.willMovePath(e, r);
					} catch (t) {
						E("FS.trackingDelegate['willMovePath']('" + e + "', '" + r + "') threw an exception: " + t.message);
					}
					Ne.hashRemoveNode(c);
					try {
						t.node_ops.rename(c, n, u);
					} catch (e) {
						throw e;
					} finally {
						Ne.hashAddNode(c);
					}
					try {
						Ne.trackingDelegate.onMovePath && Ne.trackingDelegate.onMovePath(e, r);
					} catch (t) {
						E("FS.trackingDelegate['onMovePath']('" + e + "', '" + r + "') threw an exception: " + t.message);
					}
				}
			},
			rmdir: function(e) {
				var r = Ne.lookupPath(e, { parent: !0 }).node, t = Me.basename(e), n = Ne.lookupNode(r, t), o = Ne.mayDelete(r, t, !0);
				if (o) { throw new Ne.ErrnoError(o); }
				if (!r.node_ops.rmdir) { throw new Ne.ErrnoError(63); }
				if (Ne.isMountpoint(n)) { throw new Ne.ErrnoError(10); }
				try {
					Ne.trackingDelegate.willDeletePath && Ne.trackingDelegate.willDeletePath(e);
				} catch (r) {
					E("FS.trackingDelegate['willDeletePath']('" + e + "') threw an exception: " + r.message);
				}
				r.node_ops.rmdir(r, t), Ne.destroyNode(n);
				try {
					Ne.trackingDelegate.onDeletePath && Ne.trackingDelegate.onDeletePath(e);
				} catch (r) {
					E("FS.trackingDelegate['onDeletePath']('" + e + "') threw an exception: " + r.message);
				}
			},
			readdir: function(e) {
				var r = Ne.lookupPath(e, { follow: !0 }).node;
				if (!r.node_ops.readdir) { throw new Ne.ErrnoError(54); }
				return r.node_ops.readdir(r);
			},
			unlink: function(e) {
				var r = Ne.lookupPath(e, { parent: !0 }).node, t = Me.basename(e), n = Ne.lookupNode(r, t), o = Ne.mayDelete(r, t, !1);
				if (o) { throw new Ne.ErrnoError(o); }
				if (!r.node_ops.unlink) { throw new Ne.ErrnoError(63); }
				if (Ne.isMountpoint(n)) { throw new Ne.ErrnoError(10); }
				try {
					Ne.trackingDelegate.willDeletePath && Ne.trackingDelegate.willDeletePath(e);
				} catch (r) {
					E("FS.trackingDelegate['willDeletePath']('" + e + "') threw an exception: " + r.message);
				}
				r.node_ops.unlink(r, t), Ne.destroyNode(n);
				try {
					Ne.trackingDelegate.onDeletePath && Ne.trackingDelegate.onDeletePath(e);
				} catch (r) {
					E("FS.trackingDelegate['onDeletePath']('" + e + "') threw an exception: " + r.message);
				}
			},
			readlink: function(e) {
				var r = Ne.lookupPath(e).node;
				if (!r) { throw new Ne.ErrnoError(44); }
				if (!r.node_ops.readlink) { throw new Ne.ErrnoError(28); }
				return Pe.resolve(Ne.getPath(r.parent), r.node_ops.readlink(r));
			},
			stat: function(e, r) {
				var t = Ne.lookupPath(e, { follow: !r }).node;
				if (!t) { throw new Ne.ErrnoError(44); }
				if (!t.node_ops.getattr) { throw new Ne.ErrnoError(63); }
				return t.node_ops.getattr(t);
			},
			lstat: function(e) {
				return Ne.stat(e, !0);
			},
			chmod: function(e, r, t) {
				var n;
				'string' == typeof e ? n = Ne.lookupPath(e, { follow: !t }).node : n = e;
				if (!n.node_ops.setattr) { throw new Ne.ErrnoError(63); }
				n.node_ops.setattr(n, { mode: 4095 & r | -4096 & n.mode, timestamp: Date.now() });
			},
			lchmod: function(e, r) {
				Ne.chmod(e, r, !0);
			},
			fchmod: function(e, r) {
				var t = Ne.getStream(e);
				if (!t) { throw new Ne.ErrnoError(8); }
				Ne.chmod(t.node, r);
			},
			chown: function(e, r, t, n) {
				var o;
				'string' == typeof e ? o = Ne.lookupPath(e, { follow: !n }).node : o = e;
				if (!o.node_ops.setattr) { throw new Ne.ErrnoError(63); }
				o.node_ops.setattr(o, { timestamp: Date.now() });
			},
			lchown: function(e, r, t) {
				Ne.chown(e, r, t, !0);
			},
			fchown: function(e, r, t) {
				var n = Ne.getStream(e);
				if (!n) { throw new Ne.ErrnoError(8); }
				Ne.chown(n.node, r, t);
			},
			truncate: function(e, r) {
				if (r < 0) { throw new Ne.ErrnoError(28); }
				var t;
				'string' == typeof e ? t = Ne.lookupPath(e, { follow: !0 }).node : t = e;
				if (!t.node_ops.setattr) { throw new Ne.ErrnoError(63); }
				if (Ne.isDir(t.mode)) { throw new Ne.ErrnoError(31); }
				if (!Ne.isFile(t.mode)) { throw new Ne.ErrnoError(28); }
				var n = Ne.nodePermissions(t, 'w');
				if (n) { throw new Ne.ErrnoError(n); }
				t.node_ops.setattr(t, { size: r, timestamp: Date.now() });
			},
			ftruncate: function(e, r) {
				var t = Ne.getStream(e);
				if (!t) { throw new Ne.ErrnoError(8); }
				if (0 == (2097155 & t.flags)) { throw new Ne.ErrnoError(28); }
				Ne.truncate(t.node, r);
			},
			utime: function(e, r, t) {
				var n = Ne.lookupPath(e, { follow: !0 }).node;
				n.node_ops.setattr(n, { timestamp: Math.max(r, t) });
			},
			open: function(e, r, n, o, a) {
				if ('' === e) { throw new Ne.ErrnoError(44); }
				var i;
				if (n = void 0 === n ? 438 : n, n = 64 & (r = 'string' == typeof r ? Ne.modeStringToFlags(r) : r) ? 4095 & n | 32768 : 0, 'object' == typeof e) { i = e; }
				else {
					e = Me.normalize(e);
					try {
						i = Ne.lookupPath(e, { follow: !(131072 & r) }).node;
					} catch (e) {}
				}
				var u = !1;
				if (64 & r) {
					if (i) { if (128 & r) { throw new Ne.ErrnoError(20); } }
					else { i = Ne.mknod(e, n, 0), u = !0; }
				}
				if (!i) { throw new Ne.ErrnoError(44); }
				if (Ne.isChrdev(i.mode) && (r &= -513), 65536 & r && !Ne.isDir(i.mode)) { throw new Ne.ErrnoError(54); }
				if (!u) {
					var s = Ne.mayOpen(i, r);
					if (s) { throw new Ne.ErrnoError(s); }
				}
				512 & r && Ne.truncate(i, 0), r &= -131713;
				var c = Ne.createStream({ node: i, path: Ne.getPath(i), flags: r, seekable: !0, position: 0, stream_ops: i.stream_ops, ungotten: [], error: !1 }, o, a);
				c.stream_ops.open && c.stream_ops.open(c),
					!t.logReadFiles || 1 & r ||
					(Ne.readFiles || (Ne.readFiles = {}), e in Ne.readFiles || (Ne.readFiles[e] = 1, E('FS.trackingDelegate error on read file: ' + e)));
				try {
					if (Ne.trackingDelegate.onOpenFile) {
						var f = 0;
						1 != (2097155 & r) && (f |= Ne.tracking.openFlags.READ), 0 != (2097155 & r) && (f |= Ne.tracking.openFlags.WRITE), Ne.trackingDelegate.onOpenFile(e, f);
					}
				} catch (r) {
					E("FS.trackingDelegate['onOpenFile']('" + e + "', flags) threw an exception: " + r.message);
				}
				return c;
			},
			close: function(e) {
				if (Ne.isClosed(e)) { throw new Ne.ErrnoError(8); }
				e.getdents && (e.getdents = null);
				try {
					e.stream_ops.close && e.stream_ops.close(e);
				} catch (e) {
					throw e;
				} finally {
					Ne.closeStream(e.fd);
				}
				e.fd = null;
			},
			isClosed: function(e) {
				return null === e.fd;
			},
			llseek: function(e, r, t) {
				if (Ne.isClosed(e)) { throw new Ne.ErrnoError(8); }
				if (!e.seekable || !e.stream_ops.llseek) { throw new Ne.ErrnoError(70); }
				if (0 != t && 1 != t && 2 != t) { throw new Ne.ErrnoError(28); }
				return e.position = e.stream_ops.llseek(e, r, t), e.ungotten = [], e.position;
			},
			read: function(e, r, t, n, o) {
				if (n < 0 || o < 0) { throw new Ne.ErrnoError(28); }
				if (Ne.isClosed(e)) { throw new Ne.ErrnoError(8); }
				if (1 == (2097155 & e.flags)) { throw new Ne.ErrnoError(8); }
				if (Ne.isDir(e.node.mode)) { throw new Ne.ErrnoError(31); }
				if (!e.stream_ops.read) { throw new Ne.ErrnoError(28); }
				var a = void 0 !== o;
				if (a) { if (!e.seekable) { throw new Ne.ErrnoError(70); } }
				else { o = e.position; }
				var i = e.stream_ops.read(e, r, t, n, o);
				return a || (e.position += i), i;
			},
			write: function(e, r, t, n, o, a) {
				if (n < 0 || o < 0) { throw new Ne.ErrnoError(28); }
				if (Ne.isClosed(e)) { throw new Ne.ErrnoError(8); }
				if (0 == (2097155 & e.flags)) { throw new Ne.ErrnoError(8); }
				if (Ne.isDir(e.node.mode)) { throw new Ne.ErrnoError(31); }
				if (!e.stream_ops.write) { throw new Ne.ErrnoError(28); }
				e.seekable && 1024 & e.flags && Ne.llseek(e, 0, 2);
				var i = void 0 !== o;
				if (i) { if (!e.seekable) { throw new Ne.ErrnoError(70); } }
				else { o = e.position; }
				var u = e.stream_ops.write(e, r, t, n, o, a);
				i || (e.position += u);
				try {
					e.path && Ne.trackingDelegate.onWriteToFile && Ne.trackingDelegate.onWriteToFile(e.path);
				} catch (r) {
					E("FS.trackingDelegate['onWriteToFile']('" + e.path + "') threw an exception: " + r.message);
				}
				return u;
			},
			allocate: function(e, r, t) {
				if (Ne.isClosed(e)) { throw new Ne.ErrnoError(8); }
				if (r < 0 || t <= 0) { throw new Ne.ErrnoError(28); }
				if (0 == (2097155 & e.flags)) { throw new Ne.ErrnoError(8); }
				if (!Ne.isFile(e.node.mode) && !Ne.isDir(e.node.mode)) { throw new Ne.ErrnoError(43); }
				if (!e.stream_ops.allocate) { throw new Ne.ErrnoError(138); }
				e.stream_ops.allocate(e, r, t);
			},
			mmap: function(e, r, t, n, o, a) {
				if (0 != (2 & o) && 0 == (2 & a) && 2 != (2097155 & e.flags)) { throw new Ne.ErrnoError(2); }
				if (1 == (2097155 & e.flags)) { throw new Ne.ErrnoError(2); }
				if (!e.stream_ops.mmap) { throw new Ne.ErrnoError(43); }
				return e.stream_ops.mmap(e, r, t, n, o, a);
			},
			msync: function(e, r, t, n, o) {
				return e && e.stream_ops.msync ? e.stream_ops.msync(e, r, t, n, o) : 0;
			},
			munmap: function(e) {
				return 0;
			},
			ioctl: function(e, r, t) {
				if (!e.stream_ops.ioctl) { throw new Ne.ErrnoError(59); }
				return e.stream_ops.ioctl(e, r, t);
			},
			readFile: function(e, r) {
				if ((r = r || {}).flags = r.flags || 0, r.encoding = r.encoding || 'binary', 'utf8' !== r.encoding && 'binary' !== r.encoding) {
					throw new Error('Invalid encoding type "' + r.encoding + '"');
				}
				var t, n = Ne.open(e, r.flags), o = Ne.stat(e).size, a = new Uint8Array(o);
				return Ne.read(n, a, 0, o, 0), 'utf8' === r.encoding ? t = N(a, 0) : 'binary' === r.encoding && (t = a), Ne.close(n), t;
			},
			writeFile: function(e, r, t) {
				(t = t || {}).flags = t.flags || 577;
				var n = Ne.open(e, t.flags, t.mode);
				if ('string' == typeof r) {
					var o = new Uint8Array(H(r) + 1), a = z(r, o, 0, o.length);
					Ne.write(n, o, 0, a, void 0, t.canOwn);
				} else {
					if (!ArrayBuffer.isView(r)) { throw new Error('Unsupported data type'); }
					Ne.write(n, r, 0, r.byteLength, void 0, t.canOwn);
				}
				Ne.close(n);
			},
			cwd: function() {
				return Ne.currentPath;
			},
			chdir: function(e) {
				var r = Ne.lookupPath(e, { follow: !0 });
				if (null === r.node) { throw new Ne.ErrnoError(44); }
				if (!Ne.isDir(r.node.mode)) { throw new Ne.ErrnoError(54); }
				var t = Ne.nodePermissions(r.node, 'x');
				if (t) { throw new Ne.ErrnoError(t); }
				Ne.currentPath = r.path;
			},
			createDefaultDirectories: function() {
				Ne.mkdir('/tmp'), Ne.mkdir('/home'), Ne.mkdir('/home/web_user');
			},
			createDefaultDevices: function() {
				Ne.mkdir('/dev'),
					Ne.registerDevice(Ne.makedev(1, 3), {
						read: function() {
							return 0;
						},
						write: function(e, r, t, n, o) {
							return n;
						}
					}),
					Ne.mkdev('/dev/null', Ne.makedev(1, 3)),
					Re.register(Ne.makedev(5, 0), Re.default_tty_ops),
					Re.register(Ne.makedev(6, 0), Re.default_tty1_ops),
					Ne.mkdev('/dev/tty', Ne.makedev(5, 0)),
					Ne.mkdev('/dev/tty1', Ne.makedev(6, 0));
				var e = function() {
					if ('object' == typeof crypto && 'function' == typeof crypto.getRandomValues) {
						var e = new Uint8Array(1);
						return function() {
							return crypto.getRandomValues(e), e[0];
						};
					}
					if (f) {
						try {
							var r = require('crypto');
							return function() {
								return r.randomBytes(1)[0];
							};
						} catch (e) {}
					}
					return function() {
						oe('randomDevice');
					};
				}();
				Ne.createDevice('/dev', 'random', e), Ne.createDevice('/dev', 'urandom', e), Ne.mkdir('/dev/shm'), Ne.mkdir('/dev/shm/tmp');
			},
			createSpecialDirectories: function() {
				Ne.mkdir('/proc');
				var e = Ne.mkdir('/proc/self');
				Ne.mkdir('/proc/self/fd'),
					Ne.mount(
						{
							mount: function() {
								var r = Ne.createNode(e, 'fd', 16895, 73);
								return r.node_ops = {
									lookup: function(e, r) {
										var t = +r, n = Ne.getStream(t);
										if (!n) { throw new Ne.ErrnoError(8); }
										var o = {
											parent: null,
											mount: { mountpoint: 'fake' },
											node_ops: {
												readlink: function() {
													return n.path;
												}
											}
										};
										return o.parent = o, o;
									}
								},
									r;
							}
						},
						{},
						'/proc/self/fd'
					);
			},
			createStandardStreams: function() {
				t.stdin ? Ne.createDevice('/dev', 'stdin', t.stdin) : Ne.symlink('/dev/tty', '/dev/stdin'),
					t.stdout ? Ne.createDevice('/dev', 'stdout', null, t.stdout) : Ne.symlink('/dev/tty', '/dev/stdout'),
					t.stderr ? Ne.createDevice('/dev', 'stderr', null, t.stderr) : Ne.symlink('/dev/tty1', '/dev/stderr');
				Ne.open('/dev/stdin', 0), Ne.open('/dev/stdout', 1), Ne.open('/dev/stderr', 1);
			},
			ensureErrnoError: function() {
				Ne.ErrnoError || (Ne.ErrnoError = function(e, r) {
					this.node = r,
						this.setErrno = function(e) {
							this.errno = e;
						},
						this.setErrno(e),
						this.message = 'FS error';
				},
					Ne.ErrnoError.prototype = new Error(),
					Ne.ErrnoError.prototype.constructor = Ne.ErrnoError,
					[44].forEach(function(e) {
						Ne.genericErrors[e] = new Ne.ErrnoError(e), Ne.genericErrors[e].stack = '<generic error, no stack>';
					}));
			},
			staticInit: function() {
				Ne.ensureErrnoError(),
					Ne.nameTable = new Array(4096),
					Ne.mount(Ie, {}, '/'),
					Ne.createDefaultDirectories(),
					Ne.createDefaultDevices(),
					Ne.createSpecialDirectories(),
					Ne.filesystems = { MEMFS: Ie };
			},
			init: function(e, r, n) {
				Ne.init.initialized = !0, Ne.ensureErrnoError(), t.stdin = e || t.stdin, t.stdout = r || t.stdout, t.stderr = n || t.stderr, Ne.createStandardStreams();
			},
			quit: function() {
				Ne.init.initialized = !1;
				var e = t._fflush;
				e && e(0);
				for (var r = 0; r < Ne.streams.length; r++) {
					var n = Ne.streams[r];
					n && Ne.close(n);
				}
			},
			getMode: function(e, r) {
				var t = 0;
				return e && (t |= 365), r && (t |= 146), t;
			},
			findObject: function(e, r) {
				var t = Ne.analyzePath(e, r);
				return t.exists ? t.object : null;
			},
			analyzePath: function(e, r) {
				try {
					e = (n = Ne.lookupPath(e, { follow: !r })).path;
				} catch (e) {}
				var t = { isRoot: !1, exists: !1, error: 0, name: null, path: null, object: null, parentExists: !1, parentPath: null, parentObject: null };
				try {
					var n = Ne.lookupPath(e, { parent: !0 });
					t.parentExists = !0,
						t.parentPath = n.path,
						t.parentObject = n.node,
						t.name = Me.basename(e),
						n = Ne.lookupPath(e, { follow: !r }),
						t.exists = !0,
						t.path = n.path,
						t.object = n.node,
						t.name = n.node.name,
						t.isRoot = '/' === n.path;
				} catch (e) {
					t.error = e.errno;
				}
				return t;
			},
			createPath: function(e, r, t, n) {
				e = 'string' == typeof e ? e : Ne.getPath(e);
				for (var o = r.split('/').reverse(); o.length;) {
					var a = o.pop();
					if (a) {
						var i = Me.join2(e, a);
						try {
							Ne.mkdir(i);
						} catch (e) {}
						e = i;
					}
				}
				return i;
			},
			createFile: function(e, r, t, n, o) {
				var a = Me.join2('string' == typeof e ? e : Ne.getPath(e), r), i = Ne.getMode(n, o);
				return Ne.create(a, i);
			},
			createDataFile: function(e, r, t, n, o, a) {
				var i = r ? Me.join2('string' == typeof e ? e : Ne.getPath(e), r) : e, u = Ne.getMode(n, o), s = Ne.create(i, u);
				if (t) {
					if ('string' == typeof t) {
						for (var c = new Array(t.length), f = 0, l = t.length; f < l; ++f) { c[f] = t.charCodeAt(f); }
						t = c;
					}
					Ne.chmod(s, 146 | u);
					var d = Ne.open(s, 577);
					Ne.write(d, t, 0, t.length, 0, a), Ne.close(d), Ne.chmod(s, u);
				}
				return s;
			},
			createDevice: function(e, r, t, n) {
				var o = Me.join2('string' == typeof e ? e : Ne.getPath(e), r), a = Ne.getMode(!!t, !!n);
				Ne.createDevice.major || (Ne.createDevice.major = 64);
				var i = Ne.makedev(Ne.createDevice.major++, 0);
				return Ne.registerDevice(i, {
					open: function(e) {
						e.seekable = !1;
					},
					close: function(e) {
						n && n.buffer && n.buffer.length && n(10);
					},
					read: function(e, r, n, o, a) {
						for (var i = 0, u = 0; u < o; u++) {
							var s;
							try {
								s = t();
							} catch (e) {
								throw new Ne.ErrnoError(29);
							}
							if (void 0 === s && 0 === i) { throw new Ne.ErrnoError(6); }
							if (null == s) { break; }
							i++, r[n + u] = s;
						}
						return i && (e.node.timestamp = Date.now()), i;
					},
					write: function(e, r, t, o, a) {
						for (var i = 0; i < o; i++) {
							try {
								n(r[t + i]);
							} catch (e) {
								throw new Ne.ErrnoError(29);
							}
						}
						return o && (e.node.timestamp = Date.now()), i;
					}
				}),
					Ne.mkdev(o, a, i);
			},
			forceLoadFile: function(e) {
				if (e.isDevice || e.isFolder || e.link || e.contents) { return !0; }
				if ('undefined' != typeof XMLHttpRequest) {
					throw new Error(
						'Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.'
					);
				}
				if (!l) { throw new Error('Cannot load without read() or XMLHttpRequest.'); }
				try {
					e.contents = xr(l(e.url), !0), e.usedBytes = e.contents.length;
				} catch (e) {
					throw new Ne.ErrnoError(29);
				}
			},
			createLazyFile: function(e, r, t, n, o) {
				function a() {
					this.lengthKnown = !1, this.chunks = [];
				}
				if (
					a.prototype.get = function(e) {
						if (!(e > this.length - 1 || e < 0)) {
							var r = e % this.chunkSize, t = e / this.chunkSize | 0;
							return this.getter(t)[r];
						}
					},
						a.prototype.setDataGetter = function(e) {
							this.getter = e;
						},
						a.prototype.cacheLength = function() {
							var e = new XMLHttpRequest();
							if (e.open('HEAD', t, !1), e.send(null), !(e.status >= 200 && e.status < 300 || 304 === e.status)) {
								throw new Error(
									"Couldn't load " + t + '. Status: ' + e.status
								);
							}
							var r,
								n = Number(e.getResponseHeader('Content-length')),
								o = (r = e.getResponseHeader('Accept-Ranges')) && 'bytes' === r,
								a = (r = e.getResponseHeader('Content-Encoding')) && 'gzip' === r,
								i = 1048576;
							o || (i = n);
							var u = this;
							u.setDataGetter(function(e) {
								var r = e * i, o = (e + 1) * i - 1;
								if (
									o = Math.min(o, n - 1),
										void 0 === u.chunks[e] && (u.chunks[e] = function(e, r) {
											if (e > r) { throw new Error('invalid range (' + e + ', ' + r + ') or no bytes requested!'); }
											if (r > n - 1) { throw new Error('only ' + n + ' bytes available! programmer error!'); }
											var o = new XMLHttpRequest();
											if (
												o.open('GET', t, !1),
													n !== i && o.setRequestHeader('Range', 'bytes=' + e + '-' + r),
													'undefined' != typeof Uint8Array && (o.responseType = 'arraybuffer'),
													o.overrideMimeType && o.overrideMimeType('text/plain; charset=x-user-defined'),
													o.send(null),
													!(o.status >= 200 && o.status < 300 || 304 === o.status)
											) { throw new Error("Couldn't load " + t + '. Status: ' + o.status); }
											return void 0 !== o.response ? new Uint8Array(o.response || []) : xr(o.responseText || '', !0);
										}(r, o)),
										void 0 === u.chunks[e]
								) { throw new Error('doXHR failed!'); }
								return u.chunks[e];
							}),
								!a && n || (i = n = 1, n = this.getter(0).length, i = n, h('LazyFiles on gzip forces download of the whole file when length is accessed')),
								this._length = n,
								this._chunkSize = i,
								this.lengthKnown = !0;
						},
						'undefined' != typeof XMLHttpRequest
				) {
					if (!c) { throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc'; }
					var i = new a();
					Object.defineProperties(i, {
						length: {
							get: function() {
								return this.lengthKnown || this.cacheLength(), this._length;
							}
						},
						chunkSize: {
							get: function() {
								return this.lengthKnown || this.cacheLength(), this._chunkSize;
							}
						}
					});
					var u = { isDevice: !1, contents: i };
				} else { u = { isDevice: !1, url: t }; }
				var s = Ne.createFile(e, r, u, n, o);
				u.contents ? s.contents = u.contents : u.url && (s.contents = null, s.url = u.url),
					Object.defineProperties(s, {
						usedBytes: {
							get: function() {
								return this.contents.length;
							}
						}
					});
				var f = {};
				return Object.keys(s.stream_ops).forEach(function(e) {
					var r = s.stream_ops[e];
					f[e] = function() {
						return Ne.forceLoadFile(s), r.apply(null, arguments);
					};
				}),
					f.read = function(e, r, t, n, o) {
						Ne.forceLoadFile(s);
						var a = e.node.contents;
						if (o >= a.length) { return 0; }
						var i = Math.min(a.length - o, n);
						if (a.slice) { for (var u = 0; u < i; u++) { r[t + u] = a[o + u]; } }
						else { for (u = 0; u < i; u++) { r[t + u] = a.get(o + u); } }
						return i;
					},
					s.stream_ops = f,
					s;
			},
			createPreloadedFile: function(e, r, n, o, a, i, u, s, c, f) {
				we.init();
				var l = r ? Pe.resolve(Me.join2(e, r)) : e;
				re('cp ' + l);
				function d(n) {
					function d(t) {
						f && f(), s || Ne.createDataFile(e, r, t, o, a, c), i && i(), ne();
					}
					var m = !1;
					t.preloadPlugins.forEach(function(e) {
						m || e.canHandle(l) && (e.handle(n, l, d, function() {
									u && u(), ne();
								}),
									m = !0);
					}), m || d(n);
				}
				te(),
					'string' == typeof n
						? we.asyncLoad(n, function(e) {
							d(e);
						}, u)
						: d(n);
			},
			indexedDB: function() {
				return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
			},
			DB_NAME: function() {
				return 'EM_FS_' + window.location.pathname;
			},
			DB_VERSION: 20,
			DB_STORE_NAME: 'FILE_DATA',
			saveFilesToDB: function(e, r, t) {
				r = r || function() {}, t = t || function() {};
				var n = Ne.indexedDB();
				try {
					var o = n.open(Ne.DB_NAME(), Ne.DB_VERSION);
				} catch (e) {
					return t(e);
				}
				o.onupgradeneeded = function() {
					h('creating db'), o.result.createObjectStore(Ne.DB_STORE_NAME);
				},
					o.onsuccess = function() {
						var n = o.result.transaction([Ne.DB_STORE_NAME], 'readwrite'), a = n.objectStore(Ne.DB_STORE_NAME), i = 0, u = 0, s = e.length;
						function c() {
							0 == u ? r() : t();
						}
						e.forEach(function(e) {
							var r = a.put(Ne.analyzePath(e).object.contents, e);
							r.onsuccess = function() {
								++i + u == s && c();
							},
								r.onerror = function() {
									i + ++u == s && c();
								};
						}), n.onerror = t;
					},
					o.onerror = t;
			},
			loadFilesFromDB: function(e, r, t) {
				r = r || function() {}, t = t || function() {};
				var n = Ne.indexedDB();
				try {
					var o = n.open(Ne.DB_NAME(), Ne.DB_VERSION);
				} catch (e) {
					return t(e);
				}
				o.onupgradeneeded = t,
					o.onsuccess = function() {
						var n = o.result;
						try {
							var a = n.transaction([Ne.DB_STORE_NAME], 'readonly');
						} catch (e) {
							return void t(e);
						}
						var i = a.objectStore(Ne.DB_STORE_NAME), u = 0, s = 0, c = e.length;
						function f() {
							0 == s ? r() : t();
						}
						e.forEach(function(e) {
							var r = i.get(e);
							r.onsuccess = function() {
								Ne.analyzePath(e).exists && Ne.unlink(e), Ne.createDataFile(Me.dirname(e), Me.basename(e), r.result, !0, !0, !0), ++u + s == c && f();
							},
								r.onerror = function() {
									u + ++s == c && f();
								};
						}), a.onerror = t;
					},
					o.onerror = t;
			}
		},
		Ue = {
			mappings: {},
			DEFAULT_POLLMASK: 5,
			umask: 511,
			calculateAt: function(e, r, t) {
				if ('/' === r[0]) { return r; }
				var n;
				if (-100 === e) { n = Ne.cwd(); }
				else {
					var o = Ne.getStream(e);
					if (!o) { throw new Ne.ErrnoError(8); }
					n = o.path;
				}
				if (0 == r.length) {
					if (!t) { throw new Ne.ErrnoError(44); }
					return n;
				}
				return Me.join2(n, r);
			},
			doStat: function(e, r, t) {
				try {
					var n = e(r);
				} catch (e) {
					if (e && e.node && Me.normalize(r) !== Me.normalize(Ne.getPath(e.node))) { return -54; }
					throw e;
				}
				return M[t >> 2] = n.dev,
					M[t + 4 >> 2] = 0,
					M[t + 8 >> 2] = n.ino,
					M[t + 12 >> 2] = n.mode,
					M[t + 16 >> 2] = n.nlink,
					M[t + 20 >> 2] = n.uid,
					M[t + 24 >> 2] = n.gid,
					M[t + 28 >> 2] = n.rdev,
					M[t + 32 >> 2] = 0,
					de = [
						n.size >>> 0,
						(le = n.size,
							+Math.abs(le) >= 1
								? le > 0 ? (0 | Math.min(+Math.floor(le / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((le - +(~~le >>> 0)) / 4294967296) >>> 0
								: 0)
					],
					M[t + 40 >> 2] = de[0],
					M[t + 44 >> 2] = de[1],
					M[t + 48 >> 2] = 4096,
					M[t + 52 >> 2] = n.blocks,
					M[t + 56 >> 2] = n.atime.getTime() / 1e3 | 0,
					M[t + 60 >> 2] = 0,
					M[t + 64 >> 2] = n.mtime.getTime() / 1e3 | 0,
					M[t + 68 >> 2] = 0,
					M[t + 72 >> 2] = n.ctime.getTime() / 1e3 | 0,
					M[t + 76 >> 2] = 0,
					de = [
						n.ino >>> 0,
						(le = n.ino,
							+Math.abs(le) >= 1
								? le > 0 ? (0 | Math.min(+Math.floor(le / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((le - +(~~le >>> 0)) / 4294967296) >>> 0
								: 0)
					],
					M[t + 80 >> 2] = de[0],
					M[t + 84 >> 2] = de[1],
					0;
			},
			doMsync: function(e, r, t, n, o) {
				var a = B.slice(e, e + t);
				Ne.msync(r, a, o, t, n);
			},
			doMkdir: function(e, r) {
				return '/' === (e = Me.normalize(e))[e.length - 1] && (e = e.substr(0, e.length - 1)), Ne.mkdir(e, r, 0), 0;
			},
			doMknod: function(e, r, t) {
				switch (61440 & r) {
					case 32768:
					case 8192:
					case 24576:
					case 4096:
					case 49152:
						break;
					default:
						return -28;
				}
				return Ne.mknod(e, r, t), 0;
			},
			doReadlink: function(e, r, t) {
				if (t <= 0) { return -28; }
				var n = Ne.readlink(e), o = Math.min(t, H(n)), a = C[r + o];
				return j(n, r, t + 1), C[r + o] = a, o;
			},
			doAccess: function(e, r) {
				if (-8 & r) { return -28; }
				var t;
				if (!(t = Ne.lookupPath(e, { follow: !0 }).node)) { return -44; }
				var n = '';
				return 4 & r && (n += 'r'), 2 & r && (n += 'w'), 1 & r && (n += 'x'), n && Ne.nodePermissions(t, n) ? -2 : 0;
			},
			doDup: function(e, r, t) {
				var n = Ne.getStream(t);
				return n && Ne.close(n), Ne.open(e, r, 0, t, t).fd;
			},
			doReadv: function(e, r, t, n) {
				for (var o = 0, a = 0; a < t; a++) {
					var i = M[r + 8 * a >> 2], u = M[r + (8 * a + 4) >> 2], s = Ne.read(e, C, i, u, n);
					if (s < 0) { return -1; }
					if (o += s, s < u) { break; }
				}
				return o;
			},
			doWritev: function(e, r, t, n) {
				for (var o = 0, a = 0; a < t; a++) {
					var i = M[r + 8 * a >> 2], u = M[r + (8 * a + 4) >> 2], s = Ne.write(e, C, i, u, n);
					if (s < 0) { return -1; }
					o += s;
				}
				return o;
			},
			varargs: void 0,
			get: function() {
				return Ue.varargs += 4, M[Ue.varargs - 4 >> 2];
			},
			getStr: function(e) {
				return U(e);
			},
			getStreamFromFD: function(e) {
				var r = Ne.getStream(e);
				if (!r) { throw new Ne.ErrnoError(8); }
				return r;
			},
			get64: function(e, r) {
				return e;
			}
		};
	var ze = !0;
	var je = {
		EPERM: 63,
		ENOENT: 44,
		ESRCH: 71,
		EINTR: 27,
		EIO: 29,
		ENXIO: 60,
		E2BIG: 1,
		ENOEXEC: 45,
		EBADF: 8,
		ECHILD: 12,
		EAGAIN: 6,
		EWOULDBLOCK: 6,
		ENOMEM: 48,
		EACCES: 2,
		EFAULT: 21,
		ENOTBLK: 105,
		EBUSY: 10,
		EEXIST: 20,
		EXDEV: 75,
		ENODEV: 43,
		ENOTDIR: 54,
		EISDIR: 31,
		EINVAL: 28,
		ENFILE: 41,
		EMFILE: 33,
		ENOTTY: 59,
		ETXTBSY: 74,
		EFBIG: 22,
		ENOSPC: 51,
		ESPIPE: 70,
		EROFS: 69,
		EMLINK: 34,
		EPIPE: 64,
		EDOM: 18,
		ERANGE: 68,
		ENOMSG: 49,
		EIDRM: 24,
		ECHRNG: 106,
		EL2NSYNC: 156,
		EL3HLT: 107,
		EL3RST: 108,
		ELNRNG: 109,
		EUNATCH: 110,
		ENOCSI: 111,
		EL2HLT: 112,
		EDEADLK: 16,
		ENOLCK: 46,
		EBADE: 113,
		EBADR: 114,
		EXFULL: 115,
		ENOANO: 104,
		EBADRQC: 103,
		EBADSLT: 102,
		EDEADLOCK: 16,
		EBFONT: 101,
		ENOSTR: 100,
		ENODATA: 116,
		ETIME: 117,
		ENOSR: 118,
		ENONET: 119,
		ENOPKG: 120,
		EREMOTE: 121,
		ENOLINK: 47,
		EADV: 122,
		ESRMNT: 123,
		ECOMM: 124,
		EPROTO: 65,
		EMULTIHOP: 36,
		EDOTDOT: 125,
		EBADMSG: 9,
		ENOTUNIQ: 126,
		EBADFD: 127,
		EREMCHG: 128,
		ELIBACC: 129,
		ELIBBAD: 130,
		ELIBSCN: 131,
		ELIBMAX: 132,
		ELIBEXEC: 133,
		ENOSYS: 52,
		ENOTEMPTY: 55,
		ENAMETOOLONG: 37,
		ELOOP: 32,
		EOPNOTSUPP: 138,
		EPFNOSUPPORT: 139,
		ECONNRESET: 15,
		ENOBUFS: 42,
		EAFNOSUPPORT: 5,
		EPROTOTYPE: 67,
		ENOTSOCK: 57,
		ENOPROTOOPT: 50,
		ESHUTDOWN: 140,
		ECONNREFUSED: 14,
		EADDRINUSE: 3,
		ECONNABORTED: 13,
		ENETUNREACH: 40,
		ENETDOWN: 38,
		ETIMEDOUT: 73,
		EHOSTDOWN: 142,
		EHOSTUNREACH: 23,
		EINPROGRESS: 26,
		EALREADY: 7,
		EDESTADDRREQ: 17,
		EMSGSIZE: 35,
		EPROTONOSUPPORT: 66,
		ESOCKTNOSUPPORT: 137,
		EADDRNOTAVAIL: 4,
		ENETRESET: 39,
		EISCONN: 30,
		ENOTCONN: 53,
		ETOOMANYREFS: 141,
		EUSERS: 136,
		EDQUOT: 19,
		ESTALE: 72,
		ENOTSUP: 138,
		ENOMEDIUM: 148,
		EILSEQ: 25,
		EOVERFLOW: 61,
		ECANCELED: 11,
		ENOTRECOVERABLE: 56,
		EOWNERDEAD: 62,
		ESTRPIPE: 135
	};
	var He = {
		errorCode: 12288,
		defaultDisplayInitialized: !1,
		currentContext: 0,
		currentReadSurface: 0,
		currentDrawSurface: 0,
		contextAttributes: { alpha: !1, depth: !1, stencil: !1, antialias: !1 },
		stringCache: {},
		setErrorCode: function(e) {
			He.errorCode = e;
		},
		chooseConfig: function(e, r, t, n, o) {
			if (62e3 != e) { return He.setErrorCode(12296), 0; }
			if (r) {
				for (;;) {
					var a = M[r >> 2];
					if (12321 == a) {
						var i = M[r + 4 >> 2];
						He.contextAttributes.alpha = i > 0;
					} else if (12325 == a) {
						var u = M[r + 4 >> 2];
						He.contextAttributes.depth = u > 0;
					} else if (12326 == a) {
						var s = M[r + 4 >> 2];
						He.contextAttributes.stencil = s > 0;
					} else if (12337 == a) {
						var c = M[r + 4 >> 2];
						He.contextAttributes.antialias = c > 0;
					} else if (12338 == a) {
						c = M[r + 4 >> 2];
						He.contextAttributes.antialias = 1 == c;
					} else if (12544 == a) {
						var f = M[r + 4 >> 2];
						He.contextAttributes.lowLatency = 12547 != f;
					} else if (12344 == a) { break; }
					r += 8;
				}
			}
			return t && n || o ? (o && (M[o >> 2] = 1), t && n > 0 && (M[t >> 2] = 62002), He.setErrorCode(12288), 1) : (He.setErrorCode(12300), 0);
		}
	};
	var Ge = {
		inEventHandler: 0,
		removeAllEventListeners: function() {
			for (var e = Ge.eventHandlers.length - 1; e >= 0; --e) { Ge._removeHandler(e); }
			Ge.eventHandlers = [], Ge.deferredCalls = [];
		},
		registerRemoveEventListeners: function() {
			Ge.removeEventListenersRegistered || (K.push(Ge.removeAllEventListeners), Ge.removeEventListenersRegistered = !0);
		},
		deferredCalls: [],
		deferCall: function(e, r, t) {
			function n(e, r) {
				if (e.length != r.length) { return !1; }
				for (var t in e) { if (e[t] != r[t]) { return !1; } }
				return !0;
			}
			for (var o in Ge.deferredCalls) {
				var a = Ge.deferredCalls[o];
				if (a.targetFunction == e && n(a.argsList, t)) { return; }
			}
			Ge.deferredCalls.push({ targetFunction: e, precedence: r, argsList: t }),
				Ge.deferredCalls.sort(function(e, r) {
					return e.precedence < r.precedence;
				});
		},
		removeDeferredCalls: function(e) {
			for (var r = 0; r < Ge.deferredCalls.length; ++r) { Ge.deferredCalls[r].targetFunction == e && (Ge.deferredCalls.splice(r, 1), --r); }
		},
		canPerformEventHandlerRequests: function() {
			return Ge.inEventHandler && Ge.currentEventHandler.allowsDeferredCalls;
		},
		runDeferredCalls: function() {
			if (Ge.canPerformEventHandlerRequests()) {
				for (var e = 0; e < Ge.deferredCalls.length; ++e) {
					var r = Ge.deferredCalls[e];
					Ge.deferredCalls.splice(e, 1), --e, r.targetFunction.apply(null, r.argsList);
				}
			}
		},
		eventHandlers: [],
		removeAllHandlersOnTarget: function(e, r) {
			for (var t = 0; t < Ge.eventHandlers.length; ++t) { Ge.eventHandlers[t].target != e || r && r != Ge.eventHandlers[t].eventTypeString || Ge._removeHandler(t--); }
		},
		_removeHandler: function(e) {
			var r = Ge.eventHandlers[e];
			r.target.removeEventListener(r.eventTypeString, r.eventListenerFunc, r.useCapture), Ge.eventHandlers.splice(e, 1);
		},
		registerOrRemoveHandler: function(e) {
			var r = function(r) {
				++Ge.inEventHandler, Ge.currentEventHandler = e, Ge.runDeferredCalls(), e.handlerFunc(r), Ge.runDeferredCalls(), --Ge.inEventHandler;
			};
			if (e.callbackfunc) {
				e.eventListenerFunc = r, e.target.addEventListener(e.eventTypeString, r, e.useCapture), Ge.eventHandlers.push(e), Ge.registerRemoveEventListeners();
			} else {for (var t = 0; t < Ge.eventHandlers.length; ++t) {
					Ge.eventHandlers[t].target == e.target && Ge.eventHandlers[t].eventTypeString == e.eventTypeString && Ge._removeHandler(t--);
				}}
		},
		getNodeNameForTarget: function(e) {
			return e ? e == window ? '#window' : e == screen ? '#screen' : e && e.nodeName ? e.nodeName : '' : '';
		},
		fullscreenEnabled: function() {
			return document.fullscreenEnabled || document.webkitFullscreenEnabled;
		}
	};
	function Ve(e) {
		if (e.requestPointerLock) { e.requestPointerLock(); }
		else {
			if (!e.msRequestPointerLock) { return document.body.requestPointerLock || document.body.msRequestPointerLock ? -3 : -1; }
			e.msRequestPointerLock();
		}
		return 0;
	}
	var qe = [0, 'undefined' != typeof document ? document : 0, 'undefined' != typeof window ? window : 0];
	function Xe(e) {
		var r;
		return e = (r = e) > 2 ? U(r) : r, qe[e] || ('undefined' != typeof document ? document.querySelector(e) : void 0);
	}
	function Ye(e) {
		return Xe(e);
	}
	function We(e, r) {
		O[e >> 3] = r.timestamp;
		for (var t = 0; t < r.axes.length; ++t) { O[e + 8 * t + 16 >> 3] = r.axes[t]; }
		for (t = 0; t < r.buttons.length; ++t) { 'object' == typeof r.buttons[t] ? O[e + 8 * t + 528 >> 3] = r.buttons[t].value : O[e + 8 * t + 528 >> 3] = r.buttons[t]; }
		for (t = 0; t < r.buttons.length; ++t) { 'object' == typeof r.buttons[t] ? M[e + 4 * t + 1040 >> 2] = r.buttons[t].pressed : M[e + 4 * t + 1040 >> 2] = 1 == r.buttons[t]; }
		M[e + 1296 >> 2] = r.connected,
			M[e + 1300 >> 2] = r.index,
			M[e + 8 >> 2] = r.axes.length,
			M[e + 12 >> 2] = r.buttons.length,
			j(r.id, e + 1304, 64),
			j(r.mapping, e + 1368, 64);
	}
	var Qe = [];
	function Ke(e, r, t, n, o, a, i, u) {
		r = xe.programs[r];
		var s = mr[e](r, t);
		if (s) {
			var c = u && j(s.name, u, n);
			o && (M[o >> 2] = c), a && (M[a >> 2] = s.size), i && (M[i >> 2] = s.type);
		}
	}
	function Ze(e) {
		var r = H(e) + 1, t = Ar(r);
		return j(e, t, r), t;
	}
	function $e(e) {
		return parseInt(e);
	}
	function Je(e, r, t, n) {
		if (t) {
			var o = mr.getUniform(xe.programs[e], xe.uniforms[r]);
			if ('number' == typeof o || 'boolean' == typeof o) {
				switch (n) {
					case 0:
						M[t >> 2] = o;
						break;
					case 2:
						R[t >> 2] = o;
				}
			} else {for (var a = 0; a < o.length; a++) {
					switch (n) {
						case 0:
							M[t + 4 * a >> 2] = o[a];
							break;
						case 2:
							R[t + 4 * a >> 2] = o[a];
					}
				}}
		} else { xe.recordError(1281); }
	}
	function er(e, r, t, n) {
		if (t) {
			xe.currentContext.clientBuffers[e].enabled && E('glGetVertexAttrib*v on client-side array: not supported, bad data returned');
			var o = mr.getVertexAttrib(e, r);
			if (34975 == r) { M[t >> 2] = o && o.name; }
			else if ('number' == typeof o || 'boolean' == typeof o) {
				switch (n) {
					case 0:
						M[t >> 2] = o;
						break;
					case 2:
						R[t >> 2] = o;
						break;
					case 5:
						M[t >> 2] = Math.fround(o);
				}
			} else {for (var a = 0; a < o.length; a++) {
					switch (n) {
						case 0:
							M[t + 4 * a >> 2] = o[a];
							break;
						case 2:
							R[t + 4 * a >> 2] = o[a];
							break;
						case 5:
							M[t + 4 * a >> 2] = Math.fround(o[a]);
					}
				}}
		} else { xe.recordError(1281); }
	}
	function rr(e, r, t, n, o, a) {
		var i = function(e) {
				return 1 == (e -= 5120) ? B : 4 == e ? M : 6 == e ? R : 5 == e || 28922 == e ? P : T;
			}(e),
			u = function(e) {
				return 31 - Math.clz32(e.BYTES_PER_ELEMENT);
			}(i),
			s = 1 << u,
			c = function(e, r, t, n) {
				var o;
				return r * (e * t + (o = n) - 1 & -o);
			}(
				t,
				n,
				function(e) {
					return { 5: 3, 6: 4, 8: 2, 29502: 3, 29504: 4 }[e - 6402] || 1;
				}(r) * s,
				xe.unpackAlignment
			);
		return i.subarray(o >> u, o + c >> u);
	}
	var tr = [];
	var nr = [];
	function or(e) {
		try {
			return _.grow(e - L.byteLength + 65535 >>> 16), q(_.buffer), 1;
		} catch (e) {}
	}
	function ar(e, r, t, n, o, a, i) {
		Ge.gamepadEvent || (Ge.gamepadEvent = Ar(1432));
		var u = {
			target: Xe(e),
			allowsDeferredCalls: !0,
			eventTypeString: a,
			callbackfunc: n,
			handlerFunc: function(e) {
				var t = e || event, a = Ge.gamepadEvent;
				We(a, t.gamepad), X.get(n)(o, a, r) && t.preventDefault();
			},
			useCapture: t
		};
		Ge.registerOrRemoveHandler(u);
	}
	function ir(e, r, t, n, o, a, i) {
		Ge.keyEvent || (Ge.keyEvent = Ar(164));
		var u = {
			target: Xe(e),
			allowsDeferredCalls: !0,
			eventTypeString: a,
			callbackfunc: n,
			handlerFunc: function(e) {
				var t = Ge.keyEvent, a = t >> 2;
				M[a + 0] = e.location,
					M[a + 1] = e.ctrlKey,
					M[a + 2] = e.shiftKey,
					M[a + 3] = e.altKey,
					M[a + 4] = e.metaKey,
					M[a + 5] = e.repeat,
					M[a + 6] = e.charCode,
					M[a + 7] = e.keyCode,
					M[a + 8] = e.which,
					j(e.key || '', t + 36, 32),
					j(e.code || '', t + 68, 32),
					j(e.char || '', t + 100, 32),
					j(e.locale || '', t + 132, 32),
					X.get(n)(o, t, r) && e.preventDefault();
			},
			useCapture: t
		};
		Ge.registerOrRemoveHandler(u);
	}
	function ur(e, r, t) {
		var n = e >> 2;
		M[n + 0] = r.screenX,
			M[n + 1] = r.screenY,
			M[n + 2] = r.clientX,
			M[n + 3] = r.clientY,
			M[n + 4] = r.ctrlKey,
			M[n + 5] = r.shiftKey,
			M[n + 6] = r.altKey,
			M[n + 7] = r.metaKey,
			F[2 * n + 16] = r.button,
			F[2 * n + 17] = r.buttons,
			M[n + 9] = r.movementX,
			M[n + 10] = r.movementY;
		var o = function(e) {
			return qe.indexOf(e) < 0 ? e.getBoundingClientRect() : { left: 0, top: 0 };
		}(t);
		M[n + 11] = r.clientX - o.left, M[n + 12] = r.clientY - o.top;
	}
	function sr(e, r, t, n, o, a, i) {
		Ge.mouseEvent || (Ge.mouseEvent = Ar(64));
		var u = {
			target: e = Xe(e),
			allowsDeferredCalls: 'mousemove' != a && 'mouseenter' != a && 'mouseleave' != a,
			eventTypeString: a,
			callbackfunc: n,
			handlerFunc: function(t) {
				var a = t || event;
				ur(Ge.mouseEvent, a, e), X.get(n)(o, Ge.mouseEvent, r) && a.preventDefault();
			},
			useCapture: t
		};
		Ge.registerOrRemoveHandler(u);
	}
	var cr = {};
	function fr() {
		if (!fr.strings) {
			var e = {
				USER: 'web_user',
				LOGNAME: 'web_user',
				PATH: '/',
				PWD: '/',
				HOME: '/home/web_user',
				LANG: ('object' == typeof navigator && navigator.languages && navigator.languages[0] || 'C').replace('-', '_') + '.UTF-8',
				_: i || './this.program'
			};
			for (var r in cr) { e[r] = cr[r]; }
			var t = [];
			for (var r in e) { t.push(r + '=' + e[r]); }
			fr.strings = t;
		}
		return fr.strings;
	}
	function lr(e) {
		return e % 4 == 0 && (e % 100 != 0 || e % 400 == 0);
	}
	function dr(e, r) {
		for (var t = 0, n = 0; n <= r; t += e[n++]);
		return t;
	}
	var mr, pr = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], vr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	function gr(e, r) {
		for (var t = new Date(e.getTime()); r > 0;) {
			var n = lr(t.getFullYear()), o = t.getMonth(), a = (n ? pr : vr)[o];
			if (!(r > a - t.getDate())) { return t.setDate(t.getDate() + r), t; }
			r -= a - t.getDate() + 1, t.setDate(1), o < 11 ? t.setMonth(o + 1) : (t.setMonth(0), t.setFullYear(t.getFullYear() + 1));
		}
		return t;
	}
	function hr(e, r, t, n) {
		var o = M[n + 40 >> 2],
			a = {
				tm_sec: M[n >> 2],
				tm_min: M[n + 4 >> 2],
				tm_hour: M[n + 8 >> 2],
				tm_mday: M[n + 12 >> 2],
				tm_mon: M[n + 16 >> 2],
				tm_year: M[n + 20 >> 2],
				tm_wday: M[n + 24 >> 2],
				tm_yday: M[n + 28 >> 2],
				tm_isdst: M[n + 32 >> 2],
				tm_gmtoff: M[n + 36 >> 2],
				tm_zone: o ? U(o) : ''
			},
			i = U(t),
			u = {
				'%c': '%a %b %d %H:%M:%S %Y',
				'%D': '%m/%d/%y',
				'%F': '%Y-%m-%d',
				'%h': '%b',
				'%r': '%I:%M:%S %p',
				'%R': '%H:%M',
				'%T': '%H:%M:%S',
				'%x': '%m/%d/%y',
				'%X': '%H:%M:%S',
				'%Ec': '%c',
				'%EC': '%C',
				'%Ex': '%m/%d/%y',
				'%EX': '%H:%M:%S',
				'%Ey': '%y',
				'%EY': '%Y',
				'%Od': '%d',
				'%Oe': '%e',
				'%OH': '%H',
				'%OI': '%I',
				'%Om': '%m',
				'%OM': '%M',
				'%OS': '%S',
				'%Ou': '%u',
				'%OU': '%U',
				'%OV': '%V',
				'%Ow': '%w',
				'%OW': '%W',
				'%Oy': '%y'
			};
		for (var s in u) { i = i.replace(new RegExp(s, 'g'), u[s]); }
		var c = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			f = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		function l(e, r, t) {
			for (var n = 'number' == typeof e ? e.toString() : e || ''; n.length < r;) { n = t[0] + n; }
			return n;
		}
		function d(e, r) {
			return l(e, r, '0');
		}
		function m(e, r) {
			function t(e) {
				return e < 0 ? -1 : e > 0 ? 1 : 0;
			}
			var n;
			return 0 === (n = t(e.getFullYear() - r.getFullYear())) && 0 === (n = t(e.getMonth() - r.getMonth())) && (n = t(e.getDate() - r.getDate())), n;
		}
		function p(e) {
			switch (e.getDay()) {
				case 0:
					return new Date(e.getFullYear() - 1, 11, 29);
				case 1:
					return e;
				case 2:
					return new Date(e.getFullYear(), 0, 3);
				case 3:
					return new Date(e.getFullYear(), 0, 2);
				case 4:
					return new Date(e.getFullYear(), 0, 1);
				case 5:
					return new Date(e.getFullYear() - 1, 11, 31);
				case 6:
					return new Date(e.getFullYear() - 1, 11, 30);
			}
		}
		function v(e) {
			var r = gr(new Date(e.tm_year + 1900, 0, 1), e.tm_yday), t = new Date(r.getFullYear(), 0, 4), n = new Date(r.getFullYear() + 1, 0, 4), o = p(t), a = p(n);
			return m(o, r) <= 0 ? m(a, r) <= 0 ? r.getFullYear() + 1 : r.getFullYear() : r.getFullYear() - 1;
		}
		var g = {
			'%a': function(e) {
				return c[e.tm_wday].substring(0, 3);
			},
			'%A': function(e) {
				return c[e.tm_wday];
			},
			'%b': function(e) {
				return f[e.tm_mon].substring(0, 3);
			},
			'%B': function(e) {
				return f[e.tm_mon];
			},
			'%C': function(e) {
				return d((e.tm_year + 1900) / 100 | 0, 2);
			},
			'%d': function(e) {
				return d(e.tm_mday, 2);
			},
			'%e': function(e) {
				return l(e.tm_mday, 2, ' ');
			},
			'%g': function(e) {
				return v(e).toString().substring(2);
			},
			'%G': function(e) {
				return v(e);
			},
			'%H': function(e) {
				return d(e.tm_hour, 2);
			},
			'%I': function(e) {
				var r = e.tm_hour;
				return 0 == r ? r = 12 : r > 12 && (r -= 12), d(r, 2);
			},
			'%j': function(e) {
				return d(e.tm_mday + dr(lr(e.tm_year + 1900) ? pr : vr, e.tm_mon - 1), 3);
			},
			'%m': function(e) {
				return d(e.tm_mon + 1, 2);
			},
			'%M': function(e) {
				return d(e.tm_min, 2);
			},
			'%n': function() {
				return '\n';
			},
			'%p': function(e) {
				return e.tm_hour >= 0 && e.tm_hour < 12 ? 'AM' : 'PM';
			},
			'%S': function(e) {
				return d(e.tm_sec, 2);
			},
			'%t': function() {
				return '\t';
			},
			'%u': function(e) {
				return e.tm_wday || 7;
			},
			'%U': function(e) {
				var r = new Date(e.tm_year + 1900, 0, 1), t = 0 === r.getDay() ? r : gr(r, 7 - r.getDay()), n = new Date(e.tm_year + 1900, e.tm_mon, e.tm_mday);
				if (m(t, n) < 0) {
					var o = dr(lr(n.getFullYear()) ? pr : vr, n.getMonth() - 1) - 31, a = 31 - t.getDate() + o + n.getDate();
					return d(Math.ceil(a / 7), 2);
				}
				return 0 === m(t, r) ? '01' : '00';
			},
			'%V': function(e) {
				var r, t = new Date(e.tm_year + 1900, 0, 4), n = new Date(e.tm_year + 1901, 0, 4), o = p(t), a = p(n), i = gr(new Date(e.tm_year + 1900, 0, 1), e.tm_yday);
				return m(i, o) < 0
					? '53'
					: m(a, i) <= 0
					? '01'
					: (r = o.getFullYear() < e.tm_year + 1900 ? e.tm_yday + 32 - o.getDate() : e.tm_yday + 1 - o.getDate(), d(Math.ceil(r / 7), 2));
			},
			'%w': function(e) {
				return e.tm_wday;
			},
			'%W': function(e) {
				var r = new Date(e.tm_year, 0, 1), t = 1 === r.getDay() ? r : gr(r, 0 === r.getDay() ? 1 : 7 - r.getDay() + 1), n = new Date(e.tm_year + 1900, e.tm_mon, e.tm_mday);
				if (m(t, n) < 0) {
					var o = dr(lr(n.getFullYear()) ? pr : vr, n.getMonth() - 1) - 31, a = 31 - t.getDate() + o + n.getDate();
					return d(Math.ceil(a / 7), 2);
				}
				return 0 === m(t, r) ? '01' : '00';
			},
			'%y': function(e) {
				return (e.tm_year + 1900).toString().substring(2);
			},
			'%Y': function(e) {
				return e.tm_year + 1900;
			},
			'%z': function(e) {
				var r = e.tm_gmtoff, t = r >= 0;
				return r = (r = Math.abs(r) / 60) / 60 * 100 + r % 60, (t ? '+' : '-') + String('0000' + r).slice(-4);
			},
			'%Z': function(e) {
				return e.tm_zone;
			},
			'%%': function() {
				return '%';
			}
		};
		for (var s in g) { i.indexOf(s) >= 0 && (i = i.replace(new RegExp(s, 'g'), g[s](a))); }
		var h, E, w = xr(i, !1);
		return w.length > r ? 0 : (h = w, E = e, C.set(h, E), w.length - 1);
	}
	t.requestFullscreen = function(e, r) {
		we.requestFullscreen(e, r);
	},
		t.requestAnimationFrame = function(e) {
			we.requestAnimationFrame(e);
		},
		t.setCanvasSize = function(e, r, t) {
			we.setCanvasSize(e, r, t);
		},
		t.pauseMainLoop = function() {
			we.mainLoop.pause();
		},
		t.resumeMainLoop = function() {
			we.mainLoop.resume();
		},
		t.getUserMedia = function() {
			we.getUserMedia();
		},
		t.createContext = function(e, r, t, n) {
			return we.createContext(e, r, t, n);
		};
	var Er = function(e, r, t, n) {
		e || (e = this),
			this.parent = e,
			this.mount = e.mount,
			this.mounted = null,
			this.id = Ne.nextInode++,
			this.name = r,
			this.mode = t,
			this.node_ops = {},
			this.stream_ops = {},
			this.rdev = n;
	};
	Object.defineProperties(Er.prototype, {
		read: {
			get: function() {
				return 365 == (365 & this.mode);
			},
			set: function(e) {
				e ? this.mode |= 365 : this.mode &= -366;
			}
		},
		write: {
			get: function() {
				return 146 == (146 & this.mode);
			},
			set: function(e) {
				e ? this.mode |= 146 : this.mode &= -147;
			}
		},
		isFolder: {
			get: function() {
				return Ne.isDir(this.mode);
			}
		},
		isDevice: {
			get: function() {
				return Ne.isChrdev(this.mode);
			}
		}
	}),
		Ne.FSNode = Er,
		Ne.staticInit();
	for (var wr = 0; wr < 32; ++wr) { Qe.push(new Array(wr)); }
	var br = new Float32Array(288);
	for (wr = 0; wr < 288; ++wr) { tr[wr] = br.subarray(0, wr + 1); }
	var yr = new Int32Array(288);
	for (wr = 0; wr < 288; ++wr) { nr[wr] = yr.subarray(0, wr + 1); }
	function xr(e, r, t) {
		var n = t > 0 ? t : H(e) + 1, o = new Array(n), a = z(e, o, 0, o.length);
		return r && (o.length = a), o;
	}
	var kr,
		_r = {
			Sa: function() {
				return be.numBuffers * be.BUFFER_SIZE * 8;
			},
			Ua: function() {
				be.bufIndex = 0, be.bufOffset = 0;
			},
			_a: function(e) {
				var r = window.AudioContext || window.webkitAudioContext;
				if (!r) { return 0; }
				be.context = new r(), be.numBuffers = e * be.context.sampleRate / (1e3 * be.BUFFER_SIZE) | 0, be.numBuffers < 2 && (be.numBuffers = 2);
				for (var n = 0; n < be.numBuffers; n++) { be.buffers[n] = be.context.createBuffer(2, be.BUFFER_SIZE, be.context.sampleRate), be.buffers[n].endTime = 0; }
				return be.nonblock = !1, be.startTime = 0, be.context.createGain(), window.setTimeout(be.setStartTime, 0), t.pauseMainLoop(), 1;
			},
			Db: function() {
				be.startTime && (be.startTime = window.performance.now() - 1e3 * be.context.currentTime);
			},
			Za: function() {
				return be.context.sampleRate;
			},
			Va: function(e) {
				be.nonblock = e;
			},
			Wa: function() {
				return !0;
			},
			Xa: function() {
				return be.bufIndex = 0, be.bufOffset = 0, !0;
			},
			Ya: function(e, r) {
				be.process();
				for (var t = r / 8, n = 0; t;) {
					if (be.bufIndex === be.numBuffers) {
						if (be.nonblock) { break; }
						be.block();
					}
					var o = be.fillBuffer(e, t);
					t -= o, n += o, e += 8 * o, be.bufOffset === be.BUFFER_SIZE && be.queueAudio();
				}
				return 8 * n;
			},
			Ta: function() {
				return be.process(), 8 * ((be.numBuffers - be.bufIndex) * be.BUFFER_SIZE - be.bufOffset);
			},
			Ra: function(e) {
				ye.contexts[e].videoElement.pause(), ye.contexts[e].videoElement = null, ye.contexts[e] = null;
			},
			fb: function(e, r, t, n) {
				if (!navigator) { return 0; }
				if (!navigator.mediaDevices.getUserMedia) { return 0; }
				var o = ++ye.counter;
				return ye.contexts[o] = [],
					ye.contexts[o].videoElement = document.createElement('video'),
					ye.contexts[o].videoElement.classList.add('retroarchWebcamVideo'),
					0 !== t && 0 !== n && (ye.contexts[o].videoElement.width = t, ye.contexts[o].videoElement.height = n),
					ye.contexts[o].runMode = 1,
					ye.contexts[o].glTex = e & 1 << ye.RETRO_CAMERA_BUFFER_OPENGL_TEXTURE,
					ye.contexts[o].rawFb = e & 1 << ye.RETRO_CAMERA_BUFFER_RAW_FRAMEBUFFER,
					navigator.mediaDevices.getUserMedia({ video: !0, audio: !1 }).then(function(e) {
						ye.contexts[o].videoElement.autoplay = !0, ye.contexts[o].videoElement.srcObject = e, ye.contexts[o].runMode = 2;
					}).catch(function(e) {
						console.log('webcam request failed', e), ye.runMode = 0;
					}),
					ye.tmp || (ye.tmp = Ar(4)),
					o;
			},
			Na: function(e, r, n) {
				if (!ye.ready(e)) { return 0; }
				var o = 0;
				if (0 !== ye.contexts[e].glTexId && 0 !== n) {
					Se(32873, ye.tmp);
					var a = M[ye.tmp >> 2];
					ke(3553, ye.contexts[e].glTexId),
						ye.contexts[e].glFirstFrame
							? (t.ctx.texImage2D(t.ctx.TEXTURE_2D, 0, t.ctx.RGB, t.ctx.RGB, t.ctx.UNSIGNED_BYTE, ye.contexts[e].videoElement), ye.contexts[e].glFirstFrame = !1)
							: t.ctx.texSubImage2D(t.ctx.TEXTURE_2D, 0, 0, 0, t.ctx.RGB, t.ctx.UNSIGNED_BYTE, ye.contexts[e].videoElement),
						ke(3553, a),
						Runtime.dynCall('viii', n, [ye.contexts[e].glTexId, 3553, 0]),
						o = 1;
				}
				if (ye.contexts[e].rawFbCanvas && 0 !== r) {
					ye.contexts[e].rawFbCanvasCtx ||
					(ye.contexts[e].rawFbCanvas.width = ye.contexts[e].videoElement.videoWidth,
						ye.contexts[e].rawFbCanvas.height = ye.contexts[e].videoElement.videoHeight,
						ye.contexts[e].rawFbCanvasCtx = ye.contexts[e].rawFbCanvas.getContext('2d'),
						ye.contexts[e].rawBuffer = Ar(ye.contexts[e].videoElement.videoWidth * ye.contexts[e].videoElement.videoHeight * 4)),
						ye.contexts[e].rawFbCanvasCtx.drawImage(ye.contexts[e].videoElement, 0, 0, ye.contexts[e].rawFbCanvas.width, ye.contexts[e].rawFbCanvas.height);
					var i = ye.contexts[e].rawFbCanvasCtx.getImageData(0, 0, ye.contexts[e].videoElement.videoWidth, ye.contexts[e].videoElement.videoHeight);
					t.HEAPU8.set(i.data, ye.contexts[e].rawBuffer),
						Runtime.dynCall('viiii', r, [
							ye.contexts[e].rawBuffer,
							ye.contexts[e].videoElement.videoWidth,
							ye.contexts[e].videoElement.videoHeight,
							4 * ye.contexts[e].videoElement.videoWidth
						]),
						o = 1;
				}
				return o;
			},
			Pa: function(e) {
				var r = 0;
				if (ye.contexts[e].glTex && (Le(1, ye.tmp), ye.contexts[e].glTexId = M[ye.tmp >> 2], 0 !== ye.contexts[e].glTexId)) {
					Se(32873, ye.tmp);
					var t = M[ye.tmp >> 2];
					ke(3553, ye.contexts[e].glTexId),
						Ce(3553, 10240, 9729),
						Ce(3553, 10241, 9729),
						Ce(3553, 10242, 33071),
						Ce(3553, 10243, 33071),
						ke(3553, t),
						ye.contexts[e].glFirstFrame = !0,
						r = 1;
				}
				return ye.contexts[e].rawFb &&
					(ye.contexts[e].rawFbCanvas = document.createElement('canvas'), ye.contexts[e].rawFbCanvas.classList.add('retroarchWebcamCanvas'), r = 1),
					r;
			},
			Oa: function(e) {
				ye.contexts[e].glTexId && Be(1, ye.contexts[e].glTexId),
					ye.contexts[e].rawFbCanvas &&
					(ye.contexts[e].rawBuffer && (Sr(ye.contexts[e].rawBuffer), ye.contexts[e].rawBuffer = 0, ye.contexts[e].rawFbCanvasCtx = null),
						ye.contexts[e].rawFbCanvas = null);
			},
			o: function(e, r, t, n) {
				oe('Assertion failed: ' + U(e) + ', at: ' + [r ? U(r) : 'unknown filename', t, n ? U(n) : 'unknown function']);
			},
			h: function(e, r) {
				return t = e, n = r, void K.unshift({ func: t, arg: n });
				var t, n;
			},
			pb: function(e, r) {
				return function(e, r) {
					Fe();
					var t = new Date(1e3 * M[e >> 2]);
					M[r >> 2] = t.getSeconds(),
						M[r + 4 >> 2] = t.getMinutes(),
						M[r + 8 >> 2] = t.getHours(),
						M[r + 12 >> 2] = t.getDate(),
						M[r + 16 >> 2] = t.getMonth(),
						M[r + 20 >> 2] = t.getFullYear() - 1900,
						M[r + 24 >> 2] = t.getDay();
					var n = new Date(t.getFullYear(), 0, 1), o = (t.getTime() - n.getTime()) / 864e5 | 0;
					M[r + 28 >> 2] = o, M[r + 36 >> 2] = -60 * t.getTimezoneOffset();
					var a = new Date(t.getFullYear(), 6, 1).getTimezoneOffset(), i = n.getTimezoneOffset(), u = 0 | (a != i && t.getTimezoneOffset() == Math.min(i, a));
					M[r + 32 >> 2] = u;
					var s = M[Cr() + (u ? 4 : 0) >> 2];
					return M[r + 40 >> 2] = s, r;
				}(e, r);
			},
			fa: function(e, r, t) {
				Ue.varargs = t;
				try {
					var n = Ue.getStreamFromFD(e);
					switch (r) {
						case 0:
							return (o = Ue.get()) < 0 ? -28 : Ne.open(n.path, n.flags, 0, o).fd;
						case 1:
						case 2:
							return 0;
						case 3:
							return n.flags;
						case 4:
							var o = Ue.get();
							return n.flags |= o, 0;
						case 12:
							return o = Ue.get(), F[o + 0 >> 1] = 2, 0;
						case 13:
						case 14:
							return 0;
						case 16:
						case 8:
							return -28;
						case 9:
							return Te(28), -1;
						default:
							return -28;
					}
				} catch (e) {
					return void 0 !== Ne && e instanceof Ne.ErrnoError || oe(e), -e.errno;
				}
			},
			zb: function(e, r) {
				try {
					var t = Ue.getStreamFromFD(e);
					return Ue.doStat(Ne.stat, t.path, r);
				} catch (e) {
					return void 0 !== Ne && e instanceof Ne.ErrnoError || oe(e), -e.errno;
				}
			},
			ub: function(e, r, t, n) {
				try {
					var o = Ue.get64(t, n);
					return Ne.ftruncate(e, o), 0;
				} catch (e) {
					return void 0 !== Ne && e instanceof Ne.ErrnoError || oe(e), -e.errno;
				}
			},
			xb: function(e, r) {
				try {
					if (0 === r) { return -28; }
					var t = Ne.cwd();
					return r < H(t) + 1 ? -68 : (j(t, e, r), e);
				} catch (e) {
					return void 0 !== Ne && e instanceof Ne.ErrnoError || oe(e), -e.errno;
				}
			},
			Ab: function(e, r, t) {
				try {
					var n = Ue.getStreamFromFD(e);
					n.getdents || (n.getdents = Ne.readdir(n.path));
					for (var o = 0, a = Ne.llseek(n, 0, 1), i = Math.floor(a / 280); i < n.getdents.length && o + 280 <= t;) {
						var u, s, c = n.getdents[i];
						if ('.' === c[0]) { u = 1, s = 4; }
						else {
							var f = Ne.lookupNode(n.node, c);
							u = f.id, s = Ne.isChrdev(f.mode) ? 2 : Ne.isDir(f.mode) ? 4 : Ne.isLink(f.mode) ? 10 : 8;
						}
						de = [
							u >>> 0,
							(le = u,
								+Math.abs(le) >= 1
									? le > 0 ? (0 | Math.min(+Math.floor(le / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((le - +(~~le >>> 0)) / 4294967296) >>> 0
									: 0)
						],
							M[r + o >> 2] = de[0],
							M[r + o + 4 >> 2] = de[1],
							de = [
								280 * (i + 1) >>> 0,
								(le = 280 * (i + 1),
									+Math.abs(le) >= 1
										? le > 0 ? (0 | Math.min(+Math.floor(le / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((le - +(~~le >>> 0)) / 4294967296) >>> 0
										: 0)
							],
							M[r + o + 8 >> 2] = de[0],
							M[r + o + 12 >> 2] = de[1],
							F[r + o + 16 >> 1] = 280,
							C[r + o + 18 >> 0] = s,
							j(c, r + o + 19, 256),
							o += 280,
							i += 1;
					}
					return Ne.llseek(n, 280 * i, 0), o;
				} catch (e) {
					return void 0 !== Ne && e instanceof Ne.ErrnoError || oe(e), -e.errno;
				}
			},
			vb: function() {
				return 42;
			},
			tb: function(e, r, t) {
				Ue.varargs = t;
				try {
					var n = Ue.getStreamFromFD(e);
					switch (r) {
						case 21509:
						case 21505:
							return n.tty ? 0 : -59;
						case 21510:
						case 21511:
						case 21512:
						case 21506:
						case 21507:
						case 21508:
							return n.tty ? 0 : -59;
						case 21519:
							if (!n.tty) { return -59; }
							var o = Ue.get();
							return M[o >> 2] = 0, 0;
						case 21520:
							return n.tty ? -28 : -59;
						case 21531:
							return o = Ue.get(), Ne.ioctl(n, r, o);
						case 21523:
						case 21524:
							return n.tty ? 0 : -59;
						default:
							oe('bad ioctl syscall ' + r);
					}
				} catch (e) {
					return void 0 !== Ne && e instanceof Ne.ErrnoError || oe(e), -e.errno;
				}
			},
			Bb: function(e, r) {
				try {
					return e = Ue.getStr(e), Ue.doMkdir(e, r);
				} catch (e) {
					return void 0 !== Ne && e instanceof Ne.ErrnoError || oe(e), -e.errno;
				}
			},
			U: function(e, r, t) {
				Ue.varargs = t;
				try {
					var n = Ue.getStr(e), o = t ? Ue.get() : 0;
					return Ne.open(n, r, o).fd;
				} catch (e) {
					return void 0 !== Ne && e instanceof Ne.ErrnoError || oe(e), -e.errno;
				}
			},
			yb: function(e, r, t) {
				try {
					return e = Ue.getStr(e), Ue.doReadlink(e, r, t);
				} catch (e) {
					return void 0 !== Ne && e instanceof Ne.ErrnoError || oe(e), -e.errno;
				}
			},
			qb: function(e, r) {
				try {
					return e = Ue.getStr(e), r = Ue.getStr(r), Ne.rename(e, r), 0;
				} catch (e) {
					return void 0 !== Ne && e instanceof Ne.ErrnoError || oe(e), -e.errno;
				}
			},
			rb: function(e) {
				try {
					return e = Ue.getStr(e), Ne.rmdir(e), 0;
				} catch (e) {
					return void 0 !== Ne && e instanceof Ne.ErrnoError || oe(e), -e.errno;
				}
			},
			ha: function(e, r) {
				try {
					return e = Ue.getStr(e), Ue.doStat(Ne.stat, e, r);
				} catch (e) {
					return void 0 !== Ne && e instanceof Ne.ErrnoError || oe(e), -e.errno;
				}
			},
			sb: function(e) {
				try {
					return e = Ue.getStr(e), Ne.unlink(e), 0;
				} catch (e) {
					return void 0 !== Ne && e instanceof Ne.ErrnoError || oe(e), -e.errno;
				}
			},
			c: function() {
				oe();
			},
			ka: function(e, r) {
				var t;
				if (0 === e) { t = Date.now(); }
				else {
					if (1 !== e && 4 !== e || !ze) { return Te(28), -1; }
					t = me();
				}
				return M[r >> 2] = t / 1e3 | 0, M[r + 4 >> 2] = t % 1e3 * 1e3 * 1e3 | 0, 0;
			},
			hd: function() {
				je || console.error('ERRNO_CODES not imported!');
			},
			Ga: function(e) {
				return 12448 == e ? (He.setErrorCode(12288), 1) : (He.setErrorCode(12300), 0);
			},
			cf: function(e, r, t, n, o) {
				return He.chooseConfig(e, r, t, n, o);
			},
			Aa: function(e, r, n, o) {
				if (62e3 != e) { return He.setErrorCode(12296), 0; }
				for (var a = 1;;) {
					var i = M[o >> 2];
					if (12440 != i) {
						if (12344 == i) { break; }
						return He.setErrorCode(12292), 0;
					}
					a = M[o + 4 >> 2], o += 8;
				}
				return 2 != a
					? (He.setErrorCode(12293), 0)
					: (He.contextAttributes.majorVersion = a - 1,
						He.contextAttributes.minorVersion = 0,
						He.context = xe.createContext(t.canvas, He.contextAttributes),
						0 != He.context
							? (He.setErrorCode(12288),
								xe.makeContextCurrent(He.context),
								t.useWebGL = !0,
								we.moduleContextCreatedCallbacks.forEach(function(e) {
									e();
								}),
								xe.makeContextCurrent(null),
								62004)
							: (He.setErrorCode(12297), 0));
			},
			af: function(e, r, t, n) {
				return 62e3 != e ? (He.setErrorCode(12296), 0) : 62002 != r ? (He.setErrorCode(12293), 0) : (He.setErrorCode(12288), 62006);
			},
			X: function(e, r) {
				return 62e3 != e
					? (He.setErrorCode(12296), 0)
					: 62004 != r
					? (He.setErrorCode(12294), 0)
					: (xe.deleteContext(He.context), He.setErrorCode(12288), He.currentContext == r && (He.currentContext = 0), 1);
			},
			Da: function(e, r) {
				return 62e3 != e
					? (He.setErrorCode(12296), 0)
					: 62006 != r
					? (He.setErrorCode(12301), 1)
					: (He.currentReadSurface == r && (He.currentReadSurface = 0), He.currentDrawSurface == r && (He.currentDrawSurface = 0), He.setErrorCode(12288), 1);
			},
			df: function(e, r, t, n) {
				return He.chooseConfig(e, 0, r, t, n);
			},
			Ba: function() {
				return He.currentContext;
			},
			bf: function(e) {
				return He.setErrorCode(12288), 62e3;
			},
			Ja: function() {
				return He.errorCode;
			},
			Ha: function(e, r, t) {
				return 62e3 == e ? (r && (M[r >> 2] = 1), t && (M[t >> 2] = 4), He.defaultDisplayInitialized = !0, He.setErrorCode(12288), 1) : (He.setErrorCode(12296), 0);
			},
			O: function(e, r, t, n) {
				return 62e3 != e
					? (He.setErrorCode(12296), 0)
					: 0 != n && 62004 != n
					? (He.setErrorCode(12294), 0)
					: 0 != t && 62006 != t || 0 != r && 62006 != r
					? (He.setErrorCode(12301), 0)
					: (xe.makeContextCurrent(n ? He.context : null), He.currentContext = n, He.currentDrawSurface = r, He.currentReadSurface = t, He.setErrorCode(12288), 1);
			},
			W: function(e, r, n, o) {
				if (62e3 != e) { return He.setErrorCode(12296), 0; }
				if (62006 != r) { return He.setErrorCode(12301), 0; }
				if (!o) { return He.setErrorCode(12300), 0; }
				switch (He.setErrorCode(12288), n) {
					case 12328:
						return M[o >> 2] = 62002, 1;
					case 12376:
						return 1;
					case 12375:
						return M[o >> 2] = t.canvas.width, 1;
					case 12374:
						return M[o >> 2] = t.canvas.height, 1;
					case 12432:
					case 12433:
					case 12434:
						return M[o >> 2] = -1, 1;
					case 12422:
						return M[o >> 2] = 12420, 1;
					case 12441:
						return M[o >> 2] = 12442, 1;
					case 12435:
						return M[o >> 2] = 12437, 1;
					case 12416:
					case 12417:
					case 12418:
					case 12419:
						return 1;
					default:
						return He.setErrorCode(12292), 0;
				}
			},
			Ca: function() {
				if (He.defaultDisplayInitialized) {
					if (t.ctx) {
						if (!t.ctx.isContextLost()) { return He.setErrorCode(12288), 1; }
						He.setErrorCode(12302);
					} else { He.setErrorCode(12290); }
				} else { He.setErrorCode(12289); }
				return 0;
			},
			Ia: function(e) {
				return 62e3 != e
					? (He.setErrorCode(12296), 0)
					: (He.currentContext = 0, He.currentReadSurface = 0, He.currentDrawSurface = 0, He.defaultDisplayInitialized = !1, He.setErrorCode(12288), 1);
			},
			bb: function() {
				if (Ge.removeDeferredCalls(Ve), document.exitPointerLock) { document.exitPointerLock(); }
				else {
					if (!document.msExitPointerLock) { return -1; }
					document.msExitPointerLock();
				}
				return 0;
			},
			Qa: function(e) {
				D = !1, zr(e);
			},
			Z: function(e, r, t) {
				var n = Ye(e);
				if (!n) { return -4; }
				M[r >> 2] = n.width, M[t >> 2] = n.height;
			},
			Ka: function(e) {
				return Ge.fullscreenEnabled()
					? (function(e) {
						var r = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement, t = !!r;
						M[e >> 2] = t, M[e + 4 >> 2] = Ge.fullscreenEnabled();
						var n = t ? r : Ge.previousFullscreenElement, o = Ge.getNodeNameForTarget(n), a = n && n.id ? n.id : '';
						j(o, e + 8, 128),
							j(a, e + 136, 128),
							M[e + 264 >> 2] = n ? n.clientWidth : 0,
							M[e + 268 >> 2] = n ? n.clientHeight : 0,
							M[e + 272 >> 2] = screen.width,
							M[e + 276 >> 2] = screen.height,
							t && (Ge.previousFullscreenElement = r);
					}(e),
						0)
					: -1;
			},
			F: function(e, r) {
				return e < 0 || e >= Ge.lastGamepadState.length ? -5 : Ge.lastGamepadState[e] ? (We(r, Ge.lastGamepadState[e]), 0) : -7;
			},
			se: function(e) {
				mr.activeTexture(e);
			},
			re: function(e, r) {
				mr.attachShader(xe.programs[e], xe.shaders[r]);
			},
			Ie: function(e, r) {
				mr.disjointTimerQueryExt.beginQueryEXT(e, xe.timerQueriesEXT[r]);
			},
			qe: function(e, r, t) {
				mr.bindAttribLocation(xe.programs[e], r, U(t));
			},
			pe: function(e, r) {
				34962 == e ? mr.currentArrayBufferBinding = r : 34963 == e && (mr.currentElementArrayBufferBinding = r), mr.bindBuffer(e, xe.buffers[r]);
			},
			oe: function(e, r) {
				mr.bindFramebuffer(e, xe.framebuffers[r]);
			},
			ne: function(e, r) {
				mr.bindRenderbuffer(e, xe.renderbuffers[r]);
			},
			me: function(e, r) {
				mr.bindTexture(e, xe.textures[r]);
			},
			Ae: function(e) {
				mr.bindVertexArray(xe.vaos[e]);
				var r = mr.getParameter(34965);
				mr.currentElementArrayBufferBinding = r ? 0 | r.name : 0;
			},
			le: function(e, r, t, n) {
				mr.blendColor(e, r, t, n);
			},
			ke: function(e) {
				mr.blendEquation(e);
			},
			je: function(e, r) {
				mr.blendEquationSeparate(e, r);
			},
			ie: function(e, r) {
				mr.blendFunc(e, r);
			},
			he: function(e, r, t, n) {
				mr.blendFuncSeparate(e, r, t, n);
			},
			ge: function(e, r, t, n) {
				mr.bufferData(e, t ? B.subarray(t, t + r) : r, n);
			},
			fe: function(e, r, t, n) {
				mr.bufferSubData(e, r, B.subarray(n, n + t));
			},
			ee: function(e) {
				return mr.checkFramebufferStatus(e);
			},
			de: function(e) {
				mr.clear(e);
			},
			ce: function(e, r, t, n) {
				mr.clearColor(e, r, t, n);
			},
			be: function(e) {
				mr.clearDepth(e);
			},
			ae: function(e) {
				mr.clearStencil(e);
			},
			$d: function(e, r, t, n) {
				mr.colorMask(!!e, !!r, !!t, !!n);
			},
			_d: function(e) {
				mr.compileShader(xe.shaders[e]);
			},
			Zd: function(e, r, t, n, o, a, i, u) {
				mr.compressedTexImage2D(e, r, t, n, o, a, u ? B.subarray(u, u + i) : null);
			},
			Xd: function(e, r, t, n, o, a, i, u, s) {
				mr.compressedTexSubImage2D(e, r, t, n, o, a, i, s ? B.subarray(s, s + u) : null);
			},
			Wd: function(e, r, t, n, o, a, i, u) {
				mr.copyTexImage2D(e, r, t, n, o, a, i, u);
			},
			Vd: function(e, r, t, n, o, a, i, u) {
				mr.copyTexSubImage2D(e, r, t, n, o, a, i, u);
			},
			Ud: function() {
				var e = xe.getNewId(xe.programs), r = mr.createProgram();
				return r.name = e, xe.programs[e] = r, e;
			},
			Td: function(e) {
				var r = xe.getNewId(xe.shaders);
				return xe.shaders[r] = mr.createShader(e), r;
			},
			Sd: function(e) {
				mr.cullFace(e);
			},
			Rd: function(e, r) {
				for (var t = 0; t < e; t++) {
					var n = M[r + 4 * t >> 2], o = xe.buffers[n];
					o &&
						(mr.deleteBuffer(o),
							o.name = 0,
							xe.buffers[n] = null,
							n == mr.currentArrayBufferBinding && (mr.currentArrayBufferBinding = 0),
							n == mr.currentElementArrayBufferBinding && (mr.currentElementArrayBufferBinding = 0));
				}
			},
			Qd: function(e, r) {
				for (var t = 0; t < e; ++t) {
					var n = M[r + 4 * t >> 2], o = xe.framebuffers[n];
					o && (mr.deleteFramebuffer(o), o.name = 0, xe.framebuffers[n] = null);
				}
			},
			Pd: function(e) {
				if (e) {
					var r = xe.programs[e];
					r ? (mr.deleteProgram(r), r.name = 0, xe.programs[e] = null, xe.programInfos[e] = null) : xe.recordError(1281);
				}
			},
			Ke: function(e, r) {
				for (var t = 0; t < e; t++) {
					var n = M[r + 4 * t >> 2], o = xe.timerQueriesEXT[n];
					o && (mr.disjointTimerQueryExt.deleteQueryEXT(o), xe.timerQueriesEXT[n] = null);
				}
			},
			Od: function(e, r) {
				for (var t = 0; t < e; t++) {
					var n = M[r + 4 * t >> 2], o = xe.renderbuffers[n];
					o && (mr.deleteRenderbuffer(o), o.name = 0, xe.renderbuffers[n] = null);
				}
			},
			Md: function(e) {
				if (e) {
					var r = xe.shaders[e];
					r ? (mr.deleteShader(r), xe.shaders[e] = null) : xe.recordError(1281);
				}
			},
			Ld: function(e, r) {
				for (var t = 0; t < e; t++) {
					var n = M[r + 4 * t >> 2], o = xe.textures[n];
					o && (mr.deleteTexture(o), o.name = 0, xe.textures[n] = null);
				}
			},
			ze: function(e, r) {
				for (var t = 0; t < e; t++) {
					var n = M[r + 4 * t >> 2];
					mr.deleteVertexArray(xe.vaos[n]), xe.vaos[n] = null;
				}
			},
			Kd: function(e) {
				mr.depthFunc(e);
			},
			Jd: function(e) {
				mr.depthMask(!!e);
			},
			Id: function(e, r) {
				mr.depthRange(e, r);
			},
			Hd: function(e, r) {
				mr.detachShader(xe.programs[e], xe.shaders[r]);
			},
			Gd: function(e) {
				mr.disable(e);
			},
			Fd: function(e) {
				xe.currentContext.clientBuffers[e].enabled = !1, mr.disableVertexAttribArray(e);
			},
			Ed: function(e, r, t) {
				xe.preDrawHandleClientVertexAttribBindings(r + t), mr.drawArrays(e, r, t), xe.postDrawHandleClientVertexAttribBindings();
			},
			ve: function(e, r, t, n) {
				mr.drawArraysInstanced(e, r, t, n);
			},
			we: function(e, r) {
				for (var t = Qe[e], n = 0; n < e; n++) { t[n] = M[r + 4 * n >> 2]; }
				mr.drawBuffers(t);
			},
			Dd: function(e, r, t, n) {
				var o;
				if (!mr.currentElementArrayBufferBinding) {
					var a = xe.calcBufLength(1, t, 0, r);
					o = xe.getTempIndexBuffer(a), mr.bindBuffer(34963, o), mr.bufferSubData(34963, 0, B.subarray(n, n + a)), n = 0;
				}
				xe.preDrawHandleClientVertexAttribBindings(r),
					mr.drawElements(e, r, t, n),
					xe.postDrawHandleClientVertexAttribBindings(r),
					mr.currentElementArrayBufferBinding || mr.bindBuffer(34963, null);
			},
			ue: function(e, r, t, n, o) {
				mr.drawElementsInstanced(e, r, t, n, o);
			},
			Cd: function(e) {
				mr.enable(e);
			},
			Bd: function(e) {
				xe.currentContext.clientBuffers[e].enabled = !0, mr.enableVertexAttribArray(e);
			},
			He: function(e) {
				mr.disjointTimerQueryExt.endQueryEXT(e);
			},
			Ad: function() {
				mr.finish();
			},
			zd: function() {
				mr.flush();
			},
			yd: function(e, r, t, n) {
				mr.framebufferRenderbuffer(e, r, t, xe.renderbuffers[n]);
			},
			xd: function(e, r, t, n, o) {
				mr.framebufferTexture2D(e, r, t, xe.textures[n], o);
			},
			wd: function(e) {
				mr.frontFace(e);
			},
			vd: function(e, r) {
				Ae(e, r, 'createBuffer', xe.buffers);
			},
			td: function(e, r) {
				Ae(e, r, 'createFramebuffer', xe.framebuffers);
			},
			Le: function(e, r) {
				for (var t = 0; t < e; t++) {
					var n = mr.disjointTimerQueryExt.createQueryEXT();
					if (!n) {
						for (xe.recordError(1282); t < e;) { M[r + 4 * t++ >> 2] = 0; }
						return;
					}
					var o = xe.getNewId(xe.timerQueriesEXT);
					n.name = o, xe.timerQueriesEXT[o] = n, M[r + 4 * t >> 2] = o;
				}
			},
			rd: function(e, r) {
				Ae(e, r, 'createRenderbuffer', xe.renderbuffers);
			},
			qd: function(e, r) {
				Ae(e, r, 'createTexture', xe.textures);
			},
			ye: function(e, r) {
				Ae(e, r, 'createVertexArray', xe.vaos);
			},
			ud: function(e) {
				mr.generateMipmap(e);
			},
			pd: function(e, r, t, n, o, a, i) {
				Ke('getActiveAttrib', e, r, t, n, o, a, i);
			},
			od: function(e, r, t, n, o, a, i) {
				Ke('getActiveUniform', e, r, t, n, o, a, i);
			},
			nd: function(e, r, t, n) {
				var o = mr.getAttachedShaders(xe.programs[e]), a = o.length;
				a > r && (a = r), M[t >> 2] = a;
				for (var i = 0; i < a; ++i) {
					var u = xe.shaders.indexOf(o[i]);
					M[n + 4 * i >> 2] = u;
				}
			},
			md: function(e, r) {
				return mr.getAttribLocation(xe.programs[e], U(r));
			},
			ld: function(e, r) {
				De(e, r, 4);
			},
			kd: function(e, r, t) {
				t ? M[t >> 2] = mr.getBufferParameter(e, r) : xe.recordError(1281);
			},
			jd: function() {
				var e = mr.getError() || xe.lastError;
				return xe.lastError = 0, e;
			},
			id: function(e, r) {
				De(e, r, 2);
			},
			gd: function(e, r, t, n) {
				var o = mr.getFramebufferAttachmentParameter(e, r, t);
				(o instanceof WebGLRenderbuffer || o instanceof WebGLTexture) && (o = 0 | o.name), M[n >> 2] = o;
			},
			fd: function(e, r) {
				De(e, r, 0);
			},
			dd: function(e, r, t, n) {
				var o = mr.getProgramInfoLog(xe.programs[e]);
				null === o && (o = '(unknown error)');
				var a = r > 0 && n ? j(o, n, r) : 0;
				t && (M[t >> 2] = a);
			},
			ed: function(e, r, t) {
				if (t) {
					if (e >= xe.counter) { xe.recordError(1281); }
					else {
						var n = xe.programInfos[e];
						if (n) {
							if (35716 == r) {
								var o = mr.getProgramInfoLog(xe.programs[e]);
								null === o && (o = '(unknown error)'), M[t >> 2] = o.length + 1;
							} else if (35719 == r) { M[t >> 2] = n.maxUniformLength; }
							else if (35722 == r) {
								if (-1 == n.maxAttributeLength) {
									e = xe.programs[e];
									var a = mr.getProgramParameter(e, 35721);
									n.maxAttributeLength = 0;
									for (var i = 0; i < a; ++i) {
										var u = mr.getActiveAttrib(e, i);
										n.maxAttributeLength = Math.max(n.maxAttributeLength, u.name.length + 1);
									}
								}
								M[t >> 2] = n.maxAttributeLength;
							} else if (35381 == r) {
								if (-1 == n.maxUniformBlockNameLength) {
									e = xe.programs[e];
									var s = mr.getProgramParameter(e, 35382);
									for (n.maxUniformBlockNameLength = 0, i = 0; i < s; ++i) {
										var c = mr.getActiveUniformBlockName(e, i);
										n.maxUniformBlockNameLength = Math.max(n.maxUniformBlockNameLength, c.length + 1);
									}
								}
								M[t >> 2] = n.maxUniformBlockNameLength;
							} else { M[t >> 2] = mr.getProgramParameter(xe.programs[e], r); }
						} else { xe.recordError(1282); }
					}
				} else { xe.recordError(1281); }
			},
			Ce: function(e, r, t) {
				if (t) {
					var n = xe.timerQueriesEXT[e], o = mr.disjointTimerQueryExt.getQueryObjectEXT(n, r);
					_e(t, 'boolean' == typeof o ? o ? 1 : 0 : o);
				} else { xe.recordError(1281); }
			},
			Ee: function(e, r, t) {
				if (t) {
					var n, o = xe.timerQueriesEXT[e], a = mr.disjointTimerQueryExt.getQueryObjectEXT(o, r);
					n = 'boolean' == typeof a ? a ? 1 : 0 : a, M[t >> 2] = n;
				} else { xe.recordError(1281); }
			},
			Be: function(e, r, t) {
				if (t) {
					var n = xe.timerQueriesEXT[e], o = mr.disjointTimerQueryExt.getQueryObjectEXT(n, r);
					_e(t, 'boolean' == typeof o ? o ? 1 : 0 : o);
				} else { xe.recordError(1281); }
			},
			De: function(e, r, t) {
				if (t) {
					var n, o = xe.timerQueriesEXT[e], a = mr.disjointTimerQueryExt.getQueryObjectEXT(o, r);
					n = 'boolean' == typeof a ? a ? 1 : 0 : a, M[t >> 2] = n;
				} else { xe.recordError(1281); }
			},
			Fe: function(e, r, t) {
				t ? M[t >> 2] = mr.disjointTimerQueryExt.getQueryEXT(e, r) : xe.recordError(1281);
			},
			cd: function(e, r, t) {
				t ? M[t >> 2] = mr.getRenderbufferParameter(e, r) : xe.recordError(1281);
			},
			ad: function(e, r, t, n) {
				var o = mr.getShaderInfoLog(xe.shaders[e]);
				null === o && (o = '(unknown error)');
				var a = r > 0 && n ? j(o, n, r) : 0;
				t && (M[t >> 2] = a);
			},
			$c: function(e, r, t, n) {
				var o = mr.getShaderPrecisionFormat(e, r);
				M[t >> 2] = o.rangeMin, M[t + 4 >> 2] = o.rangeMax, M[n >> 2] = o.precision;
			},
			_c: function(e, r, t, n) {
				var o = mr.getShaderSource(xe.shaders[e]);
				if (o) {
					var a = r > 0 && n ? j(o, n, r) : 0;
					t && (M[t >> 2] = a);
				}
			},
			bd: function(e, r, t) {
				if (t) {
					if (35716 == r) {
						var n = mr.getShaderInfoLog(xe.shaders[e]);
						null === n && (n = '(unknown error)');
						var o = n ? n.length + 1 : 0;
						M[t >> 2] = o;
					} else if (35720 == r) {
						var a = mr.getShaderSource(xe.shaders[e]), i = a ? a.length + 1 : 0;
						M[t >> 2] = i;
					} else { M[t >> 2] = mr.getShaderParameter(xe.shaders[e], r); }
				} else { xe.recordError(1281); }
			},
			Zc: function(e) {
				if (xe.stringCache[e]) { return xe.stringCache[e]; }
				var r;
				switch (e) {
					case 7939:
						var t = mr.getSupportedExtensions() || [];
						r = Ze((t = t.concat(t.map(function(e) {
							return 'GL_' + e;
						}))).join(' '));
						break;
					case 7936:
					case 7937:
					case 37445:
					case 37446:
						var n = mr.getParameter(e);
						n || xe.recordError(1280), r = Ze(n);
						break;
					case 7938:
						var o = mr.getParameter(7938);
						r = Ze(o = 'OpenGL ES 2.0 (' + o + ')');
						break;
					case 35724:
						var a = mr.getParameter(35724), i = a.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
						null !== i && (3 == i[1].length && (i[1] = i[1] + '0'), a = 'OpenGL ES GLSL ES ' + i[1] + ' (' + a + ')'), r = Ze(a);
						break;
					default:
						return xe.recordError(1280), 0;
				}
				return xe.stringCache[e] = r, r;
			},
			Yc: function(e, r, t) {
				t ? R[t >> 2] = mr.getTexParameter(e, r) : xe.recordError(1281);
			},
			Xc: function(e, r, t) {
				t ? M[t >> 2] = mr.getTexParameter(e, r) : xe.recordError(1281);
			},
			Uc: function(e, r) {
				var t = 0;
				if (']' == (r = U(r))[r.length - 1]) {
					var n = r.lastIndexOf('[');
					t = ']' != r[n + 1] ? $e(r.slice(n + 1)) : 0, r = r.slice(0, n);
				}
				var o = xe.programInfos[e] && xe.programInfos[e].uniforms[r];
				return o && t >= 0 && t < o[0] ? o[1] + t : -1;
			},
			Wc: function(e, r, t) {
				Je(e, r, t, 2);
			},
			Vc: function(e, r, t) {
				Je(e, r, t, 0);
			},
			Rc: function(e, r, t) {
				t
					? (xe.currentContext.clientBuffers[e].enabled && E('glGetVertexAttribPointer on client-side array: not supported, bad data returned'),
						M[t >> 2] = mr.getVertexAttribOffset(e, r))
					: xe.recordError(1281);
			},
			Tc: function(e, r, t) {
				er(e, r, t, 2);
			},
			Sc: function(e, r, t) {
				er(e, r, t, 5);
			},
			Qc: function(e, r) {
				mr.hint(e, r);
			},
			Pc: function(e) {
				var r = xe.buffers[e];
				return r ? mr.isBuffer(r) : 0;
			},
			Oc: function(e) {
				return mr.isEnabled(e);
			},
			Nc: function(e) {
				var r = xe.framebuffers[e];
				return r ? mr.isFramebuffer(r) : 0;
			},
			Mc: function(e) {
				return (e = xe.programs[e]) ? mr.isProgram(e) : 0;
			},
			Je: function(e) {
				var r = xe.timerQueriesEXT[e];
				return r ? mr.disjointTimerQueryExt.isQueryEXT(r) : 0;
			},
			Lc: function(e) {
				var r = xe.renderbuffers[e];
				return r ? mr.isRenderbuffer(r) : 0;
			},
			Kc: function(e) {
				var r = xe.shaders[e];
				return r ? mr.isShader(r) : 0;
			},
			Jc: function(e) {
				var r = xe.textures[e];
				return r ? mr.isTexture(r) : 0;
			},
			xe: function(e) {
				var r = xe.vaos[e];
				return r ? mr.isVertexArray(r) : 0;
			},
			Ic: function(e) {
				mr.lineWidth(e);
			},
			Hc: function(e) {
				mr.linkProgram(xe.programs[e]), xe.populateUniformTable(e);
			},
			Gc: function(e, r) {
				3317 == e && (xe.unpackAlignment = r), mr.pixelStorei(e, r);
			},
			Fc: function(e, r) {
				mr.polygonOffset(e, r);
			},
			Ge: function(e, r) {
				mr.disjointTimerQueryExt.queryCounterEXT(xe.timerQueriesEXT[e], r);
			},
			Dc: function(e, r, t, n, o, a, i) {
				var u = rr(a, o, t, n, i);
				u ? mr.readPixels(e, r, t, n, o, a, u) : xe.recordError(1280);
			},
			Cc: function() {},
			Bc: function(e, r, t, n) {
				mr.renderbufferStorage(e, r, t, n);
			},
			Ac: function(e, r) {
				mr.sampleCoverage(e, !!r);
			},
			zc: function(e, r, t, n) {
				mr.scissor(e, r, t, n);
			},
			yc: function() {
				xe.recordError(1280);
			},
			xc: function(e, r, t, n) {
				var o = xe.getSource(e, r, t, n);
				mr.shaderSource(xe.shaders[e], o);
			},
			wc: function(e, r, t) {
				mr.stencilFunc(e, r, t);
			},
			vc: function(e, r, t, n) {
				mr.stencilFuncSeparate(e, r, t, n);
			},
			uc: function(e) {
				mr.stencilMask(e);
			},
			sc: function(e, r) {
				mr.stencilMaskSeparate(e, r);
			},
			rc: function(e, r, t) {
				mr.stencilOp(e, r, t);
			},
			qc: function(e, r, t, n) {
				mr.stencilOpSeparate(e, r, t, n);
			},
			pc: function(e, r, t, n, o, a, i, u, s) {
				mr.texImage2D(e, r, t, n, o, a, i, u, s ? rr(u, i, n, o, s) : null);
			},
			oc: function(e, r, t) {
				mr.texParameterf(e, r, t);
			},
			nc: function(e, r, t) {
				var n = R[t >> 2];
				mr.texParameterf(e, r, n);
			},
			mc: function(e, r, t) {
				mr.texParameteri(e, r, t);
			},
			lc: function(e, r, t) {
				var n = M[t >> 2];
				mr.texParameteri(e, r, n);
			},
			kc: function(e, r, t, n, o, a, i, u, s) {
				var c = null;
				s && (c = rr(u, i, o, a, s)), mr.texSubImage2D(e, r, t, n, o, a, i, u, c);
			},
			jc: function(e, r) {
				mr.uniform1f(xe.uniforms[e], r);
			},
			hc: function(e, r, t) {
				if (r <= 288) { for (var n = tr[r - 1], o = 0; o < r; ++o) { n[o] = R[t + 4 * o >> 2]; } }
				else { n = R.subarray(t >> 2, t + 4 * r >> 2); }
				mr.uniform1fv(xe.uniforms[e], n);
			},
			gc: function(e, r) {
				mr.uniform1i(xe.uniforms[e], r);
			},
			fc: function(e, r, t) {
				if (r <= 288) { for (var n = nr[r - 1], o = 0; o < r; ++o) { n[o] = M[t + 4 * o >> 2]; } }
				else { n = M.subarray(t >> 2, t + 4 * r >> 2); }
				mr.uniform1iv(xe.uniforms[e], n);
			},
			ec: function(e, r, t) {
				mr.uniform2f(xe.uniforms[e], r, t);
			},
			dc: function(e, r, t) {
				if (r <= 144) { for (var n = tr[2 * r - 1], o = 0; o < 2 * r; o += 2) { n[o] = R[t + 4 * o >> 2], n[o + 1] = R[t + (4 * o + 4) >> 2]; } }
				else { n = R.subarray(t >> 2, t + 8 * r >> 2); }
				mr.uniform2fv(xe.uniforms[e], n);
			},
			cc: function(e, r, t) {
				mr.uniform2i(xe.uniforms[e], r, t);
			},
			bc: function(e, r, t) {
				if (r <= 144) { for (var n = nr[2 * r - 1], o = 0; o < 2 * r; o += 2) { n[o] = M[t + 4 * o >> 2], n[o + 1] = M[t + (4 * o + 4) >> 2]; } }
				else { n = M.subarray(t >> 2, t + 8 * r >> 2); }
				mr.uniform2iv(xe.uniforms[e], n);
			},
			ac: function(e, r, t, n) {
				mr.uniform3f(xe.uniforms[e], r, t, n);
			},
			$b: function(e, r, t) {
				if (r <= 96) {
					for (var n = tr[3 * r - 1], o = 0; o < 3 * r; o += 3) { n[o] = R[t + 4 * o >> 2], n[o + 1] = R[t + (4 * o + 4) >> 2], n[o + 2] = R[t + (4 * o + 8) >> 2]; }
				} else { n = R.subarray(t >> 2, t + 12 * r >> 2); }
				mr.uniform3fv(xe.uniforms[e], n);
			},
			_b: function(e, r, t, n) {
				mr.uniform3i(xe.uniforms[e], r, t, n);
			},
			Yb: function(e, r, t) {
				if (r <= 96) {
					for (var n = nr[3 * r - 1], o = 0; o < 3 * r; o += 3) { n[o] = M[t + 4 * o >> 2], n[o + 1] = M[t + (4 * o + 4) >> 2], n[o + 2] = M[t + (4 * o + 8) >> 2]; }
				} else { n = M.subarray(t >> 2, t + 12 * r >> 2); }
				mr.uniform3iv(xe.uniforms[e], n);
			},
			Xb: function(e, r, t, n, o) {
				mr.uniform4f(xe.uniforms[e], r, t, n, o);
			},
			Wb: function(e, r, t) {
				if (r <= 72) {
					var n = tr[4 * r - 1], o = R;
					t >>= 2;
					for (var a = 0; a < 4 * r; a += 4) {
						var i = t + a;
						n[a] = o[i], n[a + 1] = o[i + 1], n[a + 2] = o[i + 2], n[a + 3] = o[i + 3];
					}
				} else { n = R.subarray(t >> 2, t + 16 * r >> 2); }
				mr.uniform4fv(xe.uniforms[e], n);
			},
			Vb: function(e, r, t, n, o) {
				mr.uniform4i(xe.uniforms[e], r, t, n, o);
			},
			Ub: function(e, r, t) {
				if (r <= 72) {
					for (var n = nr[4 * r - 1], o = 0; o < 4 * r; o += 4) {
						n[o] = M[t + 4 * o >> 2], n[o + 1] = M[t + (4 * o + 4) >> 2], n[o + 2] = M[t + (4 * o + 8) >> 2], n[o + 3] = M[t + (4 * o + 12) >> 2];
					}
				} else { n = M.subarray(t >> 2, t + 16 * r >> 2); }
				mr.uniform4iv(xe.uniforms[e], n);
			},
			Tb: function(e, r, t, n) {
				if (r <= 72) {
					for (var o = tr[4 * r - 1], a = 0; a < 4 * r; a += 4) {
						o[a] = R[n + 4 * a >> 2], o[a + 1] = R[n + (4 * a + 4) >> 2], o[a + 2] = R[n + (4 * a + 8) >> 2], o[a + 3] = R[n + (4 * a + 12) >> 2];
					}
				} else { o = R.subarray(n >> 2, n + 16 * r >> 2); }
				mr.uniformMatrix2fv(xe.uniforms[e], !!t, o);
			},
			Sb: function(e, r, t, n) {
				if (r <= 32) {
					for (var o = tr[9 * r - 1], a = 0; a < 9 * r; a += 9) {
						o[a] = R[n + 4 * a >> 2],
							o[a + 1] = R[n + (4 * a + 4) >> 2],
							o[a + 2] = R[n + (4 * a + 8) >> 2],
							o[a + 3] = R[n + (4 * a + 12) >> 2],
							o[a + 4] = R[n + (4 * a + 16) >> 2],
							o[a + 5] = R[n + (4 * a + 20) >> 2],
							o[a + 6] = R[n + (4 * a + 24) >> 2],
							o[a + 7] = R[n + (4 * a + 28) >> 2],
							o[a + 8] = R[n + (4 * a + 32) >> 2];
					}
				} else { o = R.subarray(n >> 2, n + 36 * r >> 2); }
				mr.uniformMatrix3fv(xe.uniforms[e], !!t, o);
			},
			Rb: function(e, r, t, n) {
				if (r <= 18) {
					var o = tr[16 * r - 1], a = R;
					n >>= 2;
					for (var i = 0; i < 16 * r; i += 16) {
						var u = n + i;
						o[i] = a[u],
							o[i + 1] = a[u + 1],
							o[i + 2] = a[u + 2],
							o[i + 3] = a[u + 3],
							o[i + 4] = a[u + 4],
							o[i + 5] = a[u + 5],
							o[i + 6] = a[u + 6],
							o[i + 7] = a[u + 7],
							o[i + 8] = a[u + 8],
							o[i + 9] = a[u + 9],
							o[i + 10] = a[u + 10],
							o[i + 11] = a[u + 11],
							o[i + 12] = a[u + 12],
							o[i + 13] = a[u + 13],
							o[i + 14] = a[u + 14],
							o[i + 15] = a[u + 15];
					}
				} else { o = R.subarray(n >> 2, n + 64 * r >> 2); }
				mr.uniformMatrix4fv(xe.uniforms[e], !!t, o);
			},
			Qb: function(e) {
				mr.useProgram(xe.programs[e]);
			},
			Pb: function(e) {
				mr.validateProgram(xe.programs[e]);
			},
			Nb: function(e, r) {
				mr.vertexAttrib1f(e, r);
			},
			Mb: function(e, r) {
				mr.vertexAttrib1f(e, R[r >> 2]);
			},
			Lb: function(e, r, t) {
				mr.vertexAttrib2f(e, r, t);
			},
			Kb: function(e, r) {
				mr.vertexAttrib2f(e, R[r >> 2], R[r + 4 >> 2]);
			},
			Jb: function(e, r, t, n) {
				mr.vertexAttrib3f(e, r, t, n);
			},
			Ib: function(e, r) {
				mr.vertexAttrib3f(e, R[r >> 2], R[r + 4 >> 2], R[r + 8 >> 2]);
			},
			Hb: function(e, r, t, n, o) {
				mr.vertexAttrib4f(e, r, t, n, o);
			},
			Gb: function(e, r) {
				mr.vertexAttrib4f(e, R[r >> 2], R[r + 4 >> 2], R[r + 8 >> 2], R[r + 12 >> 2]);
			},
			te: function(e, r) {
				mr.vertexAttribDivisor(e, r);
			},
			Fb: function(e, r, t, n, o, a) {
				var i = xe.currentContext.clientBuffers[e];
				if (!mr.currentArrayBufferBinding) {
					return i.size = r,
						i.type = t,
						i.normalized = n,
						i.stride = o,
						i.ptr = a,
						i.clientside = !0,
						void (i.vertexAttribPointerAdaptor = function(e, r, t, n, o, a) {
							this.vertexAttribPointer(e, r, t, n, o, a);
						});
				}
				i.clientside = !1, mr.vertexAttribPointer(e, r, t, !!n, o, a);
			},
			Eb: function(e, r, t, n) {
				mr.viewport(e, r, t, n);
			},
			db: function() {
				Ge.removeAllEventListeners();
			},
			L: function(e, r) {
				return function(e, r) {
					throw Rr(e, r || 1), 'longjmp';
				}(e, r);
			},
			hb: function(e, r, t) {
				B.copyWithin(e, r, r + t);
			},
			cb: function(e, r) {
				return (e = Xe(e))
					? e.requestPointerLock || e.msRequestPointerLock ? Ge.canPerformEventHandlerRequests() ? Ve(e) : r ? (Ge.deferCall(Ve, 2, [e]), 1) : -2 : -1
					: -4;
			},
			ib: function(e) {
				var r, t, n = B.length;
				if (e > 2147483648) { return !1; }
				for (var o = 1; o <= 4; o *= 2) {
					var a = n * (1 + .2 / o);
					if (a = Math.min(a, e + 100663296), or(Math.min(2147483648, ((r = Math.max(e, a)) % (t = 65536) > 0 && (r += t - r % t), r)))) { return !0; }
				}
				return !1;
			},
			ea: function() {
				return (Ge.lastGamepadState = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : null) ? 0 : -1;
			},
			ja: function(e, r, t) {
				var n = Ye(e);
				return n ? (n.width = r, n.height = t, 0) : -4;
			},
			ia: function(e, r, t) {
				return (e = Xe(e)) ? (e.style.width = r + 'px', e.style.height = t + 'px', 0) : -4;
			},
			ab: function(e, r, t, n) {
				return navigator.getGamepads || navigator.webkitGetGamepads ? (ar(2, e, r, t, 26, 'gamepadconnected'), 0) : -1;
			},
			$a: function(e, r, t, n) {
				return navigator.getGamepads || navigator.webkitGetGamepads ? (ar(2, e, r, t, 27, 'gamepaddisconnected'), 0) : -1;
			},
			tc: function(e, r, t, n, o) {
				return ir(e, r, t, n, 2, 'keydown'), 0;
			},
			Zb: function(e, r, t, n, o) {
				return ir(e, r, t, n, 1, 'keypress'), 0;
			},
			ic: function(e, r, t, n, o) {
				return ir(e, r, t, n, 3, 'keyup'), 0;
			},
			Ec: function(e, r, t) {
				Ee(X.get(e), r, t);
			},
			Y: he,
			Ob: function(e, r, t, n, o) {
				return sr(e, r, t, n, 5, 'mousedown'), 0;
			},
			wb: function(e, r, t, n, o) {
				return sr(e, r, t, n, 8, 'mousemove'), 0;
			},
			Cb: function(e, r, t, n, o) {
				return sr(e, r, t, n, 6, 'mouseup'), 0;
			},
			mb: function(e, r, t, n, o) {
				return void 0 !== (e = Xe(e)).onwheel
					? (function(e, r, t, n, o, a, i) {
						Ge.wheelEvent || (Ge.wheelEvent = Ar(96));
						var u = {
							target: e,
							allowsDeferredCalls: !0,
							eventTypeString: a,
							callbackfunc: n,
							handlerFunc: function(t) {
								var a = t || event, i = Ge.wheelEvent;
								ur(i, a, e),
									O[i + 64 >> 3] = a.deltaX,
									O[i + 72 >> 3] = a.deltaY,
									O[i + 80 >> 3] = a.deltaZ,
									M[i + 88 >> 2] = a.deltaMode,
									X.get(n)(o, i, r) && a.preventDefault();
							},
							useCapture: t
						};
						Ge.registerOrRemoveHandler(u);
					}(e, r, t, n, 9, 'wheel'),
						0)
					: -1;
			},
			ob: function(e) {
				for (var r = me(); me() - r < e;);
			},
			lb: function(e, r) {
				try {
					var t = 0;
					return fr().forEach(function(n, o) {
						var a = r + t;
						M[e + 4 * o >> 2] = a,
							function(e, r, t) {
								for (var n = 0; n < e.length; ++n) { C[r++ >> 0] = e.charCodeAt(n); }
								t || (C[r >> 0] = 0);
							}(n, a),
							t += n.length + 1;
					}),
						0;
				} catch (e) {
					return void 0 !== Ne && e instanceof Ne.ErrnoError || oe(e), e.errno;
				}
			},
			nb: function(e, r) {
				try {
					var t = fr();
					M[e >> 2] = t.length;
					var n = 0;
					return t.forEach(function(e) {
						n += e.length + 1;
					}),
						M[r >> 2] = n,
						0;
				} catch (e) {
					return void 0 !== Ne && e instanceof Ne.ErrnoError || oe(e), e.errno;
				}
			},
			ma: function(e) {
				zr(e);
			},
			G: function(e) {
				try {
					var r = Ue.getStreamFromFD(e);
					return Ne.close(r), 0;
				} catch (e) {
					return void 0 !== Ne && e instanceof Ne.ErrnoError || oe(e), e.errno;
				}
			},
			kb: function(e, r) {
				try {
					var t = Ue.getStreamFromFD(e), n = t.tty ? 2 : Ne.isDir(t.mode) ? 3 : Ne.isLink(t.mode) ? 7 : 4;
					return C[r >> 0] = n, 0;
				} catch (e) {
					return void 0 !== Ne && e instanceof Ne.ErrnoError || oe(e), e.errno;
				}
			},
			ga: function(e, r, t, n) {
				try {
					var o = Ue.getStreamFromFD(e), a = Ue.doReadv(o, r, t);
					return M[n >> 2] = a, 0;
				} catch (e) {
					return void 0 !== Ne && e instanceof Ne.ErrnoError || oe(e), e.errno;
				}
			},
			eb: function(e, r, t, n, o) {
				try {
					var a = Ue.getStreamFromFD(e), i = 4294967296 * t + (r >>> 0);
					return i <= -9007199254740992 || i >= 9007199254740992
						? -61
						: (Ne.llseek(a, i, n),
							de = [
								a.position >>> 0,
								(le = a.position,
									+Math.abs(le) >= 1
										? le > 0 ? (0 | Math.min(+Math.floor(le / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((le - +(~~le >>> 0)) / 4294967296) >>> 0
										: 0)
							],
							M[o >> 2] = de[0],
							M[o + 4 >> 2] = de[1],
							a.getdents && 0 === i && 0 === n && (a.getdents = null),
							0);
				} catch (e) {
					return void 0 !== Ne && e instanceof Ne.ErrnoError || oe(e), e.errno;
				}
			},
			T: function(e, r, t, n) {
				try {
					var o = Ue.getStreamFromFD(e), a = Ue.doWritev(o, r, t);
					return M[n >> 2] = a, 0;
				} catch (e) {
					return void 0 !== Ne && e instanceof Ne.ErrnoError || oe(e), e.errno;
				}
			},
			b: function() {
				return 0 | k();
			},
			H: function(e) {
				mr.activeTexture(e);
			},
			ua: function(e, r) {
				mr.attachShader(xe.programs[e], xe.shaders[r]);
			},
			oa: function(e, r) {
				34962 == e ? mr.currentArrayBufferBinding = r : 34963 == e && (mr.currentElementArrayBufferBinding = r), mr.bindBuffer(e, xe.buffers[r]);
			},
			q: function(e, r) {
				mr.bindFramebuffer(e, xe.framebuffers[r]);
			},
			aa: function(e, r) {
				mr.bindRenderbuffer(e, xe.renderbuffers[r]);
			},
			d: ke,
			K: function(e) {
				mr.blendEquation(e);
			},
			y: function(e, r) {
				mr.blendFunc(e, r);
			},
			Re: function(e, r, t, n) {
				mr.bufferData(e, t ? B.subarray(t, t + r) : r, n);
			},
			I: function(e) {
				return mr.checkFramebufferStatus(e);
			},
			C: function(e) {
				mr.clear(e);
			},
			S: function(e, r, t, n) {
				mr.clearColor(e, r, t, n);
			},
			Ne: function(e) {
				mr.compileShader(xe.shaders[e]);
			},
			Ve: function() {
				var e = xe.getNewId(xe.programs), r = mr.createProgram();
				return r.name = e, xe.programs[e] = r, e;
			},
			wa: function(e) {
				var r = xe.getNewId(xe.shaders);
				return xe.shaders[r] = mr.createShader(e), r;
			},
			R: function(e, r) {
				for (var t = 0; t < e; t++) {
					var n = M[r + 4 * t >> 2], o = xe.buffers[n];
					o &&
						(mr.deleteBuffer(o),
							o.name = 0,
							xe.buffers[n] = null,
							n == mr.currentArrayBufferBinding && (mr.currentArrayBufferBinding = 0),
							n == mr.currentElementArrayBufferBinding && (mr.currentElementArrayBufferBinding = 0));
				}
			},
			x: function(e, r) {
				for (var t = 0; t < e; ++t) {
					var n = M[r + 4 * t >> 2], o = xe.framebuffers[n];
					o && (mr.deleteFramebuffer(o), o.name = 0, xe.framebuffers[n] = null);
				}
			},
			qa: function(e) {
				if (e) {
					var r = xe.programs[e];
					r ? (mr.deleteProgram(r), r.name = 0, xe.programs[e] = null, xe.programInfos[e] = null) : xe.recordError(1281);
				}
			},
			ba: function(e, r) {
				for (var t = 0; t < e; t++) {
					var n = M[r + 4 * t >> 2], o = xe.renderbuffers[n];
					o && (mr.deleteRenderbuffer(o), o.name = 0, xe.renderbuffers[n] = null);
				}
			},
			sa: function(e) {
				if (e) {
					var r = xe.shaders[e];
					r ? (mr.deleteShader(r), xe.shaders[e] = null) : xe.recordError(1281);
				}
			},
			k: Be,
			l: function(e) {
				mr.disable(e);
			},
			V: function(e) {
				xe.currentContext.clientBuffers[e].enabled = !1, mr.disableVertexAttribArray(e);
			},
			t: function(e, r, t) {
				xe.preDrawHandleClientVertexAttribBindings(r + t), mr.drawArrays(e, r, t), xe.postDrawHandleClientVertexAttribBindings();
			},
			A: function(e) {
				mr.enable(e);
			},
			Qe: function(e) {
				xe.currentContext.clientBuffers[e].enabled = !0, mr.enableVertexAttribArray(e);
			},
			Ea: function() {
				mr.finish();
			},
			Fa: function() {
				mr.flush();
			},
			$: function(e, r, t, n) {
				mr.framebufferRenderbuffer(e, r, t, xe.renderbuffers[n]);
			},
			J: function(e, r, t, n, o) {
				mr.framebufferTexture2D(e, r, t, xe.textures[n], o);
			},
			za: function(e, r) {
				Ae(e, r, 'createBuffer', xe.buffers);
			},
			Q: function(e, r) {
				Ae(e, r, 'createFramebuffer', xe.framebuffers);
			},
			Ma: function(e, r) {
				Ae(e, r, 'createRenderbuffer', xe.renderbuffers);
			},
			u: Le,
			M: function(e) {
				mr.generateMipmap(e);
			},
			pa: function(e, r) {
				return mr.getAttribLocation(xe.programs[e], U(r));
			},
			da: function() {
				var e = mr.getError() || xe.lastError;
				return xe.lastError = 0, e;
			},
			P: Se,
			Te: function(e, r, t, n) {
				var o = mr.getProgramInfoLog(xe.programs[e]);
				null === o && (o = '(unknown error)');
				var a = r > 0 && n ? j(o, n, r) : 0;
				t && (M[t >> 2] = a);
			},
			ta: function(e, r, t) {
				if (t) {
					if (e >= xe.counter) { xe.recordError(1281); }
					else {
						var n = xe.programInfos[e];
						if (n) {
							if (35716 == r) {
								var o = mr.getProgramInfoLog(xe.programs[e]);
								null === o && (o = '(unknown error)'), M[t >> 2] = o.length + 1;
							} else if (35719 == r) { M[t >> 2] = n.maxUniformLength; }
							else if (35722 == r) {
								if (-1 == n.maxAttributeLength) {
									e = xe.programs[e];
									var a = mr.getProgramParameter(e, 35721);
									n.maxAttributeLength = 0;
									for (var i = 0; i < a; ++i) {
										var u = mr.getActiveAttrib(e, i);
										n.maxAttributeLength = Math.max(n.maxAttributeLength, u.name.length + 1);
									}
								}
								M[t >> 2] = n.maxAttributeLength;
							} else if (35381 == r) {
								if (-1 == n.maxUniformBlockNameLength) {
									e = xe.programs[e];
									var s = mr.getProgramParameter(e, 35382);
									for (n.maxUniformBlockNameLength = 0, i = 0; i < s; ++i) {
										var c = mr.getActiveUniformBlockName(e, i);
										n.maxUniformBlockNameLength = Math.max(n.maxUniformBlockNameLength, c.length + 1);
									}
								}
								M[t >> 2] = n.maxUniformBlockNameLength;
							} else { M[t >> 2] = mr.getProgramParameter(xe.programs[e], r); }
						} else { xe.recordError(1282); }
					}
				} else { xe.recordError(1281); }
			},
			Me: function(e, r, t, n) {
				var o = mr.getShaderInfoLog(xe.shaders[e]);
				null === o && (o = '(unknown error)');
				var a = r > 0 && n ? j(o, n, r) : 0;
				t && (M[t >> 2] = a);
			},
			na: function(e, r, t) {
				if (t) {
					if (35716 == r) {
						var n = mr.getShaderInfoLog(xe.shaders[e]);
						null === n && (n = '(unknown error)');
						var o = n ? n.length + 1 : 0;
						M[t >> 2] = o;
					} else if (35720 == r) {
						var a = mr.getShaderSource(xe.shaders[e]), i = a ? a.length + 1 : 0;
						M[t >> 2] = i;
					} else { M[t >> 2] = mr.getShaderParameter(xe.shaders[e], r); }
				} else { xe.recordError(1281); }
			},
			f: function(e) {
				if (xe.stringCache[e]) { return xe.stringCache[e]; }
				var r;
				switch (e) {
					case 7939:
						var t = mr.getSupportedExtensions() || [];
						r = Ze((t = t.concat(t.map(function(e) {
							return 'GL_' + e;
						}))).join(' '));
						break;
					case 7936:
					case 7937:
					case 37445:
					case 37446:
						var n = mr.getParameter(e);
						n || xe.recordError(1280), r = Ze(n);
						break;
					case 7938:
						var o = mr.getParameter(7938);
						r = Ze(o = 'OpenGL ES 2.0 (' + o + ')');
						break;
					case 35724:
						var a = mr.getParameter(35724), i = a.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
						null !== i && (3 == i[1].length && (i[1] = i[1] + '0'), a = 'OpenGL ES GLSL ES ' + i[1] + ' (' + a + ')'), r = Ze(a);
						break;
					default:
						return xe.recordError(1280), 0;
				}
				return xe.stringCache[e] = r, r;
			},
			E: function(e, r) {
				var t = 0;
				if (']' == (r = U(r))[r.length - 1]) {
					var n = r.lastIndexOf('[');
					t = ']' != r[n + 1] ? $e(r.slice(n + 1)) : 0, r = r.slice(0, n);
				}
				var o = xe.programInfos[e] && xe.programInfos[e].uniforms[r];
				return o && t >= 0 && t < o[0] ? o[1] + t : -1;
			},
			ra: function(e) {
				return (e = xe.programs[e]) ? mr.isProgram(e) : 0;
			},
			Ue: function(e) {
				mr.linkProgram(xe.programs[e]), xe.populateUniformTable(e);
			},
			B: function(e, r) {
				3317 == e && (xe.unpackAlignment = r), mr.pixelStorei(e, r);
			},
			ca: function(e, r, t, n, o, a, i) {
				var u = rr(a, o, t, n, i);
				u ? mr.readPixels(e, r, t, n, o, a, u) : xe.recordError(1280);
			},
			La: function(e, r, t, n) {
				mr.renderbufferStorage(e, r, t, n);
			},
			_: function(e, r, t, n) {
				mr.scissor(e, r, t, n);
			},
			Oe: function(e, r, t, n) {
				var o = xe.getSource(e, r, t, n);
				mr.shaderSource(xe.shaders[e], o);
			},
			w: function(e, r, t, n, o, a, i, u, s) {
				mr.texImage2D(e, r, t, n, o, a, i, u, s ? rr(u, i, n, o, s) : null);
			},
			e: Ce,
			N: function(e, r, t, n, o, a, i, u, s) {
				var c = null;
				s && (c = rr(u, i, o, a, s)), mr.texSubImage2D(e, r, t, n, o, a, i, u, c);
			},
			xa: function(e, r) {
				mr.uniform1f(xe.uniforms[e], r);
			},
			Ye: function(e, r, t) {
				if (r <= 288) { for (var n = tr[r - 1], o = 0; o < r; ++o) { n[o] = R[t + 4 * o >> 2]; } }
				else { n = R.subarray(t >> 2, t + 4 * r >> 2); }
				mr.uniform1fv(xe.uniforms[e], n);
			},
			v: function(e, r) {
				mr.uniform1i(xe.uniforms[e], r);
			},
			$e: function(e, r, t) {
				mr.uniform2f(xe.uniforms[e], r, t);
			},
			n: function(e, r, t) {
				if (r <= 144) { for (var n = tr[2 * r - 1], o = 0; o < 2 * r; o += 2) { n[o] = R[t + 4 * o >> 2], n[o + 1] = R[t + (4 * o + 4) >> 2]; } }
				else { n = R.subarray(t >> 2, t + 8 * r >> 2); }
				mr.uniform2fv(xe.uniforms[e], n);
			},
			_e: function(e, r, t, n) {
				mr.uniform3f(xe.uniforms[e], r, t, n);
			},
			Xe: function(e, r, t) {
				if (r <= 96) {
					for (var n = tr[3 * r - 1], o = 0; o < 3 * r; o += 3) { n[o] = R[t + 4 * o >> 2], n[o + 1] = R[t + (4 * o + 4) >> 2], n[o + 2] = R[t + (4 * o + 8) >> 2]; }
				} else { n = R.subarray(t >> 2, t + 12 * r >> 2); }
				mr.uniform3fv(xe.uniforms[e], n);
			},
			Ze: function(e, r, t, n, o) {
				mr.uniform4f(xe.uniforms[e], r, t, n, o);
			},
			We: function(e, r, t) {
				if (r <= 72) {
					var n = tr[4 * r - 1], o = R;
					t >>= 2;
					for (var a = 0; a < 4 * r; a += 4) {
						var i = t + a;
						n[a] = o[i], n[a + 1] = o[i + 1], n[a + 2] = o[i + 2], n[a + 3] = o[i + 3];
					}
				} else { n = R.subarray(t >> 2, t + 16 * r >> 2); }
				mr.uniform4fv(xe.uniforms[e], n);
			},
			Se: function(e, r, t, n) {
				if (r <= 18) {
					var o = tr[16 * r - 1], a = R;
					n >>= 2;
					for (var i = 0; i < 16 * r; i += 16) {
						var u = n + i;
						o[i] = a[u],
							o[i + 1] = a[u + 1],
							o[i + 2] = a[u + 2],
							o[i + 3] = a[u + 3],
							o[i + 4] = a[u + 4],
							o[i + 5] = a[u + 5],
							o[i + 6] = a[u + 6],
							o[i + 7] = a[u + 7],
							o[i + 8] = a[u + 8],
							o[i + 9] = a[u + 9],
							o[i + 10] = a[u + 10],
							o[i + 11] = a[u + 11],
							o[i + 12] = a[u + 12],
							o[i + 13] = a[u + 13],
							o[i + 14] = a[u + 14],
							o[i + 15] = a[u + 15];
					}
				} else { o = R.subarray(n >> 2, n + 64 * r >> 2); }
				mr.uniformMatrix4fv(xe.uniforms[e], !!t, o);
			},
			D: function(e) {
				mr.useProgram(xe.programs[e]);
			},
			Pe: function(e, r, t, n, o, a) {
				var i = xe.currentContext.clientBuffers[e];
				if (!mr.currentArrayBufferBinding) {
					return i.size = r,
						i.type = t,
						i.normalized = n,
						i.stride = o,
						i.ptr = a,
						i.clientside = !0,
						void (i.vertexAttribPointerAdaptor = function(e, r, t, n, o, a) {
							this.vertexAttribPointer(e, r, t, n, o, a);
						});
				}
				i.clientside = !1, mr.vertexAttribPointer(e, r, t, !!n, o, a);
			},
			s: function(e, r, t, n) {
				mr.viewport(e, r, t, n);
			},
			la: function(e) {
				var r = Tr();
				try {
					return X.get(e)();
				} catch (e) {
					if (Mr(r), e !== e + 0 && 'longjmp' !== e) { throw e; }
					Rr(1, 0);
				}
			},
			r: function(e, r) {
				var t = Tr();
				try {
					return X.get(e)(r);
				} catch (e) {
					if (Mr(t), e !== e + 0 && 'longjmp' !== e) { throw e; }
					Rr(1, 0);
				}
			},
			p: function(e, r, t) {
				var n = Tr();
				try {
					return X.get(e)(r, t);
				} catch (e) {
					if (Mr(n), e !== e + 0 && 'longjmp' !== e) { throw e; }
					Rr(1, 0);
				}
			},
			ya: function(e, r, t, n) {
				var o = Tr();
				try {
					return X.get(e)(r, t, n);
				} catch (e) {
					if (Mr(o), e !== e + 0 && 'longjmp' !== e) { throw e; }
					Rr(1, 0);
				}
			},
			va: function(e, r, t, n, o, a) {
				var i = Tr();
				try {
					return X.get(e)(r, t, n, o, a);
				} catch (e) {
					if (Mr(i), e !== e + 0 && 'longjmp' !== e) { throw e; }
					Rr(1, 0);
				}
			},
			gb: function(e) {
				var r = Tr();
				try {
					return Or(e);
				} catch (e) {
					if (Mr(r), e !== e + 0 && 'longjmp' !== e) { throw e; }
					Rr(1, 0);
				}
			},
			m: function(e) {
				var r = Tr();
				try {
					X.get(e)();
				} catch (e) {
					if (Mr(r), e !== e + 0 && 'longjmp' !== e) { throw e; }
					Rr(1, 0);
				}
			},
			g: function(e, r) {
				var t = Tr();
				try {
					X.get(e)(r);
				} catch (e) {
					if (Mr(t), e !== e + 0 && 'longjmp' !== e) { throw e; }
					Rr(1, 0);
				}
			},
			i: function(e, r, t) {
				var n = Tr();
				try {
					X.get(e)(r, t);
				} catch (e) {
					if (Mr(n), e !== e + 0 && 'longjmp' !== e) { throw e; }
					Rr(1, 0);
				}
			},
			Yd: function(e, r, t, n) {
				var o = Tr();
				try {
					X.get(e)(r, t, n);
				} catch (e) {
					if (Mr(o), e !== e + 0 && 'longjmp' !== e) { throw e; }
					Rr(1, 0);
				}
			},
			Nd: function(e) {
				Fe();
				var r = new Date(M[e + 20 >> 2] + 1900, M[e + 16 >> 2], M[e + 12 >> 2], M[e + 8 >> 2], M[e + 4 >> 2], M[e >> 2], 0),
					t = M[e + 32 >> 2],
					n = r.getTimezoneOffset(),
					o = new Date(r.getFullYear(), 0, 1),
					a = new Date(r.getFullYear(), 6, 1).getTimezoneOffset(),
					i = o.getTimezoneOffset(),
					u = Math.min(i, a);
				if (t < 0) { M[e + 32 >> 2] = Number(a != i && u == n); }
				else if (t > 0 != (u == n)) {
					var s = Math.max(i, a), c = t > 0 ? u : s;
					r.setTime(r.getTime() + 6e4 * (c - n));
				}
				M[e + 24 >> 2] = r.getDay();
				var f = (r.getTime() - o.getTime()) / 864e5 | 0;
				return M[e + 28 >> 2] = f,
					M[e >> 2] = r.getSeconds(),
					M[e + 4 >> 2] = r.getMinutes(),
					M[e + 8 >> 2] = r.getHours(),
					M[e + 12 >> 2] = r.getDate(),
					M[e + 16 >> 2] = r.getMonth(),
					r.getTime() / 1e3 | 0;
			},
			a: function(e) {
				x(0 | e);
			},
			z: hr,
			jb: function(e, r, t, n) {
				return hr(e, r, t, n);
			},
			sd: function(e) {
				switch (e) {
					case 30:
						return 16384;
					case 85:
						return 131072;
					case 132:
					case 133:
					case 12:
					case 137:
					case 138:
					case 15:
					case 235:
					case 16:
					case 17:
					case 18:
					case 19:
					case 20:
					case 149:
					case 13:
					case 10:
					case 236:
					case 153:
					case 9:
					case 21:
					case 22:
					case 159:
					case 154:
					case 14:
					case 77:
					case 78:
					case 139:
					case 82:
					case 68:
					case 67:
					case 164:
					case 11:
					case 29:
					case 47:
					case 48:
					case 95:
					case 52:
					case 51:
					case 46:
						return 200809;
					case 27:
					case 246:
					case 127:
					case 128:
					case 23:
					case 24:
					case 160:
					case 161:
					case 181:
					case 182:
					case 242:
					case 183:
					case 184:
					case 243:
					case 244:
					case 245:
					case 165:
					case 178:
					case 179:
					case 49:
					case 50:
					case 168:
					case 169:
					case 175:
					case 170:
					case 171:
					case 172:
					case 97:
					case 76:
					case 32:
					case 173:
					case 35:
					case 80:
					case 81:
					case 79:
						return -1;
					case 176:
					case 177:
					case 7:
					case 155:
					case 8:
					case 157:
					case 125:
					case 126:
					case 92:
					case 93:
					case 129:
					case 130:
					case 131:
					case 94:
					case 91:
						return 1;
					case 74:
					case 60:
					case 69:
					case 70:
					case 4:
						return 1024;
					case 31:
					case 42:
					case 72:
						return 32;
					case 87:
					case 26:
					case 33:
						return 2147483647;
					case 34:
					case 1:
						return 47839;
					case 38:
					case 36:
						return 99;
					case 43:
					case 37:
						return 2048;
					case 0:
						return 2097152;
					case 3:
						return 65536;
					case 28:
						return 32768;
					case 44:
						return 32767;
					case 75:
						return 16384;
					case 39:
						return 1e3;
					case 89:
						return 700;
					case 71:
						return 256;
					case 40:
						return 255;
					case 2:
						return 100;
					case 180:
						return 64;
					case 25:
						return 20;
					case 5:
						return 16;
					case 6:
						return 6;
					case 73:
						return 4;
					case 84:
						return 'object' == typeof navigator && navigator.hardwareConcurrency || 1;
				}
				return Te(28), -1;
			},
			j: function(e) {
				var r = Date.now() / 1e3 | 0;
				return e && (M[e >> 2] = r), r;
			}
		},
		Dr = (function() {
			var e = { a: _r };
			function r(e, r) {
				var n = e.exports;
				t.asm = n, q((_ = t.asm.ef).buffer), X = t.asm.jf, ne();
			}
			function n(e) {
				r(e.instance);
			}
			function o(r) {
				return function() {
					if (!b && (s || c)) {
						if ('function' == typeof fetch && !ce(pe)) {
							return fetch(pe, { credentials: 'same-origin' }).then(function(e) {
								if (!e.ok) { throw "failed to load wasm binary file at '" + pe + "'"; }
								return e.arrayBuffer();
							}).catch(function() {
								return ve(pe);
							});
						}
						if (d) {
							return new Promise(function(e, r) {
								d(pe, function(r) {
									e(new Uint8Array(r));
								}, r);
							});
						}
					}
					return Promise.resolve().then(function() {
						return ve(pe);
					});
				}().then(function(r) {
					return WebAssembly.instantiate(r, e);
				}).then(r, function(e) {
					E('failed to asynchronously prepare wasm: ' + e), oe(e);
				});
			}
			if (te(), t.instantiateWasm) {
				try {
					return t.instantiateWasm(e, r);
				} catch (e) {
					return E('Module.instantiateWasm callback failed with error: ' + e), !1;
				}
			}
			b || 'function' != typeof WebAssembly.instantiateStreaming || ue(pe) || ce(pe) || 'function' != typeof fetch
				? o(n)
				: fetch(pe, { credentials: 'same-origin' }).then(function(r) {
					return WebAssembly.instantiateStreaming(r, e).then(n, function(e) {
						return E('wasm streaming compile failed: ' + e), E('falling back to ArrayBuffer instantiation'), o(n);
					});
				});
		}(),
			t.___wasm_call_ctors = function() {
				return (Dr = t.___wasm_call_ctors = t.asm.ff).apply(null, arguments);
			}),
		Sr = t._free = function() {
			return (Sr = t._free = t.asm.gf).apply(null, arguments);
		},
		Ar = t._malloc = function() {
			return (Ar = t._malloc = t.asm.hf).apply(null, arguments);
		},
		Lr = (t._fflush = function() {
			return (t._fflush = t.asm.kf).apply(null, arguments);
		},
			t.___errno_location = function() {
				return (Lr = t.___errno_location = t.asm.lf).apply(null, arguments);
			}),
		Cr = (t._cmd_savefiles = function() {
			return (t._cmd_savefiles = t.asm.mf).apply(null, arguments);
		},
			t._cmd_save_state = function() {
				return (t._cmd_save_state = t.asm.nf).apply(null, arguments);
			},
			t._cmd_load_state = function() {
				return (t._cmd_load_state = t.asm.of).apply(null, arguments);
			},
			t._cmd_take_screenshot = function() {
				return (t._cmd_take_screenshot = t.asm.pf).apply(null, arguments);
			},
			t._cmd_toggle_menu = function() {
				return (t._cmd_toggle_menu = t.asm.qf).apply(null, arguments);
			},
			t._cmd_undo_save_state = function() {
				return (t._cmd_undo_save_state = t.asm.rf).apply(null, arguments);
			},
			t._cmd_undo_load_state = function() {
				return (t._cmd_undo_load_state = t.asm.sf).apply(null, arguments);
			},
			t._main = function() {
				return (t._main = t.asm.tf).apply(null, arguments);
			},
			t.__get_tzname = function() {
				return (Cr = t.__get_tzname = t.asm.uf).apply(null, arguments);
			}),
		Br = t.__get_daylight = function() {
			return (Br = t.__get_daylight = t.asm.vf).apply(null, arguments);
		},
		Fr = t.__get_timezone = function() {
			return (Fr = t.__get_timezone = t.asm.wf).apply(null, arguments);
		},
		Tr = t.stackSave = function() {
			return (Tr = t.stackSave = t.asm.xf).apply(null, arguments);
		},
		Mr = t.stackRestore = function() {
			return (Mr = t.stackRestore = t.asm.yf).apply(null, arguments);
		},
		Pr = t.stackAlloc = function() {
			return (Pr = t.stackAlloc = t.asm.zf).apply(null, arguments);
		},
		Rr = t._setThrew = function() {
			return (Rr = t._setThrew = t.asm.Af).apply(null, arguments);
		},
		Or = t.dynCall_j = function() {
			return (Or = t.dynCall_j = t.asm.Bf).apply(null, arguments);
		};
	function Ir(e) {
		this.name = 'ExitStatus', this.message = 'Program terminated with exit(' + e + ')', this.status = e;
	}
	t.callMain = Nr, t.FS = Ne;
	function Nr(e) {
		var r = t._main, n = (e = e || []).length + 1, o = Pr(4 * (n + 1));
		M[o >> 2] = V(i);
		for (var a = 1; a < n; a++) { M[(o >> 2) + a] = V(e[a - 1]); }
		M[(o >> 2) + n] = 0;
		try {
			zr(r(n, o), !0);
		} catch (e) {
			if (e instanceof Ir) { return; }
			if ('unwind' == e) { return void (D = !0); }
			var s = e;
			e && 'object' == typeof e && e.stack && (s = [e, e.stack]), E('exception thrown: ' + s), u(1, e);
		} finally {
			!0;
		}
	}
	function Ur(e) {
		function r() {
			kr ||
				(kr = !0,
					t.calledRun = !0,
					S ||
					(!0,
						t.noFSInit || Ne.init.initialized || Ne.init(),
						Re.init(),
						ge(W),
						Ne.ignorePermissions = !1,
						ge(Q),
						t.onRuntimeInitialized && t.onRuntimeInitialized(),
						jr && Nr(e),
						function() {
							if (t.postRun) {for ('function' == typeof t.postRun && (t.postRun = [t.postRun]); t.postRun.length;) {e = t.postRun.shift(), Z.unshift(e);}}
							var e;
							ge(Z);
						}()));
		}
		e = e || a,
			$ > 0 || (!function() {
				if (t.preRun) { for ('function' == typeof t.preRun && (t.preRun = [t.preRun]); t.preRun.length;) { e = t.preRun.shift(), Y.unshift(e); } }
				var e;
				ge(Y);
			}(),
				$ > 0 || (t.setStatus
					? (t.setStatus('Running...'),
						setTimeout(function() {
							setTimeout(function() {
								t.setStatus('');
							}, 1), r();
						}, 1))
					: r()));
	}
	function zr(e, r) {
		r && D && 0 === e || (D || (e, ge(K), Ne.quit(), Re.shutdown(), !0, t.onExit && t.onExit(e), S = !0), u(e, new Ir(e)));
	}
	if (
		ee = function e() {
			kr || Ur(), kr || (ee = e);
		},
			t.run = Ur,
			t.preInit
	) { for ('function' == typeof t.preInit && (t.preInit = [t.preInit]); t.preInit.length > 0;) { t.preInit.pop()(); } }
	var jr = !0;
	return t.noInitialRun && (jr = !1), Ur(), t;
}
