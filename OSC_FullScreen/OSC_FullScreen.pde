import processing.serial.*;
import oscP5.*;
import netP5.*;

//   
OscP5 oscP5;
NetAddress myRemoteLocation;


sliderV sV1, sV2, sV3;

color colour;
int rectX = 500;
int rectW = 510; //2*255


int circleX = rectX+rectW+20+65, circleY=300; 
int circleSize = 130;   // Diameter of circle



//Accelerometer
float ax;
float ay;
float az;

//Gyroscope
float gx;
float gy;
float gz;

//Magnetometer
float mx;
float my;
float mz;
float mH;

// fader RGB
float faderValueR = 0; 
float faderValueG = 0; 
float faderValueB = 0;

float newFaderValueR = 0;
float newFaderValueG = 0;
float newFaderValueB = 0;

boolean faderChanged = false;

void setup() {
    
  //fullScreen();
  size(1300,400);
  surface.setResizable(true);
  //frameRate(1); To plot the graph at 1 point per second 
  frameRate(30);//numbers of frames per second
  frameCount = 50;
  drawStuff();
  
  // create 3 instances of the sliderV class
  //---------------posX, posY, width, height, color
  sV1 = new sliderV(rectX,  50, rectW, 30, #ff0000);
  sV2 = new sliderV(rectX, 100, rectW, 30, #00ff00);
  sV3 = new sliderV(rectX, 150, rectW, 30, #0049ff);
  
  /* start oscP5, listening for incoming messages at port 9000 */
  oscP5 = new OscP5(this,9000);
  
  /* myRemoteLocation is a NetAddress. a NetAddress takes 2 parameters,
   * an ip address and a port number. myRemoteLocation is used as parameter in
   * oscP5.send() when sending osc packets to another computer, device, 
   * application. usage see below. for testing purposes the listening port
   * and the port of the remote location address are the same, hence you will
   * send messages back to this sketch.
   */
  myRemoteLocation = new NetAddress("192.168.1.123",8000);
}

void draw() {
   plotGraph();

  
  sV1.render();
  sV2.render();
  sV3.render();
  
  
  //circle color takes slider pos
  fill(sV1.p/2, sV2.p/2, sV3.p/2);

  rect(rectX+rectW+20,50,130,130);
  textSize(20);
  text(sV1.p/2,10, 85);//since slider is 500 pixels: 2*255
  text(sV2.p/2,50, 85);
  text(sV3.p/2,90, 85);

//only when any value of RGB changes -> send signal  
  newFaderValueR  = float(sV1.p/2);
  newFaderValueG  = float(sV2.p/2);
  newFaderValueB  = float(sV3.p/2);
  
  if(newFaderValueR != faderValueR || newFaderValueG != faderValueG || newFaderValueB != faderValueB){
    faderChanged = true;
    faderValueR = newFaderValueR;
    faderValueG = newFaderValueG;
    faderValueB = newFaderValueB;
  }
 
  if(faderChanged == true){
     faderChanged = false;
     oscSend("faderR", faderValueR );
     oscSend("faderG", faderValueG );
     oscSend("faderB", faderValueB );
  }
 
  
  
  fill(255,255,0);
  ellipse(circleX, circleY, circleSize,circleSize);
  fill(0);
  textSize(20);
  text("VIBE",rectX+rectW+20+45, 300);
   //---x,  y,  w,  h, start,stop
  //arc(rectX+rectW+20+70  , 100, 120, 120, 0, PI * 2.0);
  
  
}



void keyPressed()
{
  if(key == 'A'){
    OscMessage myMessage = new OscMessage("/1/toggle1");
    myMessage.add(0.0); /* add an int to the osc message */
  
    /* send the message */
    oscP5.send(myMessage, myRemoteLocation); 
    myMessage.clear();
  }

}


//void mousePressed() {
//    /* in the following different ways of creating osc messages are shown by example */
//  OscMessage myMessage = new OscMessage("/1/toggle1");

  
//  myMessage.add(1.0); /* add an int to the osc message */
 
//  /* send the message */
//  oscP5.send(myMessage, myRemoteLocation); 
//   myMessage.clear();
//  delay(500);
 
   
    
//  myMessage.add(0.0); /* add an int to the osc message */
 
//  /* send the message */
//  oscP5.send(myMessage, myRemoteLocation); 
//  myMessage.clear();
//  delay(500);
  

//}