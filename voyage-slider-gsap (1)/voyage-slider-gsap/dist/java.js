function pop(event) {
    const amount = 50; // particle amount
    let x = event.clientX,
      y = event.clientY + window.scrollY;
  
    const create = (x, y) => {
      for (let i = 0; i < amount; i++)
        createParticle(x, y, event.target.dataset.particle);
    };
  
    // check if the button gots clicked with the keyborad
    if (event.clientX === 0 && event.clientY === 0) {
      const box = event.target.getBoundingClientRect();
      x = box.left + box.width / 2;
      y = box.top + box.height / 2;
    }
    create(x, y);
  }
  
  function createParticle(x, y, image) {
    const particle = document.createElement("particle");
    document.body.appendChild(particle);
  
    // just play a little bit with these values 🙂
    const size = Math.floor(Math.random() * 28 + 8);
    const destinationX = (Math.random() - 0.5) * 300;
    const destinationY = (Math.random() - 0.5) * 300;
    const rotation = Math.random() * 500;
    const duration = Math.random() * 1000 + 4000;
    const delay = Math.random() * 250;
  
    particle.style.backgroundImage = `url(${image})`;
    particle.style.width = particle.style.height = `${size}px`;
  
    const animation = particle.animate(
      [
        {
          transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg)`,
          opacity: 1
        },
        {
          transform: `translate(-50%, -50%) translate(${x + destinationX}px, ${
            y + destinationY
          }px) rotate(${rotation}deg)`,
          opacity: 0
        }
      ],
      {
        duration,
        easing: "cubic-bezier(0, .9, .57, 1)",
        delay
      }
    );
    animation.onfinish = removeParticle;
  }
  function removeParticle(event) {
    event.srcElement.effect.target.remove();
  }
  if (document.body.animate) document.body.addEventListener("click", pop);