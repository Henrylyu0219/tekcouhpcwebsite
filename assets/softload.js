// assets/softload.js
(function(){
  function tkSoftloadInit(root){
    const scope = root || document;

    // 1) 进入视窗淡入
    const tiles = scope.querySelectorAll('.catalog.fx-softload .tile:not(.is-softload-bound)');
    if(tiles.length){
      tiles.forEach((tile, i) => {
        tile.classList.add('is-softload-bound');        // 避免重复绑定
        tile.style.setProperty('--delay', ((i % 8) * 60) + 'ms'); // 轻微错峰
      });

      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if(entry.isIntersecting){
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { root: null, threshold: 0.15 });

      tiles.forEach(t => io.observe(t));
    }

    // 2) 图片加载后收起骨架
    const figures = scope.querySelectorAll('.catalog.fx-softload .tile__figure:not(.is-softload-bound)');
    figures.forEach((fig) => {
      fig.classList.add('is-softload-bound');
      const img = fig.querySelector('img');
      if(!img) return;

      const markLoaded = () => fig.classList.add('is-loaded');

      if(img.complete && img.naturalWidth > 0){
        markLoaded();
      }else{
        img.addEventListener('load', markLoaded, { once: true });
        img.addEventListener('error', markLoaded, { once: true });
      }
    });
  }

  // 首次绑定
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => tkSoftloadInit());
  } else {
    tkSoftloadInit();
  }

  // 暴露
  window.tkSoftloadInit = tkSoftloadInit;
})();
