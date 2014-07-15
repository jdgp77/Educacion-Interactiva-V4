var ei_animation_static = {
	//	Arreglo de todas las clases
	arEiAnimation: new Array(),
	//	Numero de animaciones
	numEiAnimation: 0,
};

function ei_animation(father)
{
	this.father=father;
	//	Numero de la animación
	this.numAnimacion=ei_animation_static.numEiAnimation;
	//	Guarda este objeto para ser usado
	ei_animation_static.arEiAnimation[this.numAnimacion]=this;
	//	Si y esta corriendo la animación
	this.bnRunAnimation=false;
	//	Inicia la animación
	this.start=function()
	{
		//	Si y esta corriendo la animación
		this.bnRunAnimation=true;
		//	Pasos caminados
		this.numPasos=0;
		//	Cuando incio este
		this.milisegundosInicio=this.milisegundosAhora();
		//	Inicia la animación
		this.animate();
	}
	//	Funcion al animar
	this.setFunction=function(functionOnAnimation)
	{ this.functionOnAnimation=functionOnAnimation; };
	//	Finaliza la animación
	this.stop=function()
	{ this.bnRunAnimation=false; }
	//	Cada cuanto realizar el paso
	this.pasosPorUnSegundo = 1000/25;
	//	Ejecuta la animacipón
	this.animate=function(noPasosCaminados,milisegundosInicio)
	{
		//	Si puede continuar con la animación
		if(this.bnRunAnimation)
		{
			try
			{
				//	Un paso mas caminado
				this.numPasos++;
				//	Funcion a ejecutar
				this.functionOnAnimation();
				//	Mira en cuanto tiempo ejecutar esta misma funcion
				setTimeout("ei_animation_static.arEiAnimation["+this.numAnimacion+"].animate();",this.controlSegundos(this.milisegundosInicio,this.numPasos,this.pasosPorUnSegundo));
			}
			catch(err)
			{ this.bnRunAnimation=false; console.err('Error en la funcion de la animación: '+err);}
		}
	}
	//	Retorna en cuanto tiempo tiene que ejecutar el siguiente
	this.controlSegundos=function(milisegundosInicio,numPasosCaminados,pasoMilisegMinimo)
	{
		var milisegundosTotales=this.milisegundosAhora()-milisegundosInicio;
		//	console.info("Inicio: "+milisegundosInicio);
		//	console.info("Ahora:  "+this.milisegundosAhora());
		var milisegundosSigPaso=(numPasosCaminados+1)*pasoMilisegMinimo;
		if(milisegundosTotales<=milisegundosSigPaso)
		{ valReturn = milisegundosSigPaso-milisegundosTotales; }
		else
		{ valReturn = 0; }
		//	console.info("Diferencia:  "+valReturn_EI);
		return valReturn;
	}
	//	Retorna los milisegundos del momento
	//	  cuando se ejecuto
	this.milisegundosAhora=function()
	{
		var tiempoAhora_EI = new Date();
		return tiempoAhora_EI.getTime();
	}
	//	Se a creado una nueva ei_animation
	ei_animation_static.numEiAnimation++;
};

