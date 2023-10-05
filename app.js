const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d'); // Creating our context

canvas.width = 1024;
canvas.height = 576;

// Parsing the collisions map
const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}

const boundaries = []
const offset = {
    x: -543,
    y: -320,
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            boundaries.push(new Boundary({ position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
            } }))
        }
    })
})
console.log(boundaries);

const mapImage = new Image();
mapImage.src = './img/Porygon_Digital_Dimensions_Map.png';

const foregroundImage = new Image();
foregroundImage.src = './img/forgroundObjects.png';

const playerImage = new Image();
playerImage.src = './img/playerDown.png';



// canvas.width / 2 - this.image.width / 4 + 26, 
// canvas.height / 2 - this.image.height / 2,

const player = new Sprite({
    position: {
        x: canvas.width / 2 - playerImage.width / 4 + 26,
        y: canvas.height / 2 - playerImage.height / 2,
    },
    image: playerImage,
    frames: {
        max: 4,
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: mapImage
});

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: foregroundImage
});

const keys = {
    up: {
        pressed: false,
    },
    right: {
        pressed: false,
    },
    down: {
        pressed: false,
    },
    left: {
        pressed: false,
    },
}

const rectCollision = ({ rect1, rect2 }) => {
    return (
        rect1.position.x + rect1.width >= rect2.position.x && 
        rect1.position.x <= rect2.position.x + rect2.width && 
        rect1.position.y <= rect2.position.y + rect2.height && 
        rect1.position.y + rect1.height >= rect2.position.y
    )
}

const moveables = [background, ...boundaries, foreground,]

function animate() {
    window.requestAnimationFrame(animate);
    background.draw();
    boundaries.forEach((boundary) => {
        boundary.draw()
    })
    player.draw()
    foreground.draw()
    

    let moving = true;

    // Movement of player with arrow keys
   if (keys.up.pressed && lastKey === "up") {
    for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (
          rectCollision({
            rect1: player,
            rect2: {
              ...boundary,
              position: {
                x: boundary.position.x,
                y: boundary.position.y + 3
              }
            }
          })
        ) {
          moving = false
          break
        }
      }
  
      if (moving)
        moveables.forEach((moveable) => {
          moveable.position.y += 3
        })
    }
   else if (keys.right.pressed && lastKey === "right") {
    for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (
          rectCollision({
            rect1: player,
            rect2: {
              ...boundary,
              position: {
                x: boundary.position.x - 3,
                y: boundary.position.y, 
              }
            }
          })
        ) {
          moving = false
          break
        }
      }
  
      if (moving)
        moveables.forEach(moveable => moveable.position.x -= 3)
    }
   else if (keys.down.pressed && lastKey === "down") {
    for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (
          rectCollision({
            rect1: player,
            rect2: {
              ...boundary,
              position: {
                x: boundary.position.x,
                y: boundary.position.y - 3, 
              }
            }
          })
        ) {
          moving = false
          break
        }
      }
  
      if (moving)
        moveables.forEach(moveable => moveable.position.y -= 3)
    }
   else if (keys.left.pressed && lastKey === "left") {
    for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (
          rectCollision({
            rect1: player,
            rect2: {
              ...boundary,
              position: {
                x: boundary.position.x + 3,
                y: boundary.position.y, 
              }
            }
          })
        ) {
          moving = false
          break
        }
      }
  
      if (moving)
        moveables.forEach(moveable => moveable.position.x += 3)
    }
   
}
animate()

let lastKey = "";
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            keys.up.pressed = true;
            lastKey = "up";
            break
        
        case "ArrowRight":
            keys.right.pressed = true;
            lastKey = "right";
            break
            
        case "ArrowDown":
            keys.down.pressed = true;
            lastKey = "down";
            break
                
        case "ArrowLeft":
            keys.left.pressed = true;
            lastKey = "left";
            break
    }
});

window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "ArrowUp":
            keys.up.pressed = false;
            break
        
        case "ArrowRight":
            keys.right.pressed = false;
            break
            
        case "ArrowDown":
            keys.down.pressed = false;
            break
                
        case "ArrowLeft":
            keys.left.pressed = false;
            break
    }
});

