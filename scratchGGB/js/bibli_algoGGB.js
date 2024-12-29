//function ggbOnInit() {tracerFigure();};

var nbInitialObjets=2, valeursAsurveiller=[], pointsAsurveiller=[];
var tortueX, tortueY, tortueAngle, tortueTrace, tailleCrayon;
var coulR, coulV, coulB, remplR, remplV, remplB, remplA;
var nbObj, nbTotalObjets, remplissage, sommetsX, sommetsY;

var av = avance, dr = droite, lc = leveCrayon, bc = baisseCrayon, re = recule, ga = gauche;
var sin=Math.sin, cos=Math.cos, tan=Math.tan, abs=Math.abs, racine=Math.sqrt;
var asin=Math.asin, acos=Math.acos, atan=Math.atan;

// ******************************** Tortue ***********************************

function dessinerTortue(isVisible) {
	ggbApplet.deleteObject("Tortue1");
	ggbApplet.deleteObject("Tortue2");
	ggbApplet.deleteObject("Tortue");
	var d = 0.4;
	commandeG('@1=(@2,@3)','Tortue2',tronquer(posX()+d*cosD(cap())),tronquer(posY()+d*sinD(cap())));
	commandeG('@1=(@2,@3)','Tortue1',tronquer(posX()-d*cosD(cap())),tronquer(posY()-d*sinD(cap())));
	commandeG('@1=Ellipse(@2,@3,@4)','Tortue','Tortue1','Tortue2',d*1.2);
	colorier('Tortue',255,174,0);
	ggbApplet.setFilling('Tortue', 0.4);
	ggbApplet.setVisible('Tortue1', false);
	ggbApplet.setVisible('Tortue2', isVisible);
	ggbApplet.setVisible('Tortue', isVisible);
	ggbApplet.setLabelVisible('Tortue1', false);
	ggbApplet.setLabelVisible('Tortue2', false);
	ggbApplet.setFixed('Tortue2', true);
}

function initialiser() {
  tortueX = 0;
  tortueY = 0;
  tortueAngle = 90;
  tortueTrace = true; tailleCrayon=10;
  coulR=0; coulV=0; coulB=0;
  remplissage=false; sommetsX=[]; sommetsY=[];
  remplR=255; remplV=255; remplB=255, remplA=0.5;
  nbObj=0;
  effacer();
  initSurveillance();
}

function avance(d) {
  var x=tortueX, y=tortueY;
  tortueX = tortueX +d*Math.cos(radians(tortueAngle));
  tortueY = tortueY +d*Math.sin(radians(tortueAngle));
  dessinerTortue(true);
  return segment(x,y,tortueX,tortueY);
}

function droite(a) {
  a = tortueAngle - a;
  var signe = 1; if (a<0) {signe=-1; a=-a;}
  a = (a - 360*Math.floor(a/360))*signe;
  tortueAngle = a;
  dessinerTortue(true);
}

function posX() {return tronquer(tortueX);}
function posY() {return tronquer(tortueY);}

function fixePos(x,y) {
  var a=tortueX, b=tortueY; tortueX=x; tortueY=y;
  var seg = segment(a, b, x, y);
  dessinerTortue(true);
  return(seg);
}

function sautePos(x,y) {
  tortueX=x; tortueY=y;
  dessinerTortue(true);
}

function fixeCap(a) {
  tortueAngle=a;
  dessinerTortue(true);
}

function cap() {return tortueAngle;}

function vers(x,y) {
   return degres(Math.atan2(y-tortueY, x-tortueX));
}

function baisseCrayon() {
  tortueTrace = true;
}

function leveCrayon() {
  tortueTrace = false;
}

function fixeTailleCrayon(taille) { 
	taille=Math.floor(taille); if (taille<1){taille=1}; if (taille>13){taille=13};
	tailleCrayon = taille;
}

function couleurCrayon(r,v,b) {coulR=r; coulV=v; coulB=b;}
function couleurRemplissage(r,v,b,a) {remplR=r; remplV=v; remplB=b; remplA=a;}
function changerCouleursB() {
	couleurCrayon(hasard(0,255),hasard(0,255),hasard(0,255)); 
	couleurRemplissage(hasard(0,255),hasard(0,255),hasard(0,255),Math.random());}

function debutRemplir() {remplissage=true; sommetsX=[]; sommetsY=[];}

