import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import axios from 'axios';

function MapBox() {
    const [viewport, setViewport] = React.useState({
        width: "100vw",
        height: "100vh",
        latitude: 16.459179912977234,
        longitude: 107.60189627052287,
        zoom: 16
    });

    const [showPopup, togglePopup] = React.useState(false);
    const [addressMaker, setAddressMaker] = useState([]);
    const addressData = [
        { id: 1, address: "50A Hùng Vương, Phú Nhuận, Thành phố Huế, Thừa Thiên Huế, Vietnam" },
        { id: 2, address: "41 & 51, Nguyễn Huệ, Vĩnh Ninh, Thành phố Huế, Thừa Thiên Huế, Vietnam" },
        { id: 3, address: "97 An Dương Vương, An Đông, Thành phố Huế, Thừa Thiên Huế, Vietnam" },
    ];

    useEffect(() => {
        let newAddressData = [];
        addressData.map((address) => {
            axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address.address}.json?access_token=pk.eyJ1IjoiaHV5aHVlIiwiYSI6ImNreWpzb3V6ejBjbXkyb3BrMTlkdjJiaDAifQ.S6_ctOcDM_0jypzh96oBKw`)
                .then(function (response) {
                    // handle success
                    console.log(response);
                    newAddressData.push({
                        ...address,
                        longitude: response.data.features[0].center[0],
                        latitude: response.data.features[0].center[1],
                    });
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        })
        console.log("Address: ", newAddressData);
        setAddressMaker(newAddressData);
    }, []);

    //can xem lai chua dung lam ddau
    const checkdistance = (addone, addtwo) => {
        axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${addone.longitude},${addone.latitude};${addtwo.longitude},${addtwo.latitude}`)
                .then(function (response) {
                    // handle success
                    console.log(response);
                    const distance = response.data.routes[0].distance / 1000;
                    console.log(distance);
                    // distance > 10 ? openNo
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
    }
    return (
        <div>
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxApiAccessToken="pk.eyJ1IjoiaHV5aHVlIiwiYSI6ImNreWpzb3V6ejBjbXkyb3BrMTlkdjJiaDAifQ.S6_ctOcDM_0jypzh96oBKw"
                onViewportChange={(viewport) => setViewport(viewport)}
            >

                {showPopup && (
                    <Popup
                        latitude={10.86185853994233}
                        longitude={106.74872380706191}
                        closeButton={true}
                        closeOnClick={true}
                        onClose={() => togglePopup(false)}
                        anchor="top-right"
                    >
                        <div>Pop up marker</div>
                    </Popup>
                )}
                
                {addressMaker.map((addressm) => (
                    <Marker
                        latitude={addressm.latitude}
                        longitude={addressm.longitude}
                        offsetLeft={-20}
                        offsetTop={-30}
                    >
                        <img
                            onClick={() => togglePopup(true)}
                            style={{ height: 50, width: 50 }}
                            src="https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png"
                        />
                    </Marker>

                ))}
                {/* 16.460485
longitude: 107.611681 */}
                {/* <Marker
                    latitude={10.86185853994233}
                    longitude={106.74872380706191}
                    offsetLeft={-20}
                    offsetTop={-30}
                >
                    <img
                        style={{ height: 50, width: 50 }}
                        src="https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png"
                    />
                </Marker> */}
            </ReactMapGL>
        </div>
    );
}

export default MapBox;
