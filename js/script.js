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

    window.onclick = function (event) {
        if (event.target == modal) {
            
            modal.classList.remove('show');
            modal.classList.add('closeb');
            
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
    span.onclick = function () {
        modal.classList.remove('show');
        modal.classList.add('closeb'); // Remove the 'show' class to start the fade-out effect
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
            name: 'ATSEA',
            coordinates: [132.884, -11.005], // Adjust the coordinates accordingly
        },
        {
            name: 'Amazon',
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

    const secondsPerRevolution = 120;
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


    // These events account for cases where the mouse has moved
    // off the map, so 'mouseup' will not be fired.




    map.getContainer().addEventListener('mouseleave', () => {
        userInteracting = false;
        startSpinning();
    });

    map.on('moveend', () => {
        if (!userInteracting) {
            startSpinning();
        }
    });
    // Detect when the mouse enters the map




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





    })



    map.on('load', function () {
        

        map.on('click', 'markers', function (e) {
            console.log('loaded');
            // Access the properties of the clicked marker
            console.log(e.features)
            var coordinates = e.features[0].geometry.coordinates.slice();
            var name = e.features[0].properties["Project Name"];
            console.log(name);
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
            
            setTimeout(() => {
                modal.classList.add('show'); // Add the 'show' class to trigger the fade-in effect
                iframe.src = `info.html?id=${classl}`;

            }, 1000)








        });

    });

    backspaceIcon.addEventListener('click', function () {
        filterLocations();
        let currentValue = searchBox.value;
        let newValue = currentValue.slice(0, -1);
        searchBox.value = newValue;
    });



    const locationDetails = [  
        "Amazon Basin",
        "ATSEA"

    ]





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
            console.log(locationName);
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
            

            setTimeout(() => {
                modal.classList.add('show'); // Add the 'show' class to trigger the fade-in effect
                iframe.src = `info.html?id=${classl}`;
                

            }, 1000)


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