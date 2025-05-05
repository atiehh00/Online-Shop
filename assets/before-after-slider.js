document.addEventListener('DOMContentLoaded', function () {
  const sliders = document.querySelectorAll('.comparison-slider');

  sliders.forEach(slider => {
    const handle = slider.querySelector('.comparison-handle');
    const beforeImage = slider.querySelector('.before-image');
    let isDragging = false;

    function setInitialPosition() {
      const sliderWidth = slider.offsetWidth;
      const center = sliderWidth / 2;
      handle.style.left = center + 'px';
      beforeImage.style.width = center + 'px';
    }

    function startDrag(e) {
      e.preventDefault();
      isDragging = true;
    }

    function drag(e) {
      if (!isDragging) return;
      
      let clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
      const sliderRect = slider.getBoundingClientRect();
      let position = clientX - sliderRect.left;
      position = Math.max(0, Math.min(position, sliderRect.width));

      handle.style.left = position + 'px';
      beforeImage.style.width = position + 'px';
    }

    function stopDrag() {
      isDragging = false;
    }

    handle.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);

    handle.addEventListener('touchstart', startDrag, { passive: true });
    document.addEventListener('touchmove', drag, { passive: true });
    document.addEventListener('touchend', stopDrag);

    window.addEventListener('resize', setInitialPosition);
    setInitialPosition();
  });
});
