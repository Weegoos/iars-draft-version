export default ({ app }) => {
  // Объявляем глобальные переменные
  const screenWidth = 800; // Максимальная ширина экрана для компьютеров
  const serverUrl = "http://localhost:5002/";
  const webUrl = "http://localhost:9000/#/";

  app.config.globalProperties.$screenWidth = screenWidth;
  app.config.globalProperties.$serverUrl = serverUrl;
};
