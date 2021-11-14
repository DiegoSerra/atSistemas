import { Helmet } from "react-helmet";

const DefaultMetaTags =() => {
  // These are the default meta tags for the BreakingBad website, they will be dynamically updated in the different views as necessary
  const title = "BreakingBad";
  const description = "Prueba técnica atSistemas.";

  return (
    <Helmet>
      <meta charSet='utf-8' />

      {/* <!-- Primary Meta Tags --> */}
      <title>{title}</title>
      <meta name='title' content={title} />
      <meta name='description' content={description} />

      {/* <!-- Open Graph / Facebook -- /> */}
      <meta property='og:type' content='website' />
      <meta property='og:url' content={window.location.origin} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={window.location.origin + '/assets/icon/logo.png'} />

      {/* <!-- Twitter -- /> */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:url' content={window.location.origin} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={window.location.origin + '/assets/icon/logo.png'} />
    </Helmet>
  );
}

export default DefaultMetaTags;