export const useSortableTable = () => {
  const sortTable = (
    table: HTMLTableElement,
    columnIndex: number,
    clickedTh: HTMLElement,
  ) => {
    const tbody = table.querySelector("tbody");
    if (!tbody) return;

    const isAscending = clickedTh.getAttribute("aria-sort") !== "ascending";

    table
      .querySelectorAll("thead th")
      .forEach((th) => th.removeAttribute("aria-sort"));
    clickedTh.setAttribute("aria-sort", isAscending ? "ascending" : "descending");

    const rows = Array.from(tbody.querySelectorAll(":scope > tr"));

    rows.sort((rowA, rowB) => {
      const a =
        rowA.querySelectorAll("td")[columnIndex]?.textContent?.trim() ?? "";
      const b =
        rowB.querySelectorAll("td")[columnIndex]?.textContent?.trim() ?? "";

      const numA = Number(a);
      const numB = Number(b);
      const numeric =
        a !== "" && b !== "" && !Number.isNaN(numA) && !Number.isNaN(numB);

      const result = numeric
        ? numA - numB
        : a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

      return isAscending ? result : -result;
    });

    rows.forEach((row) => tbody.appendChild(row));
  };

  const initSortableTables = (container: HTMLElement = document.body) => {
    container.querySelectorAll<HTMLTableElement>("table").forEach((table) => {
      // Skip tables that are already initialized
      if (table.dataset.sortableInit) return;
      // Only enhance tables that actually have a thead with th cells
      const headers = table.querySelectorAll<HTMLElement>("thead th");
      if (!headers.length) return;

      table.dataset.sortableInit = "true";

      headers.forEach((th, index) => {
        const colName = th.textContent?.trim() ?? `column ${index + 1}`;
        th.setAttribute("data-sortable", "");
        th.setAttribute("tabindex", "0");
        th.setAttribute("aria-label", `Sort by ${colName}`);

        const handleSort = () => sortTable(table, index, th);

        th.addEventListener("click", handleSort);
        th.addEventListener("keydown", (e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleSort();
          }
        });
      });
    });
  };

  return { initSortableTables };
};
