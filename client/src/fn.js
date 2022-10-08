export const onEnter = (event) => {
  const keycode = event.key === "Enter";
  if (keycode) {
    event.preventDefault();

    document.getElementById("form").submit();
  }
};
