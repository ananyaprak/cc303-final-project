var cursors;
var keyA, keyS, keyD, keyW;
var up, down, left, right;
var keyY, keyN;
var sg = 0, head = 0;

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

        // this.input.on('pointerdown', function()
        // {
        //     this.scene.start('SCENENAMEHERE');
        // }, this);
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
        this.load.spritesheet('p', 'assets/utplayer.png', { frameWidth: 64, frameHeight: 64 });
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
        setTimeout(() => { this.add.image(400, 300, 'tt2').setScale(1.2); }, 25000);
        setTimeout(() => { this.add.image(400, 300, 'tt3').setScale(1.2); }, 26000);

        setTimeout(() => {this.scene.start('poseidonSceneStart');}, 27000);
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
        setTimeout(() => { this.scene.start('templeScene'); }, 16000);
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
        this.load.spritesheet('p', 'assets/utplayer.png', { frameWidth: 64, frameHeight: 64 });
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

        var aboveLayer = map.createStaticLayer("Above", tileset);

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
        this.load.image('tt1', 'assets/tt1.png');
        this.load.image('tt2', 'assets/tt2.png');
        this.load.image('tt3', 'assets/tt3.png');
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
        setTimeout(() => { txtThr = this.add.text(300, 100, "...and in a temple too, the\naudacity!", style); }, 8000);
        setTimeout(() => { txtThr.visible = false; }, 12000);
        setTimeout(() => { txtFour = this.add.text(300, 100, "He's a god, you know. I\nguess I have no choice...", style); }, 12000);
        setTimeout(() => { txtFour.visible = false; }, 16000);

        setTimeout(() => { this.add.image(400, 300, 'tt3').setScale(1.2); }, 16000);
        setTimeout(() => { this.add.image(400, 300, 'tt2').setScale(1.2); }, 17000);
        setTimeout(() => { this.add.image(400, 300, 'tt1').setScale(1.2); }, 18000);

        setTimeout(() => {this.scene.start('profsTwo');}, 19000);
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
        setTimeout(() => { txtTwo.visible = false; }, 13000);
        setTimeout(() => { txtThr = this.add.text(100, 100, "Though Poseidon's sin was not her fault,\nMedusa was punished for it.", style); }, 13000);
        setTimeout(() => { txtThr.visible = false; }, 21000);

        setTimeout(() => { this.add.image(400, 300, 'tt1').setScale(1.2); }, 21000);
        setTimeout(() => { this.add.image(400, 300, 'tt2').setScale(1.2); }, 22000);
        setTimeout(() => { this.add.image(400, 300, 'tt3').setScale(1.2); }, 23000);

        setTimeout(() => {this.scene.start('sunglassesSceneStart');}, 24000);
    },

    update: function() {}
});

var sunglassesSceneStart = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function sunglassesSceneStart ()
    {
        Phaser.Scene.call(this, {key: 'sunglassesSceneStart'});
    },

    preload: function()
    {
        this.load.image("tiles", "assets/magecity.png");
        this.load.tilemapTiledJSON("mapPer", "assets/perseus.json");
        this.load.spritesheet('p', 'assets/utplayer.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('evil', 'assets/medusaEvil.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('shades', 'assets/sunglasses.png', { frameWidth: 32, frameHeight: 32 });
    },

    create: function()
    {
        var map = this.make.tilemap({ key: "mapPer" });

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        var tileset = map.addTilesetImage("magecity", "tiles");
        var belowLayer = map.createStaticLayer("Below", tileset);
        var worldLayer = map.createStaticLayer("World", tileset);

        player = this.physics.add.sprite(1000, 2100, 'p').setSize(24,40).setOffset(20,20);
        worldLayer.setCollisionByExclusion([-1]);
        this.physics.add.collider(player, worldLayer);

        evil = this.physics.add.sprite(850, 1900, 'evil').setScale(1.5).setSize(30,40).setOffset(20,20);
        evil.body.immovable = true;
        this.physics.add.collider(player, evil, this.meetEvil, false, this);

        shades = this.physics.add.sprite(787.5, 1712.5, 'shades');
        this.physics.add.collider(player, shades, this.swag, false, this);

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

    meetEvil: function()
    {
        if (sg == 1)
        {
            this.scene.start('medusaSadgeScene');
        }
        else
        {
            this.message("No! You shouldn't look\nat my eyes!", 850, 1850);
        }
    },

    swag: function()
    {
        sg = 1;
        shades.destroy();
    },

    message: function(text, xCoord, yCoord)
    {
        var msg = this.add.text(xCoord,yCoord,text,{ font: "20px Bradley Hand", fill: "#000000", backgroundColor: "#fddab9"});
        msg.visible = true
        setTimeout(() => { msg.visible = false; }, 1000);
    }
});

var medusaSadgeScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function medusaSadgeScene ()
    {
        Phaser.Scene.call(this, {key: 'medusaSadgeScene'});
    },

    preload: function()
    {
        this.load.image('stats','assets/statueGarden.png');
        this.load.spritesheet('meduswag', 'assets/medusaSwag.png', { frameWidth: 64, frameHeight: 64 });
        this.load.image('tt1', 'assets/tt1.png');
        this.load.image('tt2', 'assets/tt2.png');
        this.load.image('tt3', 'assets/tt3.png');
    },

    create: function()
    {
        this.add.image(400, 300, 'stats').setScale(1.5);
        this.physics.add.sprite(150, 380, 'meduswag').setScale(8);

        var style = { font: "30px Bradley Hand", fill: "#000000", backgroundColor: "#fddab9"};
        var txtOne = this.add.text(400, 75, "Thank you! Now you won't\nsee my eyes.", style);
        setTimeout(() => { txtOne.visible = false; }, 6000);
        setTimeout(() => { txtTwo = this.add.text(400, 75, "If you could, you'd be\nturned into stone.", style); }, 6000);
        setTimeout(() => { txtTwo.visible = false; }, 12000);
        setTimeout(() => { txtThr = this.add.text(400, 75, "Athena did this to me. I did\nnothing wrong!", style); }, 12000);
        setTimeout(() => { txtThr.visible = false; }, 18000);
        setTimeout(() => { txtFour = this.add.text(400, 75, "Poseidon and I were in her\ntemple but I never wanted\nanything to do with him!", style); }, 18000);
        setTimeout(() => { txtFour.visible = false; }, 28000);

        setTimeout(() => { this.add.image(400, 300, 'tt3').setScale(1.2); }, 28000);
        setTimeout(() => { this.add.image(400, 300, 'tt2').setScale(1.2); }, 29000);
        setTimeout(() => { this.add.image(400, 300, 'tt1').setScale(1.2); }, 30000);

        setTimeout(() => {this.scene.start('profsThree');}, 31000);
    },

    update: function() {}
});

var profsThree = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function profsThree ()
    {
        Phaser.Scene.call(this, {key: 'profsThree'});
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
        var txtOne = this.add.text(100, 100, "Athena had turned the beautiful\nmaiden's hair into snakes.", style);
        setTimeout(() => { txtOne.visible = false; }, 7000);
        setTimeout(() => { txtTwo = this.add.text(100, 100, "Medusa's eyes now turned those\nthat met them into stone.", style); }, 7000);
        setTimeout(() => { txtTwo.visible = false; }, 11000);
        setTimeout(() => { txtThr = this.add.text(100, 100, "Unfortunately, there was more to\npoor Medusa's story.", style); }, 11000);
        setTimeout(() => { txtThr.visible = false; }, 20000);

        setTimeout(() => { this.add.image(400, 300, 'tt1').setScale(1.2); }, 20000);
        setTimeout(() => { this.add.image(400, 300, 'tt2').setScale(1.2); }, 21000);
        setTimeout(() => { this.add.image(400, 300, 'tt3').setScale(1.2); }, 22000);

        setTimeout(() => {this.scene.start('perseusSceneStart');}, 23000);
    },

    update: function() {}
});

