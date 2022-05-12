import Swal from "sweetalert2";

export default {
  errorReminderAlert(title: string) {
    Swal.fire({
      title,
      showConfirmButton: false,
      timer: 1700,
      position: "top",
      backdrop: false,
      color: "#ed4535",
    });
  },
  clickToConfirmAlert(
    alertObj: {
      title: string;
      text: string;
      confirmButtonText: string;
      cancelButtonText: string;
      imageUrl?: string;
    },
    confirmCallback: () => void
  ) {
    const { title, text, confirmButtonText, cancelButtonText, imageUrl } =
      alertObj;
    Swal.fire({
      title,
      text,
      imageUrl: imageUrl ? imageUrl : "/images/comfirm-img.svg",
      width: "50rem",
      imageWidth: "25rem",
      imageHeight: "20rem",
      showCancelButton: true,
      confirmButtonColor: "#ed4535",
      cancelButtonColor: "#c8c8c8",
      confirmButtonText,
      cancelButtonText,
    }).then((result) => {
      if (result.isConfirmed) {
        confirmCallback();
      }
    });
  },
  onlyConfirmAlert(alertObj: {
    title: string;
    text: string;
    confirmButtonText: string;
    imageUrl?: string;
  }) {
    const { title, text, confirmButtonText, imageUrl } = alertObj;
    Swal.fire({
      title,
      text,
      imageUrl: imageUrl ? imageUrl : "/images/comfirm-img.svg",
      width: "50rem",
      imageWidth: "25rem",
      imageHeight: "20rem",
      confirmButtonColor: "#ed4535",
      confirmButtonText,
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
  async selectInputAlert(alertObj: {
    title: string;
    inputOptions: { [key: string]: string };
    inputPlaceholder: string;
    text?: string;
  }) {
    const { title, text, inputOptions, inputPlaceholder } = alertObj;
    const selectedData = await Swal.fire({
      title,
      text: text ? text : "",
      input: "select",
      inputOptions,
      inputPlaceholder,
      showCancelButton: true,
      cancelButtonText: "取消新增",
      confirmButtonText: "確認新增",
      confirmButtonColor: "#F90",
      width: "40rem",
    });

    return selectedData;
  },

  closeAlert() {
    Swal.close();
  },
};
