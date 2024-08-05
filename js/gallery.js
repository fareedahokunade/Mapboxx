document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        console.error('No "id" parameter found in URL');
        return;
    }

    fetch('gallery.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const gallery = document.getElementById('gallery');
            const galleryData = data[id];

            if (!galleryData) {
                console.error(`No data found for id: ${id}`);
                return;
            }

            const cards = [];
            const fullscreen = document.getElementById('fullscreen');
            const fullscreenContent = document.getElementById('fullscreen-content');
            const closeButton = document.getElementById('close-button');

            galleryData.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('card');

                if (item.type === 'image') {
                    const img = document.createElement('img');
                    img.src = item.src;
                    img.alt = item.alt;
                    card.appendChild(img);
                } else if (item.type === 'video') {
                    const video = document.createElement('video');
                    video.controls = false;
                    video.pause(); // Ensure video is paused initially
                    const source = document.createElement('source');
                    source.src = item.src;
                    source.type = 'video/mp4';
                    video.appendChild(source);
                    card.appendChild(video);
                }

                card.addEventListener('click', () => openFullscreen(card, item.type, item.src));

                gallery.appendChild(card);
                cards.push({ type: item.type, src: item.src, element: card });
            });

            let currentIndex = 0;

            function updateFullscreenContent() {
                fullscreenContent.innerHTML = '';
                const { type, src } = cards[currentIndex];
                const content = document.createElement(type === 'image' ? 'img' : 'video');
                if (type === 'video') {
                    content.controls = true;
                    const source = document.createElement('source');
                    source.src = src;
                    source.type = 'video/mp4';
                    content.appendChild(source);
                } else {
                    content.src = src;
                    content.alt = 'Fullscreen Image'; // alt is not used for images in fullscreen, but it is kept for consistency
                }

                fullscreenContent.appendChild(content);
                fullscreenContent.appendChild(closeButton); // Ensure close button is added
                fullscreenContent.style.transform = 'scale(1)';
            }

            function openFullscreen(card, type, src) {
                document.querySelector('.controls').style.display = 'flex';
                fullscreen.style.display = 'flex';
                currentIndex = cards.findIndex(c => c.type === type && c.src === src);
                updateFullscreenContent();
                document.querySelectorAll('.card').forEach(c => {
                    if (c !== card) {
                        c.style.transform = 'translateX(-100vw)'; // Move other cards out of view
                    }
                });

                // Ensure video elements are played only in fullscreen
                const video = fullscreenContent.querySelector('video');
                if (video) {
                    video.play();
                }
            }

            function closeFullscreen() {
                // Pause any playing videos
                const videos = fullscreenContent.querySelectorAll('video');
                videos.forEach(video => video.pause());
                document.querySelector('.controls').style.display = 'none';

                fullscreenContent.style.transform = 'scale(0)';
                document.querySelectorAll('.card').forEach(card => {
                    card.style.transform = ''; // Reset the transform on other cards
                });
                setTimeout(() => {
                    fullscreen.style.display = 'none';
                }, 500); // Match the transition duration to hide the overlay
            }

            closeButton.addEventListener('click', closeFullscreen);

            document.querySelector('.next').addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % cards.length;
                updateFullscreenContent();
            });

            document.querySelector('.prev').addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + cards.length) % cards.length;
                updateFullscreenContent();
            });
        })
        .catch(error => console.error('Error fetching the JSON data:', error));
});
