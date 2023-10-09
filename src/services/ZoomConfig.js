import { ZoomMtg } from "@zoomus/websdk";
ZoomMtg.setZoomJSLib("https://source.zoom.us/1.7.9/lib", "/av");
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

// const API_KEY = "LuAOpqv1Ro2_psetMutXSw";
const API_KEY = "VcDxiW0LR3-cBcuvgpppYw";
// const API_SECRET = "CSyyvWewHVkCpZkCtgEqYidt4oo0hQqNW348";
const API_SECRET = "m29FMYK6ZJwArA8B746KxOuMJPYFxRkZ6mrU";
const meetConfig = (userName, userMail, meetingId, password) => {
  return {
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    leaveUrl: window.location.origin,
    userName: userName,
    userEmail: userMail,
    meetingNumber: meetingId,
    password: password,
    role: 0 // 1 for host; 0 for attendee or webinar
  };
};

export default { meetConfig, ZoomMtg };
