var cursors;
var keyA, keyS, keyD, keyW;
var up, down, left, right;
var keyY, keyN;

var bootScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function bootScene ()
    {
        Phaser.Scene.call(this, { key: "bootScene" });
    },

    preload: function () {},
	
    create: function ()
    {
        this.add.text(130, 70, "Women of the Past", { font: "70px Bradley Hand", fill: "#000000"});
        this.add.text(300, 140, "By Ananya Prakash", { font: "20px Bradley Hand", fill: "#000000"});
        this.add.text(150, 250, "Part 1: Greek Mythology", { font: "50px Bradley Hand", fill: "#000000"});
        this.add.text(312, 300, "Beta Release", { font: "30px Bradley Hand", fill: "#000000"});
        this.add.text(237, 420, "Included Pack: Medusa", { font: "30px Bradley Hand", fill: "#000000"});
        this.add.text(65, 455, "Expansion Packs: Echo, Antigone, Women in Ritual", { font: "30px Bradley Hand", fill: "#000000"});
        this.add.text(265, 520, "Press Y to Begin", { font: "40px Bradley Hand", fill: "#000000"});

        this.anims.create({
            key: 'pTurn',
            frames: this.anims.generateFrameNumbers('p', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'pStraight',
            frames: [ { key: 'p', frame: 0 } ],
            frameRate: 20
        });

        //  arrow key inputs
        cursors = this.input.keyboard.createCursorKeys();
        // this.input.keyboard.on("keydown", this.onKeyInput, this);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

        this.input.on('pointerdown', function()
        {
            this.scene.start('medusaPoseidonScene');
        }, this);
    },

    update: function()
    {
        if(keyY.isDown)
        {
            this.scene.start('baseScene');
        }
    }
});

var baseScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function baseScene ()
    {
        Phaser.Scene.call(this, {key: 'baseScene'});
    },

    preload: function()
    {
        this.load.image("tiles", "assets/magecity.png");
        this.load.tilemapTiledJSON("map", "assets/medusaBase.json");
        this.load.spritesheet('p', 'assets/a&mfoe.png', { frameWidth: 64, frameHeight: 64 });
        this.load.image('echo', 'assets/narcissus_flower.png');
        this.load.image('antigone', 'assets/grave.png');
        this.load.image('ritual', 'assets/vase.png');
        this.load.image('medusa', 'assets/snek.png');
    },

    create: function()
    {
        var map = this.make.tilemap({ key: "map" });

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        var tileset = map.addTilesetImage("magecity", "tiles");
        var worldLayer = map.createStaticLayer("World", tileset);
        var belowLayer = map.createStaticLayer("Below", tileset);

        player = this.physics.add.sprite(1630, 1520, 'p').setSize(24,40).setOffset(20,20);
        worldLayer.setCollisionByExclusion([-1]);
        this.physics.add.collider(player, worldLayer);

        var dlc = this.physics.add.staticGroup();
        echo = dlc.create(1500, 1400, 'echo').setScale(0.1).setSize(200, 300).setOffset(600, 850);
        antigone = dlc.create(1455, 1620, 'antigone').setScale(0.3).setSize(200, 100).setOffset(400, 300);
        ritual = dlc.create(1775, 1600, 'ritual').setScale(0.4).setSize(120, 140).setOffset(75, 75);
        this.physics.add.collider(player, dlc, this.onMeetDLC, false, this);

        medusa = this.physics.add.sprite(1785, 1400, 'medusa').setScale(0.085).setSize(2500, 1500).setOffset(50, 50);
        medusa.body.immovable = true;
        this.physics.add.collider(player, medusa, this.onMeetMedusa, false, this);

        camera = this.cameras.main;
        camera.startFollow(player);
        camera.setZoom(1.2);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    },

    update: function()
    {
        if(keyA.isDown || left.isDown) {
            player.setVelocityX(-160);
            player.setVelocityY(0);
            // player.anims.play('pTurn', true);
         } else if(keyS.isDown || down.isDown) {
            player.setVelocityX(0);
            player.setVelocityY(160);
            // player.anims.play('pTurn', true);
         } else if(keyD.isDown || right.isDown) {
            player.setVelocityX(160);
            player.setVelocityY(0);
            // player.anims.play('pTurn', true);
         } else if(keyW.isDown || up.isDown) {
            player.setVelocityX(0);
            player.setVelocityY(-160);
            // player.anims.play('pTurn', true);
         } else {
            player.setVelocity(0);
            // player.anims.play('pStraight', true);
         };
    },

    onMeetDLC: function(player, DLC)
    {
        this.message("You haven't bought\nthis DLC yet!", DLC.x - 100, DLC.y - 50);
    },

    onMeetMedusa: function(player, medusa)
    {
        player.x = 1630;
        player.y = 1520;
        this.scene.start('medusaStartScene');
    },

    message: function(text, xCoord, yCoord)
    {
        var msg = this.add.text(xCoord,yCoord,text,{ font: "30px Bradley Hand", fill: "#000000", backgroundColor: "#fddab9"});
        msg.visible = true
        setTimeout(() => { msg.visible = false; }, 1500);
    }
});

var medusaStartScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function medusaStartScene ()
    {
        Phaser.Scene.call(this, {key: 'medusaStartScene'});
    },

    preload: function() {},

    create: function()
    {
        this.add.text(170, 150, "Load Module: Medusa?", {font: "50px Bradley Hand", fill: "#000000"});
        this.add.text(315, 250, 'Y to begin', {font: "35px Bradley Hand", fill: "#000000"})
        this.add.text(325, 300, 'N to exit', {font: "35px Bradley Hand", fill: "#000000"})
    },

    update: function()
    {
        if(keyY.isDown)
        {
            this.scene.start('statueScene');
        }
        else if(keyN.isDown)
        {
            this.scene.start('baseScene');
        }
    }
});

var statueScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function statueScene ()
    {
        Phaser.Scene.call(this, {key: 'statueScene'});
    },

    preload: function() 
    {
        this.load.image('background', 'assets/statue.png');
    },

    create: function()
    {
        this.add.image(400, 300, 'background').setScale(1.3);
        this.add.text(100, 100, "hi", {font: "30px Bradley Hand", fill: "#ff0044"});
    },

    update: function() {}
});

var poseidonSceneStart = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function poseidonSceneStart ()
    {
        Phaser.Scene.call(this, {key: 'poseidonSceneStart'});
    },

    preload: function()
    {
        this.load.image('posBG', 'assets/athenatemple.png');
        this.load.spritesheet('poseidon', 'assets/poseidon.png', { frameWidth: 64, frameHeight: 64 });
    },

    create: function()
    {
        this.add.image(400, 300, 'posBG').setScale(3.55);
        this.physics.add.sprite(600, 380, 'poseidon').setScale(8);

        var style = { font: "30px Bradley Hand", fill: "#000000", backgroundColor: "#fddab9"};
        var txtOne = this.add.text(100, 100, "Hey, you! Yeah, you. Poseidon here.", style);
        setTimeout(() => { txtOne.visible = false; }, 4000);
        setTimeout(() => { txtTwo = this.add.text(100, 100, "Yeah yeah, welcome to Athena's\ntemple and whatnot.", style); }, 4000);
        setTimeout(() => { txtTwo.visible = false; }, 8000);
        setTimeout(() => { txtThr = this.add.text(100, 100, "Listen, you see that beautiful\nwoman over there?", style); }, 8000);
        setTimeout(() => { txtThr.visible = false; }, 12000);
        setTimeout(() => { txtFour = this.add.text(100, 100, "Do me a favor and go hype me up\nto her, will you?", style); }, 12000);
        setTimeout(() => {this.scene.restart();}, 16000);
        setTimeout(() => {this.scene.start('templeScene');}, 16000);
    },

    update: function() {}
});

var templeScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function templeScene ()
    {
        Phaser.Scene.call(this, {key: 'templeScene'});
    },

    preload: function()
    {
        this.load.image("tiles", "assets/magecity.png");
        this.load.tilemapTiledJSON("mapPos", "assets/poseidon.json");
        this.load.spritesheet('p', 'assets/a&mfoe.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('poseidon', 'assets/poseidon.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('medusa', 'assets/medusa.png', { frameWidth: 64, frameHeight: 64 });
    },

    create: function()
    {
        var map = this.make.tilemap({ key: "mapPos" });

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        var tileset = map.addTilesetImage("magecity", "tiles");
        var belowLayer = map.createStaticLayer("Below", tileset);
        var worldLayer = map.createStaticLayer("World", tileset);

        var medusaMeet = false;

        player = this.physics.add.sprite(2200, 2350, 'p').setSize(24,40).setOffset(20,20);
        worldLayer.setCollisionByExclusion([-1]);
        this.physics.add.collider(player, worldLayer);

        poseidon = this.physics.add.sprite(2150, 2200, 'poseidon').setScale(1.5).setSize(30,40).setOffset(20,20);
        poseidon.body.immovable = true;
        this.physics.add.collider(player, poseidon, this.onMeetPoseidon, false, this);

        medusa = this.physics.add.sprite(1650, 1900, 'medusa').setScale(1.5).setSize(40,40).setOffset(10,20);
        medusa.body.immovable = true;
        this.physics.add.collider(player, medusa, this.onMeetMedusa, false, this);

        camera = this.cameras.main;
        camera.startFollow(player);
        camera.setZoom(1.2);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    },

    update: function()
    {
        if(keyA.isDown || left.isDown) {
            player.setVelocityX(-160);
            player.setVelocityY(0);
            // player.anims.play('pTurn', true);
         } else if(keyS.isDown || down.isDown) {
            player.setVelocityX(0);
            player.setVelocityY(160);
            // player.anims.play('pTurn', true);
         } else if(keyD.isDown || right.isDown) {
            player.setVelocityX(160);
            player.setVelocityY(0);
            // player.anims.play('pTurn', true);
         } else if(keyW.isDown || up.isDown) {
            player.setVelocityX(0);
            player.setVelocityY(-160);
            // player.anims.play('pTurn', true);
         } else {
            player.setVelocity(0);
            // player.anims.play('pStraight', true);
         };
    },
    
    onMeetPoseidon: function()
    {
        if (medusaMeet = false)
        {
            player.x = 2200;
            player.y = 2350;
            this.scene.start('poseidonSceneStart');
        }
        else
        {
            this.scene.start('poseidonSceneEnd');
        }
    },
    onMeetMedusa: function()
    {
        player.x = 1550;
        player.y = 1050;
        medusaMeet = true;
        this.scene.start('medusaPoseidonScene');
    }
});

var medusaPoseidonScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function medusaPoseidonScene ()
    {
        Phaser.Scene.call(this, {key: 'medusaPoseidonScene'});
    },

    preload: function()
    {
        this.load.image('posBG', 'assets/athenatemple.png');
        this.load.spritesheet('medusa', 'assets/medusa.png', { frameWidth: 64, frameHeight: 64 });

    },

    create: function()
    {
        this.add.image(400, 300, 'posBG').setScale(3.55);
        this.physics.add.sprite(200, 380, 'medusa').setScale(8);

        var style = { font: "30px Bradley Hand", fill: "#000000", backgroundColor: "#fddab9"};
        var txtOne = this.add.text(300, 100, "Hi! I'm Medusa.", style);
        setTimeout(() => { txtOne.visible = false; }, 4000);
        setTimeout(() => { txtTwo = this.add.text(300, 100, "That Poseidon guy? Oh, yeah he\nwon't give me a break...", style); }, 4000);
        setTimeout(() => { txtTwo.visible = false; }, 8000);
        setTimeout(() => { txtThr = this.add.text(300, 100, "...and in a temple, nonetheless!", style); }, 8000);
        setTimeout(() => { txtThr.visible = false; }, 12000);
        setTimeout(() => { txtFour = this.add.text(300, 100, "He's a god, you know. I\nguess I have no choice...", style); }, 12000);
        setTimeout(() => {this.scene.restart();}, 16000);
        setTimeout(() => {this.scene.start('templeScene');}, 16000);
    },

    update: function() {}
});

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    backgroundColor: '#fddab9',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {},
            debug: true
        }
    },
    scene: [bootScene, baseScene, medusaStartScene, statueScene, poseidonSceneStart, templeScene, medusaPoseidonScene]
};

var game = new Phaser.Game(config);

var emptyScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function emptyScene ()
    {
        Phaser.Scene.call(this, {key: 'emptyScene'});
    },

    preload: function() {},

    create: function() {},

    update: function() {}
});