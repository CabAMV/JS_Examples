class reloadAnim extends Rectangle
{
  constructor(img,X,Y,width,height,time)
  {
    super(img,X,Y,width,height);
    this.animateCount=0;
    this.sx=0;
    this.sy=0;
    this.swidth=128;
    this.sheight=128;
    this.time=time;
  }

  Animate(player)
  {
    this.X=player.X;
    this.Y=player.Y+player.height;
    this.animateCount++;
    if(this.animateCount>=0.1428*(1000/17))
    {
      if(this.sx+128<=512)
        this.sx+=128;
      else
        this.sx=0;
      this.animateCount=0;
    }
  }

  Draw(player)
  {
    this.Animate(player);
    ctx.drawImage(this.img,this.sx,this.sy,this.swidth,this.sheight,this.X,this.Y,this.width,this.height);
  }

}
