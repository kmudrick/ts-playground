import { Functor2 } from "fp-ts/lib/Functor";

export const URI = "Either";

export type URI = typeof URI;

declare module "fp-ts/lib/HKT" {
  interface URItoKind2<E, A> {
    readonly Either: Either<E, A>;
  }
}

export interface Left<E> {
  readonly _tag: "Left";
  readonly left: E;
}

export const left = <E>(e: E): Left<E> => ({ _tag: "Left", left: e });

export interface Right<A> {
  readonly _tag: "Right";
  readonly right: A;
}

export const right = <A>(a: A): Right<A> => ({ _tag: "Right", right: a });

export type Either<E, A> = Left<E> | Right<A>;

// Functor instance
export const either: Functor2<URI> = {
  URI,
  map: (ma, f) => (ma._tag === "Left" ? ma : right(f(ma.right))),
};

// either.map