var perseusSceneStart = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function perseusSceneStart ()
    {
        Phaser.Scene.call(this, {key: 'perseusSceneStart'});
    },

    preload: function()
    {
        this.load.image("tiles", "assets/magecity.png");
        this.load.tilemapTiledJSON("mapPer", "assets/perseus.json");
        this.load.spritesheet('p', 'assets/utplayer.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('sss', 'assets/sss.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('percy', 'assets/perseus.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('head', 'assets/medHead.png', { frameWidth: 64, frameHeight: 64 });
    },

    create: function()
    {
        var map = this.make.tilemap({ key: "mapPer" });

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        var tileset = map.addTilesetImage("magecity", "tiles");
        var belowLayer = map.createStaticLayer("Below", tileset);
        var worldLayer = map.createStaticLayer("World", tileset);

        player = this.physics.add.sprite(1700, 2300, 'p').setSize(24,40).setOffset(20,20);
        worldLayer.setCollisionByExclusion([-1]);
        this.physics.add.collider(player, worldLayer);

        percy = this.physics.add.sprite(1400, 1600, 'percy').setScale(1.5).setSize(30,40).setOffset(12,20);
        head = this.physics.add.sprite(1350, 1650, 'head').setScale(1.5).setSize(30,20).setOffset(12,20);
        this.physics.add.collider(player, percy, this.meetHead, false, this);
        this.physics.add.collider(player, head, this.meetHead, false, this);

        var style = { font: "20px Bradley Hand", fill: "#000000", backgroundColor: "#fddab9"};
        this.add.text(1400, 2250, "Those snakes look\ndangerous. But why\nare they so restless?", style);

        var sneks = this.physics.add.group();
        this.physics.add.collider(sneks, worldLayer);
        s1 = sneks.create(1700, 2200, 'sss').setSize(40,14).setOffset(10,34);
        s1.setVelocityX(65);
        s1.setBounce(1);
        s2 = sneks.create(1800, 2100, 'sss').setSize(40,14).setOffset(10,34);
        s2.setVelocityX(65);
        s2.setBounce(1);
        s3 = sneks.create(1850, 2350, 'sss').setSize(40,14).setOffset(10,34);
        s3.setVelocityX(65);
        s3.setBounce(1);
        s4 = sneks.create(1550, 2400, 'sss').setSize(40,14).setOffset(10,34);
        s4.setVelocityX(65);
        s4.setBounce(1);
        s5 = sneks.create(1450, 1800, 'sss').setSize(40,14).setOffset(10,34);
        s5.setVelocityX(65);
        s5.setBounce(1);
        s6 = sneks.create(1500, 1900, 'sss').setSize(40,14).setOffset(10,34);
        s6.setVelocityX(65);
        s6.setBounce(1);
        s7 = sneks.create(1650, 2450, 'sss').setSize(40,14).setOffset(10,34);
        s7.setVelocityX(65);
        s7.setBounce(1);
        this.physics.add.collider(player, sneks, this.onMeetSnek, false, this);

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

    onMeetSnek: function(player, sneks)
    {
        player.x = 1700;
        player.y = 2300;
        sneks.setVelocityY(0);
        sneks.setVelocityX(65);
    },

    meetHead: function()
    {
        this.scene.start('percyHeadScene');
    }
});

var percyHeadScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function percyHeadScene ()
    {
        Phaser.Scene.call(this, {key: 'percyHeadScene'});
    },

    preload: function()
    {
        this.load.image('stats','assets/statueGarden.png');
        this.load.spritesheet('percy', 'assets/perseus.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('head', 'assets/medHead.png', { frameWidth: 64, frameHeight: 64 });
        this.load.image('tt1', 'assets/tt1.png');
        this.load.image('tt2', 'assets/tt2.png');
        this.load.image('tt3', 'assets/tt3.png');
    },

    create: function()
    {
        this.add.image(400, 300, 'stats').setScale(1.5);
        this.physics.add.sprite(650, 380, 'percy').setScale(8);
        this.physics.add.sprite(520, 520, 'head').setScale(5);

        var style = { font: "30px Bradley Hand", fill: "#000000", backgroundColor: "#fddab9"};
        var txtOne = this.add.text(100, 75, "In the name of Athena, the\nmonster has been slain by\nPerseus himself!", style);
        setTimeout(() => { txtOne.visible = false; }, 6000);
        setTimeout(() => { txtTwo = this.add.text(100, 75, "That's me, by the way.", style); }, 6000);
        setTimeout(() => { txtTwo.visible = false; }, 9000);
        setTimeout(() => { txtTwo = this.add.text(100, 75, "Careful not to look in her\neyes. They still hold her\nbeastly power.", style); }, 9000);
        setTimeout(() => { txtTwo.visible = false; }, 15000);

        setTimeout(() => { this.add.image(400, 300, 'tt3').setScale(1.2); }, 15000);
        setTimeout(() => { this.add.image(400, 300, 'tt2').setScale(1.2); }, 16000);
        setTimeout(() => { this.add.image(400, 300, 'tt1').setScale(1.2); }, 17000);

        setTimeout(() => {this.scene.start('profsFour');}, 18000);
    },

    update: function() {}
});

