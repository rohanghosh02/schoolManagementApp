const OneSignal = require("onesignal-node");
const sendNotificationService = require("../../Services/sendNotification.service");
const constants = require("../../constants/en");

sendNotification = async (req, res, next) => {
  let sAppId = process.env.SG_APP_ID;
  let sAppKey = process.env.SG_APP_KEY;
  let sendMessage = req.body.massage ? req.body.massage : "";
  let registrationIds = req.body.registrationIds
    ? req.body.registrationIds
    : null;

  const userInfo = res.userData;
  let response = {};
  if (userInfo.role !== "admin") {
    response.status = constants.UNAUTHORIZED_CODE;
    response.errorMessage = constants.UNAUTHORIZED_USER;
    return res.json(response).status(response.status);
  }

  let idArray;
  if (registrationIds) {
    idArray = registrationIds.split(",").map(Number);
  }

  const client = new OneSignal.Client(sAppId, sAppKey);

  let data = await sendNotificationService.getUser(idArray);

  let notificationIds = data.map((i) => i.notificationId);

  let message = {
    app_id: sAppId,
    contents: { en: sendMessage },
    subtitle: { en: "Notification" },
    type: { en: "Notification" },
    createdBy: { en: "admin" },
    //included_segments: ["All"],
    include_player_ids: [...notificationIds],
    data: {},
  };
  try {
    const response = await client.createNotification(message);
    return res.send({
      statusCode: response.statusCode,
      success: true,
      data: response.body,
    });
  } catch (error) {
    return res.send({ success: false, error: error });
  }
};
module.exports = sendNotification;
