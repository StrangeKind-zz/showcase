! function(t, i, e) {
    "use strict";

    function s(t, i) {
        this.element = t, this.layers = t.getElementsByClassName("layer");
        var e = {
            calibrateX: this.data(this.element, "calibrate-x"),
            calibrateY: this.data(this.element, "calibrate-y"),
            invertX: this.data(this.element, "invert-x"),
            invertY: this.data(this.element, "invert-y"),
            limitX: this.data(this.element, "limit-x"),
            limitY: this.data(this.element, "limit-y"),
            scalarX: this.data(this.element, "scalar-x"),
            scalarY: this.data(this.element, "scalar-y"),
            frictionX: this.data(this.element, "friction-x"),
            frictionY: this.data(this.element, "friction-y"),
            originX: this.data(this.element, "origin-x"),
            originY: this.data(this.element, "origin-y")
        };
        for (var s in e) null === e[s] && delete e[s];
        this.extend(this, n, i, e), this.calibrationTimer = null, this.calibrationFlag = !0, this.enabled = !1, this.depths = [], this.raf = null, this.bounds = null, this.ex = 0, this.ey = 0, this.ew = 0, this.eh = 0, this.ecx = 0, this.ecy = 0, this.erx = 0, this.ery = 0, this.cx = 0, this.cy = 0, this.ix = 0, this.iy = 0, this.mx = 0, this.my = 0, this.vx = 0, this.vy = 0, this.onMouseMove = this.onMouseMove.bind(this), this.onDeviceOrientation = this.onDeviceOrientation.bind(this), this.onOrientationTimer = this.onOrientationTimer.bind(this), this.onCalibrationTimer = this.onCalibrationTimer.bind(this), this.onAnimationFrame = this.onAnimationFrame.bind(this), this.onWindowResize = this.onWindowResize.bind(this), this.initialise()
    }
    var n = {
        relativeInput: !1,
        clipRelativeInput: !1,
        calibrationThreshold: 100,
        calibrationDelay: 500,
        supportDelay: 500,
        calibrateX: !1,
        calibrateY: !0,
        invertX: !0,
        invertY: !0,
        limitX: !1,
        limitY: !1,
        scalarX: 10,
        scalarY: 10,
        frictionX: .1,
        frictionY: .1,
        originX: .5,
        originY: .5
    };
    s.prototype.extend = function() {
        if (arguments.length > 1)
            for (var t = arguments[0], i = 1, e = arguments.length; i < e; i++) {
                var s = arguments[i];
                for (var n in s) t[n] = s[n]
            }
    }, s.prototype.data = function(t, i) {
        return this.deserialize(t.getAttribute("data-" + i))
    }, s.prototype.deserialize = function(t) {
        return "true" === t || "false" !== t && ("null" === t ? null : !isNaN(parseFloat(t)) && isFinite(t) ? parseFloat(t) : t)
    }, s.prototype.camelCase = function(t) {
        return t.replace(/-+(.)?/g, function(t, i) {
            return i ? i.toUpperCase() : ""
        })
    }, s.prototype.transformSupport = function(e) {
        for (var s = i.createElement("div"), n = !1, o = null, a = !1, r = null, h = null, l = 0, c = this.vendors.length; l < c; l++)
            if (null !== this.vendors[l] ? (r = this.vendors[l][0] + "transform", h = this.vendors[l][1] + "Transform") : (r = "transform", h = "transform"), void 0 !== s.style[h]) {
                n = !0;
                break
            }
        switch (e) {
            case "2D":
                a = n;
                break;
            case "3D":
                if (n) {
                    var p = i.body || i.createElement("body"),
                        m = i.documentElement,
                        d = m.style.overflow;
                    i.body || (m.style.overflow = "hidden", m.appendChild(p), p.style.overflow = "hidden", p.style.background = ""), p.appendChild(s), s.style[h] = "translate3d(1px,1px,1px)", a = void 0 !== (o = t.getComputedStyle(s).getPropertyValue(r)) && o.length > 0 && "none" !== o, m.style.overflow = d, p.removeChild(s)
                }
        }
        return a
    }, s.prototype.ww = null, s.prototype.wh = null, s.prototype.wcx = null, s.prototype.wcy = null, s.prototype.wrx = null, s.prototype.wry = null, s.prototype.portrait = null, s.prototype.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i), s.prototype.vendors = [null, ["-webkit-", "webkit"],
        ["-moz-", "Moz"],
        ["-o-", "O"],
        ["-ms-", "ms"]
    ], s.prototype.motionSupport = !!t.DeviceMotionEvent, s.prototype.orientationSupport = !!t.DeviceOrientationEvent, s.prototype.orientationStatus = 0, s.prototype.transform2DSupport = s.prototype.transformSupport("2D"), s.prototype.transform3DSupport = s.prototype.transformSupport("3D"), s.prototype.propertyCache = {}, s.prototype.initialise = function() {
        this.transform3DSupport && this.accelerate(this.element), "static" === t.getComputedStyle(this.element).getPropertyValue("position") && (this.element.style.position = "relative"), this.updateLayers(), this.updateDimensions(), this.enable(), this.queueCalibration(this.calibrationDelay)
    }, s.prototype.updateLayers = function() {
        this.layers = this.element.getElementsByClassName("layer"), this.depths = [];
        for (var t = 0, i = this.layers.length; t < i; t++) {
            var e = this.layers[t];
            this.transform3DSupport && this.accelerate(e), e.style.position = t ? "absolute" : "relative", e.style.display = "block", e.style.left = 0, e.style.top = 0, this.depths.push(this.data(e, "depth") || 0)
        }
    }, s.prototype.updateDimensions = function() {
        this.ww = t.innerWidth, this.wh = t.innerHeight, this.wcx = this.ww * this.originX, this.wcy = this.wh * this.originY, this.wrx = Math.max(this.wcx, this.ww - this.wcx), this.wry = Math.max(this.wcy, this.wh - this.wcy)
    }, s.prototype.updateBounds = function() {
        this.bounds = this.element.getBoundingClientRect(), this.ex = this.bounds.left, this.ey = this.bounds.top, this.ew = this.bounds.width, this.eh = this.bounds.height, this.ecx = this.ew * this.originX, this.ecy = this.eh * this.originY, this.erx = Math.max(this.ecx, this.ew - this.ecx), this.ery = Math.max(this.ecy, this.eh - this.ecy)
    }, s.prototype.queueCalibration = function(t) {
        clearTimeout(this.calibrationTimer), this.calibrationTimer = setTimeout(this.onCalibrationTimer, t)
    }, s.prototype.enable = function() {
        this.enabled || (this.enabled = !0, this.orientationSupport ? (this.portrait = null, t.addEventListener("deviceorientation", this.onDeviceOrientation), setTimeout(this.onOrientationTimer, this.supportDelay)) : (this.cx = 0, this.cy = 0, this.portrait = !1, t.addEventListener("mousemove", this.onMouseMove)), t.addEventListener("resize", this.onWindowResize), this.raf = requestAnimationFrame(this.onAnimationFrame))
    }, s.prototype.disable = function() {
        this.enabled && (this.enabled = !1, this.orientationSupport ? t.removeEventListener("deviceorientation", this.onDeviceOrientation) : t.removeEventListener("mousemove", this.onMouseMove), t.removeEventListener("resize", this.onWindowResize), cancelAnimationFrame(this.raf))
    }, s.prototype.calibrate = function(t, i) {
        this.calibrateX = void 0 === t ? this.calibrateX : t, this.calibrateY = void 0 === i ? this.calibrateY : i
    }, s.prototype.invert = function(t, i) {
        this.invertX = void 0 === t ? this.invertX : t, this.invertY = void 0 === i ? this.invertY : i
    }, s.prototype.friction = function(t, i) {
        this.frictionX = void 0 === t ? this.frictionX : t, this.frictionY = void 0 === i ? this.frictionY : i
    }, s.prototype.scalar = function(t, i) {
        this.scalarX = void 0 === t ? this.scalarX : t, this.scalarY = void 0 === i ? this.scalarY : i
    }, s.prototype.limit = function(t, i) {
        this.limitX = void 0 === t ? this.limitX : t, this.limitY = void 0 === i ? this.limitY : i
    }, s.prototype.origin = function(t, i) {
        this.originX = void 0 === t ? this.originX : t, this.originY = void 0 === i ? this.originY : i
    }, s.prototype.clamp = function(t, i, e) {
        return t = Math.max(t, i), t = Math.min(t, e)
    }, s.prototype.css = function(t, i, e) {
        var s = this.propertyCache[i];
        if (!s)
            for (var n = 0, o = this.vendors.length; n < o; n++)
                if (s = null !== this.vendors[n] ? this.camelCase(this.vendors[n][1] + "-" + i) : i, void 0 !== t.style[s]) {
                    this.propertyCache[i] = s;
                    break
                }
        t.style[s] = e
    }, s.prototype.accelerate = function(t) {
        this.css(t, "transform", "translate3d(0,0,0)"), this.css(t, "transform-style", "preserve-3d"), this.css(t, "backface-visibility", "hidden")
    }, s.prototype.setPosition = function(t, i, e) {
        i += "px", e += "px", this.transform3DSupport ? this.css(t, "transform", "translate3d(" + i + "," + e + ",0)") : this.transform2DSupport ? this.css(t, "transform", "translate(" + i + "," + e + ")") : (t.style.left = i, t.style.top = e)
    }, s.prototype.onOrientationTimer = function(t) {
        this.orientationSupport && 0 === this.orientationStatus && (this.disable(), this.orientationSupport = !1, this.enable())
    }, s.prototype.onCalibrationTimer = function(t) {
        this.calibrationFlag = !0
    }, s.prototype.onWindowResize = function(t) {
        this.updateDimensions()
    }, s.prototype.onAnimationFrame = function() {
        this.updateBounds();
        var t = this.ix - this.cx,
            i = this.iy - this.cy;
        (Math.abs(t) > this.calibrationThreshold || Math.abs(i) > this.calibrationThreshold) && this.queueCalibration(0), this.portrait ? (this.mx = this.calibrateX ? i : this.iy, this.my = this.calibrateY ? t : this.ix) : (this.mx = this.calibrateX ? t : this.ix, this.my = this.calibrateY ? i : this.iy), this.mx *= this.ew * (this.scalarX / 100), this.my *= this.eh * (this.scalarY / 100), isNaN(parseFloat(this.limitX)) || (this.mx = this.clamp(this.mx, -this.limitX, this.limitX)), isNaN(parseFloat(this.limitY)) || (this.my = this.clamp(this.my, -this.limitY, this.limitY)), this.vx += (this.mx - this.vx) * this.frictionX, this.vy += (this.my - this.vy) * this.frictionY;
        for (var e = 0, s = this.layers.length; e < s; e++) {
            var n = this.layers[e],
                o = this.depths[e],
                a = this.vx * o * (this.invertX ? -1 : 1),
                r = this.vy * o * (this.invertY ? -1 : 1);
            this.setPosition(n, a, r)
        }
        this.raf = requestAnimationFrame(this.onAnimationFrame)
    }, s.prototype.onDeviceOrientation = function(t) {
        if (!this.desktop && null !== t.beta && null !== t.gamma) {
            this.orientationStatus = 1;
            var i = (t.beta || 0) / 30,
                e = (t.gamma || 0) / 30,
                s = this.wh > this.ww;
            this.portrait !== s && (this.portrait = s, this.calibrationFlag = !0), this.calibrationFlag && (this.calibrationFlag = !1, this.cx = i, this.cy = e), this.ix = i, this.iy = e
        }
    }, s.prototype.onMouseMove = function(t) {
        var i = t.clientX,
            e = t.clientY;
        !this.orientationSupport && this.relativeInput ? (this.clipRelativeInput && (i = Math.max(i, this.ex), i = Math.min(i, this.ex + this.ew), e = Math.max(e, this.ey), e = Math.min(e, this.ey + this.eh)), this.ix = (i - this.ex - this.ecx) / this.erx, this.iy = (e - this.ey - this.ecy) / this.ery) : (this.ix = (i - this.wcx) / this.wrx, this.iy = (e - this.wcy) / this.wry)
    }, t.Parallax = s
}(window, document),
function() {
    for (var t = 0, i = ["ms", "moz", "webkit", "o"], e = 0; e < i.length && !window.requestAnimationFrame; ++e) window.requestAnimationFrame = window[i[e] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[i[e] + "CancelAnimationFrame"] || window[i[e] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(i, e) {
        var s = (new Date).getTime(),
            n = Math.max(0, 16 - (s - t)),
            o = window.setTimeout(function() {
                i(s + n)
            }, n);
        return t = s + n, o
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
        clearTimeout(t)
    })
}();
var scene = document.getElementById("js-scene"),
    parallax = new Parallax(scene);
