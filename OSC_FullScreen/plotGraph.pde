float prevAX;
float prevAY;
float prevAZ;

float prevGX;
float prevGY;
float prevGZ;

float prevMX;
float prevMY;
float prevMZ;


//graph scale
int coefficient = 20;
//position of a grphs
int offsetA = 100;
int offsetG = 200;
int offsetM = 300;

void plotGraph() {
  //CHANGE THIS VARIABLE TO THE VARIABLE YOU WANNA PLOT:
//  float plotVar = random(100);
  float plotVarAX = ax *coefficient;
  float plotVarAY = ay *coefficient;
  float plotVarAZ = az *coefficient;
  
  float plotVarGX = gx *coefficient/50;
  float plotVarGY = gy *coefficient/50;
  float plotVarGZ = gz *coefficient/50;
  
  float plotVarMX = mx *coefficient/100;
  float plotVarMY = my *coefficient/100;
  float plotVarMZ = mz *coefficient/100;

  stroke(255, 0, 0);
  line(frameCount-1, offsetA+prevAX, frameCount, offsetA+plotVarAX);
  stroke(0, 255, 0);
  line(frameCount-1, offsetA+prevAY, frameCount, offsetA+plotVarAY);
  stroke(0, 0, 255);
  line(frameCount-1, offsetA+prevAZ, frameCount, offsetA+plotVarAZ); 
  
  stroke(255, 0, 0);
  line(frameCount-1, offsetG+prevGX, frameCount, offsetG+plotVarGX);
  stroke(0, 255, 0);
  line(frameCount-1, offsetG+prevGY, frameCount, offsetG+plotVarGY);
  stroke(0, 0, 255);
  line(frameCount-1, offsetG+prevGZ, frameCount, offsetG+plotVarGZ); 
  
  stroke(255, 0, 0);
  line(frameCount-1, offsetM+prevMX, frameCount, offsetM+plotVarMX);
  stroke(0, 255, 0);
  line(frameCount-1, offsetM+prevMY, frameCount, offsetM+plotVarMY);
  stroke(0, 0, 255);
  line(frameCount-1, offsetM+prevMZ, frameCount, offsetM+plotVarMZ); 
  
  
  
 
  if(frameCount==400){
    frameCount=50;
    stroke(255, 0, 0);
    clear();
  }
  //stroke(0, 255, 0);
  
  
 
//  line(frameCount-1, 200+prevY, frameCount, 200+plotVarY);
  prevAX = plotVarAX;
  prevAY = plotVarAY;
  prevAZ = plotVarAZ;
  
  prevGX = plotVarGX;
  prevGY = plotVarGY;
  prevGZ = plotVarGZ;
  
  prevMX = plotVarMX;
  prevMY = plotVarMY;
  prevMZ = plotVarMZ;

}
 
void drawStuff() {
  background(0);
  for (int i = 0; i <= width; i += 50) {
    fill(0, 255, 0);
    text(i/2, i-10, height-15);
    stroke(255);
    line(i, height, i, 0);
  }
  for (int j = 0; j < height; j += 140) {
    fill(0, 255, 0);
    text(6-j/(height/6), 0, j);
    stroke(255);
    line(0, j, width, j);
  }
}