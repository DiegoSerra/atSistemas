import { Helmet } from 'react-helmet';

const DynamicMetaTags = ({ name }: { name: string}) => (
  <Helmet>
    <title>{name + ' | Breaking Bad'}</title>
    <meta name="title" content={name} />
    <meta name="og:title" content={name} />
    <meta name="twitter:title" content={name} />
  </Helmet>
)

export default DynamicMetaTags;
