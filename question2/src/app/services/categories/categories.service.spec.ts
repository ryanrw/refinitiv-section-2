import { TestBed } from "@angular/core/testing"
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing"

import { CategoriesService } from "./categories.service"

describe("CategoriesService", () => {
  let service: CategoriesService
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })

    httpTestingController = TestBed.inject(HttpTestingController)
    service = TestBed.inject(CategoriesService)
  })

  afterEach(() => {
    httpTestingController.verify()
  })

  it("should be created", () => {
    expect(service).toBeTruthy()
  })

  describe("Categories Service", () => {
    it("should retrieved any data", () => {
      const expectedData = ["asdf", "qwer", "zxcv"]

      service.get().subscribe((response) => {
        expect(response).toBe(expectedData)
      })

      const req = httpTestingController.expectOne(
        "https://api.publicapis.org/categories",
      )
      expect(req.request.method).toBe("GET")
      req.flush(expectedData)
    })
  })
})
