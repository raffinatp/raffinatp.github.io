var $builtinmodule = function(name)
{
    var mod = {};
	
    mod.Point = new Sk.builtin.func(function(x,y) {
		ggbApplet.evalCommand( "("+x.v+","+y.v+")" ); // var s = new Sk.builtin.str(x);
		var obj = ggbApplet.getObjectName( ggbApplet.getObjectNumber() - 1 );
		ggbApplet.setLabelVisible(obj,0);
        return new Sk.builtin.str( obj );
    });	
    mod.Point1 = new Sk.builtin.func(function(x,y) {
		ggbApplet.evalCommand( "("+x.v+","+y.v+")" ); // var s = new Sk.builtin.str(x);
		var obj = ggbApplet.getObjectName( ggbApplet.getObjectNumber() - 1 );
		ggbApplet.setLabelVisible(obj,0);
        return new Sk.builtin.str( obj );
    });
	// --------------------------------------------------
	// bloc ggb_2_arg
	// --------------------------------------------------
    mod.Segment = new Sk.builtin.func(function(obj1,obj2) {
		ggbApplet.evalCommand( "Segment("+obj1.v+","+obj2.v+")" );
        return new Sk.builtin.str( ggbApplet.getObjectName( ggbApplet.getObjectNumber() - 1 ) );
    });
    mod.Line = new Sk.builtin.func(function(obj1,obj2) {
		ggbApplet.evalCommand( "Line("+obj1.v+","+obj2.v+")" );
        return new Sk.builtin.str( ggbApplet.getObjectName( ggbApplet.getObjectNumber() - 1 ) );
    });
    mod.Circle = new Sk.builtin.func(function(obj1,obj2) {
		ggbApplet.evalCommand( "Circle("+obj1.v+","+obj2.v+")" );
        return new Sk.builtin.str( ggbApplet.getObjectName( ggbApplet.getObjectNumber() - 1 ) );
    });
    mod.Semicircle = new Sk.builtin.func(function(obj1,obj2) {
		ggbApplet.evalCommand( "Semicircle("+obj1.v+","+obj2.v+")" );
        return new Sk.builtin.str( ggbApplet.getObjectName( ggbApplet.getObjectNumber() - 1 ) );
    });
    mod.Midpoint = new Sk.builtin.func(function(obj1,obj2) {
		ggbApplet.evalCommand( "Midpoint("+obj1.v+","+obj2.v+")" );
		var obj = ggbApplet.getObjectName( ggbApplet.getObjectNumber() - 1 );
		ggbApplet.setLabelVisible(obj,0);
        return new Sk.builtin.str( obj );
    });
    mod.Reflect = new Sk.builtin.func(function(obj1,obj2) {
		ggbApplet.evalCommand( "Reflect("+obj1.v+","+obj2.v+")" );
		var obj = ggbApplet.getObjectName( ggbApplet.getObjectNumber() - 1 );
		ggbApplet.setLabelVisible(obj,0);
        return new Sk.builtin.str( obj );
    });
    mod.PerpendicularLine = new Sk.builtin.func(function(obj1,obj2) {
		ggbApplet.evalCommand( "PerpendicularLine("+obj1.v+","+obj2.v+")" );
        return new Sk.builtin.str( ggbApplet.getObjectName( ggbApplet.getObjectNumber() - 1 ) );
    });
    mod.Translate = new Sk.builtin.func(function(obj1,obj2) {
		ggbApplet.evalCommand( "Translate("+obj1.v+","+obj2.v+")" );
        return new Sk.builtin.str( ggbApplet.getObjectName( ggbApplet.getObjectNumber() - 1 ) );
    });
    mod.Vector = new Sk.builtin.func(function(obj1,obj2) {
		ggbApplet.evalCommand( "Vector("+obj1.v+","+obj2.v+")" );
        return new Sk.builtin.str( ggbApplet.getObjectName( ggbApplet.getObjectNumber() - 1 ) );
    });
	// --------------------------------------------------
	// bloc ggb_3_arg
	// --------------------------------------------------
    mod.CircleArc = new Sk.builtin.func(function(obj1,obj2,obj3) {
		ggbApplet.evalCommand( "CircleArc("+obj1.v+","+obj2.v+","+obj3.v+")" );
        return new Sk.builtin.str( ggbApplet.getObjectName( ggbApplet.getObjectNumber() - 1 ) );
    });
    mod.Polygon = new Sk.builtin.func(function(obj1) { confirm(obj1.v);
		ggbApplet.evalCommand( "Polygon("+obj1.v+")" );
        return new Sk.builtin.str( ggbApplet.getObjectName( ggbApplet.getObjectNumber() - 1 ) );
    });
    mod.initFigure = new Sk.builtin.func(function() {
	fixerValeursAsurveiller(['n']);
	fixerPointsAsurveiller(['P','Q']);
	//initialiser();
    });
	// --------------------------------------------------
	// tortue
	// --------------------------------------------------
    mod.forward = new Sk.builtin.func(function(x) {
		avance(x.v);
    });
    mod.backward = new Sk.builtin.func(function(x) {
		recule(x.v);
    });
    mod.left = new Sk.builtin.func(function(x) {
		gauche(x.v);
    });
    mod.right = new Sk.builtin.func(function(x) {
        droite(x.v);
    });
    mod.setposition = new Sk.builtin.func(function(x,y) {
        sautePos(x.v,y.v);
    });
    mod.posX = new Sk.builtin.func(function(x) {
        return coordX(x.v);
    });
    mod.posY = new Sk.builtin.func(function(x) {
        return coordY(x.v);
    });
    mod.penup = new Sk.builtin.func(function() {
        leveCrayon();
    });
    mod.pendown = new Sk.builtin.func(function() {
        baisseCrayon();
    });
    mod.begin_fill = new Sk.builtin.func(function() {
        debutRemplir();
    });
    mod.end_fill = new Sk.builtin.func(function() {
        finRemplir();
    });
    mod.color = new Sk.builtin.func(function(coul) { 
		var r = hexToRgb(coul.v).r;
		var g = hexToRgb(coul.v).g;
		var b = hexToRgb(coul.v).b;
		couleurCrayon(r,g,b);
    });
    mod.fillcolor = new Sk.builtin.func(function(coul) { 
		var r = hexToRgb(coul.v).r;
		var g = hexToRgb(coul.v).g;
		var b = hexToRgb(coul.v).b;
		couleurRemplissage(r,g,b,0.2);
    });
	// --------------------------------------------------
	// tableur
	// --------------------------------------------------
    mod.setCell = new Sk.builtin.func(function(x,y,valeur) {		
		if (isNaN(x.v)) {
			commandeG('@1=@2',x.v+y.v,valeur.v);
			//fixeValeur(x.v+y.v,valeur.v);
		}
		else {
			col = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".substring(x.v-1,x.v); 
			commandeG('@1=@2',""+col+y.v+"",valeur.v);
			//ggbApplet.setValue(""+col+y.v+"",valeur.v);
		}
    });	
    mod.getCell = new Sk.builtin.func(function(x,y) {	
		if (isNaN(x.v)) {
			return valeur(x.v+y.v);
		}
		else {
			col = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".substring(x.v-1,x.v);
			return valeur("" + col+y.v + "");
			//return valeur(col+y.v.v);
		}
    });	
    mod.valeur = new Sk.builtin.func(function(x) {
		return valeur(x.v);
    });	
	
    return mod;
}


