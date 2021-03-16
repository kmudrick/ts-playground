import { pipe } from '@effect-ts/core/Function';
import * as S from '@effect-ts/core/Sync';
import * as T from '@effect-ts/core/Effect';
import { AType, EType, make, opaque } from '@effect-ts/morphic';
import { decode } from '@effect-ts/morphic/Decoder';

const ProgramOptions_ = make(F =>
  F.interface({
    input: F.string(),
    output: F.string()
  })
);
interface ProgramOptions extends AType<typeof ProgramOptions_> {}
interface ProgramOptionsE extends EType<typeof ProgramOptions_> {}
const ProgramOptions = opaque<ProgramOptionsE, ProgramOptions>()(ProgramOptions_);

const somePromise = (po: ProgramOptions): Promise<ProgramOptionsE> =>
  new Promise((resolve, _reject) => {
    setTimeout(() => {
      console.log(`got ${JSON.stringify(po)}`);
      resolve(po);
    }, 0);
  });

const someEffect = (po: ProgramOptions) => T.fromPromise(() => somePromise(po));

// fixme Property '_tag' is missing in type 'Effect<unknown, unknown, ProgramOptionsE>' but required in type 'Sync<unknown, unknown, ProgramOptionsE>'
const result = pipe({ input: 'foo', output: 'bar' }, decode(ProgramOptions), S.chain(someEffect), S.runEither);

console.log(JSON.stringify(result));
