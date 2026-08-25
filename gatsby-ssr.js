const React = require("react");

const setInitialTheme = `
(function() {
  try {
    var stored = window.localStorage.getItem("theme");
    var theme = stored === "dark" || stored === "light"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    if (theme === "dark") document.body.classList.add("dark");
  } catch (e) {}
})();
`;

exports.onRenderBody = ({setPreBodyComponents, setHeadComponents}) => {
  setPreBodyComponents([
    React.createElement("script", {
      key: "theme-init",
      dangerouslySetInnerHTML: {__html: setInitialTheme},
    }),
  ]);
  setHeadComponents([
    React.createElement("link", {
      key: "favicon",
      rel: "icon",
      type: "image/png",
      href: "/favicon.png",
    }),
  ]);
};
