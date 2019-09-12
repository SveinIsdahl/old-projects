var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
let cursors;
function preload() {
    this.load.image("background", "assets/bilder/background.png");
    this.load.image("papyrus", "assets/bilder/papyrus.png");
    this.load.image("sans", "assets/bilder/sans.png");
    this.load.image("bakke", "assets/bilder/bakke.png")
}

function create() {

    this.add.image(300, 200, "background");

    let pap = this.add.image(500, 273, "papyrus");
    pap.setScale(.08);

    let platform = this.physics.add.staticGroup();
    platform.create(300, 350, 'bakke').setScale(.1).refreshBody();
    player = this.physics.add.sprite(100, 100, 'sans');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.setScale(0.05);
    player.setSize(30, 30, true);
    player.body.setGravityY(100);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    this.physics.add.collider(player, platform);


}

function update() {
    cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
        player.setVelocityX(-160);

    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);

    }
    else {
        player.setVelocityX(0);

    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
    if (cursors.left.isDown && cursors.right.isDown) {
        player.setVelocityX(0);
    }
}