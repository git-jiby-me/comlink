'use strict';(function(h,g){"object"===typeof exports&&"undefined"!==typeof module?g(exports):"function"===typeof define&&define.amd?define(["exports"],g):g(h.Comlink={})})(this,function(h){function g(a,b){return b.reduce(function(a,b){return a[b]},a)}function q(a,b,c){a=g(a,b.slice(0,-1));b=b[b.length-1];var d=a[b];a[b]=c;return d}function k(a,b){var c=b||{};b=c.path;b=void 0===b?[]:b;var d=c.visited;d=void 0===d?new WeakSet:d;c=c.properties;c=void 0===c?[]:c;if(!a||d.has(a)||"string"===typeof a||
ArrayBuffer.isView(a))return[];"object"===typeof a&&d.add(a);c.push({value:a,path:b});for(var e=0,f=Object.keys(a);e<f.length;e++){var g=f[e];k(a[g],{path:b.concat([g]),visited:d,properties:c})}return c}function D(a){return E.some(function(b){return a instanceof b})}function r(a){var b=[],c=0;for(a=k(a);c<a.length;c++){var d=a[c].value;D(d)&&b.push(d)}return b}function l(a){for(var b=0,c=Array.from(m);b<c.length;b++){var d=c[b],e=d[0];d=d[1];if(d.canHandle(a))return{type:e,value:d.serialize(a)}}}
function t(a){if(m.has(a.type))return m.get(a.type).deserialize(a.value)}function u(a){var b=l(a);if(b)return b;b=[];for(var c=0,d=k(a);c<d.length;c++){var e=d[c],f=l(e.value);f&&(q(a,e.path,null),b.push({path:e.path,wrappedValue:f}))}return{type:"RAW",value:a,wrappedChildren:b}}function n(a){var b=t(a);if(b)return b;if("RAW"!==a.type)throw Error('Unknown value type "'+a.type+'"');b=0;for(var c=a.wrappedChildren||[];b<c.length;b++){var d=c[b],e=t(d.wrappedValue);if(!e)throw Error('Unknown value type "'+
a.type+'" at '+d.path.join("."));q(a.value,d.path,e)}return a.value}function F(a){return["window","length","location","parent","opener"].every(function(b){return b in a})}function G(a){if("Window"!==self.constructor.name)throw Error("self is not a window");return{addEventListener:self.addEventListener.bind(self),removeEventListener:self.removeEventListener.bind(self),postMessage:function(b,c){return a.postMessage(b,"*",c)}}}function v(a){F(a)&&(a=G(a));if(!("addEventListener"in a&&"removeEventListener"in
a&&"postMessage"in a))throw Error("endpoint does not have all of addEventListener, removeEventListener and postMessage defined");return a}function w(a){"MessagePort"===a.constructor.name&&a.start()}function x(a,b){a.addEventListener("message",b)}function H(a,b){return new Promise(function(c){x(a,function I(b){b.data.id===d&&(a.removeEventListener("message",I),c(b.data))});var d=J+"-"+K++;b=Object.assign({},b,{id:d});var e="argumentsList"in b?r(b.argumentsList):[];a.postMessage(b,e)})}function L(a,
b){var c=g(a,b.callPath.slice(0,-1));a=g(a,b.callPath);return Promise.all([c,a]).then(function(a){var c=a[0];a=a[1];switch(b.type){case "CONSTRUCT":return c=b.argumentsList.map(n),c=new (a.bind.apply(a,[void 0].concat(c))),y(c);case "APPLY":var d=b.argumentsList.map(n);return a.apply(c,d);case "GET":return a;case "SET":return a[b.property]=b.value,!0}}).catch(function(a){a[z]=!0;return a}).then(function(a){var c=b.id,d=l(a);a=d?{id:c,value:d}:{id:c,value:{type:"RAW",value:a}};return a})}function p(a,
b,c){void 0===a&&(a=function(){});void 0===c&&(c=[]);return new Proxy(a,{construct:function(a,e){a={type:"CONSTRUCT",callPath:c,argumentsList:e.map(u)};return b(a)},apply:function(a,e,f){if("bind"===c[c.length-1])return p(function(){},b,c.slice(0,-1));a={type:"APPLY",callPath:c,argumentsList:f.map(u)};return b(a)},get:function(d,e,f){if("then"===e&&0===c.length)return{then:function(){return f}};if("then"!==e)return p(a[e],b,c.concat([e]));d=b({type:"GET",callPath:c});return Promise.resolve(d).then.bind(d)},
set:function(a,e,f){return b({type:"SET",callPath:c,property:e,value:f})}})}function A(a,b){var c=v(a);w(c);return p(b,function(a){return H(c,a).then(function(a){return n(a.value)})})}function y(a){a[B]=!0;return a}function C(a,b){var c=v(b);w(c);x(c,function(b){"id"in b.data&&"callPath"in b.data&&L(a,b.data).then(function(a){c.postMessage(a,r([a]))})})}var B=Symbol("proxyValue"),z=Symbol("throw"),E=["ArrayBuffer","MessagePort","OffscreenCanvas"].filter(function(a){return a in self}).map(function(a){return self[a]}),
m=new Map([["PROXY",{canHandle:function(a){return a&&a[B]},serialize:function(a){var b=new MessageChannel,c=b.port2;C(a,b.port1);return c},deserialize:function(a){return A(a)}}],["THROW",{canHandle:function(a){return a&&a[z]},serialize:function(a){return Object.assign({},a,{message:a&&a.message,stack:a&&a.stack})},deserialize:function(a){throw Object.assign(Error(),a);}}]]),J=Math.floor(Math.random()*Number.MAX_SAFE_INTEGER),K=0;h.proxy=A;h.proxyValue=y;h.expose=C;Object.defineProperty(h,"__esModule",
{value:!0})});
