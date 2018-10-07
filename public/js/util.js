window.cAlert = async function(message){
    const sleep = (time) => {return new Promise(resolve => {setTimeout(() => {resolve()}, time)})};
    const body = document.querySelector("body");
    const alert = document.createElement("div");
          alert.style = "width:80%;height:3rem;line-height:3rem;border-radius:0.5rem;font-size:auto;text-align:center;vertical-align:middle;background:rgba(255,255,255,0.8);z-index:100;position:fixed;display:none;margin:auto;top:0;bottom:0;left:0;right:0;";
          alert.textContent = message; 
    const modal = document.createElement("div");
          modal.style="width:100vw;height:100vh;background:rgba(0,0,0,0.3);z-index:99;position:fixed;display:none;";
    await body.appendChild(modal);
    await body.appendChild(alert);
    await $(alert).fadeIn("slow");
    await $(modal).fadeIn("slow");
    await sleep(1000);
    await $(alert).fadeOut("slow");
    await $(modal).fadeOut("slow");
    await sleep(1000);
    await body.removeChild(modal);
    await body.removeChild(alert);
}