function finRemplir() { 
	if (remplissage) {remplissage=false;} else {return;}
	var nbSommets = sommetsX.length;
	if(nbSommets < 3) {return;}
	if ((tronquer(sommetsX[0]-sommetsX[nbSommets-1])==0)
	      && (tronquer(sommetsY[0]-sommetsY[nbSommets-1])==0)) 
	{nbSommets=nbSommets-1;}
	var liste='';
	for (var k=0; k<nbSommets; k++) { 
		liste = liste +'('+tronquer(sommetsX[k])+','+tronquer(sommetsY[k])+'),';
	}; liste = liste.slice(0,-1);
	var nom=nouveau('poly');
	commandeG('@1=Polygon[@2]', nom, liste);
	remplir(nom, remplR, remplV, remplB, remplA);
	fixeTailleCrayonG(nom,tailleCrayon);
	cacheEtiquette(nom); fixeObjet(nom);
	traiterSegmentsPoly(nbSommets);
	sommetsX=[]; sommetsY=[];
	return nom;
}

function traiterSegmentsPoly(n) {  // pour polygones à n sommets, donc n segments
	var nom;
	var nbTotalObj=ggbApplet.getObjectNumber(); 
	// objets numérotés de 0 à nbTotalObj - 1
	for (var k=nbTotalObj-1; k>=nbTotalObj-n; k=k-1) {
		nom = ggbApplet.getObjectName(k);
		fixeObjet(nom); cacheEtiquette(nom);
		colorier(nom, coulR, coulV, coulB);
		//fixeTailleCrayonG(nom,tailleCrayon);
	}
}

function recule(d) {avance(-d);}
function gauche(a) {droite(-a);}

// ******************************** Analytique ***********************************

function segment(x1,y1,x2,y2) {
  	if (!tortueTrace) {return;}
  	if (remplissage) {
  		if (sommetsX.length == 0) {sommetsX.push(x1); sommetsY.push(y1);}
  		sommetsX.push(x2); sommetsY.push(y2); 
  		return;
  	}
	var nom=nouveau('seg');
	x1=tronquer(x1); x2=tronquer(x2); y1=tronquer(y1); y2=tronquer(y2);
	commandeG('@1=Segment[(@2,@3),(@4,@5)]',nom,x1,y1,x2,y2);
	cacheEtiquette(nom); colorier(nom, coulR, coulV, coulB);
	fixeTailleCrayonG(nom,tailleCrayon); fixeObjet(nom);
	return nom;
}

function cercle(x,y,r) { 
	var nom=nouveau('cerc');
	x=tronquer(x); y=tronquer(y); r=tronquer(r);
	commandeG('@1=Circle[(@2,@3),@4]',nom,x,y,r);
	cacheEtiquette(nom); colorier(nom, coulR, coulV, coulB);
	fixeTailleCrayonG(nom,tailleCrayon); fixeObjet(nom);
	return nom;
}

function disque(x,y,r) {
	var nom=nouveau('cerc');
	x=tronquer(x); y=tronquer(y); r=tronquer(r);
	commandeG('@1=Circle[(@2,@3),@4]',nom,x,y,r);
	cacheEtiquette(nom); remplir(nom, remplR, remplV, remplB, remplA);
	fixeTailleCrayonG(nom,tailleCrayon); fixeObjet(nom);
	return nom;
}

function arc(x,y,r,a1,a2) { 
	var nom=nouveau('arc');
	x=tronquer(x); y=tronquer(y); r=tronquer(r); 
	var a1x = tronquer(x+r*cosD(a1)), a1y = tronquer(x+r*sinD(a1));
	var a2x = tronquer(x+r*cosD(a2)), a2y = tronquer(x+r*sinD(a2));
	commandeG('@1=Arc[Circle[(@2,@3),@4],(@5,@6),(@7,@8)]',nom,x,y,r,a1x,a1y,a2x,a2y);
	cacheEtiquette(nom); colorier(nom, coulR, coulV, coulB);
	fixeTailleCrayonG(nom,tailleCrayon);  fixeObjet(nom);
	return nom;
}

function ellipse(x,y,a,b) {
	var nom=nouveau('cerc');
	var aa, d, F1x, F1y, F2x, F2y;
	if (a>b) {
		aa=tronquer(a); d=Math.sqrt(a*a-b*b);
		F1x = tronquer(x-d); F1y = tronquer(y);
		F2x = tronquer(x+d); F2y = tronquer(y);
	} else {
		aa=tronquer(b); d=Math.sqrt(b*b-a*a);
		F1x = tronquer(x); F1y = tronquer(y-d);
		F2x = tronquer(x); F2y = tronquer(y+d);
	} 
	commandeG('@1=Ellipse[(@2,@3),(@4,@5),@6]', nom, F1x, F1y, F2x, F2y, aa);
	cacheEtiquette(nom); colorier(nom, coulR, coulV, coulB);
	fixeTailleCrayonG(nom,tailleCrayon); fixeObjet(nom);
	return nom;
}

