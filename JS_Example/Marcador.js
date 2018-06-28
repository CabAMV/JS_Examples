class Marcador
{
  constructor()
  {
    this.text = document.createElement('div');
    this.text.style.position = 'absolute';
    this.text.style.zIndex = 1;
    this.text.style.fontSize= 250+"%";
    this.text.style.width = 200;
    this.text.style.height = 200;
    this.text.style.color="red";
    //this.text.style.backgroundColor = "white";
    this.text.innerHTML = localStorage.getItem("Lives");
    this.text.style.top = 10 + 'px';
    this.text.style.left = 10 + 'px';
    document.body.appendChild(this.text);
  }
  setText()
  {
    this.text.innerHTML = localStorage.getItem("Lives");

  }
  Delete()
  {
    document.body.removeChild(this.text);

  }
}
