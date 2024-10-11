import React from "react";
import { ConfigProvider } from "antd";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#000",
          borderRadius: 0,
          controlOutline : 'none'
        },
        components: {
          Button: {
            controlHeight: 45,
            defaultBg :'#DDDDDD',
            defaultActiveBg :'#DDDDDD',
            defaultHoverBg :'#DDDDDD',
          },
          Input: {
            controlHeight: 45,
          },
          Select: {
            controlHeight: 45,
            colorBorder: '#000',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default ThemeProvider;
