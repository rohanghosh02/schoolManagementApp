const studentService = {
  checkAttendance: async (data) => {
    console.log(data, ">>>>>>>>>");
    // console.log(studentAttendance, "PPPPPPPPP");
    return await studentAttendance.findAll({
      where: {
        studentId: data.registrationId,
      },
      attributes: ["studentId", "teacherId", "status", "createdAt"],
    });
  },
  checkResult: async (enrollmentNo) => {
    return await student_mark.findAll({
      where: {
        enrollmentNo,
      },
    });
  },
};
module.exports = studentService;
