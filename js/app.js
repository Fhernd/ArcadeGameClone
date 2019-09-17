// Options for the toastr.
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "300",
    "timeOut": "1000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

// Messages when the user wins.
const MESSAGES = ['Awesome!', 'Great!', 'Outstanding!', 'Géniale!', 'Good!']

// Enemies our player must avoid
var Enemy = function (x, y, player) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.player = player;
    this.speed = 4 + Math.round(Math.random() * 10, 0);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.width = 75;
    this.height = 70;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * (1 + dt);

    if (this.x > 505){
        this.x = 0
        this.speed = 4 + Math.round(Math.random() * 10, 0);
    }

    this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check collisions against the player.
Enemy.prototype.checkCollisions = function () {
    if (this.x < this.player.x + this.player.width  && this.x + this.width  > this.player.x &&
		this.y < this.player.y + this.player.height && this.y + this.height > this.player.y) {
        this.player.relocate();
    }
}

/**
 * Represents a player in the game.
 */
class Player {
    /**
     * Creates a new player.
     * 
     * @param {string} sprite Represents the image to be drawn for the player.
     * @param {*} x Initial position for x.
     * @param {*} y Initial position for y.
     */
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 70;
    }

    /**
     * Updates the game and checks if the user has won.
     */
    update() {
        if (this.y <= 40){
            this.relocate();
            const location = Math.round(Math.random() * 4, 0);
            toastr["info"](MESSAGES[location]);
        }
    }

    /**
     * Renders the image.
     * 
     * @param {number} dt A time delta between ticks.
     */
    render(dt) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
     * Handles the keyboard from the user.
     * @param {string} key Key pressed.
     */
    handleInput(key) {
        if (key == 'up'){
            this.y -= 80;
        } else if (key == 'right' && this.x < 400){
            this.x += 100;
        } else if (key == 'down' && this.y < 300){
            this.y += 80;
        } else if (key == 'left' && this.x > 0){
            this.x -= 100;
        }
    }

    /**
     * Relocates the player to a random position in the green area.
     */
    relocate(){
        this.x = Math.round(Math.random() * 4, 0) * 100;
        this.y = 375;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const player = new Player('images/char-boy.png', 200, 375);
allEnemies.push(new Enemy(50, 50, player));
allEnemies.push(new Enemy(25, 130, player));
allEnemies.push(new Enemy(50, 210, player));

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
