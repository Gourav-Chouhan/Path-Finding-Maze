const cvs = document.getElementById("cvs");
const ctx = cvs.getContext("2d");
const cw = cvs.width;
const ch = cvs.height;
const FPS = 600;
const n = 20;
const unit = cw / n;
let grid = [];
let color = ["black", "white"];
for (let i = 0; i < n; i++) {
    grid[i] = [];
    for (let j = 0; j < n; j++) {
        grid[i][j] = color[Math.floor(Math.random() * color.length)];
    }
}

function draw() {
    drawGrid();
    //canvas();
}

function drawGrid() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            ctx.fillStyle = grid[i][j];
            ctx.fillRect(i * unit, j * unit, unit, unit);
            // ctx.strokeRect(i * unit, j * unit, unit, unit);
        }
    }
}

function change_color(x, y) {
    let ccolor = grid[x][y];
    let itr = 0;
    for (let i = 0; i < color.length; i++) {
        if (color[i] == ccolor) {
            itr = i;
            break;
        }
    }
    grid[x][y] = color[++itr % color.length];
    return "yellow";
}

document.addEventListener("click", function(event) {
    let x = Math.floor((event.clientX - cvs.offsetLeft) / unit);
    let y = Math.floor((event.clientY - cvs.offsetTop) / unit);
    console.log(x + " " + y);
    change_color(x, y);
    // floodFill(x, y, grid[x][y], "#26ff00");
    //if (x == 0 && y == 9) ratinMaze(0, 0);
    //grid[x][y] = "red"; //color[Math.floor(Math.random() * color.length)];
    //grid[Math.floor(Math.random() * n)][Math.floor(Math.random() * n)] = color[Math.floor(Math.random() * color.length)];
});

// let mouse_is_down = false;

// document.addEventListener("mousedown", function(event) { mouse_is_down = true; });


// document.addEventListener("mousemove", function(event) {

//     // mouse_is_down = true;
//     if (mouse_is_down) {
//         let x = Math.floor((event.clientX - cvs.offsetLeft) / unit);
//         let y = Math.floor((event.clientY - cvs.offsetTop) / unit);
//         grid[x][y] = "black";
//         //change_color(x, y);
//     }
//     // // let count = 1000;
//     // while (count--) {
//     //     let x = Math.floor((event.clientX - cvs.offsetLeft) / unit);
//     //     let y = Math.floor((event.clientY - cvs.offsetTop) / unit);
//     //     change_color(x, y);
//     // }
// });

// document.addEventListener("mouseup", function() { mouse_is_down = false; });

// function paint(event) {
//     if (mouse_is_down) {
//         console.log("Hi ");
//         // let x = Math.floor((event.clientX - cvs.offsetLeft) / unit);
//         // let y = Math.floor((event.clientY - cvs.offsetTop) / unit);
//         // change_color(x, y);
//     }
// }


// setInterval(paint, 1000 / FPS);


function isSafe(x, y) {
    if (x < 0 || x > n - 1 || y < 0 || y > n - 1) return false;
    if (grid[x][y] != "white") return false;
    return true;
}

function ratinMaze(x, y) {
    if (x == n - 1 && y == n - 1) {
        grid[x][y] = "#26ff00";
        return true;
    }
    if (isSafe(x, y)) {
        grid[x][y] = "#26ff00";
        if (ratinMaze(x + 1, y)) {
            return true;
        }
        if (ratinMaze(x, y + 1)) {
            return true;
        }
        if (ratinMaze(x - 1, y)) {
            return true;
        }
        if (ratinMaze(x, y - 1)) {
            return true;
        }
        grid[x][y] = "red";
    }
    return false;
}

function floodFill(x, y, oc, color_to_be_filled) {
    if (x < 0 || x > n - 1 || y < 0 || y > n - 1) return;
    if (oc != grid[x][y] || oc == color_to_be_filled) return;
    grid[x][y] = color_to_be_filled;
    floodFill(x + 1, y, oc, color_to_be_filled);
    floodFill(x - 1, y, oc, color_to_be_filled);
    floodFill(x, y + 1, oc, color_to_be_filled);
    floodFill(x, y - 1, oc, color_to_be_filled);
    return;
}

function go_rat_go() {
    ratinMaze(0, 0);
}

function canvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
}

setInterval(draw, 1000 / FPS);