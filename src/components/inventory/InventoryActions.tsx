import type { Inventory } from "../../types/Inventory";

type Props = {
  item: Inventory;
  onEdit: (item: Inventory) => void;
  onIncrease: (item: Inventory) => void;
  onDecrease: (item: Inventory) => void;
};

export default function InventoryActions({
  item,
  onEdit,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <div className="flex items-center justify-center gap-2">

      <button
        onClick={() => onDecrease(item)}
        disabled={item.stock <= 0}
        className="h-8 w-8 rounded-lg bg-red-100 font-bold text-red-700 transition hover:bg-red-200 disabled:opacity-40"
      >
        −
      </button>

      <button
        onClick={() => onIncrease(item)}
        className="h-8 w-8 rounded-lg bg-green-100 font-bold text-green-700 transition hover:bg-green-200"
      >
        +
      </button>

      <button
        onClick={() => onEdit(item)}
        className="rounded-lg bg-violet-600 px-3 py-2 text-sm text-white transition hover:bg-violet-700"
      >
        Editar
      </button>

    </div>
  );
}