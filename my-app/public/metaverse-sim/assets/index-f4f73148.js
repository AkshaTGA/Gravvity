(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ns="151",mu=0,ho=1,gu=2,gc=1,_c=2,Pr=3,En=0,jt=1,Qt=2,ei=0,Qi=1,fo=2,po=3,mo=4,_u=5,Zi=100,vu=101,xu=102,go=103,_o=104,Mu=200,yu=201,Su=202,wu=203,vc=204,xc=205,bu=206,Tu=207,Eu=208,Au=209,Cu=210,Lu=0,Ru=1,Pu=2,Ra=3,Iu=4,Du=5,Uu=6,Nu=7,Ka=0,Fu=1,Ou=2,zn=0,Bu=1,zu=2,ku=3,Mc=4,Hu=5,yc=300,rr=301,sr=302,Pa=303,Ia=304,Fs=306,ct=1e3,qt=1001,Ps=1002,Rt=1003,Da=1004,Cs=1005,bt=1006,Sc=1007,ti=1008,vi=1009,Gu=1010,Vu=1011,wc=1012,Wu=1013,pi=1014,xn=1015,Fn=1016,Xu=1017,qu=1018,er=1020,ju=1021,en=1023,Ku=1024,Yu=1025,mi=1026,ar=1027,bc=1028,Zu=1029,$u=1030,Ju=1031,Qu=1033,Gs=33776,Vs=33777,Ws=33778,Xs=33779,vo=35840,xo=35841,Mo=35842,yo=35843,eh=36196,So=37492,wo=37496,bo=37808,To=37809,Eo=37810,Ao=37811,Co=37812,Lo=37813,Ro=37814,Po=37815,Io=37816,Do=37817,Uo=37818,No=37819,Fo=37820,Oo=37821,qs=36492,th=36283,Bo=36284,zo=36285,ko=36286,kr=2300,or=2301,js=2302,Ho=2400,Go=2401,Vo=2402,nh=2500,ih=0,Tc=1,Ua=2,xi=3e3,et=3001,rh=3200,sh=3201,Ya=0,ah=1,Pt="srgb",Hr="srgb-linear",Ec="display-p3",Ks=7680,oh=519,Na=35044,Wo="300 es",Fa=1035;let hr=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}};const Ft=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Xo=1234567;const Nr=Math.PI/180,lr=180/Math.PI;function Mn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ft[s&255]+Ft[s>>8&255]+Ft[s>>16&255]+Ft[s>>24&255]+"-"+Ft[e&255]+Ft[e>>8&255]+"-"+Ft[e>>16&15|64]+Ft[e>>24&255]+"-"+Ft[t&63|128]+Ft[t>>8&255]+"-"+Ft[t>>16&255]+Ft[t>>24&255]+Ft[n&255]+Ft[n>>8&255]+Ft[n>>16&255]+Ft[n>>24&255]).toLowerCase()}function Dt(s,e,t){return Math.max(e,Math.min(t,s))}function Za(s,e){return(s%e+e)%e}function lh(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function ch(s,e,t){return s!==e?(t-s)/(e-s):0}function Fr(s,e,t){return(1-t)*s+t*e}function uh(s,e,t,n){return Fr(s,e,1-Math.exp(-t*n))}function hh(s,e=1){return e-Math.abs(Za(s,e*2)-e)}function dh(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function fh(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function ph(s,e){return s+Math.floor(Math.random()*(e-s+1))}function mh(s,e){return s+Math.random()*(e-s)}function gh(s){return s*(.5-Math.random())}function _h(s){s!==void 0&&(Xo=s);let e=Xo+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function vh(s){return s*Nr}function xh(s){return s*lr}function Oa(s){return(s&s-1)===0&&s!==0}function Ac(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Cc(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Mh(s,e,t,n,i){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),u=a((e+n)/2),h=r((e-n)/2),d=a((e-n)/2),p=r((n-e)/2),_=a((n-e)/2);switch(i){case"XYX":s.set(o*u,c*h,c*d,o*l);break;case"YZY":s.set(c*d,o*u,c*h,o*l);break;case"ZXZ":s.set(c*h,c*d,o*u,o*l);break;case"XZX":s.set(o*u,c*_,c*p,o*l);break;case"YXY":s.set(c*p,o*u,c*_,o*l);break;case"ZYZ":s.set(c*_,c*p,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function On(s,e){switch(e.constructor){case Float32Array:return s;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function ot(s,e){switch(e.constructor){case Float32Array:return s;case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Ba={DEG2RAD:Nr,RAD2DEG:lr,generateUUID:Mn,clamp:Dt,euclideanModulo:Za,mapLinear:lh,inverseLerp:ch,lerp:Fr,damp:uh,pingpong:hh,smoothstep:dh,smootherstep:fh,randInt:ph,randFloat:mh,randFloatSpread:gh,seededRandom:_h,degToRad:vh,radToDeg:xh,isPowerOfTwo:Oa,ceilPowerOfTwo:Ac,floorPowerOfTwo:Cc,setQuaternionFromProperEuler:Mh,normalize:ot,denormalize:On};class Be{constructor(e=0,t=0){Be.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qe{constructor(){qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(e,t,n,i,r,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],d=n[2],p=n[5],_=n[8],v=i[0],g=i[3],f=i[6],T=i[1],S=i[4],M=i[7],E=i[2],C=i[5],P=i[8];return r[0]=a*v+o*T+c*E,r[3]=a*g+o*S+c*C,r[6]=a*f+o*M+c*P,r[1]=l*v+u*T+h*E,r[4]=l*g+u*S+h*C,r[7]=l*f+u*M+h*P,r[2]=d*v+p*T+_*E,r[5]=d*g+p*S+_*C,r[8]=d*f+p*M+_*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*r*u+n*o*c+i*r*l-i*a*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=u*a-o*l,d=o*c-u*r,p=l*r-a*c,_=t*h+n*d+i*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/_;return e[0]=h*v,e[1]=(i*l-u*n)*v,e[2]=(o*n-i*a)*v,e[3]=d*v,e[4]=(u*t-i*c)*v,e[5]=(i*r-o*t)*v,e[6]=p*v,e[7]=(n*c-l*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ys.makeScale(e,t)),this}rotate(e){return this.premultiply(Ys.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ys.makeTranslation(e,t)),this}makeTranslation(e,t){return this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ys=new qe;function Lc(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Gr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function tr(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Zs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const yh=new qe().fromArray([.8224621,.0331941,.0170827,.177538,.9668058,.0723974,-1e-7,1e-7,.9105199]),Sh=new qe().fromArray([1.2249401,-.0420569,-.0196376,-.2249404,1.0420571,-.0786361,1e-7,0,1.0982735]);function wh(s){return s.convertSRGBToLinear().applyMatrix3(Sh)}function bh(s){return s.applyMatrix3(yh).convertLinearToSRGB()}const Th={[Hr]:s=>s,[Pt]:s=>s.convertSRGBToLinear(),[Ec]:wh},Eh={[Hr]:s=>s,[Pt]:s=>s.convertLinearToSRGB(),[Ec]:bh},Yt={enabled:!1,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(s){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!s},get workingColorSpace(){return Hr},set workingColorSpace(s){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const n=Th[e],i=Eh[t];if(n===void 0||i===void 0)throw new Error(`Unsupported color space conversion, "${e}" to "${t}".`);return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this.workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this.workingColorSpace)}};let Ei;class Rc{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ei===void 0&&(Ei=Gr("canvas")),Ei.width=e.width,Ei.height=e.height;const n=Ei.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ei}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Gr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=tr(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(tr(t[n]/255)*255):t[n]=tr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}class Pc{constructor(e=null){this.isSource=!0,this.uuid=Mn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push($s(i[a].image)):r.push($s(i[a]))}else r=$s(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function $s(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Rc.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ah=0;class It extends hr{constructor(e=It.DEFAULT_IMAGE,t=It.DEFAULT_MAPPING,n=qt,i=qt,r=bt,a=ti,o=en,c=vi,l=It.DEFAULT_ANISOTROPY,u=xi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ah++}),this.uuid=Mn(),this.name="",this.source=new Pc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Be(0,0),this.repeat=new Be(1,1),this.center=new Be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==yc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ct:e.x=e.x-Math.floor(e.x);break;case qt:e.x=e.x<0?0:1;break;case Ps:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ct:e.y=e.y-Math.floor(e.y);break;case qt:e.y=e.y<0?0:1;break;case Ps:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}}It.DEFAULT_IMAGE=null;It.DEFAULT_MAPPING=yc;It.DEFAULT_ANISOTROPY=1;class lt{constructor(e=0,t=0,n=0,i=1){lt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const c=e.elements,l=c[0],u=c[4],h=c[8],d=c[1],p=c[5],_=c[9],v=c[2],g=c[6],f=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-v)<.01&&Math.abs(_-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+v)<.1&&Math.abs(_+g)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(l+1)/2,M=(p+1)/2,E=(f+1)/2,C=(u+d)/4,P=(h+v)/4,I=(_+g)/4;return S>M&&S>E?S<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(S),i=C/n,r=P/n):M>E?M<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(M),n=C/i,r=I/i):E<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(E),n=P/r,i=I/r),this.set(n,i,r,t),this}let T=Math.sqrt((g-_)*(g-_)+(h-v)*(h-v)+(d-u)*(d-u));return Math.abs(T)<.001&&(T=1),this.x=(g-_)/T,this.y=(h-v)/T,this.z=(d-u)/T,this.w=Math.acos((l+p+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Mi extends hr{constructor(e=1,t=1,n={}){super(),this.isWebGLRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new lt(0,0,e,t),this.scissorTest=!1,this.viewport=new lt(0,0,e,t);const i={width:e,height:t,depth:1};this.texture=new It(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.internalFormat=n.internalFormat!==void 0?n.internalFormat:null,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:bt,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null,this.samples=n.samples!==void 0?n.samples:0}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Pc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ic extends It{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=qt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ch extends It{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=qt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Hn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let c=n[i+0],l=n[i+1],u=n[i+2],h=n[i+3];const d=r[a+0],p=r[a+1],_=r[a+2],v=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=p,e[t+2]=_,e[t+3]=v;return}if(h!==v||c!==d||l!==p||u!==_){let g=1-o;const f=c*d+l*p+u*_+h*v,T=f>=0?1:-1,S=1-f*f;if(S>Number.EPSILON){const E=Math.sqrt(S),C=Math.atan2(E,f*T);g=Math.sin(g*C)/E,o=Math.sin(o*C)/E}const M=o*T;if(c=c*g+d*M,l=l*g+p*M,u=u*g+_*M,h=h*g+v*M,g===1-o){const E=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=E,l*=E,u*=E,h*=E}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,r,a){const o=n[i],c=n[i+1],l=n[i+2],u=n[i+3],h=r[a],d=r[a+1],p=r[a+2],_=r[a+3];return e[t]=o*_+u*h+c*p-l*d,e[t+1]=c*_+u*d+l*h-o*p,e[t+2]=l*_+u*p+o*d-c*h,e[t+3]=u*_-o*h-c*d-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(i/2),h=o(r/2),d=c(n/2),p=c(i/2),_=c(r/2);switch(a){case"XYZ":this._x=d*u*h+l*p*_,this._y=l*p*h-d*u*_,this._z=l*u*_+d*p*h,this._w=l*u*h-d*p*_;break;case"YXZ":this._x=d*u*h+l*p*_,this._y=l*p*h-d*u*_,this._z=l*u*_-d*p*h,this._w=l*u*h+d*p*_;break;case"ZXY":this._x=d*u*h-l*p*_,this._y=l*p*h+d*u*_,this._z=l*u*_+d*p*h,this._w=l*u*h-d*p*_;break;case"ZYX":this._x=d*u*h-l*p*_,this._y=l*p*h+d*u*_,this._z=l*u*_-d*p*h,this._w=l*u*h+d*p*_;break;case"YZX":this._x=d*u*h+l*p*_,this._y=l*p*h+d*u*_,this._z=l*u*_-d*p*h,this._w=l*u*h-d*p*_;break;case"XZY":this._x=d*u*h-l*p*_,this._y=l*p*h-d*u*_,this._z=l*u*_+d*p*h,this._w=l*u*h+d*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-c)*p,this._y=(r-l)*p,this._z=(a-i)*p}else if(n>o&&n>h){const p=2*Math.sqrt(1+n-o-h);this._w=(u-c)/p,this._x=.25*p,this._y=(i+a)/p,this._z=(r+l)/p}else if(o>h){const p=2*Math.sqrt(1+o-n-h);this._w=(r-l)/p,this._x=(i+a)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+h-n-o);this._w=(a-i)/p,this._x=(r+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Dt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+i*l-r*c,this._y=i*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-i*o,this._w=a*u-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*i+t*this._y,this._z=p*r+t*this._z,this.normalize(),this._onChangeCallback(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),h=Math.sin((1-t)*u)/l,d=Math.sin(t*u)/l;return this._w=a*h+this._w*d,this._x=n*h+this._x*d,this._y=i*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(r),n*Math.cos(r),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(e=0,t=0,n=0){D.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(qo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(qo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=c*t+a*i-o*n,u=c*n+o*t-r*i,h=c*i+r*n-a*t,d=-r*t-a*n-o*i;return this.x=l*c+d*-r+u*-o-h*-a,this.y=u*c+d*-a+h*-r-l*-o,this.z=h*c+d*-o+l*-a-u*-r,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Js.copy(this).projectOnVector(e),this.sub(Js)}reflect(e){return this.sub(Js.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Js=new D,qo=new Hn;class yn{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ln.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ln.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Ln.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){if(e.updateWorldMatrix(!1,!1),e.boundingBox!==void 0)e.boundingBox===null&&e.computeBoundingBox(),Ai.copy(e.boundingBox),Ai.applyMatrix4(e.matrixWorld),this.union(Ai);else{const i=e.geometry;if(i!==void 0)if(t&&i.attributes!==void 0&&i.attributes.position!==void 0){const r=i.attributes.position;for(let a=0,o=r.count;a<o;a++)Ln.fromBufferAttribute(r,a).applyMatrix4(e.matrixWorld),this.expandByPoint(Ln)}else i.boundingBox===null&&i.computeBoundingBox(),Ai.copy(i.boundingBox),Ai.applyMatrix4(e.matrixWorld),this.union(Ai)}const n=e.children;for(let i=0,r=n.length;i<r;i++)this.expandByObject(n[i],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Ln),Ln.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(gr),Zr.subVectors(this.max,gr),Ci.subVectors(e.a,gr),Li.subVectors(e.b,gr),Ri.subVectors(e.c,gr),Xn.subVectors(Li,Ci),qn.subVectors(Ri,Li),si.subVectors(Ci,Ri);let t=[0,-Xn.z,Xn.y,0,-qn.z,qn.y,0,-si.z,si.y,Xn.z,0,-Xn.x,qn.z,0,-qn.x,si.z,0,-si.x,-Xn.y,Xn.x,0,-qn.y,qn.x,0,-si.y,si.x,0];return!Qs(t,Ci,Li,Ri,Zr)||(t=[1,0,0,0,1,0,0,0,1],!Qs(t,Ci,Li,Ri,Zr))?!1:($r.crossVectors(Xn,qn),t=[$r.x,$r.y,$r.z],Qs(t,Ci,Li,Ri,Zr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ln).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ln).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Cn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Cn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Cn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Cn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Cn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Cn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Cn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Cn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Cn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Cn=[new D,new D,new D,new D,new D,new D,new D,new D],Ln=new D,Ai=new yn,Ci=new D,Li=new D,Ri=new D,Xn=new D,qn=new D,si=new D,gr=new D,Zr=new D,$r=new D,ai=new D;function Qs(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){ai.fromArray(s,r);const o=i.x*Math.abs(ai.x)+i.y*Math.abs(ai.y)+i.z*Math.abs(ai.z),c=e.dot(ai),l=t.dot(ai),u=n.dot(ai);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Lh=new yn,_r=new D,ea=new D;class Gn{constructor(e=new D,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Lh.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_r.subVectors(e,this.center);const t=_r.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(_r,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ea.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_r.copy(e.center).add(ea)),this.expandByPoint(_r.copy(e.center).sub(ea))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Rn=new D,ta=new D,Jr=new D,jn=new D,na=new D,Qr=new D,ia=new D;class Os{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Rn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Rn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Rn.copy(this.origin).addScaledVector(this.direction,t),Rn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){ta.copy(e).add(t).multiplyScalar(.5),Jr.copy(t).sub(e).normalize(),jn.copy(this.origin).sub(ta);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Jr),o=jn.dot(this.direction),c=-jn.dot(Jr),l=jn.lengthSq(),u=Math.abs(1-a*a);let h,d,p,_;if(u>0)if(h=a*c-o,d=a*o-c,_=r*u,h>=0)if(d>=-_)if(d<=_){const v=1/u;h*=v,d*=v,p=h*(h+a*d+2*o)+d*(a*h+d+2*c)+l}else d=r,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*c)+l;else d=-r,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*c)+l;else d<=-_?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-c),r),p=-h*h+d*(d+2*c)+l):d<=_?(h=0,d=Math.min(Math.max(-r,-c),r),p=d*(d+2*c)+l):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-c),r),p=-h*h+d*(d+2*c)+l);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(ta).addScaledVector(Jr,d),p}intersectSphere(e,t){Rn.subVectors(e.center,this.origin);const n=Rn.dot(this.direction),i=Rn.dot(Rn)-n*n,r=e.radius*e.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),u>=0?(r=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),h>=0?(o=(e.min.z-d.z)*h,c=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,c=(e.min.z-d.z)*h),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Rn)!==null}intersectTriangle(e,t,n,i,r){na.subVectors(t,e),Qr.subVectors(n,e),ia.crossVectors(na,Qr);let a=this.direction.dot(ia),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;jn.subVectors(this.origin,e);const c=o*this.direction.dot(Qr.crossVectors(jn,Qr));if(c<0)return null;const l=o*this.direction.dot(na.cross(jn));if(l<0||c+l>a)return null;const u=-o*jn.dot(ia);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Xe{constructor(){Xe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(e,t,n,i,r,a,o,c,l,u,h,d,p,_,v,g){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=i,f[1]=r,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=u,f[10]=h,f[14]=d,f[3]=p,f[7]=_,f[11]=v,f[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Xe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Pi.setFromMatrixColumn(e,0).length(),r=1/Pi.setFromMatrixColumn(e,1).length(),a=1/Pi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=a*u,p=a*h,_=o*u,v=o*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=p+_*l,t[5]=d-v*l,t[9]=-o*c,t[2]=v-d*l,t[6]=_+p*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*u,p=c*h,_=l*u,v=l*h;t[0]=d+v*o,t[4]=_*o-p,t[8]=a*l,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=p*o-_,t[6]=v+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*u,p=c*h,_=l*u,v=l*h;t[0]=d-v*o,t[4]=-a*h,t[8]=_+p*o,t[1]=p+_*o,t[5]=a*u,t[9]=v-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*u,p=a*h,_=o*u,v=o*h;t[0]=c*u,t[4]=_*l-p,t[8]=d*l+v,t[1]=c*h,t[5]=v*l+d,t[9]=p*l-_,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,p=a*l,_=o*c,v=o*l;t[0]=c*u,t[4]=v-d*h,t[8]=_*h+p,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=p*h+_,t[10]=d-v*h}else if(e.order==="XZY"){const d=a*c,p=a*l,_=o*c,v=o*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=d*h+v,t[5]=a*u,t[9]=p*h-_,t[2]=_*h-p,t[6]=o*u,t[10]=v*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Rh,e,Ph)}lookAt(e,t,n){const i=this.elements;return Zt.subVectors(e,t),Zt.lengthSq()===0&&(Zt.z=1),Zt.normalize(),Kn.crossVectors(n,Zt),Kn.lengthSq()===0&&(Math.abs(n.z)===1?Zt.x+=1e-4:Zt.z+=1e-4,Zt.normalize(),Kn.crossVectors(n,Zt)),Kn.normalize(),es.crossVectors(Zt,Kn),i[0]=Kn.x,i[4]=es.x,i[8]=Zt.x,i[1]=Kn.y,i[5]=es.y,i[9]=Zt.y,i[2]=Kn.z,i[6]=es.z,i[10]=Zt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],d=n[9],p=n[13],_=n[2],v=n[6],g=n[10],f=n[14],T=n[3],S=n[7],M=n[11],E=n[15],C=i[0],P=i[4],I=i[8],y=i[12],L=i[1],K=i[5],V=i[9],O=i[13],H=i[2],W=i[6],ee=i[10],ae=i[14],Q=i[3],pe=i[7],ie=i[11],Pe=i[15];return r[0]=a*C+o*L+c*H+l*Q,r[4]=a*P+o*K+c*W+l*pe,r[8]=a*I+o*V+c*ee+l*ie,r[12]=a*y+o*O+c*ae+l*Pe,r[1]=u*C+h*L+d*H+p*Q,r[5]=u*P+h*K+d*W+p*pe,r[9]=u*I+h*V+d*ee+p*ie,r[13]=u*y+h*O+d*ae+p*Pe,r[2]=_*C+v*L+g*H+f*Q,r[6]=_*P+v*K+g*W+f*pe,r[10]=_*I+v*V+g*ee+f*ie,r[14]=_*y+v*O+g*ae+f*Pe,r[3]=T*C+S*L+M*H+E*Q,r[7]=T*P+S*K+M*W+E*pe,r[11]=T*I+S*V+M*ee+E*ie,r[15]=T*y+S*O+M*ae+E*Pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],h=e[6],d=e[10],p=e[14],_=e[3],v=e[7],g=e[11],f=e[15];return _*(+r*c*h-i*l*h-r*o*d+n*l*d+i*o*p-n*c*p)+v*(+t*c*p-t*l*d+r*a*d-i*a*p+i*l*u-r*c*u)+g*(+t*l*h-t*o*p-r*a*h+n*a*p+r*o*u-n*l*u)+f*(-i*o*u-t*c*h+t*o*d+i*a*h-n*a*d+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=e[9],d=e[10],p=e[11],_=e[12],v=e[13],g=e[14],f=e[15],T=h*g*l-v*d*l+v*c*p-o*g*p-h*c*f+o*d*f,S=_*d*l-u*g*l-_*c*p+a*g*p+u*c*f-a*d*f,M=u*v*l-_*h*l+_*o*p-a*v*p-u*o*f+a*h*f,E=_*h*c-u*v*c-_*o*d+a*v*d+u*o*g-a*h*g,C=t*T+n*S+i*M+r*E;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/C;return e[0]=T*P,e[1]=(v*d*r-h*g*r-v*i*p+n*g*p+h*i*f-n*d*f)*P,e[2]=(o*g*r-v*c*r+v*i*l-n*g*l-o*i*f+n*c*f)*P,e[3]=(h*c*r-o*d*r-h*i*l+n*d*l+o*i*p-n*c*p)*P,e[4]=S*P,e[5]=(u*g*r-_*d*r+_*i*p-t*g*p-u*i*f+t*d*f)*P,e[6]=(_*c*r-a*g*r-_*i*l+t*g*l+a*i*f-t*c*f)*P,e[7]=(a*d*r-u*c*r+u*i*l-t*d*l-a*i*p+t*c*p)*P,e[8]=M*P,e[9]=(_*h*r-u*v*r-_*n*p+t*v*p+u*n*f-t*h*f)*P,e[10]=(a*v*r-_*o*r+_*n*l-t*v*l-a*n*f+t*o*f)*P,e[11]=(u*o*r-a*h*r-u*n*l+t*h*l+a*n*p-t*o*p)*P,e[12]=E*P,e[13]=(u*v*i-_*h*i+_*n*d-t*v*d-u*n*g+t*h*g)*P,e[14]=(_*o*i-a*v*i-_*n*c+t*v*c+a*n*g-t*o*g)*P,e[15]=(a*h*i-u*o*i+u*n*c-t*h*c-a*n*d+t*o*d)*P,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,u*o+n,u*c-i*a,0,l*c-i*o,u*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,h=o+o,d=r*l,p=r*u,_=r*h,v=a*u,g=a*h,f=o*h,T=c*l,S=c*u,M=c*h,E=n.x,C=n.y,P=n.z;return i[0]=(1-(v+f))*E,i[1]=(p+M)*E,i[2]=(_-S)*E,i[3]=0,i[4]=(p-M)*C,i[5]=(1-(d+f))*C,i[6]=(g+T)*C,i[7]=0,i[8]=(_+S)*P,i[9]=(g-T)*P,i[10]=(1-(d+v))*P,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=Pi.set(i[0],i[1],i[2]).length();const a=Pi.set(i[4],i[5],i[6]).length(),o=Pi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],mn.copy(this);const l=1/r,u=1/a,h=1/o;return mn.elements[0]*=l,mn.elements[1]*=l,mn.elements[2]*=l,mn.elements[4]*=u,mn.elements[5]*=u,mn.elements[6]*=u,mn.elements[8]*=h,mn.elements[9]*=h,mn.elements[10]*=h,t.setFromRotationMatrix(mn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,r,a){const o=this.elements,c=2*r/(t-e),l=2*r/(n-i),u=(t+e)/(t-e),h=(n+i)/(n-i),d=-(a+r)/(a-r),p=-2*a*r/(a-r);return o[0]=c,o[4]=0,o[8]=u,o[12]=0,o[1]=0,o[5]=l,o[9]=h,o[13]=0,o[2]=0,o[6]=0,o[10]=d,o[14]=p,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(e,t,n,i,r,a){const o=this.elements,c=1/(t-e),l=1/(n-i),u=1/(a-r),h=(t+e)*c,d=(n+i)*l,p=(a+r)*u;return o[0]=2*c,o[4]=0,o[8]=0,o[12]=-h,o[1]=0,o[5]=2*l,o[9]=0,o[13]=-d,o[2]=0,o[6]=0,o[10]=-2*u,o[14]=-p,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Pi=new D,mn=new Xe,Rh=new D(0,0,0),Ph=new D(1,1,1),Kn=new D,es=new D,Zt=new D,jo=new Xe,Ko=new Hn;class dr{constructor(e=0,t=0,n=0,i=dr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],u=i[9],h=i[2],d=i[6],p=i[10];switch(t){case"XYZ":this._y=Math.asin(Dt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Dt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Dt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Dt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Dt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Dt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return jo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(jo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ko.setFromEuler(this),this.setFromQuaternion(Ko,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}dr.DEFAULT_ORDER="XYZ";class $a{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ih=0;const Yo=new D,Ii=new Hn,Pn=new Xe,ts=new D,vr=new D,Dh=new D,Uh=new Hn,Zo=new D(1,0,0),$o=new D(0,1,0),Jo=new D(0,0,1),Nh={type:"added"},Qo={type:"removed"};class rt extends hr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ih++}),this.uuid=Mn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=rt.DEFAULT_UP.clone();const e=new D,t=new dr,n=new Hn,i=new D(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Xe},normalMatrix:{value:new qe}}),this.matrix=new Xe,this.matrixWorld=new Xe,this.matrixAutoUpdate=rt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new $a,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ii.setFromAxisAngle(e,t),this.quaternion.multiply(Ii),this}rotateOnWorldAxis(e,t){return Ii.setFromAxisAngle(e,t),this.quaternion.premultiply(Ii),this}rotateX(e){return this.rotateOnAxis(Zo,e)}rotateY(e){return this.rotateOnAxis($o,e)}rotateZ(e){return this.rotateOnAxis(Jo,e)}translateOnAxis(e,t){return Yo.copy(e).applyQuaternion(this.quaternion),this.position.add(Yo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Zo,e)}translateY(e){return this.translateOnAxis($o,e)}translateZ(e){return this.translateOnAxis(Jo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Pn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ts.copy(e):ts.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),vr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pn.lookAt(vr,ts,this.up):Pn.lookAt(ts,vr,this.up),this.quaternion.setFromRotationMatrix(Pn),i&&(Pn.extractRotation(i.matrixWorld),Ii.setFromRotationMatrix(Pn),this.quaternion.premultiply(Ii.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Nh)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Qo)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){for(let e=0;e<this.children.length;e++){const t=this.children[e];t.parent=null,t.dispatchEvent(Qo)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),Pn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Pn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Pn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t){let n=[];this[e]===t&&n.push(this);for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectsByProperty(e,t);a.length>0&&(n=n.concat(a))}return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vr,e,Dh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vr,Uh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++){const o=i[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];i.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),p=a(e.animations),_=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),_.length>0&&(n.nodes=_)}return n.object=i,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}rt.DEFAULT_UP=new D(0,1,0);rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const gn=new D,In=new D,ra=new D,Dn=new D,Di=new D,Ui=new D,el=new D,sa=new D,aa=new D,oa=new D;let ns=!1;class ln{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),gn.subVectors(e,t),i.cross(gn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){gn.subVectors(i,t),In.subVectors(n,t),ra.subVectors(e,t);const a=gn.dot(gn),o=gn.dot(In),c=gn.dot(ra),l=In.dot(In),u=In.dot(ra),h=a*l-o*o;if(h===0)return r.set(-2,-1,-1);const d=1/h,p=(l*c-o*u)*d,_=(a*u-o*c)*d;return r.set(1-p-_,_,p)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Dn),Dn.x>=0&&Dn.y>=0&&Dn.x+Dn.y<=1}static getUV(e,t,n,i,r,a,o,c){return ns===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ns=!0),this.getInterpolation(e,t,n,i,r,a,o,c)}static getInterpolation(e,t,n,i,r,a,o,c){return this.getBarycoord(e,t,n,i,Dn),c.setScalar(0),c.addScaledVector(r,Dn.x),c.addScaledVector(a,Dn.y),c.addScaledVector(o,Dn.z),c}static isFrontFacing(e,t,n,i){return gn.subVectors(n,t),In.subVectors(e,t),gn.cross(In).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return gn.subVectors(this.c,this.b),In.subVectors(this.a,this.b),gn.cross(In).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ln.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ln.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,r){return ns===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ns=!0),ln.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}getInterpolation(e,t,n,i,r){return ln.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return ln.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ln.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let a,o;Di.subVectors(i,n),Ui.subVectors(r,n),sa.subVectors(e,n);const c=Di.dot(sa),l=Ui.dot(sa);if(c<=0&&l<=0)return t.copy(n);aa.subVectors(e,i);const u=Di.dot(aa),h=Ui.dot(aa);if(u>=0&&h<=u)return t.copy(i);const d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(Di,a);oa.subVectors(e,r);const p=Di.dot(oa),_=Ui.dot(oa);if(_>=0&&p<=_)return t.copy(r);const v=p*l-c*_;if(v<=0&&l>=0&&_<=0)return o=l/(l-_),t.copy(n).addScaledVector(Ui,o);const g=u*_-p*h;if(g<=0&&h-u>=0&&p-_>=0)return el.subVectors(r,i),o=(h-u)/(h-u+(p-_)),t.copy(i).addScaledVector(el,o);const f=1/(g+v+d);return a=v*f,o=d*f,t.copy(n).addScaledVector(Di,a).addScaledVector(Ui,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let Fh=0;class hn extends hr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Fh++}),this.uuid=Mn(),this.name="",this.type="Material",this.blending=Qi,this.side=En,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=vc,this.blendDst=xc,this.blendEquation=Zi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=Ra,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=oh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ks,this.stencilZFail=Ks,this.stencilZPass=Ks,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Qi&&(n.blending=this.blending),this.side!==En&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(n.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.forceSinglePass===!0&&(n.forceSinglePass=this.forceSinglePass),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=this.flatShading),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Dc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_n={h:0,s:0,l:0},is={h:0,s:0,l:0};function la(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Fe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,t===void 0&&n===void 0?this.set(e):this.setRGB(e,t,n)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Pt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Yt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Yt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Yt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Yt.workingColorSpace){if(e=Za(e,1),t=Dt(t,0,1),n=Dt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=la(a,r,e+1/3),this.g=la(a,r,e),this.b=la(a,r,e-1/3)}return Yt.toWorkingColorSpace(this,i),this}setStyle(e,t=Pt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(255,parseInt(r[1],10))/255,this.g=Math.min(255,parseInt(r[2],10))/255,this.b=Math.min(255,parseInt(r[3],10))/255,Yt.toWorkingColorSpace(this,t),n(r[4]),this;if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(100,parseInt(r[1],10))/100,this.g=Math.min(100,parseInt(r[2],10))/100,this.b=Math.min(100,parseInt(r[3],10))/100,Yt.toWorkingColorSpace(this,t),n(r[4]),this;break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)){const c=parseFloat(r[1])/360,l=parseFloat(r[2])/100,u=parseFloat(r[3])/100;return n(r[4]),this.setHSL(c,l,u,t)}break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Pt){const n=Dc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=tr(e.r),this.g=tr(e.g),this.b=tr(e.b),this}copyLinearToSRGB(e){return this.r=Zs(e.r),this.g=Zs(e.g),this.b=Zs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Pt){return Yt.fromWorkingColorSpace(Ot.copy(this),e),Dt(Ot.r*255,0,255)<<16^Dt(Ot.g*255,0,255)<<8^Dt(Ot.b*255,0,255)<<0}getHexString(e=Pt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Yt.workingColorSpace){Yt.fromWorkingColorSpace(Ot.copy(this),t);const n=Ot.r,i=Ot.g,r=Ot.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(i-r)/h+(i<r?6:0);break;case i:c=(r-n)/h+2;break;case r:c=(n-i)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Yt.workingColorSpace){return Yt.fromWorkingColorSpace(Ot.copy(this),t),e.r=Ot.r,e.g=Ot.g,e.b=Ot.b,e}getStyle(e=Pt){Yt.fromWorkingColorSpace(Ot.copy(this),e);const t=Ot.r,n=Ot.g,i=Ot.b;return e!==Pt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${t*255|0},${n*255|0},${i*255|0})`}offsetHSL(e,t,n){return this.getHSL(_n),_n.h+=e,_n.s+=t,_n.l+=n,this.setHSL(_n.h,_n.s,_n.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(_n),e.getHSL(is);const n=Fr(_n.h,is.h,t),i=Fr(_n.s,is.s,t),r=Fr(_n.l,is.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ot=new Fe;Fe.NAMES=Dc;class Bn extends hn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ka,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Nn=Oh();function Oh(){const s=new ArrayBuffer(4),e=new Float32Array(s),t=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){const l=c-127;l<-27?(n[c]=0,n[c|256]=32768,i[c]=24,i[c|256]=24):l<-14?(n[c]=1024>>-l-14,n[c|256]=1024>>-l-14|32768,i[c]=-l-1,i[c|256]=-l-1):l<=15?(n[c]=l+15<<10,n[c|256]=l+15<<10|32768,i[c]=13,i[c|256]=13):l<128?(n[c]=31744,n[c|256]=64512,i[c]=24,i[c|256]=24):(n[c]=31744,n[c|256]=64512,i[c]=13,i[c|256]=13)}const r=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,u=0;for(;!(l&8388608);)l<<=1,u-=8388608;l&=-8388609,u+=947912704,r[c]=l|u}for(let c=1024;c<2048;++c)r[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:a,offsetTable:o}}function Bh(s){Math.abs(s)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),s=Dt(s,-65504,65504),Nn.floatView[0]=s;const e=Nn.uint32View[0],t=e>>23&511;return Nn.baseTable[t]+((e&8388607)>>Nn.shiftTable[t])}function zh(s){const e=s>>10;return Nn.uint32View[0]=Nn.mantissaTable[Nn.offsetTable[e]+(s&1023)]+Nn.exponentTable[e],Nn.floatView[0]}const tl={toHalfFloat:Bh,fromHalfFloat:zh},Mt=new D,rs=new Be;class Gt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Na,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)rs.fromBufferAttribute(this,t),rs.applyMatrix3(e),this.setXY(t,rs.x,rs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix3(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix4(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyNormalMatrix(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.transformDirection(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=On(t,this.array)),t}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=On(t,this.array)),t}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=On(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=On(t,this.array)),t}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array),r=ot(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Na&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class Uc extends Gt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Nc extends Gt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class dn extends Gt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let kh=0;const sn=new Xe,ca=new rt,Ni=new D,$t=new yn,xr=new yn,Ct=new D;class fn extends hr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kh++}),this.uuid=Mn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Lc(e)?Nc:Uc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new qe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return sn.makeRotationFromQuaternion(e),this.applyMatrix4(sn),this}rotateX(e){return sn.makeRotationX(e),this.applyMatrix4(sn),this}rotateY(e){return sn.makeRotationY(e),this.applyMatrix4(sn),this}rotateZ(e){return sn.makeRotationZ(e),this.applyMatrix4(sn),this}translate(e,t,n){return sn.makeTranslation(e,t,n),this.applyMatrix4(sn),this}scale(e,t,n){return sn.makeScale(e,t,n),this.applyMatrix4(sn),this}lookAt(e){return ca.lookAt(e),ca.updateMatrix(),this.applyMatrix4(ca.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ni).negate(),this.translate(Ni.x,Ni.y,Ni.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new dn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];$t.setFromBufferAttribute(r),this.morphTargetsRelative?(Ct.addVectors(this.boundingBox.min,$t.min),this.boundingBox.expandByPoint(Ct),Ct.addVectors(this.boundingBox.max,$t.max),this.boundingBox.expandByPoint(Ct)):(this.boundingBox.expandByPoint($t.min),this.boundingBox.expandByPoint($t.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new D,1/0);return}if(e){const n=this.boundingSphere.center;if($t.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];xr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ct.addVectors($t.min,xr.min),$t.expandByPoint(Ct),Ct.addVectors($t.max,xr.max),$t.expandByPoint(Ct)):($t.expandByPoint(xr.min),$t.expandByPoint(xr.max))}$t.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)Ct.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Ct));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Ct.fromBufferAttribute(o,l),c&&(Ni.fromBufferAttribute(e,l),Ct.add(Ni)),i=Math.max(i,n.distanceToSquared(Ct))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,r=t.normal.array,a=t.uv.array,o=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Gt(new Float32Array(4*o),4));const c=this.getAttribute("tangent").array,l=[],u=[];for(let L=0;L<o;L++)l[L]=new D,u[L]=new D;const h=new D,d=new D,p=new D,_=new Be,v=new Be,g=new Be,f=new D,T=new D;function S(L,K,V){h.fromArray(i,L*3),d.fromArray(i,K*3),p.fromArray(i,V*3),_.fromArray(a,L*2),v.fromArray(a,K*2),g.fromArray(a,V*2),d.sub(h),p.sub(h),v.sub(_),g.sub(_);const O=1/(v.x*g.y-g.x*v.y);isFinite(O)&&(f.copy(d).multiplyScalar(g.y).addScaledVector(p,-v.y).multiplyScalar(O),T.copy(p).multiplyScalar(v.x).addScaledVector(d,-g.x).multiplyScalar(O),l[L].add(f),l[K].add(f),l[V].add(f),u[L].add(T),u[K].add(T),u[V].add(T))}let M=this.groups;M.length===0&&(M=[{start:0,count:n.length}]);for(let L=0,K=M.length;L<K;++L){const V=M[L],O=V.start,H=V.count;for(let W=O,ee=O+H;W<ee;W+=3)S(n[W+0],n[W+1],n[W+2])}const E=new D,C=new D,P=new D,I=new D;function y(L){P.fromArray(r,L*3),I.copy(P);const K=l[L];E.copy(K),E.sub(P.multiplyScalar(P.dot(K))).normalize(),C.crossVectors(I,K);const O=C.dot(u[L])<0?-1:1;c[L*4]=E.x,c[L*4+1]=E.y,c[L*4+2]=E.z,c[L*4+3]=O}for(let L=0,K=M.length;L<K;++L){const V=M[L],O=V.start,H=V.count;for(let W=O,ee=O+H;W<ee;W+=3)y(n[W+0]),y(n[W+1]),y(n[W+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Gt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const i=new D,r=new D,a=new D,o=new D,c=new D,l=new D,u=new D,h=new D;if(e)for(let d=0,p=e.count;d<p;d+=3){const _=e.getX(d+0),v=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,_),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,g),u.subVectors(a,r),h.subVectors(i,r),u.cross(h),o.fromBufferAttribute(n,_),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,g),o.add(u),c.add(u),l.add(u),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,p=t.count;d<p;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,r),h.subVectors(i,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeGeometries() instead."),this}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ct.fromBufferAttribute(e,t),Ct.normalize(),e.setXYZ(t,Ct.x,Ct.y,Ct.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,h=o.normalized,d=new l.constructor(c.length*u);let p=0,_=0;for(let v=0,g=c.length;v<g;v++){o.isInterleavedBufferAttribute?p=c[v]*o.data.stride+o.offset:p=c[v]*u;for(let f=0;f<u;f++)d[_++]=l[p++]}return new Gt(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new fn,n=this.index.array,i=this.attributes;for(const o in i){const c=i[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,h=l.length;u<h;u++){const d=l[u],p=e(d,n);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){const p=l[h];u.push(p.toJSON(e.data))}u.length>0&&(i[c]=u,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const l in i){const u=i[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],h=r[l];for(let d=0,p=h.length;d<p;d++)u.push(h[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const nl=new Xe,wn=new Os,ss=new Gn,il=new D,Fi=new D,Oi=new D,Bi=new D,ua=new D,as=new D,os=new Be,ls=new Be,cs=new Be,rl=new D,sl=new D,al=new D,us=new D,hs=new D;class tt extends rt{constructor(e=new fn,t=new Bn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(r&&o){as.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],h=r[c];u!==0&&(ua.fromBufferAttribute(h,e),a?as.addScaledVector(ua,u):as.addScaledVector(ua.sub(t),u))}t.add(as)}return this.isSkinnedMesh&&this.applyBoneTransform(e,t),t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;if(i===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),ss.copy(n.boundingSphere),ss.applyMatrix4(r),wn.copy(e.ray).recast(e.near),ss.containsPoint(wn.origin)===!1&&(wn.intersectSphere(ss,il)===null||wn.origin.distanceToSquared(il)>(e.far-e.near)**2))||(nl.copy(r).invert(),wn.copy(e.ray).applyMatrix4(nl),n.boundingBox!==null&&wn.intersectsBox(n.boundingBox)===!1))return;let a;const o=n.index,c=n.attributes.position,l=n.attributes.uv,u=n.attributes.uv2,h=n.attributes.normal,d=n.groups,p=n.drawRange;if(o!==null)if(Array.isArray(i))for(let _=0,v=d.length;_<v;_++){const g=d[_],f=i[g.materialIndex],T=Math.max(g.start,p.start),S=Math.min(o.count,Math.min(g.start+g.count,p.start+p.count));for(let M=T,E=S;M<E;M+=3){const C=o.getX(M),P=o.getX(M+1),I=o.getX(M+2);a=ds(this,f,e,wn,l,u,h,C,P,I),a&&(a.faceIndex=Math.floor(M/3),a.face.materialIndex=g.materialIndex,t.push(a))}}else{const _=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let g=_,f=v;g<f;g+=3){const T=o.getX(g),S=o.getX(g+1),M=o.getX(g+2);a=ds(this,i,e,wn,l,u,h,T,S,M),a&&(a.faceIndex=Math.floor(g/3),t.push(a))}}else if(c!==void 0)if(Array.isArray(i))for(let _=0,v=d.length;_<v;_++){const g=d[_],f=i[g.materialIndex],T=Math.max(g.start,p.start),S=Math.min(c.count,Math.min(g.start+g.count,p.start+p.count));for(let M=T,E=S;M<E;M+=3){const C=M,P=M+1,I=M+2;a=ds(this,f,e,wn,l,u,h,C,P,I),a&&(a.faceIndex=Math.floor(M/3),a.face.materialIndex=g.materialIndex,t.push(a))}}else{const _=Math.max(0,p.start),v=Math.min(c.count,p.start+p.count);for(let g=_,f=v;g<f;g+=3){const T=g,S=g+1,M=g+2;a=ds(this,i,e,wn,l,u,h,T,S,M),a&&(a.faceIndex=Math.floor(g/3),t.push(a))}}}}function Hh(s,e,t,n,i,r,a,o){let c;if(e.side===jt?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,e.side===En,o),c===null)return null;hs.copy(o),hs.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(hs);return l<t.near||l>t.far?null:{distance:l,point:hs.clone(),object:s}}function ds(s,e,t,n,i,r,a,o,c,l){s.getVertexPosition(o,Fi),s.getVertexPosition(c,Oi),s.getVertexPosition(l,Bi);const u=Hh(s,e,t,n,Fi,Oi,Bi,us);if(u){i&&(os.fromBufferAttribute(i,o),ls.fromBufferAttribute(i,c),cs.fromBufferAttribute(i,l),u.uv=ln.getInterpolation(us,Fi,Oi,Bi,os,ls,cs,new Be)),r&&(os.fromBufferAttribute(r,o),ls.fromBufferAttribute(r,c),cs.fromBufferAttribute(r,l),u.uv2=ln.getInterpolation(us,Fi,Oi,Bi,os,ls,cs,new Be)),a&&(rl.fromBufferAttribute(a,o),sl.fromBufferAttribute(a,c),al.fromBufferAttribute(a,l),u.normal=ln.getInterpolation(us,Fi,Oi,Bi,rl,sl,al,new D),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new D,materialIndex:0};ln.getNormal(Fi,Oi,Bi,h.normal),u.face=h}return u}class Ht extends fn{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],h=[];let d=0,p=0;_("z","y","x",-1,-1,n,t,e,a,r,0),_("z","y","x",1,-1,n,t,-e,a,r,1),_("x","z","y",1,1,e,n,t,i,a,2),_("x","z","y",1,-1,e,n,-t,i,a,3),_("x","y","z",1,-1,e,t,n,i,r,4),_("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new dn(l,3)),this.setAttribute("normal",new dn(u,3)),this.setAttribute("uv",new dn(h,2));function _(v,g,f,T,S,M,E,C,P,I,y){const L=M/P,K=E/I,V=M/2,O=E/2,H=C/2,W=P+1,ee=I+1;let ae=0,Q=0;const pe=new D;for(let ie=0;ie<ee;ie++){const Pe=ie*K-O;for(let le=0;le<W;le++){const j=le*L-V;pe[v]=j*T,pe[g]=Pe*S,pe[f]=H,l.push(pe.x,pe.y,pe.z),pe[v]=0,pe[g]=0,pe[f]=C>0?1:-1,u.push(pe.x,pe.y,pe.z),h.push(le/P),h.push(1-ie/I),ae+=1}}for(let ie=0;ie<I;ie++)for(let Pe=0;Pe<P;Pe++){const le=d+Pe+W*ie,j=d+Pe+W*(ie+1),te=d+(Pe+1)+W*(ie+1),ge=d+(Pe+1)+W*ie;c.push(le,j,ge),c.push(j,te,ge),Q+=6}o.addGroup(p,Q,y),p+=Q,d+=ae}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ht(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function cr(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function zt(s){const e={};for(let t=0;t<s.length;t++){const n=cr(s[t]);for(const i in n)e[i]=n[i]}return e}function Gh(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Fc(s){return s.getRenderTarget()===null&&s.outputEncoding===et?Pt:Hr}const Vh={clone:cr,merge:zt};var Wh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Xh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class yi extends hn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Wh,this.fragmentShader=Xh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=cr(e.uniforms),this.uniformsGroups=Gh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Oc extends rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Xe,this.projectionMatrix=new Xe,this.projectionMatrixInverse=new Xe}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class kt extends Oc{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=lr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Nr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return lr*2*Math.atan(Math.tan(Nr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Nr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const zi=-90,ki=1;class qh extends rt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n;const i=new kt(zi,ki,e,t);i.layers=this.layers,i.up.set(0,1,0),i.lookAt(1,0,0),this.add(i);const r=new kt(zi,ki,e,t);r.layers=this.layers,r.up.set(0,1,0),r.lookAt(-1,0,0),this.add(r);const a=new kt(zi,ki,e,t);a.layers=this.layers,a.up.set(0,0,-1),a.lookAt(0,1,0),this.add(a);const o=new kt(zi,ki,e,t);o.layers=this.layers,o.up.set(0,0,1),o.lookAt(0,-1,0),this.add(o);const c=new kt(zi,ki,e,t);c.layers=this.layers,c.up.set(0,1,0),c.lookAt(0,0,1),this.add(c);const l=new kt(zi,ki,e,t);l.layers=this.layers,l.up.set(0,1,0),l.lookAt(0,0,-1),this.add(l)}update(e,t){this.parent===null&&this.updateMatrixWorld();const n=this.renderTarget,[i,r,a,o,c,l]=this.children,u=e.getRenderTarget(),h=e.toneMapping,d=e.xr.enabled;e.toneMapping=zn,e.xr.enabled=!1;const p=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0),e.render(t,i),e.setRenderTarget(n,1),e.render(t,r),e.setRenderTarget(n,2),e.render(t,a),e.setRenderTarget(n,3),e.render(t,o),e.setRenderTarget(n,4),e.render(t,c),n.texture.generateMipmaps=p,e.setRenderTarget(n,5),e.render(t,l),e.setRenderTarget(u),e.toneMapping=h,e.xr.enabled=d,n.texture.needsPMREMUpdate=!0}}class Bc extends It{constructor(e,t,n,i,r,a,o,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:rr,super(e,t,n,i,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class jh extends Mi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Bc(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:bt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.encoding=t.encoding,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Ht(5,5,5),r=new yi({name:"CubemapFromEquirect",uniforms:cr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:jt,blending:ei});r.uniforms.tEquirect.value=t;const a=new tt(i,r),o=t.minFilter;return t.minFilter===ti&&(t.minFilter=bt),new qh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}}const ha=new D,Kh=new D,Yh=new qe;class hi{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=ha.subVectors(n,t).cross(Kh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ha),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Yh.getNormalMatrix(e),i=this.coplanarPoint(ha).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const oi=new Gn,fs=new D;class Ja{constructor(e=new hi,t=new hi,n=new hi,i=new hi,r=new hi,a=new hi){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e){const t=this.planes,n=e.elements,i=n[0],r=n[1],a=n[2],o=n[3],c=n[4],l=n[5],u=n[6],h=n[7],d=n[8],p=n[9],_=n[10],v=n[11],g=n[12],f=n[13],T=n[14],S=n[15];return t[0].setComponents(o-i,h-c,v-d,S-g).normalize(),t[1].setComponents(o+i,h+c,v+d,S+g).normalize(),t[2].setComponents(o+r,h+l,v+p,S+f).normalize(),t[3].setComponents(o-r,h-l,v-p,S-f).normalize(),t[4].setComponents(o-a,h-u,v-_,S-T).normalize(),t[5].setComponents(o+a,h+u,v+_,S+T).normalize(),this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),oi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),oi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(oi)}intersectsSprite(e){return oi.center.set(0,0,0),oi.radius=.7071067811865476,oi.applyMatrix4(e.matrixWorld),this.intersectsSphere(oi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(fs.x=i.normal.x>0?e.max.x:e.min.x,fs.y=i.normal.y>0?e.max.y:e.min.y,fs.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(fs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function zc(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Zh(s,e){const t=e.isWebGL2,n=new WeakMap;function i(l,u){const h=l.array,d=l.usage,p=s.createBuffer();s.bindBuffer(u,p),s.bufferData(u,h,d),l.onUploadCallback();let _;if(h instanceof Float32Array)_=5126;else if(h instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)_=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=5123;else if(h instanceof Int16Array)_=5122;else if(h instanceof Uint32Array)_=5125;else if(h instanceof Int32Array)_=5124;else if(h instanceof Int8Array)_=5120;else if(h instanceof Uint8Array)_=5121;else if(h instanceof Uint8ClampedArray)_=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:p,type:_,bytesPerElement:h.BYTES_PER_ELEMENT,version:l.version}}function r(l,u,h){const d=u.array,p=u.updateRange;s.bindBuffer(h,l),p.count===-1?s.bufferSubData(h,0,d):(t?s.bufferSubData(h,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):s.bufferSubData(h,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1),u.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);const u=n.get(l);u&&(s.deleteBuffer(u.buffer),n.delete(l))}function c(l,u){if(l.isGLBufferAttribute){const d=n.get(l);(!d||d.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const h=n.get(l);h===void 0?n.set(l,i(l,u)):h.version<l.version&&(r(h.buffer,l,u),h.version=l.version)}return{get:a,remove:o,update:c}}class kn extends fn{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,u=c+1,h=e/o,d=t/c,p=[],_=[],v=[],g=[];for(let f=0;f<u;f++){const T=f*d-a;for(let S=0;S<l;S++){const M=S*h-r;_.push(M,-T,0),v.push(0,0,1),g.push(S/o),g.push(1-f/c)}}for(let f=0;f<c;f++)for(let T=0;T<o;T++){const S=T+l*f,M=T+l*(f+1),E=T+1+l*(f+1),C=T+1+l*f;p.push(S,M,C),p.push(M,E,C)}this.setIndex(p),this.setAttribute("position",new dn(_,3)),this.setAttribute("normal",new dn(v,3)),this.setAttribute("uv",new dn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kn(e.width,e.height,e.widthSegments,e.heightSegments)}}var $h=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qh=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,ed=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,td=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,nd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,id="vec3 transformed = vec3( position );",rd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,sd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ad=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			 return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,od=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ld=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,cd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ud=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,hd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,dd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,fd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,pd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,md=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,gd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,_d=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,vd=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,xd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Md=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,yd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Sd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,wd="gl_FragColor = linearToOutputTexel( gl_FragColor );",bd=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Td=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ed=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ad=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Cd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ld=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Rd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Pd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Id=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Dd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ud=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Nd=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Fd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Od=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,kd=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,Hd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Gd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Vd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Wd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Xd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif`,qd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,jd=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Kd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Yd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,Zd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$d=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Qd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,ef=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,tf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,nf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,rf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,af=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,of=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,lf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,cf=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,uf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,hf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#ifdef USE_NORMALMAP_TANGENTSPACE
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal, vNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 geometryNormal = normal;`,df=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ff=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,gf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,_f=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,vf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,xf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Mf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,yf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Sf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,wf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Tf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ef=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Af=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Lf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Rf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Pf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,If=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Df=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Uf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,Nf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ff=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Of=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Bf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,kf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
#endif`,Gf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, vec2 fullSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		
		vec2 lodFudge = pow( 1.95, lod ) / fullSize;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec2 fullSize = vec2( textureSize( sampler, 0 ) );
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), fullSize, floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), fullSize, ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,Vf=`#ifdef USE_UV
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Wf=`#ifdef USE_UV
	varying vec2 vUv;
#endif
#ifdef USE_UV2
	attribute vec2 uv2;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Xf=`#ifdef USE_UV
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,qf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const jf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Kf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Yf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,$f=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Qf=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ep=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,tp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,np=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,ip=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,rp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,sp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ap=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,op=`#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,lp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,up=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,dp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,pp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,mp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_p=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,vp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Sp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,wp=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Tp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ep=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Ve={alphamap_fragment:$h,alphamap_pars_fragment:Jh,alphatest_fragment:Qh,alphatest_pars_fragment:ed,aomap_fragment:td,aomap_pars_fragment:nd,begin_vertex:id,beginnormal_vertex:rd,bsdfs:sd,iridescence_fragment:ad,bumpmap_pars_fragment:od,clipping_planes_fragment:ld,clipping_planes_pars_fragment:cd,clipping_planes_pars_vertex:ud,clipping_planes_vertex:hd,color_fragment:dd,color_pars_fragment:fd,color_pars_vertex:pd,color_vertex:md,common:gd,cube_uv_reflection_fragment:_d,defaultnormal_vertex:vd,displacementmap_pars_vertex:xd,displacementmap_vertex:Md,emissivemap_fragment:yd,emissivemap_pars_fragment:Sd,encodings_fragment:wd,encodings_pars_fragment:bd,envmap_fragment:Td,envmap_common_pars_fragment:Ed,envmap_pars_fragment:Ad,envmap_pars_vertex:Cd,envmap_physical_pars_fragment:kd,envmap_vertex:Ld,fog_vertex:Rd,fog_pars_vertex:Pd,fog_fragment:Id,fog_pars_fragment:Dd,gradientmap_pars_fragment:Ud,lightmap_fragment:Nd,lightmap_pars_fragment:Fd,lights_lambert_fragment:Od,lights_lambert_pars_fragment:Bd,lights_pars_begin:zd,lights_toon_fragment:Hd,lights_toon_pars_fragment:Gd,lights_phong_fragment:Vd,lights_phong_pars_fragment:Wd,lights_physical_fragment:Xd,lights_physical_pars_fragment:qd,lights_fragment_begin:jd,lights_fragment_maps:Kd,lights_fragment_end:Yd,logdepthbuf_fragment:Zd,logdepthbuf_pars_fragment:$d,logdepthbuf_pars_vertex:Jd,logdepthbuf_vertex:Qd,map_fragment:ef,map_pars_fragment:tf,map_particle_fragment:nf,map_particle_pars_fragment:rf,metalnessmap_fragment:sf,metalnessmap_pars_fragment:af,morphcolor_vertex:of,morphnormal_vertex:lf,morphtarget_pars_vertex:cf,morphtarget_vertex:uf,normal_fragment_begin:hf,normal_fragment_maps:df,normal_pars_fragment:ff,normal_pars_vertex:pf,normal_vertex:mf,normalmap_pars_fragment:gf,clearcoat_normal_fragment_begin:_f,clearcoat_normal_fragment_maps:vf,clearcoat_pars_fragment:xf,iridescence_pars_fragment:Mf,output_fragment:yf,packing:Sf,premultiplied_alpha_fragment:wf,project_vertex:bf,dithering_fragment:Tf,dithering_pars_fragment:Ef,roughnessmap_fragment:Af,roughnessmap_pars_fragment:Cf,shadowmap_pars_fragment:Lf,shadowmap_pars_vertex:Rf,shadowmap_vertex:Pf,shadowmask_pars_fragment:If,skinbase_vertex:Df,skinning_pars_vertex:Uf,skinning_vertex:Nf,skinnormal_vertex:Ff,specularmap_fragment:Of,specularmap_pars_fragment:Bf,tonemapping_fragment:zf,tonemapping_pars_fragment:kf,transmission_fragment:Hf,transmission_pars_fragment:Gf,uv_pars_fragment:Vf,uv_pars_vertex:Wf,uv_vertex:Xf,worldpos_vertex:qf,background_vert:jf,background_frag:Kf,backgroundCube_vert:Yf,backgroundCube_frag:Zf,cube_vert:$f,cube_frag:Jf,depth_vert:Qf,depth_frag:ep,distanceRGBA_vert:tp,distanceRGBA_frag:np,equirect_vert:ip,equirect_frag:rp,linedashed_vert:sp,linedashed_frag:ap,meshbasic_vert:op,meshbasic_frag:lp,meshlambert_vert:cp,meshlambert_frag:up,meshmatcap_vert:hp,meshmatcap_frag:dp,meshnormal_vert:fp,meshnormal_frag:pp,meshphong_vert:mp,meshphong_frag:gp,meshphysical_vert:_p,meshphysical_frag:vp,meshtoon_vert:xp,meshtoon_frag:Mp,points_vert:yp,points_frag:Sp,shadow_vert:wp,shadow_frag:bp,sprite_vert:Tp,sprite_frag:Ep},ve={common:{diffuse:{value:new Fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qe}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qe},normalScale:{value:new Be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new qe}},sprite:{diffuse:{value:new Fe(16777215)},opacity:{value:1},center:{value:new Be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaTest:{value:0}}},bn={basic:{uniforms:zt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:zt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new Fe(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:zt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new Fe(0)},specular:{value:new Fe(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:zt([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new Fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:zt([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new Fe(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:zt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:zt([ve.points,ve.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:zt([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:zt([ve.common,ve.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:zt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:zt([ve.sprite,ve.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:zt([ve.common,ve.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:zt([ve.lights,ve.fog,{color:{value:new Fe(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};bn.physical={uniforms:zt([bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qe},clearcoatNormalScale:{value:new Be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qe},sheen:{value:0},sheenColor:{value:new Fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qe},transmissionSamplerSize:{value:new Be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qe},attenuationDistance:{value:0},attenuationColor:{value:new Fe(0)},specularColor:{value:new Fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qe}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const ps={r:0,b:0,g:0};function Ap(s,e,t,n,i,r,a){const o=new Fe(0);let c=r===!0?0:1,l,u,h=null,d=0,p=null;function _(g,f){let T=!1,S=f.isScene===!0?f.background:null;S&&S.isTexture&&(S=(f.backgroundBlurriness>0?t:e).get(S));const M=s.xr,E=M.getSession&&M.getSession();E&&E.environmentBlendMode==="additive"&&(S=null),S===null?v(o,c):S&&S.isColor&&(v(S,1),T=!0),(s.autoClear||T)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),S&&(S.isCubeTexture||S.mapping===Fs)?(u===void 0&&(u=new tt(new Ht(1,1,1),new yi({name:"BackgroundCubeMaterial",uniforms:cr(bn.backgroundCube.uniforms),vertexShader:bn.backgroundCube.vertexShader,fragmentShader:bn.backgroundCube.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,P,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=S,u.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,u.material.toneMapped=S.encoding!==et,(h!==S||d!==S.version||p!==s.toneMapping)&&(u.material.needsUpdate=!0,h=S,d=S.version,p=s.toneMapping),u.layers.enableAll(),g.unshift(u,u.geometry,u.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new tt(new kn(2,2),new yi({name:"BackgroundMaterial",uniforms:cr(bn.background.uniforms),vertexShader:bn.background.vertexShader,fragmentShader:bn.background.fragmentShader,side:En,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,l.material.toneMapped=S.encoding!==et,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||d!==S.version||p!==s.toneMapping)&&(l.material.needsUpdate=!0,h=S,d=S.version,p=s.toneMapping),l.layers.enableAll(),g.unshift(l,l.geometry,l.material,0,0,null))}function v(g,f){g.getRGB(ps,Fc(s)),n.buffers.color.setClear(ps.r,ps.g,ps.b,f,a)}return{getClearColor:function(){return o},setClearColor:function(g,f=1){o.set(g),c=f,v(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(g){c=g,v(o,c)},render:_}}function Cp(s,e,t,n){const i=s.getParameter(34921),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},c=g(null);let l=c,u=!1;function h(H,W,ee,ae,Q){let pe=!1;if(a){const ie=v(ae,ee,W);l!==ie&&(l=ie,p(l.object)),pe=f(H,ae,ee,Q),pe&&T(H,ae,ee,Q)}else{const ie=W.wireframe===!0;(l.geometry!==ae.id||l.program!==ee.id||l.wireframe!==ie)&&(l.geometry=ae.id,l.program=ee.id,l.wireframe=ie,pe=!0)}Q!==null&&t.update(Q,34963),(pe||u)&&(u=!1,I(H,W,ee,ae),Q!==null&&s.bindBuffer(34963,t.get(Q).buffer))}function d(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function p(H){return n.isWebGL2?s.bindVertexArray(H):r.bindVertexArrayOES(H)}function _(H){return n.isWebGL2?s.deleteVertexArray(H):r.deleteVertexArrayOES(H)}function v(H,W,ee){const ae=ee.wireframe===!0;let Q=o[H.id];Q===void 0&&(Q={},o[H.id]=Q);let pe=Q[W.id];pe===void 0&&(pe={},Q[W.id]=pe);let ie=pe[ae];return ie===void 0&&(ie=g(d()),pe[ae]=ie),ie}function g(H){const W=[],ee=[],ae=[];for(let Q=0;Q<i;Q++)W[Q]=0,ee[Q]=0,ae[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:ee,attributeDivisors:ae,object:H,attributes:{},index:null}}function f(H,W,ee,ae){const Q=l.attributes,pe=W.attributes;let ie=0;const Pe=ee.getAttributes();for(const le in Pe)if(Pe[le].location>=0){const te=Q[le];let ge=pe[le];if(ge===void 0&&(le==="instanceMatrix"&&H.instanceMatrix&&(ge=H.instanceMatrix),le==="instanceColor"&&H.instanceColor&&(ge=H.instanceColor)),te===void 0||te.attribute!==ge||ge&&te.data!==ge.data)return!0;ie++}return l.attributesNum!==ie||l.index!==ae}function T(H,W,ee,ae){const Q={},pe=W.attributes;let ie=0;const Pe=ee.getAttributes();for(const le in Pe)if(Pe[le].location>=0){let te=pe[le];te===void 0&&(le==="instanceMatrix"&&H.instanceMatrix&&(te=H.instanceMatrix),le==="instanceColor"&&H.instanceColor&&(te=H.instanceColor));const ge={};ge.attribute=te,te&&te.data&&(ge.data=te.data),Q[le]=ge,ie++}l.attributes=Q,l.attributesNum=ie,l.index=ae}function S(){const H=l.newAttributes;for(let W=0,ee=H.length;W<ee;W++)H[W]=0}function M(H){E(H,0)}function E(H,W){const ee=l.newAttributes,ae=l.enabledAttributes,Q=l.attributeDivisors;ee[H]=1,ae[H]===0&&(s.enableVertexAttribArray(H),ae[H]=1),Q[H]!==W&&((n.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](H,W),Q[H]=W)}function C(){const H=l.newAttributes,W=l.enabledAttributes;for(let ee=0,ae=W.length;ee<ae;ee++)W[ee]!==H[ee]&&(s.disableVertexAttribArray(ee),W[ee]=0)}function P(H,W,ee,ae,Q,pe){n.isWebGL2===!0&&(ee===5124||ee===5125)?s.vertexAttribIPointer(H,W,ee,Q,pe):s.vertexAttribPointer(H,W,ee,ae,Q,pe)}function I(H,W,ee,ae){if(n.isWebGL2===!1&&(H.isInstancedMesh||ae.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;S();const Q=ae.attributes,pe=ee.getAttributes(),ie=W.defaultAttributeValues;for(const Pe in pe){const le=pe[Pe];if(le.location>=0){let j=Q[Pe];if(j===void 0&&(Pe==="instanceMatrix"&&H.instanceMatrix&&(j=H.instanceMatrix),Pe==="instanceColor"&&H.instanceColor&&(j=H.instanceColor)),j!==void 0){const te=j.normalized,ge=j.itemSize,ce=t.get(j);if(ce===void 0)continue;const X=ce.buffer,Re=ce.type,Ue=ce.bytesPerElement;if(j.isInterleavedBufferAttribute){const _e=j.data,Ie=_e.stride,Ze=j.offset;if(_e.isInstancedInterleavedBuffer){for(let Ae=0;Ae<le.locationSize;Ae++)E(le.location+Ae,_e.meshPerAttribute);H.isInstancedMesh!==!0&&ae._maxInstanceCount===void 0&&(ae._maxInstanceCount=_e.meshPerAttribute*_e.count)}else for(let Ae=0;Ae<le.locationSize;Ae++)M(le.location+Ae);s.bindBuffer(34962,X);for(let Ae=0;Ae<le.locationSize;Ae++)P(le.location+Ae,ge/le.locationSize,Re,te,Ie*Ue,(Ze+ge/le.locationSize*Ae)*Ue)}else{if(j.isInstancedBufferAttribute){for(let _e=0;_e<le.locationSize;_e++)E(le.location+_e,j.meshPerAttribute);H.isInstancedMesh!==!0&&ae._maxInstanceCount===void 0&&(ae._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let _e=0;_e<le.locationSize;_e++)M(le.location+_e);s.bindBuffer(34962,X);for(let _e=0;_e<le.locationSize;_e++)P(le.location+_e,ge/le.locationSize,Re,te,ge*Ue,ge/le.locationSize*_e*Ue)}}else if(ie!==void 0){const te=ie[Pe];if(te!==void 0)switch(te.length){case 2:s.vertexAttrib2fv(le.location,te);break;case 3:s.vertexAttrib3fv(le.location,te);break;case 4:s.vertexAttrib4fv(le.location,te);break;default:s.vertexAttrib1fv(le.location,te)}}}}C()}function y(){V();for(const H in o){const W=o[H];for(const ee in W){const ae=W[ee];for(const Q in ae)_(ae[Q].object),delete ae[Q];delete W[ee]}delete o[H]}}function L(H){if(o[H.id]===void 0)return;const W=o[H.id];for(const ee in W){const ae=W[ee];for(const Q in ae)_(ae[Q].object),delete ae[Q];delete W[ee]}delete o[H.id]}function K(H){for(const W in o){const ee=o[W];if(ee[H.id]===void 0)continue;const ae=ee[H.id];for(const Q in ae)_(ae[Q].object),delete ae[Q];delete ee[H.id]}}function V(){O(),u=!0,l!==c&&(l=c,p(l.object))}function O(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:h,reset:V,resetDefaultState:O,dispose:y,releaseStatesOfGeometry:L,releaseStatesOfProgram:K,initAttributes:S,enableAttribute:M,disableUnusedAttributes:C}}function Lp(s,e,t,n){const i=n.isWebGL2;let r;function a(l){r=l}function o(l,u){s.drawArrays(r,l,u),t.update(u,r,1)}function c(l,u,h){if(h===0)return;let d,p;if(i)d=s,p="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),p="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[p](r,l,u,h),t.update(u,r,h)}this.setMode=a,this.render=o,this.renderInstances=c}function Rp(s,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(P){if(P==="highp"){if(s.getShaderPrecisionFormat(35633,36338).precision>0&&s.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";P="mediump"}return P==="mediump"&&s.getShaderPrecisionFormat(35633,36337).precision>0&&s.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const c=r(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);const l=a||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=s.getParameter(34930),d=s.getParameter(35660),p=s.getParameter(3379),_=s.getParameter(34076),v=s.getParameter(34921),g=s.getParameter(36347),f=s.getParameter(36348),T=s.getParameter(36349),S=d>0,M=a||e.has("OES_texture_float"),E=S&&M,C=a?s.getParameter(36183):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:_,maxAttributes:v,maxVertexUniforms:g,maxVaryings:f,maxFragmentUniforms:T,vertexTextures:S,floatFragmentTextures:M,floatVertexTextures:E,maxSamples:C}}function Pp(s){const e=this;let t=null,n=0,i=!1,r=!1;const a=new hi,o=new qe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const p=h.length!==0||d||n!==0||i;return i=d,n=h.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,p){const _=h.clippingPlanes,v=h.clipIntersection,g=h.clipShadows,f=s.get(h);if(!i||_===null||_.length===0||r&&!g)r?u(null):l();else{const T=r?0:n,S=T*4;let M=f.clippingState||null;c.value=M,M=u(_,d,S,p);for(let E=0;E!==S;++E)M[E]=t[E];f.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=T}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,p,_){const v=h!==null?h.length:0;let g=null;if(v!==0){if(g=c.value,_!==!0||g===null){const f=p+v*4,T=d.matrixWorldInverse;o.getNormalMatrix(T),(g===null||g.length<f)&&(g=new Float32Array(f));for(let S=0,M=p;S!==v;++S,M+=4)a.copy(h[S]).applyMatrix4(T,o),a.normal.toArray(g,M),g[M+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}function Ip(s){let e=new WeakMap;function t(a,o){return o===Pa?a.mapping=rr:o===Ia&&(a.mapping=sr),a}function n(a){if(a&&a.isTexture&&a.isRenderTargetTexture===!1){const o=a.mapping;if(o===Pa||o===Ia)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new jh(c.height/2);return l.fromEquirectangularTexture(s,a),e.set(a,l),a.addEventListener("dispose",i),t(l.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Qa extends Oc{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const $i=4,ol=[.125,.215,.35,.446,.526,.582],fi=20,da=new Qa,ll=new Fe;let fa=null;const di=(1+Math.sqrt(5))/2,Hi=1/di,cl=[new D(1,1,1),new D(-1,1,1),new D(1,1,-1),new D(-1,1,-1),new D(0,di,Hi),new D(0,di,-Hi),new D(Hi,0,di),new D(-Hi,0,di),new D(di,Hi,0),new D(-di,Hi,0)];class ul{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){fa=this._renderer.getRenderTarget(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=dl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(fa),e.scissorTest=!1,ms(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===rr||e.mapping===sr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fa=this._renderer.getRenderTarget();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:bt,minFilter:bt,generateMipmaps:!1,type:Fn,format:en,encoding:xi,depthBuffer:!1},i=hl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hl(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Dp(r)),this._blurMaterial=Up(r,e,t)}return i}_compileMaterial(e){const t=new tt(this._lodPlanes[0],e);this._renderer.compile(t,da)}_sceneToCubeUV(e,t,n,i){const o=new kt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(ll),u.toneMapping=zn,u.autoClear=!1;const p=new Bn({name:"PMREM.Background",side:jt,depthWrite:!1,depthTest:!1}),_=new tt(new Ht,p);let v=!1;const g=e.background;g?g.isColor&&(p.color.copy(g),e.background=null,v=!0):(p.color.copy(ll),v=!0);for(let f=0;f<6;f++){const T=f%3;T===0?(o.up.set(0,c[f],0),o.lookAt(l[f],0,0)):T===1?(o.up.set(0,0,c[f]),o.lookAt(0,l[f],0)):(o.up.set(0,c[f],0),o.lookAt(0,0,l[f]));const S=this._cubeSize;ms(i,T*S,f>2?S:0,S,S),u.setRenderTarget(i),v&&u.render(_,o),u.render(e,o)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=d,u.autoClear=h,e.background=g}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===rr||e.mapping===sr;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=fl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=dl());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new tt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;ms(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,da)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),a=cl[(i-1)%cl.length];this._blur(e,i-1,i,r,a)}t.autoClear=n}_blur(e,t,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new tt(this._lodPlanes[i],l),d=l.uniforms,p=this._sizeLods[n]-1,_=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*fi-1),v=r/_,g=isFinite(r)?1+Math.floor(u*v):fi;g>fi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${fi}`);const f=[];let T=0;for(let P=0;P<fi;++P){const I=P/v,y=Math.exp(-I*I/2);f.push(y),P===0?T+=y:P<g&&(T+=2*y)}for(let P=0;P<f.length;P++)f[P]=f[P]/T;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=f,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:S}=this;d.dTheta.value=_,d.mipInt.value=S-n;const M=this._sizeLods[i],E=3*M*(i>S-$i?i-S+$i:0),C=4*(this._cubeSize-M);ms(t,E,C,3*M,2*M),c.setRenderTarget(t),c.render(h,da)}}function Dp(s){const e=[],t=[],n=[];let i=s;const r=s-$i+1+ol.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);t.push(o);let c=1/o;a>s-$i?c=ol[a-s+$i-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,h=1+l,d=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,_=6,v=3,g=2,f=1,T=new Float32Array(v*_*p),S=new Float32Array(g*_*p),M=new Float32Array(f*_*p);for(let C=0;C<p;C++){const P=C%3*2/3-1,I=C>2?0:-1,y=[P,I,0,P+2/3,I,0,P+2/3,I+1,0,P,I,0,P+2/3,I+1,0,P,I+1,0];T.set(y,v*_*C),S.set(d,g*_*C);const L=[C,C,C,C,C,C];M.set(L,f*_*C)}const E=new fn;E.setAttribute("position",new Gt(T,v)),E.setAttribute("uv",new Gt(S,g)),E.setAttribute("faceIndex",new Gt(M,f)),e.push(E),i>$i&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function hl(s,e,t){const n=new Mi(s,e,t);return n.texture.mapping=Fs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ms(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Up(s,e,t){const n=new Float32Array(fi),i=new D(0,1,0);return new yi({name:"SphericalGaussianBlur",defines:{n:fi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:eo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function dl(){return new yi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:eo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function fl(){return new yi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:eo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function eo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Np(s){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===Pa||c===Ia,u=c===rr||c===sr;if(l||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return t===null&&(t=new ul(s)),h=l?t.fromEquirectangular(o,h):t.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{const h=o.image;if(l&&h&&h.height>0||u&&h&&i(h)){t===null&&(t=new ul(s));const d=l?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",r),d.texture}else return null}}}return o}function i(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Fp(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Op(s,e,t,n){const i={},r=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const _ in d.attributes)e.remove(d.attributes[_]);d.removeEventListener("dispose",a),delete i[d.id];const p=r.get(d);p&&(e.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function c(h){const d=h.attributes;for(const _ in d)e.update(d[_],34962);const p=h.morphAttributes;for(const _ in p){const v=p[_];for(let g=0,f=v.length;g<f;g++)e.update(v[g],34962)}}function l(h){const d=[],p=h.index,_=h.attributes.position;let v=0;if(p!==null){const T=p.array;v=p.version;for(let S=0,M=T.length;S<M;S+=3){const E=T[S+0],C=T[S+1],P=T[S+2];d.push(E,C,C,P,P,E)}}else{const T=_.array;v=_.version;for(let S=0,M=T.length/3-1;S<M;S+=3){const E=S+0,C=S+1,P=S+2;d.push(E,C,C,P,P,E)}}const g=new(Lc(d)?Nc:Uc)(d,1);g.version=v;const f=r.get(h);f&&e.remove(f),r.set(h,g)}function u(h){const d=r.get(h);if(d){const p=h.index;p!==null&&d.version<p.version&&l(h)}else l(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function Bp(s,e,t,n){const i=n.isWebGL2;let r;function a(d){r=d}let o,c;function l(d){o=d.type,c=d.bytesPerElement}function u(d,p){s.drawElements(r,p,o,d*c),t.update(p,r,1)}function h(d,p,_){if(_===0)return;let v,g;if(i)v=s,g="drawElementsInstanced";else if(v=e.get("ANGLE_instanced_arrays"),g="drawElementsInstancedANGLE",v===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}v[g](r,p,o,d*c,_),t.update(p,r,_)}this.setMode=a,this.setIndex=l,this.render=u,this.renderInstances=h}function zp(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case 4:t.triangles+=o*(r/3);break;case 1:t.lines+=o*(r/2);break;case 3:t.lines+=o*(r-1);break;case 2:t.lines+=o*r;break;case 0:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.frame++,t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function kp(s,e){return s[0]-e[0]}function Hp(s,e){return Math.abs(e[1])-Math.abs(s[1])}function Gp(s,e,t){const n={},i=new Float32Array(8),r=new WeakMap,a=new lt,o=[];for(let l=0;l<8;l++)o[l]=[l,0];function c(l,u,h){const d=l.morphTargetInfluences;if(e.isWebGL2===!0){const _=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,v=_!==void 0?_.length:0;let g=r.get(u);if(g===void 0||g.count!==v){let W=function(){O.dispose(),r.delete(u),u.removeEventListener("dispose",W)};var p=W;g!==void 0&&g.texture.dispose();const S=u.morphAttributes.position!==void 0,M=u.morphAttributes.normal!==void 0,E=u.morphAttributes.color!==void 0,C=u.morphAttributes.position||[],P=u.morphAttributes.normal||[],I=u.morphAttributes.color||[];let y=0;S===!0&&(y=1),M===!0&&(y=2),E===!0&&(y=3);let L=u.attributes.position.count*y,K=1;L>e.maxTextureSize&&(K=Math.ceil(L/e.maxTextureSize),L=e.maxTextureSize);const V=new Float32Array(L*K*4*v),O=new Ic(V,L,K,v);O.type=xn,O.needsUpdate=!0;const H=y*4;for(let ee=0;ee<v;ee++){const ae=C[ee],Q=P[ee],pe=I[ee],ie=L*K*4*ee;for(let Pe=0;Pe<ae.count;Pe++){const le=Pe*H;S===!0&&(a.fromBufferAttribute(ae,Pe),V[ie+le+0]=a.x,V[ie+le+1]=a.y,V[ie+le+2]=a.z,V[ie+le+3]=0),M===!0&&(a.fromBufferAttribute(Q,Pe),V[ie+le+4]=a.x,V[ie+le+5]=a.y,V[ie+le+6]=a.z,V[ie+le+7]=0),E===!0&&(a.fromBufferAttribute(pe,Pe),V[ie+le+8]=a.x,V[ie+le+9]=a.y,V[ie+le+10]=a.z,V[ie+le+11]=pe.itemSize===4?a.w:1)}}g={count:v,texture:O,size:new Be(L,K)},r.set(u,g),u.addEventListener("dispose",W)}let f=0;for(let S=0;S<d.length;S++)f+=d[S];const T=u.morphTargetsRelative?1:1-f;h.getUniforms().setValue(s,"morphTargetBaseInfluence",T),h.getUniforms().setValue(s,"morphTargetInfluences",d),h.getUniforms().setValue(s,"morphTargetsTexture",g.texture,t),h.getUniforms().setValue(s,"morphTargetsTextureSize",g.size)}else{const _=d===void 0?0:d.length;let v=n[u.id];if(v===void 0||v.length!==_){v=[];for(let M=0;M<_;M++)v[M]=[M,0];n[u.id]=v}for(let M=0;M<_;M++){const E=v[M];E[0]=M,E[1]=d[M]}v.sort(Hp);for(let M=0;M<8;M++)M<_&&v[M][1]?(o[M][0]=v[M][0],o[M][1]=v[M][1]):(o[M][0]=Number.MAX_SAFE_INTEGER,o[M][1]=0);o.sort(kp);const g=u.morphAttributes.position,f=u.morphAttributes.normal;let T=0;for(let M=0;M<8;M++){const E=o[M],C=E[0],P=E[1];C!==Number.MAX_SAFE_INTEGER&&P?(g&&u.getAttribute("morphTarget"+M)!==g[C]&&u.setAttribute("morphTarget"+M,g[C]),f&&u.getAttribute("morphNormal"+M)!==f[C]&&u.setAttribute("morphNormal"+M,f[C]),i[M]=P,T+=P):(g&&u.hasAttribute("morphTarget"+M)===!0&&u.deleteAttribute("morphTarget"+M),f&&u.hasAttribute("morphNormal"+M)===!0&&u.deleteAttribute("morphNormal"+M),i[M]=0)}const S=u.morphTargetsRelative?1:1-T;h.getUniforms().setValue(s,"morphTargetBaseInfluence",S),h.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:c}}function Vp(s,e,t,n){let i=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=e.get(c,u);return i.get(h)!==l&&(e.update(h),i.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),t.update(c.instanceMatrix,34962),c.instanceColor!==null&&t.update(c.instanceColor,34962)),h}function a(){i=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}const kc=new It,Hc=new Ic,Gc=new Ch,Vc=new Bc,pl=[],ml=[],gl=new Float32Array(16),_l=new Float32Array(9),vl=new Float32Array(4);function fr(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=pl[i];if(r===void 0&&(r=new Float32Array(i),pl[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Tt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Et(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Bs(s,e){let t=ml[e];t===void 0&&(t=new Int32Array(e),ml[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Wp(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Xp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;s.uniform2fv(this.addr,e),Et(t,e)}}function qp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Tt(t,e))return;s.uniform3fv(this.addr,e),Et(t,e)}}function jp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;s.uniform4fv(this.addr,e),Et(t,e)}}function Kp(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Tt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Et(t,e)}else{if(Tt(t,n))return;vl.set(n),s.uniformMatrix2fv(this.addr,!1,vl),Et(t,n)}}function Yp(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Tt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Et(t,e)}else{if(Tt(t,n))return;_l.set(n),s.uniformMatrix3fv(this.addr,!1,_l),Et(t,n)}}function Zp(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Tt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Et(t,e)}else{if(Tt(t,n))return;gl.set(n),s.uniformMatrix4fv(this.addr,!1,gl),Et(t,n)}}function $p(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Jp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;s.uniform2iv(this.addr,e),Et(t,e)}}function Qp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tt(t,e))return;s.uniform3iv(this.addr,e),Et(t,e)}}function em(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;s.uniform4iv(this.addr,e),Et(t,e)}}function tm(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function nm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;s.uniform2uiv(this.addr,e),Et(t,e)}}function im(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tt(t,e))return;s.uniform3uiv(this.addr,e),Et(t,e)}}function rm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;s.uniform4uiv(this.addr,e),Et(t,e)}}function sm(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2D(e||kc,i)}function am(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Gc,i)}function om(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Vc,i)}function lm(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Hc,i)}function cm(s){switch(s){case 5126:return Wp;case 35664:return Xp;case 35665:return qp;case 35666:return jp;case 35674:return Kp;case 35675:return Yp;case 35676:return Zp;case 5124:case 35670:return $p;case 35667:case 35671:return Jp;case 35668:case 35672:return Qp;case 35669:case 35673:return em;case 5125:return tm;case 36294:return nm;case 36295:return im;case 36296:return rm;case 35678:case 36198:case 36298:case 36306:case 35682:return sm;case 35679:case 36299:case 36307:return am;case 35680:case 36300:case 36308:case 36293:return om;case 36289:case 36303:case 36311:case 36292:return lm}}function um(s,e){s.uniform1fv(this.addr,e)}function hm(s,e){const t=fr(e,this.size,2);s.uniform2fv(this.addr,t)}function dm(s,e){const t=fr(e,this.size,3);s.uniform3fv(this.addr,t)}function fm(s,e){const t=fr(e,this.size,4);s.uniform4fv(this.addr,t)}function pm(s,e){const t=fr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function mm(s,e){const t=fr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function gm(s,e){const t=fr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function _m(s,e){s.uniform1iv(this.addr,e)}function vm(s,e){s.uniform2iv(this.addr,e)}function xm(s,e){s.uniform3iv(this.addr,e)}function Mm(s,e){s.uniform4iv(this.addr,e)}function ym(s,e){s.uniform1uiv(this.addr,e)}function Sm(s,e){s.uniform2uiv(this.addr,e)}function wm(s,e){s.uniform3uiv(this.addr,e)}function bm(s,e){s.uniform4uiv(this.addr,e)}function Tm(s,e,t){const n=this.cache,i=e.length,r=Bs(t,i);Tt(n,r)||(s.uniform1iv(this.addr,r),Et(n,r));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||kc,r[a])}function Em(s,e,t){const n=this.cache,i=e.length,r=Bs(t,i);Tt(n,r)||(s.uniform1iv(this.addr,r),Et(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Gc,r[a])}function Am(s,e,t){const n=this.cache,i=e.length,r=Bs(t,i);Tt(n,r)||(s.uniform1iv(this.addr,r),Et(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Vc,r[a])}function Cm(s,e,t){const n=this.cache,i=e.length,r=Bs(t,i);Tt(n,r)||(s.uniform1iv(this.addr,r),Et(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Hc,r[a])}function Lm(s){switch(s){case 5126:return um;case 35664:return hm;case 35665:return dm;case 35666:return fm;case 35674:return pm;case 35675:return mm;case 35676:return gm;case 5124:case 35670:return _m;case 35667:case 35671:return vm;case 35668:case 35672:return xm;case 35669:case 35673:return Mm;case 5125:return ym;case 36294:return Sm;case 36295:return wm;case 36296:return bm;case 35678:case 36198:case 36298:case 36306:case 35682:return Tm;case 35679:case 36299:case 36307:return Em;case 35680:case 36300:case 36308:case 36293:return Am;case 36289:case 36303:case 36311:case 36292:return Cm}}class Rm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.setValue=cm(t.type)}}class Pm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.size=t.size,this.setValue=Lm(t.type)}}class Im{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(e,t[o.id],n)}}}const pa=/(\w+)(\])?(\[|\.)?/g;function xl(s,e){s.seq.push(e),s.map[e.id]=e}function Dm(s,e,t){const n=s.name,i=n.length;for(pa.lastIndex=0;;){const r=pa.exec(n),a=pa.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){xl(t,l===void 0?new Rm(o,s,e):new Pm(o,s,e));break}else{let h=t.map[o];h===void 0&&(h=new Im(o),xl(t,h)),t=h}}}class Ls{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,35718);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),a=e.getUniformLocation(t,r.name);Dm(r,a,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Ml(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}let Um=0;function Nm(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function Fm(s){switch(s){case xi:return["Linear","( value )"];case et:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",s),["Linear","( value )"]}}function yl(s,e,t){const n=s.getShaderParameter(e,35713),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+Nm(s.getShaderSource(e),a)}else return i}function Om(s,e){const t=Fm(e);return"vec4 "+s+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function Bm(s,e){let t;switch(e){case Bu:t="Linear";break;case zu:t="Reinhard";break;case ku:t="OptimizedCineon";break;case Mc:t="ACESFilmic";break;case Hu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function zm(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ir).join(`
`)}function km(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Hm(s,e){const t={},n=s.getProgramParameter(e,35721);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),a=r.name;let o=1;r.type===35674&&(o=2),r.type===35675&&(o=3),r.type===35676&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function Ir(s){return s!==""}function Sl(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function wl(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Gm=/^[ \t]*#include +<([\w\d./]+)>/gm;function za(s){return s.replace(Gm,Vm)}function Vm(s,e){const t=Ve[e];if(t===void 0)throw new Error("Can not resolve #include <"+e+">");return za(t)}const Wm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bl(s){return s.replace(Wm,Xm)}function Xm(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Tl(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function qm(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===gc?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===_c?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Pr&&(e="SHADOWMAP_TYPE_VSM"),e}function jm(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case rr:case sr:e="ENVMAP_TYPE_CUBE";break;case Fs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Km(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case sr:e="ENVMAP_MODE_REFRACTION";break}return e}function Ym(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ka:e="ENVMAP_BLENDING_MULTIPLY";break;case Fu:e="ENVMAP_BLENDING_MIX";break;case Ou:e="ENVMAP_BLENDING_ADD";break}return e}function Zm(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function $m(s,e,t,n){const i=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=qm(t),l=jm(t),u=Km(t),h=Ym(t),d=Zm(t),p=t.isWebGL2?"":zm(t),_=km(r),v=i.createProgram();let g,f,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=[_].filter(Ir).join(`
`),g.length>0&&(g+=`
`),f=[p,_].filter(Ir).join(`
`),f.length>0&&(f+=`
`)):(g=[Tl(t),"#define SHADER_NAME "+t.shaderName,_,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs2?"#define USE_UV2":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ir).join(`
`),f=[p,Tl(t),"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs2?"#define USE_UV2":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==zn?"#define TONE_MAPPING":"",t.toneMapping!==zn?Ve.tonemapping_pars_fragment:"",t.toneMapping!==zn?Bm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.encodings_pars_fragment,Om("linearToOutputTexel",t.outputEncoding),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ir).join(`
`)),a=za(a),a=Sl(a,t),a=wl(a,t),o=za(o),o=Sl(o,t),o=wl(o,t),a=bl(a),o=bl(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,g=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",t.glslVersion===Wo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Wo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const S=T+g+a,M=T+f+o,E=Ml(i,35633,S),C=Ml(i,35632,M);if(i.attachShader(v,E),i.attachShader(v,C),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v),s.debug.checkShaderErrors){const y=i.getProgramInfoLog(v).trim(),L=i.getShaderInfoLog(E).trim(),K=i.getShaderInfoLog(C).trim();let V=!0,O=!0;if(i.getProgramParameter(v,35714)===!1)if(V=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,v,E,C);else{const H=yl(i,E,"vertex"),W=yl(i,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,35715)+`

Program Info Log: `+y+`
`+H+`
`+W)}else y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",y):(L===""||K==="")&&(O=!1);O&&(this.diagnostics={runnable:V,programLog:y,vertexShader:{log:L,prefix:g},fragmentShader:{log:K,prefix:f}})}i.deleteShader(E),i.deleteShader(C);let P;this.getUniforms=function(){return P===void 0&&(P=new Ls(i,v)),P};let I;return this.getAttributes=function(){return I===void 0&&(I=Hm(i,v)),I},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.name=t.shaderName,this.id=Um++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=E,this.fragmentShader=C,this}let Jm=0;class Qm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new eg(e),t.set(e,n)),n}}class eg{constructor(e){this.id=Jm++,this.code=e,this.usedTimes=0}}function tg(s,e,t,n,i,r,a){const o=new $a,c=new Qm,l=[],u=i.isWebGL2,h=i.logarithmicDepthBuffer,d=i.vertexTextures;let p=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return y===1?"uv2":"uv"}function g(y,L,K,V,O){const H=V.fog,W=O.geometry,ee=y.isMeshStandardMaterial?V.environment:null,ae=(y.isMeshStandardMaterial?t:e).get(y.envMap||ee),Q=ae&&ae.mapping===Fs?ae.image.height:null,pe=_[y.type];y.precision!==null&&(p=i.getMaxPrecision(y.precision),p!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));const ie=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Pe=ie!==void 0?ie.length:0;let le=0;W.morphAttributes.position!==void 0&&(le=1),W.morphAttributes.normal!==void 0&&(le=2),W.morphAttributes.color!==void 0&&(le=3);let j,te,ge,ce;if(pe){const Me=bn[pe];j=Me.vertexShader,te=Me.fragmentShader}else j=y.vertexShader,te=y.fragmentShader,c.update(y),ge=c.getVertexShaderID(y),ce=c.getFragmentShaderID(y);const X=s.getRenderTarget(),Re=O.isInstancedMesh===!0,Ue=!!y.map,_e=!!y.matcap,Ie=!!ae,Ze=!!y.aoMap,Ae=!!y.lightMap,He=!!y.bumpMap,_t=!!y.normalMap,St=!!y.displacementMap,xt=!!y.emissiveMap,vt=!!y.metalnessMap,$e=!!y.roughnessMap,dt=y.clearcoat>0,Ut=y.iridescence>0,R=y.sheen>0,w=y.transmission>0,Y=dt&&!!y.clearcoatMap,oe=dt&&!!y.clearcoatNormalMap,de=dt&&!!y.clearcoatRoughnessMap,xe=Ut&&!!y.iridescenceMap,De=Ut&&!!y.iridescenceThicknessMap,ye=R&&!!y.sheenColorMap,J=R&&!!y.sheenRoughnessMap,be=!!y.specularMap,Le=!!y.specularColorMap,Ce=!!y.specularIntensityMap,me=w&&!!y.transmissionMap,we=w&&!!y.thicknessMap,ze=!!y.gradientMap,ke=!!y.alphaMap,We=y.alphaTest>0,F=!!y.extensions,N=!!W.attributes.uv2;return{isWebGL2:u,shaderID:pe,shaderName:y.type,vertexShader:j,fragmentShader:te,defines:y.defines,customVertexShaderID:ge,customFragmentShaderID:ce,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,instancing:Re,instancingColor:Re&&O.instanceColor!==null,supportsVertexTextures:d,outputEncoding:X===null?s.outputEncoding:X.isXRRenderTarget===!0?X.texture.encoding:xi,map:Ue,matcap:_e,envMap:Ie,envMapMode:Ie&&ae.mapping,envMapCubeUVHeight:Q,aoMap:Ze,lightMap:Ae,bumpMap:He,normalMap:_t,displacementMap:d&&St,emissiveMap:xt,normalMapObjectSpace:_t&&y.normalMapType===ah,normalMapTangentSpace:_t&&y.normalMapType===Ya,decodeVideoTexture:Ue&&y.map.isVideoTexture===!0&&y.map.encoding===et,metalnessMap:vt,roughnessMap:$e,clearcoat:dt,clearcoatMap:Y,clearcoatNormalMap:oe,clearcoatRoughnessMap:de,iridescence:Ut,iridescenceMap:xe,iridescenceThicknessMap:De,sheen:R,sheenColorMap:ye,sheenRoughnessMap:J,specularMap:be,specularColorMap:Le,specularIntensityMap:Ce,transmission:w,transmissionMap:me,thicknessMap:we,gradientMap:ze,opaque:y.transparent===!1&&y.blending===Qi,alphaMap:ke,alphaTest:We,combine:y.combine,mapUv:Ue&&v(y.map.channel),aoMapUv:Ze&&v(y.aoMap.channel),lightMapUv:Ae&&v(y.lightMap.channel),bumpMapUv:He&&v(y.bumpMap.channel),normalMapUv:_t&&v(y.normalMap.channel),displacementMapUv:St&&v(y.displacementMap.channel),emissiveMapUv:xt&&v(y.emissiveMap.channel),metalnessMapUv:vt&&v(y.metalnessMap.channel),roughnessMapUv:$e&&v(y.roughnessMap.channel),clearcoatMapUv:Y&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:oe&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:de&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:xe&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:De&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:ye&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:J&&v(y.sheenRoughnessMap.channel),specularMapUv:be&&v(y.specularMap.channel),specularColorMapUv:Le&&v(y.specularColorMap.channel),specularIntensityMapUv:Ce&&v(y.specularIntensityMap.channel),transmissionMapUv:me&&v(y.transmissionMap.channel),thicknessMapUv:we&&v(y.thicknessMap.channel),alphaMapUv:ke&&v(y.alphaMap.channel),vertexTangents:_t&&!!W.attributes.tangent,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,vertexUvs2:N,pointsUvs:O.isPoints===!0&&!!W.attributes.uv&&(Ue||ke),fog:!!H,useFog:y.fog===!0,fogExp2:H&&H.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:O.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:Pe,morphTextureStride:le,numDirLights:L.directional.length,numPointLights:L.point.length,numSpotLights:L.spot.length,numSpotLightMaps:L.spotLightMap.length,numRectAreaLights:L.rectArea.length,numHemiLights:L.hemi.length,numDirLightShadows:L.directionalShadowMap.length,numPointLightShadows:L.pointShadowMap.length,numSpotLightShadows:L.spotShadowMap.length,numSpotLightShadowsWithMaps:L.numSpotLightShadowsWithMaps,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:s.shadowMap.enabled&&K.length>0,shadowMapType:s.shadowMap.type,toneMapping:y.toneMapped?s.toneMapping:zn,useLegacyLights:s.useLegacyLights,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Qt,flipSided:y.side===jt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:F&&y.extensions.derivatives===!0,extensionFragDepth:F&&y.extensions.fragDepth===!0,extensionDrawBuffers:F&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:F&&y.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),customProgramCacheKey:y.customProgramCacheKey()}}function f(y){const L=[];if(y.shaderID?L.push(y.shaderID):(L.push(y.customVertexShaderID),L.push(y.customFragmentShaderID)),y.defines!==void 0)for(const K in y.defines)L.push(K),L.push(y.defines[K]);return y.isRawShaderMaterial===!1&&(T(L,y),S(L,y),L.push(s.outputEncoding)),L.push(y.customProgramCacheKey),L.join()}function T(y,L){y.push(L.precision),y.push(L.outputEncoding),y.push(L.envMapMode),y.push(L.envMapCubeUVHeight),y.push(L.mapUv),y.push(L.alphaMapUv),y.push(L.lightMapUv),y.push(L.aoMapUv),y.push(L.bumpMapUv),y.push(L.normalMapUv),y.push(L.displacementMapUv),y.push(L.emissiveMapUv),y.push(L.metalnessMapUv),y.push(L.roughnessMapUv),y.push(L.clearcoatMapUv),y.push(L.clearcoatNormalMapUv),y.push(L.clearcoatRoughnessMapUv),y.push(L.iridescenceMapUv),y.push(L.iridescenceThicknessMapUv),y.push(L.sheenColorMapUv),y.push(L.sheenRoughnessMapUv),y.push(L.specularMapUv),y.push(L.specularColorMapUv),y.push(L.specularIntensityMapUv),y.push(L.transmissionMapUv),y.push(L.thicknessMapUv),y.push(L.combine),y.push(L.fogExp2),y.push(L.sizeAttenuation),y.push(L.morphTargetsCount),y.push(L.morphAttributeCount),y.push(L.numDirLights),y.push(L.numPointLights),y.push(L.numSpotLights),y.push(L.numSpotLightMaps),y.push(L.numHemiLights),y.push(L.numRectAreaLights),y.push(L.numDirLightShadows),y.push(L.numPointLightShadows),y.push(L.numSpotLightShadows),y.push(L.numSpotLightShadowsWithMaps),y.push(L.shadowMapType),y.push(L.toneMapping),y.push(L.numClippingPlanes),y.push(L.numClipIntersection),y.push(L.depthPacking)}function S(y,L){o.disableAll(),L.isWebGL2&&o.enable(0),L.supportsVertexTextures&&o.enable(1),L.instancing&&o.enable(2),L.instancingColor&&o.enable(3),L.matcap&&o.enable(4),L.envMap&&o.enable(5),L.normalMapObjectSpace&&o.enable(6),L.normalMapTangentSpace&&o.enable(7),L.clearcoat&&o.enable(8),L.iridescence&&o.enable(9),L.alphaTest&&o.enable(10),L.vertexColors&&o.enable(11),L.vertexAlphas&&o.enable(12),L.vertexUvs2&&o.enable(13),L.vertexTangents&&o.enable(14),y.push(o.mask),o.disableAll(),L.fog&&o.enable(0),L.useFog&&o.enable(1),L.flatShading&&o.enable(2),L.logarithmicDepthBuffer&&o.enable(3),L.skinning&&o.enable(4),L.morphTargets&&o.enable(5),L.morphNormals&&o.enable(6),L.morphColors&&o.enable(7),L.premultipliedAlpha&&o.enable(8),L.shadowMapEnabled&&o.enable(9),L.useLegacyLights&&o.enable(10),L.doubleSided&&o.enable(11),L.flipSided&&o.enable(12),L.useDepthPacking&&o.enable(13),L.dithering&&o.enable(14),L.transmission&&o.enable(15),L.sheen&&o.enable(16),L.decodeVideoTexture&&o.enable(17),L.opaque&&o.enable(18),L.pointsUvs&&o.enable(19),y.push(o.mask)}function M(y){const L=_[y.type];let K;if(L){const V=bn[L];K=Vh.clone(V.uniforms)}else K=y.uniforms;return K}function E(y,L){let K;for(let V=0,O=l.length;V<O;V++){const H=l[V];if(H.cacheKey===L){K=H,++K.usedTimes;break}}return K===void 0&&(K=new $m(s,L,y,r),l.push(K)),K}function C(y){if(--y.usedTimes===0){const L=l.indexOf(y);l[L]=l[l.length-1],l.pop(),y.destroy()}}function P(y){c.remove(y)}function I(){c.dispose()}return{getParameters:g,getProgramCacheKey:f,getUniforms:M,acquireProgram:E,releaseProgram:C,releaseShaderCache:P,programs:l,dispose:I}}function ng(){let s=new WeakMap;function e(r){let a=s.get(r);return a===void 0&&(a={},s.set(r,a)),a}function t(r){s.delete(r)}function n(r,a,o){s.get(r)[a]=o}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function ig(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function El(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Al(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(h,d,p,_,v,g){let f=s[e];return f===void 0?(f={id:h.id,object:h,geometry:d,material:p,groupOrder:_,renderOrder:h.renderOrder,z:v,group:g},s[e]=f):(f.id=h.id,f.object=h,f.geometry=d,f.material=p,f.groupOrder=_,f.renderOrder=h.renderOrder,f.z=v,f.group=g),e++,f}function o(h,d,p,_,v,g){const f=a(h,d,p,_,v,g);p.transmission>0?n.push(f):p.transparent===!0?i.push(f):t.push(f)}function c(h,d,p,_,v,g){const f=a(h,d,p,_,v,g);p.transmission>0?n.unshift(f):p.transparent===!0?i.unshift(f):t.unshift(f)}function l(h,d){t.length>1&&t.sort(h||ig),n.length>1&&n.sort(d||El),i.length>1&&i.sort(d||El)}function u(){for(let h=e,d=s.length;h<d;h++){const p=s[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:o,unshift:c,finish:u,sort:l}}function rg(){let s=new WeakMap;function e(n,i){const r=s.get(n);let a;return r===void 0?(a=new Al,s.set(n,[a])):i>=r.length?(a=new Al,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function sg(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new Fe};break;case"SpotLight":t={position:new D,direction:new D,color:new Fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new Fe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new Fe,groundColor:new Fe};break;case"RectAreaLight":t={color:new Fe,position:new D,halfWidth:new D,halfHeight:new D};break}return s[e.id]=t,t}}}function ag(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let og=0;function lg(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function cg(s,e){const t=new sg,n=ag(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let u=0;u<9;u++)i.probe.push(new D);const r=new D,a=new Xe,o=new Xe;function c(u,h){let d=0,p=0,_=0;for(let K=0;K<9;K++)i.probe[K].set(0,0,0);let v=0,g=0,f=0,T=0,S=0,M=0,E=0,C=0,P=0,I=0;u.sort(lg);const y=h===!0?Math.PI:1;for(let K=0,V=u.length;K<V;K++){const O=u[K],H=O.color,W=O.intensity,ee=O.distance,ae=O.shadow&&O.shadow.map?O.shadow.map.texture:null;if(O.isAmbientLight)d+=H.r*W*y,p+=H.g*W*y,_+=H.b*W*y;else if(O.isLightProbe)for(let Q=0;Q<9;Q++)i.probe[Q].addScaledVector(O.sh.coefficients[Q],W);else if(O.isDirectionalLight){const Q=t.get(O);if(Q.color.copy(O.color).multiplyScalar(O.intensity*y),O.castShadow){const pe=O.shadow,ie=n.get(O);ie.shadowBias=pe.bias,ie.shadowNormalBias=pe.normalBias,ie.shadowRadius=pe.radius,ie.shadowMapSize=pe.mapSize,i.directionalShadow[v]=ie,i.directionalShadowMap[v]=ae,i.directionalShadowMatrix[v]=O.shadow.matrix,M++}i.directional[v]=Q,v++}else if(O.isSpotLight){const Q=t.get(O);Q.position.setFromMatrixPosition(O.matrixWorld),Q.color.copy(H).multiplyScalar(W*y),Q.distance=ee,Q.coneCos=Math.cos(O.angle),Q.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),Q.decay=O.decay,i.spot[f]=Q;const pe=O.shadow;if(O.map&&(i.spotLightMap[P]=O.map,P++,pe.updateMatrices(O),O.castShadow&&I++),i.spotLightMatrix[f]=pe.matrix,O.castShadow){const ie=n.get(O);ie.shadowBias=pe.bias,ie.shadowNormalBias=pe.normalBias,ie.shadowRadius=pe.radius,ie.shadowMapSize=pe.mapSize,i.spotShadow[f]=ie,i.spotShadowMap[f]=ae,C++}f++}else if(O.isRectAreaLight){const Q=t.get(O);Q.color.copy(H).multiplyScalar(W),Q.halfWidth.set(O.width*.5,0,0),Q.halfHeight.set(0,O.height*.5,0),i.rectArea[T]=Q,T++}else if(O.isPointLight){const Q=t.get(O);if(Q.color.copy(O.color).multiplyScalar(O.intensity*y),Q.distance=O.distance,Q.decay=O.decay,O.castShadow){const pe=O.shadow,ie=n.get(O);ie.shadowBias=pe.bias,ie.shadowNormalBias=pe.normalBias,ie.shadowRadius=pe.radius,ie.shadowMapSize=pe.mapSize,ie.shadowCameraNear=pe.camera.near,ie.shadowCameraFar=pe.camera.far,i.pointShadow[g]=ie,i.pointShadowMap[g]=ae,i.pointShadowMatrix[g]=O.shadow.matrix,E++}i.point[g]=Q,g++}else if(O.isHemisphereLight){const Q=t.get(O);Q.skyColor.copy(O.color).multiplyScalar(W*y),Q.groundColor.copy(O.groundColor).multiplyScalar(W*y),i.hemi[S]=Q,S++}}T>0&&(e.isWebGL2||s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ve.LTC_FLOAT_1,i.rectAreaLTC2=ve.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=ve.LTC_HALF_1,i.rectAreaLTC2=ve.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=p,i.ambient[2]=_;const L=i.hash;(L.directionalLength!==v||L.pointLength!==g||L.spotLength!==f||L.rectAreaLength!==T||L.hemiLength!==S||L.numDirectionalShadows!==M||L.numPointShadows!==E||L.numSpotShadows!==C||L.numSpotMaps!==P)&&(i.directional.length=v,i.spot.length=f,i.rectArea.length=T,i.point.length=g,i.hemi.length=S,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=C,i.spotShadowMap.length=C,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=C+P-I,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=I,L.directionalLength=v,L.pointLength=g,L.spotLength=f,L.rectAreaLength=T,L.hemiLength=S,L.numDirectionalShadows=M,L.numPointShadows=E,L.numSpotShadows=C,L.numSpotMaps=P,i.version=og++)}function l(u,h){let d=0,p=0,_=0,v=0,g=0;const f=h.matrixWorldInverse;for(let T=0,S=u.length;T<S;T++){const M=u[T];if(M.isDirectionalLight){const E=i.directional[d];E.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(f),d++}else if(M.isSpotLight){const E=i.spot[_];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(f),E.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(f),_++}else if(M.isRectAreaLight){const E=i.rectArea[v];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(f),o.identity(),a.copy(M.matrixWorld),a.premultiply(f),o.extractRotation(a),E.halfWidth.set(M.width*.5,0,0),E.halfHeight.set(0,M.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),v++}else if(M.isPointLight){const E=i.point[p];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(f),p++}else if(M.isHemisphereLight){const E=i.hemi[g];E.direction.setFromMatrixPosition(M.matrixWorld),E.direction.transformDirection(f),g++}}}return{setup:c,setupView:l,state:i}}function Cl(s,e){const t=new cg(s,e),n=[],i=[];function r(){n.length=0,i.length=0}function a(h){n.push(h)}function o(h){i.push(h)}function c(h){t.setup(n,h)}function l(h){t.setupView(n,h)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function ug(s,e){let t=new WeakMap;function n(r,a=0){const o=t.get(r);let c;return o===void 0?(c=new Cl(s,e),t.set(r,[c])):a>=o.length?(c=new Cl(s,e),o.push(c)):c=o[a],c}function i(){t=new WeakMap}return{get:n,dispose:i}}class hg extends hn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=rh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class dg extends hn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const fg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function mg(s,e,t){let n=new Ja;const i=new Be,r=new Be,a=new lt,o=new hg({depthPacking:sh}),c=new dg,l={},u=t.maxTextureSize,h={[En]:jt,[jt]:En,[Qt]:Qt},d=new yi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Be},radius:{value:4}},vertexShader:fg,fragmentShader:pg}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const _=new fn;_.setAttribute("position",new Gt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new tt(_,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=gc,this.render=function(M,E,C){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||M.length===0)return;const P=s.getRenderTarget(),I=s.getActiveCubeFace(),y=s.getActiveMipmapLevel(),L=s.state;L.setBlending(ei),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);for(let K=0,V=M.length;K<V;K++){const O=M[K],H=O.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",O,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);const W=H.getFrameExtents();if(i.multiply(W),r.copy(H.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/W.x),i.x=r.x*W.x,H.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/W.y),i.y=r.y*W.y,H.mapSize.y=r.y)),H.map===null){const ae=this.type!==Pr?{minFilter:Rt,magFilter:Rt}:{};H.map=new Mi(i.x,i.y,ae),H.map.texture.name=O.name+".shadowMap",H.camera.updateProjectionMatrix()}s.setRenderTarget(H.map),s.clear();const ee=H.getViewportCount();for(let ae=0;ae<ee;ae++){const Q=H.getViewport(ae);a.set(r.x*Q.x,r.y*Q.y,r.x*Q.z,r.y*Q.w),L.viewport(a),H.updateMatrices(O,ae),n=H.getFrustum(),S(E,C,H.camera,O,this.type)}H.isPointLightShadow!==!0&&this.type===Pr&&f(H,C),H.needsUpdate=!1}g.needsUpdate=!1,s.setRenderTarget(P,I,y)};function f(M,E){const C=e.update(v);d.defines.VSM_SAMPLES!==M.blurSamples&&(d.defines.VSM_SAMPLES=M.blurSamples,p.defines.VSM_SAMPLES=M.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new Mi(i.x,i.y)),d.uniforms.shadow_pass.value=M.map.texture,d.uniforms.resolution.value=M.mapSize,d.uniforms.radius.value=M.radius,s.setRenderTarget(M.mapPass),s.clear(),s.renderBufferDirect(E,null,C,d,v,null),p.uniforms.shadow_pass.value=M.mapPass.texture,p.uniforms.resolution.value=M.mapSize,p.uniforms.radius.value=M.radius,s.setRenderTarget(M.map),s.clear(),s.renderBufferDirect(E,null,C,p,v,null)}function T(M,E,C,P){let I=null;const y=C.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(y!==void 0)I=y;else if(I=C.isPointLight===!0?c:o,s.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const L=I.uuid,K=E.uuid;let V=l[L];V===void 0&&(V={},l[L]=V);let O=V[K];O===void 0&&(O=I.clone(),V[K]=O),I=O}if(I.visible=E.visible,I.wireframe=E.wireframe,P===Pr?I.side=E.shadowSide!==null?E.shadowSide:E.side:I.side=E.shadowSide!==null?E.shadowSide:h[E.side],I.alphaMap=E.alphaMap,I.alphaTest=E.alphaTest,I.map=E.map,I.clipShadows=E.clipShadows,I.clippingPlanes=E.clippingPlanes,I.clipIntersection=E.clipIntersection,I.displacementMap=E.displacementMap,I.displacementScale=E.displacementScale,I.displacementBias=E.displacementBias,I.wireframeLinewidth=E.wireframeLinewidth,I.linewidth=E.linewidth,C.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const L=s.properties.get(I);L.light=C}return I}function S(M,E,C,P,I){if(M.visible===!1)return;if(M.layers.test(E.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&I===Pr)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,M.matrixWorld);const K=e.update(M),V=M.material;if(Array.isArray(V)){const O=K.groups;for(let H=0,W=O.length;H<W;H++){const ee=O[H],ae=V[ee.materialIndex];if(ae&&ae.visible){const Q=T(M,ae,P,I);s.renderBufferDirect(C,null,K,Q,M,ee)}}}else if(V.visible){const O=T(M,V,P,I);s.renderBufferDirect(C,null,K,O,M,null)}}const L=M.children;for(let K=0,V=L.length;K<V;K++)S(L[K],E,C,P,I)}}function gg(s,e,t){const n=t.isWebGL2;function i(){let F=!1;const N=new lt;let re=null;const Me=new lt(0,0,0,0);return{setMask:function(Te){re!==Te&&!F&&(s.colorMask(Te,Te,Te,Te),re=Te)},setLocked:function(Te){F=Te},setClear:function(Te,st,ut,At,Sn){Sn===!0&&(Te*=At,st*=At,ut*=At),N.set(Te,st,ut,At),Me.equals(N)===!1&&(s.clearColor(Te,st,ut,At),Me.copy(N))},reset:function(){F=!1,re=null,Me.set(-1,0,0,0)}}}function r(){let F=!1,N=null,re=null,Me=null;return{setTest:function(Te){Te?X(2929):Re(2929)},setMask:function(Te){N!==Te&&!F&&(s.depthMask(Te),N=Te)},setFunc:function(Te){if(re!==Te){switch(Te){case Lu:s.depthFunc(512);break;case Ru:s.depthFunc(519);break;case Pu:s.depthFunc(513);break;case Ra:s.depthFunc(515);break;case Iu:s.depthFunc(514);break;case Du:s.depthFunc(518);break;case Uu:s.depthFunc(516);break;case Nu:s.depthFunc(517);break;default:s.depthFunc(515)}re=Te}},setLocked:function(Te){F=Te},setClear:function(Te){Me!==Te&&(s.clearDepth(Te),Me=Te)},reset:function(){F=!1,N=null,re=null,Me=null}}}function a(){let F=!1,N=null,re=null,Me=null,Te=null,st=null,ut=null,At=null,Sn=null;return{setTest:function(pt){F||(pt?X(2960):Re(2960))},setMask:function(pt){N!==pt&&!F&&(s.stencilMask(pt),N=pt)},setFunc:function(pt,Vt,tn){(re!==pt||Me!==Vt||Te!==tn)&&(s.stencilFunc(pt,Vt,tn),re=pt,Me=Vt,Te=tn)},setOp:function(pt,Vt,tn){(st!==pt||ut!==Vt||At!==tn)&&(s.stencilOp(pt,Vt,tn),st=pt,ut=Vt,At=tn)},setLocked:function(pt){F=pt},setClear:function(pt){Sn!==pt&&(s.clearStencil(pt),Sn=pt)},reset:function(){F=!1,N=null,re=null,Me=null,Te=null,st=null,ut=null,At=null,Sn=null}}}const o=new i,c=new r,l=new a,u=new WeakMap,h=new WeakMap;let d={},p={},_=new WeakMap,v=[],g=null,f=!1,T=null,S=null,M=null,E=null,C=null,P=null,I=null,y=!1,L=null,K=null,V=null,O=null,H=null;const W=s.getParameter(35661);let ee=!1,ae=0;const Q=s.getParameter(7938);Q.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec(Q)[1]),ee=ae>=1):Q.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),ee=ae>=2);let pe=null,ie={};const Pe=s.getParameter(3088),le=s.getParameter(2978),j=new lt().fromArray(Pe),te=new lt().fromArray(le);function ge(F,N,re){const Me=new Uint8Array(4),Te=s.createTexture();s.bindTexture(F,Te),s.texParameteri(F,10241,9728),s.texParameteri(F,10240,9728);for(let st=0;st<re;st++)s.texImage2D(N+st,0,6408,1,1,0,6408,5121,Me);return Te}const ce={};ce[3553]=ge(3553,3553,1),ce[34067]=ge(34067,34069,6),o.setClear(0,0,0,1),c.setClear(1),l.setClear(0),X(2929),c.setFunc(Ra),St(!1),xt(ho),X(2884),He(ei);function X(F){d[F]!==!0&&(s.enable(F),d[F]=!0)}function Re(F){d[F]!==!1&&(s.disable(F),d[F]=!1)}function Ue(F,N){return p[F]!==N?(s.bindFramebuffer(F,N),p[F]=N,n&&(F===36009&&(p[36160]=N),F===36160&&(p[36009]=N)),!0):!1}function _e(F,N){let re=v,Me=!1;if(F)if(re=_.get(N),re===void 0&&(re=[],_.set(N,re)),F.isWebGLMultipleRenderTargets){const Te=F.texture;if(re.length!==Te.length||re[0]!==36064){for(let st=0,ut=Te.length;st<ut;st++)re[st]=36064+st;re.length=Te.length,Me=!0}}else re[0]!==36064&&(re[0]=36064,Me=!0);else re[0]!==1029&&(re[0]=1029,Me=!0);Me&&(t.isWebGL2?s.drawBuffers(re):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(re))}function Ie(F){return g!==F?(s.useProgram(F),g=F,!0):!1}const Ze={[Zi]:32774,[vu]:32778,[xu]:32779};if(n)Ze[go]=32775,Ze[_o]=32776;else{const F=e.get("EXT_blend_minmax");F!==null&&(Ze[go]=F.MIN_EXT,Ze[_o]=F.MAX_EXT)}const Ae={[Mu]:0,[yu]:1,[Su]:768,[vc]:770,[Cu]:776,[Eu]:774,[bu]:772,[wu]:769,[xc]:771,[Au]:775,[Tu]:773};function He(F,N,re,Me,Te,st,ut,At){if(F===ei){f===!0&&(Re(3042),f=!1);return}if(f===!1&&(X(3042),f=!0),F!==_u){if(F!==T||At!==y){if((S!==Zi||C!==Zi)&&(s.blendEquation(32774),S=Zi,C=Zi),At)switch(F){case Qi:s.blendFuncSeparate(1,771,1,771);break;case fo:s.blendFunc(1,1);break;case po:s.blendFuncSeparate(0,769,0,1);break;case mo:s.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Qi:s.blendFuncSeparate(770,771,1,771);break;case fo:s.blendFunc(770,1);break;case po:s.blendFuncSeparate(0,769,0,1);break;case mo:s.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}M=null,E=null,P=null,I=null,T=F,y=At}return}Te=Te||N,st=st||re,ut=ut||Me,(N!==S||Te!==C)&&(s.blendEquationSeparate(Ze[N],Ze[Te]),S=N,C=Te),(re!==M||Me!==E||st!==P||ut!==I)&&(s.blendFuncSeparate(Ae[re],Ae[Me],Ae[st],Ae[ut]),M=re,E=Me,P=st,I=ut),T=F,y=!1}function _t(F,N){F.side===Qt?Re(2884):X(2884);let re=F.side===jt;N&&(re=!re),St(re),F.blending===Qi&&F.transparent===!1?He(ei):He(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.premultipliedAlpha),c.setFunc(F.depthFunc),c.setTest(F.depthTest),c.setMask(F.depthWrite),o.setMask(F.colorWrite);const Me=F.stencilWrite;l.setTest(Me),Me&&(l.setMask(F.stencilWriteMask),l.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),l.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),$e(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?X(32926):Re(32926)}function St(F){L!==F&&(F?s.frontFace(2304):s.frontFace(2305),L=F)}function xt(F){F!==mu?(X(2884),F!==K&&(F===ho?s.cullFace(1029):F===gu?s.cullFace(1028):s.cullFace(1032))):Re(2884),K=F}function vt(F){F!==V&&(ee&&s.lineWidth(F),V=F)}function $e(F,N,re){F?(X(32823),(O!==N||H!==re)&&(s.polygonOffset(N,re),O=N,H=re)):Re(32823)}function dt(F){F?X(3089):Re(3089)}function Ut(F){F===void 0&&(F=33984+W-1),pe!==F&&(s.activeTexture(F),pe=F)}function R(F,N,re){re===void 0&&(pe===null?re=33984+W-1:re=pe);let Me=ie[re];Me===void 0&&(Me={type:void 0,texture:void 0},ie[re]=Me),(Me.type!==F||Me.texture!==N)&&(pe!==re&&(s.activeTexture(re),pe=re),s.bindTexture(F,N||ce[F]),Me.type=F,Me.texture=N)}function w(){const F=ie[pe];F!==void 0&&F.type!==void 0&&(s.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function Y(){try{s.compressedTexImage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function oe(){try{s.compressedTexImage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function de(){try{s.texSubImage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function xe(){try{s.texSubImage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function De(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ye(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function J(){try{s.texStorage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function be(){try{s.texStorage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Le(){try{s.texImage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ce(){try{s.texImage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function me(F){j.equals(F)===!1&&(s.scissor(F.x,F.y,F.z,F.w),j.copy(F))}function we(F){te.equals(F)===!1&&(s.viewport(F.x,F.y,F.z,F.w),te.copy(F))}function ze(F,N){let re=h.get(N);re===void 0&&(re=new WeakMap,h.set(N,re));let Me=re.get(F);Me===void 0&&(Me=s.getUniformBlockIndex(N,F.name),re.set(F,Me))}function ke(F,N){const Me=h.get(N).get(F);u.get(N)!==Me&&(s.uniformBlockBinding(N,Me,F.__bindingPointIndex),u.set(N,Me))}function We(){s.disable(3042),s.disable(2884),s.disable(2929),s.disable(32823),s.disable(3089),s.disable(2960),s.disable(32926),s.blendEquation(32774),s.blendFunc(1,0),s.blendFuncSeparate(1,0,1,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(513),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(519,0,4294967295),s.stencilOp(7680,7680,7680),s.clearStencil(0),s.cullFace(1029),s.frontFace(2305),s.polygonOffset(0,0),s.activeTexture(33984),s.bindFramebuffer(36160,null),n===!0&&(s.bindFramebuffer(36009,null),s.bindFramebuffer(36008,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),d={},pe=null,ie={},p={},_=new WeakMap,v=[],g=null,f=!1,T=null,S=null,M=null,E=null,C=null,P=null,I=null,y=!1,L=null,K=null,V=null,O=null,H=null,j.set(0,0,s.canvas.width,s.canvas.height),te.set(0,0,s.canvas.width,s.canvas.height),o.reset(),c.reset(),l.reset()}return{buffers:{color:o,depth:c,stencil:l},enable:X,disable:Re,bindFramebuffer:Ue,drawBuffers:_e,useProgram:Ie,setBlending:He,setMaterial:_t,setFlipSided:St,setCullFace:xt,setLineWidth:vt,setPolygonOffset:$e,setScissorTest:dt,activeTexture:Ut,bindTexture:R,unbindTexture:w,compressedTexImage2D:Y,compressedTexImage3D:oe,texImage2D:Le,texImage3D:Ce,updateUBOMapping:ze,uniformBlockBinding:ke,texStorage2D:J,texStorage3D:be,texSubImage2D:de,texSubImage3D:xe,compressedTexSubImage2D:De,compressedTexSubImage3D:ye,scissor:me,viewport:we,reset:We}}function _g(s,e,t,n,i,r,a){const o=i.isWebGL2,c=i.maxTextures,l=i.maxCubemapSize,u=i.maxTextureSize,h=i.maxSamples,d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),_=new WeakMap;let v;const g=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function T(R,w){return f?new OffscreenCanvas(R,w):Gr("canvas")}function S(R,w,Y,oe){let de=1;if((R.width>oe||R.height>oe)&&(de=oe/Math.max(R.width,R.height)),de<1||w===!0)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap){const xe=w?Cc:Math.floor,De=xe(de*R.width),ye=xe(de*R.height);v===void 0&&(v=T(De,ye));const J=Y?T(De,ye):v;return J.width=De,J.height=ye,J.getContext("2d").drawImage(R,0,0,De,ye),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+R.width+"x"+R.height+") to ("+De+"x"+ye+")."),J}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+R.width+"x"+R.height+")."),R;return R}function M(R){return Oa(R.width)&&Oa(R.height)}function E(R){return o?!1:R.wrapS!==qt||R.wrapT!==qt||R.minFilter!==Rt&&R.minFilter!==bt}function C(R,w){return R.generateMipmaps&&w&&R.minFilter!==Rt&&R.minFilter!==bt}function P(R){s.generateMipmap(R)}function I(R,w,Y,oe,de=!1){if(o===!1)return w;if(R!==null){if(s[R]!==void 0)return s[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let xe=w;return w===6403&&(Y===5126&&(xe=33326),Y===5131&&(xe=33325),Y===5121&&(xe=33321)),w===33319&&(Y===5126&&(xe=33328),Y===5131&&(xe=33327),Y===5121&&(xe=33323)),w===6408&&(Y===5126&&(xe=34836),Y===5131&&(xe=34842),Y===5121&&(xe=oe===et&&de===!1?35907:32856),Y===32819&&(xe=32854),Y===32820&&(xe=32855)),(xe===33325||xe===33326||xe===33327||xe===33328||xe===34842||xe===34836)&&e.get("EXT_color_buffer_float"),xe}function y(R,w,Y){return C(R,Y)===!0||R.isFramebufferTexture&&R.minFilter!==Rt&&R.minFilter!==bt?Math.log2(Math.max(w.width,w.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?w.mipmaps.length:1}function L(R){return R===Rt||R===Da||R===Cs?9728:9729}function K(R){const w=R.target;w.removeEventListener("dispose",K),O(w),w.isVideoTexture&&_.delete(w)}function V(R){const w=R.target;w.removeEventListener("dispose",V),W(w)}function O(R){const w=n.get(R);if(w.__webglInit===void 0)return;const Y=R.source,oe=g.get(Y);if(oe){const de=oe[w.__cacheKey];de.usedTimes--,de.usedTimes===0&&H(R),Object.keys(oe).length===0&&g.delete(Y)}n.remove(R)}function H(R){const w=n.get(R);s.deleteTexture(w.__webglTexture);const Y=R.source,oe=g.get(Y);delete oe[w.__cacheKey],a.memory.textures--}function W(R){const w=R.texture,Y=n.get(R),oe=n.get(w);if(oe.__webglTexture!==void 0&&(s.deleteTexture(oe.__webglTexture),a.memory.textures--),R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let de=0;de<6;de++)s.deleteFramebuffer(Y.__webglFramebuffer[de]),Y.__webglDepthbuffer&&s.deleteRenderbuffer(Y.__webglDepthbuffer[de]);else{if(s.deleteFramebuffer(Y.__webglFramebuffer),Y.__webglDepthbuffer&&s.deleteRenderbuffer(Y.__webglDepthbuffer),Y.__webglMultisampledFramebuffer&&s.deleteFramebuffer(Y.__webglMultisampledFramebuffer),Y.__webglColorRenderbuffer)for(let de=0;de<Y.__webglColorRenderbuffer.length;de++)Y.__webglColorRenderbuffer[de]&&s.deleteRenderbuffer(Y.__webglColorRenderbuffer[de]);Y.__webglDepthRenderbuffer&&s.deleteRenderbuffer(Y.__webglDepthRenderbuffer)}if(R.isWebGLMultipleRenderTargets)for(let de=0,xe=w.length;de<xe;de++){const De=n.get(w[de]);De.__webglTexture&&(s.deleteTexture(De.__webglTexture),a.memory.textures--),n.remove(w[de])}n.remove(w),n.remove(R)}let ee=0;function ae(){ee=0}function Q(){const R=ee;return R>=c&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+c),ee+=1,R}function pe(R){const w=[];return w.push(R.wrapS),w.push(R.wrapT),w.push(R.wrapR||0),w.push(R.magFilter),w.push(R.minFilter),w.push(R.anisotropy),w.push(R.internalFormat),w.push(R.format),w.push(R.type),w.push(R.generateMipmaps),w.push(R.premultiplyAlpha),w.push(R.flipY),w.push(R.unpackAlignment),w.push(R.encoding),w.join()}function ie(R,w){const Y=n.get(R);if(R.isVideoTexture&&dt(R),R.isRenderTargetTexture===!1&&R.version>0&&Y.__version!==R.version){const oe=R.image;if(oe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(oe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Re(Y,R,w);return}}t.bindTexture(3553,Y.__webglTexture,33984+w)}function Pe(R,w){const Y=n.get(R);if(R.version>0&&Y.__version!==R.version){Re(Y,R,w);return}t.bindTexture(35866,Y.__webglTexture,33984+w)}function le(R,w){const Y=n.get(R);if(R.version>0&&Y.__version!==R.version){Re(Y,R,w);return}t.bindTexture(32879,Y.__webglTexture,33984+w)}function j(R,w){const Y=n.get(R);if(R.version>0&&Y.__version!==R.version){Ue(Y,R,w);return}t.bindTexture(34067,Y.__webglTexture,33984+w)}const te={[ct]:10497,[qt]:33071,[Ps]:33648},ge={[Rt]:9728,[Da]:9984,[Cs]:9986,[bt]:9729,[Sc]:9985,[ti]:9987};function ce(R,w,Y){if(Y?(s.texParameteri(R,10242,te[w.wrapS]),s.texParameteri(R,10243,te[w.wrapT]),(R===32879||R===35866)&&s.texParameteri(R,32882,te[w.wrapR]),s.texParameteri(R,10240,ge[w.magFilter]),s.texParameteri(R,10241,ge[w.minFilter])):(s.texParameteri(R,10242,33071),s.texParameteri(R,10243,33071),(R===32879||R===35866)&&s.texParameteri(R,32882,33071),(w.wrapS!==qt||w.wrapT!==qt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(R,10240,L(w.magFilter)),s.texParameteri(R,10241,L(w.minFilter)),w.minFilter!==Rt&&w.minFilter!==bt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),e.has("EXT_texture_filter_anisotropic")===!0){const oe=e.get("EXT_texture_filter_anisotropic");if(w.magFilter===Rt||w.minFilter!==Cs&&w.minFilter!==ti||w.type===xn&&e.has("OES_texture_float_linear")===!1||o===!1&&w.type===Fn&&e.has("OES_texture_half_float_linear")===!1)return;(w.anisotropy>1||n.get(w).__currentAnisotropy)&&(s.texParameterf(R,oe.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy)}}function X(R,w){let Y=!1;R.__webglInit===void 0&&(R.__webglInit=!0,w.addEventListener("dispose",K));const oe=w.source;let de=g.get(oe);de===void 0&&(de={},g.set(oe,de));const xe=pe(w);if(xe!==R.__cacheKey){de[xe]===void 0&&(de[xe]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,Y=!0),de[xe].usedTimes++;const De=de[R.__cacheKey];De!==void 0&&(de[R.__cacheKey].usedTimes--,De.usedTimes===0&&H(w)),R.__cacheKey=xe,R.__webglTexture=de[xe].texture}return Y}function Re(R,w,Y){let oe=3553;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(oe=35866),w.isData3DTexture&&(oe=32879);const de=X(R,w),xe=w.source;t.bindTexture(oe,R.__webglTexture,33984+Y);const De=n.get(xe);if(xe.version!==De.__version||de===!0){t.activeTexture(33984+Y),s.pixelStorei(37440,w.flipY),s.pixelStorei(37441,w.premultiplyAlpha),s.pixelStorei(3317,w.unpackAlignment),s.pixelStorei(37443,0);const ye=E(w)&&M(w.image)===!1;let J=S(w.image,ye,!1,u);J=Ut(w,J);const be=M(J)||o,Le=r.convert(w.format,w.encoding);let Ce=r.convert(w.type),me=I(w.internalFormat,Le,Ce,w.encoding,w.isVideoTexture);ce(oe,w,be);let we;const ze=w.mipmaps,ke=o&&w.isVideoTexture!==!0,We=De.__version===void 0||de===!0,F=y(w,J,be);if(w.isDepthTexture)me=6402,o?w.type===xn?me=36012:w.type===pi?me=33190:w.type===er?me=35056:me=33189:w.type===xn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),w.format===mi&&me===6402&&w.type!==wc&&w.type!==pi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),w.type=pi,Ce=r.convert(w.type)),w.format===ar&&me===6402&&(me=34041,w.type!==er&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),w.type=er,Ce=r.convert(w.type))),We&&(ke?t.texStorage2D(3553,1,me,J.width,J.height):t.texImage2D(3553,0,me,J.width,J.height,0,Le,Ce,null));else if(w.isDataTexture)if(ze.length>0&&be){ke&&We&&t.texStorage2D(3553,F,me,ze[0].width,ze[0].height);for(let N=0,re=ze.length;N<re;N++)we=ze[N],ke?t.texSubImage2D(3553,N,0,0,we.width,we.height,Le,Ce,we.data):t.texImage2D(3553,N,me,we.width,we.height,0,Le,Ce,we.data);w.generateMipmaps=!1}else ke?(We&&t.texStorage2D(3553,F,me,J.width,J.height),t.texSubImage2D(3553,0,0,0,J.width,J.height,Le,Ce,J.data)):t.texImage2D(3553,0,me,J.width,J.height,0,Le,Ce,J.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){ke&&We&&t.texStorage3D(35866,F,me,ze[0].width,ze[0].height,J.depth);for(let N=0,re=ze.length;N<re;N++)we=ze[N],w.format!==en?Le!==null?ke?t.compressedTexSubImage3D(35866,N,0,0,0,we.width,we.height,J.depth,Le,we.data,0,0):t.compressedTexImage3D(35866,N,me,we.width,we.height,J.depth,0,we.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ke?t.texSubImage3D(35866,N,0,0,0,we.width,we.height,J.depth,Le,Ce,we.data):t.texImage3D(35866,N,me,we.width,we.height,J.depth,0,Le,Ce,we.data)}else{ke&&We&&t.texStorage2D(3553,F,me,ze[0].width,ze[0].height);for(let N=0,re=ze.length;N<re;N++)we=ze[N],w.format!==en?Le!==null?ke?t.compressedTexSubImage2D(3553,N,0,0,we.width,we.height,Le,we.data):t.compressedTexImage2D(3553,N,me,we.width,we.height,0,we.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ke?t.texSubImage2D(3553,N,0,0,we.width,we.height,Le,Ce,we.data):t.texImage2D(3553,N,me,we.width,we.height,0,Le,Ce,we.data)}else if(w.isDataArrayTexture)ke?(We&&t.texStorage3D(35866,F,me,J.width,J.height,J.depth),t.texSubImage3D(35866,0,0,0,0,J.width,J.height,J.depth,Le,Ce,J.data)):t.texImage3D(35866,0,me,J.width,J.height,J.depth,0,Le,Ce,J.data);else if(w.isData3DTexture)ke?(We&&t.texStorage3D(32879,F,me,J.width,J.height,J.depth),t.texSubImage3D(32879,0,0,0,0,J.width,J.height,J.depth,Le,Ce,J.data)):t.texImage3D(32879,0,me,J.width,J.height,J.depth,0,Le,Ce,J.data);else if(w.isFramebufferTexture){if(We)if(ke)t.texStorage2D(3553,F,me,J.width,J.height);else{let N=J.width,re=J.height;for(let Me=0;Me<F;Me++)t.texImage2D(3553,Me,me,N,re,0,Le,Ce,null),N>>=1,re>>=1}}else if(ze.length>0&&be){ke&&We&&t.texStorage2D(3553,F,me,ze[0].width,ze[0].height);for(let N=0,re=ze.length;N<re;N++)we=ze[N],ke?t.texSubImage2D(3553,N,0,0,Le,Ce,we):t.texImage2D(3553,N,me,Le,Ce,we);w.generateMipmaps=!1}else ke?(We&&t.texStorage2D(3553,F,me,J.width,J.height),t.texSubImage2D(3553,0,0,0,Le,Ce,J)):t.texImage2D(3553,0,me,Le,Ce,J);C(w,be)&&P(oe),De.__version=xe.version,w.onUpdate&&w.onUpdate(w)}R.__version=w.version}function Ue(R,w,Y){if(w.image.length!==6)return;const oe=X(R,w),de=w.source;t.bindTexture(34067,R.__webglTexture,33984+Y);const xe=n.get(de);if(de.version!==xe.__version||oe===!0){t.activeTexture(33984+Y),s.pixelStorei(37440,w.flipY),s.pixelStorei(37441,w.premultiplyAlpha),s.pixelStorei(3317,w.unpackAlignment),s.pixelStorei(37443,0);const De=w.isCompressedTexture||w.image[0].isCompressedTexture,ye=w.image[0]&&w.image[0].isDataTexture,J=[];for(let N=0;N<6;N++)!De&&!ye?J[N]=S(w.image[N],!1,!0,l):J[N]=ye?w.image[N].image:w.image[N],J[N]=Ut(w,J[N]);const be=J[0],Le=M(be)||o,Ce=r.convert(w.format,w.encoding),me=r.convert(w.type),we=I(w.internalFormat,Ce,me,w.encoding),ze=o&&w.isVideoTexture!==!0,ke=xe.__version===void 0||oe===!0;let We=y(w,be,Le);ce(34067,w,Le);let F;if(De){ze&&ke&&t.texStorage2D(34067,We,we,be.width,be.height);for(let N=0;N<6;N++){F=J[N].mipmaps;for(let re=0;re<F.length;re++){const Me=F[re];w.format!==en?Ce!==null?ze?t.compressedTexSubImage2D(34069+N,re,0,0,Me.width,Me.height,Ce,Me.data):t.compressedTexImage2D(34069+N,re,we,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ze?t.texSubImage2D(34069+N,re,0,0,Me.width,Me.height,Ce,me,Me.data):t.texImage2D(34069+N,re,we,Me.width,Me.height,0,Ce,me,Me.data)}}}else{F=w.mipmaps,ze&&ke&&(F.length>0&&We++,t.texStorage2D(34067,We,we,J[0].width,J[0].height));for(let N=0;N<6;N++)if(ye){ze?t.texSubImage2D(34069+N,0,0,0,J[N].width,J[N].height,Ce,me,J[N].data):t.texImage2D(34069+N,0,we,J[N].width,J[N].height,0,Ce,me,J[N].data);for(let re=0;re<F.length;re++){const Te=F[re].image[N].image;ze?t.texSubImage2D(34069+N,re+1,0,0,Te.width,Te.height,Ce,me,Te.data):t.texImage2D(34069+N,re+1,we,Te.width,Te.height,0,Ce,me,Te.data)}}else{ze?t.texSubImage2D(34069+N,0,0,0,Ce,me,J[N]):t.texImage2D(34069+N,0,we,Ce,me,J[N]);for(let re=0;re<F.length;re++){const Me=F[re];ze?t.texSubImage2D(34069+N,re+1,0,0,Ce,me,Me.image[N]):t.texImage2D(34069+N,re+1,we,Ce,me,Me.image[N])}}}C(w,Le)&&P(34067),xe.__version=de.version,w.onUpdate&&w.onUpdate(w)}R.__version=w.version}function _e(R,w,Y,oe,de){const xe=r.convert(Y.format,Y.encoding),De=r.convert(Y.type),ye=I(Y.internalFormat,xe,De,Y.encoding);n.get(w).__hasExternalTextures||(de===32879||de===35866?t.texImage3D(de,0,ye,w.width,w.height,w.depth,0,xe,De,null):t.texImage2D(de,0,ye,w.width,w.height,0,xe,De,null)),t.bindFramebuffer(36160,R),$e(w)?d.framebufferTexture2DMultisampleEXT(36160,oe,de,n.get(Y).__webglTexture,0,vt(w)):(de===3553||de>=34069&&de<=34074)&&s.framebufferTexture2D(36160,oe,de,n.get(Y).__webglTexture,0),t.bindFramebuffer(36160,null)}function Ie(R,w,Y){if(s.bindRenderbuffer(36161,R),w.depthBuffer&&!w.stencilBuffer){let oe=33189;if(Y||$e(w)){const de=w.depthTexture;de&&de.isDepthTexture&&(de.type===xn?oe=36012:de.type===pi&&(oe=33190));const xe=vt(w);$e(w)?d.renderbufferStorageMultisampleEXT(36161,xe,oe,w.width,w.height):s.renderbufferStorageMultisample(36161,xe,oe,w.width,w.height)}else s.renderbufferStorage(36161,oe,w.width,w.height);s.framebufferRenderbuffer(36160,36096,36161,R)}else if(w.depthBuffer&&w.stencilBuffer){const oe=vt(w);Y&&$e(w)===!1?s.renderbufferStorageMultisample(36161,oe,35056,w.width,w.height):$e(w)?d.renderbufferStorageMultisampleEXT(36161,oe,35056,w.width,w.height):s.renderbufferStorage(36161,34041,w.width,w.height),s.framebufferRenderbuffer(36160,33306,36161,R)}else{const oe=w.isWebGLMultipleRenderTargets===!0?w.texture:[w.texture];for(let de=0;de<oe.length;de++){const xe=oe[de],De=r.convert(xe.format,xe.encoding),ye=r.convert(xe.type),J=I(xe.internalFormat,De,ye,xe.encoding),be=vt(w);Y&&$e(w)===!1?s.renderbufferStorageMultisample(36161,be,J,w.width,w.height):$e(w)?d.renderbufferStorageMultisampleEXT(36161,be,J,w.width,w.height):s.renderbufferStorage(36161,J,w.width,w.height)}}s.bindRenderbuffer(36161,null)}function Ze(R,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(36160,R),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),ie(w.depthTexture,0);const oe=n.get(w.depthTexture).__webglTexture,de=vt(w);if(w.depthTexture.format===mi)$e(w)?d.framebufferTexture2DMultisampleEXT(36160,36096,3553,oe,0,de):s.framebufferTexture2D(36160,36096,3553,oe,0);else if(w.depthTexture.format===ar)$e(w)?d.framebufferTexture2DMultisampleEXT(36160,33306,3553,oe,0,de):s.framebufferTexture2D(36160,33306,3553,oe,0);else throw new Error("Unknown depthTexture format")}function Ae(R){const w=n.get(R),Y=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!w.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");Ze(w.__webglFramebuffer,R)}else if(Y){w.__webglDepthbuffer=[];for(let oe=0;oe<6;oe++)t.bindFramebuffer(36160,w.__webglFramebuffer[oe]),w.__webglDepthbuffer[oe]=s.createRenderbuffer(),Ie(w.__webglDepthbuffer[oe],R,!1)}else t.bindFramebuffer(36160,w.__webglFramebuffer),w.__webglDepthbuffer=s.createRenderbuffer(),Ie(w.__webglDepthbuffer,R,!1);t.bindFramebuffer(36160,null)}function He(R,w,Y){const oe=n.get(R);w!==void 0&&_e(oe.__webglFramebuffer,R,R.texture,36064,3553),Y!==void 0&&Ae(R)}function _t(R){const w=R.texture,Y=n.get(R),oe=n.get(w);R.addEventListener("dispose",V),R.isWebGLMultipleRenderTargets!==!0&&(oe.__webglTexture===void 0&&(oe.__webglTexture=s.createTexture()),oe.__version=w.version,a.memory.textures++);const de=R.isWebGLCubeRenderTarget===!0,xe=R.isWebGLMultipleRenderTargets===!0,De=M(R)||o;if(de){Y.__webglFramebuffer=[];for(let ye=0;ye<6;ye++)Y.__webglFramebuffer[ye]=s.createFramebuffer()}else{if(Y.__webglFramebuffer=s.createFramebuffer(),xe)if(i.drawBuffers){const ye=R.texture;for(let J=0,be=ye.length;J<be;J++){const Le=n.get(ye[J]);Le.__webglTexture===void 0&&(Le.__webglTexture=s.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&R.samples>0&&$e(R)===!1){const ye=xe?w:[w];Y.__webglMultisampledFramebuffer=s.createFramebuffer(),Y.__webglColorRenderbuffer=[],t.bindFramebuffer(36160,Y.__webglMultisampledFramebuffer);for(let J=0;J<ye.length;J++){const be=ye[J];Y.__webglColorRenderbuffer[J]=s.createRenderbuffer(),s.bindRenderbuffer(36161,Y.__webglColorRenderbuffer[J]);const Le=r.convert(be.format,be.encoding),Ce=r.convert(be.type),me=I(be.internalFormat,Le,Ce,be.encoding,R.isXRRenderTarget===!0),we=vt(R);s.renderbufferStorageMultisample(36161,we,me,R.width,R.height),s.framebufferRenderbuffer(36160,36064+J,36161,Y.__webglColorRenderbuffer[J])}s.bindRenderbuffer(36161,null),R.depthBuffer&&(Y.__webglDepthRenderbuffer=s.createRenderbuffer(),Ie(Y.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(36160,null)}}if(de){t.bindTexture(34067,oe.__webglTexture),ce(34067,w,De);for(let ye=0;ye<6;ye++)_e(Y.__webglFramebuffer[ye],R,w,36064,34069+ye);C(w,De)&&P(34067),t.unbindTexture()}else if(xe){const ye=R.texture;for(let J=0,be=ye.length;J<be;J++){const Le=ye[J],Ce=n.get(Le);t.bindTexture(3553,Ce.__webglTexture),ce(3553,Le,De),_e(Y.__webglFramebuffer,R,Le,36064+J,3553),C(Le,De)&&P(3553)}t.unbindTexture()}else{let ye=3553;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(o?ye=R.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ye,oe.__webglTexture),ce(ye,w,De),_e(Y.__webglFramebuffer,R,w,36064,ye),C(w,De)&&P(ye),t.unbindTexture()}R.depthBuffer&&Ae(R)}function St(R){const w=M(R)||o,Y=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let oe=0,de=Y.length;oe<de;oe++){const xe=Y[oe];if(C(xe,w)){const De=R.isWebGLCubeRenderTarget?34067:3553,ye=n.get(xe).__webglTexture;t.bindTexture(De,ye),P(De),t.unbindTexture()}}}function xt(R){if(o&&R.samples>0&&$e(R)===!1){const w=R.isWebGLMultipleRenderTargets?R.texture:[R.texture],Y=R.width,oe=R.height;let de=16384;const xe=[],De=R.stencilBuffer?33306:36096,ye=n.get(R),J=R.isWebGLMultipleRenderTargets===!0;if(J)for(let be=0;be<w.length;be++)t.bindFramebuffer(36160,ye.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(36160,36064+be,36161,null),t.bindFramebuffer(36160,ye.__webglFramebuffer),s.framebufferTexture2D(36009,36064+be,3553,null,0);t.bindFramebuffer(36008,ye.__webglMultisampledFramebuffer),t.bindFramebuffer(36009,ye.__webglFramebuffer);for(let be=0;be<w.length;be++){xe.push(36064+be),R.depthBuffer&&xe.push(De);const Le=ye.__ignoreDepthValues!==void 0?ye.__ignoreDepthValues:!1;if(Le===!1&&(R.depthBuffer&&(de|=256),R.stencilBuffer&&(de|=1024)),J&&s.framebufferRenderbuffer(36008,36064,36161,ye.__webglColorRenderbuffer[be]),Le===!0&&(s.invalidateFramebuffer(36008,[De]),s.invalidateFramebuffer(36009,[De])),J){const Ce=n.get(w[be]).__webglTexture;s.framebufferTexture2D(36009,36064,3553,Ce,0)}s.blitFramebuffer(0,0,Y,oe,0,0,Y,oe,de,9728),p&&s.invalidateFramebuffer(36008,xe)}if(t.bindFramebuffer(36008,null),t.bindFramebuffer(36009,null),J)for(let be=0;be<w.length;be++){t.bindFramebuffer(36160,ye.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(36160,36064+be,36161,ye.__webglColorRenderbuffer[be]);const Le=n.get(w[be]).__webglTexture;t.bindFramebuffer(36160,ye.__webglFramebuffer),s.framebufferTexture2D(36009,36064+be,3553,Le,0)}t.bindFramebuffer(36009,ye.__webglMultisampledFramebuffer)}}function vt(R){return Math.min(h,R.samples)}function $e(R){const w=n.get(R);return o&&R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function dt(R){const w=a.render.frame;_.get(R)!==w&&(_.set(R,w),R.update())}function Ut(R,w){const Y=R.encoding,oe=R.format,de=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||R.format===Fa||Y!==xi&&(Y===et?o===!1?e.has("EXT_sRGB")===!0&&oe===en?(R.format=Fa,R.minFilter=bt,R.generateMipmaps=!1):w=Rc.sRGBToLinear(w):(oe!==en||de!==vi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",Y)),w}this.allocateTextureUnit=Q,this.resetTextureUnits=ae,this.setTexture2D=ie,this.setTexture2DArray=Pe,this.setTexture3D=le,this.setTextureCube=j,this.rebindTextures=He,this.setupRenderTarget=_t,this.updateRenderTargetMipmap=St,this.updateMultisampleRenderTarget=xt,this.setupDepthRenderbuffer=Ae,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=$e}function vg(s,e,t){const n=t.isWebGL2;function i(r,a=null){let o;if(r===vi)return 5121;if(r===Xu)return 32819;if(r===qu)return 32820;if(r===Gu)return 5120;if(r===Vu)return 5122;if(r===wc)return 5123;if(r===Wu)return 5124;if(r===pi)return 5125;if(r===xn)return 5126;if(r===Fn)return n?5131:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===ju)return 6406;if(r===en)return 6408;if(r===Ku)return 6409;if(r===Yu)return 6410;if(r===mi)return 6402;if(r===ar)return 34041;if(r===Fa)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===bc)return 6403;if(r===Zu)return 36244;if(r===$u)return 33319;if(r===Ju)return 33320;if(r===Qu)return 36249;if(r===Gs||r===Vs||r===Ws||r===Xs)if(a===et)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Gs)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Vs)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Ws)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Xs)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Gs)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Vs)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Ws)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Xs)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===vo||r===xo||r===Mo||r===yo)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===vo)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===xo)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Mo)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===yo)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===eh)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===So||r===wo)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===So)return a===et?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===wo)return a===et?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===bo||r===To||r===Eo||r===Ao||r===Co||r===Lo||r===Ro||r===Po||r===Io||r===Do||r===Uo||r===No||r===Fo||r===Oo)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===bo)return a===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===To)return a===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Eo)return a===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Ao)return a===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Co)return a===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Lo)return a===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Ro)return a===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Po)return a===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Io)return a===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Do)return a===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Uo)return a===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===No)return a===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Fo)return a===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Oo)return a===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===qs)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===qs)return a===et?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;if(r===th||r===Bo||r===zo||r===ko)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===qs)return o.COMPRESSED_RED_RGTC1_EXT;if(r===Bo)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===zo)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===ko)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===er?n?34042:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}class xg extends kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Tn extends rt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Mg={type:"move"};class ma{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Tn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Tn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Tn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const v of e.hand.values()){const g=t.getJointPose(v,n),f=this._getHandJoint(l,v);g!==null&&(f.matrix.fromArray(g.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.jointRadius=g.radius),f.visible=g!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),p=.02,_=.005;l.inputState.pinching&&d>p+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=p-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Mg)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Tn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class yg extends It{constructor(e,t,n,i,r,a,o,c,l,u){if(u=u!==void 0?u:mi,u!==mi&&u!==ar)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===mi&&(n=pi),n===void 0&&u===ar&&(n=er),super(null,i,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Rt,this.minFilter=c!==void 0?c:Rt,this.flipY=!1,this.generateMipmaps=!1}}class Sg extends hr{constructor(e,t){super();const n=this;let i=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,d=null,p=null,_=null;const v=t.getContextAttributes();let g=null,f=null;const T=[],S=[],M=new Set,E=new Map,C=new kt;C.layers.enable(1),C.viewport=new lt;const P=new kt;P.layers.enable(2),P.viewport=new lt;const I=[C,P],y=new xg;y.layers.enable(1),y.layers.enable(2);let L=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let te=T[j];return te===void 0&&(te=new ma,T[j]=te),te.getTargetRaySpace()},this.getControllerGrip=function(j){let te=T[j];return te===void 0&&(te=new ma,T[j]=te),te.getGripSpace()},this.getHand=function(j){let te=T[j];return te===void 0&&(te=new ma,T[j]=te),te.getHandSpace()};function V(j){const te=S.indexOf(j.inputSource);if(te===-1)return;const ge=T[te];ge!==void 0&&ge.dispatchEvent({type:j.type,data:j.inputSource})}function O(){i.removeEventListener("select",V),i.removeEventListener("selectstart",V),i.removeEventListener("selectend",V),i.removeEventListener("squeeze",V),i.removeEventListener("squeezestart",V),i.removeEventListener("squeezeend",V),i.removeEventListener("end",O),i.removeEventListener("inputsourceschange",H);for(let j=0;j<T.length;j++){const te=S[j];te!==null&&(S[j]=null,T[j].disconnect(te))}L=null,K=null,e.setRenderTarget(g),p=null,d=null,h=null,i=null,f=null,le.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(j){if(i=j,i!==null){if(g=e.getRenderTarget(),i.addEventListener("select",V),i.addEventListener("selectstart",V),i.addEventListener("selectend",V),i.addEventListener("squeeze",V),i.addEventListener("squeezestart",V),i.addEventListener("squeezeend",V),i.addEventListener("end",O),i.addEventListener("inputsourceschange",H),v.xrCompatible!==!0&&await t.makeXRCompatible(),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const te={antialias:i.renderState.layers===void 0?v.antialias:!0,alpha:v.alpha,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,t,te),i.updateRenderState({baseLayer:p}),f=new Mi(p.framebufferWidth,p.framebufferHeight,{format:en,type:vi,encoding:e.outputEncoding,stencilBuffer:v.stencil})}else{let te=null,ge=null,ce=null;v.depth&&(ce=v.stencil?35056:33190,te=v.stencil?ar:mi,ge=v.stencil?er:pi);const X={colorFormat:32856,depthFormat:ce,scaleFactor:r};h=new XRWebGLBinding(i,t),d=h.createProjectionLayer(X),i.updateRenderState({layers:[d]}),f=new Mi(d.textureWidth,d.textureHeight,{format:en,type:vi,depthTexture:new yg(d.textureWidth,d.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:v.stencil,encoding:e.outputEncoding,samples:v.antialias?4:0});const Re=e.properties.get(f);Re.__ignoreDepthValues=d.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),le.setContext(i),le.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};function H(j){for(let te=0;te<j.removed.length;te++){const ge=j.removed[te],ce=S.indexOf(ge);ce>=0&&(S[ce]=null,T[ce].disconnect(ge))}for(let te=0;te<j.added.length;te++){const ge=j.added[te];let ce=S.indexOf(ge);if(ce===-1){for(let Re=0;Re<T.length;Re++)if(Re>=S.length){S.push(ge),ce=Re;break}else if(S[Re]===null){S[Re]=ge,ce=Re;break}if(ce===-1)break}const X=T[ce];X&&X.connect(ge)}}const W=new D,ee=new D;function ae(j,te,ge){W.setFromMatrixPosition(te.matrixWorld),ee.setFromMatrixPosition(ge.matrixWorld);const ce=W.distanceTo(ee),X=te.projectionMatrix.elements,Re=ge.projectionMatrix.elements,Ue=X[14]/(X[10]-1),_e=X[14]/(X[10]+1),Ie=(X[9]+1)/X[5],Ze=(X[9]-1)/X[5],Ae=(X[8]-1)/X[0],He=(Re[8]+1)/Re[0],_t=Ue*Ae,St=Ue*He,xt=ce/(-Ae+He),vt=xt*-Ae;te.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(vt),j.translateZ(xt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert();const $e=Ue+xt,dt=_e+xt,Ut=_t-vt,R=St+(ce-vt),w=Ie*_e/dt*$e,Y=Ze*_e/dt*$e;j.projectionMatrix.makePerspective(Ut,R,w,Y,$e,dt),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}function Q(j,te){te===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(te.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(i===null)return;y.near=P.near=C.near=j.near,y.far=P.far=C.far=j.far,(L!==y.near||K!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),L=y.near,K=y.far);const te=j.parent,ge=y.cameras;Q(y,te);for(let ce=0;ce<ge.length;ce++)Q(ge[ce],te);ge.length===2?ae(y,C,P):y.projectionMatrix.copy(C.projectionMatrix),pe(j,y,te)};function pe(j,te,ge){ge===null?j.matrix.copy(te.matrixWorld):(j.matrix.copy(ge.matrixWorld),j.matrix.invert(),j.matrix.multiply(te.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0);const ce=j.children;for(let X=0,Re=ce.length;X<Re;X++)ce[X].updateMatrixWorld(!0);j.projectionMatrix.copy(te.projectionMatrix),j.projectionMatrixInverse.copy(te.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=lr*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(j){c=j,d!==null&&(d.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.getPlanes=function(){return M};let ie=null;function Pe(j,te){if(u=te.getViewerPose(l||a),_=te,u!==null){const ge=u.views;p!==null&&(e.setRenderTargetFramebuffer(f,p.framebuffer),e.setRenderTarget(f));let ce=!1;ge.length!==y.cameras.length&&(y.cameras.length=0,ce=!0);for(let X=0;X<ge.length;X++){const Re=ge[X];let Ue=null;if(p!==null)Ue=p.getViewport(Re);else{const Ie=h.getViewSubImage(d,Re);Ue=Ie.viewport,X===0&&(e.setRenderTargetTextures(f,Ie.colorTexture,d.ignoreDepthValues?void 0:Ie.depthStencilTexture),e.setRenderTarget(f))}let _e=I[X];_e===void 0&&(_e=new kt,_e.layers.enable(X),_e.viewport=new lt,I[X]=_e),_e.matrix.fromArray(Re.transform.matrix),_e.matrix.decompose(_e.position,_e.quaternion,_e.scale),_e.projectionMatrix.fromArray(Re.projectionMatrix),_e.projectionMatrixInverse.copy(_e.projectionMatrix).invert(),_e.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),X===0&&(y.matrix.copy(_e.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ce===!0&&y.cameras.push(_e)}}for(let ge=0;ge<T.length;ge++){const ce=S[ge],X=T[ge];ce!==null&&X!==void 0&&X.update(ce,te,l||a)}if(ie&&ie(j,te),te.detectedPlanes){n.dispatchEvent({type:"planesdetected",data:te.detectedPlanes});let ge=null;for(const ce of M)te.detectedPlanes.has(ce)||(ge===null&&(ge=[]),ge.push(ce));if(ge!==null)for(const ce of ge)M.delete(ce),E.delete(ce),n.dispatchEvent({type:"planeremoved",data:ce});for(const ce of te.detectedPlanes)if(!M.has(ce))M.add(ce),E.set(ce,te.lastChangedTime),n.dispatchEvent({type:"planeadded",data:ce});else{const X=E.get(ce);ce.lastChangedTime>X&&(E.set(ce,ce.lastChangedTime),n.dispatchEvent({type:"planechanged",data:ce}))}}_=null}const le=new zc;le.setAnimationLoop(Pe),this.setAnimationLoop=function(j){ie=j},this.dispose=function(){}}}function wg(s,e){function t(g,f){g.matrixAutoUpdate===!0&&g.updateMatrix(),f.value.copy(g.matrix)}function n(g,f){f.color.getRGB(g.fogColor.value,Fc(s)),f.isFog?(g.fogNear.value=f.near,g.fogFar.value=f.far):f.isFogExp2&&(g.fogDensity.value=f.density)}function i(g,f,T,S,M){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(g,f):f.isMeshToonMaterial?(r(g,f),h(g,f)):f.isMeshPhongMaterial?(r(g,f),u(g,f)):f.isMeshStandardMaterial?(r(g,f),d(g,f),f.isMeshPhysicalMaterial&&p(g,f,M)):f.isMeshMatcapMaterial?(r(g,f),_(g,f)):f.isMeshDepthMaterial?r(g,f):f.isMeshDistanceMaterial?(r(g,f),v(g,f)):f.isMeshNormalMaterial?r(g,f):f.isLineBasicMaterial?(a(g,f),f.isLineDashedMaterial&&o(g,f)):f.isPointsMaterial?c(g,f,T,S):f.isSpriteMaterial?l(g,f):f.isShadowMaterial?(g.color.value.copy(f.color),g.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(g,f){g.opacity.value=f.opacity,f.color&&g.diffuse.value.copy(f.color),f.emissive&&g.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(g.map.value=f.map,t(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,t(f.alphaMap,g.alphaMapTransform)),f.bumpMap&&(g.bumpMap.value=f.bumpMap,t(f.bumpMap,g.bumpMapTransform),g.bumpScale.value=f.bumpScale,f.side===jt&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,t(f.normalMap,g.normalMapTransform),g.normalScale.value.copy(f.normalScale),f.side===jt&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,t(f.displacementMap,g.displacementMapTransform),g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,g.emissiveMapTransform)),f.specularMap&&(g.specularMap.value=f.specularMap,t(f.specularMap,g.specularMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest);const T=e.get(f).envMap;if(T&&(g.envMap.value=T,g.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=f.reflectivity,g.ior.value=f.ior,g.refractionRatio.value=f.refractionRatio),f.lightMap){g.lightMap.value=f.lightMap;const S=s.useLegacyLights===!0?Math.PI:1;g.lightMapIntensity.value=f.lightMapIntensity*S,t(f.lightMap,g.lightMapTransform)}f.aoMap&&(g.aoMap.value=f.aoMap,g.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,g.aoMapTransform))}function a(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,f.map&&(g.map.value=f.map,t(f.map,g.mapTransform))}function o(g,f){g.dashSize.value=f.dashSize,g.totalSize.value=f.dashSize+f.gapSize,g.scale.value=f.scale}function c(g,f,T,S){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.size.value=f.size*T,g.scale.value=S*.5,f.map&&(g.map.value=f.map,t(f.map,g.uvTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function l(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.rotation.value=f.rotation,f.map&&(g.map.value=f.map,t(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function u(g,f){g.specular.value.copy(f.specular),g.shininess.value=Math.max(f.shininess,1e-4)}function h(g,f){f.gradientMap&&(g.gradientMap.value=f.gradientMap)}function d(g,f){g.metalness.value=f.metalness,f.metalnessMap&&(g.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,g.metalnessMapTransform)),g.roughness.value=f.roughness,f.roughnessMap&&(g.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,g.roughnessMapTransform)),e.get(f).envMap&&(g.envMapIntensity.value=f.envMapIntensity)}function p(g,f,T){g.ior.value=f.ior,f.sheen>0&&(g.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),g.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(g.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,g.sheenColorMapTransform)),f.sheenRoughnessMap&&(g.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,g.sheenRoughnessMapTransform))),f.clearcoat>0&&(g.clearcoat.value=f.clearcoat,g.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(g.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,g.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(g.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===jt&&g.clearcoatNormalScale.value.negate())),f.iridescence>0&&(g.iridescence.value=f.iridescence,g.iridescenceIOR.value=f.iridescenceIOR,g.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(g.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,g.iridescenceMapTransform)),f.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),f.transmission>0&&(g.transmission.value=f.transmission,g.transmissionSamplerMap.value=T.texture,g.transmissionSamplerSize.value.set(T.width,T.height),f.transmissionMap&&(g.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,g.transmissionMapTransform)),g.thickness.value=f.thickness,f.thicknessMap&&(g.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=f.attenuationDistance,g.attenuationColor.value.copy(f.attenuationColor)),g.specularIntensity.value=f.specularIntensity,g.specularColor.value.copy(f.specularColor),f.specularColorMap&&(g.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,g.specularColorMapTransform)),f.specularIntensityMap&&(g.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,g.specularIntensityMapTransform))}function _(g,f){f.matcap&&(g.matcap.value=f.matcap)}function v(g,f){const T=e.get(f).light;g.referencePosition.value.setFromMatrixPosition(T.matrixWorld),g.nearDistance.value=T.shadow.camera.near,g.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function bg(s,e,t,n){let i={},r={},a=[];const o=t.isWebGL2?s.getParameter(35375):0;function c(T,S){const M=S.program;n.uniformBlockBinding(T,M)}function l(T,S){let M=i[T.id];M===void 0&&(_(T),M=u(T),i[T.id]=M,T.addEventListener("dispose",g));const E=S.program;n.updateUBOMapping(T,E);const C=e.render.frame;r[T.id]!==C&&(d(T),r[T.id]=C)}function u(T){const S=h();T.__bindingPointIndex=S;const M=s.createBuffer(),E=T.__size,C=T.usage;return s.bindBuffer(35345,M),s.bufferData(35345,E,C),s.bindBuffer(35345,null),s.bindBufferBase(35345,S,M),M}function h(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(T){const S=i[T.id],M=T.uniforms,E=T.__cache;s.bindBuffer(35345,S);for(let C=0,P=M.length;C<P;C++){const I=M[C];if(p(I,C,E)===!0){const y=I.__offset,L=Array.isArray(I.value)?I.value:[I.value];let K=0;for(let V=0;V<L.length;V++){const O=L[V],H=v(O);typeof O=="number"?(I.__data[0]=O,s.bufferSubData(35345,y+K,I.__data)):O.isMatrix3?(I.__data[0]=O.elements[0],I.__data[1]=O.elements[1],I.__data[2]=O.elements[2],I.__data[3]=O.elements[0],I.__data[4]=O.elements[3],I.__data[5]=O.elements[4],I.__data[6]=O.elements[5],I.__data[7]=O.elements[0],I.__data[8]=O.elements[6],I.__data[9]=O.elements[7],I.__data[10]=O.elements[8],I.__data[11]=O.elements[0]):(O.toArray(I.__data,K),K+=H.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(35345,y,I.__data)}}s.bindBuffer(35345,null)}function p(T,S,M){const E=T.value;if(M[S]===void 0){if(typeof E=="number")M[S]=E;else{const C=Array.isArray(E)?E:[E],P=[];for(let I=0;I<C.length;I++)P.push(C[I].clone());M[S]=P}return!0}else if(typeof E=="number"){if(M[S]!==E)return M[S]=E,!0}else{const C=Array.isArray(M[S])?M[S]:[M[S]],P=Array.isArray(E)?E:[E];for(let I=0;I<C.length;I++){const y=C[I];if(y.equals(P[I])===!1)return y.copy(P[I]),!0}}return!1}function _(T){const S=T.uniforms;let M=0;const E=16;let C=0;for(let P=0,I=S.length;P<I;P++){const y=S[P],L={boundary:0,storage:0},K=Array.isArray(y.value)?y.value:[y.value];for(let V=0,O=K.length;V<O;V++){const H=K[V],W=v(H);L.boundary+=W.boundary,L.storage+=W.storage}if(y.__data=new Float32Array(L.storage/Float32Array.BYTES_PER_ELEMENT),y.__offset=M,P>0){C=M%E;const V=E-C;C!==0&&V-L.boundary<0&&(M+=E-C,y.__offset=M)}M+=L.storage}return C=M%E,C>0&&(M+=E-C),T.__size=M,T.__cache={},this}function v(T){const S={boundary:0,storage:0};return typeof T=="number"?(S.boundary=4,S.storage=4):T.isVector2?(S.boundary=8,S.storage=8):T.isVector3||T.isColor?(S.boundary=16,S.storage=12):T.isVector4?(S.boundary=16,S.storage=16):T.isMatrix3?(S.boundary=48,S.storage=48):T.isMatrix4?(S.boundary=64,S.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),S}function g(T){const S=T.target;S.removeEventListener("dispose",g);const M=a.indexOf(S.__bindingPointIndex);a.splice(M,1),s.deleteBuffer(i[S.id]),delete i[S.id],delete r[S.id]}function f(){for(const T in i)s.deleteBuffer(i[T]);a=[],i={},r={}}return{bind:c,update:l,dispose:f}}function Tg(){const s=Gr("canvas");return s.style.display="block",s}class Wc{constructor(e={}){const{canvas:t=Tg(),context:n=null,depth:i=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=a;let p=null,_=null;const v=[],g=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=xi,this.useLegacyLights=!0,this.toneMapping=zn,this.toneMappingExposure=1;const f=this;let T=!1,S=0,M=0,E=null,C=-1,P=null;const I=new lt,y=new lt;let L=null,K=t.width,V=t.height,O=1,H=null,W=null;const ee=new lt(0,0,K,V),ae=new lt(0,0,K,V);let Q=!1;const pe=new Ja;let ie=!1,Pe=!1,le=null;const j=new Xe,te=new D,ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ce(){return E===null?O:1}let X=n;function Re(b,B){for(let Z=0;Z<b.length;Z++){const G=b[Z],m=t.getContext(G,B);if(m!==null)return m}return null}try{const b={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ns}`),t.addEventListener("webglcontextlost",we,!1),t.addEventListener("webglcontextrestored",ze,!1),t.addEventListener("webglcontextcreationerror",ke,!1),X===null){const B=["webgl2","webgl","experimental-webgl"];if(f.isWebGL1Renderer===!0&&B.shift(),X=Re(B,b),X===null)throw Re(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}X.getShaderPrecisionFormat===void 0&&(X.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Ue,_e,Ie,Ze,Ae,He,_t,St,xt,vt,$e,dt,Ut,R,w,Y,oe,de,xe,De,ye,J,be,Le;function Ce(){Ue=new Fp(X),_e=new Rp(X,Ue,e),Ue.init(_e),J=new vg(X,Ue,_e),Ie=new gg(X,Ue,_e),Ze=new zp,Ae=new ng,He=new _g(X,Ue,Ie,Ae,_e,J,Ze),_t=new Ip(f),St=new Np(f),xt=new Zh(X,_e),be=new Cp(X,Ue,xt,_e),vt=new Op(X,xt,Ze,be),$e=new Vp(X,vt,xt,Ze),xe=new Gp(X,_e,He),Y=new Pp(Ae),dt=new tg(f,_t,St,Ue,_e,be,Y),Ut=new wg(f,Ae),R=new rg,w=new ug(Ue,_e),de=new Ap(f,_t,St,Ie,$e,d,c),oe=new mg(f,$e,_e),Le=new bg(X,Ze,_e,Ie),De=new Lp(X,Ue,Ze,_e),ye=new Bp(X,Ue,Ze,_e),Ze.programs=dt.programs,f.capabilities=_e,f.extensions=Ue,f.properties=Ae,f.renderLists=R,f.shadowMap=oe,f.state=Ie,f.info=Ze}Ce();const me=new Sg(f,X);this.xr=me,this.getContext=function(){return X},this.getContextAttributes=function(){return X.getContextAttributes()},this.forceContextLoss=function(){const b=Ue.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Ue.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(b){b!==void 0&&(O=b,this.setSize(K,V,!1))},this.getSize=function(b){return b.set(K,V)},this.setSize=function(b,B,Z=!0){if(me.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=b,V=B,t.width=Math.floor(b*O),t.height=Math.floor(B*O),Z===!0&&(t.style.width=b+"px",t.style.height=B+"px"),this.setViewport(0,0,b,B)},this.getDrawingBufferSize=function(b){return b.set(K*O,V*O).floor()},this.setDrawingBufferSize=function(b,B,Z){K=b,V=B,O=Z,t.width=Math.floor(b*Z),t.height=Math.floor(B*Z),this.setViewport(0,0,b,B)},this.getCurrentViewport=function(b){return b.copy(I)},this.getViewport=function(b){return b.copy(ee)},this.setViewport=function(b,B,Z,G){b.isVector4?ee.set(b.x,b.y,b.z,b.w):ee.set(b,B,Z,G),Ie.viewport(I.copy(ee).multiplyScalar(O).floor())},this.getScissor=function(b){return b.copy(ae)},this.setScissor=function(b,B,Z,G){b.isVector4?ae.set(b.x,b.y,b.z,b.w):ae.set(b,B,Z,G),Ie.scissor(y.copy(ae).multiplyScalar(O).floor())},this.getScissorTest=function(){return Q},this.setScissorTest=function(b){Ie.setScissorTest(Q=b)},this.setOpaqueSort=function(b){H=b},this.setTransparentSort=function(b){W=b},this.getClearColor=function(b){return b.copy(de.getClearColor())},this.setClearColor=function(){de.setClearColor.apply(de,arguments)},this.getClearAlpha=function(){return de.getClearAlpha()},this.setClearAlpha=function(){de.setClearAlpha.apply(de,arguments)},this.clear=function(b=!0,B=!0,Z=!0){let G=0;b&&(G|=16384),B&&(G|=256),Z&&(G|=1024),X.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",we,!1),t.removeEventListener("webglcontextrestored",ze,!1),t.removeEventListener("webglcontextcreationerror",ke,!1),R.dispose(),w.dispose(),Ae.dispose(),_t.dispose(),St.dispose(),$e.dispose(),be.dispose(),Le.dispose(),dt.dispose(),me.dispose(),me.removeEventListener("sessionstart",Te),me.removeEventListener("sessionend",st),le&&(le.dispose(),le=null),ut.stop()};function we(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function ze(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const b=Ze.autoReset,B=oe.enabled,Z=oe.autoUpdate,G=oe.needsUpdate,m=oe.type;Ce(),Ze.autoReset=b,oe.enabled=B,oe.autoUpdate=Z,oe.needsUpdate=G,oe.type=m}function ke(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function We(b){const B=b.target;B.removeEventListener("dispose",We),F(B)}function F(b){N(b),Ae.remove(b)}function N(b){const B=Ae.get(b).programs;B!==void 0&&(B.forEach(function(Z){dt.releaseProgram(Z)}),b.isShaderMaterial&&dt.releaseShaderCache(b))}this.renderBufferDirect=function(b,B,Z,G,m,x){B===null&&(B=ge);const A=m.isMesh&&m.matrixWorld.determinant()<0,U=Ti(b,B,Z,G,m);Ie.setMaterial(G,A);let z=Z.index,k=1;G.wireframe===!0&&(z=vt.getWireframeAttribute(Z),k=2);const $=Z.drawRange,q=Z.attributes.position;let ne=$.start*k,se=($.start+$.count)*k;x!==null&&(ne=Math.max(ne,x.start*k),se=Math.min(se,(x.start+x.count)*k)),z!==null?(ne=Math.max(ne,0),se=Math.min(se,z.count)):q!=null&&(ne=Math.max(ne,0),se=Math.min(se,q.count));const ue=se-ne;if(ue<0||ue===1/0)return;be.setup(m,G,U,Z,z);let fe,Oe=De;if(z!==null&&(fe=xt.get(z),Oe=ye,Oe.setIndex(fe)),m.isMesh)G.wireframe===!0?(Ie.setLineWidth(G.wireframeLinewidth*ce()),Oe.setMode(1)):Oe.setMode(4);else if(m.isLine){let he=G.linewidth;he===void 0&&(he=1),Ie.setLineWidth(he*ce()),m.isLineSegments?Oe.setMode(1):m.isLineLoop?Oe.setMode(2):Oe.setMode(3)}else m.isPoints?Oe.setMode(0):m.isSprite&&Oe.setMode(4);if(m.isInstancedMesh)Oe.renderInstances(ne,ue,m.count);else if(Z.isInstancedBufferGeometry){const he=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Ee=Math.min(Z.instanceCount,he);Oe.renderInstances(ne,ue,Ee)}else Oe.render(ne,ue)},this.compile=function(b,B){function Z(G,m,x){G.transparent===!0&&G.side===Qt&&G.forceSinglePass===!1?(G.side=jt,G.needsUpdate=!0,bi(G,m,x),G.side=En,G.needsUpdate=!0,bi(G,m,x),G.side=Qt):bi(G,m,x)}_=w.get(b),_.init(),g.push(_),b.traverseVisible(function(G){G.isLight&&G.layers.test(B.layers)&&(_.pushLight(G),G.castShadow&&_.pushShadow(G))}),_.setupLights(f.useLegacyLights),b.traverse(function(G){const m=G.material;if(m)if(Array.isArray(m))for(let x=0;x<m.length;x++){const A=m[x];Z(A,b,G)}else Z(m,b,G)}),g.pop(),_=null};let re=null;function Me(b){re&&re(b)}function Te(){ut.stop()}function st(){ut.start()}const ut=new zc;ut.setAnimationLoop(Me),typeof self<"u"&&ut.setContext(self),this.setAnimationLoop=function(b){re=b,me.setAnimationLoop(b),b===null?ut.stop():ut.start()},me.addEventListener("sessionstart",Te),me.addEventListener("sessionend",st),this.render=function(b,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),me.enabled===!0&&me.isPresenting===!0&&(me.cameraAutoUpdate===!0&&me.updateCamera(B),B=me.getCamera()),b.isScene===!0&&b.onBeforeRender(f,b,B,E),_=w.get(b,g.length),_.init(),g.push(_),j.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),pe.setFromProjectionMatrix(j),Pe=this.localClippingEnabled,ie=Y.init(this.clippingPlanes,Pe),p=R.get(b,v.length),p.init(),v.push(p),At(b,B,0,f.sortObjects),p.finish(),f.sortObjects===!0&&p.sort(H,W),ie===!0&&Y.beginShadows();const Z=_.state.shadowsArray;if(oe.render(Z,b,B),ie===!0&&Y.endShadows(),this.info.autoReset===!0&&this.info.reset(),de.render(p,b),_.setupLights(f.useLegacyLights),B.isArrayCamera){const G=B.cameras;for(let m=0,x=G.length;m<x;m++){const A=G[m];Sn(p,b,A,A.viewport)}}else Sn(p,b,B);E!==null&&(He.updateMultisampleRenderTarget(E),He.updateRenderTargetMipmap(E)),b.isScene===!0&&b.onAfterRender(f,b,B),be.resetDefaultState(),C=-1,P=null,g.pop(),g.length>0?_=g[g.length-1]:_=null,v.pop(),v.length>0?p=v[v.length-1]:p=null};function At(b,B,Z,G){if(b.visible===!1)return;if(b.layers.test(B.layers)){if(b.isGroup)Z=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(B);else if(b.isLight)_.pushLight(b),b.castShadow&&_.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||pe.intersectsSprite(b)){G&&te.setFromMatrixPosition(b.matrixWorld).applyMatrix4(j);const A=$e.update(b),U=b.material;U.visible&&p.push(b,A,U,Z,te.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(b.isSkinnedMesh&&b.skeleton.frame!==Ze.render.frame&&(b.skeleton.update(),b.skeleton.frame=Ze.render.frame),!b.frustumCulled||pe.intersectsObject(b))){G&&te.setFromMatrixPosition(b.matrixWorld).applyMatrix4(j);const A=$e.update(b),U=b.material;if(Array.isArray(U)){const z=A.groups;for(let k=0,$=z.length;k<$;k++){const q=z[k],ne=U[q.materialIndex];ne&&ne.visible&&p.push(b,A,ne,Z,te.z,q)}}else U.visible&&p.push(b,A,U,Z,te.z,null)}}const x=b.children;for(let A=0,U=x.length;A<U;A++)At(x[A],B,Z,G)}function Sn(b,B,Z,G){const m=b.opaque,x=b.transmissive,A=b.transparent;_.setupLightsView(Z),ie===!0&&Y.setGlobalState(f.clippingPlanes,Z),x.length>0&&pt(m,x,B,Z),G&&Ie.viewport(I.copy(G)),m.length>0&&Vt(m,B,Z),x.length>0&&Vt(x,B,Z),A.length>0&&Vt(A,B,Z),Ie.buffers.depth.setTest(!0),Ie.buffers.depth.setMask(!0),Ie.buffers.color.setMask(!0),Ie.setPolygonOffset(!1)}function pt(b,B,Z,G){if(le===null){const U=_e.isWebGL2;le=new Mi(1024,1024,{generateMipmaps:!0,type:Ue.has("EXT_color_buffer_half_float")?Fn:vi,minFilter:ti,samples:U&&o===!0?4:0})}const m=f.getRenderTarget();f.setRenderTarget(le),f.clear();const x=f.toneMapping;f.toneMapping=zn,Vt(b,Z,G),He.updateMultisampleRenderTarget(le),He.updateRenderTargetMipmap(le);let A=!1;for(let U=0,z=B.length;U<z;U++){const k=B[U],$=k.object,q=k.geometry,ne=k.material,se=k.group;if(ne.side===Qt&&$.layers.test(G.layers)){const ue=ne.side;ne.side=jt,ne.needsUpdate=!0,tn($,Z,G,q,ne,se),ne.side=ue,ne.needsUpdate=!0,A=!0}}A===!0&&(He.updateMultisampleRenderTarget(le),He.updateRenderTargetMipmap(le)),f.setRenderTarget(m),f.toneMapping=x}function Vt(b,B,Z){const G=B.isScene===!0?B.overrideMaterial:null;for(let m=0,x=b.length;m<x;m++){const A=b[m],U=A.object,z=A.geometry,k=G===null?A.material:G,$=A.group;U.layers.test(Z.layers)&&tn(U,B,Z,z,k,$)}}function tn(b,B,Z,G,m,x){b.onBeforeRender(f,B,Z,G,m,x),b.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),m.onBeforeRender(f,B,Z,G,b,x),m.transparent===!0&&m.side===Qt&&m.forceSinglePass===!1?(m.side=jt,m.needsUpdate=!0,f.renderBufferDirect(Z,B,G,m,b,x),m.side=En,m.needsUpdate=!0,f.renderBufferDirect(Z,B,G,m,b,x),m.side=Qt):f.renderBufferDirect(Z,B,G,m,b,x),b.onAfterRender(f,B,Z,G,m,x)}function bi(b,B,Z){B.isScene!==!0&&(B=ge);const G=Ae.get(b),m=_.state.lights,x=_.state.shadowsArray,A=m.state.version,U=dt.getParameters(b,m.state,x,B,Z),z=dt.getProgramCacheKey(U);let k=G.programs;G.environment=b.isMeshStandardMaterial?B.environment:null,G.fog=B.fog,G.envMap=(b.isMeshStandardMaterial?St:_t).get(b.envMap||G.environment),k===void 0&&(b.addEventListener("dispose",We),k=new Map,G.programs=k);let $=k.get(z);if($!==void 0){if(G.currentProgram===$&&G.lightsStateVersion===A)return Yr(b,U),$}else U.uniforms=dt.getUniforms(b),b.onBuild(Z,U,f),b.onBeforeCompile(U,f),$=dt.acquireProgram(U,z),k.set(z,$),G.uniforms=U.uniforms;const q=G.uniforms;(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(q.clippingPlanes=Y.uniform),Yr(b,U),G.needsLights=ii(b),G.lightsStateVersion=A,G.needsLights&&(q.ambientLightColor.value=m.state.ambient,q.lightProbe.value=m.state.probe,q.directionalLights.value=m.state.directional,q.directionalLightShadows.value=m.state.directionalShadow,q.spotLights.value=m.state.spot,q.spotLightShadows.value=m.state.spotShadow,q.rectAreaLights.value=m.state.rectArea,q.ltc_1.value=m.state.rectAreaLTC1,q.ltc_2.value=m.state.rectAreaLTC2,q.pointLights.value=m.state.point,q.pointLightShadows.value=m.state.pointShadow,q.hemisphereLights.value=m.state.hemi,q.directionalShadowMap.value=m.state.directionalShadowMap,q.directionalShadowMatrix.value=m.state.directionalShadowMatrix,q.spotShadowMap.value=m.state.spotShadowMap,q.spotLightMatrix.value=m.state.spotLightMatrix,q.spotLightMap.value=m.state.spotLightMap,q.pointShadowMap.value=m.state.pointShadowMap,q.pointShadowMatrix.value=m.state.pointShadowMatrix);const ne=$.getUniforms(),se=Ls.seqWithValue(ne.seq,q);return G.currentProgram=$,G.uniformsList=se,$}function Yr(b,B){const Z=Ae.get(b);Z.outputEncoding=B.outputEncoding,Z.instancing=B.instancing,Z.skinning=B.skinning,Z.morphTargets=B.morphTargets,Z.morphNormals=B.morphNormals,Z.morphColors=B.morphColors,Z.morphTargetsCount=B.morphTargetsCount,Z.numClippingPlanes=B.numClippingPlanes,Z.numIntersection=B.numClipIntersection,Z.vertexAlphas=B.vertexAlphas,Z.vertexTangents=B.vertexTangents,Z.toneMapping=B.toneMapping}function Ti(b,B,Z,G,m){B.isScene!==!0&&(B=ge),He.resetTextureUnits();const x=B.fog,A=G.isMeshStandardMaterial?B.environment:null,U=E===null?f.outputEncoding:E.isXRRenderTarget===!0?E.texture.encoding:xi,z=(G.isMeshStandardMaterial?St:_t).get(G.envMap||A),k=G.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,$=!!G.normalMap&&!!Z.attributes.tangent,q=!!Z.morphAttributes.position,ne=!!Z.morphAttributes.normal,se=!!Z.morphAttributes.color,ue=G.toneMapped?f.toneMapping:zn,fe=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Oe=fe!==void 0?fe.length:0,he=Ae.get(G),Ee=_.state.lights;if(ie===!0&&(Pe===!0||b!==P)){const Ge=b===P&&G.id===C;Y.setState(G,b,Ge)}let Se=!1;G.version===he.__version?(he.needsLights&&he.lightsStateVersion!==Ee.state.version||he.outputEncoding!==U||m.isInstancedMesh&&he.instancing===!1||!m.isInstancedMesh&&he.instancing===!0||m.isSkinnedMesh&&he.skinning===!1||!m.isSkinnedMesh&&he.skinning===!0||he.envMap!==z||G.fog===!0&&he.fog!==x||he.numClippingPlanes!==void 0&&(he.numClippingPlanes!==Y.numPlanes||he.numIntersection!==Y.numIntersection)||he.vertexAlphas!==k||he.vertexTangents!==$||he.morphTargets!==q||he.morphNormals!==ne||he.morphColors!==se||he.toneMapping!==ue||_e.isWebGL2===!0&&he.morphTargetsCount!==Oe)&&(Se=!0):(Se=!0,he.__version=G.version);let Ne=he.currentProgram;Se===!0&&(Ne=bi(G,B,m));let Qe=!1,Ye=!1,mt=!1;const Je=Ne.getUniforms(),je=he.uniforms;if(Ie.useProgram(Ne.program)&&(Qe=!0,Ye=!0,mt=!0),G.id!==C&&(C=G.id,Ye=!0),Qe||P!==b){if(Je.setValue(X,"projectionMatrix",b.projectionMatrix),_e.logarithmicDepthBuffer&&Je.setValue(X,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),P!==b&&(P=b,Ye=!0,mt=!0),G.isShaderMaterial||G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshStandardMaterial||G.envMap){const Ge=Je.map.cameraPosition;Ge!==void 0&&Ge.setValue(X,te.setFromMatrixPosition(b.matrixWorld))}(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&Je.setValue(X,"isOrthographic",b.isOrthographicCamera===!0),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial||G.isShadowMaterial||m.isSkinnedMesh)&&Je.setValue(X,"viewMatrix",b.matrixWorldInverse)}if(m.isSkinnedMesh){Je.setOptional(X,m,"bindMatrix"),Je.setOptional(X,m,"bindMatrixInverse");const Ge=m.skeleton;Ge&&(_e.floatVertexTextures?(Ge.boneTexture===null&&Ge.computeBoneTexture(),Je.setValue(X,"boneTexture",Ge.boneTexture,He),Je.setValue(X,"boneTextureSize",Ge.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const Wt=Z.morphAttributes;if((Wt.position!==void 0||Wt.normal!==void 0||Wt.color!==void 0&&_e.isWebGL2===!0)&&xe.update(m,Z,Ne),(Ye||he.receiveShadow!==m.receiveShadow)&&(he.receiveShadow=m.receiveShadow,Je.setValue(X,"receiveShadow",m.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(je.envMap.value=z,je.flipEnvMap.value=z.isCubeTexture&&z.isRenderTargetTexture===!1?-1:1),Ye&&(Je.setValue(X,"toneMappingExposure",f.toneMappingExposure),he.needsLights&&Hs(je,mt),x&&G.fog===!0&&Ut.refreshFogUniforms(je,x),Ut.refreshMaterialUniforms(je,G,O,V,le),Ls.upload(X,he.uniformsList,je,He)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Ls.upload(X,he.uniformsList,je,He),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&Je.setValue(X,"center",m.center),Je.setValue(X,"modelViewMatrix",m.modelViewMatrix),Je.setValue(X,"normalMatrix",m.normalMatrix),Je.setValue(X,"modelMatrix",m.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Ge=G.uniformsGroups;for(let gt=0,pn=Ge.length;gt<pn;gt++)if(_e.isWebGL2){const Vn=Ge[gt];Le.update(Vn,Ne),Le.bind(Vn,Ne)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Ne}function Hs(b,B){b.ambientLightColor.needsUpdate=B,b.lightProbe.needsUpdate=B,b.directionalLights.needsUpdate=B,b.directionalLightShadows.needsUpdate=B,b.pointLights.needsUpdate=B,b.pointLightShadows.needsUpdate=B,b.spotLights.needsUpdate=B,b.spotLightShadows.needsUpdate=B,b.rectAreaLights.needsUpdate=B,b.hemisphereLights.needsUpdate=B}function ii(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(b,B,Z){Ae.get(b.texture).__webglTexture=B,Ae.get(b.depthTexture).__webglTexture=Z;const G=Ae.get(b);G.__hasExternalTextures=!0,G.__hasExternalTextures&&(G.__autoAllocateDepthBuffer=Z===void 0,G.__autoAllocateDepthBuffer||Ue.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(b,B){const Z=Ae.get(b);Z.__webglFramebuffer=B,Z.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(b,B=0,Z=0){E=b,S=B,M=Z;let G=!0,m=null,x=!1,A=!1;if(b){const z=Ae.get(b);z.__useDefaultFramebuffer!==void 0?(Ie.bindFramebuffer(36160,null),G=!1):z.__webglFramebuffer===void 0?He.setupRenderTarget(b):z.__hasExternalTextures&&He.rebindTextures(b,Ae.get(b.texture).__webglTexture,Ae.get(b.depthTexture).__webglTexture);const k=b.texture;(k.isData3DTexture||k.isDataArrayTexture||k.isCompressedArrayTexture)&&(A=!0);const $=Ae.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(m=$[B],x=!0):_e.isWebGL2&&b.samples>0&&He.useMultisampledRTT(b)===!1?m=Ae.get(b).__webglMultisampledFramebuffer:m=$,I.copy(b.viewport),y.copy(b.scissor),L=b.scissorTest}else I.copy(ee).multiplyScalar(O).floor(),y.copy(ae).multiplyScalar(O).floor(),L=Q;if(Ie.bindFramebuffer(36160,m)&&_e.drawBuffers&&G&&Ie.drawBuffers(b,m),Ie.viewport(I),Ie.scissor(y),Ie.setScissorTest(L),x){const z=Ae.get(b.texture);X.framebufferTexture2D(36160,36064,34069+B,z.__webglTexture,Z)}else if(A){const z=Ae.get(b.texture),k=B||0;X.framebufferTextureLayer(36160,36064,z.__webglTexture,Z||0,k)}C=-1},this.readRenderTargetPixels=function(b,B,Z,G,m,x,A){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let U=Ae.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&A!==void 0&&(U=U[A]),U){Ie.bindFramebuffer(36160,U);try{const z=b.texture,k=z.format,$=z.type;if(k!==en&&J.convert(k)!==X.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const q=$===Fn&&(Ue.has("EXT_color_buffer_half_float")||_e.isWebGL2&&Ue.has("EXT_color_buffer_float"));if($!==vi&&J.convert($)!==X.getParameter(35738)&&!($===xn&&(_e.isWebGL2||Ue.has("OES_texture_float")||Ue.has("WEBGL_color_buffer_float")))&&!q){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=b.width-G&&Z>=0&&Z<=b.height-m&&X.readPixels(B,Z,G,m,J.convert(k),J.convert($),x)}finally{const z=E!==null?Ae.get(E).__webglFramebuffer:null;Ie.bindFramebuffer(36160,z)}}},this.copyFramebufferToTexture=function(b,B,Z=0){const G=Math.pow(2,-Z),m=Math.floor(B.image.width*G),x=Math.floor(B.image.height*G);He.setTexture2D(B,0),X.copyTexSubImage2D(3553,Z,0,0,b.x,b.y,m,x),Ie.unbindTexture()},this.copyTextureToTexture=function(b,B,Z,G=0){const m=B.image.width,x=B.image.height,A=J.convert(Z.format),U=J.convert(Z.type);He.setTexture2D(Z,0),X.pixelStorei(37440,Z.flipY),X.pixelStorei(37441,Z.premultiplyAlpha),X.pixelStorei(3317,Z.unpackAlignment),B.isDataTexture?X.texSubImage2D(3553,G,b.x,b.y,m,x,A,U,B.image.data):B.isCompressedTexture?X.compressedTexSubImage2D(3553,G,b.x,b.y,B.mipmaps[0].width,B.mipmaps[0].height,A,B.mipmaps[0].data):X.texSubImage2D(3553,G,b.x,b.y,A,U,B.image),G===0&&Z.generateMipmaps&&X.generateMipmap(3553),Ie.unbindTexture()},this.copyTextureToTexture3D=function(b,B,Z,G,m=0){if(f.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const x=b.max.x-b.min.x+1,A=b.max.y-b.min.y+1,U=b.max.z-b.min.z+1,z=J.convert(G.format),k=J.convert(G.type);let $;if(G.isData3DTexture)He.setTexture3D(G,0),$=32879;else if(G.isDataArrayTexture)He.setTexture2DArray(G,0),$=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}X.pixelStorei(37440,G.flipY),X.pixelStorei(37441,G.premultiplyAlpha),X.pixelStorei(3317,G.unpackAlignment);const q=X.getParameter(3314),ne=X.getParameter(32878),se=X.getParameter(3316),ue=X.getParameter(3315),fe=X.getParameter(32877),Oe=Z.isCompressedTexture?Z.mipmaps[0]:Z.image;X.pixelStorei(3314,Oe.width),X.pixelStorei(32878,Oe.height),X.pixelStorei(3316,b.min.x),X.pixelStorei(3315,b.min.y),X.pixelStorei(32877,b.min.z),Z.isDataTexture||Z.isData3DTexture?X.texSubImage3D($,m,B.x,B.y,B.z,x,A,U,z,k,Oe.data):Z.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),X.compressedTexSubImage3D($,m,B.x,B.y,B.z,x,A,U,z,Oe.data)):X.texSubImage3D($,m,B.x,B.y,B.z,x,A,U,z,k,Oe),X.pixelStorei(3314,q),X.pixelStorei(32878,ne),X.pixelStorei(3316,se),X.pixelStorei(3315,ue),X.pixelStorei(32877,fe),m===0&&G.generateMipmaps&&X.generateMipmap($),Ie.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?He.setTextureCube(b,0):b.isData3DTexture?He.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?He.setTexture2DArray(b,0):He.setTexture2D(b,0),Ie.unbindTexture()},this.resetState=function(){S=0,M=0,E=null,Ie.reset(),be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(e){console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!e}}class Eg extends Wc{}Eg.prototype.isWebGL1Renderer=!0;class Ag extends rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(e){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=e}}class Xc{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Na,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=Mn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Mn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Mn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Bt=new D;class Vr{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=On(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=On(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=On(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=On(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array),r=ot(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Gt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Vr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class qc extends hn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Fe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Gi;const Mr=new D,Vi=new D,Wi=new D,Xi=new Be,yr=new Be,jc=new Xe,gs=new D,Sr=new D,_s=new D,Ll=new Be,ga=new Be,Rl=new Be;class Cg extends rt{constructor(e){if(super(),this.isSprite=!0,this.type="Sprite",Gi===void 0){Gi=new fn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Xc(t,5);Gi.setIndex([0,1,2,0,2,3]),Gi.setAttribute("position",new Vr(n,3,0,!1)),Gi.setAttribute("uv",new Vr(n,2,3,!1))}this.geometry=Gi,this.material=e!==void 0?e:new qc,this.center=new Be(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Vi.setFromMatrixScale(this.matrixWorld),jc.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Wi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Vi.multiplyScalar(-Wi.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;vs(gs.set(-.5,-.5,0),Wi,a,Vi,i,r),vs(Sr.set(.5,-.5,0),Wi,a,Vi,i,r),vs(_s.set(.5,.5,0),Wi,a,Vi,i,r),Ll.set(0,0),ga.set(1,0),Rl.set(1,1);let o=e.ray.intersectTriangle(gs,Sr,_s,!1,Mr);if(o===null&&(vs(Sr.set(-.5,.5,0),Wi,a,Vi,i,r),ga.set(0,1),o=e.ray.intersectTriangle(gs,_s,Sr,!1,Mr),o===null))return;const c=e.ray.origin.distanceTo(Mr);c<e.near||c>e.far||t.push({distance:c,point:Mr.clone(),uv:ln.getInterpolation(Mr,gs,Sr,_s,Ll,ga,Rl,new Be),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function vs(s,e,t,n,i,r){Xi.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(yr.x=r*Xi.x-i*Xi.y,yr.y=i*Xi.x+r*Xi.y):yr.copy(Xi),s.copy(e),s.x+=yr.x,s.y+=yr.y,s.applyMatrix4(jc)}const Pl=new D,Il=new lt,Dl=new lt,Lg=new D,Ul=new Xe,qi=new D;class Rg extends tt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new Xe,this.bindMatrixInverse=new Xe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new yn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)qi.fromBufferAttribute(t,n),this.applyBoneTransform(n,qi),this.boundingBox.expandByPoint(qi)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Gn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)qi.fromBufferAttribute(t,n),this.applyBoneTransform(n,qi),this.boundingSphere.expandByPoint(qi)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new lt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode==="attached"?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode==="detached"?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Il.fromBufferAttribute(i.attributes.skinIndex,e),Dl.fromBufferAttribute(i.attributes.skinWeight,e),Pl.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=Dl.getComponent(r);if(a!==0){const o=Il.getComponent(r);Ul.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Lg.copy(Pl).applyMatrix4(Ul),a)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}}class Kc extends rt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Yc extends It{constructor(e=null,t=1,n=1,i,r,a,o,c,l=Rt,u=Rt,h,d){super(null,a,o,c,l,u,i,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Nl=new Xe,Pg=new Xe;class to{constructor(e=[],t=[]){this.uuid=Mn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.boneTextureSize=0,this.frame=-1,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Xe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Xe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:Pg;Nl.multiplyMatrices(o,t[r]),Nl.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new to(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Ac(e),e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Yc(t,e,e,en,xn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this.boneTextureSize=e,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Kc),this.bones.push(a),this.boneInverses.push(new Xe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.5,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class Fl extends Gt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ji=new Xe,Ol=new Xe,xs=[],Bl=new yn,Ig=new Xe,wr=new tt,br=new Gn;class Dg extends tt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Fl(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Ig)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new yn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ji),Bl.copy(e.boundingBox).applyMatrix4(ji),this.boundingBox.union(Bl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Gn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ji),br.copy(e.boundingSphere).applyMatrix4(ji),this.boundingSphere.union(br)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,i=this.count;if(wr.geometry=this.geometry,wr.material=this.material,wr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),br.copy(this.boundingSphere),br.applyMatrix4(n),e.ray.intersectsSphere(br)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,ji),Ol.multiplyMatrices(n,ji),wr.matrixWorld=Ol,wr.raycast(e,xs);for(let a=0,o=xs.length;a<o;a++){const c=xs[a];c.instanceId=r,c.object=this,t.push(c)}xs.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Fl(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Zc extends hn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Fe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const zl=new D,kl=new D,Hl=new Xe,_a=new Os,Ms=new Gn;class no extends rt{constructor(e=new fn,t=new Zc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)zl.fromBufferAttribute(t,i-1),kl.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=zl.distanceTo(kl);e.setAttribute("lineDistance",new dn(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ms.copy(n.boundingSphere),Ms.applyMatrix4(i),Ms.radius+=r,e.ray.intersectsSphere(Ms)===!1)return;Hl.copy(i).invert(),_a.copy(e.ray).applyMatrix4(Hl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=new D,u=new D,h=new D,d=new D,p=this.isLineSegments?2:1,_=n.index,g=n.attributes.position;if(_!==null){const f=Math.max(0,a.start),T=Math.min(_.count,a.start+a.count);for(let S=f,M=T-1;S<M;S+=p){const E=_.getX(S),C=_.getX(S+1);if(l.fromBufferAttribute(g,E),u.fromBufferAttribute(g,C),_a.distanceSqToSegment(l,u,d,h)>c)continue;d.applyMatrix4(this.matrixWorld);const I=e.ray.origin.distanceTo(d);I<e.near||I>e.far||t.push({distance:I,point:h.clone().applyMatrix4(this.matrixWorld),index:S,face:null,faceIndex:null,object:this})}}else{const f=Math.max(0,a.start),T=Math.min(g.count,a.start+a.count);for(let S=f,M=T-1;S<M;S+=p){if(l.fromBufferAttribute(g,S),u.fromBufferAttribute(g,S+1),_a.distanceSqToSegment(l,u,d,h)>c)continue;d.applyMatrix4(this.matrixWorld);const C=e.ray.origin.distanceTo(d);C<e.near||C>e.far||t.push({distance:C,point:h.clone().applyMatrix4(this.matrixWorld),index:S,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}const Gl=new D,Vl=new D;class Ug extends no{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Gl.fromBufferAttribute(t,i),Vl.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Gl.distanceTo(Vl);e.setAttribute("lineDistance",new dn(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ng extends no{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class $c extends hn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Fe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Wl=new Xe,ka=new Os,ys=new Gn,Ss=new D;class Fg extends rt{constructor(e=new fn,t=new $c){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ys.copy(n.boundingSphere),ys.applyMatrix4(i),ys.radius+=r,e.ray.intersectsSphere(ys)===!1)return;Wl.copy(i).invert(),ka.copy(e.ray).applyMatrix4(Wl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null){const d=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);for(let _=d,v=p;_<v;_++){const g=l.getX(_);Ss.fromBufferAttribute(h,g),Xl(Ss,g,c,i,e,t,this)}}else{const d=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let _=d,v=p;_<v;_++)Ss.fromBufferAttribute(h,_),Xl(Ss,_,c,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Xl(s,e,t,n,i,r,a){const o=ka.distanceSqToPoint(s);if(o<t){const c=new D;ka.closestPointToPoint(s,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,object:a})}}class gi extends It{constructor(e,t,n,i,r,a,o,c,l){super(e,t,n,i,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Is extends fn{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const u=[],h=[],d=[],p=[];let _=0;const v=[],g=n/2;let f=0;T(),a===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new dn(h,3)),this.setAttribute("normal",new dn(d,3)),this.setAttribute("uv",new dn(p,2));function T(){const M=new D,E=new D;let C=0;const P=(t-e)/n;for(let I=0;I<=r;I++){const y=[],L=I/r,K=L*(t-e)+e;for(let V=0;V<=i;V++){const O=V/i,H=O*c+o,W=Math.sin(H),ee=Math.cos(H);E.x=K*W,E.y=-L*n+g,E.z=K*ee,h.push(E.x,E.y,E.z),M.set(W,P,ee).normalize(),d.push(M.x,M.y,M.z),p.push(O,1-L),y.push(_++)}v.push(y)}for(let I=0;I<i;I++)for(let y=0;y<r;y++){const L=v[y][I],K=v[y+1][I],V=v[y+1][I+1],O=v[y][I+1];u.push(L,K,O),u.push(K,V,O),C+=6}l.addGroup(f,C,0),f+=C}function S(M){const E=_,C=new Be,P=new D;let I=0;const y=M===!0?e:t,L=M===!0?1:-1;for(let V=1;V<=i;V++)h.push(0,g*L,0),d.push(0,L,0),p.push(.5,.5),_++;const K=_;for(let V=0;V<=i;V++){const H=V/i*c+o,W=Math.cos(H),ee=Math.sin(H);P.x=y*ee,P.y=g*L,P.z=y*W,h.push(P.x,P.y,P.z),d.push(0,L,0),C.x=W*.5+.5,C.y=ee*.5*L+.5,p.push(C.x,C.y),_++}for(let V=0;V<i;V++){const O=E+V,H=K+V;M===!0?u.push(H,H+1,O):u.push(H+1,H,O),I+=3}l.addGroup(f,I,M===!0?1:2),f+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Is(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Xt extends hn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Fe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ya,this.normalScale=new Be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ni extends Xt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Be(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Dt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Fe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Fe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Fe(1,1,1),this.specularColorMap=null,this._sheen=0,this._clearcoat=0,this._iridescence=0,this._transmission=0,this.setValues(e)}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Og extends hn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ya,this.normalScale=new Be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ka,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function Yn(s,e,t){return Jc(s)?new s.constructor(s.subarray(e,t!==void 0?t:s.length)):s.slice(e,t)}function ws(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Jc(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Bg(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function ql(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let c=0;c!==e;++c)i[a++]=s[o+c]}return i}function Qc(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}class qr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class zg extends qr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ho,endingEnd:Ho}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,a=e+1,o=i[r],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Go:r=e,o=2*t-n;break;case Vo:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Go:a=e,c=2*n-t;break;case Vo:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}const l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,p=this._weightNext,_=(n-t)/(i-t),v=_*_,g=v*_,f=-d*g+2*d*v-d*_,T=(1+d)*g+(-1.5-2*d)*v+(-.5+d)*_+1,S=(-1-p)*g+(1.5+p)*v+.5*_,M=p*g-p*v;for(let E=0;E!==o;++E)r[E]=f*a[u+E]+T*a[l+E]+S*a[c+E]+M*a[h+E];return r}}class kg extends qr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(n-t)/(i-t),h=1-u;for(let d=0;d!==o;++d)r[d]=a[l+d]*h+a[c+d]*u;return r}}class Hg extends qr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class An{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ws(t,this.TimeBufferType),this.values=ws(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ws(e.times,Array),values:ws(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Hg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new kg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new zg(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case kr:t=this.InterpolantFactoryMethodDiscrete;break;case or:t=this.InterpolantFactoryMethodLinear;break;case js:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return kr;case this.InterpolantFactoryMethodLinear:return or;case this.InterpolantFactoryMethodSmooth:return js}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=Yn(n,r,a),this.values=Yn(this.values,r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&Jc(i))for(let o=0,c=i.length;o!==c;++o){const l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){const e=Yn(this.times),t=Yn(this.values),n=this.getValueSize(),i=this.getInterpolation()===js,r=e.length-1;let a=1;for(let o=1;o<r;++o){let c=!1;const l=e[o],u=e[o+1];if(l!==u&&(o!==1||l!==e[0]))if(i)c=!0;else{const h=o*n,d=h-n,p=h+n;for(let _=0;_!==n;++_){const v=t[h+_];if(v!==t[d+_]||v!==t[p+_]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];const h=o*n,d=a*n;for(let p=0;p!==n;++p)t[d+p]=t[h+p]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=Yn(e,0,a),this.values=Yn(t,0,a*n)):(this.times=e,this.values=t),this}clone(){const e=Yn(this.times,0),t=Yn(this.values,0),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}An.prototype.TimeBufferType=Float32Array;An.prototype.ValueBufferType=Float32Array;An.prototype.DefaultInterpolation=or;class pr extends An{}pr.prototype.ValueTypeName="bool";pr.prototype.ValueBufferType=Array;pr.prototype.DefaultInterpolation=kr;pr.prototype.InterpolantFactoryMethodLinear=void 0;pr.prototype.InterpolantFactoryMethodSmooth=void 0;class eu extends An{}eu.prototype.ValueTypeName="color";class Wr extends An{}Wr.prototype.ValueTypeName="number";class Gg extends qr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t);let l=e*o;for(let u=l+o;l!==u;l+=4)Hn.slerpFlat(r,0,a,l-o,a,l,c);return r}}class Si extends An{InterpolantFactoryMethodLinear(e){return new Gg(this.times,this.values,this.getValueSize(),e)}}Si.prototype.ValueTypeName="quaternion";Si.prototype.DefaultInterpolation=or;Si.prototype.InterpolantFactoryMethodSmooth=void 0;class mr extends An{}mr.prototype.ValueTypeName="string";mr.prototype.ValueBufferType=Array;mr.prototype.DefaultInterpolation=kr;mr.prototype.InterpolantFactoryMethodLinear=void 0;mr.prototype.InterpolantFactoryMethodSmooth=void 0;class Xr extends An{}Xr.prototype.ValueTypeName="vector";class Vg{constructor(e,t=-1,n,i=nh){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Mn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Xg(n[a]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(An.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);const u=Bg(c);c=ql(c,1,u),l=ql(l,1,u),!i&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new Wr(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){const l=e[o],u=l.name.match(r);if(u&&u.length>1){const h=u[1];let d=i[h];d||(i[h]=d=[]),d.push(l)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,p,_,v){if(p.length!==0){const g=[],f=[];Qc(p,g,f,_),g.length!==0&&v.push(new h(d,g,f))}},i=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let h=0;h<l.length;h++){const d=l[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const p={};let _;for(_=0;_<d.length;_++)if(d[_].morphTargets)for(let v=0;v<d[_].morphTargets.length;v++)p[d[_].morphTargets[v]]=-1;for(const v in p){const g=[],f=[];for(let T=0;T!==d[_].morphTargets.length;++T){const S=d[_];g.push(S.time),f.push(S.morphTarget===v?1:0)}i.push(new Wr(".morphTargetInfluence["+v+"]",g,f))}c=p.length*a}else{const p=".bones["+t[h].name+"]";n(Xr,p+".position",d,"pos",i),n(Si,p+".quaternion",d,"rot",i),n(Xr,p+".scale",d,"scl",i)}}return i.length===0?null:new this(r,c,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Wg(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Wr;case"vector":case"vector2":case"vector3":case"vector4":return Xr;case"color":return eu;case"quaternion":return Si;case"bool":case"boolean":return pr;case"string":return mr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Xg(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Wg(s.type);if(s.times===void 0){const t=[],n=[];Qc(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const ur={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class qg{constructor(e,t,n){const i=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){o++,r===!1&&i.onStart!==void 0&&i.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,i.onProgress!==void 0&&i.onProgress(u,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=l.length;h<d;h+=2){const p=l[h],_=l[h+1];if(p.global&&(p.lastIndex=0),p.test(u))return _}return null}}}const io=new qg;class wi{constructor(e){this.manager=e!==void 0?e:io,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}const Un={};class jg extends Error{constructor(e,t){super(e),this.response=t}}class zs extends wi{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=ur.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Un[e]!==void 0){Un[e].push({onLoad:t,onProgress:n,onError:i});return}Un[e]=[],Un[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=Un[e],h=l.body.getReader(),d=l.headers.get("Content-Length")||l.headers.get("X-File-Size"),p=d?parseInt(d):0,_=p!==0;let v=0;const g=new ReadableStream({start(f){T();function T(){h.read().then(({done:S,value:M})=>{if(S)f.close();else{v+=M.byteLength;const E=new ProgressEvent("progress",{lengthComputable:_,loaded:v,total:p});for(let C=0,P=u.length;C<P;C++){const I=u[C];I.onProgress&&I.onProgress(E)}f.enqueue(M),T()}})}}});return new Response(g)}else throw new jg(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o===void 0)return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,p=new TextDecoder(d);return l.arrayBuffer().then(_=>p.decode(_))}}}).then(l=>{ur.add(e,l);const u=Un[e];delete Un[e];for(let h=0,d=u.length;h<d;h++){const p=u[h];p.onLoad&&p.onLoad(l)}}).catch(l=>{const u=Un[e];if(u===void 0)throw this.manager.itemError(e),l;delete Un[e];for(let h=0,d=u.length;h<d;h++){const p=u[h];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Kg extends wi{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=ur.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=Gr("img");function c(){u(),ur.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(h){u(),i&&i(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class Yg extends wi{constructor(e){super(e)}load(e,t,n,i){const r=this,a=new Yc,o=new zs(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(r.withCredentials),o.load(e,function(c){const l=r.parse(c);l&&(l.image!==void 0?a.image=l.image:l.data!==void 0&&(a.image.width=l.width,a.image.height=l.height,a.image.data=l.data),a.wrapS=l.wrapS!==void 0?l.wrapS:qt,a.wrapT=l.wrapT!==void 0?l.wrapT:qt,a.magFilter=l.magFilter!==void 0?l.magFilter:bt,a.minFilter=l.minFilter!==void 0?l.minFilter:bt,a.anisotropy=l.anisotropy!==void 0?l.anisotropy:1,l.encoding!==void 0&&(a.encoding=l.encoding),l.flipY!==void 0&&(a.flipY=l.flipY),l.format!==void 0&&(a.format=l.format),l.type!==void 0&&(a.type=l.type),l.mipmaps!==void 0&&(a.mipmaps=l.mipmaps,a.minFilter=ti),l.mipmapCount===1&&(a.minFilter=bt),l.generateMipmaps!==void 0&&(a.generateMipmaps=l.generateMipmaps),a.needsUpdate=!0,t&&t(a,l))},n,i),a}}class ro extends wi{constructor(e){super(e)}load(e,t,n,i){const r=new It,a=new Kg(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class jr extends rt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Fe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class Zg extends jr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(rt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Fe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const va=new Xe,jl=new D,Kl=new D;class so{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Be(512,512),this.map=null,this.mapPass=null,this.matrix=new Xe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ja,this._frameExtents=new Be(1,1),this._viewportCount=1,this._viewports=[new lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;jl.setFromMatrixPosition(e.matrixWorld),t.position.copy(jl),Kl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Kl),t.updateMatrixWorld(),va.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(va),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(va)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class $g extends so{constructor(){super(new kt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=lr*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Ds extends jr{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(rt.DEFAULT_UP),this.updateMatrix(),this.target=new rt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new $g}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Yl=new Xe,Tr=new D,xa=new D;class Jg extends so{constructor(){super(new kt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Be(4,2),this._viewportCount=6,this._viewports=[new lt(2,1,1,1),new lt(0,1,1,1),new lt(3,1,1,1),new lt(1,1,1,1),new lt(3,0,1,1),new lt(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Tr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Tr),xa.copy(n.position),xa.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(xa),n.updateMatrixWorld(),i.makeTranslation(-Tr.x,-Tr.y,-Tr.z),Yl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Yl)}}class _i extends jr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Jg}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Qg extends so{constructor(){super(new Qa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class e0 extends jr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(rt.DEFAULT_UP),this.updateMatrix(),this.target=new rt,this.shadow=new Qg}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class t0 extends jr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Ha{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class n0 extends wi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=ur.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){ur.add(e,c),t&&t(c),r.manager.itemEnd(e)}).catch(function(c){i&&i(c),r.manager.itemError(e),r.manager.itemEnd(e)}),r.manager.itemStart(e)}}let bs;class tu{static getContext(){return bs===void 0&&(bs=new(window.AudioContext||window.webkitAudioContext)),bs}static setContext(e){bs=e}}class i0 extends wi{constructor(e){super(e)}load(e,t,n,i){const r=this,a=new zs(this.manager);a.setResponseType("arraybuffer"),a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{const c=o.slice(0);tu.getContext().decodeAudioData(c,function(u){t(u)})}catch(c){i?i(c):console.error(c),r.manager.itemError(e)}},n,i)}}class nu{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Zl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Zl();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Zl(){return(typeof performance>"u"?Date:performance).now()}const li=new D,$l=new Hn,r0=new D,ci=new D;class s0 extends rt{constructor(){super(),this.type="AudioListener",this.context=tu.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new nu}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e);const t=this.context.listener,n=this.up;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(li,$l,r0),ci.set(0,0,-1).applyQuaternion($l),t.positionX){const i=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(li.x,i),t.positionY.linearRampToValueAtTime(li.y,i),t.positionZ.linearRampToValueAtTime(li.z,i),t.forwardX.linearRampToValueAtTime(ci.x,i),t.forwardY.linearRampToValueAtTime(ci.y,i),t.forwardZ.linearRampToValueAtTime(ci.z,i),t.upX.linearRampToValueAtTime(n.x,i),t.upY.linearRampToValueAtTime(n.y,i),t.upZ.linearRampToValueAtTime(n.z,i)}else t.setPosition(li.x,li.y,li.z),t.setOrientation(ci.x,ci.y,ci.z,n.x,n.y,n.z)}}class a0 extends rt{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){console.warn("THREE.Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;const t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){if(this.detune=e,this.source.detune!==void 0)return this.isPlaying===!0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1}getLoop(){return this.hasPlaybackControl===!1?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}}const ao="\\[\\]\\.:\\/",o0=new RegExp("["+ao+"]","g"),oo="[^"+ao+"]",l0="[^"+ao.replace("\\.","")+"]",c0=/((?:WC+[\/:])*)/.source.replace("WC",oo),u0=/(WCOD+)?/.source.replace("WCOD",l0),h0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",oo),d0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",oo),f0=new RegExp("^"+c0+u0+h0+d0+"$"),p0=["material","materials","bones","map"];class m0{constructor(e,t,n){const i=n||it.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class it{constructor(e,t,n){this.path=t,this.parsedPath=n||it.parseTrackName(t),this.node=it.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new it.Composite(e,t,n):new it(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(o0,"")}static parseTrackName(e){const t=f0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);p0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=it.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const a=e[i];if(a===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}it.Composite=m0;it.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};it.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};it.prototype.GetterByBindingType=[it.prototype._getValue_direct,it.prototype._getValue_array,it.prototype._getValue_arrayElement,it.prototype._getValue_toArray];it.prototype.SetterByBindingTypeAndVersioning=[[it.prototype._setValue_direct,it.prototype._setValue_direct_setNeedsUpdate,it.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[it.prototype._setValue_array,it.prototype._setValue_array_setNeedsUpdate,it.prototype._setValue_array_setMatrixWorldNeedsUpdate],[it.prototype._setValue_arrayElement,it.prototype._setValue_arrayElement_setNeedsUpdate,it.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[it.prototype._setValue_fromArray,it.prototype._setValue_fromArray_setNeedsUpdate,it.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class g0{constructor(e,t,n=0,i=1/0){this.ray=new Os(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new $a,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return Ga(e,this,n,t),n.sort(Jl),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)Ga(e[i],this,n,t);return n.sort(Jl),n}}function Jl(s,e){return s.distance-e.distance}function Ga(s,e,t,n){if(s.layers.test(e.layers)&&s.raycast(e,t),n===!0){const i=s.children;for(let r=0,a=i.length;r<a;r++)Ga(i[r],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ns}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ns);const _0=(()=>parseInt(Ns.replace(/\D+/g,"")))();var un=Uint8Array,Qn=Uint16Array,Va=Uint32Array,iu=new un([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),ru=new un([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),v0=new un([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),su=function(s,e){for(var t=new Qn(31),n=0;n<31;++n)t[n]=e+=1<<s[n-1];for(var i=new Va(t[30]),n=1;n<30;++n)for(var r=t[n];r<t[n+1];++r)i[r]=r-t[n]<<5|n;return[t,i]},au=su(iu,2),ou=au[0],x0=au[1];ou[28]=258,x0[258]=28;var M0=su(ru,0),y0=M0[0],Wa=new Qn(32768);for(var ht=0;ht<32768;++ht){var Zn=(ht&43690)>>>1|(ht&21845)<<1;Zn=(Zn&52428)>>>2|(Zn&13107)<<2,Zn=(Zn&61680)>>>4|(Zn&3855)<<4,Wa[ht]=((Zn&65280)>>>8|(Zn&255)<<8)>>>1}var Or=function(s,e,t){for(var n=s.length,i=0,r=new Qn(e);i<n;++i)++r[s[i]-1];var a=new Qn(e);for(i=0;i<e;++i)a[i]=a[i-1]+r[i-1]<<1;var o;if(t){o=new Qn(1<<e);var c=15-e;for(i=0;i<n;++i)if(s[i])for(var l=i<<4|s[i],u=e-s[i],h=a[s[i]-1]++<<u,d=h|(1<<u)-1;h<=d;++h)o[Wa[h]>>>c]=l}else for(o=new Qn(n),i=0;i<n;++i)s[i]&&(o[i]=Wa[a[s[i]-1]++]>>>15-s[i]);return o},Kr=new un(288);for(var ht=0;ht<144;++ht)Kr[ht]=8;for(var ht=144;ht<256;++ht)Kr[ht]=9;for(var ht=256;ht<280;++ht)Kr[ht]=7;for(var ht=280;ht<288;++ht)Kr[ht]=8;var lu=new un(32);for(var ht=0;ht<32;++ht)lu[ht]=5;var S0=Or(Kr,9,1),w0=Or(lu,5,1),Ma=function(s){for(var e=s[0],t=1;t<s.length;++t)s[t]>e&&(e=s[t]);return e},vn=function(s,e,t){var n=e/8|0;return(s[n]|s[n+1]<<8)>>(e&7)&t},ya=function(s,e){var t=e/8|0;return(s[t]|s[t+1]<<8|s[t+2]<<16)>>(e&7)},b0=function(s){return(s/8|0)+(s&7&&1)},T0=function(s,e,t){(e==null||e<0)&&(e=0),(t==null||t>s.length)&&(t=s.length);var n=new(s instanceof Qn?Qn:s instanceof Va?Va:un)(t-e);return n.set(s.subarray(e,t)),n},E0=function(s,e,t){var n=s.length;if(!n||t&&!t.l&&n<5)return e||new un(0);var i=!e||t,r=!t||t.i;t||(t={}),e||(e=new un(n*3));var a=function(ce){var X=e.length;if(ce>X){var Re=new un(Math.max(X*2,ce));Re.set(e),e=Re}},o=t.f||0,c=t.p||0,l=t.b||0,u=t.l,h=t.d,d=t.m,p=t.n,_=n*8;do{if(!u){t.f=o=vn(s,c,1);var v=vn(s,c+1,3);if(c+=3,v)if(v==1)u=S0,h=w0,d=9,p=5;else if(v==2){var S=vn(s,c,31)+257,M=vn(s,c+10,15)+4,E=S+vn(s,c+5,31)+1;c+=14;for(var C=new un(E),P=new un(19),I=0;I<M;++I)P[v0[I]]=vn(s,c+I*3,7);c+=M*3;for(var y=Ma(P),L=(1<<y)-1,K=Or(P,y,1),I=0;I<E;){var V=K[vn(s,c,L)];c+=V&15;var g=V>>>4;if(g<16)C[I++]=g;else{var O=0,H=0;for(g==16?(H=3+vn(s,c,3),c+=2,O=C[I-1]):g==17?(H=3+vn(s,c,7),c+=3):g==18&&(H=11+vn(s,c,127),c+=7);H--;)C[I++]=O}}var W=C.subarray(0,S),ee=C.subarray(S);d=Ma(W),p=Ma(ee),u=Or(W,d,1),h=Or(ee,p,1)}else throw"invalid block type";else{var g=b0(c)+4,f=s[g-4]|s[g-3]<<8,T=g+f;if(T>n){if(r)throw"unexpected EOF";break}i&&a(l+f),e.set(s.subarray(g,T),l),t.b=l+=f,t.p=c=T*8;continue}if(c>_){if(r)throw"unexpected EOF";break}}i&&a(l+131072);for(var ae=(1<<d)-1,Q=(1<<p)-1,pe=c;;pe=c){var O=u[ya(s,c)&ae],ie=O>>>4;if(c+=O&15,c>_){if(r)throw"unexpected EOF";break}if(!O)throw"invalid length/literal";if(ie<256)e[l++]=ie;else if(ie==256){pe=c,u=null;break}else{var Pe=ie-254;if(ie>264){var I=ie-257,le=iu[I];Pe=vn(s,c,(1<<le)-1)+ou[I],c+=le}var j=h[ya(s,c)&Q],te=j>>>4;if(!j)throw"invalid distance";c+=j&15;var ee=y0[te];if(te>3){var le=ru[te];ee+=ya(s,c)&(1<<le)-1,c+=le}if(c>_){if(r)throw"unexpected EOF";break}i&&a(l+131072);for(var ge=l+Pe;l<ge;l+=4)e[l]=e[l-ee],e[l+1]=e[l+1-ee],e[l+2]=e[l+2-ee],e[l+3]=e[l+3-ee];l=ge}}t.l=u,t.p=pe,t.b=l,u&&(o=1,t.m=d,t.d=h,t.n=p)}while(!o);return l==e.length?e:T0(e,0,l)},A0=new un(0),C0=function(s){if((s[0]&15)!=8||s[0]>>>4>7||(s[0]<<8|s[1])%31)throw"invalid zlib data";if(s[1]&32)throw"invalid zlib data: preset dictionaries not supported"};function Ts(s,e){return E0((C0(s),s.subarray(2,-4)),e)}var L0=typeof TextDecoder<"u"&&new TextDecoder,R0=0;try{L0.decode(A0,{stream:!0}),R0=1}catch{}var P0=Object.defineProperty,I0=(s,e,t)=>e in s?P0(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,D0=(s,e,t)=>(I0(s,typeof e!="symbol"?e+"":e,t),t);class U0{constructor(){D0(this,"_listeners")}addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}}var N0=Object.defineProperty,F0=(s,e,t)=>e in s?N0(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,wt=(s,e,t)=>(F0(s,typeof e!="symbol"?e+"":e,t),t);const Ki=new dr(0,0,0,"YXZ"),Yi=new D,O0={type:"change"},B0={type:"lock"},z0={type:"unlock"},Ql=.002,ec=Math.PI/2;class k0 extends U0{constructor(e,t){super(),wt(this,"camera"),wt(this,"domElement"),wt(this,"isLocked"),wt(this,"minPolarAngle"),wt(this,"maxPolarAngle"),wt(this,"pointerSpeed"),wt(this,"onMouseMove",n=>{!this.domElement||this.isLocked===!1||(Ki.setFromQuaternion(this.camera.quaternion),Ki.y-=n.movementX*Ql*this.pointerSpeed,Ki.x-=n.movementY*Ql*this.pointerSpeed,Ki.x=Math.max(ec-this.maxPolarAngle,Math.min(ec-this.minPolarAngle,Ki.x)),this.camera.quaternion.setFromEuler(Ki),this.dispatchEvent(O0))}),wt(this,"onPointerlockChange",()=>{this.domElement&&(this.domElement.ownerDocument.pointerLockElement===this.domElement?(this.dispatchEvent(B0),this.isLocked=!0):(this.dispatchEvent(z0),this.isLocked=!1))}),wt(this,"onPointerlockError",()=>{console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}),wt(this,"connect",n=>{this.domElement=n||this.domElement,this.domElement&&(this.domElement.ownerDocument.addEventListener("mousemove",this.onMouseMove),this.domElement.ownerDocument.addEventListener("pointerlockchange",this.onPointerlockChange),this.domElement.ownerDocument.addEventListener("pointerlockerror",this.onPointerlockError))}),wt(this,"disconnect",()=>{this.domElement&&(this.domElement.ownerDocument.removeEventListener("mousemove",this.onMouseMove),this.domElement.ownerDocument.removeEventListener("pointerlockchange",this.onPointerlockChange),this.domElement.ownerDocument.removeEventListener("pointerlockerror",this.onPointerlockError))}),wt(this,"dispose",()=>{this.disconnect()}),wt(this,"getObject",()=>this.camera),wt(this,"direction",new D(0,0,-1)),wt(this,"getDirection",n=>n.copy(this.direction).applyQuaternion(this.camera.quaternion)),wt(this,"moveForward",n=>{Yi.setFromMatrixColumn(this.camera.matrix,0),Yi.crossVectors(this.camera.up,Yi),this.camera.position.addScaledVector(Yi,n)}),wt(this,"moveRight",n=>{Yi.setFromMatrixColumn(this.camera.matrix,0),this.camera.position.addScaledVector(Yi,n)}),wt(this,"lock",()=>{this.domElement&&this.domElement.requestPointerLock()}),wt(this,"unlock",()=>{this.domElement&&this.domElement.ownerDocument.exitPointerLock()}),this.camera=e,this.domElement=t,this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.pointerSpeed=1,t&&this.connect(t)}}const Er=_0>=152;class H0 extends Yg{constructor(e){super(e),this.type=Fn}parse(e){const y=Math.pow(2.7182818,2.2);function L(m,x){for(var A=0,U=0;U<65536;++U)(U==0||m[U>>3]&1<<(U&7))&&(x[A++]=U);for(var z=A-1;A<65536;)x[A++]=0;return z}function K(m){for(var x=0;x<16384;x++)m[x]={},m[x].len=0,m[x].lit=0,m[x].p=null}const V={l:0,c:0,lc:0};function O(m,x,A,U,z){for(;A<m;)x=x<<8|we(U,z),A+=8;A-=m,V.l=x>>A&(1<<m)-1,V.c=x,V.lc=A}const H=new Array(59);function W(m){for(var x=0;x<=58;++x)H[x]=0;for(var x=0;x<65537;++x)H[m[x]]+=1;for(var A=0,x=58;x>0;--x){var U=A+H[x]>>1;H[x]=A,A=U}for(var x=0;x<65537;++x){var z=m[x];z>0&&(m[x]=z|H[z]++<<6)}}function ee(m,x,A,U,z,k,$){for(var q=A,ne=0,se=0;z<=k;z++){if(q.value-A.value>U)return!1;O(6,ne,se,m,q);var ue=V.l;if(ne=V.c,se=V.lc,$[z]=ue,ue==63){if(q.value-A.value>U)throw"Something wrong with hufUnpackEncTable";O(8,ne,se,m,q);var fe=V.l+6;if(ne=V.c,se=V.lc,z+fe>k+1)throw"Something wrong with hufUnpackEncTable";for(;fe--;)$[z++]=0;z--}else if(ue>=59){var fe=ue-59+2;if(z+fe>k+1)throw"Something wrong with hufUnpackEncTable";for(;fe--;)$[z++]=0;z--}}W($)}function ae(m){return m&63}function Q(m){return m>>6}function pe(m,x,A,U){for(;x<=A;x++){var z=Q(m[x]),k=ae(m[x]);if(z>>k)throw"Invalid table entry";if(k>14){var $=U[z>>k-14];if($.len)throw"Invalid table entry";if($.lit++,$.p){var q=$.p;$.p=new Array($.lit);for(var ne=0;ne<$.lit-1;++ne)$.p[ne]=q[ne]}else $.p=new Array(1);$.p[$.lit-1]=x}else if(k)for(var se=0,ne=1<<14-k;ne>0;ne--){var $=U[(z<<14-k)+se];if($.len||$.p)throw"Invalid table entry";$.len=k,$.lit=x,se++}}return!0}const ie={c:0,lc:0};function Pe(m,x,A,U){m=m<<8|we(A,U),x+=8,ie.c=m,ie.lc=x}const le={c:0,lc:0};function j(m,x,A,U,z,k,$,q,ne,se){if(m==x){U<8&&(Pe(A,U,z,$),A=ie.c,U=ie.lc),U-=8;var ue=A>>U,ue=new Uint8Array([ue])[0];if(ne.value+ue>se)return!1;for(var fe=q[ne.value-1];ue-- >0;)q[ne.value++]=fe}else if(ne.value<se)q[ne.value++]=m;else return!1;le.c=A,le.lc=U}function te(m){return m&65535}function ge(m){var x=te(m);return x>32767?x-65536:x}const ce={a:0,b:0};function X(m,x){var A=ge(m),U=ge(x),z=U,k=A+(z&1)+(z>>1),$=k,q=k-z;ce.a=$,ce.b=q}function Re(m,x){var A=te(m),U=te(x),z=A-(U>>1)&65535,k=U+z-32768&65535;ce.a=k,ce.b=z}function Ue(m,x,A,U,z,k,$){for(var q=$<16384,ne=A>z?z:A,se=1,ue;se<=ne;)se<<=1;for(se>>=1,ue=se,se>>=1;se>=1;){for(var fe=0,Oe=fe+k*(z-ue),he=k*se,Ee=k*ue,Se=U*se,Ne=U*ue,Qe,Ye,mt,Je;fe<=Oe;fe+=Ee){for(var je=fe,Wt=fe+U*(A-ue);je<=Wt;je+=Ne){var Ge=je+Se,gt=je+he,pn=gt+Se;q?(X(m[je+x],m[gt+x]),Qe=ce.a,mt=ce.b,X(m[Ge+x],m[pn+x]),Ye=ce.a,Je=ce.b,X(Qe,Ye),m[je+x]=ce.a,m[Ge+x]=ce.b,X(mt,Je),m[gt+x]=ce.a,m[pn+x]=ce.b):(Re(m[je+x],m[gt+x]),Qe=ce.a,mt=ce.b,Re(m[Ge+x],m[pn+x]),Ye=ce.a,Je=ce.b,Re(Qe,Ye),m[je+x]=ce.a,m[Ge+x]=ce.b,Re(mt,Je),m[gt+x]=ce.a,m[pn+x]=ce.b)}if(A&se){var gt=je+he;q?X(m[je+x],m[gt+x]):Re(m[je+x],m[gt+x]),Qe=ce.a,m[gt+x]=ce.b,m[je+x]=Qe}}if(z&se)for(var je=fe,Wt=fe+U*(A-ue);je<=Wt;je+=Ne){var Ge=je+Se;q?X(m[je+x],m[Ge+x]):Re(m[je+x],m[Ge+x]),Qe=ce.a,m[Ge+x]=ce.b,m[je+x]=Qe}ue=se,se>>=1}return fe}function _e(m,x,A,U,z,k,$,q,ne,se){for(var ue=0,fe=0,Oe=q,he=Math.trunc(z.value+(k+7)/8);z.value<he;)for(Pe(ue,fe,A,z),ue=ie.c,fe=ie.lc;fe>=14;){var Ee=ue>>fe-14&16383,Se=x[Ee];if(Se.len)fe-=Se.len,j(Se.lit,$,ue,fe,A,U,z,ne,se,Oe),ue=le.c,fe=le.lc;else{if(!Se.p)throw"hufDecode issues";var Ne;for(Ne=0;Ne<Se.lit;Ne++){for(var Qe=ae(m[Se.p[Ne]]);fe<Qe&&z.value<he;)Pe(ue,fe,A,z),ue=ie.c,fe=ie.lc;if(fe>=Qe&&Q(m[Se.p[Ne]])==(ue>>fe-Qe&(1<<Qe)-1)){fe-=Qe,j(Se.p[Ne],$,ue,fe,A,U,z,ne,se,Oe),ue=le.c,fe=le.lc;break}}if(Ne==Se.lit)throw"hufDecode issues"}}var Ye=8-k&7;for(ue>>=Ye,fe-=Ye;fe>0;){var Se=x[ue<<14-fe&16383];if(Se.len)fe-=Se.len,j(Se.lit,$,ue,fe,A,U,z,ne,se,Oe),ue=le.c,fe=le.lc;else throw"hufDecode issues"}return!0}function Ie(m,x,A,U,z,k){var $={value:0},q=A.value,ne=me(x,A),se=me(x,A);A.value+=4;var ue=me(x,A);if(A.value+=4,ne<0||ne>=65537||se<0||se>=65537)throw"Something wrong with HUF_ENCSIZE";var fe=new Array(65537),Oe=new Array(16384);K(Oe);var he=U-(A.value-q);if(ee(m,x,A,he,ne,se,fe),ue>8*(U-(A.value-q)))throw"Something wrong with hufUncompress";pe(fe,ne,se,Oe),_e(fe,Oe,m,x,A,ue,se,k,z,$)}function Ze(m,x,A){for(var U=0;U<A;++U)x[U]=m[x[U]]}function Ae(m){for(var x=1;x<m.length;x++){var A=m[x-1]+m[x]-128;m[x]=A}}function He(m,x){for(var A=0,U=Math.floor((m.length+1)/2),z=0,k=m.length-1;!(z>k||(x[z++]=m[A++],z>k));)x[z++]=m[U++]}function _t(m){for(var x=m.byteLength,A=new Array,U=0,z=new DataView(m);x>0;){var k=z.getInt8(U++);if(k<0){var $=-k;x-=$+1;for(var q=0;q<$;q++)A.push(z.getUint8(U++))}else{var $=k;x-=2;for(var ne=z.getUint8(U++),q=0;q<$+1;q++)A.push(ne)}}return A}function St(m,x,A,U,z,k){var Ge=new DataView(k.buffer),$=A[m.idx[0]].width,q=A[m.idx[0]].height,ne=3,se=Math.floor($/8),ue=Math.ceil($/8),fe=Math.ceil(q/8),Oe=$-(ue-1)*8,he=q-(fe-1)*8,Ee={value:0},Se=new Array(ne),Ne=new Array(ne),Qe=new Array(ne),Ye=new Array(ne),mt=new Array(ne);for(let at=0;at<ne;++at)mt[at]=x[m.idx[at]],Se[at]=at<1?0:Se[at-1]+ue*fe,Ne[at]=new Float32Array(64),Qe[at]=new Uint16Array(64),Ye[at]=new Uint16Array(ue*64);for(let at=0;at<fe;++at){var Je=8;at==fe-1&&(Je=he);var je=8;for(let ft=0;ft<ue;++ft){ft==ue-1&&(je=Oe);for(let nt=0;nt<ne;++nt)Qe[nt].fill(0),Qe[nt][0]=z[Se[nt]++],xt(Ee,U,Qe[nt]),vt(Qe[nt],Ne[nt]),$e(Ne[nt]);dt(Ne);for(let nt=0;nt<ne;++nt)Ut(Ne[nt],Ye[nt],ft*64)}let Nt=0;for(let ft=0;ft<ne;++ft){const nt=A[m.idx[ft]].type;for(let rn=8*at;rn<8*at+Je;++rn){Nt=mt[ft][rn];for(let ri=0;ri<se;++ri){const Kt=ri*64+(rn&7)*8;Ge.setUint16(Nt+0*2*nt,Ye[ft][Kt+0],!0),Ge.setUint16(Nt+1*2*nt,Ye[ft][Kt+1],!0),Ge.setUint16(Nt+2*2*nt,Ye[ft][Kt+2],!0),Ge.setUint16(Nt+3*2*nt,Ye[ft][Kt+3],!0),Ge.setUint16(Nt+4*2*nt,Ye[ft][Kt+4],!0),Ge.setUint16(Nt+5*2*nt,Ye[ft][Kt+5],!0),Ge.setUint16(Nt+6*2*nt,Ye[ft][Kt+6],!0),Ge.setUint16(Nt+7*2*nt,Ye[ft][Kt+7],!0),Nt+=8*2*nt}}if(se!=ue)for(let rn=8*at;rn<8*at+Je;++rn){const ri=mt[ft][rn]+8*se*2*nt,Kt=se*64+(rn&7)*8;for(let Wn=0;Wn<je;++Wn)Ge.setUint16(ri+Wn*2*nt,Ye[ft][Kt+Wn],!0)}}}for(var Wt=new Uint16Array($),Ge=new DataView(k.buffer),gt=0;gt<ne;++gt){A[m.idx[gt]].decoded=!0;var pn=A[m.idx[gt]].type;if(A[gt].type==2)for(var Vn=0;Vn<q;++Vn){const at=mt[gt][Vn];for(var nn=0;nn<$;++nn)Wt[nn]=Ge.getUint16(at+nn*2*pn,!0);for(var nn=0;nn<$;++nn)Ge.setFloat32(at+nn*2*pn,N(Wt[nn]),!0)}}}function xt(m,x,A){for(var U,z=1;z<64;)U=x[m.value],U==65280?z=64:U>>8==255?z+=U&255:(A[z]=U,z++),m.value++}function vt(m,x){x[0]=N(m[0]),x[1]=N(m[1]),x[2]=N(m[5]),x[3]=N(m[6]),x[4]=N(m[14]),x[5]=N(m[15]),x[6]=N(m[27]),x[7]=N(m[28]),x[8]=N(m[2]),x[9]=N(m[4]),x[10]=N(m[7]),x[11]=N(m[13]),x[12]=N(m[16]),x[13]=N(m[26]),x[14]=N(m[29]),x[15]=N(m[42]),x[16]=N(m[3]),x[17]=N(m[8]),x[18]=N(m[12]),x[19]=N(m[17]),x[20]=N(m[25]),x[21]=N(m[30]),x[22]=N(m[41]),x[23]=N(m[43]),x[24]=N(m[9]),x[25]=N(m[11]),x[26]=N(m[18]),x[27]=N(m[24]),x[28]=N(m[31]),x[29]=N(m[40]),x[30]=N(m[44]),x[31]=N(m[53]),x[32]=N(m[10]),x[33]=N(m[19]),x[34]=N(m[23]),x[35]=N(m[32]),x[36]=N(m[39]),x[37]=N(m[45]),x[38]=N(m[52]),x[39]=N(m[54]),x[40]=N(m[20]),x[41]=N(m[22]),x[42]=N(m[33]),x[43]=N(m[38]),x[44]=N(m[46]),x[45]=N(m[51]),x[46]=N(m[55]),x[47]=N(m[60]),x[48]=N(m[21]),x[49]=N(m[34]),x[50]=N(m[37]),x[51]=N(m[47]),x[52]=N(m[50]),x[53]=N(m[56]),x[54]=N(m[59]),x[55]=N(m[61]),x[56]=N(m[35]),x[57]=N(m[36]),x[58]=N(m[48]),x[59]=N(m[49]),x[60]=N(m[57]),x[61]=N(m[58]),x[62]=N(m[62]),x[63]=N(m[63])}function $e(m){const x=.5*Math.cos(.7853975),A=.5*Math.cos(3.14159/16),U=.5*Math.cos(3.14159/8),z=.5*Math.cos(3*3.14159/16),k=.5*Math.cos(5*3.14159/16),$=.5*Math.cos(3*3.14159/8),q=.5*Math.cos(7*3.14159/16);for(var ne=new Array(4),se=new Array(4),ue=new Array(4),fe=new Array(4),Oe=0;Oe<8;++Oe){var he=Oe*8;ne[0]=U*m[he+2],ne[1]=$*m[he+2],ne[2]=U*m[he+6],ne[3]=$*m[he+6],se[0]=A*m[he+1]+z*m[he+3]+k*m[he+5]+q*m[he+7],se[1]=z*m[he+1]-q*m[he+3]-A*m[he+5]-k*m[he+7],se[2]=k*m[he+1]-A*m[he+3]+q*m[he+5]+z*m[he+7],se[3]=q*m[he+1]-k*m[he+3]+z*m[he+5]-A*m[he+7],ue[0]=x*(m[he+0]+m[he+4]),ue[3]=x*(m[he+0]-m[he+4]),ue[1]=ne[0]+ne[3],ue[2]=ne[1]-ne[2],fe[0]=ue[0]+ue[1],fe[1]=ue[3]+ue[2],fe[2]=ue[3]-ue[2],fe[3]=ue[0]-ue[1],m[he+0]=fe[0]+se[0],m[he+1]=fe[1]+se[1],m[he+2]=fe[2]+se[2],m[he+3]=fe[3]+se[3],m[he+4]=fe[3]-se[3],m[he+5]=fe[2]-se[2],m[he+6]=fe[1]-se[1],m[he+7]=fe[0]-se[0]}for(var Ee=0;Ee<8;++Ee)ne[0]=U*m[16+Ee],ne[1]=$*m[16+Ee],ne[2]=U*m[48+Ee],ne[3]=$*m[48+Ee],se[0]=A*m[8+Ee]+z*m[24+Ee]+k*m[40+Ee]+q*m[56+Ee],se[1]=z*m[8+Ee]-q*m[24+Ee]-A*m[40+Ee]-k*m[56+Ee],se[2]=k*m[8+Ee]-A*m[24+Ee]+q*m[40+Ee]+z*m[56+Ee],se[3]=q*m[8+Ee]-k*m[24+Ee]+z*m[40+Ee]-A*m[56+Ee],ue[0]=x*(m[Ee]+m[32+Ee]),ue[3]=x*(m[Ee]-m[32+Ee]),ue[1]=ne[0]+ne[3],ue[2]=ne[1]-ne[2],fe[0]=ue[0]+ue[1],fe[1]=ue[3]+ue[2],fe[2]=ue[3]-ue[2],fe[3]=ue[0]-ue[1],m[0+Ee]=fe[0]+se[0],m[8+Ee]=fe[1]+se[1],m[16+Ee]=fe[2]+se[2],m[24+Ee]=fe[3]+se[3],m[32+Ee]=fe[3]-se[3],m[40+Ee]=fe[2]-se[2],m[48+Ee]=fe[1]-se[1],m[56+Ee]=fe[0]-se[0]}function dt(m){for(var x=0;x<64;++x){var A=m[0][x],U=m[1][x],z=m[2][x];m[0][x]=A+1.5747*z,m[1][x]=A-.1873*U-.4682*z,m[2][x]=A+1.8556*U}}function Ut(m,x,A){for(var U=0;U<64;++U)x[A+U]=tl.toHalfFloat(R(m[U]))}function R(m){return m<=1?Math.sign(m)*Math.pow(Math.abs(m),2.2):Math.sign(m)*Math.pow(y,Math.abs(m)-1)}function w(m){return new DataView(m.array.buffer,m.offset.value,m.size)}function Y(m){var x=m.viewer.buffer.slice(m.offset.value,m.offset.value+m.size),A=new Uint8Array(_t(x)),U=new Uint8Array(A.length);return Ae(A),He(A,U),new DataView(U.buffer)}function oe(m){var x=m.array.slice(m.offset.value,m.offset.value+m.size),A=Ts(x),U=new Uint8Array(A.length);return Ae(A),He(A,U),new DataView(U.buffer)}function de(m){for(var x=m.viewer,A={value:m.offset.value},U=new Uint16Array(m.width*m.scanlineBlockSize*(m.channels*m.type)),z=new Uint8Array(8192),k=0,$=new Array(m.channels),q=0;q<m.channels;q++)$[q]={},$[q].start=k,$[q].end=$[q].start,$[q].nx=m.width,$[q].ny=m.lines,$[q].size=m.type,k+=$[q].nx*$[q].ny*$[q].size;var ne=re(x,A),se=re(x,A);if(se>=8192)throw"Something is wrong with PIZ_COMPRESSION BITMAP_SIZE";if(ne<=se)for(var q=0;q<se-ne+1;q++)z[q+ne]=ze(x,A);var ue=new Uint16Array(65536),fe=L(z,ue),Oe=me(x,A);Ie(m.array,x,A,Oe,U,k);for(var q=0;q<m.channels;++q)for(var he=$[q],Ee=0;Ee<$[q].size;++Ee)Ue(U,he.start+Ee,he.nx,he.size,he.ny,he.nx*he.size,fe);Ze(ue,U,k);for(var Se=0,Ne=new Uint8Array(U.buffer.byteLength),Qe=0;Qe<m.lines;Qe++)for(var Ye=0;Ye<m.channels;Ye++){var he=$[Ye],mt=he.nx*he.size,Je=new Uint8Array(U.buffer,he.end*2,mt*2);Ne.set(Je,Se),Se+=mt*2,he.end+=mt}return new DataView(Ne.buffer)}function xe(m){var x=m.array.slice(m.offset.value,m.offset.value+m.size),A=Ts(x);const U=m.lines*m.channels*m.width,z=m.type==1?new Uint16Array(U):new Uint32Array(U);let k=0,$=0;const q=new Array(4);for(let ne=0;ne<m.lines;ne++)for(let se=0;se<m.channels;se++){let ue=0;switch(m.type){case 1:q[0]=k,q[1]=q[0]+m.width,k=q[1]+m.width;for(let fe=0;fe<m.width;++fe){const Oe=A[q[0]++]<<8|A[q[1]++];ue+=Oe,z[$]=ue,$++}break;case 2:q[0]=k,q[1]=q[0]+m.width,q[2]=q[1]+m.width,k=q[2]+m.width;for(let fe=0;fe<m.width;++fe){const Oe=A[q[0]++]<<24|A[q[1]++]<<16|A[q[2]++]<<8;ue+=Oe,z[$]=ue,$++}break}}return new DataView(z.buffer)}function De(m){var x=m.viewer,A={value:m.offset.value},U=new Uint8Array(m.width*m.lines*(m.channels*m.type*2)),z={version:ke(x,A),unknownUncompressedSize:ke(x,A),unknownCompressedSize:ke(x,A),acCompressedSize:ke(x,A),dcCompressedSize:ke(x,A),rleCompressedSize:ke(x,A),rleUncompressedSize:ke(x,A),rleRawSize:ke(x,A),totalAcUncompressedCount:ke(x,A),totalDcUncompressedCount:ke(x,A),acCompression:ke(x,A)};if(z.version<2)throw"EXRLoader.parse: "+b.compression+" version "+z.version+" is unsupported";for(var k=new Array,$=re(x,A)-2;$>0;){var q=ye(x.buffer,A),ne=ze(x,A),se=ne>>2&3,ue=(ne>>4)-1,fe=new Int8Array([ue])[0],Oe=ze(x,A);k.push({name:q,index:fe,type:Oe,compression:se}),$-=q.length+3}for(var he=b.channels,Ee=new Array(m.channels),Se=0;Se<m.channels;++Se){var Ne=Ee[Se]={},Qe=he[Se];Ne.name=Qe.name,Ne.compression=0,Ne.decoded=!1,Ne.type=Qe.pixelType,Ne.pLinear=Qe.pLinear,Ne.width=m.width,Ne.height=m.lines}for(var Ye={idx:new Array(3)},mt=0;mt<m.channels;++mt)for(var Ne=Ee[mt],Se=0;Se<k.length;++Se){var Je=k[Se];Ne.name==Je.name&&(Ne.compression=Je.compression,Je.index>=0&&(Ye.idx[Je.index]=mt),Ne.offset=mt)}if(z.acCompressedSize>0)switch(z.acCompression){case 0:var Ge=new Uint16Array(z.totalAcUncompressedCount);Ie(m.array,x,A,z.acCompressedSize,Ge,z.totalAcUncompressedCount);break;case 1:var je=m.array.slice(A.value,A.value+z.totalAcUncompressedCount),Wt=Ts(je),Ge=new Uint16Array(Wt.buffer);A.value+=z.totalAcUncompressedCount;break}if(z.dcCompressedSize>0){var gt={array:m.array,offset:A,size:z.dcCompressedSize},pn=new Uint16Array(oe(gt).buffer);A.value+=z.dcCompressedSize}if(z.rleRawSize>0){var je=m.array.slice(A.value,A.value+z.rleCompressedSize),Wt=Ts(je),Vn=_t(Wt.buffer);A.value+=z.rleCompressedSize}for(var nn=0,at=new Array(Ee.length),Se=0;Se<at.length;++Se)at[Se]=new Array;for(var Nt=0;Nt<m.lines;++Nt)for(var ft=0;ft<Ee.length;++ft)at[ft].push(nn),nn+=Ee[ft].width*m.type*2;St(Ye,at,Ee,Ge,pn,U);for(var Se=0;Se<Ee.length;++Se){var Ne=Ee[Se];if(!Ne.decoded)switch(Ne.compression){case 2:for(var nt=0,rn=0,Nt=0;Nt<m.lines;++Nt){for(var ri=at[Se][nt],Kt=0;Kt<Ne.width;++Kt){for(var Wn=0;Wn<2*Ne.type;++Wn)U[ri++]=Vn[rn+Wn*Ne.width*Ne.height];rn++}nt++}break;case 1:default:throw"EXRLoader.parse: unsupported channel compression"}}return new DataView(U.buffer)}function ye(m,x){for(var A=new Uint8Array(m),U=0;A[x.value+U]!=0;)U+=1;var z=new TextDecoder().decode(A.slice(x.value,x.value+U));return x.value=x.value+U+1,z}function J(m,x,A){var U=new TextDecoder().decode(new Uint8Array(m).slice(x.value,x.value+A));return x.value=x.value+A,U}function be(m,x){var A=Ce(m,x),U=me(m,x);return[A,U]}function Le(m,x){var A=me(m,x),U=me(m,x);return[A,U]}function Ce(m,x){var A=m.getInt32(x.value,!0);return x.value=x.value+4,A}function me(m,x){var A=m.getUint32(x.value,!0);return x.value=x.value+4,A}function we(m,x){var A=m[x.value];return x.value=x.value+1,A}function ze(m,x){var A=m.getUint8(x.value);return x.value=x.value+1,A}const ke=function(m,x){let A;return"getBigInt64"in DataView.prototype?A=Number(m.getBigInt64(x.value,!0)):A=m.getUint32(x.value+4,!0)+Number(m.getUint32(x.value,!0)<<32),x.value+=8,A};function We(m,x){var A=m.getFloat32(x.value,!0);return x.value+=4,A}function F(m,x){return tl.toHalfFloat(We(m,x))}function N(m){var x=(m&31744)>>10,A=m&1023;return(m>>15?-1:1)*(x?x===31?A?NaN:1/0:Math.pow(2,x-15)*(1+A/1024):6103515625e-14*(A/1024))}function re(m,x){var A=m.getUint16(x.value,!0);return x.value+=2,A}function Me(m,x){return N(re(m,x))}function Te(m,x,A,U){for(var z=A.value,k=[];A.value<z+U-1;){var $=ye(x,A),q=Ce(m,A),ne=ze(m,A);A.value+=3;var se=Ce(m,A),ue=Ce(m,A);k.push({name:$,pixelType:q,pLinear:ne,xSampling:se,ySampling:ue})}return A.value+=1,k}function st(m,x){var A=We(m,x),U=We(m,x),z=We(m,x),k=We(m,x),$=We(m,x),q=We(m,x),ne=We(m,x),se=We(m,x);return{redX:A,redY:U,greenX:z,greenY:k,blueX:$,blueY:q,whiteX:ne,whiteY:se}}function ut(m,x){var A=["NO_COMPRESSION","RLE_COMPRESSION","ZIPS_COMPRESSION","ZIP_COMPRESSION","PIZ_COMPRESSION","PXR24_COMPRESSION","B44_COMPRESSION","B44A_COMPRESSION","DWAA_COMPRESSION","DWAB_COMPRESSION"],U=ze(m,x);return A[U]}function At(m,x){var A=me(m,x),U=me(m,x),z=me(m,x),k=me(m,x);return{xMin:A,yMin:U,xMax:z,yMax:k}}function Sn(m,x){var A=["INCREASING_Y"],U=ze(m,x);return A[U]}function pt(m,x){var A=We(m,x),U=We(m,x);return[A,U]}function Vt(m,x){var A=We(m,x),U=We(m,x),z=We(m,x);return[A,U,z]}function tn(m,x,A,U,z){if(U==="string"||U==="stringvector"||U==="iccProfile")return J(x,A,z);if(U==="chlist")return Te(m,x,A,z);if(U==="chromaticities")return st(m,A);if(U==="compression")return ut(m,A);if(U==="box2i")return At(m,A);if(U==="lineOrder")return Sn(m,A);if(U==="float")return We(m,A);if(U==="v2f")return pt(m,A);if(U==="v3f")return Vt(m,A);if(U==="int")return Ce(m,A);if(U==="rational")return be(m,A);if(U==="timecode")return Le(m,A);if(U==="preview")return A.value+=z,"skipped";A.value+=z}function bi(m,x,A){const U={};if(m.getUint32(0,!0)!=20000630)throw"THREE.EXRLoader: provided file doesn't appear to be in OpenEXR format.";U.version=m.getUint8(4);const z=m.getUint8(5);U.spec={singleTile:!!(z&2),longName:!!(z&4),deepFormat:!!(z&8),multiPart:!!(z&16)},A.value=8;for(var k=!0;k;){var $=ye(x,A);if($==0)k=!1;else{var q=ye(x,A),ne=me(m,A),se=tn(m,x,A,q,ne);se===void 0?console.warn(`EXRLoader.parse: skipped unknown header attribute type '${q}'.`):U[$]=se}}if(z&-5)throw console.error("EXRHeader:",U),"THREE.EXRLoader: provided file is currently unsupported.";return U}function Yr(m,x,A,U,z){const k={size:0,viewer:x,array:A,offset:U,width:m.dataWindow.xMax-m.dataWindow.xMin+1,height:m.dataWindow.yMax-m.dataWindow.yMin+1,channels:m.channels.length,bytesPerLine:null,lines:null,inputSize:null,type:m.channels[0].pixelType,uncompress:null,getter:null,format:null,[Er?"colorSpace":"encoding"]:null};switch(m.compression){case"NO_COMPRESSION":k.lines=1,k.uncompress=w;break;case"RLE_COMPRESSION":k.lines=1,k.uncompress=Y;break;case"ZIPS_COMPRESSION":k.lines=1,k.uncompress=oe;break;case"ZIP_COMPRESSION":k.lines=16,k.uncompress=oe;break;case"PIZ_COMPRESSION":k.lines=32,k.uncompress=de;break;case"PXR24_COMPRESSION":k.lines=16,k.uncompress=xe;break;case"DWAA_COMPRESSION":k.lines=32,k.uncompress=De;break;case"DWAB_COMPRESSION":k.lines=256,k.uncompress=De;break;default:throw"EXRLoader.parse: "+m.compression+" is unsupported"}if(k.scanlineBlockSize=k.lines,k.type==1)switch(z){case xn:k.getter=Me,k.inputSize=2;break;case Fn:k.getter=re,k.inputSize=2;break}else if(k.type==2)switch(z){case xn:k.getter=We,k.inputSize=4;break;case Fn:k.getter=F,k.inputSize=4}else throw"EXRLoader.parse: unsupported pixelType "+k.type+" for "+m.compression+".";k.blockCount=(m.dataWindow.yMax+1)/k.scanlineBlockSize;for(var $=0;$<k.blockCount;$++)ke(x,U);k.outputChannels=k.channels==3?4:k.channels;const q=k.width*k.height*k.outputChannels;switch(z){case xn:k.byteArray=new Float32Array(q),k.channels<k.outputChannels&&k.byteArray.fill(1,0,q);break;case Fn:k.byteArray=new Uint16Array(q),k.channels<k.outputChannels&&k.byteArray.fill(15360,0,q);break;default:console.error("THREE.EXRLoader: unsupported type: ",z);break}return k.bytesPerLine=k.width*k.inputSize*k.channels,k.outputChannels==4?k.format=en:k.format=bc,Er?k.colorSpace="srgb-linear":k.encoding=3e3,k}const Ti=new DataView(e),Hs=new Uint8Array(e),ii={value:0},b=bi(Ti,e,ii),B=Yr(b,Ti,Hs,ii,this.type),Z={value:0},G={R:0,G:1,B:2,A:3,Y:0};for(let m=0;m<B.height/B.scanlineBlockSize;m++){const x=me(Ti,ii);B.size=me(Ti,ii),B.lines=x+B.scanlineBlockSize>B.height?B.height-x:B.scanlineBlockSize;const U=B.size<B.lines*B.bytesPerLine?B.uncompress(B):w(B);ii.value+=B.size;for(let z=0;z<B.scanlineBlockSize;z++){const k=z+m*B.scanlineBlockSize;if(k>=B.height)break;for(let $=0;$<B.channels;$++){const q=G[b.channels[$].name];for(let ne=0;ne<B.width;ne++){Z.value=(z*(B.channels*B.width)+$*B.width+ne)*B.inputSize;const se=(B.height-1-k)*(B.width*B.outputChannels)+ne*B.outputChannels+q;B.byteArray[se]=B.getter(U,Z)}}}}return{header:b,width:B.width,height:B.height,data:B.byteArray,format:B.format,[Er?"colorSpace":"encoding"]:B[Er?"colorSpace":"encoding"],type:this.type}}setDataType(e){return this.type=e,this}load(e,t,n,i){function r(a,o){Er?a.colorSpace=o.colorSpace:a.encoding=o.encoding,a.minFilter=bt,a.magFilter=bt,a.generateMipmaps=!1,a.flipY=!1,t&&t(a,o)}return super.load(e,r,n,i)}}const cn=new Ag;let ui,Sa,Jt;const G0=()=>{ui=new kt(60,window.innerWidth/window.innerHeight,.1,100),cn.add(ui),ui.position.set(0,2,15),Jt=new Wc({antialias:!1,powerPreference:"high-performance"}),Jt.setSize(window.innerWidth,window.innerHeight),Jt.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),Jt.setClearColor(1184274,1),Jt.outputColorSpace=Pt,Jt.toneMapping=Mc,Jt.toneMappingExposure=1.12,document.body.appendChild(Jt.domElement),Jt.shadowMap.enabled=!0,Jt.shadowMap.type=_c,Sa=new k0(ui,Jt.domElement),cn.add(Sa.getObject()),window.addEventListener("resize",s,!1);function s(){ui.aspect=window.innerWidth/window.innerHeight,ui.updateProjectionMatrix(),Jt.setSize(window.innerWidth,window.innerHeight)}return{camera:ui,controls:Sa,renderer:Jt}},V0=4,Dr=4,W0=Dr*2,lo=-10,co=10,X0=16;function q0(s){return`artworks/${s%X0+1}.jpg`}function j0(s,e){var o,c,l,u,h,d,p,_;const t=typeof(s==null?void 0:s.name)=="string"&&s.name.trim()?s.name.trim():`Metaverse Member ${e+1}`,n=typeof(s==null?void 0:s.role)=="string"&&s.role.trim()?s.role.trim():"member",i=typeof(s==null?void 0:s.wing)=="string"&&s.wing.trim()?s.wing.trim():"Metaverse",r=typeof(s==null?void 0:s.bio)=="string"&&s.bio.trim()?s.bio.trim():"";return{imgSrc:typeof(s==null?void 0:s.image)=="string"&&s.image.trim()?s.image.trim():q0(e),width:4,height:4,info:{title:t,artist:n,description:r,year:i,socials:{linkedin:((o=s==null?void 0:s.socials)==null?void 0:o.linkedin)||"",github:((c=s==null?void 0:s.socials)==null?void 0:c.github)||"",twitter:((l=s==null?void 0:s.socials)==null?void 0:l.twitter)||"",instagram:((u=s==null?void 0:s.socials)==null?void 0:u.instagram)||""},link:((h=s==null?void 0:s.socials)==null?void 0:h.linkedin)||((d=s==null?void 0:s.socials)==null?void 0:d.github)||((p=s==null?void 0:s.socials)==null?void 0:p.twitter)||((_=s==null?void 0:s.socials)==null?void 0:_.instagram)||""}}}function uo(s,e,t){if(s<=0)return[];if(s===1)return[(e+t)/2];const n=(t-e)/(s-1);return Array.from({length:s},(i,r)=>e+n*r)}function K0(s){return uo(s,lo,co).map(e=>({position:{x:e,y:3,z:-19.5},rotationY:0}))}function Y0(s){return uo(s,lo,co).map(e=>({position:{x:-19.5,y:3,z:e},rotationY:Math.PI/2}))}function Z0(s){return uo(s,lo,co).map(e=>({position:{x:19.5,y:3,z:e},rotationY:-Math.PI/2}))}function wa(s,e,t){return s.map((n,i)=>{const r=e[i];return{...j0(n,t+i),position:r.position,rotationY:r.rotationY}})}async function $0(){try{const s=await fetch("/api/public/members",{headers:{"Content-Type":"application/json"},cache:"no-store"});if(!s.ok)return[];const e=await s.json();if(!Array.isArray(e))return[];const t=e.filter(f=>!f||typeof f!="object"?!1:(typeof f.wing=="string"?f.wing:"").trim().toLowerCase()==="metaverse"),n=t.filter(f=>(typeof(f==null?void 0:f.role)=="string"?f.role:"").trim().toLowerCase()==="coordinator"),i=t.filter(f=>(typeof(f==null?void 0:f.role)=="string"?f.role:"").trim().toLowerCase()!=="coordinator"),r=n.slice(0,V0),a=K0(r.length),o=wa(r,a,0),c=i.slice(0,W0),l=Math.ceil(c.length/2),u=c.length-l,h=c.slice(0,l),d=c.slice(l),p=Y0(Math.min(h.length,Dr)),_=Z0(Math.min(d.length,Dr)),v=wa(h.slice(0,Dr),p,o.length),g=wa(d.slice(0,Dr),_,o.length+v.length);return[...o,...v,...g]}catch(s){return console.error("Failed to fetch metaverse members for gallery",s),[]}}function tc(s=256){const e=document.createElement("canvas");e.width=s,e.height=s;const t=e.getContext("2d");t.fillStyle="#6b5c3e",t.fillRect(0,0,s,s);const n=s/16;for(let i=0;i<16;i++)for(let r=0;r<16;r++){const a=r*n+n/2,o=i*n+n/2;t.beginPath(),t.arc(a,o,n*.28,0,Math.PI*2),t.fillStyle="#8b7a54",t.fill(),t.beginPath(),t.arc(a,o,n*.12,0,Math.PI*2),t.fillStyle="#c4a94f",t.fill(),t.strokeStyle="#8b7a54",t.lineWidth=1,t.beginPath(),t.moveTo(a+n*.28,o),t.lineTo(a+n*.5,o),t.stroke(),t.beginPath(),t.moveTo(a,o+n*.28),t.lineTo(a,o+n*.5),t.stroke()}return e}function J0(s=256){const e=document.createElement("canvas");e.width=s,e.height=s/4;const t=e.getContext("2d"),n=e.width,i=e.height;t.fillStyle="#7a6940",t.fillRect(0,0,n,i);const r=32,a=n/r;for(let o=0;o<r;o++){const c=o*a+a/2;o%2===0?(t.beginPath(),t.ellipse(c,i/2,a*.3,i*.35,0,0,Math.PI*2),t.fillStyle="#c8ab50",t.fill(),t.strokeStyle="#a08030",t.lineWidth=1,t.stroke()):(t.beginPath(),t.moveTo(c,i*.15),t.lineTo(c+a*.15,i/2),t.lineTo(c,i*.85),t.lineTo(c-a*.15,i/2),t.closePath(),t.fillStyle="#b09840",t.fill())}return e}function Q0(){const s=new gi(tc(512));s.wrapS=ct,s.wrapT=ct,s.repeat.set(4,1);const e=new Xt({color:12096558,metalness:.75,roughness:.3,bumpMap:s,bumpScale:.06}),t=new gi(tc(256));t.wrapS=ct,t.wrapT=ct,t.repeat.set(8,1);const n=new Xt({color:9137972,metalness:.6,roughness:.4,bumpMap:t,bumpScale:.08}),i=new gi(J0(512));i.wrapS=ct,i.wrapT=ct,i.repeat.set(6,1);const r=new Xt({color:13939786,metalness:.8,roughness:.2,bumpMap:i,bumpScale:.04}),a=new Xt({color:2759182,metalness:0,roughness:.95}),o=new Xt({color:1971211,metalness:.1,roughness:.9}),c=new Xt({color:14861146,metalness:.85,roughness:.15});return{outerMolding:e,reliefStrip:n,beadEdge:r,linerMat:a,backingMat:o,rosetteMat:c}}function nc(s){return s.toLowerCase().replace(/(?:^|\s)\S/g,e=>e.toUpperCase())}function ba(s,e,t,n,i,r){s.beginPath(),s.moveTo(e+r,t),s.lineTo(e+n-r,t),s.quadraticCurveTo(e+n,t,e+n,t+r),s.lineTo(e+n,t+i-r),s.quadraticCurveTo(e+n,t+i,e+n-r,t+i),s.lineTo(e+r,t+i),s.quadraticCurveTo(e,t+i,e,t+i-r),s.lineTo(e,t+r),s.quadraticCurveTo(e,t,e+r,t),s.closePath()}function e_(s,e){const t=document.createElement("canvas");t.width=640,t.height=200;const n=t.getContext("2d");if(!n)return null;const i=(s==null?void 0:s.title)||"Member",r=nc((s==null?void 0:s.artist)||"Member"),a=nc((s==null?void 0:s.year)||"Metaverse"),o=t.width,c=t.height,l=10,u=l,h=l,d=o-l*2,p=c-l*2,_=12;n.fillStyle="rgba(16, 13, 10, 0.94)",ba(n,u,h,d,p,_),n.fill(),n.strokeStyle="rgba(210, 175, 100, 0.7)",n.lineWidth=2.5,ba(n,u,h,d,p,_),n.stroke();const v=o/2;n.textAlign="center",n.textBaseline="middle",n.fillStyle="#ffffff",n.font="bold 40px sans-serif",n.fillText(i,v,52);const g=85;n.strokeStyle="rgba(210, 175, 100, 0.4)",n.lineWidth=1,n.beginPath(),n.moveTo(v-120,g),n.lineTo(v+120,g),n.stroke(),n.fillStyle="#f0c890",n.font="600 28px sans-serif",n.fillText(r,v,115),n.font="500 22px sans-serif";const S=n.measureText(a).width+16*2,M=28,E=v-S/2,C=143,P=8;n.fillStyle="rgba(180, 150, 80, 0.15)",n.strokeStyle="rgba(200, 170, 100, 0.35)",n.lineWidth=1,ba(n,E,C,S,M,P),n.fill(),n.stroke(),n.fillStyle="#c8a86a",n.fillText(a,v,C+M/2);const I=new gi(t);I.colorSpace=Pt,I.anisotropy=8;const y=o/c,L=e+.3,K=L/y,V=new kn(L,K),O=new Bn({map:I,transparent:!0,depthTest:!0,depthWrite:!0});return new tt(V,O)}function Es(s,e,t,n,i,r,a){const o=new tt(new Ht(t+i*2,i,r),e);o.position.set(0,n/2+i/2,a);const c=new tt(new Ht(t+i*2,i,r),e);c.position.set(0,-(n/2+i/2),a);const l=new tt(new Ht(i,n,r),e);l.position.set(-(t/2+i/2),0,a);const u=new tt(new Ht(i,n,r),e);return u.position.set(t/2+i/2,0,a),[o,c,l,u].forEach(h=>{h.castShadow=!0,h.receiveShadow=!0,s.add(h)}),{totalW:t+i*2,totalH:n+i*2}}function t_(s,e,t,n,i){const r=new Is(.12,.12,.08,16);[[t,n],[-t,n],[t,-n],[-t,-n]].forEach(([o,c])=>{const l=new tt(r,e);l.rotation.x=Math.PI/2,l.position.set(o,c,i+.05),l.castShadow=!0,l.receiveShadow=!0,s.add(l);const u=new tt(new Is(.04,.04,.04,12),new Xt({color:16773296,metalness:.9,roughness:.1}));u.rotation.x=Math.PI/2,u.position.set(o,c,i+.1),s.add(u)})}function ic(s,e){return new Promise((t,n)=>{s.load(e,t,void 0,n)})}function n_(s){const e=s==null?void 0:s.image;if(!(e!=null&&e.width)||!(e!=null&&e.height))return s;const n=Math.min(1,1024/Math.max(e.width,e.height)),i=Math.max(1,Math.round(e.width*n)),r=Math.max(1,Math.round(e.height*n)),a=document.createElement("canvas");a.width=i,a.height=r;const o=a.getContext("2d"),c=document.createElement("canvas");c.width=i,c.height=r;const l=c.getContext("2d"),u=document.createElement("canvas");u.width=Math.max(40,Math.round(i/8)),u.height=Math.max(40,Math.round(r/8));const h=u.getContext("2d");if(!o||!l||!h)return s;o.drawImage(e,0,0,i,r),h.imageSmoothingEnabled=!0,h.drawImage(a,0,0,u.width,u.height),l.fillStyle="#f2ecde",l.fillRect(0,0,i,r),l.imageSmoothingEnabled=!0,l.globalAlpha=.95,l.filter="saturate(200%) contrast(125%) blur(0.2px)",l.drawImage(u,0,0,i,r),l.globalAlpha=.6,l.filter="saturate(180%) contrast(120%)",l.drawImage(a,0,0,i,r),l.filter="none";let d;try{d=l.getImageData(0,0,i,r)}catch{return s}const p=d.data,_=18,v=32;for(let C=0;C<p.length;C+=4){const P=C/4%i,I=Math.floor(C/4/i);p[C]=Math.round(p[C]/_)*_,p[C+1]=Math.round(p[C+1]/_)*_,p[C+2]=Math.round(p[C+2]/_)*_;const y=(Math.random()-.5)*10;if(p[C]=Math.max(0,Math.min(255,p[C]+y)),p[C+1]=Math.max(0,Math.min(255,p[C+1]+y)),p[C+2]=Math.max(0,Math.min(255,p[C+2]+y)),P>0&&I>0&&P<i-1&&I<r-1){const L=C-4,K=C+4,V=C-i*4,O=C+i*4,H=Math.abs(p[K]-p[L])+Math.abs(p[K+1]-p[L+1])+Math.abs(p[K+2]-p[L+2]),W=Math.abs(p[O]-p[V])+Math.abs(p[O+1]-p[V+1])+Math.abs(p[O+2]-p[V+2]);H+W>v*3&&(p[C]=Math.max(0,p[C]-18),p[C+1]=Math.max(0,p[C+1]-14),p[C+2]=Math.max(0,p[C+2]-10))}}l.putImageData(d,0,0);const g=l.createImageData(i,r),f=g.data;for(let C=0;C<f.length;C+=4){const P=230+Math.floor(Math.random()*25);f[C]=P,f[C+1]=P-4,f[C+2]=P-9,f[C+3]=255}const T=document.createElement("canvas");T.width=i,T.height=r;const S=T.getContext("2d");S&&(S.putImageData(g,0,0),l.globalAlpha=.05,l.filter="blur(0.35px)",l.drawImage(T,0,0),l.filter="none"),l.globalAlpha=.04,l.fillStyle="#f7f0de",l.fillRect(0,0,i,r);const M=l.createRadialGradient(i*.5,r*.5,i*.1,i*.5,r*.5,i*.78);M.addColorStop(0,"rgba(0,0,0,0)"),M.addColorStop(1,"rgba(80,55,25,0.12)"),l.globalAlpha=1,l.fillStyle=M,l.fillRect(0,0,i,r),l.globalAlpha=1;const E=new gi(c);return E.colorSpace=Pt,E.anisotropy=4,E.needsUpdate=!0,s.dispose(),E}async function i_(s,e,t){try{return await ic(s,e)}catch{return await ic(s,t)}}async function r_(s,e){let t=[];const n=Q0(),i=await $0();if(!i.length)return t;e.setCrossOrigin("anonymous");for(const[r,a]of i.entries()){const o=await i_(e,a.imgSrc,`artworks/${r%16+1}.jpg`),c=n_(o);c.colorSpace=Pt,c.anisotropy=4;const l=new Tn,u=new tt(new kn(a.width+1.2,a.height+1.2),n.backingMat);u.position.z=-.06,l.add(u);const h=new tt(new kn(a.width,a.height),new Xt({map:c,roughness:.6,metalness:.05}));h.position.z=.07,h.castShadow=!0,h.receiveShadow=!0,l.add(h);let d=Es(l,n.linerMat,a.width,a.height,.08,.14,.02);d=Es(l,n.beadEdge,d.totalW,d.totalH,.06,.16,.01),d=Es(l,n.reliefStrip,d.totalW,d.totalH,.14,.22,-.01),d=Es(l,n.outerMolding,d.totalW,d.totalH,.18,.28,-.03),t_(l,n.rosetteMat,d.totalW/2,d.totalH/2,-.03),l.position.set(a.position.x,a.position.y,a.position.z),l.rotation.y=a.rotationY,l.userData={type:"painting",info:a.info,url:a.info.link,dimensions:{width:a.width,height:a.height}},h.userData=l.userData;const p=e_(a.info,a.width);p&&(p.position.set(0,-(a.height/2)-1.35,.06),l.add(p)),t.push(l)}return t}function s_(s,e){let t=new Tn;s.add(t);const n=e.load("/textures/leather_white_diff_4k.jpg");n.colorSpace=Pt,n.wrapS=n.wrapT=ct;const r=new H0().load("/textures/leather_white_nor_gl_4k.exr");r.wrapS=r.wrapT=ct;const a=new Xt({map:n,normalMap:r,roughness:.2,side:Qt}),o=new tt(new Ht(80,20,.001),a);o.receiveShadow=!0,o.castShadow=!1,o.position.z=-20;const c=new tt(new Ht(80,20,.001),a);c.receiveShadow=!0,c.castShadow=!1,c.rotation.y=Math.PI/2,c.position.x=-20;const l=new tt(new Ht(80,20,.001),a);l.receiveShadow=!0,l.castShadow=!1,l.position.x=20,l.rotation.y=Math.PI/2;const u=new tt(new Ht(80,20,.001),a);return u.receiveShadow=!0,u.castShadow=!1,u.position.z=20,t.add(o,u,c,l),t}let Lt=null,nr=null;const a_=(s,e)=>{const t=new t0(16775146,.22);s.add(t);const n=new Zg(16772785,526368,.5);s.add(n);const i=new _i(16773068,.28,60);i.position.set(0,6,-8),s.add(i);const r=new _i(14543103,.2,60);r.position.set(0,6,8),s.add(r);const a=new _i(16774888,.2,90);a.position.set(0,8.5,0),s.add(a);function o(c,l,u,h,d){const p=new Ds(16774879,h);return p.position.set(c,l,u),p.target.position.copy(d),p.castShadow=!0,p.angle=1.57079,p.penumbra=.48,p.decay=1,p.distance=42,p.shadow.mapSize.width=512,p.shadow.mapSize.height=512,p.shadow.bias=-8e-5,p.shadow.normalBias=.03,p.shadow.radius=2,p.shadow.focus=.9,p.shadow.camera.near=.5,p.shadow.camera.far=35,s.add(p),s.add(p.target),p}o(0,6.7,-13,.88,new D(0,0,-20)),o(0,6.7,13,.84,new D(0,0,20)),o(-13,6.7,0,.84,new D(-20,0,0)),o(13,6.7,0,.84,new D(20,0,0)),nr=new rt,s.add(nr),Lt=new Ds(16775664,.26),Lt.angle=.62,Lt.penumbra=.72,Lt.decay=1.2,Lt.distance=24,Lt.castShadow=!1,Lt.shadow.mapSize.width=1024,Lt.shadow.mapSize.height=1024,Lt.shadow.bias=-1e-4,Lt.shadow.normalBias=.02,Lt.shadow.radius=3,Lt.shadow.camera.near=.2,Lt.shadow.camera.far=35,Lt.target=nr,s.add(Lt)},rc=new D,o_=new D(0,1.1,0),l_=s=>{!Lt||!nr||(s.getWorldDirection(rc),Lt.position.copy(s.position).add(o_),nr.position.copy(Lt.position).add(rc.multiplyScalar(8)),nr.updateMatrixWorld())},c_=s=>{if(!s)return;const e=new _i(16773846,.6,18,1.5);e.position.set(0,.6,0),e.castShadow=!1,s.add(e)},u_=s=>{const e=new ro,t=e.load("/WoodFloor040_4K-JPG/WoodFloor040_2K-PNG_Color.png");t.colorSpace=Pt;const n=e.load("/WoodFloor040_4K-JPG/WoodFloor040_2K-PNG_Displacement.png"),i=e.load("/WoodFloor040_4K-JPG/WoodFloor040_2K-PNG_NormalGL.png"),r=e.load("/WoodFloor040_4K-JPG/WoodFloor040_2K-PNG_Roughness.png"),a=e.load("/WoodFloor040_4K-JPG/WoodFloor040_2K-PNG_AmbientOcclusion.png");t.wrapS=t.wrapT=ct,n.wrapS=n.wrapT=ct,i.wrapS=i.wrapT=ct,r.wrapS=r.wrapT=ct,a.wrapS=a.wrapT=ct;const o=new kn(45,45),c=new ni({map:t,normalMap:i,roughnessMap:r,aoMap:a,roughness:.34,metalness:.08,clearcoat:.45,clearcoatRoughness:.32,normalScale:new Be(.75,.75),aoMapIntensity:.45,side:Qt}),l=new tt(o,c);l.rotation.x=Math.PI/2,l.position.y=-Math.PI,l.receiveShadow=!0,s.add(l)},h_=(s,e)=>{const t=e.load("/OfficeCeiling005_4K-JPG/OfficeCeiling005_2K-PNG_Color.png");t.colorSpace=Pt;const n=e.load("/OfficeCeiling005_4K-JPG/OfficeCeiling005_2K-PNG_Displacement.png"),i=e.load("/OfficeCeiling005_4K-JPG/OfficeCeiling005_2K-PNG_AmbientOcclusion.png"),r=e.load("/OfficeCeiling005_4K-JPG/OfficeCeiling005_2K-PNG_Emission.png"),a=e.load("/OfficeCeiling005_4K-JPG/OfficeCeiling005_2K-PNG_Metalness.png"),o=e.load("/OfficeCeiling005_4K-JPG/OfficeCeiling005_2K-PNG_NormalGL.png"),c=e.load("/OfficeCeiling005_4K-JPG/OfficeCeiling005_2K-PNG_Roughness.png");t.wrapS=t.wrapT=ct,n.wrapS=n.wrapT=ct,i.wrapS=i.wrapT=ct,r.wrapS=r.wrapT=ct,a.wrapS=a.wrapT=ct,o.wrapS=o.wrapT=ct,c.wrapS=c.wrapT=ct;const l=new kn(45,40),u=new Og({map:t,displacementMap:n,aoMap:i,emissiveMap:r,metalnessMap:a,normalMap:o,roughnessMap:c,displacementScale:.1,side:Qt}),h=new tt(l,u);h.rotation.x=Math.PI/2,h.position.y=10,s.add(h)},sc=s=>{Array.isArray(s)||(s=s.children),s.forEach(e=>{e.BoundingBox=new yn,e.BoundingBox.setFromObject(e)})},Ji=s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),d_=s=>{if(typeof s!="string"||!s.trim())return"";const e=s.trim();return/^https?:\/\//i.test(e)?e:`https://${e}`},f_={LinkedIn:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',GitHub:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',Twitter:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',Instagram:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z"/></svg>'},p_=s=>{if(!s||typeof s!="object")return"";const e=[["LinkedIn",s.linkedin],["GitHub",s.github],["Twitter",s.twitter],["Instagram",s.instagram]].map(([n,i])=>[n,d_(i)]).filter(([,n])=>!!n);return e.length?`<div class="info-socials">${e.map(([n,i])=>`<a class="info-social-link" href="${Ji(i)}" target="_blank" rel="noopener noreferrer">${f_[n]||""}${Ji(n)}</a>`).join("")}</div>`:""},m_=s=>{const e=document.getElementById("painting-info"),t=Ji((s==null?void 0:s.title)||"Member"),n=Ji((s==null?void 0:s.artist)||"Member"),i=Ji((s==null?void 0:s.year)||"Metaverse"),r=Ji((s==null?void 0:s.description)||""),a=p_(s==null?void 0:s.socials);e.innerHTML=`
    <div class="info-card">
      <div class="info-accent-bar"></div>
      <div class="info-body">
        <h3 class="info-name">${t}</h3>
        <div class="info-meta">
          <span class="info-tag info-tag-role">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            ${n}
          </span>
          <span class="info-tag info-tag-wing">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            ${i}
          </span>
        </div>
        ${r?`<p class="info-desc">${r}</p>`:""}
        ${a}
      </div>
    </div>
  `,e.classList.add("show")},g_=()=>{document.getElementById("painting-info").classList.remove("show")},ac=2,__=45,v_=15,x_=8,M_=10,y_=.018,S_=.22,w_=20;let Ur=0,Br=!0,Ar=null,Cr=0;const yt={Shift:!1,w:!1,a:!1,s:!1,d:!1,c:!1},b_=()=>{Br&&(Ur=v_,Br=!1)},T_=(s,e,t,n)=>{const a=yt.w&&yt.Shift,o=10*s,c=10*s,l=(a?15:10)*s;Ar===null&&(Ar=t.fov);let u=a?Ar+x_:Ar;yt.c&&(u=Ar/4);const h=Ba.lerp(t.fov,u,Math.min(1,s*M_));Math.abs(h-t.fov)>.001&&(t.fov=h,t.updateProjectionMatrix());const d=t.position.clone();if(yt.d&&e.moveRight(o),yt.a&&e.moveRight(-o),yt.w&&e.moveForward(l),yt.s&&e.moveForward(-c),E_(t,n)&&t.position.copy(d),Ur-=__*s,t.position.y+=Ur*s,t.position.y<=ac){const p=Math.abs(Ur);t.position.y=ac,Br||(Cr=Math.min(S_,p*y_)),Ur=0,Br=!0}else Br=!1;Cr>5e-4&&(t.position.y-=Cr,Cr=Ba.lerp(Cr,0,Math.min(1,s*w_)))},E_=(s,e)=>{const t=new yn,n=new D;s.getWorldPosition(n),t.setFromCenterAndSize(n,new D(1,1,1));for(let i=0;i<e.children.length;i++){const r=e.children[i];if(t.intersectsBox(r.BoundingBox))return!0}return!1};let on;const Rs={x:.5,y:-.5,z:-.7},zr={x:-.45,y:-.32,z:-.08},A_=s=>{on=new Tn;const e=new Xt({color:14725770,roughness:.84,metalness:.02,flatShading:!0}),t=new Xt({color:1982639,roughness:.82,metalness:0,flatShading:!0}),n=new tt(new Ht(.17,.4,.17),t);n.position.set(0,-.06,.02),on.add(n);const i=new tt(new Ht(.145,.145,.145),e);return i.position.set(0,.195,.03),on.add(i),on.traverse(r=>{r.isMesh&&(r.castShadow=!1,r.receiveShadow=!1,r.renderOrder=999,r.material.depthTest=!1,r.material.depthWrite=!0)}),on.position.set(Rs.x,Rs.y,Rs.z),on.rotation.set(zr.x,zr.y,zr.z),s.add(on),on},C_=s=>{if(!on)return;const e=yt.w||yt.a||yt.s||yt.d||yt.ArrowUp||yt.ArrowLeft||yt.ArrowDown||yt.ArrowRight,t=e?.03:.012,n=e?11:3;on.position.y=Rs.y+Math.sin(s*n)*t,on.rotation.x=zr.x+Math.sin(s*n)*.06,on.rotation.z=zr.z+Math.cos(s*n*.5)*.018},L_=(s,e,t,n,i,r)=>{const a=new nu,o=new g0;o.far=12;const c=new Be(0,0),l=9;let u=null,h=0,d=0,p=0;const _=5,v=8,g=document.createElement("div");g.id="fps-counter",g.textContent="FPS: --",g.style.position="fixed",g.style.top="12px",g.style.right="12px",g.style.zIndex="120",g.style.padding="6px 10px",g.style.borderRadius="8px",g.style.fontFamily="monospace",g.style.fontSize="12px",g.style.color="#f4f8ff",g.style.background="rgba(8, 10, 24, 0.72)",g.style.border="1px solid rgba(255, 255, 255, 0.2)",g.style.pointerEvents="none",document.body.appendChild(g);const f=E=>{var P,I;let C=E;for(;C;){if(((P=C.userData)==null?void 0:P.type)==="painting"&&((I=C.userData)!=null&&I.info))return C.userData.info;C=C.parent}return null},T=n.map(E=>{const C=E.children,P=C[C.length-1];return P&&P.isMesh&&P.material&&P.material.transparent?P:null}),S=new D;let M=function(){const E=a.getDelta(),C=a.getElapsedTime();if(h+=1,d+=1,p+=E,p>=.25){const I=Math.round(d/p);g.textContent=`FPS: ${I}`,d=0,p=0}if(T_(E,i,e,r),C_(C),l_(e),h%10===0)for(let I=0;I<n.length;I++){const y=T[I];if(!y)continue;n[I].getWorldPosition(S);const L=e.position.distanceTo(S),K=Math.min(1,Math.max(0,(L-_)/(v-_)));y.material.opacity=K,y.visible=K>.01}if(i.isLocked&&h%4===0){o.setFromCamera(c,e);const I=o.intersectObjects(n,!0);let y=null;for(const L of I){if(L.distance>l)continue;const K=f(L.object);if(K){y=K;break}}u=y}u?m_(u):g_(),t.render(s,e),requestAnimationFrame(M)};M()},R_=s=>{document.addEventListener("keydown",e=>P_(e),!1),document.addEventListener("keyup",e=>I_(e),!1),s.addEventListener("unlock",()=>{requestAnimationFrame(()=>{}),Ta()}),window.addEventListener("blur",Ta),document.addEventListener("visibilitychange",()=>{document.hidden&&Ta()})};function P_(s,e){s.code==="Space"&&(s.preventDefault(),b_()),cu(s,!0)}function I_(s,e){cu(s,!1)}function cu(s,e){if(s.key==="Shift"||s.code==="ShiftLeft"||s.code==="ShiftRight"){yt.Shift=e;return}const t=s.key.length===1?s.key.toLowerCase():s.key;t in yt&&(yt[t]=e)}function Ta(){Object.keys(yt).forEach(s=>{yt[s]=!1})}const D_=(s,e)=>{e.forEach(t=>{s.add(t)})};let uu=!1;function hu(){const s=document.getElementById("lock_pointer_button");if(!s)return;const t=s.querySelector("span")||s;t.textContent=uu?"Continue Exploring":"Start Exploring"}const U_=()=>{const s=document.getElementById("lock-ui"),e=document.getElementById("crosshair");s&&(s.style.display="none"),e&&(e.style.display="block"),document.body.classList.add("is-pointer-locked")},oc=()=>{const s=document.getElementById("lock-ui"),e=document.getElementById("crosshair");hu(),s&&(s.style.display="block"),e&&(e.style.display="none"),document.body.classList.remove("is-pointer-locked")},N_=s=>{uu=!0,s.lock()};function F_(){const s=document.getElementById("loading-particles");if(s)for(let e=0;e<20;e++){const t=document.createElement("div");t.className="loading-particle",t.style.contentVisibility="auto",t.style.willChange="transform, opacity",t.style.left=`${Math.random()*100}%`,t.style.bottom=`-${Math.random()*40}px`,t.style.animationDuration=`${3+Math.random()*5}s`,t.style.animationDelay=`${Math.random()*4}s`,t.style.width=t.style.height=`${1.5+Math.random()*2.5}px`,t.style.opacity=`${.3+Math.random()*.5}`,s.appendChild(t)}}function O_(){F_();const s=document.getElementById("loading-screen"),e=document.getElementById("loading-bar-fill"),t=document.getElementById("loading-percent");let n=8,i=0,r=!1,a=null;const o=()=>{const _=Math.max(0,Math.min(100,i));e&&(e.style.width=`${_}%`),t&&(t.textContent=`${Math.round(_)}%`)},c=()=>{i+=(n-i)*.08,Math.abs(n-i)<.1&&(i=n),o(),(!r||i<99.9)&&(a=requestAnimationFrame(c))};c();const l=setInterval(()=>{if(r)return;const _=.2+Math.random()*.5;n=Math.min(95,n+_)},100),u=()=>{r=!0,clearInterval(l),n=100;const _=()=>{i+=(100-i)*.2,o(),100-i>.5?requestAnimationFrame(_):(i=100,o(),setTimeout(()=>{if(s&&!s.classList.contains("done")){s.classList.add("done");const v=document.getElementById("loading-particles");v&&(v.innerHTML="")}},300),a&&(cancelAnimationFrame(a),a=null))};a&&cancelAnimationFrame(a),_(),clearInterval(l),typeof h<"u"&&clearTimeout(h),typeof d<"u"&&clearTimeout(d),typeof p<"u"&&clearTimeout(p)};Xa.onProgress=(_,v,g)=>{if(!r&&g>0){const f=v/g*100;n=Math.max(n,Math.min(f,96))}};const h=setTimeout(()=>{r||(n=Math.max(n,99),r=!0,setTimeout(u,550))},18e3),d=setTimeout(()=>{u()},22e3);let p=null;return{finish(){if(r)return;r=!0,n=100,p=setTimeout(()=>{u()},1400);const _=()=>{if(i>=99.4){setTimeout(u,260);return}requestAnimationFrame(_)};_()}}}const Xa={onProgress:null},B_=s=>{const e=document.getElementById("lock_pointer_button");e&&e.addEventListener("click",()=>N_(s)),s.addEventListener("lock",U_),s.addEventListener("unlock",oc),hu(),oc()};let As;const z_=s=>{const e=new s0;s.add(e),As=new a0(e),new i0().load("sounds/tiersen.mp3",function(n){As.setBuffer(n),As.setLoop(!0),As.setVolume(.5)})};function lc(s,e){if(e===ih)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===Ua||e===Tc){let t=s.getIndex();if(t===null){const a=[],o=s.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===Ua)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}class du extends wi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new W_(t)}),this.register(function(t){return new $_(t)}),this.register(function(t){return new J_(t)}),this.register(function(t){return new Q_(t)}),this.register(function(t){return new q_(t)}),this.register(function(t){return new j_(t)}),this.register(function(t){return new K_(t)}),this.register(function(t){return new Y_(t)}),this.register(function(t){return new V_(t)}),this.register(function(t){return new Z_(t)}),this.register(function(t){return new X_(t)}),this.register(function(t){return new H_(t)}),this.register(function(t){return new ev(t)}),this.register(function(t){return new tv(t)})}load(e,t,n,i){const r=this;let a;this.resourcePath!==""?a=this.resourcePath:this.path!==""?a=this.path:a=Ha.extractUrlBase(e),this.manager.itemStart(e);const o=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new zs(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===fu){try{a[Ke.KHR_BINARY_GLTF]=new nv(e)}catch(h){i&&i(h);return}r=JSON.parse(a[Ke.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new mv(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](l);o[h.name]=h,a[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const h=r.extensionsUsed[u],d=r.extensionsRequired||[];switch(h){case Ke.KHR_MATERIALS_UNLIT:a[h]=new G_;break;case Ke.KHR_DRACO_MESH_COMPRESSION:a[h]=new iv(r,this.dracoLoader);break;case Ke.KHR_TEXTURE_TRANSFORM:a[h]=new rv;break;case Ke.KHR_MESH_QUANTIZATION:a[h]=new sv;break;default:d.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function k_(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const Ke={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class H_{constructor(e){this.parser=e,this.name=Ke.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const u=new Fe(16777215);c.color!==void 0&&u.fromArray(c.color);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new e0(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new _i(u),l.distance=h;break;case"spot":l=new Ds(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Jn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}}class G_{constructor(){this.name=Ke.KHR_MATERIALS_UNLIT}getMaterialType(){return Bn}extendParams(e,t,n){const i=[];e.color=new Fe(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.fromArray(a),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,et))}return Promise.all(i)}}class V_{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class W_{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Be(o,o)}return Promise.all(r)}}class X_{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class q_{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new Fe(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=i.extensions[this.name];return a.sheenColorFactor!==void 0&&t.sheenColor.fromArray(a.sheenColorFactor),a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,et)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class j_{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class K_{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Fe(o[0],o[1],o[2]),Promise.all(r)}}class Y_{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class Z_{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ni}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new Fe(o[0],o[1],o[2]),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,et)),Promise.all(r)}}class $_{constructor(e){this.parser=e,this.name=Ke.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class J_{constructor(e){this.parser=e,this.name=Ke.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Q_{constructor(e){this.parser=e,this.name=Ke.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class ev{constructor(e){this.name=Ke.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const c=i.byteOffset||0,l=i.byteLength||0,u=i.count,h=i.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,d,i.mode,i.filter).then(function(p){return p.buffer}):a.ready.then(function(){const p=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(p),u,h,d,i.mode,i.filter),p})})}else return null}}class tv{constructor(e){this.name=Ke.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==an.TRIANGLES&&l.mode!==an.TRIANGLE_STRIP&&l.mode!==an.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{const u=l.pop(),h=u.isGroup?u.children:[u],d=l[0].count,p=[];for(const _ of h){const v=new Xe,g=new D,f=new Hn,T=new D(1,1,1),S=new Dg(_.geometry,_.material,d);for(let M=0;M<d;M++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,M),c.ROTATION&&f.fromBufferAttribute(c.ROTATION,M),c.SCALE&&T.fromBufferAttribute(c.SCALE,M),S.setMatrixAt(M,v.compose(g,f,T));for(const M in c)M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"&&_.geometry.setAttribute(M,c[M]);rt.prototype.copy.call(S,_),this.parser.assignFinalMaterial(S),p.push(S)}return u.isGroup?(u.clear(),u.add(...p),u):p[0]}))}}const fu="glTF",Lr=12,cc={JSON:1313821514,BIN:5130562};class nv{constructor(e){this.name=Ke.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Lr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==fu)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Lr,r=new DataView(e,Lr);let a=0;for(;a<i;){const o=r.getUint32(a,!0);a+=4;const c=r.getUint32(a,!0);if(a+=4,c===cc.JSON){const l=new Uint8Array(e,Lr+a,o);this.content=n.decode(l)}else if(c===cc.BIN){const l=Lr+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class iv{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ke.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(const u in a){const h=qa[u]||u.toLowerCase();o[h]=a[u]}for(const u in e.attributes){const h=qa[u]||u.toLowerCase();if(a[u]!==void 0){const d=n.accessors[e.attributes[u]],p=ir[d.componentType];l[h]=p.name,c[h]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h){i.decodeDracoFile(u,function(d){for(const p in d.attributes){const _=d.attributes[p],v=c[p];v!==void 0&&(_.normalized=v)}h(d)},o,l)})})}}class rv{constructor(){this.name=Ke.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class sv{constructor(){this.name=Ke.KHR_MESH_QUANTIZATION}}class pu extends qr{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=i-t,h=(n-t)/u,d=h*h,p=d*h,_=e*l,v=_-l,g=-2*p+3*d,f=p-d,T=1-g,S=f-d+h;for(let M=0;M!==o;M++){const E=a[v+M+o],C=a[v+M+c]*u,P=a[_+M+o],I=a[_+M]*u;r[M]=T*E+S*C+g*P+f*I}return r}}const av=new Hn;class ov extends pu{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return av.fromArray(r).normalize().toArray(r),r}}const an={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},ir={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},uc={9728:Rt,9729:bt,9984:Da,9985:Sc,9986:Cs,9987:ti},hc={33071:qt,33648:Ps,10497:ct},Ea={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},qa={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv2",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},$n={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},lv={CUBICSPLINE:void 0,LINEAR:or,STEP:kr},Aa={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function cv(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Xt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:En})),s.DefaultMaterial}function Rr(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Jn(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function uv(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,u=e.length;l<u;l++){const h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const a=[],o=[],c=[];for(let l=0,u=e.length;l<u;l++){const h=e[l];if(n){const d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):s.attributes.position;a.push(d)}if(i){const d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):s.attributes.normal;o.push(d)}if(r){const d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):s.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const u=l[0],h=l[1],d=l[2];return n&&(s.morphAttributes.position=u),i&&(s.morphAttributes.normal=h),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function hv(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function dv(s){const e=s.extensions&&s.extensions[Ke.KHR_DRACO_MESH_COMPRESSION];let t;return e?t="draco:"+e.bufferView+":"+e.indices+":"+dc(e.attributes):t=s.indices+":"+dc(s.attributes)+":"+s.mode,t}function dc(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function ja(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function fv(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const pv=new Xe;class mv{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new k_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,r=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,r=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&r<98?this.textureLoader=new ro(this.options.manager):this.textureLoader=new n0(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new zs(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};Rr(r,o,i),Jn(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,u]of a.children.entries())r(u,o.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ke.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,a){n.load(Ha.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=Ea[i.type],o=ir[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new Gt(l,a,c))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],c=Ea[i.type],l=ir[i.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,d=i.byteOffset||0,p=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,_=i.normalized===!0;let v,g;if(p&&p!==h){const f=Math.floor(d/p),T="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+f+":"+i.count;let S=t.cache.get(T);S||(v=new l(o,f*p,i.count*p/u),S=new Xc(v,p/u),t.cache.add(T,S)),g=new Vr(S,c,d%p/u,_)}else o===null?v=new l(i.count*c):v=new l(o,d,i.count*c),g=new Gt(v,c,_);if(i.sparse!==void 0){const f=Ea.SCALAR,T=ir[i.sparse.indices.componentType],S=i.sparse.indices.byteOffset||0,M=i.sparse.values.byteOffset||0,E=new T(a[1],S,i.sparse.count*f),C=new l(a[2],M,i.sparse.count*c);o!==null&&(g=new Gt(g.array.slice(),g.itemSize,g.normalized));for(let P=0,I=E.length;P<I;P++){const y=E[P];if(g.setX(y,C[P*c]),c>=2&&g.setY(y,C[P*c+1]),c>=3&&g.setZ(y,C[P*c+2]),c>=4&&g.setW(y,C[P*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return g})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const i=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return u.magFilter=uc[d.magFilter]||bt,u.minFilter=uc[d.minFilter]||ti,u.wrapS=hc[d.wrapS]||ct,u.wrapT=hc[d.wrapT]||ct,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const a=i.images[e],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(h){l=!0;const d=new Blob([h],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(h){return new Promise(function(d,p){let _=d;t.isImageBitmapLoader===!0&&(_=function(v){const g=new It(v);g.needsUpdate=!0,d(g)}),t.load(Ha.resolveURL(h,r.path),_,void 0,p)})}).then(function(h){return l===!0&&o.revokeObjectURL(c),h.userData.mimeType=a.mimeType||fv(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[Ke.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[Ke.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=r.associations.get(a);a=r.extensions[Ke.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return i!==void 0&&(a.encoding=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new $c,hn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new Zc,hn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Xt}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let a;const o={},c=r.extensions||{},l=[];if(c[Ke.KHR_MATERIALS_UNLIT]){const h=i[Ke.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),l.push(h.extendParams(o,r,t))}else{const h=r.pbrMetallicRoughness||{};if(o.color=new Fe(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){const d=h.baseColorFactor;o.color.fromArray(d),o.opacity=d[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",h.baseColorTexture,et)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Qt);const u=r.alphaMode||Aa.OPAQUE;if(u===Aa.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===Aa.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Bn&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Be(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;o.normalScale.set(h,h)}return r.occlusionTexture!==void 0&&a!==Bn&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Bn&&(o.emissive=new Fe().fromArray(r.emissiveFactor)),r.emissiveTexture!==void 0&&a!==Bn&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,et)),Promise.all(l).then(function(){const h=new a(o);return r.name&&(h.name=r.name),Jn(h,r),t.associations.set(h,{materials:e}),r.extensions&&Rr(i,h,r),h})}createUniqueName(e){const t=it.sanitizeNodeName(e||"");let n=t;for(let i=1;this.nodeNamesUsed[n];++i)n=t+"_"+i;return this.nodeNamesUsed[n]=!0,n}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[Ke.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return fc(c,o,t)})}const a=[];for(let o=0,c=e.length;o<c;o++){const l=e[o],u=dv(l),h=i[u];if(h)a.push(h.promise);else{let d;l.extensions&&l.extensions[Ke.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=fc(new fn,l,t),i[u]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const u=a[c].material===void 0?cv(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let p=0,_=u.length;p<_;p++){const v=u[p],g=a[p];let f;const T=l[p];if(g.mode===an.TRIANGLES||g.mode===an.TRIANGLE_STRIP||g.mode===an.TRIANGLE_FAN||g.mode===void 0)f=r.isSkinnedMesh===!0?new Rg(v,T):new tt(v,T),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),g.mode===an.TRIANGLE_STRIP?f.geometry=lc(f.geometry,Tc):g.mode===an.TRIANGLE_FAN&&(f.geometry=lc(f.geometry,Ua));else if(g.mode===an.LINES)f=new Ug(v,T);else if(g.mode===an.LINE_STRIP)f=new no(v,T);else if(g.mode===an.LINE_LOOP)f=new Ng(v,T);else if(g.mode===an.POINTS)f=new Fg(v,T);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(f.geometry.morphAttributes).length>0&&hv(f,r),f.name=t.createUniqueName(r.name||"mesh_"+e),Jn(f,r),g.extensions&&Rr(i,f,g),t.assignFinalMaterial(f),h.push(f)}for(let p=0,_=h.length;p<_;p++)t.associations.set(h[p],{meshes:e,primitives:p});if(h.length===1)return h[0];const d=new Tn;t.associations.set(d,{meshes:e});for(let p=0,_=h.length;p<_;p++)d.add(h[p]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new kt(Ba.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Qa(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Jn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),a=i,o=[],c=[];for(let l=0,u=a.length;l<u;l++){const h=a[l];if(h){o.push(h);const d=new Xe;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new to(o,c)})}loadAnimation(e){const n=this.json.animations[e],i=n.name?n.name:"animation_"+e,r=[],a=[],o=[],c=[],l=[];for(let u=0,h=n.channels.length;u<h;u++){const d=n.channels[u],p=n.samplers[d.sampler],_=d.target,v=_.node,g=n.parameters!==void 0?n.parameters[p.input]:p.input,f=n.parameters!==void 0?n.parameters[p.output]:p.output;_.node!==void 0&&(r.push(this.getDependency("node",v)),a.push(this.getDependency("accessor",g)),o.push(this.getDependency("accessor",f)),c.push(p),l.push(_))}return Promise.all([Promise.all(r),Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l)]).then(function(u){const h=u[0],d=u[1],p=u[2],_=u[3],v=u[4],g=[];for(let f=0,T=h.length;f<T;f++){const S=h[f],M=d[f],E=p[f],C=_[f],P=v[f];if(S===void 0)continue;S.updateMatrix();let I;switch($n[P.path]){case $n.weights:I=Wr;break;case $n.rotation:I=Si;break;case $n.position:case $n.scale:default:I=Xr;break}const y=S.name?S.name:S.uuid,L=C.interpolation!==void 0?lv[C.interpolation]:or,K=[];$n[P.path]===$n.weights?S.traverse(function(O){O.morphTargetInfluences&&K.push(O.name?O.name:O.uuid)}):K.push(y);let V=E.array;if(E.normalized){const O=ja(V.constructor),H=new Float32Array(V.length);for(let W=0,ee=V.length;W<ee;W++)H[W]=V[W]*O;V=H}for(let O=0,H=K.length;O<H;O++){const W=new I(K[O]+"."+$n[P.path],M.array,V,L);C.interpolation==="CUBICSPLINE"&&(W.createInterpolant=function(ae){const Q=this instanceof Si?ov:pu;return new Q(this.times,this.values,this.getValueSize()/3,ae)},W.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0),g.push(W)}}return new Vg(i,void 0,g)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,u=o.length;l<u;l++)a.push(n.getDependency("node",o[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){const u=l[0],h=l[1],d=l[2];d!==null&&u.traverse(function(p){p.isSkinnedMesh&&p.bind(d,pv)});for(let p=0,_=h.length;p<_;p++)u.add(h[p]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let u;if(r.isBone===!0?u=new Kc:l.length>1?u=new Tn:l.length===1?u=l[0]:u=new rt,u!==l[0])for(let h=0,d=l.length;h<d;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=a),Jn(u,r),r.extensions&&Rr(n,u,r),r.matrix!==void 0){const h=new Xe;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return i.associations.has(u)||i.associations.set(u,{}),i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new Tn;n.name&&(r.name=i.createUniqueName(n.name)),Jn(r,n),n.extensions&&Rr(t,r,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,h=c.length;u<h;u++)r.add(c[u]);const l=u=>{const h=new Map;for(const[d,p]of i.associations)(d instanceof hn||d instanceof It)&&h.set(d,p);return u.traverse(d=>{const p=i.associations.get(d);p!=null&&h.set(d,p)}),h};return i.associations=l(r),r})}}function gv(s,e,t){const n=e.attributes,i=new yn;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new D(c[0],c[1],c[2]),new D(l[0],l[1],l[2])),o.normalized){const u=ja(ir[o.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new D,c=new D;for(let l=0,u=r.length;l<u;l++){const h=r[l];if(h.POSITION!==void 0){const d=t.json.accessors[h.POSITION],p=d.min,_=d.max;if(p!==void 0&&_!==void 0){if(c.setX(Math.max(Math.abs(p[0]),Math.abs(_[0]))),c.setY(Math.max(Math.abs(p[1]),Math.abs(_[1]))),c.setZ(Math.max(Math.abs(p[2]),Math.abs(_[2]))),d.normalized){const v=ja(ir[d.componentType]);c.multiplyScalar(v)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;const a=new Gn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function fc(s,e,t){const n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){s.setAttribute(o,c)})}for(const a in n){const o=qa[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){const a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return Jn(s,e),gv(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?uv(s,e.targets,t):s})}const _v=s=>{new du().load("/models/bench_2/scene.gltf",t=>{const n=t.scene;n.traverse(i=>{i.isMesh&&(i.castShadow=!0,i.receiveShadow=!0)}),n.position.set(0,-3.12,-8),n.rotation.set(0,0,0),n.scale.set(3,3,3),s.add(n)},void 0,t=>{console.error("An error occurred while loading the bench model.",t)})},vv=(s,e)=>{const t=new du,n=new D(0,-.1,.19),i=()=>{const p=document.createElement("canvas");p.width=256,p.height=256;const _=p.getContext("2d");if(!_)return null;const v=_.createRadialGradient(128,128,0,128,128,128);v.addColorStop(0,"rgba(255, 255, 255, 1)"),v.addColorStop(.35,"rgba(255, 200, 120, 0.9)"),v.addColorStop(.7,"rgba(255, 140, 0, 0.35)"),v.addColorStop(1,"rgba(255, 140, 0, 0)"),_.clearRect(0,0,256,256),_.fillStyle=v,_.fillRect(0,0,256,256);const g=new gi(p);return g.needsUpdate=!0,g},r=p=>{if(!p)return null;const _=new qc({map:p,color:16755200,transparent:!0,depthWrite:!1});return new Cg(_)},a=p=>{const f=Math.PI/6,T=i();for(let S=0;S<6;S+=1){const M=S/6*Math.PI*2+f,E=p.x+Math.cos(M)*2.2,C=p.z+Math.sin(M)*2.2,P=p.y+-3,I=new _i(16755200,1.5,10);I.position.set(E,P,C),I.castShadow=!1,s.add(I);const y=r(T);y&&(y.position.copy(I.position),y.scale.set(.6,.6,.6),s.add(y))}},o=p=>{const _=v=>{v&&(v.emissive=new Fe(16755200),v.emissiveIntensity=2,v.toneMapped=!1)};if(Array.isArray(p.material)){p.material.forEach(_);return}_(p.material)},c=p=>{const _=[],v=i();return p.traverse(g=>{if(!g||typeof g.name!="string"||g.name.toLowerCase()!=="industrial_wall_sconce")return;const T=new _i(16775408,1.1,16,1.2);T.position.copy(n),T.castShadow=!1,g.add(T);const S=r(v);S&&(S.material.color.set(16775392),S.position.copy(n),S.scale.set(.12,.12,.12),g.add(S)),g.traverse(M=>{if(!M.isMesh||!M.material)return;const E=M.name.toLowerCase();if(E.includes("glass")||E.includes("bulb")||E.includes("lamp")){const C=P=>{P&&(P.emissive=new Fe(16775408),P.emissiveIntensity=.4,P.toneMapped=!1)};Array.isArray(M.material)?M.material.forEach(C):C(M.material)}}),_.push(g)}),_},l=(p,_,v,g,f=null)=>{t.load(p,T=>{const S=T.scene;S.position.set(..._),S.rotation.set(...v),S.scale.set(...g),S.traverse(M=>{M.isMesh&&(M.castShadow=!0,M.receiveShadow=!0)}),s.add(S),c(S),f&&f(S)},void 0,T=>{console.error("Error loading model:",p,T)})},u=(p,_)=>{l("/models/wall-sconce/industrial_wall_sconce_2k.gltf",[p.x,p.y,p.z],[_.x,_.y,_.z],[8,8,8])};l("/models/chandelier/Chandelier_01_4k.gltf",[0,10,0],[0,0,0],[7,7,7],p=>{c_(p),p.traverse(_=>{_&&typeof _.name=="string"&&console.log("[chandelier] child name:",_.name),_&&_.name==="Line008000_1"&&o(_)}),a(p.position.clone())}),l("/models/wooden-table/WoodenTable_02_2k.gltf",[0,-3.14,0],[0,0,0],[8,8,8]),l("/models/floor-plant/potted_plant_04_2k.gltf",[0,.2,0],[0,Math.random()*Math.PI,0],[4,4,4]),l("/models/bull-head/bull_head_2k.gltf",[0,10,19.8],[0,Math.PI,0],[60,60,60]);const h=new Ds(16777215,3);h.position.set(0,15,12),h.target.position.set(0,10,19.8),h.angle=Math.PI/6,h.penumbra=.5,h.decay=1,h.distance=30,h.castShadow=!0,h.shadow.mapSize.width=512,h.shadow.mapSize.height=512,s.add(h),s.add(h.target),[[-18,-3.14,-18],[18,-3.14,-18],[-18,-3.14,18],[18,-3.14,18]].forEach(p=>{l("/models/floor-plant/potted_plant_04_2k.gltf",p,[0,Math.random()*Math.PI,0],[15,15,15])}),e&&e.forEach(p=>{const v=p.position.clone(),g=new D(0,0,1).applyEuler(new dr(0,p.rotation.y,0)).normalize();v.y+=4/2+1,v.add(g.multiplyScalar(.65)),u(v,{x:p.rotation.x,y:p.rotation.y,z:p.rotation.z})})};function xv(s,e){const t="/gravity-logo.ico";e.load(t,n=>{const i=n.image,r=document.createElement("canvas");r.width=1200,r.height=500;const a=r.getContext("2d");if(!a)return;const o=r.width,c=r.height,l=o/2;a.clearRect(0,0,o,c);const u=a.createLinearGradient(0,0,o,0);u.addColorStop(0,"rgba(120, 90, 40, 0)"),u.addColorStop(.15,"rgba(140, 100, 50, 0.55)"),u.addColorStop(.5,"rgba(170, 130, 60, 0.8)"),u.addColorStop(.85,"rgba(140, 100, 50, 0.55)"),u.addColorStop(1,"rgba(120, 90, 40, 0)"),a.strokeStyle=u,a.lineWidth=2,a.beginPath(),a.moveTo(80,35),a.lineTo(o-80,35),a.stroke(),a.beginPath(),a.moveTo(80,c-35),a.lineTo(o-80,c-35),a.stroke();const h=[o*.18,o*.5,o*.82];a.fillStyle="rgba(140, 100, 50, 0.65)";for(const ee of h)a.beginPath(),a.arc(ee,35,3,0,Math.PI*2),a.fill(),a.beginPath(),a.arc(ee,c-35,3,0,Math.PI*2),a.fill();const d=c*.36;a.font="800 100px sans-serif";const p=a.measureText("GRAVITY").width,_=90,v=28,g=_+v+p,f=l-g/2,T=d-_/2;a.save();const S=16;a.beginPath(),a.moveTo(f+S,T),a.lineTo(f+_-S,T),a.quadraticCurveTo(f+_,T,f+_,T+S),a.lineTo(f+_,T+_-S),a.quadraticCurveTo(f+_,T+_,f+_-S,T+_),a.lineTo(f+S,T+_),a.quadraticCurveTo(f,T+_,f,T+_-S),a.lineTo(f,T+S),a.quadraticCurveTo(f,T,f+S,T),a.closePath(),a.clip(),a.drawImage(i,f,T,_,_),a.restore();const M=a.createRadialGradient(f+_/2,T+_/2,_*.2,f+_/2,T+_/2,_*.9);M.addColorStop(0,"rgba(138, 92, 246, 0.1)"),M.addColorStop(1,"rgba(138, 92, 246, 0)"),a.fillStyle=M,a.fillRect(f-40,T-40,_+80,_+80);const E=f+_+v;a.textBaseline="middle",a.textAlign="left",a.fillStyle="#1a1a1a",a.font="800 100px sans-serif",a.fillText("GRAVITY",E,d);const C=c*.55,P=a.createLinearGradient(l-180,0,l+180,0);P.addColorStop(0,"rgba(170, 130, 60, 0)"),P.addColorStop(.2,"rgba(170, 130, 60, 0.5)"),P.addColorStop(.5,"rgba(190, 150, 70, 0.7)"),P.addColorStop(.8,"rgba(170, 130, 60, 0.5)"),P.addColorStop(1,"rgba(170, 130, 60, 0)"),a.strokeStyle=P,a.lineWidth=1.5,a.beginPath(),a.moveTo(l-180,C),a.lineTo(l+180,C),a.stroke();const I=c*.72;a.textAlign="center",a.textBaseline="middle",a.fillStyle="#7a5a10",a.font="500 56px sans-serif",a.fillText("Metaverse Wing",l,I);const y=new gi(r);y.colorSpace=Pt,y.anisotropy=8;const L=o/c,K=5.5,V=K*L,O=new kn(V,K),H=new Bn({map:y,transparent:!0,depthTest:!0,depthWrite:!1,side:En}),W=new tt(O,H);W.position.set(0,4,-19.4),s.add(W)})}const pc="/metaverse-sim/",Mv=["/textures/","/models/","/artworks/","/OfficeCeiling005_4K-JPG/","/WoodFloor040_4K-JPG/","/sounds/","/img/"];io.setURLModifier(s=>/^(https?:)?\/\//.test(s)||s.startsWith("data:")||s.startsWith("blob:")?s:s.startsWith("/")&&Mv.some(e=>s.startsWith(e))?`${pc}${s.slice(1)}`:`${pc}${s}`);io.onProgress=(s,e,t)=>{Xa.onProgress&&Xa.onProgress(s,e,t)};const yv=O_(),{camera:Us,controls:Ca,renderer:La}=G0();A_(Us);z_(Us);const ks=new ro,mc=s_(cn,ks);u_(cn);h_(cn,ks);xv(cn,ks);async function Sv(){try{const s=await r_(cn,ks);a_(cn,s,La),sc(mc),sc(s),D_(cn,s),B_(Ca),R_(Ca),L_(cn,Us,La,s,Ca,mc),_v(cn),vv(cn,s)}catch(s){console.error("Metaverse gallery initialization failed:",s)}finally{yv.finish()}}Sv();
