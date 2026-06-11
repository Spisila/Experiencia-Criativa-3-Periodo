
export function trigger_notification_popup(notification_message: string) {

  const notfication_popup = document.querySelector<HTMLDivElement>('#notfication_popup');

  notfication_popup!.textContent = notification_message;

  if (notfication_popup?.classList.contains("notfication_slide_in") == false) {
    notfication_popup.classList.remove("notfication_slide_out");
    notfication_popup.classList.add("notfication_slide_in");
    setTimeout(() => {
      notfication_popup?.classList.add("notfication_slide_out");
      notfication_popup?.classList.remove("notfication_slide_in");
    }, 2000);
  }

}

export function show_notification(message: string) {
  const popup = document.querySelector<HTMLDivElement>("#notfication_popup");

  if (!popup) return;

  popup.textContent = message;
  popup.classList.remove("notfication_slide_out");
  popup.classList.add("notfication_slide_in");
}

export function hide_notification() {
  const popup = document.querySelector<HTMLDivElement>("#notfication_popup");

  if (!popup) return;

  popup.classList.remove("notfication_slide_in");
  popup.classList.add("notfication_slide_out");
}

export function showTemporaryNotification(
  message: string,
  duration = 2000
) {
  show_notification(message);

  setTimeout(() => {
    hide_notification();
  }, duration);
}