var ei_static = {
	//	Numero de tableros
	num_boards: 0,
	
//	FALTA:
	//	Arreglo con los tableros
	boards: new Array(),
	//	Cuando el cursor esta oprimido
	bnCursorOprimido: false,

	//	Cuando se mantiene oprimido el cursor
	onMouseDown: function(evento){
			//	Solo se activa si no estaba oprimido
			if(!this.bnCursorOprimido)
			{
				//	Pasa por cada uno de los lienzos y sca la posicion del cursorEnX y cursorEnY
				for(var contLiensos=0;contLiensos<this.num_boards;contLiensos++)
				{
					//	Saca la posicion del cursor
					conocerLaPosicionDelCursor_ESt(evento,contLiensos);
				}
			}
		},
	//	Posicion del cursor
	cursorPosEnX: 0,
	cursorPosEnY: 0,
	//	En caso de que se mueva
	onCursorMove: function(event){
			//	En caso de ser touch
			if(event.targetTouches)
			{
				//	Habilitado para touch
				var t=event.targetTouches;
				//	Posicion en X
				this.cursorPosEnX=t[0].pageX;
				//	Posicion en Y
				this.cursorPosEnY=t[0].pageY;
			}
			else
			{
				//	Posicion en X
				this.cursorPosEnX=event.pageX;
				//	Posicion en Y
				this.cursorPosEnY=event.pageY;
			}
		},
	onCursorUp: function(){
			
		},
	//	Realiza el prosesamiento de las acciones para poder mostrar estas
	processActions: function(object)
	{
		//	Convierte las acciones en datos, ejemplo moveInX en posInX
		object=this.actionsInData(object);
		//	Borra las acciones despues de procesarlas
		return this.clearActions(object);
	},
	//	Convierte las acciones en datos, ejemplo moveInX en posInX
	actionsInData: function(object)
		{
			//	Pasa movimiento en posicion
			object.posInX=object.posInX+object.movInX;
			object.posInY=object.posInY+object.movInY;
			
			//	Retorna el objeto modificado
			return object;
		},
	//	Borra las acciones, comunmente despues de procesarlas
	clearActions: function(object)
		{
			object.moveInX=0;
			object.moveInY=0;

			//	Retorna el objeto modificado
			return object;
		},
};

function ei_things(father)
{
	this.father=father;
	//	Numero de objetos que existen
	this.numObject=0;
	//	Arreglo con los objetos que existen
	this.arObject=new Array();
	//	Arreglo, retorna los nombres de los objetos con el numero del objeto
	this.arObjectName=new Array();
	//	Crea o retorna el objeto por el nombre
	this.objName=function(name)
	{
		//	Mira si no existe para crearlo
		if(this.arObjectName[name]==undefined)
		//	Crea el nuevo objeto
		{
			//	Crea un nuevo objeto
			this.arObject[this.numObject]=new ei_thing();
			//	Guarda el nombre del objeto
			this.arObjectName[name]=this.arObject[this.numObject];
			//	Cuenta un objeto mas
			this.numObject++;
		}
		//	Retorna el objeto ya creado
		return this.arObjectName[name];
	},
	this.objNombre=function(name) { this.objName(name); };
	this.objetoNombre=function(name) { this.objName(name); };
}

