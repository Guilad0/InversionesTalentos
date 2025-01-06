<template>
  <div class="chart-wrapper">
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { Chart } from "chart.js/auto";

const props = defineProps({
  series: {
    type: Array,
    required: true,
    default: () => [],
  },
  labels: {
    type: Array,
    default: () => [],
  },
  chartTitle: {
    type: String,
    default: "Gráfico",
  },
  yAxisTitle: {
    type: String,
    default: "",
  },
  isCurrency: {
    type: Boolean,
    default: false,
  },
  colors: {
    type: Array,
    default: () => [
      {
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
      },
      {
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
      },
      {
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
      {
        backgroundColor: "rgba(255, 159, 64, 0.5)",
        borderColor: "rgba(255, 159, 64, 1)",
      },
    ],
  },
  chartOptions: {
    type: Object,
    default: () => ({}),
  },
});

const chartCanvas = ref(null);
let chart = null;

const formatValue = (value) => {
  if (props.isCurrency) {
    return (
      "$ " +
      value.toLocaleString("es-ES", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  }
  return value.toLocaleString();
};

const createChart = () => {
  if (chart) {
    chart.destroy();
  }

  const ctx = chartCanvas.value.getContext("2d");

  const baseConfig = {
    type: "bar",
    data: {
      labels: props.labels,
      datasets: props.series.map((serie, index) => ({
        label: serie.name,
        data: serie.data,
        backgroundColor: props.colors[index % props.colors.length].backgroundColor,
        borderColor: props.colors[index % props.colors.length].borderColor,
        borderWidth: 1,
      })),
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: props.chartTitle,
          font: {
            size: 16,
            weight: "bold",
          },
        },
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 20,
            padding: 15,
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.dataset.label}: ${formatValue(context.raw)}`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return formatValue(value);
            },
          },
          title: {
            display: !!props.yAxisTitle,
            text: props.yAxisTitle,
            font: {
              size: 12,
              weight: "bold",
            },
          },
        },
        x: {
          ticks: {
            maxRotation: 45,
            minRotation: 45,
            font: {
              size: 11,
            },
          },
        },
      },
    },
  };

  const config = {
    ...baseConfig,
    options: {
      ...baseConfig.options,
      ...props.chartOptions,
      scales: {
        ...baseConfig.options.scales,
        ...(props.chartOptions.scales || {}),
      },
    },
  };

  chart = new Chart(ctx, config);
};

const handleResize = () => {
  if (chart) {
    chart.resize();
  }
};

onMounted(() => {
  if (props.series && props.series.length > 0) {
    createChart();
  }
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  if (chart) {
    chart.destroy();
  }
  window.removeEventListener("resize", handleResize);
});

watch(
  () => props.series,
  (newSeries) => {
    if (newSeries && newSeries.length > 0) {
      createChart();
    }
  },
  { deep: true }
);
</script>

<style scoped>
.chart-wrapper {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.chart-container {
  position: relative;
  height: 50vh;
  width: 100%;
  padding: 20px;
}

@media (max-width: 768px) {
  .chart-container {
    height: 30vh;
    padding: 10px;
  }
}
</style>
