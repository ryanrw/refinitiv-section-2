import { Component } from "@angular/core"

import { MathService } from "src/app/services/math/math.service"
import { NumberInput } from "src/app/models/number-input/number-input"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"],
})
export class AppComponent {
  numberInput: NumberInput = new NumberInput("", "isPrime")
  answer: boolean = false

  constructor(public mathService: MathService) {}

  ngDoCheck() {
    if (!this.numberInput.value) return

    switch (this.numberInput.funcName) {
      case "isPrime":
        this.answer = this.mathService.isPrime(Number(this.numberInput.value))
        break
      case "isFibonacci":
        this.answer = this.mathService.isFibonacci(
          Number(this.numberInput.value),
        )
        break
      default:
        break
    }
  }

  inputCheck(event: Event) {
    const numberInput = Number(this.numberInput.value)

    if (numberInput < 0) {
      this.numberInput.value = "1"
      ;(event.target as HTMLInputElement).value = "1"
    }

    if (isNaN(numberInput)) {
      this.numberInput.value = ""
    }
  }
}
