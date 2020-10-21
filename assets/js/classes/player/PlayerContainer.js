const Direction = {
    RIGHT: 'RIGHT',
    LEFT: 'LEFT',
    UP: 'UP',
    DOWN: 'DOWN',
};

class PlayerContainer extends Phaser.GameObjects.Container {

    constructor(scene, x, y, key, frame, health, maxHealth, id, attackAudio) {
        super(scene, x, y);
        this.scene = scene;
        this.velocity = 300;
        this.currentDirection = Direction.RIGHT;
        this.playerAttacking = false;
        this.flipX = true;
        this.swordHit = false;
        this.health = health;
        this.maxHealth = maxHealth;
        this.id = id;

        this.setSize(64, 64);
        this.scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.scene.add.existing(this);
        this.scene.cameras.main.startFollow(this); // make the camera follow the player

        this.player = new Player(this.scene, 0, 0, key, frame);
        this.add(this.player);

        this.weapon = this.scene.add.image(40, 0, 'items', 4)
        this.scene.add.existing(this.weapon);
        this.weapon.setScale(1.5);
        this.scene.physics.world.enable(this.weapon);
        this.add(this.weapon);
        this.weapon.alpha = 0;
        this.createHealthBar();
        this.attackAudio = attackAudio;
    }

    update(cursors) {
        this.body.setVelocity(0);

        if (cursors.left.isDown) {
            this.currentDirection = Direction.LEFT;
            this.body.setVelocityX(-this.velocity)
            this.weapon.setPosition(-40, 0);
            this.player.flipX = false;
        } else if (cursors.right.isDown) {
            this.currentDirection = Direction.RIGHT;
            this.body.setVelocityX(this.velocity)
            this.weapon.setPosition(40, 0);
            this.player.flipX = true;
        }

        if (cursors.up.isDown) {
            this.currentDirection = Direction.UP;
            this.body.setVelocityY(-this.velocity)
            this.weapon.setPosition(0, -40);
        }
        else if (cursors.down.isDown) {
            this.currentDirection = Direction.DOWN;
            this.body.setVelocityY(this.velocity)
            this.weapon.setPosition(0, 40);
        }

        if (Phaser.Input.Keyboard.JustDown(cursors.space) && !this.playerAttacking) {
            this.weapon.alpha = 1;
            this.playerAttacking = true;
            this.attackAudio.play();
            this.scene.time.delayedCall(150, () => {
                this.weapon.alpha = 0;
                this.playerAttacking = false;
                this.swordHit = false;
            }, [], this);
        }

        if (this.playerAttacking) {
            if (this.weapon.flipX) {
                this.weapon.angle -= 10;
            } else {
                this.weapon.angle += 10;
            }
        } else {
            if (this.currentDirection === Direction.DOWN) {
                this.weapon.setAngle(-270);
            } else if (this.currentDirection === Direction.UP) {
                this.weapon.setAngle(-90);
            } else {
                this.weapon.setAngle(0);
            }
        }

        this.weapon.flipX = false;
        if (this.currentDirection === Direction.LEFT) {
            this.weapon.flipX = true;
        }

        this.updateHealthBar();
    }

    createHealthBar() {
        this.healthBar = this.scene.add.graphics();
        this.updateHealthBar();
    }

    updateHealthBar() {
        this.healthBar.clear();
        this.healthBar.fillStyle(0xffffff, 1);
        this.healthBar.fillRect(this.x - 32, this.y - 40, 64, 5);
        this.healthBar.fillGradientStyle(0xff0000, 0xffffff, 4);
        this.healthBar.fillRect(this.x - 32, this.y - 40, 64 * (this.health / this.maxHealth), 5);
    }

    updateHealth(health) {
        this.health = health;
        this.updateHealthBar();
    }

    respawn(playerObject){
        this.health = playerObject.health;
        this.setPosition(playerObject.x, playerObject.y);
        this.updateHealthBar();
    }
}