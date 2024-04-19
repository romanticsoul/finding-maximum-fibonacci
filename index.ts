import cliProgress from "cli-progress";
const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const itrCount = 20000; /* Введите количество итераций */
/* Вычисления с использованием BigInt */
function fibonacci(n: number, cache: Record<number, bigint> = {}): bigint {
  if (n <= 1) {
    return BigInt(n);
  }
  if (cache[n]) {
    return cache[n];
  }
  return (cache[n] = fibonacci(n - 1, cache) + fibonacci(n - 2, cache));
}

const cache: Record<number, bigint> = {};

bar.start(itrCount, 1);

for (let i = 0; i < itrCount; i++) {
  const child: bigint = fibonacci(i - 1, cache);
  const grandchild: bigint = fibonacci(i - 2, cache);
  const current: bigint = fibonacci(i, cache);

  if (i > 10) {
    if (grandchild + child - current === BigInt(0)) {
      bar.update(++i);
    } else {
      bar.stop();
      console.error(`Ошибка вычисления ${i} числа Фибоначчи`);
      break;
    }
  }
}

/* Вычисления с использованием Number */
// function fibonacci(n: number, cache: Record<number, number> = {}): number {
//   if (n <= 1) {
//     return n;
//   }
//   if (cache[n]) {
//     return cache[n];
//   }
//   return (cache[n] = fibonacci(n - 1, cache) + fibonacci(n - 2, cache));
// }

// const cache: Record<number, number> = {};

// bar.start(itrCount, 1);

// for (let i = 0; i < itrCount; i++) {
//   const child = fibonacci(i - 1, cache);
//   const grandchild = fibonacci(i - 2, cache);
//   const current = fibonacci(i, cache);

//   if (i > 10) {
//     if (grandchild + child - current === 0) {
//       bar.update(++i);
//     } else {
//       bar.stop();
//       console.error(`Ошибка вычисления ${i} числа Фибоначчи:`, current);
//       break;
//     }
//   }
// }

bar.stop();
