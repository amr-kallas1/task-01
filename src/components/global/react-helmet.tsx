import { Helmet } from "react-helmet";

type ReactHelmetProps = {
  children: React.ReactNode;
  name: string;
};

const ReactHelmet = ({ children, name }: ReactHelmetProps) => {
  return (
    <Helmet>
      {children}
      <meta
        name={name}
        content="This is a brief description of your page content."
      />
    </Helmet>
  );
};

export default ReactHelmet;
