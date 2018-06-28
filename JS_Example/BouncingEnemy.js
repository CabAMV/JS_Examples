class BouncingEnemy extends Rectangle
{
  constructor(img,X,Y,width,height,health)
  {
    super(img,X,Y,width,height);
    this.dirX=Math.random() *  (1 - (0)) + (0);
    this.dirY=Math.random() *  (1 - (0)) + (0);
    this.sentidoX=1;
    this.sentidoY=1;
    this.Speed=Math.random() *  (5 - (1)) + (1);
    this.previousX=X;
    this.previousY=Y;
    this.health=health;
    this.sx=0;
    this.animateCount=0;

  }

  Update()
  {
    this.previousX=this.X;
    this.previousY=this.Y;
    this.Move();
    this.Animate();
  }
  Draw()
  {
    ctx.drawImage(this.img,this.sx,0,32,32,this.X,this.Y,this.width,this.height);
  }


  Move()
  {
    this.X+=this.Speed*this.dirX*this.sentidoX;
    this.Y+=this.Speed*this.dirY*this.sentidoY;
  }
  Animate()
  {
    this.animateCount++;
    if(this.animateCount>=0.5*(1000/17))
    {
      if(this.sx+32<=32)
        this.sx+=32;
      else
        this.sx=0;
      this.animateCount=0;
    }
  }
  ChangeDirection(wall)
  {
    this.X=this.previousX;
    this.Y=this.previousY;
    do
    {
      this.dirX=Math.random()* (1 - (0)) + (0);
      this.dirY=Math.random()* (1 - (0)) + (0);
    }while(wall.intersects(this));
    if((Math.random()* (1 - (-1)) + (-1) ) <=0)
      this.sentidoX=this.sentidoX*-1;
    if((Math.random()* (1 - (-1)) + (-1) ) <=0)
      this.sentidoY=this.sentidoY*-1;


  }
  Damage(dmg)
  {
    this.health-=dmg;
    if(this.health<=0)
      actualLevel.enemies.splice(actualLevel.enemies.indexOf(this),1);

  }
}
