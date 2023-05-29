$(document).ready(function (){
    var tableDriver = null;
    var map = null;
    var arrPoints = [];
    var polylineTracking = null;

    function loadGoogleMAP() {
        var setMapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(21.036809, 105.782771),
            gestureHandling: 'greedy',
            styles: [
                {
                    featureType: 'transit',
                    elementType: 'labels.icon',
                    stylers: [{visibility : 'off'}]
                },
                
                {
                    featureType: 'transit.station',
                    elementType: 'geometry',
                    stylers: [{visibility: "off"}]
                },

                {
                    featureType: "poi.business",
                    stylers: [{ visibility: "off"}]
                },
                
                {
                    featureType: 'poi',
                    elementType: 'geometry',
                    stylers: [{visibility: "off"}]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'geometry',
                    stylers: [{visibility: "off"}]
                },
                {
                    featureType: 'landscape.natural',
                    elementType: 'geometry',
                    stylers: [{visibility: "off"}]
                },
                { 
                    featureType: "poi.business", 
                    stylers: [ { "visibility": "off" } ] 
                },
                { 
                    featureType: "poi.government", 
                    stylers: [ { "visibility": "off" } ] 
                },
                { 

                    featureType: "poi.medical", 
                    stylers: [ { "visibility": "off" } ] 
                },
                { 
                    featureType: "poi.park", 
                    elementType: "labels", 
                    stylers: [ { "visibility": "off" } ]                  
                },
                { 
                    featureType: "poi.place_of_worship", 
                    stylers: [ { "visibility": "off" } ] 
                },
                { 
                    featureType: "poi.school", 
                    stylers: [ { "visibility": "off" }]

                },
                { 
                    featureType: "poi.sports_complex", 
                    stylers: [ { "visibility": "off" } ] 
                }
            ],
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        };

        circleSelectDevice = new google.maps.Circle({
            id: 'circle_select_device_id',
            map: map,
            strokeColor: '#FF0000',
            strokeOpacity: 0.5,
            strokeWeight: 1,
            fillColor: '#AA0000',
            fillOpacity: 0.2,
            radius: 30
        });

        map = new google.maps.Map(document.getElementById('map'), setMapOptions);
        circleSelectDevice.setMap(map);

        mMarker = new MarkerWithLabel({
            position: {
                lat: 21.036809,
                lng: 105.782771
            },
            icon: {
                //url: ,
                //rotation: Math.floor(Math.random() * 55) + 5
                rotation: 200
            },
            labelAnchor: new google.maps.Point(-3, 45),
            labelContent: '29E04768',
            labelClass: 'CustomizeLabel',
        });
        //mMarker.setMap(map);

        var startPoint = new google.maps.LatLng(21.036809,　105.782771)
        startMarker = new google.maps.Marker({
            position: startPoint,
            title: "Điểm đón khách",
            icon: 'https://s3-ap-southeast-1.amazonaws.com/image-emd/defaults/map-marker-1-32x32.png'
        });
        endMarker = new google.maps.Marker({
            title: "Điểm trả",
            icon: 'https://s3-ap-southeast-1.amazonaws.com/image-emd/defaults/map-marker-2-32x32.png'
        });

        startMarker.setMap(map)
    }
    
    var drivers = [
        {
            license_plate: '29E04768',
            device_id: '866728062467831'
        },
        {
            license_plate: '29E01479',
            device_id: '866728062481048'
        },
        {
            license_plate: '29E04528',
            device_id: '860264056164941'
        },
        {
            license_plate: '29E04633',
            device_id: '866728062495436'
        },
        {
            license_plate: '29E00442',
            device_id: '860264050805788'
        },
        {
            license_plate: '29E04186',
            device_id: '866728062511927'
        },
        {
            license_plate: '29E04219',
            device_id: '866728062506554'
        },
        {
            license_plate: '29E01230',
            device_id: '860264056165054'
        },
        {
            license_plate: '29E04236',
            device_id: '866728062478424'
        },
        {
            license_plate: '29E04827',
            device_id: '866728062499206'
        }
    ]
    var records = []
    for (let i = 0; i < drivers.length; i ++) {
        let temp = []
        temp[0] = i + 1
        temp[1] = drivers[i].license_plate
        temp[2] = drivers[i].device_id
        records.push(temp);
    }

    function createTableDrivers() {
        tableDriver = $('#table_drivers').DataTable({
            data: records,
            columns: [
                {title: "STT"},
                {title: "License Plate"},
                {title: "Device Code"}
            ],
            columnDefs: [
                {
                    targets: 0,
                    width: 60,
                },
                {
                    targets: 1,
                    width: 150,
                }
            ],
            "paging": true,
            "language": {
                "paginate": {
                    next: "Sau",
                    previous: "Trước"
                },
                "info": "Từ <b>_START_</b> đến <b>_END_</b> trên tổng số <b>_TOTAL_</b>",
                "lengthMenu": "_MENU_ /Trang",
                "search": "_INPUT_",
                "searchPlaceholder": "Tìm kiếm..."
            },
            "ordering": false,
            "select": true,
        })
    }

    loadGoogleMAP();

    createTableDrivers();

    function drawTracking(points, startPoint, endPoint) {
        startMarker = new google.maps.Marker({
            position: startPoint,
            title: "Điểm đón khách",
            icon: 'https://s3-ap-southeast-1.amazonaws.com/image-emd/defaults/map-marker-1-32x32.png'
        });
        endMarker = new google.maps.Marker({
            position: endPoint,
            title: "Điểm trả",
            icon: 'https://s3-ap-southeast-1.amazonaws.com/image-emd/defaults/map-marker-2-32x32.png'
        });
        startMarker.setMap(map)
        endMarker.setMap(map)
        polylineTracking = new google.maps.Polyline({
            path: points,
            strokeColor: "#02A6FF",
            strokeOpacity: 0.85,
            strokeWeight: 4.5
        });
        polylineTracking.setMap(map)
    }

    function getJourney(licensePlate, startTime, endTime) {
        $.ajax({
            url: 'http://192.168.30.56:4000/journey/path?platenumber=29E05989&from=1685057160&to=1685075160',
            method: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            success: function(response) {
                console.log(response)
                let startPoint = new google.maps.LatLng(response.data.items[0].Lt, response.data.items[0].Ln)
                let endPoint = new google.maps.LatLng(response.data.items[response.data.items.length - 1].Lt, response.data.items[response.data.items.length - 1].Ln)

                let points = response.data.items.map((point, index) => {
                    let tempPoint = new google.maps.LatLng(point.Lt, point.Ln)
                    return tempPoint
                })

                drawTracking(points, startPoint, endPoint)
            },
            error: function(err) {
                console.log(err)
            }
        })
    }

    $('#btn_tracking').click(function() {
        console.log($('#start_time').val())
        //getJourney()
    })

})
