class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        // load images
        this.loadImages();

        // load spritesheets
        this.loadSpritesheets();

        // load audio
        this.loadAudio();

        // load tile map
        this.loadTileMap();
    }

    loadImages() {
        this.load.image('button1', 'assets/images/ui/blue_button01.png')
        this.load.image('button2', 'assets/images/ui/blue_button02.png')

        //load the map tileset image
        this.load.image('background', 'assets/maps/background-extruded.png')
    }

    loadSpritesheets() {
        this.load.spritesheet('items', 'assets/images/items.png', {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet('characters', 'assets/images/characters.png', {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet('monsters', 'assets/images/monsters.png', {
            frameWidth: 32,
            frameHeight: 32
        })
    }

    loadAudio() {
        this.load.audio('goldSound', ['assets/audio/Pickup.wav'])
        this.load.audio('enemyDeath', ['assets/audio/EnemyDeath.wav'])
        this.load.audio('playerAttack', ['assets/audio/PlayerAttack.wav'])
        this.load.audio('playerDamage', ['assets/audio/PlayerDamage.wav'])
        this.load.audio('playerDeath', ['assets/audio/PlayerDeath.wav'])
    }

    create() {
        this.scene.start('Game');
    }

    loadTileMap() {
        this.load.tilemapTiledJSON('map', 'assets/maps/large_level.json')
    }

}

