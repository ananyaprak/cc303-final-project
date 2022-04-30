var cursors;
var keyA, keyS, keyD, keyW;
var up, down, left, right;

var bootScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function bootScene ()
    {
        Phaser.Scene.call(this, { key: "bootScene" });
    },

    preload: function () {},
	
    create: function ()
    {
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

        this.scene.start("baseScene");
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
    },

    create: function()
    {
        var map = this.make.tilemap({ key: "map" });

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        var tileset = map.addTilesetImage("magecity", "tiles");
        var worldLayer = map.createStaticLayer("World", tileset);
        var belowLayer = map.createStaticLayer("Below", tileset);

        player = this.physics.add.sprite(1630, 1520, 'p').setSize(24,40);
        worldLayer.setCollisionByExclusion([-1]);
        this.physics.add.collider(player, worldLayer);

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
    },

    update: function() {}
});

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {},
            debug: false
        }
    },
    scene: [bootScene, baseScene, statueScene]
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