import { chain, Either, left, mapLeft, right } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray"

    function lift<E, A>(check: (a: A) => Either<E, A>): (a: A) => Either<NonEmptyArray<E>, A> {
      return a =>
        pipe(
          check(a),
          mapLeft(a => [a])
        )
    }

    const isFizz = lift((a: number): Either<string, number> =>
        a % 3 === 0 ? left('fizz') : right(a)
    )
    const isBuzz = lift((a: number): Either<string, number> =>
        a % 5 === 0 ? left('buzz') : right(a)
    )

    const fizzbuzz = (a: number): Either<NonEmptyArray<string>, number> =>
      pipe(isFizz(a), chain(isBuzz))
    console.log(fizzbuzz(15))
