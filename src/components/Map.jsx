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
  const cluster = useRef(
    new supercluster({
      radius: 60,
      maxZoom: 16,
    })
  );

  const formatPrice = (price) => {
    if (price >= 1000000000) {
      return (price / 1000000000) + ' млрд ';
    } else if (price >= 1000000) {
      return (price / 1000000)+ ' млн ';
    } else if (price >= 1000) {
      return (price / 1000) + ' к ';
    } else {
      return price;
    }
  };
  const breakpoints = [
    { name: "small", width: 480 },
    { name: "medium", width: 768 },
    { name: "large", width: 1130 },
    { name: "xlarge", width: Infinity }, 
  ];
  const activeBreakpoint = useResponsive(breakpoints);
  const isSmall = activeBreakpoint === "small";
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
          });
        } else {
          markerElement = document.createElement("div");
          markerElement.className = "point-marker";
          markerElement.innerHTML = `<div style="background: #7635DC; color: white; padding: 5px 10px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);">${formatPrice(clusterData.properties.price)}₸</div>`;
          markerElement.addEventListener("click", () => {
            setSelectedRoommate(clusterData.properties.id);
            setSelectedRoommates([]);
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

  return (
    <div
      style={{ display: "flex" }}
      className={`max-w-[1200px]  mx-auto ${isXLarge &&'px-[20px] rounded-[5px]'} mt-[40px] shadow-lg`}
    >
      <div
        style={{
          maxHeight: "100vh",
          overflowY: "scroll",
          width:
            selectedRoommate ||
            (selectedRoommates && selectedRoommates.length > 0)
              ? "300px"
              : "0px",
          transition: "width 0.3s ease",
          paddingRight:
            selectedRoommate ||
            (selectedRoommates && selectedRoommates.length > 0)
              ? "20px"
              : "0px",
        }}
        className={`space-y-[20px] pl-0`}
      >
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
      <div
        ref={mapContainer}
        className="map-container"
        style={{
          height: "100vh",
          width:
            selectedRoommate ||
            (selectedRoommates && selectedRoommates.length > 0)
              ? "860px"
              : "100%",
          transition: "width 0.3s ease",
          borderRadius: "5px",
        }}
      />
    </div>
  );
};

export default Map;
