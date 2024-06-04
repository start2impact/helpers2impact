import i from "js-cookie";
import f from "jwt-decode";
import g from "axios";
const C = {
  getDateYearsAgo(e) {
    const t = /* @__PURE__ */ new Date();
    return new Date(t.getFullYear() - e, t.getMonth(), t.getDate());
  },
  calculateDaysFromToday(e) {
    const t = new Date(e).getTime(), n = (/* @__PURE__ */ new Date()).getTime(), r = Math.abs(n - t);
    return Math.round(r / (1e3 * 3600 * 24));
  },
  calculateDaysToToday(e) {
    const t = new Date(e).getTime(), n = (/* @__PURE__ */ new Date()).getTime(), r = t - n;
    return Math.round(r / (1e3 * 3600 * 24));
  },
  calculateHoursToNow(e) {
    const t = new Date(e).getTime(), n = (/* @__PURE__ */ new Date()).getTime(), r = t - n;
    return Math.round(r / (1e3 * 3600));
  },
  isAfter(e, t) {
    const n = new Date(e).getTime(), r = new Date(t).getTime(), o = n - r;
    return Math.round(o / (1e3 * 3600 * 24)) < 0;
  },
  isSameDay(e, t) {
    return new Date(e).getDate() === new Date(t).getDate() && new Date(e).getMonth() === new Date(t).getMonth() && new Date(e).getFullYear() === new Date(t).getFullYear();
  }
  // A fn for calculate days difference from today -> negative number is previous, positive for next
  // daysDifferenceFromToday(isoDate) {
  // 	const givenDate = new Date(isoDate);
  // 	const currentDate = new Date();
  // 	// Calculate different in milliseconds
  // 	const diffInMs = givenDate - currentDate;
  // 	// round to the nearest whole number
  // 	const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
  // 	return diffInDays;
  // },
}, w = (e) => {
  try {
    const t = i.get(e);
    return t ? f(t) : !1;
  } catch {
    return i.remove(e), !1;
  }
}, d = (e, t = "#007369", n = "#08F7A1") => {
  const { ctx: r } = e.chart, o = r.createLinearGradient(0, 0, 0, 100);
  return o.addColorStop(0, t), o.addColorStop(1, n), o;
}, c = {
  activeBackgroundColor: (e) => d(e),
  // '#08F7A1';
  inactiveBackgroundColor: "#EDF1F4",
  // Light gray,
  blockedBackgroundColor: "#FF5A5F",
  // Red,
  waitingBackgroundColor: "#FFCB00",
  // Yellow,
  resendBackgroundColor: "#F2994A"
  // Orange,
}, F = {
  createGradient(e, t = "#007369", n = "#08F7A1") {
    const { ctx: r } = e.chart, o = r.createLinearGradient(0, 0, 0, 100);
    return o.addColorStop(0, t), o.addColorStop(1, n), o;
  },
  progressColors: {
    activeBackgroundColor: (e) => d(e),
    // '#08F7A1';
    inactiveBackgroundColor: "#EDF1F4",
    // Light gray,
    blockedBackgroundColor: "#FF5A5F",
    // Red,
    waitingBackgroundColor: "#FFCB00",
    // Yellow,
    resendBackgroundColor: "#F2994A"
    // Orange,
  },
  getProjectStatusColor(e, t = 0, n = null, r = !1, o = null, a = 0, l = 0) {
    const s = [];
    return [...Array(l)].map((h, u) => t >= u + 1 ? s.push(c.activeBackgroundColor(e)) : u > 0 && t < u ? s.push(c.inactiveBackgroundColor) : n !== null ? s.push(c.waitingBackgroundColor) : r === !0 ? s.push(c.resendBackgroundColor) : o !== null || a > 0 ? s.push(c.blockedBackgroundColor) : s.push(c.inactiveBackgroundColor)), s;
  }
}, k = (e, t, n, r) => {
  const { user: o } = w(e) || {};
  o && (o.role === "admin" ? window.location.href = t : o.role === "coach" ? window.location.href = r : window.location.href = n);
}, B = {
  arrToChunks(e = [], t = 10) {
    return Array.from({ length: Math.ceil(e.length / t) }, (n, r) => e.slice(r * t, r * t + t));
  }
}, T = (e, t, n = !0) => {
  const r = i.get(e), o = g.create({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    crossDomain: !0
  });
  return o.interceptors.request.use(
    (a) => (a.headers.Authorization = r ? `Bearer ${r}` : null, a),
    (a) => {
      if ((a.response ? a.response.status : null) === 401 && n) {
        const s = window.location.host.includes("localhost") ? "localhost" : ".start2impact.it";
        i.remove(e, { domain: s }), window.location.href = t;
      }
      return Promise.reject(a);
    }
  ), o.interceptors.response.use(
    (a) => a,
    (a) => {
      if ((a.response ? a.response.status : null) === 401 && n) {
        const s = window.location.host.includes("localhost") ? "localhost" : ".start2impact.it";
        i.remove(e, { domain: s }), window.location.href = t;
      }
      return Promise.reject(a);
    }
  ), o;
};
export {
  B as array,
  w as checkCookie,
  F as colors,
  C as date,
  T as http,
  k as redirectByRole
};
