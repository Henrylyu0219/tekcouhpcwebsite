// 简洁：移动端汉堡开关 + 滚动显示/隐藏头部（如不需要可删掉滚动段）
(function(){
  const header = document.getElementById('main-header');
  const toggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobileMenu');

  // 汉堡开合
  toggle?.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('is-open');
    document.body.style.overflow = open ? 'hidden' : '';
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // 点击移动菜单内链接后自动收起
  mobileMenu?.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
    toggle?.setAttribute('aria-expanded', 'false');
  });

  // （可选）滚动时隐藏/显示头部
  let lastY = window.scrollY;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    window.requestAnimationFrame(() => {
      const y = window.scrollY;
      const goingDown = y > lastY && y > 40;
      header.style.transform = goingDown ? 'translateY(-100%)' : 'translateY(0)';
      lastY = y;
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
})();
