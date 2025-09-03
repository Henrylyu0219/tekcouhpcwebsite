// 滚动隐藏/展开
let lastScrollY = window.scrollY;
const header = document.getElementById('main-header');
const sensitivity = 50;

window.addEventListener('scroll', () => {
  const cur = window.scrollY;
  if (cur > lastScrollY) header.classList.add('hidden');
  else if (lastScrollY - cur > sensitivity) header.classList.remove('hidden');
  lastScrollY = cur;
});

// 汉堡开合
const btn = document.querySelector('.menu-toggle');
const panel = document.getElementById('mobileMenu');

if (btn && panel) {
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    panel.classList.toggle('show');
  });

  // 点击移动菜单链接后收起
  panel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      panel.classList.remove('show');
    });
  });
}
