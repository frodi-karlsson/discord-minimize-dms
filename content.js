async function waitForElementToDisplay(selector, time) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(selector) != null) {
      resolve(true);
    }
    setTimeout(() => {
      resolve(waitForElementToDisplay(selector, time));
    }, time);
  });
}

async function run() {
  await waitForElementToDisplay("div[class^='sidebar_']", 1000);

  const collapseArrowSvg = `<svg fill="#FFFFFF" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 489.3 489.3" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M476.9,232.45H147.2l55.9-55.9c4.8-4.8,4.8-12.5,0-17.3s-12.5-4.8-17.3,0l-76.8,76.8c-4.8,4.8-4.8,12.5,0,17.3l76.8,76.8 c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-55.9-55.9H477c6.8,0,12.3-5.5,12.3-12.3 C489.2,237.85,483.7,232.45,476.9,232.45z"></path> <path d="M24.5,476.25V13.05c0-6.8-5.5-12.3-12.3-12.3S0,6.25,0,13.05v463.2c0,6.8,5.5,12.3,12.2,12.3S24.5,483.05,24.5,476.25z"></path> </g> </g> </g></svg>`;
  const rightArrowSvg = `<svg fill="#FFFFFF" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"></path> </g></svg>`;
  const nav = document.querySelector("div[class^='sidebar_'");
  const expanding = document.createElement("div");
  const navHeight = nav.style.height;
  const navWidth = nav.style.width;
  expanding.style.height = navHeight;
  expanding.style.width = navWidth;
  const navParent = nav.parentElement;
  navParent.insertBefore(expanding, nav);
  expanding.appendChild(nav);
  const minimizeArrow = document.createElement("div");
  nav.style.height = "calc(100% - 20px)";
  minimizeArrow.style.width = navWidth;
  minimizeArrow.style.height = "20px";
  minimizeArrow.style.display = "flex";
  minimizeArrow.style.justifyContent = "flex-start";
  minimizeArrow.style.margin = "2px 2px 2px 2px";
  minimizeArrow.style.cursor = "pointer";
  expanding.insertBefore(minimizeArrow, nav);
  const minimizeIcon = document.createElement("span");
  minimizeIcon.style.width = "20px";
  minimizeIcon.style.height = "20px";
  minimizeIcon.innerHTML = collapseArrowSvg;
  minimizeArrow.appendChild(minimizeIcon);
  let isMinimized = false;
  minimizeArrow.addEventListener("click", () => {
    if (!isMinimized) {
      expanding.style.width = "20px";
      nav.style.visibility = "hidden";
      minimizeIcon.innerHTML = rightArrowSvg;
      isMinimized = true;
    } else {
      expanding.style.width = navWidth;
      nav.style.visibility = "visible";
      minimizeIcon.innerHTML = collapseArrowSvg;
      isMinimized = false;
    }
  });
}

run();
