document.addEventListener('mousemove', function(e) {
    const sparkle = document.createElement('span');
    sparkle.style.left = e.pageX + 'px';
    sparkle.style.top = e.pageY + 'px';
    sparkle.classList.add('sparkle');
    document.body.appendChild(sparkle);
    setTimeout(() => {
      sparkle.remove();
    }, 600);
  });
  
  // Adding styles for sparkle effect
  document.head.insertAdjacentHTML('beforeend', `<style>
    .sparkle {
      pointer-events: none;
      position: absolute;
      width: 5px;
      height: 5px;
      background-color: #ccc;
      border-radius: 50%;
      box-shadow: 0 0 8px #fff;
      animation: fadeOut 600ms;
    }
    @keyframes fadeOut {
      from { transform: scale(1); }
      to { transform: scale(0); opacity: 0; }
    }
  </style>`);
  