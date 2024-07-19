import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import supercluster from 'supercluster';
import config from '../config';
import RoommateCard from './FindRoommate';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Map = ({ points }) => {
  mapboxgl.accessToken = config.VITE_MAP_API_KEY;
  
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [76.9285, 43.2567], // center map on Almaty
      zoom: 10,
    });

    const cluster = new supercluster({
      radius: 60,
      maxZoom: 16,
    });

    const updateMarkers = () => {
      const zoom = map.current.getZoom();
      const bounds = map.current.getBounds().toArray().flat();

      const clusters = cluster.getClusters(bounds, Math.round(zoom));

      markers.current.forEach(marker => marker.remove());
      markers.current = [];

      clusters.forEach(cluster => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } = cluster.properties;

        let markerElement;
        if (isCluster) {
          markerElement = document.createElement('div');
          markerElement.className = 'cluster-marker';
          markerElement.innerHTML = pointCount;
          markerElement.style.width = `${30 + pointCount / points.length * 20}px`;
          markerElement.style.height = `${30 + pointCount / points.length * 20}px`;

          markerElement.addEventListener('click', () => {
            const zoom = map.current.getZoom();
            map.current.easeTo({
              center: [longitude, latitude],
              zoom: zoom + 2,
            });
          });
        } else {
          markerElement = document.createElement('div');
          markerElement.className = 'point-marker';
          markerElement.innerHTML = `<div style="background: rgba(100, 150, 200); color: white; padding: 5px 10px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);">${cluster.properties.price}тг</div>`;
          // markerElement.addEventListener('click', () => {
          //   navigate(`/findroommate/${cluster.properties.id}`);
          // });
          markerElement.addEventListener('click', () => (
            <RoommateCard/>
      ));
        }

        const marker = new mapboxgl.Marker({ element: markerElement })
          .setLngLat([longitude, latitude])
          .addTo(map.current);

        markers.current.push(marker);
      });
    };

    map.current.on('load', () => {
      cluster.load(
        points.map(point => ({
          type: 'Feature',
          properties: { title: point.title, id: point.id, price: point.price },
          geometry: {
            type: 'Point',
            coordinates: [point.coordinates[0], point.coordinates[1]],
          },
        }))
      );
      updateMarkers();
      setLoading(false);
    });

    map.current.on('move', updateMarkers);
    map.current.on('zoom', updateMarkers);
  }, [points, navigate]);
  if(loading){
    return (<Skeleton height={700} width='100%'/>)
  }
  return <div ref={mapContainer} className="map-container rounded-[5px]" style={{ width: '100%', height: '700px' }} />;
};

export default Map;
