!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], e)
    : e(
        ((t =
          "undefined" != typeof globalThis ? globalThis : t || self).easytimer =
          {})
      );
})(this, function (t) {
  "use strict";
  function e(t, e) {
    var n = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(t);
      e &&
        (r = r.filter(function (e) {
          return Object.getOwnPropertyDescriptor(t, e).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function n(t) {
    for (var n = 1; n < arguments.length; n++) {
      var r = null != arguments[n] ? arguments[n] : {};
      n % 2
        ? e(Object(r), !0).forEach(function (e) {
            o(t, e, r[e]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
        : e(Object(r)).forEach(function (e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
          });
    }
    return t;
  }
  function r(t) {
    return (r =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          })(t);
  }
  function o(t, e, n) {
    return (
      e in t
        ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (t[e] = n),
      t
    );
  }
  function s(t, e, n) {
    var r,
      o = "";
    if ((t = "number" == typeof t ? String(t) : t).length > e) return t;
    for (r = 0; r < e; r += 1) o += String(n);
    return (o + t).slice(-o.length);
  }
  function i() {
    this.reset();
  }
  function u() {
    this.events = {};
  }
  (i.prototype.toString = function () {
    var t =
        arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : ["hours", "minutes", "seconds"],
      e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ":",
      n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 2;
    (t = t || ["hours", "minutes", "seconds"]), (e = e || ":"), (n = n || 2);
    var r,
      o = [];
    for (r = 0; r < t.length; r += 1)
      void 0 !== this[t[r]] &&
        ("secondTenths" === t[r]
          ? o.push(this[t[r]])
          : o.push(s(this[t[r]], n, "0")));
    return o.join(e);
  }),
    (i.prototype.reset = function () {
      (this.secondTenths = 0),
        (this.seconds = 0),
        (this.minutes = 0),
        (this.hours = 0),
        (this.days = 0);
    }),
    (u.prototype.on = function (t, e) {
      var n = this;
      return (
        Array.isArray(this.events[t]) || (this.events[t] = []),
        this.events[t].push(e),
        function () {
          return n.removeListener(t, e);
        }
      );
    }),
    (u.prototype.removeListener = function (t, e) {
      if (Array.isArray(this.events[t])) {
        var n = this.events[t].indexOf(e);
        n > -1 && this.events[t].splice(n, 1);
      }
    }),
    (u.prototype.removeAllListeners = function (t) {
      t
        ? Array.isArray(this.events[t]) && (this.events[t] = [])
        : (this.events = {});
    }),
    (u.prototype.emit = function (t) {
      for (
        var e = this,
          n = arguments.length,
          r = new Array(n > 1 ? n - 1 : 0),
          o = 1;
        o < n;
        o++
      )
        r[o - 1] = arguments[o];
      Array.isArray(this.events[t]) &&
        this.events[t].forEach(function (t) {
          return t.apply(e, r);
        });
    });
  var c = 10,
    a = 60,
    f = 60,
    h = 24,
    d = "secondTenths",
    l = "seconds",
    p = "minutes",
    v = "hours",
    y = "days",
    m = [d, l, p, v, y],
    b = {
      secondTenths: 100,
      seconds: 1e3,
      minutes: 6e4,
      hours: 36e5,
      days: 864e5,
    },
    g = { secondTenths: c, seconds: a, minutes: f, hours: h };
  function w(t, e) {
    return ((t % e) + e) % e;
  }
  function O() {
    var t,
      e,
      o,
      s,
      O,
      T,
      j,
      A,
      E,
      P,
      S = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      D = new i(),
      L = new i(),
      x = new u(),
      V = !1,
      M = !1,
      U = {},
      k = { detail: { timer: this } };
    function I(t, e) {
      var n = g[t];
      (L[t] = e),
        (D[t] = t === y ? Math.abs(e) : w(e >= 0 ? e : n - w(e, n), n));
    }
    function _(t) {
      return B(t, y);
    }
    function z(t) {
      return B(t, v);
    }
    function C(t) {
      return B(t, p);
    }
    function R(t) {
      return B(t, l);
    }
    function q(t) {
      return B(t, d);
    }
    function B(t, e) {
      var n = L[e];
      return I(e, rt(t, b[e])), L[e] !== n;
    }
    function F() {
      G(), Z();
    }
    function G() {
      clearInterval(t), (t = void 0), (V = !1), (M = !1);
    }
    function H(t) {
      yt() ? ((E = K()), (T = ot(O.target))) : $(t), J();
    }
    function J() {
      var n = b[e];
      Y(W(Date.now())) || ((t = setInterval(N, n)), (V = !0), (M = !1));
    }
    function K() {
      return W(Date.now()) - L.secondTenths * b.secondTenths * o;
    }
    function N() {
      var t = W(Date.now());
      X(Q()), s(k.detail.timer), Y(t) && (ut(), pt("targetAchieved", k));
    }
    function Q() {
      var t =
          arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : W(Date.now()),
        e = o > 0 ? t - E : E - t,
        n = {};
      return (
        (n.secondTenths = q(e)),
        (n.seconds = R(e)),
        (n.minutes = C(e)),
        (n.hours = z(e)),
        (n.days = _(e)),
        n
      );
    }
    function W(t) {
      return Math.floor(t / b[e]) * b[e];
    }
    function X(t) {
      t.secondTenths && pt("secondTenthsUpdated", k),
        t.seconds && pt("secondsUpdated", k),
        t.minutes && pt("minutesUpdated", k),
        t.hours && pt("hoursUpdated", k),
        t.days && pt("daysUpdated", k);
    }
    function Y(t) {
      return T instanceof Array && t >= P;
    }
    function Z() {
      D.reset(), L.reset();
    }
    function $(t) {
      (e = tt((t = t || {}).precision)),
        (s = "function" == typeof t.callback ? t.callback : function () {}),
        (A = !0 === t.countdown),
        (o = !0 === A ? -1 : 1),
        "object" === r(t.startValues) ? st(t.startValues) : (j = null),
        (E = K()),
        Q(),
        "object" === r(t.target)
          ? (T = ot(t.target))
          : A
          ? ((t.target = { seconds: 0 }), (T = ot(t.target)))
          : (T = null),
        (U = {
          precision: e,
          callback: s,
          countdown: "object" === r(t) && !0 === t.countdown,
          target: T,
          startValues: j,
        }),
        (O = t);
    }
    function tt(t) {
      if (!et((t = "string" == typeof t ? t : l)))
        throw new Error(
          "Error in precision parameter: ".concat(t, " is not a valid value")
        );
      return t;
    }
    function et(t) {
      return m.indexOf(t) >= 0;
    }
    function nt(t) {
      var e;
      if ("object" === r(t))
        if (t instanceof Array) {
          if (5 !== t.length) throw new Error("Array size not valid");
          e = t;
        } else {
          for (var n in t)
            if (m.indexOf(n) < 0)
              throw new Error(
                "Error in startValues or target parameter: ".concat(
                  n,
                  " is not a valid input value"
                )
              );
          e = [
            t.secondTenths || 0,
            t.seconds || 0,
            t.minutes || 0,
            t.hours || 0,
            t.days || 0,
          ];
        }
      var o = (e = e.map(function (t) {
          return parseInt(t, 10);
        }))[0],
        s = e[1] + rt(o, c),
        i = e[2] + rt(s, a),
        u = e[3] + rt(i, f),
        d = e[4] + rt(u, h);
      return (
        (e[0] = o % c),
        (e[1] = s % a),
        (e[2] = i % f),
        (e[3] = u % h),
        (e[4] = d),
        e
      );
    }
    function rt(t, e) {
      var n = t / e;
      return n < 0 ? Math.ceil(n) : Math.floor(n);
    }
    function ot(t) {
      if (t) {
        var e = it((T = nt(t)));
        return (P = E + e.secondTenths * b.secondTenths * o), T;
      }
    }
    function st(t) {
      (j = nt(t)),
        (D.secondTenths = j[0]),
        (D.seconds = j[1]),
        (D.minutes = j[2]),
        (D.hours = j[3]),
        (D.days = j[4]),
        (L = it(j, L));
    }
    function it(t, e) {
      var n = e || {};
      return (
        (n.days = t[4]),
        (n.hours = n.days * h + t[3]),
        (n.minutes = n.hours * f + t[2]),
        (n.seconds = n.minutes * a + t[1]),
        (n.secondTenths = n.seconds * c + t[[0]]),
        n
      );
    }
    function ut() {
      F(), pt("stopped", k);
    }
    function ct() {
      F(), H(O), pt("reset", k);
    }
    function at() {
      var t =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      (t = n(n({}, S), t)), vt() || (H(t), pt("started", k));
    }
    function ft() {
      G(), (M = !0), pt("paused", k);
    }
    function ht(t, e) {
      x.on(t, e);
    }
    function dt(t, e) {
      x.removeListener(t, e);
    }
    function lt(t) {
      x.removeAllListeners(t);
    }
    function pt(t, e) {
      x.emit(t, e);
    }
    function vt() {
      return V;
    }
    function yt() {
      return M;
    }
    function mt() {
      return D;
    }
    function bt() {
      return L;
    }
    function gt() {
      return U;
    }
    $(S),
      void 0 !== this &&
        ((this.start = at),
        (this.pause = ft),
        (this.stop = ut),
        (this.reset = ct),
        (this.isRunning = vt),
        (this.isPaused = yt),
        (this.getTimeValues = mt),
        (this.getTotalTimeValues = bt),
        (this.getConfig = gt),
        (this.addEventListener = ht),
        (this.on = ht),
        (this.removeEventListener = dt),
        (this.removeAllEventListeners = lt),
        (this.off = dt));
  }
  (t.Timer = O),
    (t.default = O),
    Object.defineProperty(t, "__esModule", { value: !0 });
});
