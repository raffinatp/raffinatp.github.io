// -----------------------------------------------
// Menu Variable : Augmenter/Diminuer
// ------------------------------------------------

Blockly.Blocks['sophus_change'] = {
  init: function() {
    var thisBlock;
    this.jsonInit({
      'message0': '%1 %3 la variable %2',
      'args0': [
        {
          "type": "field_dropdown",
          "name": "OP",
          "options":
            [['augmenter de', '+'],
             ['diminuer de', '-'],
             ['multiplier par', '*'],
             ['diviser par', '/']]
             //['élever à la puissance', '**'],
			 //["augmenter d'un pourcentage de", '+pct'],
             //["diminuer d'un pourcentage de", '-pct']]
        }, {
          'type': 'field_variable',
          'name': 'VARIABLE',
          'variable': Blockly.Msg.SOPHUS_AUGMENTER_TITLE_ITEM
        }, {
          'type': 'input_value',
          'name': 'VALUE'
          //'check': 'Number'
        }
      ],
      'previousStatement': null,
      'nextStatement': null,
      'colour': "#FF8C1A"
    });
    thisBlock = this;
	//this.setInputsInline(true);
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        '+': Blockly.Msg.SOPHUS_AUGMENTER_TOOLTIP,
        '-': Blockly.Msg.SOPHUS_DIMINUER_TOOLTIP,
        '*': Blockly.Msg.SOPHUS_MULTIPLIER_TOOLTIP,
        '/': Blockly.Msg.SOPHUS_DIVISER_TOOLTIP
        //'**': Blockly.Msg.SOPHUS_PUISSANCE_TOOLTIP,
        //'+pct': Blockly.Msg.SOPHUS_AUGMENTER_PCT_TOOLTIP,
        //'-pct%': Blockly.Msg.SOPHUS_DIMINUER_PCT_TOOLTIP,
        //'inverser': Blockly.Msg.SOPHUS_PUISSANCE_TOOLTIP,
      };
      return TOOLTIPS[mode].replace('%2', thisBlock.getFieldValue('VARIABLE'));
    });
  }
};
Blockly.Blocks['data_changevariableby']=Blockly.Blocks['sophus_change'];

// -----------------------------------------------
// Menu Controles : boucle Pour
// ------------------------------------------------

