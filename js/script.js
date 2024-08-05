document.addEventListener('DOMContentLoaded', async function () {
    const searchBox = document.getElementById('searchBox');
    var span = document.getElementsByClassName("close")[0];
    const locationsList = document.getElementById('locationsList');
    var modal = document.getElementById("myModal");
    var iframe = document.getElementById("popupIframe");
    const maincontent = document.getElementById('maincontent');
    const popup = document.getElementById('popup');
    const closeButton = document.querySelector('.close');
    
    const mapp = document.getElementById('map');
    const closepop = document.getElementById('enterMapButton');
    
    let map;
    mapboxgl.accessToken = 'pk.eyJ1IjoibXVpejEiLCJhIjoiY2x5azRzMmFoMDM1dTJrczIyMzFweTZwaSJ9.r14As2n7lGPLwlr3la63ew';
    map = new mapboxgl.Map({
        container: mapp,
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/muiz1/clyvheadi005n01podazr3oig',
        zoom: 4,
        center: [0, 20],

    });

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.classList.remove('show');
            var currentCenter = map.getCenter();

     // Remove the 'show' class to start the fade-out effect
            
        
                map.easeTo({
                    center: currentCenter,
                    zoom: 2,
                    bearing: 30,
                    pitch: 0,
                    speed: 4,
                    duration: 3000
                });
    
                map.once('zoomend', function () {
                    userInteracting = false
                });
           // Delay to match the CSS transition duration
        }
    };
    span.onclick = function() {
        modal.classList.remove('show'); // Remove the 'show' class to start the fade-out effect
        var currentCenter = map.getCenter();
            map.easeTo({
                center: currentCenter,
                zoom: 2,
                bearing: 30,
                pitch: 0,
                speed: 4,
                duration: 3000
            });
            userInteracting = false
    
            map.once('zoomend', function () {
                startSpinning();
            });
       // Delay to match the CSS transition duration
    };



    window.onload = function () {
       
        document.getElementById('welcomeModal').style.display = "flex";
    };


    const locations = [
        {
            name: 'Angola SADC',
            coordinates: [18.5, -12.5], // Adjust the coordinates accordingly
        },
        {
            name: 'Botswana SADC',
            coordinates: [24.0, -22.0], // Adjust the coordinates accordingly
        },
        {
            name: 'Comoros SADC',
            coordinates: [44.3, -12.2], // Adjust the coordinates accordingly
        },
        {
            name: 'Democratic Republic of the Congo SADC',
            coordinates: [23.7, -2.9], // Adjust the coordinates accordingly
        },
        {
            name: 'Lesotho SADC',
            coordinates: [28.2, -29.6], // Adjust the coordinates accordingly
        },

        {
            name: 'Malawi SADC',
            coordinates: [34.3, -13.3], // Adjust the coordinates accordingly
        },
        {
            name: 'Seychelles SADC',
            coordinates: [55.4, -4.6], // Adjust the coordinates accordingly
        },
        {
            name: 'Tanzania SADC',
            coordinates: [34.8, -6.4], // Adjust the coordinates accordingly
        },
        {
            name: 'Guarani Aquifer System',
            coordinates: [47, -12], // Adjust the coordinates accordingly
        },
        {
            name: 'Kura River Basin',
            coordinates: [42.76519906444574, 40.67156883058258], // Adjust the coordinates accordingly
        },
        {
            name: 'Mano River Basin',
            coordinates: [-11.503497, 6.919164], // Adjust the coordinates accordingly
        },
        {
            name: 'Danube River',
            coordinates: [23.57245, 46.06817], // Adjust the coordinates accordingly
        },
        {
            name: 'Arafura and Timor Seas',
            coordinates: [132.884, -11.005], // Adjust the coordinates accordingly
        },
        {
            name: 'La Paz, Bolivia Amazon Basin',
            coordinates: [-68.11929349, -16.48968911], // Adjust the coordinates accordingly
        },
        {
            name: 'Guyana-Brazil Border Amazon Basin',
            coordinates: [-59.79735974, 3.357543536], // Adjust the coordinates accordingly
        },
        {
            name: 'Ecuador-Peru Border Amazon Basin',
            coordinates: [-79.21096703, -4.010426019], // Adjust the coordinates accordingly
        },
        {
            name: 'Amazon Region, Colombia Amazon Basin',
            coordinates: [-72.3775478, 2.00988522], // Adjust the coordinates accordingly
        },
        {
            name: 'Sixaola River Basin',
            coordinates: [-83.061731, 9.487307], // Adjust the coordinates accordingly
        },

        {
            name: 'South America Humboldt',
            coordinates: [-81.09195, -5.05694], // Adjust the coordinates accordingly
        },



        // Add more locations as needed
    ];

    let spinAnimationId = null;

    closepop.addEventListener('click', function () {
        closeModal();
    });

    const backspaceIcon = document.getElementById('backspaceicon');

    const secondsPerRevolution = 60;
    // Above zoom level 5, do not rotate.
    const maxSpinZoom = 3;
    // Rotate at intermediate speeds between zoom levels 3 and 5.
    const slowSpinZoom = 3;

    let userInteracting = false;
    let spinEnabled = true;





    function startSpinning() {
        const zoom = map.getZoom();
        if (!userInteracting && zoom < maxSpinZoom) {
            let distancePerSecond = 360 / secondsPerRevolution;
            if (zoom > slowSpinZoom) {
                // Slow spinning at higher zooms
                const zoomDif =
                    (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
                distancePerSecond *= zoomDif;
            }
            const center = map.getCenter();
            center.lng -= distancePerSecond;
            center.lng = ((center.lng + 180) % 360) - 180;
            // Smoothly animate the map over one second.
            // When this animation is complete, it calls a 'moveend' event.
            map.easeTo({ center, easing: (n) => n });




        }
    }

    startSpinning();
    map.on('mousedown', () => {
        userInteracting = true;
    });

    // Restart spinning the globe when interaction is complete
    map.on('mouseup', () => {
        userInteracting = false;
        startSpinning();
    });

    // These events account for cases where the mouse has moved
    // off the map, so 'mouseup' will not be fired.
    map.on('dragend', () => {
        userInteracting = false;
        startSpinning();
    });
    map.on('pitchend', () => {
        userInteracting = false;
        startSpinning();
    });
    map.on('rotateend', () => {
        userInteracting = false;
        startSpinning();
    });

    // When animation is complete, start spinning if there is no ongoing interaction
    map.on('moveend', () => {
        startSpinning();
          
    });
    



    function stopSpinning() {
        cancelAnimationFrame(spinAnimationId); // Cancel the animation frame
        spinAnimationId = null; // Reset the animation ID
    }

    function closeModal() {
        document.getElementById('welcomeModal').style.display = "none";
        maincontent.style.display = "block";
         document.body.style.overflow = 'auto';

        map.easeTo({
            center: [0, 20],
            zoom: 2,
            bearing: 30,
            pitch: 0,
            duration: 5000,
            essential: true
        });

        setTimeout(() => {
            startSpinning()
        }, 5000)
    }





    closepop.addEventListener('click', function () {
        closeModal();
    });
    let geojson;

    try {
        const response = await fetch('locations.json');
        geojson = await response.json();
    }
    catch (error) {
        console.error('Error loading content:', error);
    }

    let hoveredPolygonId = null;
    map.on('load', () => {
        map.addSource('states', {
            'type': 'geojson',
            'data': geojson
        });

        // The feature-state dependent fill-opacity expression will render the hover effect
        // when a feature's hover state is set to true.
        map.addLayer({
            'id': 'state-fills',
            'type': 'fill',
            'source': 'states',
            'layout': {},
            'paint': {
                'fill-color': '#052c56',
                'fill-opacity': [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    0.4,
                    0
                ]
            }
        });
        map.moveLayer('state-fills');


        // When the user moves their mouse over the state-fill layer, we'll update the
        // feature state for the feature under the mouse.
        let count = 0;
        map.on('mousemove', 'state-fills', (e) => {
            if (e.features.length > 0) {
                if (hoveredPolygonId !== null) {
                    map.setFeatureState(
                        { source: 'states', id: hoveredPolygonId },
                        { hover: false }
                    );
                }
                hoveredPolygonId = e.features[0].id;
                map.setFeatureState(
                    { source: 'states', id: hoveredPolygonId },
                    { hover: true }
                );
            }
        });


        // When the mouse leaves the state-fill layer, update the feature state of the
        // previously hovered feature.
        map.on('mouseleave', 'state-fills', () => {
            if (hoveredPolygonId !== null) {
                map.setFeatureState(
                    { source: 'states', id: hoveredPolygonId },
                    { hover: false }
                );
            }
            hoveredPolygonId = null;
        });

        

        map.on('click', 'state-fills', function (e) {
            const coordinates = e.lngLat;
            const name = e.features[0].properties.name;
            const description = locationDetails[name];


            

            stopSpinning();
            if (count === 0){
                map.flyTo({
                    center: coordinates,
                    zoom: 4,
                    pitch: 4,
                    bearing: 20,
                    speed: 2,
                    curve: 1,
                    easing: function (t) {
                        return t;
                    },
                    essential: true
                })
                count += 1
            }
            else{
                map.flyTo({
                    center: coordinates,
                    zoom: 2,
                    pitch: 4,
                    bearing: 20,
                    speed: 2,
                    curve: 1,
                    easing: function (t) {
                        return t;
                    },
                    essential: true
                })
                count -= 1

            }
            
            stopSpinning();;
        });
    })

 

    map.on('load', function () {
        // Assume your marker layer ID is 'marker-layer-id'
        map.on('click', 'combined-2-1wdcf1 copy', function (e) {
            // Access the properties of the clicked marker
            var coordinates = e.features[0].geometry.coordinates.slice();
            var name = e.features[0].properties.name;
            const locationDescription = locationDetails[name];
            let classl = name.replace(/\s+/g, ''); 

            // Ensure the popup appears over the clicked point
            
           
            locations.forEach(location => {
                if (location.name === name) {
                    
                }
            });
            userInteracting = true;
          

            map.flyTo({
                center: coordinates,
                zoom: 6,
                pitch: 4,
                bearing: 20,
                speed: 1,
                curve: 1,
                easing: function (t) {
                    return t;
                },
                essential: true
            });
            setTimeout(()=>{
                modal.classList.add('show'); // Add the 'show' class to trigger the fade-in effect
                iframe.src = `info.html?id=${classl}`;

            }, 1000)
            
          
       
           

            /* open pop-up here, you need to pass the name of the place 
            to the pop=up as an id , and the url needs to change when the pop-up opens
            e.g: info.html?id=Guyana-Brazil%20Border%20Amazon%20Basin
            the id should match the name of the key in content.json
            */
            
            
        });

    });

    backspaceIcon.addEventListener('click', function () {
        filterLocations();
        let currentValue = searchBox.value;
        let newValue = currentValue.slice(0, -1);
        searchBox.value = newValue;
    });

   

    const locationDetails = {
        "Angola SADC": "Angola is a member of the Southern African Development Community (SADC), a regional organization aimed at promoting economic development, peace, and security in Southern Africa. Angola's diverse landscapes include savannas, tropical rainforests, and the Namib Desert in the southwest.",
        "Botswana SADC": "Botswana is a landlocked country in Southern Africa and a member of the Southern African Development Community (SADC). Known for its stable democracy and rich wildlife, particularly in the Okavango Delta, Botswana is a significant player in regional economic and political matters.",
        "Comoros SADC": "Comoros, an island nation in the Indian Ocean, is a member of the Southern African Development Community (SADC). It consists of three major islands and numerous smaller islands, known for their volcanic origins and rich marine biodiversity.",
        "Democratic Republic of the Congo SADC": "The Democratic Republic of the Congo (DRC) is the second-largest country in Africa and a member of the Southern African Development Community (SADC). It is renowned for its vast rainforests, significant mineral wealth, and the Congo River, one of the world's longest rivers.",
        "Lesotho SADC": "Lesotho is a small, landlocked country entirely surrounded by South Africa and a member of the Southern African Development Community (SADC). Known as the 'Kingdom in the Sky' due to its mountainous terrain, Lesotho is notable for its high altitude and unique cultural heritage.",
        "Malawi SADC": "Malawi is a landlocked country in southeastern Africa and a member of the Southern African Development Community (SADC). Known as the 'Warm Heart of Africa', Malawi is renowned for its diverse wildlife, particularly in Lake Malawi, one of the largest lakes in Africa.",
        "Seychelles SADC": "Seychelles, an archipelago in the Indian Ocean, is a member of the Southern African Development Community (SADC). It is famous for its stunning beaches, coral reefs, nature reserves, and rare wildlife such as the giant Aldabra tortoises.",
        "Tanzania SADC": "Tanzania, located in East Africa, is a member of the Southern African Development Community (SADC). It is known for its vast wilderness areas, including the Serengeti National Park and Kilimanjaro National Park, home to Africa's highest mountain.",
        "Guarani Aquifer System": "The Guarani Aquifer System is one of the largest underground freshwater reservoirs in the world, extending across Brazil, Argentina, Paraguay, and Uruguay. It plays a crucial role in supplying water to these countries and supporting their agriculture and industry.",
        "Kura River Basin": "The Kura River Basin extends across Turkey, Georgia, and Azerbaijan. It is a critical water resource for these countries, supporting agriculture, industry, and human consumption in a region with varying climatic conditions.",
        "Mano River Basin": "The Mano River Basin is located in West Africa and extends through Sierra Leone, Liberia, Guinea, and Côte d'Ivoire. It is named after the Mano River and is crucial for the region's water supply, agriculture, and biodiversity.",
        "Danube River": "The Danube River is Europe's second-longest river, flowing through ten countries including Germany, Austria, Hungary, and Romania. It is a vital waterway for transport, commerce, and agriculture in Central and Eastern Europe.",
        "Arafura and Timor Seas": "The Arafura and Timor Seas are located between Australia and the islands of Indonesia. These seas are important for their rich marine biodiversity, significant fisheries, and strategic shipping routes.",
        "La Paz, Bolivia Amazon Basin": "La Paz is the administrative capital of Bolivia and part of the Amazon Basin. The city is known for its dramatic setting in a deep valley surrounded by mountains and its proximity to the Amazon rainforest, which is rich in biodiversity.",
        "Guyana-Brazil Border Amazon Basin": "The border region between Guyana and Brazil is part of the Amazon Basin, known for its dense rainforests, rich biodiversity, and indigenous cultures. This area is critical for conservation efforts and sustainable development.",
        "Ecuador-Peru Border Amazon Basin": "The border area between Ecuador and Peru is within the Amazon Basin, characterized by its lush rainforests, diverse wildlife, and significant river systems that contribute to the overall health of the Amazon rainforest.",
        "Amazon Region, Colombia Amazon Basin": "The Amazon region of Colombia is part of the vast Amazon Basin, known for its incredible biodiversity, including numerous species of plants, animals, and insects. It is a crucial area for environmental conservation and indigenous communities.",
        "Sixaola River Basin": "The Sixaola River Basin is located along the border between Costa Rica and Panama. It is an important watershed that supports agriculture, provides water for local communities, and sustains diverse ecosystems in the region.",
        "South America Humboldt": "The Humboldt Current, also known as the Peru Current, is a cold ocean current that flows northward along the west coast of South America. It is one of the most productive marine ecosystems in the world, supporting a rich diversity of marine life and important fisheries."
    };


    const locationImages = {
        "Angola SADC": "https://i.natgeofe.com/n/821c72a5-2206-4511-bcbc-c820d295d6a8/01okavango_3x2.jpg",
        "Botswana SADC": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/bc/b4/8f/river-wild.jpg?w=500&h=500&s=1",
        "Comoros SADC": "https://beninwanderland.com/wp-content/uploads/2019/12/dugout-canoes-in-lagoon-of-Trou-du-Prophete-Grande-Comore-Comoros.jpg",
        "Democratic Republic of the Congo SADC": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReagEibmlBsmLbNJrNGAknv9KeJLdfP_anUg&s",
        "Lesotho SADC": "https://ccij.io/wp-content/uploads/2021/03/LesothoDamWater_Katse_SechabaMokhethi_0002.jpg",
        "Malawi SADC": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT61lgr-g1l6EFPoppAeGYUm9F49vbohF44tg&s",
        "Seychelles SADC": "https://c4.wallpaperflare.com/wallpaper/438/47/785/seychelles-island-sea-tropical-wallpaper-preview.jpg",
        "Tanzania SADC": "https://pbs.twimg.com/media/E7cH-4CX0AIJPF6.jpg",
        "Guarani Aquifer System": "https://www.welcomeargentina.com/paseos/acuifero_guarani/esteros-del-ibera-1.jpg",
        "Kura River Basin": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDo97MP-CqFxBaag3trtWcQnQZoJA4lzwFOw&s",
        "Mano River Basin": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbP-VfwdP8T-WHZQuEBoH8-OVfqQ_YIkWUmQ&s",
        "Danube River": "https://cdn-blob.austria.info/cms-uploads-prod/default/0001/06/thumb_5494_default_header_big.jpeg",
        "Arafura and Timor Seas": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6fV4np5ReCipbhL-zXVKWp2DYtGWXgbB8sQ&s",
        "La Paz, Bolivia Amazon Basin": "https://pisatahua.org/wp-content/uploads/2016/09/amazon-rainforest-home.jpg",
        "Guyana-Brazil Border Amazon Basin": "https://landofsize.com/wp-content/uploads/2018/03/istock-643123304.jpg",
        "Ecuador-Peru Border Amazon Basin": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4WjcYZTGfgZfsbscIbgTsH9ylSdCmBDN9Xw&s",
        "Amazon Region, Colombia Amazon Basin": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjz3XUTDcIsJtUpsfLvvhy98JJ3BRIagBG-g&s",
        "Sixaola River Basin": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6ewmbusUdJj67ZHwMrUtjNljfSA7ilCGL7dyqWdXzWO85_9ChgpkQZIBE7DbVfKLHOeg&usqp=CAU",
        "South America Humboldt": "https://www.quasarex.com/wp-content/uploads/2021/02/galapagos-humboldt-current.jpg"
    };


    const dashboardButtons = document.querySelectorAll('.dashboard-button');

   

    dashboardButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            dashboardButtons.forEach(function (btn) {
                btn.classList.remove('clicked');
            });
            this.classList.add('clicked');
        });
    });

    locationsList.addEventListener('click', function (e) {
        if (e.target.tagName === 'LI') {
           
            const locationName = e.target.dataset.location;
            const locationDescription = locationDetails[locationName];
            let coordinate = [1, 2];
            let classl = locationName.replace(/\s+/g, ''); 
            locations.forEach(location => {
                if (location.name === locationName) {
                    coordinate = location.coordinates;
                }
            });
            userInteracting = true;
           

            map.flyTo({
                center: coordinate,
                zoom: 6,
                pitch: 4,
                bearing: 20,
                speed: 2.0,
                curve: 1,
                easing: function (t) {
                    return t;
                },
                essential: true
            });
           
            setTimeout(()=>{
                modal.classList.add('show'); // Add the 'show' class to trigger the fade-in effect
                iframe.src = `info.html?id=${classl}`;

            }, 1300)
          

             /* open pop-up here, you need to pass the name of the place 
            to the pop=up as an id , and the url needs to change when the pop-up opens
            e.g: info.html?id=Guyana-Brazil%20Border%20Amazon%20Basin
            the id should match the name of the key in content.json
            */



          
        }
    });



   
    

    searchBox.addEventListener('input', function () {
        const searchText = searchBox.value.toLowerCase();
        const locations = locationsList.getElementsByTagName('li');
        for (const location of locations) {
            const locationName = location.textContent.toLowerCase();
            if (locationName.includes(searchText)) {
                location.style.display = '';
            } else {
                location.style.display = 'none';
            }
        }
    });

    function filterLocations() {
        const searchText = searchBox.value.toLowerCase();
        const locations = locationsList.getElementsByTagName('li');
        for (const location of locations) {
            const locationName = location.textContent.toLowerCase();
            if (locationName.includes(searchText)) {
                location.style.display = '';
            } else {
                location.style.display = 'none';
            }
        }
    }
});