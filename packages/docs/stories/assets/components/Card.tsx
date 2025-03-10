import React from "react"

interface Props {
  title: string
  icon: keyof typeof svgs
  onClick: () => void
  children: React.ReactNode
}

export const Card: React.FC<Props> = ({ title, icon, onClick, children }) => {
  const titleElement = React.createElement("strong", null, title)
  const contentElement = React.createElement(React.Fragment, null, children)
  const containerElement = React.createElement(
    "span",
    null,
    titleElement,
    contentElement,
  )

  return React.createElement(
    "button",
    {
      onClick,
    },
    svgs[icon],
    containerElement,
  )
}

const svgs = {
  price: React.createElement(
    "svg",
    {
      width: "32",
      height: "32",
      viewBox: "0 0 32 32",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
    },
    React.createElement("path", {
      d: "M15.3375 3.23738L5.25001 5.24988L3.23751 15.3374C3.20597 15.4984 3.21456 15.6648 3.26252 15.8218C3.31048 15.9787 3.39633 16.1215 3.51251 16.2374L16.5625 29.2874C16.6545 29.3815 16.7643 29.4563 16.8856 29.5073C17.0069 29.5584 17.1372 29.5847 17.2688 29.5847C17.4003 29.5847 17.5306 29.5584 17.6519 29.5073C17.7732 29.4563 17.883 29.3815 17.975 29.2874L29.2875 17.9749C29.3816 17.8829 29.4564 17.7731 29.5075 17.6518C29.5585 17.5305 29.5848 17.4002 29.5848 17.2686C29.5848 17.137 29.5585 17.0068 29.5075 16.8855C29.4564 16.7642 29.3816 16.6544 29.2875 16.5624L16.2375 3.51239C16.1216 3.39621 15.9788 3.31036 15.8219 3.2624C15.6649 3.21444 15.4986 3.20585 15.3375 3.23738V3.23738Z",
      stroke: "black",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
    React.createElement("path", {
      d: "M10.5 12C11.3284 12 12 11.3284 12 10.5C12 9.67157 11.3284 9 10.5 9C9.67157 9 9 9.67157 9 10.5C9 11.3284 9.67157 12 10.5 12Z",
      fill: "black",
    }),
  ),
  cart: React.createElement(
    "svg",
    {
      width: "32",
      height: "32",
      viewBox: "0 0 32 32",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
    },
    React.createElement("path", {
      d: "M23 23H8.725L5.2375 3.825C5.1967 3.59537 5.07691 3.38722 4.89887 3.23657C4.72082 3.08592 4.49572 3.00223 4.2625 3H2",
      stroke: "black",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
    React.createElement("path", {
      d: "M10 28C11.3807 28 12.5 26.8807 12.5 25.5C12.5 24.1193 11.3807 23 10 23C8.61929 23 7.5 24.1193 7.5 25.5C7.5 26.8807 8.61929 28 10 28Z",
      stroke: "black",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
    React.createElement("path", {
      d: "M23 28C24.3807 28 25.5 26.8807 25.5 25.5C25.5 24.1193 24.3807 23 23 23C21.6193 23 20.5 24.1193 20.5 25.5C20.5 26.8807 21.6193 28 23 28Z",
      stroke: "black",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
    React.createElement("path", {
      d: "M7.8125 18H23.5125C23.98 18.0014 24.433 17.838 24.7919 17.5386C25.1508 17.2391 25.3927 16.8227 25.475 16.3625L27 8H6",
      stroke: "black",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
  ),
  availability: React.createElement(
    "svg",
    {
      width: "32",
      height: "32",
      viewBox: "0 0 32 32",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
    },
    React.createElement("path", {
      d: "M28 22.1624V9.83741C27.999 9.65938 27.9512 9.48475 27.8612 9.33113C27.7712 9.17751 27.6423 9.05033 27.4875 8.96241L16.4875 2.77491C16.3393 2.68934 16.1711 2.64429 16 2.64429C15.8289 2.64429 15.6607 2.68934 15.5125 2.77491L4.5125 8.96241C4.35769 9.05033 4.22879 9.17751 4.13882 9.33113C4.04884 9.48475 4.00096 9.65938 4 9.83741V22.1624C4.00096 22.3404 4.04884 22.5151 4.13882 22.6687C4.22879 22.8223 4.35769 22.9495 4.5125 23.0374L15.5125 29.2249C15.6607 29.3105 15.8289 29.3555 16 29.3555C16.1711 29.3555 16.3393 29.3105 16.4875 29.2249L27.4875 23.0374C27.6423 22.9495 27.7712 22.8223 27.8612 22.6687C27.9512 22.5151 27.999 22.3404 28 22.1624V22.1624Z",
      stroke: "black",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
    React.createElement("path", {
      d: "M22.125 19.0625V12.5625L10 5.875",
      stroke: "black",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
    React.createElement("path", {
      d: "M27.8625 9.32495L16.1125 16L4.13751 9.32495",
      stroke: "black",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
    React.createElement("path", {
      d: "M16.1125 16L16 29.35",
      stroke: "black",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
  ),
  checkout: React.createElement(
    "svg",
    {
      width: "32",
      height: "32",
      viewBox: "0 0 32 32",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
    },
    React.createElement("path", {
      d: "M28 7H4C3.44772 7 3 7.44772 3 8V24C3 24.5523 3.44772 25 4 25H28C28.5523 25 29 24.5523 29 24V8C29 7.44772 28.5523 7 28 7Z",
      stroke: "black",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
    React.createElement("path", {
      d: "M21 21H25",
      stroke: "black",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
    React.createElement("path", {
      d: "M15 21H17",
      stroke: "black",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
    React.createElement("path", {
      d: "M3 12.1125H29",
      stroke: "black",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
  ),
  "add-to-cart": React.createElement(
    "svg",
    {
      width: "32",
      height: "32",
      viewBox: "0 0 32 32",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
    },
    React.createElement("path", {
      d: "M4.67498 5.94998L12 27.1125C12.3125 28.025 13.6125 28 13.9 27.075L16.85 17.5C16.8945 17.3435 16.979 17.2012 17.0951 17.0872C17.2113 16.9733 17.3551 16.8915 17.5125 16.85L27.075 13.9C28 13.6125 28.025 12.3125 27.1125 12L5.94998 4.67498C5.77217 4.61249 5.58032 4.60152 5.39655 4.64333C5.21278 4.68514 5.04457 4.77803 4.9113 4.9113C4.77803 5.04457 4.68514 5.21278 4.64333 5.39655C4.60152 5.58032 4.61249 5.77217 4.67498 5.94998V5.94998Z",
      stroke: "black",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
  ),
  identity: React.createElement(
    "svg",
    {
      width: "32",
      height: "32",
      viewBox: "0 0 32 32",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
    },
    React.createElement("path", {
      d: "M6.3374 23.1125C7.43514 20.9025 8.00427 18.4676 7.9999 16C8.00095 14.8002 8.271 13.616 8.79018 12.5343C9.30936 11.4527 10.0645 10.5013 10.9999 9.75",
      stroke: "black",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
    React.createElement("path", {
      d: "M16 16C16.0054 20.0671 14.9728 24.0684 13 27.625",
      stroke: "black",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
    React.createElement("path", {
      d: "M12 16C12 14.9391 12.4214 13.9217 13.1716 13.1716C13.9217 12.4214 14.9391 12 16 12C17.0609 12 18.0783 12.4214 18.8284 13.1716C19.5786 13.9217 20 14.9391 20 16C20.0083 20.1233 19.0988 24.1968 17.3375 27.925",
      stroke: "black",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
    React.createElement("path", {
      d: "M27.325 23C27.7728 20.6935 27.9988 18.3495 28 16C28 12.8174 26.7357 9.76516 24.4853 7.51472C22.2348 5.26428 19.1826 4 16 4C12.8174 4 9.76516 5.26428 7.51472 7.51472C5.26428 9.76516 4 12.8174 4 16C4.00358 17.363 3.77097 18.7164 3.3125 20",
      stroke: "black",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
    React.createElement("path", {
      d: "M11.5999 20C11.1681 22.1032 10.4044 24.1243 9.3374 25.9875",
      stroke: "black",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
    React.createElement("path", {
      d: "M15 8.0625C15.3319 8.02261 15.6657 8.00174 16 8C18.1217 8 20.1566 8.84285 21.6569 10.3431C23.1571 11.8434 24 13.8783 24 16C23.9988 17.3372 23.9154 18.6731 23.75 20",
      stroke: "black",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
    React.createElement("path", {
      d: "M22.9876 24C22.8001 24.7375 22.5876 25.475 22.3501 26.1875",
      stroke: "black",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
  ),
  "my-account": React.createElement(
    "svg",
    {
      width: "32",
      height: "32",
      viewBox: "0 0 32 32",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
    },
    React.createElement("path", {
      d: "M16 20C20.4183 20 24 16.4183 24 12C24 7.58172 20.4183 4 16 4C11.5817 4 8 7.58172 8 12C8 16.4183 11.5817 20 16 20Z",
      stroke: "black",
      strokeWidth: "2",
      strokeMiterlimit: "10",
    }),
    React.createElement("path", {
      d: "M3.875 26.9999C5.10367 24.8713 6.87104 23.1037 8.99944 21.8747C11.1278 20.6458 13.5423 19.9988 16 19.9988C18.4577 19.9988 20.8722 20.6458 23.0006 21.8747C25.129 23.1037 26.8963 24.8713 28.125 26.9999",
      stroke: "black",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
  ),
}
