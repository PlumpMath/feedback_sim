PGraphics foregroundImage;
PGraphics copy;
float scale;
float angle;
int colorNumber;
boolean square;
boolean reset;
boolean upDown;
boolean downDown;
boolean leftDown;
boolean rightDown;
boolean drawShape;
float count;
boolean auto;
boolean colorStep;
int xMouse;
int yMouse;
boolean updateMouse;

void setup()
{
  scale = 0.99f;
  drawShape = true;
  colorStep = true;
  
  size(600, 600);
  frameRate(30);
  
  foregroundImage = createGraphics(width, height);
  copy = createGraphics(width, height);
  
  //init copy for Java
  copy.beginDraw();
  copy.background(0);
  copy.colorMode(HSB, 255);
  copy.endDraw();
  
  foregroundImage.beginDraw();
  foregroundImage.background(0);
  foregroundImage.colorMode(HSB, 255);
  foregroundImage.endDraw();
  
  background(0);

  updateMouse = true;
}

void draw()
{ 
  if(upDown)
    scale += 0.01f;
    
  if(downDown)
    scale -= 0.01f;
    
  if(rightDown)
    angle = 0.01f;
  else if(leftDown)
    angle = -0.01f;
  else
    angle = 0;
  
  if(auto)
  {
    angle = 0.01f;
    scale = 0.2 * abs(sin(count)) + 0.84;
    count += 0.03f;
  }
  
  background(0);
  
  copy.beginDraw();
  foregroundImage.beginDraw();
  
  copy.translate(int(copy.width/2), int(copy.height/2));
  copy.scale(scale);
  copy.rotate(angle);
  copy.translate(-int(copy.width/2), -int(copy.height/2));
  drawImageOnImage(foregroundImage, copy);
  //foregroundImage.background(0);
  drawImageOnImage(copy, foregroundImage);
  
  foregroundImage.fill(colorNumber%255, 255, 255);
  if(colorStep)
    colorNumber++;

  if(updateMouse)
  {
    xMouse = mouseX;
    yMouse = mouseY;
  }

  if(drawShape)
  {
    if(square)
    {
      foregroundImage.noStroke();
      foregroundImage.rect(xMouse-25, yMouse-25, int(foregroundImage.width/10), int(foregroundImage.height/10));
    }
    else 
    {
      foregroundImage.noStroke();
      foregroundImage.ellipse(xMouse, yMouse, int(foregroundImage.width/10), int(foregroundImage.height/10));
    }
  }
  
  if(reset)
  {
    foregroundImage.background(0);
    copy.background(0);
  }
  
  copy.translate(int(copy.width/2), int(copy.height/2));
  copy.scale(1/scale);
  //copy.rotate(0);
  copy.translate(-int(copy.width/2), -int(copy.height/2));
  
  foregroundImage.endDraw();
  copy.endDraw();
  
  image(foregroundImage, 0, 0, width, height);
}

void keyPressed()
{
  if(keyCode == UP)
    upPressed();
  else if(keyCode == DOWN)
    downPressed();
    
  if(key == '0')
    resetScale();
    
  if(key == '9')
    resetAngle();
    
  if(key == 'i')
    invert();
  
  if(keyCode == LEFT)
    leftPressed();
  if(keyCode == RIGHT)
    rightPressed();
    
  if(key == 'r')
    resetPressed();
}

void keyReleased()
{
  if(keyCode == UP)
    upReleased();
  else if(keyCode == DOWN)
    downReleased();
  
  if(keyCode == LEFT)
    leftReleased();
  if(keyCode == RIGHT)
    rightReleased();
    
  if(key == 'r')
    resetReleased();
}

void mouseClicked() {
  updateMouse = !updateMouse
}

void drawImageOnImage(PGraphics subject, PGraphics canvas)
{
  int xOffset = int((canvas.width - subject.width)/2);
  int yOffset = int((canvas.height - subject.height)/2);
  canvas.image(subject, xOffset, yOffset);
}

void increaseAngle(float amount)
{
  angle += amount;
}

void resetAngle()
{
  angle = 0;
}

void increaseScale(float amount)
{
  scale += amount;
}

void resetScale()
{
  scale = 1;
}

void invert()
{
  foregroundImage.filter(INVERT);
  copy.filter(INVERT);
  //colorNumber = 255 - colorNumber;
}

void resetPressed()
{
  reset = true;
}

void resetReleased()
{
  reset = false;
}

void toggleDrawShape()
{
  drawShape = !drawShape;
}

void toggleSquare()
{
  square = !square;
}

void toggleAuto()
{
  auto = !auto;
}

void toggleColorStep()
{
  colorStep = !colorStep;
}

void leftPressed()
{
  leftDown = true;
}

void leftReleased()
{
  leftDown = false;
}

void rightPressed()
{
  rightDown = true;
}

void rightReleased()
{
  rightDown = false;
}

void upPressed()
{
  upDown = true;
}

void upReleased()
{
  upDown = false;
}

void downPressed()
{
  downDown = true;
}

void downReleased()
{
  downDown = false;
}

void saveImage()
{
  saveFrame();
}