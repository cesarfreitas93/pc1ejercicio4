var juego = new Phaser.Game(1100,550,Phaser.CANVAS, 'bloque_juego');
var fondoJuego, flappy, boton;
var keyArriba, keyAbajo, keyIzqui,keyDere;
var estadoMain={
    preload: function(){
        juego.load.image('fondo','img/fondo2.jpg');
        //juego.load.image('pajaro','img/pajaro1.png');
        //juego.load.image('pajaro','img/pajaro1.png');
        juego.load.image('btn','img/btn.png');
        //juego.load.spritesheet('pajaros','img/character.png',108,140);
        juego.load.spritesheet('pajaros','img/persona.png',64,64);
    },
    create: function(){
        fondoJuego = juego.add.tileSprite(0,0,1100,550,'fondo');
        flappy=juego.add.sprite(26,370,'pajaros');
        //flappy=juego.add.sprite(100,100,'pajaro');
        //flappy.anchor.setTo(0.5);
        //flappy.scale.setTo(-1,1);
       // flappy.angle = 90;
        flappy.frame=1;
        flappy.animations.add('arriba',     [0,1,2,3,4,5,6,7,8]         ,9, true);
        flappy.animations.add('derecha',    [27,28,29,30,31,32,33,34,35],9, true);
        flappy.animations.add('abajo',      [18,19,20,21,22,23,24,25,26],9, true);
        flappy.animations.add('izquierda',  [9,10,11,12,13,14,15,16,17] ,9, true);
        //boton = juego.add.sprite(juego.width/2, juego.height/2,'btn');
        //boton.anchor.setTo(0.5,0.5);
        keyDere     =juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        keyIzqui    =juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        keyAbajo    =juego.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        keyArriba   =juego.input.keyboard.addKey(Phaser.Keyboard.UP);

        juego.physics.startSystem(Phaser.Physics.ARCADE);
        juego.physics.arcade.enable(flappy);
        flappy.body.collideWorldBounds=true;


    },
    update: function(){
        fondoJuego.tilePosition.x-=1;
        //flappy.angle+=0.2;
        //flappy.animations.play('vuelo');
        if(keyDere.isDown){
            flappy.position.x+=2;
            flappy.animations.play('derecha');
        }
        if(keyIzqui.isDown){
            flappy.position.x-=2;
            flappy.animations.play('izquierda');
        }
        if(keyArriba.isDown){
            flappy.position.y-=2;
            flappy.animations.play('arriba');
        }
        if(keyAbajo.isDown){
            flappy.position.y+=2;
            flappy.animations.play('abajo');
        }
    },
};

juego.state.add('main', estadoMain);
juego.state.start('main');