var profsFour = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function profsFour ()
    {
        Phaser.Scene.call(this, {key: 'profsFour'});
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
        var txtOne = this.add.text(100, 100, "Medusa was killed for being something\nthat she was forcefully turned into.", style);
        setTimeout(() => { txtOne.visible = false; }, 7000);
        setTimeout(() => { txtTwo = this.add.text(100, 100, "Her life was filled with undeserved suffering.", style); }, 7000);
        setTimeout(() => { txtTwo.visible = false; }, 11000);
        setTimeout(() => { txtThr = this.add.text(100, 100, "But even after death she was disrespected.", style); }, 11000);
        setTimeout(() => { txtThr.visible = false; }, 20000);

        setTimeout(() => { this.add.image(400, 300, 'tt1').setScale(1.2); }, 20000);
        setTimeout(() => { this.add.image(400, 300, 'tt2').setScale(1.2); }, 21000);
        setTimeout(() => { this.add.image(400, 300, 'tt3').setScale(1.2); }, 22000);

        setTimeout(() => {this.scene.start('shieldStartScene');}, 23000);
    },

    update: function() {}
});

var shieldStartScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function shieldStartScene ()
    {
        Phaser.Scene.call(this, {key: 'shieldStartScene'});
    },

    preload: function()
    {
        this.load.image('posBG', 'assets/athenatemple.png');
        this.load.spritesheet('percy', 'assets/perseus.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('head', 'assets/medHead.png', { frameWidth: 64, frameHeight: 64 });
    },

    create: function()
    {
        this.add.image(400, 300, 'posBG').setScale(3.55);
        this.physics.add.sprite(650, 380, 'percy').setScale(8);
        this.physics.add.sprite(520, 520, 'head').setScale(5);

        var style = { font: "30px Bradley Hand", fill: "#000000", backgroundColor: "#fddab9"};
        var txtOne = this.add.text(100, 75, "Now that we're back at Athena's temple,\ndo me a favor, will you?", style);
        setTimeout(() => { txtOne.visible = false; }, 6000);
        setTimeout(() => { txtTwo = this.add.text(100, 75, "Go put this head on the empty\npedestal next to her fountain.", style); }, 6000);
        setTimeout(() => { txtTwo.visible = false; }, 13000);
        setTimeout(() => { txtThr = this.add.text(100, 75, "I'm sure she'll have some use for\nit. Talk to her after!", style); }, 13000);
        setTimeout(() => { txtThr.visible = false; }, 19000);

        setTimeout(() => {this.scene.start('athenaScene');}, 19000);
    },

    update: function() {}
});

var athenaScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function athenaScene ()
    {
        Phaser.Scene.call(this, {key: 'athenaScene'});
    },

    preload: function()
    {
        this.load.image("tiles", "assets/magecity.png");
        this.load.tilemapTiledJSON("mapPos", "assets/poseidon.json");
        this.load.spritesheet('p', 'assets/utplayer.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('percy', 'assets/perseus.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('athena', 'assets/athena.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('head', 'assets/medHead.png', { frameWidth: 64, frameHeight: 64 });
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

        var aboveLayer = map.createStaticLayer("Above", tileset);

        dummy = this.physics.add.sprite(1775, 2325, 'p').setSize(34,62).setOffset(20,10);
        dummy.visible = false;
        dummy.body.immovable = true;
        this.physics.add.collider(player, dummy, this.onMeetPedestal, false, this);

        percy = this.physics.add.sprite(2150, 2200, 'percy').setScale(1.5).setSize(30,40).setOffset(20,20);
        percy.body.immovable = true;
        this.physics.add.collider(player, percy, this.onMeetPercy, false, this);

        head = this.physics.add.sprite(2100, 2225, 'head').setScale(1.5).setSize(30,20).setOffset(12,20);
        this.physics.add.collider(player, head, this.onMeetHead, false, this);

        athena = this.physics.add.sprite(1650, 1900, 'athena').setScale(1.5).setSize(40,40).setOffset(10,20);
        athena.body.immovable = true;
        this.physics.add.collider(player, athena, this.onMeetAthena, false, this);

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

    onMeetPercy: function()
    {
        var style = { font: "20px Bradley Hand", fill: "#000000", backgroundColor: "#fddab9"};
        var txt = this.add.text(2050, 2100, "Get this head to the\nempty pedestal,\nthen talk to Athena!", style);
        setTimeout(() => { txt.visible = false; }, 3000);
    },

    onMeetHead: function()
    {
        head.destroy();
        head = 1;
    },

    onMeetPedestal: function()
    {
        if (head == 1)
        {
            this.physics.add.sprite(1775, 2325, 'head').setScale(1.5).setSize(30,40).setOffset(20,20);
            head = 2;
        }
        else
        {
            var style = { font: "20px Bradley Hand", fill: "#000000", backgroundColor: "#fddab9"};
            var txt = this.add.text(1775, 2250, "So this is where the head goes!", style);
            setTimeout(() => { txt.visible = false; }, 3000);
        }
    },

    onMeetAthena: function()
    {
        if (head == 2)
        {
            this.scene.start('athenaShieldScene');
        }
        else
        {
            var style = { font: "20px Bradley Hand", fill: "#000000", backgroundColor: "#fddab9"};
            var txt = this.add.text(1650, 1800, "Do not speak to me\nwithout a reason!", style);
            setTimeout(() => { txt.visible = false; }, 3000);
        }
    }
});

var athenaShieldScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function athenaShieldScene ()
    {
        Phaser.Scene.call(this, {key: 'athenaShieldScene'});
    },

    preload: function()
    {
        this.load.image('posBG', 'assets/athenatemple.png');
        this.load.spritesheet('athena', 'assets/athena.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('shield', 'assets/shield.png', { frameWidth: 64, frameHeight: 64 });
        this.load.image('tt1', 'assets/tt1.png');
        this.load.image('tt2', 'assets/tt2.png');
        this.load.image('tt3', 'assets/tt3.png');
    },

    create: function()
    {
        this.add.image(400, 300, 'posBG').setScale(3.55);
        this.physics.add.sprite(650, 380, 'athena').setScale(8);
        this.physics.add.sprite(550, 500, 'shield').setScale(4);

        var style = { font: "30px Bradley Hand", fill: "#000000", backgroundColor: "#fddab9"};
        var txtOne = this.add.text(100, 75, "I put Medusa's head on my shield!", style);
        setTimeout(() => { txtOne.visible = false; }, 6000);
        setTimeout(() => { txtTwo = this.add.text(100, 75, "With this, I can further\nterrorize my enemies.", style); }, 6000);
        setTimeout(() => { txtTwo.visible = false; }, 13000);
        setTimeout(() => { txtThr = this.add.text(100, 75, "My strength grows by the day!", style); }, 13000);
        setTimeout(() => { txtThr.visible = false; }, 19000);

        setTimeout(() => { this.add.image(400, 300, 'tt3').setScale(1.2); }, 19000);
        setTimeout(() => { this.add.image(400, 300, 'tt2').setScale(1.2); }, 20000);
        setTimeout(() => { this.add.image(400, 300, 'tt1').setScale(1.2); }, 21000);

        setTimeout(() => {this.scene.start('profsFive');}, 22000);
    },

    update: function() {}
});

var profsFive = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function profsFive ()
    {
        Phaser.Scene.call(this, {key: 'profsFive'});
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
        var txtOne = this.add.text(100, 100, "Medusa was a victim throughout\nher life, and even into her death.", style);
        setTimeout(() => { txtOne.visible = false; }, 7000);
        setTimeout(() => { txtTwo = this.add.text(100, 100, "She was raped, punished for it,\nkilled for her punishment, then\nher body was disrespected.", style); }, 7000);
        setTimeout(() => { txtTwo.visible = false; }, 15000);
        setTimeout(() => { txtThr = this.add.text(100, 100, "Garbati's statue here serves as an\nicon to the women who fight for\ntheir respect and safety in society.", style); }, 15000);
        setTimeout(() => { txtThr.visible = false; }, 23000);
        setTimeout(() => { txtFour = this.add.text(100, 100, "Though this is the case, it's important\nto remember that even this statue\nis controversial due to its nudity.", style); }, 23000);
        setTimeout(() => { txtFour.visible = false; }, 30000);
        setTimeout(() => { txtFive = this.add.text(100, 100, "Whether you find this piece to be ill-advised\nor empowering, it's important that you know\nits Greek origins.", style); }, 30000);
        setTimeout(() => { txtFive.visible = false; }, 37000);
        setTimeout(() => { txtFive = this.add.text(100, 100, "Congrats on completing the Medusa module!\nSee you later.", style); }, 37000);
        setTimeout(() => { txtFive.visible = false; }, 42000);

        setTimeout(() => { this.scene.start('baseScene'); }, 42000);
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
            debug: false
        }
    },
    scene: [bootScene, profsIntro, baseScene, medusaStartScene, profsOne, poseidonSceneStart, templeScene, medusaPoseidonScene, profsTwo, sunglassesSceneStart, medusaSadgeScene, profsThree, perseusSceneStart, percyHeadScene, profsFour, shieldStartScene, athenaScene, athenaShieldScene, profsFive]
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