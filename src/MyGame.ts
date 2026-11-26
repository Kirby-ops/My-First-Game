// MyGame - Example implementation of Game interface

import { Game, GameFramework } from "./index.js";

class MyGame extends Game {
    private readonly width: number = 800;
    private readonly height: number = 600;
    private readonly size: number = 50;

    // Jeder Block ist nur ein einfaches Objekt mit Position, Geschwindigkeit und Farbe
    private blocks = [
        { x: 0,   y: 0, speedX: 100,  speedY: 100, color: "purple" },
        { x: 700, y: 0, speedX: -150, speedY: 80,  color: "pink" },
    ];

    init(): void {

    }

    update(deltaTime: number): void {
        for (const b of this.blocks) {
            b.x += deltaTime * b.speedX;
            b.y += deltaTime * b.speedY;

            // Linke / rechte Wand
            if (b.x < 0)                       { b.x = 0;                       b.speedX = Math.abs(b.speedX); }
            if (b.x > this.width - this.size)  { b.x = this.width - this.size;  b.speedX = -Math.abs(b.speedX); }

            // Obere / untere Wand
            if (b.y < 0)                       { b.y = 0;                       b.speedY = Math.abs(b.speedY); }
            if (b.y > this.height - this.size) { b.y = this.height - this.size; b.speedY = -Math.abs(b.speedY); }
        }
    }

    render(ctx: CanvasRenderingContext2D): void {
        ctx.clearRect(0, 0, this.width, this.height); // Clear the canvas
        for (const b of this.blocks) {
            ctx.fillStyle = b.color;
            ctx.fillRect(b.x, b.y, this.size, this.size);
        }
    }
}

const game = new MyGame();
const framework = new GameFramework(game, 800, 600, "canvas");
framework.start();
console.log("test");