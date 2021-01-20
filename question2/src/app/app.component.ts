import { Component } from "@angular/core"

import { CategoriesService } from "src/app/services/categories/categories.service"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"],
})
export class AppComponent {
  categories: string[] = []

  isSearch: boolean = false

  filteredCategories: string[] = []

  filter: string = ""

  constructor(public categoriesService: CategoriesService) {}

  ngOnInit() {
    this.retriveCategories()
  }

  retriveCategories() {
    this.categoriesService.get().subscribe((response) => {
      this.categories = response
    })
  }

  handleFilter() {
    if (!this.filter) {
      this.isSearch = false

      return
    }

    this.isSearch = true

    this.filteredCategories = this.categories.filter((item) =>
      item.toLowerCase().includes(this.filter.toLowerCase()),
    )
  }
}
