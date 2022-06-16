/*
  216 - Slice
  -------
  by Anthony Fu (@antfu) #extreme #array
  
  ### Question
  
  Implement the JavaScript `Array.slice` function in the type system. `Slice<Arr, Start, End>` takes the three argument. The output should be a subarray of `Arr` from index `Start` to `End`. Indexes with negative numbers should be counted from reversely.
  
  For example
  
  ```ts
  type Arr = [1, 2, 3, 4, 5]
  type Result = Slice<Arr, 2, 4> // expected to be [3, 4]
  ```
  
  > View on GitHub: https://tsch.js.org/216
*/

/* _____________ Your Code Here _____________ */

type LengthArray<
  N extends number | string,
  A extends any[] = []
> = `${A["length"]}` extends `${N}` ? A : LengthArray<N, [...A, 0]>;

type GetPositive<
  N extends number,
  A extends number
> = `${N}` extends `-${infer positve}`
  ? LengthArray<A> extends [...LengthArray<positve>, ...infer rest]
    ? rest["length"]
    : 0
  : 0;

type GetFirst<A extends any[]> = A extends [infer first, ...infer _]
  ? first
  : never;

type GetRest<A extends any[]> = A extends [infer _, ...infer rest]
  ? rest
  : never;

type Slice<
  Arr extends any[],
  Start extends number = 0,
  End extends number = Arr["length"],
  length = Arr["length"],
  A extends any[] = [],
  flag = false
> = Start extends End
  ? []
  : `${Start}` extends `-${infer _}`
  ? Slice<Arr, GetPositive<Start, Arr["length"]>, End, length>
  : `${End}` extends `-${infer _}`
  ? Slice<Arr, Start, GetPositive<End, Arr["length"]>>
  : A["length"] extends length
  ? []
  : A["length"] extends Start
  ? [GetFirst<Arr>, ...Slice<GetRest<Arr>, Start, End, length, [...A, 0], true>]
  : A["length"] extends End
  ? []
  : flag extends true
  ? [GetFirst<Arr>, ...Slice<GetRest<Arr>, Start, End, length, [...A, 0], true>]
  : Slice<GetRest<Arr>, Start, End, length, [...A, 0], false>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "./utils";

type Arr = [1, 2, 3, 4, 5];

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/216/answer
  > View solutions: https://tsch.js.org/216/solutions
  > More Challenges: https://tsch.js.org
*/
