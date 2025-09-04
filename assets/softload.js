(function(){
  // 1) 卡片进场：进入视窗时添加 .is-visible
  const tiles = document.querySelectorAll('.catalog.fx-softload .tile');
  if(tiles.length){
    // 轻微“错峰”延迟，行进式更柔和（按序号循环 0-7）
    tiles.forEach((tile, i) => {
      tile.style.setProperty('--delay', ((i % 8) * 60) + 'ms');
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

  // 2) 骨架关闭：图片加载完成后，给父级 figure 加 .is-loaded
  const figures = document.querySelectorAll('.catalog.fx-softload .tile__figure');
  figures.forEach((fig) => {
    const img = fig.querySelector('img');
    if(!img) return;

    const markLoaded = () => fig.classList.add('is-loaded');

    if(img.complete && img.naturalWidth > 0){
      // 已在缓存中，直接标记
      markLoaded();
    }else{
      img.addEventListener('load', markLoaded, { once: true });
      img.addEventListener('error', markLoaded, { once: true }); // 出错也收起骨架
    }
  });
})();
