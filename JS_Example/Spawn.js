class Spawn extends Rectangle
{
  constructor(img,X,Y,width,height,health,rate)
  {
    super(img,X,Y,width,height)
    this.health=health;
    this.rate=rate;//in seconds
    this.rateCount=0;
  }

  Update()
  {
    this.rateCount++;
    if(this.rateCount>=this.rate*(1000/17))
    {
      actualLevel.enemies.push(new BouncingEnemy("enemyWalk.png",this.X,this.Y,30,30,1));
      this.rateCount=0;
    }
  }

  Damage(dmg)
  {
    this.health-=dmg;
    if(this.health<=0)
      actualLevel.spawns.splice(actualLevel.spawns.indexOf(this),1);
  }
}
