/*
  476 - Sum
  -------
  by null (@uid11) #extreme #math #template-literal
  
  ### Question
  
  Implement a type `Sum<A, B>` that summing two non-negative integers and returns the sum as a string. Numbers can be specified as a string, number, or bigint.
  
  For example,
  
  ```ts
  type T0 = Sum<2, 3> // '5'
  type T1 = Sum<'13', '21'> // '34'
  type T2 = Sum<'328', 7> // '335'
  type T3 = Sum<1_000_000_000_000n, '123'> // '1000000000123'
  ```
  
  > View on GitHub: https://tsch.js.org/476
*/


/* _____________ Your Code Here _____________ */

type NumType = string | number | bigint

type ToArray<T extends NumType, A extends string[] = []> = 
  `${T}` extends `${infer first}${infer rest}`
    ? ToArray<rest, [...A, first]>
    : A

type LengthArray<N extends string, A extends number[] = []> = 
  N extends `${A['length']}`
    ? A
    : LengthArray<N, [...A, 0]>

type SumWithArray<A extends string, B extends string, flag> =
  flag extends true 
    ? [...LengthArray<A>, ...LengthArray<B>, 0]['length']
    : [...LengthArray<A>, ...LengthArray<B>]['length']

type ShouldAddOne<N extends number> = 
  LengthArray<`${N}`> extends [...LengthArray<'10'>, ...infer rest]
    ? true
    : false

type LastNumber<N extends number> = 
  LengthArray<`${N}`> extends [...LengthArray<'10'>, ...infer rest]
    ? rest['length']
    : N

type ArrayToString<A extends string[]> = 
  A extends [infer first extends string, ...infer rest extends string[]]
    ? `${first}${ArrayToString<rest>}`
    : ""
type SumArray<A extends string[], B extends string[], flag = false, S extends string = ""> = 
  A extends [...infer restA extends string[], infer lastA]
    ? B extends [...infer restB extends string[], infer lastB]
      ? SumArray<restA, restB, ShouldAddOne<SumWithArray<lastA, lastB, flag>>, `${LastNumber<SumWithArray<lastA, lastB, flag>>}${S}`>
      : flag extends true 
      ? SumArray<restA, [], ShouldAddOne<SumWithArray<lastA, '0', flag>>, `${LastNumber<SumWithArray<lastA, '0', flag>>}${S}`>
      : `${ArrayToString<A>}${S}`
    : B extends [...infer restB extends string[], infer lastB]
    ? flag extends true
      ? SumArray<[], restB, ShouldAddOne<SumWithArray<'0', lastB, flag>>, `${LastNumber<SumWithArray<'0', lastB, flag>>}${S}`>
      : `${ArrayToString<B>}${S}`
    : flag extends true
    ? `1${S}`
    : S

type Sum<A extends NumType, B extends NumType> = SumArray<ToArray<A>, ToArray<B>>

type t = Sum<'0', 0>

type ts = LastNumber<SumWithArray<'2', '0', false>>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from './utils'

type cases = [
  Expect<Equal<Sum<2, 3>, '5'>>,
  Expect<Equal<Sum<'13', '21'>, '34'>>,
  Expect<Equal<Sum<'328', 7>, '335'>>,
  Expect<Equal<Sum<1_000_000_000_000n, '123'>, '1000000000123'>>,
  Expect<Equal<Sum<9999, 1>, '10000'>>,
  Expect<Equal<Sum<4325234, '39532'>, '4364766'>>,
  Expect<Equal<Sum<728, 0>, '728'>>,
  Expect<Equal<Sum<'0', 213>, '213'>>,
  Expect<Equal<Sum<0, '0'>, '0'>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/476/answer
  > View solutions: https://tsch.js.org/476/solutions
  > More Challenges: https://tsch.js.org
*/

