import { HttpClientTestingModule } from "@angular/common/http/testing"
import { TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser"
import { RouterTestingModule } from "@angular/router/testing"
import { Observable } from "rxjs"
import { AppComponent } from "./app.component"
import { CategoriesService } from "./services/categories/categories.service"

const response = ["Animals", "Anime", "Anti-Malware", "Art & Design"]

class MockCategoriesService {
  get() {
    return new Observable<string[]>((subscriber) => {
      subscriber.next(response)
    })
  }
}

describe("AppComponent", () => {
  let appComponent: AppComponent
  let categories: CategoriesService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        AppComponent,
        { provide: CategoriesService, useClass: MockCategoriesService },
      ],
      declarations: [AppComponent],
    }).compileComponents()

    appComponent = TestBed.inject(AppComponent)
    categories = TestBed.inject(CategoriesService)
  })

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it("should retrived the categories", () => {
    appComponent.ngOnInit()
    expect(appComponent.categories).toEqual(response)
  })

  it("should handle input change", async () => {
    appComponent.ngOnInit()

    appComponent.filter = "a"

    appComponent.handleFilter()

    expect(appComponent.isSearch).toBeTruthy()

    appComponent.filter = ""

    appComponent.handleFilter()

    expect(appComponent.isSearch).toBeFalsy()
  })
})
