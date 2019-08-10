!function(t){var e={};function i(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(1),r=i(2),o=i(3),s=function(){function t(){this.isPause=!0,this.k=2,this.m=2,this.flag=!1,this.totalTime=0,this.btnStart=document.getElementById("btnStart"),this.ranK=document.getElementById("ranK"),this.ranM=document.getElementById("ranM"),this.spK=document.getElementById("spK"),this.spM=document.getElementById("spM"),this.spTime=document.getElementById("spTime"),this.canvas=document.getElementById("canvas"),this.render=new n.Render(this.canvas.getContext("2d")),this.world=new r.World,this.circleBody=new o.Body,this.resetBody(),this.world.addBody(this.circleBody)}return t.prototype.start=function(){var t=this;this.btnStart.onclick=function(){t.isPause=!t.isPause,t.ranK.disabled=t.ranM.disabled=t.btnStart.disabled=!0},this.ranK.oninput=function(){t.spK.innerHTML=t.ranK.value+"N/m",t.k=Number(t.ranK.value)},this.ranM.oninput=function(){t.spM.innerHTML=t.ranM.value+"kg",t.m=Number(t.ranM.value)},this.world=new r.World,this.circleBody=new o.Body,this.world.addBody(this.circleBody),this.resetBody(),this.Update()},t.prototype.Update=function(){var t=this;requestAnimationFrame(function(){return t.Update()});var e=performance.now();if(this.elapsedTime=this.previousTime?(e-this.previousTime)/1e3:0,this.previousTime=e,this.elapsedTime>0){if(this.isPause)return;if(this.circleBody.x<400&&(this.flag=!0),this.circleBody.x>400&&this.flag)return void this.resetBody();this.totalTime+=this.elapsedTime,this.spTime.innerHTML=this.totalTime.toFixed(2).toString()+"s",this.circleBody.acceleration=-this.k/this.m*(this.circleBody.x-400),this.world.step(this.elapsedTime)}this.render.draw(this.world)},t.prototype.resetBody=function(){this.circleBody.x=400,this.circleBody.velocity=200,this.ranK.disabled=this.ranM.disabled=this.btnStart.disabled=!1,this.totalTime=0,this.render.draw(this.world),this.isPause=!0,this.flag=!1},t}();e.test=s,window.onload=function(){(new s).start()}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t){this.ctx=t}return t.prototype.draw=function(t){this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height),this.ctx.save();for(var e=0;e<t.bodies.length;e++){var i=t.bodies[e];this.drawSolidCircle(i.x,40,20)}this.ctx.restore()},t.prototype.drawSolidCircle=function(t,e,i){var n=this.ctx;if(n){var r=t,o=e;n.beginPath(),n.arc(r,o,i,0,2*Math.PI,!0),n.moveTo(r,o),n.lineTo(r+i,o),n.fillStyle="rgba(255,0,0,0.5)",n.fill(),n.strokeStyle="rgb(255,0,0)",n.stroke()}},t}();e.Render=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(){this.bodies=new Array}return t.prototype.addBody=function(t){this.bodies.push(t)},t.prototype.step=function(t){for(var e=0;e<this.bodies.length;e++)this.bodies[e].Integrate(t)},t}();e.World=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(){this.x=0,this.velocity=0,this.acceleration=0}return t.prototype.Integrate=function(t){this.velocity+=this.acceleration*t,this.x+=this.velocity*t},t}();e.Body=n}]);