function RatingBadge({ value }: { value: number }) {
  const ratingColor =
    value >= 7 ? "bg-green-500" : value >= 5 ? "bg-yellow-500" : "bg-red-500";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[6px] ${ratingColor} px-2.5 py-1 text-[14px] font-bold text-[#06140b]`}
    >
      ★ {value}
    </span>
  );
}

export default RatingBadge;
