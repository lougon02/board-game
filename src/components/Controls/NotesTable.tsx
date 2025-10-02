import React, { useState } from "react";

// Game data
const suspects = [
  "Miss Scarlet",
  "Colonel Mustard",
  "Mrs. White",
  "Mr. Green",
  "Mrs. Peacock",
  "Professor Plum",
];
const weapons = [
  "Candlestick",
  "Dagger",
  "Lead Pipe",
  "Revolver",
  "Rope",
  "Wrench",
];
const rooms = [
  "Kitchen",
  "Ballroom",
  "Conservatory",
  "Dining Room",
  "Billiard Room",
  "Library",
  "Lounge",
  "Hall",
  "Study",
];

interface Category {
  name: string;
  items: string[];
}

const categories: Category[] = [
  { name: "Suspects", items: suspects },
  { name: "Weapons", items: weapons },
  { name: "Rooms", items: rooms },
];

const players = ["You", "Alice", "Bob", "Charlie"];
const states = ["", "❌", "✅", "❓"] as const;
type StateIndex = 0 | 1 | 2 | 3;

type TableState = {
  [category: string]: {
    [item: string]: StateIndex[];
  };
};

const NotesTable: React.FC = () => {
  const [tableState, setTableState] = useState<TableState>(() => {
    const initial: TableState = {};
    categories.forEach((cat) => {
      initial[cat.name] = {};
      cat.items.forEach((item) => {
        initial[cat.name][item] = Array(players.length).fill(0) as StateIndex[];
      });
    });
    return initial;
  });

  const handleCellClick = (
    category: string,
    item: string,
    playerIndex: number
  ) => {
    setTableState((prev) => {
      const newState: TableState = { ...prev };
      newState[category] = { ...prev[category] };
      const current = prev[category][item][playerIndex];
      const next = ((current + 1) % states.length) as StateIndex;
      newState[category][item] = [...prev[category][item]];
      newState[category][item][playerIndex] = next;
      return newState;
    });
  };

  return (
    <div className="h-full flex flex-col rounded-lg border border-border bg-background text-text-primary">
      <table className="table-fixed border-collapse text-sm inline-block h-full">
        <thead className="bg-header-bg">
          <tr>
            <th className="border border-border-strong px-1 py-1 text-left">
              Category / Item
            </th>
            {players.map((p) => (
              <th
                key={p}
                className="border border-border-strong px-1 py-1 text-center"
              >
                {p}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="h-full">
          {categories.map((category, catIdx) => (
            <React.Fragment key={category.name}>
              {catIdx !== 0 && (
                <tr>
                  <td
                    colSpan={players.length + 1}
                    className="h-2 bg-separator-bg"
                  ></td>
                </tr>
              )}
              {category.items.map((item) => (
                <tr key={item} className="hover:bg-hover">
                  <td className="border border-border px-1 py-1 font-medium text-center">
                    {item}
                  </td>
                  {players.map((_, i) => {
                    const state = tableState[category.name][item][i];
                    let stateClass = "";
                    switch (state) {
                      case 0:
                        stateClass = "text-empty";
                        break;
                      case 1:
                        stateClass = "text-danger";
                        break;
                      case 2:
                        stateClass = "text-success";
                        break;
                      case 3:
                        stateClass = "text-maybe";
                        break;
                    }

                    return (
                      <td
                        key={i}
                        className={`border border-border px-1 py-1 text-center cursor-pointer select-none hover:bg-hover ${stateClass}`}
                        onClick={() => handleCellClick(category.name, item, i)}
                      >
                        {states[state]}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotesTable;
