export default ({ app }) => {
  // Объявляем глобальные переменные
  const screenWidth = 800; // Максимальная ширина экрана для компьютеров

  app.config.globalProperties.$screenWidth = screenWidth;
};
