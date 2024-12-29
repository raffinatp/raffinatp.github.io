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

