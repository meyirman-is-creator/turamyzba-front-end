import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import supercluster from "supercluster";
import config from "../config";
import RoommateCard from "./FindRoommate";
import useResponsive from "../service/useResponsive";

const Map = ({ roommates, view }) => {
  mapboxgl.accessToken = config.VITE_MAP_API_KEY;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const [selectedRoommates, setSelectedRoommates] = useState([]);
  const [selectedRoommate, setSelectedRoommate] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false); // State to control the visibility of the details section
  const [scrollTopVisible, setScrollTopVisible] = useState(false); // State to control the visibility of the Scroll to Top button
  const cluster = useRef(
    new supercluster({
      radius: 60,
      maxZoom: 16,
    })
  );

  const formatPrice = (price) => {
    if (price >= 1000000000) {
      return price / 1000000000 + " млрд ";
    } else if (price >= 1000000) {
      return price / 1000000 + " млн ";
    } else if (price >= 1000) {
      return price / 1000 + " к ";
    } else {
      return price;
    }
  };

  const breakpoints = [
    { name: "sSmall", width: 310 },
    { name: "small", width: 480 },
    { name: "medium", width: 768 },
    { name: "large", width: 1130 },
    { name: "xlarge", width: Infinity },
  ];

  const activeBreakpoint = useResponsive(breakpoints);
  const isSmall = activeBreakpoint === "small";
  const isSSmall = activeBreakpoint === "sSmall";
  const isMedium = activeBreakpoint === "medium";
  const isLarge = activeBreakpoint === "large";
  const isXLarge = activeBreakpoint === "xlarge";

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [76.9285, 43.2567],
      zoom: 10,
    });

    const updateMarkers = () => {
      const zoom = map.current.getZoom();
      const bounds = map.current.getBounds().toArray().flat();

      const clusters = cluster.current.getClusters(bounds, Math.round(zoom));

      markers.current.forEach((marker) => marker.remove());
      markers.current = [];

      clusters.forEach((clusterData) => {
        const [longitude, latitude] = clusterData.geometry.coordinates;
        const {
          cluster: isCluster,
          point_count: pointCount,
          cluster_id: clusterId,
        } = clusterData.properties;

        let markerElement;
        if (isCluster) {
          markerElement = document.createElement("div");
          markerElement.className = "cluster-marker";
          markerElement.innerHTML = pointCount;
          markerElement.style.color = "#000";
          markerElement.style.backgroundColor = "#33FF00"; // Change cluster background color
          markerElement.style.width = `${
            30 + (pointCount / roommates.length) * 20
          }px`;
          markerElement.style.height = `${
            30 + (pointCount / roommates.length) * 20
          }px`;

          markerElement.addEventListener("click", () => {
            const zoom = map.current.getZoom();
            const clusterPoints = cluster.current.getLeaves(
              clusterId,
              Infinity
            );
            const clusteredRoommates = clusterPoints.map((point) =>
              roommates.find((r) => r._id === point.properties.id)
            );
            setSelectedRoommates(clusteredRoommates);
            setSelectedRoommate(null);
            setDetailsVisible(true); // Show the details section
          });
        } else {
          markerElement = document.createElement("div");
          markerElement.className = "point-marker";
          markerElement.innerHTML = `<div style="background: #7635DC; color: white; padding: 5px 10px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);">${formatPrice(
            clusterData.properties.price
          )}₸</div>`;
          markerElement.addEventListener("click", () => {
            setSelectedRoommate(clusterData.properties.id);
            setSelectedRoommates([]);
            setDetailsVisible(true); // Show the details section
          });
        }

        const marker = new mapboxgl.Marker({ element: markerElement })
          .setLngLat([longitude, latitude])
          .addTo(map.current);

        markers.current.push(marker);
      });
    };

    map.current.on("load", () => {
      cluster.current.load(
        roommates.map((roommate) => ({
          type: "Feature",
          properties: {
            title: roommate.title,
            id: roommate._id,
            price: roommate.monthlyExpensePerPerson,
          },
          geometry: {
            type: "Point",
            coordinates: [
              roommate.address.coordinates[0],
              roommate.address.coordinates[1],
            ],
          },
        }))
      );
      updateMarkers();
    });

    map.current.on("move", updateMarkers);
    map.current.on("zoom", updateMarkers);
  }, [roommates]);

  useEffect(() => {
    if (view === "map") {
      mapContainer.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [view]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setScrollTopVisible(true);
      } else {
        setScrollTopVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      style={{ display: "flex" }}
      className={`max-w-[1200px] mx-auto ${
        isXLarge && "px-[20px] rounded-[5px]"
      } mt-[40px]`}
    >
      {isXLarge ? (
        <div
          style={{
            maxHeight: "100vh",
            overflowY: "scroll",
            width: detailsVisible ? "300px" : "0px",
            transition: "width 0.3s ease",
            paddingRight: detailsVisible ? "20px" : "0px",
          }}
          className={`space-y-[20px] pl-0`}
        >
          <button
            onClick={() => setDetailsVisible(false)}
            style={{
              display: detailsVisible ? "block" : "none",
              marginBottom: "20px",
              padding: "10px",
              backgroundColor: "#ff0000",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Закрыть
          </button>
          {selectedRoommates.length > 0 ? (
            selectedRoommates.map((roommate) => (
              <RoommateCard key={roommate._id} roommate={roommate} />
            ))
          ) : selectedRoommate ? (
            <RoommateCard
              roommate={roommates.find((r) => r._id === selectedRoommate)}
            />
          ) : null}
        </div>
      ) : (isLarge || isMedium) ? (
        <div
          style={{
            maxHeight: "82vh",
            overflowY: "scroll",
            width: detailsVisible ? "310px" : "0px",
            transition: "width 0.3s ease",
            paddingRight: detailsVisible ? "20px" : "0px",
            zIndex: "1",
          }}
          className={`space-y-[20px] absolute ${
            detailsVisible && "p-[20px]"
          }  bg-[#161C24] rounded-[5px]`}
        >
          <button
            onClick={() => setDetailsVisible(false)}
            style={{
              display: detailsVisible ? "block" : "none",
              marginBottom: "20px",
              padding: "10px",
              backgroundColor: "#ff0000",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Закрыть
          </button>
          {selectedRoommates.length > 0 ? (
            selectedRoommates.map((roommate) => (
              <RoommateCard key={roommate._id} roommate={roommate} />
            ))
          ) : selectedRoommate ? (
            <RoommateCard
              roommate={roommates.find((r) => r._id === selectedRoommate)}
            />
          ) : null}
        </div>
      ) : (
        <div
          style={{
            maxHeight: "80vh",
            overflowY: "scroll",
            width: isSSmall?"100%":(detailsVisible ? "310px" : "0px"),
            transition: "width 0.3s ease",
            paddingRight: detailsVisible ? "20px" : "0px",
            zIndex: "1",
          }}
          className={`space-y-[20px] absolute ${
            detailsVisible && "p-[20px]"
          }  bg-[#161C24] rounded-[5px]`}
        >
          <button
            onClick={() => setDetailsVisible(false)}
            style={{
              display: detailsVisible ? "block" : "none",
              marginBottom: "20px",
              padding: "10px",
              backgroundColor: "#ff0000",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Закрыть
          </button>
          {selectedRoommates.length > 0 ? (
            selectedRoommates.map((roommate) => (
              <RoommateCard key={roommate._id} roommate={roommate} />
            ))
          ) : selectedRoommate ? (
            <RoommateCard
              roommate={roommates.find((r) => r._id === selectedRoommate)}
            />
          ) : null}
        </div>
      )}
      <div
        ref={mapContainer}
        className="map-container"
        style={{
          height: "100vh",
          width: (detailsVisible && isXLarge ? "860px" : "100%"),
          transition: "width 0.3s ease",
          borderRadius: "5px",
          position: "relative", // Set the map container to relative
        }}
      >
          <button
            onClick={scrollToTop}
            style={{
              position: "absolute", // Set the button to absolute
              bottom: "80px",
              left: "20px",
              padding: "10px",
              backgroundColor: "#33FF00",
              color: "#000",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              zIndex: 1, // Ensure the button is above the map
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
              />
            </svg>
          </button>
      </div>
    </div>
  );
};

export default Map;
