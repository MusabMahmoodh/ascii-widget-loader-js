(() => {
  const script = document.currentScript;

  const ChatIcon = "https://res.cloudinary.com/musabcloud/image/upload/v1689488174/ascii/chat-float_eey6op.svg";
  const CloseIcon = "https://res.cloudinary.com/musabcloud/image/upload/v1689488174/ascii/exit-float_elviaf.svg";

  let widget;
  let iframe;
  let buttonChat;
  let voiceButton;
  const widgetUrl = `https://bright-tiramisu-c37a9c.netlify.app/`;
  const voiceWidgetUrl = `https://bright-tiramisu-c37a9c.netlify.app/?voiceOnly=1`;

  const loadWidget = () => {
    widget = document.createElement("div");
    widget.id = "neura-chat-widget";
    widget.style.display = "none";
    widget.style.boxSizing = "border-box";
    widget.style.width = "100%";
    widget.style.maxWidth = "400px";
    widget.style.height = "calc(100% - 145px)";
    widget.style.maxHeight = "600px";
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
      buttonChat.style.display = "block";
      voiceButton.style.display = "block";
    });

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

  const toggleChatWidget = () => {
    const btnImg = buttonChat.querySelector("img");
    widgetNormalScreen();
    if (!isWidgetVisible()) {
      btnImg.src = CloseIcon;
      showWidget();
    } else {
      btnImg.src = ChatIcon;
      hideWidget();
    }
  };

  const toggleVoiceWidget = () => {
    const btnImg = voiceButton.querySelector("img");
    widgetFullScreen();
    if (!isWidgetVisible()) {
      btnImg.src = CloseIcon;
      showWidget();
    } else {
      btnImg.src = ChatIcon;
      hideWidget();
    }
  };
  const widgetFullScreen = () => {
    iframe.src = voiceWidgetUrl;
    widget.style.width = "100%";
    widget.style.height = "100vh";
    widget.style.maxWidth = "100%";
    widget.style.bottom = "0";
    widget.style.right = "0";
    widget.style.borderRadius = "0";
    widget.style.boxShadow = "none";
    widget.style.zIndex = 9999;
  };

  const widgetNormalScreen = () => {
    iframe.src = widgetUrl;
    widget.style.width = "100%";
    widget.style.maxWidth = "400px";
    widget.style.height = "calc(100% - 145px)";
    widget.style.maxHeight = "600px";
    widget.style.bottom = "70px";
    widget.style.right = "15px";
    widget.style.borderRadius = "10px";
    widget.style.boxShadow = "0 5px 40px rgba(0,0,0,.16)!important";
    widget.style.zIndex = 9988;
  };

  const createButton = () => {
    buttonChat = document.createElement("button");
    buttonChat.className = "widget-controller-btn";
    buttonChat.addEventListener("click", toggleChatWidget);
    buttonChat.style.display = "none";

    const img = document.createElement("img");
    img.width = "40px";
    img.src = ChatIcon;

    buttonChat.appendChild(img);

    document.body.appendChild(buttonChat);
  };

  const createVoiceButton = () => {
    voiceButton = document.createElement("button");
    voiceButton.className = "voice-controller-btn";
    voiceButton.addEventListener("click", toggleVoiceWidget);
    voiceButton.addEventListener("click", toggleVoiceWidget);
    voiceButton.style.display = "none";

    const img = document.createElement("img");
    img.width = "40px";
    img.src = ChatIcon;

    voiceButton.appendChild(img);

    document.body.appendChild(voiceButton);
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

      .voice-controller-btn {
        position: fixed;
        bottom: 15px;
        right: 105px;
        width: 90px;
        height: 40px;
        border-radius: 66.9656982421875px;
        background-color: #ffffff;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.18) !important;
        z-index: 9999;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
      }
    
      .voice-controller-btn img {
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
          height: calc(100vh - 50px) !important;
          max-height: 100vh !important;
          width: 100% !important;
 
        }
      }
    `;

    document.head.appendChild(style);
  };

  if (document.readyState === "complete") {
    loadWidget();
    createButton();
    createVoiceButton();
    createStyle();
  } else {
    document.addEventListener("readystatechange", () => {
      if (document.readyState === "complete") {
        loadWidget();
        createButton();
        createVoiceButton();
        createStyle();
      }
    });
  }
})();