Blockly.Blocks['controls_for'] = {
  init: function() {
    this.jsonInit({
      "message0": "pour %1 de %2 à %3 par %4",
      "args0": [
        {
          "type": "field_variable",
          "name": "VARIABLE",
          "variable": null
        },
        {
          "type": "input_value",
          "name": "FROM"
        },
        {
          "type": "input_value",
          "name": "TO"
        },
        {
          "type": "input_value",
          "name": "BY"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#FFAB19",
      "helpUrl": Blockly.Msg.CONTROLS_FOR_HELPURL
    });
    this.appendStatementInput('DO').appendField(Blockly.Msg.CONTROLS_FOR_INPUT_DO);
  }
};

// -----------------------------------------------
// Menu Entrées-Sorties
// ------------------------------------------------

Blockly.Blocks['sofuspy_entree'] = {
  init: function() {
    this.jsonInit({
      "message0": 'entrée %1 : %2 avec %3',
      "args0": [
        {
          "type": "field_variable",
          "name": "VAR",
          'variable': "variable"
        },
        {
          "type": "field_dropdown",
          "name": "OP",
          "options":
            [['tester', 'in'],
             ["demander un nombre", 'float'],
             ["demander un nombre entier", 'int'],
             ["demander un texte", 'str']]
        },
        {
          "type": "field_input",
          "name": "code",
          "text": ""
        }
      ],
      'previousStatement': null,
      'nextStatement': null,
	   'extensions': ["colours_sensing"]
      //"colour": "#4CBFE6" //"#FF6680"
    });
	this.setInputsInline(true);
  }
};

Blockly.Blocks['sofuspy_sortie'] = {
  init: function() {
    this.jsonInit({
      "message0": 'sortie : %1 %2',
      "args0": [
        {
          "type": "field_dropdown",
          "name": "OP",
          "options":
            [['renvoyer', 'return'],
             ["afficher", 'print']]
        },
        {
          "type": "field_input",
          "name": "code",
          "text": ""
        }
      ],
      'previousStatement': null,
      'nextStatement': null,
      "colour": "#9966FF" //"#FF6680" 
    });
	this.setInputsInline(true);
  }
};

// -----------------------------------------------
// Menu Tortues
// ------------------------------------------------

Blockly.Blocks['avancer_reculer'] = {
  init: function() {
    var thisBlock = this;
    var OP =
            [['avancer de', 'forward'],
             ['reculer de', 'backward']];
    //this.appendValueInput('NAME').setCheck('Number').appendField(new Blockly.FieldImage('./js/scratch/img/turtle.png', 32, 32, '')).appendField(new Blockly.FieldDropdown(OP),'OP');
    this.appendValueInput('NAME').appendField(new Blockly.FieldImage('./js/scratch/img/turtle.png', 32, 32, '')).appendField(new Blockly.FieldDropdown(OP),'OP');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setInputsInline(true);
    this.setColour("#4C97FF");
  }
};

Blockly.Blocks['var_gauche_droite'] = {
  init: function() {
    var thisBlock = this;
    var OP =
            [['tourner à gauche de', 'left'],
             ['tourner à droite de', 'right']];
    //this.appendValueInput('NAME').setCheck('Number').appendField(new Blockly.FieldImage('./js/scratch/img/turtle.png', 32, 32, '')).appendField(new Blockly.FieldDropdown(OP),'OP');
    this.appendValueInput('NAME').appendField(new Blockly.FieldImage('./js/scratch/img/turtle.png', 32, 32, '')).appendField(new Blockly.FieldDropdown(OP),'OP');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setInputsInline(true);
    this.setColour("#4C97FF");
  }
};

Blockly.Blocks['mettre_angle'] = {
  init: function() {
    this.appendValueInput('ANGLE').setCheck('Number').appendField(new Blockly.FieldImage('./js/scratch/img/turtle.png', 32, 32, '')).appendField('orienter la tortue de');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#4C97FF");
  }
};

Blockly.Blocks['tortue_teleport'] = {
  init: function() {
	this.appendDummyInput().appendField(new Blockly.FieldImage('./js/scratch/img/turtle.png', 32, 32, ''));
    this.appendValueInput('ABS').appendField('téléporter en (');
    this.appendValueInput('ORD').appendField(',');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#4C97FF");
  }
};

Blockly.Blocks['tortue_viser'] = {
  init: function() {
	this.appendDummyInput().appendField(new Blockly.FieldImage('./js/scratch/img/turtle.png', 32, 32, ''));
    this.appendValueInput('ABS').appendField('viser (');
    this.appendValueInput('ORD').appendField(',');
    this.appendDummyInput().appendField(')');
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#4C97FF");
  }
};

Blockly.Blocks['tortue_pos'] = {
  init: function() {
    var thisBlock = this;
    var OP =
            [['abscisse', 'posX'],
             ['ordonnée', 'posY']];
    this.appendDummyInput().appendField(new Blockly.FieldImage('./js/scratch/img/turtle.png', 32, 32, '')).appendField(new Blockly.FieldDropdown(OP),'OP');
	this.setOutput(true);
	this.setInputsInline(true);
    this.setColour("#4C97FF");
  }
};

Blockly.Blocks['couleur_remplissage'] = {
    init: function() {
        this.jsonInit({
            message0: 'mettre couleur à %1',
            args0: [{
                type: "input_value", name: "COLOR"
            }],
            extensions: ["colours_sensing"],
			previousStatement: null,
			nextStatement: null,
			colour: "#4C97FF"
        })
    }
};

Blockly.Blocks['couleur_remplissage'] = {
    init: function() {
        this.jsonInit({
            extensions: ["colours_sensing"]
        });
		this.appendDummyInput().appendField(new Blockly.FieldImage('./js/scratch/img/pencil.png', 32, 32, ''));
		this.appendValueInput('COLOR').appendField('mettre couleur à');
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour("#4C97FF");		
    }
};


Blockly.Blocks['couleur_stylo1'] = {
    init: function() {
        var me = this;
        this.getVal = function(_c) {
            var inp = me.getInputTargetBlock(_c).getFieldValue('NUM');
            return (inp === null) ? 0 : parseInt(inp);
        };
        this.fixColorMenu = function() {
            var r = me.getInputTargetBlock('R').getFieldValue('NUM');
            var g = me.getInputTargetBlock('G').getFieldValue('NUM');
            var b = me.getInputTargetBlock('B').getFieldValue('NUM');
console.log(r);
console.log(g);
console.log(b);
            r = parseInt(r);
            g = parseInt(g);
            b = parseInt(b);
console.log(r);
console.log(g);
console.log(b);
            var c = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);			
			c = "#20ff30";console.log(c);
            me.getField("RGB_col").colour_ = c;
            if (me.getField("RGB_col").borderRect_) {
                me.getField("RGB_col").borderRect_.style.fill = c;
            }
        };
        this.appendDummyInput().appendField("mettre la couleur à ");
        this.appendDummyInput("rgb")
            //.appendField(new Blockly.FieldColour("10", function(option) {
            .appendField(new Blockly.FieldColour("#20ff30", function(option) {
                var bigint = parseInt(option.replace(/^#/, ""), 16);
                var r = (bigint >> 16) & 255; r = 20;
                var g = (bigint >> 8) & 255; g=200;
                var b = bigint & 255; b=30;
                me.getInputTargetBlock('R').setFieldValue(r, 'NUM');
                me.getInputTargetBlock('G').setFieldValue(g, 'NUM');
                me.getInputTargetBlock('B').setFieldValue(b, 'NUM');
            }), "RGB_col");
        this.appendDummyInput().appendField("  (");
        this.appendValueInput("R").setCheck("Number");
        this.appendValueInput("G").setCheck("Number");
        this.appendValueInput("B").setCheck("Number");
        this.appendDummyInput().appendField(")");
        this.setNextStatement(true);
        this.setPreviousStatement(true);
		this.setInputsInline(true);
        this.setColour("#4C97FF");
		//this.setExtensions(["colours_sensing", "output_boolean"]);
    },
    onchange: function(event) {
        this.fixColorMenu()
    }
};

Blockly.Blocks['tampon'] = {
  init: function() {
    this.appendDummyInput().appendField(new Blockly.FieldImage('./js/scratch/img/pencil.png', 32, 32, '')).appendField('marquer un point');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#4C97FF");
  }
};

Blockly.Blocks['cacher_montrer_tortue'] = {
  init: function() {
    var thisBlock = this;
    var OP =
            [['cacher la tortue', 'hideturtle'],
             ['montrer la tortue', 'showturtle']];
    this.appendDummyInput().appendField(new Blockly.FieldImage('./js/scratch/img/ghost.png', 32, 32, '')).appendField(new Blockly.FieldDropdown(OP),'OP');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setInputsInline(false);
    this.setColour("#4C97FF");
  }
};

Blockly.Blocks['baisser_lever_stylo'] = {
  init: function() {
    var thisBlock = this;
    var OP =
            [['baisser le stylo', 'pendown'],
             ['lever le stylo', 'penup']];
    this.appendDummyInput().appendField(new Blockly.FieldImage('./js/scratch/img/pencil.png', 32, 32, '')).appendField(new Blockly.FieldDropdown(OP),'OP');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setInputsInline(false);
    this.setColour("#4C97FF");
  }
};

Blockly.Blocks['debut_fin_remplissage'] = {
  init: function() {
    var thisBlock = this;
    var OP =
            [['début du remplissage', 'debut'],
             ['fin du remplissage', 'fin']];
    this.appendDummyInput().appendField(new Blockly.FieldImage('./js/scratch/img/pencil.png', 32, 32, '')).appendField(new Blockly.FieldDropdown(OP),'OP');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setInputsInline(false);
    this.setColour("#4C97FF");
  }
};

Blockly.Blocks['scribe'] = {
  init: function() {
    this.appendValueInput('texte').appendField(new Blockly.FieldImage('./js/scratch/img/pencil.png', 32, 32, '')).appendField('tamponner');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#4C97FF");
  }
};

Blockly.Blocks['reset'] = {
  init: function() {
    this.appendDummyInput().appendField(new Blockly.FieldImage('./js/scratch/img/droplet.png', 32, 32, '')).appendField('initialiser le graphisme tortue');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#4C97FF");
  }
};

// -----------------------------------------------
// Menu Géométrie
// ------------------------------------------------

Blockly.Blocks['ggb_point'] = {
  init: function() {
    this.jsonInit({
      "message0": '%1 :  Point %2 %3',
      "args0": [
        {
          "type": "input_value", "name": "NOM"
        },{
          "type": "input_value","name": "X"
        },{
          "type": "input_value", "name": "Y"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 60
    });
	this.setInputsInline(true);
  }
};

Blockly.Blocks['ggb_couleur_remplissage'] = {
    init: function() {
        this.jsonInit({
            "message0": 'mettre couleur de %1 à %2',
            "args0": [{
			  "type": "input_value", "name": "OBJ1"
			},{
                type: "input_value", "name": "COLOR"
            }],
            "extensions": ["colours_sensing"],
			"previousStatement": null,
			"nextStatement": null
        });
		this.setInputsInline(true);
		this.setColour(60);
    }
};

Blockly.Blocks['ggb_point_fonct'] = {
  init: function() {
    this.jsonInit({
      "message0": 'Point %1 X %2 Y %3',
      "args0": [
        {
          "type": "input_value", "name": "NOM"
        },{
          "type": "input_value", "name": "X"
        }, {
          "type": "input_value", "name": "Y"
        }
      ],
      "colour": 60
    });
	this.setInputsInline(true);
	this.setOutput(true);
  }
};

Blockly.Blocks['ggb_valeur_de'] = {
  init: function() {
    this.jsonInit({
      "message0": 'valeur de %1',
      "args0": [
        {
          "type": "input_value", "name": "NAME"
        }
      ],
      "extensions": ["output_number"],
      "colour": 60
    });
	this.setInputsInline(true);
	this.setOutput(true);
  }
};

Blockly.Blocks['ggb_coordX'] = {
  init: function() {
    this.jsonInit({
      "message0": 'abscisse de %1',
      "args0": [
        {
          "type": "input_value", "name": "NAME"
        }
      ],
      "colour": 60
    });
	this.setInputsInline(true);
	this.setOutput(true);
  }
};

Blockly.Blocks['ggb_coordY'] = {
  init: function() {
    this.jsonInit({
      "message0": 'ordonnée de %1',
      "args0": [
        {
          "type": "input_value", "name": "NAME"
        }
      ],
      "colour": 60
    });
	this.setInputsInline(true);
	this.setOutput(true);
  }
};

Blockly.Blocks['ggb_commande_2pts'] = {
  init: function() {
    this.jsonInit({
      "message0": '%2 : %1 %3 %4',
      "args0": [
        {
          "type": "field_dropdown",
          "name": "OP",
          "options":
            [['Segment', 'Segment'],//['Point', ''],
             ["Droite", 'Line'],
             ["Cercle", 'Circle'],
             ["DemiCercle", 'Semicircle'],
             ["Milieu", 'Midpoint'],
             ["Symétrique", 'Reflect'],
             ["Perpendiculaire", 'PerpendicularLine'],
             ["Parallèle", ' Line'],
             ["Translation", 'Translate'],
             ["Vecteur", 'Vector']
			]
        },{
          "type": "input_value", "name": "NOM"
        },{
          "type": "input_value", "name": "OBJ1"
        },{
          "type": "input_value", "name": "OBJ2"
        }
      ],
      'previousStatement': null,
      'nextStatement': null,
      "colour": 60
    });
	this.setInputsInline(true);
  }
};

Blockly.Blocks['ggb_commande_2pts_fonct'] = {
  init: function() {
    this.jsonInit({
      "message0": '%1 %2 %3',
      "args0": [
        {
          "type": "field_dropdown",
          "name": "OP",
          "options":
            [['Point', 'Point'],
			 ['Segment', 'Segment'],
             ["Droite", 'Line'],
             ["Cercle", 'Circle'],
             ["DemiCercle", 'Semicircle'],
             ["Milieu", 'Midpoint'],
             ["Symétrique", 'Reflect'],
             ["Perpendiculaire", 'PerpendicularLine'],
             ["Parallèle", ' Line'],
             ["Translation", 'Translate'],
             ["Vecteur", 'Vector']
			]
        },{
          "type": "input_value", "name": "OBJ1"
        },{
          "type": "input_value", "name": "OBJ2"
        }
      ],
      "colour": 60
    });
	this.setInputsInline(true);
	this.setOutput(true);
  }
};

Blockly.Blocks['ggb_3_arg'] = {
  init: function() {
    this.jsonInit({
      "message0": '%2 : %1 %3 %4 %5',
      "args0": [
        {
          "type": "field_dropdown",
          "name": "OP",
          "options":
            [['Arc de cercle', 'CircleArc'],
             ["Cercle (3 points)", 'Circle'],
             ["Rotation", 'Rotate'],
             ["Triangle", 'Polygon']
			]
        },{
          "type": "input_value", "name": "NOM"
        },{
          "type": "input_value", "name": "OBJ1"
        },{
          "type": "input_value", "name": "OBJ2"
        },{
          "type": "input_value", "name": "OBJ3"
        }
      ],
      'previousStatement': null,
      'nextStatement': null,
      "colour": 60
    });
	this.setInputsInline(true);
  }
};

Blockly.Blocks['ggb_1_arg'] = {
  init: function() {
    this.jsonInit({
      "message0": '%1 %2 : %3',
      "args0": [
        {
          "type": "field_dropdown",
          "name": "OP",
          "options":
            [['fixer visibilité étiquette', 'ggbApplet.setLabelVisible'],
             ["fixer visibilité objet", 'ggbApplet.setVisible'],
             ["fixer opacité objet", 'ggbApplet.setFilling'],
             ["fixer cellule", 'fixer_cellule'],
             ["Point sur", 'Point']
			]
        },{
          "type": "input_value", "name": "NOM"
        },{
          "type": "input_value", "name": "OBJ1"
        }
      ],
      'previousStatement': null,
      'nextStatement': null,
      "colour": 60
    });
	this.setInputsInline(true);
  }
};

Blockly.Blocks['ggb_1_arg_fonct'] = {
  init: function() {
    this.jsonInit({
      "message0": '%1 %2',
      "args0": [
        {
          "type": "field_dropdown",
          "name": "OP",
          "options":
            [['abscisse de', 'coordX'],
			 ['ordonnee de', 'coordY'],
             ["visibilité de", 'ggbApplet.getVisible'],
             ["nouveau nom", 'nouveau']
			]
        },{
          "type": "input_value", "name": "OBJ1"
        }
      ],
      "extensions": ["output_number"],
      "colour": 60
    });
	this.setInputsInline(true);
	this.setOutput(true);
  }
};

Blockly.Blocks['ggb_intersections'] = {
  init: function() {
    this.jsonInit({
      "message0": '%2 : %1 %3 %4',
      "args0": [
        {
          "type": "field_dropdown",
          "name": "OP",
          "options":
            [
             ["Intersection", 'Intersect'],
             ["Intersection1", 'Intersect1'],
             ["Intersection2", 'Intersect2']
			]
        },{
          "type": "input_value", "name": "NOM"
        },{
          "type": "input_value", "name": "OBJ1"
        },{
          "type": "input_value", "name": "OBJ2"
        }
      ],
      'previousStatement': null,
      'nextStatement': null,
      "colour": 60
    });
	this.setInputsInline(true);
  }
};

Blockly.Blocks['ggb_setCell'] = {
  init: function() {
    this.jsonInit({
      "message0": 'Fixer cellule %1 %2 à %3',
      "args0": [
        {
          "type": "input_value", "name": "col"
        },{
          "type": "input_value","name": "lig"
        },{
          "type": "input_value", "name": "valeur"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 60
    });
	this.setInputsInline(true);
  }
};

Blockly.Blocks['ggb_getCell'] = {
  init: function() {
    this.jsonInit({
      "message0": 'Cellule %1 %2',
      "args0": [
        {
          "type": "input_value", "name": "col"
        },{
          "type": "input_value","name": "lig"
        }
      ],
      "colour": 60
    });
	this.setInputsInline(true);
	this.setOutput(true);
  }
};
