export default ({ app }) => {
  const screenWidth = 800;
  const serverUrl = "http://localhost:5002/";
  const webUrl = "http://localhost:9000/#/";

  app.config.globalProperties.$screenWidth = screenWidth;
  app.config.globalProperties.$serverUrl = serverUrl;
  app.config.globalProperties.$webUrl = webUrl;
};
