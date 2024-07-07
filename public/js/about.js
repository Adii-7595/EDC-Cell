// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.count');

    counters.forEach(counter => {
        const animateCount = () => {
            const target = +counter.getAttribute('data-target');
            const unit = counter.getAttribute('data-unit') || '+';
            const count = +counter.innerText.replace(/[\+\sCr+]/g, ''); // Remove existing suffixes
            const speed = 5000; // Slow down the count
            const startTime = performance.now();

            const updateCount = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / speed, 1);
                const newValue = Math.ceil(progress * target);

                counter.innerText = newValue + (unit === 'cr' ? ' Cr+' : unit);

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                }
            };

            requestAnimationFrame(updateCount);
        };

        animateCount();
    });
});
