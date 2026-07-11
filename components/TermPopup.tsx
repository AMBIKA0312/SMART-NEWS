type Props = {
  term: string
  description: string
  onClose: () => void
}

export default function TermPopup({
  term,
  description,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-400">
            {term}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 text-xl"
          >
            ✕
          </button>
        </div>

        <p className="text-gray-300 leading-7">
          {description}
        </p>
      </div>
    </div>
  )
}