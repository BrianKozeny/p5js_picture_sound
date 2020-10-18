var song;

function preload(){
  song = loadSound("lofi_p5js.mp3")
}

let particles = [];
// if rain Y value = mouse Y value, remove rain
let img;

function setup() {
  createCanvas(600, 600);
  umbrella = loadImage('umbrella-ps.png')
  img = loadImage('hill_person_new_2.jpg')
  song.play();
  
}

function draw() {
 
  background(img);
  
  let umb = new Umbrella(mouseX, mouseY);

  //generate objects
  for (let i = 0; i < 4; i++) {
    particles.push(new Particle(random(0, 600), -10));
  }

  //run the object
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    // update, check & compare, then display last
    p.move();
    p.display();
    umb.display();
    if ((mouseX-1 < particles[i].x) && (particles[i].x < mouseX+188) && (particles[i].y > umb.y+50)) {;
      particles.splice(i,1);
    }
  }

  //adjust number of particles
  if (particles.length > 100) {
    particles.splice(0, 1);
  }
  if (particles.length > 200 ){
    particles.splice(0, 5);
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xspd = 0
    this.position = createVector(this.x, this.y);
    this.yspd = random(8,20);
    this.size = .75;
    this.clr = color(random(500), random(500), random(500));
  }
  display() {
    
    fill(this.clr);
    stroke(this.clr);
    ellipse(this.x, this.y, this.size * .5, this.size*11);
  }
  move() {
    this.x = this.x + this.xspd + random(-.3, 0.3);
    this.y = this.y + this.yspd;
  }
  // checkEdges() {
  //   if (this.y > height) {
  //     this.y = 0;
  //   }
  // }
  removeRain() {
    fill(0);
  }
}
class Umbrella {
  constructor(x, y) {
    this.x = mouseX;
    this.y = mouseY;
    this.size = 3;
    this.clr = color(200, 255, 80);
  }
  display() { 
    image(umbrella, this.x, this.y, 200, 200)
    noCursor();  }

}