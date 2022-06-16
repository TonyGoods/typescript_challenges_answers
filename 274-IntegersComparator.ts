/*
  274 - Integers Comparator
  -------
  by Pig Fang (@g-plane) #extreme #template-literal #math
  
  ### Question
  
  Implement a type-level integers comparator. We've provided an enum for indicating the comparison result, like this:
  
  - If `a` is greater than `b`, type should be `Comparison.Greater`.
  - If `a` and `b` are equal, type should be `Comparison.Equal`.
  - If `a` is lower than `b`, type should be `Comparison.Lower`.
  
  **Note that `a` and `b` can be positive integers or negative integers or zero, even one is positive while another one is negative.**
  
  > View on GitHub: https://tsch.js.org/274
*/


/* _____________ Your Code Here _____________ */

enum Comparison {
  Greater,
  Equal,
  Lower,
}

type Helper<T extends string | number, S extends string | number, A extends any[] = []> =
  `${A['length']}` extends `${T}`
    ? Comparison.Lower
    : `${A['length']}` extends `${S}`
    ? Comparison.Greater
    : Helper<T, S, [...A, 0]>

type Comparator<A extends number, B extends number> = 
  A extends B 
    ? Comparison.Equal
    : `${A}` extends `-${infer a}`
    ? `${B}` extends `-${infer b}`
      ? Helper<b, a>
      : Comparison.Lower
    : `${B}` extends `-${infer _}`
    ? Comparison.Greater
    : Helper<A, B>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from './utils'

type cases = [
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/274/answer
  > View solutions: https://tsch.js.org/274/solutions
  > More Challenges: https://tsch.js.org
*/