function ei_thing()
{
	//	Numero del objeto
	this.num;
	//	Posicion en X
	this.posInX=0;
	this.setPosInX=function(posInX){ this.posInX=posInX; return this; }; this.getPosInX=function(posInX){ return this.posInX; }
	this.setPosEnX=function(posInX){ this.setPosInX(posInX); }; this.getPosEnX=function(posInX){ return this.getPosInX(posInX); }
	this.movInX=0;
	this.accMoveInX=function(movInX){ this.movInX=movInX; return this; }
	this.accMoverEnX=function(movInX){ return this.accMoveInX(movInX); }
	//	Posicion en Y
	this.posInY=0;
	this.setPosInY=function(posInY){ this.posInY=posInY; return this; }; this.getPosInY=function(posInY){ return this.posInY; }
	this.setPosEnY=function(posInY){ this.setPosInY(posInY); }; this.getPosEnY=function(posInY){ return this.getPosInY(posInY); }
	this.movInY=0;
	this.accMoveInY=function(movInY){ this.movInY=movInY; return this; }
	this.accMoverEnY=function(movInY){ return this.accMoveInY(movInY); }
	//	Colocar la posicion
	this.setPos=function(posInX,posInY) { this.posInX=posInX; this.posInY=posInY; return this; }
	this.setPosition=function(posInX,posInY) { this.setPos(posInX,posInY); }
	this.accMove=function(movInX,movInY){ this.movInX=movInX; this.movInY=movInY; return this; }
	
	//	Ancho
	this.width=10;
	this.setWidth=function(width){ this.width=width; }; this.getWidth=function(width){ return this.width; }
	//	Alto
	this.height=10;
	this.setHeight=function(height){ this.height=height; }; this.getHeight=function(height){ return this.height; }
	//	Colocar la posicion
	this.setMeasures=function(width,height) { this.width=width; this.height=height; }
	//	Radio
	this.radio=5;
	this.setRadio=function(radio){ this.radio=radio; }; this.getRadio=function(radio){ return this.radio; }
	//	Forma
	this.form='rectangle';
	this.setForm=function(form){ this.form=form; }; this.getForm=function(){ return this.form; };
	//	Tipo de objeto es
	//	swish,forma,input
	this.type='form';
	this.setType=function(type){ this.type=type; }; this.getType=function(){ return this.type; }
	this.subType='rectangle';
	this.setSubType=function(subType){ this.subType=subType; }; this.getSubType=function(){ return this.subType; }
	
	//	Formato predefinido
	this.itIs=function(itIs)
	{
		switch(itIs)
		{
			case 'rectagle':
			{
				this.setType('form');
				this.setSubType('rectagle');
				break;
			}
			case 'circle':
			{
				this.setType('form');
				this.setSubType('circle');
				break;
			}
			case 'input':
			{
				this.setType('input');
				this.setWidth(150+'px');
				this.setHeight(22+'px');
				break;
			}
		}
		return this;
	};
	this.esUn=function(itIs) { return this.itIs(itIs); }
	//	Propiedades
	this.arProperties=new Array();
	this.addPropertie=function(propertie){ this.arProperties[this.arProperties.length]=propertie; };
	this.getProperties=function(){ return this.arProperties; }
	//	Todo los objetos tienen un valor por defecto cero
	this.value=0;
	this.setValue=function(value){ this.value=value; }; this.getValue=function(value){ return this.value; }
	//	Habilitar el onclick
	this.bnEnableClick=false;
	this.enableClick=function(){ this.bnEnableClick=true; }; this.disableClick=function(){ this.bnEnableClick=false; }; this.getBnEnableClick=function(){ return this.bnEnableClick; };
	//	Habilitar el arrastrar
	this.bnEnableDragAndDrop=false;
	this.enableDragAndDrop=function(){ this.bnEnableDragAndDrop=true; }; this.disableDragAndDrop=function(){ this.bnEnableDragAndDrop=false; }; this.getBnEnableClick=function(){ return this.bnEnableDragAndDrop; };
	
	this.object;
	this.arSubObj=new Array();
}

