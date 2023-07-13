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
    }
    
    var drivers = [
        // Binh Anh
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
        },

        // DT BK
        {
            license_plate: '29E05989',
            device_id: '10004263'
        },
        {
            license_plate: '29E04853',
            device_id: '10004304'
        },
        {
            license_plate: '29E05743',
            device_id: '10004197'
        },
        {
            license_plate: '29E04783',
            device_id: '10004369'
        },
        {
            license_plate: '29E04860',
            device_id: '10004017'
        },
        {
            license_plate: '29E04512',
            device_id: '10003449'
        },
        {
            license_plate: '29E04784',
            device_id: '10003946'
        },
        {
            license_plate: '29E04798',
            device_id: '10003882'
        },
        {
            license_plate: '29E05894',
            device_id: '10003936'
        },
        {
            license_plate: '29E05733',
            device_id: '10003856'
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
                {title: "Device Code"},
            ],
            "columnDefs": [
                {
                    targets: 0,
                    width: 60,
                },
                {
                    targets: 1,
                    width: 150,
                    render: function(data, type, row, meta) {
                        return '<td class="license-plate">' +
                                    data + 
                                '</td>';
                    }
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
            pageLength: 5

        })

        $('#table_drivers tbody').on('click', 'tr', function () {
            var data = tableDriver.row(this).data();
            $('#title_list_trips').text('Dannh sách chuyến theo biển số xe: ' + data[1])
            $('#modal_list_trips').modal('show')
        });
    }

    $(document).on('click', 'td.license-plate', function(e){
        e.preventDefault()
    })

    

    loadGoogleMAP();

    createTableDrivers();

    var startMarker = new google.maps.Marker({
        title: "Điểm đón khách",
        icon: 'https://s3-ap-southeast-1.amazonaws.com/image-emd/defaults/map-marker-1-32x32.png'
    })

    var endMarker = new google.maps.Marker({
        title: "Điểm trả",
        icon: 'https://s3-ap-southeast-1.amazonaws.com/image-emd/defaults/map-marker-2-32x32.png'
    })

    var infoWindow = new google.maps.InfoWindow({
        size: new google.maps.Size(360, 180)
      });

    function drawTracking(points, startPoint, endPoint, distanceFromApi) {
        clearMap()

        startMarker.setPosition(startPoint)
        endMarker.setPosition(endPoint)
        startMarker.setMap(map)
        endMarker.setMap(map)

        polylineTracking = new google.maps.Polyline({
            path: points,
            strokeColor: "#02A6FF",
            strokeOpacity: 0.85,
            strokeWeight: 4.5
        });

        polylineTracking.setMap(map)

        // set center map
        let centerPoint = new google.maps.LatLng(parseFloat((startMarker.getPosition().lat() + endMarker.getPosition().lat())/2), parseFloat((startMarker.getPosition().lng() + endMarker.getPosition().lng())/2));
        map.setCenter(centerPoint);

        let bounds = new google.maps.LatLngBounds();
        bounds.extend(startMarker.getPosition());
        bounds.extend(endMarker.getPosition());
        map.fitBounds(bounds);

        let distance = 0;
        for(let i = 0; i < points.length - 1; i ++) {
            distance = distance + calculateDistanceTwoPoints({lat: points[i].lat(), lng: points[i].lng()}, {lat: points[i + 1].lat(), lng: points[i + 1].lng()})
        }
        distance = Math.round(distance);
        //infoWindow.setContent(distance.toString() + ' km');
        distanceFromApi = Math.round(distanceFromApi / 1000)
        infoWindow.setContent(distanceFromApi + ' km');

        infoWindow.setPosition(centerPoint);
        infoWindow.open(map);
    }

    function clearMap() {
        startMarker.setMap(null)
        startMarker.setMap(null)
        if (polylineTracking) polylineTracking.setMap(null)
        polylineTracking = null
    }

    function calculateDistanceTwoPoints(point1, point2) {// calculate distance points
        let PI = 3.141592653589793;
        let EARTH_RADIUS = 6371000//(m);
        let floatRadiansLat1 = parseFloat(point1.lat) * PI / 180;
        let floatRadiansLng1 = parseFloat(point1.lng) * PI / 180;
        let floatRadiansLat2 = parseFloat(point2.lat) * PI / 180;
        let floatRadiansLng2 = parseFloat(point2.lng) * PI / 180;
        let deltaD = Math.acos(Math.sin(floatRadiansLat1) * Math.sin(floatRadiansLat2) + Math.cos(floatRadiansLat1) * Math.cos(floatRadiansLat2) * Math.cos(floatRadiansLng2 - floatRadiansLng1));
        return Math.round(deltaD * EARTH_RADIUS * 10000) / 10000;
    }


    function getJourney(licensePlate, startTime, endTime) {
        $.ajax({
            //url: 'http://192.168.30.56:4000/journey/path?platenumber=29E05989&from=1685057160&to=1685075160',
            url: 'https://journey.gsm-dev.emddi.xyz/journey/path?platenumber='+ licensePlate + '&from=' + startTime + '&to=' + endTime,
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

                getDistance(licensePlate, startTime, endTime, points, startPoint, endPoint)
            },
            error: function(err) {
                console.log(err)
            }
        })
    }

    function getDistance(licensePlate, startTime, endTime, points, startPoint, endPoint) {
        $.ajax({
            url: 'https://journey.gsm-dev.emddi.xyz/journey?platenumber='+ licensePlate + '&from=' + startTime + '&to=' + endTime,
            method: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            success: function(response) {
                drawTracking(points, startPoint, endPoint, response.data.distance)
            },
            error: function(err) {
                console.log(err)
            }
        })
    }


    $('#btn_tracking').click(function() {
        let licensePlate = $('#license_plate').val()
        let localStartTime = $('#start_time').val()
        let localEndTime = $('#end_time').val()
        
        var startTime = moment(localStartTime).unix()
        var endTime = moment(localEndTime).unix()

        getJourney(licensePlate, localStartTime, localEndTime)

        //getJourney(licensePlate, startTime, endTime);
    })

})

console.log('edit from vps');
console.log('commit 1');
console.log('commit 2');

console.log('check commit to create sub branch 1');
console.log('check commit to create sub branch 2');
console.log('check commit to create sub branch 3');

// create branch dev
console.log('Create new branch dev')