function ellipseRemplie(x,y,a,b) {
	var nom=nouveau('cerc');
	var aa, d, F1x, F1y, F2x, F2y;
	if (a>b) {
		aa=tronquer(a); d=Math.sqrt(a*a-b*b);
		F1x = tronquer(x-d); F1y = tronquer(y);
		F2x = tronquer(x+d); F2y = tronquer(y);
	} else {
		aa=tronquer(b); d=Math.sqrt(b*b-a*a);
		F1x = tronquer(x); F1y = tronquer(y-d);
		F2x = tronquer(x); F2y = tronquer(y+d);
	} 
	commandeG('@1=Ellipse[(@2,@3),(@4,@5),@6]', nom, F1x, F1y, F2x, F2y, aa);
	cacheEtiquette(nom); remplir(nom, remplR, remplV, remplB, remplA);
	fixeTailleCrayonG(nom,tailleCrayon); fixeObjet(nom);
	return nom;
}

function ecris(x,y,texte) {
	var nom=nouveau('texte');
	x=tronquer(x); y=tronquer(y);
	for (var k=3; k<arguments.length; k++) {texte = texte + '\\n' + arguments[k];}
	commandeG('@1=Text["@2",(@3,@4)]',nom,texte,x,y);
}

function ecrisB(x,y,texte) { // Appelée via Blockly-algoGGB
	commandeG('@1=Text["@2",(@3,@4)]',nouveau('texte'),texte,tronquer(x),tronquer(y));
}

// ******************************** GeoGebra ***********************************

function initialiserParam(a,b,c) {
  nbInitialObjets=a; valeursAsurveiller=b; pointsAsurveiller=c;
}
function fixerNbInitialObjets(valeur) {nbInitialObjets=valeur;}
function fixerValeursAsurveiller(valeur) {valeursAsurveiller=valeur;}
function fixerPointsAsurveiller(valeur) {pointsAsurveiller=valeur;}

function commandeG(modele,param1,param2) {
  var cmd = modele;
  if (modele.startsWith("@1=")) {
		var existe = false;
		var nom = arguments[1];
		for (var k=0; k<ggbApplet.getObjectNumber(); k=k+1) {
			if (ggbApplet.getObjectName(k)==nom) {existe=true; break;};
		}
		if (existe) {
			cmd = modele.substring(3);
		}
  }
  for (var k=arguments.length - 1; k>0; k--) {
    cmd = cmd.replace(new RegExp('@'+k,'g'),arguments[k]);
  }
  ggbApplet.evalCommand(cmd);
}

function commande(modele,liste){ // Appelée via Blockly-algoGGB
  var cmd = modele;
  for (var k=liste.length - 1; k>=0; k--) {
    cmd = cmd.replace(new RegExp('@'+(k+1),'g'),liste[k]);
  }
  ggbApplet.evalCommand(cmd);
}


function pointGGB(nom,x,y) {commandeG('@1=(@2,@3)', nom, tronquer(x), tronquer(y));}
function segmentGGB(nom,nom1,nom2) {commandeG('@1=Segment[@2,@3]', nom, nom1, nom2);}
function cercleGGB(nom,nom1,rayon) {
	commandeG('@1=Circle[@2,@3]', nom, nom1, tronquer(rayon));}

function valeur(nom) {return ggbApplet.getValue(nom);}
function coordX(nom) {return tronquer(ggbApplet.getXcoord(nom));}
function coordY(nom) {return tronquer(ggbApplet.getYcoord(nom));}
function fixeValeur(nom,valeur) {ggbApplet.setValue(nom,valeur);}
function fixeCoords(nom,x,y) {ggbApplet.setCoords(nom,valeur);}

function cacheObjet(nom) {ggbApplet.setVisible(nom, false);}
function cacheEtiquette(nom) {ggbApplet.setLabelVisible(nom, false);}
function fixeObjet(nom) {ggbApplet.setFixed(nom, true);}
function montreObjet(nom) {ggbApplet.setVisible(nom, true);}
function montreEtiquette(nom) {ggbApplet.setLabelVisible(nom, true);}
function libereObjet(nom) {ggbApplet.setFixed(nom, false);}
function colorier(nom,R,V,B) {ggbApplet.setColor(nom, R, V, B);}
function remplir(nom,R,V,B,A) {
			ggbApplet.setColor(nom, R, V, B); ggbApplet.setFilling(nom,A);}
function fixeEpaisseur(nom,taille) { 
	taille=Math.floor(taille); if (taille<1){taille=1}; if (taille>13){taille=13};
	ggbApplet.setLineThickness(nom, taille);
}
var fixeTailleCrayonG = fixeEpaisseur; // Pour compatibilité avec version précédente

function obtenirNomsDerniersObjets(nb) {
	var liste = [], nbLimite = ggbApplet.getObjectNumber() ; 
			// objets numérotés de 0 à nbLimite (exclus)
	for (var k = 0; k<nb; k++) {
		liste[k] = ggbApplet.getObjectName(nbLimite - nb + k);
	}
	return liste;
}

