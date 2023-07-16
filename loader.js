(() => {
  const script = document.currentScript;

  const ChatIcon =
    "C:/Users/musab/OneDrive/Desktop/projects/ascii/neura-chat/demo/example-neura-widget-loader/chat-float.svg";
  const CloseIcon =
    "C:/Users/musab/OneDrive/Desktop/projects/ascii/neura-chat/demo/example-neura-widget-loader/exit-float.svg";

  let widget;
  let iframe;
  let button;

  const loadWidget = () => {
    widget = document.createElement("div");
    widget.id = "neura-chat-widget";
    widget.style.display = "none";
    widget.style.boxSizing = "border-box";
    widget.style.width = "400px";
    widget.style.maxWidth = "100%";
    widget.style.height = "calc(100% - 145px)";
    widget.style.maxHeight = "100%";
    widget.style.position = "fixed";
    widget.style.bottom = "70px";
    widget.style.right = "15px";
    widget.style.padding = 0;
    widget.style.zIndex = 9999;
    widget.style.border = "1px solid #e6e6e6";
    widget.style.borderRadius = "10px";
    widget.style.boxShadow = "0 5px 40px rgba(0,0,0,.16)!important";

    iframe = document.createElement("iframe");
    iframe.id = "widget-iframe";
    iframe.allow = "microphone *"; // Allowing microphone access for the iframe
    iframe.style.boxSizing = "border-box";
    iframe.style.position = "absolute";
    iframe.style.right = 0;
    iframe.style.top = 0;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = 0;
    iframe.style.margin = 0;
    iframe.style.padding = 0;
    iframe.style.backgroundColor = "none";
    iframe.style.display = "none";
    iframe.style.borderRadius = "10px";
    iframe.style.border = "1px solid #e6e6e6";

    widget.appendChild(iframe);

    iframe.addEventListener("load", () => {
      button.style.display = "block";
    });

    const license = script.getAttribute("data-license");
    const widgetUrl = `http://localhost:3000?license=${license}`;

    iframe.src = widgetUrl;

    document.body.appendChild(widget);
  };

  const showWidget = () => {
    widget.style.display = "block";
    iframe.style.display = "block";
  };

  const hideWidget = () => {
    widget.style.display = "none";
    iframe.style.display = "none";
  };

  const isWidgetVisible = () => {
    return widget.style.display === "block";
  };

  const toggleWidget = () => {
    const btnImg = button.querySelector("img");
    if (!isWidgetVisible()) {
      btnImg.src = CloseIcon;
      showWidget();
    } else {
      btnImg.src = ChatIcon;
      hideWidget();
    }
  };

  const createButton = () => {
    button = document.createElement("button");
    button.className = "widget-controller-btn";
    button.addEventListener("click", toggleWidget);
    button.style.display = "none";

    const img = document.createElement("img");
    img.width = "40px";
    img.src = ChatIcon;

    button.appendChild(img);

    document.body.appendChild(button);
  };

  const createStyle = () => {
    const style = document.createElement("style");
    style.innerHTML = `
      .widget-controller-btn {
        position: fixed;
        bottom: 15px;
        right: 15px;
        width: 90px;
        height: 40px;
        border-radius: 66.9656982421875px;
        background-color: #ffffff;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.18) !important;
        z-index: 2147483640;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
      }
    
      .widget-controller-btn img {
        height: 20px;
        width: 100%;
      }

      @media (max-width: 600px) {
        .widget-controller-btn {
          bottom: 5px;
          right: 10px;
        }
        #neura-chat-widget{
          right:0;
          top:0;
          left:0;
          height: calc(100% - 50px) !important;
 
        }
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
