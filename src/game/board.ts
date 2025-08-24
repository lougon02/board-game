import * as fs from "fs"
import * as path from "path";
import boardXml from "@game/config/board.xml?raw";
import { XMLParser } from "fast-xml-parser"

export type BoardState = {
  playerPositions: {
    [playerId: number]: [nodeID: GraphNode];
  };
};

type Room = {
  id: string;
  Boundary: {Point: Point[]};
}

type Point = {
  x: number;
  y: number;
}

type Passage = {
  from: string;
  to: string;
  bidirectional: boolean;
}

type Tile = {
  char: string;
  type: "corridor" | "entrance" | "room";
  roomId?: string;
}

export type GraphNode = {
  id: string;
  type: string;
  data: any;
  edges: GraphEdge[];
  weight: number;
}


type GraphEdge = {
  from: GraphNode;
  to: GraphNode;
  weight: number;
}

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "" });
const boardData = parser.parse(boardXml).Board;
console.log(boardData);
const boardSize = boardData.size;
const boardLayout: string[] = boardData.Layout.trim().split("\n").map((line: string) => line.trim())
export const boardGraph: Record<string, GraphNode> = {};  


// Initialize rooms in the graph
boardData.Rooms.Room.forEach((room: Room) => {
  boardGraph[room.id] = {
    id: room.id,
    type: "room",
    data: {
      boundary: room.Boundary.Point.flatMap(point => [point.x/boardSize, point.y/boardSize]),
    },
    edges: [],
    weight: 9999,
  };
});

// Initialize passages in the graph
boardData.Rooms.Room.forEach((room: Room) => {
  const roomPassages = boardData.Passages.Passage.filter((passage: Passage) => passage.from === room.id || passage.to === room.id);
  const edges: GraphEdge[] = [];

  roomPassages.forEach((passage: Passage) => {
    const fromNode = boardGraph[passage.from];
    const toNode = boardGraph[passage.to];

    if (!fromNode || !toNode) {
      console.warn(`Invalid passage from ${passage.from} to ${passage.to}`);
      return;
    }

    if (passage.from === room.id) {
      edges.push({
        from: fromNode,
        to: toNode,
        weight: 1,
      });
    }

    if (passage.to === room.id && passage.bidirectional) {
      edges.push({
        from: toNode,
        to: fromNode,
        weight: 1,
      });
    }
  });

  boardGraph[room.id]!.edges.push(...edges);
});

// Initialize corridor tiles in the graph
boardLayout.forEach((line, y) => {
  line.split("").forEach((char, x) => {
    const tile = boardData.Tiles.Tile.find((t: Tile) => t.char === char);
    
    if(tile?.type == "corridor"){
      boardGraph[`${x+1}-${y+1}`] = {
        id: `${x+1}-${y+1}`,
        type: "corridor",
        data: {
          boundary: [x, y, x+1, y, x+1, y+1, x, y+1].map(coord => coord / boardSize),
        },
        edges: [],
        weight: 0,
      };
    }
  });
});

// Initialize corridor edges and room entrances in the graph
boardLayout.forEach((line, y) => {
  line.split("").forEach((char, x) => {
    const tile = boardData.Tiles.Tile.find((t: Tile) => t.char === char);

    switch(tile?.type) {
      case "corridor":
        (`Found corridor at (${x+1},${y+1})`);
        const neighbors = [
          boardLayout[y]?.[x - 1], // left
          boardLayout[y]?.[x + 1], // right
          boardLayout[y - 1]?.[x], // top
          boardLayout[y + 1]?.[x], // bottom
        ];
        const offsets = [[0,-1],[0,1],[-1,0],[1,0]]

        neighbors.forEach((neighbor, index) => {
          const neighborTile = boardData.Tiles.Tile.find((t: Tile) => t.char === neighbor);
          const [offsetY, offsetX] = offsets[index];

          switch(neighborTile?.type) {
            case "corridor": //if neighbor is a corridor, connect an edge to it
              const nodeTo = boardGraph[`${x+1+offsetX}-${y+1+offsetY}`];

              if(nodeTo)
                boardGraph[`${x+1}-${y+1}`].edges.push({ from: boardGraph[`${x+1}-${y+1}`], to: nodeTo, weight: 1 });
              
              break;
            case "entrance": //if neighbor is an entrance, find room on the other side and connect an edge to and from it
              const roomTile = boardData.Tiles.Tile.find((t: Tile) => t.type === "room" && t.char === boardLayout[y + offsetY*2]?.[x + offsetX*2]);
              if(roomTile) {
                boardGraph[`${x+1}-${y+1}`].edges.push(
                  { from: boardGraph[`${x+1}-${y+1}`], to: boardGraph[roomTile.roomId], weight: 1 },
                );
                boardGraph[roomTile.roomId].edges.push(
                  { from: boardGraph[roomTile.roomId], to: boardGraph[`${x+1}-${y+1}`], weight: 1 },
                );
              }
              break;
          }
        });

        break;
      case "room":
        break;
    }
  });
});
