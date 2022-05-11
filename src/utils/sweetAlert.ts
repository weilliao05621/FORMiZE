import Swal from "sweetalert2";

export default {
  errorRminderAlert(title: string) {
    Swal.fire({
      title,
      showConfirmButton: false,
      timer: 1700,
      position: "top",
      backdrop: false,
      // color: "#ffb4ad",
      color: "#ed4535",
      background: "url(/images/error-alert-background-3.svg)",
    });
  },
  loadingReminderAlert(title: string) {
    Swal.fire({
      title,
      showConfirmButton: false,
      imageUrl: "/images/loading-reminder.svg",
      width: "40rem",
      imageWidth: "20rem",
      imageHeight: "10rem",
    });
  },
  loadedReminderAlert(title: string) {
    Swal.fire({
      title,
      showConfirmButton: false,
      iconColor: "#c9ab59",
      icon: "success",
      width: "40rem",
    });
  },
  closeAlert() {
    Swal.close();
  },
};
