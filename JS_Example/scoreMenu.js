class scoreMenu
{
  constructor()
  {
    this.text = document.createElement('div');
    this.text.style.position = 'absolute';
    this.text.style.zIndex = 1;
    this.text.style.fontSize= 250+"%";
    this.text.style.width = 200;
    this.text.style.height = 200;
    this.text.style.color="white";
    this.text.style.backgroundColor = "black";
    this.text.innerHTML = this.fmtMSS(localStorage.getItem("BestTime")/17);
    this.text.style.top = 300 + 'px';
    this.text.style.left = 300 + 'px';
    document.body.appendChild(this.text);

    this.title = document.createElement('div');
    this.title.style.position = 'absolute';
    this.title.style.zIndex = 1;
    this.title.style.fontSize= 250+"%";
    this.title.style.width = 300;
    this.title.style.height = 300;
    this.title.style.color="white";
    this.title.style.backgroundColor = "black";
    this.title.innerHTML = "BestTime";
    this.title.style.top = 200 + 'px';
    this.title.style.left = 100 + 'px';
    document.body.appendChild(this.title);
  }

  Init()
  {
  }
  Update()
  {
  }

  Draw()
  {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillRect(0,0,canvas.width,canvas.height);

  }
  Delete()
  {
    document.body.removeChild(this.text);
    document.body.removeChild(this.title);

  }
  fmtMSS(d)
  {
      d = Number(d);
      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);

      var hDisplay = h > 0 ?  (h>10 ? "0"+h : h )   : "";
      var mDisplay = m > 0 ?  (m>10 ? "0"+m : m )   : "";
      var sDisplay = s > 0 ?  (h>10 ? "0"+s : s )   : "";
      return hDisplay + mDisplay + sDisplay;

  }
  KeyDownEvent(event)
  {
    this.Delete();
    loadEspecificLevel(new Menu());

  }

  KeyUpEvent(event)
  {}


}

class Instructions
{
    constructor()
    {
      this.text = document.createElement('div');
      this.text.style.position = 'absolute';
      this.text.style.zIndex = 1;
      this.text.style.fontSize= 100+"%";
      this.text.style.width = 200+"px";
      this.text.style.height = 200+"px";
      this.text.style.color="black";
      this.text.style.backgroundColor = "white";
      this.text.innerHTML = "El juego consiste en pasar todos los niveles en el minimo tiempo posible. El personaje se mueve con las flechas de direccion y se dispara con la barra espaciadora en la ultima direccion en que se ha andado. Una  vez se han destruido todos los generadores de enemigos se puede avanzar hacia el siguiete nivel.";
      this.text.style.top = 200 + 'px';
      this.text.style.left = 100 + 'px';
      document.body.appendChild(this.text);

      this.title = document.createElement('div');
      this.title.style.position = 'absolute';
      this.title.style.zIndex = 1;
      this.title.style.fontSize= 250+"%";
      this.title.style.width = 100;
      this.title.style.height = 100;
      this.title.style.color="black";
      this.title.style.backgroundColor = "white";
      this.title.innerHTML = "Instructions";
      this.title.style.top = 100 + 'px';
      this.title.style.left = 0 + 'px';
      document.body.appendChild(this.title);
    }

    Init()
    {
    }
    Update()
    {
    }

    Draw()
    {
      ctx.clearRect(0,0,canvas.width,canvas.height);
    }
    Delete()
    {
      document.body.removeChild(this.text);
      document.body.removeChild(this.title);

    }

    KeyDownEvent(event)
    {
      this.Delete();
      loadEspecificLevel(new Menu());

    }

    KeyUpEvent(event)
    {}
}
