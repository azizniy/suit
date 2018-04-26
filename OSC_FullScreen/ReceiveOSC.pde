/* incoming osc message are forwarded to the oscEvent method. */
void oscEvent(OscMessage theOscMessage) {
  /* print the address pattern and the typetag of the received OscMessage */
  //print("### received an osc message.");
  //print(" addrpattern: "+theOscMessage.addrPattern());
  //println(" typetag: "+theOscMessage.typetag());
  
  if(theOscMessage.checkTypetag("f")){
     if(theOscMessage.checkAddrPattern("/1/ax")){
         ax = theOscMessage.get(0).floatValue();
     } 
     if(theOscMessage.checkAddrPattern("/1/ay")){
         ay = theOscMessage.get(0).floatValue();
     }
     if(theOscMessage.checkAddrPattern("/1/az1")){
         az = theOscMessage.get(0).floatValue();
     }
     if(theOscMessage.checkAddrPattern("/1/gx1")){
         gx = theOscMessage.get(0).floatValue();
     } 
     if(theOscMessage.checkAddrPattern("/1/gy1")){
         gy = theOscMessage.get(0).floatValue();
     }
     if(theOscMessage.checkAddrPattern("/1/gz1")){
         gz = theOscMessage.get(0).floatValue();
     } 
     if(theOscMessage.checkAddrPattern("/1/mx1")){
         mx = theOscMessage.get(0).floatValue();
     } 
     if(theOscMessage.checkAddrPattern("/1/my1")){
         my = theOscMessage.get(0).floatValue();
     } 
     if(theOscMessage.checkAddrPattern("/1/mz1")){
         mz = theOscMessage.get(0).floatValue();
     } 
     if(theOscMessage.checkAddrPattern("/1/mH")){
         mH = theOscMessage.get(0).floatValue();
     } 
   
  }
 
  

}