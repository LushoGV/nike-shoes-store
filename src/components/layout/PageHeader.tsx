type Props = {
  text: string;
};

const PageHeader = ({ text }: Props) => (
  <header className="flex w-full mb-6 h-32">
    <h1 className="text-3xl m-auto">{text}</h1>
  </header>
);

export default PageHeader;
