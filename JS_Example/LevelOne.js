class LevelOne
{
  constructor(map)
  {

    this.player;
    this.walls=[];
    this.Floor=[];
    this.bullets=[];
    this.spawns=[];
    this.enemies=[];
    this.map=map;
    this.ended=false;
    this.endedGame=false;
    this.exit;
    this.EndGame;

  }


  Init()
  {
    for(var i=0;i<20;i++)
    {
      for(var j=0;j<20;j++)
      {
        if(this.map[i][j]==1)
          this.walls.push(new Rectangle("wall.jpg",32*j,32*i,32,32));
        if(this.map[i][j]==9)
          this.player=new Character("playerWalk.png",32*j,32*i,30,30,5);
        if(this.map[i][j]==8)
          this.spawns.push(new Spawn("Trap.png",32*j,32*i,32,32,3,2));

      }
    }
  }
  Reset()
  {
    levels[actualLevelIndex]=new LevelOne(this.map);
  }

  Update()
  {
    deltaTime++;
    this.player.Update();
    this.UpdateEnemies();
    this.UpdateBullets();
    this.UpdateSpawns();
    var aux=this;
    if(this.ended)
    {
        if(this.exit.intersects(this.player))
        {
          //this.player.marcador.Delete();
          //this.Reset();
          loadLevel();
          aux.Reset();
        }

    }
    if(this.endedGame)
    {
      if(this.EndGame.intersects(this.player))
      {
        //this.Reset();
        marcador.Delete();
        if (typeof(Storage) !== "undefined")
        {
          if(deltaTime<localStorage.getItem("BestTime"))
            localStorage.setItem("BestTime", deltaTime);
        }
        loadEspecificLevel(new Menu());
        deltaTime=0;
      }
    }


    this.checkBulletCollisions();
    //colosiones con los muros
    for(var i=0;i<this.walls.length;i++)
    {
      if(this.walls[i].intersects(this.player))
      {
        this.player.X=this.player.previousX;
        this.player.Y=this.player.previousY;
      }
      if(this.bullets.length>0)
      {
        for(var j=0;j<this.bullets.length;j++)
        {
          if(this.walls[i].intersects(this.bullets[j]))
          {
            this.bullets.splice(j,1);
          }
        }
      }
      if(this.enemies.length>0)
      {
        for(var k=0;k<this.enemies.length;k++)
        {
          if(this.walls[i].intersects(this.enemies[k]))
            this.enemies[k].ChangeDirection(this.walls[i]);
        }
      }

    }

  }

  UpdateBullets()
  {
    if(this.bullets.length>0)
    {
      for(var k=0;k<this.bullets.length;k++)
      {
        this.bullets[k].move();
      }
    }
  }

  UpdateSpawns()
  {
    if(this.spawns.length>0)
    {
      for(var k=0;k<this.spawns.length;k++)
      {
        this.spawns[k].Update();
      }
    }
    else if(this.spawns.length<=0 && this.enemies.length<=0)
    {
      this.activateExit();
    }
  }

  UpdateEnemies()
  {
    if(this.enemies.length>0)
    {
      for(var k=0;k<this.enemies.length;k++)
      {
        this.enemies[k].Update();
        if(this.enemies[k].intersects(this.player))
        {
          this.player.Damage(1);
          this.player.vulnerable=false;
        }
      }
    }
  }
  Draw() //equivalente al update
  {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    //player.Draw();

    for(var i=0;i<this.walls.length;i++)
      this.walls[i].Draw();
    for(var i=0;i<this.Floor.length;i++)
      this.Floor[i].Draw();
    for(var i=0;i<this.bullets.length;i++)
      this.bullets[i].Draw();
    for(var i=0;i<this.enemies.length;i++)
      this.enemies[i].Draw();
    for(var i=0;i<this.spawns.length;i++)
      this.spawns[i].Draw();

    if(this.ended)
      this.exit.Draw();
    if(this.endedGame)
      this.EndGame.Draw();
    this.paintPlayer();
    //collision.Draw();

  }

  paintPlayer()
  {
    ctx.save();
    if(this.player.Flip)
    {
      ctx.scale(-1,1);
      //ctx.drawImage(this.img,this.sx,this.sy,this.swidth,this.sheight,this.X,this.Y,this.width,this.height);

      ctx.drawImage(this.player.img,this.player.sx,this.player.sy,this.player.swidth,this.player.sheight,-this.player.X-this.player.width,this.player.Y,this.player.width,this.player.height);
    }
    else {
      this.player.Draw();

    }
    ctx.restore();

  }

  checkBulletCollisions()
  {
    var destroy=false;
    var indexToDestroy;
    for(var i=0;i<this.bullets.length;i++)
    {
      for(var j=0;j<this.spawns.length;j++)
      {
        if(this.bullets[i].intersects(this.spawns[j]))
        {
          this.spawns[j].Damage(this.bullets[i].Damage)
          destroy=true;
          indexToDestroy=i;
        }
      }
      for(var j=0;j<this.enemies.length;j++)
      {
        if(this.bullets[i].intersects(this.enemies[j]))
        {
          this.enemies[j].Damage(this.bullets[i].Damage)
          destroy=true;
          indexToDestroy=i;

        }

      }
    }
    if(destroy)
      this.bullets.splice(indexToDestroy,1);
  }

  activateExit()
  {
    for(var i=0;i<20;i++)
    {
      for(var j=0;j<20;j++)
      {
        if(this.map[i][j]==7)
        {
          this.exit=new Rectangle("Exit.png",32*j,32*i,32,32);
          this.ended=true;

        }
        if(this.map[i][j]==6)
        {
          this.EndGame=new Rectangle("Exit.png",32*j,32*i,32,32,3,2);
          this.endedGame=true;
        }
      }
    }

  }
  KeyDownEvent(event)
   {
     this.player.KeyDownEvent(event);
   }

  KeyUpEvent(event)
  {
    this.player.KeyUpEvent(event);
  }

}
