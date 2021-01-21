import { TestBed } from "@angular/core/testing"

import { MathService } from "./math.service"

describe("MathService", () => {
  let service: MathService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(MathService)
  })

  describe("Creation", () => {
    it("should be created", () => {
      expect(service).toBeTruthy()
    })
  })

  describe("isPrime", () => {
    it("should return true, input = 2", () => {
      expect(service.isPrime(2)).toBeTrue()
    })

    it("should return true, input = 97", () => {
      expect(service.isPrime(97)).toBeTrue()
    })

    it("should return true, input = 5.4", () => {
      expect(service.isPrime(5.4)).toBeTrue()
    })

    it("should return false, input = 1", () => {
      expect(service.isPrime(1)).toBeFalse()
    })

    it("should return false, input = 100", () => {
      expect(service.isPrime(100)).toBeFalse()
    })
  })

  describe("isFibonacci", () => {
    it("should return true, input = 5", () => {
      expect(service.isFibonacci(5)).toBeTrue()
    })

    it("should return true, input = 144", () => {
      expect(service.isFibonacci(144)).toBeTrue()
    })

    it("should return true, input = 1.3", () => {
      expect(service.isFibonacci(1.3)).toBeTrue()
    })

    it("should return false, input = 6", () => {
      expect(service.isFibonacci(6)).toBeFalse()
    })

    it("should return false, input = 14", () => {
      expect(service.isFibonacci(14)).toBeFalse()
    })
  })
})
