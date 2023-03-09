const constant = {
  SUCCESS_STATUS_CODE: 200,
  VALIDATION_STATUS_CODE: 400,
  VALIDATION_TYPE_ERROR: "validationError",
  NOT_FOUND_STATUS_CODE: 404,
  SOMETHING_WENT_WRONG_STATUS_CODE: 500,
  CLASS_CREATED: "class created succesfullly",
  PERMISSION_ERROR_STATUS_CODE: 403,
  ALREADY_EXIST_STATUS_CODE: 409,
  ALREADY_RATING: "You are already rated this user.",
  PERMISSION_ERROR: "permission_error",
  SELF_FOLLOWED: "You can't follow your self",
  SELF_SUBSCRIBE: "You can't subscribe your self",
  PERMISSION_ERROR_DESCRIPTION:
    "You do not have permission to perform this action.",
  SOMETHING_WENT_WRONG: "Something wrong. Please try again",
  SOMETHING_WENT_WRONG_TYPE: "internal_issue",
  WRONG_CREDENTIALS_TYPE: "invalid_grant",
  WRONG_CREDENTIALS: "Invalid user credentials",
  WRONG_PASSWORD: "Wrong password",
  WRONG_EMAIL: "Wrong Email",
  RECORD_NOT_FOUND: "Record not found.",
  USER_ID_NOT_EXIST: "User id not Exist.",
  UNAUTHORIZED_CODE: 401,
  UNAUTHORIZED_USER: "You do not have permission to perform this action.",
  TOKEN_VALIDATION: "Token is required",
  GOOGLE_TOKEN_REQUIRED: "Access token required",
  SOCIAL_ID_REQUIRED: "social id required",
  NO_GOOGLE_ACCOUNT: "No google account found.",
  NO_USERS_FOUND: "No users found.",
  EMAIL_REQUIRED: "The email field is required.",
  EMAIL_FORMATE: "The email format is invalid.",
  PASSWORD_REQUIRED: "The password field is required.",
  FIRST_NAME_REQUIRED: "The First name field is required.",
  LAST_NAME_REQUIRED: "The Last name field is required.",
  PLATFORM_REQUIRED: "The platform field is required.",
  LINK_REQUIRED: "The link field is required.",
  USERNAME_REQUIRED: "The Username field is required.",
  CARD_ID_REQUIRED: "The cardId field is required.",
  CARD_ADD_IN_FAVORITE: "Card has been added to favorite successfully",
  CARD_REMOVE_IN_FAVORITE: "Card has been removed to favorite successfully",
  OLD_PASS_REQUIRED: "The old password field is required.",
  NEW_PASS_REQUIRED: "The new password field is required.",
  OLD_PASS_NOT_MATCH: "Old password does not match",
  TOKEN_INVALID_ERROR: "verification_failed",
  REFRESH_TOKEN_INVALID_ERROR: "refresh_verification_failed",
  TOKEN_REQUIRED_ERROR: "missing_token",
  TOKEN_INVALID: "Token is invalid",
  TOKEN_EXPIRED: "Session is expired",
  TOKEN_EXPIRED_ERROR: "sessionExpired",
  EMAIL_INVALID_PASSWORD: "Invalid email format",
  INVALID_DEVICE_TYPE: "Invalid device type.",
  INVALID_TYPE: "Invalid type",
  INACTIVE_USER: "Your profile was inactive.",
  INACTIVE_USER_ERROR: "inActiveUser",
  NOT_FOUND: "Invalid page. Please go back and request Again.",
  NOT_FOUND_ERROR: "notFound",
  PRIVATE_USER_ERROR: "privateAccount",
  NO_REQUEST_FOUND: "No request found",
  DUPLICATE_ACCOUNT_EXIST_ERROR: "account_exist",
  DUPLICATE_EMAIL_EXIST: "Email already exists.",
  DUPLICATE_USERNAME_EXIST: "UserName already exists.",
  SUCCESS: "Success",
  USER_CREATED: "user has been created successfully",
  ALREADY_FOLLOW: "Already followed",
  ALREADY_REQUESTED: "Already requested",
  STATUS_REQUIRED: "Status is required",
  BLOCKED: "You can't follow this user because you are blocked",
  PASSPORT_UPDATED: "Password Update Successfully",
  CHECK_PASSWORD:
    "Password must be minimum 6 characters and maximum 50 characters long",

  CHECK_FIRST_NAME:
    "First name must be minimum 1 characters and maximum 50 characters long",

  CHECK_LAST_NAME:
    "Last name must be minimum 1 characters and maximum 50 characters long",
  MIN_PASSWORD_VALIDATE: "The password must be at least 6 characters",
  MAX_PASSWORD_VALIDATE: "The password may not be greater than 50 characters",
  MIN_FIRST_NAME_VALIDATE: "First name at least 2 characters required",
  MAX_FIRST_NAME_VALIDATE:
    "The first name may not be greater than 50 characters.",
  MIN_LAST_NAME_VALIDATE: "Last name at least 2 characters required",
  USER_IDS_REQUIRED: "The userIds field is required.",
  TYPE_REQUIRED: "The type field is required.",
  USER_ID_REQUIRED: "The userId field is required.",
  RATING_REQUIRED: "The rating field is required.",
  ID_REQUIRED: "Id field is required.",
  TYPE_REQUIRED: "type field is required.",
  MAX_LAST_NAME_VALIDATE:
    "The last name may not be greater than 50 characters.",
  DUPLICATE_ACCOUNT_EXIST_ERROR: "account_exist",
  DUPLICATE_ACCOUNT_EXIST: "Account already exist.",
  isPrivate: "The isPrivate field is required.",
  isFollowerPrivate: "The isFollowPrivate field is required.",
  USER_BLOCKED: "User blocked successfully.",
  WRONG_OTP: "wrong_otp",
  WRONG_OTP_MSG: "Sorry! code was mismatch",
  OTP_REQUIRED: "OTP required.",
  TYPE_REQUIRED: "The type field required",
  USER_UNBLOCKED: "User unblocked successfully.",
  SEND_MAIL:
    "We sent a OTP on your registered email address to reset password.",
  UPDATE_PROFILE: "Profile has been updated successfully.",
  SUBSCRIBE: "User has been subscribed Successfully",
  UNSUBSCRIBE: "User has been unsubscribed Successfully",
  USER_LOGOUT: "User has been logout Successfully",
  USER_LOGIN: "User has been logged in Successfully",
  PRIVATE_FOLLOW_ERROR: "You do not have permission to see following list",
  FULL_NAME_REQUIRED: "The name field is required.",
  PHONE_NUMBER: "Phone Number field is required.",
  ADDRESS_REQUIRED: "Address field is required.",
  DUPLICATE_NUMBER: "Duplicate Number is exist",
  EMAIL_NOT_FOUND: "Email is not found",
  USER_VERIFIED: "user has been verified",
  USER_DELETE: "user has been removed successfully",
  USER_ALREADY_VERIFIED: "user has already verified",
  DUPLICATE_NUMBER: "Duplicate Number is exist",
  TIME_TABLE_ADDED: "time Table added successfully",
  RESULT_ADDED: "result   added successfully",
  CUSTOMER_ID_CREATED: "Customer Id Created Successfully",
  CARD_CREATE_SUCESS: "Card Created Succesfully",
  PAYMENT_DONE_SUCCESS: "subscription done successfully",
  PAYMENT_LINK_GENERATED: "Click on the link to pay your fees",
  ATTENDENCE_ADDED: "Attendence updated!",
  PAYMENT_SUCCESS: "Payment recieved by the bank",
  BOOK_EXIST: "book is already exist",
  BOOK_ADDED: "book added successfully",
  EMAIL_NOT_FOUND: "Email is not found",
  USER_VERIFIED: "user has been verified",
  USER_DELETE: "user has been removed successfully",
  USER_ALREADY_VERIFIED: "user has already verified",
  DUPLICATE_NUMBER: "Duplicate Number is exist",
  TIME_TABLE_ADDED: "time Table added successfully",
  RESULT_ADDED: "result   added successfully",
  CUSTOMER_ID_CREATED: "Customer Id Created Successfully",
  CARD_CREATE_SUCESS: "Card Created Succesfully",
  PAYMENT_DONE_SUCCESS: "subscription done successfully",
  PAYMENT_LINK_GENERATED: "Click on the link to pay your fees",
  ATTENDENCE_ADDED: "Attendence updated!",
  PAYMENT_SUCCESS: "Payment recieved by the bank",
  BOOK_EXIST: "book is already exist",
  BOOK_NOT_EXIST: " book is not  exist",
  BOOK_ADDED: "book added successfully",
  BOOK_UPDATED: "book updated successfully",
  BOOK_DELETED: "book has been deleted  successfully",
  CONFIRM_PASSWORD_NOT_MATCH: " confirm Password not match",
  OTP_SEND: "Otp Has Been Send",
  EXIST_PASSWORD_ENTER:
    "This password is not allowed Please try diffrent password",
  ATTENDANCE_ALREADY_DONE: "Todays Attendance has been already Done",
  ATTENDANCE_DONE: " Attendance Done",
  UPLOADED_SUCCESSFULLY: "File Uploaded Successfully",
  DATA_EXIST: "data already exist",
  NO_DUE: "no payment due",
  POST_CREATED: "Post Created Successfully",
  POST_LIKED: "Post Liked ",
  UnLiked: "Post un-liked!",
  POST_NOT_FOUND: "Post not exist",
  PAID: "salary already paid",
  TEACHER_ID_NOT_EXIST: "Teacher_Id not Exist.",
  MEMBER_ADDED: "member added successfully",
  NOT_MEMBER: "member not exist",
  BOOK_ISSUED: "book has been issued",
  BOOK_ISSUED_UPDATE: "details updated",
  ALREADY_ISSUED: "book already issued",
};

// export module pool to be used in other files
module.exports = Object.freeze(constant);
