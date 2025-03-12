// eslint-disable-next-line react/prop-types
export default function PageWrapper({ children }) {
  const customMainScrollCSS = "customMainScroll";

  return (
    <>
      <div
        className={`h-screen overflow-hidden overflow-y-auto ${customMainScrollCSS}`}>
        {children}
      </div>
    </>
  );
}
