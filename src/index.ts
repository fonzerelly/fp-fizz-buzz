import { Either, getApplicativeValidation, left, mapLeft, right } from "fp-ts/lib/Either"
import { pipe } from "fp-ts/lib/function"
import { getSemigroup } from "fp-ts/lib/ReadonlyArray"
import {pipeable} from "fp-ts/lib/pipeable"

    function lift<E, A>(check: (a: A) => Either<E, A>): (a: A) => Either<ReadonlyArray<E>, A> {
      return a =>
        pipe(
          check(a),
          mapLeft(a => [a])
        )
    }

    const isFizz = (a: number): Either<ReadonlyArray<string>, number> =>
        a % 3 === 0 ? left(['fizz']) : right(a)
    
    const isBuzz = (a: number): Either<ReadonlyArray<string>, number> =>
        a % 5 === 0 ? left(['buzz']) : right(a)
    

    
    // const validate = (num: number): Either<ReadonlyArray<string>, number> => {
    //   const V = getApplicativeValidation((getSemigroup<string>()))
    //   const id = (num: number): number => num
    //   const liftedFunction = V.of(id)
    //   const afterFizz = V.ap(liftedFunction, isFizz(num))
    //   const afterBuzz = V.ap(afterFizz, isBuzz(num))
    //   return afterBuzz
    // }

    const validate = (num: number): Either<ReadonlyArray<string>, number> => {
      const V = getApplicativeValidation(getSemigroup<string>());
      const P = pipeable(V);
      const id = (a: number) => (_: number) => a
      // return pipe(
      //   V.of(id),
      //   P.ap(isFizz(num)),
      //   P.ap(isBuzz(num))
      // )
      return pipe(
        V.of((a:number) => a),
        P.apFirst(isFizz(num)),
        P.ap(isBuzz(num))
      )
      
    }

    console.log(validate(2))
    console.log(validate(3))
    console.log(validate(5))
    console.log(validate(15))