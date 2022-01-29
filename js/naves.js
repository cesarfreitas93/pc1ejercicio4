var juego = new Phaser.Game(370,550,Phaser.CANVAS, 'bloque_juego');
var fondoJuego, nave, cursores;
var keyArriba, keyAbajo, keyIzqui,keyDere;
var balas;
var tiempoBala=0;
var botonDisparo;
var enemigos;
var puntos = 0;

var estadoMain={
    preload: function(){
        juego.load.image('fondo','img/space.png');
        juego.load.spritesheet('pajaros','img/persona.png',64,64);
        juego.load.image('player', 'img/nave.png');
        juego.load.image('laser','img/laser.png');
        juego.load.image('enemy','img/alien.png');
    },
    create: function(){
        fondoJuego = juego.add.tileSprite(0,0,370,550,'fondo');
        nave=juego.add.sprite(juego.width/2,480,'player');
        nave.anchor.setTo(0.5);
        cursores=juego.input.keyboard.createCursorKeys();

        botonDisparo = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        balas = juego.add.group();
        balas.enableBody=true;
        balas.physicsBodyType=Phaser.Physics.ARCADE;
        balas.createMultiple(20,'laser');
        balas.setAll('anchor.x',0.5);
        balas.setAll('anchor.y',1);
        balas.setAll('outOfBoundsKill',true);
        balas.setAll('checkWorldBounds',true);

        enemigos=juego.add.group();
        enemigos.enableBody=true;
        enemigos.physicsBodyType=Phaser.Physics.ARCADE;
        
        juego.physics.startSystem(Phaser.Physics.ARCADE);
        juego.physics.arcade.enable(nave);
        nave.body.collideWorldBounds=true;

        for(var y = 0; y<6; y++){
            for(var x = 0; x<6;x++){
                var enemigo_ = enemigos.create(x*54,y*39,'enemy');
                enemigo_.anchor.setTo(0.5);
            }
        }
        enemigos.x=50;
        enemigos.y=30;
        /*var animacion= juego.add.tween(enemigos).ti(
            {
                x:100
            },
            1000,
            Phaser.Easing.Linear.None,
            true,0,1000,true
        );
        */

    },
    update: function(){
        fondoJuego.tilePosition.y+=4;
        if(cursores.right.isDown){
            nave.position.x+=3;
        }

        if(cursores.left.isDown){
            nave.position.x-=3;
        }

        if(cursores.up.isDown){
            nave.position.y-=3;
        }

        if(cursores.down.isDown){
            nave.position.y+=3;
        }

        var bala;

        if(botonDisparo.isDown){
            if(juego.time.now > tiempoBala){
                bala = balas.getFirstExists(false);
            }
            if(bala){
                bala.reset(nave.x,nave.y);
                bala.body.velocity.y = -300;
                tiempoBala = juego.time.now +100;
            }
        }
        
        juego.physics.arcade.overlap(balas,enemigos,colision, null,this);
    },
};



function colision(bala, enemigo){
    bala.kill();
    enemigo.kill();
    puntos++;
    var score =  document.getElementById('score');
    score.innerText = "Puntos: " + puntos;
    console.log(puntos);
    var audio = new Audio('media/SpaceLaserShot.mp3');
    audio.currentTime = 0.2;
    audio.playbackRate = 2.8;
    audio.play();
    
}

juego.state.add('naves', estadoMain);
juego.state.start('naves');