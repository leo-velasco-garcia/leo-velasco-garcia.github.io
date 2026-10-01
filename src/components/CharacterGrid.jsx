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

const getInwardPattern = (cellX, cellY, directionX, directionY, travel, warpX, warpY, textureTime) => {
  const sampleX = cellX + directionX * travel + warpX;
  const sampleY = cellY + directionY * travel + warpY;
  const fieldA = fractalNoise(sampleX * 0.022 + 7.4, sampleY * 0.022 - 2.1);
  const fieldB = fractalNoise(sampleX * 0.012 - textureTime * 0.1, sampleY * 0.012 + textureTime * 0.12);
  const fieldC = fractalNoise(sampleX * 0.042 + 12, sampleY * 0.042 - 6);

  return fieldA * 0.55 + fieldB * 0.3 + fieldC * 0.15;
};

const getCharacter = (row, column, elapsed, variant, columns, rows, cellWidth, originX, originY) => {
  let baseX;
  let baseY;

  if (variant === 'inward') {
    const cellX = column * cellWidth + cellWidth * 0.5;
    const cellY = row * CELL_HEIGHT + CELL_HEIGHT * 0.5;
    const dx = cellX - originX;
    const dy = cellY - originY;
    const distance = Math.hypot(dx, dy) + 0.0001;
    const time = elapsed * 0.001;
    const textureTime = Math.min(time, 5);
    const maxDistance = Math.max(Math.hypot(columns * cellWidth, rows * CELL_HEIGHT) * 0.9, 1);
    const centerBias = 1 - Math.min(1, distance / maxDistance);
    const warpX = (fractalNoise(dx * 0.006 + textureTime * 0.11, dy * 0.006 - textureTime * 0.09) - 0.5) * 90;
    const warpY = (fractalNoise(dx * 0.006 + 11.7 - textureTime * 0.08, dy * 0.006 + 4.2 + textureTime * 0.1) - 0.5) * 90;
    const inwardTravel = (time * 96) % maxDistance;
    const directionX = dx / distance;
    const directionY = dy / distance;
    const blendDistance = maxDistance * 0.12;
    const blendStart = maxDistance - blendDistance;
    const blend = inwardTravel > blendStart
      ? smoothstep((inwardTravel - blendStart) / blendDistance)
      : 0;
    const currentPattern = getInwardPattern(
      cellX, cellY, directionX, directionY, inwardTravel, warpX, warpY, textureTime
    );
    const recycledPattern = blend > 0
      ? getInwardPattern(
        cellX, cellY, directionX, directionY, inwardTravel - maxDistance, warpX, warpY, textureTime
      )
      : currentPattern;
    const pattern = currentPattern * (1 - blend) + recycledPattern * blend;
    const ink = Math.min(1, Math.max(0, 0.5 + (pattern - 0.5) * 1.8 + centerBias * 0.12));
    const characterIndex = Math.min(CHARACTERS.length - 1, Math.floor(ink * CHARACTERS.length));

    return CHARACTERS[characterIndex];
  }

  baseX = column * 0.045 - elapsed * CLOUD_SPEED;
  baseY = row * 0.07 + elapsed * CLOUD_SPEED * 0.45;

  const time = elapsed * 0.0001;
  const warpX = (fractalNoise(baseX * 0.45 + 8 + time * 0.73, baseY * 0.45 - time * 0.41) - 0.5) * 3.6;
  const warpY = (fractalNoise(baseX * 0.45 - 13 - time * 0.37, baseY * 0.45 + 21 + time * 0.91) - 0.5) * 3.6;
  const ink = fractalNoise(
    baseX + warpX + time * 0.11,
    baseY + warpY - time * 0.17
  );
  const characterIndex = Math.min(CHARACTERS.length - 1, Math.floor(ink * CHARACTERS.length));

  return CHARACTERS[characterIndex];
};

const CharacterGrid = ({ variant = 'horizontal', originRef }) => {
  const gridRef = useRef(null);
  const cellsRef = useRef([]);
  const dimensionsRef = useRef({ columns: 0, rows: 0, cellWidth: CELL_HEIGHT });

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
      const { columns: previousColumns, rows: previousRows, cellWidth: previousCellWidth } = dimensionsRef.current;

      if (columns === previousColumns && rows === previousRows && cellWidth === previousCellWidth) return;

      dimensionsRef.current = { columns, rows, cellWidth };
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
        const { columns, rows, cellWidth } = dimensionsRef.current;
        const elapsed = timestamp;
        const gridRect = grid.getBoundingClientRect();
        const originRect = originRef?.current?.getBoundingClientRect();
        const originX = originRect ? originRect.left + originRect.width / 2 - gridRect.left : grid.clientWidth / 2;
        const originY = originRect ? originRect.top + originRect.height / 2 - gridRect.top : grid.clientHeight / 2;

        cellsRef.current.forEach((cell, index) => {
          const row = Math.floor(index / columns);
          const column = index % columns;
          cell.textContent = getCharacter(row, column, elapsed, variant, columns, rows, cellWidth, originX, originY);
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
  }, [originRef, variant]);

  return <div className="character-grid" ref={gridRef} aria-hidden="true" />;
};

export default CharacterGrid;
