import { Flex, Modal, Grid } from "smbls";

const [X, Y] = [16, 8];

let [selectedX, selectedY] = [0, 0];

export let GeneratedTable = {};

let createCell = (state) => ({
  tag: "div",
  state: state,
  props: {
    boxSize: "1.625rem",
    background: "#E8F1FF",
    borderRadius: "0.125rem",
    ":hover": {
      background: "#3D7BD9",
    },
  },
  on: {
    click: (event, element) => {
      [selectedX, selectedY] = [element.state.col, element.state.row];
      GeneratedTable = createTable(selectedX, selectedY);
      console.log(
        element.parent.parent.parent.parent.Footer.result.resultTable.update({
          text: JSON.stringify(GeneratedTable),
        })
      );
      activate(element);
      deactivate(element);
    },
  },
});

const cells = Array.from({ length: Y * X }, (_, index) =>
  createCell({
    col: (index % X) + 1,
    row: Math.floor(index / X) + 1,
  })
);

const activate = (element) => {
  if (!element) return;

  if (element.state.col <= selectedX) {
    element.setProps({
      background: "#3D7BD9",
    });
  } else {
    element.setProps({
      background: "#E8F1FF",
    });
  }

  activate(element.previousElement());
};

const deactivate = (element) => {
  if (!element) return;

  if (element.state.col > selectedX || element.state.row > selectedY) {
    element.setProps({
      background: "#E8F1FF",
    });
  }

  deactivate(element.nextElement());
};

const GridSelector = {
  extend: Grid,
  props: {
    columns: `repeat(${X},minmax(0,1fr))`,
    rows: `repeat(${Y},minmax(0,1fr))`,
    width: "100%",
    gap: "X",
    borderRadius: "0.375rem",
    overflow: "hidden",
    boxShadow: "0 0 6px rgba(0,0,0,0.16)",
    padding: "Z",
  },
  ...cells,
};

export const GridSelection = {
  extend: Modal,
  props: {
    background: "white",
    padding: "1.25rem 1.62rem",
    boxShadow: "0 0 6px rgba(0,0,0,0.16)",
  },
  Header: {
    props: {
      margin: "0 0 A 0",
    },
    Title: {
      h5: {
        text: "Grid Selection",
        props: {
          fontSize: "1rem",
          fontWeight: "bold",
        },
      },
    },
    Paragraph: {
      p: "",
    },
  },
  Content: {
    section: {
      extend: Flex,
      props: {
        background: "white",
        borderRadius: ".625rem",
        width: "100%",
      },
      GridSelector,
    },
  },
  Footer: {
    props: {
      flow: "column",
    },
    Flex: {
      props: {
        minWidth: "100%",
        align: "center space-between",
        padding: "A 0 0 0",
      },
      quardinates: {
        props: {
          fontSize: "0.75rem",
        },
        label: {
          tag: "span",
          text: "Selection coordinates: ",
          props: {
            opacity: ".5",
          },
        },
        value: {
          tag: "span",
          text: "11,4",
        },
      },
      total: {
        props: {
          fontSize: "0.75rem",
        },
        label: {
          tag: "span",
          text: "Total cells selected: ",
          props: {
            opacity: ".5",
          },
        },
        value: {
          tag: "span",
          text: "44",
        },
      },
    },
    result: {
      extend: Flex,
      props: {
        width: "min-content",
        break: "all",
      },
      resultTable: {
        text: JSON.stringify(GeneratedTable),
      },
    },
  },
};

export function createTable(X, Y) {
  const table = {
    table: {
      thead: {
        tr: {
          ...Array.from({ length: X }, (_, index) => ({
            th: {
              text: String.fromCharCode(65 + index),
            },
          })),
        },
      },
      tbody: {
        ...Array.from({ length: Y }, (_, rowIndex) => ({
          tr: {
            ...Array.from({ length: X }, (colIndex) => ({
              td: {
                text: " ",
              },
            })),
          },
        })),
      },
    },
  };

  return table;
}
