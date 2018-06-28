class Menu
{
  constructor()
  {
    this.startButton=new Rectangle("Start.png",50,160,256,128);
    this.intructionsButton=new Rectangle("Instructions.png",50,320,256,128);
    this.scoresButton=new Rectangle("Scores.png",50,480,256,128);
    this.selector=new Rectangle("Selector.png",40,160,516,100);
    this.movingSelector=false;
    this.objetiveY=this.startButton.Y;
    this.vector=0;
    this.Speed=0;
  }
  Init()
  {
    deltaTime=0;
  }
  Update()
  {
    this.moveSelector();
  }

  Draw()
  {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    this.selector.Draw();
    this.startButton.Draw();
    this.intructionsButton.Draw();
    this.scoresButton.Draw();
  }

  moveSelector()
  {
    if(this.movingSelector)
    {
      this.selector.Y+=this.Speed;
      if(Math.abs(this.objetiveY-this.selector.Y)<=20)
      {
        this.movingSelector=false;
        this.objetiveY=0;

      }

    }
  }

  KeyDownEvent(event)
   {

     if(event.keyCode==38) //Arriba
     {
       if(this.selector.intersects(this.startButton))
       {
         this.objetiveY=this.scoresButton.Y;
         this.vector=(this.objetiveY-this.selector.Y)
         this.Speed=this.vector/(0.5*(1000/17));
         this.movingSelector=true;



       }
       if(this.selector.intersects(this.intructionsButton))
       {
         this.objetiveY=this.startButton.Y;
         this.vector=(this.objetiveY-this.selector.Y)
         this.Speed=this.vector/(0.5*(1000/17));
         this.movingSelector=true;

       }
       if(this.selector.intersects(this.scoresButton))
       {
         this.objetiveY=this.intructionsButton.Y;
         this.vector=(this.objetiveY-this.selector.Y)
         this.Speed=this.vector/(0.5*(1000/17));
         this.movingSelector=true;
       }
     }
     if(event.keyCode==40) //Abajo
     {
       if(this.selector.intersects(this.startButton))
       {
         this.objetiveY=this.intructionsButton.Y;
         this.vector=(this.objetiveY-this.selector.Y)
         this.Speed=this.vector/(0.5*(1000/17));
         this.movingSelector=true;
       }
       if(this.selector.intersects(this.intructionsButton))
       {
         this.objetiveY=this.scoresButton.Y;
         this.vector=(this.objetiveY-this.selector.Y)
         this.Speed=this.vector/(0.5*(1000/17));
         this.movingSelector=true;
       }
       if(this.selector.intersects(this.scoresButton))
       {
         this.objetiveY=this.startButton.Y;
         this.vector=(this.objetiveY-this.selector.Y)
         this.Speed=this.vector/(0.5*(1000/17));
         this.movingSelector=true;
       }
     }

     if(event.keyCode==32)
     {
       if(!this.movingSelector)
       {
        if(this.selector.intersects(this.startButton))
           {

             if (typeof(Storage) !== "undefined")
             {
                 localStorage.setItem("Lives",5);
             }
             marcador=new Marcador();

              marcador.setText();
            loadEspecificLevel(levels[0]);
           }
        if(this.selector.intersects(this.intructionsButton))
        {
            loadEspecificLevel(new Instructions());
        }

        if(this.selector.intersects(this.scoresButton))
        {
          loadEspecificLevel(new scoreMenu());
        }
        }
     }
   }

  KeyUpEvent(event)
  {
    if(event.keyCode==37) //izquierda
    {

    }

    if(event.keyCode==39) //derecha
    {
    }
    if(event.keyCode==38) //Arriba
    {

    }
    if(event.keyCode==40) //Abajo
    {

    }
  }


}
