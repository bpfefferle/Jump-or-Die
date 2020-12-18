// Window must load before running JS.
window.onload = () => 
{
    // Initialize the canvas.
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Make canvas full screen.
    canvas.width = window.innerWidth/2;
    canvas.height = window.innerHeight/2;

    // Circle object.
    class circle 
    {
        constructor(x, y, radius, startAngle, endAngle, gravity)
        {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.startAngle = startAngle;
            this.endAngle = endAngle;
            this.gravity = gravity;
        }
    }

    // Rectangle object.
    class rectangle
    {
        constructor(x, y, width, height)
        {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
    }

    // Create shapes.
    let ground = new rectangle(0, canvas.height-100, canvas.width, 1000)
    let player = new circle(canvas.width/2, canvas.height-140, 40, 0, 2 * Math.PI, 9.8);
    let enemy = new circle(canvas.width+40, canvas.height-140, 40, 0, 2 * Math.PI, 9.8);

    // Game data.
    let jumpHeight = 215;
    let enemySpeed = 10;
    let playerLost = false;

    // Distance between enemy and player.
    let getDistance = (x1, y1, x2, y2) =>
        {
            let xDistance = x2 - x1;
            let yDistance = y2 - y1;

            return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
        }

    let rePaint = () =>
    {   
        // Clear canvas.
        ctx.clearRect(0,0,canvas.width,canvas.height);

        ground = new rectangle(0, canvas.height-100, canvas.width, 1000)
        player = new circle(canvas.width/2, canvas.height-140, 40, 0, 2 * Math.PI, 9.8);
        enemy = new circle(canvas.width+40, canvas.height-140, 40, 0, 2 * Math.PI, 9.8);

        // Sky.
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Ground.
        ctx.fillStyle = '#216543';
        ctx.fillRect(ground.x, ground.y, ground.width, ground.height);

        // Player.
        ctx.beginPath();
        ctx.arc(player.x, player.y, player.radius, player.startAngle, player.endAngle);
        ctx.fillStyle = '#000000';
        ctx.fill();
        
        // Enemy.
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.radius, enemy.startAngle, enemy.endAngle);
        ctx.fillStyle = '#990000';
        ctx.fill(); 
    }

    // Set game over.
    let gameOver = () =>
    {
        playerLost = true;
        ctx.textAlign = "center";
        ctx.font = "100px Arial";
        ctx.fillStyle = "#30343F";
        ctx.fillText("Game over!", canvas.width/2, canvas.height/2);
        document.getElementById('btnPlayGame').innerHTML = 'Try again';
        document.getElementById('btnPlayGame').disabled = false;
    }

    // Game loop.
    let playGame = () =>
    {  
        playerLost = false;
        document.getElementById('btnPlayGame').innerHTML = 'Play Game';
        document.getElementById('btnPlayGame').disabled = true;

        // Key event.
        document.onkeydown = checkKey;
        function checkKey(e)
        {
            e = e || window.event;

            // Jump up.
            if (e.keyCode == '87')
            {   
                if (player.y + player.radius >= canvas.height-100) {
                    player.y -= jumpHeight;  
                }
            } 
            if (e.keyCode == '38')
            {
                player.y -= jumpHeight;
            } 
        }

        // Gravity.
        player.y += player.gravity;  
        enemy.y += enemy.gravity;

        if (player.y + player.radius >= canvas.height-100) {
            player.gravity = 0;
        }
        else
        {
            player.gravity = 9.8;
        }
        if (enemy.y + enemy.radius >= canvas.height-100) {
            enemy.gravity = 0;
        }

        if (player.y - player.radius < 0)
        {
            player.y += jumpHeight;
        }

        // Sky.
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Ground.
        ctx.fillStyle = '#216543';
        ctx.fillRect(ground.x, ground.y, ground.width, ground.height);

        // Player.
        ctx.beginPath();
        ctx.arc(player.x, player.y, player.radius, player.startAngle, player.endAngle);
        ctx.fillStyle = '#000000';
        ctx.fill();
        
        // Enemy.
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.radius, enemy.startAngle, enemy.endAngle);
        ctx.fillStyle = '#990000';
        ctx.fill(); 

        // Enemy movement.
        if (enemy.x - enemy.radius > -60)
        {
            enemy.x -= enemySpeed;
        }
        else 
        {
            enemy.x = canvas.width+100;
            enemy.y = canvas.height-140;
        }

        // Player death check.
        if (getDistance(player.x, player.y, enemy.x, enemy.y) < enemy.radius + player.radius)
        {
            gameOver();
        }
        
        if(playerLost) return;

        // 60 frames per second.
        window.requestAnimationFrame(playGame);
    }

    // Play game button.
    document.getElementById('btnPlayGame').addEventListener('click', () => 
    {   
        rePaint();
        playGame();
    })

    rePaint();

} // END of window.onload.
