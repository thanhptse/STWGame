var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [
        BootScene,
        TitleScene,
        GameScene,
        UIScene,
    ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                y: 0,
            }
        }
    },
    pixelArt: true,
    roundPixcels: true,
};

var game = new Phaser.Game(config);
