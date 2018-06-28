class Rectangle
{
    constructor(img,X,Y,width,height)
    {
      this.img= new Image();
      this.img.src=img;
      this.X=X;
      this.Y=Y;
      this.width=width;
      this.height=height;
    }

    Draw()
    {
      ctx.drawImage(this.img,this.X,this.Y,this.width,this.height);

    }



    intersects(other)
    {
      if(other.X+other.width >=this.X && other.X<=this.X+this.width)
      {
        if(other.Y+other.height >=this.Y && other.Y<=this.Y+this.height)
        {
            return true;
        }
        else
          return false;
      }
      else
        return false;
    }

    




}
