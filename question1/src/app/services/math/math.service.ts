import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root",
})
export class MathService {
  constructor() {}

  isFibonacci(number: number): boolean {
    const roundedNumber = Math.round(number)

    return (
      this.isPerfectSquare(5 * Math.pow(roundedNumber, 2) + 4) ||
      this.isPerfectSquare(5 * Math.pow(roundedNumber, 2) - 4)
    )
  }

  isPerfectSquare(number: number): boolean {
    return Math.pow(Math.sqrt(number), 2) === number
  }

  isPrime(number: number): boolean {
    const roundedNumber = Math.round(number)

    for (let i = 2, s = Math.sqrt(roundedNumber); i <= s; i++)
      if (roundedNumber % i === 0) return false

    return roundedNumber > 1
  }
}
