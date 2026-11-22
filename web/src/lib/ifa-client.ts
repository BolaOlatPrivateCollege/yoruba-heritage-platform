import { pairing, movedIndex } from './ifa-matrix';

const root = document.querySelector<HTMLElement>('[data-ifa]');
if (root) {
  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-pair]'));
  const row = root.querySelector<HTMLSelectElement>('#ifa-row')!;
  const column = root.querySelector<HTMLSelectElement>('#ifa-column')!;
  const status = root.querySelector<HTMLElement>('#ifa-status')!;
  const rowName = root.querySelector<HTMLElement>('#ifa-row-name')!;
  const columnName = root.querySelector<HTMLElement>('#ifa-column-name')!;
  const rowCode = root.querySelector<HTMLElement>('#ifa-row-code')!;
  const columnCode = root.querySelector<HTMLElement>('#ifa-column-code')!;

  function select(index: number) {
    const p = pairing(Math.floor(index / 16), index % 16);
    buttons.forEach((button, i) => {
      button.setAttribute('aria-pressed', String(i === index));
      button.tabIndex = i === index ? 0 : -1;
    });
    row.value = String(p.row);
    column.value = String(p.column);
    const rowOption = row.options.item(p.row), columnOption = column.options.item(p.column);
    if (!rowOption || !columnOption) throw new RangeError('Missing teaching label');
    rowName.textContent = rowOption.text;
    columnName.textContent = columnOption.text;
    rowCode.textContent = `${p.rowCode} (index ${p.row})`;
    columnCode.textContent = `${p.columnCode} (index ${p.column})`;
    // Preserve Yoruba language metadata within the live announcement too.
    const r = document.createElement('span'), c = document.createElement('span');
    r.lang = c.lang = 'yo';
    r.textContent = rowName.textContent;
    c.textContent = columnName.textContent;
    status.replaceChildren(`Pair ${p.number} of 256. Row: `, r,
      `; column: `, c, `. Row code ${p.rowCode}; column code ${p.columnCode}. Modern positional codes only.`);
  }

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => select(index));
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = movedIndex(index, event.key, event.ctrlKey);
      buttons.forEach((b, i) => { b.tabIndex = i === next ? 0 : -1; });
      const target = buttons[next];
      if (!target) throw new RangeError('Missing matrix cell');
      target.focus();
      // Instant scrolling also respects reduced-motion preferences.
      target.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
    });
  });
  for (const selector of [row, column]) {
    selector.addEventListener('change', () => select(Number(row.value) * 16 + Number(column.value)));
  }
  select(0);
  root.querySelector<HTMLElement>('#ifa-controls')!.hidden = false;
  root.querySelector<HTMLElement>('#ifa-fallback')!.hidden = true;
}
