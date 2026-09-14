type SeparatorProps = {
  height: string | number;
  backgroundColor?: string;
};

export function Separator({ height, backgroundColor }: SeparatorProps) {
  return <div style={{ height, backgroundColor }} />;
}
