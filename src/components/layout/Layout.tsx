import * as React from "react";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="max-w-[900px] w-full flex flex-col ">{children}</div>
    </div>
  );
};

export default Layout;
