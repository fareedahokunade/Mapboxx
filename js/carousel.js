window.addEventListener('scroll', function() {
    let scrollPosition = window.pageYOffset;

   
});

$(document).ready(function () {

    
    // Fetch the JSON data
    const urlParams = new URLSearchParams(window.location.search);
   
    const id = urlParams.get('id');
    let bimage;
    let bimage2;
    $.getJSON('content.json', function (data) {
        var content = $('#content');
       
        var pages = data[id].pages;

        pages.forEach(function (page, index) {
            if (page.type === 'text') {
                
                // Create the text background page
               
                var textPage = $('<div>', { class: 'page', id: 'page' + (index + 1) });
                textPage.css('background-image', 'url(' + page.background + ')');
                var textBackground = $('<div>', { class: 'text-background' });
                bimage = page.background2;
                bimage2 = page.background3;
                var title = $('<h1 class="heading">').text(page.title);
               

                // Create the overlay for project details
                var overlay = $('<div>', { class: 'overlay' });
                var duration = $('<h2>').text('' + page.details.duration);
                var info = $('<h2>').text('' + page.details.info);
                
                overlay.append(info,duration);
                textBackground.append(title, overlay);
                textPage.append(textBackground);
                content.append(textPage);

            } else if (page.type === 'carousel') {
                var currentIndex = 0;
                


                // Create the carousel page
                var carouselPage = $('<div>', { class: 'page', id: 'page' + (index + 1) });
                carouselPage.css('background-image', 'url(' + bimage + ')');
                var carouselTitle = $('<h1>', { class: 'carousel-title' }).text(page.title);
                var carousel = $('<div>', { class: 'carousel' });

                page.slides.forEach(function (slide, index) {
                    var card = $('<div>', { class: 'card' });
                    var cardinfo =  $('<div>', { class: 'cardinfo' });
                    card.css('background-image', 'url(' + slide.image1 + ')');
                    var img = $('<img>', { src: slide.image, alt: slide.title, class: 'card-image' });
                    var cardTitle = $('<h2>', { class: 'card-title' }).text(slide.title);
                    var cardContent;
                    if (slide.title === "Challenges and Lesson Learned") {
                        cardContent = $('<p>', { class: 'card-content' }).text('' + slide.content.join(''));

                    
                    } else if (slide.title === "Key Challenges") {
                        // Create a div to hold the content
                        cardContent = $('<p>', { class: 'card-content' }).text(''+ slide.content.join('\n\n'));

                        
                    }
                    
                    else {
                        cardContent = $('<p>', { class: 'card-content' }).text(slide.content);
                    }
                    var readMore = $('<button>', { class: 'read-more' }).text('Read More');

                    

                    cardinfo.append(cardContent, readMore);

                    card.append(img, cardTitle, cardinfo);
                    carousel.append(card);

                    // Zoom functionality
                    var cardZoom = $('<div>', { class: 'card-zoom' });
                    var next = $(`
                    <div class="next">
                        <svg viewbox="0 0 20 20">
                          <circle r="7" cx="10" cy="10" stroke="#fff" stroke-width="0.04vw"  fill-opacity="0"/>
                          <path d="M9 8 L11 10 L9 12" stroke="#fff" stroke-width="0.04vw" fill-opacity="0">
                           
                          </path>
                        </svg>
                      </div>`);

                    var prev = $(`
                      <div class="prev">
                        <svg viewBox="0 0 20 20">
                          <circle r="7" cx="10" cy="10" stroke="#fff" stroke-width="0.04vw" fill-opacity="0"/>
                          <path d="M11 8 L9 10 L11 12" stroke="#fff" stroke-width="0.04vw" fill-opacity="0">
                           
                          </path>
                        </svg>
                      </div>
                    
              `)
                    var zoomImg = $('<img>', { src: slide.image, alt: slide.title });
                    var zoominfo = $('<div>', { class: 'zoom-info' });
                    var zoomTitle = $('<h2>', { class: 'card-title' }).text(slide.title);
                    var zoomContent;
                    if (slide.title === "Challenges and Lesson Learned") {
                         // Create a div to hold the content
                         zoomContent = $('<div>', { class: 'card-content' });
                    
                         // Process the content
                         let formattedContent = slide.content.map((item, index) => {
                             if (index % 2 !== 1) {
                                 return '<strong>' + item + '</strong>';
                             }
                             return item;
                         }).join('\n\n');
                         
                         zoomContent.html(formattedContent);
                    }
                    else if (slide.title === "Key Challenges") {
                        zoomContent = $('<p>', { class: 'card-content' }).html(slide.content.join('\n\n'));

                    }
                    else if ( slide.title === "Water Resource Impact") {
                         // Create a div to hold the content
                         zoomContent = $('<div>', { class: 'card-content' });
                    
                         // Process the content
                         let formattedContent = slide.content.map((item, index) => {
                             if (index % 2 !== 1) {
                                 return '<strong>' + item + '</strong>';
                             }
                             return item;
                         }).join('\n\n');
                         
                         zoomContent.html(formattedContent);

                    }
                    else if (slide.title === "Overview") {
                        // Create a div to hold the content
                        zoomContent = $('<div>', { class: 'card-content' });
                    
                    // Process the content
                    let formattedContent = slide.content.map((item, index) => {
                        if (index % 2 !== 1) {
                            return '<strong>' + item + '</strong>';
                        }
                        return item;
                    }).join('\n\n');
                    
                    zoomContent.html(formattedContent);
                }
                    else if ( slide.title === "Socio-economic Impact") {
                         // Create a div to hold the content
                         zoomContent = $('<div>', { class: 'card-content' });
                    
                         // Process the content
                         let formattedContent = slide.content.map((item, index) => {
                             if (index % 2 !== 1) {
                                 return '<strong>' + item + '</strong>';
                             }
                             return item;
                         }).join('\n\n');
                         
                         zoomContent.html(formattedContent);

                    }
                   
                    else {
                        zoomContent = $('<p>', { class: 'card-content' }).text(slide.content);
                    }
                    var close = $('<span>', { class: 'close' }).text('✖');

                    zoominfo.append(zoomTitle, zoomContent)

                    cardZoom.append(close, next, prev, zoomImg, zoominfo);
                    cardZoom.attr('data-index', index);

                    $('body').append(cardZoom);

                    readMore.on('click', function () {
                        cardZoom
                        cardZoom.css('display', 'flex');
                        cardZoom.css('opacity', '1')
                        currentIndex = index;
                    });

                    close.on('click', function () {
                        cardZoom.css('display', 'none');
                        
                    });

                    // Add functionality for next button
                    next.on('click', function () {
                        currentIndex = (currentIndex + 1) % page.slides.length;
                        updateZoomContent(currentIndex);
                    });

                    // Add functionality for prev button
                    prev.on('click', function () {
                        currentIndex = (currentIndex - 1 + page.slides.length) % page.slides.length;
                        updateZoomContent(currentIndex);
                    });
                });

                // Function to update zoom content
                function updateZoomContent(index) {
                    var slide = page.slides[index];
                    var cardZoom = $('[data-index="' + index + '"]');

                    cardZoom.find('img').attr('src', slide.image);
                    cardZoom.find('.card-title').text(slide.title);

                    var zoomContent;
                    if (slide.title === "Challenges and Lesson Learned") {
                        zoomContent = $('<div>', { class: 'card-content' });
                    
                        // Process the content
                        let formattedContent = slide.content.map((item, index) => {
                            if (index % 2 !== 1) {
                                return '<strong>' + item + '</strong>';
                            }
                            return item;
                        }).join('\n\n');
                        
                        zoomContent = zoomContent.html(formattedContent);
                    } else if (slide.title === "Key Challenges") {
                            zoomContent = slide.content.join('\n\n');
                            
                            
                 } else if (slide.title === "Water Resource Impact") {
                    zoomContent = $('<div>', { class: 'card-content' });
                    
                    // Process the content
                    let formattedContent = slide.content.map((item, index) => {
                        if (index % 2 !== 1) {
                            return '<strong>' + item + '</strong>';
                        }
                        return item;
                    }).join('\n\n');
                    
                    zoomContent = zoomContent.html(formattedContent);
                        
                } 
                else if (slide.title === "Overview") {
                    // Create a div to hold the content
                    zoomContent = $('<div>', { class: 'card-content' });
                    
                         // Process the content
                         let formattedContent = slide.content.map((item, index) => {
                             if (index % 2 !== 1) {
                                 return '<strong>' + item + '</strong>';
                             }
                             return item;
                         }).join('\n\n');
                         
                         zoomContent = zoomContent.html(formattedContent);
                
            }
                else if (slide.title === "Socio-economic Impact") {
                    zoomContent = $('<div>', { class: 'card-content' });
                    
                    // Process the content
                    let formattedContent = slide.content.map((item, index) => {
                        if (index % 2 !== 1) {
                            return '<strong>' + item + '</strong>';
                        }
                        return item;
                    }).join('\n\n');
                    
                    zoomContent = zoomContent.html(formattedContent);
                    
            } 
                    else {
                        zoomContent = slide.content;
                    }

                    cardZoom.find('.card-content').html(zoomContent);

                    $('[data-index]').css('display', 'none');
                    cardZoom.css('display', 'flex');
                }



                carouselPage.append(carouselTitle, carousel);
                content.append(carouselPage);

                carousel.slick({
                    infinite: true,
                    speed: 300,
                    slidesToShow: 4,
                    adaptiveHeight: true,
                    prevArrow: `
                    <button type="button" class="slick-prev">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40">
                            <circle r="11" cx="12" cy="12" stroke="#fff" stroke-width="1" fill="rgb(3,3,3)"/>
                            <path d="M14 8 L10 12 L14 16" stroke="#fff" stroke-width="1" fill="none"/>
                        </svg>
                    </button>`,
                nextArrow: `
                    <button type="button" class="slick-next">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40">
                            <circle r="11" cx="12" cy="12" stroke="#fff" stroke-width="1" fill="rgb(3,3,3)"/>
                            <path d="M10 8 L14 12 L10 16" stroke="#fff" stroke-width="1" fill="none"/>
                        </svg>
                    </button>`
                });
               
                










            } else if (page.type === 'gallery') {
                // Create the gallery page
                var galleryPage = $('<div>', { class: 'page gallery-page', id: 'page' + (index + 1) });
                galleryPage.css('background-image', 'url(' + bimage2 + ')');
                var galleryHeading = $('<h1>', { class: "gallery-heading" }).text('BROWSE OUR GALLERY');
                var line = $('<hr>');
                var galleryInfo = $('<p class = gallery-paragraph>').text('Explore a selection of images and videos from our collection. Use the controls to navigate through the gallery.');

                var galleryContainer = $('<div>', { class: 'gallery-container' });
                var galleryCard = $('<div>', { class: 'gallery-card' });
                var galleryContent = $('<div>', { class: 'gallery-content' });
                var further = $('<button>', { class: 'further' }).text('Further Reading');
                further.on('click', function() {
                    window.open(`${page['further-reading']}`, '_blank'); // Replace with your URL
                });

                // Add the first card content
                var firstSlide = page.slides[0];
                var mediaElement;

                // Determine if the content is a video or image
                if (firstSlide.image.endsWith('.mp4')) {
                    mediaElement = $('<video>', { class: 'gallery-media', autoplay: true, controls: true }).attr('src', firstSlide.image);
                } 
                else if (firstSlide.image.startsWith('https') && !firstSlide.image.endsWith('.jpg')) {
                    mediaElement = $('<iframe>', { 
                        class: 'gallery-media', 
                        src: firstSlide.image, 
                        frameborder: '0', 
                        allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture', 
                        allowfullscreen: true 
                    });
                }

                
                
                else {
                    mediaElement = $('<img>', { class: 'gallery-media' }).attr('src', firstSlide.image);
                }

                var cardTitle = $('<h2>', { class: 'gallery-card-title' }).text(firstSlide.title);
                var cardContent = $('<p>', { class: 'gallery-card-content' }).text(firstSlide.content);

                galleryCard.append(mediaElement);
                galleryContent.append(cardContent);
                galleryContainer.append(galleryCard, galleryContent);
                galleryPage.append(galleryHeading, line, galleryInfo, galleryContainer);

                // Add controls for scrolling
                var prevButton = $(`
                <button type="button" class="gallery-control prev">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40">
                        <circle r="11" cx="12" cy="12" stroke="#fff" stroke-width="1" fill="white" border = "black"/>
                        <path d="M14 8 L10 12 L14 16" stroke="#333" stroke-width="1" fill="none"/>
                    </svg>
                </button>`);
                var nextButton = $(`<button type="button" class="gallery-control next">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40">
                    <circle r="11" cx="12" cy="12" stroke="#fff" stroke-width="1" fill="white"/>
                    <path d="M10 8 L14 12 L10 16" stroke="#333" stroke-width="1" fill="none"/>
                </svg>
            </button>`);
                galleryPage.append(prevButton, nextButton,further);

                content.append(galleryPage);

                // Update gallery content based on button clicks
                var currentIndex = 0;
                function updateGallery(index) {
                    var slide = page.slides[index];
                    var newMediaElement;

                    // Determine if the content is a video or image
                    if (slide.image.endsWith('.mp4')) {
                        newMediaElement = $('<video>', { class: 'gallery-media', controls: true }).attr('src', slide.image);
                    } 
                    else if (slide.image.startsWith('https')  && !slide.image.endsWith('jpg')) {
                        console.log('youtube');
                        newMediaElement = $('<iframe>', { 
                            class: 'gallery-media', 
                            src: slide.image, 
                            allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture', 
                            allowfullscreen: true 
                        });
                    }
                    
                    else {
                        newMediaElement = $('<img>', { class: 'gallery-media' }).attr('src', slide.image);
                    }

                    mediaElement.replaceWith(newMediaElement);
                    mediaElement = newMediaElement; // Update the reference
                    galleryCard.append(mediaElement); // Re-append the new media element
                    cardTitle.text(slide.title);
                    cardContent.text(slide.content);
                }

                nextButton.on('click', function () {
                    currentIndex = (currentIndex + 1) % page.slides.length;
                    updateGallery(currentIndex);
                });

                prevButton.on('click', function () {
                    currentIndex = (currentIndex - 1 + page.slides.length) % page.slides.length;
                    updateGallery(currentIndex);
                });
            }
            
        });
    });
});