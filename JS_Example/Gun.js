class Gun
{
  constructor(magazineSize,fireRate,reloadTime,shootSpeed,bulletWidth,bulletHeight)
  {
    this.magazineSize=magazineSize;
    this.fireRate=fireRate;
    this.reloadTime=reloadTime;
    this.shootSpeed=shootSpeed;
    this.bulletsLeft=this.magazineSize;
    this.canShoot=true;
    this.reloadTimer=0;
    this.rateTimer=0;
    this.bulletWidth=bulletWidth;
    this.bulletHeight=bulletHeight;
  }
  Shoot(player)
  {
    if(this.bulletsLeft>0 && this.canShoot && actualLevel.player.reloading==false)
    {
      if(player.Direction==DirectionState.North || player.Direction==DirectionState.South)
      {
        actualLevel.bullets.push(new Bullet("Selector.png",player.X+(player.width/2),player.Y+(player.height/2),this.bulletHeight,this.bulletWidth,this.shootSpeed,player.Direction,1));

      }
      if(player.Direction==DirectionState.East || player.Direction==DirectionState.West)
      {
        actualLevel.bullets.push(new Bullet("Selector.png",player.X+(player.width/2),player.Y+(player.height/2),this.bulletWidth,this.bulletHeight,this.shootSpeed,player.Direction,1));

      }
      this.bulletsLeft--;
      this.canShoot=false;
    }
  }
  Update()
  {
    if(this.canShoot==false)
    {
      this.rateTimer++;
      if(this.rateTimer>=this.fireRate*(1000/17))
      {
        this.canShoot=true;
        this.rateTimer=0;
      }
    }

    if(this.bulletsLeft==0)
    {
      actualLevel.player.reloading=true;

    }
    if(actualLevel.player.reloading==true)
      this.Reload();
  }


  Reload()
  {
    this.reloadTimer+=1;
    if(this.reloadTimer>=this.reloadTime*(1000/17))
    {
              this.bulletsLeft=this.magazineSize;
              this.reloadTimer=0;
              actualLevel.player.reloading=false;

    }

  }
}
