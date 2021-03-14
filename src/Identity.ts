import { Functor1 } from "fp-ts/lib/Functor";

export const URI = "Identity";

export type URI = typeof URI;

declare module "fp-ts/lib/HKT" {
  interface URItoKind<A> {
    readonly Identity: Identity<A>;
  }
}

export type Identity<A> = A;

// Functor instance
export const identity: Functor1<URI> = {
  URI,
  map: (ma, f) => f(ma),
};
