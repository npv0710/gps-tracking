google.maps.__gjsload__('overlay', function(_){var ls=function(a){this.g=a},Mka=function(){},ms=function(a){a.$m=a.$m||new Mka;return a.$m},Nka=function(a){this.Ga=new _.Rh(function(){var b=a.$m;if(a.getPanes()){if(a.getProjection()){if(!b.dm&&a.onAdd)a.onAdd();b.dm=!0;a.draw()}}else{if(b.dm)if(a.onRemove)a.onRemove();else a.remove();b.dm=!1}},0)},Oka=function(a,b){function c(){return _.Vh(e.Ga)}var d=ms(a),e=d.jl;e||(e=d.jl=new Nka(a));_.Xa(d.pa||[],_.L.removeListener);var f=d.Qa=d.Qa||new _.Mq,g=b.__gm;f.bindTo("zoom",g);f.bindTo("offset",g);
f.bindTo("center",g,"projectionCenterQ");f.bindTo("projection",b);f.bindTo("projectionTopLeft",g);f=d.tq=d.tq||new ls(f);f.bindTo("zoom",g);f.bindTo("offset",g);f.bindTo("projection",b);f.bindTo("projectionTopLeft",g);a.bindTo("projection",f,"outProjection");a.bindTo("panes",g);d.pa=[_.L.addListener(a,"panes_changed",c),_.L.addListener(g,"zoom_changed",c),_.L.addListener(g,"offset_changed",c),_.L.addListener(b,"projection_changed",c),_.L.addListener(g,"projectioncenterq_changed",c)];c();b instanceof
_.Ef&&(_.O(b,"Ox"),_.al("Ox","-p",a))},Ska=function(a){if(a){var b=a.getMap();if(Pka(a)!==b&&b&&b instanceof _.Ef){var c=b.__gm;c.overlayLayer?a.__gmop=new Qka(b,a,c.overlayLayer):c.h.then(function(d){d=d.bc;var e=new ns(b,d);d.Za(e);c.overlayLayer=e;Rka(a);Ska(a)})}}},Rka=function(a){if(a){var b=a.__gmop;b&&(a.__gmop=null,_.bl("Ox","-p",b.g),b.g.unbindAll(),b.g.set("panes",null),b.g.set("projection",null),b.i.yf(b),b.h&&(b.h=!1,b.g.onRemove?b.g.onRemove():b.g.remove()))}},Pka=function(a){return(a=
a.__gmop)?a.map:null},Qka=function(a,b,c){this.map=a;this.g=b;this.i=c;this.h=!1;_.O(this.map,"Ox");_.al("Ox","-p",this.g);c.Le(this)},Tka=function(a,b){a.g.get("projection")!=b&&(a.g.bindTo("panes",a.map.__gm),a.g.set("projection",b))},ns=function(a,b){this.j=a;this.i=b;this.g=null;this.h=[]};_.D(ls,_.M);
ls.prototype.changed=function(a){"outProjection"!=a&&(a=!!(this.get("offset")&&this.get("projectionTopLeft")&&this.get("projection")&&_.Ie(this.get("zoom"))),a==!this.get("outProjection")&&this.set("outProjection",a?this.g:null))};var os={};_.D(Nka,_.M);os.Le=function(a){if(a){var b=a.getMap();(ms(a).$p||null)!==b&&(b&&Oka(a,b),ms(a).$p=b)}};os.yf=function(a){var b=ms(a),c=b.Qa;c&&c.unbindAll();(c=b.tq)&&c.unbindAll();a.unbindAll();a.set("panes",null);a.set("projection",null);b.pa&&_.Xa(b.pa,_.L.removeListener);b.pa=null;b.jl&&(b.jl.Ga.ud(),b.jl=null);_.bl("Ox","-p",a);delete ms(a).$p};var ps={};Qka.prototype.draw=function(){this.h||(this.h=!0,this.g.onAdd&&this.g.onAdd());this.g.draw&&this.g.draw()};ns.prototype.dispose=function(){};ns.prototype.Bc=function(a,b,c,d,e,f,g,h){var k=this.g=this.g||new _.Qm(this.j,this.i,function(){});k.Bc(a,b,c,d,e,f,g,h);a=_.A(this.h);for(b=a.next();!b.done;b=a.next())b=b.value,Tka(b,k),b.draw()};ns.prototype.Le=function(a){this.h.push(a);this.g&&Tka(a,this.g);this.i.refresh()};ns.prototype.yf=function(a){_.cb(this.h,a)};ps.Le=Ska;ps.yf=Rka;_.rf("overlay",{po:function(a){if(a){(0,os.yf)(a);(0,ps.yf)(a);var b=a.getMap();b&&(b instanceof _.Ef?(0,ps.Le)(a):(0,os.Le)(a))}},preventMapHitsFrom:function(a){_.vn(a,{onClick:function(b){return _.$m(b.event)},Vc:function(b){return _.Xm(b)},Vg:function(b){return _.Ym(b)},Id:function(b){return _.Ym(b)},gd:function(b){return _.Zm(b)}}).Nh(!0)},preventMapHitsAndGesturesFrom:function(a){a.addEventListener("click",_.vf);a.addEventListener("contextmenu",_.vf);a.addEventListener("dblclick",_.vf);a.addEventListener("mousedown",
_.vf);a.addEventListener("mousemove",_.vf);a.addEventListener("MSPointerDown",_.vf);a.addEventListener("pointerdown",_.vf);a.addEventListener("touchstart",_.vf);a.addEventListener("wheel",_.vf)}});});
