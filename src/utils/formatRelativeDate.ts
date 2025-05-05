export const formatRelativeDate = (dateString: string | Date): string => {
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;
  const today = new Date();

  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const startOfDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const diffTime = startOfToday.getTime() - startOfDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Сьогодні";
  if (diffDays === 1) return "Вчора";
  if (diffDays < 7) return `${diffDays} дн${diffDays === 1 ? "ь" : "і"} тому`;
  if (diffDays < 30)
    return `${Math.floor(diffDays / 7)} тижд${Math.floor(diffDays / 7) === 1 ? "ень" : "ні"} тому`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} міс тому`;
  return `${Math.floor(diffDays / 365)} рік тому`;
};
