const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
let lives = 3;
let zombies = [];
let bullets = [];
let gameOver = false;
let sadMusic = new Audio("images/sad-music.mp3");

const zombieSheet = new Image();
zombieSheet.src = "images/walkingdead.png"; 

const heartFullImg = new Image();
heartFullImg.src = "images/full_heart.png";  

const heartEmptyImg = new Image();
heartEmptyImg.src = "images/empty_heart.png";

const crosshairImg = new Image();
crosshairImg.src = "images/aim.png";  

const backgroundImg = new Image();
backgroundImg.src = "images/board-bg.jpg"; 

// Start gry
function startGame() {
    document.querySelector('.game-over').style.display = "none";
    score = 0;
    lives = 3;
    zombies = [];
    bullets = [];
    gameOver = false;
    sadMusic.pause();
    sadMusic.currentTime = 0;
    spawnZombie();
    requestAnimationFrame(updateGame);
}

// Spawnowanie zombie
function spawnZombie() {
    if (!gameOver) {
        const originalWidth = 50;  
        const originalHeight = 50; 
        
        // Losujemy rozmiar zombie
        const sizeFactor = Math.random() * 2 + 2; 

        
        const minY = canvas.height - 200;  // Minimalna pozycja Y
        const maxY = canvas.height - 100;  // Maksymalna pozycja Y

        const zombie = {
            x: canvas.width, 
            y: Math.random() * (maxY - minY) + minY, 
            width: originalWidth * sizeFactor,
            height: originalHeight * sizeFactor, 
            speed: Math.random() * 2 + 1,  // Losowa prędkość
            animationFrame: 0, 
        };

        zombies.push(zombie);
        setTimeout(spawnZombie, Math.random() * 3000 + 1000);  
    }
}

let crosshairX = canvas.width / 2;  
let crosshairY = canvas.height / 2;

canvas.addEventListener("mousemove", function(e) {
    // Pobieranie pozycji kursora myszy
    crosshairX = e.clientX - canvas.offsetLeft;
    crosshairY = e.clientY - canvas.offsetTop;
});

// Strzelanie
canvas.addEventListener("click", function(e) {
    if (gameOver) return;

    const bullet = {
        x: 50,
        y: e.clientY - canvas.offsetTop,
        speed: 5,
    };
    bullets.push(bullet);

    // czy zombie został trafiony
    zombies.forEach((zombie, index) => {
        if (
            e.clientX > zombie.x && e.clientX < zombie.x + zombie.width &&
            e.clientY > zombie.y && e.clientY < zombie.y + zombie.height
        ) {
            zombies.splice(index, 1);  // Usunięcie trafionego zombie
            score += 20;
        }
    });
});

function drawGame() {
    // tło
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

    // serca
    for (let i = 0; i < 3; i++) {
        const heartImage = i < lives ? heartFullImg : heartEmptyImg;
        ctx.drawImage(heartImage, 20 + i * 40, 20, 30, 30);
    }

    // animacja zombie
    zombies.forEach(zombie => {
        const frameWidth = zombieSheet.width / 10; 
        const frameHeight = zombieSheet.height;
        ctx.drawImage(zombieSheet, zombie.animationFrame * frameWidth, 0, frameWidth, frameHeight, zombie.x, zombie.y, zombie.width, zombie.height);
        zombie.animationFrame = (zombie.animationFrame + 1) % 10; 
    });

    // Rysowanie punktów
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + score, canvas.width - 150, 40);

    // Rysowanie celownika
    ctx.drawImage(crosshairImg, crosshairX - 75, crosshairY - 75, 150, 150);
}

// Rysowanie pocisków
function drawBullets() {
    bullets.forEach((bullet, index) => {
        bullet.x += bullet.speed;
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();

        // czy pocisk trafił w zombie
        zombies.forEach((zombie, zombieIndex) => {
            if (bullet.x > zombie.x && bullet.x < zombie.x + zombie.width && bullet.y > zombie.y && bullet.y < zombie.y + zombie.height) {
                zombies.splice(zombieIndex, 1);  // Usuwanie zombie po trafieniu
                bullets.splice(index, 1);  
                score += 20; 
            }
        });
    });
}

// Rysowanie zombie i ich ruch
function gameState() {
    zombies.forEach((zombie, index) => {
        zombie.x -= zombie.speed;


        console.log(`Zombie position: ${zombie.x}, ${zombie.y}, speed: ${zombie.speed}`);

        // czy zombie dotrał do gracza
        if (zombie.x < 0) {
            zombies.splice(index, 1);
            lives -= 1;
        }

        // Porażka
        if (lives <= 0) {
            gameOver = true;
            sadMusic.play();  // Smutna muzyka
            document.querySelector('.game-over').style.display = "block";
        }
    });
}

// Aktualizacja gry
function updateGame() {
    if (gameOver) return;

    gameState();
    drawBullets();
    drawGame();
    requestAnimationFrame(updateGame);
}

// Restart gry
function restartGame() {
    startGame();
}

// Rozpoczynanie gry po załadowaniu strony
startGame();

// Dopasowanie rozmiaru kanwy do pełnego ekranu
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});