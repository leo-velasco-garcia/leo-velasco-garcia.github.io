/* ———————————————VIBE CODED COMPONENT———————————————*/ 

import { useEffect, useRef } from 'react';
import './CharacterGrid.css';

const CHARACTERS = [' ', '·', '-', '=', '*', '#'];
const CELL_HEIGHT = 16;
const FRAME_INTERVAL = 120;
const CLOUD_SPEED = 0.00025;

const smoothstep = (value) => value * value * (3 - 2 * value);

const hash = (x, y) => {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return value - Math.floor(value);
};

const noise = (x, y) => {
  const cellX = Math.floor(x);
  const cellY = Math.floor(y);
  const fractionX = smoothstep(x - cellX);
  const fractionY = smoothstep(y - cellY);
  const top = hash(cellX, cellY) * (1 - fractionX) + hash(cellX + 1, cellY) * fractionX;
  const bottom = hash(cellX, cellY + 1) * (1 - fractionX) + hash(cellX + 1, cellY + 1) * fractionX;

  return top * (1 - fractionY) + bottom * fractionY;
};

const fractalNoise = (x, y) => (
  noise(x, y) * 0.55
  + noise(x * 2.1 + 17.3, y * 2.1 - 9.2) * 0.3
  + noise(x * 4.3 - 5.1, y * 4.3 + 12.7) * 0.15
);

const getCharacter = (row, column, elapsed) => {
  const baseX = column * 0.045 - elapsed * CLOUD_SPEED;
  const baseY = row * 0.07 + elapsed * CLOUD_SPEED * 0.45;
  const warpX = (fractalNoise(baseX * 0.45 + 8, baseY * 0.45) - 0.5) * 2.8;
  const warpY = (fractalNoise(baseX * 0.45 - 13, baseY * 0.45 + 21) - 0.5) * 2.8;
  const ink = fractalNoise(
    baseX + warpX,
    baseY + warpY
  );
  const characterIndex = Math.min(CHARACTERS.length - 1, Math.floor(ink * CHARACTERS.length));

  return CHARACTERS[characterIndex];
};

const CharacterGrid = () => {
  const gridRef = useRef(null);
  const cellsRef = useRef([]);
  const dimensionsRef = useRef({ columns: 0, rows: 0 });

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return undefined;

    let animationId;
    let lastFrame = 0;

    const resize = () => {
      const measurement = document.createElement('span');
      measurement.textContent = '0';
      measurement.style.cssText = 'position:absolute; visibility:hidden; width:1ch; height:1em;';
      grid.appendChild(measurement);
      const cellWidth = measurement.getBoundingClientRect().width || CELL_HEIGHT;
      measurement.remove();

      const columns = Math.ceil(grid.clientWidth / cellWidth);
      const rows = Math.ceil(grid.clientHeight / CELL_HEIGHT);
      const { columns: previousColumns, rows: previousRows } = dimensionsRef.current;

      if (columns === previousColumns && rows === previousRows) return;

      dimensionsRef.current = { columns, rows };
      grid.replaceChildren();
      cellsRef.current = Array.from({ length: columns * rows }, (_, index) => {
        const cell = document.createElement('span');
        cell.setAttribute('aria-hidden', 'true');
        cell.textContent = '-';
        cell.style.setProperty('--column', index % columns);
        cell.style.setProperty('--row', Math.floor(index / columns));
        grid.appendChild(cell);
        return cell;
      });

      grid.style.setProperty('--columns', columns);
      grid.style.setProperty('--rows', rows);
    };

    const animate = (timestamp) => {
      if (timestamp - lastFrame >= FRAME_INTERVAL) {
        const { columns } = dimensionsRef.current;
        const elapsed = timestamp;

        cellsRef.current.forEach((cell, index) => {
          const row = Math.floor(index / columns);
          const column = index % columns;
          cell.textContent = getCharacter(row, column, elapsed);
        });
        lastFrame = timestamp;
      }

      animationId = window.requestAnimationFrame(animate);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(grid);
    resize();
    animationId = window.requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationId);
      grid.replaceChildren();
      dimensionsRef.current = { columns: 0, rows: 0 };
      cellsRef.current = [];
    };
  }, []);

  return <div className="character-grid" ref={gridRef} aria-hidden="true" />;
};

export default CharacterGrid;