/*

from scratchggb import *
for k in range(1,11) :
	setCell("A",k,2*k)
setCell("B",2,10)

from scratchggb import *
n = 6
setCell("A",1,1)
for lig in range(2,n+1) :
	setCell(1,lig,1)
	for col in range(2,lig) :
		val = getCell(col-1,lig-1) + getCell(col,lig-1)
		print lig,col,":",val
		setCell(col,lig,float(val))
	setCell(lig,lig,1)

from scratchggb import *
fillcolor('#00ff00')
color('#00ff00')
forward(3)
fillcolor('#ff0000')
color('#ff0000')
begin_fill()
for count in range(4):
	forward(1)
	right(90)
end_fill()

couleurRemplissage(0,255,0,0.2);
couleurCrayon(0,255,0);
avance(3);
couleurRemplissage(255,0,0,0.2);
couleurCrayon(255,0,0);
debutRemplir();
for (var count = 0; count < 4; count++) {
	avance(1);
	droite(90);
}
finRemplir();

from scratchggb import *
forward(3)
for count in range(4):
	forward(1)
	right(90)

from scratchggb import *
P1 = Point(0,0)
for k in range(4) :
	Circle(P1,k)

from scratchggb import *
for k in range(4) :
	P = Point(k,0)
	Circle(P,0.5)


from scratchggb import *
P1 = Point(2,3)
P2 = Point(1,2)
print P2
Segment(P1,P2)
x = "A"
Circle(P1,3)
Circle(x,2)
Circle(P1,1)
Circle("A",4)

print fact(10)
x = Stack()
x.push(1)
x.push(2)
print pop()
print 'done'
*/