// ******************************** Gestion ***********************************

function nouveau(base) {nbObj=nbObj+1; return (base+nbObj);}
function nom(base,n) {return (base+n);}
function fixeNbInitialObj(n) {nbInitialObjets=n;}
function systemeCoordonnees(a,b,c,d) {ggbApplet.setCoordSystem(a,b,c,d);}

function effacer() {
	var nbTotalObj=ggbApplet.getObjectNumber(); 
	for (var k=nbTotalObj; k>=nbInitialObjets; k=k-1) { 
		ggbApplet.deleteObject(ggbApplet.getObjectName(k));
	}
}

function nomExiste(nom) {
	var nbTotalObj=ggbApplet.getObjectNumber();
	for (var k=nbTotalObj; k>=nbInitialObjets; k=k-1) {
		if (ggbApplet.getObjectName(k)==nom) {return true;};
	}
	return false;
}

// ******************************** Utilitaires ***********************************

function degres(a) {return (a*180/(Math.PI));}
function radians(a) {return (a*(Math.PI)/180);}
function sinD(a) {return sin(radians(a));}
function cosD(a) {return cos(radians(a));}
function tanD(a) {return tan(radians(a));}
function hasard(a,b) { return Math.floor(Math.random()*(b-a+1)+a);}
function tronquer(a) {if(Math.abs(a)<0.000000001) {a=0;}; return a;}
// Car GeoGebra n'accepte pas l'écriture "2.23 e -12" : il multiplie par e ???

function alerte(texte) { // utile pour debug
	for (var k=1; k<arguments.length; k++) {texte = texte + '\n' + arguments[k];}
	alert(texte);
}

function alerteB(texte) { alert(texte); } // Appelée via Blockly-algoGGB

function demande(texte, reponse) { // utile pour debug
	for (var k=1; k<arguments.length - 1; k++) {texte = texte + '\n' + arguments[k];}
	reponse = prompt(texte, reponse); if (reponse == null) {reponse = '';}
	return reponse;
}

function demandeB(texte, reponse) { // Appelée via Blockly-algoGGBAnciens 
	reponse = prompt(texte, reponse); if (reponse == null) {reponse = '';}
	return reponse;
}

function valeurModifiee () {
  		var nom, val;
  		for (var k=0; k<valeursAsurveiller.length; k=k+1) {
  			nom = valeursAsurveiller[k]; val=valeur(nom);
  				if (val == surveillerVal[k])
  					{} else 
  					{surveillerVal[k] = val; return true;}
  		}
		return false;
}

function pointModifie () {
  		var nom, valX, valY;
  		for (var k=0; k<pointsAsurveiller.length; k=k+1) {
  			nom = pointsAsurveiller[k]; valX=coordX(nom); valY=coordY(nom);
  				if ((valX == surveillerX[k])&&(valY == surveillerY[k]))
  					{} else 
  					{surveillerX[k] = valX; surveillerY[k] = valY; return true;}
  		}
		return false;
}

function retracerFigure() {
	/*
	Println("retracerFigure : " + valeur('n'));
	tracerFigure();
	Println("fin retracerFigure");
	*/
	if(valeurModifiee() || pointModifie()) {
		tracerFigure();
	}
}

var surveillerVal=[], surveillerX=[], surveillerY=[];

function initSurveillance() {
	if ((surveillerVal.length == valeursAsurveiller.length) && (surveillerX.length == pointsAsurveiller.length)) {return;}
	surveillerVal = []; for (var k=0; k<valeursAsurveiller.length; k++) {surveillerVal.push(-999);}
	surveillerX=[]; surveillerY=[];  for (var k=0; k<pointsAsurveiller.length; k++) {surveillerX.push(-999); surveillerY.push(-999);}
}

var nbInitialObjets = 1000000; // Nombre d'objets au départ, à ne pas effacer
var valeursAsurveiller = [];  // Liste  des noms des valeurs à surveiller
var pointsAsurveiller = []; // Liste  des noms des points à surveiller

function transfertListeEntreCadres(liste, cadreDepart, cadreArrivee) { // nom cadre vide --> Page web globale
	if (cadreDepart == "pageWeb") {cadreDepart="";} // pour compatibilité avec version précédente
	if (cadreArrivee == "pageWeb") {cadreArrivee="";} // pour compatibilité avec version précédente
	if (cadreDepart == "") {document.getElementById(cadreArrivee).contentWindow.recevoir_envoi_vers_cadre(liste);}
	else if (cadreArrivee == "") {parent.recevoir_envoi_vers_cadre(liste);} 
	else {parent.document.getElementById(cadreArrivee).contentWindow.recevoir_envoi_vers_cadre(liste);}
}
