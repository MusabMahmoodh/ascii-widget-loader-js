(() => {
  const script = document.currentScript;

  const ChatIcon =
    "C:/Users/musab/OneDrive/Desktop/projects/ascii/neura-chat/demo/example-neura-widget-loader/chat-float.svg";
  const CloseIcon =
    "C:/Users/musab/OneDrive/Desktop/projects/ascii/neura-chat/demo/example-neura-widget-loader/exit-float.svg";
  const loadWidget = () => {
    const widget = document.createElement("div");
    widget.id = "widget";

    const widgetStyle = widget.style;
    widgetStyle.display = "none";
    widgetStyle.boxSizing = "border-box";
    widgetStyle.width = "300px";
    widgetStyle.height = "500px";
    widgetStyle.position = "fixed";
    widgetStyle.bottom = "90px";
    widgetStyle.right = "15px";
    widgetStyle.padding = 0;

    const iframe = document.createElement("iframe");
    iframe.id = "widget-iframe";
    iframe.allow = "microphone"; // Allowing microphone access for the iframe

    const iframeStyle = iframe.style;
    iframeStyle.boxSizing = "border-box";
    iframeStyle.position = "absolute";
    iframeStyle.right = 0;
    iframeStyle.top = 0;
    iframeStyle.width = "100%";
    iframeStyle.height = "100%";
    iframeStyle.border = 0;
    iframeStyle.margin = 0;
    iframeStyle.padding = 0;
    iframeStyle.backgroundColor = "none";
    iframeStyle.display = "none";
    // iframeStyle.borderRadius = "1px";

    widget.appendChild(iframe);

    iframe.addEventListener("load", () => (widgetStyle.display = "block"));

    const license = script.getAttribute("data-license");
    const widgetUrl = `http://localhost:3000?license=${license}`;

    iframe.src = widgetUrl;

    document.body.appendChild(widget);
    widget.style.display = "none";
  };

  const showWidget = () => {
    const widget = document.getElementById("widget");
    const iframe = document.getElementById("widget-iframe");
    widget.style.display = "block";
    iframe.style.display = "block";
  };

  const hideWidget = () => {
    const widget = document.getElementById("widget");
    const iframe = document.getElementById("widget-iframe");
    widget.style.display = "none";
    iframe.style.display = "none";
  };
  const isWidgetVisible = () => {
    const widget = document.getElementById("widget");
    return widget.style.display === "block";
  };
  const toggleWidget = () => {
    const btnImg = document.querySelector(".widget-controller-btn img");
    if (!isWidgetVisible()) {
      btnImg.src = CloseIcon;
      showWidget();
    } else {
      btnImg.src = ChatIcon;
      hideWidget();
    }
  };

  const createButton = () => {
    const button = document.createElement("button");
    button.className = "widget-controller-btn";
    button.addEventListener("click", toggleWidget);

    const img = document.createElement("img");
    img.width = "40px";
    img.src = ChatIcon;

    button.appendChild(img);

    document.body.appendChild(button);
  };

  // Load CSS dynamically
  const createStyle = () => {
    const style = document.createElement("style");
    style.innerHTML = `
      .widget-controller-btn {
        position: fixed;
        bottom: 15px;
        right: 15px;
        width: 159.5778350830078px;
        height: 76.93931579589844px;
        border-radius: 66.9656982421875px;
        background-color: #ffffff;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.18) !important;
        z-index: 2147483640;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    
      .widget-controller-btn img {
        width: 60px;
      }
    `;

    document.head.appendChild(style);
  };

  if (document.readyState === "complete") {
    loadWidget();
    createButton();
    createStyle();
  } else {
    document.addEventListener("readystatechange", () => {
      if (document.readyState === "complete") {
        loadWidget();
        createButton();
        createStyle();
      }
    });
  }
})();
