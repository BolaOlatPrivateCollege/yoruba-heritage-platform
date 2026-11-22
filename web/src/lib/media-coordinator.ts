// Native recordings remain usable without JS; with JS, only one plays at a time.
document.addEventListener('play',event=>{
  if(!(event.target instanceof HTMLMediaElement))return;
  document.querySelectorAll<HTMLMediaElement>('audio,video').forEach(media=>{if(media!==event.target)media.pause();});
},true);
