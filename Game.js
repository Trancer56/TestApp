///<reference path="phaser.d.ts"/>
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('enemy', 'assets/enemy.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

var platforms;
var player;
var cursors;
var jump = false;
var scoreText;
var paused = true;
var gameOver = false;

function create() {
    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'enemy');
    ledge.body.immovable = true;

    ledge = platforms.create(400, -100, 'enemy');
    ledge.body.immovable = true;

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.gravity.y = 800;
    player.body.collideWorldBounds = true;

    cursors = game.input.keyboard.createCursorKeys();

    scoreText = game.add.text(16, 16, 'score: 0', { font: '32px arial', fill: '#000' });
}

function update() {
    player.animations.play('right');

    if (!paused) {
        platforms.x -= 2;

        //  Collide the player and the stars with the platforms
        if (game.physics.collide(player, platforms)) {
            gameOver = true;
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && !jump) {
            player.body.velocity.y = -200;
            jump = true;
        }
        if (cursors.up.isUp) {
            jump = false;
        }
    } else {
        player.body.y = 150;
        if (cursors.up.isDown)
            paused = false;
    }
    if (gameOver) {
        paused = true;
        platforms.x = 0;
        jump = false;
        gameOver = false;
    }
}
//# sourceMappingURL=game.js.map
