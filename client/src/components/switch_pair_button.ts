
export function switch_pair_button(button1: HTMLButtonElement, button2: HTMLButtonElement, is_active: boolean) {
  if (is_active == true) {
    button1.classList.remove('is_active');
    button2.classList.add('is_active');
    return false;
  }
  else {
    button1.classList.add('is_active');
    button2.classList.remove('is_active');
    return true;
  }
}