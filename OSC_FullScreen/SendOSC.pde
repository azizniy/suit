void oscSend(String key, float value){
  //send value from 0.0 to 1.0 //converting from range 0->255 to 0->1
    value = map(value, 0, 255, 0, 1);
    //println(value);
    OscMessage myMessage = new OscMessage("/1/"+key);
    myMessage.add(value); /* add an int to the osc message */
  
    /* send the message */
    oscP5.send(myMessage, myRemoteLocation); 
    myMessage.clear();

}