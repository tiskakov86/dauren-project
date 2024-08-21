  <!--
    yarn add leaflet
    npm install leaflet
   -->

   <template>
    <div id="map-container">
      <div id="map" style="flex-grow: 1;"></div>
      <div id="info-panel">
        <p>Текущий уровень зума: {{ zoomLevel }}</p>
        <!-- Здесь можно добавить дополнительную информацию -->
      </div>
    </div>
  </template>
  
  <script>
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import mapBounds from '../assets/json/mapBounds.json';
  
  export default {
    name: 'MapView',
    data() {
      return {
        map: null,
        zoomLevel: 5,  // Начальный уровень зума
        minZoomLevel: 5,  // Минимальный допустимый уровень зума
        maxZoomLevel: 13,  // Максимальный допустимый уровень зума
      };
    },
    mounted() {
      const southWest = L.latLng(mapBounds.bounds.southWest[0], mapBounds.bounds.southWest[1]);
      const northEast = L.latLng(mapBounds.bounds.northEast[0], mapBounds.bounds.northEast[1]);
      const bounds = L.latLngBounds(southWest, northEast);
  
      // Инициализация карты
      this.map = L.map('map', {
        center: bounds.getCenter(),  // Центрирование карты
        zoom: this.zoomLevel,
        minZoom: this.minZoomLevel,  // Устанавливаем минимальный уровень зума
        maxZoom: this.maxZoomLevel,  // Устанавливаем максимальный уровень зума
        maxBounds: bounds,  // Ограничение границ карты
        maxBoundsViscosity: 1.0  // Насколько жестко соблюдать границы
      });
  
      // Добавление тайлового слоя OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: this.maxZoomLevel,  // Максимальный зум тайлов
      }).addTo(this.map);
  
      // Обновление уровня зума в правом блоке
      this.map.on('zoomend', () => {
        this.zoomLevel = this.map.getZoom();
        if (this.zoomLevel < this.minZoomLevel) {
          this.map.setZoom(this.minZoomLevel);  // Если зум меньше минимального, устанавливаем минимальный
        } else if (this.zoomLevel > this.maxZoomLevel) {
          this.map.setZoom(this.maxZoomLevel);  // Если зум больше максимального, устанавливаем максимальный
        }
      });
    },
  };
  </script>
  
  <style>
  #map-container {
    display: flex;
    height: 100vh;
  }
  
  #map {
    flex-grow: 1;
  }
  
  #info-panel {
    width: 200px;
    padding: 10px;
    background-color: #f4f4f4;
    border-left: 1px solid #ccc;
    overflow-y: auto;
  }
  
  #info-panel p {
    margin: 0;
    padding: 10px 0;
    font-size: 16px;
  }
  </style>
  