import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import supercluster from 'supercluster';
import config from '../config';

const Map = ({ points,}) => {
  mapboxgl.accessToken = config.VITE_MAP_API_KEY
  
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);

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
          markerElement.innerHTML = `<img src="path_to_marker_icon" alt="${cluster.properties.title}" />`;
        }

        const marker = new mapboxgl.Marker({ element: markerElement })
          .setLngLat([longitude, latitude])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(cluster.properties.title))
          .addTo(map.current);

        markers.current.push(marker);
      });
    };

    map.current.on('load', () => {
      cluster.load(
        points.map(point => ({
          type: 'Feature',
          properties: { title: point.title },
          geometry: {
            type: 'Point',
            coordinates: [point.coordinates[1], point.coordinates[0]],
          },
        }))
      );
      updateMarkers();
    });

    map.current.on('move', updateMarkers);
    map.current.on('zoom', updateMarkers);
  }, [points]);

  return <div ref={mapContainer} className="map-container" style={{ width: '100%', height: '500px' }} />;
};

export default Map;
