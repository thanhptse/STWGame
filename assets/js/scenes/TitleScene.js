class TitleScene extends Phaser.Scene {
    constructor() {
        super('Title');
    }
    create() {
        this.titleText = this.add.text(this.scale.width / 2, this.scale.height / 2, 'STW Game', {
            fontSize: '64px',
            fill: '#fff'
        })
        this.titleText.setOrigin(0.5);

        this.startGameButton = new UIButton(this, this.scale.width / 2, this.scale.height * 0.65, 'button1', 'button2', 'Start', () => {
            this.scene.start('Game');
        })
    }
}