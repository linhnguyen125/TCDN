const loading = {
    show: function () {
        const main = document.querySelector("body");
        const loader = document.createElement("div");
        loader.classList.add("m-loading");
        const loaderChild = document.createElement("div");
        loaderChild.classList.add("lds-default");

        loaderChild.innerHTML = `
            <div></div><div></div><div></div><div></div><div></div><div></div>
            <div></div><div></div><div></div><div></div><div></div><div></div>
        `;
        loader.appendChild(loaderChild);
        main.appendChild(loader);
    },
    hide: function () {
        const main = document.querySelector("body");
        const loader = document.querySelector(".m-loading");
        main.removeChild(loader);
    }
}

export {loading};
