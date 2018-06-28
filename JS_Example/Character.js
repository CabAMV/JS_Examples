class Character extends Rectangle
{
  constructor(img,X,Y,width,height)
  {
      super(img,X,Y,width,height);
      this.previousX=0;
      this.previousY=0;
      this.lastKeyPressed=0;
      this.Flip=false;
      this.Speed=6;
      this.Direction=DirectionState.East;
      this.DirectionY=0;
      this.DirectionX=0;
      this.gun=new Gun(10,0.25,2,10,20,10);
      this.moving=false;
      this.shooting=false;
      this.reloading=false;
      this.health=localStorage.getItem("Lives");
      this.vulnerable=true;
      this.vulnerabilityCount=0;
      this.animateCount=0;
      this.sx=0;
      this.sy=0;
      this.swidth=32;
      this.sheight=32;
      this.reloadAnim=new reloadAnim("reloadAnim.png",this.X,this.Y,32,32,this.gun.reloadTime);
      //this.marcador=new Marcador();
  }

  Update()
  {
    if(this.moving)
      this.Animate();
    if(!this.moving)
      this.sx=0;
    this.gun.Update();
    this.previousX=this.X;
    this.previousY=this.Y;
    if(this.lastKeyPressed==37) //izquierda
    {
      this.Flip=true;
    }

    if(this.lastKeyPressed==39) //derecha
    {
      this.Flip=false;
    }
    if(this.moving)
      this.move();
    if(this.shooting)
      this.gun.Shoot(this);



    if(!this.vulnerable)
    {
      this.vulnerabilityCount++
      if(this.vulnerabilityCount>=2*(1000/17))
      {
        this.vulnerable=true;
        this.vulnerabilityCount=0;
      }

    }
  }

  move()
  {
    this.X+=this.Speed*this.DirectionX;
    this.Y+=this.Speed*this.DirectionY;
    /*
    if(this.Direction==DirectionState.East)
        this.X+=this.Speed;
    if(this.Direction==DirectionState.West)
        this.X-=this.Speed;
    if(this.Direction==DirectionState.South)
        this.Y+=this.Speed;
    if(this.Direction==DirectionState.North)
        this.Y-=this.Speed;*/
  }

  Damage(dmg)
  {
    if(this.vulnerable)
    {
        this.health-=dmg;
        if (typeof(Storage) !== "undefined")
        {
            localStorage.setItem("Lives", this.health);
        }
        marcador.setText();
    }

    if(this.health<=0)
    {

      actualLevel.Reset();
      marcador.Delete();
      loadEspecificLevel(new Menu());
    }
  }

  Animate()
  {
    this.animateCount++;
    if(this.animateCount>=0.1428*(1000/17))
    {
      if(this.sx+32<=192)
        this.sx+=32;
      else
        this.sx=0;
      this.animateCount=0;
    }
  }

  Draw()
  {
      if(this.vulnerable)
      {
        ctx.drawImage(this.img,this.sx,this.sy,this.swidth,this.sheight,this.X,this.Y,this.width,this.height);
      }
      else
      {
        if(deltaTime%2==0)
        ctx.drawImage(this.img,this.sx,this.sy,this.swidth,this.sheight,this.X,this.Y,this.width,this.height);

      }
      if(this.reloading)
        this.reloadAnim.Draw(this);
  }

  KeyDownEvent(event)
 {
     if(event.keyCode==37) //izquierda
     {
       //this.lastKeyPressed=37;
       this.Flip=true;
       this.moving=true;
       this.DirectionX=-1;
       this.Direction=DirectionState.West;
     }

     if(event.keyCode==39) //derecha
     {
       //this.lastKeyPressed=39;
       this.moving=true;
       this.Flip=false;
       this.DirectionX=1;
       this.Direction=DirectionState.East;

     }
     if(event.keyCode==38) //Arriba
     {
       //this.lastKeyPressed=38;
       this.moving=true;

       this.DirectionY=-1;
       this.Direction=DirectionState.North;
     }
     if(event.keyCode==40) //Abajo
     {
       //this.lastKeyPressed=40;
       this.moving=true;

       this.DirectionY=1;
       this.Direction=DirectionState.South;
     }
     if(event.keyCode==32)
     {
       this.shooting=true;
     }
     if(event.keyCode==82)
     {
       if(!this.reloading)
        this.reloading=true;
     }
 }
  KeyUpEvent(event)
  {
    //this.lastKeyPressed=0;

    if(event.keyCode==32)
      this.shooting=false;

    if(event.keyCode==37 || event.keyCode==39 ) //izquierda
    {
      this.moving=false;
      this.DirectionX=0;
    }

    if(event.keyCode==38 || event.keyCode==40) //Arriba
    {
      this.moving=false;
      this.DirectionY=0;
    }
  }

}
