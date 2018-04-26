class sliderV {
  int posX, posY, width, height, p;
  color colour;
  boolean slide;

  sliderV (int x, int y, int w, int h, color c) {
    posX = x;
    posY = y;
    width = w;
    height = h;
    p = 10;
    colour = c;
    slide = true;
  }

  void render() {
    fill(colour);
    rect(posX, posY, width, height); // RGB Stripes rect,   rect(x, y, width, height+10, radius); 
   
    noStroke();
    fill(255);
    rect(p+posX,posY, width-p,height); // slider rect

   
    fill(0);
    textSize(15);
    text(p/2, posX+6, posY+height-5); //slider value

    if (slide==true && mousePressed==true && mouseY<posY+height && mouseY>posY){
     if ((mouseX<=posX+width+150) && (mouseX>=posX-150)) {
        p = (mouseX-posX);

        if (p<0) {
          p=0;
        }
        else if (p>width) {
          p=width;
        }
      }
    }
  }
}