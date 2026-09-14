import './button.scss';

type PropsType = {
  title: string;
  path?: string;
};

export function CustomButton({ title, path }: PropsType) {
  const handleAction = () => {
    if (path) {
      window.open(path, '_blank');
    }
  };

  return (
    <button className="custom-button" onClick={handleAction}>
      {title}
    </button>
  );
}
