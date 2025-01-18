'use client';

import Script from 'next/script';

export default function MagicFormWidget() {
  return (
    <>
      {/* 위젯이 렌더링 될 대상 div */}
      <div
        id="magicform-root"
        style={{ zIndex: 9999, position: 'relative' }}
      ></div>

      {/* 위젯 스크립트 로드 (IIFE 방식) */}
      <Script
        id="magicform-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function (w, d, s, o, f, js, fjs) {
              w["Simple-Widget"] = o;
              w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
              js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
              js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
          }(window, document, "script", "w1", "https://storage.googleapis.com/magicform-widget-bucket/v1/widget.js"));
          `,
        }}
      />

      {/* 위젯 초기화를 위한 스크립트 호출 */}
      <Script
        id="magicform-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            w1("init", {
              "popUpTimer": 1000,
              "imageUrl": null,
              "chatHeight": "max(600px,50vh)",
              "chatWidth": "300px",
              "placeholder": "Type a message...",
              "title": "여행지 추천 챗봇 ",
              "subtitle": "Typically Responds in 5 Seconds",
              "widgetType": "bubble",
              "targetElementId": "magicform-root",
              "stackId": "stack_acea5c83-0ff4-4c18-9ca5-6b4c2bfa4df5",
              "userId": "6c9ed2d8-5fae-46d1-bb68-121788e37d9e",
              "colors": {"main": "#1100ff", "userMessageBubble": "#1100ff"}
            });
          `,
        }}
      />
    </>
  );
}
