const APPERSION = "%APPLICATION_VERSION%";
const APPHASH = "#%APPLICATION_HASH%";

export const getApplicationVersion = () => {
  /*eslint-disable no-useless-concat*/
  if (APPERSION === "%APPLICATION" + "_" + "VERSION%") {
    return "dev-hot-reload";
  } else {
    return APPERSION;
  }
};
export const getApplicationHash = () => {
  if (APPHASH === "%APPLICATION" + "_" + "HASH%") {
    return "#dev-hot-reload";
  } else {
    return APPHASH;
  }
};
