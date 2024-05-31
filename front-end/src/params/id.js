export function match(param) {
  return /^[^A-Z]/.test(param);
}//Matchers run both on the server and in the browser.