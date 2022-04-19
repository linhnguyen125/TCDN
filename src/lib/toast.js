/**
 * Toast Messenger
 * @param title - String
 * @param type - String (success, error, info, warning)
 * @param duration - Int (thời gian hiển thị thông báo)
 * @since 27/02/2022
 * @author Nguyễn văn Linh
 */
function toast({title, type = "success", duration = 3000}) {
    const main = document.getElementById("toast");
    if (main) {
        const toast = document.createElement("div");

        //auto remove toast
        const autoRemoveId = setTimeout(function () {
            main.removeChild(toast);
        }, duration + 1000);

        //remove when click
        toast.onclick = function (e) {
            if (e.target.closest(".m-toast-close")) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        };

        const delay = duration / 1000;

        toast.style.animation = `slideInLeft ease .5s, fadeOut ease 1s ${delay}s forwards`;

        toast.classList.add("m-toast", `m-toast-${type}`);

        toast.innerHTML = `
            <div class="m-toast-icon">
                <div class="m-icon m-icon-${type}"></div>
            </div>
            <div class="m-toast-title">
                ${title}
            </div>
            <div class="m-toast-close">&times;</div>
        `;
        main.appendChild(toast);
    }
}

export {toast};
