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
            this.scene.start('profsTwo');
        }, this);
    },

    update: function()
    {
        if(keyY.isDown)
        {
            this.scene.start('profsIntro');
        }
    }
});

var profsIntro = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function profsIntro ()
    {
        Phaser.Scene.call(this, {key: 'profsIntro'});
    },

    preload: function()
    {
        this.load.spritesheet('br', 'assets/brookerich.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('jg', 'assets/joanngulizio.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('sl', 'assets/stevelundy.png', { frameWidth: 64, frameHeight: 64 });
        this.load.image('brirl', 'assets/brookeirl.png');
        this.load.image('jgirl', 'assets/gulizioirl.png');
        this.load.image('slirl', 'assets/steveirl.png');
    },

    create: function()
    {
        this.add.text(200, 250, "Presented by the Teaching Team...", { font: "30px Bradley Hand", fill: "#000000"})
        setTimeout(() => {this.irl();}, 2000);
        setTimeout(() => {this.add.text(300, 290, "(as coded by Ananya)", { font: "20px Bradley Hand", fill: "#000000"});}, 5000);
        setTimeout(() => {this.sprites();}, 7000);
        setTimeout(() => {this.add.text(220, 550, "(yeah...I do code instead of art for a reason)", { font: "20px Bradley Hand", fill: "#000000"});;}, 9000);
        setTimeout(() => {this.scene.start('baseScene');}, 15000);
    },

    update: function() {},

    irl: function()
    {
        this.add.image(100, 100, 'brirl').setScale(0.15);
        this.add.image(400, 100, 'jgirl').setScale(1);
        this.add.image(700, 100, 'slirl').setScale(0.2);
    },

    sprites: function()
    {
        this.physics.add.sprite(100, 375, 'br').setScale(5);
        this.physics.add.sprite(400, 375, 'jg').setScale(5);
        this.physics.add.sprite(700, 375, 'sl').setScale(5);
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
         } else if(keyS.isDown || down.isDown) {
            player.setVelocityX(0);
            player.setVelocityY(160);
         } else if(keyD.isDown || right.isDown) {
            player.setVelocityX(160);
            player.setVelocityY(0);
         } else if(keyW.isDown || up.isDown) {
            player.setVelocityX(0);
            player.setVelocityY(-160);
         } else {
            player.setVelocity(0);
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
            this.scene.start('profsOne');
        }
        else if(keyN.isDown)
        {
            this.scene.start('baseScene');
        }
    }
});

