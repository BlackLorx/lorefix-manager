type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function InventorySearch({
  value,
  onChange,
}: Props) {
  return (
    <input
      placeholder="Buscar artículo..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mb-6 w-full rounded-xl border p-4 outline-none focus:border-violet-500"
    />
  );
}