(function () {
  var PAGE_SIZE = 15;

  document.querySelectorAll('.anilist-list, .lastfm-list').forEach(function (list) {
    var items = Array.prototype.slice.call(list.children).filter(function (el) {
      return el.classList && (el.classList.contains('anilist-item') || el.classList.contains('lastfm-item'));
    });
    if (items.length <= PAGE_SIZE) return;

    var shown = PAGE_SIZE;

    var btn = document.createElement('button');
    btn.className = 'filter-btn pagination-btn';
    btn.type = 'button';

    function apply() {
      items.forEach(function (el, i) {
        el.style.display = i < shown ? '' : 'none';
      });
      if (shown >= items.length) {
        btn.textContent = 'Show less';
      } else {
        btn.textContent = 'Show ' + Math.min(PAGE_SIZE, items.length - shown) + ' more';
      }
    }

    btn.addEventListener('click', function () {
      shown = shown >= items.length ? PAGE_SIZE : Math.min(shown + PAGE_SIZE, items.length);
      apply();
    });

    list.after(btn);
    apply();
  });
})();
