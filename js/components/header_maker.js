export const changeHeader = function(user) {

  const sign_in = document.querySelector(".header__href--sign-in");
  const sign_out = document.querySelector(".header__href--sign-out");

  if (!user) {
    sign_out.classList.add("hidden");
    sign_in.classList.remove("hidden");
  }
  //loged in
  else {
    sign_out.classList.remove("hidden");
    sign_in.classList.add("hidden");
  }
}
