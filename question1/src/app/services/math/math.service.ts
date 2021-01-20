import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root",
})
export class MathService {
  constructor() {}

  public isFibonacci(number: number): boolean {
    const roundedNumber = Math.round(number)

    return (
      this.isPerfectSquare(5 * roundedNumber * roundedNumber + 4) ||
      this.isPerfectSquare(5 * roundedNumber * roundedNumber - 4)
    )
  }

  private isPerfectSquare(number: number): boolean {
    const sqrtNumber = Math.round(Math.sqrt(number))

    return sqrtNumber * sqrtNumber === number
  }

  public isPrime(number: number): boolean {
    const roundedNumber = Math.round(number)

    for (let i = 2, s = Math.sqrt(roundedNumber); i <= s; i++)
      if (roundedNumber % i === 0) return false

    return roundedNumber > 1
  }
}
