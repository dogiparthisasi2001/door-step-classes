import axios from "axios";
import { AjaxTypesEnum } from "@/enums/CommonEnums.js";

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 10000
});

export default {
  asyncCall: function(request, type, payload) {
    if (type === AjaxTypesEnum.GET) {
      return apiClient.get(request);
    } else if (type === AjaxTypesEnum.POST) {
      return apiClient.post(request, payload);
    } else if (type === AjaxTypesEnum.UPDATE) {
      return apiClient.patch(request, payload);
    } else if (type === AjaxTypesEnum.DELETE) {
      return apiClient.delete(request);
    }
  },
  createUUID: function create_UUID() {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
      c
    ) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }
};
