import * as T from '@effect-ts/core/Effect';
import { pipe } from '@effect-ts/core/Function';

pipe(
  T.effectTotal(() => {
    console.log('Hello world');
  }),
  T.run
);

interface Input {
  x: number;
  y: number;
}

// T.Effect<R, E, A> (R=env, E=error, A=success)
const division: T.Effect<Input, string, void> = pipe(
  T.environment<Input>(),
  T.chain(({ x, y }) => (y === 0 ? T.fail('division by zero') : T.succeed(x / y))),
  T.chain(result =>
    T.effectTotal(() => {
      console.log(`Final result: ${result}`);
    })
  )
);

pipe(division, T.provideAll({ x: 1, y: 2 }), T.run);
pipe(division, T.provideAll({ x: 1, y: 0 }), T.run);

pipe(
  division,
  T.provideAll({ x: 1, y: 0 }),
  T.catchAll(reason =>
    T.effectTotal(() => {
      console.log('oops', reason);
    })
  )
);