function ei_object(options)
{
	
	this.info={
		//	Ancho del tablero
		width: 300,
		//	Alto del tablero
		height: 200,
		//	Clase del canvas
		canvas: {
				clase: 'cCanvas_LugarDelCanvas_ei',
			},
		//	Información de los objetos dentro
		things: {
				objects: {
					//	Retorna el numero al ingresar el nombre
					numObjeto: new Array(),
					//	Nombres de los objetos
					nombres: new Array(),
					//	Retorna el objeto al ingresar el numero
					objeto: new Array(),
					//	True si existe
					bnExiste: new Array(),
					//	Numero de objetos
					num: 0,
				},
				lines: {
					//	Retorna el numero al ingresar el nombre
					numObjeto: new Array(),
					//	Nombres de los objetos
					nombres: new Array(),
					//	Retorna el objeto al ingresar el numero
					objeto: new Array(),
					//	True si existe
					bnExiste: new Array(),
					//	Numero de objetos
					num: 0,
				},
			},
		};
	//	Evento al mantener oprimido
	this.onMouseDown=function()
		{
//	FALTA
		}
	//	Evento al soltar despues de mantener oprimido
	this.onCursorUp=function()
		{
//	FALTA
		}
	this.createBoard=function(jQueryObject)
		{
			//	Div
			//	---
			
			//	Crea el div que ira dentro
			this.oDiv=document.createElement('div');
			//	Agregamos el canvas al elemento
			jQueryObject.append(this.oDiv);
			//	Colocamos la posicion relativa
			this.oDiv.style.position='relative';
			//	Colocamos el ancho y el alto
			this.oDiv.style.width=this.info.width+'px';
			this.oDiv.style.height=this.info.height+'px';
			//	Colocamos un overflow hidden
			this.oDiv.style.overflow='hidden';
			
			//	DivThings
			//	---------
			
			this.oDivThings=document.createElement('div');
			//	Agregamos el canvas al elemento
			this.oDiv.appendChild(this.oDivThings);
			//	Colocamos la posicion absolute
			this.oDivThings.style.position='absolute';
			//	Colocamos el ancho y el alto
			this.oDivThings.style.width=this.info.width+'px';
			this.oDivThings.style.height=this.info.height+'px';
			//	Colocamos un overflow hidden
			this.oDivThings.style.overflow='hidden';
			
			//	Canvas
			//	------
			
			//	Crea el canvas que ira dentro del div del lienzo
			this.oCanvas=document.createElement('canvas');
			//	Agregamos el canvas al elemento
			this.oDiv.appendChild(this.oCanvas);
			//	Colocamos el ancho y el alto
			this.oCanvas.width=this.info.width;
			this.oCanvas.height=this.info.height;
			//	Colocamos la clase, de acuerdo al codigoUnico
			this.oCanvas.className=this.info.canvas.clase;
			//	Creamos el contexto necesario para poder manejarlo
			this.contexto=this.oCanvas.getContext('2d');
			
			
			//	Eventos
			//	-------
			
			this.oCanvas.onMouseDown=function(event)
				{
					//	Pasa por cada uno de los objetos y busca si tiene que empezar de arrastrar algun elemento
					for(var contObjetos_ESt=0;contObjetos_ESt<_noObjetos_ESt[contLiensos];contObjetos_ESt++)
					{
						
					}
				}
			
			this.oCanvas.addEventListener('mousedown',this.onMouseDown,false);
			this.oCanvas.addEventListener('touchstart',this.onMouseDown,false);
			//	Cuando mueve el cursor este lo registra
			if(ei_static.num_boards==0) { document.addEventListener('mousemove',ei_static.onCursorMove,false); }
			this.oCanvas.addEventListener('touchmove',ei_static.onCursorMove,false);
			//	Cuando el cusor es retirado
			if(ei_static.num_boards==0) { document.addEventListener('mouseup',ei_static.onCursorUp,false); }
			if(ei_static.num_boards==0) { document.addEventListener('touchend',ei_static.onCursorUp,false); }
			//	Inicia los eventos de hacer click
			this.oCanvas.addEventListener('click',ei_static.onClick,false);
			
			
			//	Animacion
			//	---------
			//	Crea la funcion de animacion
			//  this.animation=;
			
			//	Al Finalizar
			//	------------
			
			//	Un tablero mas
			ei_static.num_boards++;
			//	Se retorna el objeto
			return this;
		};
	this.createScene=function(fnCreateScene)
	{
		//	Creamos una copia el cocal, para usar las funciones del objeto
		this.fnCreateScene=fnCreateScene;
		//	Retorna el objeto
		return this;
	}
	this.createAnimation=function(fnCreateAnimation)
	{
		//	Creamos una copia el cocal, para usar las funciones del objeto
		this.fnCreateAnimation=fnCreateAnimation;
		//	Retorna el objeto
		return this;
	}
	this.executeCreateScene=function()
	{
		//	Si no tiene en el manejador de objetos lo coloca
		if(this.ei_things==undefined)
		{ this.ei_things=new ei_things(); }
		//	Coloca la variable global ei, con ei_things
		ei=this.ei_things;
		//	Ejecutamos la funcion de crear Scene
		this.fnCreateScene();
		//	Dibuja las variables
		this.drawThings();
	}
	this.executeAnimateScene=function()
	{
		//	Si no tiene en el manejador de objetos lo coloca
		if(this.father.ei_things==undefined)
		{ this.father.ei_things=new ei_things(this); }
		//	Coloca la variable global ei, con ei_things
		ei=this.father.ei_things;
		//	Guardamos todas las cariables, para  crear la animación
		this.father.fnCreateAnimation();
		//	Dibuja las variables
		this.father.drawThings();
	}
	this.start=function()
	{
		//	Crea la scene
		this.executeCreateScene();
		//	Creamos la funcion per con la posibilidad de parar la animación
		this.animation=new ei_animation(this);
		//	Colocamos la funcion a ejecutar
		this.animation.setFunction(this.executeAnimateScene);
		//	Iniciamos la animación
		this.animation.start();
	}
	this.drawThings=function()
	{
		var numObject=this.ei_things.numObject;
		//	Pasa por todos los objetos que tiene
		for(var contObject=0;contObject<numObject;contObject++)
		{
			//	Objeto con datos
			var object=this.ei_things.arObject[contObject];
			//	Convertir acciones en movimiento
			object=ei_static.processActions(object);

			//	Si ya esta creado el svg
			var bnYaEstaCreadoElOjeto=false;
			if(object.object)
			{ bnYaEstaCreadoElOjeto=true; }
			
			if(!bnYaEstaCreadoElOjeto)
			{ object.object=document.createElement('div'); }
			
			object.object.style.position='absolute';
			object.object.style.top=object.posInY+'px';
			object.object.style.left=object.posInX+'px';
			
			if(!bnYaEstaCreadoElOjeto)
			{ this.oDivThings.appendChild(object.object); }
			
			switch(object.getType())
			{
				case 'form':
					switch(object.getSubType())
					{
						case 'rectangle':
							var numSubObject=0;
							object.arSubObj[numSubObject] = document.createElementNS("http://www.w3.org/2000/svg", "svg");
							object.arSubObj[numSubObject].setAttribute("width", object.width+'px');
							object.arSubObj[numSubObject].setAttribute("height", object.height+'px');
							object.arSubObj[numSubObject].style.position='absolute';
							//object.object.setAttribute("draggable", "false");
							object.object.appendChild(object.arSubObj[numSubObject]);
							numSubObject++;
							
							object.arSubObj[numSubObject] = document.createElementNS(object.arSubObj[numSubObject-1].namespaceURI, "rect");
							//object.subobject.setAttribute("x", "0%");
							//object.subobject.setAttribute("y", "0%");
							object.arSubObj[numSubObject].setAttribute("width", object.width+'px');
							object.arSubObj[numSubObject].setAttribute("height", object.height+'px');
							//object.subobject.setAttribute("fill", "white");
							object.arSubObj[numSubObject-1].appendChild(object.arSubObj[numSubObject]);
							numSubObject++;
							break;
						case 'circle':
							var numSubObject=0;
							object.arSubObj[numSubObject] = document.createElementNS("http://www.w3.org/2000/svg", "svg");
							object.arSubObj[numSubObject].setAttribute("width", object.getWidth()+'px');
							object.arSubObj[numSubObject].setAttribute("height", object.getHeight()+'px');
							object.arSubObj[numSubObject].style.position='absolute';
							//object.object.setAttribute("draggable", "false");
							object.object.appendChild(object.arSubObj[numSubObject]);
							numSubObject++;
							
							object.arSubObj[numSubObject] = document.createElementNS(object.arSubObj[numSubObject-1].namespaceURI, "circle");
							object.arSubObj[numSubObject].setAttribute("cx",object.getRadio()+'px');
							object.arSubObj[numSubObject].setAttribute("cy",object.getRadio()+'px');
							object.arSubObj[numSubObject].setAttribute("r",object.getRadio()+'px');
							object.arSubObj[numSubObject-1].appendChild(object.arSubObj[numSubObject]);
							numSubObject++;
							break;
					}
					break;
				case 'input':
					if(!bnYaEstaCreadoElOjeto)
					{
						var numSubObject=0;
						object.arSubObj[numSubObject] = document.createElement('input');
						object.object.appendChild(object.arSubObj[numSubObject]);
						object.arSubObj[numSubObject].object=object;
						object.arSubObj[numSubObject].onchange=function() {
								this.object.setValue(this.value);
							}
						object.arSubObj[numSubObject].style.width=object.getWidth();
						object.arSubObj[numSubObject].style.height=object.getHeight();
						numSubObject++;
					}
					break;
			}
			//	Crea un rectangulo
			//	this.oDivThings.innerHTML='<svg style="'+estilosDelObjeto+'" ><rect width="'+object.width+'" height="'+object.height+'" /></svg>';
			
			
			//	Estilos del objeto
			//	var estilosDelObjeto='width: '+object.width+'; height:'+object.height+'; position: absolute; top:'+object.posInY+'px; left:'+object.posInX+'px; ';
		}
	}
}

(function($)
{
	//	Create de canvas
	$.fn.eiCreateBoard=function()
		{
			//	Create a new board
			var eiBoard=new ei_object();
			//	Create a new board
			return eiBoard.createBoard(this);
		};
}( jQuery ));