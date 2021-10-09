﻿/* Clusterize.js - v0.18.1 - 2018-01-02
 http://NeXTs.github.com/Clusterize.js/
 Copyright (c) 2015 Denis Lukov; Licensed GPLv3 */

; (function (q, n) { "undefined" != typeof module ? module.exports = n() : "function" == typeof define && "object" == typeof define.amd ? define(n) : this[q] = n() })("Clusterize", function () {
    function q(b, a, c) { return a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent("on" + b, c) } function n(b, a, c) { return a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent("on" + b, c) } function r(b) { return "[object Array]" === Object.prototype.toString.call(b) } function m(b, a) {
        return window.getComputedStyle ? window.getComputedStyle(a)[b] :
            a.currentStyle[b]
    } var l = function () { for (var b = 3, a = document.createElement("b"), c = a.all || []; a.innerHTML = "\x3c!--[if gt IE " + ++b + "]><i><![endif]--\x3e", c[0];); return 4 < b ? b : document.documentMode }(), x = navigator.platform.toLowerCase().indexOf("mac") + 1, p = function (b) {
        if (!(this instanceof p)) return new p(b); var a = this, c = { rows_in_block: 50, blocks_in_cluster: 4, tag: null, show_no_data_row: !0, no_data_class: "clusterize-no-data", no_data_text: "No data", keep_parity: !0, callbacks: {} }; a.options = {}; for (var d = "rows_in_block blocks_in_cluster show_no_data_row no_data_class no_data_text keep_parity tag callbacks".split(" "),
            f = 0, h; h = d[f]; f++)a.options[h] = "undefined" != typeof b[h] && null != b[h] ? b[h] : c[h]; c = ["scroll", "content"]; for (f = 0; d = c[f]; f++)if (a[d + "_elem"] = b[d + "Id"] ? document.getElementById(b[d + "Id"]) : b[d + "Elem"], !a[d + "_elem"]) throw Error("Error! Could not find " + d + " element"); a.content_elem.hasAttribute("tabindex") || a.content_elem.setAttribute("tabindex", 0); var e = r(b.rows) ? b.rows : a.fetchMarkup(), g = {}; b = a.scroll_elem.scrollTop; a.insertToDOM(e, g); a.scroll_elem.scrollTop = b; var k = !1, m = 0, l = !1, t = function () {
                x && (l || (a.content_elem.style.pointerEvents =
                    "none"), l = !0, clearTimeout(m), m = setTimeout(function () { a.content_elem.style.pointerEvents = "auto"; l = !1 }, 50)); k != (k = a.getClusterNum()) && a.insertToDOM(e, g); a.options.callbacks.scrollingProgress && a.options.callbacks.scrollingProgress(a.getScrollProgress())
            }, u = 0, v = function () { clearTimeout(u); u = setTimeout(a.refresh, 100) }; q("scroll", a.scroll_elem, t); q("resize", window, v); a.destroy = function (b) { n("scroll", a.scroll_elem, t); n("resize", window, v); a.html((b ? a.generateEmptyRow() : e).join("")) }; a.refresh = function (b) {
                (a.getRowsHeight(e) ||
                    b) && a.update(e)
            }; a.update = function (b) { e = r(b) ? b : []; b = a.scroll_elem.scrollTop; e.length * a.options.item_height < b && (k = a.scroll_elem.scrollTop = 0); a.insertToDOM(e, g); a.scroll_elem.scrollTop = b }; a.clear = function () { a.update([]) }; a.getRowsAmount = function () { return e.length }; a.getScrollProgress = function () { return this.options.scroll_top / (e.length * this.options.item_height) * 100 || 0 }; var w = function (b, c) { var d = r(c) ? c : []; d.length && (e = "append" == b ? e.concat(d) : d.concat(e), a.insertToDOM(e, g)) }; a.append = function (a) {
                w("append",
                    a)
            }; a.prepend = function (a) { w("prepend", a) }
    }; p.prototype = {
        constructor: p, fetchMarkup: function () { for (var b = [], a = this.getChildNodes(this.content_elem); a.length;)b.push(a.shift().outerHTML); return b }, exploreEnvironment: function (b, a) {
            var c = this.options; c.content_tag = this.content_elem.tagName.toLowerCase(); b.length && (l && 9 >= l && !c.tag && (c.tag = b[0].match(/<([^>\s/]*)/)[1].toLowerCase()), 1 >= this.content_elem.children.length && (a.data = this.html(b[0] + b[0] + b[0])), c.tag || (c.tag = this.content_elem.children[0].tagName.toLowerCase()),
                this.getRowsHeight(b))
        }, getRowsHeight: function (b) {
            var a = this.options, c = a.item_height; a.cluster_height = 0; if (b.length && (b = this.content_elem.children, b.length)) {
                var d = b[Math.floor(b.length / 2)]; a.item_height = d.offsetHeight; "tr" == a.tag && "collapse" != m("borderCollapse", this.content_elem) && (a.item_height += parseInt(m("borderSpacing", this.content_elem), 10) || 0); "tr" != a.tag && (b = parseInt(m("marginTop", d), 10) || 0, d = parseInt(m("marginBottom", d), 10) || 0, a.item_height += Math.max(b, d)); a.block_height = a.item_height * a.rows_in_block;
                a.rows_in_cluster = a.blocks_in_cluster * a.rows_in_block; a.cluster_height = a.blocks_in_cluster * a.block_height; return c != a.item_height
            }
        }, getClusterNum: function () { this.options.scroll_top = this.scroll_elem.scrollTop; return Math.floor(this.options.scroll_top / (this.options.cluster_height - this.options.block_height)) || 0 }, generateEmptyRow: function () {
            var b = this.options; if (!b.tag || !b.show_no_data_row) return []; var a = document.createElement(b.tag), c = document.createTextNode(b.no_data_text); a.className = b.no_data_class;
            if ("tr" == b.tag) { var d = document.createElement("td"); d.colSpan = 100; d.appendChild(c) } a.appendChild(d || c); return [a.outerHTML]
        }, generate: function (b, a) {
            var c = this.options, d = b.length; if (d < c.rows_in_block) return { top_offset: 0, bottom_offset: 0, rows_above: 0, rows: d ? b : this.generateEmptyRow() }; var f = Math.max((c.rows_in_cluster - c.rows_in_block) * a, 0), h = f + c.rows_in_cluster, e = Math.max(f * c.item_height, 0); c = Math.max((d - h) * c.item_height, 0); d = []; var g = f; for (1 > e && g++; f < h; f++)b[f] && d.push(b[f]); return {
                top_offset: e, bottom_offset: c,
                rows_above: g, rows: d
            }
        }, renderExtraTag: function (b, a) { var c = document.createElement(this.options.tag); c.className = ["clusterize-extra-row", "clusterize-" + b].join(" "); a && (c.style.height = a + "px"); return c.outerHTML }, insertToDOM: function (b, a) {
            this.options.cluster_height || this.exploreEnvironment(b, a); var c = this.generate(b, this.getClusterNum()), d = c.rows.join(""), f = this.checkChanges("data", d, a), h = this.checkChanges("top", c.top_offset, a), e = this.checkChanges("bottom", c.bottom_offset, a), g = this.options.callbacks,
                k = []; f || h ? (c.top_offset && (this.options.keep_parity && k.push(this.renderExtraTag("keep-parity")), k.push(this.renderExtraTag("top-space", c.top_offset))), k.push(d), c.bottom_offset && k.push(this.renderExtraTag("bottom-space", c.bottom_offset)), g.clusterWillChange && g.clusterWillChange(), this.html(k.join("")), "ol" == this.options.content_tag && this.content_elem.setAttribute("start", c.rows_above), this.content_elem.style["counter-increment"] = "clusterize-counter " + (c.rows_above - 1), g.clusterChanged && g.clusterChanged()) :
                    e && (this.content_elem.lastChild.style.height = c.bottom_offset + "px")
        }, html: function (b) { var a = this.content_elem; if (l && 9 >= l && "tr" == this.options.tag) { var c = document.createElement("div"); for (c.innerHTML = "<table><tbody>" + b + "</tbody></table>"; b = a.lastChild;)a.removeChild(b); for (c = this.getChildNodes(c.firstChild.firstChild); c.length;)a.appendChild(c.shift()) } else a.innerHTML = b }, getChildNodes: function (b) { b = b.children; for (var a = [], c = 0, d = b.length; c < d; c++)a.push(b[c]); return a }, checkChanges: function (b, a, c) {
            var d =
                a != c[b]; c[b] = a; return d
        }
    }; return p
});