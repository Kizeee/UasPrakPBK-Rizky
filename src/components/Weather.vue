<template>
  <q-page class="column items-center justify-center q-pa-md">
    <div class="input-section">
      <q-input v-model="newLocation" label="Enter Location" />
      <q-btn @click="addWeatherWidget" label="Add Widget" color="black" />
    </div>
    <div class="widgets-section">
      <div
        v-for="(weather, index) in weatherStore.weatherWidgets"
        :key="index"
        class="weather-widget"
      >
        <q-icon :name="getWeatherIcon(weather.weather[0].main)" size="50px" />
        <div class="location">
          <h2>{{ weather.name }}</h2>
        </div>
        <div class="temperature">
          <p>{{ convertTemp(weather.main.temp) }}</p>
        </div>
        <div class="details">
          <p>{{ weather.weather[0].description }}</p>
          <p>Wind: {{ weather.wind.speed }} m/s</p>
          <p>Humidity: {{ weather.main.humidity }}%</p>
          <p>Feels Like: {{ convertTemp(weather.main.feels_like) }}</p>
        </div>
        <q-btn
          @click="removeWidget(index)"
          label="Remove Widget"
          color="negative"
        />
      </div>
    </div>
    <div class="tasks-section">
      <q-select
        v-model="selectedTask"
        :options="tasks"
        label="Select Task"
        emit-value
        map-options
      />
      <q-btn @click="navigateToTask" label="Go to Task" color="primary" />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { QPage, QInput, QBtn, QIcon, QSelect } from "quasar";
import { useWeatherStore } from "../stores/weatherStore";

const weatherStore = useWeatherStore();

const newLocation = ref("");

const weatherIconMapping = {
  Clear: "wb_sunny",
  Clouds: "cloud",
  Rain: "grain",
  Drizzle: "grain",
  Thunderstorm: "flash_on",
  Snow: "ac_unit",
  Mist: "blur_on",
  Smoke: "blur_on",
  Haze: "blur_on",
  Dust: "blur_on",
  Fog: "blur_on",
  Sand: "blur_on",
  Ash: "blur_on",
  Squall: "blur_on",
  Tornado: "toys",
};

const convertTemp = (tempInCelsius) => {
  return `${tempInCelsius.toFixed(1)} °C / ${(
    (tempInCelsius * 9) / 5 +
    32
  ).toFixed(1)} °F`;
};

const getWeatherIcon = (weatherMain) => {
  return weatherIconMapping[weatherMain] || "wb_cloudy";
};

const addWeatherWidget = async () => {
  await weatherStore.fetchWeather(newLocation.value);
  newLocation.value = "";
};

const removeWidget = (index) => {
  weatherStore.removeWidget(index);
};

const tasks = ref([
  { label: "Tugas 1", value: "https://maulanarizky-projectvue.vercel.app/" },
  {
    label: "Tugas 2",
    value: "https://tugas2pbk-rizkys-projects-776c44d0.vercel.app/",
  },
  { label: "Tugas 3", value: "https://tugas3-pbk.vercel.app/" },
  {
    label: "Tugas 4",
    value: "https://maulana-rizky-223510441-tugas4.vercel.app/",
  },
  { label: "Tugas 5", value: "https://rizky-223510441-tugas5.vercel.app/" },
  { label: "Tugas 6", value: "https://tugas6pbk-kize.vercel.app/" },
]);

const selectedTask = ref(null);

const navigateToTask = () => {
  if (selectedTask.value) {
    window.location.href = selectedTask.value;
  }
};
</script>

<style scoped>
.input-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding: 12px;
  background-color: #e3f2fd;
  border-radius: 10px;
}

.widgets-section {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  padding: 24px;
  background-color: #f1f8e9;
  border-radius: 10px;
}

.weather-widget {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 260px;
  width: 100%;
  padding: 24px;
  background-color: #ffffff;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  text-align: center;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.weather-widget:hover {
  transform: translateY(-8px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
}

.weather-widget h2 {
  font-size: 1.6em;
  margin: 12px 0;
  color: #1e88e5;
}

.weather-widget p {
  font-size: 1em;
  margin: 6px 0;
  color: #424242;
}

.weather-widget .temperature p {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 12px;
  color: #e53935;
}

.weather-widget .details p {
  font-size: 0.95em;
  margin: 4px 0;
}

.q-icon {
  color: #ffeb3b;
}

.q-btn {
  margin-top: 12px;
}

.tasks-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  align-items: center;
}
</style>