var profsOne = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function profsOne ()
    {
        Phaser.Scene.call(this, {key: 'profsOne'});
    },

    preload: function() 
    {
        this.load.image('background', 'assets/statue.png');
        this.load.spritesheet('br', 'assets/brookerich.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('jg', 'assets/joanngulizio.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('sl', 'assets/stevelundy.png', { frameWidth: 64, frameHeight: 64 });
        this.load.image('tt1', 'assets/tt1.png');
        this.load.image('tt2', 'assets/tt2.png');
        this.load.image('tt3', 'assets/tt3.png');
    },

    create: function()
    {
        this.add.image(400, 300, 'background').setScale(1.3);
        this.physics.add.sprite(550, 375, 'br').setScale(5);
        this.physics.add.sprite(625, 375, 'jg').setScale(5);
        this.physics.add.sprite(700, 375, 'sl').setScale(5);

        var style = { font: "30px Bradley Hand", fill: "#000000", backgroundColor: "#fddab9"};
        var txtOne = this.add.text(100, 100, "...and here we are at the unveiling\nof the statue, 'Medusa with the\nHead of Perseus'.", style);
        setTimeout(() => { txtOne.visible = false; }, 6000);
        setTimeout(() => { txtTwo = this.add.text(100, 100, "We've talked about Lucan's 'The Civil\nWar', where Medusa was a monster\nwho created other monsters.", style); }, 6000);
        setTimeout(() => { txtTwo.visible = false; }, 12000);
        setTimeout(() => { txtThr = this.add.text(100, 100, "But here, we see the impact of Ovid's\nMedusa on the #MeToo Movement.", style); }, 12000);
        setTimeout(() => { txtThr.visible = false; }, 18000);
        setTimeout(() => { txtFour = this.add.text(100, 100, "Wondering why? Let's step back in time.", style); }, 18000);
        setTimeout(() => { txtFour.visible = false; }, 24000);

        setTimeout(() => { this.add.image(400, 300, 'tt1').setScale(1.2); }, 24000);
        setTimeout(() => { this.add.image(400, 300, 'tt2').setScale(1.2); }, 26000);
        setTimeout(() => { this.add.image(400, 300, 'tt3').setScale(1.2); }, 28000);

        setTimeout(() => {this.scene.start('poseidonSceneStart');}, 30000);
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
         } else if(keyS.isDown || down.isDown) {
            player.setVelocityX(0);
            player.setVelocityY(160);
         } else if(keyD.isDown || right.isDown) {
            player.setVelocityX(160);
            player.setVelocityY(0);
         } else if(keyW.isDown || up.isDown) {
            player.setVelocityX(0);
            player.setVelocityY(-160);
         } else {
            player.setVelocity(0);
         };
    },
    
    onMeetPoseidon: function()
    {
        player.x = 2200;
        player.y = 2350;
        this.scene.start('poseidonSceneStart');
    },

    onMeetMedusa: function()
    {
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
        setTimeout(() => {this.scene.start('profsTwo');}, 16000);
    },

    update: function() {}
});

var profsTwo = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function profsTwo ()
    {
        Phaser.Scene.call(this, {key: 'profsTwo'});
    },

    preload: function()
    {
        this.load.image('background', 'assets/statue.png');
        this.load.spritesheet('br', 'assets/brookerich.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('jg', 'assets/joanngulizio.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('sl', 'assets/stevelundy.png', { frameWidth: 64, frameHeight: 64 });
        this.load.image('tt1', 'assets/tt1.png');
        this.load.image('tt2', 'assets/tt2.png');
        this.load.image('tt3', 'assets/tt3.png');
    },

    create: function()
    {
        this.add.image(400, 300, 'background').setScale(1.3);
        this.physics.add.sprite(550, 375, 'br').setScale(5);
        this.physics.add.sprite(625, 375, 'jg').setScale(5);
        this.physics.add.sprite(700, 375, 'sl').setScale(5);

        var style = { font: "30px Bradley Hand", fill: "#000000", backgroundColor: "#fddab9"};
        var txtOne = this.add.text(100, 100, "As Ovid says, unwilling Medusa was\n'ravaged' by Poseidon.", style);
        setTimeout(() => { txtOne.visible = false; }, 7000);
        setTimeout(() => { txtTwo = this.add.text(100, 100, "Athena, of course, was not happy.", style); }, 7000);
        setTimeout(() => { txtTwo.visible = false; }, 11000);
        setTimeout(() => { txtThr = this.add.text(100, 100, "She turned the beautiful maiden's hair into snakes,\nthat turned those that looked at her into stone.", style); }, 11000);
        setTimeout(() => { txtThr.visible = false; }, 20000);
        setTimeout(() => { txtFour = this.add.text(100, 100, "Unfortunately, there was more to\npoor Medusa's story.", style); }, 20000);
        setTimeout(() => { txtFour.visible = false; }, 24000);

        setTimeout(() => { this.add.image(400, 300, 'tt1').setScale(1.2); }, 24000);
        setTimeout(() => { this.add.image(400, 300, 'tt2').setScale(1.2); }, 26000);
        setTimeout(() => { this.add.image(400, 300, 'tt3').setScale(1.2); }, 28000);

        setTimeout(() => {this.scene.start('perseusSceneStart');}, 30000);
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
    scene: [bootScene, profsIntro, baseScene, medusaStartScene, profsOne, poseidonSceneStart, templeScene, medusaPoseidonScene, profsTwo]
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