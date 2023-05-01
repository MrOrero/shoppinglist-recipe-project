import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService,
    private authService: AuthService
  ) {}

  saveRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http
      .put(
        'https://ng-recipe-app-5b8e9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        {
          recipes,
        }
      )
      .subscribe((response) => console.log(response));
  }

  fetchRecipes() {
    return this.http
      .get(
        'https://ng-recipe-app-5b8e9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json?'
      )
      .pipe(
        map((recipes) => {
          return recipes['recipes'].map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipesService.setRecipes(recipes);
        })
      );
  }
}
